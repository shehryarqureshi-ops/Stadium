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
import ImpactPageShell, { TeamDivider } from "@/app/components/impact/ImpactPageShell";
import OfficeNeedsBoard from "@/app/components/impact/OfficeNeedsBoard";
import { LINKS } from "@/app/components/impact/shared";

import OperationsOverview from "@/app/components/cards/impact-office-admins/OperationsOverview";
import OperationsWorkspace from "@/app/components/cards/impact-office-admins/OperationsWorkspace";
import recurringDeliveries from "@/public/impact/office-admins/recurring-scheduled-deliveries.png";
import recurringPrograms from "@/public/impact/office-admins/recurring-employee-programs.png";
import recurringSnacks from "@/public/impact/office-admins/recurring-office-snacks.png";

import problemVendors from "@/public/impact/office-admins/v2/problem-vendors.jpg";
import problemDeliveries from "@/public/impact/office-admins/v2/problem-deliveries.jpg";
import problemInventory from "@/public/impact/office-admins/v2/problem-inventory.jpg";
import problemInvoices from "@/public/impact/office-admins/v2/problem-invoices.jpg";
import journeyNewHires from "@/public/impact/office-admins/v2/journey-new-hires.jpg";
import journeyEmployeeGifts from "@/public/impact/office-admins/v2/journey-employee-gifts.jpg";
import journeyCompanyEvents from "@/public/impact/office-admins/v2/journey-company-events.jpg";
import journeyExecutive from "@/public/impact/office-admins/v2/journey-executive.jpg";
import engageRecognition from "@/public/impact/hr/v2/engage-recognition.jpg";
import engageSwag from "@/public/impact/hr/v2/engage-swag.jpg";
import engageSnacks from "@/public/impact/hr/v2/engage-snacks.jpg";
import engageGifting from "@/public/impact/hr/v2/engage-gifting.jpg";
import engageExperiences from "@/public/impact/hr/v2/engage-experiences.jpg";
import KudosToast from "@/app/components/impact/KudosToast";

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
          background="canvas"
          visual={<OfficeNeedsBoard />}
          visualLayout="aligned"
          visualMaxWidth="36.25rem"
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
            imageFit="cover"
            items={CASE_STUDIES.officeAdmins}
          />
        </ImpactClosing>
      }
    >
      <VariableCardGrid
        caption="The problem"
        captionColor="#16171b"
        title="Too many needs. Too many moving parts."
        description="As workplace needs grow, keeping track of what’s ordered, shipped, stocked, and spent gets harder."
        gridColumns={2}
        narrow
        imageStyle="panel"
        items={[
          { image: problemVendors, imageAlt: "An office admin juggling orders from multiple vendors", description: "Programs rely on multiple vendors." },
          { image: problemDeliveries, imageAlt: "An office admin following up on deliveries across locations", description: "Deliveries require follow-up across locations." },
          { image: problemInventory, imageAlt: "An office admin counting inventory", description: "Inventory is difficult to keep current." },
          { image: problemInvoices, imageAlt: "An office admin handling orders and invoices", description: "Orders and invoices create extra admin work." },
        ]}
        footnote="Your team needs one place to manage programs, orders, and deliveries."
      />

      <TeamDivider />

      <ImageShowcase
        caption="One workplace infrastructure"
        title="Bring everyday operations together"
        description="Manage snacks, swag, gifting, events, and more through one partner, with fewer vendors, orders, and workflows to coordinate."
        graphic={<OperationsWorkspace />}
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
            id: "new-hires",
            name: "New hires",
            tab: "New hires",
            title: "Get new hires ready for day one",
            description: "Give new hires a consistent welcome whether they start in the office or remotely.",
            bullets: ["New hire kits", "Branded swag", "Direct-to-home shipping"],
            image: journeyNewHires,
            imageAlt: "A new hire welcome kit",
          },
          {
            id: "employee-gifts",
            name: "Employee gifts",
            tab: "Employee gifts",
            title: "Take care of employee occasions",
            description: "Handle birthdays, anniversaries, and thank-yous that come up.",
            bullets: ["Birthdays", "Work anniversaries", "Employee thank-yous"],
            image: journeyEmployeeGifts,
            imageAlt: "An employee opening a gift",
          },
          {
            id: "company-events",
            name: "Company events",
            tab: "Company events",
            title: "Get teams ready for company events",
            description: "Coordinate what teams need before, during, and after company events.",
            bullets: ["Event swag", "Snacks and treats", "Individual or bulk sends"],
            image: journeyCompanyEvents,
            imageAlt: "Event supplies prepared for a company event",
          },
          {
            id: "executive-requests",
            name: "Executive requests",
            tab: "Executive requests",
            title: "Handle the last-minute ask",
            description: "Take care of one-off sends without finding another vendor.",
            bullets: ["Executive gifts", "Premium merchandise", "Personalized sends"],
            image: journeyExecutive,
            imageAlt: "A premium gift prepared for an executive",
          },
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
        graphic={<OperationsOverview />}
        imageAlt="Operations overview dashboard with orders, deliveries, low inventory, and spend, upcoming deliveries by location, and items running low"
        framed={false}
        footnote="Manage Orders. Track Deliveries. Monitor Inventory. See Spend."
      />

      <NumberedOfferings
        caption="One platform"
        title="More ways to support your teams"
        description="Choose the right experience for office needs, employee welcomes, company events, and more—all through one partner."
        items={[
          { title: "Snacks", description: "Food and treats for offices, meetings, and events.", image: engageSnacks, imageAlt: "A Snackmagic box filled with snacks" },
          { title: "Swag", description: "Branded merchandise for employees and company programs.", image: engageSwag, imageAlt: "Branded hoodie, cap, and bottle" },
          { title: "Gifting", description: "Flexible gifts for employees and one-off requests.", image: engageGifting, imageAlt: "Unwrapping a gift box with a perfume bottle" },
          { title: "Hosted Experiences", description: "Live-hosted events that bring teams together.", image: engageExperiences, imageAlt: "A person painting during a hosted remote experience" },
          { title: "Recognition", description: "Points and rewards for employee recognition.", image: engageRecognition, imageAlt: "Handing over a wrapped reward package", overlay: <KudosToast /> },
        ]}
      />
    </ImpactPageShell>
    </>
  );
}
