import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCollection } from '@/lib/payload';
import { SITE_URL, buildMetadata, buildBreadcrumbSchema } from '@/lib/metadata';
import { Heading, Text } from '@/components/atoms';
import { Breadcrumb, BlogCard } from '@/components/molecules';
import { CTABanner } from '@/components/organisms';
import { STATIC_BLOG_POSTS } from '@/data/blog-posts';
import { formatDate } from '@/lib/utils';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface MediaDoc {
  url: string;
  alt: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  category: Category;
  featuredImage: MediaDoc;
}

interface PageProps {
  params: Promise<{ category: string }>;
}

const CATEGORY_MAP: Record<string, string> = {
  'trading-technology': 'Trading Technology',
  'digital-innovation': 'Digital Innovation',
  'compliance-risk': 'Compliance & Risk',
  'industry-insights': 'Industry Insights',
  'market-infrastructure': 'Market Infrastructure',
};

export async function generateStaticParams() {
  return Object.keys(CATEGORY_MAP).map((slug) => ({ category: slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryName = CATEGORY_MAP[category];
  if (!categoryName) return {};

  return buildMetadata({
    title: `${categoryName} — Blog`,
    description: `Articles and insights about ${categoryName.toLowerCase()} for MENA brokerages, exchanges, and capital markets.`,
    path: `/blog/${category}`,
  });
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const categoryName = CATEGORY_MAP[category];
  if (!categoryName) notFound();

  // Fetch posts filtered by category from CMS
  const postsRes = await getCollection<BlogPost>(
    'blog-posts',
    {
      where: { 'category.slug': category, status: 'published' } as Record<string, unknown>,
      sort: '-publishedAt',
      limit: 20,
      depth: 1,
    },
    { revalidate: 60, tags: ['blog-posts'] }
  );

  // Map CMS posts or fall back to static
  const cmsPosts = postsRes.docs;
  const posts = cmsPosts.length > 0
    ? cmsPosts.map((post) => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        author: post.author,
        publishedAt: post.publishedAt,
        categorySlug: post.category?.slug ?? 'uncategorized',
        featuredImage: post.featuredImage?.url ?? '',
      }))
    : STATIC_BLOG_POSTS
        .filter((p) => p.categorySlug === category)
        .map((post) => ({
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          author: post.author,
          publishedAt: post.publishedAt,
          categorySlug: post.categorySlug,
          featuredImage: post.featuredImage ?? '',
        }));

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Blog', url: `${SITE_URL}/blog` },
    { name: categoryName },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="relative overflow-hidden bg-slate-50">
        <div className="pointer-events-none absolute inset-0 bg-terminal-grid opacity-100" aria-hidden="true" />
        <div className="container-content relative z-10 section-padding">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: categoryName },
            ]}
            className="[&_span]:text-slate-500 [&_a]:text-slate-400 [&_a:hover]:text-primary"
          />
          <Heading level={1} className="mt-4 text-slate-900">
            {categoryName}
          </Heading>
          <Text variant="body-lg" className="mt-4 max-w-2xl text-slate-600">
            Articles and insights about {categoryName.toLowerCase()}.
          </Text>
        </div>
      </section>

      <section className="container-content section-padding">
        {posts.length === 0 ? (
          <Text variant="body" className="py-16 text-center text-slate-500">
            No articles in this category yet.
          </Text>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard
                key={post.id}
                title={post.title}
                excerpt={post.excerpt}
                category={categoryName}
                author={post.author}
                date={formatDate(post.publishedAt)}
                featuredImage={post.featuredImage}
                href={`/blog/${post.categorySlug}/${post.slug}`}
              />
            ))}
          </div>
        )}
      </section>

      <CTABanner
        heading="Ready to modernize your trading infrastructure?"
        buttonLabel="Request a Demo"
        buttonHref="/contact"
        secondaryLabel="Explore Products"
        secondaryHref="/products"
      />
    </>
  );
}
