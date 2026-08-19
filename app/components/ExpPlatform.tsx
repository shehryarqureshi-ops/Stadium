/* /events (Experiences · Confetti) · ANY MOMENT — Figma
   n9SjmDjzB1PeZAYJ5w43fr → 2504:9461 "Platform", inside page frame 2504:9060
   (section y 4943..5975 at 1440). "The calendar is full of reasons to gather" —
   a centred header over a grey tray (#f2f2f2, r32, p16) holding a 3×2 grid of
   white cards (r24, p8, shadow 0 3 6 .06). Each card = a photo (376×260, r16)
   + title (Satoshi 25/1.04, −0.3) + description (Overpass 15/1.5).
   Container: site 1200 (Figma draws 1240 @ x=100 via container px-20 + px-80) —
   inner proportions kept (card = (W−64)/3, graphic keeps 376:260).

   Figma stack (y relative to the section frame, 1440):
     eyebrow "ANY MOMENT"       y=0    h=17   (12.5px / 1.4, #fa476b, +1.6px)
     gap 8
     h2 (44 / 1.08, −0.5)       y=25   h=48   (880 wide, centred)
     gap 20
     subhead (18 / 1.48, 1 ln)  y=93   h=27   → header block 0..120
     gap 40
     grid tray                  y=160  h=872  (p16 · rows 412 · gap 16)
       card: graphic 8,8 376×260 (r16) · text 8,268 376×136
             (px32 · pt16 · title 26 · gap16 · desc 46 · pb32)
     frame end 1032 — the frame carries NO internal top/bottom space and the
     neighbours sit 160 away (prev ends 4783, next starts 6135), so the site
     section is py-20 (80 + 80) top and bottom.

   Photos: Figma's original uploads (rawImages, 1536–2048px) at JPEG q90.
   Cards 1 and 2 carry a Figma zoom/crop (126.4% / 128.56%) that object-position
   cannot express, so those two were pre-cropped with sharp to the exact visible
   window; the other four are plain object-cover centre, as in Figma. */

import Image, { type StaticImageData } from "next/image";
import photoMilestones from "@/public/exp2/xp-platform-milestones.jpg";
import photoTeamWins from "@/public/exp2/xp-platform-team-wins.jpg";
import photoAllHands from "@/public/exp2/xp-platform-all-hands.jpg";
import photoOffsites from "@/public/exp2/xp-platform-offsites.jpg";
import photoSocials from "@/public/exp2/xp-platform-socials.jpg";
import photoJustBecause from "@/public/exp2/xp-platform-just-because.jpg";

const CARDS: { img: StaticImageData; alt: string; title: string; desc: string }[] = [
  {
    img: photoMilestones,
    alt: "Colleagues gathered around a desk with balloons, handing a slice of birthday cake to a smiling teammate",
    title: "Milestones & Birthdays",
    desc: "Personal milestones give the whole team a reason to come together.",
  },
  {
    img: photoTeamWins,
    alt: "Two teammates high-fiving while colleagues cheer with raised arms in a bright office",
    title: "Team Wins",
    desc: "A win deserves attention the same week, while it's still fresh.",
  },
  {
    img: photoAllHands,
    alt: "A presenter leading an all-hands in a meeting room, with remote colleagues on the video wall",
    title: "All-Hands & Kickoffs",
    desc: "Real activities, structured time, and a clear agenda open the quarter with energy.",
  },
  {
    img: photoOffsites,
    alt: "A host leading a group seated in a sunlit lodge living room during an offsite",
    title: "Offsites & Retreats",
    desc: "A real host leads the activities that make the trip worth leaving the office for.",
  },
  {
    img: photoSocials,
    alt: "Colleagues talking over drinks and a shared platter at a standing table",
    title: "Quarterly Socials",
    desc: "Keep the team connected with a hosted event each quarter.",
  },
  {
    img: photoJustBecause,
    alt: "Three colleagues laughing together on a couch in an office lounge",
    title: "Just Because",
    desc: "No milestone required to get the team together.",
  },
];

export default function ExpPlatform() {
  return (
    <section
      aria-labelledby="exp-platform-heading"
      className="bg-white px-section-x-sm py-16 md:px-section-x-md md:py-20 lg:px-section-x-lg lg:py-20"
    >
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-10">
        {/* header — 880 wide in Figma, centred */}
        <div className="flex w-full max-w-[55rem] flex-col items-center gap-5 text-center">
          <div className="flex flex-col items-center gap-2">
            <p
              data-animation="reveal"
              className="font-sans text-[0.78125rem] font-bold uppercase leading-[1.4] tracking-[0.1rem] text-[#fa476b]"
            >
              Any moment
            </p>
            <h2
              id="exp-platform-heading"
              data-animation="reveal"
              className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
            >
              The calendar is full of reasons to gather
            </h2>
          </div>
          <p
            data-animation="reveal"
            className="font-sans text-[1.0625rem] leading-[1.48] text-[#736b70] lg:text-[1.125rem]"
          >
            From onboarding to holidays and the dozens of occasions between,
            regular events keep teams close.
          </p>
        </div>

        {/* grey tray · 3×2 cards */}
        <div
          data-animation="reveal"
          data-reveal-stagger="80"
          className="w-full rounded-[2rem] bg-[#f2f2f2] p-4"
        >
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
            {CARDS.map((c) => (
              <li
                key={c.title}
                data-animation="reveal"
                className="flex flex-col overflow-hidden rounded-[1.5rem] bg-white p-2 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)]"
              >
                <div className="overflow-hidden rounded-[1rem]">
                  <Image
                    src={c.img}
                    alt={c.alt}
                    quality={90}
                    className="aspect-[376/260] w-full object-cover lg:aspect-auto lg:h-[16.25rem]"
                    sizes="(min-width:1024px) 23.5rem, (min-width:640px) 45vw, 92vw"
                  />
                </div>
                <div className="flex flex-col gap-4 px-8 pb-8 pt-4">
                  <h3 className="font-[family-name:var(--font-satoshi)] text-[1.5625rem] font-bold leading-[1.04] tracking-[-0.01875rem] text-[#16171b]">
                    {c.title}
                  </h3>
                  <p className="font-sans text-[0.9375rem] leading-[1.5] text-[#6b6c71]">
                    {c.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
