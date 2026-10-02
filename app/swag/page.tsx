import type { Metadata } from "next";
import JsonLd from "@/app/components/seo/JsonLd";
import { seoMetadata } from "@/app/lib/seo/metadata";

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
import StadiumWay from "../components/StadiumWay";

export const metadata: Metadata = seoMetadata("/swag");

export default function SwagPage() {
  return (
    <>
      <JsonLd path="/swag" />
      <SiteHeader />
      <main
        id="main"
        tabIndex={-1}
        className="flex flex-1 flex-col outline-none overflow-x-clip"
      >
        <SwagmagicHero />
        <div className="grid gap-16 md:gap-24 lg:gap-40 py-16 md:py-24 lg:py-40">
          <SwagmagicProblem />
          <SwagmagicSolution />
          <SwagmagicOfferings />
          <SwagmagicCatalog />
          <SwagmagicHowItWorks />
          <StadiumWay variant="decoration" />
          <SwagmagicPlatform />
          <SwagmagicComparison />
          <SwagmagicCommittee />
          <SwagmagicCaseStudy />
          <SwagmagicImpact />
          <SwagmagicPackages />
        </div>
        <SwagmagicExplore />
        <SwagmagicClosing />
      </main>
      <PageClose showCta={false} />
    </>
  );
}
