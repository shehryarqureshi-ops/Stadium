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
import Catalog from "./components/Catalog";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main
        id="main"
        tabIndex={-1}
        className="overflow-x-clip"
      >
        <Hero />
        <TrustBand />
        <EveryWay />
        <RedactedPoster />
        <Infrastructure />
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
      <PageClose />
    </>
  );
}
