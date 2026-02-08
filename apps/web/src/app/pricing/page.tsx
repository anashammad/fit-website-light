import type { Metadata } from 'next';
import { Heading, Text, Badge, ButtonLink } from '@/components/atoms';
import { HeroSection } from '@/components/organisms/HeroSection';
import { CTABanner } from '@/components/organisms/CTABanner';
import { SITE_URL, buildMetadata, buildBreadcrumbSchema } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Pricing',
  description:
    'Flexible pricing tiers for brokerages, financial institutions, and exchanges. Contact FIT for a tailored quote.',
  path: '/pricing',
});

interface PricingTier {
  name: string;
  badge: 'default' | 'secondary' | 'success';
  audience: string;
  products: string[];
}

const tiers: PricingTier[] = [
  {
    name: 'Starter',
    badge: 'default',
    audience: 'Small brokerages and emerging financial firms',
    products: [
      'FIT Premium (OMS)',
      'Mobile & Web Trading',
      'Digital Onboarding',
    ],
  },
  {
    name: 'Professional',
    badge: 'secondary',
    audience: 'Mid-size brokerage houses and investment firms',
    products: [
      'Everything in Starter',
      'Wasata Backoffice',
      'API Middleware',
      'FIT Surveillance',
    ],
  },
  {
    name: 'Enterprise',
    badge: 'success',
    audience: 'Banks, exchanges, and large financial institutions',
    products: [
      'Full product suite',
      'Investor Vision',
      'Fund Management',
      'IPO Manager',
      'Banking Gateway',
      'Dedicated support & SLA',
    ],
  },
];

export default function PricingPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Pricing' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <HeroSection
        variant="page"
        title="Pricing"
        subtitle="Tailored solutions for every stage of growth. Contact us for a custom quote based on your institution's needs."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Pricing' },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-content">
          <div className="grid gap-8 md:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className="border-glow flex flex-col rounded-lg bg-white p-8"
              >
                <div className="mb-4">
                  <Badge variant={tier.badge}>{tier.name}</Badge>
                </div>
                <Heading level={3} className="text-slate-900">
                  {tier.name}
                </Heading>
                <Text className="mt-2 text-slate-500">{tier.audience}</Text>

                <ul className="mt-6 flex-1 space-y-3">
                  {tier.products.map((product) => (
                    <li key={product} className="flex items-start gap-2">
                      <svg
                        className="mt-1 h-4 w-4 shrink-0 text-terminal-green"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M13.5 4.5L6 12L2.5 8.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <Text className="text-body-sm text-slate-700">{product}</Text>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <ButtonLink
                    variant={tier.name === 'Enterprise' ? 'primary' : 'secondary'}
                    size="md"
                    href="/contact"
                    className="w-full justify-center"
                  >
                    Contact for Pricing
                  </ButtonLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        heading="Need a custom solution?"
        subtext="Our team will work with you to build a package that fits your institution's exact requirements."
        buttonLabel="Request a Demo"
        buttonHref="/contact"
        secondaryLabel="Explore Products"
        secondaryHref="/products"
      />
    </>
  );
}
