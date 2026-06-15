"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import facesImg from "@/public/map-faces.jpg";
import { useAutoAdvance } from "./useAutoAdvance";

/* "Built and proven at global scale" — Figma 953:43242 (light, interactive).
   The four stats double as tabs; each selects a map state:
     0 Countries → Coverage    1 Items → Hubs
     2 Integrations → Network   3 Lives → Reach
   shopify-style auto-advance until the user clicks. The map is authored at the
   Figma design coords (a 1200×512 canvas) and uniformly scaled to fit narrower
   viewports, so every pin / card / logo keeps its exact relative position. */

const CANVAS_W = 1200;
const CANVAS_H = 512;

type Stat = { value: string; label: string; sub: string };
const stats: Stat[] = [
  { value: "170+", label: "Countries", sub: "with local fulfillment" },
  { value: "100K+", label: "Items", sub: "in the global catalog" },
  { value: "100+", label: "Integrations", sub: "with the tools you already use" },
  { value: "1M+", label: "Lives touched", sub: "across the globe" },
];

/* Region pins — shared by Hubs (item counts) and Reach (lives reached).
   `pin` = top-left of the 32px marker; `card` = top-left of the label card.
   All in canvas (1200×512) px. */
type Region = {
  name: string;
  items: string;
  lives: string;
  pin: [number, number];
  card: [number, number];
};
const regions: Region[] = [
  { name: "North America", items: "32K+ items", lives: "320K+ lives", pin: [282, 208], card: [316, 200] },
  { name: "Europe", items: "24K+ items", lives: "280K+ lives", pin: [563, 170], card: [598, 144] },
  { name: "Latin America", items: "13K+ items", lives: "120K+ lives", pin: [406, 332], card: [440, 340] },
  { name: "Middle East", items: "6K+ items", lives: "90K+ lives", pin: [674, 264], card: [708, 256] },
  { name: "Asia", items: "22K+ items", lives: "240K+ lives", pin: [876, 199], card: [910, 196] },
  { name: "Africa", items: "8K+ items", lives: "70K+ lives", pin: [622, 364], card: [656, 356] },
  { name: "Oceania", items: "5K+ items", lives: "40K+ lives", pin: [969, 382], card: [1003, 374] },
];

/* Network integration logo strip (left → right). w/h = the design's intrinsic
   logo box so the SVGs don't balloon (set width+height attributes). */
const networkLogos: { src: string; w: number; h: number }[] = [
  { src: "/map-net-logo-1.svg", w: 30.4, h: 24.32 },
  { src: "/map-net-logo-2.svg", w: 24.32, h: 24.32 },
  { src: "/map-net-logo-3-workday.svg", w: 43.11, h: 20.38 },
  { src: "/map-net-logo-4.svg", w: 24.32, h: 24.32 },
  { src: "/map-net-logo-5.svg", w: 21.28, h: 24.32 },
  { src: "/map-net-logo-6.svg", w: 24.32, h: 24.32 },
  { src: "/map-net-logo-7-sap.svg", w: 42.15, h: 20.84 },
  { src: "/map-net-logo-8.svg", w: 24.32, h: 24.32 },
];

const dotMask: CSSProperties = {
  maskImage: "url('/map-dot-mask.svg')",
  maskSize: "100% 100%",
  maskRepeat: "no-repeat",
};

/* Three-layer blue marker (Figma's ellipse stack rebuilt in CSS so it scales
   with the canvas): soft halo, mid ring, solid core. */
function Marker({ left, top }: { left: number; top: number }) {
  return (
    <div className="absolute size-8" style={{ left, top }}>
      <span className="absolute inset-0 rounded-full bg-accent-water/15" />
      <span className="absolute left-1/2 top-1/2 size-[0.8125rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-water/35" />
      <span className="absolute left-1/2 top-1/2 size-[0.3125rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-water" />
    </div>
  );
}

function RegionCard({ left, top, name, value }: { left: number; top: number; name: string; value: string }) {
  return (
    <div
      className="absolute flex flex-col gap-1 whitespace-nowrap rounded-lg border border-grey-300 bg-white px-4 py-2 shadow-[0px_0.125rem_0.5rem_0px_rgba(16,24,40,0.1)]"
      style={{ left, top }}
    >
      <p className="font-sans text-[0.75rem] font-bold uppercase leading-3 tracking-[0.1rem] text-ink">{name}</p>
      <p className="font-sans text-[0.75rem] leading-4 tracking-[0.0125rem] text-grey-600">{value}</p>
    </div>
  );
}

/* Reach — photographic dot map (faces masked into the continents). Positions
   are % of the canvas, so they resolve against the 1200×512 stage. */
function ReachBase() {
  return (
    <>
      <div className="absolute left-[6.67%] top-[8.59%] h-[88.02%] w-[86.67%]" style={dotMask}>
        <div className="absolute left-[0.83%] top-[9.04%] h-[87.31%] w-[95.33%] opacity-25">
          <Image src={facesImg} alt="" fill sizes="75rem" className="object-cover" />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/map-white-dots.svg" alt="" className="absolute inset-0 size-full opacity-25" />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/map-dots-reach.svg" alt="" className="absolute left-[7.42%] top-[16.6%] h-[76.74%] w-[82.5%] opacity-80" />
    </>
  );
}

function CoverageOverlay() {
  return (
    <>
      <div className="absolute" style={{ left: 226.68, top: 142.99, width: 729.232, height: 269.589 }}>
        <div className="absolute" style={{ inset: "-2.6% -0.96%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/map-coverage-overlay.svg" alt="" className="block size-full max-w-none" />
        </div>
      </div>
      {/* Legend */}
      <div
        className="absolute flex items-center gap-6 whitespace-nowrap rounded-[1.25rem] border border-grey-300 bg-white px-[1.3125rem] font-sans text-[0.75rem] text-grey-600 shadow-[0px_0.125rem_0.25rem_0px_rgba(16,24,40,0.08)]"
        style={{ left: 352, top: 468.73, width: 496.6, height: 40 }}
      >
        <span className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-accent-water" />
          Coverage network
        </span>
        <span className="flex items-center gap-2">
          <span className="flex size-[0.8125rem] items-center justify-center rounded-full bg-accent-water/30">
            <span className="size-[0.4375rem] rounded-full bg-accent-water" />
          </span>
          Local fulfillment regions
        </span>
        <span className="flex items-center gap-1.5">
          <span className="flex gap-[0.1875rem]">
            <span className="size-[0.1625rem] rounded-full bg-grey-400" />
            <span className="size-[0.1625rem] rounded-full bg-grey-400" />
            <span className="size-[0.1625rem] rounded-full bg-grey-400" />
            <span className="size-[0.1625rem] rounded-full bg-grey-400" />
          </span>
          Cross-region routing
        </span>
      </div>
    </>
  );
}

function NetworkOverlay() {
  return (
    <>
      {/* dashed routing */}
      <div className="absolute" style={{ left: 244, top: 48, width: 741, height: 350 }}>
        <div className="absolute" style={{ inset: "-1.43% -0.75% -1.57% -0.76%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/map-network-connectors.svg" alt="" className="block size-full max-w-none" />
        </div>
      </div>

      {/* hub halo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/map-network-glow.svg" alt="" className="absolute max-w-none" style={{ left: 464, top: 80, width: 240, height: 150 }} />

      {/* routing endpoints — every region except Europe (under the hub) */}
      {regions
        .filter((r) => r.name !== "Europe")
        .map((r) => (
          <Marker key={r.name} left={r.pin[0]} top={r.pin[1]} />
        ))}

      {/* central Stadium hub */}
      <div
        className="absolute flex items-center justify-center gap-1.5 rounded-[1.428rem] border-[0.06rem] border-[#d9e5fa] bg-white shadow-[0px_0.1785rem_0.714rem_0px_rgba(10,77,178,0.16)]"
        style={{ left: 513.59, top: 132.6, width: 140.896, height: 45.696 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/header-logo-mark.svg" alt="Stadium" width={11} height={18} className="h-[1.125rem] w-auto" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/header-logo-wordmark.svg" alt="" width={82} height={18} className="h-[1.125rem] w-auto" />
      </div>

      {/* integration logo strip */}
      <div className="absolute flex gap-[0.665rem]" style={{ left: 207, top: 8 }}>
        {networkLogos.map((logo) => (
          <span
            key={logo.src}
            className="flex h-[2.47rem] w-[4.655rem] items-center justify-center rounded-[0.57rem] border border-grey-300 bg-white shadow-[0px_0.0625rem_0.1875rem_0px_rgba(16,24,40,0.08)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo.src} alt="" width={logo.w} height={logo.h} className="object-contain" style={{ width: logo.w, height: logo.h }} />
          </span>
        ))}
        <span className="flex h-[2.47rem] w-[4.655rem] items-center justify-center rounded-[0.57rem] border border-grey-300 bg-white shadow-[0px_0.0625rem_0.1875rem_0px_rgba(16,24,40,0.08)]">
          <span className="font-sans text-[0.75rem] leading-4 text-ink">+90 more</span>
        </span>
      </div>
    </>
  );
}

export default function ScaleMap() {
  const [active, setActive] = useState(0);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const mapWrapRef = useRef<HTMLDivElement>(null);

  const { sectionRef, takeOver } = useAutoAdvance(() =>
    setActive((i) => (i + 1) % stats.length),
  );
  const select = (i: number) => {
    takeOver();
    setActive(i);
  };

  // Fit the 1200×512 design canvas inside its slot — scale to whichever of
  // width/height binds, then centre it. On desktop the slot is a flex-1 box
  // sized to the leftover viewport height (the section is min-h screen), so the
  // whole global section reads in a single view; on mobile the slot keeps its
  // aspect ratio and the width binds (unchanged behaviour).
  useEffect(() => {
    const el = mapWrapRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      const s = Math.min(w / CANVAS_W, h / CANVAS_H);
      setScale(s);
      setOffset({ x: (w - CANVAS_W * s) / 2, y: (h - CANVAS_H * s) / 2 });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-[#fafafb] to-white px-section-x-sm py-section-y-sm md:px-section-x-md md:py-section-y-md lg:flex lg:min-h-[calc(100svh-4rem)] lg:flex-col lg:px-section-x-lg lg:pb-10 lg:pt-[5.5rem]"
    >
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-8 lg:min-h-0 lg:flex-1 lg:gap-6">
        {/* Heading + interactive stats */}
        <div className="flex w-full flex-col gap-8 wide:flex-row wide:items-start wide:justify-between wide:gap-12">
          <div className="flex flex-col gap-4 wide:w-[30.375rem] wide:shrink-0">
            <h2 className="font-display text-heading-sm text-ink md:text-heading-md lg:text-heading-lg">
              Built and proven at global scale
            </h2>
            <p className="font-sans text-body-md text-grey-600 md:text-body-lg">
              Our infrastructure powers engagement for the world&apos;s leading companies
            </p>
          </div>

          <div className="flex w-full flex-col wide:w-[36.75rem] wide:shrink-0">
            {stats.map((s, i) => {
              const on = i === active;
              const divider = i > 0 && active !== i && active !== i - 1;
              return (
                <Fragment key={s.label}>
                  {divider && <div className="h-px w-full bg-grey-200" />}
                  {on ? (
                    <div className="flex w-full items-center gap-4 rounded-lg border border-grey-300 bg-white px-5 py-3 shadow-[0px_0.25rem_1rem_0px_rgba(16,24,40,0.08)]">
                      <p className="w-[6.875rem] shrink-0 font-display text-[2rem] font-bold leading-10 tracking-[-0.01563rem] text-accent-water">
                        {s.value}
                      </p>
                      <div className="flex min-w-0 flex-col gap-[0.1875rem]">
                        <p className="font-sans text-[0.875rem] font-bold uppercase leading-[0.875rem] tracking-[0.1rem] text-ink">
                          {s.label}
                        </p>
                        <p className="font-sans text-[0.875rem] leading-5 text-grey-600">{s.sub}</p>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => select(i)}
                      className="flex w-full cursor-pointer items-center gap-4 rounded-card px-5 py-3 text-left transition-colors duration-150 hover:bg-black/[0.03]"
                    >
                      <p className="w-[6.875rem] shrink-0 font-display text-[2rem] font-bold leading-10 tracking-[-0.01563rem] text-ink">
                        {s.value}
                      </p>
                      <div className="flex min-w-0 flex-col gap-[0.1875rem]">
                        <p className="font-sans text-[0.875rem] font-bold uppercase leading-[0.875rem] tracking-[0.1rem] text-ink">
                          {s.label}
                        </p>
                        <p className="font-sans text-[0.875rem] leading-5 text-grey-600">{s.sub}</p>
                      </div>
                    </button>
                  )}
                </Fragment>
              );
            })}
          </div>
        </div>

        {/* Map canvas — design coords (1200×512), uniformly scaled to fit */}
        <div
          ref={mapWrapRef}
          className="relative aspect-[1200/512] w-full max-w-content overflow-hidden lg:aspect-auto lg:min-h-0 lg:flex-1"
          aria-hidden="true"
        >
          <div
            className="absolute left-0 top-0 origin-top-left"
            style={{
              width: CANVAS_W,
              height: CANVAS_H,
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            }}
          >
            {active === 3 ? (
              <ReachBase />
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src="/map-dots-coverage.svg"
                alt=""
                width={990}
                height={393}
                className="absolute max-w-none"
                style={{ left: 89, top: 85, width: 990.08, height: 392.916 }}
              />
            )}

            {active === 0 && <CoverageOverlay />}
            {active === 1 &&
              regions.map((r) => (
                <Fragment key={r.name}>
                  <Marker left={r.pin[0]} top={r.pin[1]} />
                  <RegionCard left={r.card[0]} top={r.card[1]} name={r.name} value={r.items} />
                </Fragment>
              ))}
            {active === 2 && <NetworkOverlay />}
            {active === 3 &&
              regions.map((r) => (
                <Fragment key={r.name}>
                  <Marker left={r.pin[0]} top={r.pin[1]} />
                  <RegionCard left={r.card[0]} top={r.card[1]} name={r.name} value={r.lives} />
                </Fragment>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
