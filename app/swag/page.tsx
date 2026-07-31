import type { Metadata } from "next";
import PageClose from "../components/PageClose";
import SiteHeader from "../components/SiteHeader";
import SwagAdminView from "../components/SwagAdminView";
import SwagCaseStudies from "../components/SwagCaseStudies";
import SwagCatalog from "../components/SwagCatalog";
import SwagClosing from "../components/SwagClosing";
import SwagCommittee from "../components/SwagCommittee";
import SwagComparison from "../components/SwagComparison";
import SwagDivider from "../components/SwagDivider";
import SwagFulfillment from "../components/SwagFulfillment";
import SwagHero from "../components/SwagHero";
import SwagHeroShader from "../components/SwagHeroShader";
import SwagHowItWorks from "../components/SwagHowItWorks";
import SwagImpact from "../components/SwagImpact";
import SwagOfferings from "../components/SwagOfferings";
import SwagPaperchase from "../components/SwagPaperchase";
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
        <section className="relative">
          <div className="absolute w-full h-[72%] bg-black top-0 left-0 mask-b-from-75%">
            <SwagHeroShader />
          </div>
          <SwagHero />
          <SwagProblem />
        </section>
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
        <SwagComparison />
        <SwagCaseStudies />
        <SwagPaperchase />
        <SwagImpact />
        <SwagClosing />
      </main>
      <PageClose showCta={false} />
    </>
  );
}
