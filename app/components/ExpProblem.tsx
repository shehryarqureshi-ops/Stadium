/* /events · Experiences (Confetti) — THE PROBLEM (Figma
   n9SjmDjzB1PeZAYJ5w43fr → 2504:9198 "Frame 2087330220", card 2504:9199).
   A white rounded-16 card (1240 in Figma → the site's 1200 content width)
   that scrolls OVER the hero raster — ExpHero paints its background 499px
   past its own bottom, so this section is transparent + `relative z-10`.
   Header (eyebrow #ff5b77 → 44px Satoshi title → 18px subhead, 860 max) → 40
   → a #f2f2f2 rounded-32 tray with three white photo cards. Unlike
   SwagmagicProblem there is NO hairline divider after the card: the card is
   flush at 2103 and the next section starts at 2263, so this section supplies
   80 of that 160 gap and the next one supplies the other 80.

   Figma stack (absolute y at 1440):
     1265      card top (rounded 16, pt 160, px 80)
     1425      eyebrow 12/1.25 (15)     → 8
     1448      h2 44/1.08 (48)          → 20
     1516      subhead 18/1.48 (27)     → 40
     1583      tray p16 (520): cards 488 = photo 250 + text (pt42/pb32)
     2103      card ends (no bottom padding)  → 160 to the next section. */

import Image, { type StaticImageData } from "next/image";
import photoPlanner from "@/public/exp2/xp-problem-1.jpg";
import photoMeeting from "@/public/exp2/xp-problem-2.jpg";
import photoRemote from "@/public/exp2/xp-problem-3.jpg";

const CARDS: {
  img: StaticImageData;
  alt: string;
  title: [string, string];
  desc: string;
}[] = [
  {
    img: photoPlanner,
    alt: "An office manager at a desk covered in sticky notes, planning an event alone",
    title: ["One person does", "all the work"],
    desc: "Managers and EAs become accidental event planners, on top of their packed schedules.",
  },
  {
    img: photoMeeting,
    alt: "A team sitting around a boardroom table during a flat icebreaker",
    title: ["Generic events", "fade fast"],
    desc: "Icebreakers are forgotten fast, but a well-planned event still comes up weeks later.",
  },
  {
    img: photoRemote,
    alt: "A remote worker watching a grid of colleagues on a video call",
    title: ["Remote teams", "drift apart"],
    desc: "Status calls squeezed between agenda items don't leave room for real conversation.",
  },
];

export default function ExpProblem() {
  return (
    <section className="relative z-10 px-section-x-sm pb-16 md:px-section-x-md md:pb-20 lg:px-section-x-lg">
      <div className="mx-auto flex w-full max-w-content flex-col">
        {/* white card (2504:9199): rounded 16, pt 160, px 80, no bottom pad */}
        <div className="flex w-full flex-col items-center rounded-[1rem] bg-white px-6 pt-16 md:px-12 md:pt-20 lg:px-20 lg:pt-40">
          <div className="flex w-full max-w-[53.75rem] flex-col items-center gap-5 text-center">
            <div className="flex flex-col items-center gap-2">
              <p
                data-animation="reveal"
                className="font-sans text-[0.75rem] font-semibold uppercase leading-[1.25] tracking-[0.045rem] text-[#ff5b77]"
              >
                THE PROBLEM
              </p>
              <h2
                data-animation="reveal"
                className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
              >
                Team building takes work
              </h2>
            </div>
            <p
              data-animation="reveal"
              data-reveal-delay="120"
              className="font-sans text-[1.0625rem] leading-[1.48] text-[#6b6c71] lg:text-[1.125rem]"
            >
              No agenda, no structure, and no way to know who&#39;ll stick
              around.
            </p>
          </div>

          {/* grey tray (2504:9206): p16, gap16, rounded 32; cards p8 rounded 24 */}
          <div
            data-animation="reveal"
            data-reveal-stagger="90"
            className="mt-8 grid w-full grid-cols-1 gap-4 rounded-[2rem] bg-[#f2f2f2] p-4 md:grid-cols-3 lg:mt-10"
          >
            {CARDS.map((c) => (
              <article
                key={c.title[0]}
                data-animation="reveal"
                className="flex flex-col overflow-hidden rounded-[1.5rem] bg-white p-2 shadow-[0px_3px_3px_0px_rgba(0,0,0,0.06)]"
              >
                <div className="relative overflow-hidden rounded-[1.25rem]">
                  <Image
                    src={c.img}
                    alt={c.alt}
                    quality={90}
                    className="aspect-[968/750] w-full object-cover lg:aspect-auto lg:h-[15.625rem]"
                    sizes="(min-width:1024px) 21rem, (min-width:768px) 31vw, 92vw"
                  />
                </div>
                <div className="flex flex-col gap-4 px-8 pb-8 pt-[2.625rem]">
                  <h3 className="font-[family-name:var(--font-satoshi)] text-[1.6875rem] font-bold leading-[1.875rem] tracking-[-0.01875rem] text-[#16171b]">
                    {c.title[0]}
                    <br />
                    {c.title[1]}
                  </h3>
                  <p className="font-sans text-[1rem] leading-[1.5] text-[#6b6c71]">
                    {c.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
