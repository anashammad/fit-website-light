import type { CollectionConfig } from 'payload';
import { isAdmin } from '../access/isAdmin';

export const Resumes: CollectionConfig = {
  slug: 'resumes',
  upload: {
    staticDir: '../resumes',
    mimeTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
  },
  access: {
    read: isAdmin,
    create: () => true,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'applicantName',
      type: 'text',
    },
  ],
};
