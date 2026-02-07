import type { GlobalConfig } from 'payload';
import { isAdmin } from '../access/isAdmin';

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation',
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Menu Items',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text' },
        {
          name: 'children',
          type: 'array',
          label: 'Dropdown Items',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'url', type: 'text', required: true },
            { name: 'description', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'ctaButton',
      type: 'group',
      label: 'CTA Button',
      fields: [
        { name: 'label', type: 'text', required: true, defaultValue: 'Request Demo' },
        { name: 'url', type: 'text', required: true, defaultValue: '/contact' },
      ],
    },
  ],
};
