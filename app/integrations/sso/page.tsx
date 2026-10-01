import type { Metadata } from "next";

import CalloutCard from "@/app/components/common/CalloutCard";
import ImageShowcase from "@/app/components/common/ImageShowcase";
import IntegrationDetail from "@/app/components/common/IntegrationDetail";
import NumberedCardGrid from "@/app/components/common/NumberedCardGrid";
import NumberedMediaList from "@/app/components/common/NumberedMediaList";
import { LINKS } from "@/app/components/impact/shared";

import admin from "@/public/integrations/sso/admin.png";
import stepEmail from "@/public/integrations/sso/step-email.png";
import stepIdp from "@/public/integrations/sso/step-idp.png";
import stepTest from "@/public/integrations/sso/step-test.png";

export const metadata: Metadata = {
  title: "Single Sign-On (SSO) — Simplify secure access to Stadium | Stadium",
  description: "Give users access through your organization’s existing identity provider with SAML 2.0 SSO.",
};

/* /integrations/sso — Figma n9SjmDjzB1PeZAYJ5w43fr → 3873:7852. The frame
   carries two "Get SSO set up" blocks; the second (4301:32922, numbered
   media list) is the current design and is the one built here. */

const SUPPORT_EMAIL = "techspecialist@bystadium.com";

export default function SsoPage() {
  return (
    <IntegrationDetail
      hero={{
        eyebrow: "Single sign-on (SSO)",
        title: "Simplify secure access to Stadium",
        description: "Give users access through your organization’s existing identity provider with SAML 2.0 SSO.",
        footnote: "*Available with Enterprise Pass.",
        primaryCta: { label: "Talk to sales", href: LINKS.sales },
        secondaryCta: { label: "Explore the platform", href: LINKS.platform },
      }}
      closingSections={
        <>
          <NumberedMediaList
            caption="How it works"
            title="Get SSO set up in a few steps"
            description="Our team supports you through setup and testing."
            note={{
              caption: "What happens next",
              text: "Once SSO is enabled for your email domain, users are directed to your identity provider when signing in to Stadium.",
            }}
            items={[
              {
                title: "Configure Your IdP",
                description: "Create Stadium as an application in your identity provider using the provided metadata.",
                image: stepIdp,
                imageAlt: "Okta add-app setup for Stadium with the ACS URL, entity ID, and a Download metadata button",
              },
              {
                title: "Email SSO Details",
                description: (
                  <>
                    Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> your Single Sign-on URL, Entity ID,
                    certificate, and optional Single Logout URL.
                  </>
                ),
                image: stepEmail,
                imageAlt: "An email with the SSO URL, Entity ID, and certificate attached",
              },
              {
                title: "Configure and Test",
                description: "Stadium configures and tests SSO with your team, typically within 4–6 business days.",
                image: stepTest,
                imageAlt: "SSO test passed, live in 4–6 business days",
              },
            ]}
          />
          <CalloutCard
            inline
            title="Need help?"
            description="Our team can help with setup, configuration, and technical questions."
            cta={{ label: "Contact us", href: LINKS.sales }}
          />
        </>
      }
      cta={{
        title: "Secure access. Simpler sign-in.",
        description: "Reduce sign-in friction for employees and IT.",
        primary: { label: "Talk to sales", href: LINKS.sales },
        secondary: { label: "View SSO documentation", href: "#" },
      }}
    >
      <ImageShowcase
        caption="SAML 2.0"
        title="Keep your existing identity provider"
        description="Stadium supports SAML 2.0-compatible identity providers, including Okta, Microsoft Azure, and CyberArk."
        image={admin}
        imageAlt="Stadium single sign-on settings showing Okta connected, supported identity providers, and SSO URL, entity ID, and certificate status"
        framed={false}
        footnote={
          <>
            Don’t see your identity provider? If it supports SAML 2.0, contact{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> to confirm compatibility and get setup guidance.
          </>
        }
      />

      <NumberedCardGrid
        panel
        caption="Enterprise access"
        title="Fewer credentials to manage"
        description="Support the sign-in options your organization needs."
        cards={[
          { title: "JIT Provisioning", description: "Create accounts when users authenticate." },
          { title: "SP-Initiated SSO", description: "Sign in directly from Stadium." },
          { title: "IdP-Initiated SSO", description: "Authenticate through your identity provider." },
          { title: "Single Logout", description: "End a Stadium session through SP-initiated Single Logout." },
        ]}
      />
    </IntegrationDetail>
  );
}
