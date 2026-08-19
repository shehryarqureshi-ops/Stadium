/* /swag · THE PROBLEM (Figma n9SjmDjzB1PeZAYJ5w43fr → problem 2500:4861 +
   the following "divider" section 2500:4919). A white rounded-16 card (1240 in
   Figma → the site's 1200 content width) that scrolls OVER the hero shader
   (SwagmagicHero paints its bg 806px past its own bottom; this section is
   transparent + z-10). Header (eyebrow #10995a → 44px Satoshi title → 18px
   subhead, 860 max) → 40 → a #f2f2f2 rounded-32 tray with three white photo
   cards. The photos carry small frosted UI chips rebuilt in HTML (Figma gives
   them as text + avatar fills, so they stay crisp): three "vendor" pills with
   avatars on card 1, and a "#48291 · Not Tracked" tracking pill on card 3.
   The 4px #f2f2f2 hairline "divider" (1200 wide) sits 160 below the card; the
   next section (Solution, lg:py-20) supplies the other 80 of the 160 below it.

   Figma stack (absolute y at 1440):
     913       card top (rounded 16, pt 160, px 80)
     1073      eyebrow (17)          → 8
     1098      h2 44/1.08 (48)        → 20
     1166      subhead 18/1.48 ×2 (54) → 40
     1260      tray p16 (544): cards 512 = photo 250 + text (pt42/pb32)
     1804      card ends (no bottom padding — the tray is flush)   → 160
     1964      divider line 4px #f2f2f2 (x 120..1320)             → 160
     2128      next section (we give 80, Solution's lg:py-20 gives 80). */

import type { ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import photoVendors from "@/public/swag2/sw2-problem-vendors.jpg";
import photoCloset from "@/public/swag2/sw2-problem-closet.jpg";
import photoLogistics from "@/public/swag2/sw2-problem-logistics.jpg";
import avatar1 from "@/public/swag2/sw2-problem-avatar-1.jpg";
import avatar2 from "@/public/swag2/sw2-problem-avatar-2.jpg";
import avatar3 from "@/public/swag2/sw2-problem-avatar-3.jpg";

/* Vendor chips on card 1 (2500:4877/4880/4883): white/80 frosted pill,
   0.75px white border, 22px avatar, 10px label. Positions are Figma px inside
   the 333×250 photo frame (÷16 = rem); the third pill anchors to the right edge
   (Figma right gap 29) so it survives our slightly narrower card. */
const VENDOR_CHIPS: {
  avatar: StaticImageData;
  label: string;
  pos: string;
  blur: string;
}[] = [
  { avatar: avatar1, label: "Min order is 500?", pos: "left-[0.5625rem] top-[3.5625rem]", blur: "backdrop-blur-[4px]" },
  { avatar: avatar2, label: "Need updated invoice", pos: "left-[2.5rem] top-[11.5rem]", blur: "backdrop-blur-[6px]" },
  { avatar: avatar3, label: "Action required", pos: "right-[1.8125rem] top-[2.25rem]", blur: "backdrop-blur-[6px]" },
];

/* Lucide "package" (14px, stroke Stadium/Accents/Punch #ff5b77) — the exact
   path from Figma's svgAssets for the tracking pill's icon badge. */
function PackageIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 14 14"
      fill="none"
      className="size-3.5"
    >
      <path
        d="M7 12.8338V7.00013M7 7.00013L1.91919 4.0833M7 7.00013L12.0809 4.0833M4.375 2.49043L9.625 5.49477M6.41667 12.6762C6.59402 12.7786 6.79521 12.8325 7 12.8325C7.20479 12.8325 7.40598 12.7786 7.58333 12.6762L11.6667 10.3428C11.8438 10.2405 11.991 10.0934 12.0934 9.91623C12.1958 9.73909 12.2498 9.53814 12.25 9.33354V4.66661C12.2498 4.462 12.1958 4.26105 12.0934 4.08392C11.991 3.90678 11.8438 3.75968 11.6667 3.65738L7.58333 1.32391C7.40598 1.22151 7.20479 1.1676 7 1.1676C6.79521 1.1676 6.59402 1.22151 6.41667 1.32391L2.33333 3.65738C2.15615 3.75968 2.00899 3.90678 1.9066 4.08392C1.80422 4.26105 1.75021 4.462 1.75 4.66661V9.33354C1.75021 9.53814 1.80422 9.73909 1.9066 9.91623C2.00899 10.0934 2.15615 10.2405 2.33333 10.3428L6.41667 12.6762Z"
        stroke="#FF5B77"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function VendorChips() {
  return (
    <>
      {VENDOR_CHIPS.map((c) => (
        <div
          key={c.label}
          aria-hidden="true"
          className={`absolute flex items-center gap-1 rounded-full border-[0.75px] border-white bg-white/80 py-[0.1875rem] pl-[0.1875rem] pr-3 ${c.blur} ${c.pos}`}
        >
          <Image
            src={c.avatar}
            alt=""
            quality={90}
            sizes="1.375rem"
            className="size-[1.375rem] shrink-0 rounded-full object-cover"
          />
          <span className="whitespace-nowrap font-sans text-[0.625rem] leading-[0.875rem] tracking-[0.0156rem] text-[#2d3135]">
            {c.label}
          </span>
        </div>
      ))}
    </>
  );
}

/* Tracking pill on card 3 (2500:4906): 231×36, centered, 195 from the top. */
function TrackingChip() {
  return (
    <div
      aria-hidden="true"
      className="absolute left-1/2 top-[12.1875rem] flex -translate-x-1/2 items-center gap-1 rounded-full border-[0.75px] border-white bg-white/80 py-1.5 pl-1.5 pr-3 backdrop-blur-[6px]"
    >
      <div className="flex w-[7.25rem] items-center gap-2.5">
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#feecec]">
          <PackageIcon />
        </span>
        <span className="font-sans text-[0.75rem] font-bold leading-[0.875rem] text-[#16171b]">
          #48291
        </span>
      </div>
      <span className="flex items-center gap-1.5 rounded-full bg-[#fee2e2] px-2 py-1">
        <span className="size-1.5 shrink-0 rounded-full bg-[#da1e28]" />
        <span className="whitespace-nowrap font-sans text-[0.6875rem] font-bold leading-[0.75rem] tracking-[0.0125rem] text-[#da1e28]">
          Not Tracked
        </span>
      </span>
    </div>
  );
}

const CARDS: {
  img: StaticImageData;
  alt: string;
  title: [string, string];
  desc: string;
  chips?: ReactNode;
}[] = [
  {
    img: photoVendors,
    alt: "A person working at a desktop in a bright office, juggling vendor requests",
    title: ["One vendor", "becomes four"],
    desc: "Swag, kits, and fulfillment each need their own vendor, login, and invoice.",
    chips: <VendorChips />,
  },
  {
    img: photoCloset,
    alt: "A storage room stacked floor to ceiling with cardboard boxes of swag",
    title: ["The swag closet", "keeps growing"],
    desc: "Boxes pile up, inventory becomes outdated, and reorders end up being a guess.",
  },
  {
    img: photoLogistics,
    alt: "Three colleagues frowning at a laptop while tracking a shipment",
    title: ["Then come", "the logistics"],
    desc: "You track shipments, organize sizes, and manage customs and duties.",
    chips: <TrackingChip />,
  },
];

export default function SwagmagicProblem() {
  return (
    <section className="relative z-10 px-section-x-sm pb-16 md:px-section-x-md md:pb-20 lg:px-section-x-lg">
      <div className="mx-auto flex w-full max-w-content flex-col">
        {/* white card (2500:4865): rounded 16, pt 160, px 80, no bottom pad */}
        <div className="flex w-full flex-col items-center rounded-[1rem] bg-white px-6 pt-16 md:px-12 md:pt-20 lg:px-20 lg:pt-[10rem]">
          <div className="flex w-full max-w-[53.75rem] flex-col items-center gap-5 text-center">
            <div className="flex flex-col items-center gap-2">
              <p
                data-animation="reveal"
                className="font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem] text-[#10995a]"
              >
                The problem
              </p>
              <h2
                data-animation="reveal"
                className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
              >
                Swag becomes your second job
              </h2>
            </div>
            <p
              data-animation="reveal"
              data-reveal-delay="120"
              className="font-sans text-[1.0625rem] leading-[1.48] text-[#6b6c71] lg:text-[1.125rem]"
            >
              Swag starts as one task: choosing what to send. Before long, you&#39;re
              managing vendors, boxes, and spreadsheets full of addresses.
            </p>
          </div>

          {/* grey tray (2500:4872): p16, gap16, rounded 32; cards p8 rounded 24 */}
          <div
            data-animation="reveal"
            data-reveal-stagger="90"
            className="mt-8 grid w-full grid-cols-1 gap-4 rounded-[2rem] bg-[#f2f2f2] p-4 md:grid-cols-3 lg:mt-10"
          >
            {CARDS.map((c) => (
              <article
                key={c.title[0]}
                data-animation="reveal"
                className="flex flex-col overflow-hidden rounded-[1.5rem] bg-white p-2 pb-8 shadow-[0px_3px_3px_0px_rgba(0,0,0,0.06)]"
              >
                <div className="relative overflow-hidden rounded-[1.25rem]">
                  <Image
                    src={c.img}
                    alt={c.alt}
                    quality={90}
                    className="aspect-[333/250] w-full object-cover lg:aspect-auto lg:h-[15.625rem]"
                    sizes="(min-width:1024px) 20rem, (min-width:768px) 31vw, 92vw"
                  />
                  {c.chips}
                </div>
                <div className="flex flex-col gap-4 px-8 pb-8 pt-[2.625rem]">
                  <h3 className="font-[family-name:var(--font-satoshi)] text-[1.6875rem] font-bold leading-[1.875rem] tracking-[-0.01875rem] text-[#16171b]">
                    {c.title[0]}
                    <br />
                    {c.title[1]}
                  </h3>
                  <p className="font-sans text-[1rem] leading-[1.5] text-[#6b6c71]">
                    {c.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* divider (2500:4919): 160 below the card, 4px #f2f2f2 hairline across
            the 1200 content width, then 80 (+ the next section's 80 = 160) */}
        <div
          data-animation="reveal"
          className="mt-16 h-1 w-full rounded-full bg-[#f2f2f2] md:mt-20 lg:mt-40"
        />
      </div>
    </section>
  );
}
