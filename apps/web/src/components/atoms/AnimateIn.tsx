'use client';

import { cn } from '@/lib/utils';
import { useInView } from '@/hooks/useInView';

export interface AnimateInProps {
  children: React.ReactNode;
  className?: string;
  /** Animation variant */
  variant?: 'fade-up' | 'fade' | 'fade-left' | 'fade-right';
  /** Delay in ms */
  delay?: number;
}

export function AnimateIn({
  children,
  className,
  variant = 'fade-up',
  delay = 0,
}: AnimateInProps) {
  const { ref, inView } = useInView({ threshold: 0.1 });

  const baseStyles = 'transition-all duration-700 ease-out';

  const hiddenStyles: Record<string, string> = {
    'fade-up': 'opacity-0 translate-y-8',
    fade: 'opacity-0',
    'fade-left': 'opacity-0 -translate-x-8',
    'fade-right': 'opacity-0 translate-x-8',
  };

  const visibleStyles = 'opacity-100 translate-y-0 translate-x-0';

  return (
    <div
      ref={ref}
      className={cn(
        baseStyles,
        inView ? visibleStyles : hiddenStyles[variant],
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
