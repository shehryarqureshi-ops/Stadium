import type { Metadata } from "next";

import ChecklistCards from "@/app/components/common/ChecklistCards";
import FeatureDetails from "@/app/components/common/FeatureDetails";
import ImageShowcase from "@/app/components/common/ImageShowcase";
import ImpactClosing from "@/app/components/common/ImpactClosing";
import LogoBridge from "@/app/components/common/LogoBridge";
import NumberedOfferings from "@/app/components/common/NumberedOfferings";
import StickyStepCards from "@/app/components/common/StickyStepCards";
import TeamHero from "@/app/components/common/TeamHero";
import VariableCardGrid from "@/app/components/common/VariableCardGrid";
import ImpactPageShell, { TeamDivider } from "@/app/components/impact/ImpactPageShell";
import { CASE_STUDY_CAPTION, HR_TOOLS, LINKS } from "@/app/components/impact/shared";

import financeRecords from "@/public/impact/finance/finance-records.png";
import offeringGifting from "@/public/impact/finance/offering-gifting.jpg";
import offeringHosted from "@/public/impact/finance/offering-hosted-experiences.jpg";
import offeringRecognition from "@/public/impact/finance/offering-recognition.jpg";
import offeringSnacks from "@/public/impact/finance/offering-snacks.jpg";
import offeringSwag from "@/public/impact/finance/offering-swag.jpg";
import problemBudgets from "@/public/impact/finance/problem-budgets.png";
import problemInvoices from "@/public/impact/finance/problem-invoices.png";
import problemReconciling from "@/public/impact/finance/problem-reconciling.png";
import problemVendors from "@/public/impact/finance/problem-vendors.png";
import reporting from "@/public/impact/finance/reporting.png";
import simplifiedBilling from "@/public/impact/finance/simplified-billing.png";
import vendorConsolidation from "@/public/impact/finance/vendor-consolidation.png";

export const metadata: Metadata = {
  title: "Stadium for Finance — One place to manage engagement spend",
  description:
    "Consolidate vendors, budgets, and spend while giving teams the freedom to run their own programs.",
};

/* /impact/finance — Figma n9SjmDjzB1PeZAYJ5w43fr → 3998:17233. */

export default function FinancePage() {
  return (
    <ImpactPageShell
      hero={
        <TeamHero
          eyebrow="Stadium for Finance"
          title="One place to manage engagement spend"
          description="Consolidate vendors, budgets, and spend while giving teams the freedom to run their own programs."
          primaryCta={{ label: "Talk to sales", href: LINKS.sales }}
          secondaryCta={{ label: "Explore the platform", href: LINKS.platform }}
        />
      }
      closing={
        <ImpactClosing
          cta={{
            caption: "Get started",
            title: "Take control of engagement spend",
            description: "Fewer vendors. Clearer spend. Simpler billing.",
            primary: { label: "Talk to sales", href: LINKS.sales },
            secondary: { label: "Explore the platform", href: LINKS.platform },
          }}
        >
          <VariableCardGrid
            background="transparent"
            caption={CASE_STUDY_CAPTION}
            captionColor="#16171b"
            title="See the time Stadium gives back"
            items={[
              { title: "ButcherBox", description: "Replaced multiple vendors with one platform, cutting coordination and saving 1–2 hours of manual work every week." },
              { title: "Kentro", description: "Reduced swag setup time by 67% while moving from manual bulk orders to a scalable, on-demand program." },
              { title: "Workato", description: "Centralized global gifting across 25+ countries. Gifting now takes just 20 minutes to manage, saving hours of manual work." },
            ]}
          />
        </ImpactClosing>
      }
    >
      <VariableCardGrid
        caption="The problem"
        captionColor="#16171b"
        title={
          <>
            More teams are spending.
            <br className="hidden md:block" /> You have less visibility.
          </>
        }
        description="Engagement spend gets scattered across vendors, invoices, budgets, and teams–leaving you to piece everything together."
        gridColumns={4}
        imageStyle="panel"
        items={[
          { image: problemVendors, imageAlt: "Active vendors card showing 10 vendors across People, Marketing, and Sales", description: "Vendors multiply across teams." },
          { image: problemBudgets, imageAlt: "Engagement budgets split across a spreadsheet, a card statement, and vendor portal credit, with the company total not tracked", description: "Budgets live in different places." },
          { image: problemInvoices, imageAlt: "A stack of invoices from separate vendors with one overdue", description: "Invoices pile up across programs." },
          { image: problemReconciling, imageAlt: "Reconciliation list with 6 unmatched invoices and budgets", description: "You’re left reconciling the pieces." },
        ]}
        footnote="Your teams need flexibility. You need control. You shouldn’t have to choose."
      />

      <TeamDivider />

      <ChecklistCards
        caption="Budget control"
        title="Give teams funds. Keep Finance in control."
        description="Set budgets and guardrails upfront, then give teams the freedom to spend within them."
        cards={[
          {
            title: "Set budgets before teams spend",
            description: "Allocate funds by team Wallets so everyone knows what they have available.",
            bullets: ["Team-level budgets", "Low funds alerts", "Centralized funding"],
          },
          {
            title: "See spend as it happens",
            description: "Keep track of balances and transactions as teams use their funds.",
            bullets: ["Real-time balances", "Transaction visibility", "Company-wide oversight"],
          },
        ]}
      />

      <StickyStepCards
        caption="Less to manage"
        captionColor="#16171b"
        title="Consolidate the work behind engagement spend"
        description="Bring vendors, billing, and financial records together so there’s less for Finance to manage across teams and programs."
        steps={[
          {
            image: vendorConsolidation,
            imageAlt: "Four separate vendor contracts replaced by one Stadium master services agreement",
            eyebrow: "Vendor consolidation",
            title: "Turn multiple vendors into one",
            content: (
              <FeatureDetails
                description="Manage recognition, swag, snacks, gifting, and hosted experiences through one vendor relationship."
                bullets={["One vendor across programs", "Fewer contracts to manage", "One place for engagement spend"]}
              />
            ),
          },
          {
            image: financeRecords,
            imageAlt: "Transaction list with an order record showing cost center, GL code, invoice, and attached receipt",
            eyebrow: "Finance records",
            title: "Keep the details within reach",
            content: (
              <FeatureDetails
                description="Access transactions, invoices, and spend records when it’s time to reconcile, report, or audit."
                bullets={["Transaction-level detail", "Downloadable invoices", "Exportable records"]}
              />
            ),
          },
          {
            image: simplifiedBilling,
            imageAlt: "Zero invoices to chase: one monthly invoice paid automatically",
            eyebrow: "Simplified billing",
            title: "Spend less time chasing invoices",
            content: (
              <FeatureDetails
                description="Keep billing across engagement programs together instead of managing invoices across separate vendors."
                bullets={["Centralized invoices", "Fewer vendor payments", "Easier reconciliation"]}
              />
            ),
          },
        ]}
      />

      <LogoBridge
        caption="Cost savings"
        title="Save $15K a year, on average"
        description="Stadium customers save an average of $15,000 annually by consolidating engagement programs.*"
        logos={HR_TOOLS}
      />

      <ImageShowcase
        caption="Finance-ready reporting"
        title="The records you need, when you need them"
        description="Keep transactions, invoices, and spend records accessible for reconciliation, reporting, and audits."
        image={reporting}
        imageAlt="Stadium Reporting view listing transactions across teams, with an invoice detail panel and a spend-records export confirmation"
        framed={false}
        footnote="View transactions across teams. Access invoices in one place. Export records for reporting. Track spend across programs."
      />

      <NumberedOfferings
        caption="Across the business"
        title="One platform behind every team’s programs"
        description="Support the ways teams engage employees, customers, and partners without adding more vendors for Finance to manage."
        items={[
          { title: "Recognition", description: "Kudos, employee recognition, and rewards.", image: offeringRecognition, imageAlt: "Hands holding a Stadium gift box covered in stickers" },
          { title: "Swag", description: "Branded merchandise and company stores.", image: offeringSwag, imageAlt: "Branded hoodie, cap, bottle, mug, notebook, and tote" },
          { title: "Snacks", description: "Personalized snack boxes for teams and recipients.", image: offeringSnacks, imageAlt: "An assortment of packaged snacks" },
          { title: "Gifting", description: "Employee, customer, and partner gifting.", image: offeringGifting, imageAlt: "A boxed gift set with a bottle, pen, and notebook" },
          { title: "Hosted Experiences", description: "Live-hosted experiences for teams and events.", image: offeringHosted, imageAlt: "A live-hosted virtual game show on a video call" },
        ]}
      />
    </ImpactPageShell>
  );
}
