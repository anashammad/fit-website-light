'use client';

import { useEffect, useRef } from 'react';

export interface TradingViewTickerProps {
  className?: string;
}

const SYMBOLS = [
 
  { description: 'S&P 500', proName: 'FOREXCOM:SPXUSD' },
  { description: 'NASDAQ', proName: 'FOREXCOM:NSXUSD' },
  { description: 'EUR/USD', proName: 'FX_IDC:EURUSD' },
  { description: 'Gold', proName: 'TVC:GOLD' },
  { description: 'Silver', proName: 'TVC:SILVER' },
  { description: 'Brent Oil', proName: 'TVC:UKOIL' },
];

export function TradingViewTicker({ className }: TradingViewTickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear any previous widget
    container.innerHTML = '';

    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'tradingview-widget-container';

    const widgetInner = document.createElement('div');
    widgetInner.className = 'tradingview-widget-container__widget';
    widgetContainer.appendChild(widgetInner);

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.textContent = JSON.stringify({
      symbols: SYMBOLS,
      showSymbolLogo: true,
      isTransparent: true,
      displayMode: 'regular',
      colorTheme: 'light',
      locale: 'en',
    });

    widgetContainer.appendChild(script);
    container.appendChild(widgetContainer);

    return () => {
      if (container) container.innerHTML = '';
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      aria-label="Live market ticker"
    />
  );
}
