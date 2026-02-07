import type { MetadataRoute } from 'next';

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
  // Solutions — 0.9
  { path: '/solutions/brokerage', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/solutions/exchanges', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/solutions/banks', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/solutions/regulators', changeFrequency: 'monthly', priority: 0.9 },
  // Technology — 0.8
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
  // Privacy — 0.3
  { path: '/privacy-policy', changeFrequency: 'monthly', priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return staticPages.map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
