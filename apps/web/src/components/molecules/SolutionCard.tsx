import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Icon, Heading, Text } from '@/components/atoms';

export interface SolutionCardProps {
  name: string;
  description: string;
  icon: string;
  href: string;
  className?: string;
}

export function SolutionCard({ name, description, icon, href, className }: SolutionCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group flex flex-col rounded-lg border border-slate-200 bg-white p-8 shadow-card',
        'transition-all duration-300 ease-out',
        'hover:border-primary/20 hover:shadow-card-hover hover:-translate-y-1',
        className
      )}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded border border-slate-200 bg-slate-50">
        <Icon name={icon} size={24} className="text-primary" />
      </div>
      <Heading level={4} className="mt-4 text-slate-900">
        {name}
      </Heading>
      <Text variant="body-sm" className="mt-2 line-clamp-1 text-slate-500">
        {description}
      </Text>
      <span className="mt-auto pt-4 text-body-sm font-semibold text-primary transition-colors group-hover:text-primary-light">
        See Solution &rarr;
      </span>
    </Link>
  );
}
