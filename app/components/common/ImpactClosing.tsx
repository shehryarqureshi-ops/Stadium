/* Closing band shared by /impact and every /impact/<team> page (Figma
   "proof" frames, e.g. 3998:13969): the section above the CTA (case studies
   or "The proof") sits on white that ramps through blue into #181818
   (--gradient-impact-closing), then the standard ClosingCTA card and the
   footer divider. ClosingCTA carries its own lg:pt-40 (Figma's 160). */

import type { ReactNode } from "react";

import ClosingCTA from "./ClosingCTA";

export type ImpactClosingProps = {
  children: ReactNode;
  cta: {
    caption?: string;
    title: ReactNode;
    description: ReactNode;
    primary: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
};

export default function ImpactClosing({ children, cta }: ImpactClosingProps) {
  return (
    <div className="bg-[image:var(--gradient-impact-closing)]">
      <div className="grid gap-16 md:gap-24 lg:gap-40">{children}</div>
      <ClosingCTA
        caption={cta.caption}
        title={cta.title}
        description={cta.description}
        descriptionClassName="max-w-[44rem] lg:max-w-[48rem]"
        ctaOneLabel={cta.primary.label}
        ctaOneLink={cta.primary.href}
        ctaOneVariant="primary"
        ctaTwoLabel={cta.secondary?.label}
        ctaTwoLink={cta.secondary?.href}
        ctaTwoVariant="secondary"
        backgroundColor="transparent"
      />
    </div>
  );
}
