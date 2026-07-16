"use client";

import { useEffect, useRef, useState } from "react";
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

  /* `playing` is read through a ref so pausing/resuming (scroll, tab
     visibility) never tears down and restarts the timer below — that restart
     was what let the video loop extra times before the word caught up. */
  const playingRef = useRef(playing);
  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  /* One stable ticker owns the shared index, so the word and the video advance
     together on an exact 5s cadence. Ticks that land while paused (off-screen /
     tab hidden) are skipped instead of resetting the clock. */
  useEffect(() => {
    if (reduce || HERO_SLIDES.length <= 1) return;
    const id = setInterval(() => {
      if (!playingRef.current) return;
      setIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, HERO_SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    /* Fixed-height frame (min-h tokens), content vertically CENTERED
       (2026-06-11 Figma rev); mobile padding-y is hero-specific 48px.
       +4rem on min-height and padding-top compensates for the fixed
       transparent nav overlaying the hero (shopify.com pattern) — content
       positions stay identical to the Figma frame. */
    <section
      ref={sectionRef}
      className="relative flex min-h-[calc(var(--spacing-hero-sm)+4rem)] flex-col items-start justify-center overflow-hidden px-section-x-sm pb-12 pt-[7rem] md:min-h-[calc(var(--spacing-hero-md)+4rem)] md:px-section-x-md md:pb-section-y-md md:pt-[8rem] lg:min-h-[calc(var(--spacing-hero-lg)+4rem)] lg:px-section-x-lg lg:pb-section-y-lg lg:pt-[10rem] bg-black"
    >
      {/* full-bleed rotating video background (poster = the hero photo, so no
          black flash before/without playback), with the same contrast scrims
          layered over it that the still photo used. */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <HeroBackgroundVideo
          slides={HERO_SLIDES}
          index={index}
          playing={playing}
          reduce={reduce}
        />
        <div className="absolute inset-0 bg-[image:var(--gradient-hero-base-scrim)]" />
        <div className="absolute inset-0 bg-[image:var(--gradient-hero-scrim)]" />
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

      {/* content row caps at 1200 and centers above 1380 (background stays full-bleed) */}
      <div className="relative mx-auto flex w-full max-w-content flex-col items-start gap-5 md:gap-9 lg:gap-0">
        {/* Header: title (eyebrow + headline) + supporting copy */}
        <p
          className="font-sans text-eyebrow-sm uppercase md:text-eyebrow-md lg:text-eyebrow-lg lg:leading-6 text-white lg:mb-2"
          data-animation="reveal"
        >
          Global engagement infrastructure
        </p>
        <h1
          data-animation="reveal"
          className="w-full font-display text-ds-h4 md:text-ds-h2 lg:text-ds-hero text-white lg:mb-6"
        >
          Show up for your <WordShuffle words={HERO_WORDS} index={index} />{" "}
          {/* hard line break on desktop only (per Figma) */}
          <br aria-hidden className="hidden lg:block" />
          Everywhere, every time.
        </h1>
        <p
          data-animation="reveal"
          className="font-sans text-body-sm text-hero-body md:max-w-[30rem] md:text-body-md lg:max-w-[42.5rem] lg:text-body-lg lg:tracking-[0.0156rem] lg:mb-8"
        >
          The platform behind recognition, swag, and gifting worldwide.
        </p>

        {/* CTAs — system pills (h-button-h = 40px since the 2026-06-12
            user decision moved the whole system to 40; no hero exception).
            Hover + focus-visible per the quality bar. */}
        <div
          data-animation="reveal"
          className="flex w-full flex-col items-start gap-2 md:w-auto md:flex-row md:items-center md:gap-3 lg:gap-4"
        >
          <a
            href="#"
            className="inline-flex h-button-h w-full items-center justify-center rounded-button bg-white px-button-x font-sans text-button-primary uppercase text-brand-hero shadow-button inset-shadow-button transition-all duration-200 hover:bg-grey-100 active:scale-[0.98] focus-visible:outline-white md:w-auto"
          >
            <span className="[text-box-trim:trim-both] [text-box-edge:cap_alphabetic]">
              Get started
            </span>
          </a>
          <a
            href="#"
            className="inline-flex h-button-h w-full items-center justify-center rounded-button border border-white px-button-x font-sans text-button-primary uppercase text-white transition-all duration-200 hover:bg-white/10 active:scale-[0.98] focus-visible:outline-white md:w-auto"
          >
            <span className="[text-box-trim:trim-both] [text-box-edge:cap_alphabetic]">
              Talk to sales
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
