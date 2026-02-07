import { cn } from '@/lib/utils';

export type TextVariant = 'body-lg' | 'body' | 'body-sm' | 'caption' | 'overline';

export interface TextProps {
  variant?: TextVariant;
  as?: 'p' | 'span' | 'div';
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<TextVariant, string> = {
  'body-lg': 'text-body-lg text-gray-800',
  body: 'text-body text-gray-800',
  'body-sm': 'text-body-sm text-gray-600',
  caption: 'text-caption text-gray-400',
  overline: 'text-overline uppercase text-gray-500',
};

export function Text({ variant = 'body', as: Tag = 'p', children, className }: TextProps) {
  return (
    <Tag className={cn(variantStyles[variant], className)}>
      {children}
    </Tag>
  );
}
