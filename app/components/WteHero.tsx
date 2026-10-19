/* /ways-to-engage · Hero — HUB (Figma n9SjmDjzB1PeZAYJ5w43fr → 5714:12443
   "V2 · Light editorial" hero).

   Centred eyebrow + 56px Satoshi h1 (760 wide), then five category cards in a
   row (1240 wide at 1440, gap 16). Every card is a link to its program page —
   this page is the hub. Recognition's visual is a coded "kudos redeemed" UI
   vignette on Punch; the other four are photos.

   Figma gives desktop only: mobile stacks the cards in one column, tablet
   uses three columns (3 + 2). The trust-logo band that used to live in this
   hero is now the shared home-page <TrustBand /> rendered by the page.

   Figma stack (absolute y at 1440):
     0..84    nav (fixed SiteHeader overlays; section pt = 132 = 84 + 48)
     132      eyebrow 12/1.4 (17) → 14 → h1 56/1.04 ×2 (116)
     327      → 48 gap
     375      cards 406 tall
     781      → pb 56 */

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

import swag from "@/public/wte/hub-swag.jpg";
import snacks from "@/public/wte/hub-snacks.jpg";
import gifting from "@/public/wte/hub-gifting.jpg";
import events from "@/public/wte/hub-events.jpg";

type Card = {
  title: string;
  body: string;
  href: string;
  img?: StaticImageData;
  alt?: string;
};

const CARDS: Card[] = [
  {
    title: "Recognition",
    body: "A reward that shows up at their door",
    href: "/recognition",
  },
  {
    title: "Swag",
    body: "Design, storage, and shipping handled",
    href: "/swag",
    img: swag,
    alt: "Two La Colombe draft-latte cans and an iced coffee among ice cubes on a bright blue backdrop",
  },
  {
    title: "Snacks",
    body: "Vegan, gluten-free, nut-free, and more",
    href: "/snacks",
    img: snacks,
    alt: "Door County coffee, ceremonial matcha and gourmet snacks on an amber backdrop scattered with coffee beans",
  },
  {
    title: "Gifting",
    body: "Recipients choose their gift and enter their own address",
    href: "/gifting",
    img: gifting,
    alt: "A wellness kit — massage neck pillow, grooming trimmer and skincare tools — on a green backdrop",
  },
  {
    title: "Hosted Experiences",
    body: "Team building in the room or across time zones",
    href: "/events",
    img: events,
    alt: "Cookie bags and shortbread stacked on red blocks against a coral-red backdrop",
  },
];

/* the three "Pick your gift" options reuse the swag / snacks / gifting photos
   (Figma crops the same images at 56×50) */
const OPTIONS = [
  { label: "Hoodie", img: swag, selected: false },
  { label: "Snacks", img: snacks, selected: true },
  { label: "Gift set", img: gifting, selected: false },
];

function RecognitionVignette() {
  return (
    <div
      aria-hidden
      className="flex h-full w-full flex-col justify-center gap-3 overflow-hidden rounded-[1.125rem] bg-[#ff5b77] px-[0.875rem] pb-[0.875rem] pt-4"
    >
      <div className="flex items-center gap-[0.625rem] rounded-[0.875rem] bg-white px-3 py-[0.625rem]">
        <span className="flex size-[1.625rem] shrink-0 items-center justify-center rounded-full bg-[#d8f7e1]">
          <svg
            viewBox="0 0 16 16"
            className="size-[0.6875rem]"
            fill="none"
            stroke="#00c036"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 8.5 6.5 12 13 4.5" />
          </svg>
        </span>
        <span className="flex min-w-0 flex-col gap-px leading-[1.2]">
          <span className="font-sans text-[0.75rem] font-bold text-[#16171b]">
            Kudos redeemed
          </span>
          <span className="font-sans text-[0.6875rem] text-[#6b6c71]">
            Maya · 500 pts
          </span>
        </span>
      </div>
      <span className="font-sans text-[0.6875rem] font-bold uppercase leading-[1.2] tracking-[0.075rem] text-white">
        Pick your gift
      </span>
      <div className="flex items-start gap-2">
        {OPTIONS.map((o) => (
          <span
            key={o.label}
            className={`flex min-w-0 flex-1 flex-col gap-[0.375rem] rounded-xl bg-white px-[0.375rem] pb-2 pt-[0.375rem] ${
              o.selected ? "border-2 border-[#16171b]" : ""
            }`}
          >
            <span className="relative block h-[3.125rem] w-full overflow-hidden rounded-lg">
              <Image
                src={o.img}
                alt=""
                fill
                sizes="4rem"
                className="object-cover"
              />
            </span>
            <span className="text-center font-sans text-[0.6875rem] font-semibold leading-[1.2] text-[#16171b]">
              {o.label}
            </span>
          </span>
        ))}
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
                {c.img ? (
                  <span className="relative mt-auto block aspect-[3/5] w-full overflow-hidden rounded-[1.125rem]">
                    <Image
                      src={c.img}
                      alt={c.alt ?? ""}
                      fill
                      quality={85}
                      priority
                      sizes="(min-width: 1024px) 18rem, (min-width: 768px) 30vw, 90vw"
                      className="select-none object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                  </span>
                ) : (
                  <span className="mt-auto block aspect-[3/5] w-full">
                    <RecognitionVignette />
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
