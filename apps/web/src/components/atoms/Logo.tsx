import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface LogoProps {
  variant?: 'dark' | 'light';
  className?: string;
}

export function Logo({ variant = 'dark', className }: LogoProps) {
  const src = '/images/logo.png';

  return (
    <Link href="/" className={cn('inline-flex items-center', className)} aria-label="FIT - Home">
      <Image
        src={src}
        alt="FIT"
        width={80}
        height={36}
        priority
        className="h-9 w-auto"
      />
    </Link>
  );
}
