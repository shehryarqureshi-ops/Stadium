"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import Starfield from "../Starfield";
import { usePrefersReducedMotion } from "@/app/lib/motion";
import { DIGITAL, LAYERS, PEOPLE, PHYSICAL } from "./content";
import { ChapterHeader, IntroCopy, MediaTabs } from "./Panels";
import { PeopleDiagram } from "./PeopleDiagram";
import { pyramidStore } from "./scroll";

/* "One system. Three layers." — a static section, no scroll-driven motion. The first screen is the
   interactive WebGL pyramid (it only reacts to the pointer) with its intro copy and slice labels;
   below it Physical, Digital and People are ordinary stacked sections that scroll like any other.
   `pyramidStore.u` stays 0, so the canvas holds its intro pose. Reduced motion / the site's
   "Pause animations" switch drops the WebGL canvas and keeps the copy. */

const PyramidCanvas = dynamic(() => import("./PyramidCanvas"), { ssr: false });

/** Label pill centre relative to its slice anchor, in units of the pyramid's half-diagonal:
 *  Physical → lower right · Digital → upper left · People → upper right (as in Figma). */
const LABEL_OFFSET: [number, number][] = [
  [0.5, 0.05],
  [-0.8, -0.34],
  [0.6, -0.12],
];

export default function InfraPyramid() {
  return (
    <section aria-label="The Stadium infrastructure" className="relative overflow-clip rounded-t-[2.5rem] bg-black text-white">
      <Intro />

      <InfraChapters />
    </section>
  );
}

/* Physical · Digital · People — the stacked chapters under the intro. Shared by the pyramid intro
   and the earth section (app/components/earth), so both sit on the same carried-on sky. */
export function InfraChapters() {
  return (
  <div className="relative flex flex-col pb-16 md:pb-24 lg:pb-40">
    {/* the intro's sky carries on behind the chapters: same starfield, plus a soft blue glow per chapter */}
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          /* fade the glows in from the top edge so the join with the intro above has no seam */
          maskImage: "linear-gradient(to bottom, transparent 0, #000 40rem)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0, #000 40rem)",
          backgroundImage:
            "radial-gradient(55% 22% at 80% 18%, rgba(1,28,61,0.9) 0%, transparent 100%), radial-gradient(55% 22% at 20% 52%, rgba(1,28,61,0.9) 0%, transparent 100%), radial-gradient(55% 22% at 80% 86%, rgba(1,28,61,0.9) 0%, transparent 100%)",
        }}
      />
      <Starfield className="absolute inset-0 h-full w-full" count={700} />
    </div>
    <Chapter>
      <ChapterHeader eyebrowText={PHYSICAL.heading} title={PHYSICAL.title} body={PHYSICAL.body} />
      <MediaTabs tabs={PHYSICAL.tabs} variant="pill" playing label="Printing, warehousing, shipping and customs" />
    </Chapter>

    <Chapter>
      <ChapterHeader
        eyebrowText={DIGITAL.heading}
        title={DIGITAL.title}
        body={DIGITAL.body}
        bodyWidth="max-w-[36.875rem]"
      />
      <MediaTabs tabs={DIGITAL.tabs} variant="screen" playing label="Recognition, storefronts, integrations and controls" />
    </Chapter>

    <Chapter>
      <ChapterHeader
        eyebrowText={PEOPLE.heading}
        title={PEOPLE.title}
        body={PEOPLE.body}
        bodyWidth="max-w-[36.5rem]"
      />
      <PeopleDiagram />
    </Chapter>
  </div>
  );
}

/* one stacked chapter: Figma frame = 64 top · 120 sides · 56 between copy and media */
function Chapter({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto flex w-full max-w-[90rem] flex-col gap-10 px-section-x-sm pt-16 md:gap-14 md:px-section-x-md lg:px-[7.5rem] [&:nth-child(n+3)]:mt-16 md:[&:nth-child(n+3)]:mt-24 lg:[&:nth-child(n+3)]:mt-40">
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Intro() {
  const reduced = usePrefersReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [mountCanvas, setMountCanvas] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);
  const labelEls = useRef<(HTMLDivElement | null)[]>([]);
  const leaderEls = useRef<(SVGPathElement | null)[]>([]);
  const dotEls = useRef<(SVGCircleElement | null)[]>([]);
  const visibleRef = useRef(false);

  /* phones/tablet intro: centre [pyramid + gap + copy] vertically under the header */
  const measure = useCallback(() => {
    const s = root.current;
    if (!s) return;
    const vw = s.clientWidth || window.innerWidth;
    const sh = s.clientHeight || window.innerHeight;
    const s0 = Math.min(0.85, Math.max(0.37, (vw * 0.34 * 1.25) / 387));
    const textH = s.querySelector<HTMLElement>("[data-intro-copy]")?.offsetHeight || 240;
    const pyrH = 668 * s0;
    const introAy = 64 + Math.max(24, (sh - 64 - (pyrH + 40 + textH)) / 2);
    pyramidStore.introAy = vw < 1024 ? introAy : 0;
    s.style.setProperty("--intro-top", `${Math.round(introAy + pyrH + 40)}px`);
    /* desktop: pull Physical up so the pyramid's base sits 160px above its eyebrow
       (mirrors layoutPoses: k, yo, base ≈ yo + 950k; the chapter adds its own 64px) */
    const k = Math.min(1.3, Math.max(0.55, Math.min(vw / 1440, sh / 1024)));
    const base = (sh - 1024 * k) / 2 + 950 * k;
    s.style.setProperty("--intro-trim", `${vw >= 1024 ? Math.round(sh - base - 96) : 0}px`);
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
    };
  }, [measure]);

  /* mount WebGL a screen before it's needed; render only while on screen */
  useEffect(() => {
    const o = root.current;
    if (!o) return;
    pyramidStore.u = 0;
    const near = new IntersectionObserver(([e]) => e.isIntersecting && setMountCanvas(true), { rootMargin: "150% 0px" });
    const live = new IntersectionObserver(
      ([e]) => {
        visibleRef.current = e.isIntersecting;
        setVisible(e.isIntersecting);
      },
      { rootMargin: "10% 0px" },
    );
    near.observe(o);
    live.observe(o);
    return () => {
      near.disconnect();
      live.disconnect();
    };
  }, []);

  /* labels follow their slice anchors (the pyramid breathes with the pointer) — not scroll */
  useEffect(() => {
    if (reduced) return;
    const tick = () => {
      const s = root.current;
      if (!visibleRef.current || !s) return;
      const vw = s.clientWidth;
      const vh = s.clientHeight;
      const hd = pyramidStore.halfDiag;
      labelEls.current.forEach((el, i) => {
        if (!el) return;
        const anchor = pyramidStore.anchors[i];
        const ready = anchor.x !== 0 || anchor.y !== 0;
        const [ox, oy] = LABEL_OFFSET[i];
        const w = el.offsetWidth;
        const h = el.offsetHeight;
        // keep the pill fully on screen
        const px = Math.min(vw - 24 - w / 2, Math.max(24 + w / 2, anchor.x + ox * hd));
        const py = Math.min(vh - 24 - h / 2, Math.max(80 + h / 2, anchor.y + oy * hd));
        const o = ready ? "1" : "0";
        el.style.transform = `translate3d(${px.toFixed(1)}px, ${py.toFixed(1)}px, 0) translate(-50%, -50%)`;
        el.style.opacity = o;
        const dir = anchor.x < px ? -1 : 1; // leader leaves the pill on the side facing its dot
        const x0 = px + dir * (w / 2);
        const path = leaderEls.current[i];
        const dot = dotEls.current[i];
        if (path) {
          path.setAttribute("d", `M${x0.toFixed(1)} ${py.toFixed(1)} L${(x0 + dir * 36).toFixed(1)} ${py.toFixed(1)} L${anchor.x.toFixed(1)} ${anchor.y.toFixed(1)}`);
          path.style.opacity = o;
        }
        if (dot) {
          dot.setAttribute("cx", anchor.x.toFixed(1));
          dot.setAttribute("cy", anchor.y.toFixed(1));
          dot.style.opacity = o;
        }
      });
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [reduced]);

  return (
    <div ref={root} className="relative mb-[calc(var(--intro-trim,0px)*-1)] h-svh min-h-[40rem] w-full overflow-hidden bg-black">
      {/* the globe section's dark-blue sky (Figma 6525:12159) */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ backgroundImage: "radial-gradient(115% 105% at 74% 16%, #011c3d 0%, #020a14 45%, #000000 78%)" }}
      />
      {/* the same twinkling starfield as the globe section above, so the two read as one sky */}
      <Starfield className="absolute inset-0 h-full w-full" />

      {/* the first frames compile shaders — fade the canvas in once it is actually drawing */}
      {!reduced && (
        <div className={`absolute inset-0 transition-opacity duration-[1200ms] ease-out ${canvasReady ? "opacity-100" : "opacity-0"}`}>
          {mountCanvas && <PyramidCanvas active={visible} onReady={() => setCanvasReady(true)} />}
        </div>
      )}

      {/* slice labels — a connected pill per slice (decorative — no interaction) */}
      {!reduced && (
        <>
          <svg aria-hidden className="pointer-events-none absolute inset-0 size-full">
            {LAYERS.map((label, i) => (
              <g key={label}>
                <path ref={(el) => void (leaderEls.current[i] = el)} fill="none" stroke="white" strokeWidth="1" style={{ opacity: 0 }} />
                <circle ref={(el) => void (dotEls.current[i] = el)} r="5" fill="white" style={{ opacity: 0 }} />
              </g>
            ))}
          </svg>
          {LAYERS.map((label, i) => (
            <div
              key={label}
              ref={(el) => void (labelEls.current[i] = el)}
              style={{ opacity: 0 }}
              className="pointer-events-none absolute left-0 top-0 z-10 flex items-center gap-2 rounded-full border border-white/[0.28] bg-black/[0.42] px-3 py-[0.4375rem] font-sans text-[0.6875rem] uppercase text-white backdrop-blur-[0.5rem]"
            >
              <span className="font-bold tracking-[0.075rem]">0{i + 1}</span>
              <span className="font-medium tracking-[0.0875rem]">{label}</span>
            </div>
          ))}
        </>
      )}

      <div className="pointer-events-none absolute inset-0 flex items-start pt-[var(--intro-top,22rem)] lg:items-center lg:pt-0">
        <div className="w-full px-4 md:px-[max(var(--spacing-section-x-md),calc((100%_-_var(--container-content))/2))]">
          <IntroCopy />
        </div>
      </div>
    </div>
  );
}
