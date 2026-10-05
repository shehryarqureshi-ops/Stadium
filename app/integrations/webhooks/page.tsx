import type { Metadata } from "next";

import JsonLd from "@/app/components/seo/JsonLd";
import { seoMetadata } from "@/app/lib/seo/metadata";

import ImageShowcase from "@/app/components/common/ImageShowcase";
import IntegrationDetail from "@/app/components/common/IntegrationDetail";
import PillTabs from "@/app/components/common/PillTabs";
import StepCards from "@/app/components/common/StepCards";
import { LINKS } from "@/app/components/impact/shared";

import admin from "@/public/integrations/webhooks/admin.png";
import stepCreate from "@/public/integrations/webhooks/step-create.png";

export const metadata: Metadata = seoMetadata("/integrations/webhooks");

/* /integrations/webhooks — Figma n9SjmDjzB1PeZAYJ5w43fr → 3873:6995. Tabs
   other than "Sales & customer teams" have no Figma content (placeholder
   copy). */

const DOCS = "#";

export default function WebhooksPage() {
  return (
    <>
      <JsonLd path="/integrations/webhooks" />
      <IntegrationDetail
        hero={{
          eyebrow: "Webhooks",
          title: "Turn business events into automatic rewards",
          description: "Use business activity to trigger gifts and rewards from Stadium.",
          primaryCta: { label: "Talk to sales", href: LINKS.sales },
          secondaryCta: { label: "View webhook documentation", href: DOCS },
        }}
        closingSections={
          <StepCards
            caption="How it works"
            captionColor="#16171b"
            title="Set up in 3 steps"
            cta={{ label: "View webhook documentation", href: DOCS }}
            items={[
              {
                title: "Create an Automation",
                description: "Select ‘Webhook’ as your automation type.",
                image: stepCreate,
                imageAlt: "New automation dialog with Webhook selected as the automation type",
                desktopVisualWidth: 265,
              },
              { title: "Configure Your Gift" },
              { title: "Connect Your Webhook" },
            ]}
          />
        }
        moreWays={{
          title: "Simplify more of your workflows",
          description: "Explore HRIS, Zapier, APIs, and other integration options.",
        }}
        cta={{
          title: "Scale rewards without adding manual work",
          description: "Make timely sends part of every workflow.",
          primary: { label: "Talk to sales", href: LINKS.sales },
          secondary: { label: "View webhook documentation", href: DOCS },
        }}
      >
        <ImageShowcase
          caption="Custom workflows"
          title="Go beyond pre-built integrations"
          description="Use webhooks to automate sends from your existing systems."
          image={admin}
          imageAlt="Webhook automation with an endpoint URL, a secret, and a list of recent deliveries from an ATS"
          framed={false}
        />

        <PillTabs
          caption="Use cases"
          captionColor="#16171b"
          title="Automate rewards across teams"
          description="Use events from your systems to start each send."
          autoAdvance={false}
          items={[
            {
              name: "Sales & customer teams",
              tab: "Sales & customer teams",
              title: "Strengthen Customer Relationships",
              description: "Follow up on closed deals and customer milestones.",
            },
            { name: "People teams", tab: "People teams", title: "Welcome and celebrate employees", description: "Send gifts when a candidate is hired or an anniversary arrives." },
            { name: "Marketing", tab: "Marketing", title: "Reward campaign engagement", description: "Trigger a send when a lead takes a key action." },
            { name: "Events & communities", tab: "Events & communities", title: "Thank your community", description: "Send a reward when someone attends, contributes, or joins." },
          ]}
        />
      </IntegrationDetail>
    </>
  );
}
