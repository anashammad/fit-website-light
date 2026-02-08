import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'FIT — Institutional-Grade Trading Technology';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #002B7F 0%, #001a4d 50%, #002B7F 100%)',
          fontFamily: 'Arial, Helvetica, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 120,
            height: 120,
            borderRadius: 20,
            background: '#D4A843',
            marginBottom: 32,
          }}
        >
          <span style={{ fontSize: 64, fontWeight: 800, color: '#FFFFFF' }}>FIT</span>
        </div>
        <span
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: '#FFFFFF',
            textAlign: 'center',
            marginBottom: 16,
          }}
        >
          Institutional-Grade Trading Technology
        </span>
        <span
          style={{
            fontSize: 24,
            color: 'rgba(255,255,255,0.7)',
          }}
        >
          www.fitoman.com
        </span>
      </div>
    ),
    { ...size }
  );
}
