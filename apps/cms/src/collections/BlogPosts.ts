import type { CollectionConfig } from 'payload';
import { isAdmin } from '../access/isAdmin';
import { isAdminOrPublished } from '../access/isAdminOrPublished';
import { autoGenerateSlug } from '../fields/slug';
import { seoFields } from '../fields/seo';
import { revalidateNextjs } from '../hooks/revalidateNextjs';

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishedAt'],
  },
  access: {
    read: isAdminOrPublished,
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
      maxLength: 120,
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
      name: 'excerpt',
      type: 'textarea',
      required: true,
      maxLength: 300,
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
    },
    {
      name: 'author',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    seoFields,
  ],
};
