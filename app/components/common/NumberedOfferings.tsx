/* "One platform. More ways …" — Figma "five ways" on the team pages (e.g.
   3998:14008). Sticky intro on the left; on the right a #f2f2f2 tray of
   numbered white cards (shadow "grid-card-active"): number 16 #828282 (p16)
   over a #f7f7f7 r24 p24 panel (title 25/1.04/−0.3, body 15/1.5), and a
   243×216 r20 image on the right. Missing images render the Figma #e0e0e0
   placeholder. */

import Image, { type StaticImageData } from "next/image";

import SectionIntro from "./SectionIntro";

export type NumberedOffering = {
  title: string;
  description: string;
  image?: StaticImageData;
  imageAlt?: string;
};

export type NumberedOfferingsProps = {
  caption?: string;
  title: string;
  description?: string;
  items: NumberedOffering[];
};

const ACTIVE_SHADOW =
  "shadow-[0px_20px_20px_-2px_rgba(0,0,0,0.15),0px_6.383px_6.383px_-1.5px_rgba(0,0,0,0.12),0px_2.415px_2.415px_-1px_rgba(0,0,0,0.11),0px_0.796px_0.796px_-0.5px_rgba(0,0,0,0.1)]";

export default function NumberedOfferings({
  caption,
  title,
  description,
  items,
}: NumberedOfferingsProps) {
  return (
    <section className="px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
      <div className="mx-auto grid w-full max-w-content grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_41.5625rem] lg:gap-[3.75rem]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionIntro caption={caption} title={title} description={description} align="left" />
        </div>

        <ol data-animation="reveal" className="flex flex-col gap-4 rounded-[2rem] bg-pricing-cell p-4">
          {items.map((item, i) => (
            <li
              key={item.title}
              className={`flex flex-col-reverse gap-2.5 overflow-hidden rounded-3xl bg-white p-2.5 sm:flex-row sm:items-stretch ${ACTIVE_SHADOW}`}
            >
              <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
                <span className="p-4 font-sans text-body-md leading-none tracking-[0.025rem] text-[#828282]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-4 rounded-3xl bg-pricing-tray p-6">
                  <h3 className="font-display text-[1.5625rem] font-bold leading-[1.04] tracking-[-0.01875rem] text-pricing-ink">
                    {item.title}
                  </h3>
                  <p className="font-sans text-feature leading-[1.5] text-swag-grey">
                    {item.description}
                  </p>
                </div>
              </div>
              <div className="relative aspect-[243/216] w-full shrink-0 overflow-hidden rounded-[1.25rem] bg-[#e0e0e0] sm:aspect-auto sm:w-[15.1875rem]">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.imageAlt ?? item.title}
                    fill
                    quality={90}
                    sizes="(min-width: 640px) 15.1875rem, 92vw"
                    className="object-cover"
                  />
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
