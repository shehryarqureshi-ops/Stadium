"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/* Pauses every infinite CSS animation (logo / occasion / testimonial marquees,
   the catalog and gift photo tracks…) while its element is off-screen.

   An infinite transform animation keeps the compositor producing a frame on
   every vsync for as long as the page is open — even scrolled far away, and
   even though nothing visible changes. With five of them on the home page
   (one of them a 3,500px-tall column of cards, others 6,500px-wide tracks)
   that kept an iPhone's GPU busy at all times. This gate flips
   `data-offscreen` on the animated element; the rule in globals.css turns that
   into `animation-play-state: paused !important`, which also wins over the
   inline pause the trust strip's own pause button sets.

   Generic on purpose: it discovers the elements from document.getAnimations(),
   so new marquees need no wiring. Renders nothing. */

export default function MarqueeGate() {
  const pathname = usePathname();

  useEffect(() => {
    if (
      typeof IntersectionObserver === "undefined" ||
      typeof CSSAnimation === "undefined"
    )
      return;
    const watched = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.removeAttribute("data-offscreen");
          else e.target.setAttribute("data-offscreen", "");
        }
      },
      { rootMargin: "100px 0px" },
    );

    const scan = () => {
      for (const a of document.getAnimations()) {
        if (!(a instanceof CSSAnimation)) continue;
        if (a.effect?.getComputedTiming().iterations !== Infinity) continue;
        const t = (a.effect as KeyframeEffect).target;
        if (t && !watched.has(t)) {
          watched.add(t);
          io.observe(t);
        }
      }
    };

    const first = setTimeout(scan, 300);
    const second = setTimeout(scan, 2000); // late-mounted sections
    return () => {
      clearTimeout(first);
      clearTimeout(second);
      io.disconnect();
      watched.forEach((el) => el.removeAttribute("data-offscreen"));
    };
  }, [pathname]);

  return null;
}
