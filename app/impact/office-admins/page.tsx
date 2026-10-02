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
import ImpactPageShell, { TeamDivider } from "@/app/components/impact/ImpactPageShell";
import { LINKS } from "@/app/components/impact/shared";

import offeringExperiences from "@/public/impact/office-admins/offering-experiences.jpg";
import offeringGifting from "@/public/impact/office-admins/offering-gifting.jpg";
import offeringSnacks from "@/public/impact/office-admins/offering-snacks.jpg";
import offeringSwag from "@/public/impact/office-admins/offering-swag.jpg";
import operationsOverview from "@/public/impact/office-admins/operations-overview.png";
import operationsWorkspace from "@/public/impact/office-admins/operations-workspace.png";
import problemDeliveries from "@/public/impact/office-admins/problem-deliveries.png";
import problemInventory from "@/public/impact/office-admins/problem-inventory.png";
import problemInvoices from "@/public/impact/office-admins/problem-invoices.png";
import problemVendors from "@/public/impact/office-admins/problem-vendors.png";
import recurringDeliveries from "@/public/impact/office-admins/recurring-scheduled-deliveries.png";
import recurringPrograms from "@/public/impact/office-admins/recurring-employee-programs.png";
import recurringSnacks from "@/public/impact/office-admins/recurring-office-snacks.png";

export const metadata: Metadata = seoMetadata("/impact/office-admins");

/* /impact/office-admins — Figma n9SjmDjzB1PeZAYJ5w43fr → 3998:20924. Tabs
   other than "New hires" have no Figma content: their copy comes from the
   Office Admins use cases in the Impact by Team menu (ImpactMenu.tsx) with
   placeholder imagery. */

export default function OfficeAdminsPage() {
  return (
    <>
      <JsonLd path="/impact/office-admins" />
    <ImpactPageShell
      hero={
        <TeamHero
          eyebrow="Stadium for Office Admins"
          title="Keep workplace operations in one place"
          description="Manage snacks, swag, gifts, events, and employee needs across offices and remote teams–without juggling separate vendors and workflows."
          primaryCta={{ label: "Talk to sales", href: LINKS.sales }}
          secondaryCta={{ label: "Explore the platform", href: LINKS.platform }}
        />
      }
      closing={
        <ImpactClosing
          cta={{
            caption: "Get started",
            title: "Spend less time coordinating the details",
            description: "Bring programs, orders, and deliveries together with one partner.",
            primary: { label: "Talk to sales", href: LINKS.sales },
            secondary: { label: "Explore the platform", href: LINKS.platform },
          }}
        >
          <VariableCardGrid
            background="transparent"
            caption="Customer results"
            captionColor="#16171b"
            title="See how teams simplify the work"
            items={[
              { title: "Apollo", description: "Supported employee programs for 700+ team members across 20+ countries while reducing the time required to manage global gifting." },
              { title: "Kentro", description: "Scaled employee swag and recognition as the company grew from 100 to 800 employees while cutting hours of manual work." },
              { title: "The Standard", description: "Coordinated 300+ orders for 600+ employees while saving more than 37 hours of administrative work." },
            ]}
          />
        </ImpactClosing>
      }
    >
      <VariableCardGrid
        caption="The problem"
        captionColor="#16171b"
        title="Too many needs. Too many moving parts."
        description="As workplace needs grow, keeping track of what’s ordered, shipped, stocked, and spent gets harder."
        gridColumns={4}
        imageStyle="panel"
        items={[
          { image: problemVendors, imageAlt: "This week: snacks, swag, events, and gifts split across four vendors", description: "Programs rely on multiple vendors." },
          { image: problemDeliveries, imageAlt: "Snack deliveries confirmed for Austin HQ but unconfirmed for Berlin and London", description: "Deliveries require follow-up across locations." },
          { image: problemInventory, imageAlt: "An office inventory spreadsheet last edited five weeks ago with uncertain counts", description: "Inventory is difficult to keep current." },
          { image: problemInvoices, imageAlt: "An inbox with nine unread vendor invoices and statements", description: "Orders and invoices create extra admin work." },
        ]}
        footnote="Your team needs one place to manage programs, orders, and deliveries."
      />

      <TeamDivider />

      <ImageShowcase
        caption="One workplace infrastructure"
        title="Bring everyday operations together"
        description="Manage snacks, swag, gifting, events, and more through one partner, with fewer vendors, orders, and workflows to coordinate."
        image={operationsWorkspace}
        imageAlt="Stadium operations workspace with upcoming snacks, swag, gifting, and events orders across Austin HQ, Berlin, and London, and a single monthly invoice"
        framed={false}
      />

      <ChecklistCards
        caption="Wherever people work"
        title="Keep offices and remote employees covered"
        description="Support distributed offices and remote employees without adding more coordination."
        cards={[
          {
            eyebrow: "Office needs",
            title: "Keep each location covered",
            description: "Coordinate orders and deliveries for multiple offices from one place.",
            bullets: ["Centralized ordering", "Location-specific deliveries", "Snacks, swag, and uniforms"],
          },
          {
            eyebrow: "Remote employees",
            title: "Reach employees beyond the office",
            description: "Send gifts, snacks, and branded items directly to employees, wherever they’re working.",
            bullets: ["No need to collect addresses", "Global delivery to 170+ countries", "Snacks and branded swag"],
          },
        ]}
      />

      <PillTabs
        caption="Day-to-day and beyond"
        captionColor="#16171b"
        title="Be ready for what comes next"
        description="Stay organized for Monday’s new hire, next month’s company event, and the requests in between."
        autoAdvance={false}
        items={[
          {
            name: "New hires",
            tab: "New hires",
            title: "Get new hires ready for day one",
            description: "Give new hires a consistent welcome whether they start in the office or remotely.",
            bullets: ["New hire kits", "Branded swag", "Direct-to-home shipping"],
          },
          { name: "Employee gifts", tab: "Employee gifts", title: "Employee Gifts", description: "Gifts for birthdays, milestones, and thank-yous, sent wherever employees work." },
          { name: "Company events", tab: "Company events", title: "Offsite Room Drops", description: "Room drops and kits for offsite events." },
          { name: "Executive requests", tab: "Executive requests", title: "Executive Gifting", description: "High-touch gifting for executives and VIPs." },
        ]}
      />

      <VariableCardGrid
        caption="Set it and keep it moving"
        captionColor="#16171b"
        title="Put recurring workplace needs on autopilot"
        description="Set recurring programs and schedules once instead of manually placing the same orders again and again."
        gridColumns={3}
        imageStyle="panel"
        items={[
          { image: recurringSnacks, imageAlt: "A recurring office snacks order for Austin HQ every Monday with auto-reorder on", title: "Office Snacks", description: "Keep recurring snack programs moving without starting a new order each time." },
          { image: recurringPrograms, imageAlt: "Recurring programs for birthdays, work anniversaries, and new hire kits set to send automatically", title: "Employee Programs", description: "Set up repeatable sends for recurring employee moments." },
          { image: recurringDeliveries, imageAlt: "A weekly delivery schedule across Austin, Berlin, and London", title: "Scheduled Deliveries", description: "Plan what each location needs and when it needs to arrive." },
        ]}
      />

      <ImageShowcase
        caption="Centralized visibility"
        title="Keep operations in view"
        description="See orders, deliveries, inventory, and spend from one place."
        image={operationsOverview}
        imageAlt="Operations overview dashboard with orders, deliveries, low inventory, and spend, upcoming deliveries by location, and items running low"
        framed={false}
        footnote="Manage Orders. Track Deliveries. Monitor Inventory. See Spend."
      />

      <NumberedOfferings
        caption="One platform"
        title="More ways to support your teams"
        description="Choose the right experience for office needs, employee welcomes, company events, and more—all through one partner."
        items={[
          { title: "Snacks", description: "Food and treats for offices, meetings, and events.", image: offeringSnacks, imageAlt: "An assortment of packaged snacks" },
          { title: "Swag", description: "Branded merchandise for employees and company programs.", image: offeringSwag, imageAlt: "Branded hoodie, cap, bottle, mug, notebook, and tote" },
          { title: "Gifting", description: "Flexible gifts for employees and one-off requests.", image: offeringGifting, imageAlt: "A branded gift box with a tumbler, pen, and leather notebook" },
          { title: "Hosted Experiences", description: "Live-hosted events that bring teams together.", image: offeringExperiences, imageAlt: "A live-hosted virtual game with participants on a video call" },
          { title: "Recognition", description: "Points and rewards for employee recognition." },
        ]}
      />
    </ImpactPageShell>
    </>
  );
}
