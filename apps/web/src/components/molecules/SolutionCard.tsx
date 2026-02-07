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
        'group flex flex-col rounded-lg border border-terminal-border bg-surface p-8',
        'transition-all duration-300 ease-out',
        'hover:border-accent/20 hover:shadow-[0_0_24px_rgba(212,168,67,0.06)] hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(212,168,67,0.1)]',
        className
      )}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded border border-terminal-border bg-surface-light">
        <Icon name={icon} size={24} className="text-accent" />
      </div>
      <Heading level={4} className="mt-4 text-white">
        {name}
      </Heading>
      <Text variant="body-sm" className="mt-2 line-clamp-1 text-gray-400">
        {description}
      </Text>
      <span className="mt-auto pt-4 text-body-sm font-semibold text-accent transition-colors group-hover:text-accent-light">
        See Solution &rarr;
      </span>
    </Link>
  );
}
