/* Text + product graphic side by side — Figma /impact "one company" and
   "centralized budgets" rows (3998:15111 / 3998:15287). Intro (eyebrow,
   44px title, 18/26.1 #707075) beside a 580×450 #f8f8f8 r24 panel with a
   #f2f2f2 hairline and 0/4/16 shadow — baked into the 2× Figma export (it
   carries the panel frame + shadow margin, 612×482), so the image renders
   unframed; `reverse` puts the graphic first. */

import Image, { type StaticImageData } from "next/image";

import SectionIntro from "./SectionIntro";

export type SplitFeatureProps = {
  caption?: string;
  title: string;
  description: string;
  image: StaticImageData;
  imageAlt: string;
  reverse?: boolean;
};

export default function SplitFeature({
  caption,
  title,
  description,
  image,
  imageAlt,
  reverse = false,
}: SplitFeatureProps) {
  return (
    <section className="px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
      <div
        className={`mx-auto flex w-full max-w-content flex-col items-center gap-10 lg:gap-20 ${
          reverse ? "lg:flex-row-reverse" : "lg:flex-row"
        }`}
      >
        <div className="w-full min-w-0 flex-1">
          <SectionIntro caption={caption} title={title} description={description} align="left" />
        </div>
        <div data-animation="reveal" className="w-full max-w-[38.25rem] shrink-0 lg:w-[38.25rem]">
          <Image
            src={image}
            alt={imageAlt}
            quality={100}
            sizes="(min-width: 1024px) 38.25rem, 92vw"
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
