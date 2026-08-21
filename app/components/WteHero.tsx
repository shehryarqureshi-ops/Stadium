/* /ways-to-engage · Hero (Figma n9SjmDjzB1PeZAYJ5w43fr → 2514:18138
   "hero - ways to engage": content 2514:18161, text 2514:18162, carousel
   2514:18173, trust band 2514:21697 — re-done by the designer 2026-08-21).

   NO BACKGROUND RASTER. Unlike the /swag, /recognition, /events and /gifting
   heroes this one sits on plain #ffffff — there is no bg image, gradient or
   mesh node in the Figma frame, and nothing scrolls over it. So the
   `h-[calc(100%_+_XXrem)]` bg-box contract those heroes use does NOT apply
   here; the section just ends at its own bottom edge and the next section
   (the still-unfinished "five problems" frame) starts 160px below it.

   Centred eyebrow + 2-line h1 (575 wide, capped by the 1200 content box),
   then a 5-card carousel. The carousel is the one block that does NOT sit on
   the 1200 content edge: Figma draws its track 1388 wide at x=26, i.e. an
   almost-full-bleed strip, so it keeps its own 26px gutter at lg and caps at
   the 1440 frame width above that. Cards hold their designed 264.8 width at
   every breakpoint and the strip scrolls internally when the viewport is too
   narrow (the page itself never scrolls sideways). Finally the
   standard trust-logo marquee — same track as the sibling heroes, but the
   marks stay dark (this hero is light) at the #777 Figma renders them at.

   Figma stack (absolute y at 1440):
     0..84    nav (fixed SiteHeader overlays; section pt = 204 = 84 + 120)
     204      eyebrow 12/1.4 (17)       → 8
     229      h1 58/1.02 ×2 (118)       → text block ends 347
     347      → 60 gap
     407      carousel 409 (5 cards 264.8 wide, gap 16, track 1388 @ x=26)
     816      trust band: pt 56 → marquee 40 (872..912) → pb 56 → 968
     968      section ends (plain white, no raster to extend) */

import Image from "next/image";

import card1 from "@/public/wte/wte-hero-1.jpg";
import card2 from "@/public/wte/wte-hero-2.jpg";
import card3 from "@/public/wte/wte-hero-3.jpg";
import card4 from "@/public/wte/wte-hero-4.jpg";
import card5 from "@/public/wte/wte-hero-5.jpg";

/* Figma "items" (2514:18174). Copy is reproduced verbatim — the 4th card
   really does repeat "Recognition", and all five descriptions really are the
   same placeholder line. Both are flagged to the designer, not fixed here.
   `radius` is the image slot's own corner radius: card 1 is 20 in Figma while
   cards 2–5 are 24 (another designer inconsistency, reproduced as drawn). */
const CARDS = [
  {
    title: "Recognition",
    body: "Your recognition tool charges per seat, used or not.",
    img: card1,
    alt: "Snack bags — Nantucket Crisps, popchips and Hal's Ridge Cut chips — arranged on a coral-red backdrop",
    radius: "rounded-[1.25rem]",
  },
  {
    title: "Swag",
    body: "Your recognition tool charges per seat, used or not.",
    img: card2,
    alt: "La Colombe draft-latte cans and an iced coffee among ice cubes on a bright blue backdrop",
    radius: "rounded-[1.5rem]",
  },
  {
    title: "Snacks",
    body: "Your recognition tool charges per seat, used or not.",
    img: card3,
    alt: "Door County coffee, ceremonial matcha and gourmet popcorn on an amber backdrop scattered with coffee beans",
    radius: "rounded-[1.5rem]",
  },
  {
    title: "Recognition",
    body: "Your recognition tool charges per seat, used or not.",
    img: card4,
    alt: "A wellness kit — massage gun, grooming trimmer set and neck massager — on a green backdrop",
    radius: "rounded-[1.5rem]",
  },
  {
    title: "Experiences",
    body: "Your recognition tool charges per seat, used or not.",
    img: card5,
    alt: "Vanilla cookies, shortbread and chocolate chip cookies on a coral-red backdrop",
    radius: "rounded-[1.5rem]",
  },
];

/* Figma "Logos track" (2514:21699): google, amazon, pinterest, accenture,
   bloomberg, salesforce, netflix, google, amazon, pinterest — each at its own
   Figma box size, gap 56. Same track the sibling heroes use. */
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

export default function WteHero() {
  return (
    <section className="relative bg-surface-base pt-[6rem] md:pt-[7rem] lg:pt-[12.75rem]">
      {/* text (2514:18162) — 575-wide centred column inside the 1200 box */}
      <div className="px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
        <div className="mx-auto w-full max-w-content">
          <div
            data-animation="reveal"
            className="mx-auto flex max-w-[35.9375rem] flex-col gap-2 text-center"
          >
            <p className="font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem] text-[#777777]">
              WAYS TO ENGAGE
            </p>
            <h1 className="font-[family-name:var(--font-satoshi)] text-[2.5rem] font-black leading-[1.02] tracking-[-0.0625rem] text-[#1b1b1b] md:text-[3rem] lg:text-[3.625rem] lg:tracking-[-0.09375rem]">
              {/* Figma sets each line `whitespace-nowrap` in a 575 box; the
                  spans reproduce that exactly at lg (Satoshi Bold + synthetic
                  black is a hair wider than the real Black, so letting it wrap
                  on its own would risk a third line) and fall back to natural
                  wrapping below lg */}
              <span className="lg:block lg:whitespace-nowrap">
                Every way to show up
              </span>{" "}
              <span className="lg:block lg:whitespace-nowrap">
                for your people
              </span>
            </h1>
          </div>
        </div>
      </div>

      {/* carousel (2514:18173) — track 1388 @ x=26 at 1440, so the strip keeps
          its own 26px gutter at lg and caps at the 1440 frame width above it.
          Cards keep their designed 264.8 width at every breakpoint: 5×264.8 +
          4×16 = 1388 fills the track EXACTLY at 1440 (identical to Figma's
          `flex:1 0 0` cards), and narrower viewports scroll the strip
          internally rather than squeezing the cards (Figma's flex sizing would
          drop them to ~182 at 1024 and wrap every title). The page itself
          never scrolls sideways. */}
      <div
        data-reveal-stagger="80"
        className="mx-auto mt-10 flex w-full max-w-[90rem] snap-x snap-mandatory gap-4 overflow-x-auto px-section-x-sm md:px-section-x-md lg:mt-[3.75rem] lg:px-[1.625rem] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {CARDS.map((c, i) => (
          <article
            key={`${c.title}-${i}`}
            data-animation="reveal"
            className="flex w-[16.55rem] shrink-0 snap-start flex-col gap-6 overflow-hidden rounded-[1.5rem] bg-[#f7f7f7] p-2"
          >
            <div className="flex flex-col gap-2 px-4 pt-4">
              <h2 className="font-[family-name:var(--font-satoshi)] text-[1.5rem] leading-8 text-[#16171b]">
                {c.title}
              </h2>
              <p className="font-sans text-[0.9375rem] leading-5 text-[#6b6c71]">
                {c.body}
              </p>
            </div>
            <div
              className={`relative h-[17.0625rem] w-full overflow-hidden ${c.radius}`}
            >
              <Image
                src={c.img}
                alt={c.alt}
                fill
                quality={90}
                /* card 1 is the LCP candidate; the rest are in the first
                   viewport too, so they load eagerly without a preload storm */
                priority={i === 0}
                loading={i === 0 ? undefined : "eager"}
                sizes="15.55rem"
                className="select-none object-cover"
              />
            </div>
          </article>
        ))}
      </div>

      {/* trust band (2514:21697): 56 / 40 marquee / 56 — seamless CSS marquee.
          Light hero, so the marks are NOT inverted; the source SVGs are
          #4f5052 and 0.77 alpha on white lands on the #777 Figma renders. */}
      <div
        data-animation="reveal"
        data-reveal-delay="300"
        className="px-section-x-sm py-10 md:px-section-x-md lg:px-section-x-lg lg:py-14"
      >
        <div className="mx-auto w-full max-w-content">
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
                        className="w-auto max-w-none select-none opacity-[0.77]"
                      />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
