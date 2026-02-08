import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  company: z.string().min(1, 'Company is required').max(100),
  phone: z.string().max(20).optional(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000),
  product: z
    .enum([
      'fit-premium',
      'wasata-backoffice',
      'investor-vision',
      'mobile-web-trading',
      'fit-surveillance',
      'digital-onboarding',
      'api-middleware',
      'fund-management',
      'ipo-manager',
      'banking-gateway',
      'full-suite',
      'other',
    ])
    .optional(),
});

export const demoRequestSchema = contactFormSchema.extend({
  message: z.string().max(2000).optional(),
  companySize: z
    .enum(['1-50', '51-200', '201-500', '500+'])
    .optional(),
  useCase: z.string().max(5000).optional(),
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
