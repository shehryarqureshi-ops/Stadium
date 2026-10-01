/* Shared section header for the /impact pages (Figma e.g. 3998:9346):
   eyebrow 12 Bold +1.6 uppercase → 8 → title 44/1.08/−0.5 Satoshi Bold
   → 20 → intro 18/1.48 #6b6c71. Centered (max 860) or left-aligned. */

import type { ReactNode } from "react";

export type SectionIntroProps = {
  caption?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  /* overrides the 44px desktop title (e.g. 36px in sticky left columns) */
  titleClassName?: string;
};

export default function SectionIntro({
  caption,
  title,
  description,
  align = "center",
  titleClassName = "md:text-[2.25rem] lg:text-heading-xl",
}: SectionIntroProps) {
  const center = align === "center";
  return (
    <div
      className={`flex w-full flex-col gap-5 ${
        center ? "mx-auto max-w-[53.75rem] items-center text-center" : "items-start text-left"
      }`}
    >
      <div className={`flex flex-col gap-2 ${center ? "items-center" : "items-start"}`}>
        {caption && (
          <p
            data-animation="reveal"
            className="font-sans text-eyebrow-sm uppercase leading-[1.4] tracking-[0.1rem] text-pricing-ink"
          >
            {caption}
          </p>
        )}
        <h2
          data-animation="reveal"
          className={`text-balance font-display text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-pricing-ink ${titleClassName}`}
        >
          {title}
        </h2>
      </div>
      {description && (
        <p
          data-animation="reveal"
          className="font-sans text-body-md leading-[1.48] text-swag-grey md:text-body-lg md:leading-[1.48]"
        >
          {description}
        </p>
      )}
    </div>
  );
}
