import type { Metadata } from 'next';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fitoman.com';

interface PageSeoInput {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  absoluteTitle?: boolean;
}

export function buildMetadata({
  title,
  description,
  path,
  ogImage,
  absoluteTitle,
}: PageSeoInput): Metadata {
  const url = `${SITE_URL}${path}`;
  const image = ogImage || `${SITE_URL}/opengraph-image`;
  const ogTitle = absoluteTitle ? title : `${title} | FIT — Trading Technology`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle,
      description,
      url,
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
      images: [image],
    },
  };
}

export function buildBreadcrumbSchema(
  items: { name: string; url?: string }[]
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };
}
