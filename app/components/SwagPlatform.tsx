/* Platform — Figma /swag 2:25186 ("The stack behind every send"). A 3×2 grid
   of feature cards, each a mini UI mockup + title + description. The mockups are
   the real Figma exports (public/swag/plat-*.png, 758×520 incl. the dotted
   green panel background). 3-up desktop → 1-up mobile. */

import Image from "next/image";
import type { StaticImageData } from "next/image";
import platStores from "@/public/swag/plat-stores.png";
import platInventory from "@/public/swag/plat-inventory.png";
import platFulfillment from "@/public/swag/plat-fulfillment.png";
import platGifting from "@/public/swag/plat-gifting.png";
import platIntegrations from "@/public/swag/plat-integrations.png";
import platBudgets from "@/public/swag/plat-budgets.png";

const CARDS: { img: StaticImageData; title: string; desc: string }[] = [
  { img: platStores, title: "Branded Stores", desc: "Branded storefronts with budgets, approvals, and SSO." },
  { img: platInventory, title: "Inventory & Storage", desc: "Live inventory, warehouse storage, and kitting in one place." },
  { img: platFulfillment, title: "Global Fulfillment", desc: "Ship to 170+ countries, with customs and duties handled." },
  { img: platGifting, title: "Automated Gifting", desc: "Automatically send swag for new hires, milestones, or API-triggered events." },
  { img: platIntegrations, title: "Integrations", desc: "Integrate with 100+ tools, including your HRIS, Slack, and CRM, to automate sends." },
  { img: platBudgets, title: "Budgets & Reporting", desc: "Get a complete view of spend, inventory, and redemption." },
];

export default function SwagPlatform() {
  return (
    <section className="bg-white px-section-x-sm py-20 md:px-section-x-md md:py-24 lg:px-section-x-lg lg:py-28">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-12">
        <div className="flex max-w-[40rem] flex-col items-center gap-5 text-center">
          <div className="flex flex-col items-center gap-2">
            <p
              data-animation="reveal"
              className="font-sans text-eyebrow-sm font-bold uppercase tracking-[0.1rem] text-swag-green-deep md:text-eyebrow-md"
            >
              THE PLATFORM
            </p>
            <h2
              data-animation="reveal"
              className="font-display text-[1.75rem] leading-[1.08] tracking-[-0.03125rem] text-swag-ink md:text-[2.25rem] lg:text-[2.75rem]"
            >
              The stack behind every send
            </h2>
          </div>
          <p
            data-animation="reveal"
            className="font-sans text-body-md text-swag-grey lg:text-[1.125rem] lg:leading-[1.45]"
          >
            Everything you need to run swag at scale, from storefronts and
            inventory to automation and reporting.
          </p>
        </div>

        <div
          data-animation="reveal"
          className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CARDS.map((c) => (
            <article
              key={c.title}
              className="flex flex-col gap-5 rounded-2xl border border-grey-200 bg-white p-4 lg:p-5"
            >
              <div className="relative aspect-[758/520] w-full overflow-hidden rounded-xl border border-grey-200 bg-[#f6faf7]">
                <Image
                  src={c.img}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 22rem, (min-width: 640px) 44vw, 90vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-2 px-1 pb-2">
                <h3 className="font-display text-[1.375rem] text-swag-ink">
                  {c.title}
                </h3>
                <p className="font-sans text-body-md leading-[1.5] text-swag-grey">
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
