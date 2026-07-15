import Catalog from "./components/Catalog";
import EveryWay from "./components/EveryWay";
import Hero from "./components/Hero";
import Infrastructure from "./components/Infrastructure";
import Occasions from "./components/Occasions";
import PageClose from "./components/PageClose";
import RedactedPoster from "./components/RedactedPoster";
import ScaleMap from "./components/ScaleMap";
import SiteHeader from "./components/SiteHeader";
import StadiumWay from "./components/StadiumWay";
import StickyVideo from "./components/StickyVideo";
import TeamsTabs from "./components/TeamsTabs";
import Testimonials from "./components/Testimonials";
import TrustBand from "./components/TrustBand";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main
        id="main"
        tabIndex={-1}
        className="flex flex-1 flex-col outline-none"
      >
        {/* Each section's key elements reveal individually as they enter the
            viewport via data-animation="reveal" (driven by RevealOnScroll +
            globals.css) — this per-element entrance replaces the old
            section-level <Reveal> wrappers. */}
        <Hero />
        <TrustBand />
        <EveryWay />
        <RedactedPoster />
        <Infrastructure />
        <StadiumWay />
        <Catalog />
        <ScaleMap />
        <TeamsTabs />
        <Occasions />
        <Testimonials />
      </main>
      <StickyVideo />
      <PageClose />
    </>
  );
}
