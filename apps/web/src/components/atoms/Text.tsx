import { cn } from '@/lib/utils';

export type TextVariant = 'body-lg' | 'body' | 'body-sm' | 'caption' | 'overline';

export interface TextProps {
  variant?: TextVariant;
  as?: 'p' | 'span' | 'div';
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<TextVariant, string> = {
  'body-lg': 'text-body-lg text-slate-600',
  body: 'text-body text-slate-600',
  'body-sm': 'text-body-sm text-slate-500',
  caption: 'text-caption text-slate-400',
  overline: 'text-label uppercase text-slate-400',
};

export function Text({ variant = 'body', as: Tag = 'p', children, className }: TextProps) {
  return (
    <Tag className={cn(variantStyles[variant], className)}>
      {children}
    </Tag>
  );
}
