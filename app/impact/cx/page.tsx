import type { Metadata } from "next";
import JsonLd from "@/app/components/seo/JsonLd";
import { seoMetadata } from "@/app/lib/seo/metadata";

import ChecklistCards from "@/app/components/common/ChecklistCards";
import FeatureDetails from "@/app/components/common/FeatureDetails";
import ImageShowcase from "@/app/components/common/ImageShowcase";
import ImpactClosing from "@/app/components/common/ImpactClosing";
import NumberedOfferings from "@/app/components/common/NumberedOfferings";
import PillTabs from "@/app/components/common/PillTabs";
import StickyStepCards from "@/app/components/common/StickyStepCards";
import TeamHero from "@/app/components/common/TeamHero";
import VariableCardGrid from "@/app/components/common/VariableCardGrid";
import GrowthSteps from "@/app/components/impact/GrowthSteps";
import ImpactPageShell, { TeamDivider } from "@/app/components/impact/ImpactPageShell";
import { LINKS } from "@/app/components/impact/shared";

import automationApi from "@/public/impact/cx/automation-api.png";
import automationCrm from "@/public/impact/cx/automation-crm.png";
import automationWebhooks from "@/public/impact/cx/automation-webhooks.png";
import dashboard from "@/public/impact/cx/dashboard.png";
import visActivity from "@/public/impact/cx/visibility-activity.png";
import visBudgets from "@/public/impact/cx/visibility-budgets.png";
import visRedemptions from "@/public/impact/cx/visibility-redemptions.png";
import visSends from "@/public/impact/cx/visibility-sends.png";

import problemVendors from "@/public/impact/cx/v2/problem-vendors.jpg";
import problemAddresses from "@/public/impact/cx/v2/problem-addresses.jpg";
import problemRecurring from "@/public/impact/cx/v2/problem-recurring.jpg";
import journeyOnboarding from "@/public/impact/cx/v2/journey-onboarding.jpg";
import journeyMilestones from "@/public/impact/cx/v2/journey-milestones.jpg";
import journeyAppreciation from "@/public/impact/cx/v2/journey-appreciation.jpg";
import journeyEvents from "@/public/impact/cx/v2/journey-events.jpg";
import journeyResolution from "@/public/impact/cx/v2/journey-resolution.jpg";
import journeyRenewal from "@/public/impact/cx/v2/journey-renewal.jpg";
import engageRecognition from "@/public/impact/hr/v2/engage-recognition.jpg";
import engageSwag from "@/public/impact/hr/v2/engage-swag.jpg";
import engageSnacks from "@/public/impact/hr/v2/engage-snacks.jpg";
import engageGifting from "@/public/impact/hr/v2/engage-gifting.jpg";
import engageExperiences from "@/public/impact/hr/v2/engage-experiences.jpg";
import KudosToast from "@/app/components/impact/KudosToast";

export const metadata: Metadata = seoMetadata("/impact/cx");

/* /impact/cx — Figma n9SjmDjzB1PeZAYJ5w43fr → 3998:19461. Tabs other than
   "Onboarding" have no Figma content: their copy comes from the Customer
   Experience use cases in the Impact by Team menu (ImpactMenu.tsx) where one
   matches, with placeholder imagery. Case studies keep Figma's grey
   placeholders. */

export default function CxPage() {
  return (
    <>
      <JsonLd path="/impact/cx" />
    <ImpactPageShell
      hero={
        <TeamHero
          eyebrow="Stadium for Customer Experience"
          title="Build stronger customer relationships at every stage"
          description="Connect with customers from onboarding through renewal with thoughtful touchpoints that strengthen relationships and support retention."
          primaryCta={{ label: "Talk to sales", href: LINKS.sales }}
          secondaryCta={{ label: "Explore the platform", href: LINKS.platform }}
          background="canvas"
          visual={<GrowthSteps />}
          visualLayout="aligned"
          visualMaxWidth="37rem"
        />
      }
      closing={
        <ImpactClosing
          cta={{
            caption: "Get started",
            title: "Build relationships that last",
            description:
              "Give CX teams one scalable way to strengthen customer relationships from onboarding through renewal.",
            primary: { label: "Talk to sales", href: LINKS.sales },
            secondary: { label: "Explore the platform", href: LINKS.platform },
          }}
        >
          <VariableCardGrid
            background="transparent"
            caption="Customer results"
            captionColor="#16171b"
            title="See how teams scale customer engagement with Stadium"
            items={[
              { title: "Workato", description: "Used global gifting to engage customers and partners, show appreciation, and reward customer advocacy through G2 reviews." },
              { title: "Octus", description: "Drove customer survey participation and supported VIP gifting at scale, with predictable costs and minimal manual work." },
              { title: "Isolved", description: "Extended its branded swag experience to customers, who actively ask for and purchase company swag." },
            ]}
          />
        </ImpactClosing>
      }
    >
      <VariableCardGrid
        caption="The problem"
        captionColor="#16171b"
        title="Customer relationships are hard to scale"
        description="As your customer base grows, staying personal and consistent gets harder."
        gridColumns={3}
        imageStyle="panel"
        items={[
          { image: problemVendors, imageAlt: "A customer success manager sorting gifts and paperwork from different vendors", description: "Gifting happens across different vendors." },
          { image: problemAddresses, imageAlt: "A customer success manager collecting addresses and preferences by email", description: "Teams spend time collecting addresses and preferences." },
          { image: problemRecurring, imageAlt: "A customer success manager setting up recurring sends by hand", description: "Recurring sends require manual setup." },
        ]}
        footnote="Your team should focus on customers–not coordinating every send."
      />

      <TeamDivider />

      <ImageShowcase
        caption="One platform"
        title="One infrastructure for the customer relationship"
        description="Bring customer engagement programs, sends, budgets, and fulfillment together instead of managing separate vendors and workflows."
        image={dashboard}
        imageAlt="Stadium Customer engagement workspace showing live programs, sends, budget, fulfillment, and program owners"
        framed={false}
      />

      <ChecklistCards
        caption="Flexible engagement"
        title="Show up differently for every customer moment"
        description="Give CX teams the flexibility to send directly or automate key points in the customer journey."
        cards={[
          {
            title: "Gift when the occasion calls",
            description: "Send for customer wins, thank-yous, follow-ups, and other occasions that call for a personal touch.",
            bullets: ["Personalized sends", "Recipient gift choice", "No address needed upfront"],
          },
          {
            title: "Automate key customer milestones",
            description: "Set up sends around recurring lifecycle moments without starting from scratch.",
            bullets: ["Lifecycle-based sends", "Less manual coordination", "Consistent customer experience"],
          },
        ]}
      />

      <PillTabs
        caption="Across the customer journey"
        captionColor="#16171b"
        title="Show up throughout the customer relationship"
        description="From welcoming a new customer to recognizing a renewal, give CX teams more ways to connect beyond calls and emails."
        autoAdvance={false}
        items={[
          {
            name: "Onboarding",
            tab: "Onboarding",
            title: "Start with a memorable welcome",
            description: "Make new customers feel valued from the moment they come on board.",
            bullets: ["Welcome kits", "Branded swag kits", "Recipient gift choice"],
            image: journeyOnboarding,
            imageAlt: "A welcome kit prepared for a new customer",
          },
          {
            name: "Milestones",
            tab: "Milestones",
            title: "Celebrate the wins along the way",
            description: "Mark launches, anniversaries, and standout customer achievements.",
            bullets: ["Personalized sends", "Flexible gift options", "Custom notes"],
            image: journeyMilestones,
            imageAlt: "A customer celebrating a milestone with a gift",
          },
          {
            name: "Appreciation",
            tab: "Appreciation",
            title: "Make thank-yous stand out",
            description: "Go beyond another email when a customer deserves extra appreciation.",
            bullets: ["Send on demand", "Recipient gift choice", "Premium options"],
            image: journeyAppreciation,
            imageAlt: "A customer receiving a thank-you gift",
          },
          {
            name: "Customer events",
            tab: "Customer events",
            title: "Bring the event to them",
            description: "Give customers something to enjoy before, during, or after a virtual or in-person event.",
            bullets: ["Event kits", "Individual or bulk sends", "Branded options"],
            image: journeyEvents,
            imageAlt: "A customer enjoying an event kit",
          },
          {
            name: "Resolution",
            tab: "Resolution",
            title: "Follow up beyond the fix",
            description: "Show customers you care after an issue is resolved.",
            bullets: ["Rep-led sends", "Flexible gift options", "Personalized notes"],
            image: journeyResolution,
            imageAlt: "A customer opening a follow-up gift",
          },
          {
            name: "Renewal & loyalty",
            tab: "Renewal & loyalty",
            title: "Make long-term customers feel valued",
            description: "Strengthen the relationship around renewals, anniversaries, and other moments that build long-term loyalty.",
            bullets: ["Premium gift options", "Personalized sends", "Recipient gift choice"],
            image: journeyRenewal,
            imageAlt: "A long-term customer opening a premium gift",
          },
        ]}
      />

      <StickyStepCards
        caption="Customer automations"
        captionColor="#16171b"
        title="Connect gifting to your customer workflows"
        description="Trigger sends from the systems and customer activity your team already uses."
        steps={[
          {
            image: automationCrm,
            imageAlt: "Automated customer moments in Salesforce: onboarding kickoff, 1-year anniversary, and renewal",
            eyebrow: "CRM integrations",
            title: "Automate key customer moments",
            content: (
              <FeatureDetails description="Use Salesforce and HubSpot activity to trigger sends around customer milestones and lifecycle stages." />
            ),
          },
          {
            image: automationWebhooks,
            imageAlt: "Promoter thank-you automation sending a $25 gift card when an NPS response is a 9 or 10",
            eyebrow: "Webhooks",
            title: "Turn customer events into automatic sends",
            content: (
              <FeatureDetails description="Use Webhooks to trigger Stadium when a customer milestone or event happens in another system." />
            ),
          },
          {
            image: automationApi,
            imageAlt: "A customer portal with Stadium rewards built in through the Stadium API",
            eyebrow: "Stadium API",
            title: "Build engagement into your own workflows",
            content: (
              <FeatureDetails description="Use the Stadium API to connect gifting and rewards to custom customer experiences." />
            ),
          },
        ]}
      />

      <VariableCardGrid
        caption="Program visibility"
        captionColor="#16171b"
        title="See how customer engagement is working"
        description="Manage budgets and track sends, redemptions, and customer activity as your programs grow."
        gridColumns={2}
        narrow
        imageStyle="panel"
        items={[
          { image: visBudgets, imageAlt: "Customer success wallet with $21,775 left and spend by program", title: "Manage Budgets", description: "Keep customer engagement spend organized across teams and programs." },
          { image: visSends, imageAlt: "42 sends to customers this week, by day", title: "Track Sends", description: "See what was sent, to whom, and when." },
          { image: visRedemptions, imageAlt: "68% of customers redeemed their gift", title: "See Redemptions", description: "Know when customers engage with their experience." },
          { image: visActivity, imageAlt: "Customer timeline: onboarding box delivered, QBR thank-you gift, renewed +12%", title: "Connect Customer Activity", description: "Keep engagement visible alongside the customer relationship." },
        ]}
        footnote="Manage Budgets. Track Sends. See Redemptions."
      />

      <NumberedOfferings
        caption="One platform"
        title="More ways to engage customers"
        description="Choose the experience that fits the customer, the relationship, and the occasion."
        items={[
          { title: "Swag", description: "Branded merchandise and kits for customers.", image: engageSwag, imageAlt: "Branded hoodie, cap, and bottle" },
          { title: "Gifting", description: "Personalized gifts for meaningful customer moments.", image: engageGifting, imageAlt: "Unwrapping a gift box with a perfume bottle" },
          { title: "Snacks", description: "Personalized snack experiences for meetings and events.", image: engageSnacks, imageAlt: "A Snackmagic box filled with snacks" },
          { title: "Hosted Experiences", description: "Live-hosted events for customers and groups.", image: engageExperiences, imageAlt: "A person painting during a hosted remote experience" },
          { title: "Recognition", description: "Points and rewards customers can redeem.", image: engageRecognition, imageAlt: "Handing over a wrapped reward package", overlay: <KudosToast /> },
        ]}
      />
    </ImpactPageShell>
    </>
  );
}
