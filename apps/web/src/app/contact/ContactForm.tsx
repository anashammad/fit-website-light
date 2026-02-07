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
              className="[&_span]:text-gray-400 [&_a]:text-gray-400 [&_a:hover]:text-white"
            />
            <Heading level={1} className="mt-2 text-white">
              Thank you for reaching out
            </Heading>
            <Text variant="body-lg" className="mt-4 text-gray-300">
              We have received your {isDemo ? 'demo request' : 'message'} and will respond within
              one business day.
            </Text>
          </div>
        </section>
        <section className="section-padding bg-white">
          <div className="container-content max-w-2xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-600" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <Heading level={2}>Submission received</Heading>
            <Text className="mt-4 text-gray-600">
              Our team will review your {isDemo ? 'request' : 'message'} and get back to you
              shortly. In the meantime, feel free to explore our products.
            </Text>
            <div className="mt-8">
              <a
                href="/products/fit-premium"
                className="text-secondary underline hover:text-secondary-hover"
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
            className="[&_span]:text-gray-400 [&_a]:text-gray-400 [&_a:hover]:text-white"
          />
          <Heading level={1} className="mt-2 text-white">
            {isDemo
              ? 'See FIT in action. Request a demo.'
              : "Let's talk about your trading infrastructure"}
          </Heading>
          <Text variant="body-lg" className="mt-4 max-w-2xl text-gray-300">
            Tell us about your organization and what you need. Our team will respond within one
            business day.
          </Text>
        </div>
      </section>

      <section className="section-padding bg-white">
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
                  <div role="alert" className="rounded border border-red-200 bg-red-50 p-4">
                    <Text variant="body-sm" className="text-red-700">
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
                <Heading level={3}>Contact us directly</Heading>
                <div className="mt-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mt-0.5 shrink-0 text-secondary" aria-hidden="true">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <Text variant="body-sm" className="font-medium text-gray-700">Email</Text>
                      <Text variant="body-sm" className="text-gray-600">info@fitoman.com</Text>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mt-0.5 shrink-0 text-secondary" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                    </svg>
                    <div>
                      {/* TODO: Replace with real phone from CMS SiteSettings */}
                      <Text variant="body-sm" className="font-medium text-gray-700">Phone</Text>
                      <Text variant="body-sm" className="text-gray-600">+968 2412 3456</Text>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Location */}
              <div>
                <Heading level={3}>Our office</Heading>
                <div className="mt-4">
                  <div className="flex items-start gap-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mt-0.5 shrink-0 text-secondary" aria-hidden="true">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <div>
                      <Text variant="body-sm" className="font-medium text-gray-700">
                        Muscat, Oman
                      </Text>
                      <Text variant="body-sm" className="text-gray-600">
                        FIT Headquarters
                      </Text>
                      {/* TODO: Replace with real address from CMS SiteSettings */}
                      <Text variant="body-sm" className="mt-1 text-gray-500">
                        Al Khuwair, Muscat, Sultanate of Oman
                      </Text>
                    </div>
                  </div>
                  {/* TODO: Replace with real Google Maps embed */}
                  <div className="mt-4 overflow-hidden rounded-lg border border-gray-200">
                    <iframe
                      title="FIT Office Location"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.2!2d58.4!3d23.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDM2JzAwLjAiTiA1OMKwMjQnMDAuMCJF!5e0!3m2!1sen!2som!4v1700000000000"
                      width="100%"
                      height="192"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>

              {/* Calendly Embed Section */}
              <div>
                <Heading level={3}>Book a time directly</Heading>
                <Text variant="body-sm" className="mt-2 text-gray-600">
                  Prefer to schedule a specific time? Book a 30-minute call with our team.
                </Text>
                {/* TODO: Replace with real Calendly URL from CMS SiteSettings */}
                <div className="mt-4">
                  <a
                    href="https://calendly.com/fit-demo/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-lg border border-secondary bg-white px-6 py-3 text-body-sm font-semibold text-secondary transition-colors hover:bg-secondary hover:text-white"
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
