import type { CollectionConfig } from 'payload';
import { isAdmin } from '../access/isAdmin';

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: '../media',
    mimeTypes: [
      'image/png',
      'image/jpeg',
      'image/webp',
      'image/svg+xml',
      'image/gif',
    ],
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 768, height: 480, position: 'centre' },
      { name: 'hero', width: 1920, height: 1080, position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt Text',
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
};
