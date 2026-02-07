import type { CollectionConfig } from 'payload';
import { isAdmin } from '../access/isAdmin';
import { revalidateNextjs } from '../hooks/revalidateNextjs';

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'title', 'order'],
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
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Job Title',
    },
    {
      name: 'bio',
      type: 'textarea',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'linkedinUrl',
      type: 'text',
      label: 'LinkedIn URL',
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      admin: { position: 'sidebar' },
    },
  ],
};
