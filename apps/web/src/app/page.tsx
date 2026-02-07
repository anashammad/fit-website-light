import type { Metadata } from 'next';
import Image from 'next/image';
import { buildMetadata } from '@/lib/metadata';
import { HeroSection } from '@/components/organisms/HeroSection';
import { TrustBar } from '@/components/organisms/TrustBar';
import { FeatureGrid } from '@/components/organisms/FeatureGrid';
import { CTABanner } from '@/components/organisms/CTABanner';
import { ProductCard } from '@/components/molecules/ProductCard';
import { SolutionCard } from '@/components/molecules/SolutionCard';
import { Heading, Text, ButtonLink, AnimateIn } from '@/components/atoms';

// -- SEO metadata --
const baseMeta = buildMetadata({
  title: 'FIT — Institutional-Grade Trading Technology',
  description:
    'FIT delivers order management, surveillance, and backoffice systems that power brokerage houses, exchanges, banks, and regulators across MENA.',
  path: '/',
  absoluteTitle: true,
});
export const metadata: Metadata = {
  ...baseMeta,
  title: { absolute: 'FIT — Institutional-Grade Trading Technology' },
};

// -- Static data --

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
      'Multi-portfolio, multi-currency fund administration with NAV calculation and performance analytics.',
    icon: 'fund',
    href: '/products/fund-management',
  },
  {
    name: 'IPO Manager',
    description:
      'Centralized IPO subscription management with real-time monitoring and allotment scenarios.',
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

const solutions = [
  {
    name: 'Brokerage Houses',
    description: 'Complete trading infrastructure from front office to compliance.',
    icon: 'brokerage',
    href: '/solutions/brokerage',
  },
  {
    name: 'Exchanges',
    description: 'Market connectivity, surveillance, and member management technology.',
    icon: 'exchange',
    href: '/solutions/exchanges',
  },
  {
    name: 'Banks',
    description: 'Secure, auditable trading and investment management systems.',
    icon: 'bank',
    href: '/solutions/banks',
  },
  {
    name: 'Regulators',
    description: 'Oversight tools for market monitoring and compliance enforcement.',
    icon: 'regulator',
    href: '/solutions/regulators',
  },
];

// TODO: Replace with CMS data from SiteSettings global
const trustStats = [
  { value: '25+', label: 'Years in Market' },
  { value: '29+', label: 'Institutions Served' },
  { value: '1M+', label: 'Daily Transactions' },
  { value: '99.9%', label: 'Uptime' },
];

const trustLogos = [
  { name: 'QNB', src: '/images/logos/qnb.svg' },
  { name: 'ADCB', src: '/images/logos/adcb.svg' },
  { name: 'NBO', src: '/images/logos/nbo.svg' },
  { name: 'Ubhar Capital', src: '/images/logos/ubhar.svg' },
  { name: 'Bank Dhofar', src: '/images/logos/bankdhofar.svg' },
  { name: 'SICO', src: '/images/logos/sico.svg' },
];

// -- Page component --

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'FIT',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fitoman.com',
  logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fitoman.com'}/images/logo.png`,
  description:
    'Institutional-grade trading technology for financial markets. OMS, API middleware, backoffice, surveillance, and trading platforms.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Muscat',
    addressRegion: 'Muscat',
    addressCountry: 'OM',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+968-24-700-454',
    email: 'info@fitmena.com',
    contactType: 'sales',
  },
  areaServed: {
    '@type': 'GeoShape',
    name: 'MENA Region',
  },
  sameAs: ['https://www.linkedin.com/company/fitoman'],
};

export default function HomePage() {
  return (
    <>
      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* Hero */}
      <HeroSection
        variant="primary"
        overline="TRADING TECHNOLOGY"
        title="Institutional-Grade Trading Technology for Financial Markets"
        subtitle="Powering the future of capital markets across the Middle East and North Africa with battle-tested trading infrastructure trusted by 30+ institutions since 1999."
        ctas={[
          { label: 'Request a Demo', href: '/contact', variant: 'primary' },
          { label: 'Explore Products', href: '#products', variant: 'secondary' },
        ]}
        image="/images/products/fit-premium-dark.png"
        imageAlt="FIT Premium trading platform — dark theme multi-market OMS"
      />

      {/* Trust Bar */}
      <TrustBar stats={trustStats} logos={trustLogos} />

      {/* Why FIT */}
      <section className="section-padding bg-primary">
        <div className="container-content">
          <AnimateIn>
          <Text variant="overline" className="text-accent">
            WHY FIT
          </Text>
          <Heading level={2} className="mt-2 text-white">
            The Competitive Advantage
          </Heading>
          </AnimateIn>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: '25+ Years of MENA Expertise',
                description:
                  'Deep understanding of regional exchanges, regulations, and market structure built over two decades of serving GCC capital markets.',
              },
              {
                title: 'End-to-End Platform',
                description:
                  'From order entry to settlement, surveillance to onboarding — one integrated suite replacing fragmented multi-vendor stacks.',
              },
              {
                title: 'Sharia-Compliant by Design',
                description:
                  'Islamic finance workflows built into every module from the ground up, not bolted on as an afterthought.',
              },
              {
                title: 'Proven at Scale',
                description:
                  '1M+ daily transactions, 99.9% uptime, powering 90% of Oman\u2019s brokerage market with institutional-grade reliability.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-terminal-border bg-surface p-6 transition-all duration-300 hover:border-accent/15"
              >
                <Heading level={4} className="text-base text-white">
                  {item.title}
                </Heading>
                <Text variant="body-sm" className="mt-3 text-gray-400">
                  {item.description}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="section-padding bg-surface">
        <div className="container-content">
          <AnimateIn>
          <Text variant="overline" className="text-accent">
            OUR PRODUCTS
          </Text>
          <Heading level={2} className="mt-2 text-white">
            Full-Stack Trading Technology Suite
          </Heading>
          </AnimateIn>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.href} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="section-padding bg-primary">
        <div className="container-content">
          <AnimateIn>
          <Text variant="overline" className="text-accent">
            SOLUTIONS
          </Text>
          <Heading level={2} className="mt-2 text-white">
            Tailored for Your Industry
          </Heading>
          </AnimateIn>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.map((solution) => (
              <SolutionCard key={solution.href} {...solution} />
            ))}
          </div>
        </div>
      </section>

      {/* Technology Highlight */}
      <section className="section-padding bg-surface">
        <div className="container-content">
          <div className="flex flex-col items-center gap-12 lg:flex-row">
            {/* Text */}
            <AnimateIn className="lg:w-1/2">
              <Text variant="overline" className="text-accent">
                TECHNOLOGY
              </Text>
              <Heading level={2} className="mt-2 text-white">
                Built for Scale, Speed, and Security
              </Heading>
              <Text variant="body-lg" className="mt-4 text-gray-400">
                FIT&apos;s modular architecture supports on-premise, cloud, and
                hybrid deployments. Every component is designed for
                high-availability and low-latency execution.
              </Text>
              <ul className="mt-6 flex flex-col gap-3">
                {[
                  'Microservices architecture with independent scaling',
                  'FIX 4.2/4.4/5.0, REST, and WebSocket protocols',
                  'Enterprise-grade encryption and access controls',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="mt-0.5 shrink-0 text-terminal-green"
                      aria-hidden="true"
                    >
                      <path
                        d="M16.667 5L7.5 14.167 3.333 10"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <Text variant="body" as="span" className="text-gray-300">
                      {item}
                    </Text>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <ButtonLink variant="secondary" href="/technology/architecture">
                  Our Technology &rarr;
                </ButtonLink>
              </div>
            </AnimateIn>

            {/* Diagram */}
            <AnimateIn variant="fade-right" delay={200} className="lg:w-1/2">
              <Image
                src="/images/architecture-diagram.svg"
                alt="FIT platform architecture overview"
                width={560}
                height={400}
                className="h-auto w-full rounded-lg border border-terminal-border"
              />
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner
        heading="Ready to modernize your trading infrastructure?"
        subtext="Talk to our team about how FIT can power your operations."
        buttonLabel="Contact Us"
        buttonHref="/contact"
        secondaryLabel="Book a Demo"
        secondaryHref="/contact?type=demo"
      />
    </>
  );
}
