import type { Metadata } from 'next';
import Image from 'next/image';
import { Heading, Text } from '@/components/atoms';
import { HeroSection } from '@/components/organisms/HeroSection';
import { CTABanner } from '@/components/organisms/CTABanner';
import { SITE_URL, buildMetadata, buildBreadcrumbSchema } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Leadership',
  description:
    'Meet the leadership team behind FIT. Deep expertise in trading technology, financial markets, and software engineering.',
  path: '/about/leadership',
});

interface TeamMember {
  name: string;
  title: string;
  bio: string;
  image?: string;
  linkedin?: string;
}

interface TeamSection {
  label: string;
  members: TeamMember[];
}

// TODO: Replace with CMS data from TeamMembers collection
const teamSections: TeamSection[] = [
  {
    label: 'Leadership',
    members: [
      {
        name: 'Nasser Abu Shoaib',
        title: 'Chief Executive Officer',
        bio: 'Leads FIT\'s strategic vision and growth across MENA capital markets. Over two decades of experience in financial technology.',
        linkedin: 'https://www.linkedin.com/in/nasser-abu-shoaib-97669113/',
      },
      {
        name: 'Yaser Abdel Fattah',
        title: 'Country Manager',
        bio: 'Oversees FIT\'s operations and client relationships in key markets. Drives regional expansion and partnership development.',
        linkedin: 'https://www.linkedin.com/in/yaser-abdel-fattah/',
      },
      {
        name: 'Majdi Rashad',
        title: 'Regional Manager',
        bio: 'Manages FIT\'s regional operations and business development across multiple MENA markets.',
        linkedin: 'https://www.linkedin.com/in/majdi-rashad-0872444a/',
      },
      {
        name: 'Nedal Al-Lala',
        title: 'Head of Development Center',
        bio: 'Leads the engineering organization and development center. Responsible for technical strategy and delivery excellence.',
        linkedin: 'https://www.linkedin.com/in/nedal-al-lala-4b192016/',
      },
    ],
  },
  {
    label: 'Project Management & Support',
    members: [
      {
        name: 'Anas Abdel Fattah',
        title: 'Project Manager',
        bio: 'Manages end-to-end delivery of FIT solutions for institutional clients across the region.',
        linkedin: 'https://www.linkedin.com/in/anas-abdel-fattah-a7921389/',
      },
      {
        name: 'Mohammed Okour',
        title: 'Project Manager',
        bio: 'Coordinates cross-functional project delivery and client onboarding for trading platform deployments.',
        linkedin: 'https://www.linkedin.com/in/mohammed-okour/',
      },
      {
        name: 'Muath Karim',
        title: 'Project Manager',
        bio: 'Drives project execution and stakeholder alignment for FIT\'s capital markets solutions.',
        linkedin: 'https://www.linkedin.com/in/muath-karim-68327763/',
      },
      {
        name: 'Hammad Khaled',
        title: 'Support & Implementation',
        bio: 'Ensures smooth implementation and ongoing support for FIT\'s deployed trading systems.',
        linkedin: 'https://www.linkedin.com/in/hammadkhaled/',
      },
    ],
  },
  {
    label: 'OMS Team',
    members: [
      {
        name: 'Ahmed Faisal',
        title: 'Team Leader — OMS',
        bio: 'Leads the Order Management System team, architecting and delivering FIT Premium\'s core trading engine.',
        linkedin: 'https://www.linkedin.com/in/ahmed-faisal-68260440/',
      },
      {
        name: 'Anas Hammad',
        title: 'Senior Developer — OMS',
        bio: 'Develops and maintains the core OMS platform powering institutional trading workflows.',
        linkedin: 'https://www.linkedin.com/in/anas-hammad/',
      },
    ],
  },
  {
    label: 'Wasata Backoffice Team',
    members: [
      {
        name: 'Ibrahim Tarify',
        title: 'Team Leader — Wasata',
        bio: 'Leads the Wasata Backoffice team, building comprehensive post-trade and settlement solutions.',
        linkedin: 'https://www.linkedin.com/in/ibrahim-tarify-2b183574/',
      },
      {
        name: 'Ahmad Bani Awwad',
        title: 'Senior Developer — Wasata',
        bio: 'Develops back-office systems for trade settlement, reconciliation, and regulatory reporting.',
        linkedin: 'https://www.linkedin.com/in/ahmad-bani-awwad-401a6352/',
      },
    ],
  },
  {
    label: 'Mobile & Web',
    members: [
      {
        name: 'Amir Zregat',
        title: 'Mobile Team Leader',
        bio: 'Leads mobile application development for FIT\'s trading platforms across iOS and Android.',
        linkedin: 'https://www.linkedin.com/in/amirzregat/',
      },
      {
        name: 'Tawfeeq Irshaidat',
        title: 'Mobile Developer',
        bio: 'Builds and maintains cross-platform mobile trading applications for institutional clients.',
        linkedin: 'https://www.linkedin.com/in/tawfeeq-irshaidat/',
      },
      {
        name: 'Mohd Junidi',
        title: 'Web Developer',
        bio: 'Develops web-based trading interfaces and client-facing dashboards.',
        linkedin: 'https://www.linkedin.com/in/mohd-junidi-61b36859/',
      },
    ],
  },
  {
    label: 'QA & API',
    members: [
      {
        name: 'Hadeel Abdallah',
        title: 'Quality Assurance',
        bio: 'Ensures the reliability and quality of FIT\'s trading platforms through comprehensive testing strategies.',
        linkedin: 'https://www.linkedin.com/in/hadeel-abdallah-64b3ab209/',
      },
      {
        name: 'Suleiman Al-Selawi',
        title: 'API Developer',
        bio: 'Designs and develops the API middleware layer connecting FIT\'s trading systems with exchanges and third-party platforms.',
        linkedin: 'https://www.linkedin.com/in/suleiman-ghassan-al-selawi-0a2756127/',
      },
      {
        name: 'Amro Saber',
        title: 'Software Consultant',
        bio: 'Provides technical consulting and solution design for FIT\'s institutional clients.',
        linkedin: 'https://www.linkedin.com/in/amro-saber-02b5b7a8/',
      },
    ],
  },
];

function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full" style={{ backgroundColor: member.image ? undefined : '#0A1628' }}>
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            width={80}
            height={80}
            className="h-20 w-20 rounded-full object-cover"
          />
        ) : (
          <span className="text-xl font-bold select-none" style={{ color: '#E8A838' }} aria-hidden="true">
            {member.name.split(' ').filter(Boolean).map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>
      <Heading level={3} className="text-lg">
        {member.name}
      </Heading>
      <Text variant="body-sm" className="mt-1 font-medium text-secondary">
        {member.title}
      </Text>
      <Text variant="body-sm" className="mt-3 text-gray-600">
        {member.bio}
      </Text>
      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-[#0A66C2]"
          aria-label={`${member.name} on LinkedIn`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          LinkedIn
        </a>
      )}
    </div>
  );
}

export default function LeadershipPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'About', url: `${SITE_URL}/about` },
    { name: 'Leadership' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <HeroSection
        variant="page"
        title="Our leadership team"
        subtitle="The people driving FIT's mission to modernize trading technology across MENA financial markets."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Leadership' },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-content space-y-16">
          {teamSections.map((section) => (
            <div key={section.label}>
              <Heading level={2} className="mb-8 border-b border-gray-200 pb-4">
                {section.label}
              </Heading>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {section.members.map((member) => (
                  <TeamMemberCard key={member.name} member={member} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTABanner
        heading="Want to join our team?"
        subtext="We are always looking for talented people who are passionate about financial technology."
        buttonLabel="View Open Positions"
        buttonHref="/careers"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </>
  );
}
