"use client";

import type { StaticImageData } from "next/image";
import Image from "next/image";
import { useRef } from "react";

export type CarouselItem = {
  title: string;
  caption: string;
  image: StaticImageData;
  alt?: string;
};

type CatalogCarouselProps = {
  caption: string;
  title: string;
  description: string;
  items: CarouselItem[];
};

function Arrow({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4 text-ink"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {dir === "prev" ? (
        <path d="M19 12H5M12 19l-7-7 7-7" />
      ) : (
        <path d="M5 12h14M12 5l7 7-7 7" />
      )}
    </svg>
  );
}

export default function HorizontalCarousel({
  caption,
  title,
  description,
  items,
}: CatalogCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);

  const scroll = (dir: number) => {
    trackRef.current?.scrollBy({
      left: dir * 372,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full overflow-x-clip bg-white">
      <div className="flex flex-col gap-10 py-16 md:py-24 lg:py-[7.5rem]">
        {/* Header */}
        <div className="mx-auto w-full max-w-section px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
          <div className="flex max-w-[52.5rem] flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p
                data-animation="reveal"
                className="font-sans text-[0.75rem] font-bold uppercase leading-4 tracking-[0.0625rem] text-[#1b1b1b]/60"
              >
                {caption}
              </p>

              <h2
                data-animation="reveal"
                className="font-display text-heading-sm text-ink md:text-heading-md lg:text-[3.4375rem] lg:leading-[3.75rem] lg:tracking-[-0.075rem]"
              >
                {title}
              </h2>
            </div>

            <p
              data-animation="reveal"
              className="font-sans text-[1rem] font-semibold leading-6 text-ink"
            >
              {description}
            </p>
          </div>
        </div>

        {/* Carousel */}
        <div className="flex w-full flex-col gap-8 overflow-clip">
          <ul
            ref={trackRef}
            className="carousel-bleed flex gap-6 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {items.map((item) => (
              <li
                data-animation="reveal"
                key={item.title}
                className="group relative flex aspect-[348/460] w-[17rem] shrink-0 flex-col overflow-hidden rounded-2xl bg-[#f9f7f8] lg:w-[21.75rem]"
              >
                <div className="relative z-10 flex flex-col gap-1 px-6 pb-4 pt-6">
                  <span className="font-sans text-[0.75rem] font-bold uppercase tracking-[0.0625rem] text-ink">
                    {item.caption}
                  </span>

                  <span className="font-display text-heading-sm text-ink">
                    {item.title}
                  </span>
                </div>

                <Image
                  src={item.image}
                  alt={item.alt ?? item.title}
                  fill
                  sizes="(min-width: 1024px) 348px, 272px"
                  className="object-cover object-bottom mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </li>
            ))}
          </ul>

          {/* Navigation */}
          <div className="mx-auto flex w-full max-w-section justify-end gap-2.5 px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => scroll(-1)}
              className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-[#e8e9ed] transition-colors hover:bg-grey-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            >
              <Arrow dir="prev" />
            </button>

            <button
              type="button"
              aria-label="Next"
              onClick={() => scroll(1)}
              className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-[#e8e9ed] transition-colors hover:bg-grey-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            >
              <Arrow dir="next" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
