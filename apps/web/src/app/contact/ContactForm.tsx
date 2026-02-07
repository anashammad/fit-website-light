'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Heading, Text, Button } from '@/components/atoms';
import { FormField } from '@/components/molecules/FormField';
import { Breadcrumb } from '@/components/molecules/Breadcrumb';

const productOptions = [
  { label: 'FIT Premium (OMS)', value: 'fit-premium' },
  { label: 'Wasata Backoffice', value: 'wasata-backoffice' },
  { label: 'Investor Vision (PMS)', value: 'investor-vision' },
  { label: 'Mobile & Web Trading', value: 'mobile-web-trading' },
  { label: 'FIT Surveillance', value: 'fit-surveillance' },
  { label: 'Digital Onboarding', value: 'digital-onboarding' },
  { label: 'API Middleware', value: 'api-middleware' },
  { label: 'Fund Management', value: 'fund-management' },
  { label: 'IPO Manager', value: 'ipo-manager' },
  { label: 'Banking Gateway', value: 'banking-gateway' },
  { label: 'Full Platform Suite', value: 'full-suite' },
  { label: 'Other / Not Sure', value: 'other' },
];

const companySizeOptions = [
  { label: '1-50 employees', value: '1-50' },
  { label: '51-200 employees', value: '51-200' },
  { label: '201-500 employees', value: '201-500' },
  { label: '500+ employees', value: '500+' },
];

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  product: string;
  companySize: string;
  useCase: string;
  message: string;
}

interface FormErrors {
  [key: string]: string | undefined;
}

const offices = [
  {
    country: 'Oman (HQ)',
    phone: '+968 24 700 454',
    address: 'P.O. Box 629, PC 112 Ruwi, Muscat',
  },
  {
    country: 'UAE',
    phone: '+971 43 055 390',
    address: 'P.O. Box 120804, Dubai',
  },
  {
    country: 'Jordan',
    phone: '+962 62 005 544',
    address: 'P.O. Box 930333, PC 11193 Amman',
  },
];

export default function ContactForm() {
  const searchParams = useSearchParams();
  const isDemo = searchParams?.get('type') === 'demo';
  const productParam = searchParams?.get('product') ?? '';

  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    product: productParam,
    companySize: '',
    useCase: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (productParam) {
      setFormData((prev) => ({ ...prev, product: productParam }));
    }
  }, [productParam]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function validate(): FormErrors {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.company.trim()) newErrors.company = 'Company name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim() && !isDemo) {
      newErrors.message = 'Message is required.';
    }
    if (isDemo && !formData.useCase.trim()) {
      newErrors.useCase = 'Please describe your use case.';
    }
    return newErrors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError('');

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    try {
      const endpoint = isDemo ? '/api/demo' : '/api/contact';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Submission failed. Please try again.');
      }

      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <>
        <section className="bg-primary pb-16 pt-20">
          <div className="container-content">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: isDemo ? 'Request Demo' : 'Contact' },
              ]}
              className="[&_span]:text-gray-500 [&_a]:text-gray-500 [&_a:hover]:text-accent"
            />
            <Heading level={1} className="mt-2 text-white">
              Thank you for reaching out
            </Heading>
            <Text variant="body-lg" className="mt-4 text-gray-400">
              We have received your {isDemo ? 'demo request' : 'message'} and will respond within
              one business day.
            </Text>
          </div>
        </section>
        <section className="section-padding bg-surface">
          <div className="container-content max-w-2xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-terminal-green/20 bg-terminal-green/10">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-terminal-green" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <Heading level={2} className="text-white">Submission received</Heading>
            <Text className="mt-4 text-gray-400">
              Our team will review your {isDemo ? 'request' : 'message'} and get back to you
              shortly. In the meantime, feel free to explore our products.
            </Text>
            <div className="mt-8">
              <a
                href="/products/fit-premium"
                className="text-accent underline hover:text-accent-light"
              >
                Explore FIT Premium
              </a>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="bg-primary pb-16 pt-20">
        <div className="container-content">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: isDemo ? 'Request Demo' : 'Contact' },
            ]}
            className="[&_span]:text-gray-500 [&_a]:text-gray-500 [&_a:hover]:text-accent"
          />
          <Heading level={1} className="mt-2 text-white">
            {isDemo
              ? 'See FIT in action. Request a demo.'
              : "Let's talk about your trading infrastructure"}
          </Heading>
          <Text variant="body-lg" className="mt-4 max-w-2xl text-gray-400">
            Tell us about your organization and what you need. Our team will respond within one
            business day.
          </Text>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-content">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    name="name"
                    label="Full name"
                    required
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                  />
                  <FormField
                    name="company"
                    label="Company"
                    required
                    placeholder="Your company"
                    value={formData.company}
                    onChange={handleChange}
                    error={errors.company}
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    name="email"
                    label="Work email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                  />
                  <FormField
                    name="phone"
                    label="Phone number"
                    type="tel"
                    placeholder="+968 XXXX XXXX"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                  />
                </div>

                <FormField
                  name="product"
                  label="Product interest"
                  type="select"
                  options={productOptions}
                  value={formData.product}
                  onChange={handleChange}
                  error={errors.product}
                />

                {isDemo && (
                  <>
                    <FormField
                      name="companySize"
                      label="Company size"
                      type="select"
                      options={companySizeOptions}
                      value={formData.companySize}
                      onChange={handleChange}
                      error={errors.companySize}
                    />
                    <FormField
                      name="useCase"
                      label="Describe your use case"
                      type="textarea"
                      required
                      placeholder="Tell us what you are looking to achieve with FIT..."
                      value={formData.useCase}
                      onChange={handleChange}
                      error={errors.useCase}
                    />
                  </>
                )}

                <FormField
                  name="message"
                  label={isDemo ? 'Additional notes (optional)' : 'Message'}
                  type="textarea"
                  required={!isDemo}
                  placeholder={
                    isDemo
                      ? 'Anything else we should know?'
                      : 'How can we help you?'
                  }
                  value={formData.message}
                  onChange={handleChange}
                  error={errors.message}
                />

                {submitError && (
                  <div role="alert" className="rounded border border-error/30 bg-error/10 p-4">
                    <Text variant="body-sm" className="text-error">
                      {submitError}
                    </Text>
                  </div>
                )}

                <Button type="submit" size="lg" loading={submitting}>
                  {isDemo ? 'Request Demo' : 'Send Message'}
                </Button>
              </form>
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Direct Contact */}
              <div>
                <Heading level={3} className="text-white">Contact us directly</Heading>
                <div className="mt-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mt-0.5 shrink-0 text-accent" aria-hidden="true">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <Text variant="body-sm" className="font-medium text-gray-300">Email</Text>
                      <a href="mailto:info@fitmena.com" className="text-body-sm text-accent hover:text-accent-light transition-colors">info@fitmena.com</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Locations */}
              <div>
                <Heading level={3} className="text-white">Our offices</Heading>
                <div className="mt-4 space-y-4">
                  {offices.map((office) => (
                    <div key={office.country} className="rounded-lg border border-terminal-border bg-primary p-4">
                      <Text variant="body-sm" className="font-semibold text-white">{office.country}</Text>
                      <Text variant="body-sm" className="mt-1 text-gray-500">{office.address}</Text>
                      <a
                        href={`tel:${office.phone.replace(/\s/g, '')}`}
                        className="mt-1 inline-block font-mono text-ticker text-accent hover:text-accent-light transition-colors"
                      >
                        {office.phone}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Calendly Embed Section */}
              <div>
                <Heading level={3} className="text-white">Book a time directly</Heading>
                <Text variant="body-sm" className="mt-2 text-gray-400">
                  Prefer to schedule a specific time? Book a 30-minute call with our team.
                </Text>
                {/* TODO: Replace with real Calendly URL from CMS SiteSettings */}
                <div className="mt-4">
                  <a
                    href="https://calendly.com/fit-demo/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-lg border border-accent/40 bg-transparent px-6 py-3 text-body-sm font-semibold text-accent transition-all hover:bg-accent/10 hover:border-accent/60"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2" aria-hidden="true">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    Book a 30-Minute Call
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
