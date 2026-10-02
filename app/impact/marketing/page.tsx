import type { Metadata } from "next";
import JsonLd from "@/app/components/seo/JsonLd";
import { seoMetadata } from "@/app/lib/seo/metadata";

import ChecklistCards from "@/app/components/common/ChecklistCards";
import ImageShowcase from "@/app/components/common/ImageShowcase";
import ImpactClosing from "@/app/components/common/ImpactClosing";
import NumberedOfferings from "@/app/components/common/NumberedOfferings";
import PillTabs from "@/app/components/common/PillTabs";
import StepCards from "@/app/components/common/StepCards";
import TeamHero from "@/app/components/common/TeamHero";
import VariableCardGrid from "@/app/components/common/VariableCardGrid";
import ImpactPageShell, { TeamDivider } from "@/app/components/impact/ImpactPageShell";
import { LINKS } from "@/app/components/impact/shared";

import campaignActivity from "@/public/impact/marketing/campaign-activity.png";
import campaignWorkspace from "@/public/impact/marketing/campaign-workspace.png";
import problemData from "@/public/impact/marketing/problem-data.png";
import problemInventory from "@/public/impact/marketing/problem-inventory.png";
import problemShipping from "@/public/impact/marketing/problem-shipping.png";
import problemVendors from "@/public/impact/marketing/problem-vendors.png";
import stepTriggerSends from "@/public/impact/marketing/step-trigger-sends.png";

export const metadata: Metadata = seoMetadata("/impact/marketing");

/* /impact/marketing — Figma n9SjmDjzB1PeZAYJ5w43fr → 3998:18002. Tabs other
   than "Event swag" have no Figma content: their copy comes from the
   Marketing use cases in the Impact by Team menu (ImpactMenu.tsx) with
   placeholder imagery. The integrations steps (3998:18347) sit on a purple
   designer-artifact background in Figma and render white here. */

export default function MarketingPage() {
  return (
    <>
      <JsonLd path="/impact/marketing" />
    <ImpactPageShell
      hero={
        <TeamHero
          eyebrow="Stadium for Marketing"
          title="Branded experiences for every campaign"
          description="Create and send on-brand experiences across campaigns, audiences, and regions from one platform."
          primaryCta={{ label: "Talk to sales", href: LINKS.sales }}
          secondaryCta={{ label: "Explore the platform", href: LINKS.platform }}
        />
      }
      closing={
        <ImpactClosing
          cta={{
            caption: "Get started",
            title: "Make every branded moment easier to scale",
            description: "Bring your branded campaigns, sends, and workflows together with Stadium.",
            primary: { label: "Talk to sales", href: LINKS.sales },
            secondary: { label: "Explore the platform", href: LINKS.platform },
          }}
        >
          <VariableCardGrid
            background="transparent"
            caption="Customer results"
            captionColor="#16171b"
            title="See how Marketing teams scale with Stadium"
            items={[
              { title: "ConstructConnect", description: "Centralized swag across teams, saving 2–4 hours per customer project while scaling events and customer advocacy." },
              { title: "PlanSource", description: "Cut its swag timeline in half, delivering a branded event campaign in under four weeks." },
              { title: "Workato", description: "Scaled gifting across 25+ countries for customers, partners, and employees while reducing hours of manual work." },
            ]}
          />
        </ImpactClosing>
      }
    >
      <VariableCardGrid
        caption="The problem"
        captionColor="#16171b"
        title="Every campaign has too many moving parts"
        description="Branded campaigns get harder to scale when products, vendors, inventory, shipping, and recipient details are managed separately."
        gridColumns={4}
        imageStyle="panel"
        items={[
          { image: problemVendors, imageAlt: "Campaign vendors: three campaigns split across PrintCo, SwagHub, and GiftBox Inc", description: "Different campaigns rely on different vendors." },
          { image: problemInventory, imageAlt: "Stored inventory with unused tumblers, backordered hoodies, and $1,200 a month in storage fees", description: "Inventory creates extra work." },
          { image: problemShipping, imageAlt: "An order to Berlin held at customs, with rejected and unassigned shipments to Tokyo and São Paulo", description: "Global shipping gets complicated." },
          { image: problemData, imageAlt: "Campaign data split across a vendor export, a gift portal, and a CRM report", description: "Campaign and send data lives in different places." },
        ]}
        footnote="Your team should focus on the campaign–not the logistics behind it."
      />

      <TeamDivider />

      <ImageShowcase
        caption="One marketing platform"
        title="Bring your campaign experiences together"
        description="Manage swag, gifting, event sends, and other branded experiences through one platform instead of separate vendors and workflows."
        image={campaignWorkspace}
        imageAlt="Stadium campaign workspace for a Q4 product launch with recipients, sends, budget, and experiences including a swag store, event kits, direct mail gift, and branded shop"
        framed={false}
      />

      <ChecklistCards
        caption="Brand control"
        title="Keep your brand consistent at scale"
        description="Set the foundation once, then let teams create with confidence."
        cards={[
          {
            title: "Your brand, built in",
            description: "Set your logo, colors, and approved assets once so the right options are ready for every campaign.",
            bullets: ["Brand standards already set", "Approved options for teams", "Less one-off sourcing"],
          },
          {
            title: "Give teams room to create",
            description: "Let teams build branded experiences for their campaigns using the brand system already in place.",
            bullets: ["Ready-to-use branded assets", "Flexible across campaigns", "Easier to scale across teams"],
          },
        ]}
      />

      <PillTabs
        caption="Every brand moment"
        captionColor="#16171b"
        title="Built for every kind of campaign"
        description="From events to launches, give every audience an on-brand experience without starting from scratch each time."
        autoAdvance={false}
        items={[
          {
            name: "Event swag",
            tab: "Event swag",
            title: "Show up event-ready",
            description: "Send branded merchandise and kits directly to the venue.",
            bullets: ["Bulk and custom kits", "Direct-to-venue delivery", "Easy to reorder"],
          },
          { name: "ABM gifts", tab: "ABM gifts", title: "Account-Based Marketing", description: "Gifting mapped to ABM programs and target accounts." },
          { name: "Webinar gifts", tab: "Webinar gifts", title: "Webinar Gifts", description: "Timed sends for launches, announcements, key moments." },
          { name: "Product launches", tab: "Product launches", title: "Product Launches", description: "Campaign drops for product announcements and launches." },
          { name: "Field kits", tab: "Field kits", title: "Field Kits", description: "Branded kits for field teams, roadshows, and regional events." },
          { name: "Customer advocacy", tab: "Customer advocacy", title: "Customer Advocacy", description: "Kits and materials for partners and influencers at scale." },
        ]}
      />

      <StepCards
        align="center"
        caption="100+ integrations"
        captionColor="#16171b"
        title="Make branded sends part of your campaigns"
        description="Connect Stadium with Salesforce, HubSpot, and the tools your team already uses to trigger branded experiences from existing marketing workflows."
        items={[
          {
            title: "Trigger sends automatically",
            description: "Turn campaign actions and CRM activity into branded sends without adding another manual step.",
            image: stepTriggerSends,
            imageAlt: "Automation: when a contact becomes an MQL in HubSpot, send a branded kit, and a meeting is booked three days after delivery",
            desktopVisualWidth: 265,
          },
          { title: <>Keep workflows<br />connected</> },
          { title: <>Track<br />recipient activity</> },
        ]}
      />

      <ImageShowcase
        caption="Campaign visibility"
        title="See every send in one place"
        description="Track recipients, sends, and campaign activity without piecing together updates across vendors."
        image={campaignActivity}
        imageAlt="Campaign activity dashboard showing sent, opened, redeemed, and delivered counts with a recipient status table"
        framed={false}
      />

      <NumberedOfferings
        caption="Global reach"
        title="Take your campaigns around the world"
        description="Reach customers, prospects, partners, and teams across 170+ countries while Stadium handles the fulfillment and logistics behind every send."
        items={[
          { title: "170+ countries", description: "Global reach for campaigns and audiences." },
          { title: "Fulfillment handled", description: "Stadium manages packing, shipping, and delivery." },
          { title: "One campaign, many regions", description: "Coordinate sends across audiences and locations without managing separate vendors." },
        ]}
      />
    </ImpactPageShell>
    </>
  );
}
