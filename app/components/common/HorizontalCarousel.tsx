import type { StaticImageData } from "next/image";
import Image from "next/image";
import CarouselControls from "./CarouselControls";
import { ReactNode } from "react";

export type CatalogCarouselItem = {
  title: string;
  caption?: string;
  image: StaticImageData;
  alt?: string;
};

export type ContentCarouselItem = {
  title: string;
  description: string;
  image: StaticImageData;
  alt?: string;
  radius?: string;
};

type HorizontalCarouselProps =
  | {
      variant: "catalog";
      caption?: string;
      captionColor?: string;
      title: ReactNode;
      description: string;
      items: CatalogCarouselItem[];
    }
  | {
      variant: "content";
      caption: string;
      captionColor?: string;
      title: ReactNode;
      description: string;
      items: ContentCarouselItem[];
    };

export default function HorizontalCarousel(props: HorizontalCarouselProps) {
  const trackId = `horizontal-carousel-${props.variant}`;

  return (
    <section className="w-full overflow-x-hidden bg-white">
      <div className="flex flex-col gap-10">
        {/* Header */}
        <div className="mx-auto w-full max-w-section px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
          <div className="flex max-w-[52.5rem] flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p
                data-animation="reveal"
                className="font-sans text-[0.75rem] font-bold uppercase leading-4 tracking-[0.0625rem]"
                style={{ color: props.captionColor }}
              >
                {props.caption}
              </p>

              <h2
                data-animation="reveal"
                className="font-display text-heading-sm text-ink md:text-heading-md lg:text-[3.4375rem] lg:leading-[3.75rem] lg:tracking-[-0.075rem]"
              >
                {props.title}
              </h2>

              <p
                data-animation="reveal"
                className="mt-2 font-sans text-[1rem] font-semibold leading-6 text-ink"
              >
                {props.description}
              </p>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="flex w-full flex-col gap-8 overflow-clip">
          <ul
            data-animation="reveal"
            id={trackId}
            className="carousel-bleed flex gap-6 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {props.variant === "catalog"
              ? props.items.map((item) => (
                  <li key={item.title} className="shrink-0">
                    <article className="group relative flex aspect-[348/460] w-[17rem] shrink-0 flex-col overflow-hidden rounded-2xl bg-[#f9f7f8] lg:w-[21.75rem]">
                      <div className="relative z-10 flex flex-col gap-1 px-6 pb-4 pt-6">
                        {item.caption && (
                          <span className="font-sans text-[0.75rem] font-bold uppercase tracking-[0.0625rem] text-ink">
                            {item.caption}
                          </span>
                        )}

                        <span className="font-display text-heading-sm text-ink">
                          {item.title}
                        </span>
                      </div>

                      <Image
                        src={item.image}
                        alt={item.alt ?? item.title}
                        fill
                        quality={90}
                        sizes="(min-width: 1024px) 348px, 272px"
                        className="object-cover object-bottom mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </article>
                  </li>
                ))
              : props.items.map((item, index) => (
                  <li key={`${item.title}-${index}`} className="shrink-0">
                    <article
                      data-animation="reveal"
                      className="flex w-[16.55rem] shrink-0 snap-start flex-col gap-6 overflow-hidden rounded-[1.5rem] bg-[#f7f7f7] p-2"
                    >
                      <div className="flex flex-col gap-2 px-4 pt-4">
                        <h2 className="font-[family-name:var(--font-satoshi)] text-[1.5rem] leading-8 text-[#16171b]">
                          {item.title}
                        </h2>

                        <p className="font-sans text-[0.9375rem] leading-5 text-[#6b6c71]">
                          {item.description}
                        </p>
                      </div>

                      <div
                        className={`relative h-[17.0625rem] w-full overflow-hidden ${
                          item.radius ?? "rounded-[1.25rem]"
                        }`}
                      >
                        <Image
                          src={item.image}
                          alt={item.alt ?? item.title}
                          fill
                          quality={90}
                          priority={index === 0}
                          loading={index === 0 ? undefined : "eager"}
                          sizes="15.55rem"
                          className="select-none object-cover"
                        />
                      </div>
                    </article>
                  </li>
                ))}
          </ul>

          {/* Only this part is client-side */}
          <CarouselControls
            trackId={trackId}
            scrollAmount={props.variant === "catalog" ? 372 : 289}
          />
        </div>
      </div>
    </section>
  );
}
