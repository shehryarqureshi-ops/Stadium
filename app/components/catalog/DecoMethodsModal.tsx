"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";

import { BOOK_A_CALL_HREF, type SectionData } from "./data";
import { DECO_METHODS } from "./decoMethods";

/* Decoration methods modal (Figma 6059:9608): 1160 card, r32. Left rail lists all 15
   methods (thumb + name, the open one on a white pill); the right panel explains the open
   method — header image (close button on it), title, description, finish / minimum order /
   lead time, "Best for" chips. "Book a call" + "Browse swag ↗" are pinned to the bottom of
   the panel over a white fade (content scrolls underneath). Info only — nothing here
   filters the grid. Below `lg` the rail becomes a horizontal strip above the panel. */

export default function DecoMethodsModal({
  initialId,
  section,
  onClose,
}: {
  initialId: string;
  section: SectionData;
  onClose: () => void;
}) {
  const [activeId, setActiveId] = useState(initialId);
  const method = DECO_METHODS.find((m) => m.id === activeId) ?? DECO_METHODS[0];
  const closeRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

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

  const select = (id: string) => {
    setActiveId(id);
    panelRef.current?.scrollTo({ top: 0 });
  };

  const specs = method.spec
    ? [
        ["Finish", method.spec.finish],
        ["Min. order", method.spec.minOrder],
        ["Lead time", method.spec.leadTime],
      ]
    : [];

  return (
    <div
      className="catalog-modal-scrim fixed inset-0 z-[70] flex cursor-pointer items-end justify-center overflow-y-auto bg-catalog-scrim p-3 sm:items-center sm:p-6"
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
        className="catalog-modal-card relative my-auto flex h-[min(55.5rem,calc(100dvh-1.5rem))] w-full max-w-[72.5rem] cursor-auto flex-col overflow-hidden rounded-catalog-modal bg-white shadow-catalog-modal lg:h-[min(55.5rem,calc(100dvh-3rem))] lg:flex-row"
      >
        {/* left rail — all decoration methods */}
        <nav
          aria-label="Decoration methods"
          className="flex shrink-0 gap-1 overflow-x-auto bg-catalog-chip p-3 lg:w-[20.625rem] lg:flex-col lg:overflow-y-auto lg:overflow-x-visible lg:px-4 lg:py-7"
          data-lenis-prevent
        >
          <p className="hidden px-2.5 pb-3 font-sans text-[0.6875rem] font-bold uppercase leading-4 tracking-[0.1rem] text-black/50 lg:block">
            Decoration methods · {DECO_METHODS.length}
          </p>
          {DECO_METHODS.map((m) => {
            const active = m.id === method.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => select(m.id)}
                aria-current={active ? "true" : undefined}
                className={`flex shrink-0 cursor-pointer items-center gap-3 rounded-[0.875rem] px-2.5 py-[0.4375rem] text-left font-sans text-[0.9375rem] leading-5 text-black transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black lg:w-full ${
                  active ? "bg-white font-bold shadow-[0_0.125rem_0.5rem_rgba(0,0,0,0.1)]" : "font-semibold hover:bg-white/60"
                }`}
              >
                <span className="relative size-[2.375rem] shrink-0 overflow-hidden rounded-[0.625rem] bg-grey-200">
                  <Image src={m.image} alt="" fill sizes="2.5rem" className="object-cover" />
                </span>
                <span className="whitespace-nowrap">{m.title}</span>
              </button>
            );
          })}
        </nav>

        {/* right panel — the open method */}
        <div className="relative min-h-0 min-w-0 flex-1">
          <div ref={panelRef} className="h-full overflow-y-auto p-4 pb-40 sm:p-6 sm:pb-40 lg:px-7 lg:pt-6" data-lenis-prevent>
            <div className="relative h-[16rem] w-full overflow-hidden rounded-catalog-card bg-grey-200 sm:h-[20rem]">
              <Image
                key={method.id}
                src={method.image}
                alt={method.title}
                fill
                sizes="(min-width: 1024px) 48.5rem, 100vw"
                quality={90}
                priority
                className="object-cover"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent" />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute right-5 top-5 z-10 inline-flex size-10 cursor-pointer items-center justify-center rounded-full bg-black text-white transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <X aria-hidden className="size-5" strokeWidth={2} />
              </button>
            </div>

            <div className="mt-[1.125rem] flex flex-col gap-[1.125rem]">
              <h2
                id="deco-modal-title"
                className="font-display text-[2.25rem] font-bold leading-[1.04] tracking-[-0.0437rem] text-black"
              >
                {method.title}
              </h2>
              <p className="max-w-[45rem] font-sans text-[1.0625rem] leading-[1.5] text-grey-700">{method.description}</p>

              {specs.length > 0 && (
                <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {specs.map(([k, v]) => (
                    <div key={k} className="flex flex-col gap-1 rounded-[1.125rem] bg-catalog-chip px-[1.125rem] py-3.5">
                      <dt className="font-sans text-[0.6875rem] font-bold uppercase leading-4 tracking-[0.1rem] text-black/50">{k}</dt>
                      <dd className="font-display text-[1.25rem] font-bold leading-6 tracking-[-0.0187rem] text-black">{v}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {method.best && (
                <div className="flex flex-col gap-2.5">
                  <p className="font-sans text-[0.6875rem] font-bold uppercase leading-4 tracking-[0.1rem] text-black/50">Best for</p>
                  <ul className="flex flex-wrap gap-2">
                    {method.best.map((b) => (
                      <li key={b} className="rounded-full bg-catalog-chip px-3.5 py-2 font-sans text-[0.8125rem] font-semibold leading-none text-black">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* sticky CTA bar — pinned to the bottom of the panel over a white fade */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-b from-transparent to-white to-40% px-4 pb-7 pt-10 sm:px-6 lg:px-7">
            <div className="pointer-events-auto flex flex-col gap-3.5 sm:flex-row">
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
      </div>
    </div>
  );
}
