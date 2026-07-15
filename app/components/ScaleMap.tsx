"use client";

import { useEffect, useRef, useState } from "react";

/* "Scale to wherever your people are" — synced to Figma 2:33685. Interactive:
   a centered 55px header, a 4-stat row where hovering/selecting a stat makes it
   the active one (dark, the rest grey) with a blue gradient line above AND below
   it (Figma), and the dotted world map re-plots its live markers per active stat
   ("every state changes the map underneath"). Auto-advances while in view. */

const CANVAS_W = 1200;
const CANVAS_H = 512;

const STATS = [
  { value: "170+", label: "Countries", sub: "with local fulfillment" },
  { value: "100K+", label: "Items", sub: "in the global catalog" },
  { value: "100+", label: "Integrations", sub: "with the tools you already use" },
  { value: "1M+", label: "Recipients", sub: "across the globe" },
];

/* marker centres on the 1200×512 canvas (roughly matching the Figma clusters) */
const MARKERS: [number, number][] = [
  [232, 196], [296, 206], [345, 188], [278, 250], [402, 346],
  [560, 158], [604, 172], [642, 316], [700, 256], [852, 202], [906, 192], [978, 386],
];

/* each stat lights a different set of the coverage markers, so the map visibly
   re-plots as you move across the stats */
const MARKER_SETS: number[][] = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], // Countries — widest coverage
  [1, 3, 5, 7, 9, 11], // Items — fulfillment hubs
  [0, 2, 4, 6, 8, 10], // Integrations — tech hubs
  [2, 3, 5, 6, 8, 9, 10, 11], // Recipients — dense
];

function Marker({ left, top }: { left: number; top: number }) {
  return (
    <div className="absolute size-8" style={{ left: left - 16, top: top - 16 }}>
      <span className="absolute inset-0 rounded-full bg-accent-water/15" />
      <span className="absolute left-1/2 top-1/2 size-[0.8125rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-water/35" />
      <span className="absolute left-1/2 top-1/2 size-[0.3125rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-water" />
    </div>
  );
}

/* one full-width grey rail with a blue gradient highlight that slides under the
   active stat (top and bottom lines of the stats row) */
function StatRule({ active }: { active: number }) {
  return (
    <div className="relative h-px w-full bg-[#e5e6eb]">
      <div
        className="absolute inset-y-0 hidden w-1/4 -translate-x-1/2 bg-[linear-gradient(90deg,transparent_0%,#0b7afc_50%,transparent_100%)] transition-[left] duration-300 ease-out md:block"
        style={{ left: `${(active + 0.5) * 25}%` }}
      />
    </div>
  );
}

export default function ScaleMap() {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(0);
  const mapWrapRef = useRef<HTMLDivElement>(null);

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
    <section className="bg-gradient-to-b from-[#fafafb] to-white px-section-x-sm py-16 md:px-section-x-md md:py-24 lg:px-section-x-lg lg:py-[7.5rem]">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-16 lg:gap-20">
        {/* header */}
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="font-display text-heading-sm text-[#181818] md:text-heading-md lg:text-[3.4375rem] lg:leading-[3.75rem] lg:tracking-[-0.075rem]">
            Scale to wherever<br className="hidden md:block" /> your people are
          </h2>
          <p className="font-sans text-body-md text-[#4f5052] lg:text-[1.125rem] lg:leading-7">
            Recognition, swag, and gifting.<br className="hidden md:block" /> Delivered to teams around the world.
          </p>
        </div>

        {/* stats row — selectable; active stat is dark with a blue line above + below */}
        <div className="w-full">
          <StatRule active={active} />
          <div className="grid grid-cols-2 md:grid-cols-4">
            {STATS.map((s, i) => (
              <button
                key={s.label}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className="flex cursor-pointer flex-col items-center gap-4 px-5 pb-8 pt-8 text-center outline-none"
              >
                <div className="flex flex-col items-center gap-1">
                  <p
                    className={`font-display text-[2.75rem] font-bold leading-none tracking-[-0.03em] transition-colors duration-200 lg:text-[3.4375rem] ${
                      i === active ? "text-[#181818]" : "text-[#9499ad]"
                    }`}
                  >
                    {s.value}
                  </p>
                  <p
                    className={`font-sans text-[0.75rem] font-bold uppercase tracking-[0.0625rem] transition-colors duration-200 ${
                      i === active ? "text-[#181818]" : "text-[#9499ad]"
                    }`}
                  >
                    {s.label}
                  </p>
                </div>
                <p
                  className={`font-sans text-[1rem] leading-5 transition-colors duration-200 ${
                    i === active ? "text-[#4f5052]" : "text-[#9da2b4]"
                  }`}
                >
                  {s.sub}
                </p>
              </button>
            ))}
          </div>
          <StatRule active={active} />
        </div>

        {/* map — re-plots its markers for the active stat */}
        <div
          ref={mapWrapRef}
          className="relative aspect-[1200/512] w-full max-w-content overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="absolute left-0 top-0 origin-top-left"
            style={{ width: CANVAS_W, height: CANVAS_H, transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/map-dots-coverage.svg"
              alt=""
              className="absolute max-w-none"
              style={{ left: 89, top: 85, width: 990.08, height: 392.916 }}
            />
            {/* routing arcs */}
            <div className="absolute" style={{ left: 226.68, top: 142.99, width: 729.232, height: 269.589 }}>
              <div className="absolute" style={{ inset: "-2.6% -0.96%" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/map-coverage-overlay.svg" alt="" className="block size-full max-w-none" />
              </div>
            </div>
            <div key={active} className="map-markers">
              {MARKER_SETS[active].map((idx) => (
                <Marker key={idx} left={MARKERS[idx][0]} top={MARKERS[idx][1]} />
              ))}
            </div>
          </div>
          <style>{`
            .map-markers { animation: map-fade 0.35s ease-out both; }
            @keyframes map-fade { from { opacity: 0; } to { opacity: 1; } }
            @media (prefers-reduced-motion: reduce) { .map-markers { animation: none; } }
          `}</style>
        </div>

        {/* legend */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-full border border-grey-200 bg-white px-6 py-3 font-sans text-[0.75rem] text-[#4f5052] shadow-[0px_0.125rem_0.375rem_0px_rgba(16,24,40,0.06)]">
          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-grey-400" />
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
              {[0, 1, 2, 3].map((d) => (
                <span key={d} className="size-[0.1625rem] rounded-full bg-accent-water" />
              ))}
            </span>
            Cross-region routing
          </span>
        </div>
      </div>
    </section>
  );
}
