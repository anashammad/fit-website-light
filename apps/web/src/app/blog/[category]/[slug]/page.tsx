import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getCollection } from '@/lib/payload';
import { buildMetadata, buildBreadcrumbSchema, SITE_URL } from '@/lib/metadata';
import { Heading, Text, Badge } from '@/components/atoms';
import { Breadcrumb, BlogCard, ShareButtons } from '@/components/molecules';
import { CTABanner } from '@/components/organisms';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface MediaDoc {
  url: string;
  alt: string;
}

interface SeoFields {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: MediaDoc;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: unknown;
  author: string;
  publishedAt: string;
  category: Category;
  featuredImage: MediaDoc;
  seo?: SeoFields;
}

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

async function getPost(slug: string): Promise<BlogPost | null> {
  const res = await getCollection<BlogPost>(
    'blog-posts',
    {
      where: { slug, status: 'published' } as Record<string, unknown>,
      limit: 1,
      depth: 1,
    },
    { tags: ['blog-posts'] }
  );
  return res.docs[0] ?? null;
}

async function getRelatedPosts(
  categoryId: string,
  excludeId: string
): Promise<BlogPost[]> {
  const res = await getCollection<BlogPost>(
    'blog-posts',
    {
      where: { category: categoryId, status: 'published' } as Record<
        string,
        unknown
      >,
      sort: '-publishedAt',
      limit: 4,
      depth: 1,
    },
    { revalidate: 60, tags: ['blog-posts'] }
  );
  return res.docs.filter((p) => p.id !== excludeId).slice(0, 3);
}

export async function generateStaticParams() {
  const res = await getCollection<BlogPost>(
    'blog-posts',
    {
      where: { status: 'published' } as Record<string, unknown>,
      limit: 100,
      depth: 1,
    },
    { tags: ['blog-posts'] }
  );

  return res.docs.map((post) => ({
    category: post.category?.slug ?? 'uncategorized',
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, category } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    path: `/blog/${category}/${slug}`,
    ogImage: post.seo?.ogImage?.url || post.featuredImage?.url,
  });
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function renderRichText(body: unknown): React.ReactNode {
  if (typeof body === 'string') {
    return <div dangerouslySetInnerHTML={{ __html: body }} />;
  }
  // Payload Lexical rich text is a JSON structure.
  // A full serializer would be needed; for now render root text content.
  if (body && typeof body === 'object' && 'root' in body) {
    const root = (body as { root: { children: Array<{ text?: string; children?: Array<{ text?: string }> }> } }).root;
    return (
      <div className="space-y-4">
        {root.children?.map((node, i) => {
          const text =
            node.text ??
            node.children?.map((c) => c.text).join('') ??
            '';
          return (
            <p key={i}>{text}</p>
          );
        })}
      </div>
    );
  }
  return null;
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug, category } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(
    post.category?.id,
    post.id
  );

  const articleUrl = `${SITE_URL}/blog/${category}/${slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: { '@type': 'Person', name: post.author },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    image: post.featuredImage?.url,
    url: articleUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
    publisher: {
      '@type': 'Organization',
      name: 'FIT',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.png`,
      },
    },
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Blog', url: `${SITE_URL}/blog` },
    { name: post.category?.name ?? 'Article', url: `${SITE_URL}/blog/${category}` },
    { name: post.title },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article>
        {/* Header */}
        <section className="bg-primary text-white">
          <div className="container-content section-padding">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Blog', href: '/blog' },
                { label: post.category?.name ?? 'Article' },
              ]}
            />

            <div className="mx-auto mt-6 max-w-3xl">
              <Badge variant="secondary">{post.category?.name}</Badge>
              <Heading level={1} className="mt-4">
                {post.title}
              </Heading>
              <Text variant="body-lg" className="mt-4 text-gray-200">
                {post.excerpt}
              </Text>
              <div className="mt-6 flex items-center gap-4">
                <Text variant="body-sm" className="text-gray-500">
                  {post.author}
                </Text>
                <span className="text-gray-400">&middot;</span>
                <Text variant="body-sm" className="text-gray-500">
                  {formatDate(post.publishedAt)}
                </Text>
              </div>
            </div>
          </div>
        </section>

        {/* Featured image */}
        {post.featuredImage?.url && (
          <div className="container-content mt-8">
            <div className="relative mx-auto aspect-video max-w-4xl overflow-hidden rounded-lg">
              <Image
                src={post.featuredImage.url}
                alt={post.featuredImage.alt || post.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* Body */}
        <section className="container-content section-padding">
          <div className="prose prose-lg prose-slate mx-auto max-w-3xl">
            {renderRichText(post.body)}
          </div>

          {/* Share */}
          <div className="mx-auto mt-12 max-w-3xl border-t border-terminal-border pt-6">
            <Text variant="body-sm" className="mb-3 font-medium text-slate-600">
              Share this article
            </Text>
            <ShareButtons url={articleUrl} title={post.title} />
          </div>
        </section>
      </article>

      {/* Related articles */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50">
          <div className="container-content section-padding">
            <Heading level={2} className="mb-8">
              Related Articles
            </Heading>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <BlogCard
                  key={related.id}
                  title={related.title}
                  excerpt={related.excerpt}
                  category={related.category?.name ?? 'Uncategorized'}
                  author={related.author}
                  date={formatDate(related.publishedAt)}
                  featuredImage={related.featuredImage?.url ?? ''}
                  href={`/blog/${related.category?.slug ?? 'uncategorized'}/${related.slug}`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner
        heading="Ready to modernize your trading infrastructure?"
        buttonLabel="Request a Demo"
        buttonHref="/contact"
      />
    </>
  );
}
