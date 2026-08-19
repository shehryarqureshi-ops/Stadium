"use client";

/* /recognition · TALK TO SALES · form (Figma n9SjmDjzB1PeZAYJ5w43fr →
   2504:8674 "Talk to sales · form", the first child of the "closing" wrapper
   2504:8672). One 1240-wide #f7f7f7 rounded-60 panel: on the left the eyebrow +
   44px title with a white p-10 card underneath (a #f7f7f7 blurb block over a
   white check-list card); on the right a 526-wide clipped box whose backdrop is
   Figma's dark raster "image 13685" (824×618 drawn at -149/-19.54 inside the
   526×579 clip) with the white rounded-top form card floating on it.

   The form is presentational only — it must NOT post anywhere. This component
   is "use client" and the <form> calls onSubmit={(e) => e.preventDefault()};
   every control still carries a real <label> + name so it stays semantic.

   Container maths: Figma draws the panel 1240 wide at x=100 with px-100 → the
   inner row runs 200…1240 at 1440. The site's 1200 content box + an 80px inner
   panel padding lands on exactly the same pixels, so the row keeps Figma's
   482 + 32 + 526.

   Figma stack (y relative to the section frame, h 899; the panel fills the
   frame edge to edge, so the section itself adds the site's lg:py-20 (80) top
   and bottom — 80 + RecogPackages' 80 = the 160 Figma leaves above the panel,
   80 + RecogExplore's 80 = the 160 Figma leaves below it):
     panel        y=0    h=899   (#f7f7f7, r60, px 100, py 160)
       row        y=160  h=579   (gap 32, stretch)
         left col y=160  h=579   (482 wide, justify-between)
           eyebrow y=160 h=15    (12 Overpass SemiBold, #6b33db, +0.72)
           gap 8
           title   y=183 h=96    (44 Satoshi Bold / 1.08 / -0.5, 2 lines, w 395)
           slack 140 (justify-between)
           card    y=419 h=320   (white, r24, p10, 3/6 shadow)
             blurb y=429 h=126   (#f7f7f7, r24, p24, 17 Overpass / 1.5)
             checks y=555 h=174  (white, r16, pt 34 px 24 pb 24, rows gap 12)
         form col y=160  h=579   (526 wide, r20 clip, raster backdrop)
           card   y=232  h=507   (white, r24 top only, p32, gap 16, flush bottom)
             name/email row 68 · company 68 · size/HRIS row 68 · textarea 96
             submit 46 · legal 17
     frame end 899 → RecogExplore (Resources) starts here.

   Layering contract: RecogClosing paints Figma's full-height purple raster
   ("image 13654", 1445 tall) bottom-anchored and UNCLIPPED, so it reaches ~51px
   up into this panel. This section therefore carries `relative z-10` to stay
   above it — do not remove it, and keep the page order
   RecogPackages → RecogContact → RecogExplore → RecogClosing → PageClose. */

import Image from "next/image";
import formBg from "@/public/recog2/rc-contact-form-bg.jpg";

const CHECKS = [
  "Live product walkthroughs",
  "HR, IT, and Finance covered in one go",
  "Recognition, swag, snacks, gifting, and hosted experiences in one platform",
];

const LABEL =
  "font-sans text-[0.78125rem] font-bold uppercase leading-[1.4] tracking-[0.01875rem] text-[#16171b]";
const CONTROL =
  "h-11 w-full rounded-[100px] border border-[#e2e2de] bg-white px-[0.875rem] font-sans text-[0.8125rem] leading-[1.4] text-[#16171b] transition-colors duration-200 placeholder:text-[#9999a3] hover:border-[#c9c9c4] focus:border-[#6b33db] focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6b33db]";

/* Figma svgAssets — lucide/check (2504:8689) and lucide/chevron-down (2504:8721) */
function Check() {
  return (
    <svg viewBox="0 0 14 14" fill="none" aria-hidden className="size-[0.875rem] shrink-0">
      <path
        d="M11.6667 3.5L5.25 9.91667L2.33333 7"
        stroke="black"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Chevron() {
  return (
    <svg
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      className="pointer-events-none absolute right-[0.875rem] top-1/2 size-[0.875rem] -translate-y-1/2"
    >
      <path
        d="M3.5 5.25L7 8.75L10.5 5.25"
        stroke="#6B67C1"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Select({ id, name, label }: { id: string; name: string; label: string }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-[0.4375rem]">
      <label htmlFor={id} className={LABEL}>
        {label}
      </label>
      <div className="relative">
        <select id={id} name={name} defaultValue="" className={`${CONTROL} appearance-none pr-9`}>
          <option value="" disabled>
            Select
          </option>
          <option value="option-one">Option one</option>
          <option value="option-two">Option two</option>
        </select>
        <Chevron />
      </div>
    </div>
  );
}

export default function RecogContact() {
  return (
    <section
      aria-labelledby="recog-contact-title"
      className="relative z-10 bg-white px-section-x-sm py-16 md:px-section-x-md md:py-20 lg:px-section-x-lg lg:py-20"
    >
      <div className="mx-auto w-full max-w-content">
        <div className="rounded-[2rem] bg-[#f7f7f7] px-5 py-10 md:rounded-[3.75rem] md:px-10 md:py-16 lg:px-[3.75rem] lg:py-20 xl:px-20 xl:py-40">
          <div className="flex flex-col gap-10 xl:flex-row xl:items-stretch xl:gap-8">
            {/* ── left: copy + reassurance card ─────────────────────────── */}
            <div className="flex flex-col gap-10 xl:w-[30.125rem] xl:shrink-0 xl:justify-between xl:gap-0">
              <div className="flex flex-col gap-2 xl:max-w-[24.6875rem]">
                <p
                  data-animation="reveal"
                  className="font-sans text-[0.75rem] font-semibold uppercase leading-[1.25] tracking-[0.045rem] text-[#6b33db]"
                >
                  Talk to sales
                </p>
                <h2
                  id="recog-contact-title"
                  data-animation="reveal"
                  className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
                >
                  Watch Stadium in action
                </h2>
              </div>

              <div
                data-animation="reveal"
                data-reveal-delay="120"
                className="rounded-[1.5rem] bg-white p-2.5 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)]"
              >
                <p className="rounded-[1.5rem] bg-[#f7f7f7] p-6 font-sans text-[1.0625rem] leading-[1.5] text-[#6b6c71]">
                  Give us 30 minutes. We&#39;ll walk through kudos programs, points, milestones, and rewards, then
                  sketch a rollout around your team, budget, and HRIS.
                </p>
                <ul className="flex flex-col gap-3 rounded-[1rem] bg-white px-6 pb-8 pt-[2.125rem]">
                  {CHECKS.map((c) => (
                    <li key={c} className="flex items-center gap-2.5">
                      <Check />
                      <span className="min-w-0 flex-1 font-sans text-[0.9375rem] leading-[1.4] text-[#16171b]">
                        {c}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ── right: raster-backed form box ─────────────────────────── */}
            <div
              data-animation="reveal"
              data-reveal-delay="180"
              className="relative overflow-hidden rounded-[1.25rem] bg-[#0b0b0b] xl:w-[32.875rem] xl:shrink-0"
            >
              {/* Figma raster "image 13685" — 824×618 drawn at -149 / -19.54 inside the 526×579 clip */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-[-28.33%] top-[-3.37%] h-[106.74%] w-[156.65%]"
              >
                <Image
                  src={formBg}
                  alt=""
                  fill
                  quality={90}
                  sizes="(min-width:1280px) 51.5rem, (min-width:768px) 110vw, 156vw"
                  className="object-cover"
                />
              </div>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="relative mx-4 mt-8 flex flex-col gap-4 rounded-t-[1.5rem] bg-white p-6 md:mx-8 md:mt-12 md:p-8 xl:mx-[2.8125rem] xl:mt-[4.5rem]"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
                  <div className="flex min-w-0 flex-1 flex-col gap-[0.4375rem]">
                    <label htmlFor="rc-name" className={LABEL}>
                      Full name
                    </label>
                    <input
                      id="rc-name"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      placeholder="John Doe"
                      className={CONTROL}
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-[0.4375rem]">
                    <label htmlFor="rc-email" className={LABEL}>
                      Work email
                    </label>
                    <input
                      id="rc-email"
                      name="workEmail"
                      type="email"
                      autoComplete="email"
                      placeholder="john@doe.com"
                      className={CONTROL}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-[0.4375rem]">
                  <label htmlFor="rc-company" className={LABEL}>
                    Company
                  </label>
                  <input
                    id="rc-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Select"
                    className={CONTROL}
                  />
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
                  <Select id="rc-size" name="companySize" label="Company size" />
                  <Select id="rc-hris" name="hrisTools" label="HRIS / Tools" />
                </div>

                <div className="flex flex-col gap-[0.4375rem]">
                  <label htmlFor="rc-solve" className={LABEL}>
                    What do you want to solve?
                  </label>
                  <textarea
                    id="rc-solve"
                    name="goal"
                    rows={2}
                    placeholder="What do you need — stores, kits, bulk, storage…"
                    className="h-[4.5rem] resize-none rounded-[0.625rem] border border-[#e2e2de] bg-white px-[0.875rem] pt-[0.875rem] font-sans text-[0.8125rem] leading-[1.4] text-[#16171b] transition-colors duration-200 placeholder:text-[#9999a3] hover:border-[#c9c9c4] focus:border-[#6b33db] focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6b33db]"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex h-[2.875rem] w-full items-center justify-center gap-1.5 rounded-[100px] bg-[#6b33db] px-[1.375rem] font-sans text-[0.9375rem] font-semibold leading-[1.4] text-white transition-all duration-200 hover:bg-[#5d2ac2] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6b33db]"
                >
                  <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">TALK TO SALES</span>
                  {/* Figma svgAssets — lucide/arrow-right (2504:8735) */}
                  <svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-4">
                    <path
                      d="M3.33333 8H12.6667M8 12.6667L12.6667 8L8 3.33333"
                      stroke="white"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <p className="font-sans text-[0.75rem] leading-[1.4] text-[#9999a3]">
                  By booking, you agree to Stadium’s{" "}
                  <a
                    href="#"
                    className="underline transition-colors duration-200 hover:text-[#6b33db] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6b33db]"
                  >
                    Terms
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="underline transition-colors duration-200 hover:text-[#6b33db] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6b33db]"
                  >
                    Privacy Notice
                  </a>
                  .
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
