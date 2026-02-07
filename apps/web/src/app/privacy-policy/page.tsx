import type { Metadata } from 'next';
import { Heading, Text } from '@/components/atoms';
import { HeroSection } from '@/components/organisms/HeroSection';
import { SITE_URL, buildMetadata, buildBreadcrumbSchema } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy',
  description:
    'FIT privacy policy. Learn how we collect, use, and protect your personal information.',
  path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Privacy Policy' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <HeroSection
        variant="page"
        title="Privacy policy"
        subtitle="Last updated: February 2026"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Privacy Policy' },
        ]}
      />

      <section className="section-padding bg-surface">
        <div className="container-content max-w-3xl">
          <div className="prose prose-invert max-w-none space-y-8">
            <div>
              <Heading level={2}>1. Introduction</Heading>
              <Text className="mt-4">
                FIT (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This
                Privacy Policy explains how we collect, use, disclose, and safeguard your
                information when you visit our website fitoman.com or use our services.
              </Text>
            </div>

            <div>
              <Heading level={2}>2. Information we collect</Heading>
              <Text className="mt-4">
                We may collect information you provide directly to us, including:
              </Text>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <Text as="div"><li>Name, email address, phone number, and company name when you submit a contact or demo request form</li></Text>
                <Text as="div"><li>Resume and cover letter when you apply for a position through our careers page</li></Text>
                <Text as="div"><li>Any additional information you choose to provide in form messages</li></Text>
              </ul>
              <Text className="mt-4">
                We may also automatically collect certain information when you visit our website,
                including your IP address, browser type, operating system, referring URLs, and
                information about how you interact with our website.
              </Text>
            </div>

            <div>
              <Heading level={2}>3. How we use your information</Heading>
              <Text className="mt-4">We use the information we collect to:</Text>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <Text as="div"><li>Respond to your inquiries and demo requests</li></Text>
                <Text as="div"><li>Process job applications</li></Text>
                <Text as="div"><li>Improve our website and services</li></Text>
                <Text as="div"><li>Send you information about our products and services, where you have consented</li></Text>
                <Text as="div"><li>Comply with legal obligations</li></Text>
              </ul>
            </div>

            <div>
              <Heading level={2}>4. Information sharing</Heading>
              <Text className="mt-4">
                We do not sell, trade, or rent your personal information to third parties. We may
                share your information with trusted service providers who assist us in operating
                our website and conducting our business, provided they agree to keep your
                information confidential.
              </Text>
            </div>

            <div>
              <Heading level={2}>5. Data security</Heading>
              <Text className="mt-4">
                We implement appropriate technical and organizational security measures to protect
                your personal information against unauthorized access, alteration, disclosure, or
                destruction. However, no method of transmission over the Internet is 100% secure.
              </Text>
            </div>

            <div>
              <Heading level={2}>6. Data retention</Heading>
              <Text className="mt-4">
                We retain your personal information only for as long as necessary to fulfill the
                purposes outlined in this policy, unless a longer retention period is required or
                permitted by law.
              </Text>
            </div>

            <div>
              <Heading level={2}>7. Your rights</Heading>
              <Text className="mt-4">
                Depending on your location, you may have the right to access, correct, or delete
                your personal information. To exercise these rights, please contact us using the
                information below.
              </Text>
            </div>

            <div>
              <Heading level={2}>8. Cookies</Heading>
              <Text className="mt-4">
                Our website may use cookies and similar tracking technologies to improve your
                browsing experience and analyze website traffic. You can control cookie settings
                through your browser preferences.
              </Text>
            </div>

            <div>
              <Heading level={2}>9. Third-party links</Heading>
              <Text className="mt-4">
                Our website may contain links to third-party websites. We are not responsible for
                the privacy practices or content of those websites. We encourage you to review the
                privacy policies of any third-party sites you visit.
              </Text>
            </div>

            <div>
              <Heading level={2}>10. Changes to this policy</Heading>
              <Text className="mt-4">
                We may update this Privacy Policy from time to time. We will notify you of any
                changes by posting the new policy on this page and updating the &quot;Last
                updated&quot; date.
              </Text>
            </div>

            <div>
              <Heading level={2}>11. Contact us</Heading>
              <Text className="mt-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </Text>
              <div className="mt-4 rounded-lg border border-terminal-border bg-primary p-6">
                <Text className="font-medium text-white">FIT</Text>
                <Text className="mt-1 text-gray-400">Muscat, Oman</Text>
                <Text className="mt-1 text-gray-400">Email: info@fitoman.com</Text>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
