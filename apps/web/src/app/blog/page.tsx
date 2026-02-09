import type { Metadata } from 'next';
import { getCollection } from '@/lib/payload';
import { SITE_URL, buildMetadata, buildBreadcrumbSchema } from '@/lib/metadata';
import { Heading, Text } from '@/components/atoms';
import { Breadcrumb, NewsletterSignup } from '@/components/molecules';
import { CTABanner } from '@/components/organisms';
import { BlogListClient } from './BlogListClient';
import { STATIC_BLOG_POSTS, type StaticBlogPost } from '@/data/blog-posts';

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

export const metadata: Metadata = buildMetadata({
  title: 'Trading Technology & Capital Markets Blog',
  description:
    'Expert insights on trading technology, order management systems, market surveillance, digital onboarding, and capital markets innovation for MENA brokerages and exchanges.',
  path: '/blog',
});

export default async function BlogIndex() {
  const [postsRes, categoriesRes] = await Promise.all([
    getCollection<BlogPost>(
      'blog-posts',
      {
        where: { status: 'published' },
        sort: '-publishedAt',
        limit: 12,
        depth: 1,
      },
      { revalidate: 60, tags: ['blog-posts'] }
    ),
    getCollection<Category>('categories', undefined, {
      revalidate: 60,
      tags: ['categories'],
    }),
  ]);

  const cmsPosts = postsRes.docs;
  const useStaticFallback = cmsPosts.length === 0;

  // Map CMS posts to the shape expected by BlogListClient
  const mappedCmsPosts = cmsPosts.map((post) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    author: post.author,
    publishedAt: post.publishedAt,
    categoryName: post.category?.name ?? 'Uncategorized',
    categorySlug: post.category?.slug ?? 'uncategorized',
    featuredImage: post.featuredImage?.url ?? '',
    readTime: '',
  }));

  // Map static posts to the same shape
  const mappedStaticPosts = STATIC_BLOG_POSTS.map((post: StaticBlogPost) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    author: post.author,
    publishedAt: post.publishedAt,
    categoryName: post.categoryName,
    categorySlug: post.categorySlug,
    featuredImage: post.featuredImage ?? '',
    readTime: post.readTime,
  }));

  const posts = useStaticFallback ? mappedStaticPosts : mappedCmsPosts;

  // Build categories list: from CMS if available, otherwise extract from static posts
  const categories: { name: string; slug: string }[] = useStaticFallback
    ? [...new Map(STATIC_BLOG_POSTS.map((p: StaticBlogPost) => [p.categorySlug, { name: p.categoryName, slug: p.categorySlug }])).values()]
    : categoriesRes.docs.map((c) => ({ name: c.name, slug: c.slug }));

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Blog' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="relative overflow-hidden bg-slate-50">
        <div className="pointer-events-none absolute inset-0 bg-terminal-grid opacity-100" aria-hidden="true" />
        <div className="container-content relative z-10 px-6 py-10 md:px-8 md:py-14 lg:py-16">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog' },
            ]}
            className="[&_span]:text-slate-500 [&_a]:text-slate-400 [&_a:hover]:text-primary"
          />
          <Heading level={1} className="mt-4 text-slate-900">
            Blog
          </Heading>
          <Text variant="body-lg" className="mt-4 max-w-2xl text-slate-600">
            Insights on trading technology, market infrastructure, compliance,
            and capital markets innovation.
          </Text>
        </div>
      </section>

      <BlogListClient
        initialPosts={posts}
        categories={categories}
      />

      <section className="bg-slate-50 py-12">
        <div className="container-content max-w-xl text-center">
          <Heading level={3} className="text-slate-900">
            Stay up to date
          </Heading>
          <Text className="mt-2 text-slate-500">
            Get the latest insights on trading technology and capital markets delivered to your inbox.
          </Text>
          <NewsletterSignup className="mt-6" />
        </div>
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
