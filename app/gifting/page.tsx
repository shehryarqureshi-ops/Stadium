import type { Metadata } from "next";
import GiftingCatalog from "../components/GiftingCatalog";
import GiftingClosing from "../components/GiftingClosing";
import GiftingComparison from "../components/GiftingComparison";
import GiftingHero from "../components/GiftingHero";
import GiftingHowItWorks from "../components/GiftingHowItWorks";
import GiftingIntegrations from "../components/GiftingIntegrations";
import GiftingProblem from "../components/GiftingProblem";
import GiftingSolution from "../components/GiftingSolution";
import PageClose from "../components/PageClose";
import SiteHeader from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Gifting — Corporate gifting without the busywork | Stadium",
  description:
    "Client, employee, partner, and holiday gifts from one platform. Recipients choose their gift and enter their address — you set the budget, and Stadium delivers to 170+ countries.",
};

export default function GiftingPage() {
  return (
    <>
      <SiteHeader />
      <main
        id="main"
        tabIndex={-1}
        className="flex flex-1 flex-col outline-none overflow-x-clip"
      >
        <GiftingHero />
        <div className="grid gap-16 md:gap-24 lg:gap-40 py-16 md:py-24 lg:py-40">
          <GiftingProblem />
          <GiftingSolution />
          <GiftingHowItWorks />
          <GiftingCatalog />
          <GiftingIntegrations />
          <GiftingComparison />
        </div>
        <GiftingClosing />
      </main>
      <PageClose showCta={false} />
    </>
  );
}
