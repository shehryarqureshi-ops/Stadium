import type { Metadata } from "next";
import JsonLd from "@/app/components/seo/JsonLd";
import { seoMetadata } from "@/app/lib/seo/metadata";

import PageClose from "../components/PageClose";
import RecogClosing from "../components/RecogClosing";
import RecogCommittee from "../components/RecogCommittee";
import RecogComparison from "../components/RecogComparison";
import RecogExplore from "../components/RecogExplore";
import RecogHero from "../components/RecogHero";
import RecogImpact from "../components/RecogImpact";
import RecogOfferings from "../components/RecogOfferings";
import RecogPlatform from "../components/RecogPlatform";
import RecogProblem from "../components/RecogProblem";
import RecogSolution from "../components/RecogSolution";
import SiteHeader from "../components/SiteHeader";

export const metadata: Metadata = seoMetadata("/recognition");

export default function RecognitionPage() {
  return (
    <>
      <JsonLd path="/recognition" />
      <SiteHeader />
      <main
        id="main"
        tabIndex={-1}
        className="flex flex-1 flex-col outline-none overflow-x-clip"
      >
        <RecogHero />
        <div className="grid gap-16 md:gap-24 lg:gap-40 py-16 md:py-24 lg:py-40">
          <RecogProblem />
          <div id="how-it-works" className="scroll-mt-24">
            <RecogSolution />
          </div>
          <RecogOfferings />
          <RecogPlatform />
          <RecogImpact />
          <RecogComparison />
          <RecogCommittee />
          {/* <RecogCaseStudies /> */}
          {/* <RecogPackages /> */}
        </div>
        <RecogExplore />
        <RecogClosing />
      </main>
      <PageClose />
    </>
  );
}
