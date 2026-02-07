import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCollection } from '@/lib/payload';
import { buildMetadata, SITE_URL } from '@/lib/metadata';
import { Heading, Text, Badge } from '@/components/atoms';
import { Breadcrumb } from '@/components/molecules';
import { CTABanner } from '@/components/organisms';
import { ApplicationFormClient } from './ApplicationFormClient';

interface SeoFields {
  metaTitle?: string;
  metaDescription?: string;
}

interface JobListing {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  type: string;
  description: Record<string, unknown> | null;
  requirements: Record<string, unknown> | null;
  benefits: Record<string, unknown> | null;
  isActive: boolean;
  seo?: SeoFields;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getJob(slug: string): Promise<JobListing | null> {
  const res = await getCollection<JobListing>(
    'job-listings',
    {
      where: { slug, isActive: true } as Record<string, unknown>,
      limit: 1,
      depth: 0,
    },
    { tags: ['job-listings'] }
  );
  return res.docs[0] ?? null;
}

export async function generateStaticParams() {
  const res = await getCollection<JobListing>(
    'job-listings',
    {
      where: { isActive: true } as Record<string, unknown>,
      limit: 100,
      depth: 0,
    },
    { tags: ['job-listings'] }
  );

  return res.docs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJob(slug);
  if (!job) return {};

  return buildMetadata({
    title:
      job.seo?.metaTitle || `${job.title} | Careers | FIT — Trading Technology`,
    description:
      job.seo?.metaDescription ||
      `${job.title} — ${job.department} — ${job.location}. Apply now at FIT.`,
    path: `/careers/${slug}`,
  });
}

function renderRichText(body: unknown): React.ReactNode {
  if (!body) return null;
  if (typeof body === 'string') {
    return <div dangerouslySetInnerHTML={{ __html: body }} />;
  }
  if (typeof body === 'object' && 'root' in body) {
    const root = (
      body as {
        root: {
          children: Array<{
            text?: string;
            children?: Array<{ text?: string }>;
          }>;
        };
      }
    ).root;
    return (
      <div className="space-y-3">
        {root.children?.map((node, i) => {
          const text =
            node.text ??
            node.children?.map((c) => c.text).join('') ??
            '';
          return <p key={i}>{text}</p>;
        })}
      </div>
    );
  }
  return null;
}

function formatJobType(type: string): string {
  return type
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('-');
}

export default async function JobDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const job = await getJob(slug);

  if (!job) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: `${job.title} — ${job.department} — ${job.location}. Join FIT.`,
    datePosted: new Date().toISOString().split('T')[0],
    employmentType: job.type.toUpperCase().replace('-', '_'),
    jobLocation: {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressLocality: job.location },
    },
    applicantLocationRequirements: {
      '@type': 'Country',
      name: 'OM',
    },
    hiringOrganization: {
      '@type': 'Organization',
      name: 'FIT',
      sameAs: SITE_URL,
      logo: `${SITE_URL}/images/logo.png`,
    },
    url: `${SITE_URL}/careers/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="bg-neutral-light">
        <div className="container-content section-padding">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Careers', href: '/careers' },
              { label: job.title },
            ]}
          />

          <div className="mt-6">
            <Heading level={1}>{job.title}</Heading>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="secondary">{job.department}</Badge>
              <Badge>{job.location}</Badge>
              <Badge>{formatJobType(job.type)}</Badge>
            </div>
          </div>
        </div>
      </section>

      <div className="container-content section-padding">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            {job.description && (
              <section className="mb-10">
                <Heading level={2} className="mb-4">
                  About the Role
                </Heading>
                <div className="prose prose-lg">
                  {renderRichText(job.description)}
                </div>
              </section>
            )}

            {job.requirements && (
              <section className="mb-10">
                <Heading level={2} className="mb-4">
                  Requirements
                </Heading>
                <div className="prose prose-lg">
                  {renderRichText(job.requirements)}
                </div>
              </section>
            )}

            {job.benefits && (
              <section className="mb-10">
                <Heading level={2} className="mb-4">
                  Benefits
                </Heading>
                <div className="prose prose-lg">
                  {renderRichText(job.benefits)}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar: Application form */}
          <aside>
            <div className="sticky top-24 rounded-lg border border-gray-200 bg-white p-6 shadow-card">
              <Heading level={3} className="mb-2">
                Apply for this position
              </Heading>
              <Text variant="body-sm" className="mb-6 text-gray-500">
                Upload your resume and we will get back to you.
              </Text>
              <ApplicationFormClient jobSlug={slug} />
            </div>
          </aside>
        </div>
      </div>

      <CTABanner
        heading="Explore more opportunities"
        buttonLabel="View All Positions"
        buttonHref="/careers"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </>
  );
}
