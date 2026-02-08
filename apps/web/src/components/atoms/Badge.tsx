import { cn } from '@/lib/utils';

export type BadgeVariant = 'default' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';

export interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-slate-100 text-slate-600',
  secondary: 'bg-blue-50 text-blue-700',
  accent: 'bg-accent-muted text-accent',
  success: 'bg-success-light text-terminal-green',
  warning: 'bg-warning-light text-terminal-amber',
  error: 'bg-error-light text-terminal-red',
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
