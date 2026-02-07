'use client';

import { useState, useRef } from 'react';
import { applicationSchema } from '@/lib/validation';
import { Button, Text } from '@/components/atoms';
import { FormField } from '@/components/molecules';

interface ApplicationFormClientProps {
  jobSlug: string;
}

export function ApplicationFormClient({ jobSlug }: ApplicationFormClientProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setServerError('');

    const form = e.currentTarget;
    const fd = new FormData(form);

    // Client-side validation
    const data = {
      name: fd.get('name') as string,
      email: fd.get('email') as string,
      phone: (fd.get('phone') as string) || undefined,
      coverLetter: (fd.get('coverLetter') as string) || undefined,
      linkedinUrl: (fd.get('linkedinUrl') as string) || undefined,
      jobSlug,
    };

    const result = applicationSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const [key, messages] of Object.entries(result.error.flatten().fieldErrors)) {
        if (messages && messages.length > 0) {
          fieldErrors[key] = messages[0];
        }
      }
      setErrors(fieldErrors);
      return;
    }

    const resume = fd.get('resume') as File | null;
    if (!resume || resume.size === 0) {
      setErrors({ resume: 'Resume is required.' });
      return;
    }

    // Build submission FormData
    const submitData = new FormData();
    submitData.append('name', data.name);
    submitData.append('email', data.email);
    if (data.phone) submitData.append('phone', data.phone);
    if (data.coverLetter) submitData.append('coverLetter', data.coverLetter);
    if (data.linkedinUrl) submitData.append('linkedinUrl', data.linkedinUrl);
    submitData.append('jobSlug', jobSlug);
    submitData.append('resume', resume);

    setStatus('submitting');

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        body: submitData,
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setServerError(body.error || 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }

      setStatus('success');
      formRef.current?.reset();
    } catch {
      setServerError('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="py-8 text-center">
        <Text variant="body" className="font-semibold text-accent">
          Application submitted!
        </Text>
        <Text variant="body-sm" className="mt-2 text-gray-400">
          Thank you for your interest. We will review your application and get back to you.
        </Text>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" noValidate>
      <FormField
        label="Full Name"
        name="name"
        type="text"
        required
        error={errors.name}
      />

      <FormField
        label="Email"
        name="email"
        type="email"
        required
        error={errors.email}
      />

      <FormField
        label="Phone"
        name="phone"
        type="tel"
        error={errors.phone}
      />

      <div>
        <label htmlFor="resume" className="mb-1.5 block text-body-sm font-medium text-gray-300">
          Resume <span className="text-red-400">*</span>
        </label>
        <input
          id="resume"
          name="resume"
          type="file"
          accept=".pdf,.doc,.docx"
          aria-required="true"
          className="block w-full text-body-sm text-gray-300 file:mr-3 file:rounded file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-body-sm file:font-medium file:text-gray-300 hover:file:bg-white/15"
        />
        {errors.resume && (
          <p className="mt-1 text-caption text-red-400">{errors.resume}</p>
        )}
      </div>

      <FormField
        label="LinkedIn URL"
        name="linkedinUrl"
        type="url"
        error={errors.linkedinUrl}
      />

      <div>
        <label htmlFor="coverLetter" className="mb-1.5 block text-body-sm font-medium text-gray-300">
          Cover Letter
        </label>
        <textarea
          id="coverLetter"
          name="coverLetter"
          rows={4}
          maxLength={5000}
          className="w-full rounded-md border border-terminal-border bg-primary px-3 py-2 text-body-sm text-white placeholder:text-gray-500 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/20"
          placeholder="Tell us why you're interested in this role..."
        />
        {errors.coverLetter && (
          <p className="mt-1 text-caption text-red-400">{errors.coverLetter}</p>
        )}
      </div>

      {serverError && (
        <p role="alert" className="text-body-sm text-red-400">{serverError}</p>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Submitting...' : 'Submit Application'}
      </Button>
    </form>
  );
}
