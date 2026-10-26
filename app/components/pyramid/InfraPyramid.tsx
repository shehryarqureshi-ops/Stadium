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
  PeopleCarousel,
} from "./Panels";
import {
  PIN_UNITS,
  STOPS,
  easeInOut,
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

export default function InfraPyramid() {
  const reduced = usePrefersReducedMotion();
  return reduced ? <StaticInfra /> : <PinnedInfra />;
}

/* ------------------------------------------------------------------ */

function PinnedInfra() {
  const outer = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const panelEls = useRef<(HTMLDivElement | null)[]>([]);
  const [visible, setVisible] = useState(false);
  const [mountCanvas, setMountCanvas] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);
  const [stop, setStop] = useState(0);
  const stopRef = useRef(0);
  const pillEl = useRef<HTMLDivElement>(null);
  const pillPos = useRef({ x: 0, y: 0, o: 0 });
  const lastHover = useRef(0);
  const [pillIdx, setPillIdx] = useState(0);
  const glide = useRef(0);
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
    const origins = ["left center", "left center", "right center", "left center"];
    let armed = false;

    const tick = (_t: number, deltaMs: number) => {
      if (!visibleRef.current) return;
      const dt = Math.min(deltaMs / 1000, 1 / 20);
      const { top, vh, vw } = metrics.current;
      const u = Math.min(PIN_UNITS, Math.max(0, (window.scrollY - top) / vh));
      pyramidStore.u = u;

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

      /* click-lock: hover/click return only once the reader is back on the intro */
      if (pyramidStore.locked) {
        if (u > 0.5) armed = true;
        else if (armed && u < 0.05) {
          pyramidStore.locked = false;
          armed = false;
        }
      }

      /* floating layer pill: rests on its slice, follows the cursor while hovered */
      const pill = pillEl.current;
      if (pill) {
        const h = pyramidStore.hover;
        if (h >= 0) lastHover.current = h;
        const anchor = pyramidStore.anchors[lastHover.current];
        const tx = h >= 0 ? pyramidStore.pointer.x : anchor.x;
        const ty = h >= 0 ? pyramidStore.pointer.y - 30 : anchor.y;
        const k = 1 - Math.exp(-dt * 14);
        pillPos.current.x += (tx - pillPos.current.x) * k;
        pillPos.current.y += (ty - pillPos.current.y) * k;
        pillPos.current.o += ((h >= 0 ? 1 : 0) - pillPos.current.o) * k;
        pill.style.transform = `translate3d(${pillPos.current.x.toFixed(1)}px, ${pillPos.current.y.toFixed(1)}px, 0) translate(-50%, -50%)`;
        pill.style.opacity = pillPos.current.o.toFixed(3);
      }
      if (bestAbs < 0.5 && best !== stopRef.current) {
        stopRef.current = best;
        setStop(best);
      }
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  /* intro slices: hover label + click → the only smooth scroll on the page */
  useEffect(() => {
    const stopGlide = () => cancelAnimationFrame(glide.current);
    const events = ["wheel", "touchstart", "keydown", "mousedown"] as const;
    events.forEach((e) => window.addEventListener(e, stopGlide, { passive: true }));

    pyramidStore.onHover = (i) => {
      if (i >= 0) setPillIdx(i);
      if (stage.current) stage.current.style.cursor = i >= 0 ? "pointer" : "";
    };
    pyramidStore.onSelect = (i) => {
      pyramidStore.locked = true;
      pyramidStore.hover = -1;
      const { top, vh } = metrics.current;
      const to = top + STOPS[i + 1] * vh;
      const from = window.scrollY;
      const dur = 1700;
      const t0 = performance.now();
      stopGlide();
      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / dur);
        window.scrollTo({ top: from + (to - from) * easeInOut(p), behavior: "instant" });
        if (p < 1) glide.current = requestAnimationFrame(step);
      };
      glide.current = requestAnimationFrame(step);
    };
    return () => {
      events.forEach((e) => window.removeEventListener(e, stopGlide));
      pyramidStore.onHover = undefined;
      pyramidStore.onSelect = undefined;
      stopGlide();
    };
  }, []);

  /* chapters 1–3 start hidden so SSR / first paint never stacks them on the intro */
  const hidden = { opacity: 0, visibility: "hidden" } as const;

  return (
    <section
      ref={outer}
      aria-label="The Stadium infrastructure"
      className="relative bg-black text-white"
      style={{ height: `calc(100svh * ${1 + PIN_UNITS})` }}
    >
      <div ref={stage} className="sticky top-0 h-svh w-full overflow-hidden">
        {/* the same twinkling starfield as the globe section above, so the two read as one sky */}
        <Starfield className="absolute inset-0 h-full w-full" />

        {/* the first frames compile shaders — fade the canvas in once it is actually drawing */}
        <div
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-out ${canvasReady ? "opacity-100" : "opacity-0"}`}
        >
          {mountCanvas && <PyramidCanvas active={visible} onReady={() => setCanvasReady(true)} />}
        </div>

        {/* hover pill — PHYSICAL / DIGITAL / PEOPLE over the slice */}
        <div
          ref={pillEl}
          aria-hidden
          style={{ opacity: 0 }}
          className="pointer-events-none absolute left-0 top-0 z-10 flex h-button-h items-center rounded-full bg-white px-[1.375rem] font-sans text-button-primary uppercase text-ink shadow-button"
        >
          {LAYERS[pillIdx]}
        </div>

        {/* 00 — intro */}
        <div
          ref={(el) => void (panelEls.current[0] = el)}
          className="pointer-events-none absolute inset-0 flex items-end pb-24 will-change-transform lg:items-center lg:pb-0"
        >
          <Container>
            <div className="lg:pl-20">
              <IntroCopy />
            </div>
          </Container>
        </div>

        {/* 01 — Physical (content rises up the left) */}
        <div ref={(el) => void (panelEls.current[1] = el)} style={hidden} className="pointer-events-none absolute inset-0 flex items-end pb-6 will-change-transform md:pb-10 lg:items-center lg:pb-0 lg:pt-16">
          <Container>
            <ChapterHeader eyebrowText="Physical infrastructure" heading={PHYSICAL.heading} body={PHYSICAL.body} />
            <div className="mt-5 lg:mt-14 lg:w-pyramid-card">
              <MediaTabs
                tabs={PHYSICAL.tabs}
                variant="clip"
                playing={stop === 1 && visible}
                mediaClass="aspect-[16/9] md:aspect-[2/1] lg:aspect-auto lg:h-[16.875rem]"
                label="Printing, warehousing, shipping and customs"
              />
            </div>
          </Container>
        </div>

        {/* 02 — Digital (content rises up the right) */}
        <div ref={(el) => void (panelEls.current[2] = el)} style={hidden} className="pointer-events-none absolute inset-0 flex items-end pb-6 will-change-transform md:pb-10 lg:items-center lg:pb-0 lg:pt-16">
          <Container>
            <div className="lg:ml-auto lg:w-pyramid-card">
              <ChapterHeader eyebrowText="Digital infrastructure" heading={DIGITAL.heading} body={DIGITAL.body} />
              <div className="mt-5 lg:mt-14">
                <MediaTabs
                  tabs={DIGITAL.tabs}
                  variant="screen"
                  playing={stop === 2 && visible}
                  mediaClass="aspect-[16/9] md:aspect-[2/1] lg:aspect-auto lg:h-[18.75rem]"
                  label="Recognition, storefronts, integrations and controls"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* 03 — People (content rises up the left) */}
        <div ref={(el) => void (panelEls.current[3] = el)} style={hidden} className="pointer-events-none absolute inset-0 flex items-end pb-6 will-change-transform md:pb-10 lg:items-center lg:pb-0 lg:pt-16">
          <Container>
            <ChapterHeader eyebrowText="People infrastructure" heading={PEOPLE.heading} body={PEOPLE.body} />
            <div className="mt-5 lg:mt-14">
              <PeopleCarousel reducedMotion={false} />
            </div>
          </Container>
        </div>

      </div>
    </section>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[90rem] px-section-x-sm md:px-section-x-md lg:px-[7.5rem]">
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
        <ChapterHeader eyebrowText="Physical infrastructure" heading={PHYSICAL.heading} body={PHYSICAL.body} />
        <div className="mt-8 lg:w-pyramid-card">
          <MediaTabs
            tabs={PHYSICAL.tabs}
            variant="clip"
            playing={false}
            mediaClass="aspect-[16/9] md:aspect-[2/1] lg:aspect-auto lg:h-[16.875rem]"
            label="Printing, warehousing, shipping and customs"
          />
        </div>
      </Container>
      <Container>
        <div className="lg:ml-auto lg:w-pyramid-card">
          <ChapterHeader eyebrowText="Digital infrastructure" heading={DIGITAL.heading} body={DIGITAL.body} />
          <div className="mt-8">
            <MediaTabs
              tabs={DIGITAL.tabs}
              variant="screen"
              playing={false}
              mediaClass="aspect-[16/9] md:aspect-[2/1] lg:aspect-auto lg:h-[18.75rem]"
              label="Recognition, storefronts, integrations and controls"
            />
          </div>
        </div>
      </Container>
      <Container>
        <ChapterHeader eyebrowText="People infrastructure" heading={PEOPLE.heading} body={PEOPLE.body} />
        <div className="mt-8">
          <PeopleCarousel reducedMotion />
        </div>
      </Container>
    </section>
  );
}

