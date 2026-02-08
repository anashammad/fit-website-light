import type { Metadata } from 'next';
import { Heading, Text } from '@/components/atoms';
import { HeroSection } from '@/components/organisms/HeroSection';
import { CTABanner } from '@/components/organisms/CTABanner';
import { SITE_URL, buildMetadata, buildBreadcrumbSchema } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Security & Compliance',
  description:
    'Enterprise-grade security, regulatory compliance, and data protection for financial institutions across MENA.',
  path: '/security',
});

export default function SecurityPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Security & Compliance' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <HeroSection
        variant="page"
        title="Security & compliance"
        subtitle="Enterprise-grade security and regulatory alignment for financial institutions across the MENA region."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Security & Compliance' },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-content max-w-3xl">
          <div className="prose prose-slate max-w-none space-y-12">
            <div>
              <Heading level={2}>Data security</Heading>
              <Text className="mt-4">
                FIT implements a multi-layered security architecture to protect sensitive financial
                data at every level. All data in transit is encrypted using TLS 1.3, and data at
                rest is protected with AES-256 encryption. Our platforms employ role-based access
                control (RBAC) with multi-factor authentication, comprehensive audit logging, and
                real-time intrusion detection systems.
              </Text>
              <Text className="mt-4">
                Session management, API authentication via OAuth 2.0 and signed tokens, and
                automated vulnerability scanning ensure that access to systems and data is
                continuously monitored and controlled.
              </Text>
            </div>

            <div>
              <Heading level={2}>Compliance standards</Heading>
              <Text className="mt-4">
                Our security practices are aligned with internationally recognized frameworks
                and certifications:
              </Text>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <Text as="div"><li><strong>ISO 27001</strong> &mdash; Information Security Management System (ISMS) aligned controls for systematic risk management</li></Text>
                <Text as="div"><li><strong>SOC 2 Type II</strong> &mdash; Controls for security, availability, processing integrity, confidentiality, and privacy</li></Text>
                <Text as="div"><li><strong>PCI DSS</strong> &mdash; Payment Card Industry standards for handling financial transaction data</li></Text>
                <Text as="div"><li><strong>OWASP Top 10</strong> &mdash; Continuous protection against the most critical web application security risks</li></Text>
              </ul>
            </div>

            <div>
              <Heading level={2}>Regulatory alignment</Heading>
              <Text className="mt-4">
                FIT&apos;s platforms are designed to meet the regulatory requirements of financial
                authorities across the MENA region, including:
              </Text>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <Text as="div"><li><strong>CMA</strong> &mdash; Capital Market Authority of Oman</li></Text>
                <Text as="div"><li><strong>SCA</strong> &mdash; Securities and Commodities Authority of the UAE</li></Text>
                <Text as="div"><li><strong>QFMA</strong> &mdash; Qatar Financial Markets Authority</li></Text>
                <Text as="div"><li><strong>DFSA</strong> &mdash; Dubai Financial Services Authority</li></Text>
              </ul>
              <Text className="mt-4">
                Our compliance modules support AML/KYC checks, transaction reporting, trade
                surveillance, and regulatory filing requirements specific to each jurisdiction.
              </Text>
            </div>

            <div>
              <Heading level={2}>Infrastructure security</Heading>
              <Text className="mt-4">
                FIT&apos;s infrastructure is hosted in enterprise-grade data centers with physical
                security controls including biometric access, 24/7 surveillance, and redundant
                power and cooling systems. Network segmentation, firewalls, and DDoS mitigation
                protect against external threats.
              </Text>
              <Text className="mt-4">
                All production environments are isolated from development and staging, with
                automated deployment pipelines that enforce code review and security scanning
                before any changes reach production.
              </Text>
            </div>

            <div>
              <Heading level={2}>Data residency</Heading>
              <Text className="mt-4">
                We understand the importance of data sovereignty for financial institutions
                operating in the MENA region. FIT offers data residency options with hosting
                facilities located within the region, ensuring that sensitive financial data
                remains within jurisdictional boundaries as required by local regulations.
              </Text>
              <Text className="mt-4">
                Our infrastructure supports multi-region deployment models, allowing clients to
                choose where their data is stored and processed while maintaining full platform
                functionality and performance.
              </Text>
            </div>

            <div>
              <Heading level={2}>Penetration testing</Heading>
              <Text className="mt-4">
                FIT conducts regular penetration testing through independent third-party security
                firms to identify and remediate potential vulnerabilities. These assessments cover
                network infrastructure, web applications, APIs, and mobile platforms.
              </Text>
              <Text className="mt-4">
                In addition to scheduled annual assessments, we perform targeted testing after
                significant platform updates and maintain an ongoing vulnerability management
                program with defined SLAs for remediation based on severity.
              </Text>
            </div>

            <div>
              <Heading level={2}>Disaster recovery</Heading>
              <Text className="mt-4">
                Our disaster recovery strategy ensures business continuity with automated backups,
                geographic redundancy, and tested recovery procedures. Database backups are
                performed continuously with point-in-time recovery capabilities, and full system
                backups are replicated to geographically separate facilities.
              </Text>
              <Text className="mt-4">
                Recovery time objectives (RTO) and recovery point objectives (RPO) are defined
                per service tier, with critical trading systems targeting near-zero data loss and
                rapid failover capabilities.
              </Text>
            </div>

            <div>
              <Heading level={2}>Service level agreement</Heading>
              <Text className="mt-4">
                FIT is committed to maintaining a <strong>99.9% uptime SLA</strong> for
                production trading systems. Our monitoring infrastructure provides real-time
                alerting, automated health checks, and performance metrics across all platform
                components.
              </Text>
              <Text className="mt-4">
                Planned maintenance windows are scheduled during off-market hours and communicated
                to clients in advance. In the event of unplanned downtime, our incident response
                team follows documented escalation procedures with transparent client
                communication throughout the resolution process.
              </Text>
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        heading="Ready to discuss your security requirements?"
        subtext="Our team can walk you through our security architecture and compliance capabilities."
        buttonLabel="Contact Us"
        buttonHref="/contact"
        secondaryLabel="View Technology"
        secondaryHref="/technology/architecture"
      />
    </>
  );
}
