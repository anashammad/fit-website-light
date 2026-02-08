import type { Metadata } from 'next';
import { buildMetadata, buildBreadcrumbSchema, SITE_URL } from '@/lib/metadata';
import { Heading, Text, ButtonLink } from '@/components/atoms';
import { HeroSection } from '@/components/organisms/HeroSection';
import { CTABanner } from '@/components/organisms/CTABanner';
import type { BreadcrumbItem } from '@/components/molecules/Breadcrumb';

export const metadata: Metadata = buildMetadata({
  title: 'Technology',
  description:
    'Explore the technology behind FIT trading infrastructure — modular architecture, developer-friendly APIs, enterprise security, and institutional-grade performance.',
  path: '/technology',
});

const techPages = [
  {
    title: 'Architecture & Infrastructure',
    description:
      'Microservices design with on-premise, cloud, and hybrid deployment options. High availability and disaster recovery for financial-grade uptime.',
    href: '/technology/architecture',
    icon: 'grid',
  },
  {
    title: 'APIs & Integration',
    description:
      'FIX 4.2/4.4/5.0, REST, and WebSocket APIs with sandbox environments, comprehensive documentation, and dedicated integration engineering support.',
    href: '/technology/apis',
    icon: 'code',
  },
  {
    title: 'Security & Compliance',
    description:
      'End-to-end encryption, role-based access controls, full audit trails, and compliance frameworks aligned with MENA financial regulations.',
    href: '/technology/security',
    icon: 'shield',
  },
  {
    title: 'Performance & Scalability',
    description:
      'Sub-second order routing, horizontal scaling, and institutional-grade throughput tested at tens of thousands of orders per second.',
    href: '/technology/performance',
    icon: 'zap',
  },
];

const breadcrumbs: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Technology' },
];

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', url: SITE_URL },
  { name: 'Technology' },
]);

export default function TechnologyIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <HeroSection
        variant="page"
        overline="TECHNOLOGY"
        title="Built for Scale, Speed, and Security"
        subtitle="FIT's modular platform is engineered for the demands of institutional trading — from sub-second order routing to enterprise-grade security across every component."
        breadcrumbs={breadcrumbs}
      />

      <section className="section-padding bg-white">
        <div className="container-content">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {techPages.map((page) => (
              <div
                key={page.href}
                className="group rounded-lg border border-terminal-border bg-gray-50 p-8 transition-all duration-300 hover:border-accent/20 hover:shadow-md"
              >
                <Heading level={3} className="text-gray-900">
                  {page.title}
                </Heading>
                <Text variant="body" className="mt-3 text-slate-600">
                  {page.description}
                </Text>
                <div className="mt-6">
                  <ButtonLink variant="secondary" href={page.href}>
                    Learn More &rarr;
                  </ButtonLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        heading="Want to see our technology in action?"
        subtext="Talk to our engineering team about how FIT can power your infrastructure."
        buttonLabel="Contact Engineering"
        buttonHref="/contact"
        secondaryLabel="Request Architecture Overview"
        secondaryHref="/contact?type=datasheet"
      />
    </>
  );
}
