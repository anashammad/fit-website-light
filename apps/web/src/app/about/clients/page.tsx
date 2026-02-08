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

interface ClientInfo {
  name: string;
  abbr: string;
  brandColor: string;
  logo?: string;
}

interface ClientCategory {
  title: string;
  description: string;
  clients: ClientInfo[];
}

// Brand colors sourced from public brand identities
const clientBrandColors: Record<string, string> = {
  QNB: '#6F2C91',
  CBQ: '#003B73',
  WFS: '#1A5276',
  QSC: '#0E4D92',
  Dalala: '#2E7D32',
  CIBC: '#C41230',
  Pioneers: '#1B5E20',
  Roya: '#0D47A1',
  Ostoul: '#37474F',
  ADCB: '#D4145A',
  'International Securities': '#1A237E',
  'Al Ramz': '#004D40',
  CBD: '#00695C',
  SIB: '#0277BD',
  'Al Sahel': '#1565C0',
  'Al Dar': '#BF360C',
  SICO: '#00838F',
  'United Securities': '#283593',
  NBO: '#E65100',
  'Ahli Bank': '#1B5E20',
  'Global Securities': '#37474F',
  'Ubhar Capital': '#0D47A1',
  Jabal: '#4E342E',
  'Bank Dhofar': '#6A1B9A',
  Tanmia: '#00695C',
  ABCI: '#1565C0',
  'Al Yasmeen': '#2E7D32',
  Global: '#455A64',
};

function makeAbbr(name: string): string {
  if (name.length <= 4) return name;
  return name
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();
}

// TODO: Replace with CMS data — client logos and names managed via admin panel
const clientCategories: ClientCategory[] = [
  {
    title: 'Qatar',
    description: 'Major Qatari financial institutions trust FIT for trading and investment technology.',
    clients: [
      { name: 'QNB', abbr: 'QNB', brandColor: clientBrandColors['QNB']!, logo: '/images/logos/qnb.svg' },
      { name: 'CBQ', abbr: 'CBQ', brandColor: clientBrandColors['CBQ']!, logo: '/images/clients/cbq.jpg' },
      { name: 'WFS', abbr: 'WFS', brandColor: clientBrandColors['WFS']!, logo: '/images/clients/wfs.jpg' },
      { name: 'QSC', abbr: 'QSC', brandColor: clientBrandColors['QSC']!, logo: '/images/clients/qsc.jpg' },
      { name: 'Dalala', abbr: 'DLA', brandColor: clientBrandColors['Dalala']! },
    ],
  },
  {
    title: 'Egypt',
    description: 'Leading Egyptian brokerages and financial firms powered by FIT technology.',
    clients: [
      { name: 'CIBC', abbr: 'CIBC', brandColor: clientBrandColors['CIBC']! },
      { name: 'Pioneers', abbr: 'PIO', brandColor: clientBrandColors['Pioneers']! },
      { name: 'Roya', abbr: 'ROY', brandColor: clientBrandColors['Roya']! },
      { name: 'Ostoul', abbr: 'OST', brandColor: clientBrandColors['Ostoul']! },
    ],
  },
  {
    title: 'UAE',
    description: 'Banks, brokerages, and investment firms across the UAE rely on FIT for trading infrastructure.',
    clients: [
      { name: 'ADCB', abbr: 'ADCB', brandColor: clientBrandColors['ADCB']!, logo: '/images/logos/adcb.svg' },
      { name: 'International Securities', abbr: 'IS', brandColor: clientBrandColors['International Securities']!, logo: '/images/clients/is.png' },
      { name: 'Al Ramz', abbr: 'AR', brandColor: clientBrandColors['Al Ramz']!, logo: '/images/clients/alramz.svg' },
      { name: 'CBD', abbr: 'CBD', brandColor: clientBrandColors['CBD']!, logo: '/images/clients/cbd.jpg' },
      { name: 'SIB', abbr: 'SIB', brandColor: clientBrandColors['SIB']!, logo: '/images/clients/sib.png' },
      { name: 'Al Sahel', abbr: 'AS', brandColor: clientBrandColors['Al Sahel']! },
      { name: 'Al Dar', abbr: 'AD', brandColor: clientBrandColors['Al Dar']! },
    ],
  },
  {
    title: 'Bahrain',
    description: 'Bahraini financial institutions powered by FIT trading technology.',
    clients: [
      { name: 'SICO', abbr: 'SICO', brandColor: clientBrandColors['SICO']!, logo: '/images/clients/sico.png' },
    ],
  },
  {
    title: 'Oman',
    description: 'FIT powers the majority of Oman\'s brokerage and banking trading operations.',
    clients: [
      { name: 'United Securities', abbr: 'US', brandColor: clientBrandColors['United Securities']!, logo: '/images/clients/united.png' },
      { name: 'NBO', abbr: 'NBO', brandColor: clientBrandColors['NBO']!, logo: '/images/clients/nbo.png' },
      { name: 'Ahli Bank', abbr: 'AB', brandColor: clientBrandColors['Ahli Bank']!, logo: '/images/clients/ahlibank.png' },
      { name: 'Global Securities', abbr: 'GS', brandColor: clientBrandColors['Global Securities']! },
      { name: 'Ubhar Capital', abbr: 'UC', brandColor: clientBrandColors['Ubhar Capital']!, logo: '/images/clients/ucapital.png' },
      { name: 'Jabal', abbr: 'JBL', brandColor: clientBrandColors['Jabal']!, logo: '/images/clients/jabal.svg' },
      { name: 'Bank Dhofar', abbr: 'BD', brandColor: clientBrandColors['Bank Dhofar']!, logo: '/images/logos/bankdhofar.svg' },
    ],
  },
  {
    title: 'Jordan',
    description: 'Jordanian financial institutions using FIT trading and brokerage solutions.',
    clients: [
      { name: 'ABCI', abbr: 'ABCI', brandColor: clientBrandColors['ABCI']! },
      { name: 'Tanmia', abbr: 'TNM', brandColor: clientBrandColors['Tanmia']! },
      { name: 'Al Yasmeen', abbr: 'AY', brandColor: clientBrandColors['Al Yasmeen']! },
      { name: 'Global', abbr: 'GLB', brandColor: clientBrandColors['Global']! },
    ],
  },
];

function ClientLogoSvg({ abbr, brandColor }: { abbr: string; brandColor: string }) {
  return (
    <svg
      width="120"
      height="48"
      viewBox="0 0 120 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Accent bar */}
      <rect x="0" y="0" width="4" height="48" rx="2" fill={brandColor} />
      {/* Abbreviation */}
      <text
        x="62"
        y="28"
        textAnchor="middle"
        dominantBaseline="central"
        fill={brandColor}
        fontFamily="var(--font-inter), system-ui, sans-serif"
        fontWeight="700"
        fontSize={abbr.length > 3 ? '14' : '18'}
        letterSpacing="0.05em"
      >
        {abbr}
      </text>
    </svg>
  );
}

function ClientLogo({ client }: { client: ClientInfo }) {
  return (
    <div className="group flex h-28 flex-col items-center justify-center gap-2 rounded-lg border border-terminal-border bg-white px-4 transition-all duration-300 hover:border-accent/15 hover:shadow-card">
      {client.logo ? (
        <Image src={client.logo} alt={client.name} width={120} height={48} className="h-12 w-auto object-contain" />
      ) : (
        <ClientLogoSvg abbr={client.abbr} brandColor={client.brandColor} />
      )}
      <Text variant="body-sm" className="text-center text-xs font-medium text-gray-500 group-hover:text-gray-700">
        {client.name}
      </Text>
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
          className={`section-padding ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
        >
          <div className="container-content">
            <Heading level={2} className="text-gray-900">{category.title}</Heading>
            <Text variant="body-lg" className="mt-3 max-w-2xl text-slate-600">
              {category.description}
            </Text>
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {category.clients.map((client) => (
                <ClientLogo key={client.name} client={client} />
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
