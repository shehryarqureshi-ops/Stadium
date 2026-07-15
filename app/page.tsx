import Catalog from "./components/Catalog";
import EveryWay from "./components/EveryWay";
import Hero from "./components/Hero";
import Infrastructure from "./components/Infrastructure";
import Occasions from "./components/Occasions";
import PageClose from "./components/PageClose";
import RedactedPoster from "./components/RedactedPoster";
import Reveal from "./components/Reveal";
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
        {/* Globe + Infrastructure + Stadium Way are ONE continuous dark block —
            a single Reveal so they settle together, with no white gap or
            re-reveal between the dark sections (globe → doorstep → phases). */}
        <Reveal>
          <RedactedPoster />
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
