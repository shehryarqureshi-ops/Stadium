"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";

import { BOOK_A_CALL_HREF, type SectionData } from "./data";
import { DECO_GROUPS, DECO_METHODS, DECO_SHORT } from "./decoMethods";

/* Decoration methods modal (Figma 6078:9607 — S1 layout with D1 thumbnails): 1040
   card, r32, padding 40/44, gap 26 — title + subtitle, black close button, two 452px
   columns (applied & printed | digital, laser & finishes) of thumbnail rows split by
   hairlines, then "Book a call" + "Browse swag ↗" (equal halves). Info only — rows are
   not clickable; the row for the card that opened the modal starts highlighted until
   another row is hovered. Below `md` the columns stack and the card scrolls. */

export default function DecoMethodsModal({
  initialId,
  section,
  onClose,
}: {
  /** the card that opened the modal — its row starts highlighted until another row is hovered */
  initialId?: string;
  section: SectionData;
  onClose: () => void;
}) {
  const [activeId, setActiveId] = useState<string | null>(initialId ?? null);
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
      className="catalog-modal-scrim fixed inset-0 z-[70] flex cursor-pointer items-start justify-center overflow-y-auto bg-catalog-scrim p-3 sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      data-lenis-prevent
    >
      <div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="deco-modal-title"
        className="catalog-modal-card relative my-auto flex w-full max-w-[65rem] cursor-auto flex-col gap-6 rounded-catalog-modal bg-white px-5 pb-5 pt-6 shadow-catalog-modal sm:px-8 sm:pb-8 sm:pt-8 lg:gap-[1.625rem] lg:px-[2.75rem] lg:pb-10 lg:pt-10"
      >
        <header>
          <div className="flex flex-col gap-2 pr-14">
            <h2
              id="deco-modal-title"
              className="font-display text-[1.75rem] leading-[1.1] tracking-[-0.0437rem] text-catalog-ink sm:text-[2.25rem]"
            >
              Decoration methods
            </h2>
            <p className="font-sans text-base text-[#4a4f57]">Fifteen ways to put your brand on it. Here is how each one works.</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-6 top-6 z-10 sm:right-8 sm:top-8 lg:right-10 lg:top-10 inline-flex size-10 cursor-pointer items-center justify-center rounded-full bg-black text-white transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <X aria-hidden className="size-5" strokeWidth={2} />
          </button>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          {DECO_GROUPS.map((col) => (
            <section key={col.title} aria-label={col.title}>
              <h3 className="mb-[0.625rem] font-sans text-xs font-bold uppercase leading-[0.9375rem] tracking-[0.1rem] text-catalog-ink">
                {col.title}
              </h3>
              <ul>
                {col.ids.map((id) => {
                  const d = DECO_METHODS.find((m) => m.id === id)!;
                  return (
                    <li
                      key={d.id}
                      onMouseEnter={() => setActiveId(null)}
                      aria-current={activeId === d.id ? "true" : undefined}
                      className={`-mx-3 flex items-center gap-4 rounded-xl border-b border-[#e3e4e7] px-3 py-3.5 transition-colors duration-200 hover:bg-catalog-chip ${
                        activeId === d.id ? "bg-catalog-chip" : ""
                      }`}
                    >
                      <span className="relative size-14 shrink-0 overflow-hidden rounded-2xl bg-grey-200 sm:size-[4.5rem]">
                        <Image src={d.image} alt="" fill sizes="4.5rem" className="object-cover" />
                      </span>
                      <div className="flex min-w-0 flex-1 flex-col gap-[0.1875rem]">
                        <p className="font-display text-[1.0625rem] leading-[1.35] tracking-[-0.0125rem] text-catalog-ink">{d.title}</p>
                        <p className="font-sans text-sm leading-[1.4] text-[#4a4f57]">{DECO_SHORT[d.id]}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={BOOK_A_CALL_HREF}
            className="inline-flex h-[3.75rem] flex-1 cursor-pointer items-center justify-center whitespace-nowrap rounded-full bg-black px-10 font-sans text-catalog-button-lg uppercase text-white transition-all duration-200 hover:bg-grey-700 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">Book a call</span>
          </a>
          <a
            href={section.catalogHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-[3.75rem] flex-1 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full border border-black bg-white px-10 font-sans text-catalog-button-lg uppercase text-black transition-all duration-200 hover:bg-black hover:text-white active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">Browse {section.noun}</span>
            <ArrowUpRight aria-hidden className="size-[1.125rem]" strokeWidth={2} />
          </a>
        </div>
      </div>
    </div>
  );
}
