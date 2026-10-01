/* Left intro + stacked numbered cards with a graphic — Figma
   /integrations/sso "Get SSO set up" (4301:32922) and /integrations/api
   "Get started with Stadium's API". Intro column 405 (optional dark pill or a
   "What happens next" note pinned to its foot) → 100 → a #f2f2f2 r32 p16 tray
   of white cards (r24, p8 + 8 white border, 0/3/6 shadow): a 260-wide
   exported graphic (the #f8f8f8 r20 panel is baked into the export) beside
   px32 py24 copy — number 16 #828282 → 16 → title 25/1.04 → 16 → body 15/1.5.
   Body is a ReactNode so it can carry a mailto link. */

import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

import PillLink from "./PillLink";
import SectionIntro from "./SectionIntro";

export type NumberedMediaItem = {
  title: string;
  description: ReactNode;
  /* omit for the grey #f8f8f8 placeholder panel */
  image?: StaticImageData;
  imageAlt?: string;
};

export type NumberedMediaListProps = {
  caption?: string;
  title: string;
  description?: string;
  items: NumberedMediaItem[];
  cta?: { label: string; href: string };
  note?: { caption: string; text: string };
};

export default function NumberedMediaList({
  caption,
  title,
  description,
  items,
  cta,
  note,
}: NumberedMediaListProps) {
  return (
    <section className="px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
      <div className="mx-auto grid w-full max-w-content grid-cols-1 gap-10 lg:grid-cols-[25.3125rem_minmax(0,1fr)] lg:gap-25">
        <div className="flex flex-col items-start justify-between gap-8">
          <SectionIntro caption={caption} title={title} description={description} align="left" />
          {cta && (
            <div data-animation="reveal">
              <PillLink {...cta} />
            </div>
          )}
          {note && (
            <div data-animation="reveal" className="flex flex-col gap-5">
              <p className="font-sans text-eyebrow-sm uppercase leading-[1.4] tracking-[0.1rem] text-[#707075]">
                {note.caption}
              </p>
              <p className="font-sans text-body-lg leading-[1.5] text-swag-grey">{note.text}</p>
            </div>
          )}
        </div>

        <ol
          data-animation="reveal"
          className="flex flex-col gap-4 self-start rounded-[2rem] bg-pricing-cell p-4"
        >
          {items.map((item, i) => (
            <li
              key={item.title}
              className="flex flex-col overflow-hidden rounded-3xl border-8 border-white bg-white p-2 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)] sm:flex-row"
            >
              <div className="relative flex min-h-[10.75rem] w-full shrink-0 items-center justify-center overflow-hidden rounded-[1.25rem] bg-[#f8f8f8] sm:w-[16.25rem]">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.imageAlt ?? ""}
                    quality={100}
                    sizes="(min-width: 640px) 16.25rem, 92vw"
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-4 px-6 py-6 sm:px-8 [&_a]:underline [&_a]:underline-offset-2">
                <span className="font-sans text-body-md leading-none tracking-[0.025rem] text-[#828282]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-[1.5625rem] font-bold leading-[1.04] tracking-[-0.01875rem] text-pricing-ink">
                  {item.title}
                </h3>
                <p className="font-sans text-feature leading-[1.5] text-swag-grey">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
