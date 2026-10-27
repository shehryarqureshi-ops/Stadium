import type { Metadata } from "next";

import JsonLd from "@/app/components/seo/JsonLd";
import { seoMetadata } from "@/app/lib/seo/metadata";

import ImageShowcase from "@/app/components/common/ImageShowcase";
import IntegrationDetail from "@/app/components/common/IntegrationDetail";
import LogoBridge from "@/app/components/common/LogoBridge";
import PillTabs from "@/app/components/common/PillTabs";
import StepListMedia from "@/app/components/common/StepListMedia";
import VariableCardGrid from "@/app/components/common/VariableCardGrid";
import ZapStack from "@/app/components/impact/batch3/ZapStack";
import { HR_TOOLS, LINKS } from "@/app/components/impact/shared";
import VectorCard from "@/app/components/cards/VectorCard";


export const metadata: Metadata = seoMetadata("/integrations/zapier");

/* /integrations/zapier — Figma n9SjmDjzB1PeZAYJ5w43fr → 3869:5888. Tabs other
   than "Onboarding" have no Figma content (placeholder copy); the
   "[how_it_works_video]" slot renders as the StepListMedia placeholder. */

const ZAPIER = "https://help.bystadium.com/hc/en-us";

export default function ZapierPage() {
  return (
    <>
      <JsonLd path="/integrations/zapier" />
      <IntegrationDetail
        hero={{
          eyebrow: "Zapier integration",
          title: "Turn everyday actions into automatic rewards",
          description: "Connect Stadium with the apps your teams use to send Stadium Points when key events happen.",
          primaryCta: { label: "Set up on Zapier", href: ZAPIER },
          secondaryCta: { label: "Talk to sales", href: LINKS.sales },
        }}
        heroVisual={<ZapStack />}
        heroVisualWidth="36.25rem"
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
            { graphic: <VectorCard src="/cards/integrations-zapier/ZapZendesk.svg" alt="Zendesk to Stadium Zap" width={389} height={250} />, title: "Zendesk + Stadium", description: "New ticket or tag added" },
            { graphic: <VectorCard src="/cards/integrations-zapier/ZapTypeform.svg" alt="Typeform to Stadium Zap" width={389} height={250} />, title: "Typeform + Stadium", description: "New Typeform response" },
            { graphic: <VectorCard src="/cards/integrations-zapier/ZapAirtable.svg" alt="Airtable to Stadium Zap" width={389} height={250} />, title: "Airtable + Stadium", description: "New updates to Airtable records" },
            { graphic: <VectorCard src="/cards/integrations-zapier/ZapCalendly.svg" alt="Calendly to Stadium Zap" width={389} height={250} />, title: "Calendly + Stadium", description: "New Calendly invites" },
            { graphic: <VectorCard src="/cards/integrations-zapier/ZapPatreon.svg" alt="Patreon to Stadium Zap" width={389} height={250} />, title: "Patreon + Stadium", description: "New member pledges" },
            { graphic: <VectorCard src="/cards/integrations-zapier/ZapCvent.svg" alt="Cvent to Stadium Zap" width={389} height={250} />, title: "Cvent + Stadium", description: "New or updated Cvent attendees" },
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
          graphic={<VectorCard src="/cards/integrations-zapier/Admin.svg" alt="Stadium workspace integrations page showing active Zaps and their triggers" width={1276} height={805} />}
          framed={false}
        />
      </IntegrationDetail>
    </>
  );
}
