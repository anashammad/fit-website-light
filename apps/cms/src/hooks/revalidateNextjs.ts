import type { CollectionAfterChangeHook } from 'payload';

export const revalidateNextjs: CollectionAfterChangeHook = async ({
  doc,
  collection,
}) => {
  const frontendUrl = process.env.FRONTEND_URL;
  const secret = process.env.REVALIDATION_SECRET;

  if (!frontendUrl || !secret) return doc;

  try {
    await fetch(`${frontendUrl}/api/revalidate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret,
        collection: collection.slug,
        slug: doc.slug,
      }),
    });
  } catch (err) {
    console.error('Failed to revalidate Next.js:', err);
  }

  return doc;
};
