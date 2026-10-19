/* Ways to Engage · "employee journey" (Figma n9SjmDjzB1PeZAYJ5w43fr →
   5714:13079). Centred header (eyebrow, h2, sub), then a grey r32 tray of six
   occasion cards (photo + title + blurb). Photos are the Figma renders, so the
   Thank-Yous / Remote Check-Ins UI overlays are baked into the image. */

import Image, { type StaticImageData } from "next/image";
import occ1 from "@/public/wte/journey-1.jpg";
import occ2 from "@/public/wte/journey-2.jpg";
import occ3 from "@/public/wte/journey-3.jpg";
import occ4 from "@/public/wte/journey-4.jpg";
import occ5 from "@/public/wte/journey-5.jpg";
import occ6 from "@/public/wte/journey-6.jpg";

const CARDS: { img: StaticImageData; title: string; desc: string; alt: string }[] = [
  { img: occ1, title: "Onboarding", desc: "Welcome new hires from day one, wherever they are.", alt: "A new hire opening a welcome gift box surrounded by smiling teammates" },
  { img: occ2, title: "Milestones", desc: "Celebrate birthdays, anniversaries, and achievements.", alt: "Colleagues applauding around a birthday cake and wrapped gifts" },
  { img: occ3, title: "All-Hands & Events", desc: "Fuel meetings, offsites, and virtual events.", alt: "A team sharing snacks at a long table during a hybrid meeting" },
  { img: occ4, title: "Thank-Yous", desc: "Send a treat to mark a win.", alt: "A smiling employee at a laptop with a kudos message and bonus points on screen" },
  { img: occ5, title: "Remote Check-Ins", desc: "Bring the office experience to remote teams.", alt: "A remote employee at a laptop receiving a points-redeemed notification" },
  { img: occ6, title: "Just Because", desc: "Brighten someone’s day with an unexpected snack.", alt: "Friends reaching into a Stadium snack box" },
];

export default function WteOccasions() {
  return (
    <section className="bg-white py-16 md:py-20 lg:py-[7.5rem]">
      <div className="mx-auto flex w-full max-w-[90rem] flex-col items-center gap-10 px-section-x-sm md:px-section-x-md lg:gap-14 lg:px-[6.25rem]">
        <div className="flex w-full flex-col items-center gap-[0.875rem] text-center">
          <p
            data-animation="reveal"
            className="font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem] text-[#6b6c71]"
          >
            The employee journey
          </p>
          <h2
            data-animation="reveal"
            className="max-w-[47.5rem] font-[family-name:var(--font-satoshi)] text-[1.75rem] leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
          >
            Every employee occasion, covered
          </h2>
          <p
            data-animation="reveal"
            className="max-w-[47.5rem] font-sans text-[1.0625rem] leading-[1.52] text-[#6b6c71] lg:text-[1.1875rem]"
          >
            Automated for predictable moments, ready for the rest.
          </p>
        </div>

        <ul
          data-animation="reveal"
          className="grid w-full list-none grid-cols-1 gap-4 rounded-[2rem] bg-[#f2f2f2] p-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CARDS.map((c) => (
            <li
              key={c.title}
              className="flex flex-col overflow-hidden rounded-[1.5rem] border-8 border-white bg-white p-2 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)]"
            >
              <div className="overflow-hidden rounded-[1.25rem]">
                <Image
                  src={c.img}
                  alt={c.alt}
                  className="aspect-[376/250] w-full object-cover"
                  sizes="(min-width:1024px) 24rem, (min-width:640px) 45vw, 92vw"
                />
              </div>
              <div className="flex flex-col gap-4 p-6 md:p-8">
                <h3 className="font-[family-name:var(--font-satoshi)] text-[1.5625rem] leading-[1.04] tracking-[-0.01875rem] text-[#16171b]">
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
    </section>
  );
}
