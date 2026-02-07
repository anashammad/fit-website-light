import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: ({ req: { user } }) => {
      if (user?.role === 'admin') return true;
      return { id: { equals: user?.id } };
    },
    create: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user } }) => {
      if (user?.role === 'admin') return true;
      return { id: { equals: user?.id } };
    },
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      access: {
        update: ({ req: { user } }) => user?.role === 'admin',
      },
      admin: { position: 'sidebar' },
    },
  ],
};
