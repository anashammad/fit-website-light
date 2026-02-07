import type { Metadata } from 'next';
import Image from 'next/image';
import { Heading, Text } from '@/components/atoms';
import { HeroSection } from '@/components/organisms/HeroSection';
import { CTABanner } from '@/components/organisms/CTABanner';
import { SITE_URL, buildMetadata, buildBreadcrumbSchema } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Clients & Partners',
  description:
    'FIT is trusted by brokerage houses, exchanges, banks, and regulators across MENA. See who relies on our trading technology.',
  path: '/about/clients',
});

interface ClientCategory {
  title: string;
  description: string;
  clients: { name: string; logo?: string }[];
}

// TODO: Replace with CMS data — client logos and names managed via admin panel
const clientCategories: ClientCategory[] = [
  {
    title: 'Brokerage houses',
    description: 'Leading brokerages across the region rely on FIT for order management, backoffice, and client trading apps.',
    clients: [
      { name: 'Ubhar Capital' },
      { name: 'Gulf Baader Capital Markets' },
      { name: 'Vision Investment Services' },
      { name: 'United Securities' },
    ],
  },
  {
    title: 'Exchanges',
    description: 'Exchange operators use FIT for trade surveillance and member connectivity.',
    clients: [
      { name: 'Muscat Securities Market' },
      { name: 'Bahrain Bourse' },
    ],
  },
  {
    title: 'Banks',
    description: 'Banks trust FIT to power their trading desks with secure, compliant technology.',
    clients: [
      { name: 'Bank Muscat' },
      { name: 'Ahli Bank' },
    ],
  },
  {
    title: 'Technology partners',
    description: 'FIT works with technology partners to deliver comprehensive solutions.',
    clients: [
      { name: 'Microsoft' },
      { name: 'Oracle' },
    ],
  },
];

function ClientLogo({ name, logo }: { name: string; logo?: string }) {
  return (
    <div className="flex h-24 items-center justify-center rounded-lg border border-gray-200 bg-white px-6 transition-shadow hover:shadow-sm">
      {logo ? (
        <Image src={logo} alt={name} width={120} height={48} className="h-12 w-auto object-contain" />
      ) : (
        <Text variant="body-sm" className="text-center font-medium text-gray-400">
          {name}
        </Text>
      )}
    </div>
  );
}

export default function ClientsPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'About', url: `${SITE_URL}/about` },
    { name: 'Clients & Partners' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <HeroSection
        variant="page"
        title="Trusted by institutions across MENA"
        subtitle="Brokerage houses, exchanges, banks, and regulators rely on FIT to power their trading operations."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Clients & Partners' },
        ]}
      />

      {clientCategories.map((category, index) => (
        <section
          key={category.title}
          className={`section-padding ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
        >
          <div className="container-content">
            <Heading level={2}>{category.title}</Heading>
            <Text variant="body-lg" className="mt-3 max-w-2xl text-gray-600">
              {category.description}
            </Text>
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {category.clients.map((client) => (
                <ClientLogo key={client.name} name={client.name} logo={client.logo} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <CTABanner
        heading="Ready to join these institutions?"
        subtext="See how FIT can support your trading operations."
        buttonLabel="Request a Demo"
        buttonHref="/contact"
        secondaryLabel="Explore Products"
        secondaryHref="/products/fit-premium"
      />
    </>
  );
}
