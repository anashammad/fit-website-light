import type { GlobalConfig } from 'payload';
import { isAdmin } from '../access/isAdmin';

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: 'columns',
      type: 'array',
      maxRows: 5,
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'url', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      defaultValue: 'FIT. All rights reserved.',
    },
  ],
};
