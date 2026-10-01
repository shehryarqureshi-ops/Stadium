import type { Metadata } from "next";

import ImageShowcase from "@/app/components/common/ImageShowcase";
import IntegrationDetail from "@/app/components/common/IntegrationDetail";
import LogoBridge from "@/app/components/common/LogoBridge";
import PillTabs from "@/app/components/common/PillTabs";
import StepListMedia from "@/app/components/common/StepListMedia";
import VariableCardGrid from "@/app/components/common/VariableCardGrid";
import { HR_TOOLS, LINKS } from "@/app/components/impact/shared";

import admin from "@/public/integrations/zapier/admin.png";
import airtable from "@/public/integrations/zapier/zap-airtable.png";
import calendly from "@/public/integrations/zapier/zap-calendly.png";
import cvent from "@/public/integrations/zapier/zap-cvent.png";
import patreon from "@/public/integrations/zapier/zap-patreon.png";
import typeform from "@/public/integrations/zapier/zap-typeform.png";
import zendesk from "@/public/integrations/zapier/zap-zendesk.png";

export const metadata: Metadata = {
  title: "Zapier Integration — Turn everyday actions into automatic rewards | Stadium",
  description: "Connect Stadium with the apps your teams use to send Stadium Points when key events happen.",
};

/* /integrations/zapier — Figma n9SjmDjzB1PeZAYJ5w43fr → 3869:5888. Tabs other
   than "Onboarding" have no Figma content (placeholder copy); the
   "[how_it_works_video]" slot renders as the StepListMedia placeholder. */

const ZAPIER = "#";

export default function ZapierPage() {
  return (
    <IntegrationDetail
      hero={{
        eyebrow: "Zapier integration",
        title: "Turn everyday actions into automatic rewards",
        description: "Connect Stadium with the apps your teams use to send Stadium Points when key events happen.",
        primaryCta: { label: "Set up on Zapier", href: ZAPIER },
        secondaryCta: { label: "Talk to sales", href: LINKS.sales },
      }}
      closingSections={
        <StepListMedia
          caption="How it works"
          title="Build your first Zap in a few steps"
          steps={[
            { title: "Connect Your Apps", description: "Link Stadium with the app you want to use." },
            { title: "Set Your Trigger", description: "Select the event that starts your Zap." },
            { title: "Choose Your Action", description: "Define how Stadium Points are sent." },
          ]}
          cta={{ label: "Set up on Zapier", href: ZAPIER }}
        />
      }
      moreWays={{
        title: "Connect Stadium across your tech stack",
        description: "Explore HRIS, CRM, APIs, webhooks, and other integration options.",
      }}
      cta={{
        title: "Spend less time sending rewards",
        description: "Automate recurring rewards based on activity across your apps.",
        primary: { label: "Set up on Zapier", href: ZAPIER },
        secondary: { label: "Talk to sales", href: LINKS.sales },
      }}
    >
      <LogoBridge
        caption="Connect your apps"
        title="Make the tools you already use work together"
        description="Connect Stadium with HR, CRM, marketing, and other apps through Zapier."
        logos={HR_TOOLS}
      />

      <VariableCardGrid
        caption="Popular Zaps"
        captionColor="#16171b"
        title="See what you can automate"
        description="Start with popular triggers, then tailor what happens next."
        gridColumns={3}
        items={[
          { image: zendesk, imageAlt: "Zendesk to Stadium Zap", title: "Zendesk + Stadium", description: "New ticket or tag added" },
          { image: typeform, imageAlt: "Typeform to Stadium Zap", title: "Typeform + Stadium", description: "New Typeform response" },
          { image: airtable, imageAlt: "Airtable to Stadium Zap", title: "Airtable + Stadium", description: "New updates to Airtable records" },
          { image: calendly, imageAlt: "Calendly to Stadium Zap", title: "Calendly + Stadium", description: "New Calendly invites" },
          { image: patreon, imageAlt: "Patreon to Stadium Zap", title: "Patreon + Stadium", description: "New member pledges" },
          { image: cvent, imageAlt: "Cvent to Stadium Zap", title: "Cvent + Stadium", description: "New or updated Cvent attendees" },
        ]}
      />

      <PillTabs
        caption="Team workflows"
        captionColor="#16171b"
        title="Automate recurring moments across teams"
        description="Reduce the manual work behind sending rewards at scale."
        autoAdvance={false}
        items={[
          {
            name: "Onboarding",
            tab: "Onboarding",
            title: "Welcome new employees on time",
            description: "Send a reward when a new employee is added.",
          },
          { name: "Employee recognition", tab: "Employee recognition", title: "Recognize great work", description: "Send Stadium Points when a teammate is recognized." },
          { name: "Customer engagement", tab: "Customer engagement", title: "Delight your customers", description: "Reward customers when they hit a milestone or respond to a survey." },
          { name: "Events & marketing", tab: "Events & marketing", title: "Thank attendees and members", description: "Send a gift when someone registers, attends, or joins." },
        ]}
      />

      <ImageShowcase
        caption="Build your Zap"
        title="Set the trigger. Stadium handles the reward."
        description="Choose your app, trigger, and conditions with no custom development required."
        image={admin}
        imageAlt="Stadium workspace integrations page showing active Zaps and their triggers"
        framed={false}
      />
    </IntegrationDetail>
  );
}
