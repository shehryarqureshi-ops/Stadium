/* /events (Experiences · Confetti) · CASE STUDY / SOCIAL PROOF
   (Figma n9SjmDjzB1PeZAYJ5w43fr → 2504:9499 "Case study · Paperchase",
   inner 2504:9500 "Frame 2087329919" x100 w1240 h1114).

   NOT the /swag 3-card BEFORE/DURING/AFTER timeline — Figma marks this node as
   a two-column review wall: a sticky left column (507 wide, 80 gap) with the
   headline + G2 rating + a big pull-quote under the 108×79 “ vector, and a
   right column of three grey review cards (72px avatar + white detail card).
   Figma DOES mark the left column and every card wrapper `sticky top-0`
   (each wrapper pt-40), so the cards stack under one another as you scroll —
   same idiom as SwagmagicCaseStudy. Stacks to one column below lg.

   Figma stack (1440, y relative to the section frame 2504:9499):
     left  · pt40 → title y40 h180 (Satoshi Bold 55/60 -1.2, 3 lines)
             → 32 → G2 row y252 h40 (logo32 +16 "4.8" 32/40 · +22 · stars16 / caption 16/24)
             → 120 → quote-mark y412 h79 (108.105×79 #F2F2F2)
             → 60 → quote y551 h240 (Satoshi Bold 32/40)
             → 24 → attribution y815 h23 (Overpass 15/1.5 #6b6c71) · left ends 838
     cards · wrapper i = pt40 + card; card = p24 gap24 rounded24 #f2f2f2,
             avatar 72 rounded12, white content px28 pt28 pb30 rounded12
             shadow 0 3 6 rgba(0,0,0,.06), inner gap32 (quote 25/1.36 -0.3
             Satoshi Medium → name 15 Overpass Bold → 4 → role 15/1.5 #6b6c71)
             y0 h360 (card 320) · y360 h360 (card 320) · y720 h394 (card 354)
             cards end 1114 = the frame bottom (no internal bottom space)
   Site rendering: container is the site's 1200 (Figma 1240) — the left column
   keeps its 42.25% (= 507 at 1200), the cards column flexes (613 not 653). Section is
   lg:pt-20 + the wrappers' own pt-10 → 120 above the content, so with the
   previous section's pb-20 the visible gap is Figma's 160+40. lg:pb-20 plus
   ExpClosing's pt-20 gives the 160 below. */

import Image, { type StaticImageData } from "next/image";
import emily from "@/public/exp2/xp-case-avatar-emily.jpg";
import caitlyn from "@/public/exp2/xp-case-avatar-caitlyn.jpg";
import jourdin from "@/public/exp2/xp-case-avatar-jourdin.jpg";

type Review = {
  quote: string;
  name: string;
  role: string;
  img: StaticImageData;
  alt: string;
};

const REVIEWS: Review[] = [
  {
    quote:
      "“Confetti is always my go-to for virtual team events. They make everything SO easy and are extremely responsive which makes planning these events a breeze!”",
    name: "Emily R.",
    role: "Executive Assistant · HubSpot",
    img: emily,
    alt: "Emily R., Executive Assistant at HubSpot",
  },
  {
    quote:
      "“Process to book was seamless, price was affordable, host was engaging, communication before booking was fast!”",
    name: "Caitlyn G.",
    role: "Local Sales Manager · Yelp",
    img: caitlyn,
    alt: "Caitlyn G., Local Sales Manager at Yelp",
  },
  {
    quote:
      "“As the event planner for our team, Confetti makes the whole process so much easier on me...I barely have to do anything! Just pick the activity and pay an invoice. It really is that simple.”",
    name: "Jourdin H.",
    role: "Administrative Assistant · Finvisor",
    img: jourdin,
    alt: "Jourdin H., Administrative Assistant at Finvisor",
  },
];

/* Figma 2504:9518 vector — 16×16 star, #F5A623 */
function Star() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="size-4 shrink-0">
      <path
        d="M7.99948 1.59961L9.96615 5.58628L14.3661 6.22628L11.1795 9.33294L11.9328 13.7129L7.99948 11.6663L4.06615 13.7129L4.81948 9.33294L1.63281 6.22628L6.03281 5.58628L7.99948 1.59961Z"
        fill="#F5A623"
      />
    </svg>
  );
}

export default function ExpCaseStudy() {
  return (
    <section
      aria-labelledby="exp-case-study-title"
      className="bg-white px-section-x-sm pt-6 pb-16 md:px-section-x-md md:pt-10 md:pb-20 lg:px-section-x-lg lg:pt-20 lg:pb-20"
    >
      <div className="mx-auto grid w-full max-w-content grid-cols-1 gap-10 lg:grid-cols-[minmax(0,42.25%)_1fr] lg:gap-20">
        {/* left · headline + G2 rating + pull-quote (Figma: sticky top-0, pt-40) */}
        <div className="flex flex-col gap-12 pt-10 lg:sticky lg:top-16 lg:gap-[7.5rem] lg:self-start">
          <div className="flex flex-col gap-8">
            <h2
              id="exp-case-study-title"
              data-animation="reveal"
              className="font-[family-name:var(--font-satoshi)] text-[2rem] font-bold leading-[1.09] tracking-[-0.075rem] text-[#16171b] md:text-[2.5rem] lg:text-[3.4375rem]"
            >
              The best part is what people say after
            </h2>

            {/* G2 rating row (Figma 2504:9504 — gap 22) */}
            <div data-animation="reveal" data-reveal-delay="80" className="flex items-center gap-[1.375rem]">
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/exp2/xp-case-g2.svg"
                  alt=""
                  aria-hidden="true"
                  width={32}
                  height={32}
                  className="size-8 shrink-0"
                />
                <p className="font-[family-name:var(--font-satoshi)] text-[2rem] font-bold leading-[1.25] whitespace-nowrap text-ink">
                  4.8
                </p>
              </div>
              <div className="flex flex-col">
                <div aria-hidden="true" className="flex gap-[2px]">
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                </div>
                <p className="font-sans text-[1rem] leading-[1.5] whitespace-nowrap text-ink">
                  on G2 from 1,515 reviews
                </p>
              </div>
            </div>
          </div>

          <figure className="flex flex-col gap-10 lg:gap-[3.75rem]">
            {/* Figma vector 2504:9535 “ (108.105×79, #F2F2F2) */}
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
              <blockquote
                data-animation="reveal"
                className="font-[family-name:var(--font-satoshi)] text-[1.5rem] font-bold leading-[1.25] text-[#16171b] md:text-[1.75rem] lg:text-[2rem]"
              >
                Thanks so much for a smooth, fun experience from booking to even beyond the event! The team loved
                the hosts&rsquo; energy and had many laughs&ndash;great way to end the year.&rdquo;
              </blockquote>
              <figcaption
                data-animation="reveal"
                data-reveal-delay="80"
                className="font-sans text-[0.9375rem] leading-[1.5] text-[#6b6c71]"
              >
                Susie L. &middot; Product Design Team Ops&middot; Netflix
              </figcaption>
            </div>
          </figure>
        </div>

        {/* right · review cards (Figma: each wrapper sticky top-0, pt-40) */}
        <div className="flex min-w-0 flex-col">
          {REVIEWS.map((r) => (
            <div key={r.name} className="pt-10 lg:sticky lg:top-16">
              <figure
                data-animation="reveal"
                className="flex gap-4 rounded-[1.5rem] bg-[#f2f2f2] p-4 md:gap-6 md:p-6"
              >
                <div className="size-[4.5rem] shrink-0 overflow-hidden rounded-[0.75rem] bg-[#e4e4e4]">
                  <Image
                    src={r.img}
                    alt={r.alt}
                    quality={90}
                    sizes="4.5rem"
                    className="size-full object-cover"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-6 rounded-[0.75rem] bg-white px-5 pt-5 pb-6 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)] md:gap-8 md:px-7 md:pt-7 md:pb-[1.875rem]">
                  <blockquote className="font-[family-name:var(--font-satoshi-medium)] text-[1.25rem] leading-[1.36] tracking-[-0.01875rem] text-[#16171b] md:text-[1.375rem] lg:text-[1.5625rem]">
                    {r.quote}
                  </blockquote>
                  <figcaption className="flex flex-col gap-1 text-[0.9375rem]">
                    <span className="font-sans leading-[1.27] font-bold whitespace-nowrap text-ink">{r.name}</span>
                    <span className="font-sans leading-[1.5] text-[#6b6c71]">{r.role}</span>
                  </figcaption>
                </div>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
