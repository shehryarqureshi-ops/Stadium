"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";

export type ResourcesItem = {
  caption: string;
  captionColor?: string;
  title: string;
  description: string;
  url: string;
  image: StaticImageData | string;
  imageAlt?: string;
};

type ResourcesProps = {
  caption: string;
  captionColor?: string;
  title: string;
  description?: string;
  items: ResourcesItem[];
};

export default function Resources({
  caption,
  captionColor = "#6b33db",
  title,
  description,
  items,
}: ResourcesProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeItem = items[activeIndex];

  return (
    <section className="relative z-10 bg-white lg:bg-transparent">
      <div className="mx-auto w-[calc(100%-1.25rem)] rounded-t-[2rem] bg-white px-section-x-sm md:px-section-x-md lg:w-[calc(100%-2.5rem)] lg:rounded-t-[3.75rem] lg:px-section-x-lg">
        <div className="mx-auto flex w-full max-w-content flex-col gap-10">
          <div className="flex max-w-[55rem] flex-col gap-5">
            <div className="flex flex-col gap-2">
              <p
                data-animation="reveal"
                style={{ color: captionColor }}
                className="font-sans text-[0.75rem] font-semibold uppercase leading-[1.25] tracking-[0.045rem]"
              >
                {caption}
              </p>

              <h2
                data-animation="reveal"
                className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
              >
                {title}
              </h2>
            </div>

            {description && (
              <p
                data-animation="reveal"
                data-reveal-delay="120"
                className="font-sans text-[1.0625rem] leading-[1.48] text-[#6b6c71] lg:text-[1.125rem]"
              >
                {description}
              </p>
            )}
          </div>

          {/* Mobile / tablet */}
          <div
            data-animation="reveal"
            data-reveal-stagger="90"
            className="flex flex-col gap-4 lg:hidden"
          >
            {items.map((item) => (
              <a
                key={item.title}
                href={item.url}
                data-animation="reveal"
                className="group overflow-hidden rounded-[1.5rem] bg-[#f2f2f2]"
              >
                <div className="relative aspect-[482/336] w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.imageAlt ?? ""}
                    fill
                    quality={90}
                    sizes="(min-width:768px) 44rem, 92vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  />
                </div>

                <div className="flex items-end gap-4 bg-white p-6">
                  <div className="flex min-w-0 flex-1 flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <span
                        style={{
                          color: item.captionColor ?? captionColor,
                        }}
                        className="font-sans text-[0.6875rem] font-bold uppercase leading-[1.4] tracking-[0.0625rem]"
                      >
                        {item.caption}
                      </span>

                      <span className="font-[family-name:var(--font-satoshi)] text-[1.1875rem] font-bold leading-[1.22] tracking-[-0.01875rem] text-[#16171b]">
                        {item.title}
                      </span>
                    </div>

                    <span className="font-sans text-[0.875rem] leading-[1.46] text-[#6b6c71]">
                      {item.description}
                    </span>
                  </div>

                  <Arrow />
                </div>
              </a>
            ))}
          </div>

          {/* Desktop */}
          <div className="hidden lg:flex lg:items-stretch lg:gap-20">
            <ul
              data-animation="reveal"
              data-reveal-stagger="90"
              className="flex min-w-0 flex-1 flex-col"
            >
              {items.map((item, index) => {
                const itemCaptionColor =
                  item.captionColor ?? captionColor;

                return (
                  <li
                    key={item.title}
                    data-animation="reveal"
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    className="border-b border-[#eeeeee] py-[1.375rem] first:pt-0 last:border-b-0 last:pb-0"
                  >
                    <a
                      href={item.url}
                      className="group flex items-end gap-2.5 rounded-[0.5rem] outline-none transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4"
                      style={
                        {
                          "--resource-color": itemCaptionColor,
                        } as React.CSSProperties
                      }
                    >
                      <span className="flex min-w-0 flex-1 flex-col gap-4">
                        <span className="flex flex-col gap-2">
                          <span
                            style={{ color: itemCaptionColor }}
                            className="font-sans text-[0.6875rem] font-bold uppercase leading-[1.4] tracking-[0.0625rem]"
                          >
                            {item.caption}
                          </span>

                          <span className="font-[family-name:var(--font-satoshi)] text-[1.1875rem] font-bold leading-[1.22] tracking-[-0.01875rem] text-[#16171b] transition-colors duration-200 group-hover:text-[var(--resource-color)]">
                            {item.title}
                          </span>
                        </span>

                        <span className="font-sans text-[0.875rem] leading-[1.46] text-[#6b6c71]">
                          {item.description}
                        </span>
                      </span>

                      <Arrow />
                    </a>
                  </li>
                );
              })}
            </ul>

            <div
              data-animation="reveal"
              data-reveal-delay="120"
              className="relative w-[30.125rem] shrink-0 self-stretch overflow-hidden rounded-[1.5rem] bg-[#f2f2f2]"
            >
              {items.map((item, index) => (
                <Image
                  key={`${item.title}-${index}`}
                  src={item.image}
                  alt={item.imageAlt ?? ""}
                  fill
                  quality={90}
                  sizes="30.125rem"
                  className={`object-cover transition-all duration-500 ease-out ${activeIndex === index
                    ? "scale-100 opacity-100"
                    : "pointer-events-none scale-[1.02] opacity-0"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 26.75 26.75"
      fill="none"
      className="size-[1.671875rem] shrink-0 text-black transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-active:scale-[0.96]"
    >
      <path
        d="M22.75 22.75V4H4M22.75 4L4 22.75"
        stroke="currentColor"
        strokeWidth="3.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}