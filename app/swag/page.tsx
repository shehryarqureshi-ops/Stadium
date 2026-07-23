import type { Metadata } from "next";
import PageClose from "../components/PageClose";
import SiteHeader from "../components/SiteHeader";
import SwagAdminView from "../components/SwagAdminView";
import SwagCommittee from "../components/SwagCommittee";
import SwagCatalog from "../components/SwagCatalog";
import SwagDivider from "../components/SwagDivider";
import SwagFulfillment from "../components/SwagFulfillment";
import SwagHowItWorks from "../components/SwagHowItWorks";
import SwagHero from "../components/SwagHero";
import SwagOfferings from "../components/SwagOfferings";
import SwagPlatform from "../components/SwagPlatform";
import SwagPricing from "../components/SwagPricing";
import SwagProblem from "../components/SwagProblem";
import SwagWorkflow from "../components/SwagWorkflow";

export const metadata: Metadata = {
  title: "Swag — The infrastructure behind every swag program | Stadium",
  description:
    "Stop coordinating vendors separately. Run your entire swag program on one platform, one PO — branded stores, inventory, and global fulfillment to 170+ countries.",
};

export default function SwagPage() {
  return (
    <>
      <SiteHeader />
      <main
        id="main"
        tabIndex={-1}
        className="flex flex-1 flex-col outline-none overflow-x-clip"
      >
        <SwagHero />
        <SwagProblem />
        <SwagDivider />
        <SwagOfferings />
        <SwagWorkflow />
        <SwagCatalog />
        <SwagFulfillment />
        <SwagHowItWorks />
        <SwagPlatform />
        <SwagAdminView />
        <SwagCommittee />
        <SwagPricing />
      </main>
      <PageClose />
    </>
  );
}
