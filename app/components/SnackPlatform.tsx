/* /snacks · ANY MOMENT (Figma 2208:3049). "The calendar fills up fast" — a grey
   tray of six white-framed photo cards covering the moments snacks show up for. */

import Image, { type StaticImageData } from "next/image";
import occ1 from "@/public/snacks/sn2-occ-1.jpg";
import occ2 from "@/public/snacks/sn2-occ-2.jpg";
import occ3 from "@/public/snacks/sn2-occ-3.jpg";
import occ4 from "@/public/snacks/sn2-occ-4.jpg";
import occ5 from "@/public/snacks/sn2-occ-5.jpg";
import occ6 from "@/public/snacks/sn2-occ-6.jpg";

const CARDS: { img: StaticImageData; title: string; desc: string }[] = [
  { img: occ1, title: "Onboarding", desc: "Give new hires a stocked snack drawer before their first day starts." },
  { img: occ2, title: "Milestones", desc: "Mark birthdays and anniversaries with snacks picked from 2,000+ options." },
  { img: occ3, title: "All-Hands & Events", desc: "A well-timed snack break can save a three hour all-hands." },
  { img: occ4, title: "Thank-Yous", desc: "Send a treat to say thanks, big or small, no card required." },
  { img: occ5, title: "Remote Check-Ins", desc: "Ship snacks to remote desks before their next call." },
  { img: occ6, title: "Just Because", desc: "Brighten someone’s day with a surprise snack, delivered right to their desk." },
];

export default function SnackPlatform() {
  return (
    <section className="bg-white px-section-x-sm py-16 md:px-section-x-md md:py-20 lg:px-section-x-lg lg:py-24">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-10">
        <div className="flex max-w-[55rem] flex-col items-center gap-4 text-center">
          <div className="flex flex-col items-center gap-2">
            <p
              data-animation="reveal"
              className="font-sans text-eyebrow-sm font-bold uppercase tracking-[0.0625rem] text-[#2178f5]"
            >
              Any moment
            </p>
            <h2
              data-animation="reveal"
              className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
            >
              The calendar fills up fast
            </h2>
          </div>
          <p
            data-animation="reveal"
            className="font-sans text-[1.125rem] leading-[1.48] text-[#6b6c71]"
          >
            Hire dates, anniversaries, and the occasional random Tuesday all call for snacks.
          </p>
        </div>

        <div
          data-animation="reveal"
          data-reveal-stagger="80"
          className="w-full rounded-[2rem] bg-[#f2f2f2] p-4"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CARDS.map((c) => (
              <article
                key={c.title}
                data-animation="reveal"
                className="flex flex-col overflow-hidden rounded-[1.5rem] border-8 border-white bg-white p-2 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)]"
              >
                <div className="overflow-hidden rounded-[1.25rem]">
                  <Image
                    src={c.img}
                    alt={c.title}
                    quality={90}
                    className="aspect-[376/250] w-full object-cover"
                    sizes="(min-width:1024px) 24rem, (min-width:640px) 45vw, 92vw"
                  />
                </div>
                <div className="flex flex-col gap-4 p-8">
                  <h3 className="font-[family-name:var(--font-satoshi)] text-[1.5625rem] font-bold leading-[1.04] tracking-[-0.01875rem] text-[#16171b]">
                    {c.title}
                  </h3>
                  <p className="font-sans text-[0.9375rem] leading-[1.5] text-[#6b6c71]">
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
