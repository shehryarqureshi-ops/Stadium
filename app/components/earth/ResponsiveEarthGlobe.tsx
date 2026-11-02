"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/app/lib/motion";
import CircleFlag, { type FlagCode } from "../CircleFlag";

const EarthGlobe = dynamic(() => import("./EarthGlobe"), { ssr: false });

/* Mounts exactly ONE live globe, and none on phones (same policy as ResponsiveGlobe):
   - "desktop" slot (>= lg): the live globe with its event pills; reduced motion → one still frame.
   - "stacked" slot (< lg): tablets (>= md) get the live globe without pills, phones (and reduced
     motion) get the static pre-rendered frame — zero GPU, zero JS animation. */

/* three pills pinned (by eye, in % of the frame) to Rome, London and Dubai on the static frame */
const STATIC_MARKERS: { label: string; flag: FlagCode; x: number; y: number; below?: boolean }[] = [
  { label: "Kudos sent", flag: "gb", x: 34, y: 22 },
  { label: "New hire kit delivered", flag: "it", x: 52, y: 34 },
  { label: "Client gift received", flag: "ae", x: 63, y: 44, below: true },
];

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
    <div className="relative h-full w-full">
      <Image
        src="/globe-static.webp"
        alt=""
        width={686}
        height={686}
        sizes="(min-width: 768px) 26rem, 90vw"
        className="h-full w-full mix-blend-luminosity max-md:[mask-image:linear-gradient(to_bottom,#000_50%,transparent_95%)]"
      />
      {STATIC_MARKERS.map((m) => (
        <div key={m.label} aria-hidden className="earth-marker" style={{ left: `${m.x}%`, top: `${m.y}%` }}>
          <span className="earth-marker__dot" />
          <span className={`earth-marker__pill ${m.below ? "earth-marker__pill--below" : ""}`}>
            <CircleFlag code={m.flag} size="1.125rem" borderWidth="0.0625rem" borderColor="rgba(255,255,255,0.6)" />
            {m.label}
          </span>
        </div>
      ))}
    </div>
  );
}
