import type { Field } from 'payload';

export const seoFields: Field = {
  name: 'seo',
  type: 'group',
  label: 'SEO',
  admin: {
    description: 'Search engine optimization settings for this page.',
  },
  fields: [
    {
      name: 'metaTitle',
      type: 'text',
      label: 'Meta Title',
      maxLength: 60,
      admin: {
        description: 'Max 60 characters. Falls back to page title if empty.',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      label: 'Meta Description',
      maxLength: 160,
      admin: {
        description: 'Max 160 characters. Shown in search engine results.',
      },
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Social Share Image',
      admin: {
        description: 'Recommended: 1200x630px. Used when shared on social media.',
      },
    },
  ],
};
