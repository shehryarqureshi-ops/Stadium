import type { Metadata } from "next";
import JsonLd from "@/app/components/seo/JsonLd";
import { seoMetadata } from "@/app/lib/seo/metadata";

import ChecklistCards from "@/app/components/common/ChecklistCards";
import ImageShowcase from "@/app/components/common/ImageShowcase";
import ImpactClosing from "@/app/components/common/ImpactClosing";
import NumberedOfferings from "@/app/components/common/NumberedOfferings";
import PillTabs from "@/app/components/common/PillTabs";
import TeamHero from "@/app/components/common/TeamHero";
import VariableCardGrid from "@/app/components/common/VariableCardGrid";
import { CASE_STUDIES } from "@/app/components/impact/caseStudies";
import GuardrailsTray from "@/app/components/impact/GuardrailsTray";
import ImpactPageShell, { TeamDivider } from "@/app/components/impact/ImpactPageShell";
import { LINKS } from "@/app/components/impact/shared";

import companyOverview from "@/public/impact/leadership/company-overview.png";
import scaleCountries from "@/public/impact/leadership/scale-countries.png";
import scaleInfrastructure from "@/public/impact/leadership/scale-infrastructure.png";
import scaleIntegrations from "@/public/impact/leadership/scale-integrations.png";
import teamsWorkspace from "@/public/impact/leadership/teams-workspace.png";

import problemTools from "@/public/impact/leadership/v2/problem-tools.jpg";
import problemBudgets from "@/public/impact/leadership/v2/problem-budgets.jpg";
import problemConsistency from "@/public/impact/leadership/v2/problem-consistency.jpg";
import problemOversight from "@/public/impact/leadership/v2/problem-oversight.jpg";
import journeyOnboarding from "@/public/impact/leadership/v2/journey-onboarding.jpg";
import journeyRecognition from "@/public/impact/leadership/v2/journey-recognition.jpg";
import journeyMilestones from "@/public/impact/leadership/v2/journey-milestones.jpg";
import journeyEvents from "@/public/impact/leadership/v2/journey-events.jpg";
import journeyAppreciation from "@/public/impact/leadership/v2/journey-appreciation.jpg";
import journeySales from "@/public/impact/leadership/v2/journey-sales.jpg";
import RecognitionToast from "@/app/components/impact/RecognitionToast";
import engageRecognition from "@/public/impact/hr/v2/engage-recognition.jpg";
import engageSwag from "@/public/impact/hr/v2/engage-swag.jpg";
import engageSnacks from "@/public/impact/hr/v2/engage-snacks.jpg";
import engageGifting from "@/public/impact/hr/v2/engage-gifting.jpg";
import engageExperiences from "@/public/impact/hr/v2/engage-experiences.jpg";
import KudosToast from "@/app/components/impact/KudosToast";

export const metadata: Metadata = seoMetadata("/impact/leadership");

/* /impact/leadership — Figma n9SjmDjzB1PeZAYJ5w43fr → 3998:20107. Tabs other
   than "Onboarding" have no Figma content: "Recognition" uses the Leadership
   use case from the Impact by Team menu (ImpactMenu.tsx); the rest borrow the
   closest use case from other teams in that menu. All use placeholder imagery.
   The "five ways" photos are the same artwork as /impact/finance. */

export default function LeadershipPage() {
  return (
    <>
      <JsonLd path="/impact/leadership" />
    <ImpactPageShell
      hero={
        <TeamHero
          eyebrow="Stadium for Leadership"
          title="One engagement platform for the entire organization"
          description="Let teams run their programs while leadership maintains company-wide visibility and control."
          primaryCta={{ label: "Talk to sales", href: LINKS.sales }}
          secondaryCta={{ label: "Explore the platform", href: LINKS.platform }}
          background="canvas"
          visual={<GuardrailsTray />}
          visualLayout="aligned"
          visualMaxWidth="36.25rem"
        />
      }
      closing={
        <ImpactClosing
          cta={{
            caption: "Get started",
            title: "Bring engagement together as your organization grows",
            description: "Scale programs across the business without adding operational complexity.",
            primary: { label: "Talk to sales", href: LINKS.sales },
            secondary: { label: "Explore the platform", href: LINKS.platform },
          }}
        >
          <VariableCardGrid
            background="transparent"
            caption="Customer results"
            captionColor="#16171b"
            title="Organizations scaling with Stadium"
            imageFit="cover"
            items={CASE_STUDIES.leadership}
          />
        </ImpactClosing>
      }
    >
      <VariableCardGrid
        caption="The problem"
        captionColor="#16171b"
        title="Growth makes engagement harder to govern"
        description="As organizations expand, programs spread across teams, tools, vendors, budgets, and regions."
        gridColumns={2}
        narrow
        imageStyle="panel"
        items={[
          { image: problemTools, imageAlt: "Four teams each working in a separate tool", description: "Teams use separate tools." },
          { image: problemBudgets, imageAlt: "A leader comparing budgets that live in different places", description: "Budgets live in different places." },
          { image: problemConsistency, imageAlt: "Programs running differently across offices", description: "Programs become harder to scale consistently." },
          { image: problemOversight, imageAlt: "A leader without company-wide oversight of engagement spend", description: "Leadership lacks company-wide oversight." },
        ]}
        footnote="Scaling engagement shouldn’t mean adding more tools, vendors, and workflows."
      />

      <TeamDivider />

      <ImageShowcase
        caption="One infrastructure"
        title="Bring every team onto one platform"
        description="Bring programs across HR, Marketing, Sales, and CX onto one platform, with Finance and leadership getting the visibility and control they need."
        image={teamsWorkspace}
        imageAlt="Stadium Teams workspace showing HR & People, Marketing, Sales, and Customer Experience on one platform with programs and spend per team"
        framed={false}
      />

      <ChecklistCards
        caption="Centralized governance"
        title="Give teams autonomy. Keep company-wide control."
        description="Set budgets, permissions, and brand standards centrally while teams manage their own programs."
        cards={[
          {
            title: "Empower Individual Teams",
            description: "Let teams take ownership of their programs while working within clear budgets and permissions.",
            bullets: ["Team-level permissions", "Program ownership", "Flexible budgets"],
          },
          {
            title: "Set the Guardrails",
            description: "Maintain company-wide standards while keeping oversight centralized.",
            bullets: ["Budget controls", "Brand standards", "Program controls"],
          },
        ]}
      />

      <PillTabs
        caption="Company-wide engagement"
        captionColor="#16171b"
        title="Power the moments people remember"
        description="Support the moments that build morale, strengthen relationships, and help people feel valued, from new hire welcomes and employee recognition to company events and customer appreciation."
        autoAdvance={false}
        items={[
          {
            name: "Onboarding",
            tab: "Onboarding",
            title: "Give every new hire a strong start",
            description: "Create a consistent welcome for new hires across teams, offices, and regions.",
            bullets: ["New hire kits", "Branded swag", "Automated sends"],
            image: journeyOnboarding,
            imageAlt: "A new hire welcome kit",
          },
          {
            name: "Recognition",
            tab: "Recognition",
            title: "Recognize great work as it happens",
            description: "Help employees and managers recognize contributions, reinforce company values, and build morale across teams and locations.",
            bullets: ["Employee-to-employee recognition", "Slack + Teams recognition", "Points and rewards"],
            image: journeyRecognition,
            imageAlt: "A recognition moment shown on a laptop",
            overlay: <RecognitionToast />,
          },
          {
            name: "Milestones",
            tab: "Milestones",
            title: "Mark the milestones people reach",
            description: "Recognize progress at every level, from employee anniversaries to company achievements.",
            bullets: ["Work anniversaries", "Team achievements", "Company milestones"],
            image: journeyMilestones,
            imageAlt: "A team celebrating a milestone",
          },
          {
            name: "Events",
            tab: "Events",
            title: "Make company events feel connected",
            description: "Support distributed teams with branded experiences before, during, and after an event.",
            bullets: ["Company kickoffs", "Team gatherings", "Event kits"],
            image: journeyEvents,
            imageAlt: "A team gathering with branded event kits",
          },
          {
            name: "Customer appreciation",
            tab: "Customer appreciation",
            title: "Show customers they’re valued",
            description: "Mark anniversaries and renewals, or send a thank-you that goes beyond the usual email.",
            bullets: ["Customer thank-yous", "Renewal gifts", "Partner appreciation"],
            image: journeyAppreciation,
            imageAlt: "A customer receiving a thank-you gift",
          },
          {
            name: "Sales",
            tab: "Sales",
            title: "Support reps beyond the conversation",
            description: "Send gifts after meetings, as deals progress, or when a prospect becomes a customer.",
            bullets: ["Prospect gifts", "CRM-triggered sends", "Customer welcomes"],
            image: journeySales,
            imageAlt: "A sales rep preparing a gift",
          },
        ]}
      />

      <VariableCardGrid
        caption="Built to scale"
        captionColor="#16171b"
        title="Grow programs without increasing complexity"
        description="Connect Stadium to the systems your teams already use and support people across 170+ countries from one infrastructure."
        gridColumns={3}
        imageStyle="panel"
        items={[
          { image: scaleIntegrations, imageAlt: "Integrations grid with Workday, Salesforce, HubSpot, BambooHR, Greenhouse, and SAP", title: "100+ Integrations", description: "Connect Stadium to the systems and workflows your teams already use." },
          { image: scaleCountries, imageAlt: "Ship-to country picker searching 170+ countries", title: "170+ Countries", description: "Support employees, customers, partners, and prospects around the world." },
          { image: scaleInfrastructure, imageAlt: "New locations, programs, and teams added on Stadium with zero new vendors needed", title: "One Global Infrastructure", description: "Add teams, programs, audiences, and locations without adding disconnected vendors and workflows." },
        ]}
      />

      <ImageShowcase
        caption="Company-wide visibility"
        title="See engagement across every team"
        description="Get one view of programs, activity, budgets, and spend."
        image={companyOverview}
        imageAlt="Stadium Company overview showing live programs, sends, spend against funding, and spend by team"
        framed={false}
        footnote="Manage Budgets. Monitor Activity. See Spend Across Teams. See Programs Across Teams."
      />

      <NumberedOfferings
        caption="One platform"
        title="More ways to connect with the people who matter"
        description="Give teams the flexibility to run recognition, swag, gifting, snacks, and hosted experiences from one company-wide platform."
        items={[
          { title: "Recognition", description: "Points and rewards for recognition programs.", image: engageRecognition, imageAlt: "Handing over a wrapped reward package", overlay: <KudosToast /> },
          { title: "Swag", description: "Branded merchandise for teams and audiences.", image: engageSwag, imageAlt: "Branded hoodie, cap, and bottle" },
          { title: "Gifting", description: "Flexible gifting across employee and business programs.", image: engageGifting, imageAlt: "Unwrapping a gift box with a perfume bottle" },
          { title: "Snacks", description: "Food and treats for teams, customers, and events.", image: engageSnacks, imageAlt: "A Snackmagic box filled with snacks" },
          { title: "Hosted Experiences", description: "Live-hosted events that bring people together.", image: engageExperiences, imageAlt: "A person painting during a hosted remote experience" },
        ]}
      />
    </ImpactPageShell>
    </>
  );
}
