import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Heading, Badge } from '@/components/atoms';

export interface JobCardProps {
  title: string;
  department: string;
  location: string;
  type: string;
  href: string;
  className?: string;
}

export function JobCard({ title, department, location, type, href, className }: JobCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-6 shadow-card',
        'transition-all duration-200 ease-out',
        'hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-card-hover',
        className
      )}
    >
      <Heading level={4}>{title}</Heading>
      <div className="flex flex-wrap gap-2">
        <Badge>{department}</Badge>
        <Badge>{location}</Badge>
        <Badge>{type}</Badge>
      </div>
      <span className="mt-auto text-body-sm font-semibold text-primary transition-colors group-hover:text-primary-light">
        Apply Now &rarr;
      </span>
    </Link>
  );
}
