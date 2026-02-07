'use client';

import { useState } from 'react';
import { BlogCard } from '@/components/molecules';
import { CategoryFilter } from '@/components/molecules';
import { Text } from '@/components/atoms';

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
}

interface BlogListClientProps {
  initialPosts: PostSummary[];
  categories: string[];
  totalPages: number;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function BlogListClient({
  initialPosts,
  categories,
}: BlogListClientProps) {
  const [activeCategory, setActiveCategory] = useState('All');

  const allCategories = ['All', ...categories];

  const filtered =
    activeCategory === 'All'
      ? initialPosts
      : initialPosts.filter((p) => p.categoryName === activeCategory);

  return (
    <section className="container-content section-padding">
      <CategoryFilter
        categories={allCategories}
        active={activeCategory}
        onChange={setActiveCategory}
        className="mb-10"
      />

      {filtered.length === 0 ? (
        <Text variant="body" className="py-16 text-center text-gray-500">
          No articles found in this category.
        </Text>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <BlogCard
              key={post.id}
              title={post.title}
              excerpt={post.excerpt}
              category={post.categoryName}
              author={post.author}
              date={formatDate(post.publishedAt)}
              featuredImage={post.featuredImage}
              href={`/blog/${post.categorySlug}/${post.slug}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
