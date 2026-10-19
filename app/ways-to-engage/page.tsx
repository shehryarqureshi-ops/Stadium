import type { Metadata } from "next";
import JsonLd from "@/app/components/seo/JsonLd";
import { seoMetadata } from "@/app/lib/seo/metadata";

import PageClose from "../components/PageClose";
import SiteHeader from "../components/SiteHeader";
import WteHero from "../components/WteHero";
import WteProblem from "../components/WteProblem";
import WteSolution from "../components/WteSolution";
import WteOccasions from "../components/WteOccasions";
import TrustBand from "../components/TrustBand";
import ClosingCTA from "../components/common/ClosingCTA";
import WteProof from "../components/WteProof";

export const metadata: Metadata = seoMetadata("/ways-to-engage");

export default function WaysToEngagePage() {
  return (
    <>
      <JsonLd path="/ways-to-engage" />
      <SiteHeader lightHero />

      <main id="main" tabIndex={-1} className="flex flex-1 flex-col outline-none overflow-x-clip">
        <WteHero />
        <TrustBand />
        <WteProblem />

        <WteSolution />
        <WteOccasions />
        <WteProof />
      </main>

      <ClosingCTA
        caption="Get started"
        title="Every program, one platform"
        description="Recognition, swag, snacks, gifting, and hosted experiences."
        ctaOneLabel="Talk to sales"
        ctaOneLink="/book-a-call"
        ctaOneVariant="primary"
        ctaTwoLabel="Browse catalog"
        ctaTwoLink="/catalog"
        ctaTwoVariant="secondary"
        backgroundColor="#181818"
      />
      <PageClose />
    </>
  );
}
