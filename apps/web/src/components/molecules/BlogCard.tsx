import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Heading, Text } from '@/components/atoms';

export interface BlogCardProps {
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime?: string;
  featuredImage: string;
  href: string;
  className?: string;
}

export function BlogCard({
  title,
  excerpt,
  category,
  author,
  date,
  readTime,
  featuredImage,
  href,
  className,
}: BlogCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-card',
        'transition-all duration-200 ease-out',
        'hover:-translate-y-1 hover:border-primary/20 hover:shadow-card-hover',
        'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
        className
      )}
    >
      <div className="relative aspect-video overflow-hidden">
        {featuredImage ? (
          <Image
            src={featuredImage}
            alt={`Featured image for ${title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-200 group-hover:scale-105"
          />
        ) : (
          <div className={cn(
            'absolute inset-0 flex items-center justify-center',
            'bg-gradient-to-br from-primary/80 to-slate-700'
          )}>
            <span className="text-white/50 text-lg font-semibold">{category}</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <Text variant="overline" className="text-accent">
          {category}
        </Text>
        <Heading level={4} className="mt-2 line-clamp-2">
          {title}
        </Heading>
        <Text variant="body-sm" className="mt-2 line-clamp-3">
          {excerpt}
        </Text>
        <Text variant="caption" className="mt-auto border-t border-slate-100 pt-4">
          {date}{readTime ? <> &middot; {readTime}</> : null}
        </Text>
      </div>
    </Link>
  );
}
