import type { Metadata } from "next";
import JsonLd from "@/app/components/seo/JsonLd";
import { seoMetadata } from "@/app/lib/seo/metadata";

import ChecklistCards from "@/app/components/common/ChecklistCards";
import ImageShowcase from "@/app/components/common/ImageShowcase";
import ImpactClosing from "@/app/components/common/ImpactClosing";
import ImpactProof from "@/app/components/common/ImpactProof";
import NumberedOfferings from "@/app/components/common/NumberedOfferings";
import PillTabs from "@/app/components/common/PillTabs";
import TeamHero from "@/app/components/common/TeamHero";
import VariableCardGrid from "@/app/components/common/VariableCardGrid";
import { CASE_STUDIES } from "@/app/components/impact/caseStudies";
import Governance from "@/app/components/impact/Governance";
import JourneyRecognition from "@/app/components/cards/impact-leadership/JourneyRecognition";
import ImpactPageShell, { TeamDivider } from "@/app/components/impact/ImpactPageShell";
import { LINKS, G2_RATING } from "@/app/components/impact/shared";

import VectorCard from "@/app/components/cards/VectorCard";
import CompanyOverview from "@/app/components/cards/impact-leadership/CompanyOverview";
import TeamsWorkspace from "@/app/components/cards/impact-leadership/TeamsWorkspace";

import problemTools from "@/public/impact/leadership/v2/problem-tools.webp";
import problemBudgets from "@/public/impact/leadership/v2/problem-budgets.webp";
import problemConsistency from "@/public/impact/leadership/v2/problem-consistency.webp";
import problemOversight from "@/public/impact/leadership/v2/problem-oversight.webp";
import journeyOnboarding from "@/public/impact/leadership/v2/journey-onboarding.webp";
import journeyMilestones from "@/public/impact/leadership/v2/journey-milestones.webp";
import journeyEvents from "@/public/impact/leadership/v2/journey-events.webp";
import journeyAppreciation from "@/public/impact/leadership/v2/journey-appreciation.webp";
import journeySales from "@/public/impact/leadership/v2/journey-sales.webp";
import engageRecognition from "@/public/impact/hr/v2/hr-engage-recognition.webp";
import engageSwag from "@/public/impact/hr/v2/hr-engage-swag.webp";
import engageSnacks from "@/public/impact/hr/v2/hr-engage-snacks.webp";
import engageGifting from "@/public/impact/hr/v2/hr-engage-gifting.webp";
import engageExperiences from "@/public/impact/hr/v2/hr-engage-experiences.webp";
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
            visual={<Governance />}
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
            <ImpactProof
              caption="Customer results"
              title="Organizations scaling with Stadium"
              rating={G2_RATING}
              cards={CASE_STUDIES.leadership}
            />
          </ImpactClosing>
        }
      >
        <VariableCardGrid
          caption="The problem"
          captionColor="#16171b"
          title={
            <>
              Growth makes engagement
              <br className="hidden md:block" /> harder to manage
            </>
          }
          description="As organizations expand, programs spread across teams, tools, vendors, budgets, and regions."
          gridColumns={2}
          narrow
          imageStyle="panel"
          items={[
            { image: problemTools, imageAlt: "Employees at their desks in an open office, each working in a separate tool", description: "Teams use separate tools." },
            { image: problemBudgets, imageAlt: "Two colleagues comparing budget documents across a laptop and papers", description: "Budgets live in different places." },
            { image: problemConsistency, imageAlt: "A manager on a video call with a remote office from a conference table", description: "Programs become harder to scale consistently." },
            { image: problemOversight, imageAlt: "A leader standing in a glass-walled office looking out over several teams", description: "Leadership lacks company-wide oversight." },
          ]}
          footnote="Scaling engagement shouldn’t mean adding more tools, vendors, and workflows."
        />

        <TeamDivider />

        <ImageShowcase
          id="one-platform"
          caption="One infrastructure"
          title="Bring every team onto one platform"
          description="Bring programs across HR, Marketing, Sales, and CX onto one platform, with Finance and Leadership getting the visibility and control they need. Stadium’s SOC 2 compliance provides a foundation for security and governance across teams."
          graphic={<TeamsWorkspace />}
          imageAlt="Stadium Teams workspace showing HR & People, Marketing, Sales, and Customer Experience on one platform with programs and spend per team"
          framed={false}
        />

        <ChecklistCards
          id="governance"
          caption="Centralized governance"
          title={
            <>
              Give teams autonomy.
              <br className="hidden md:block" /> Keep company-wide control.
            </>
          }
          description="Set budgets, permissions, and brand standards centrally while teams manage their own programs."
          cards={[
            {
              title: "Empower individual teams",
              description: "Let teams take ownership of their programs while working within clear budgets and permissions.",
              bullets: ["Team-level permissions", "Program ownership", "Flexible budgets"],
            },
            {
              title: "Set the guardrails",
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
              id: "onboarding",
              name: "Onboarding",
              tab: "Onboarding",
              title: "Give every new hire a strong start",
              description: "Create a consistent welcome for new hires across teams, offices, and regions.",
              bullets: ["New hire kits", "Branded swag", "Automated sends"],
              image: journeyOnboarding,
              imageAlt: "Colleagues welcoming a new hire with a handshake as another opens a branded ARCADE welcome kit",
            },
            {
              id: "recognition",
              name: "Recognition",
              tab: "Recognition",
              title: "Recognize great work as it happens",
              description: "Help employees and managers recognize contributions, reinforce company values, and build morale across teams and locations.",
              bullets: ["Employee-to-employee recognition", "Slack + Teams recognition", "Points and rewards"],
              graphic: <JourneyRecognition />,
            },
            {
              id: "milestones",
              name: "Milestones",
              tab: "Milestones",
              title: "Mark the milestones people reach",
              description: "Recognize progress at every level, from employee anniversaries to company achievements.",
              bullets: ["Work anniversaries", "Team achievements", "Company milestones"],
              image: journeyMilestones,
              imageAlt: "A colleague moved to tears opening a gift box while teammates applaud",
            },
            {
              id: "events",
              name: "Events",
              tab: "Events",
              title: "Make company events feel connected",
              description: "Support distributed teams with branded experiences before, during, and after an event.",
              bullets: ["Company kickoffs", "Team gatherings", "Event kits"],
              image: journeyEvents,
              imageAlt: "Colleagues relaxing after a pickleball game at a company event",
            },
            {
              id: "customer-appreciation",
              name: "Customer appreciation",
              tab: "Customer appreciation",
              title: "Show customers they’re valued",
              description: "Mark anniversaries and renewals, or send a thank-you that goes beyond the usual email.",
              bullets: ["Customer thank-yous", "Renewal gifts", "Partner appreciation"],
              image: journeyAppreciation,
              imageAlt: "A woman hand-writing a thank-you note at her desk beside boxes of chocolates",
            },
            {
              id: "sales",
              name: "Sales",
              tab: "Sales",
              title: "Support reps beyond the conversation",
              description: "Send gifts after meetings, as deals progress, or when a prospect becomes a customer.",
              bullets: ["Prospect gifts", "CRM-triggered sends", "Customer welcomes"],
              image: journeySales,
              imageAlt: "A sales rep handing a customer a Snackmagic gift box in an office lobby",
            },
          ]}
        />

        <VariableCardGrid
          id="scale"
          caption="Built to scale"
          captionColor="#16171b"
          title="Grow programs without increasing complexity"
          description="Connect Stadium to the systems your teams already use and support people across 170+ countries from one infrastructure."
          gridColumns={3}
          imageStyle="panel"
          items={[
            { graphic: <VectorCard src="/cards/impact-leadership/ScaleIntegrations.svg" alt="Integrations grid with Workday, Salesforce, HubSpot, BambooHR, Greenhouse, and SAP" width={389} height={250} />, title: "100+ Integrations", description: "Connect Stadium to the systems and workflows your teams already use." },
            { graphic: <VectorCard src="/cards/impact-leadership/ScaleCountries.svg" alt="Ship-to country picker searching 170+ countries" width={390} height={250} />, title: "170+ Countries", description: "Support employees, customers, partners, and prospects around the world." },
            { graphic: <VectorCard src="/cards/impact-leadership/ScaleInfrastructure.svg" alt="New locations, programs, and teams added on Stadium with zero new vendors needed" width={390} height={250} />, title: "One Global Infrastructure", description: "Add teams, programs, audiences, and locations without adding disconnected vendors and workflows." },
          ]}
        />

        <ImageShowcase
          caption="Company-wide visibility"
          title="See engagement across every team"
          description="Get one view of programs, activity, budgets, and spend."
          graphic={<CompanyOverview />}
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
