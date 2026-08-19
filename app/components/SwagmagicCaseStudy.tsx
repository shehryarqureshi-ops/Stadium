/* /swag · CASE STUDY · Paperchase (Figma n9SjmDjzB1PeZAYJ5w43fr 2500:5576,
   "From nine swag vendors to one"). Two columns on desktop: a sticky intro +
   pull-quote on the left (492 wide, 80 gap), and on the right a BEFORE /
   DURING / AFTER timeline — a 90px "steps" column with a dotted #ccc line and
   three pills, then a "cards" column of grey trays (photo + white detail card
   with a headline and three dotted points). Figma marks the left column and
   every card wrapper `sticky top-0` (pt-40) → the cards stack under the header
   as you scroll (the pills stick with them). Stacks to one column below lg;
   below md the steps column hides and each card carries its own pill.

   Figma stack (1440, y relative to the section frame; frame = content + 160
   internal bottom, content wrappers carry pt-40):
     left  · eyebrow y40 h15 → 8 → title y63 h80 (36/39.6 ×2) → 20 → sub y143 h53
             → 120 → quote-mark y376 h79 → 60 → quote y515 h136 → 24 → attr y699 h23
     steps · pill BEFORE y40 h34 · DURING y592.7 · AFTER y1145.4 (col pt-40,
             gap-32, flex-1 slots of 520.7); line x45, y-7.5..1713.5, #ccc 3/5 dash
     cards · wrapper i: pt-40 + tray 515.375 (p-10: image 534×300.375 → 10 →
             card 185 = pt-28 title 25 gap-24 list 78 pb-30) → pitch 555.375;
             wrappers at y0 / 555.375 / 1110.75, content ends y1666.125
   Site rendering: section lg:pt-20 (+ the wrappers' own pt-10 = 120 above the
   content; with Committee's 80 that is Figma's 200 from the previous tray to
   the CASE STUDY eyebrow) and lg:pb-20 → 160 visible gap below. Container is
   the site's 1200 (Figma 1240): left column stays 492 + 80 gap, the timeline
   flexes (cards 514 wide; image height FIXED at 300.375 at lg so the vertical
   rhythm — 555.375 pitch — matches Figma exactly). */

import Image, { type StaticImageData } from "next/image";
import before from "@/public/swag2/sw2-casestudy-before.jpg";
import during from "@/public/swag2/sw2-casestudy-during.jpg";
import after from "@/public/swag2/sw2-casestudy-after.jpg";

type Stage = {
  tag: string;
  dark: boolean;
  img: StaticImageData;
  alt: string;
  title: string;
  points: string[];
};

const STAGES: Stage[] = [
  {
    tag: "BEFORE",
    dark: false,
    img: before,
    alt: "A marketing manager at a desk covered in paperwork and shipping boxes, head in hand",
    title: "Nine vendors, one exhausted manager",
    points: ["9 swag vendors", "Inventory aging in a basement", "Marketing doing logistics"],
  },
  {
    tag: "DURING",
    dark: false,
    img: during,
    alt: "A Stadium teammate walking a customer through the migration on a laptop",
    title: "Migrated in 67 days",
    points: ["6 brand stores live", "0 programs paused", "One brand pack"],
  },
  {
    tag: "AFTER",
    dark: true,
    img: after,
    alt: "A smiling admin in a Stadium tee running the swag program from one laptop",
    title: "One platform, two admins",
    points: ["1 vendor, 1 invoice", "14-country program", "Marketing got their job back"],
  },
];

/* BEFORE / DURING / AFTER pill (Figma 90×34: py-8 px-9, Overpass SemiBold 14,
   radius 100). Fixed 90 wide in the steps column, hugging on mobile. */
function Pill({ tag, dark, className = "" }: { tag: string; dark: boolean; className?: string }) {
  return (
    <span
      className={`relative inline-flex items-center justify-center rounded-[100px] px-[0.5625rem] py-2 font-sans text-[0.875rem] font-semibold leading-[1.125rem] whitespace-nowrap ${
        dark ? "bg-[#212624] text-white" : "bg-[#f2f2f2] text-[#212624]"
      } ${className}`}
    >
      {tag}
    </span>
  );
}

export default function SwagmagicCaseStudy() {
  return (
    <section
      aria-labelledby="swag-case-study-title"
      className="bg-white px-section-x-sm pt-6 pb-16 md:px-section-x-md md:pt-10 md:pb-20 lg:px-section-x-lg lg:pt-20 lg:pb-20"
    >
      <div className="mx-auto grid w-full max-w-content grid-cols-1 gap-10 lg:grid-cols-[minmax(0,30.75rem)_1fr] lg:gap-20">
        {/* left · intro + pull-quote (sticky on desktop, Figma pt-40) */}
        <div className="flex flex-col gap-16 pt-10 lg:sticky lg:top-16 lg:gap-[7.5rem] lg:self-start">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <p
                data-animation="reveal"
                className="font-sans text-[0.75rem] font-semibold uppercase leading-[1.25] tracking-[0.045rem] text-[#218554]"
              >
                CASE STUDY
              </p>
              <h2
                id="swag-case-study-title"
                data-animation="reveal"
                className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.1] text-[#16171b] md:text-[2.25rem]"
              >
                From nine
                <br />
                swag vendors to one
              </h2>
            </div>
            <p data-animation="reveal" className="font-sans text-[1.125rem] leading-[1.45] text-[#707075]">
              How Paperchase simplified global swag and gave marketing its time back.
            </p>
          </div>

          <figure data-animation="reveal" className="flex flex-col gap-10 lg:gap-[3.75rem]">
            {/* Figma vector “ (108.1×79, #f2f2f2) */}
            <svg
              aria-hidden="true"
              className="h-[4.9375rem] w-[6.7566rem] shrink-0"
              viewBox="0 0 108.105 79"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M47.4683 55.9455C47.4683 69.4708 38.2809 79 24.806 79C10.4124 79 0 67.3191 0 48.8755C0 23.0545 17.1498 3.07395 41.6496 0V14.7549C28.481 17.214 19.2936 25.5136 19.2936 36.2724C21.7436 35.3502 24.4998 34.7354 27.8685 34.7354C38.8934 34.7354 47.4683 42.7276 47.4683 55.9455ZM108.105 55.9455C108.105 69.4708 98.9178 79 85.443 79C71.0493 79 60.6369 67.3191 60.6369 48.8755C60.6369 23.0545 77.7868 3.07395 102.287 0V14.7549C89.1179 17.214 79.6243 25.5136 79.6243 36.5798C82.0743 35.3502 84.8305 34.7354 88.1992 34.7354C99.2241 34.7354 108.105 42.7276 108.105 55.9455Z"
                fill="#F2F2F2"
              />
            </svg>
            <div className="flex flex-col gap-6">
              <blockquote className="font-[family-name:var(--font-satoshi-medium)] text-[1.375rem] leading-[1.36] tracking-[-0.01875rem] text-[#16171b] md:text-[1.5625rem]">
                We were juggling nine swag vendors, and marketing was stuck managing logistics. Now the program
                runs itself, and our vendor list is just one.
              </blockquote>
              <figcaption className="font-sans text-[0.9375rem] leading-[1.5] text-[#6b6c71]">
                Nish Patel · CEO, Paperchase
              </figcaption>
            </div>
          </figure>
        </div>

        {/* right · timeline */}
        <div className="flex gap-6">
          {/* steps column: dotted line + pills (md+; each pill sticks with its card) */}
          <div
            aria-hidden="true"
            className="relative hidden w-[5.625rem] shrink-0 flex-col gap-8 pt-10 md:flex"
          >
            {/* Figma "Line 65": 1px #ccc, dash 3/5 round caps, x=45, y -7.5 → +47.5 past the cards */}
            <div className="absolute -top-2 -bottom-12 left-[2.8125rem] w-px -translate-x-1/2">
              <svg className="block h-full w-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
                <line
                  x1="0.5"
                  y1="0"
                  x2="0.5"
                  y2="100%"
                  stroke="#CCCCCC"
                  strokeLinecap="round"
                  strokeDasharray="3 5"
                />
              </svg>
            </div>
            {STAGES.map((s) => (
              <div key={s.tag} className="flex min-h-px flex-1 flex-col md:sticky md:top-[6.5rem]">
                <Pill tag={s.tag} dark={s.dark} className="w-full" />
              </div>
            ))}
          </div>

          {/* cards column */}
          <div className="flex min-w-0 flex-1 flex-col">
            {STAGES.map((s) => (
              <div key={s.tag} className="flex flex-col gap-3 pt-10 md:sticky md:top-16">
                {/* mobile-only pill (the steps column is hidden below md) */}
                <Pill tag={s.tag} dark={s.dark} className="w-fit md:hidden" />
                <article
                  data-animation="reveal"
                  aria-label={`${s.tag}: ${s.title}`}
                  className="flex flex-col gap-2.5 rounded-[1.5rem] bg-[#f2f2f2] p-2.5"
                >
                  <div className="overflow-hidden rounded-[1.25rem]">
                    <Image
                      src={s.img}
                      alt={s.alt}
                      quality={90}
                      className="aspect-[534/300.375] w-full object-cover lg:aspect-auto lg:h-[18.7734rem]"
                      sizes="(min-width:1024px) 33rem, (min-width:768px) 78vw, 92vw"
                    />
                  </div>
                  <div className="flex flex-col gap-6 rounded-[1rem] bg-white px-6 pt-6 pb-7 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)] md:px-7 md:pt-7 md:pb-[1.875rem]">
                    <h3 className="font-[family-name:var(--font-satoshi)] text-[1.375rem] font-bold leading-[1.04] tracking-[-0.0375rem] text-[#16171b] md:text-[1.5rem]">
                      {s.title}
                    </h3>
                    <ul className="flex flex-col gap-3">
                      {s.points.map((p) => (
                        <li key={p} className="flex items-center gap-2.5">
                          <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-[#d9d9d9]" />
                          <span className="font-sans text-[0.9375rem] leading-[1.2] text-[#16171b]">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
