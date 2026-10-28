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

type Step = { num: string; label: string; video?: string; poster?: string };

const steps: Step[] = [
  {
    num: "01",
    label: "Printing & Production",
    video: "/videos/infrastructure/printing.mp4",
    poster: "/videos/infrastructure/printing.webp",
  },
  {
    num: "02",
    label: "Warehousing & Storage",
    video: "/videos/infrastructure/warehousing.mp4",
    poster: "/videos/infrastructure/warehousing.webp",
  },
  {
    num: "03",
    label: "Shipping & Delivery",
    video: "/videos/infrastructure/shipping.mp4",
    poster: "/videos/infrastructure/shipping.webp",
  },
  { num: "04", label: "Customs, Tax, & Compliance" },
  { num: "05", label: "Integrations & Automated Gifting" },
  { num: "06", label: "Platform Controls" },
  { num: "07", label: "Asset Library" },
  { num: "08", label: "Security & Reliability" },
];

export default function Infrastructure() {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
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

  /* Below md the section swaps to the immersive stage + chip rail (Figma
     Option 3). Only one layout mounts a <video> at a time. */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 47.999rem)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const go = (dir: 1 | -1) =>
    setActive((a) => (a + dir + steps.length) % steps.length);

  /* Keep the active chip in view inside the rail (scroll the rail only —
     never the page). */
  useEffect(() => {
    const rail = railRef.current;
    const chip = rail?.children[active] as HTMLElement | undefined;
    if (!rail || !chip) return;
    rail.scrollTo({
      left: chip.offsetLeft - rail.clientWidth / 2 + chip.clientWidth / 2,
      behavior: "smooth",
    });
  }, [active]);

  /* Only stream/play the clip while the panel is on-screen — the files are
     large, and playing off-screen wastes bandwidth (codebase pattern). */
  useEffect(() => {
    const el = isMobile ? stageRef.current : panelRef.current;
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
  }, [isMobile]);

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
            className="pointer-events-none absolute left-1/2 top-[50%] z-0 h-[52rem] w-[100rem] max-w-[160%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(11,122,252,0.5)_0%,rgba(11,122,252,0.42)_38%,rgba(11,122,252,0.16)_68%,rgba(11,122,252,0)_100%)]"
          />
          {/* card — step pills + video */}
          <div
            data-animation="reveal"
            className="relative z-10 grid grid-cols-1 gap-2.5 rounded-[1.5rem] border-t max-md:hidden border-[#4d4d4d] bg-black/90 p-2.5 lg:backdrop-blur-[30px] lg:grid-cols-[26.25rem_minmax(0,1fr)]"
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
                        ? "bg-white/20 lg:backdrop-blur-[18px]"
                        : "bg-white/[0.08]"
                    }`}
                  >
                    <span
                      className={`font-sans text-[0.75rem] font-semibold tabular-nums tracking-[0.0725rem] ${
                        on ? "text-[#a4cefe]" : "text-white/60"
                      }`}
                    >
                      {s.num}
                    </span>
                    <span
                      className={`font-sans text-[1.125rem] font-normal leading-7 tracking-[0.0156rem] ${
                        on ? "text-white" : "text-white/60"
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
              {activeStep.video && !isMobile ? (
                <video
                  key={activeStep.video}
                  ref={isMobile ? undefined : videoRef}
                  src={activeStep.video}
                  poster={activeStep.poster}
                  muted
                  loop
                  playsInline
                  preload="none"
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

          {/* mobile card — immersive video stage + swipeable chip rail
              (Figma Option 3). Everything fits one viewport: no scrolling
              back up to change step. */}
          <div
            data-animation="reveal"
            className="relative z-10 flex flex-col gap-2.5 rounded-[1.5rem] border-t border-[#4d4d4d] bg-black/90 p-2.5 md:hidden"
          >
            <div
              ref={stageRef}
              onTouchStart={(e) => {
                touchX.current = e.touches[0].clientX;
              }}
              onTouchEnd={(e) => {
                if (touchX.current === null) return;
                const dx = e.changedTouches[0].clientX - touchX.current;
                touchX.current = null;
                if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
              }}
              className="relative flex h-[25rem] flex-col justify-between overflow-hidden rounded-2xl bg-[#0e0f11] p-3.5 [touch-action:pan-y]"
            >
              {activeStep.poster && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={activeStep.poster}
                  src={activeStep.poster}
                  alt=""
                  className="infra-video-in absolute inset-0 h-full w-full object-cover"
                />
              )}
              {activeStep.video && isMobile && (
                <video
                  key={activeStep.video}
                  ref={videoRef}
                  src={activeStep.video}
                  poster={activeStep.poster}
                  muted
                  loop
                  playsInline
                  preload="none"
                  controls={reduceMotion}
                  className={`absolute inset-0 h-full w-full object-cover ${
                    reduceMotion ? "" : "infra-video-in"
                  }`}
                />
              )}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-transparent via-35% to-black/90"
              />
              {/* story-style progress */}
              <div className="relative flex gap-1" aria-hidden>
                {steps.map((s, i) => (
                  <span
                    key={s.num}
                    className={`h-[0.1875rem] flex-1 rounded-full ${
                      i === active ? "bg-white" : "bg-white/35"
                    }`}
                  />
                ))}
              </div>
              {/* title + arrows */}
              <div className="relative flex items-end gap-3">
                <div
                  key={active}
                  className="infra-title-in flex min-w-0 flex-1 flex-col gap-1.5"
                  aria-live="polite"
                >
                  <span className="font-sans text-[0.75rem] font-semibold leading-4 tracking-[0.0725rem] text-[#a4cefe]">
                    {activeStep.num} / {String(steps.length).padStart(2, "0")}
                  </span>
                  <span className="font-display text-[1.625rem] leading-[1.875rem] tracking-[-0.0188rem] text-white">
                    {activeStep.label}
                  </span>
                </div>
                <div className="flex gap-2">
                  {([-1, 1] as const).map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => go(d)}
                      aria-label={d === 1 ? "Next step" : "Previous step"}
                      className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/20 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="size-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d={d === 1 ? "M9 18l6-6-6-6" : "M15 18l-6-6 6-6"} />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* chip rail */}
            <div className="relative">
              <div
                ref={railRef}
                className="flex gap-2 overflow-x-auto pb-1 pt-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {steps.map((s, i) => {
                  const on = i === active;
                  return (
                    <button
                      key={s.num}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-current={on}
                      className={`flex h-11 shrink-0 cursor-pointer items-center gap-2 rounded-full pl-3.5 pr-4 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
                        on ? "bg-white/20" : "bg-white/[0.08]"
                      }`}
                    >
                      <span
                        className={`font-sans text-[0.75rem] font-semibold tabular-nums tracking-[0.0725rem] ${
                          on ? "text-[#a4cefe]" : "text-white/60"
                        }`}
                      >
                        {s.num}
                      </span>
                      <span
                        className={`font-sans text-[0.9375rem] leading-5 tracking-[0.0125rem] ${
                          on ? "text-white" : "text-white/65"
                        }`}
                      >
                        {s.label}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-r from-transparent to-black/95"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
