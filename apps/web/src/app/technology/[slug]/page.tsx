import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HeroSection } from '@/components/organisms/HeroSection';
import { FeatureGrid, type Feature } from '@/components/organisms/FeatureGrid';
import { CTABanner } from '@/components/organisms/CTABanner';
import { Heading, Text } from '@/components/atoms';
import { SITE_URL, buildMetadata, buildBreadcrumbSchema } from '@/lib/metadata';
import type { BreadcrumbItem } from '@/components/molecules/Breadcrumb';

/* ---------- Data types ---------- */

interface ContentSection {
  heading: string;
  description: string;
  items?: { label: string; detail: string }[];
}

interface TechnologyPageData {
  slug: string;
  overline: string;
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  sections: ContentSection[];
  features: Feature[];
  featureGridHeading: string;
  featureGridOverline: string;
  ctaHeading: string;
  ctaSubtext: string;
  ctaButton: string;
  ctaHref: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
}

/* ---------- Static content for all 4 technology pages ---------- */

const pages: Record<string, TechnologyPageData> = {
  architecture: {
    slug: 'architecture',
    overline: 'Technology',
    title: 'Modular, Scalable Architecture for Financial Markets',
    subtitle:
      "FIT's modular architecture lets institutions deploy exactly what they need — on-premise, in the cloud, or hybrid — with built-in high availability and disaster recovery.",
    metaTitle: 'Architecture & Infrastructure',
    metaDescription:
      'Microservices architecture with on-premise, cloud, and hybrid deployment. High availability and disaster recovery for financial-grade uptime.',
    featureGridOverline: 'Capabilities',
    featureGridHeading: 'Architecture that grows with your business',
    features: [
      {
        icon: 'grid',
        title: 'Microservices design',
        description:
          'Each product operates as an independent service. Deploy, update, or scale components without affecting the rest of the platform.',
      },
      {
        icon: 'cloud',
        title: 'Flexible deployment',
        description:
          'Run on-premise behind your firewall, in the cloud for rapid scaling, or hybrid to balance control and flexibility.',
      },
      {
        icon: 'refresh-cw',
        title: 'High availability',
        description:
          'Automatic failover across nodes and regions keeps your trading infrastructure online during hardware or network failures.',
      },
      {
        icon: 'shield',
        title: 'Disaster recovery',
        description:
          'Configurable RPO and RTO targets with automated backup, replication, and tested recovery procedures.',
      },
      {
        icon: 'layers',
        title: 'Independent scaling',
        description:
          'Scale order routing separately from surveillance, or backoffice separately from trading apps. Pay for capacity where you need it.',
      },
      {
        icon: 'check-circle',
        title: 'Financial-grade uptime',
        description:
          'Designed to meet the uptime requirements of exchanges, brokerages, and banks with SLA-backed availability targets.',
      },
    ],
    sections: [
      {
        heading: 'Microservices, not monoliths',
        description:
          "FIT's platform is composed of independently deployable services. Each product — FIT Premium, Wasata Backoffice, Order Surveillance, API Middleware, and Mobile & Web Trading — runs as its own service with its own data store and scaling policy. This means you can adopt one product today and add others later without rearchitecting.",
        items: [
          { label: 'Service isolation', detail: 'Each product runs in its own process with dedicated resources' },
          { label: 'Independent releases', detail: 'Update one product without downtime on others' },
          { label: 'Technology flexibility', detail: 'Each service uses the best tool for its job' },
        ],
      },
      {
        heading: 'Deploy your way',
        description:
          'Financial institutions have different infrastructure requirements. Some need full on-premise control for regulatory reasons. Others want the speed of cloud deployment. FIT supports both, plus hybrid models where sensitive components stay on-premise while less critical services run in the cloud.',
        items: [
          { label: 'On-premise', detail: 'Full deployment behind your firewall with your security policies' },
          { label: 'Cloud', detail: 'Managed deployment on major cloud providers for rapid scaling' },
          { label: 'Hybrid', detail: 'Mix on-premise and cloud based on sensitivity and performance needs' },
        ],
      },
      {
        heading: 'Built for uptime',
        description:
          'Trading infrastructure cannot go down during market hours. FIT provides automatic failover, data replication, and tested disaster recovery procedures to keep your operations running.',
        items: [
          { label: 'Automatic failover', detail: 'Instant switchover to standby nodes on failure detection' },
          { label: 'Data replication', detail: 'Synchronous replication across availability zones' },
          { label: 'Recovery testing', detail: 'Regular DR drills with documented recovery procedures' },
        ],
      },
    ],
    ctaHeading: 'Want to see the architecture in detail?',
    ctaSubtext: 'Our engineering team can walk you through deployment options for your environment.',
    ctaButton: 'Talk to Engineering',
    ctaHref: '/contact',
    ctaSecondaryLabel: 'Download Architecture Overview',
    ctaSecondaryHref: '/contact',
  },

  apis: {
    slug: 'apis',
    overline: 'Technology',
    title: 'Developer-Friendly APIs for Financial Systems',
    subtitle:
      'FIT supports FIX 4.2/4.4/5.0, REST, and WebSocket protocols with comprehensive documentation, sandbox environments, and dedicated integration support.',
    metaTitle: 'APIs & Integration',
    metaDescription:
      'Integrate with FIT using FIX 4.2/4.4/5.0, REST, and WebSocket APIs. Sandbox environments, comprehensive docs, and dedicated integration engineering support.',
    featureGridOverline: 'Integration capabilities',
    featureGridHeading: 'Connect to anything through standard protocols',
    features: [
      {
        icon: 'code',
        title: 'FIX protocol support',
        description:
          'Full support for FIX 4.2, 4.4, and 5.0 for exchange and broker connectivity. Battle-tested at institutional transaction volumes.',
      },
      {
        icon: 'zap',
        title: 'REST and WebSocket APIs',
        description:
          'Modern APIs for custom integrations, real-time data streaming, and third-party system connectivity.',
      },
      {
        icon: 'terminal',
        title: 'Sandbox environment',
        description:
          'Test your integrations in a production-like sandbox before going live. Simulate order flow, market data, and error conditions.',
      },
      {
        icon: 'book-open',
        title: 'Comprehensive documentation',
        description:
          'API references, code samples, integration guides, and architecture diagrams to get your team building fast.',
      },
      {
        icon: 'repeat',
        title: 'Protocol translation',
        description:
          'FIT API Middleware normalizes messages across protocols so your systems speak one language regardless of the counterparty.',
      },
      {
        icon: 'users',
        title: 'Integration engineering support',
        description:
          'Dedicated integration engineers help plan, build, and test your connectivity from kickoff to go-live.',
      },
    ],
    sections: [
      {
        heading: 'One integration layer, every protocol',
        description:
          "FIT API Middleware sits between your systems and the outside world — exchanges, banks, data providers, and counterparties. It handles protocol translation, message normalization, and connection management so your applications don't have to.",
        items: [
          { label: 'FIX 4.2 / 4.4 / 5.0', detail: 'Industry-standard exchange and broker connectivity' },
          { label: 'REST APIs', detail: 'Request-response APIs for operations, configuration, and reporting' },
          { label: 'WebSocket', detail: 'Real-time streaming for market data, order updates, and notifications' },
        ],
      },
      {
        heading: 'Built for developers',
        description:
          'Integration timelines shrink from months to weeks when documentation is clear, sandbox environments work, and support is responsive. FIT invests in developer experience because faster integration means faster time to value.',
        items: [
          { label: 'API reference docs', detail: 'Every endpoint documented with request/response examples' },
          { label: 'Code samples', detail: 'Working examples in popular languages to accelerate development' },
          { label: 'Sandbox access', detail: 'Production-like test environment available from day one' },
        ],
      },
      {
        heading: 'Proven at scale',
        description:
          'FIT APIs handle institutional transaction volumes in production every day. The middleware processes tens of thousands of messages per second with sub-second latency and 99.9%+ uptime.',
        items: [
          { label: 'Throughput', detail: 'Tens of thousands of messages per second sustained' },
          { label: 'Latency', detail: 'Sub-second message processing and routing' },
          { label: 'Reliability', detail: '99.9%+ uptime with automatic reconnection and failover' },
        ],
      },
    ],
    ctaHeading: 'Ready to start integrating?',
    ctaSubtext: 'Get sandbox access and talk to our integration engineering team.',
    ctaButton: 'Request Sandbox Access',
    ctaHref: '/contact',
    ctaSecondaryLabel: 'Explore API Documentation',
    ctaSecondaryHref: '/contact',
  },

  security: {
    slug: 'security',
    overline: 'Technology',
    title: 'Security Built for Financial-Grade Requirements',
    subtitle:
      'FIT implements end-to-end encryption, role-based access controls, and compliance frameworks aligned with MENA financial regulations to protect your operations and data.',
    metaTitle: 'Security & Compliance',
    metaDescription:
      'End-to-end encryption, role-based access, and MENA regulatory compliance built into every layer of FIT trading technology.',
    featureGridOverline: 'Security capabilities',
    featureGridHeading: 'Protection at every layer',
    features: [
      {
        icon: 'lock',
        title: 'End-to-end encryption',
        description:
          'All data encrypted in transit (TLS 1.3) and at rest (AES-256). No plaintext sensitive data at any point in the pipeline.',
      },
      {
        icon: 'users',
        title: 'Role-based access control',
        description:
          'Granular permissions by role, department, and function. Every action logged for audit purposes.',
      },
      {
        icon: 'file-text',
        title: 'Full audit trails',
        description:
          'Every user action, configuration change, and data access event is logged with timestamps and user identity.',
      },
      {
        icon: 'shield',
        title: 'Regulatory compliance',
        description:
          'Aligned with MENA financial regulations including CMA, SCA, and CBK requirements. Configurable to new regulatory frameworks.',
      },
      {
        icon: 'search',
        title: 'Security assessments',
        description:
          'Regular penetration testing, vulnerability scanning, and security code reviews by internal and external teams.',
      },
      {
        icon: 'settings',
        title: 'Secure development lifecycle',
        description:
          'Security is built into the development process — threat modeling, code review, dependency scanning, and automated testing.',
      },
    ],
    sections: [
      {
        heading: 'Data protection at every layer',
        description:
          'Financial data demands the highest level of protection. FIT encrypts all data in transit and at rest, enforces strict access controls, and maintains complete audit trails of every action taken in the system.',
        items: [
          { label: 'Transit encryption', detail: 'TLS 1.3 for all network communication between components' },
          { label: 'Storage encryption', detail: 'AES-256 encryption for all data at rest' },
          { label: 'Key management', detail: 'Hardware security modules (HSM) for cryptographic key storage' },
        ],
      },
      {
        heading: 'Access control and audit',
        description:
          'FIT provides role-based access control with granular permissions. Administrators define who can see, modify, and approve at every level — from individual orders to system configuration. Every action is logged.',
        items: [
          { label: 'Role-based permissions', detail: 'Define access by role, department, and function' },
          { label: 'Multi-factor authentication', detail: 'MFA enforced for all administrative access' },
          { label: 'Audit logging', detail: 'Immutable logs of every action with user, timestamp, and context' },
        ],
      },
      {
        heading: 'Regulatory alignment',
        description:
          'FIT is designed to meet the compliance requirements of financial regulators across the MENA region. The platform supports configurable compliance frameworks so institutions can adapt to evolving regulations without platform changes.',
        items: [
          { label: 'MENA regulatory frameworks', detail: 'Pre-configured for CMA, SCA, CBK, and DFSA requirements' },
          { label: 'Compliance reporting', detail: 'Automated generation of regulatory reports and audit packages' },
          { label: 'Configurable rules', detail: 'Adapt compliance checks to new regulations without code changes' },
        ],
      },
    ],
    ctaHeading: 'Need a detailed security overview?',
    ctaSubtext: 'Our team can provide security documentation and answer compliance questions.',
    ctaButton: 'Request Security Documentation',
    ctaHref: '/contact',
    ctaSecondaryLabel: 'Talk to Our Security Team',
    ctaSecondaryHref: '/contact',
  },

  performance: {
    slug: 'performance',
    overline: 'Technology',
    title: 'Built for Speed. Designed to Scale.',
    subtitle:
      "FIT's infrastructure handles tens of thousands of orders per second with sub-second latency and scales horizontally to meet growing transaction volumes.",
    metaTitle: 'Performance & Scalability',
    metaDescription:
      'Sub-second order routing, horizontal scaling, and institutional-grade throughput. FIT trading infrastructure grows with your business. See benchmarks.',
    featureGridOverline: 'Performance characteristics',
    featureGridHeading: 'Speed and scale without compromise',
    features: [
      {
        icon: 'zap',
        title: 'Sub-second latency',
        description:
          'Order routing and execution with sub-second processing times. Optimized message paths minimize overhead at every step.',
      },
      {
        icon: 'trending-up',
        title: 'Horizontal scaling',
        description:
          'Add capacity by adding nodes, not upgrading hardware. Scale order processing, market data, and surveillance independently.',
      },
      {
        icon: 'bar-chart-2',
        title: 'Institutional throughput',
        description:
          'Load-tested at tens of thousands of orders per second sustained. Burst capacity handles market-open spikes without degradation.',
      },
      {
        icon: 'activity',
        title: 'Real-time monitoring',
        description:
          'Built-in performance dashboards track latency, throughput, error rates, and resource utilization in real time.',
      },
      {
        icon: 'maximize',
        title: 'Linear scaling',
        description:
          'Performance stays consistent as you grow. No degradation when adding users, markets, or transaction volume.',
      },
      {
        icon: 'cpu',
        title: 'Optimized message processing',
        description:
          'Purpose-built message pipelines minimize serialization overhead, memory allocation, and network hops.',
      },
    ],
    sections: [
      {
        heading: 'Latency that matters',
        description:
          'In trading, milliseconds matter. FIT optimizes every step of the order lifecycle — from the moment an order enters the system to when the execution confirmation returns. Purpose-built message pipelines, efficient serialization, and optimized network paths keep latency consistently low.',
        items: [
          { label: 'Order routing', detail: 'Sub-second from entry to exchange submission' },
          { label: 'Market data', detail: 'Tick-to-trade latency measured in microseconds' },
          { label: 'Consistent performance', detail: 'P99 latency within 2x of median under load' },
        ],
      },
      {
        heading: 'Scale horizontally, not vertically',
        description:
          'FIT scales by adding nodes, not by upgrading to bigger machines. Each component — order processing, market data distribution, surveillance analysis — scales independently based on its own demand profile.',
        items: [
          { label: 'Independent scaling', detail: 'Scale each service based on its specific load' },
          { label: 'Auto-scaling', detail: 'Cloud deployments scale automatically based on demand' },
          { label: 'Cost efficiency', detail: 'Pay for capacity where you need it, not everywhere' },
        ],
      },
      {
        heading: 'Tested at institutional volume',
        description:
          'FIT infrastructure is regularly load-tested at volumes exceeding production peaks. We test sustained throughput, burst handling, and failure scenarios to verify that performance targets hold under real-world conditions.',
        items: [
          { label: 'Sustained load', detail: 'Tens of thousands of orders per second continuously' },
          { label: 'Burst handling', detail: 'Market-open spikes handled without queuing or drops' },
          { label: 'Failure resilience', detail: 'Performance maintained during node failures and failover' },
        ],
      },
    ],
    ctaHeading: 'Want to see the performance numbers?',
    ctaSubtext: 'Our engineering team can share benchmarks relevant to your use case.',
    ctaButton: 'Request Performance Benchmarks',
    ctaHref: '/contact',
    ctaSecondaryLabel: 'Talk to Engineering',
    ctaSecondaryHref: '/contact',
  },
};

/* ---------- SSG ---------- */

const validSlugs = Object.keys(pages);

export function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }));
}

/* ---------- Metadata ---------- */

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = pages[slug];
  if (!data) return {};

  return buildMetadata({
    title: data.metaTitle,
    description: data.metaDescription,
    path: `/technology/${slug}`,
  });
}

/* ---------- Content section component ---------- */

function ContentSection({ section }: { section: ContentSection }) {
  return (
    <div>
      <Heading level={3}>{section.heading}</Heading>
      <Text variant="body-lg" className="mt-3 max-w-3xl text-slate-600">
        {section.description}
      </Text>
      {section.items && section.items.length > 0 && (
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {section.items.map((item) => (
            <div key={item.label} className="rounded-lg border border-terminal-border bg-gray-50 p-5">
              <Text variant="body" className="font-semibold text-gray-900">
                {item.label}
              </Text>
              <Text variant="body-sm" className="mt-1">
                {item.detail}
              </Text>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Page component ---------- */

export default async function TechnologyPage({ params }: PageProps) {
  const { slug } = await params;
  const data = pages[slug];

  if (!data) {
    notFound();
  }

  const breadcrumbLabels: Record<string, string> = {
    architecture: 'Architecture & Infrastructure',
    apis: 'APIs & Integration',
    security: 'Security & Compliance',
    performance: 'Performance & Scalability',
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Technology', href: '/technology' },
    { label: breadcrumbLabels[slug] ?? data.title },
  ];

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Technology', url: `${SITE_URL}/technology` },
    { name: breadcrumbLabels[slug] ?? data.title },
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
        breadcrumbs={breadcrumbs}
      />

      {/* Content sections */}
      <section className="section-padding bg-white">
        <div className="container-content space-y-16">
          {data.sections.map((section) => (
            <ContentSection key={section.heading} section={section} />
          ))}
        </div>
      </section>

      {/* Feature grid */}
      <FeatureGrid
        overline={data.featureGridOverline}
        heading={data.featureGridHeading}
        features={data.features}
        className="bg-gray-50"
      />

      {/* CTA Banner */}
      <CTABanner
        heading={data.ctaHeading}
        subtext={data.ctaSubtext}
        buttonLabel={data.ctaButton}
        buttonHref={data.ctaHref}
        secondaryLabel={data.ctaSecondaryLabel}
        secondaryHref={data.ctaSecondaryHref}
      />
    </>
  );
}
