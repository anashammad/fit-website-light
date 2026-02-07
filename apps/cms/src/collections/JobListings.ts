import type { CollectionConfig } from 'payload';
import { isAdmin } from '../access/isAdmin';
import { autoGenerateSlug } from '../fields/slug';
import { seoFields } from '../fields/seo';
import { revalidateNextjs } from '../hooks/revalidateNextjs';

export const JobListings: CollectionConfig = {
  slug: 'job-listings',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'department', 'location', 'isActive'],
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
      hooks: { beforeValidate: [autoGenerateSlug] },
    },
    {
      name: 'department',
      type: 'select',
      required: true,
      options: [
        'Engineering',
        'Product',
        'Sales',
        'Operations',
        'Support',
        'Management',
      ],
    },
    {
      name: 'location',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Full-time', value: 'full-time' },
        { label: 'Part-time', value: 'part-time' },
        { label: 'Contract', value: 'contract' },
      ],
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      label: 'Job Description',
    },
    {
      name: 'requirements',
      type: 'richText',
      required: true,
    },
    {
      name: 'benefits',
      type: 'richText',
      label: 'What We Offer',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    seoFields,
  ],
};
