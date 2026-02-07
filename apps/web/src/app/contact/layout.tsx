import type { Metadata } from 'next';
import { buildMetadata, buildBreadcrumbSchema, SITE_URL } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Contact',
  description:
    'Contact FIT to request a demo or discuss your trading infrastructure needs. Our team responds within one business day.',
  path: '/contact',
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Contact' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
