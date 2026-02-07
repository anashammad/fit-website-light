import Link from 'next/link';
import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Spinner } from './Spinner';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-secondary text-white hover:bg-secondary-hover active:bg-secondary-hover',
  secondary:
    'bg-transparent text-secondary border border-secondary hover:bg-secondary hover:text-white active:bg-secondary-hover active:text-white',
  ghost:
    'bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200',
  danger:
    'bg-error text-white hover:bg-red-600 active:bg-red-700',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-body-sm rounded-sm',
  md: 'h-11 px-6 text-body rounded',
  lg: 'h-[52px] px-8 text-body rounded',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      iconLeft,
      iconRight,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-150 ease-out',
          'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-secondary/40 focus-visible:ring-offset-2',
          'hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)]',
          'active:translate-y-0 active:shadow-none',
          variantStyles[variant],
          sizeStyles[size],
          isDisabled && 'pointer-events-none opacity-50',
          className
        )}
        {...props}
      >
        {loading ? (
          <Spinner size={20} className="text-current" />
        ) : (
          <>
            {iconLeft && (
              <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center">
                {iconLeft}
              </span>
            )}
            {children}
            {iconRight && (
              <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center">
                {iconRight}
              </span>
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  href,
  iconLeft,
  iconRight,
  children,
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-150 ease-out',
        'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-secondary/40 focus-visible:ring-offset-2',
        'hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)]',
        'active:translate-y-0 active:shadow-none',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {iconLeft && (
        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center">
          {iconLeft}
        </span>
      )}
      {children}
      {iconRight && (
        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center">
          {iconRight}
        </span>
      )}
    </Link>
  );
}
