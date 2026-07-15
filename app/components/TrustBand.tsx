"use client";

import { useState } from "react";

/* Logo heights OPTICALLY NORMALIZED 2026-06-12 (canvas ink-area audit,
   not raw Figma px): each logo's dark-pixel mass was measured against the
   set median; heights nudged so every mark carries ≈equal visual weight.
   Bloomberg was 1.78× the median (21→16); Google/Accenture were ~0.8×
   (24→26); Amazon ~1.16× (24→23). Widths follow each SVG's aspect. */
const LOGOS = [
  { src: "/trust-spotify.svg", alt: "Spotify", width: 81, height: 24 },
  { src: "/trust-amazon.svg", alt: "Amazon", width: 77, height: 20 },
  { src: "/trust-pinterest.svg", alt: "Pinterest", width: 87, height: 25 },
  { src: "/trust-accenture.svg", alt: "Accenture", width: 91, height: 24 },
  { src: "/trust-bloomberg.svg", alt: "Bloomberg", width: 90, height: 19 },
  { src: "/trust-salesforce.svg", alt: "Salesforce", width: 37, height: 27 },
  { src: "/trust-netflix.svg", alt: "Netflix", width: 75, height: 25 },
  { src: "/trust-google.svg", alt: "Google", width: 80, height: 25 },
];

/* One copy is ~56–68rem wide (gap-dependent). A seamless loop needs the
   track to stay wider than the viewport for the whole cycle, i.e.
   (COPIES - 1) × copyWidth ≥ viewport. 4 copies covers viewports up to
   ~2600px; the keyframes shift by exactly one copy (-25%). */
const COPIES = 4;

export default function TrustBand() {
  /* WCAG 2.2.2 mechanism, restyled per user 2026-06-12 ("no visible
     button — hover-pause is smoother"): pointer users pause by hovering
     the strip (pure CSS, resumes on leave); keyboard users get a
     focus-revealed control (skip-link pattern); touch users (coarse
     pointer, no hover) tap the strip to toggle. All modalities covered,
     zero visible chrome by default. */
  const [paused, setPaused] = useState(false);
  const tapToggle = () => {
    if (window.matchMedia("(pointer: coarse)").matches) setPaused((p) => !p);
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 bg-surface-base py-6 md:gap-6 md:py-10 lg:gap-8 lg:py-14">
      <style>{`
        @keyframes trust-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-${100 / COPIES}%); }
        }
        .trust-marquee-track {
          animation: trust-marquee 45s linear infinite;
        }
        .trust-strip:hover .trust-marquee-track {
          animation-play-state: paused;
        }
        /* keyboard-only control: invisible and inert until focused
           (skip-link pattern) */
        .trust-pause {
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s;
        }
        .trust-pause:focus-visible {
          opacity: 1;
          pointer-events: auto;
        }
        @media (prefers-reduced-motion: reduce) {
          .trust-marquee-track { animation: none; }
          /* no motion -> no control needed */
          .trust-pause { display: none; }
        }
      `}</style>

      {/* h2 (was a p, 2026-06-12): the band is a real section of social
          proof — the eyebrow IS its heading, styled unchanged */}
      <h2
        className="px-section-x-sm text-center font-sans text-eyebrow-sm uppercase tracking-[0.0625rem] text-[#919295] md:whitespace-nowrap md:text-eyebrow-md lg:text-eyebrow-lg lg:leading-6"
        data-animation="reveal"
      >
        10,000+ companies count on Stadium
      </h2>

      {/* tap toggles only on coarse pointers — mouse users have hover */}
      <div
        data-animation="reveal"
        className="trust-strip relative h-[1.75rem] w-full overflow-hidden lg:h-[2.5rem]"
        onClick={tapToggle}
      >
        {/* Identical copies with trailing padding equal to the gap, so a
            shift of exactly one copy width lands on an identical frame */}
        <div
          className="trust-marquee-track flex h-full w-max items-end"
          style={paused ? { animationPlayState: "paused" } : undefined}
        >
          {Array.from({ length: COPIES }, (_, copy) => (
            <div
              key={copy}
              aria-hidden={copy > 0 || undefined}
              className="flex items-end gap-[2rem] pr-[2rem] md:gap-[2.5rem] md:pr-[2.5rem] lg:gap-[3.5rem] lg:pr-[3.5rem]"
            >
              {LOGOS.map((logo) => (
                <img
                  key={logo.alt}
                  src={logo.src}
                  alt={copy === 0 ? logo.alt : ""}
                  width={logo.width}
                  height={logo.height}
                  loading="lazy"
                  /* rem height (not attribute px) so logos scale with the
                     fluid root font-size above 1440 */
                  style={{ height: `${logo.height / 16}rem` }}
                  /* Universal 600 (#4f5052) feel — softened further from the
                     full-black marks to a refined grey so they read "visible
                     but less dominant" (Stripe/Linear restraint). Logos are
                     brand marks, WCAG-exempt. */
                  className="w-auto max-w-none shrink-0 opacity-60"
                />
              ))}
            </div>
          ))}
        </div>

        {/* Edge fades */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-[3.5rem] bg-linear-to-r from-surface-base to-transparent md:w-[5rem] lg:w-[11.25rem]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-[3.5rem] bg-linear-to-l from-surface-base to-transparent md:w-[5rem] lg:w-[11.25rem]"
        />

        {/* Keyboard 2.2.2 mechanism — focus-revealed (invisible to pointer
            users, who pause via hover; touch toggles via strip tap);
            hidden under reduced-motion via the style block. */}
        <button
          type="button"
          aria-pressed={paused}
          aria-label={paused ? "Play logo animation" : "Pause logo animation"}
          onClick={(e) => {
            e.stopPropagation();
            setPaused((p) => !p);
          }}
          className="trust-pause absolute right-2 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-grey-200 bg-surface-base text-grey-500 md:right-4"
        >
          {paused ? (
            <svg
              className="size-3.5 translate-x-px"
              viewBox="0 0 14 14"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M3.5 2.3c0-.6.65-.97 1.16-.66l7.06 4.2a.77.77 0 0 1 0 1.32l-7.06 4.2a.77.77 0 0 1-1.16-.66V2.3Z" />
            </svg>
          ) : (
            <svg
              className="size-3.5"
              viewBox="0 0 14 14"
              fill="currentColor"
              aria-hidden="true"
            >
              <rect x="3" y="2" width="3" height="10" rx="1" />
              <rect x="8" y="2" width="3" height="10" rx="1" />
            </svg>
          )}
        </button>
      </div>
    </section>
  );
}
