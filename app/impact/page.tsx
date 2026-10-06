import type { Metadata } from "next";
import JsonLd from "@/app/components/seo/JsonLd";
import { seoMetadata } from "@/app/lib/seo/metadata";

import ImageShowcase from "@/app/components/common/ImageShowcase";
import ImpactClosing from "@/app/components/common/ImpactClosing";
import ImpactProof from "@/app/components/common/ImpactProof";
import PillTabs from "@/app/components/common/PillTabs";
import SplitFeature from "@/app/components/common/SplitFeature";
import TeamHero from "@/app/components/common/TeamHero";
import VariableCardGrid from "@/app/components/common/VariableCardGrid";
import ImpactPageShell from "@/app/components/impact/ImpactPageShell";
import OpenSpatialCanvas from "@/app/components/impact/OpenSpatialCanvas";
import { LINKS, TEAM_ROUTES } from "@/app/components/impact/shared";

import problemTeams from "@/public/impact/overview/problem-teams.png";
import workspace from "@/public/impact/overview/workspace.png";
import budgets from "@/public/impact/overview/budgets.png";
import saveTime from "@/public/impact/overview/scale-save-time.png";
import connect from "@/public/impact/overview/scale-connect.png";
import global from "@/public/impact/overview/scale-global.png";
import vendors from "@/public/impact/overview/scale-vendors.png";
import tabHr from "@/public/impact/overview/tab-hr.jpg";

export const metadata: Metadata = seoMetadata("/impact");

/* /impact — Figma n9SjmDjzB1PeZAYJ5w43fr → 3998:14569. The "Explore by team"
   tabs only have Figma content for HR & People; the other teams use their
   Impact by Team menu headline (ImpactMenu.tsx), a placeholder image, and
   link through to their team page. */

const PROOF_LOGOS = [
  { src: "/impact/overview/logos/google.svg", alt: "Google", width: 74, height: 24 },
  { src: "/impact/overview/logos/amazon.svg", alt: "Amazon", width: 80, height: 24 },
  { src: "/impact/overview/logos/pinterest.svg", alt: "Pinterest", width: 87, height: 22 },
  { src: "/impact/overview/logos/accenture.svg", alt: "Accenture", width: 84, height: 24 },
  { src: "/impact/overview/logos/bloomberg.svg", alt: "Bloomberg", width: 90, height: 16 },
  { src: "/impact/overview/logos/salesforce.svg", alt: "Salesforce", width: 37, height: 26 },
  { src: "/impact/overview/logos/netflix.svg", alt: "Netflix", width: 75, height: 20 },
];

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
          visual={<OpenSpatialCanvas />}
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
            logos={PROOF_LOGOS}
            cards={[
              { title: "Octus", description: "Engaged 1,000 recipients company-wide and achieved an 87% redemption rate." },
              { title: "ConstructConnect", description: "Cut 2–4 hours of logistics work per send while reaching 850+ recipients." },
              { title: "PlanSource", description: "Gifted 350+ recipients across its programs and cut execution time by 50%." },
            ]}
          />
        </ImpactClosing>
      }
    >
      <ImageShowcase
        caption="The problem"
        title="Every team engages people. Most do it separately."
        description="HR runs recognition. Marketing manages swag. Sales sends gifts. Customer teams celebrate milestones. Soon, every team has its own tools, vendors, budgets, and workflows."
        image={problemTeams}
        imageAlt="HR, Marketing, Sales, and Customer teams each running their own vendors, tools, budgets, and invoices — 8 vendors, 4 budgets, 4 invoice streams, no shared view"
        framed={false}
        footnote="More vendors. More admin. Less visibility."
      />

      <SplitFeature
        caption="One company workspace"
        title="One place to run it all"
        description="Give every team the space to run its own programs, while keeping company-wide visibility and control in one place."
        image={workspace}
        imageAlt="Acme Corp company workspace with People, Marketing, Sales, and Customer Success team spaces"
      />

      <SplitFeature
        reverse
        caption="Centralized budgets"
        title="Fund every team from one place"
        description="Allocate budgets to team Wallets, set permissions, and track spend across the organization—all from one place."
        image={budgets}
        imageAlt="Allocating $20,000 from a $250,000 company wallet to the Sales wallet for sales managers"
      />

      <VariableCardGrid
        caption="Built for scale"
        captionColor="#16171b"
        title="More programs. Less operational work."
        description="Automate recurring work, consolidate vendors, connect your systems, and let Stadium handle fulfillment as you scale."
        gridColumns={2}
        narrow
        items={[
          { image: saveTime, imageAlt: "A monthly snack box set to repeat automatically", title: "Save Time", description: "Automate recurring sends and programs." },
          { image: connect, imageAlt: "12 systems synced, including Workday, Salesforce, HubSpot, and Greenhouse", title: "Connect Your Systems", description: "Connect Stadium with your HRIS, CRM, and other business systems." },
          { image: global, imageAlt: "World map with deliveries in 38 countries", title: "Reach People Globally", description: "Fulfill and deliver across 170+ countries." },
          { image: vendors, imageAlt: "Separate swag, 3PL, and courier vendors replaced by one Stadium partner", title: "Consolidate Vendors", description: "Reduce the cost and complexity of separate vendors, shipping, fulfillment, and storage." },
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
            { name: "HR & People", tab: "HR & People", title: "HR & People", description: "Automate recognition, onboarding, milestones, and employee programs across locations.", image: tabHr, imageAlt: "A colleague handing over a black gift box", href: TEAM_ROUTES.hr, cta: "Explore Stadium for HR" },
            { name: "Marketing", tab: "Marketing", title: "Marketing", description: "Events, ABM, and campaign gifting at scale", href: TEAM_ROUTES.marketing, cta: "Explore Stadium for Marketing" },
            { name: "Sales", tab: "Sales", title: "Sales", description: "Pipeline acceleration and account expansion", href: TEAM_ROUTES.sales, cta: "Explore Stadium for Sales" },
            { name: "Customer Experience", tab: "Customer Experience", title: "Customer Experience", description: "Loyalty, retention, and surprise & delight", href: TEAM_ROUTES.cx, cta: "Explore Stadium for CX" },
            { name: "Leadership", tab: "Leadership", title: "Leadership", description: "Reputation, retention, and governance", href: TEAM_ROUTES.leadership, cta: "Explore Stadium for Leadership" },
            { name: "Office & Admin", tab: "Office & Admin", title: "Office & Admin", description: "Logistics, gifting, and inventory at scale", href: TEAM_ROUTES.officeAdmins, cta: "Explore Stadium for Office Admins" },
            { name: "Finance", tab: "Finance", title: "Finance", description: "Vendor consolidation, control, and visibility", href: TEAM_ROUTES.finance, cta: "Explore Stadium for Finance" },
          ]}
        />
      </div>
    </ImpactPageShell>
    </>
  );
}
