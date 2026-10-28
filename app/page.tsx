import type { Metadata } from "next";
import JsonLd from "@/app/components/seo/JsonLd";
import { seoMetadata } from "@/app/lib/seo/metadata";
import EveryWay from "./components/EveryWay";
import FourJobs from "./components/FourJobs";
import Hero from "./components/Hero";
import { HERO_SLIDES_NEW_HOME } from "./data/heroRotation";
import InfraPyramid from "./components/pyramid/InfraPyramid";
import UseCases from "./components/UseCases";
import PageClose from "./components/PageClose";
import SystemRail from "./components/SystemRail";
import SiteHeader from "./components/SiteHeader";
// import StickyVideo from "./components/StickyVideo"; // floating "Watch the film" player — hidden for now
import TeamsTabs from "./components/TeamsTabs";
import Testimonials from "./components/Testimonials";
import TrustBand from "./components/TrustBand";
import CatalogTeaser from "./components/CatalogTeaser";
import ClosingCTA from "./components/common/ClosingCTA";

/* Home — "The Stadium Infrastructure" is the scroll-driven 3D pyramid (Figma
   6525:12159), the globe section ("We simplify global shipping") is hidden, and
   "The Stadium way" / "Scale to wherever your people are" are not rendered
   (components untouched). The catalog teaser is the colour-wall version
   (Figma 6525:12451) and the use cases are the chip lanes (6525:12557). The
   previous home page lives at /old-home. */
export const metadata: Metadata = seoMetadata("/");

export default function Home() {
  return (
    <>
      <JsonLd path="/" />
      <SiteHeader solidOnMobile />
      <main id="main" tabIndex={-1} className="overflow-x-clip">
        <Hero slides={HERO_SLIDES_NEW_HOME} />
        <TrustBand />
        <EveryWay updated />
        {/* lg: EveryWay already ends with 168px of its own padding, so the wrapper pulls up 8px to
            leave exactly 160px between its last label and "Why teams choose Stadium". */}
        <div className="grid gap-16 py-16 md:gap-24 md:py-24 lg:-mt-2 lg:gap-40 lg:pb-40 lg:pt-0">
          <FourJobs />
          <SystemRail />
        </div>
        <InfraPyramid />
        <div className="grid gap-16 md:gap-24 lg:gap-40 py-16 md:py-24 lg:py-40">
          <CatalogTeaser />
          <TeamsTabs updatedImages />
          <UseCases />
        </div>
        <Testimonials />
      </main>
      {/* <StickyVideo /> — hidden for now; restore this line and the import above to enable */}
      <ClosingCTA
        caption="Get started"
        title="Ready to build your program?"
        description="Get a 30-minute walkthrough. We’ll show you live campaigns, sample boxes, and how teams use Stadium at scale."
        ctaOneLabel="Book a demo"
        ctaOneLink="/book-a-call"
        ctaOneVariant="primary"
        ctaTwoLabel="Talk to sales"
        ctaTwoLink="/book-a-call"
        ctaTwoVariant="secondary"
        backgroundColor="#181818"
      />
      <PageClose />
    </>
  );
}
