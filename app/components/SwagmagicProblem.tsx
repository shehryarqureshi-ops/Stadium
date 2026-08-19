/* /swag · THE PROBLEM (Figma n9SjmDjzB1PeZAYJ5w43fr → problem 2500:4861 +
   the following "divider" section 2500:4919). A white rounded-16 card (1240 in
   Figma → the site's 1200 content width) that scrolls OVER the hero shader
   (SwagmagicHero paints its bg 806px past its own bottom; this section is
   transparent + z-10). Header (eyebrow #10995a → 44px Satoshi title → 18px
   subhead, 860 max) → 40 → a #f2f2f2 rounded-32 tray with three white photo
   cards. (The frosted vendor/tracking chips that used to sit on these photos
   were removed from the design on 2026-08-19, along with new photography —
   image nodes 2528:4726 / 4728 / 4730.)
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

import Image, { type StaticImageData } from "next/image";
import photoVendors from "@/public/swag2/sw2-problem-vendors.jpg";
import photoCloset from "@/public/swag2/sw2-problem-closet.jpg";
import photoLogistics from "@/public/swag2/sw2-problem-logistics.jpg";

const CARDS: {
  img: StaticImageData;
  alt: string;
  title: [string, string];
  desc: string;
}[] = [
  {
    img: photoVendors,
    alt: "A person leaning wearily on a half-packed swag box in a busy office",
    title: ["One vendor", "becomes four"],
    desc: "Swag, kits, and fulfillment each need their own vendor, login, and invoice.",
  },
  {
    img: photoCloset,
    alt: "Someone packing a box beside shelves crowded with overflowing swag cartons",
    title: ["The swag closet", "keeps growing"],
    desc: "Boxes pile up, inventory becomes outdated, and reorders end up being a guess.",
  },
  {
    img: photoLogistics,
    alt: "A person on the phone sorting stacks of folded apparel across a work table",
    title: ["Then come", "the logistics"],
    desc: "You track shipments, organize sizes, and manage customs and duties.",
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
