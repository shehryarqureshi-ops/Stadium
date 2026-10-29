/* /ways-to-engage · Hero — HUB (Figma n9SjmDjzB1PeZAYJ5w43fr → 5714:12443
   "V2 · Light editorial" hero).

   Centred eyebrow + 56px Satoshi h1 (760 wide), then five category cards in a
   row (1240 wide at 1440, gap 16). Every card is a link to its program page —
   this page is the hub. All five visuals are photos cropped 243:216 (9:8);
   Recognition carries a coded "Janine spent 2500 Kudos" confirmation chip.
   The chip is sized in cqw (px ÷ 2.43 of the 243px Figma image) so it scales
   with the card.

   Figma gives desktop only: mobile stacks the cards in one column, tablet
   uses three columns (3 + 2). The trust-logo band that used to live in this
   hero is now the shared home-page <TrustBand /> rendered by the page.

   Figma stack (absolute y at 1440):
     0..84    nav (fixed SiteHeader overlays; section pt = 132 = 84 + 48)
     132      eyebrow 12/1.4 (17) → 14 → h1 56/1.04 ×2 (116)
     327      → 48 gap
     375      cards 336 tall (text 72 + 14 + image 216, pt 22 / pb 12)
     711      → pb 56 */

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

import recognition from "@/public/wte/hub2-recognition.jpg";
import swag from "@/public/wte/hub2-swag.jpg";
import snacks from "@/public/wte/hub2-snacks.jpg";
import gifting from "@/public/wte/hub2-gifting.jpg";
import events from "@/public/wte/hub2-events.jpg";

type Card = {
  title: string;
  body: string;
  href: string;
  img: StaticImageData;
  alt: string;
};

const CARDS: Card[] = [
  {
    title: "Recognition",
    body: "A reward that shows up at their door",
    href: "/recognition",
    img: recognition,
    alt: "Two people pass a wrapped gift box tied with a purple ribbon at a front door",
  },
  {
    title: "Swag",
    body: "Design, storage, and shipping handled",
    href: "/swag",
    img: swag,
    alt: "A grey DevNest hoodie, cap and gift tag folded together",
  },
  {
    title: "Snacks",
    body: "Vegan, gluten-free, nut-free, and more",
    href: "/snacks",
    img: snacks,
    alt: "An open Snackmagic box packed with snacks and drinks",
  },
  {
    title: "Gifting",
    body: "Recipients choose their gift and enter their own address",
    href: "/gifting",
    img: gifting,
    alt: "Hands unboxing a perfume bottle from a ribboned gift box on a wooden table",
  },
  {
    title: "Hosted Experiences",
    body: "Team building in the room or across time zones",
    href: "/events",
    img: events,
    alt: "A woman paints at her laptop while joining a team video call",
  },
];

/* Recognition's "Kudos spent" chip (Figma 7258:12309). Sizes are cqw of the
   243px-wide image (px ÷ 2.43) so the chip scales with the card. */
function KudosChip() {
  return (
    <div
      aria-hidden
      className="absolute left-[17.7cqw] top-[4.1cqw] flex w-[78.2cqw] flex-col gap-[1.65cqw] rounded-[3.29cqw] border-[0.5px] border-[#eff0f2] bg-white p-[3.7cqw] shadow-[0_0.5rem_1rem_rgba(24,24,24,0.08),0_1px_3px_rgba(24,24,24,0.05)]"
    >
      <div className="flex items-start gap-[1.65cqw]">
        <p className="flex-1 font-sans text-[4.53cqw] font-semibold leading-[6.17cqw] text-[#181818]">
          Janine spent <span className="text-[#8d12e7]">2500 Kudos.</span>
        </p>
        <span className="flex shrink-0 items-center gap-[1cqw] rounded-full bg-[#eff9f1] px-[1.85cqw] py-[0.82cqw]">
          <svg viewBox="0 0 6 6" fill="none" className="size-[2.26cqw]">
            <path
              d="M2.175 3L2.725 3.55L3.825 2.45M5.75 3C5.75 4.51878 4.51878 5.75 3 5.75C1.48122 5.75 0.25 4.51878 0.25 3C0.25 1.48122 1.48122 0.25 3 0.25C4.51878 0.25 5.75 1.48122 5.75 3Z"
              stroke="#267337"
              strokeWidth="0.5"
              strokeLinecap="round"
            />
          </svg>
          <span className="font-sans text-[2.26cqw] font-medium leading-[3.29cqw] text-[#267337]">
            Confirmed
          </span>
        </span>
      </div>
      <div className="flex items-start gap-[1.65cqw]">
        <svg viewBox="0 0 8 8" fill="none" className="mt-[0.5cqw] size-[3.29cqw] shrink-0">
          <path
            d="M4 7.33268V3.99987M4 7.33268C3.88298 7.33268 3.76801 7.30187 3.66667 7.24335L1.33333 5.90994C1.23209 5.85149 1.14799 5.76743 1.08949 5.66621C1.03098 5.56499 1.00012 5.45016 1 5.33324V2.66642C1.00012 2.54951 1.03098 2.43468 1.08949 2.33346C1.14799 2.23224 1.23209 2.14818 1.33333 2.08972L2.50011 1.42296M4 7.33268C4.11702 7.33268 4.23199 7.30187 4.33333 7.24335L6.66667 5.90994C6.76791 5.85149 6.85201 5.76743 6.91051 5.66621C6.96902 5.56499 6.99988 5.45016 7 5.33324V2.66642C6.99988 2.54951 6.96902 2.43468 6.91051 2.33346C6.85201 2.23224 6.76791 2.14818 6.66667 2.08972L4.33333 0.756314C4.23199 0.697798 4.11702 0.666992 4 0.666992C3.88298 0.666992 3.76801 0.697798 3.66667 0.756314L2.50011 1.42296M4 3.99987L1.09668 2.3331M4 3.99987L5.4992 3.1392M5.4992 3.1392L6.90335 2.3331M5.4992 3.1392L2.50011 1.42296"
            stroke="#646569"
            strokeWidth="0.75"
            strokeLinecap="round"
          />
        </svg>
        <p className="flex-1 font-sans text-[2.88cqw] leading-[4.32cqw] text-[#646569]">
          Teambuilds Store reward is on the way.
        </p>
      </div>
    </div>
  );
}

export default function WteHero() {
  return (
    <section className="bg-surface-base px-section-x-sm pb-10 pt-[6rem] md:px-section-x-md md:pb-12 md:pt-[7rem] lg:px-section-x-lg lg:pb-14 lg:pt-[8.25rem] wide:px-10">
      {/* same container as the /pricing five-card row: max-w-content inside
          section-x, widening to max-w-pricing-cards (1540) with 40px gutters
          from the `wide` breakpoint */}
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-10 md:gap-12 lg:gap-12 wide:max-w-pricing-cards">
        <div
          data-animation="reveal"
          className="flex w-full max-w-[47.5rem] flex-col items-center gap-[0.875rem] text-center"
        >
          <p className="font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem] text-[#6b6c71]">
            Ways to engage
          </p>
          <h1 className="font-[family-name:var(--font-satoshi)] text-[2.5rem] leading-[1.04] tracking-[-0.0625rem] text-[#16171b] md:text-[3rem] lg:text-[3.5rem] lg:tracking-[-0.0875rem]">
            Every way to show up for your people
          </h1>
        </div>

        <ul
          data-reveal-stagger="80"
          className="grid w-full list-none grid-cols-1 gap-4 p-0 md:grid-cols-3 lg:grid-cols-5"
        >
          {CARDS.map((c) => (
            <li key={c.title} data-animation="reveal" className="flex">
              <Link
                href={c.href}
                className="group flex w-full flex-col gap-[0.875rem] rounded-[1.5rem] bg-[#f8f8f8] px-3 pb-3 pt-[1.375rem] transition-transform duration-200 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16171b] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <span className="flex flex-col gap-[0.375rem] px-[0.625rem]">
                  <span className="font-[family-name:var(--font-satoshi)] text-[1.375rem] leading-[1.2] text-[#16171b]">
                    {c.title}
                  </span>
                  <span className="font-sans text-[0.875rem] leading-[1.46] text-[#6b6c71] md:min-h-[2.5625rem]">
                    {c.body}
                  </span>
                </span>
                <span className="relative mt-auto block aspect-[243/216] w-full overflow-hidden rounded-[1.25rem] [container-type:inline-size]">
                  <Image
                    src={c.img}
                    alt={c.alt ?? ""}
                    fill
                    quality={85}
                    priority
                    sizes="(min-width: 1024px) 18rem, (min-width: 768px) 30vw, 90vw"
                    className="select-none object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  {c.title === "Recognition" && <KudosChip />}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
