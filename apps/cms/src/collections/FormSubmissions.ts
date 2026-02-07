import type { CollectionConfig } from 'payload';
import { isAdmin } from '../access/isAdmin';
import { sendNotificationEmail } from '../hooks/sendNotification';

export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  admin: {
    defaultColumns: ['name', 'email', 'source', 'createdAt'],
  },
  access: {
    read: isAdmin,
    create: () => true,
    update: isAdmin,
    delete: isAdmin,
  },
  hooks: {
    afterChange: [sendNotificationEmail],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'company',
      type: 'text',
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'message',
      type: 'textarea',
    },
    {
      name: 'productInterest',
      type: 'select',
      options: [
        'FIT Premium',
        'API Middleware',
        'Wasata Backoffice',
        'Order Surveillance',
        'Mobile & Web Trading',
        'Other',
      ],
    },
    {
      name: 'companySize',
      type: 'select',
      options: ['1-10', '11-50', '51-200', '201-500', '500+'],
    },
    {
      name: 'resume',
      type: 'upload',
      relationTo: 'resumes',
    },
    {
      name: 'coverLetter',
      type: 'textarea',
    },
    {
      name: 'linkedinUrl',
      type: 'text',
    },
    {
      name: 'source',
      type: 'select',
      required: true,
      options: [
        { label: 'Contact Form', value: 'contact' },
        { label: 'Demo Request', value: 'demo' },
        { label: 'Job Application', value: 'application' },
      ],
    },
    {
      name: 'jobListing',
      type: 'relationship',
      relationTo: 'job-listings',
    },
  ],
};
