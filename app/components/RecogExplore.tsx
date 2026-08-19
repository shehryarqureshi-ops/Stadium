/* /recognition · RESOURCES (Figma n9SjmDjzB1PeZAYJ5w43fr → 2504:8738
   "Resources", the third child of the "closing" wrapper 2504:8672). Same idiom
   as SwagmagicExplore.tsx: a 3-row resource list (kicker / title / one-liner,
   #eee hairlines, 26.75px arrow-up-right) on the left and an abstract
   black-and-white image (482×336, rounded 24) on the right.

   IMPORTANT — this section is a SLEEVE, not a full-bleed white band. Figma's
   purple raster "image 13654" starts 51px above this section and is already
   visibly tinted down the last third of it, so the white block is only 1400
   wide (a 20px strip of raster shows on each side) and it is RecogClosing that
   paints the raster + the rounded-bottom-60 tail of this same sleeve.
   Layering contract: RecogClosing's raster box is unclipped and reaches up
   behind this section, so this section carries `relative z-10`. Keep the page
   order RecogContact → RecogExplore → RecogClosing → PageClose, and do not
   give this section a full-bleed background.

   Figma stack (y relative to the "closing" wrapper; section frame 2504:8738 is
   y=899 h=787, its white container y=899…1666, then a 20px raster strip):
     container top   899          (1400 wide, x 20…1420, r60, px 80, py 160)
     eyebrow         1059  h=15   (12 Overpass SemiBold, #6b33db, +0.72)
     gap 8
     title           1082  h=48   (44 Satoshi Bold / 1.08 / -0.5, 1 line)
     gap 40
     items row       1170  h=336  (list 678 · gap 80 · image 482)
       item 1        1170  h=82   → 22 → hairline 1274 → 22 →
       item 2        1297  h=82   → 22 → hairline 1401 → 22 →
       item 3        1424  h=82
     content bottom  1506         → the sleeve's last 160 + the 60 curve are
                                    drawn by RecogClosing (curve bottom 1666).
   → section renders lg:pt-20 (80) only; with RecogContact's lg:pb-20 that is
     the 160 Figma leaves above the eyebrow. */

import Image from "next/image";
import abstract from "@/public/recog2/rc-explore-abstract.jpg";

const ITEMS = [
  {
    kicker: "GUIDE",
    title: "Build your recognition playbook",
    desc: "A step-by-step guide to launch successfully.",
  },
  {
    kicker: "REPORT",
    title: "The business case for recognition",
    desc: "See why recognized employees are more likely to stay.",
  },
  {
    kicker: "TEMPLATE",
    title: "Turn company values into tags",
    desc: "Make every kudos reflect your company values.",
  },
];

export default function RecogExplore() {
  return (
    // bg-white below lg (RecogClosing's raster does not reach up there); transparent
    // at lg+ so Figma's 20px raster strips show either side of the sleeve
    <section aria-labelledby="recog-explore-title" className="relative z-10 bg-white lg:bg-transparent">
      <div className="mx-auto w-[calc(100%-1.25rem)] rounded-t-[2rem] bg-white px-section-x-sm pt-16 md:px-section-x-md md:pt-20 lg:w-[calc(100%-2.5rem)] lg:rounded-t-[3.75rem] lg:px-section-x-lg lg:pt-20">
        <div className="mx-auto flex w-full max-w-content flex-col gap-10">
          <div className="flex flex-col gap-2">
            <p
              data-animation="reveal"
              className="font-sans text-[0.75rem] font-semibold uppercase leading-[1.25] tracking-[0.045rem] text-[#6b33db]"
            >
              Resources
            </p>
            <h2
              id="recog-explore-title"
              data-animation="reveal"
              className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
            >
              More on getting employee recognition right
            </h2>
          </div>

          <div className="flex flex-col gap-10 md:gap-12 lg:flex-row lg:items-stretch lg:gap-20">
            {/* resource list */}
            <ul data-animation="reveal" data-reveal-stagger="90" className="flex min-w-0 flex-1 flex-col">
              {ITEMS.map((it) => (
                <li
                  key={it.title}
                  data-animation="reveal"
                  className="border-b border-[#eeeeee] py-[1.375rem] first:pt-0 last:border-b-0 last:pb-0"
                >
                  <a
                    href="#"
                    className="group flex items-end gap-2.5 rounded-[0.5rem] outline-none transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6b33db]"
                  >
                    <span className="flex min-w-0 flex-1 flex-col gap-4">
                      <span className="flex flex-col gap-2">
                        <span className="font-sans text-[0.6875rem] font-bold uppercase leading-[1.4] tracking-[0.0625rem] text-[#6b33db]">
                          {it.kicker}
                        </span>
                        <span className="font-[family-name:var(--font-satoshi)] text-[1.1875rem] font-bold leading-[1.22] tracking-[-0.01875rem] text-[#16171b] transition-colors duration-200 group-hover:text-[#6b33db] group-active:text-[#5d2ac2]">
                          {it.title}
                        </span>
                      </span>
                      <span className="font-sans text-[0.875rem] leading-[1.46] text-[#6b6c71]">{it.desc}</span>
                    </span>
                    {/* Figma svgAssets — arrow-up-right (2504:8752), 26.75 box / 3.75 stroke */}
                    <svg
                      aria-hidden
                      viewBox="0 0 26.75 26.75"
                      fill="none"
                      className="size-[1.671875rem] shrink-0 text-black transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-active:scale-[0.96]"
                    >
                      <path
                        d="M22.75 22.75V4H4M22.75 4L4 22.75"
                        stroke="currentColor"
                        strokeWidth="3.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>

            {/* abstract image · 482×336 at 1440, rounded 24, stretches to the list height */}
            <div
              data-animation="reveal"
              data-reveal-delay="120"
              className="relative aspect-[482/336] w-full overflow-hidden rounded-[1.5rem] bg-[#f2f2f2] lg:aspect-auto lg:w-[30.125rem] lg:shrink-0 lg:self-stretch"
            >
              <Image
                src={abstract}
                alt=""
                aria-hidden
                fill
                quality={90}
                sizes="(min-width:1024px) 30.125rem, (min-width:768px) 44rem, 92vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
