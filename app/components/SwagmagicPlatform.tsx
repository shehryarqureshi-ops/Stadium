/* /swag · THE PLATFORM (Figma n9SjmDjzB1PeZAYJ5w43fr → 2500:5128, page frame
   2500:4706, section y=5448..6699 at 1440). "The stack behind every send" — a
   grey tray (#f2f2f2, r32, p16) holding a 3×2 grid of white cards (r24, p8,
   shadow 0 3 6 .06). Each card = a dark-green UI mockup (376×260, r20 —
   shipped as the Figma graphic node exported at 4× = 1504×1040 PNG, cropped
   to the node bounds) + title (Satoshi 25/1.04) + description (Overpass
   15/1.5). Container: site 1200 (Figma draws 1240 @ x=100) — every inner
   proportion is kept (card = (W-64)/3, graphic keeps 376:260).

   Figma stack (y relative to the section frame, 1440):
     eyebrow "THE PLATFORM"      y=0    h=17   (12px / 1.4, #10995a, +0.1rem)
     gap 8
     h2 (44px / 1.08)            y=25   h=48
     gap 20
     subhead (18px / 1.48, 2 ln) y=93   h=54   → header block 0..147 (880 wide)
     gap 40
     grid tray                   y=187  h=904  (p16 · cards 428 · gap 16 · 428 · p16)
       card: graphic 8,8 376×260 · text block 8,268 376×152 (p32, title 26, gap 16, desc 46)
     frame bottom pad            y=1091 h=160  (→ next section 6699)
   Site: py-20 (80) top/bottom = 160 visible to both neighbours (they carry 80 too). */

import Image, { type StaticImageData } from "next/image";
import mockStores from "@/public/swag2/sw2-platform-stores.png";
import mockInventory from "@/public/swag2/sw2-platform-inventory.png";
import mockFulfillment from "@/public/swag2/sw2-platform-fulfillment.png";
import mockGifting from "@/public/swag2/sw2-platform-gifting.png";
import mockIntegrations from "@/public/swag2/sw2-platform-integrations.png";
import mockBudgets from "@/public/swag2/sw2-platform-budgets.png";

const CARDS: { img: StaticImageData; alt: string; title: string; desc: string }[] = [
  {
    img: mockStores,
    alt: "Branded storefront window at yourbrand.com showing a Shop Collection grid",
    title: "Branded Stores",
    desc: "Branded storefronts with budgets, approvals, and SSO.",
  },
  {
    img: mockInventory,
    alt: "Inventory table listing T-Shirt 1,250, Hoodie 820, Tote bag 540, Mug 320",
    title: "Inventory & Storage",
    desc: "Live inventory, warehouse storage, and kitting in one place.",
  },
  {
    img: mockFulfillment,
    alt: "World map with a shipping route, 170+ destinations and Customs handled",
    title: "Global Fulfillment",
    desc: "Ship to 170+ countries, with customs and duties handled.",
  },
  {
    img: mockGifting,
    alt: "Automation flow from new hire to gift delivered",
    title: "Automated Gifting",
    desc: "Automatically send swag for new hires, milestones, or API-triggered events.",
  },
  {
    img: mockIntegrations,
    alt: "Stadium symbol surrounded by HRIS and payroll integration logos",
    title: "Integrations",
    desc: "Integrate with 100+ tools, including your HRIS, Slack, and CRM, to automate sends.",
  },
  {
    img: mockBudgets,
    alt: "Reporting chart showing 2.7x more employee recognition, on track and 18% under budget",
    title: "Budgets & Reporting",
    desc: "Get a complete view of spend, inventory, and redemption.",
  },
];

export default function SwagmagicPlatform() {
  return (
    <section
      aria-labelledby="swag-platform-heading"
      className="bg-white px-section-x-sm py-16 md:px-section-x-md md:py-20 lg:px-section-x-lg lg:py-20"
    >
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-10">
        {/* header — 880 wide in Figma, centred */}
        <div className="flex w-full max-w-[55rem] flex-col items-center gap-5 text-center">
          <div className="flex flex-col items-center gap-2">
            <p
              data-animation="reveal"
              className="font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem] text-[#10995a]"
            >
              The platform
            </p>
            <h2
              id="swag-platform-heading"
              data-animation="reveal"
              className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
            >
              The stack behind every send
            </h2>
          </div>
          <p
            data-animation="reveal"
            className="font-sans text-[1.125rem] leading-[1.48] text-[#6b6c71]"
          >
            Everything you need to run swag at scale, from storefronts
            <br className="hidden lg:block" />
            and inventory to automation and reporting.
          </p>
        </div>

        {/* grey tray · 3×2 cards */}
        <div
          data-animation="reveal"
          data-reveal-stagger="80"
          className="w-full rounded-[2rem] bg-[#f2f2f2] p-4"
        >
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
            {CARDS.map((c) => (
              <li
                key={c.title}
                data-animation="reveal"
                className="flex flex-col overflow-hidden rounded-[1.5rem] bg-white p-2 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)]"
              >
                <div className="overflow-hidden rounded-[1.25rem]">
                  <Image
                    src={c.img}
                    alt={c.alt}
                    quality={100}
                    className="aspect-[376/260] w-full object-cover lg:aspect-auto lg:h-[16.25rem]"
                    sizes="(min-width:1024px) 22.75rem, (min-width:640px) 45vw, 92vw"
                  />
                </div>
                <div className="flex flex-col gap-4 p-8">
                  <h3 className="font-[family-name:var(--font-satoshi)] text-[1.5625rem] font-bold leading-[1.04] tracking-[-0.01875rem] text-[#16171b]">
                    {c.title}
                  </h3>
                  <p className="font-sans text-[0.9375rem] leading-[1.5] text-[#6b6c71]">{c.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
