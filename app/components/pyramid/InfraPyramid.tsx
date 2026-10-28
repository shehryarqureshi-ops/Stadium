"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import Starfield from "../Starfield";
import { usePrefersReducedMotion } from "@/app/lib/motion";
import { DIGITAL, LAYERS, PEOPLE, PHYSICAL } from "./content";
import {
  ChapterHeader,
  IntroCopy,
  MediaTabs,
} from "./Panels";
import { PeopleDiagram } from "./PeopleDiagram";
import {
  PIN_UNITS,
  clamp01,
  panelTarget,
  pyramidStore,
} from "./scroll";

/* "One system. Three layers." — the pinned, scroll-driven pyramid section that
   replaces "The Stadium Infrastructure" on /new-home.

   A sticky 100svh stage holds a WebGL pyramid (PyramidCanvas) behind four DOM
   panels (intro · Physical · Digital · People). This component is the scroll
   engine:
     • reads the (native) page scroll into `u`, the
       position inside the pin in viewport-heights, and publishes it for WebGL;
     • drives each panel's rise/exit through its own damped spring so panels
       settle with a hint of overshoot instead of stopping dead;
   Reduced motion / the site's "Pause animations" switch gets a static, stacked
   version with no WebGL. */

const PyramidCanvas = dynamic(() => import("./PyramidCanvas"), { ssr: false });

/** Label pill centre relative to its slice anchor, in units of the pyramid's half-diagonal:
 *  Physical → lower right · Digital → upper left · People → upper right (as in Figma). */
const LABEL_OFFSET: [number, number][] = [
  [0.5, 0.05],
  [-0.92, -0.3],
  [0.6, -0.12],
];

export default function InfraPyramid() {
  const reduced = usePrefersReducedMotion();
  return reduced ? <StaticInfra /> : <PinnedInfra />;
}

/* ------------------------------------------------------------------ */

function PinnedInfra() {
  const outer = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const sky = useRef<HTMLDivElement>(null);
  const panelEls = useRef<(HTMLDivElement | null)[]>([]);
  const [visible, setVisible] = useState(false);
  const [mountCanvas, setMountCanvas] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);
  const [stop, setStop] = useState(0);
  const stopRef = useRef(0);
  const labelEls = useRef<(HTMLDivElement | null)[]>([]);
  const leaderEls = useRef<(SVGPathElement | null)[]>([]);
  const dotEls = useRef<(SVGCircleElement | null)[]>([]);
  const visibleRef = useRef(false);
  const metrics = useRef({ top: 0, vh: 1, vw: 1 });

  /* document-space top of the section + viewport size (re-measured on layout shifts) */
  const measure = useCallback(() => {
    const o = outer.current;
    const s = stage.current;
    if (!o || !s) return;
    metrics.current = {
      top: o.getBoundingClientRect().top + window.scrollY,
      vh: s.clientHeight || window.innerHeight,
      vw: s.clientWidth || window.innerWidth,
    };
    /* below lg the parked pyramid sits above the copy: start the copy just under it
       (mirrors layoutPoses: apex y 108, stop scale = 0.5 × s0, height = 668 × scale) */
    const vw = s.clientWidth || window.innerWidth;
    const s0 = Math.min(0.85, Math.max(0.37, (vw * 0.34 * 1.25) / 387));
    /* phones/tablet intro: centre [pyramid + gap + copy] vertically under the header */
    const textH = s.querySelector<HTMLElement>("[data-intro-copy]")?.offsetHeight || 240;
    const sh = s.clientHeight || window.innerHeight;
    const pyrH = 668 * s0;
    const introAy = 64 + Math.max(24, (sh - 64 - (pyrH + 40 + textH)) / 2);
    pyramidStore.introAy = vw < 1024 ? introAy : 0;
    s.style.setProperty("--intro-top", `${Math.round(introAy + pyrH + 40)}px`);
    s.style.setProperty("--pyr-bottom", `${Math.round(108 + 668 * s0 * 0.5 + 16)}px`);
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
    const o = outer.current;
    if (!o) return;
    const near = new IntersectionObserver(
      ([e]) => e.isIntersecting && setMountCanvas(true),
      { rootMargin: "150% 0px" },
    );
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

  /* the scroll engine */
  useEffect(() => {
    const origins = ["left center", "center center", "center center", "center center"];

    const tick = () => {
      if (!visibleRef.current) return;
      const { top, vh, vw } = metrics.current;
      const u = Math.min(PIN_UNITS, Math.max(0, (window.scrollY - top) / vh));
      pyramidStore.u = u;
      /* scroll the sky away exactly as the old section background did once the stage pins */
      if (sky.current) sky.current.style.transform = `translate3d(0, ${-Math.max(0, window.scrollY - top).toFixed(2)}px, 0)`;

      const desktop = vw >= 1024;
      const fit = desktop ? Math.min(1, Math.max(0.62, vh / 1024)) : 1;

      let best = 0;
      let bestAbs = Infinity;
      for (let k = 0; k < 4; k++) {
        const s = panelTarget(k, u); // 1:1 with scroll — no smoothing
        const abs = Math.abs(s);
        if (abs < bestAbs) {
          bestAbs = abs;
          best = k;
        }
        const el = panelEls.current[k];
        if (!el) continue;
        const rise = s < 0 ? -s * vh * 0.55 : -s * vh * 0.28;
        const opacity = clamp01(1 - abs * 1.25);
        el.style.transform = `translate3d(0, ${rise.toFixed(2)}px, 0) scale(${(fit * (1 - Math.min(abs, 1) * 0.04)).toFixed(4)})`;
        el.style.transformOrigin = desktop ? origins[k] : "center bottom";
        el.style.opacity = opacity.toFixed(3);
        el.style.visibility = opacity < 0.01 ? "hidden" : "visible";
      }


      /* intro labels (Figma 6765:13588): outlined pill + leader line + dot on its slice.
         Fade out the moment the pyramid starts to move. */
      const labelOpacity = clamp01(1 - u * 8);
      const hd = pyramidStore.halfDiag;
      labelEls.current.forEach((el, i) => {
        if (!el) return;
        const anchor = pyramidStore.anchors[i];
        const ready = (anchor.x !== 0 || anchor.y !== 0) && labelOpacity > 0;
        const [ox, oy] = LABEL_OFFSET[i];
        const w = el.offsetWidth;
        const h = el.offsetHeight;
        const { vw, vh } = metrics.current;
        // keep the pill fully on screen
        const px = Math.min(vw - 24 - w / 2, Math.max(24 + w / 2, anchor.x + ox * hd));
        const py = Math.min(vh - 24 - h / 2, Math.max(80 + h / 2, anchor.y + oy * hd));
        el.style.transform = `translate3d(${px.toFixed(1)}px, ${py.toFixed(1)}px, 0) translate(-50%, -50%)`;
        el.style.opacity = (ready ? labelOpacity : 0).toFixed(3);
        const dir = anchor.x < px ? -1 : 1; // leader leaves the pill on the side facing its dot
        const x0 = px + dir * (w / 2);
        const path = leaderEls.current[i];
        const dot = dotEls.current[i];
        if (path) {
          path.setAttribute("d", `M${x0.toFixed(1)} ${py.toFixed(1)} L${(x0 + dir * 36).toFixed(1)} ${py.toFixed(1)} L${anchor.x.toFixed(1)} ${anchor.y.toFixed(1)}`);
          path.style.opacity = (ready ? labelOpacity : 0).toFixed(3);
        }
        if (dot) {
          dot.setAttribute("cx", anchor.x.toFixed(1));
          dot.setAttribute("cy", anchor.y.toFixed(1));
          dot.style.opacity = (ready ? labelOpacity : 0).toFixed(3);
        }
      });
      if (bestAbs < 0.5 && best !== stopRef.current) {
        stopRef.current = best;
        setStop(best);
      }
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  /* chapters 1–3 start hidden so SSR / first paint never stacks them on the intro */
  const hidden = { opacity: 0, visibility: "hidden" } as const;

  return (
    <section
      ref={outer}
      aria-label="The Stadium infrastructure"
      className="relative overflow-clip rounded-t-[2.5rem] bg-black text-white"
      style={{ height: `calc(100svh * ${1 + PIN_UNITS})` }}
    >
      {/* The stage is an OPAQUE black layer. It used to be transparent over the section's own
          background, so when Chrome couldn't rasterise the stage's tiles fast enough during a scroll
          (WebGL canvas + starfield + four full-screen panels) the unpainted strip at the bottom edge
          fell back to the page's white — the flickering white lines. An opaque layer makes any lagging
          tile show black instead. */}
      <div ref={stage} className="sticky top-0 h-svh w-full overflow-hidden bg-black">
        {/* the globe section's dark-blue sky over the first screen (Figma 6525:12159). It used to be the
            section's background and scrolled away as the pin began; it now rides inside the stage and
            is lifted by the same amount (see the scroll engine), so it looks identical. */}
        <div
          ref={sky}
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(115% 105% at 74% 16%, #011c3d 0%, #020a14 45%, #000000 78%)",
          }}
        />
        {/* the same twinkling starfield as the globe section above, so the two read as one sky */}
        <Starfield className="absolute inset-0 h-full w-full" />

        {/* the first frames compile shaders — fade the canvas in once it is actually drawing */}
        <div
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-out ${canvasReady ? "opacity-100" : "opacity-0"}`}
        >
          {mountCanvas && <PyramidCanvas active={visible} onReady={() => setCanvasReady(true)} />}
        </div>

        {/* intro labels — a connected pill per slice (decorative — no interaction) */}
        <svg aria-hidden className="pointer-events-none absolute inset-0 size-full">
          {LAYERS.map((label, i) => (
            <g key={label}>
              <path
                ref={(el) => void (leaderEls.current[i] = el)}
                fill="none"
                stroke="white"
                strokeWidth="1"
                style={{ opacity: 0 }}
              />
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

        {/* 00 — intro */}
        <div
          ref={(el) => void (panelEls.current[0] = el)}
          className="pointer-events-none absolute inset-0 flex items-start pt-[var(--intro-top,22rem)] will-change-transform lg:items-center lg:pt-0"
        >
          <Container>
            <div className="lg:pl-20">
              <IntroCopy />
            </div>
          </Container>
        </div>

        {/* 01 — Physical */}
        <div ref={(el) => void (panelEls.current[1] = el)} style={hidden} className="pointer-events-none absolute inset-0 flex items-start pb-10 pt-[var(--pyr-bottom,14rem)] will-change-transform max-lg:[&>*]:self-stretch lg:pb-0 lg:pt-28">
          <Container fill>
            <ChapterHeader index="01" eyebrowText="Physical infrastructure" heading={PHYSICAL.heading} body={PHYSICAL.body} />
            <div className="mt-6 max-lg:min-h-0 max-lg:flex-1 lg:mt-14">
              <MediaTabs
                tabs={PHYSICAL.tabs}
                variant="clip"
                playing={stop === 1 && visible}
                label="Printing, warehousing, shipping and customs"
              />
            </div>
          </Container>
        </div>

        {/* 02 — Digital */}
        <div ref={(el) => void (panelEls.current[2] = el)} style={hidden} className="pointer-events-none absolute inset-0 flex items-start pb-10 pt-[var(--pyr-bottom,14rem)] will-change-transform max-lg:[&>*]:self-stretch lg:pb-0 lg:pt-28">
          <Container fill>
            <ChapterHeader index="02" eyebrowText="Digital infrastructure" heading={DIGITAL.heading} body={DIGITAL.body} />
            <div className="mt-6 max-lg:min-h-0 max-lg:flex-1 lg:mt-14">
              <MediaTabs
                tabs={DIGITAL.tabs}
                variant="screen"
                playing={stop === 2 && visible}
                label="Recognition, storefronts, integrations and controls"
              />
            </div>
          </Container>
        </div>

        {/* 03 — People */}
        <div ref={(el) => void (panelEls.current[3] = el)} style={hidden} className="pointer-events-none absolute inset-0 flex items-start pb-10 pt-[var(--pyr-bottom,14rem)] will-change-transform max-lg:[&>*]:self-stretch lg:pb-0 lg:pt-28">
          <Container fill>
            <ChapterHeader index="03" eyebrowText="People infrastructure" heading={PEOPLE.heading} body={PEOPLE.body} />
            <div className="mt-6 max-lg:min-h-0 max-lg:flex-1 lg:mt-14">
              <PeopleDiagram />
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}

function Container({ children, fill = false }: { children: React.ReactNode; fill?: boolean }) {
  return (
    <div
      className={`mx-auto w-full max-w-[90rem] px-section-x-sm md:px-section-x-md lg:px-[7.5rem] ${
        fill ? "max-lg:flex max-lg:h-full max-lg:flex-col" : ""
      }`}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */

/** Reduced-motion / paused: the same content, stacked, no pin and no WebGL. */
function StaticInfra() {
  return (
    <section
      aria-label="The Stadium infrastructure"
      className="relative flex flex-col gap-24 bg-black py-16 text-white md:py-24"
    >
      <Container>
        <IntroCopy />
      </Container>
      <Container>
        <ChapterHeader index="01" eyebrowText="Physical infrastructure" heading={PHYSICAL.heading} body={PHYSICAL.body} />
        <div className="mt-8">
          <MediaTabs
            tabs={PHYSICAL.tabs}
            variant="clip"
            playing={false}
            label="Printing, warehousing, shipping and customs"
          />
        </div>
      </Container>
      <Container>
        <div>
          <ChapterHeader index="02" eyebrowText="Digital infrastructure" heading={DIGITAL.heading} body={DIGITAL.body} />
          <div className="mt-8">
            <MediaTabs
              tabs={DIGITAL.tabs}
              variant="screen"
              playing={false}
              label="Recognition, storefronts, integrations and controls"
            />
          </div>
        </div>
      </Container>
      <Container>
        <ChapterHeader index="03" eyebrowText="People infrastructure" heading={PEOPLE.heading} body={PEOPLE.body} />
        <div className="mt-8">
          <PeopleDiagram />
        </div>
      </Container>
    </section>
  );
}

