/* Large product view under a centered intro — Figma "Company workspace"
   dashboards on the team pages (e.g. 3998:9801) and the /impact "Every team
   engages people" graphic (3998:14605). Intro → 40 → image (exported Figma
   graphic, rounded + soft shadow when `framed`) → 40 → optional caption. */

import Image, { type StaticImageData } from "next/image";

import SectionIntro from "./SectionIntro";

export type ImageShowcaseProps = {
  caption?: string;
  title: string;
  description?: string;
  image: StaticImageData;
  imageAlt: string;
  footnote?: string;
  /* rounded corners + drop shadow around the image (dashboards) */
  framed?: boolean;
};

export default function ImageShowcase({
  caption,
  title,
  description,
  image,
  imageAlt,
  footnote,
  framed = true,
}: ImageShowcaseProps) {
  return (
    <section className="px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-10">
        <SectionIntro caption={caption} title={title} description={description} />

        <div
          data-animation="reveal"
          className={`w-full ${
            framed
              ? "overflow-hidden rounded-xl shadow-[0px_1.25rem_2.5rem_-0.5rem_rgba(22,23,27,0.18),0px_0.25rem_0.75rem_0px_rgba(22,23,27,0.06)] md:rounded-3xl"
              : ""
          }`}
        >
          <Image
            src={image}
            alt={imageAlt}
            quality={100}
            sizes="(min-width: 1440px) 1260px, 92vw"
            className="h-auto w-full"
          />
        </div>

        {footnote && (
          <p
            data-animation="reveal"
            className="max-w-[55rem] text-center font-sans text-body-md leading-[1.48] text-swag-grey md:text-body-lg md:leading-[1.48]"
          >
            {footnote}
          </p>
        )}
      </div>
    </section>
  );
}
