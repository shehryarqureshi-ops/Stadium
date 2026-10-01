/* Two-up checklist cards — Figma "cards" pairs on the team pages (e.g.
   /impact/marketing "Keep your brand consistent at scale", 3998:18252).
   Centered intro → 40 → a #f2f2f2 r32 p16 tray (max 1000) of white r24 p10
   cards: #f7f7f7 r16 p24 title block (32/40 Satoshi Bold) over a p24 body
   (16/1.5 #828282 → 32 → check rows 15/1.4, gap 12). */

import { Check } from "lucide-react";

import SectionIntro from "./SectionIntro";

export type ChecklistCard = {
  /* optional small label above the title (e.g. /impact/office-admins "Office needs") */
  eyebrow?: string;
  title: string;
  description: string;
  bullets: string[];
};

export type ChecklistCardsProps = {
  caption?: string;
  title: string;
  description?: string;
  cards: ChecklistCard[];
};

export default function ChecklistCards({ caption, title, description, cards }: ChecklistCardsProps) {
  return (
    <section className="px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-10">
        <SectionIntro caption={caption} title={title} description={description} />

        <ul
          data-animation="reveal"
          className="grid w-full max-w-[62.5rem] grid-cols-1 gap-4 rounded-[2rem] bg-pricing-cell p-4 md:grid-cols-2"
        >
          {cards.map((c) => (
            <li
              key={c.title}
              className="flex flex-col gap-2.5 rounded-3xl bg-white p-2.5 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)]"
            >
              <div className="flex flex-col gap-2 rounded-2xl bg-pricing-tray p-6">
                {c.eyebrow && (
                  <p className="font-sans text-eyebrow-sm uppercase leading-4 text-pricing-ink">{c.eyebrow}</p>
                )}
                <h3 className="font-display text-heading-sm text-pricing-ink md:text-heading-md">
                  {c.title}
                </h3>
              </div>
              <div className="flex flex-col gap-8 p-6">
                <p className="font-sans text-body-md text-[#828282]">{c.description}</p>
                <ul className="flex flex-col gap-3 pb-2">
                  {c.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <Check
                        aria-hidden
                        className="mt-[0.1875rem] size-3.5 shrink-0 text-pricing-ink"
                        strokeWidth={2}
                      />
                      <span className="font-sans text-feature text-pricing-ink">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
