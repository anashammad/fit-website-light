import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';
import { getCollection } from '@/lib/payload';
import { buildMetadata, buildBreadcrumbSchema, SITE_URL } from '@/lib/metadata';
import { formatDate } from '@/lib/utils';
import { Heading, Text, Badge } from '@/components/atoms';
import { Breadcrumb, BlogCard, ShareButtons } from '@/components/molecules';
import { CTABanner } from '@/components/organisms';
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
  updatedAt?: string;
  category: Category;
  featuredImage: MediaDoc;
  seo?: SeoFields;
  readTime?: string;
  wordCount?: number;
  keywords?: string[];
  metaTitle?: string;
  metaDescription?: string;
}

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

/** Convert a static blog post to the CMS BlogPost shape */
function staticToBlogPost(post: StaticBlogPost): BlogPost {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    body: post.body,
    author: post.author,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    category: {
      id: post.categorySlug,
      name: post.categoryName,
      slug: post.categorySlug,
    },
    featuredImage: { url: post.featuredImage ?? '', alt: post.title },
    readTime: post.readTime,
    wordCount: post.wordCount,
    keywords: post.keywords,
    metaTitle: post.metaTitle,
    metaDescription: post.metaDescription,
  };
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
  const cmsPost = res.docs[0] ?? null;
  if (cmsPost) return cmsPost;

  // Fall back to static posts
  const staticPost = STATIC_BLOG_POSTS.find((p) => p.slug === slug);
  return staticPost ? staticToBlogPost(staticPost) : null;
}

async function getRelatedPosts(
  categoryId: string,
  categorySlug: string,
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
  const cmsPosts = res.docs.filter((p) => String(p.id) !== String(excludeId)).slice(0, 3);
  if (cmsPosts.length > 0) return cmsPosts;

  // Fall back to static posts filtered by category slug
  return STATIC_BLOG_POSTS
    .filter((p) => p.categorySlug === categorySlug && p.id !== excludeId)
    .slice(0, 3)
    .map(staticToBlogPost);
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

  if (res.docs.length > 0) {
    return res.docs.map((post) => ({
      category: post.category?.slug ?? 'uncategorized',
      slug: post.slug,
    }));
  }

  // Fall back to static posts
  return STATIC_BLOG_POSTS.map((post) => ({
    category: post.categorySlug,
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
    title: post.seo?.metaTitle || post.metaTitle || post.title,
    description: post.seo?.metaDescription || post.metaDescription || post.excerpt,
    path: `/blog/${category}/${slug}`,
    ogImage: post.seo?.ogImage?.url || post.featuredImage?.url,
  });
}

function estimateWordCount(body: unknown): number {
  if (typeof body === 'string') {
    return body.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length;
  }
  return 0;
}

interface LexicalNode {
  type?: string;
  tag?: string;
  text?: string;
  format?: number | string;
  url?: string;
  children?: LexicalNode[];
  listType?: string;
  value?: number;
}

function renderLexicalNode(node: LexicalNode, index: number): React.ReactNode {
  // Text node
  if (node.type === 'text' && typeof node.text === 'string') {
    let content: React.ReactNode = node.text;
    const fmt = typeof node.format === 'number' ? node.format : 0;
    if (fmt & 1) content = <strong key={index}>{content}</strong>;
    if (fmt & 2) content = <em key={index}>{content}</em>;
    return content;
  }

  // Line break
  if (node.type === 'linebreak') {
    return <br key={index} />;
  }

  // Link
  if (node.type === 'link' || node.type === 'autolink') {
    return (
      <a key={index} href={node.url ?? '#'} className="text-primary underline hover:text-primary/80">
        {node.children?.map((child, ci) => renderLexicalNode(child, ci))}
      </a>
    );
  }

  const children = node.children?.map((child, ci) => renderLexicalNode(child, ci));

  // Heading
  if (node.type === 'heading') {
    const Tag = (node.tag as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') || 'h2';
    return <Tag key={index}>{children}</Tag>;
  }

  // Paragraph
  if (node.type === 'paragraph') {
    return <p key={index}>{children}</p>;
  }

  // List
  if (node.type === 'list') {
    const Tag = node.listType === 'number' ? 'ol' : 'ul';
    return <Tag key={index}>{children}</Tag>;
  }

  // List item
  if (node.type === 'listitem') {
    return <li key={index}>{children}</li>;
  }

  // Root or unknown wrapper — render children
  if (children && children.length > 0) {
    return <React.Fragment key={index}>{children}</React.Fragment>;
  }

  return null;
}

function renderRichText(body: unknown): React.ReactNode {
  if (typeof body === 'string') {
    return <div dangerouslySetInnerHTML={{ __html: body }} />;
  }
  // Payload Lexical rich text is a JSON structure.
  if (body && typeof body === 'object' && 'root' in body) {
    const root = (body as { root: LexicalNode }).root;
    return (
      <div className="space-y-4">
        {root.children?.map((node, i) => renderLexicalNode(node, i))}
      </div>
    );
  }
  return null;
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug, category } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  // Validate category matches the post's actual category (prevent duplicate content)
  const actualCategorySlug = post.category?.slug ?? 'uncategorized';
  if (category !== actualCategorySlug) {
    redirect(`/blog/${actualCategorySlug}/${slug}`);
  }

  const relatedPosts = post.category?.id
    ? await getRelatedPosts(
        post.category.id,
        post.category.slug ?? 'uncategorized',
        post.id
      )
    : [];

  const articleUrl = `${SITE_URL}/blog/${category}/${slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    author: { '@type': 'Person', name: post.author },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    ...(post.featuredImage?.url ? { image: post.featuredImage.url } : {}),
    url: articleUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
    wordCount: post.wordCount || estimateWordCount(post.body),
    articleSection: post.category?.name,
    inLanguage: 'en',
    ...(post.keywords?.length ? { keywords: post.keywords.join(', ') } : {}),
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
        <section className="relative overflow-hidden bg-slate-50">
          <div className="pointer-events-none absolute inset-0 bg-terminal-grid opacity-100" aria-hidden="true" />
          <div className="container-content relative z-10 section-padding">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Blog', href: '/blog' },
                { label: post.category?.name ?? 'Article', href: `/blog/${post.category?.slug}` },
                { label: post.title },
              ]}
              className="[&_span]:text-slate-500 [&_a]:text-slate-400 [&_a:hover]:text-primary"
            />

            <div className="mx-auto mt-4 max-w-3xl md:mt-6">
              <Badge variant="secondary">{post.category?.name}</Badge>
              <Heading level={1} className="mt-4 text-slate-900">
                {post.title}
              </Heading>
              <Text variant="body-lg" className="mt-4 text-slate-600">
                {post.excerpt}
              </Text>
              <div className="mt-6 flex items-center gap-4">
                <Text variant="body-sm" className="text-slate-500">
                  {formatDate(post.publishedAt)}
                </Text>
                {post.readTime && (
                  <>
                    <span className="text-slate-400">&middot;</span>
                    <Text variant="body-sm" className="text-slate-500">
                      {post.readTime}
                    </Text>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Featured image */}
        {post.featuredImage?.url && (
          <div className="container-content mt-4 md:mt-8">
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
        <section className="bg-slate-50">
          <div className="container-content section-padding">
            <Text variant="overline" className="mb-2 text-primary">
              Keep Reading
            </Text>
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
