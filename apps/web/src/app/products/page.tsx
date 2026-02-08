import type { Metadata } from 'next';
import { Heading, Text, ButtonLink } from '@/components/atoms';
import { HeroSection } from '@/components/organisms/HeroSection';
import { CTABanner } from '@/components/organisms/CTABanner';
import { ProductCard } from '@/components/molecules/ProductCard';
import { SITE_URL, buildMetadata, buildBreadcrumbSchema } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Trading Technology Products',
  description:
    'Explore FIT products: OMS, backoffice, surveillance, portfolio management, mobile trading, digital onboarding, and API middleware for financial institutions.',
  path: '/products',
});

const products = [
  {
    name: 'FIT Premium (OMS)',
    description:
      'Multi-market order management system for brokerage houses. Built for speed with 10+ add-on modules.',
    icon: 'oms',
    href: '/products/fit-premium',
  },
  {
    name: 'Wasata Backoffice',
    description:
      'Modular back-office suite covering margin, CRM, AML compliance, and settlement operations.',
    icon: 'backoffice',
    href: '/products/wasata-backoffice',
  },
  {
    name: 'Investor Vision',
    description:
      'Portfolio management and fund administration system for asset managers and institutional investors.',
    icon: 'pie-chart',
    href: '/products/investor-vision',
  },
  {
    name: 'Mobile & Web Trading',
    description:
      'Customized white-label trading apps delivering fast, reliable execution on every device.',
    icon: 'mobile',
    href: '/products/mobile-web-trading',
  },
  {
    name: 'FIT Surveillance',
    description:
      'Real-time market control and order surveillance aligned with regulatory requirements.',
    icon: 'surveillance',
    href: '/products/fit-surveillance',
  },
  {
    name: 'Digital Onboarding',
    description:
      'End-to-end digital client onboarding with KYC, document collection, and instant account activation.',
    icon: 'user-check',
    href: '/products/digital-onboarding',
  },
  {
    name: 'API Middleware',
    description:
      'FIX, REST, and WebSocket connectivity layer that connects your systems to any exchange.',
    icon: 'api',
    href: '/products/api-middleware',
  },
  {
    name: 'Fund Management',
    description:
      'Multi-portfolio, multi-currency fund administration with NAV calculation, shareholder registry, and performance analytics.',
    icon: 'fund',
    href: '/products/fund-management',
  },
  {
    name: 'IPO Manager',
    description:
      'Centralized IPO subscription management with real-time progress monitoring and allotment scenario generation.',
    icon: 'ipo',
    href: '/products/ipo-manager',
  },
  {
    name: 'Banking Gateway',
    description:
      'Online fund transfers between bank and brokerage accounts with real-time reconciliation.',
    icon: 'bank',
    href: '/products/banking-gateway',
  },
];

export default function ProductsPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Products' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <HeroSection
        variant="page"
        title="Full-Stack Trading Technology Suite"
        subtitle="Ten integrated products covering order management, backoffice, surveillance, portfolio management, trading platforms, onboarding, connectivity, fund administration, IPO management, and banking integration."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Products' },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-content">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.href} {...product} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        heading="Need help choosing the right products?"
        subtext="Our team can help you identify the right combination for your institution."
        buttonLabel="Contact Us"
        buttonHref="/contact"
        secondaryLabel="Book a Demo"
        secondaryHref="/contact?type=demo"
      />
    </>
  );
}
