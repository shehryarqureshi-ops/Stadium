import type { Metadata } from "next";
import JsonLd from "@/app/components/seo/JsonLd";
import { seoMetadata } from "@/app/lib/seo/metadata";

import ImageShowcase from "@/app/components/common/ImageShowcase";
import { CASE_STUDIES } from "@/app/components/impact/caseStudies";
import ImpactClosing from "@/app/components/common/ImpactClosing";
import ImpactProof from "@/app/components/common/ImpactProof";
import PillTabs from "@/app/components/common/PillTabs";
import SplitFeature from "@/app/components/common/SplitFeature";
import TeamHero from "@/app/components/common/TeamHero";
import VariableCardGrid from "@/app/components/common/VariableCardGrid";
import ImpactPageShell from "@/app/components/impact/ImpactPageShell";
import ArcadeFlow from "@/app/components/impact/ArcadeFlow";
import { LINKS, TEAM_ROUTES } from "@/app/components/impact/shared";

import problemTeams from "@/public/impact/overview/problem-teams.webp";
import tabMarketing from "@/public/impact/overview/tab-marketing.webp";
import tabSales from "@/public/impact/overview/tab-sales.webp";
import tabCx from "@/public/impact/overview/tab-cx.webp";
import tabLeadership from "@/public/impact/overview/tab-leadership.webp";
import tabOffice from "@/public/impact/overview/tab-office-admin.webp";
import tabFinance from "@/public/impact/overview/tab-finance.webp";
import Workspace from "@/app/components/cards/impact-overview/Workspace";
import Budgets from "@/app/components/cards/impact-overview/Budgets";
import TabHr from "@/app/components/cards/impact-overview/TabHr";
import VectorCard from "@/app/components/cards/VectorCard";
import ScaleGlobal from "@/app/components/cards/impact-overview/ScaleGlobal";

export const metadata: Metadata = seoMetadata("/impact");

/* /impact — Figma n9SjmDjzB1PeZAYJ5w43fr → 3998:14569. The "Explore by team"
   tabs only have Figma content for HR & People; the other teams use their
   Impact by Team menu headline (ImpactMenu.tsx), a placeholder image, and
   link through to their team page. */

export default function ImpactPage() {
  return (
    <>
      <JsonLd path="/impact" />
      <ImpactPageShell
        hero={
          <TeamHero
            eyebrow="Impact by Team"
            title="One infrastructure. Every team's program."
            description="Run recognition, gifting, swag, snacks, and experiences across your organization with centralized budgets, global fulfillment, and visibility in one place."
            primaryCta={{ label: "Talk to sales", href: LINKS.sales }}
            secondaryCta={{ label: "Explore by team", href: "#explore-by-team" }}
            background="canvas"
            visualLayout="aligned"
            visualMaxWidth="38.3125rem"
            visual={<ArcadeFlow />}
          />
        }
        closing={
          <ImpactClosing
            cta={{
              caption: "Get started",
              title: "Bring your teams and programs together",
              description:
                "Give every team the flexibility to run what they need, with centralized control over budgets, programs, and fulfillment.",
              primary: { label: "Talk to sales", href: LINKS.sales },
              secondary: { label: "Find your team", href: "#explore-by-team" },
            }}
          >
            <ImpactProof
              caption="The proof"
              title="What teams are accomplishing with Stadium"
              rating={{ score: "4.8", label: "on G2 from 1,515 reviews" }}
              cards={CASE_STUDIES.hub}
            />
          </ImpactClosing>
        }
      >
        <ImageShowcase
          caption="The problem"
          title="Every team engages people. Most do it separately."
          description="HR runs recognition. Marketing manages swag. Sales sends gifts. Customer teams celebrate milestones. Soon, every team has its own tools, vendors, budgets, and workflows."
          image={problemTeams}
          imageAlt="A man crouched in a storage room with a phone to his ear, checking a parcel and its delivery slip among stacked boxes"
          framed
          footnote="More vendors. More admin. Less visibility."
        />

        <SplitFeature
          caption="One company workspace"
          title="One place to run it all"
          description="Give every team the space to run its own programs, while keeping company-wide visibility and control in one place."
          graphic={<Workspace />}
        />

        <SplitFeature
          reverse
          caption="Centralized budgets"
          title="Fund every team from one place"
          description="Allocate budgets to team Wallets, set permissions, and track spend across the organization—all from one place."
          graphic={<Budgets />}
        />

        <VariableCardGrid
          caption="Built for scale"
          captionColor="#16171b"
          title="More programs. Less operational work."
          description="Automate recurring work, consolidate vendors, connect your systems, and let Stadium handle fulfillment as you scale."
          gridColumns={2}
          narrow
          items={[
            { graphic: <VectorCard src="/cards/impact-overview/ScaleSaveTime.svg" alt="A monthly snack box set to repeat automatically" width={400} height={250} />, title: "Save Time", description: "Automate recurring sends and programs." },
            { graphic: <VectorCard src="/cards/impact-overview/ScaleConnect.svg" alt="12 systems synced, including Workday, Salesforce, HubSpot, BambooHR, Rippling, and Greenhouse" width={400} height={250} />, title: "Connect Your Systems", description: "Connect Stadium with your HRIS, CRM, and other business systems." },
            { graphic: <ScaleGlobal />, title: "Reach People Globally", description: "Fulfill and deliver across 170+ countries." },
            { graphic: <VectorCard src="/cards/impact-overview/ScaleVendors.svg" alt="Separate swag, 3PL, and courier vendors replaced by one Stadium partner" width={400} height={250} />, title: "Consolidate Vendors", description: "Reduce the cost and complexity of separate vendors, shipping, fulfillment, and storage." },
          ]}
          footnote="Less admin. Lower costs. Fewer things to worry about."
        />

        <div id="explore-by-team" className="scroll-mt-16">
          <PillTabs
            caption="Explore by team"
            captionColor="#16171b"
            title="See what Stadium can do for your team"
            description="Each team can run the programs they own while staying connected to the same company infrastructure."
            autoAdvance={false}
            items={[
              { name: "HR & People", tab: "HR & People", title: "HR & People", description: "Automate recognition, onboarding, milestones, and employee programs across locations.", graphic: <TabHr />, href: TEAM_ROUTES.hr, cta: "Explore Stadium for HR" },
              { name: "Marketing", tab: "Marketing", title: "Marketing", description: "Events, ABM, and campaign gifting at scale", image: tabMarketing, imageAlt: "A shopper carrying an ARCADE gift bag past a branded booth in a busy event hall", href: TEAM_ROUTES.marketing, cta: "Explore Stadium for Marketing" },
              { name: "Sales", tab: "Sales", title: "Sales", description: "Pipeline acceleration and account expansion", image: tabSales, imageAlt: "A man watching a video call on his monitor while the prospect shows an open DevNest gift box", href: TEAM_ROUTES.sales, cta: "Explore Stadium for Sales" },
              { name: "Customer Experience", tab: "Customer Experience", title: "Customer Experience", description: "Loyalty, retention, and surprise & delight", image: tabCx, imageAlt: "A customer smiling on her sofa as she unboxes a Tap + Cork tumbler gift", href: TEAM_ROUTES.cx, cta: "Explore Stadium for CX" },
              { name: "Leadership", tab: "Leadership", title: "Leadership", description: "Reputation, retention, and governance", image: tabLeadership, imageAlt: "A leader leaning over a desk to talk with a colleague, an orange gift box beside the keyboard", href: TEAM_ROUTES.leadership, cta: "Explore Stadium for Leadership" },
              { name: "Office & Admin", tab: "Office & Admin", title: "Office & Admin", description: "Logistics, gifting, and inventory at scale", image: tabOffice, imageAlt: "An office admin with a clipboard wheeling boxes through a storage room", href: TEAM_ROUTES.officeAdmins, cta: "Explore Stadium for Office Admins" },
              { name: "Finance", tab: "Finance", title: "Finance", description: "Vendor consolidation, control, and visibility", image: tabFinance, imageAlt: "A finance lead reviewing a document with a pen at his desk, a parcel beside him", href: TEAM_ROUTES.finance, cta: "Explore Stadium for Finance" },
            ]}
          />
        </div>
      </ImpactPageShell>
    </>
  );
}
