/* The home page's boxed proof container, for sections that sit on the
   /impact-style closing gradient (/the-proof, /impact): a white rounded box
   40px in from each side (16px on mobile) with a 64px gap beneath it, before
   the closing CTA. Children render in a vertical stack inside the box and are
   expected to be `flush` (no gutters of their own). Mirrors GradientBand,
   which does the same on a page-wide gradient. */

import type { ReactNode } from "react";

export default function WhiteBox({
  children,
  flushTop = false,
}: {
  children: ReactNode;
  /* drop the box's top padding */
  flushTop?: boolean;
}) {
  return (
    <section className="px-4 pb-16 md:px-10">
      <div className={`grid grid-cols-[minmax(0,1fr)] gap-24 rounded-4xl bg-white px-section-x-sm pb-16 md:gap-32 md:px-section-x-md md:pb-24 lg:gap-[12.5rem] lg:px-[3.75rem] lg:pb-[11.25rem] ${
          flushTop ? "pt-0" : "pt-16 md:pt-24 lg:pt-[7.5rem]"
        }`}>
        {children}
      </div>
    </section>
  );
}
