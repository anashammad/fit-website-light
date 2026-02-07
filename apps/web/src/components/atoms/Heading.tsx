import { cn } from '@/lib/utils';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingProps {
  level: HeadingLevel;
  as?: HeadingTag;
  children: React.ReactNode;
  className?: string;
}

const levelStyles: Record<HeadingLevel, string> = {
  1: 'text-[2rem] leading-tight md:text-h1',
  2: 'text-[1.75rem] leading-tight md:text-h2',
  3: 'text-[1.375rem] leading-snug md:text-h3',
  4: 'text-[1.125rem] leading-snug md:text-h4',
  5: 'text-h5',
  6: 'text-h6',
};

export function Heading({ level, as, children, className }: HeadingProps) {
  const Tag = as ?? (`h${level}` as HeadingTag);

  return (
    <Tag className={cn('text-white', levelStyles[level], className)}>
      {children}
    </Tag>
  );
}
