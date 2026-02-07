import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { Header, type NavItem } from '@/components/organisms/Header';
import { Footer, type FooterColumn } from '@/components/organisms/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'FIT — Trading Technology',
    template: '%s | FIT — Trading Technology',
  },
  description:
    'Institutional-grade trading technology for financial markets. OMS, API middleware, backoffice, surveillance, and trading platforms.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fitoman.com'
  ),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'FIT',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const navItems: NavItem[] = [
  {
    label: 'Products',
    children: [
      { label: 'FIT Premium (OMS)', href: '/products/fit-premium', description: 'Order management for brokerage houses' },
      { label: 'Wasata Backoffice', href: '/products/wasata-backoffice', description: 'Margin, CRM, AML & compliance' },
      { label: 'Investor Vision', href: '/products/investor-vision', description: 'Portfolio & fund management' },
      { label: 'Mobile & Web Trading', href: '/products/mobile-web-trading', description: 'Customized trading apps' },
      { label: 'FIT Surveillance', href: '/products/fit-surveillance', description: 'Market control & order surveillance' },
      { label: 'Digital Onboarding', href: '/products/digital-onboarding', description: 'Digital KYC & account opening' },
      { label: 'API Middleware', href: '/products/api-middleware', description: 'Trading APIs & integration layer' },
      { label: 'Fund Management', href: '/products/fund-management', description: 'Multi-fund administration & NAV' },
      { label: 'IPO Manager', href: '/products/ipo-manager', description: 'IPO subscription & allotment' },
      { label: 'Banking Gateway', href: '/products/banking-gateway', description: 'Bank-brokerage fund transfers' },
    ],
  },
  {
    label: 'Solutions',
    children: [
      { label: 'For Brokerage Houses', href: '/solutions/brokerage', description: 'End-to-end brokerage technology' },
      { label: 'For Exchanges', href: '/solutions/exchanges', description: 'Surveillance & connectivity' },
      { label: 'For Banks', href: '/solutions/banks', description: 'Trading infrastructure for banks' },
      { label: 'For Regulators', href: '/solutions/regulators', description: 'Compliance & monitoring tools' },
    ],
  },
  {
    label: 'Technology',
    children: [
      { label: 'Architecture', href: '/technology/architecture', description: 'Scalable infrastructure design' },
      { label: 'APIs & Integration', href: '/technology/apis', description: 'FIX, REST & WebSocket APIs' },
      { label: 'Security', href: '/technology/security', description: 'Enterprise-grade security' },
      { label: 'Performance', href: '/technology/performance', description: 'Low-latency, high-throughput' },
    ],
  },
  {
    label: 'About',
    children: [
      { label: 'Our Story', href: '/about', description: 'Company history & mission' },
      { label: 'Leadership', href: '/about/leadership', description: 'Meet our team' },
      { label: 'Clients & Partners', href: '/about/clients', description: 'Who trusts FIT' },
    ],
  },
  { label: 'Blog', href: '/blog' },
  { label: 'Careers', href: '/careers' },
];

const footerColumns: FooterColumn[] = [
  {
    title: 'Products',
    links: [
      { label: 'FIT Premium (OMS)', href: '/products/fit-premium' },
      { label: 'Wasata Backoffice', href: '/products/wasata-backoffice' },
      { label: 'Investor Vision', href: '/products/investor-vision' },
      { label: 'Mobile & Web Trading', href: '/products/mobile-web-trading' },
      { label: 'FIT Surveillance', href: '/products/fit-surveillance' },
      { label: 'Digital Onboarding', href: '/products/digital-onboarding' },
      { label: 'API Middleware', href: '/products/api-middleware' },
      { label: 'Fund Management', href: '/products/fund-management' },
      { label: 'IPO Manager', href: '/products/ipo-manager' },
      { label: 'Banking Gateway', href: '/products/banking-gateway' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Brokerage Houses', href: '/solutions/brokerage' },
      { label: 'Exchanges', href: '/solutions/exchanges' },
      { label: 'Banks', href: '/solutions/banks' },
      { label: 'Regulators', href: '/solutions/regulators' },
    ],
  },
  {
    title: 'Technology',
    links: [
      { label: 'Architecture', href: '/technology/architecture' },
      { label: 'APIs & Integration', href: '/technology/apis' },
      { label: 'Security', href: '/technology/security' },
      { label: 'Performance', href: '/technology/performance' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Leadership', href: '/about/leadership' },
      { label: 'Careers', href: '/careers' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
    ],
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-secondary focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <Header items={navItems} />
        <main id="main-content">{children}</main>
        <Footer columns={footerColumns} />
      </body>
    </html>
  );
}
