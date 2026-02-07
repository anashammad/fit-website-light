import { cn } from '@/lib/utils';

export interface StatItemProps {
  value: string;
  label: string;
  className?: string;
}

export function StatItem({ value, label, className }: StatItemProps) {
  return (
    <div className={cn('flex flex-col items-center text-center', className)}>
      <span className="text-h2 font-semibold text-gray-900" aria-hidden="true">{value}</span>
      <span className="text-body-sm text-gray-500" aria-hidden="true">{label}</span>
      <span className="sr-only">{value} {label}</span>
    </div>
  );
}
