"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ComponentType } from "react";

/* Lazy-mounts a heavy animated loop (gsap timeline, images, SVG tile).

   StepCardsCarousel keeps every card in the deck mounted, so StadiumWay used to
   import and build all thirteen gsap timelines at hydration. `lazyLoop` turns
   each loop into a code-split chunk that is only fetched, parsed and mounted
   once its slot is within `rootMargin` of the viewport; until then an empty
   absolutely-positioned placeholder holds the slot (the parent already owns the
   aspect ratio, so there is no layout shift). Once mounted it stays mounted —
   the loops pause themselves via useCardActive / their own visibility gates. */

const ROOT_MARGIN = "400px 0px";

export function lazyLoop(
  loader: () => Promise<{ default: ComponentType }>,
): ComponentType {
  const Loop = dynamic(loader, { ssr: false });

  function LazyLoop() {
    const ref = useRef<HTMLDivElement>(null);
    const [near, setNear] = useState(false);

    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      if (typeof IntersectionObserver === "undefined") {
        setNear(true);
        return;
      }
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setNear(true);
            io.disconnect();
          }
        },
        { rootMargin: ROOT_MARGIN },
      );
      io.observe(el);
      return () => io.disconnect();
    }, []);

    if (near) return <Loop />;
    return <div ref={ref} aria-hidden className="absolute inset-0" />;
  }

  return LazyLoop;
}
