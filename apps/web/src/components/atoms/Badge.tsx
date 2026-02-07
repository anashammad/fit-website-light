import { cn } from '@/lib/utils';

export type BadgeVariant = 'default' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';

export interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-gray-100 text-gray-700',
  secondary: 'bg-secondary-light text-secondary',
  accent: 'bg-teal-50 text-accent',
  success: 'bg-success-light text-green-700',
  warning: 'bg-warning-light text-amber-700',
  error: 'bg-error-light text-red-700',
};

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded px-2 py-1 text-caption font-medium',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
