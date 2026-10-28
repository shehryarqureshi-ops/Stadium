"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/app/lib/motion";

const EarthGlobe = dynamic(() => import("./EarthGlobe"), { ssr: false });

/* Mounts exactly ONE live globe, and none on phones (same policy as ResponsiveGlobe):
   - "desktop" slot (>= lg): the live globe with its event pills; reduced motion → one still frame.
   - "stacked" slot (< lg): tablets (>= md) get the live globe without pills, phones (and reduced
     motion) get the static pre-rendered frame — zero GPU, zero JS animation. */

type Slot = "desktop" | "stacked";

export default function ResponsiveEarthGlobe({ slot }: { slot: Slot }) {
  const reduced = usePrefersReducedMotion();
  const [live, setLive] = useState<boolean | null>(null);

  useEffect(() => {
    const q = slot === "desktop" ? "(min-width: 1024px)" : "(min-width: 768px) and (max-width: 1023.98px)";
    const mq = window.matchMedia(q);
    const sync = () => setLive(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [slot]);

  if (live) return <EarthGlobe still={reduced} markers={slot === "desktop"} />;
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
