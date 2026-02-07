import type { NextPageContext } from 'next';

interface ErrorProps {
  statusCode: number;
}

function ErrorPage({ statusCode }: ErrorProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: '3rem', color: '#111827' }}>{statusCode}</h1>
      <p style={{ marginTop: '1rem', fontSize: '1.125rem', color: '#6b7280' }}>
        {statusCode === 404
          ? 'The page you are looking for does not exist.'
          : 'An unexpected error occurred.'}
      </p>
      <a
        href="/"
        style={{ marginTop: '2rem', display: 'inline-flex', alignItems: 'center', borderRadius: '0.25rem', backgroundColor: '#0f4c81', padding: '0.75rem 1.5rem', fontWeight: 600, color: 'white', textDecoration: 'none' }}
      >
        Back to Home
      </a>
    </div>
  );
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? (err as { statusCode?: number }).statusCode ?? 500 : 404;
  return { statusCode };
};

export default ErrorPage;
