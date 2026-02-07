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
    title: 'Qatar',
    description: 'Major Qatari financial institutions trust FIT for trading and investment technology.',
    clients: [
      { name: 'QNB' },
      { name: 'CBQ' },
      { name: 'WFS' },
      { name: 'QSC' },
      { name: 'Dalala' },
    ],
  },
  {
    title: 'Egypt',
    description: 'Leading Egyptian brokerages and financial firms powered by FIT technology.',
    clients: [
      { name: 'CIBC' },
      { name: 'Pioneers' },
      { name: 'Roya' },
      { name: 'Ostoul' },
    ],
  },
  {
    title: 'UAE',
    description: 'Banks, brokerages, and investment firms across the UAE rely on FIT for trading infrastructure.',
    clients: [
      { name: 'ADCB' },
      { name: 'International Securities' },
      { name: 'Al Ramz' },
      { name: 'CBD' },
      { name: 'SIB' },
      { name: 'Al Sahel' },
      { name: 'Al Dar' },
      { name: 'SICO' },
    ],
  },
  {
    title: 'Oman',
    description: 'FIT powers the majority of Oman\'s brokerage and banking trading operations.',
    clients: [
      { name: 'United Securities' },
      { name: 'NBO' },
      { name: 'Ahli Bank' },
      { name: 'Global Securities' },
      { name: 'Ubhar Capital' },
      { name: 'Jabal' },
      { name: 'Bank Dhofar' },
      { name: 'Tanmia' },
    ],
  },
  {
    title: 'Jordan',
    description: 'Jordanian financial institutions using FIT trading and brokerage solutions.',
    clients: [
      { name: 'ABCI' },
      { name: 'Tanmia' },
      { name: 'Al Yasmeen' },
      { name: 'Global' },
    ],
  },
];

function ClientLogo({ name, logo }: { name: string; logo?: string }) {
  return (
    <div className="flex h-24 items-center justify-center rounded-lg border border-terminal-border bg-surface px-6 transition-all duration-300 hover:border-accent/15">
      {logo ? (
        <Image src={logo} alt={name} width={120} height={48} className="h-12 w-auto object-contain" />
      ) : (
        <Text variant="body-sm" className="text-center font-medium text-gray-500">
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
          className={`section-padding ${index % 2 === 0 ? 'bg-primary' : 'bg-surface'}`}
        >
          <div className="container-content">
            <Heading level={2} className="text-white">{category.title}</Heading>
            <Text variant="body-lg" className="mt-3 max-w-2xl text-gray-400">
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
