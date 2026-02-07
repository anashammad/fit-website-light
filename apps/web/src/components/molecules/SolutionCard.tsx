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
        'group flex flex-col rounded-lg border border-gray-200 bg-white p-8 shadow-card',
        'transition-all duration-200 ease-out',
        'hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-card-hover',
        className
      )}
    >
      <Icon name={icon} size={40} />
      <Heading level={4} className="mt-4">
        {name}
      </Heading>
      <Text variant="body-sm" className="mt-2 line-clamp-1">
        {description}
      </Text>
      <span className="mt-auto pt-4 text-body-sm font-semibold text-secondary transition-colors group-hover:text-secondary-hover">
        See Solution &rarr;
      </span>
    </Link>
  );
}
