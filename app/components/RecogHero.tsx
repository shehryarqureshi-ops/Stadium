/* /recognition · Hero (Figma n9SjmDjzB1PeZAYJ5w43fr → 2504:6749 "Hero · Swag":
   bg raster 2504:6751 "image 13755", hero row 2504:6774 with text column
   2504:6775 + panel 2504:6788 "image 13725", trust band 2504:6789).

   A purple mesh-gradient raster hero (rc-hero-bg.jpg — Figma's original
   2880×3438 upload, i.e. 2× of the 1440×1719 frame; it fades to pure white on
   its own last ~18%, so no shader and no invented gradient). The text column
   sits on the 1200 content edge (x=120 at 1440; Figma draws it at 100) and the
   692×356 recognition mockup is right-aligned to the content edge. Below the
   row: the trust-logo marquee (56 above / 40 track / 56 below).

   The bg box extends 934px PAST this section's bottom (Figma's raster is
   1440×1719; the hero section ends at 785) so RecogProblem's white card
   scrolls over it — render <RecogHero/> then <RecogProblem/> directly
   (RecogProblem is transparent + `relative z-10` and supplies the 60px gap).

   Figma stack (absolute y at 1440):
     0..84    nav (fixed SiteHeader overlays; section pt = 156 = 84 + 72)
     156      eyebrow 12/1.4 (17)      → 8
     181      h1 58/1.02 ×3 (177)      → 20
     378      subhead 19/1.52 ×3 (87)  → 32
     497      CTA row (38 Figma / 40 site h-button-h) → 20
     555      trust line 13/1.4 (18)   → text col ends 573
     217..573 panel 692×356, bottom-aligned to the text column
     573      → 60 gap
     633      trust band: pt 56 → marquee 40 (689..729) → pb 56 → 785
     785      section ends; bg raster continues to 1719 (+934 = 58.375rem)
     845      RecogProblem card top (RecogProblem owns the 60px pt)

   Deltas vs Figma: the CTA pills are the site's 40px h-button-h (Figma 38), so
   everything from the trust line down shifts +2px; the panel is rendered at
   628 wide (Figma 692) because the site's 1200 content box wins over Figma's
   1240 @ x=100 — text 540 + gap 32 + panel 628 = 1200. */

import Image from "next/image";
import heroBg from "@/public/recog2/rc-hero-bg.jpg";
import heroPanel from "@/public/recog2/rc-hero-panel.png";

/* Figma "Logos track" (2504:6791): google, amazon, pinterest, accenture,
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
      {/* background: Figma's mesh raster (2504:6751), 934px (58.375rem) taller
          than this section so the Problem card overlaps it. The raster already
          fades to white; mask-b-from-85% only guards the last sliver at
          viewport widths where object-cover crops it. */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-[calc(100%_+_58.375rem)] w-full overflow-hidden bg-[#210536] mask-b-from-85%"
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

      <div className="relative z-10 px-section-x-sm pt-[6rem] md:px-section-x-md md:pt-[7rem] lg:px-section-x-lg lg:pt-[9.75rem]">
        <div className="mx-auto flex w-full max-w-content flex-col">
          {/* hero row (2504:6774): text 540 + gap 32 + panel 628, bottom-aligned */}
          <div className="flex flex-col items-start gap-12 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
            <div className="flex w-full flex-col gap-8 lg:w-[33.75rem] lg:shrink-0">
              <div className="flex flex-col gap-5">
                <div data-animation="reveal" className="flex flex-col gap-2">
                  <p className="whitespace-pre font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem] text-[#edd9fc]">
                    {"RECOGNITION ·  STADIUM PLATFORM"}
                  </p>
                  <h1 className="font-[family-name:var(--font-satoshi)] text-[2.5rem] font-black leading-[1.02] tracking-[-0.0625rem] text-white md:text-[3rem] lg:text-[3.625rem] lg:tracking-[-0.09375rem]">
                    Recognition that
                    <br className="hidden lg:inline" />
                    shows up at the
                    <br className="hidden lg:inline" />
                    door
                  </h1>
                </div>
                <p
                  data-animation="reveal"
                  data-reveal-delay="120"
                  className="max-w-[33.75rem] font-sans text-[1.0625rem] leading-[1.52] text-[#fbfeff] lg:text-[1.1875rem]"
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

            {/* recognition mockup (2504:6788) — 692×356 in Figma, rendered 628
                wide on the 1200 content edge; transparent PNG, no card frame */}
            <div
              data-animation="reveal"
              data-reveal-delay="240"
              className="w-full lg:w-[39.25rem] lg:shrink-0"
            >
              <Image
                src={heroPanel}
                alt="A recognition post from Andrew to Sarah awarding 500 Kudos, alongside a delivery timeline: recognition sent, reward selected, delivered to the front door."
                priority
                quality={100}
                sizes="(min-width: 1024px) 39.25rem, 92vw"
                className="h-auto w-full select-none"
              />
            </div>
          </div>

          {/* trust band (2504:6789): 60 above, then 56 / 40 marquee / 56 —
              seamless CSS marquee, logos inverted white, edges soft-masked */}
          <div
            data-animation="reveal"
            data-reveal-delay="300"
            className="mt-10 py-10 lg:mt-[3.75rem] lg:py-14"
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
