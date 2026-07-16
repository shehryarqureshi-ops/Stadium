/* "The proof is in the people" — synced to Figma 2:37569. Two columns: left =
   55px heading + G2 rating + a large featured quote (Maxime); right = a vertical
   auto-scrolling column of #f2f2f2 testimonial cards (avatar + quote + name). */

type Quote = {
  quote: string;
  name: string;
  role: string;
  image: StaticImageData;
};

import johnnyImg from "@/public/testimonials/johnny.png";
import kateImg from "@/public/testimonials/kate.png";
import meganImg from "@/public/testimonials/megan.png";
import natalieImg from "@/public/testimonials/natalie.png";
import shairaImg from "@/public/testimonials/shaira.png";
import { StaticImageData } from "next/image";

import Image from "next/image";

const TESTIMONIALS: Quote[] = [
  {
    name: "Shaira Javier",
    role: "People Experience Manager",
    quote:
      "Stadium’s customer service is really proactive. That level of care is rare.",
    image: shairaImg,
  },
  {
    name: "Johnny Sorman",
    role: "Manager, Customer Support",
    quote:
      "I cut my time in half by gifting with Stadium this year. What normally took 2–3 months was condensed into just under four weeks.",
    image: johnnyImg,
  },
  {
    name: "Kate Wenzel",
    role: "Director of Brand and Marketing",
    quote:
      "Since moving to Stadium, we’ve been able to expand multiple rewards and recognition programs because the foundation and stores already exist.",
    image: kateImg,
  },
  {
    name: "Megan Caldwell",
    role: "Global People Experience Specialist",
    quote:
      "The onboarding experience for new hires is unmatched. It’s automated, it’s on brand, and we’ve received the most amount of praise we've ever had.",
    image: meganImg,
  },
  {
    name: "Natalie Alexander",
    role: "Senior Enablement & Engagement Specialist",
    quote:
      "Everything we want, eventually, Stadium is like, ‘oh, we’ve got it.’",
    image: natalieImg,
  },
];

function Card({ t }: { t: Quote }) {
  return (
    <figure className="flex items-start gap-4 rounded-3xl bg-[#f2f2f2] p-6">
      <Image
        src={t.image}
        alt=""
        width={72}
        className="object-cover rounded-2xl"
      />
      <div className="flex flex-1 flex-col gap-4 rounded-2xl bg-white p-5 shadow-[0_1px_3px_rgba(16,24,40,0.06)]">
        <blockquote className="font-sans text-[1rem] leading-6 text-ink">
          &ldquo;{t.quote}&rdquo;
        </blockquote>
        <figcaption className="flex flex-col">
          <span className="font-sans text-[0.875rem] font-bold text-ink">
            {t.name}
          </span>
          <span className="font-sans text-[0.8125rem] text-grey-500">
            {t.role}
          </span>
        </figcaption>
      </div>
    </figure>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-white px-section-x-sm py-16 md:px-section-x-md md:py-24 lg:px-[6.25rem] lg:py-[7.5rem]">
      <style>{`
        @keyframes testi-scroll { from { transform: translateY(0); } to { transform: translateY(-50%); } }
        .testi-marquee { animation: testi-scroll 44s linear infinite; }
        .testi-viewport:hover .testi-marquee { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .testi-marquee { animation: none; } }
      `}</style>
      <div className="mx-auto flex w-full max-w-[77.5rem] flex-col gap-12 lg:flex-row lg:gap-20">
        {/* left — heading + rating + featured quote */}
        <div className="flex shrink-0 flex-col gap-12 lg:w-[31.6875rem] lg:gap-[7.5rem] lg:pt-10">
          <div className="flex flex-col gap-8">
            <h2
              data-animation="reveal"
              className="font-display text-heading-sm text-[#16171b] md:text-heading-md lg:text-[3.4375rem] lg:leading-[3.75rem] lg:tracking-[-0.075rem]"
            >
              The proof is
              <br className="hidden md:block" /> in the people
            </h2>
            <div data-animation="reveal" className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/g2-logo.svg"
                alt="G2"
                width={32}
                height={32}
                className="size-8 shrink-0"
              />
              <span className="font-display text-[2rem] font-bold leading-none text-ink">
                4.8
              </span>
              <span className="flex flex-col">
                <span
                  aria-label="5 out of 5"
                  className="text-[0.9375rem] leading-none text-[#ff9c00]"
                >
                  ★★★★★
                </span>
                <span className="mt-1 font-sans text-[0.8125rem] text-grey-500">
                  on G2 from 1,515 reviews
                </span>
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <span
              data-animation="reveal"
              aria-hidden
              className="mb-10 font-display text-[4rem] leading-none text-grey-300"
            >
              <svg
                width="109"
                height="79"
                viewBox="0 0 109 79"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M47.4683 55.9455C47.4683 69.4708 38.2809 79 24.806 79C10.4124 79 0 67.3191 0 48.8755C0 23.0545 17.1498 3.07395 41.6496 0V14.7549C28.481 17.214 19.2936 25.5136 19.2936 36.2724C21.7436 35.3502 24.4998 34.7354 27.8685 34.7354C38.8934 34.7354 47.4683 42.7276 47.4683 55.9455ZM108.105 55.9455C108.105 69.4708 98.9178 79 85.443 79C71.0493 79 60.6369 67.3191 60.6369 48.8755C60.6369 23.0545 77.7868 3.07395 102.287 0V14.7549C89.1179 17.214 79.6243 25.5136 79.6243 36.5798C82.0742 35.3502 84.8305 34.7354 88.1992 34.7354C99.2241 34.7354 108.105 42.7276 108.105 55.9455Z"
                  fill="#F2F2F2"
                />
              </svg>
            </span>
            <blockquote
              data-animation="reveal"
              className="font-[family-name:var(--font-satoshi-medium)] text-[1.625rem] leading-[2.25rem] tracking-[-0.02em] text-[#16171b] lg:text-[2rem] lg:leading-[2.5rem]"
            >
              What sets Stadium apart is their ability to deliver a complete
              solution and empower our team — no matter the challenge.
            </blockquote>
            <p
              data-animation="reveal"
              className="font-sans text-[0.9375rem] text-[#6b6c71]"
            >
              Maxime Bascon • Chief of Staff • Elktech
            </p>
          </div>
        </div>

        {/* right — scrolling testimonial cards */}
        <div
          data-animation="reveal"
          className="testi-viewport relative flex-1 overflow-hidden lg:h-[41rem]"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent, #000 6%, #000 94%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, #000 6%, #000 94%, transparent)",
          }}
        >
          <div className="testi-marquee flex flex-col gap-4">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <Card key={i} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
