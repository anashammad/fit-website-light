'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/atoms';

export interface NewsletterSignupProps {
  className?: string;
}

export function NewsletterSignup({ className }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setError('');
    setSubmitting(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Subscription failed. Please try again.');
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className={className}>
        <p className="text-body-sm font-medium text-terminal-green">
          Thank you! We&apos;ll notify you when the newsletter launches.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <p className="mb-2 text-body-sm text-slate-400">
        Newsletter coming soon. Leave your email to be notified.
      </p>
      <div className="flex gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          aria-label="Email address for newsletter"
          className="h-11 flex-1 rounded border border-slate-200 bg-white px-4 text-body-sm text-slate-800 placeholder:text-slate-400 transition-colors focus:border-accent focus:outline-none focus:ring-[3px] focus:ring-accent/20"
        />
        <Button type="submit" variant="primary" size="sm" loading={submitting}>
          Notify Me
        </Button>
      </div>
      {error && (
        <p className="mt-2 text-body-sm text-error">{error}</p>
      )}
    </form>
  );
}
