import type { Metadata } from "next";
import JsonLd from "@/app/components/seo/JsonLd";
import { seoMetadata } from "@/app/lib/seo/metadata";

import ChecklistCards from "@/app/components/common/ChecklistCards";
import ImageShowcase from "@/app/components/common/ImageShowcase";
import ImpactClosing from "@/app/components/common/ImpactClosing";
import ImpactProof from "@/app/components/common/ImpactProof";
import NumberedOfferings from "@/app/components/common/NumberedOfferings";
import PillTabs from "@/app/components/common/PillTabs";
import StepCards from "@/app/components/common/StepCards";
import TeamHero from "@/app/components/common/TeamHero";
import VariableCardGrid from "@/app/components/common/VariableCardGrid";
import { CASE_STUDIES } from "@/app/components/impact/caseStudies";
import CampaignKit from "@/app/components/impact/CampaignKit";
import { ConnectedToolsGraphic, RecipientActivityGraphic } from "@/app/components/impact/IntegrationGraphics";
import TriggerSends from "@/app/components/cards/impact-marketing/TriggerSends";
import ImpactPageShell, { TeamDivider } from "@/app/components/impact/ImpactPageShell";
import { LINKS, G2_RATING } from "@/app/components/impact/shared";

import CampaignActivity from "@/app/components/cards/impact-marketing/CampaignActivity";
import CampaignWorkspace from "@/app/components/cards/impact-marketing/CampaignWorkspace";
import ReachRegions from "@/app/components/cards/impact-marketing/ReachRegions";
import reachCountries from "@/public/impact/marketing/v2/reach-countries.webp";
import reachFulfillment from "@/public/impact/marketing/v2/reach-fulfillment.webp";
import problemData from "@/public/impact/marketing/v2/problem-data.webp";
import problemInventory from "@/public/impact/marketing/v2/problem-inventory.webp";
import problemShipping from "@/public/impact/marketing/v2/problem-shipping.webp";
import problemVendors from "@/public/impact/marketing/v2/problem-vendors.webp";
import brandEventSwag from "@/public/impact/marketing/v2/brand-event-swag.webp";
import brandAbm from "@/public/impact/marketing/v2/brand-abm.webp";
import brandWebinar from "@/public/impact/marketing/v2/brand-webinar.webp";
import brandLaunches from "@/public/impact/marketing/v2/brand-launches.webp";
import brandFieldKits from "@/public/impact/marketing/v2/brand-field-kits.webp";
import brandAdvocacy from "@/public/impact/marketing/v2/brand-advocacy.webp";

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
          secondaryCta={{ label: "See the brand store", href: LINKS.swag }}
          background="canvas"
          visual={<CampaignKit />}
          visualLayout="aligned"
          visualMaxWidth="34.3125rem"
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
          <ImpactProof
            caption="Customer results"
            title="See how Marketing teams scale with Stadium"
            rating={G2_RATING}
            cards={CASE_STUDIES.marketing}
          />
        </ImpactClosing>
      }
    >
      <VariableCardGrid
        caption="The problem"
        captionColor="#16171b"
        title="Every campaign has too many moving parts"
        description="Branded campaigns get harder to scale when products, vendors, inventory, shipping, and recipient details are managed separately."
        gridColumns={2}
        narrow
        imageStyle="panel"
        items={[
          { image: problemVendors, imageAlt: "A marketer on a phone call at a desk surrounded by boxes, branded bottles, and a laptop", description: "Different campaigns rely on different vendors." },
          { image: problemInventory, imageAlt: "A man with a clipboard checking boxes of branded apparel in a storage room", description: "Inventory creates extra work." },
          { image: problemShipping, imageAlt: "A marketer taping up a shipping box while colleagues work behind her", description: "Global shipping gets complicated." },
          { image: problemData, imageAlt: "Two marketers comparing campaign notes on a laptop beside a wall of sticky notes", description: "Campaign and send data lives in different places." },
        ]}
        footnote="Your team should focus on the campaign–not the logistics behind it."
      />

      <TeamDivider />

      <ImageShowcase
        id="campaign-experiences"
        caption="One marketing platform"
        title="Bring your campaign experiences together"
        description="Manage swag, gifting, event sends, and other branded experiences through one platform instead of separate vendors and workflows."
        graphic={<CampaignWorkspace />}
        imageAlt="Stadium Shops page listing the ARCADE Store, Onboarding Shop, Holiday Gifts 2026, Lisbon Offsite, Client Gifts, and ARCADE Deutschland shops, all live"
        framed={false}
      />

      <ChecklistCards
        id="brand-control"
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
            id: "event-swag",
            name: "Event swag",
            tab: "Event swag",
            title: "Show up event-ready",
            description: "Send branded merchandise and kits directly to the venue.",
            bullets: ["Bulk and custom kits", "Direct-to-venue delivery", "Easy to reorder"],
            image: brandEventSwag,
            imageAlt: "Event staff unpacking branded merchandise kits behind a booth counter",
          },
          {
            id: "abm-gifts",
            name: "ABM gifts",
            tab: "ABM gifts",
            title: "Make outreach stand out",
            description: "Send personalized gifts to priority accounts at the moments that matter.",
            bullets: ["Personalized sends", "Recipient gift choice", "Ships to 170+ countries"],
            image: brandAbm,
            imageAlt: "A marketer packing a branded welcome kit with a hoodie and tote at her desk",
          },
          {
            id: "webinar-gifts",
            name: "Webinar gifts",
            tab: "Webinar gifts",
            title: "Extend the webinar experience",
            description: "Reward attendees with a branded gift before or after the event.",
            bullets: ["Individual or bulk sends", "Recipient gift choice", "Ships to 170+ countries"],
            image: brandWebinar,
            imageAlt: "A man at a desk writing notes beside a laptop and a small gift box",
          },
          {
            id: "product-launches",
            name: "Product launches",
            tab: "Product launches",
            title: "Bring launches to life",
            description: "Coordinate branded sends for customers, partners, press, and teams.",
            bullets: ["Multiple audiences", "Coordinated sends", "Consistent branding"],
            image: brandLaunches,
            imageAlt: "Two colleagues arranging branded launch kits and printed cards on a worktable",
          },
          {
            id: "field-kits",
            name: "Field kits",
            tab: "Field kits",
            title: "Keep field teams ready",
            description: "Give teams access to approved merchandise and kits wherever they work.",
            bullets: ["Approved branded items", "Kits for teams or prospects", "Easy to reorder"],
            image: brandFieldKits,
            imageAlt: "A field team member loading a branded box into the back of a car",
          },
          {
            id: "customer-advocacy",
            name: "Customer advocacy",
            tab: "Customer advocacy",
            title: "Give customers something worth sharing",
            description: "Celebrate customers and support advocacy programs with thoughtful branded sends.",
            bullets: ["Customer appreciation", "Personalized gifting", "Global delivery"],
            image: brandAdvocacy,
            imageAlt: "A customer holding up a purple branded hoodie from a gift box",
          },
        ]}
      />

      <StepCards
        align="center"
        caption="100+ integrations"
        captionColor="#16171b"
        title="Make branded sends part of your campaigns"
        description="Connect Stadium with Salesforce, HubSpot, and the tools your team already uses to trigger branded experiences from existing marketing workflows."
        defaultDesktopVisualWidth={265}
        items={[
          {
            title: "Trigger sends automatically",
            description: "Turn campaign actions and CRM activity into branded sends without adding another manual step.",
            content: <TriggerSends />,
          },
          {
            title: "Keep workflows connected",
            description: "Build Stadium into the systems and processes your Marketing and Sales teams already use.",
            content: <ConnectedToolsGraphic />,
          },
          {
            title: <>Track<br />recipient activity</>,
            description: "Keep send and redemption activity connected to the campaigns and audiences behind it.",
            content: <RecipientActivityGraphic />,
          },
        ]}
      />

      <ImageShowcase
        caption="Campaign visibility"
        title="See every send in one place"
        description="Track recipients, sends, and campaign activity without piecing together updates across vendors."
        graphic={<CampaignActivity />}
        imageAlt="Stadium shop reports showing points sent and accepted, thank-you messages, redemptions by country, and top products"
        framed={false}
      />

      <NumberedOfferings
        caption="Global reach"
        title="Take your campaigns around the world"
        description="Reach customers, prospects, partners, and teams across 170+ countries while Stadium handles the fulfillment and logistics behind every send."
        items={[
          { title: "170+ countries", description: "Global reach for campaigns and audiences.", image: reachCountries, imageAlt: "Stacked Stadium shipping boxes labelled by destination country on a packing table" },
          { title: "Fulfillment handled", description: "Stadium manages packing, shipping, and delivery.", image: reachFulfillment, imageAlt: "A fulfillment team member taping a Stadium shipping box" },
          { title: "One campaign, many regions", description: "Coordinate sends across audiences and locations without managing separate vendors.", graphic: <ReachRegions /> },
        ]}
      />
    </ImpactPageShell>
    </>
  );
}
