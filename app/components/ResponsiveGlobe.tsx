"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";

const Globe = dynamic(() => import("./Globe"), { ssr: false });

/* Mounts exactly ONE live globe, and none at all on phones.

   RedactedPoster lays the globe out twice (a 1440 desktop canvas and a stacked
   mobile/tablet block, one hidden by CSS per breakpoint). Rendering <Globe/> in
   both used to spin up two WebGL contexts and run two render loops — the hidden
   one included. Each slot now decides by media query whether it is the active
   one:

   - "desktop" slot (>= lg): live globe.
   - "stacked" slot (< lg): tablets (>= md) get the live globe, phones get a
     static pre-rendered frame — zero GPU, zero JS animation. Reduced motion
     also gets the static frame.

   The static frame is rendered on the server for the stacked slot so phones
   paint it immediately and never download/run cobe at all (Globe is
   dynamically imported only when needed). */

type Slot = "desktop" | "stacked";

export default function ResponsiveGlobe({ slot }: { slot: Slot }) {
  const [live, setLive] = useState<boolean | null>(null);

  useEffect(() => {
    const min = slot === "desktop" ? "(min-width: 1024px)" : "(min-width: 768px) and (max-width: 1023.98px)";
    const mq = window.matchMedia(min);
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setLive(mq.matches && !rm.matches);
    sync();
    mq.addEventListener("change", sync);
    rm.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      rm.removeEventListener("change", sync);
    };
  }, [slot]);

  if (live) return <Globe />;

  /* Not live: the desktop slot renders nothing (it is display:none below lg);
     the stacked slot shows the static frame. */
  if (slot === "desktop") return null;
  return (
    <Image
      src="/globe-static.webp"
      alt=""
      width={686}
      height={686}
      sizes="(min-width: 768px) 26rem, 90vw"
      className="h-full w-full mix-blend-luminosity"
    />
  );
}
