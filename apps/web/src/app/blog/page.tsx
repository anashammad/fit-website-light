import type { Metadata } from 'next';
import { getCollection } from '@/lib/payload';
import { SITE_URL, buildMetadata, buildBreadcrumbSchema } from '@/lib/metadata';
import { Heading, Text } from '@/components/atoms';
import { Breadcrumb } from '@/components/molecules';
import { CTABanner } from '@/components/organisms';
import { BlogListClient } from './BlogListClient';

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
  title: 'Blog | FIT — Trading Technology',
  description:
    'Insights on trading technology, OMS systems, compliance, and capital markets from the FIT team.',
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

  const categories = categoriesRes.docs;
  const posts = postsRes.docs;

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Blog' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="bg-neutral-light">
        <div className="container-content section-padding">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog' },
            ]}
          />
          <Heading level={1} className="mt-4">
            Blog
          </Heading>
          <Text variant="body-lg" className="mt-4 max-w-2xl text-gray-600">
            Insights on trading technology, market infrastructure, compliance,
            and capital markets innovation.
          </Text>
        </div>
      </section>

      <BlogListClient
        initialPosts={posts.map((post) => ({
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          author: post.author,
          publishedAt: post.publishedAt,
          categoryName: post.category?.name ?? 'Uncategorized',
          categorySlug: post.category?.slug ?? 'uncategorized',
          featuredImage: post.featuredImage?.url ?? '',
        }))}
        categories={categories.map((c) => c.name)}
        totalPages={postsRes.totalPages}
      />

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
