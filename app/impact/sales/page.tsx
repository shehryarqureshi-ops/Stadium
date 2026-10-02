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
import ImpactPageShell, { TeamDivider } from "@/app/components/impact/ImpactPageShell";
import { LINKS } from "@/app/components/impact/shared";

import dashboard from "@/public/impact/sales/dashboard.png";
import stackApi from "@/public/impact/sales/stack-api.png";
import stackChrome from "@/public/impact/sales/stack-chrome-extension.png";
import stackCrm from "@/public/impact/sales/stack-crm.png";
import stackWebhooks from "@/public/impact/sales/stack-webhooks.png";
import stepChooseGift from "@/public/impact/sales/step-choose-gift.png";
import visDelivery from "@/public/impact/sales/visibility-delivery.png";
import visRedemptions from "@/public/impact/sales/visibility-redemptions.png";
import visSalesActivity from "@/public/impact/sales/visibility-sales-activity.png";
import visTrackSends from "@/public/impact/sales/visibility-track-sends.png";
import wayExperiences from "@/public/impact/sales/way-experiences.jpg";
import wayGifting from "@/public/impact/sales/way-gifting.jpg";
import waySnacks from "@/public/impact/sales/way-snacks.jpg";
import waySwag from "@/public/impact/sales/way-swag.jpg";

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
            items={[
              { title: "Octus", description: "Expanded from employee swag to customer and VIP gifting, making external sends easier to scale from one platform." },
              { title: "Workato", description: "Scaled gifting across 25+ countries for customers and partners while cutting hours of manual work." },
              { title: "Isolved", description: "Expanded its swag program from 15 to 200 products as Sales, Marketing, employees, and customers adopted the platform." },
            ]}
          />
        </ImpactClosing>
      }
    >
      <VariableCardGrid
        caption="The problem"
        captionColor="#16171b"
        title="Gifting shouldn’t create more work for reps"
        description="When gifting happens outside the sales workflow, reps are left managing purchases, collecting addresses, and tracking sends themselves."
        gridColumns={4}
        imageStyle="panel"
        items={[
          { title: "Gifting spend is hard to track.", description: "Reps use corporate cards across individual sends, making budgets and gifting spend harder to manage." },
          { title: "Addresses create extra follow-up.", description: "Reps shouldn’t have to chase prospects and customers for shipping details." },
          { title: "Sends are disconnected from deal stages.", description: "The right sales moment shouldn’t depend on a rep remembering to send something." },
          { title: "It’s hard to connect gifting to results.", description: "When gifting happens outside the sales workflow, its impact on opportunities and pipeline is harder to see." },
        ]}
        footnote={FOOTNOTE}
      />

      <TeamDivider />

      <ImageShowcase
        caption="One gifting platform"
        title="Two ways to gift. One platform."
        description="Automate gifts around key sales moments or let reps send directly when a personal touch makes sense."
        image={dashboard}
        imageAlt="Stadium Gifting workspace showing automated sends around sales moments, rep sends, and all gifting activity"
        framed={false}
      />

      <StepCards
        align="center"
        caption="Less friction"
        captionColor="#16171b"
        title="Send the gift. They handle the details."
        description="Recipients choose what they want and enter their own shipping information, so reps don’t have to chase addresses or guess what to send."
        items={[
          {
            title: "They choose the gift",
            description: "Give recipients something they actually want.",
            image: stepChooseGift,
            imageAlt: "Gift picker with drinkware, bags, tech, and desk options",
            desktopVisualWidth: 235,
          },
          { title: <>They enter<br />the address</> },
          { title: <>Reps know when<br />to follow up</> },
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
            name: "Prospecting",
            tab: "Prospecting",
            title: "Make outreach stand out",
            description: "Give priority prospects a reason to engage with your outreach.",
            bullets: ["Personalized sends", "Recipient gift choice", "No address needed upfront"],
          },
          { name: "Meetings booked", tab: "Meetings booked", title: "Meeting Gifts", description: "Thank prospects for their time with a gift before or after the call." },
          { name: "Deal progression", tab: "Deal progression", title: "Deal Acceleration", description: "Sends orchestrated by account plays and pipeline stages." },
          { name: "Closed won", tab: "Closed won", title: "Closed-Won Gifting", description: "Programs supporting retention motions." },
          { name: "Renewal", tab: "Renewal", title: "Renewal Gifting", description: "Thank customers for renewing and keep the relationship strong." },
          { name: "Win-back", tab: "Win-back", title: "Win-Back Campaigns", description: "Re-engage former customers and stalled deals with a thoughtful send." },
        ]}
      />

      <StickyStepCards
        caption="Built for the revenue stack"
        captionColor="#16171b"
        title="Connect gifting to how your reps already sell"
        description="Automate gifting from your CRM and other sales workflows, or give reps tools to send without slowing down."
        steps={[
          {
            image: stackCrm,
            imageAlt: "Closed-won thank-you automation: when an opportunity is Closed Won over $25,000, send a welcome box",
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
            image: stackWebhooks,
            imageAlt: "Incoming webhook events triggering a gift 1.2 seconds after a deal closed",
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
            image: stackChrome,
            imageAlt: "Chrome extension sending a gift before a renewal call, from the calendar invite",
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
            image: stackApi,
            imageAlt: "Stadium API request creating a send and the recipient’s gift choice screen",
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
          { image: visTrackSends, imageAlt: "Recent sends this week with recipients, gifts, and dates", title: "Track Sends", description: "See what was sent and when." },
          { image: visRedemptions, imageAlt: "A recipient redeemed her gift within two hours of the send", title: "See Redemptions", description: "Know when recipients engage with their gift." },
          { image: visDelivery, imageAlt: "Gift box delivery tracker from packed to delivered", title: "Monitor Delivery", description: "Follow gifts through fulfillment and delivery." },
          { image: visSalesActivity, imageAlt: "Renewal opportunity timeline: gift delivered, meeting booked, stage advanced", title: "Connect to Sales Activity", description: "Keep gifting activity tied to the sales moments and workflows behind it." },
        ]}
        footnote={FOOTNOTE}
      />

      <NumberedOfferings
        caption="More ways to gift"
        title="Give reps more ways to make an impression"
        description="When the moment calls for a personal touch, reps can choose from gifts, swag, snacks, experiences, and more."
        items={[
          { title: "Gifting", description: "Personalized gifts for important sales moments.", image: wayGifting, imageAlt: "A Swagmagic gift box with a tumbler, pen, and notebook" },
          { title: "Swag", description: "Premium branded merchandise for prospects and customers.", image: waySwag, imageAlt: "Branded hoodie, cap, bottle, mug, notebook, and tote" },
          { title: "Snacks", description: "Personalized snack experiences for meetings and follow-ups.", image: waySnacks, imageAlt: "An assortment of packaged snacks" },
          { title: "Hosted Experiences", description: "Live experiences that bring prospects and customers together.", image: wayExperiences, imageAlt: "A hosted virtual game show with participants on video" },
          { title: "Gift Cards", description: "A flexible option when recipients prefer to choose." },
        ]}
      />
    </ImpactPageShell>
    </>
  );
}
