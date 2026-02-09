'use client';

import { useEffect, useState, useCallback } from 'react';
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

export function MENATickerTape({ className }: { className?: string }) {
  const [indices, setIndices] = useState<MarketIndex[]>(FALLBACK_INDICES);
  const [isLive, setIsLive] = useState(false);

  const fetchIndices = useCallback(async () => {
    try {
      const res = await fetch('/api/market-indices');
      if (!res.ok) return;
      const data = await res.json();
      if (data.indices?.length) {
        // Merge live data into fallback: replace matching symbols, keep rest as fallback
        const liveMap = new Map<string, MarketIndex>();
        for (const idx of data.indices) {
          liveMap.set(idx.symbol, idx);
        }
        const merged = FALLBACK_INDICES.map((fb) => liveMap.get(fb.symbol) ?? fb);
        setIndices(merged);
        setIsLive(true);
      }
    } catch {
      // Keep fallback data
    }
  }, []);

  useEffect(() => {
    fetchIndices();
    const interval = setInterval(fetchIndices, 60_000);
    return () => clearInterval(interval);
  }, [fetchIndices]);

  return (
    <div
      className={cn(
        'overflow-hidden border-t border-slate-200 bg-white/90 py-2',
        className
      )}
      aria-label="MENA market indices"
    >
      <div className="flex animate-market-ticker whitespace-nowrap font-mono text-ticker">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center gap-6 px-4">
            {indices.map((idx, i) => (
              <span key={`${idx.symbol}-${dup}-${i}`} className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-700">{idx.name}</span>
                <span className="text-slate-500">
                  {idx.value.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
                <span
                  className={cn(
                    'font-medium',
                    idx.changePercent >= 0
                      ? 'text-terminal-green'
                      : 'text-terminal-red'
                  )}
                >
                  {idx.changePercent >= 0 ? '▲' : '▼'}{' '}
                  {Math.abs(idx.changePercent).toFixed(2)}%
                </span>
                {i < indices.length - 1 && (
                  <span className="ml-4 text-slate-300">|</span>
                )}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
