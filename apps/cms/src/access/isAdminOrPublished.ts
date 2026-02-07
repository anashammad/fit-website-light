import type { Access } from 'payload';

export const isAdminOrPublished: Access = ({ req: { user } }) => {
  if (user) return true;
  return { status: { equals: 'published' } };
};
