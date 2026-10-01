/* Page frame shared by /impact and every /impact/<team> page: transparent
   SiteHeader over the dark TeamHero, then the content sections on Figma's
   uniform 160 desktop rhythm (64 / 96 / 160), then the closing band
   (case studies or proof + CTA on the closing gradient) and the footer. */

import type { ReactNode } from "react";

import PageClose from "../PageClose";
import SiteHeader from "../SiteHeader";

export default function ImpactPageShell({
  hero,
  children,
  closing,
}: {
  hero: ReactNode;
  children: ReactNode;
  closing: ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex flex-1 flex-col overflow-x-clip bg-white outline-none">
        {hero}
        <div className="grid gap-16 py-16 md:gap-24 md:py-24 lg:gap-40 lg:py-40">{children}</div>
        {closing}
      </main>
      <PageClose showCta={false} />
    </>
  );
}

/* Figma "divider" (e.g. 3998:9339): a hairline across the content box */
export function TeamDivider() {
  return (
    <div aria-hidden className="px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
      <div className="mx-auto h-px w-full max-w-content bg-[#e0e0e0]" />
    </div>
  );
}
