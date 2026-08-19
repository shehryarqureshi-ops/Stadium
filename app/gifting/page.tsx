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

/* /gifting — bespoke page rebuilt 2026-08-19 from Figma
   n9SjmDjzB1PeZAYJ5w43fr frame 2504:12118 (supersedes the 1113:2116 build
   that the older Gift* components implement; those files stay in the tree
   but are no longer used by this route).

   Section order = the Figma frame order:
     hero idea 25 2504:14132 (GiftingHero + GiftingProblem)
     → six ways 2504:12466 (GiftingSolution) → How it works 2504:12514
     → Catalog 2504:15249 → Stores admin 2504:12606 (GiftingIntegrations)
     → Comparison 2504:12781 → closing 2504:12929.

   GiftingHero owns the amber raster and sizes its bg box 710px taller than
   itself so GiftingProblem (transparent, relative z-10) scrolls over it —
   no shared wrapper <section>, no SwagHeroShader.

   GiftingClosing renders the impact stats, the pricing banner AND the dark
   CTA card as three nested sections over one shared raster, so it must stay
   last before PageClose. */

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
        <GiftingProblem />
        <GiftingSolution />
        <GiftingHowItWorks />
        <GiftingCatalog />
        <GiftingIntegrations />
        <GiftingComparison />
        <GiftingClosing />
      </main>
      <PageClose showCta={false} />
    </>
  );
}
