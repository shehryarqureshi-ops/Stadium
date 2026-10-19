/* Ways to Engage · "problem" (Figma n9SjmDjzB1PeZAYJ5w43fr → 5714:12582).
   Deep-plum statement card (430 wide, r28) with a "five programs · one
   platform" chip, beside a grey tray of five white pain-point rows, each with
   a pastel icon disc. Section is p-100 at 1440 (content 1240). */

import Image from "next/image";

const PROGRAMS = [
  { icon: "award", bg: "bg-[#ffe6ea]" },
  { icon: "shirt", bg: "bg-[#d8f7e1]" },
  { icon: "cookie", bg: "bg-[#fff0c2]" },
  { icon: "gift", bg: "bg-[#f0ddfb]" },
  { icon: "party", bg: "bg-[#d8e8fe]" },
];

const ROWS = [
  {
    icon: "calendar",
    bg: "bg-[#ffe6ea]",
    title: "Lengthy ordering times",
    text: "Ordering swag means a new PO and a three-week wait.",
  },
  {
    icon: "dollar",
    bg: "bg-[#d8f7e1]",
    title: "Hidden platform fees",
    text: "Your gifting tool charges a platform fee on every gift Sales sends.",
  },
  {
    icon: "refresh",
    bg: "bg-[#fff0c2]",
    title: "Surprise auto-renewals",
    text: "The snack subscription renewed and nobody remembers approving it.",
  },
  {
    icon: "user",
    bg: "bg-[#f0ddfb]",
    title: "Per-seat charges",
    text: "Your recognition tool charges per seat, used or not.",
  },
  {
    icon: "help",
    bg: "bg-[#d8e8fe]",
    title: "Vague charges",
    text: "Finance is staring at five “engagement” line items, with no idea what any of them cover.",
  },
];

export default function WteProblem() {
  return (
    <section className="bg-white py-16 md:py-20 lg:py-[6.25rem]">
      <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-4 px-section-x-sm md:px-section-x-md lg:flex-row lg:items-stretch lg:px-[6.25rem]">
        {/* plum statement card */}
        <div
          data-animation="reveal"
          className="flex flex-col justify-center gap-9 rounded-[1.75rem] bg-[#1b002f] px-6 pb-9 pt-10 md:px-9 lg:w-[26.875rem] lg:shrink-0"
        >
          <p className="font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem] text-[#d8b4fe]">
            The problem
          </p>
          <h2 className="font-[family-name:var(--font-satoshi)] text-[2rem] leading-[1.08] tracking-[-0.03125rem] text-white md:text-[2.5rem]">
            One program’s work, split across five vendors
          </h2>

          <div className="flex flex-col items-center gap-4 rounded-[1.75rem] border border-white/[0.16] bg-white/[0.07] px-6 pb-5 pt-6">
            <div aria-hidden className="flex items-center">
              {PROGRAMS.map((p, i) => (
                <span
                  key={p.icon}
                  className={`flex size-[4.25rem] shrink-0 items-center justify-center rounded-full border-4 border-[#2a1244] max-[26rem]:size-14 ${p.bg} ${
                    i < PROGRAMS.length - 1 ? "-mr-[0.375rem]" : ""
                  }`}
                >
                  <Image
                    src={`/wte/icons/${p.icon}.svg`}
                    alt=""
                    width={30}
                    height={30}
                    className="size-[1.875rem] max-[26rem]:size-6"
                  />
                </span>
              ))}
            </div>
            <div className="flex w-full items-center justify-center rounded-full bg-white px-4 py-[0.625rem]">
              <p className="font-sans text-[0.75rem] font-bold leading-none tracking-[0.1rem] text-[#020912]">
                ONE PLATFORM
              </p>
            </div>
            <p className="text-center font-sans text-[0.8125rem] leading-[1.3] text-[#cccccc]">
              Recognition · Swag · Snacks · Gifting · Experiences
            </p>
          </div>
        </div>

        {/* pain-point rows */}
        <ul
          data-animation="reveal"
          className="flex flex-1 list-none flex-col gap-[0.625rem] rounded-[1.75rem] bg-[#f2f2f2] p-3 md:p-4"
        >
          {ROWS.map((r) => (
            <li
              key={r.title}
              className="flex items-center gap-[1.125rem] rounded-[1.125rem] bg-white px-4 py-5 md:px-[1.375rem]"
            >
              <span
                className={`flex size-11 shrink-0 items-center justify-center rounded-full ${r.bg}`}
              >
                <Image
                  src={`/wte/icons/${r.icon}.svg`}
                  alt=""
                  width={19}
                  height={19}
                  className="size-[1.1875rem]"
                />
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-[0.1875rem]">
                <h3 className="font-[family-name:var(--font-satoshi)] text-[1.1875rem] leading-[1.2] text-[#16171b]">
                  {r.title}
                </h3>
                <p className="font-sans text-[0.9375rem] leading-[1.46] text-[#6b6c71]">
                  {r.text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
