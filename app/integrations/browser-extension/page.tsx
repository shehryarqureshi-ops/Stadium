import type { Metadata } from "next";

import JsonLd from "@/app/components/seo/JsonLd";
import { seoMetadata } from "@/app/lib/seo/metadata";

import ImageShowcase from "@/app/components/common/ImageShowcase";
import IntegrationDetail from "@/app/components/common/IntegrationDetail";
import PillTabs from "@/app/components/common/PillTabs";
import SplitFeature from "@/app/components/common/SplitFeature";
import StepCards from "@/app/components/common/StepCards";
import ExtensionPopup from "@/app/components/impact/batch3/ExtensionPopup";
import { LINKS } from "@/app/components/impact/shared";
import VectorCard from "@/app/components/cards/VectorCard";
import Points from "@/app/components/cards/integrations-browser-extension/Points";


export const metadata: Metadata = seoMetadata("/integrations/browser-extension");

/* /integrations/browser-extension — Figma n9SjmDjzB1PeZAYJ5w43fr → 3867:4032.
   Tabs other than "Sales" have no Figma content (placeholder copy); the tab
   band image is an empty grey placeholder in Figma. */

export default function BrowserExtensionPage() {
  return (
    <>
      <JsonLd path="/integrations/browser-extension" />
      <IntegrationDetail
        hero={{
          eyebrow: "Browser extension",
          title: "Recognize and gift without leaving the page you’re on",
          description: "Pull recipient details from the page and send Stadium Points right from your browser.",
          primaryCta: { label: "Install extension", href: "https://help.bystadium.com/hc/en-us" },
          secondaryCta: { label: "Talk to sales", href: LINKS.sales },
        }}
        heroVisual={<ExtensionPopup />}
        heroVisualWidth="35.25rem"
        closingSections={
          <SplitFeature
            caption="Stadium Points"
            title="Take the guesswork out of gifting"
            description="Recipients around the world can use Stadium Points to choose what they want from our catalog of 25,000+ products."
            graphic={<Points alt="Stadium Points redemption showing a 2,500 point balance and drinkware, bags, and tech to choose from" />}
          />
        }
        moreWays={{
          title: "Bring Stadium into more of your workflows",
          description: "Explore integrations, APIs, and webhooks across your tech stack.",
        }}
        cta={{
          title: "Gift right where the work happens",
          description: "Give teams a faster way to reward and recognize people directly from their browser.",
          primary: { label: "Install extension", href: "https://help.bystadium.com/hc/en-us" },
          secondary: { label: "Talk to sales", href: LINKS.sales },
        }}
      >
        <ImageShowcase
          caption="Recipient details"
          title="Skip the copy and paste"
          description="Surface available email addresses from the page and select who you want to gift."
          graphic={<VectorCard src="/cards/integrations-browser-extension/Admin.svg" alt="The Stadium extension open on a CRM account page, listing four emails found on the page to choose recipients from" width={1276} height={805} />}
          framed={false}
        />

        <PillTabs
          caption="Across your teams"
          captionColor="#16171b"
          title="Recognize right in the moment"
          description="Give teams a faster way to reward and gift when the timing matters."
          autoAdvance={false}
          items={[
            {
              name: "Sales",
              tab: "Sales",
              title: "Stand out with prospects",
              description: "Build relationships from first conversations to opportunities moving forward.",
            },
            { name: "Customer teams", tab: "Customer teams", title: "Delight customers", description: "Thank customers at key milestones without leaving your CRM." },
            { name: "People teams", tab: "People teams", title: "Celebrate your people", description: "Recognize great work from the tools your team already uses." },
            { name: "Marketing & partnerships", tab: "Marketing & partnerships", title: "Strengthen partnerships", description: "Send a thoughtful gift to partners and contacts straight from the page." },
          ]}
        />

        <StepCards
          caption="How it works"
          captionColor="#16171b"
          title="Go from recipient to send in a few clicks"
          description="Stay on the page you’re already using while the extension handles the rest."
          items={[
            {
              title: "Open The Extension",
              description: "Open Stadium from your browser.",
              content: <VectorCard src="/cards/integrations-browser-extension/StepOpen.svg" alt="Browser toolbar with the Stadium extension open to Send a gift and Send Stadium Points" width={265} height={332} />,
              desktopVisualWidth: 265,
            },
            { title: "Choose Your Recipient" },
            { title: "Send Stadium Points" },
          ]}
        />
      </IntegrationDetail>
    </>
  );
}
