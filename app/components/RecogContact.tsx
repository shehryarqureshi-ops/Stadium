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
      className="relative z-10 bg-white px-section-x-sm md:px-section-x-md lg:px-section-x-lg"
    >
      <div className="bg-gray-100 p-20 rounded-4xl text-center">
        Sales page redirect CTA here
      </div>
    </section>
  );
}
