import type { Metadata } from 'next';
import { Heading, Text } from '@/components/atoms';
import { HeroSection } from '@/components/organisms/HeroSection';
import { SITE_URL, buildMetadata, buildBreadcrumbSchema } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Service',
  description:
    'FIT terms of service. Review the terms governing your use of our trading technology platforms and services.',
  path: '/terms-of-service',
});

export default function TermsOfServicePage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Terms of Service' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <HeroSection
        variant="page"
        title="Terms of service"
        subtitle="Last updated: February 2026"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Terms of Service' },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-content max-w-3xl">
          <div className="prose prose-slate max-w-none space-y-8">
            <div>
              <Heading level={2}>1. Acceptance of terms</Heading>
              <Text className="mt-4">
                By accessing or using the services provided by FIT (&quot;Company,&quot;
                &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), including our trading
                technology platforms, software, APIs, and related services (collectively, the
                &quot;Services&quot;), you agree to be bound by these Terms of Service. If you do
                not agree to these terms, you must not access or use our Services.
              </Text>
              <Text className="mt-4">
                These terms constitute a legally binding agreement between you (or the entity you
                represent) and FIT. By using our Services on behalf of an organization, you
                represent that you have the authority to bind that organization to these terms.
              </Text>
            </div>

            <div>
              <Heading level={2}>2. Description of services</Heading>
              <Text className="mt-4">
                FIT provides institutional-grade trading technology solutions for financial
                markets, including but not limited to order management systems (OMS), backoffice
                and compliance platforms, portfolio and fund management tools, mobile and web
                trading applications, market surveillance systems, digital onboarding solutions,
                API middleware, and banking gateway integrations.
              </Text>
              <Text className="mt-4">
                The specific features, functionality, and scope of Services provided to you will
                be governed by the applicable service agreement or subscription terms between you
                and FIT.
              </Text>
            </div>

            <div>
              <Heading level={2}>3. User responsibilities</Heading>
              <Text className="mt-4">
                As a user of our Services, you agree to:
              </Text>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <Text as="div"><li>Use the Services only for lawful purposes and in accordance with applicable laws, regulations, and industry standards</li></Text>
                <Text as="div"><li>Maintain the confidentiality and security of your account credentials and access tokens</li></Text>
                <Text as="div"><li>Promptly notify FIT of any unauthorized access to or use of your account</li></Text>
                <Text as="div"><li>Ensure that all data submitted through the Services is accurate, complete, and lawfully obtained</li></Text>
                <Text as="div"><li>Not attempt to reverse-engineer, decompile, or disassemble any part of the Services</li></Text>
                <Text as="div"><li>Not use the Services to transmit malicious code, spam, or any content that could disrupt operations</li></Text>
              </ul>
            </div>

            <div>
              <Heading level={2}>4. Intellectual property</Heading>
              <Text className="mt-4">
                All intellectual property rights in the Services, including but not limited to
                software, algorithms, user interfaces, documentation, trademarks, and trade
                secrets, are and shall remain the exclusive property of FIT or its licensors. No
                rights or licenses are granted to you except as expressly set forth in these terms
                or in a separate written agreement.
              </Text>
              <Text className="mt-4">
                You may not copy, modify, distribute, sell, or lease any part of our Services, nor
                may you reverse-engineer or attempt to extract the source code of our software,
                unless applicable laws prohibit these restrictions or you have our written
                permission.
              </Text>
            </div>

            <div>
              <Heading level={2}>5. Confidentiality</Heading>
              <Text className="mt-4">
                Each party agrees to maintain the confidentiality of any proprietary or
                confidential information disclosed by the other party in connection with the
                Services. Confidential information includes, without limitation, trade secrets,
                business plans, technical specifications, pricing, customer data, and any
                information marked as confidential.
              </Text>
              <Text className="mt-4">
                This obligation of confidentiality shall not apply to information that is publicly
                available, independently developed, or required to be disclosed by law or
                regulatory authority.
              </Text>
            </div>

            <div>
              <Heading level={2}>6. Data handling and privacy</Heading>
              <Text className="mt-4">
                FIT processes personal and financial data in accordance with our Privacy Policy and
                applicable data protection regulations. By using our Services, you consent to the
                collection, processing, and storage of data as described in our Privacy Policy.
              </Text>
              <Text className="mt-4">
                We implement industry-standard security measures, including encryption, access
                controls, and audit logging, to protect the data processed through our platforms.
                For financial institutions subject to regulatory requirements, FIT provides data
                residency options within the MENA region.
              </Text>
            </div>

            <div>
              <Heading level={2}>7. Limitation of liability</Heading>
              <Text className="mt-4">
                To the maximum extent permitted by applicable law, FIT shall not be liable for any
                indirect, incidental, special, consequential, or punitive damages, including but
                not limited to loss of profits, revenue, data, or business opportunities, arising
                out of or in connection with your use of the Services, even if FIT has been advised
                of the possibility of such damages.
              </Text>
              <Text className="mt-4">
                FIT&apos;s total aggregate liability for any claims arising under these terms shall
                not exceed the amounts paid by you to FIT for the Services during the twelve (12)
                months preceding the claim.
              </Text>
            </div>

            <div>
              <Heading level={2}>8. Indemnification</Heading>
              <Text className="mt-4">
                You agree to indemnify, defend, and hold harmless FIT, its officers, directors,
                employees, and agents from and against any claims, liabilities, damages, losses,
                and expenses (including reasonable legal fees) arising out of or in connection
                with: (a) your use of the Services; (b) your violation of these terms; (c) your
                violation of any applicable law or regulation; or (d) any data or content you
                submit through the Services.
              </Text>
            </div>

            <div>
              <Heading level={2}>9. Governing law and jurisdiction</Heading>
              <Text className="mt-4">
                These Terms of Service shall be governed by and construed in accordance with the
                laws of the Sultanate of Oman, without regard to its conflict of law provisions.
                Any disputes arising out of or relating to these terms or the Services shall be
                subject to the exclusive jurisdiction of the courts of Muscat, Sultanate of Oman.
              </Text>
              <Text className="mt-4">
                For clients operating under the regulatory frameworks of the Capital Market
                Authority (CMA) of Oman, the Securities and Commodities Authority (SCA) of the
                UAE, the Qatar Financial Markets Authority (QFMA), or the Dubai Financial Services
                Authority (DFSA), additional regulatory terms may apply as specified in individual
                service agreements.
              </Text>
            </div>

            <div>
              <Heading level={2}>10. Termination</Heading>
              <Text className="mt-4">
                Either party may terminate the use of Services in accordance with the terms of the
                applicable service agreement. FIT reserves the right to suspend or terminate your
                access to the Services immediately if you breach these terms or if required by
                applicable law or regulatory authority.
              </Text>
              <Text className="mt-4">
                Upon termination, your right to use the Services will cease immediately. Sections
                relating to intellectual property, confidentiality, limitation of liability,
                indemnification, and governing law shall survive termination.
              </Text>
            </div>

            <div>
              <Heading level={2}>11. Contact us</Heading>
              <Text className="mt-4">
                If you have any questions about these Terms of Service, please contact us at:
              </Text>
              <div className="mt-4 rounded-lg border border-terminal-border bg-gray-50 p-6">
                <Text className="font-medium text-gray-900">FIT</Text>
                <Text className="mt-1 text-slate-600">P.O. Box 629, PC 112 Ruwi, Muscat, Sultanate of Oman</Text>
                <Text className="mt-1 text-slate-600">Email: info@fitoman.com</Text>
                <Text className="mt-1 text-slate-600">Phone: +968 24 700 454</Text>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
