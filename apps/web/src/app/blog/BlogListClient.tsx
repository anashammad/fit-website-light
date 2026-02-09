'use client';

import { useState } from 'react';
import { BlogCard } from '@/components/molecules';
import { CategoryFilter } from '@/components/molecules';
import { Text } from '@/components/atoms';
import { formatDate } from '@/lib/utils';

interface PostSummary {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  categoryName: string;
  categorySlug: string;
  featuredImage: string;
  readTime?: string;
}

interface BlogListClientProps {
  initialPosts: PostSummary[];
  categories: { name: string; slug: string }[];
}

export function BlogListClient({
  initialPosts,
  categories,
}: BlogListClientProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  const categoryOptions = [
    { label: 'All', value: 'all' },
    ...categories.map((c) => ({ label: c.name, value: c.slug })),
  ];

  const filtered =
    activeCategory === 'all'
      ? initialPosts
      : initialPosts.filter((p) => p.categorySlug === activeCategory);

  return (
    <section className="container-content section-padding">
      <CategoryFilter
        categories={categoryOptions}
        active={activeCategory}
        onChange={setActiveCategory}
        className="mb-10"
      />

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 py-20 text-center">
          <Text variant="body" className="text-slate-400">
            No articles found in this category.
          </Text>
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className="mt-4 text-body-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            View all articles
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, index) => (
            <div key={post.id} className={index === 0 && filtered.length > 1 ? 'sm:col-span-2' : ''}>
              <BlogCard
                title={post.title}
                excerpt={post.excerpt}
                category={post.categoryName}
                author={post.author}
                date={formatDate(post.publishedAt)}
                readTime={post.readTime}
                featuredImage={post.featuredImage}
                href={`/blog/${post.categorySlug}/${post.slug}`}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
