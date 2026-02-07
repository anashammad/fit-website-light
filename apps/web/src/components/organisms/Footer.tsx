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

const offices = [
  {
    country: 'Oman (HQ)',
    phone: '+968 24 700 454',
    address: 'P.O. Box 629, PC 112 Ruwi, Muscat',
  },
  {
    country: 'UAE',
    phone: '+971 43 055 390',
    address: 'P.O. Box 120804, Dubai',
  },
  {
    country: 'Jordan',
    phone: '+962 62 005 544',
    address: 'P.O. Box 930333, PC 11193 Amman',
  },
];

export function Footer({
  columns,
  tagline = 'Institutional-grade trading technology for financial markets.',
  copyright = `\u00A9 ${new Date().getFullYear()} FIT. All rights reserved.`,
}: FooterProps) {
  return (
    <footer className="bg-primary-dark border-t border-transparent relative" role="contentinfo">
      {/* Gold gradient top border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" aria-hidden="true" />
      <div className="container-content pt-16 pb-8">
        {/* Logo + tagline */}
        <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Logo variant="light" />
            <p className="mt-3 max-w-xs text-body-sm text-gray-500">{tagline}</p>
            <a
              href="mailto:info@fitmena.com"
              className="mt-3 inline-block text-body-sm text-accent hover:text-accent-light transition-colors"
            >
              info@fitmena.com
            </a>
          </div>

          {/* Office locations */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {offices.map((office) => (
              <div key={office.country} className="text-body-sm">
                <span className="font-semibold text-white">{office.country}</span>
                <p className="mt-1 text-gray-500">{office.address}</p>
                <a
                  href={`tel:${office.phone.replace(/\s/g, '')}`}
                  className="mt-1 inline-block font-mono text-ticker text-gray-400 hover:text-accent transition-colors"
                >
                  {office.phone}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mb-10 h-px bg-gradient-to-r from-transparent via-terminal-border to-transparent" />

        {/* Columns */}
        <nav aria-label="Footer navigation">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="mb-4 text-overline font-semibold tracking-wider text-accent/70">
                  {col.title}
                </h3>
                <ul className="flex flex-col gap-2">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-body-sm text-gray-500 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent/40"
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
        <div className="mt-12 border-t border-terminal-border pt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-caption text-gray-500">{copyright}</p>
          <p className="text-caption text-gray-500">
            Trusted by 29+ institutions across MENA since 1999
          </p>
        </div>
      </div>
    </footer>
  );
}
