import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { HeroSection } from '@/components/organisms/HeroSection';
import { CTABanner } from '@/components/organisms/CTABanner';
import { Heading, Text, Icon } from '@/components/atoms';
import { SITE_URL, buildMetadata, buildBreadcrumbSchema } from '@/lib/metadata';

/* -------------------------------------------------------------------------- */
/*  Solution data                                                              */
/* -------------------------------------------------------------------------- */

interface PainPoint {
  icon: string;
  title: string;
  description: string;
}

interface SolutionMapping {
  painPoint: string;
  capability: string;
}

interface ProductLink {
  name: string;
  description: string;
  href: string;
  icon: string;
}

interface ResultItem {
  metric: string;
  description: string;
}

interface SolutionData {
  slug: string;
  overline: string;
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  painPoints: PainPoint[];
  solutionIntro: string;
  solutionMappings: SolutionMapping[];
  products: ProductLink[];
  results: ResultItem[];
  ctaHeading: string;
  ctaButtonLabel: string;
  ctaSecondaryLabel?: string;
}

const solutions: Record<string, SolutionData> = {
  brokerage: {
    slug: 'brokerage',
    overline: 'Solutions for Brokerage Houses',
    title: 'Run a Faster, Compliant, More Profitable Brokerage',
    subtitle:
      'FIT gives brokerage houses the full technology stack — from order management and client apps to backoffice operations and surveillance — so you can focus on growing your business.',
    metaTitle: 'Trading Technology for Brokerage Houses',
    metaDescription:
      'FIT provides brokerages with OMS, backoffice, surveillance, and trading apps in one platform. Reduce costs, stay compliant, and scale operations.',
    painPoints: [
      {
        icon: 'puzzle',
        title: 'Disconnected systems',
        description:
          'Multiple vendors for OMS, backoffice, and client apps create data silos, reconciliation overhead, and integration fragility.',
      },
      {
        icon: 'clipboard',
        title: 'Manual operational processes',
        description:
          'Margin calls, client onboarding, and compliance checks still rely on spreadsheets and manual handoffs, slowing your team down.',
      },
      {
        icon: 'shield',
        title: 'Growing compliance burden',
        description:
          'Regulatory requirements expand every year. Without automated surveillance and reporting, your compliance team is always playing catch-up.',
      },
      {
        icon: 'trending-up',
        title: 'Scaling without breaking',
        description:
          'As client numbers and order volumes grow, your infrastructure needs to keep pace without proportional increases in headcount or cost.',
      },
    ],
    solutionIntro:
      'FIT provides a unified platform covering front, middle, and back office — reducing total cost of ownership and eliminating the integration overhead of a multi-vendor stack.',
    solutionMappings: [
      {
        painPoint: 'Disconnected systems',
        capability:
          'A single platform with shared data models across OMS, backoffice, surveillance, and client apps.',
      },
      {
        painPoint: 'Manual processes',
        capability:
          'Automated margin management, client onboarding workflows, and AML screening through Wasata Backoffice.',
      },
      {
        painPoint: 'Compliance burden',
        capability:
          'Real-time trade surveillance with pre-built detection rules and automated regulatory reporting via FIT Surveillance.',
      },
      {
        painPoint: 'Scaling challenges',
        capability:
          'Modular architecture that scales horizontally — add capacity without re-platforming.',
      },
    ],
    products: [
      {
        name: 'FIT Premium',
        description:
          'Multi-market order management with sub-second order routing and full execution visibility.',
        href: '/products/fit-premium',
        icon: 'terminal',
      },
      {
        name: 'Wasata Backoffice',
        description:
          'Modular backoffice suite covering margins, CRM, AML compliance, and fund administration.',
        href: '/products/wasata-backoffice',
        icon: 'server',
      },
      {
        name: 'FIT Surveillance',
        description:
          'Real-time trade monitoring with automated detection rules and audit trail generation.',
        href: '/products/fit-surveillance',
        icon: 'eye',
      },
      {
        name: 'Mobile & Web Trading',
        description:
          'White-label trading apps for your clients, fully branded and ready to deploy.',
        href: '/products/mobile-web-trading',
        icon: 'smartphone',
      },
    ],
    results: [
      {
        metric: 'Unified platform',
        description:
          'Replace multiple vendors with one integrated stack covering front-to-back operations.',
      },
      {
        metric: 'Faster onboarding',
        description:
          'Automated client onboarding and KYC reduce manual steps and time-to-trade.',
      },
      {
        metric: 'Real-time compliance',
        description:
          'Continuous surveillance and automated reporting keep you ahead of regulatory requirements.',
      },
      {
        metric: 'Lower TCO',
        description:
          'Single vendor, shared infrastructure, and modular licensing reduce total cost of ownership.',
      },
    ],
    ctaHeading: 'Ready to modernize your brokerage technology?',
    ctaButtonLabel: 'Request a Demo',
    ctaSecondaryLabel: 'Talk to Our Brokerage Team',
  },

  exchanges: {
    slug: 'exchanges',
    overline: 'Solutions for Exchanges',
    title: 'Surveillance and Connectivity Tools for Exchange Operators',
    subtitle:
      'FIT provides exchange operators with trade surveillance and member connectivity tools that support market integrity obligations and simplify data distribution to participants.',
    metaTitle: 'Exchange Solutions',
    metaDescription:
      'FIT helps exchange operators maintain market integrity with real-time trade surveillance and member connectivity through API middleware.',
    painPoints: [
      {
        icon: 'eye',
        title: 'Market abuse monitoring obligations',
        description:
          'Exchanges must detect and report suspicious activity in real time to maintain fair and orderly markets.',
      },
      {
        icon: 'link',
        title: 'Member firm connectivity',
        description:
          'Connecting and managing data flows to diverse member firms with different protocols and systems adds operational complexity.',
      },
      {
        icon: 'file-text',
        title: 'Regulatory reporting',
        description:
          'Producing timely, accurate surveillance reports for regulators requires robust audit trails and configurable alerting.',
      },
    ],
    solutionIntro:
      'FIT focuses on two critical exchange needs: real-time surveillance to detect market abuse, and a middleware layer that simplifies member connectivity and data distribution.',
    solutionMappings: [
      {
        painPoint: 'Market abuse monitoring',
        capability:
          'FIT Surveillance provides real-time detection with pre-built rules for spoofing, layering, and insider trading patterns.',
      },
      {
        painPoint: 'Member connectivity',
        capability:
          'API Middleware supports FIX, REST, and WebSocket protocols to connect member firms without custom integrations per participant.',
      },
      {
        painPoint: 'Regulatory reporting',
        capability:
          'Automated audit trail generation and configurable surveillance reports aligned with local market regulations.',
      },
    ],
    products: [
      {
        name: 'FIT Surveillance',
        description:
          'Real-time trade monitoring with automated detection rules and regulatory report generation.',
        href: '/products/fit-surveillance',
        icon: 'eye',
      },
      {
        name: 'API Middleware',
        description:
          'Unified connectivity layer supporting FIX, REST, and WebSocket for member firms and data consumers.',
        href: '/products/api-middleware',
        icon: 'code',
      },
    ],
    results: [
      {
        metric: 'Real-time detection',
        description:
          'Automated surveillance flags suspicious patterns as they happen, not hours or days later.',
      },
      {
        metric: 'Simplified connectivity',
        description:
          'One middleware layer handles diverse member protocols without per-firm custom integrations.',
      },
      {
        metric: 'Audit-ready reporting',
        description:
          'Complete audit trails and configurable regulatory reports reduce exam preparation time.',
      },
    ],
    ctaHeading: 'Want to discuss your exchange surveillance and connectivity needs?',
    ctaButtonLabel: 'Contact Our Team',
    ctaSecondaryLabel: 'Learn About Exchange Surveillance',
  },

  banks: {
    slug: 'banks',
    overline: 'Solutions for Banks',
    title: 'Secure, Compliant Trading Infrastructure for Banks',
    subtitle:
      'FIT helps banks modernize their trading operations with secure, compliant technology that integrates with existing banking infrastructure.',
    metaTitle: 'Trading Technology for Banks',
    metaDescription:
      'FIT provides banks with secure OMS, API connectivity, and trade surveillance that integrate with existing core banking systems.',
    painPoints: [
      {
        icon: 'clock',
        title: 'Legacy trading systems',
        description:
          'Aging platforms are costly to maintain, difficult to integrate, and unable to meet modern performance and compliance demands.',
      },
      {
        icon: 'shield',
        title: 'Compliance complexity',
        description:
          'Banks face overlapping regulatory obligations across trading, AML, and data security that require coordinated technology.',
      },
      {
        icon: 'link',
        title: 'Integration with core banking',
        description:
          'New trading technology must integrate with existing core banking, risk, and settlement systems without disrupting operations.',
      },
      {
        icon: 'lock',
        title: 'Security requirements',
        description:
          'Banking-grade security standards demand encryption, access controls, and audit logging across every component.',
      },
    ],
    solutionIntro:
      'FIT provides an API-first trading platform with enterprise-grade security, regulatory compliance built into every layer, and the integration flexibility banks need.',
    solutionMappings: [
      {
        painPoint: 'Legacy systems',
        capability:
          'Modern OMS with sub-second order routing and a modular architecture that replaces aging platforms incrementally.',
      },
      {
        painPoint: 'Compliance complexity',
        capability:
          'Integrated surveillance and AML screening aligned with MENA regulatory frameworks.',
      },
      {
        painPoint: 'Core banking integration',
        capability:
          'API Middleware supports FIX, REST, and WebSocket for seamless connectivity to existing banking systems.',
      },
      {
        painPoint: 'Security requirements',
        capability:
          'End-to-end encryption, role-based access controls, and comprehensive audit logging across all products.',
      },
    ],
    products: [
      {
        name: 'FIT Premium',
        description:
          'Institutional-grade order management with multi-market routing and real-time execution analytics.',
        href: '/products/fit-premium',
        icon: 'terminal',
      },
      {
        name: 'API Middleware',
        description:
          'Unified connectivity layer for integrating with core banking, exchanges, and counterparties.',
        href: '/products/api-middleware',
        icon: 'code',
      },
      {
        name: 'FIT Surveillance',
        description:
          'Real-time monitoring and regulatory reporting to meet banking compliance obligations.',
        href: '/products/fit-surveillance',
        icon: 'eye',
      },
    ],
    results: [
      {
        metric: 'Modern infrastructure',
        description:
          'Replace legacy trading systems with a performant, maintainable platform.',
      },
      {
        metric: 'Banking-grade security',
        description:
          'Encryption, access controls, and audit trails that meet institutional security standards.',
      },
      {
        metric: 'Faster integration',
        description:
          'API-first architecture reduces integration timelines with core banking from months to weeks.',
      },
      {
        metric: 'Coordinated compliance',
        description:
          'Surveillance, AML, and reporting under one technology stack simplifies regulatory obligations.',
      },
    ],
    ctaHeading: 'Ready to modernize your bank\'s trading infrastructure?',
    ctaButtonLabel: 'Talk to Our Banking Team',
    ctaSecondaryLabel: 'Request a Security Overview',
  },

  regulators: {
    slug: 'regulators',
    overline: 'Solutions for Compliance & Regulatory Teams',
    title: 'Stay Ahead of Regulatory Requirements, Not Behind Them',
    subtitle:
      'FIT gives compliance teams at brokerages, banks, and asset managers the surveillance, AML screening, and reporting tools they need to meet regulatory obligations without drowning in manual processes.',
    metaTitle: 'Compliance & Surveillance Solutions',
    metaDescription:
      'FIT provides compliance teams with automated trade surveillance, AML screening, and regulatory reporting aligned with MENA frameworks.',
    painPoints: [
      {
        icon: 'alert-triangle',
        title: 'Growing regulatory burden',
        description:
          'Compliance requirements expand every year. Manual processes cannot keep pace with the volume of rules, reports, and audits.',
      },
      {
        icon: 'search',
        title: 'Manual surveillance processes',
        description:
          'Reviewing trades by hand or in spreadsheets means suspicious activity is caught late — or not at all.',
      },
      {
        icon: 'file-text',
        title: 'Audit preparation stress',
        description:
          'Pulling together audit trails and regulatory reports across disconnected systems takes weeks of preparation before every exam.',
      },
      {
        icon: 'bell',
        title: 'False positive overload',
        description:
          'Generic alerting rules generate noise, burying real risks in a flood of false positives that waste analyst time.',
      },
    ],
    solutionIntro:
      'FIT automates the core compliance workflows — trade monitoring, AML screening, and regulatory reporting — so your team can focus on genuine risks rather than manual data gathering.',
    solutionMappings: [
      {
        painPoint: 'Regulatory burden',
        capability:
          'Automated surveillance and reporting aligned with MENA regulatory frameworks (CMA, SCA, CBK requirements).',
      },
      {
        painPoint: 'Manual surveillance',
        capability:
          'FIT Surveillance monitors every trade in real time with pre-built detection rules for spoofing, layering, and insider trading.',
      },
      {
        painPoint: 'Audit preparation',
        capability:
          'Full audit trails and exportable regulatory reports reduce exam preparation from weeks to hours.',
      },
      {
        painPoint: 'False positive overload',
        capability:
          'Customizable alert thresholds and escalation workflows help analysts prioritize real risks.',
      },
    ],
    products: [
      {
        name: 'FIT Surveillance',
        description:
          'Real-time trade monitoring with configurable detection rules and automated regulatory reporting.',
        href: '/products/fit-surveillance',
        icon: 'eye',
      },
      {
        name: 'Wasata Backoffice — AML Module',
        description:
          'Automated AML screening, suspicious activity reporting, and ongoing due diligence workflows.',
        href: '/products/wasata-backoffice',
        icon: 'shield',
      },
    ],
    results: [
      {
        metric: 'Real-time monitoring',
        description:
          'Suspicious activity flagged as it happens, not discovered days or weeks later.',
      },
      {
        metric: 'Audit-ready in hours',
        description:
          'Complete audit trails and pre-built regulatory reports eliminate manual data gathering.',
      },
      {
        metric: 'Fewer false positives',
        description:
          'Configurable detection rules reduce noise so analysts focus on genuine risks.',
      },
      {
        metric: 'MENA regulatory alignment',
        description:
          'Detection rules and reporting formats aligned with CMA, SCA, and CBK requirements.',
      },
    ],
    ctaHeading: 'See how FIT can streamline your compliance operations',
    ctaButtonLabel: 'Request a Surveillance Demo',
    ctaSecondaryLabel: 'Download Compliance Overview',
  },
};

const slugs = Object.keys(solutions);

/* -------------------------------------------------------------------------- */
/*  Static generation                                                          */
/* -------------------------------------------------------------------------- */

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = solutions[slug];
  if (!data) return {};

  return buildMetadata({
    title: data.metaTitle,
    description: data.metaDescription,
    path: `/solutions/${slug}`,
  });
}

/* -------------------------------------------------------------------------- */
/*  Page component                                                             */
/* -------------------------------------------------------------------------- */

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = solutions[slug];
  if (!data) notFound();

  const solutionLabel = data.overline.replace('Solutions for ', '');
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Solutions', url: `${SITE_URL}/solutions` },
    { name: solutionLabel },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* Hero */}
      <HeroSection
        variant="page"
        overline={data.overline}
        title={data.title}
        subtitle={data.subtitle}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Solutions', href: '/solutions' },
          { label: data.overline.replace('Solutions for ', '') },
        ]}
        ctas={[
          { label: data.ctaButtonLabel, href: '/contact', variant: 'primary' },
        ]}
      />

      {/* Pain Points */}
      <section className="section-padding bg-white">
        <div className="container-content">
          <Text variant="overline" className="text-accent">
            Challenges
          </Text>
          <Heading level={2} className="mt-2">
            What you are dealing with
          </Heading>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {data.painPoints.map((point) => (
              <div
                key={point.title}
                className="flex gap-4 rounded-lg border border-terminal-border bg-white p-6 shadow-card"
              >
                <Icon
                  name={point.icon}
                  size={40}
                  className="shrink-0 text-accent"
                />
                <div>
                  <Heading level={4}>{point.title}</Heading>
                  <Text variant="body-sm" className="mt-2 text-slate-600">
                    {point.description}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Solution */}
      <section className="section-padding bg-gray-50">
        <div className="container-content">
          <Text variant="overline" className="text-accent">
            Our approach
          </Text>
          <Heading level={2} className="mt-2">
            How FIT addresses each challenge
          </Heading>
          <Text variant="body-lg" className="mt-4 max-w-3xl text-slate-600">
            {data.solutionIntro}
          </Text>
          <div className="mt-12 space-y-6">
            {data.solutionMappings.map((mapping, index) => (
              <div
                key={mapping.painPoint}
                className="flex flex-col gap-4 rounded-lg border border-terminal-border bg-white p-6 md:flex-row md:items-start"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 border border-accent/30 text-body font-semibold text-accent">
                  {index + 1}
                </div>
                <div>
                  <Heading level={4}>{mapping.painPoint}</Heading>
                  <Text variant="body-sm" className="mt-1 text-slate-600">
                    {mapping.capability}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Mapping */}
      <section className="section-padding bg-white">
        <div className="container-content">
          <Text variant="overline" className="text-accent">
            Products
          </Text>
          <Heading level={2} className="mt-2">
            FIT products for this solution
          </Heading>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.products.map((product) => (
              <Link
                key={product.name}
                href={product.href}
                className="group flex flex-col rounded-lg border border-terminal-border bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/20 shadow-card hover:shadow-card-hover"
              >
                <Icon
                  name={product.icon}
                  size={40}
                  className="text-accent"
                />
                <Heading level={4} className="mt-4">
                  {product.name}
                </Heading>
                <Text variant="body-sm" className="mt-2 text-slate-600">
                  {product.description}
                </Text>
                <span className="mt-auto pt-4 text-body-sm font-semibold text-accent transition-colors group-hover:text-accent-light">
                  Learn More &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Results / Outcomes */}
      <section className="section-padding bg-gray-50">
        <div className="container-content">
          <Text variant="overline" className="text-accent">
            Outcomes
          </Text>
          <Heading level={2} className="mt-2">
            What you can expect
          </Heading>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.results.map((result) => (
              <div key={result.metric} className="text-center">
                <Heading level={3} className="text-accent">
                  {result.metric}
                </Heading>
                <Text variant="body-sm" className="mt-2 text-slate-600">
                  {result.description}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner
        heading={data.ctaHeading}
        buttonLabel={data.ctaButtonLabel}
        buttonHref="/contact"
        secondaryLabel={data.ctaSecondaryLabel}
        secondaryHref="/contact"
      />
    </>
  );
}
