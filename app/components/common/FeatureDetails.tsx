/* Card body used inside StickyStepCards on the /impact pages (Figma e.g.
   4129:5322): grey 16/1.5 description → 24 → check rows (15/1.4, gap 12)
   → 32 → optional underlined "powered by …" link (12 Bold +1 uppercase). */

import { Check } from "lucide-react";

export type FeatureDetailsProps = {
  description: string;
  bullets?: string[];
  link?: { label: string; href: string };
};

export default function FeatureDetails({ description, bullets, link }: FeatureDetailsProps) {
  return (
    <div className="flex flex-col gap-6">
      <p className="font-sans text-body-md text-[#828282]">{description}</p>
      {(!!bullets?.length || link) && (
        <div className="flex flex-col gap-8">
          {!!bullets?.length && (
            <ul className="flex flex-col gap-3 pb-2">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <Check
                    aria-hidden
                    className="mt-[0.1875rem] size-3.5 shrink-0 text-pricing-ink"
                    strokeWidth={2}
                  />
                  <span className="font-sans text-feature text-pricing-ink">{b}</span>
                </li>
              ))}
            </ul>
          )}
          {link && (
            <a
              href={link.href}
              className="w-fit border-b border-black pb-0.5 font-sans text-eyebrow-sm leading-4 uppercase text-pricing-ink transition-opacity hover:opacity-70"
            >
              {link.label}
            </a>
          )}
        </div>
      )}
    </div>
  );
}
