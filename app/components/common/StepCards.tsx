"use client";

import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { useState } from "react";

export type StepCardItem = {
  title: string;
  description?: string;
  image?: StaticImageData;
  imageAlt?: string;
  content?: ReactNode;
};

type StepCardsProps = {
  caption: string;
  captionColor?: string;
  title: string;
  description: string;
  items: StepCardItem[];
};

export default function StepCards({
  caption,
  captionColor = "#2178f5",
  title,
  description,
  items,
}: StepCardsProps) {
  const [active, setActive] = useState(0);

  if (!items.length) return null;

  return (
    <section className="bg-white px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
      <div className="mx-auto flex w-full max-w-content flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <p
            data-animation="reveal"
            style={{ color: captionColor }}
            className="font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem]"
          >
            {caption}
          </p>

          <h2
            data-animation="reveal"
            className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
          >
            {title}
          </h2>

          <p
            data-animation="reveal"
            className="mt-3 font-sans text-[1.0625rem] leading-[1.48] text-[#6b6c71] lg:text-[1.125rem]"
          >
            {description}
          </p>
        </div>

        {/* Steps */}
        <div
          data-animation="reveal"
          data-reveal-stagger="90"
          role="tablist"
          aria-label={title}
          className="flex flex-col gap-4 rounded-[1.5rem] bg-[#f2f2f2] p-4 lg:flex-row lg:items-stretch"
        >
          {items.map((item, index) => {
            const isActive = index === active;
            const number = String(index + 1).padStart(2, "0");
            const panelId = `step-card-panel-${index}`;

            return (
              <div
                key={`${item.title}-${index}`}
                role="tab"
                tabIndex={0}
                aria-selected={isActive}
                aria-controls={panelId}
                onClick={() => setActive(index)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActive(index);
                  }
                }}
                className={`group flex flex-col overflow-hidden rounded-[1rem] bg-white p-2.5 transition-[flex-grow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink lg:min-h-[22rem] lg:basis-0 lg:cursor-pointer ${
                  isActive ? "lg:grow-[3.08]" : "lg:grow lg:hover:bg-[#fafafa]"
                }`}
              >
                <div className="flex h-full flex-col gap-2.5 lg:flex-row lg:items-stretch lg:justify-between">
                  {/* Number + content */}
                  <div
                    className={`flex flex-col justify-between gap-6 ${
                      isActive ? "lg:w-[51.6%]" : "lg:w-full"
                    }`}
                  >
                    <span className="p-4 font-sans text-[1rem] leading-5 text-[#a9a9ad]">
                      {number}
                    </span>

                    <div className="flex flex-col gap-4 rounded-2xl bg-[#f4f4f5] p-6">
                      <h3 className="font-[family-name:var(--font-satoshi)] text-[1.25rem] font-bold leading-[1.3] tracking-[-0.01em] text-[#16171b]">
                        {item.title}
                      </h3>

                      {/* Always visible on mobile */}
                      {item.description && (
                        <p
                          className={`font-sans text-[0.9375rem] leading-[1.5] text-[#6b6c71] ${
                            isActive ? "lg:block" : "lg:hidden"
                          }`}
                        >
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Visual — always visible on mobile, active only on desktop */}
                  {(item.content || item.image) && (
                    <div
                      id={panelId}
                      role="tabpanel"
                      className={`relative mx-auto h-[16rem] w-full overflow-hidden rounded-2xl lg:mx-0 lg:h-auto lg:w-[46.7%] lg:max-w-none lg:self-stretch ${
                        isActive ? "lg:block lg:snack-step-in" : "lg:hidden"
                      }`}
                    >
                      {item.content ? (
                        item.content
                      ) : item.image ? (
                        <Image
                          src={item.image}
                          alt={item.imageAlt ?? item.title}
                          fill
                          quality={100}
                          className="rounded-2xl object-cover"
                          sizes="(min-width:1024px) 15rem, 100vw"
                        />
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
