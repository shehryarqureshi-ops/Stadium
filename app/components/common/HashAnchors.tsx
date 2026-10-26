"use client";

import { useRef } from "react";
import { useHashTabs } from "@/hooks/useHashTabs";

/* Hash anchors for sections without tabs (e.g. /snacks cards): one invisible
   marker per id, parked at the section top (render inside a `relative`
   section). Landing on `#<id>` scrolls like the PillTabs deep links — offset
   below the sticky nav, with the same late re-scroll for layout shift. */
export default function HashAnchors({ ids }: { ids: string[] }) {
  const ref = useRef<HTMLSpanElement>(null);
  useHashTabs({ ids, select: () => {}, sectionRef: ref });
  return (
    <span
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-0 scroll-mt-[11.5rem]"
    >
      {ids.map((id) => (
        <span key={id} id={id} />
      ))}
    </span>
  );
}
