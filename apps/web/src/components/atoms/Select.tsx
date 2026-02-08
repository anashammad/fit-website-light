import { forwardRef, type SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  hint?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, options, placeholder = 'Select...', error, hint, id, required, className, ...props },
    ref
  ) => {
    const selectId = id ?? label.toLowerCase().replace(/\s+/g, '-');
    const errorId = error ? `${selectId}-error` : undefined;
    const hintId = hint && !error ? `${selectId}-hint` : undefined;

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={selectId}
          className="text-body-sm font-medium text-slate-700"
        >
          {label}
          {required && <span className="ml-0.5 text-error">*</span>}
        </label>
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            required={required}
            aria-required={required}
            aria-invalid={error ? true : undefined}
            aria-describedby={errorId ?? hintId}
            className={cn(
              'h-11 w-full appearance-none rounded border bg-white px-4 py-3 pr-10 text-body text-slate-800',
              'transition-colors duration-150',
              'focus:border-accent focus:outline-none focus:ring-[3px] focus:ring-accent/20',
              'disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400',
              error
                ? 'border-error focus:border-error focus:ring-error/20'
                : 'border-slate-200',
              className
            )}
            {...props}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M4 6l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        {error && (
          <p id={errorId} className="text-caption text-error" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={hintId} className="text-caption text-slate-400">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
