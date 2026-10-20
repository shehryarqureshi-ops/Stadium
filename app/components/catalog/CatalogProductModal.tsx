"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ArrowUpRight, X } from "lucide-react";

import { BOOK_A_CALL_HREF, type Product, type SectionData } from "./data";

/* Product modal (Figma 3693:8077): 1200 card, r32, 16px image well holding a
   600×691 r24 photo, 40px text column — category pill, 32px title, hairline,
   19px description, then "Book a call" + "View … catalog ↗" pinned to the
   bottom. "View … catalog" opens the section's catalog in a new tab.
   Below `lg` the card stacks (photo above copy) and scrolls inside the scrim. */

export default function CatalogProductModal({
  product,
  section,
  onClose,
}: {
  product: Product;
  section: SectionData;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Esc to close, Tab trapped inside the card, page scroll locked, focus restored.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !cardRef.current) return;
      const focusable = cardRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      opener?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      className="catalog-modal-scrim fixed inset-0 cursor-pointer z-[70] flex items-end justify-center overflow-y-auto bg-catalog-scrim p-3 sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      data-lenis-prevent
    >
      <div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="catalog-modal-title"
        className="catalog-modal-card relative cursor-auto my-auto flex w-full max-w-catalog-modal flex-col overflow-hidden rounded-catalog-modal bg-white shadow-catalog-modal lg:flex-row"
      >
        {/* photo well */}
        <div className="p-3 sm:p-4 lg:shrink-0">
          <div className="relative aspect-[4/4.4] w-full overflow-hidden rounded-catalog-card bg-grey-200 lg:aspect-auto lg:h-[43.1875rem] lg:w-[37.5rem]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 37.5rem, 100vw"
              quality={90}
              priority
              className="object-cover"
            />
          </div>
        </div>

        {/* copy */}
        <div className="flex min-w-0 flex-1 flex-col gap-8 p-6 pt-3 sm:p-8 sm:pt-4 lg:min-h-[43.1875rem] lg:gap-0 lg:p-10">
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-6 top-6 z-10 inline-flex size-10 cursor-pointer items-center justify-center rounded-full bg-black text-white transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black sm:right-8 sm:top-8 lg:static lg:self-end"
          >
            <X aria-hidden className="size-5" strokeWidth={2} />
          </button>

          <div className="flex flex-1 flex-col gap-8 lg:mt-8">
            <div className="flex flex-col items-start gap-4">
              <span className="inline-flex h-6 items-center rounded-xl bg-catalog-chip px-3 font-sans text-[0.625rem] font-bold uppercase leading-[0.875rem] tracking-[0.0625rem] text-grey-800">
                {product.category}
              </span>
              <h2
                id="catalog-modal-title"
                className="text-balance font-display text-catalog-modal-title text-black"
              >
                {product.name}
              </h2>
            </div>
            <div className="h-px w-full bg-grey-200" />
            <p className="font-sans text-body-md text-grey-700 lg:text-catalog-body">{product.description}</p>

            {product.brand && (
              <div className="flex flex-col gap-1.5">
                <p className="font-sans text-[0.6875rem] font-bold uppercase leading-4 tracking-[0.1rem] text-black/50">Brand</p>
                <p className="font-display text-[1.5rem] leading-[1.15] tracking-[-0.0187rem] text-black">{product.brand}</p>
              </div>
            )}
            {product.decoMethods && product.decoMethods.length > 0 && (
              <div className="flex flex-col gap-3">
                <p className="font-sans text-[0.6875rem] font-bold uppercase leading-4 tracking-[0.1rem] text-black/50">Decoration methods</p>
                <ul className="flex flex-wrap gap-2">
                  {product.decoMethods.map((m) => (
                    <li
                      key={m}
                      className="inline-flex items-center rounded-full border border-black/15 px-3.5 py-2 font-sans text-[0.8125rem] font-semibold leading-none text-black"
                    >
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {product.dietary && product.dietary.length > 0 && (
              <div className="flex flex-col gap-3">
                <p className="font-sans text-[0.6875rem] font-bold uppercase leading-4 tracking-[0.1rem] text-black/50">Dietary</p>
                <ul className="flex flex-wrap gap-2">
                  {product.dietary.map((m) => (
                    <li
                      key={m}
                      className="inline-flex items-center rounded-full bg-catalog-ink px-3.5 py-2 font-sans text-[0.8125rem] font-semibold leading-none text-white"
                    >
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3.5 pt-2 sm:flex-row lg:pt-8">
            <a
              href={BOOK_A_CALL_HREF}
              className="inline-flex h-[3.75rem] shrink-0 items-center sm:flex-1 justify-center whitespace-nowrap rounded-full bg-black px-6 font-sans text-catalog-button-lg uppercase text-white transition-all duration-200 hover:bg-grey-700 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">Book a call</span>
            </a>
            <a
              href={section.catalogHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[3.75rem] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-black px-6 font-sans text-catalog-button-lg uppercase text-black transition-all duration-200 hover:bg-black hover:text-white active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black "
            >
              <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                View {section.noun} catalog
              </span>
              <ArrowUpRight aria-hidden className="size-[1.125rem]" strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
