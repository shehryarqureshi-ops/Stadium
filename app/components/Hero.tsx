"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HERO_SLIDES, HERO_SLIDE_INTERVAL_MS } from "../data/heroRotation";
import HeroBackgroundVideo from "./HeroBackgroundVideo";
import WordShuffle from "./WordShuffle";

/* Hero owns the shared rotation index so the headline word and the background
   video advance together (single source of truth = HERO_SLIDES). The timer is
   paused while the section is off-screen or the tab is hidden, and disabled
   entirely under reduced motion (the video component then shows its poster —
   the original static hero photo). */

const HERO_WORDS = HERO_SLIDES.map((s) => s.word);

export default function Hero() {
  const [index, setIndex] = useState(0);
  /* Slide that is actually on screen (its clip is playing / poster-only). The
     shared clock below only runs while readyIndex === index. */
  const [readyIndex, setReadyIndex] = useState<number | null>(null);
  const elapsedRef = useRef(0);
  const [reduce, setReduce] = useState(false);
  const [playing, setPlaying] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  /* Reduced motion (kept live). */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /* Play only while the hero is on-screen and the tab is visible. */
  useEffect(() => {
    const el = sectionRef.current;
    let inView = true;
    const update = () => setPlaying(inView && !document.hidden);
    let io: IntersectionObserver | undefined;
    if (el && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        ([entry]) => {
          inView = entry.isIntersecting;
          update();
        },
        { threshold: 0.05 },
      );
      io.observe(el);
    }
    document.addEventListener("visibilitychange", update);
    return () => {
      io?.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  const handleReady = useCallback((i: number) => setReadyIndex(i), []);

  /* Safety net: if a clip never reports playback (autoplay blocked, stalled
     network) don't freeze the rotation on it. */
  useEffect(() => {
    if (reduce || HERO_SLIDES.length <= 1) return;
    const t = setTimeout(() => setReadyIndex(index), 4000);
    return () => clearTimeout(t);
  }, [index, reduce]);

  /* The word and the video share ONE clock. It starts when the new slide is
     actually showing and flips both on the same render HERO_SLIDE_INTERVAL_MS
     later. Pausing (off-screen / tab hidden) freezes the clock together with
     the video and resumes with the time that remained. */
  useEffect(() => {
    if (reduce || HERO_SLIDES.length <= 1) return;
    if (readyIndex !== index || !playing) return;
    const started = performance.now();
    let fired = false;
    const t = setTimeout(
      () => {
        fired = true;
        elapsedRef.current = 0;
        setIndex((i) => (i + 1) % HERO_SLIDES.length);
      },
      Math.max(0, HERO_SLIDE_INTERVAL_MS - elapsedRef.current),
    );
    return () => {
      clearTimeout(t);
      if (!fired) elapsedRef.current += performance.now() - started;
    };
  }, [index, readyIndex, playing, reduce]);

  return (
    /* Fixed-height frame (min-h tokens), content vertically CENTERED
       (2026-06-11 Figma rev); mobile padding-y is hero-specific 48px.
       +4rem on min-height and padding-top compensates for the fixed
       transparent nav overlaying the hero (shopify.com pattern) — content
       positions stay identical to the Figma frame. */
    <section
      ref={sectionRef}
      className="relative flex min-h-0 flex-col items-start justify-center overflow-hidden bg-white px-0 pb-0 pt-16 md:min-h-[calc(var(--spacing-hero-md)+4rem)] md:bg-black md:px-section-x-md md:pb-section-y-md md:pt-[8rem] lg:min-h-svh lg:justify-end lg:px-section-x-lg lg:pb-hero-pb-lg lg:pt-[10rem]"
    >
      {/* full-bleed rotating video background (poster = the hero photo, so no
          black flash before/without playback), with the same contrast scrims
          layered over it that the still photo used. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 max-md:hidden">
        <HeroBackgroundVideo
          slides={HERO_SLIDES}
          index={index}
          playing={playing}
          reduce={reduce}
          onReady={handleReady}
        />
        <div className="absolute inset-0 bg-[image:var(--gradient-hero-base-scrim)]" />
        {/* a11y scrim only below lg — at lg the Figma gradient (base scrim
            above) is used as-is (frame 6525:11943) */}
        <div className="absolute inset-0 bg-[image:var(--gradient-hero-scrim)] lg:hidden" />
        {/* contrast scrim for the transparent fixed nav — the photo's sky
            and clouds are near-white at the top, where the nav's white
            links would otherwise fail WCAG contrast */}
        <div className="absolute inset-x-0 top-0 h-40 bg-[image:var(--gradient-hero-top-scrim)]" />
        {/* below-lg contrast floor (2026-06-12 audit): narrow crops put
            the photo's white wall behind full-width text where the 90deg
            scrim has faded — pixel-sampled mins hit 1.51:1. A flat 60%
            ink overlay floors white text at ≥4.5:1 over pure white
            (Shopify's mobile heroes are uniformly dark by construction). */}
        <div className="absolute inset-0 bg-ink/60 lg:hidden" />
      </div>

      {/* PHONE (< md): the clip sits right under the white nav at 16:10 (cover); the copy
          follows on white. md+ keeps the full-bleed background above. */}
      <div aria-hidden className="relative aspect-[16/10] w-full overflow-hidden bg-black md:hidden">
        <HeroBackgroundVideo
          slides={HERO_SLIDES}
          index={index}
          playing={playing}
          reduce={reduce}
          allowOnPhone
          onReady={handleReady}
        />
      </div>

      {/* content row caps at 1200 and centers above 1380 (background stays full-bleed) */}
      <div className="relative mx-auto flex w-full max-w-content flex-col items-start gap-5 px-section-x-sm py-8 md:gap-9 md:px-0 md:py-0 lg:gap-0">
        {/* Header: title (eyebrow + headline) + supporting copy */}
        <p
          className="font-sans text-eyebrow-sm uppercase text-grey-500 md:text-eyebrow-md md:text-white lg:text-eyebrow-lg lg:leading-6 lg:mb-2"
          data-animation="reveal"
        >
          Global engagement infrastructure
        </p>
        <h1
          data-animation="reveal"
          className="w-full font-display text-[clamp(1.25rem,6.4vw,2rem)] leading-[1.25] text-ink md:text-ds-h2 md:text-white lg:text-ds-hero lg:mb-6"
        >
          {/* "Show up for your <word>" never wraps; the size above scales with the viewport so
              the longest word still fits one line on phones */}
          <span className="max-md:whitespace-nowrap">
            Show up for your <WordShuffle words={HERO_WORDS} index={index} />
          </span>{" "}
          {/* hard line break on phones + desktop (per Figma) */}
          <br aria-hidden className="md:hidden lg:block" />
          Everywhere, every time.
        </h1>
        <p
          data-animation="reveal"
          className="font-sans text-body-sm text-grey-600 md:max-w-[24rem] md:text-hero-body md:text-body-md lg:max-w-[42.5rem] lg:text-body-lg lg:tracking-[0.0156rem] lg:mb-8"
        >
          The platform behind recognition, swag, snacks, gifting, and hosted
          experiences.
        </p>

        {/* CTAs — system pills (h-button-h = 40px since the 2026-06-12
            user decision moved the whole system to 40; no hero exception).
            Hover + focus-visible per the quality bar. */}
        <div
          data-animation="reveal"
          className="flex w-full flex-col items-start gap-2 md:w-auto md:flex-row md:items-center md:gap-3 lg:gap-4"
        >
          <a
            href="/book-a-call"
            className="inline-flex h-button-h w-full items-center justify-center rounded-button bg-ink px-button-x font-sans text-button-primary uppercase text-white shadow-button inset-shadow-button transition-all duration-200 hover:bg-grey-700 active:scale-[0.98] focus-visible:outline-ink md:w-auto md:bg-white md:text-brand-hero md:hover:bg-grey-100 md:focus-visible:outline-white"
          >
            <span className="[text-box-trim:trim-both] [text-box-edge:cap_alphabetic]">
              Talk to sales
            </span>
          </a>
          <a
            href="/catalog"
            className="inline-flex h-button-h w-full items-center justify-center rounded-button border border-ink px-button-x font-sans text-button-primary uppercase text-ink transition-all duration-200 hover:bg-ink/5 active:scale-[0.98] focus-visible:outline-ink md:w-auto md:border-white md:text-white md:hover:bg-white/10 md:focus-visible:outline-white"
          >
            <span className="[text-box-trim:trim-both] [text-box-edge:cap_alphabetic]">
              Browse the catalog
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
