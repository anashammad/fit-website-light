import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  company: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000),
  productInterest: z
    .enum([
      'FIT Premium',
      'API Middleware',
      'Wasata Backoffice',
      'Order Surveillance',
      'Mobile & Web Trading',
      'Other',
    ])
    .optional(),
});

export const demoRequestSchema = contactFormSchema.extend({
  companySize: z
    .enum(['1-10', '11-50', '51-200', '201-500', '500+'])
    .optional(),
});

export const applicationSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().max(20).optional(),
  coverLetter: z.string().max(5000).optional(),
  linkedinUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  jobSlug: z.string().min(1),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type DemoRequestData = z.infer<typeof demoRequestSchema>;
export type ApplicationData = z.infer<typeof applicationSchema>;
