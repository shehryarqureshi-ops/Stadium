/* Left intro + 2×2 numbered cards — Figma /roles-and-permissions "Access by
   role" (3826:15326), /integrations/sso "Enterprise access" (4301:32802),
   /integrations/security "Security at a glance" (4301:32965), /the-proof
   "Built for trust" (3816:4402). Intro column 405 (eyebrow · 44 title ·
   18/26.1 #707075, optional dark pill pinned to the column foot) → 100 gap →
   a #f2f2f2 r32 p16 tray of white r24 p24 cards: number 16 #828282 +0.4 → 40
   → title 25/1.04/−0.3 Satoshi Bold → 14 → body 15/1.5 #6b6c71.
   `panel`: the whole block sits in a #f7f7f7 r60 band (px100 py160, gap 40).
   `highlight`: index of the card lifted with the grid-card-active shadow. */

import PillLink from "./PillLink";
import SectionIntro from "./SectionIntro";

export type NumberedCard = { title: string; description: string };

export type NumberedCardGridProps = {
  caption?: string;
  title: string;
  description?: string;
  cards: NumberedCard[];
  cta?: { label: string; href: string };
  panel?: boolean;
  highlight?: number;
};

const ACTIVE_SHADOW =
  "shadow-[0px_20px_20px_-2px_rgba(0,0,0,0.15),0px_6.383px_6.383px_-1.5px_rgba(0,0,0,0.12),0px_2.415px_2.415px_-1px_rgba(0,0,0,0.11),0px_0.796px_0.796px_-0.5px_rgba(0,0,0,0.1)]";

export default function NumberedCardGrid({
  caption,
  title,
  description,
  cards,
  cta,
  panel = false,
  highlight,
}: NumberedCardGridProps) {
  return (
    <section className="px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
      <div
        className={`mx-auto grid w-full max-w-content grid-cols-1 gap-10 lg:grid-cols-[25.3125rem_minmax(0,1fr)] ${
          panel
            ? "rounded-[2.5rem] bg-pricing-tray px-5 py-16 md:px-10 md:py-24 lg:gap-10 lg:rounded-[3.75rem] lg:px-25 lg:py-40"
            : "lg:gap-25"
        }`}
      >
        <div className="flex flex-col items-start justify-between gap-8">
          <SectionIntro
            caption={caption}
            title={title}
            description={description}
            align="left"
          />
          {cta && (
            <div data-animation="reveal">
              <PillLink {...cta} />
            </div>
          )}
        </div>

        <ul
          data-animation="reveal"
          className="grid grid-cols-1 gap-4 self-start rounded-[2rem] bg-pricing-cell p-4 sm:grid-cols-2"
        >
          {cards.map((card, i) => (
            <li
              key={card.title}
              className={`flex flex-col gap-10 rounded-3xl bg-white p-6 ${
                i === highlight ? ACTIVE_SHADOW : "shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)]"
              }`}
            >
              <span className="font-sans text-body-md leading-none tracking-[0.025rem] text-[#828282]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-3.5">
                <h3 className="font-display text-[1.5625rem] font-bold leading-[1.04] tracking-[-0.01875rem] text-pricing-ink">
                  {card.title}
                </h3>
                <p className="font-sans text-feature leading-[1.5] text-swag-grey">
                  {card.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
