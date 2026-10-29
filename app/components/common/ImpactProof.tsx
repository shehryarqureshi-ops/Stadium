/* /impact "The proof": eyebrow, title and G2 rating on top, then the
   case-study card tray (the shared VariableCardGrid layout used by the
   /impact/<team> case studies: grey tray, three white cards, cropped cover
   images, whole-card links), then the customer-logo marquee. Sits in the
   shared WhiteBox on the page's closing gradient. Testimonial quotes live in
   VerticalTestimonials (one shared carousel). */

import Image from "next/image";
import { Star } from "lucide-react";

import { HeroLogoWall, type HeroLogo } from "./HeroLogoWall";
import VariableCardGrid, { type VariableCardGridItem } from "./VariableCardGrid";
import WhiteBox from "./WhiteBox";

export type ImpactProofProps = {
  caption: string;
  title: string;
  rating: { score: string; label: string };
  /* omit for the shared home-page logo set (HeroLogoWall default) */
  logos?: HeroLogo[];
  cards: VariableCardGridItem[];
};

export default function ImpactProof({ caption, title, rating, logos, cards }: ImpactProofProps) {
  return (
    <WhiteBox flushTop>
      <div className="mx-auto flex w-full max-w-content flex-col gap-10 lg:gap-12">
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <p
              data-animation="reveal"
              className="font-sans text-eyebrow-sm uppercase leading-[1.4] tracking-[0.1rem] text-pricing-ink"
            >
              {caption}
            </p>
            <h2
              data-animation="reveal"
              className="max-w-[40rem] text-balance font-display text-[1.75rem] font-bold leading-[1.2] tracking-[-0.03125rem] text-pricing-ink md:text-[2.25rem] lg:text-[2.8125rem] lg:tracking-[-0.075rem]"
            >
              {title}
            </h2>
          </div>
          <div data-animation="reveal" className="flex items-center justify-center gap-[1.375rem] text-left">
            <div className="flex items-center gap-4">
              <Image src="/g2-logo.svg" alt="G2" width={32} height={32} className="size-8" />
              <span className="font-display text-heading-md text-brand-hero">{rating.score}</span>
            </div>
            <div className="flex flex-col">
              <span className="flex gap-0.5" aria-label={`${rating.score} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} aria-hidden className="size-4 fill-[#ff9c00] text-[#ff9c00]" strokeWidth={0} />
                ))}
              </span>
              <span className="font-sans text-body-md text-brand-hero">{rating.label}</span>
            </div>
          </div>
        </div>

        <VariableCardGrid bare imageFit="cover" items={cards} />

        <div data-animation="reveal" aria-label="Customers" className="mx-auto w-full max-w-[48rem]">
          <HeroLogoWall variant="inline" logos={logos} tone="dark" />
        </div>
      </div>
    </WhiteBox>
  );
}
