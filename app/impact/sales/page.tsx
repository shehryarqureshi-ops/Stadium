import type { Metadata } from "next";
import JsonLd from "@/app/components/seo/JsonLd";
import { seoMetadata } from "@/app/lib/seo/metadata";

import FeatureDetails from "@/app/components/common/FeatureDetails";
import ImageShowcase from "@/app/components/common/ImageShowcase";
import ImpactClosing from "@/app/components/common/ImpactClosing";
import NumberedOfferings from "@/app/components/common/NumberedOfferings";
import PillTabs from "@/app/components/common/PillTabs";
import StepCards from "@/app/components/common/StepCards";
import StickyStepCards from "@/app/components/common/StickyStepCards";
import TeamHero from "@/app/components/common/TeamHero";
import VariableCardGrid from "@/app/components/common/VariableCardGrid";
import { CASE_STUDIES } from "@/app/components/impact/caseStudies";
import DealRail from "@/app/components/impact/DealRail";
import { ChooseGiftGraphic, EnterAddressGraphic, FollowUpGraphic } from "@/app/components/impact/SalesGraphics";
import ImpactPageShell, { TeamDivider } from "@/app/components/impact/ImpactPageShell";
import { LINKS } from "@/app/components/impact/shared";

import problemSpend from "@/public/impact/sales/v2/problem-spend.jpg";
import problemAddresses from "@/public/impact/sales/v2/problem-addresses.jpg";
import problemStages from "@/public/impact/sales/v2/problem-stages.jpg";
import problemResults from "@/public/impact/sales/v2/problem-results.jpg";
import journeyProspecting from "@/public/impact/sales/v2/journey-prospecting.jpg";
import journeyMeetings from "@/public/impact/sales/v2/journey-meetings.jpg";
import journeyDeal from "@/public/impact/sales/v2/journey-deal-progression.jpg";
import journeyClosedWon from "@/public/impact/sales/v2/journey-closed-won.jpg";
import journeyRenewal from "@/public/impact/sales/v2/journey-renewal.jpg";
import journeyWinBack from "@/public/impact/sales/v2/journey-win-back.jpg";
import engageGifting from "@/public/impact/hr/v2/engage-gifting.jpg";
import engageSwag from "@/public/impact/hr/v2/engage-swag.jpg";
import engageSnacks from "@/public/impact/hr/v2/engage-snacks.jpg";
import engageExperiences from "@/public/impact/hr/v2/engage-experiences.jpg";
import Dashboard from "@/app/components/cards/impact-sales/Dashboard";
import StackApi from "@/app/components/cards/impact-sales/StackApi";
import StackChrome from "@/app/components/cards/impact-sales/StackChrome";
import VectorCard from "@/app/components/cards/VectorCard";
import VisRedemptions from "@/app/components/cards/impact-sales/VisRedemptions";

export const metadata: Metadata = seoMetadata("/impact/sales");

/* /impact/sales — Figma n9SjmDjzB1PeZAYJ5w43fr → 3998:18764. Tabs other than
   "Prospecting" have no Figma content: their copy comes from the Sales use
   cases in the Impact by Team menu (ImpactMenu.tsx) where one matches, with
   placeholder imagery. Problem cards and case studies keep Figma's grey
   placeholders. */

const FOOTNOTE = "Your reps should focus on the relationship–not the logistics behind the gift.";

export default function SalesPage() {
  return (
    <>
      <JsonLd path="/impact/sales" />
    <ImpactPageShell
      hero={
        <TeamHero
          eyebrow="Stadium for Sales"
          title="Gifting that keeps deals moving"
          description="Automate gifts from your sales workflows or let reps send on demand, with every touchpoint connected back to sales activity."
          primaryCta={{ label: "Talk to sales", href: LINKS.sales }}
          secondaryCta={{ label: "Explore the platform", href: LINKS.platform }}
          background="canvas"
          visual={<DealRail />}
          visualLayout="aligned"
          visualMaxWidth="37rem"
        />
      }
      closing={
        <ImpactClosing
          cta={{
            caption: "Get started",
            title: "Strengthen relationships from prospect to customer",
            description:
              "Create thoughtful touchpoints across the sales journey with automated sends and flexible, rep-led experiences.",
            primary: { label: "Talk to sales", href: LINKS.sales },
            secondary: { label: "Explore the platform", href: LINKS.platform },
          }}
        >
          <VariableCardGrid
            background="transparent"
            caption="Customer results"
            captionColor="#16171b"
            title="See how teams scale sales gifting with Stadium"
            description="Give reps more ways to connect with prospects and customers throughout the relationship."
            imageFit="cover"
            items={CASE_STUDIES.sales}
          />
        </ImpactClosing>
      }
    >
      <VariableCardGrid
        caption="The problem"
        captionColor="#16171b"
        title="Gifting shouldn’t create more work for reps"
        description="When gifting happens outside the sales workflow, reps are left managing purchases, collecting addresses, and tracking sends themselves."
        gridColumns={2}
        narrow
        imageStyle="panel"
        items={[
          { image: problemSpend, imageAlt: "A sales rep reviewing gifting receipts and a laptop at a desk", title: "Gifting spend is hard to track.", description: "Reps use corporate cards across individual sends, making budgets and gifting spend harder to manage." },
          { image: problemAddresses, imageAlt: "A sales rep looking for shipping details on a laptop", title: "Addresses create extra follow-up.", description: "Reps shouldn’t have to chase prospects and customers for shipping details." },
          { image: problemStages, imageAlt: "A sales rep checking a deal pipeline on a laptop", title: "Sends are disconnected from deal stages.", description: "The right sales moment shouldn’t depend on a rep remembering to send something." },
          { image: problemResults, imageAlt: "A sales rep reviewing pipeline results on a laptop", title: "It’s hard to connect gifting to results.", description: "When gifting happens outside the sales workflow, its impact on opportunities and pipeline is harder to see." },
        ]}
        footnote={FOOTNOTE}
      />

      <TeamDivider />

      <ImageShowcase
        caption="One gifting platform"
        title="Two ways to gift. One platform."
        description="Automate gifts around key sales moments or let reps send directly when a personal touch makes sense."
        graphic={<Dashboard />}
        framed={false}
      />

      <StepCards
        align="center"
        caption="Less friction"
        captionColor="#16171b"
        title="Send the gift. They handle the details."
        description="Recipients choose what they want and enter their own shipping information, so reps don’t have to chase addresses or guess what to send."
        defaultDesktopVisualWidth={235}
        items={[
          {
            title: <>They choose<br />the gift</>,
            description: "Give recipients something they actually want.",
            content: <ChooseGiftGraphic />,
          },
          {
            title: <>They enter<br />the address</>,
            description: "No shipping details for reps to chase.",
            content: <EnterAddressGraphic />,
          },
          {
            title: "Reps know when to follow up",
            description: "Track the gift through delivery and use receipt as a natural next touchpoint.",
            content: <FollowUpGraphic />,
          },
        ]}
      />

      <PillTabs
        caption="Across the sales journey"
        captionColor="#16171b"
        title="A gift for every sales moment"
        description="Build gifting into prospect and customer relationships, from first outreach to renewals."
        autoAdvance={false}
        items={[
          {
            id: "prospecting",
            name: "Prospecting",
            tab: "Prospecting",
            title: "Make outreach stand out",
            description: "Give priority prospects a reason to engage with your outreach.",
            bullets: ["Personalized sends", "Recipient gift choice", "No address needed upfront"],
            image: journeyProspecting,
            imageAlt: "A sales rep preparing outreach on a laptop",
          },
          {
            id: "meetings-booked",
            name: "Meetings booked",
            tab: "Meetings booked",
            title: "Keep the conversation going",
            description: "Build on the conversation with a timely follow-up after the meeting.",
            bullets: ["Send directly to prospects", "25K+ gift options", "Recipients enter addresses"],
            image: journeyMeetings,
            imageAlt: "A sales rep following up after a meeting",
          },
          {
            id: "deal-progression",
            name: "Deal progression",
            tab: "Deal progression",
            title: "Mark the moments that move deals forward",
            description: "Add a thoughtful touch at key stages of the deal.",
            bullets: ["Automated by deal-stage", "Personalized sends", "Recipient gift choice"],
            image: journeyDeal,
            imageAlt: "A sales rep reviewing deal stages on a laptop",
          },
          {
            id: "closed-won",
            name: "Closed won",
            tab: "Closed won",
            title: "Start the relationship strong",
            description: "Give new customers a polished handoff from prospect to customer.",
            bullets: ["Premium branded options", "Customer welcome kits", "Recipient gift choice"],
            image: journeyClosedWon,
            imageAlt: "A sales rep unboxing a premium branded gift",
          },
          {
            id: "renewal",
            name: "Renewal",
            tab: "Renewal",
            title: "Make customer milestones count",
            description: "Support renewal conversations with a personalized touch for key customers.",
            bullets: ["Personalized customer sends", "Premium gift options", "Customize with a personalized note"],
            image: journeyRenewal,
            imageAlt: "A customer opening a branded gift box at home",
          },
          {
            id: "win-back",
            name: "Win-back",
            tab: "Win-back",
            title: "Give them a reason to reconnect",
            description: "Use gifting to support re-engagement with customers who have gone quiet.",
            bullets: ["Personalized gift choice", "Rep-led sends", "No address needed upfront"],
            image: journeyWinBack,
            imageAlt: "A customer opening a gift box in a kitchen",
          },
        ]}
      />

      <StickyStepCards
        caption="Built for the revenue stack"
        captionColor="#16171b"
        title="Connect gifting to how your reps already sell"
        description="Automate gifting from your CRM and other sales workflows, or give reps tools to send without slowing down."
        steps={[
          {
            graphic: <VectorCard src="/cards/impact-sales/StackCrm.svg" alt="Closed-won thank-you automation: when an opportunity is Closed Won over $25,000, send a welcome box" width={648} height={364} />,
            eyebrow: "CRM integrations",
            title: "Trigger gifts from Salesforce and HubSpot",
            content: (
              <FeatureDetails
                description="Build gifting into existing CRM workflows, from deal-stage changes to new contacts and campaigns."
                bullets={["Salesforce", "HubSpot", "Automated gifting"]}
              />
            ),
          },
          {
            graphic: <VectorCard src="/cards/impact-sales/StackWebhooks.svg" alt="Incoming webhook events triggering a gift 1.2 seconds after a deal closed" width={648} height={364} />,
            eyebrow: "Webhooks",
            title: "Turn sales events into real-time gifts",
            content: (
              <FeatureDetails
                description="Use Stadium Webhooks to automatically trigger gifting when an event happens in your CRM or another sales system."
                bullets={["Real-time triggers", "Works with external systems", "Automated fulfillment"]}
              />
            ),
          },
          {
            graphic: <StackChrome />,
            eyebrow: "Chrome extension",
            title: "Let reps gift without leaving their workflow",
            content: (
              <FeatureDetails
                description="Send Stadium Points directly from the browser, with recipient emails pulled from the page you’re already working in."
                bullets={["Send from the browser", "Recipient emails can populate automatically", "Access Stadium rewards"]}
              />
            ),
          },
          {
            graphic: <StackApi />,
            eyebrow: "Stadium API",
            title: "Build gifting into your own workflows",
            content: (
              <FeatureDetails
                description="Use the Stadium API to create custom gifting experiences, automate reward delivery, and track redemptions."
                bullets={["Custom integrations", "Automated distribution", "Redemption tracking"]}
              />
            ),
          },
        ]}
      />

      <VariableCardGrid
        caption="Sales visibility"
        captionColor="#16171b"
        title="Connect every gift back to the pipeline"
        description="Keep gifting activity connected to your sales workflow so teams can see what was sent, how recipients engaged, and what happened next."
        gridColumns={2}
        narrow
        imageStyle="panel"
        items={[
          { graphic: <VectorCard src="/cards/impact-sales/VisTrackSends.svg" alt="Recent sends this week with recipients, gifts, and dates" width={400} height={250} />, title: "Track Sends", description: "See what was sent and when." },
          { graphic: <VisRedemptions />, title: "See Redemptions", description: "Know when recipients engage with their gift." },
          { graphic: <VectorCard src="/cards/impact-sales/VisDelivery.svg" alt="Gift box delivery tracker from packed to delivered" width={400} height={250} />, title: "Monitor Delivery", description: "Follow gifts through fulfillment and delivery." },
          { graphic: <VectorCard src="/cards/impact-sales/VisSalesActivity.svg" alt="Renewal opportunity timeline: gift delivered, meeting booked, stage advanced" width={400} height={250} />, title: "Connect to Sales Activity", description: "Keep gifting activity tied to the sales moments and workflows behind it." },
        ]}
        footnote={FOOTNOTE}
      />

      <NumberedOfferings
        caption="More ways to gift"
        title="Give reps more ways to make an impression"
        description="When the moment calls for a personal touch, reps can choose from gifts, swag, snacks, experiences, and more."
        items={[
          { title: "Gifting", description: "Personalized gifts for important sales moments.", image: engageGifting, imageAlt: "Unwrapping a gift box with a perfume bottle" },
          { title: "Swag", description: "Premium branded merchandise for prospects and customers.", image: engageSwag, imageAlt: "Branded hoodie, cap, and bottle" },
          { title: "Snacks", description: "Personalized snack experiences for meetings and follow-ups.", image: engageSnacks, imageAlt: "A Snackmagic box filled with snacks" },
          { title: "Hosted Experiences", description: "Live experiences that bring prospects and customers together.", image: engageExperiences, imageAlt: "A person painting during a hosted remote experience" },
          { title: "Gift Cards", description: "A flexible option when recipients prefer to choose." },
        ]}
      />
    </ImpactPageShell>
    </>
  );
}
