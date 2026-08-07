/* Ways to Engage · "five ways" (Figma 1113:1794). THE PROGRAMS — a sticky title
   beside a grey tray of five numbered program cards (Recognition / Swag / Snacks
   / Gifting / Hosted Experiences), each a photo + blurb linking to that vertical. */

import Image, { type StaticImageData } from "next/image";
import prog1 from "@/public/ways-to-engage/program-1.jpg";
import prog2 from "@/public/ways-to-engage/program-2.jpg";
import prog3 from "@/public/ways-to-engage/program-3.jpg";
import prog4 from "@/public/ways-to-engage/program-4.jpg";
import prog5 from "@/public/ways-to-engage/program-5.jpg";

const CARDS: {
  n: string;
  title: string;
  desc: string;
  href: string;
  img: StaticImageData;
}[] = [
  { n: "01", title: "Recognition", href: "/recognition", img: prog1, desc: "More than a notification; a reward that shows up at their door." },
  { n: "02", title: "Swag", href: "/swag", img: prog2, desc: "Design, storage, shipping, all handled." },
  { n: "03", title: "Snacks", href: "/snacks", img: prog3, desc: "Vegan, gluten-free, nut-free, and more. Everyone’s covered." },
  { n: "04", title: "Gifting", href: "/gifting", img: prog4, desc: "They choose their gifts and enter their addresses. You never chase." },
  { n: "05", title: "Hosted Experiences", href: "/events", img: prog5, desc: "A real host for in-person or remote experiences. Zero planning on your end." },
];

/* Figma's permanent 4-layer card lift (nodes 1113:1800 etc.) */
const CARD_SHADOW =
  "shadow-[0px_20px_20px_-2px_rgba(0,0,0,0.15),0px_6.383px_6.383px_-1.5px_rgba(0,0,0,0.12),0px_2.415px_2.415px_-1px_rgba(0,0,0,0.11),0px_0.796px_0.796px_-0.5px_rgba(0,0,0,0.1)]";

export default function WtePrograms() {
  return (
    <section className="bg-white px-section-x-sm py-16 md:px-section-x-md md:py-20 lg:px-section-x-lg lg:py-24">
      <div className="mx-auto flex w-full max-w-content flex-col gap-8 lg:flex-row lg:gap-16">
        {/* sticky title */}
        <div className="lg:w-[24rem] lg:shrink-0">
          <div className="flex flex-col gap-2 lg:sticky lg:top-28">
            <p
              data-animation="reveal"
              className="font-sans text-eyebrow-sm font-bold uppercase tracking-[0.0625rem] text-[#767676]"
            >
              The programs
            </p>
            <h2
              data-animation="reveal"
              className="font-display text-[1.75rem] leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
            >
              However you want to recognize and reward
            </h2>
          </div>
        </div>

        {/* grey tray of program cards */}
        <div className="flex flex-1 flex-col gap-4 rounded-[2rem] bg-[#f2f2f2] p-4">
          {CARDS.map((c) => (
            <a
              key={c.title}
              href={c.href}
              data-animation="reveal"
              className={`group flex items-stretch gap-2.5 overflow-hidden rounded-[1.5rem] bg-white p-2.5 transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink active:scale-[0.995] ${CARD_SHADOW}`}
            >
              <div className="relative flex flex-1 flex-col justify-between p-4">
                <span className="font-sans text-[1rem] tracking-[0.025em] text-[#828282]">
                  {c.n}
                </span>
                <div className="flex flex-col gap-4 rounded-[1.5rem] bg-[#f7f7f7] p-6">
                  <h3 className="font-[family-name:var(--font-satoshi)] text-[1.5625rem] leading-[1.04] tracking-[-0.012em] text-[#16171b]">
                    {c.title}
                  </h3>
                  <p className="font-sans text-[0.9375rem] leading-[1.5] text-[#6b6c71]">
                    {c.desc}
                  </p>
                </div>
              </div>
              <div className="w-[38%] shrink-0 self-stretch overflow-hidden rounded-[1.25rem]">
                <Image
                  src={c.img}
                  alt={c.title}
                  className="size-full object-cover"
                  sizes="(min-width:1024px) 15rem, 40vw"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
