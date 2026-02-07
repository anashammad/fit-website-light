import type { Metadata } from 'next';
import Link from 'next/link';
import { Heading, Text, Icon } from '@/components/atoms';
import { HeroSection } from '@/components/organisms/HeroSection';
import { CTABanner } from '@/components/organisms/CTABanner';
import { SITE_URL, buildMetadata, buildBreadcrumbSchema } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Solutions',
  description:
    'FIT provides tailored trading technology solutions for brokerage houses, exchanges, banks, and compliance teams across MENA capital markets.',
  path: '/solutions',
});

const solutions = [
  {
    slug: 'brokerage',
    name: 'Brokerage Houses',
    icon: 'terminal',
    description:
      'Complete trading infrastructure from front office to compliance. OMS, backoffice, surveillance, and client-facing apps in one integrated platform.',
    products: ['FIT Premium', 'Wasata Backoffice', 'FIT Surveillance', 'Mobile & Web Trading'],
  },
  {
    slug: 'exchanges',
    name: 'Exchanges',
    icon: 'eye',
    description:
      'Market surveillance and member connectivity tools that support market integrity obligations and simplify data distribution to participants.',
    products: ['FIT Surveillance', 'API Middleware'],
  },
  {
    slug: 'banks',
    name: 'Banks',
    icon: 'shield',
    description:
      'Secure, compliant trading infrastructure that integrates with existing core banking systems through industry-standard protocols.',
    products: ['FIT Premium', 'API Middleware', 'FIT Surveillance'],
  },
  {
    slug: 'regulators',
    name: 'Compliance & Regulatory Teams',
    icon: 'clipboard',
    description:
      'Automated trade surveillance, AML screening, and regulatory reporting aligned with MENA frameworks for compliance teams at regulated firms.',
    products: ['FIT Surveillance', 'Wasata Backoffice'],
  },
];

export default function SolutionsPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Solutions' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <HeroSection
        variant="page"
        title="Solutions for Every Market Participant"
        subtitle="Whether you operate a brokerage, run an exchange, manage bank trading desks, or lead a compliance team — FIT has the technology stack built for your needs."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Solutions' },
        ]}
      />

      <section className="section-padding bg-primary">
        <div className="container-content">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {solutions.map((solution) => (
              <Link
                key={solution.slug}
                href={`/solutions/${solution.slug}`}
                className="group flex flex-col rounded-lg border border-terminal-border bg-surface p-8 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/20 hover:shadow-[0_0_24px_rgba(212,168,67,0.06)]"
              >
                <Icon name={solution.icon} size={40} className="text-accent" />
                <Heading level={3} className="mt-4">
                  {solution.name}
                </Heading>
                <Text variant="body" className="mt-3 text-gray-400">
                  {solution.description}
                </Text>
                <div className="mt-4 flex flex-wrap gap-2">
                  {solution.products.map((product) => (
                    <span
                      key={product}
                      className="rounded-full border border-terminal-border bg-primary px-3 py-1 text-xs font-medium text-gray-400"
                    >
                      {product}
                    </span>
                  ))}
                </div>
                <span className="mt-auto pt-6 text-body-sm font-semibold text-accent transition-colors group-hover:text-accent-light">
                  Learn More &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        heading="Not sure which solution fits your needs?"
        subtext="Talk to our team and we will help you find the right technology stack for your organization."
        buttonLabel="Contact Us"
        buttonHref="/contact"
        secondaryLabel="Explore Products"
        secondaryHref="/products"
      />
    </>
  );
}
