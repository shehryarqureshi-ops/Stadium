"use client";

import { useEffect, useRef, useState } from "react";

/* "From the platform to the doorstep" — doorstep beat of the dark block, synced
   to Figma 2:33443. Centered blue eyebrow + 55px heading, then a frosted
   near-black r24 card (black/90 + #4d4d4d hairline + backdrop-blur) floating over
   a bright #0b7afc bloom: an 8-step pill list beside a video panel.

   Selecting a step plays that step's clip in the right panel. Videos are
   data-driven — add a file under public/videos/infrastructure/ and set its path
   on the matching step below; steps without a `video` fall back to the doorstep
   still. Clips are muted + looping and only play while the section is on-screen
   (they're large, so we don't stream them off-screen); reduced-motion users get
   the poster with native controls instead of autoplay. */

type Step = { num: string; label: string; video?: string };

const steps: Step[] = [
  {
    num: "01",
    label: "Printing & Production",
    video: "/videos/infrastructure/printing.mp4",
  },
  {
    num: "02",
    label: "Warehousing & Storage",
    video: "/videos/infrastructure/warehousing.mp4",
  },
  {
    num: "03",
    label: "Shipping & Delivery",
    video: "/videos/infrastructure/shipping.mp4",
  },
  { num: "04", label: "Customs, Tax, & Compliance" },
  { num: "05", label: "Integrations & Automated Gifting" },
  { num: "06", label: "Platform Controls" },
  { num: "07", label: "Brand Controls" },
  { num: "08", label: "Security & Reliability" },
];

export default function Infrastructure() {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeStep = steps[active];

  /* Honor the OS reduced-motion setting (and keep it live). */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /* Only stream/play the clip while the panel is on-screen — the files are
     large, and playing off-screen wastes bandwidth (codebase pattern). */
  useEffect(() => {
    const el = panelRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Play the active clip when it's on-screen; pause otherwise. Re-runs on tab
     change because the <video> is keyed by src (fresh element each select). */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    if (inView && !reduceMotion) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [inView, reduceMotion, active]);

  return (
    <section className="relative overflow-hidden bg-[#000000] px-section-x-sm py-section-y-sm md:px-section-x-md md:py-section-y-md lg:px-section-x-lg lg:py-section-y-lg lg:pb-60">
      <div className="relative mx-auto flex w-full max-w-content flex-col gap-10 lg:gap-20">
        {/* centered header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <p
            data-animation="reveal"
            className="font-sans text-[0.75rem] font-bold uppercase leading-4 tracking-[0.0625rem] text-[#a4cefe]"
          >
            The Stadium Infrastructure
          </p>
          <h2
            data-animation="reveal"
            className="font-display text-heading-sm text-white md:text-heading-md lg:text-[3.4375rem] lg:leading-[3.75rem] lg:tracking-[-0.075rem]"
          >
            From the platform to the doorstep
          </h2>
        </div>

        {/* card zone — bright blue bloom behind a frosted dark card (Figma) */}
        <div className="relative">
          {/* #0b7afc glow, bottom-weighted behind the card (Ellipse 22) */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[50%] z-0 h-[24rem] w-[68.5rem] max-w-[105%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[#0b7afc] opacity-70 blur-[170px]"
          />
          {/* card — step pills + video */}
          <div
            data-animation="reveal"
            className="relative z-10 grid grid-cols-1 gap-2.5 rounded-[1.5rem] border-t border-[#4d4d4d] bg-black/90 p-2.5 backdrop-blur-[30px] lg:grid-cols-[26.25rem_minmax(0,1fr)]"
          >
            {/* step pills */}
            <div className="flex flex-col gap-2.5">
              {steps.map((s, i) => {
                const on = i === active;
                return (
                  <button
                    key={s.num}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-current={on}
                    className={`flex h-[3.75rem] w-full items-center gap-3.5 rounded-lg px-3.5 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 cursor-pointer ${
                      on
                        ? "bg-white/20 backdrop-blur-[18px]"
                        : "bg-white/[0.08]"
                    }`}
                  >
                    <span
                      className={`font-sans text-[0.75rem] font-semibold tabular-nums tracking-[0.0725rem] ${
                        on ? "text-[#a4cefe]" : "text-white/30"
                      }`}
                    >
                      {s.num}
                    </span>
                    <span
                      className={`font-sans text-[1.125rem] font-normal leading-7 tracking-[0.0156rem] ${
                        on ? "text-white" : "text-white/33"
                      }`}
                    >
                      {s.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* video panel — plays the active step's clip */}
            <div
              ref={panelRef}
              className="relative min-h-[20rem] overflow-hidden rounded-lg bg-[#0e0f11] lg:min-h-0"
            >
              {activeStep.video ? (
                <video
                  key={activeStep.video}
                  ref={videoRef}
                  src={activeStep.video}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  controls={reduceMotion}
                  className={`absolute inset-0 h-full w-full object-cover ${
                    reduceMotion ? "" : "infra-video-in"
                  }`}
                />
              ) : (
                <div className="absolute"></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
