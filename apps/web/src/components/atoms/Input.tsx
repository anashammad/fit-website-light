import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, required, className, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-');
    const errorId = error ? `${inputId}-error` : undefined;
    const hintId = hint && !error ? `${inputId}-hint` : undefined;

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className="text-body-sm font-medium text-gray-300"
        >
          {label}
          {required && <span className="ml-0.5 text-error">*</span>}
        </label>
        <input
          ref={ref}
          id={inputId}
          required={required}
          aria-required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId ?? hintId}
          className={cn(
            'h-11 rounded border bg-primary px-4 py-3 text-body text-gray-200 placeholder:text-gray-600',
            'transition-colors duration-150',
            'focus:border-accent focus:outline-none focus:ring-[3px] focus:ring-accent/20',
            'disabled:cursor-not-allowed disabled:bg-surface disabled:text-gray-600',
            error
              ? 'border-error focus:border-error focus:ring-error/20'
              : 'border-terminal-border',
            className
          )}
          {...props}
        />
        {error && (
          <p id={errorId} className="text-caption text-error" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={hintId} className="text-caption text-gray-500">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
