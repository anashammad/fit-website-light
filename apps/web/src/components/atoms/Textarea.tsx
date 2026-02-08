import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, id, required, className, ...props }, ref) => {
    const textareaId = id ?? label.toLowerCase().replace(/\s+/g, '-');
    const errorId = error ? `${textareaId}-error` : undefined;
    const hintId = hint && !error ? `${textareaId}-hint` : undefined;

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={textareaId}
          className="text-body-sm font-medium text-slate-700"
        >
          {label}
          {required && <span className="ml-0.5 text-error">*</span>}
        </label>
        <textarea
          ref={ref}
          id={textareaId}
          required={required}
          aria-required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId ?? hintId}
          className={cn(
            'min-h-[120px] resize-y rounded border bg-white px-4 py-3 text-body text-slate-800 placeholder:text-slate-400',
            'transition-colors duration-150',
            'focus:border-accent focus:outline-none focus:ring-[3px] focus:ring-accent/20',
            'disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400',
            error
              ? 'border-error focus:border-error focus:ring-error/20'
              : 'border-slate-200',
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
          <p id={hintId} className="text-caption text-slate-400">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
