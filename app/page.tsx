import SiteHeader from "./components/SiteHeader";
import Hero from "./components/Hero";
import TrustBand from "./components/TrustBand";
import EveryWay from "./components/EveryWay";
import RedactedPoster from "./components/RedactedPoster";
import Infrastructure from "./components/Infrastructure";
import StadiumWay from "./components/StadiumWay";
import Catalog from "./components/Catalog";
import ScaleMap from "./components/ScaleMap";
import TeamsTabs from "./components/TeamsTabs";
import Occasions from "./components/Occasions";
import Testimonials from "./components/Testimonials";
import PageClose from "./components/PageClose";
import Reveal from "./components/Reveal";
import StickyVideo from "./components/StickyVideo";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex flex-1 flex-col outline-none">
        {/* Hero stays un-revealed (above the fold). Each section below fades +
            rises as it scrolls into view. Catalog is excluded — its pinned,
            scroll-driven carousel reads getBoundingClientRect, which a reveal
            transform would offset. */}
        <Hero />
        <Reveal>
          <TrustBand />
        </Reveal>
        <Reveal>
          <EveryWay />
        </Reveal>
        <Reveal>
          <RedactedPoster />
        </Reveal>
        {/* Infrastructure + Stadium Way are one continuous dark block (#181818) —
            a single Reveal so it settles once, with no re-reveal between the two. */}
        <Reveal>
          <Infrastructure />
          <StadiumWay />
        </Reveal>
        <Catalog />
        <Reveal>
          <ScaleMap />
        </Reveal>
        <Reveal>
          <TeamsTabs />
        </Reveal>
        <Reveal>
          <Occasions />
        </Reveal>
        <Reveal>
          <Testimonials />
        </Reveal>
      </main>
      <StickyVideo />
      <PageClose />
    </>
  );
}
