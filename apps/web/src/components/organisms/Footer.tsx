import Link from 'next/link';
import { Logo } from '@/components/atoms';

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface FooterProps {
  columns: FooterColumn[];
  tagline?: string;
  copyright?: string;
}

export function Footer({
  columns,
  tagline = 'Institutional-grade trading technology for financial markets.',
  copyright = `\u00A9 ${new Date().getFullYear()} FIT. All rights reserved.`,
}: FooterProps) {
  return (
    <footer className="bg-primary" role="contentinfo">
      <div className="container-content pt-16 pb-8">
        {/* Logo + tagline */}
        <div className="mb-10">
          <Logo variant="light" />
          <p className="mt-3 max-w-xs text-body-sm text-gray-400">{tagline}</p>
        </div>

        {/* Columns */}
        <nav aria-label="Footer navigation">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="mb-4 text-body-sm font-semibold text-white">
                  {col.title}
                </h3>
                <ul className="flex flex-col gap-2">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-body-sm text-gray-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-secondary/40"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>

        {/* Divider + copyright */}
        <div className="mt-12 border-t border-primary-light pt-6">
          <p className="text-caption text-gray-500">{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
