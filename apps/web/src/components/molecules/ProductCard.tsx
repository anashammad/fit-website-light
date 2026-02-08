import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Icon, Heading, Text } from '@/components/atoms';

export interface ProductCardProps {
  name: string;
  description: string;
  icon: string;
  href: string;
  className?: string;
}

export function ProductCard({ name, description, icon, href, className }: ProductCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group flex min-h-[240px] flex-col rounded-lg border border-slate-200 bg-white p-8 shadow-card',
        'transition-all duration-300 ease-out',
        'hover:border-primary/20 hover:shadow-card-hover hover:-translate-y-1',
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded border border-slate-200 bg-slate-50">
        <Icon name={icon} size={24} className="text-primary" />
      </div>
      <Heading level={4} className="mt-4 text-slate-900">
        {name}
      </Heading>
      <Text variant="body-sm" className="mt-2 line-clamp-2 text-slate-500">
        {description}
      </Text>
      <span className="mt-auto pt-4 text-body-sm font-semibold text-primary transition-colors group-hover:text-primary-light">
        Learn More &rarr;
      </span>
    </Link>
  );
}
