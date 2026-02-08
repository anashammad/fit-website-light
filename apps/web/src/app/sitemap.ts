import type { MetadataRoute } from 'next';
import { getCollection } from '@/lib/payload';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fitoman.com';

interface PageEntry {
  path: string;
  changeFrequency: 'daily' | 'weekly' | 'monthly';
  priority: number;
}

const staticPages: PageEntry[] = [
  { path: '', changeFrequency: 'weekly', priority: 1.0 },
  // Products — 0.9
  { path: '/products', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/products/fit-premium', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/products/wasata-backoffice', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/products/investor-vision', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/products/mobile-web-trading', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/products/fit-surveillance', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/products/digital-onboarding', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/products/api-middleware', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/products/fund-management', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/products/ipo-manager', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/products/banking-gateway', changeFrequency: 'monthly', priority: 0.9 },
  // Solutions — 0.9
  { path: '/solutions', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/solutions/brokerage', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/solutions/exchanges', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/solutions/banks', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/solutions/regulators', changeFrequency: 'monthly', priority: 0.9 },
  // Technology — 0.8
  { path: '/technology', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/technology/architecture', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/technology/apis', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/technology/security', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/technology/performance', changeFrequency: 'monthly', priority: 0.8 },
  // Blog — 0.8
  { path: '/blog', changeFrequency: 'weekly', priority: 0.8 },
  // About — 0.6
  { path: '/about', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/about/leadership', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/about/clients', changeFrequency: 'monthly', priority: 0.6 },
  // Careers — 0.6
  { path: '/careers', changeFrequency: 'daily', priority: 0.6 },
  // Contact — 0.6
  { path: '/contact', changeFrequency: 'monthly', priority: 0.6 },
  // Security — 0.6
  { path: '/security', changeFrequency: 'monthly', priority: 0.6 },
  // Pricing — 0.6
  { path: '/pricing', changeFrequency: 'monthly', priority: 0.6 },
  // Privacy / Legal — 0.3
  { path: '/privacy-policy', changeFrequency: 'monthly', priority: 0.3 },
  { path: '/terms-of-service', changeFrequency: 'monthly', priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = staticPages.map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  // -- Dynamic blog posts from CMS --
  // TODO: Uncomment when Payload CMS is connected
  // const blogRes = await getCollection<{ slug: string; category: { slug: string }; publishedAt: string }>(
  //   'blog-posts',
  //   { where: { status: 'published' } as Record<string, unknown>, limit: 500, depth: 1 },
  //   { tags: ['blog-posts'] },
  // );
  // const blogEntries = blogRes.docs.map((post) => ({
  //   url: `${SITE_URL}/blog/${post.category?.slug ?? 'uncategorized'}/${post.slug}`,
  //   lastModified: new Date(post.publishedAt),
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.8,
  // }));
  const blogEntries: MetadataRoute.Sitemap = [];

  // -- Dynamic career listings from CMS --
  // TODO: Uncomment when Payload CMS is connected
  // const jobRes = await getCollection<{ slug: string; createdAt: string }>(
  //   'job-listings',
  //   { where: { isActive: true } as Record<string, unknown>, limit: 100, depth: 0 },
  //   { tags: ['job-listings'] },
  // );
  // const careerEntries = jobRes.docs.map((job) => ({
  //   url: `${SITE_URL}/careers/${job.slug}`,
  //   lastModified: new Date(job.createdAt),
  //   changeFrequency: 'daily' as const,
  //   priority: 0.6,
  // }));
  const careerEntries: MetadataRoute.Sitemap = [];

  return [...staticEntries, ...blogEntries, ...careerEntries];
}
