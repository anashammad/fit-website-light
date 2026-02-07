import type { CollectionConfig } from 'payload';
import { isAdmin } from '../access/isAdmin';
import { seoFields } from '../fields/seo';
import { revalidateNextjs } from '../hooks/revalidateNextjs';

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  hooks: {
    afterChange: [revalidateNextjs],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'sections',
      type: 'blocks',
      blocks: [
        {
          slug: 'hero',
          labels: { singular: 'Hero Section', plural: 'Hero Sections' },
          fields: [
            { name: 'headline', type: 'text', required: true },
            { name: 'subline', type: 'textarea' },
            { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
            {
              name: 'ctaPrimary',
              type: 'group',
              fields: [
                { name: 'label', type: 'text' },
                { name: 'url', type: 'text' },
              ],
            },
            {
              name: 'ctaSecondary',
              type: 'group',
              fields: [
                { name: 'label', type: 'text' },
                { name: 'url', type: 'text' },
              ],
            },
          ],
        },
        {
          slug: 'featureGrid',
          labels: { singular: 'Feature Grid', plural: 'Feature Grids' },
          fields: [
            { name: 'heading', type: 'text' },
            {
              name: 'features',
              type: 'array',
              fields: [
                { name: 'icon', type: 'text' },
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
              ],
            },
          ],
        },
        {
          slug: 'richContent',
          labels: { singular: 'Rich Content', plural: 'Rich Content Blocks' },
          fields: [
            { name: 'content', type: 'richText', required: true },
          ],
        },
        {
          slug: 'ctaBanner',
          labels: { singular: 'CTA Banner', plural: 'CTA Banners' },
          fields: [
            { name: 'headline', type: 'text', required: true },
            { name: 'subtext', type: 'text' },
            { name: 'buttonLabel', type: 'text', required: true },
            { name: 'buttonUrl', type: 'text', required: true },
          ],
        },
        {
          slug: 'statsBar',
          labels: { singular: 'Stats Bar', plural: 'Stats Bars' },
          fields: [
            {
              name: 'stats',
              type: 'array',
              maxRows: 4,
              fields: [
                { name: 'value', type: 'text', required: true },
                { name: 'label', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          slug: 'splitContent',
          labels: { singular: 'Split Content', plural: 'Split Content Blocks' },
          fields: [
            { name: 'heading', type: 'text', required: true },
            { name: 'body', type: 'richText', required: true },
            { name: 'image', type: 'upload', relationTo: 'media' },
            {
              name: 'imagePosition',
              type: 'select',
              defaultValue: 'right',
              options: [
                { label: 'Left', value: 'left' },
                { label: 'Right', value: 'right' },
              ],
            },
            {
              name: 'cta',
              type: 'group',
              fields: [
                { name: 'label', type: 'text' },
                { name: 'url', type: 'text' },
              ],
            },
          ],
        },
      ],
    },
    seoFields,
  ],
};
