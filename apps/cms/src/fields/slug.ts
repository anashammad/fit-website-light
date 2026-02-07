import type { FieldHook } from 'payload';

function formatSlug(val: string): string {
  return val
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export const autoGenerateSlug: FieldHook = ({ data, value, originalDoc }) => {
  if (value) return formatSlug(value);
  if (data?.title) return formatSlug(data.title);
  if (originalDoc?.title) return formatSlug(originalDoc.title);
  return value;
};
