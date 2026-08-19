/* /gifting · THE PROBLEM (Figma n9SjmDjzB1PeZAYJ5w43fr → "problem" 2504:14291,
   card 2504:14292, header 2504:14294, card row 2504:14299). A white rounded-16
   card (Figma draws 1240 @ x=100 → the site's 1200 content width) that scrolls
   OVER the hero raster: GiftingHero paints its background 710px past its own
   bottom, so this section is transparent + `relative z-10`. Header (eyebrow
   #996b00 → 44px Satoshi title → 18px subhead, 860 max, all centred) → 40 → a
   #f2f2f2 rounded-32 tray with three white cards.

   The three card visuals are Figma UI mockups, not photographs: card 1 is a
   pure-vector "Vendors" desktop window and cards 2–3 are photos with baked
   miniature UI on top (85px product tiles with 7px labels; 7px chat pills).
   Rebuilding those overlays in HTML would break below lg — at md the card is
   ~183 wide against Figma's 339, so fixed-rem 7px chrome would overflow its
   own photo. So all three ship as `defaultScale: 4` node exports per
   design.md "Image quality" (UI mockups → 4× export, served quality={100}):
   card 1 as lossless PNG (flat vector, 36 KB), cards 2–3 as q95 4:4:4 JPEG
   flattened on white (photo-dominant; PNG was 1.6 MB each). At 1291px for a
   ~309 CSS slot that is 4.2× — sharp past 400% zoom, and it scales exactly at
   every breakpoint.

   Figma stack (absolute y at 1440):
     1009      card top (rounded 16, pt 160, px 80, no bottom padding)
     1169      eyebrow 12/1.4 (17)              → 8
     1194      h2 44/1.08 ×2 (96)               → 20
     1310      subhead 18/1.48 ×2 (54)          → 40
     1404      tray p16 gap16 (520): cards 488 = image 250 + text (pt42/pb32)
     1924      card ends flush; section ends                     → 160
     2084      next section (we give 80, the next section's lg:py-20 gives 80). */

import Image, { type StaticImageData } from "next/image";
import mockVendors from "@/public/gift2/gf-problem-vendors.png";
import mockChoosing from "@/public/gift2/gf-problem-choosing.jpg";
import mockImpact from "@/public/gift2/gf-problem-impact.jpg";

const CARDS: {
  img: StaticImageData;
  alt: string;
  title: [string, string];
  desc: string;
}[] = [
  {
    img: mockVendors,
    alt: "A vendor admin window listing five gifting vendors, each tagged “Renew Contract” or “Managed Vendor”",
    title: ["Vendor & Tool", "Sprawl"],
    desc: "Each new gifting project adds another vendor, contract, or workflow.",
  },
  {
    img: mockChoosing,
    alt: "Someone frowning at a laptop while three product tiles — non-alcohol wine, a Soleil glass, a wireless headset — are ticked off for them",
    title: ["Choosing for", "Everyone"],
    desc: "You're guessing what people like, need, and use.",
  },
  {
    img: mockImpact,
    alt: "Someone holding their head while chat pills from Finance, Sales, the CEO and Marketing all ask for gifting numbers at once",
    title: ["No Measurable", "Impact"],
    desc: "Budgets, orders, and reporting live in different tools, making spend hard to track.",
  },
];

export default function GiftingProblem() {
  return (
    <section className="relative z-10 px-section-x-sm pb-16 md:px-section-x-md md:pb-20 lg:px-section-x-lg">
      <div className="mx-auto flex w-full max-w-content flex-col">
        {/* white card (2504:14292): rounded 16, pt 160, px 80, flush bottom */}
        <div className="flex w-full flex-col items-center rounded-[1rem] bg-white px-6 pt-16 md:px-12 md:pt-20 lg:px-20 lg:pt-40">
          {/* header (2504:14294): 860 wide, centred, gap 20 / inner gap 8 */}
          <div className="flex w-full max-w-[53.75rem] flex-col items-center gap-5 text-center">
            <div className="flex flex-col items-center gap-2">
              <p
                data-animation="reveal"
                className="font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem] text-[#996b00]"
              >
                THE PROBLEM
              </p>
              <h2
                data-animation="reveal"
                className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
              >
                Every team gifts differently, and the gaps are obvious
              </h2>
            </div>
            <p
              data-animation="reveal"
              data-reveal-delay="120"
              className="font-sans text-[1.0625rem] leading-[1.48] text-[#6b6c71] lg:text-[1.125rem]"
            >
              Sales runs its own platform, HR defaults to gift cards, and
              Marketing uses an agency.
              <br className="hidden lg:inline" /> Budgets, vendors, and
              reporting never line up.
            </p>
          </div>

          {/* grey tray (2504:14299): p16, gap16, rounded 32; cards p8 rounded 24 */}
          <div
            data-animation="reveal"
            data-reveal-stagger="90"
            className="mt-8 grid w-full grid-cols-1 gap-4 rounded-[2rem] bg-[#f2f2f2] p-4 md:grid-cols-3 lg:mt-10"
          >
            {CARDS.map((c) => (
              <article
                key={c.title[0]}
                data-animation="reveal"
                className="flex flex-col overflow-hidden rounded-[1.5rem] bg-white p-2 shadow-[0px_3px_3px_0px_rgba(0,0,0,0.06)]"
              >
                <div className="overflow-hidden rounded-[1.25rem]">
                  <Image
                    src={c.img}
                    alt={c.alt}
                    quality={100}
                    className="aspect-[323/250] w-full object-cover lg:aspect-auto lg:h-[15.625rem]"
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
      </div>
    </section>
  );
}
