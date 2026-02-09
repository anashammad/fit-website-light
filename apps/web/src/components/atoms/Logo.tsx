import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface LogoProps {
  variant?: 'dark' | 'light';
  className?: string;
}

export function Logo({ variant = 'dark', className }: LogoProps) {
  return (
    <Link href="/" className={cn('inline-flex items-center', className)} aria-label="FIT - Home">
      <span
        className={cn(
          'text-[2.75rem] font-extrabold leading-none tracking-tight',
          variant === 'dark' ? 'text-primary' : 'text-white'
        )}
      >
        FIT
      </span>
    </Link>
  );
}
