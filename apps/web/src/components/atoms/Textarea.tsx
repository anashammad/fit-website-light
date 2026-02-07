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
          className="text-body-sm font-medium text-gray-700"
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
            'min-h-[120px] resize-y rounded border px-4 py-3 text-body text-gray-800 placeholder:text-gray-400',
            'transition-colors duration-150',
            'focus:border-secondary focus:outline-none focus:ring-[3px] focus:ring-secondary/20',
            'disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400',
            error
              ? 'border-error focus:border-error focus:ring-error/20'
              : 'border-gray-300',
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
          <p id={hintId} className="text-caption text-gray-400">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
