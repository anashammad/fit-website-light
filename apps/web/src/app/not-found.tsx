import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container-content flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-h1 text-gray-900">404</h1>
      <p className="mt-4 text-body-lg text-gray-500">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded bg-secondary px-6 py-3 text-body font-semibold text-white hover:bg-secondary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
      >
        Back to Home
      </Link>
    </div>
  );
}
