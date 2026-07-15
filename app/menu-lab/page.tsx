import type { ReactNode } from "react";
import ProofMenu from "@/app/components/ProofMenu";
import CatalogMenu from "@/app/components/CatalogMenu";
import EngageMenu from "@/app/components/EngageMenu";
import ImpactMenu from "@/app/components/ImpactMenu";

/* TEMPORARY preview route (/menu-lab) — renders the four synced live menus for
   layout/spacing verification. Not linked from the site nav. Created 2026-06-19,
   repurposed 2026-06-20 for the Figma 1350:36111 -> live sync. */

function Frame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="mb-14">
      <p className="mb-3 flex items-center gap-2 px-section-x-lg font-sans text-[0.75rem] font-semibold uppercase tracking-[0.06rem] text-grey-500">
        <span className="inline-block size-2 rounded-full bg-accent-water" />
        {label}
      </p>
      <div className="border-y border-grey-300 bg-white">{children}</div>
    </section>
  );
}

export default function MenuLab() {
  return (
    <main className="mx-auto w-[1440px] bg-white py-12">
      {/* hover-reveal arrows + sibling-dim choreography (the shared classes live
          in SiteHeader; replicated here so the standalone lab matches the nav) */}
      <style>{`
        .engage-arrow{opacity:0;transition:opacity .2s}
        .engage-row:hover .engage-arrow{opacity:1}
        .engage-group:hover .engage-row:not(:hover){opacity:.5;transition:opacity .3s}
      `}</style>
      <Frame label="The Proof"><ProofMenu /></Frame>
      <Frame label="Catalog"><CatalogMenu /></Frame>
      <Frame label="Ways to Engage"><EngageMenu /></Frame>
      <Frame label="Impact by Team"><ImpactMenu /></Frame>
    </main>
  );
}
