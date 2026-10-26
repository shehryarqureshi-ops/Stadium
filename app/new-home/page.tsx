import type { Metadata } from "next";
import { seoMetadata } from "@/app/lib/seo/metadata";
import EveryWay from "../components/EveryWay";
import Hero from "../components/Hero";
import InfraPyramid from "../components/pyramid/InfraPyramid";
import Occasions from "../components/Occasions";
import PageClose from "../components/PageClose";
import RedactedPoster from "../components/RedactedPoster";
import ScaleMap from "../components/ScaleMap";
import SiteHeader from "../components/SiteHeader";
import StadiumWay from "../components/StadiumWay";
import StickyVideo from "../components/StickyVideo";
import TeamsTabs from "../components/TeamsTabs";
import Testimonials from "../components/Testimonials";
import TrustBand from "../components/TrustBand";
import Catalog from "../components/Catalog";
import ClosingCTA from "../components/common/ClosingCTA";

/* /new-home — a working copy of the home page where "The Stadium Infrastructure"
   is replaced by the scroll-driven 3D pyramid. Not indexed; canonical points at
   the live home page so it never competes with it. */
export const metadata: Metadata = {
  ...seoMetadata("/"),
  robots: { index: false, follow: false },
};

export default function NewHome() {
  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="overflow-x-clip">
        <Hero />
        <TrustBand />
        <EveryWay />
        <RedactedPoster />
        <InfraPyramid />
        <div className="grid gap-16 md:gap-24 lg:gap-40 py-16 md:py-24 lg:py-40">
          <StadiumWay />
          <Catalog />
          <ScaleMap />
          <TeamsTabs />
          <Occasions />
        </div>
        <Testimonials />
      </main>
      <StickyVideo />
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
