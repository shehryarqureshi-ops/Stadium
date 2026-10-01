"use client";

/* Numbered FAQ accordion — Figma /integrations/security "Common security
   questions, answered" (3876:12338). Centered intro (no description) → 40 →
   a 700-wide stack (gap 10) of white r12 cards (pt28 pb30 px28). Open card:
   card-heavy-emphasis shadow, number #8c92a6 + question #16171b (20 Satoshi
   Medium 1.04), 28px black close button, answer 14/20 +0.16 #828282.
   Closed: #f2f2f2 hairline, number #c5c8d3, question #a9adbc, #e8e9ed plus
   button. One item open at a time; the first starts open. */

import { Plus, X } from "lucide-react";
import { useId, useState } from "react";

import SectionIntro from "./SectionIntro";

export type FaqItem = { question: string; answer: string };

export type FaqAccordionProps = {
  caption?: string;
  title: string;
  description?: string;
  items: FaqItem[];
};

const OPEN_SHADOW =
  "shadow-[40px_40px_56.57px_-1.5px_rgba(0,0,0,0.11),21.98px_21.98px_31.09px_-1.31px_rgba(0,0,0,0.08),12.77px_12.77px_18.05px_-1.13px_rgba(0,0,0,0.06),7.8px_7.8px_11.03px_-0.94px_rgba(0,0,0,0.06),4.83px_4.83px_6.83px_-0.75px_rgba(0,0,0,0.05),2.9px_2.9px_4.11px_-0.56px_rgba(0,0,0,0.05),1.59px_1.59px_2.25px_-0.38px_rgba(0,0,0,0.05),0.67px_0.67px_0.95px_-0.19px_rgba(0,0,0,0.05)]";

export default function FaqAccordion({ caption, title, description, items }: FaqAccordionProps) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section className="px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-10">
        <SectionIntro caption={caption} title={title} description={description} />

        <ul data-animation="reveal" className="flex w-full max-w-[43.75rem] flex-col gap-2.5">
          {items.map((item, i) => {
            const isOpen = open === i;
            const panelId = `${baseId}-panel-${i}`;
            const buttonId = `${baseId}-button-${i}`;
            return (
              <li
                key={item.question}
                className={`rounded-xl bg-white transition-shadow duration-300 ${
                  isOpen ? OPEN_SHADOW : "border border-pricing-cell"
                }`}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 pb-[1.875rem] pt-7 text-left md:px-7"
                  >
                    <span className="flex items-start gap-3 font-[family-name:var(--font-satoshi-medium)] text-[1.125rem] leading-[1.2] md:text-[1.25rem] md:leading-[1.04]">
                      <span className={isOpen ? "text-[#8c92a6]" : "text-[#c5c8d3]"}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className={`transition-colors ${isOpen ? "text-pricing-ink" : "text-[#a9adbc]"}`}>
                        {item.question}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className={`flex size-7 shrink-0 items-center justify-center rounded-full transition-colors ${
                        isOpen ? "bg-black text-white" : "bg-[#e8e9ed] text-[#16171b]"
                      }`}
                    >
                      {isOpen ? <X className="size-3.5" strokeWidth={2} /> : <Plus className="size-[1.1667rem]" strokeWidth={1.5} />}
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="-mt-0.5 px-5 pb-[1.875rem] md:px-7"
                >
                  <p className="font-sans text-small tracking-[0.01rem] text-[#828282]">{item.answer}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
