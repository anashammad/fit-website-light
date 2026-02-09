import { NextResponse } from 'next/server';

export interface MarketIndex {
  name: string;
  symbol: string;
  value: number;
  change: number;
  changePercent: number;
  source: string;
}

// DFM — confirmed working public API
async function fetchDFM(): Promise<MarketIndex | null> {
  try {
    const res = await fetch('https://api2.dfm.ae/mw/v1/indices', {
      next: { revalidate: 60 },
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    const data: Array<{
      value: number;
      change: number;
      changepercentage: number;
    }> = await res.json();
    const latest = data[data.length - 1];
    if (!latest) return null;
    return {
      name: 'DFM',
      symbol: 'DFMGI',
      value: latest.value,
      change: latest.change,
      changePercent: latest.changepercentage,
      source: 'dfm.ae',
    };
  } catch {
    return null;
  }
}

// ADX — try their public market-data page API
async function fetchADX(): Promise<MarketIndex | null> {
  try {
    const res = await fetch(
      'https://www.adx.ae/api/market/indices',
      {
        next: { revalidate: 60 },
        headers: {
          Accept: 'application/json',
          'User-Agent': 'Mozilla/5.0',
        },
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    // Try to extract general index from response
    const idx = Array.isArray(data)
      ? data.find(
          (i: Record<string, string>) =>
            i.name?.toLowerCase().includes('general') ||
            i.symbol?.includes('ADI')
        )
      : data;
    if (!idx?.value && !idx?.last && !idx?.close) return null;
    return {
      name: 'ADX',
      symbol: 'FADX',
      value: idx.value ?? idx.last ?? idx.close,
      change: idx.change ?? 0,
      changePercent: idx.changePercent ?? idx.changepercentage ?? 0,
      source: 'adx.ae',
    };
  } catch {
    return null;
  }
}

// Saudi Exchange (Tadawul) — try their internal API
async function fetchTASI(): Promise<MarketIndex | null> {
  try {
    const res = await fetch(
      'https://www.saudiexchange.sa/wps/portal/saudiexchange/trading/market-watch/indices',
      {
        next: { revalidate: 60 },
        headers: {
          Accept: 'text/html',
          'User-Agent': 'Mozilla/5.0',
        },
      }
    );
    if (!res.ok) return null;
    const html = await res.text();
    // Try to extract TASI value from page data
    const match = html.match(
      /TASI[^}]*?"value"\s*:\s*"?([\d,.]+)"?[^}]*?"change"\s*:\s*"?([-\d,.]+)"?[^}]*?"changePercent(?:age)?"\s*:\s*"?([-\d,.]+)"?/i
    );
    if (!match) return null;
    return {
      name: 'TASI',
      symbol: 'TASI',
      value: parseFloat(match[1].replace(/,/g, '')),
      change: parseFloat(match[2].replace(/,/g, '')),
      changePercent: parseFloat(match[3].replace(/,/g, '')),
      source: 'saudiexchange.sa',
    };
  } catch {
    return null;
  }
}

// MSX Oman
async function fetchMSX(): Promise<MarketIndex | null> {
  try {
    const res = await fetch('https://www.msx.om/', {
      next: { revalidate: 60 },
      headers: {
        Accept: 'text/html',
        'User-Agent': 'Mozilla/5.0',
      },
    });
    if (!res.ok) return null;
    const html = await res.text();
    // MSX embeds index data — try to parse from page
    const match = html.match(
      /MSX\s*30[^}]*?([\d,.]+)[^}]*?([-+]?\d+\.?\d*)\s*%/i
    );
    if (!match) return null;
    const value = parseFloat(match[1].replace(/,/g, ''));
    const pct = parseFloat(match[2]);
    return {
      name: 'MSX 30',
      symbol: 'MSX30',
      value,
      change: (value * pct) / 100,
      changePercent: pct,
      source: 'msx.om',
    };
  } catch {
    return null;
  }
}

// QSE Qatar
async function fetchQSE(): Promise<MarketIndex | null> {
  try {
    const res = await fetch('https://www.qe.com.qa/home', {
      next: { revalidate: 60 },
      headers: {
        Accept: 'text/html',
        'User-Agent': 'Mozilla/5.0',
      },
    });
    if (!res.ok) return null;
    const html = await res.text();
    const match = html.match(
      /QSE\s*(?:All\s*Share|Index)[^}]*?([\d,.]+)[^}]*?([-+]?\d+\.?\d*)\s*%/i
    );
    if (!match) return null;
    const value = parseFloat(match[1].replace(/,/g, ''));
    const pct = parseFloat(match[2]);
    return {
      name: 'QSE',
      symbol: 'GNRI',
      value,
      change: (value * pct) / 100,
      changePercent: pct,
      source: 'qe.com.qa',
    };
  } catch {
    return null;
  }
}

// ASE Jordan
async function fetchASE(): Promise<MarketIndex | null> {
  try {
    const res = await fetch('https://www.ase.com.jo/en', {
      next: { revalidate: 60 },
      headers: {
        Accept: 'text/html',
        'User-Agent': 'Mozilla/5.0',
      },
    });
    if (!res.ok) return null;
    const html = await res.text();
    const match = html.match(
      /ASE\s*(?:General|Index)[^}]*?([\d,.]+)[^}]*?([-+]?\d+\.?\d*)\s*%/i
    );
    if (!match) return null;
    const value = parseFloat(match[1].replace(/,/g, ''));
    const pct = parseFloat(match[2]);
    return {
      name: 'ASE',
      symbol: 'AMGNRLX',
      value,
      change: (value * pct) / 100,
      changePercent: pct,
      source: 'ase.com.jo',
    };
  } catch {
    return null;
  }
}

// EGX Egypt
async function fetchEGX(): Promise<MarketIndex | null> {
  try {
    const res = await fetch(
      'https://www.egx.com.eg/en/homepage.aspx',
      {
        next: { revalidate: 60 },
        headers: {
          Accept: 'text/html',
          'User-Agent': 'Mozilla/5.0',
        },
      }
    );
    if (!res.ok) return null;
    const html = await res.text();
    const match = html.match(
      /EGX\s*30[^}]*?([\d,.]+)[^}]*?([-+]?\d+\.?\d*)\s*%/i
    );
    if (!match) return null;
    const value = parseFloat(match[1].replace(/,/g, ''));
    const pct = parseFloat(match[2]);
    return {
      name: 'EGX 30',
      symbol: 'EGX30',
      value,
      change: (value * pct) / 100,
      changePercent: pct,
      source: 'egx.com.eg',
    };
  } catch {
    return null;
  }
}

function isValid(idx: MarketIndex | null): idx is MarketIndex {
  if (!idx) return false;
  // Index value must be positive and realistic (>50)
  if (!idx.value || idx.value < 50) return false;
  // Change percent must be within realistic daily range
  if (Math.abs(idx.changePercent) > 15) return false;
  return true;
}

export async function GET() {
  const results = await Promise.allSettled([
    fetchDFM(),
    fetchADX(),
    fetchTASI(),
    fetchMSX(),
    fetchQSE(),
    fetchASE(),
    fetchEGX(),
  ]);

  const seen = new Set<string>();
  const indices: MarketIndex[] = results
    .map((r) => (r.status === 'fulfilled' ? r.value : null))
    .filter((v): v is MarketIndex => {
      if (!isValid(v)) return false;
      // Deduplicate by symbol
      if (seen.has(v.symbol)) return false;
      seen.add(v.symbol);
      return true;
    });

  return NextResponse.json(
    { indices, fetchedAt: new Date().toISOString() },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    }
  );
}
