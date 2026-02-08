import type { Metadata } from 'next';
import { getCollection } from '@/lib/payload';
import { SITE_URL, buildMetadata, buildBreadcrumbSchema } from '@/lib/metadata';
import { Heading, Text } from '@/components/atoms';
import { Breadcrumb } from '@/components/molecules';
import { CTABanner } from '@/components/organisms';
import { JobListClient } from './JobListClient';

interface JobListing {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  type: string;
  isActive: boolean;
}

export const metadata: Metadata = buildMetadata({
  title: 'Careers',
  description:
    'Join the FIT team. Explore open positions in engineering, product, sales, and operations.',
  path: '/careers',
});

export default async function CareersPage() {
  const res = await getCollection<JobListing>(
    'job-listings',
    {
      where: { isActive: true } as Record<string, unknown>,
      sort: '-createdAt',
      limit: 50,
      depth: 0,
    },
    { revalidate: 60, tags: ['job-listings'] }
  );

  const jobs = res.docs;
  const departments = [...new Set(jobs.map((j) => j.department))].sort();

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Careers' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="bg-primary text-white">
        <div className="container-content section-padding">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Careers' },
            ]}
          />
          <Heading level={1} className="mt-4">
            Careers at FIT
          </Heading>
          <Text variant="body-lg" className="mt-4 max-w-2xl text-gray-200">
            Help us build the trading technology that powers financial markets.
            We are always looking for talented people to join our team.
          </Text>
        </div>
      </section>

      {/* Why Work at FIT */}
      <section className="section-padding bg-white">
        <div className="container-content">
          <Heading level={2}>Why Work at FIT</Heading>
          <Text variant="body-lg" className="mt-4 max-w-2xl text-slate-600">
            Join a 21-person team leading fintech innovation across MENA capital markets.
          </Text>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-terminal-border bg-gray-50 p-6">
              <Heading level={4} className="text-base">Innovation First</Heading>
              <Text variant="body-sm" className="mt-2 text-slate-600">
                Work with Next.js, React, TypeScript, PostgreSQL, Node.js, and Python on systems processing 1M+ daily transactions.
              </Text>
            </div>
            <div className="rounded-lg border border-terminal-border bg-gray-50 p-6">
              <Heading level={4} className="text-base">Regional Impact</Heading>
              <Text variant="body-sm" className="mt-2 text-slate-600">
                Our technology powers 90% of Oman&apos;s brokerage market and serves 28+ institutions across the GCC.
              </Text>
            </div>
            <div className="rounded-lg border border-terminal-border bg-gray-50 p-6">
              <Heading level={4} className="text-base">Professional Growth</Heading>
              <Text variant="body-sm" className="mt-2 text-slate-600">
                Competitive compensation, continuous learning opportunities, and a clear path for career advancement.
              </Text>
            </div>
            <div className="rounded-lg border border-terminal-border bg-gray-50 p-6">
              <Heading level={4} className="text-base">Collaborative Culture</Heading>
              <Text variant="body-sm" className="mt-2 text-slate-600">
                Small, focused teams working on complex financial systems. Every engineer has real ownership and visible impact.
              </Text>
            </div>
          </div>
        </div>
      </section>

      <JobListClient
        jobs={jobs.map((j) => ({
          id: j.id,
          title: j.title,
          slug: j.slug,
          department: j.department,
          location: j.location,
          type: j.type,
        }))}
        departments={departments}
      />

      <CTABanner
        heading="Don't see a role that fits?"
        subtext="We're always interested in hearing from talented people. Send us your resume and we'll keep you in mind."
        buttonLabel="Contact Us"
        buttonHref="/contact"
      />
    </>
  );
}
