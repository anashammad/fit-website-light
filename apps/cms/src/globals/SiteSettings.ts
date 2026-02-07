import type { GlobalConfig } from 'payload';
import { isAdmin } from '../access/isAdmin';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'FIT',
    },
    {
      name: 'tagline',
      type: 'text',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'contactEmail',
      type: 'email',
      required: true,
    },
    {
      name: 'contactPhone',
      type: 'text',
    },
    {
      name: 'address',
      type: 'textarea',
    },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        { name: 'linkedin', type: 'text' },
        { name: 'twitter', type: 'text' },
      ],
    },
    {
      name: 'trustBar',
      type: 'group',
      label: 'Trust Bar (Homepage)',
      fields: [
        {
          name: 'stats',
          type: 'array',
          maxRows: 4,
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'value', type: 'text', required: true },
          ],
        },
        {
          name: 'clientLogos',
          type: 'array',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'logo', type: 'upload', relationTo: 'media', required: true },
            { name: 'url', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'defaultSeo',
      type: 'group',
      label: 'Default SEO',
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
};
