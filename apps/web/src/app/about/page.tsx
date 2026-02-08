import type { Metadata } from 'next';
import { Heading, Text, ButtonLink } from '@/components/atoms';
import { HeroSection } from '@/components/organisms/HeroSection';
import { CTABanner } from '@/components/organisms/CTABanner';
import { StatItem } from '@/components/molecules/StatItem';
import { SITE_URL, buildMetadata, buildBreadcrumbSchema } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Our Story',
  description:
    'FIT is a trading technology company headquartered in Oman, building the software that powers brokerage houses, exchanges, banks, and regulators across MENA.',
  path: '/about',
});

// Data source: hardcoded (CMS integration pending)
const stats = [
  { value: '27+', label: 'Years in financial markets' },
  { value: '28+', label: 'Institutions served' },
  { value: '10+', label: 'Markets connected' },
  { value: '10', label: 'Core products' },
];

const values = [
  {
    title: 'Reliability first',
    description:
      'Financial markets depend on uptime. We build systems that institutions trust with their most critical operations.',
  },
  {
    title: 'Deep domain expertise',
    description:
      'Our team understands trading workflows, compliance requirements, and market structure — not just software.',
  },
  {
    title: 'Modular by design',
    description:
      'Adopt one product or the full suite. Our architecture lets you start where you need and expand when you are ready.',
  },
  {
    title: 'Regional focus, global standards',
    description:
      'Built for MENA market requirements with architecture and security practices that meet international standards.',
  },
];

// Data source: hardcoded (CMS integration pending)
const milestones = [
  { year: '1999', description: 'FIT established in Muscat, Oman, with a mission to modernize MENA capital markets technology.' },
  { year: '2003', description: 'Deployed FIT Premium at the Muscat Securities Market, becoming the first fully electronic brokerage system in Oman.' },
  { year: '2007', description: 'Expanded operations to the UAE and Qatar, establishing offices in Dubai and partnerships with Gulf financial institutions.' },
  { year: '2010', description: 'Launched multi-market trading capabilities, enabling clients to trade across MSM, ADX, DFM, and QSE from a single platform.' },
  { year: '2012', description: 'FIT Premium OMS reengineered with modern architecture, providing brokerage houses with a next-generation order management system.' },
  { year: '2017', description: 'Expanded to a full product suite covering front office, backoffice, surveillance, and client-facing apps across five core platforms.' },
  { year: '2022', description: 'Reached 28+ institutional clients across six MENA countries, powering over 90% of Oman\'s brokerage market.' },
];

export default function AboutPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'About' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <HeroSection
        variant="page"
        title="Building the technology behind MENA's financial markets"
        subtitle="FIT is a trading technology company headquartered in Oman, building the software that powers brokerage houses, exchanges, banks, and regulators across the region."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About' },
        ]}
        ctas={[
          { label: 'Meet Our Leadership', href: '/about/leadership' },
          { label: 'See Our Clients', href: '/about/clients', variant: 'secondary' },
        ]}
      />

      {/* Stats */}
      <section className="section-padding bg-white">
        <div className="container-content">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <StatItem key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-gray-50">
        <div className="container-content max-w-3xl">
          <Text variant="overline" className="text-accent">
            Our mission
          </Text>
          <Heading level={2} className="mt-2">
            Make trading infrastructure simpler and faster
          </Heading>
          <Text variant="body-lg" className="mt-6">
            Financial institutions across MENA have historically relied on fragmented, legacy
            technology stacks. Multiple vendors, disconnected systems, and manual processes slow
            operations and increase risk.
          </Text>
          <Text variant="body-lg" className="mt-4">
            FIT exists to change that. We build a unified, modular trading technology platform
            that covers order management, backoffice operations, trade surveillance, client
            trading apps, and system connectivity — all from a single engineering team that
            understands financial markets.
          </Text>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="container-content">
          <Text variant="overline" className="text-accent">
            What drives us
          </Text>
          <Heading level={2} className="mt-2">
            Our values
          </Heading>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {values.map((value) => (
              <div key={value.title} className="rounded-lg border border-terminal-border bg-gray-50 p-6">
                <Heading level={3}>{value.title}</Heading>
                <Text className="mt-3 text-slate-600">{value.description}</Text>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-gray-50">
        <div className="container-content max-w-3xl">
          <Text variant="overline" className="text-accent">
            Our journey
          </Text>
          <Heading level={2} className="mt-2">
            Key milestones
          </Heading>
          <div className="mt-12 space-y-8">
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 border border-accent/30 text-sm font-semibold text-accent">
                    {index + 1}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="mt-2 h-full w-px bg-terminal-border" />
                  )}
                </div>
                <div className="pb-2">
                  <Text variant="overline" className="text-accent">
                    {milestone.year}
                  </Text>
                  <Text className="mt-1">{milestone.description}</Text>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Presence */}
      <section className="section-padding bg-white">
        <div className="container-content max-w-3xl">
          <Text variant="overline" className="text-accent">
            Where we operate
          </Text>
          <Heading level={2} className="mt-2">
            Regional presence
          </Heading>
          <Text variant="body-lg" className="mt-6">
            Headquartered in Muscat, Oman, FIT serves financial institutions across the MENA
            region. Our team combines deep local market knowledge with technology built to
            international standards.
          </Text>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-terminal-border bg-gray-50 p-8">
              <Heading level={3}>Muscat, Oman</Heading>
              <Text className="mt-2 text-slate-600">
                FIT Headquarters
              </Text>
              <Text variant="body-sm" className="mt-1 text-slate-500">
                P.O. Box 629, PC 112 Ruwi, Muscat
              </Text>
              <a
                href="tel:+96824700454"
                className="mt-1 inline-block font-mono text-ticker text-accent hover:text-accent-light transition-colors"
              >
                +968 24 700 454
              </a>
            </div>
            <div className="rounded-lg border border-terminal-border bg-gray-50 p-8">
              <Heading level={3}>Dubai, UAE</Heading>
              <Text className="mt-2 text-slate-600">
                Regional Office
              </Text>
              <Text variant="body-sm" className="mt-1 text-slate-500">
                P.O. Box 120804, Dubai
              </Text>
              <a
                href="tel:+97143055390"
                className="mt-1 inline-block font-mono text-ticker text-accent hover:text-accent-light transition-colors"
              >
                +971 43 055 390
              </a>
            </div>
            <div className="rounded-lg border border-terminal-border bg-gray-50 p-8">
              <Heading level={3}>Amman, Jordan</Heading>
              <Text className="mt-2 text-slate-600">
                Regional Office
              </Text>
              <Text variant="body-sm" className="mt-1 text-slate-500">
                P.O. Box 930333, PC 11193 Amman
              </Text>
              <a
                href="tel:+96262005544"
                className="mt-1 inline-block font-mono text-ticker text-accent hover:text-accent-light transition-colors"
              >
                +962 62 005 544
              </a>
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        heading="Want to learn more about FIT?"
        subtext="Get in touch with our team to discuss how FIT can support your trading operations."
        buttonLabel="Contact Us"
        buttonHref="/contact"
        secondaryLabel="Meet Our Leadership"
        secondaryHref="/about/leadership"
      />
    </>
  );
}
