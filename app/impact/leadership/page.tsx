import type { Metadata } from "next";

import ChecklistCards from "@/app/components/common/ChecklistCards";
import ImageShowcase from "@/app/components/common/ImageShowcase";
import ImpactClosing from "@/app/components/common/ImpactClosing";
import NumberedOfferings from "@/app/components/common/NumberedOfferings";
import PillTabs from "@/app/components/common/PillTabs";
import TeamHero from "@/app/components/common/TeamHero";
import VariableCardGrid from "@/app/components/common/VariableCardGrid";
import ImpactPageShell, { TeamDivider } from "@/app/components/impact/ImpactPageShell";
import { LINKS } from "@/app/components/impact/shared";

import offeringGifting from "@/public/impact/finance/offering-gifting.jpg";
import offeringHosted from "@/public/impact/finance/offering-hosted-experiences.jpg";
import offeringSnacks from "@/public/impact/finance/offering-snacks.jpg";
import offeringSwag from "@/public/impact/finance/offering-swag.jpg";
import companyOverview from "@/public/impact/leadership/company-overview.png";
import problemBudgets from "@/public/impact/leadership/problem-budgets.png";
import problemConsistency from "@/public/impact/leadership/problem-consistency.png";
import problemOversight from "@/public/impact/leadership/problem-oversight.png";
import problemTools from "@/public/impact/leadership/problem-tools.png";
import scaleCountries from "@/public/impact/leadership/scale-countries.png";
import scaleInfrastructure from "@/public/impact/leadership/scale-infrastructure.png";
import scaleIntegrations from "@/public/impact/leadership/scale-integrations.png";
import teamsWorkspace from "@/public/impact/leadership/teams-workspace.png";

export const metadata: Metadata = {
  title: "Stadium for Leadership — One engagement platform for the entire organization",
  description:
    "Let teams run their programs while leadership maintains company-wide visibility and control.",
};

/* /impact/leadership — Figma n9SjmDjzB1PeZAYJ5w43fr → 3998:20107. Tabs other
   than "Onboarding" have no Figma content: "Recognition" uses the Leadership
   use case from the Impact by Team menu (ImpactMenu.tsx); the rest borrow the
   closest use case from other teams in that menu. All use placeholder imagery.
   The "five ways" photos are the same artwork as /impact/finance. */

export default function LeadershipPage() {
  return (
    <ImpactPageShell
      hero={
        <TeamHero
          eyebrow="Stadium for Leadership"
          title="One engagement platform for the entire organization"
          description="Let teams run their programs while leadership maintains company-wide visibility and control."
          primaryCta={{ label: "Talk to sales", href: LINKS.sales }}
          secondaryCta={{ label: "Explore the platform", href: LINKS.platform }}
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
            items={[
              { title: "Isolved", description: "Expanded its swag program from 15 to 200 products as Sales, Marketing, employees, and customers adopted the platform." },
              { title: "Workato", description: "Scaled gifting for customers and partners across 25+ countries while reducing hours of manual work." },
              { title: "Octus", description: "Expanded from employee swag into customer and VIP gifting, bringing more programs onto one platform." },
            ]}
          />
        </ImpactClosing>
      }
    >
      <VariableCardGrid
        caption="The problem"
        captionColor="#16171b"
        title="Growth makes engagement harder to govern"
        description="As organizations expand, programs spread across teams, tools, vendors, budgets, and regions."
        gridColumns={4}
        imageStyle="panel"
        items={[
          { image: problemTools, imageAlt: "Four teams using four separate tools with no shared view", description: "Teams use separate tools." },
          { image: problemBudgets, imageAlt: "Regional budgets tracked in a spreadsheet, a vendor portal, and an email thread", description: "Budgets live in different places." },
          { image: problemConsistency, imageAlt: "The same onboarding kit with different items and costs in the US and UK offices", description: "Programs become harder to scale consistently." },
          { image: problemOversight, imageAlt: "Company spend with only 2 of 6 teams reporting", description: "Leadership lacks company-wide oversight." },
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
          },
          { name: "Recognition", tab: "Recognition", title: "Lower Voluntary Turnover", description: "Recognition programs that build loyalty and retention." },
          { name: "Milestones", tab: "Milestones", title: "Company Milestones", description: "Anniversaries, launches, and achievements." },
          { name: "Events", tab: "Events", title: "All-Hands & Team Events", description: "Swag, snacks, and event kits for company gatherings." },
          { name: "Customer appreciation", tab: "Customer appreciation", title: "Surprise & Delight Gifting", description: "Unexpected moments that build loyalty." },
          { name: "Sales", tab: "Sales", title: "Deal Acceleration", description: "Sends orchestrated by account plays and pipeline stages." },
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
          { title: "Recognition", description: "Points and rewards for recognition programs." },
          { title: "Swag", description: "Branded merchandise for teams and audiences.", image: offeringSwag, imageAlt: "Branded hoodie, cap, bottle, mug, notebook, and tote" },
          { title: "Gifting", description: "Flexible gifting across employee and business programs.", image: offeringGifting, imageAlt: "A boxed gift set with a bottle, pen, and notebook" },
          { title: "Snacks", description: "Food and treats for teams, customers, and events.", image: offeringSnacks, imageAlt: "An assortment of packaged snacks" },
          { title: "Hosted Experiences", description: "Live-hosted events that bring people together.", image: offeringHosted, imageAlt: "A live-hosted virtual game show on a video call" },
        ]}
      />
    </ImpactPageShell>
  );
}
