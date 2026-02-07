import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container-content flex min-h-[60vh] flex-col items-center justify-center bg-primary text-center">
      <h1 className="text-h1 text-white">404</h1>
      <p className="mt-4 text-body-lg text-gray-400">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded bg-accent px-6 py-3 text-body font-semibold text-primary hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
      >
        Back to Home
      </Link>
    </div>
  );
}
