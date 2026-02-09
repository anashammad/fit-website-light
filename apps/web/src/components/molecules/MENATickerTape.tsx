'use client';

import { useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface MarketIndex {
  name: string;
  symbol: string;
  value: number;
  change: number;
  changePercent: number;
  source: string;
}

// Fallback data shown when live APIs are unreachable
const FALLBACK_INDICES: MarketIndex[] = [
  { name: 'DFM', symbol: 'DFMGI', value: 6760.99, change: 69.99, changePercent: 1.05, source: 'fallback' },
  { name: 'ADX', symbol: 'FADX', value: 9412.35, change: 32.18, changePercent: 0.34, source: 'fallback' },
  { name: 'TASI', symbol: 'TASI', value: 12185.72, change: -45.31, changePercent: -0.37, source: 'fallback' },
  { name: 'MSX 30', symbol: 'MSX30', value: 4623.88, change: 11.54, changePercent: 0.25, source: 'fallback' },
  { name: 'QSE', symbol: 'GNRI', value: 10284.56, change: 28.73, changePercent: 0.28, source: 'fallback' },
  { name: 'ASE', symbol: 'AMGNRLX', value: 4892.14, change: -8.62, changePercent: -0.18, source: 'fallback' },
  { name: 'EGX 30', symbol: 'EGX30', value: 30125.40, change: 187.60, changePercent: 0.63, source: 'fallback' },
];

const FLAG_BY_SYMBOL: Record<string, string> = {
  DFMGI: '/images/flags/ae.svg',
  FADX: '/images/flags/ae.svg',
  TASI: '/images/flags/sa.svg',
  MSX30: '/images/flags/om.svg',
  GNRI: '/images/flags/qa.svg',
  AMGNRLX: '/images/flags/jo.svg',
  EGX30: '/images/flags/eg.svg',
};

// Trading hours per exchange (24h format, local time)
// MENA markets trade Sun–Thu
const MARKET_HOURS: Record<string, { open: number; close: number; utcOffset: number }> = {
  DFMGI:   { open: 10.00, close: 14.00, utcOffset: 4 },   // DFM – Dubai (UTC+4)
  FADX:    { open: 10.00, close: 14.00, utcOffset: 4 },   // ADX – Abu Dhabi (UTC+4)
  TASI:    { open: 10.00, close: 15.00, utcOffset: 3 },   // Tadawul – Riyadh (UTC+3)
  MSX30:   { open: 10.00, close: 13.00, utcOffset: 4 },   // MSX – Muscat (UTC+4)
  GNRI:    { open:  9.50, close: 13.50, utcOffset: 3 },   // QSE – Doha (UTC+3) 09:30–13:30
  AMGNRLX: { open: 10.00, close: 12.50, utcOffset: 3 },   // ASE – Amman (UTC+3) 10:00–12:30
  EGX30:   { open: 10.00, close: 14.50, utcOffset: 2 },   // EGX – Cairo (UTC+2) 10:00–14:30
};

function isMarketOpen(symbol: string): boolean {
  const hours = MARKET_HOURS[symbol];
  if (!hours) return false;
  const now = new Date();
  // Get current day/time in the exchange's local timezone
  const utcHours = now.getUTCHours() + now.getUTCMinutes() / 60;
  const localHours = (utcHours + hours.utcOffset) % 24;
  const utcDay = now.getUTCDay(); // 0=Sun
  // Adjust day if offset pushed us to next day
  const localDay = (utcHours + hours.utcOffset >= 24) ? (utcDay + 1) % 7 : utcDay;
  // MENA markets: Sun(0)–Thu(4)
  if (localDay === 5 || localDay === 6) return false; // Fri & Sat closed
  return localHours >= hours.open && localHours < hours.close;
}

export function MENATickerTape({ className }: { className?: string }) {
  const indicesRef = useRef<MarketIndex[]>(FALLBACK_INDICES);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateDOM = useCallback((indices: MarketIndex[]) => {
    if (!containerRef.current) return;
    // Update text content in-place without re-rendering (preserves CSS animation)
    const items = containerRef.current.querySelectorAll('[data-symbol]');
    items.forEach((el) => {
      const symbol = el.getAttribute('data-symbol');
      const idx = indices.find((i) => i.symbol === symbol);
      if (!idx) return;
      const valueEl = el.querySelector('[data-field="value"]');
      const changeEl = el.querySelector('[data-field="change"]');
      const statusEl = el.querySelector('[data-field="status"]');
      if (valueEl) {
        valueEl.textContent = idx.value.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      }
      if (changeEl) {
        changeEl.textContent = `${idx.changePercent >= 0 ? '▲' : '▼'} ${Math.abs(idx.changePercent).toFixed(2)}%`;
        changeEl.className = cn(
          'font-medium',
          idx.changePercent >= 0 ? 'text-terminal-green' : 'text-terminal-red'
        );
      }
      if (statusEl && symbol) {
        const open = isMarketOpen(symbol);
        statusEl.className = cn(
          'inline-block h-1.5 w-1.5 rounded-full',
          open ? 'bg-green-500' : 'bg-slate-300'
        );
        statusEl.setAttribute('title', open ? 'Market Open' : 'Market Closed');
      }
    });
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    async function fetchIndices() {
      try {
        const res = await fetch('/api/market-indices');
        if (!res.ok) return;
        const data = await res.json();
        if (data.indices?.length) {
          const liveMap = new Map<string, MarketIndex>();
          for (const idx of data.indices) {
            liveMap.set(idx.symbol, idx);
          }
          const merged = FALLBACK_INDICES.map((fb) => liveMap.get(fb.symbol) ?? fb);
          indicesRef.current = merged;
          updateDOM(merged);
        }
      } catch {
        // Keep fallback data
      }
    }

    fetchIndices();
    interval = setInterval(fetchIndices, 60_000);

    // Update market status dots every minute
    const statusInterval = setInterval(() => {
      updateDOM(indicesRef.current);
    }, 60_000);

    return () => {
      clearInterval(interval);
      clearInterval(statusInterval);
    };
  }, [updateDOM]);

  const indices = indicesRef.current;

  return (
    <div
      className={cn(
        'overflow-hidden border-t border-slate-200 bg-white/90 py-2',
        className
      )}
      aria-label="MENA market indices"
    >
      <div
        ref={containerRef}
        className="inline-flex w-max animate-market-ticker whitespace-nowrap font-mono text-ticker will-change-transform"
      >
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center">
            {indices.map((idx, i) => (
              <span
                key={`${idx.symbol}-${dup}-${i}`}
                data-symbol={idx.symbol}
                className="flex items-center gap-1.5 pl-6"
              >
                {FLAG_BY_SYMBOL[idx.symbol] && (
                  <img
                    src={FLAG_BY_SYMBOL[idx.symbol]}
                    alt=""
                    width={20}
                    height={14}
                    className="inline-block rounded-sm border border-slate-200"
                    aria-hidden="true"
                  />
                )}
                <span
                  data-field="status"
                  className={cn(
                    'inline-block h-1.5 w-1.5 rounded-full',
                    isMarketOpen(idx.symbol) ? 'bg-green-500' : 'bg-slate-300'
                  )}
                  title={isMarketOpen(idx.symbol) ? 'Market Open' : 'Market Closed'}
                  aria-label={isMarketOpen(idx.symbol) ? `${idx.name} market open` : `${idx.name} market closed`}
                />
                <span className="font-semibold text-slate-700">{idx.name}</span>
                <span data-field="value" className="text-slate-500">
                  {idx.value.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
                <span
                  data-field="change"
                  className={cn(
                    'font-medium',
                    idx.changePercent >= 0 ? 'text-terminal-green' : 'text-terminal-red'
                  )}
                >
                  {idx.changePercent >= 0 ? '▲' : '▼'}{' '}
                  {Math.abs(idx.changePercent).toFixed(2)}%
                </span>
                <span className="text-slate-300">|</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
