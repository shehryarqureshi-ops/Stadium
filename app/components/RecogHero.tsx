/* /recognition · Hero (Figma n9SjmDjzB1PeZAYJ5w43fr → 2673:3849 "Hero · Swag"
   — the layer name is a copy-paste; this is the recognition hero. Re-laid-out
   2026-08-21 from the designer's new 2673:* batch, which replaced the old
   2504:6749 frame entirely.)

   Purple concentric-ring raster ("shapes" 2673:3851, a 4358×2329 rect clipped
   by the page frame to 1440×1757 → rc-hero-bg.jpg at 2×) with the text column
   on the content edge and, to its right, a 595×796 window onto a transparent
   photo cut-out ("auntie" 2673:3889 / image 13861 — the 1280×1908 upload
   cropped to exactly that window → rc-hero-photo.png) with a floating Slack
   "You've been recognised" toast (2673:3891) over it. Below the row, a
   full-bleed white/20 "glass" panel (2673:3852, rounded-t-32) carries the
   trust-logo marquee (56 above / 40 track / 56 below).

   The bg box extends 725px PAST this section's bottom (Figma's raster ends at
   y=1757, the hero section at 1032) and fades out over the tail so
   RecogProblem's card scrolls over it — render <RecogHero/> then
   <RecogProblem/> directly (RecogProblem is transparent + `relative z-10`).

   Figma stack (absolute y at 1440):
     0..84     nav (fixed SiteHeader overlays; section pt = 84)
     84..880   hero row 2673:3874 (h 796) — text col 565 + graphic 595
       204     eyebrow 12/1.4 (17)      → 8     [text col pt = 120]
       229     h1 58/1.02 ×2 (118)      → 20
       367     subhead 19/1.52 ×3 (87)  → 32
       486     CTA row (38 Figma / 40 site h-button-h) → 20
       544     trust line 13/1.4 (18)   → text col ends 562
       84..880 graphic: photo window 595×796 + toast 328×73 @ (287,294)
     880..1032 glass panel + trust band: pt 56 → marquee 40 (936..976) → pb 56
     1032      section ends; raster continues to 1757 (+725 = 45.3125rem)
     1032      Figma's Problem card starts flush here (full-bleed, rounded-t-32)

   Deltas vs Figma: the CTA pills are the site's 40px h-button-h (Figma 38), so
   the trust line and everything below shift +2px. Figma draws 1160 of content
   at x=140; the site's 1200 content box wins, so the extra 40px becomes the
   gap between the 565 text column and the 595 graphic (flush in Figma) and
   both columns are expressed as % of the content box (47.0833% / 49.5833%) so
   the photo — and the toast anchored to it in % — scale together on
   narrow-desktop widths instead of being cropped. Below lg the photo would
   otherwise grow to ~950 tall on tablet, so it is capped (344/384/416) and
   centred; the toast keeps its natural 328 width at every breakpoint. */

import Image from "next/image";
import heroBg from "@/public/recog2/rc-hero-bg.jpg";
import heroPhoto from "@/public/recog2/rc-hero-photo.png";
import toastAvatar from "@/public/recog2/rc-hero-avatar.png";

/* Figma "Logos track" (2673:3902): google, amazon, pinterest, accenture,
   bloomberg, salesforce, netflix, google, amazon, pinterest — each at its own
   Figma box size, bottom-aligned, gap 56. */
const LOGOS = [
  { src: "/trust-google.svg", alt: "Google", w: 74, h: 24 },
  { src: "/trust-amazon.svg", alt: "Amazon", w: 80, h: 24 },
  { src: "/trust-pinterest.svg", alt: "Pinterest", w: 87, h: 22 },
  { src: "/trust-accenture.svg", alt: "Accenture", w: 84, h: 24 },
  { src: "/trust-bloomberg.svg", alt: "Bloomberg", w: 90, h: 16 },
  { src: "/trust-salesforce.svg", alt: "Salesforce", w: 37, h: 26 },
  { src: "/trust-netflix.svg", alt: "Netflix", w: 75, h: 20 },
  { src: "/trust-google.svg", alt: "Google", w: 74, h: 24 },
  { src: "/trust-amazon.svg", alt: "Amazon", w: 80, h: 24 },
  { src: "/trust-pinterest.svg", alt: "Pinterest", w: 87, h: 22 },
];

export default function RecogHero() {
  return (
    <section className="relative">
      {/* background: Figma's "shapes" raster (2673:3851), 725px (45.3125rem)
          taller than this section so the Problem card overlaps it. Unlike the
          old mesh it stays dark at the bottom, so the tail is faded out from
          60% (just below the section's own bottom edge). */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-[calc(100%)] w-full overflow-hidden bg-[#5a3172]"
      >
        <Image
          src={heroBg}
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="select-none object-cover object-top"
        />
      </div>

      {/* hero row (2673:3874): text column top-padded 120, graphic flush to the
          row's top — the 796 row height is the graphic's own height */}
      <div className="relative z-10 px-section-x-sm pt-[6rem] md:px-section-x-md md:pt-[7rem] lg:px-section-x-lg lg:pt-[5.25rem]">
        <div className="mx-auto flex w-full max-w-content flex-col items-start gap-12 lg:flex-row lg:justify-between lg:gap-0">
          <div className="flex w-full flex-col gap-8 lg:w-[47.0833%] lg:pt-[7.5rem]">
            <div className="flex flex-col gap-5">
              <div data-animation="reveal" className="flex flex-col gap-2">
                {/* Figma 2673:3878 sets a DOUBLE space after the middot
                    (whitespace-pre there); reproduced verbatim. */}
                <p className="whitespace-pre font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem] text-[#edd9fc]">
                  {"RECOGNITION ·  STADIUM PLATFORM"}
                </p>
                {/* Figma breaks after "that" in its 565 column at Satoshi
                    Black; the site only has Bold, so the break is forced from
                    1344 up (the width at which the full 1160 row fits). */}
                <h1 className="font-[family-name:var(--font-satoshi)] text-[2.5rem] font-black leading-[1.02] tracking-[-0.0625rem] text-white md:text-[3rem] lg:text-[3.625rem] lg:tracking-[-0.09375rem]">
                  Recognition that
                  <br className="hidden min-[84rem]:inline" />
                  {" shows up at the door"}
                </h1>
              </div>
              <p
                data-animation="reveal"
                data-reveal-delay="120"
                className="w-full font-sans text-[1.0625rem] leading-[1.52] text-[#fbfeff] lg:text-[1.1875rem]"
              >
                Recognition stalls in a Slack channel. Stadium turns a
                thank-you into a real reward at someone&#8217;s door, anywhere.
                You set the rules. We ship the rest.
              </p>
            </div>

            <div
              data-animation="reveal"
              data-reveal-delay="200"
              className="flex flex-col gap-5"
            >
              <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center">
                <a
                  href="#"
                  className="inline-flex h-button-h items-center justify-center rounded-[100px] bg-[#8d12e7] px-[1.375rem] font-sans text-button-primary uppercase text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                    Browse the catalog
                  </span>
                </a>
                <a
                  href="#"
                  className="inline-flex h-button-h items-center justify-center rounded-[100px] border border-white bg-transparent px-[1.375rem] font-sans text-button-primary uppercase text-white transition-all duration-200 hover:bg-white/10 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                    Talk to sales
                  </span>
                </a>
              </div>
              <p className="font-sans text-[0.8125rem] font-semibold leading-[1.4] text-[#fbfeff]">
                5,000+ teams ship gifts this way. In 170+ countries.
              </p>
            </div>
          </div>

          {/* graphic (2673:3888) — rc-hero-photo.png IS the 595×796 window
              Figma clips out of the 1280×1908 cut-out, so it needs no crop
              box here; the toast hangs 20px past its right edge (2673:3891,
              positioned in % of the window so it tracks the photo). */}
          <div
            data-animation="reveal"
            data-reveal-delay="240"
            className="relative w-full max-w-[21.5rem] self-center sm:max-w-[24rem] md:max-w-[26rem] lg:w-[49.5833%] lg:max-w-none lg:self-start"
          >
            <Image
              src={heroPhoto}
              alt="An employee smiling at a recognition notification on her phone"
              priority
              quality={90}
              sizes="(min-width: 1380px) 37.1875rem, (min-width: 1024px) 50vw, (min-width: 768px) 26rem, (min-width: 640px) 24rem, 100vw"
              className="h-auto w-full select-none"
            />

            <div className="absolute right-[-3.3613%] top-[36.9347%] flex items-center gap-8 overflow-hidden rounded-[1.125rem] bg-[rgba(255,255,255,0.97)] px-[1.125rem] py-[0.9375rem] shadow-[0_0.875rem_2.25rem_0_rgba(26,0,51,0.28)]">
              <div className="flex items-center gap-[0.8125rem]">
                <div className="relative size-10 shrink-0 overflow-hidden rounded-full bg-[rgba(173,173,173,0.2)]">
                  <Image
                    src={toastAvatar}
                    alt=""
                    quality={90}
                    sizes="2.5rem"
                    className="size-full select-none object-cover"
                  />
                </div>
                <div className="flex flex-col gap-[0.1875rem]">
                  <p className="whitespace-nowrap font-[family-name:var(--font-satoshi)] text-[1rem] font-bold leading-normal text-[#1a1030]">
                    You&#8217;ve been recognised
                  </p>
                  <div className="flex items-center gap-2 font-sans text-[0.875rem] leading-normal">
                    <span className="whitespace-nowrap text-[#6b6480]">
                      From Alex Kim
                    </span>
                    <span className="whitespace-pre text-[#a09ab0]">
                      {"·  2m ago"}
                    </span>
                  </div>
                </div>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/recog2/rc-hero-slack.svg"
                alt=""
                width={30}
                height={30}
                className="size-[1.875rem] shrink-0 select-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* glass panel (2673:3852) — full-bleed white/20, rounded-t-32 — carrying
          the trust band (2673:3900): 56 / 40 marquee / 56. Seamless CSS
          marquee, logos inverted white, edges soft-masked. */}
      <div className="relative z-10 rounded-t-[2rem] bg-white/20">
        <div className="px-section-x-sm py-10 md:px-section-x-md lg:px-section-x-lg lg:py-14">
          <div
            className="mx-auto w-full max-w-content"
          >
            <div className="relative h-10 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]">
              <div className="flex h-full w-max animate-[swag-marquee_40s_linear_infinite] motion-reduce:animate-none">
                {[0, 1].map((group) => (
                  <ul
                    key={group}
                    aria-hidden={group === 1}
                    className="flex h-full shrink-0 list-none items-center gap-x-10 pr-10 md:gap-x-14 md:pr-14"
                  >
                    {LOGOS.map((l, i) => (
                      <li
                        key={`${l.alt}-${i}`}
                        className="flex shrink-0 items-center"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={l.src}
                          alt={group === 0 ? l.alt : ""}
                          width={l.w}
                          height={l.h}
                          style={{ height: `${l.h / 16}rem` }}
                          className="w-auto max-w-none select-none opacity-90 brightness-0 invert"
                        />
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
