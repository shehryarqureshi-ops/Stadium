import type { Metadata } from "next";

import ChecklistCards from "@/app/components/common/ChecklistCards";
import FaqAccordion from "@/app/components/common/FaqAccordion";
import ImageShowcase from "@/app/components/common/ImageShowcase";
import IntegrationDetail from "@/app/components/common/IntegrationDetail";
import NumberedCardGrid from "@/app/components/common/NumberedCardGrid";
import VariableCardGrid from "@/app/components/common/VariableCardGrid";
import { LINKS, PLATFORM_ROUTES } from "@/app/components/impact/shared";

import encryption from "@/public/integrations/security/encryption.png";
import pentest from "@/public/integrations/security/pentest.png";
import soc2 from "@/public/integrations/security/soc2.png";
import ssoAdmin from "@/public/integrations/security/sso-admin.png";

export const metadata: Metadata = {
  title: "Security & Compliance — Protect your data at every stage | Stadium",
  description:
    "Stadium combines platform security, privacy controls, and ongoing monitoring to safeguard sensitive information.",
};

/* /integrations/security — Figma n9SjmDjzB1PeZAYJ5w43fr → 3875:9008. The
   FAQ answers other than the first are collapsed in Figma; copy for them is
   derived from the rest of the page. */

const TRUST_CENTER = "#";

export default function SecurityPage() {
  return (
    <IntegrationDetail
      hero={{
        eyebrow: "Security & compliance",
        title: "Protect your data at every stage",
        description:
          "Stadium combines platform security, privacy controls, and ongoing monitoring to safeguard sensitive information.",
        primaryCta: { label: "Explore trust center", href: TRUST_CENTER },
        secondaryCta: { label: "Talk to sales", href: LINKS.sales },
      }}
      closingSections={
        <>
          <VariableCardGrid
            background="transparent"
            caption="Trust center"
            captionColor="#16171b"
            title="Move security reviews forward"
            description="Access resources covering Stadium’s security, privacy, and compliance practices."
            gridColumns={2}
            narrow
            cta={{ label: "Explore trust center", href: TRUST_CENTER }}
            items={[
              {
                image: soc2,
                imageAlt: "SOC 2 Type 2 report cover",
                title: "SOC 2 Type 2 Report",
                description: "Review the independent assessment of Stadium’s security controls.",
              },
              {
                image: pentest,
                imageAlt: "Penetration test summary",
                title: "Penetration Test Report",
                description: "Understand how independent testing identifies potential vulnerabilities.",
              },
            ]}
          />
          <FaqAccordion
            caption="Security FAQ"
            title="Common security questions, answered"
            items={[
              {
                question: "Where is Stadium’s product infrastructure hosted?",
                answer: "Stadium’s product infrastructure is hosted on Amazon Web Services (AWS) in the U.S. East region.",
              },
              {
                question: "Does Stadium have a SOC 2 report?",
                answer: "Yes. Stadium has completed a SOC 2 Type 2 independent assessment, available through the trust center.",
              },
              {
                question: "What is Stadium’s uptime commitment?",
                answer: "Uptime commitments are outlined in your agreement. Talk to our team for details.",
              },
              {
                question: "How does Stadium encrypt data?",
                answer: "TLS 1.2/1.3 protects data in transit and AES-256 protects data at rest.",
              },
            ]}
          />
        </>
      }
      cta={{
        title: "Meet your organization’s security requirements",
        description: "Get support with security reviews and documentation.",
        primary: { label: "Talk to sales", href: LINKS.sales },
        secondary: { label: "View SSO documentation", href: "#" },
      }}
    >
      <NumberedCardGrid
        panel
        caption="Security at a glance"
        title="Built for enterprise security"
        description="See the standards, controls, and assessments behind Stadium’s security program."
        cards={[
          { title: "SOC 2 Type 2", description: "Independent assessment" },
          { title: "TLS 1.2/1.3", description: "Encryption in transit" },
          { title: "AES-256", description: "Encryption at rest" },
          { title: "AWS", description: "Cloud infrastructure" },
        ]}
      />

      <div className="grid gap-10">
        <ImageShowcase
          caption="Data protection"
          title="Encryption and access controls for sensitive data"
          image={encryption}
          imageAlt="Stadium data protection settings showing TLS 1.2/1.3 and AES-256 enabled, and who can view sensitive data"
          framed={false}
        />
        <VariableCardGrid
          bare
          media={false}
          gridColumns={3}
          items={[
            { title: "Encryption in Transit", description: "TLS 1.2/1.3 protects data as it moves between systems." },
            { title: "Encryption at Rest", description: "AES-256 protects stored customer data." },
            { title: "Access Controls", description: "Only authorized users can access sensitive customer data." },
          ]}
        />
      </div>

      <ChecklistCards
        caption="Platform security"
        title="Security across every platform layer"
        description="Security controls help reduce risk across the platform."
        cards={[
          {
            title: "Infrastructure",
            description: "Stadium runs on AWS with controls designed to protect the underlying environment.",
          },
          {
            title: "Application Protection",
            description: "Web application firewall and DDoS protections defend the platform against threats.",
          },
        ]}
      />

      <NumberedCardGrid
        panel
        caption="Security operations"
        title="Stay ahead of security risks"
        description="Ongoing monitoring and established processes support prevention, detection, and response."
        cards={[
          { title: "24/7 Monitoring", description: "Processes are in place to identify and respond to security issues." },
          { title: "Security Training", description: "Employees receive ongoing training on security practices and responsibilities." },
          { title: "Vendor Risk", description: "Third-party vendors are evaluated through Stadium’s vendor risk management process." },
          { title: "Security Testing", description: "Stadium regularly scans for vulnerabilities and conducts annual penetration testing." },
        ]}
      />

      <VariableCardGrid
        caption="Privacy & data control"
        captionColor="#16171b"
        title="Keep control of your organization’s data"
        description="Stadium supports data retention and deletion requirements."
        gridColumns={4}
        media={false}
        cta={{ label: "View subprocessors", href: "#" }}
        items={[
          { title: "Data Ownership", description: "Your organization retains ownership of its data." },
          { title: "Data Management", description: "Stadium supports data retention and deletion requirements." },
          { title: "Privacy", description: "Stadium maintains privacy practices that support applicable requirements, including GDPR." },
          { title: "Subprocessors", description: "Review the third parties Stadium uses to support its services." },
        ]}
      />

      <ImageShowcase
        caption="Access control"
        title="Control how your organization signs in"
        description="Use SAML 2.0 SSO to connect access to your existing identity provider."
        cta={{ label: "Explore SSO", href: PLATFORM_ROUTES.sso }}
        image={ssoAdmin}
        imageAlt="Stadium security settings with require SSO turned on and the supported sign-in methods"
        framed={false}
      />
    </IntegrationDetail>
  );
}
