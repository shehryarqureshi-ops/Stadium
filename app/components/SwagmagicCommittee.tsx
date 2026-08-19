/* /swag · BUILT FOR SIGN-OFF (Figma n9SjmDjzB1PeZAYJ5w43fr → 2500:5544 "Committee",
   page frame 2500:4706, rev 2026-08-19). "Get every stakeholder on board" — a
   centered header (880 wide) over an 880-wide #f2f2f2 tray holding a 2×2 grid
   of white stakeholder cards: floating photo (400×260, radius 8 top / 24
   bottom, layered drop shadow) + role + one-line pitch. Photos are Figma's
   Figma node exports at 4x (2026-08-19 refresh, image nodes 2528:4732/4738/
   4740/4742) — the 400x260 crop is already baked in, so object-center is exact.

   Figma stack (1440, absolute y from 7742; frame is 1264 tall = 1104 content
   + 160 internal bottom space → section = lg:py-20 like every white section):
     eyebrow   y=0    h=15   (12px Overpass SemiBold, tracking .72, #218554)
     title     y=23   h=48   (44px Satoshi Bold / 1.08 / -0.5)      gap 8
     subhead   y=91   h=53   (18px Overpass / 26.1px, #707075, 2 lines) gap 20
     grid      y=184  h=920  (880 wide, p16 gap16, cards 416×436)  gap 40
       card    p8 · photo 400×260 · text px32 pt40 pb32 gap16
               title 25px/1.04/-0.3 (h26) · desc 15px/1.5 (h46)
     end       y=1104 → +160 → 1264 (next section at 9006) */

import Image, { type StaticImageData } from "next/image";
import marketing from "@/public/swag2/sw2-committee-marketing.jpg";
import hr from "@/public/swag2/sw2-committee-hr.jpg";
import procurement from "@/public/swag2/sw2-committee-procurement.jpg";
import it from "@/public/swag2/sw2-committee-it.jpg";

const CARDS: {
  img: StaticImageData;
  /** object-position — calibrated against Figma's crop of the same original */
  pos: string;
  title: string;
  desc: string;
}[] = [
  {
    img: marketing,
    pos: "object-center",
    title: "Marketing & Brand",
    desc: "Every branded moment—stores, kits, events, hiring—on-brand and at scale.",
  },
  {
    img: hr,
    pos: "object-center",
    title: "HR & People Ops",
    desc: "New-hire kits and milestone swag run themselves. Marketing touches zero orders.",
  },
  {
    img: procurement,
    pos: "object-center",
    title: "Procurement & Finance",
    desc: "One vendor. One PO. Budgets and per-team wallets you control.",
  },
  {
    img: it,
    pos: "object-center",
    title: "IT & Security",
    desc: "SSO, SCIM, and SOC 2 out of the box. Nothing breaks identity or audit.",
  },
];

export default function SwagmagicCommittee() {
  return (
    <section className="bg-white px-section-x-sm py-16 md:px-section-x-md md:py-20 lg:px-section-x-lg lg:py-20">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-8 lg:gap-10">
        {/* header — 880 wide, centered */}
        <div className="flex w-full max-w-[55rem] flex-col items-center gap-5 text-center">
          <div className="flex w-full flex-col items-center gap-2">
            <p
              data-animation="reveal"
              className="font-sans text-[0.75rem] font-semibold uppercase leading-[1.25] tracking-[0.045rem] text-[#218554]"
            >
              Built for sign-off
            </p>
            <h2
              data-animation="reveal"
              className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
            >
              Get every stakeholder on board
            </h2>
          </div>
          <p
            data-animation="reveal"
            className="font-sans text-[1.0625rem] leading-[1.45] text-[#707075] lg:text-[1.125rem]"
          >
            Every team has different priorities with swag. Here’s what
            <br className="hidden lg:block" /> each one needs to sign off with confidence.
          </p>
        </div>

        {/* grey tray — 880 wide, 2×2 cards */}
        <div
          data-animation="reveal"
          data-reveal-stagger="90"
          className="grid w-full max-w-[55rem] grid-cols-1 gap-4 rounded-[2rem] bg-[#f2f2f2] p-4 md:grid-cols-2"
        >
          {CARDS.map((c) => (
            <article
              key={c.title}
              data-animation="reveal"
              className="flex flex-col overflow-hidden rounded-[1.5rem] bg-white p-2 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)]"
            >
              {/* floating photo: 8px top corners, 24px bottom corners, layered drop shadow */}
              <div className="w-full overflow-hidden rounded-t-[0.5rem] rounded-b-[1.5rem] shadow-[0px_1.25rem_0.625rem_0px_rgba(0,0,0,0.15),0px_0.399rem_0.199rem_0px_rgba(0,0,0,0.12),0px_0.151rem_0.075rem_0px_rgba(0,0,0,0.11),0px_0.05rem_0.025rem_0px_rgba(0,0,0,0.1)]">
                <Image
                  src={c.img}
                  alt={c.title}
                  quality={90}
                  className={`aspect-[400/260] h-auto w-full object-cover ${c.pos}`}
                  sizes="(min-width:1024px) 25rem, (min-width:768px) 44vw, 92vw"
                />
              </div>
              <div className="flex flex-col gap-4 px-6 pb-8 pt-10 md:px-8">
                <h3 className="font-[family-name:var(--font-satoshi)] text-[1.5625rem] font-bold leading-[1.04] tracking-[-0.01875rem] text-[#16171b]">
                  {c.title}
                </h3>
                <p className="font-sans text-[0.9375rem] leading-[1.5] text-[#6b6c71]">
                  {c.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
