import type { Metadata } from "next";
import PageClose from "../components/PageClose";
import SiteHeader from "../components/SiteHeader";
import SwagmagicCaseStudy from "../components/SwagmagicCaseStudy";
import SwagmagicCatalog from "../components/SwagmagicCatalog";
import SwagmagicClosing from "../components/SwagmagicClosing";
import SwagmagicCommittee from "../components/SwagmagicCommittee";
import SwagmagicComparison from "../components/SwagmagicComparison";
import SwagmagicExplore from "../components/SwagmagicExplore";
import SwagmagicHero from "../components/SwagmagicHero";
import SwagmagicHowItWorks from "../components/SwagmagicHowItWorks";
import SwagmagicImpact from "../components/SwagmagicImpact";
import SwagmagicOfferings from "../components/SwagmagicOfferings";
import SwagmagicPackages from "../components/SwagmagicPackages";
import SwagmagicPlatform from "../components/SwagmagicPlatform";
import SwagmagicProblem from "../components/SwagmagicProblem";
import SwagmagicSolution from "../components/SwagmagicSolution";

/* /swag — bespoke page rebuilt 2026-08-19 from Figma n9SjmDjzB1PeZAYJ5w43fr
   frame 2500:4706 ("Swag" page). Sections are the Swagmagic* components; the
   older Swag* components stay in the tree because /events and /recognition
   still compose them. */

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
        {/* Hero renders its own shader/bg which extends under Problem */}
        <SwagmagicHero />
        <SwagmagicProblem />
        <SwagmagicSolution />
        <SwagmagicOfferings />
        <SwagmagicCatalog />
        <SwagmagicHowItWorks />
        <SwagmagicPlatform />
        <SwagmagicComparison />
        <SwagmagicCommittee />
        <SwagmagicCaseStudy />
        <SwagmagicImpact />
        <SwagmagicPackages />
        <SwagmagicExplore />
        <SwagmagicClosing />
      </main>
      <PageClose showCta={false} />
    </>
  );
}
