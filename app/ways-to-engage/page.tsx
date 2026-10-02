import type { Metadata } from "next";
import JsonLd from "@/app/components/seo/JsonLd";
import { seoMetadata } from "@/app/lib/seo/metadata";

import PageClose from "../components/PageClose";
import SiteHeader from "../components/SiteHeader";
import WteHero from "../components/WteHero";
import WteProblem from "../components/WteProblem";
import WteSolution from "../components/WteSolution";
import WteOccasions from "../components/WteOccasions";
import WtePrograms from "../components/WtePrograms";
import WteProof from "../components/WteProof";

export const metadata: Metadata = seoMetadata("/ways-to-engage");

export default function WaysToEngagePage() {
  return (
    <>
      <JsonLd path="/ways-to-engage" />
      <SiteHeader lightHero />

      <main id="main" tabIndex={-1} className="flex flex-1 flex-col outline-none overflow-x-clip">
        <WteHero />
        <WteProblem />

        {/* divider — Figma 1113:1630: one continuous brand-spectrum line (no gaps) */}
        <div className="bg-white px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
          <div className="mx-auto h-1 w-full max-w-content bg-[linear-gradient(90deg,#8d12e7_0%,#8d12e7_20%,#0b7afc_20%,#0b7afc_40%,#ffb800_40%,#ffb800_60%,#ff5b77_60%,#ff5b77_80%,#00c036_80%,#00c036_100%)]" />
        </div>

        <WteSolution />
        <WteOccasions />
        <WtePrograms />
        <WteProof />
      </main>

      <PageClose
        cta={{
          eyebrow: "Get started",
          heading: "One platform. Every employee program.",
          body: "Recognition, swag, gifting, snacks, and hosted experiences — all in one place.",
          primaryCta: "Talk to sales",
          secondaryCta: "Browse the catalog",
        }}
      />
    </>
  );
}
