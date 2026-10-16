import type { Metadata } from "next";

import CatalogExplorer from "../components/catalog/CatalogExplorer";
import CatalogHero from "../components/catalog/CatalogHero";
import ClosingCTA from "../components/common/ClosingCTA";
import PageClose from "../components/PageClose";
import SiteHeader from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Catalog — Everything you need to engage anyone, anywhere | Stadium",
  description:
    "Browse Stadium's catalog of swag, gifts, snacks and hosted experiences — top-tier brands and globally sourced goodies, delivered in 170+ countries.",
};

/* /catalog (Figma n9SjmDjzB1PeZAYJ5w43fr → 5291:18726). Black marquee hero →
   four full-height category sections (Swag, Gifts, Snacks, Hosted Experiences),
   each a masonry of product / brand / country cards with a bottom-docked pill.
   See design.md "/catalog". */
export default function CatalogPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex flex-1 flex-col bg-black outline-none">
        <CatalogExplorer hero={<CatalogHero />} />
        <ClosingCTA
          title="Ready to get started?"
          description={
            <>
              One powerful platform for all your engagement needs.
              <br className="hidden md:block" /> Easily send rewards, celebrate milestones, and let
              employees choose what matters most.
            </>
          }
          descriptionClassName="max-w-[44rem] lg:max-w-[48rem]"
          ctaOneLabel="Book a demo"
          ctaOneLink="/book-a-call"
          ctaOneVariant="primary"
          ctaTwoLabel="Browse the catalog"
          ctaTwoLink="#swag"
          ctaTwoVariant="secondary"
          backgroundColor="#000000"
        />
      </main>
      <PageClose showCta={false} />
    </>
  );
}
