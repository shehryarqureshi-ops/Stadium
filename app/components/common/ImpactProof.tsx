/* /impact "The proof" (Figma 3998:16612): left — eyebrow, 45px title, G2
   rating (32px G2 mark · 4.8 Satoshi 32 · 5 stars + "on G2 from 1,515
   reviews"), customer logos pinned to the column foot; right — three white
   result cards (r24, p8 + 8 white border): 159-wide #f2f2f2 image slot and
   title 25 / body 15. Sits on the page's closing gradient.
   `quotes` swaps the result cards for testimonial cards (/the-proof "In good
   company", 3816:4412): #f2f2f2 r24 p24 tray, 72px r12 thumb (grey slot when
   no image) beside a white r12 card (pt28 px28 pb30): company eyebrow →
   32 → quote 20 Satoshi Bold −0.3 → 32 → name 15 Bold + role 15/1.5. */

import Image, { type StaticImageData } from "next/image";
import { Star } from "lucide-react";

export type ImpactProofCard = { title: string; description: string; image?: StaticImageData };
export type ImpactProofQuote = {
  company: string;
  quote: string;
  name: string;
  role: string;
  image?: StaticImageData;
};
export type ImpactProofLogo = { src: string; alt: string; width: number; height: number };

export type ImpactProofProps = {
  caption: string;
  title: string;
  rating: { score: string; label: string };
  logos: ImpactProofLogo[];
  cards?: ImpactProofCard[];
  quotes?: ImpactProofQuote[];
  /* /the-proof uses the 55/60 −1.2 section head */
  large?: boolean;
};

export default function ImpactProof({
  caption,
  title,
  rating,
  logos,
  cards = [],
  quotes,
  large = false,
}: ImpactProofProps) {
  return (
    <section className="px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
      <div className="mx-auto grid w-full max-w-content grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="flex flex-col justify-between gap-10">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <p
                data-animation="reveal"
                className="font-sans text-eyebrow-sm uppercase leading-[1.4] tracking-[0.1rem] text-pricing-ink"
              >
                {caption}
              </p>
              <h2
                data-animation="reveal"
                className={`max-w-[32rem] font-display text-[1.75rem] font-bold leading-[1.2] tracking-[-0.03125rem] text-pricing-ink md:text-[2.25rem] lg:tracking-[-0.075rem] ${
                  large ? "lg:text-[3.4375rem] lg:leading-[3.75rem]" : "lg:text-[2.8125rem]"
                }`}
              >
                {title}
              </h2>
            </div>
            <div data-animation="reveal" className="flex items-center gap-[1.375rem]">
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

          <ul data-animation="reveal" className="flex flex-wrap items-end gap-x-14 gap-y-6" aria-label="Customers">
            {logos.map((l) => (
              <li key={l.alt}>
                <Image
                  src={l.src}
                  alt={l.alt}
                  width={l.width}
                  height={l.height}
                  style={{ height: `${l.height / 16}rem` }}
                  className="w-auto"
                />
              </li>
            ))}
          </ul>
        </div>

        {quotes ? (
          <ul data-animation="reveal" className="flex flex-col gap-4">
            {quotes.map((q) => (
              <li key={q.company}>
                <figure className="flex flex-col items-start gap-6 rounded-3xl bg-pricing-cell p-4 sm:flex-row md:p-6">
                  <div className="relative size-[4.5rem] shrink-0 overflow-hidden rounded-xl bg-[#808080]">
                    {q.image && <Image src={q.image} alt="" fill sizes="4.5rem" className="object-cover" />}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-8 rounded-xl bg-white px-6 pb-[1.875rem] pt-7 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)] md:px-7">
                    <p className="font-sans text-eyebrow-sm uppercase leading-4 text-pricing-ink">{q.company}</p>
                    <blockquote className="font-display text-[1.25rem] font-bold tracking-[-0.01875rem] text-pricing-ink">
                      {q.quote}
                    </blockquote>
                    <figcaption className="flex flex-col gap-1 font-sans text-feature">
                      <span className="font-bold text-brand-hero">{q.name}</span>
                      <span className="leading-[1.5] text-swag-grey">{q.role}</span>
                    </figcaption>
                  </div>
                </figure>
              </li>
            ))}
          </ul>
        ) : (
        <ul data-animation="reveal" className="flex flex-col gap-4">
          {cards.map((c) => (
            <li
              key={c.title}
              className="flex overflow-hidden rounded-3xl border-8 border-white bg-white p-2 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)]"
            >
              <div className="relative hidden w-[9.9375rem] shrink-0 overflow-hidden rounded-[1.25rem] bg-pricing-cell sm:block">
                {c.image && <Image src={c.image} alt="" fill sizes="10rem" className="object-cover" />}
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-4 px-6 py-6 sm:px-8">
                <h3 className="font-display text-[1.5625rem] font-bold leading-[1.04] tracking-[-0.01875rem] text-pricing-ink">
                  {c.title}
                </h3>
                <p className="font-sans text-feature leading-[1.5] text-swag-grey">{c.description}</p>
              </div>
            </li>
          ))}
        </ul>
        )}
      </div>
    </section>
  );
}
