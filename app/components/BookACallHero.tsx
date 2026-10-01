/* /book-a-call · HERO (Figma n9SjmDjzB1PeZAYJ5w43fr → 3998:4049 "hero").
   Two equal columns (Figma 550 + 60 + 550 at px 140): copy on the left, the
   shared BookACallForm on the right — the same component and styling as the
   /pricing Book a Demo section, only its column is narrower (550 vs 646).

   Left column (Figma 3998:4050):
     top     headline 54/1.02/−1.5 → 32 → intro 19/1.52 (w 439) → 32 →
             eyebrow 12 Bold +1 → 32 → 3 check rows (15/1.4, gap 12)
     gap 110 (min — the bottom block pins to the column foot so it lines up
             with the form's bottom edge)
     bottom  rating row (stars 180 · "2700+ Reviews" 14 · G2/Capterra/Google
             40px, gap 24/16) → 40 → HeroLogoWall marquee (inline, h 40) →
             32 → Help Center line 13/1.4 #eee
   Bottom block is a fixed 170 tall at lg; the page's glass panel starts 52
   above it (see app/book-a-call/page.tsx).

   Below lg the order is copy → form → rating/marquee, so the form stays near
   the top on phones. */

import Image from "next/image";
import { Check } from "lucide-react";

import BookACallForm from "./BookACallForm";
import { HeroLogoWall } from "./common/HeroLogoWall";

const BENEFITS = [
  "Engage people across 170+ countries",
  "Automate programs with integrations",
  "Manage gifting, swag, recognition, and more in one place",
];

/* review-site marks — G2 reuses the site's existing /g2-logo.svg; stars,
   Capterra and Google are the Figma vectors (3998:4074 / 4086 / 4087) */
const REVIEW_SITES = [
  { src: "/g2-logo.svg", alt: "G2", width: 40, height: 40 },
  { src: "/book-a-call/review-capterra.svg", alt: "Capterra", width: 39.27, height: 40 },
  { src: "/book-a-call/review-google.svg", alt: "Google", width: 39.15, height: 40 },
];

export default function BookACallHero() {
  return (
    <section
      aria-labelledby="book-a-call-title"
      className="relative z-10 px-section-x-sm pb-12 pt-[7.5rem] md:px-section-x-md md:pb-16 md:pt-[9rem] lg:px-section-x-lg lg:pb-[7.5rem] lg:pt-[12.75rem]"
    >
      <div className="mx-auto grid w-full max-w-content grid-cols-1 gap-10 md:gap-12 lg:grid-cols-2 lg:gap-x-[2.5rem] lg:gap-y-0">
        {/* copy */}
        <div className="flex flex-col gap-8 lg:col-start-1 lg:row-start-1">
          <div className="flex flex-col gap-6 lg:gap-8">
            <h1
              id="book-a-call-title"
              data-animation="reveal"
              className="text-balance font-display text-display-sm text-white md:text-display-md lg:text-display-demo"
            >
              See how Stadium can work for your team
            </h1>
            <p
              data-animation="reveal"
              className="max-w-[27.4375rem] font-sans text-body-lg text-white md:text-body-xl"
            >
              Tell us a little about what you’re looking for and we’ll tailor the conversation to
              your needs.
            </p>
          </div>

          <div data-animation="reveal" className="flex flex-col gap-6 lg:gap-8">
            <p className="font-sans text-eyebrow-sm leading-4 uppercase text-white">
              Book a demo and learn how to:
            </p>
            <ul className="flex flex-col gap-3 pb-2">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <Check
                    aria-hidden
                    className="mt-[0.1875rem] size-3.5 shrink-0 text-white"
                    strokeWidth={2}
                  />
                  <span className="font-sans text-feature text-white">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* form — spans both left rows at lg */}
        <div className="flex justify-center lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:block">
          <BookACallForm />
        </div>

        {/* proof — pinned to the column foot at lg */}
        <div
          data-animation="reveal"
          className="flex min-w-0 flex-col gap-8 lg:col-start-1 lg:row-start-2 lg:mt-[6.875rem] lg:gap-0 lg:self-end"
        >
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <Image
              src="/book-a-call/review-stars.svg"
              alt="Rated 5 out of 5 stars"
              width={180}
              height={28}
              className="h-auto w-[9.375rem] md:w-[11.25rem]"
            />
            <p className="font-sans text-body-sm text-white">2700+ Reviews</p>
            <ul className="flex items-center gap-4" aria-label="Review sites">
              {REVIEW_SITES.map((r) => (
                <li key={r.alt}>
                  <Image
                    src={r.src}
                    alt={r.alt}
                    width={r.width}
                    height={r.height}
                    className="h-9 w-auto md:h-10"
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:mt-10 lg:max-w-[32.125rem]">
            <HeroLogoWall variant="inline" />
          </div>

          <p className="font-sans text-field text-grey-200 lg:mt-8">
            For technical or product support, please visit our{" "}
            <a
              href="/help-center"
              className="font-bold underline underline-offset-2 transition-opacity hover:opacity-80 focus-visible:outline-white"
            >
              Help Center
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
