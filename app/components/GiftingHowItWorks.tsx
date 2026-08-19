"use client";

/* /gifting · HOW IT WORKS (Figma n9SjmDjzB1PeZAYJ5w43fr → 2504:12514, inside
   the /gifting page frame 2504:12118). "Simple from send to delivery" — an
   INTERACTIVE 3-step stepper in a #f2f2f2 tray (same component as
   SwagmagicHowItWorks): the active step is twice as wide (Figma 588 : 294 :
   294) and shows its amber-gradient product mockup; the other two collapse to
   a number + a #f7f7f7 title panel. Click (or focus + Enter/Space/arrows) any
   step to expand it.

   The tray is named "Send or Automate" after step 01's title — it is NOT a
   two-mode toggle. The only toggle is the Send Once / Automate segmented
   control *inside* step 01's mockup, which Figma draws with Automate selected;
   it is decorative here (the whole mockup is one role="img").

   Step 01's mockup (2504:12528, 265×332) is rebuilt in HTML rather than
   shipped as a raster so its 6–12px UI text stays crisp at any zoom: amber
   gradient frame + white 229px card, three Figma-exported icons inlined and
   the three avatar photos from Figma's rawImages. Steps 02/03 have no expanded
   frame in the new Figma (their descriptions are hidden layers, so they expand
   to title + mockup only); their mockups are the same-system amber-framed
   visuals already shipped on the old /gifting page (g2-step-pick /
   g2-step-arrive, 530×664 = 2× the 265×332 render).

   Figma stack (y relative to the section frame, which is content-tight:
   0 internal top/bottom padding → rendered as lg:py-20 so the visible gap to
   the neighbours stays 160):
     header 2504:12515  y=0    h=120  (eyebrow 17 → 8 → title 48 → 20 → sub 27)
     gap                       40
     tray   2504:12520  y=160  h=384  (p-16; cards 352 = 10 + mockup 332 + 10)
     section end        y=544
   Tray inner at Figma 1240: 588 | 16 | 294 | 16 | 294 (= 2 : 1 : 1 grow).
   Step-01 card: p-10, row gap-10 → left col 293 (number block 52 top, grey
   panel 159 bottom-anchored: p-24, title 25/1.04, gap 16, desc 15/1.5) +
   mockup 265×332 rounded-12. Steps 02/03: number block 52, panel 274×74. */

import { useRef, useState, type KeyboardEvent } from "react";
import Image, { type StaticImageData } from "next/image";
import step02 from "@/public/gift2/gf-how-step02.png";
import step03 from "@/public/gift2/gf-how-step03.png";
import avatarSarah from "@/public/gift2/gf-how-avatar-sarah.jpg";
import avatarMarcus from "@/public/gift2/gf-how-avatar-marcus.jpg";
import avatarErica from "@/public/gift2/gf-how-avatar-erica.png";

type Step = {
  n: string;
  title: string;
  desc?: string;
  img?: StaticImageData;
  alt: string;
};

const STEPS: Step[] = [
  {
    n: "01",
    title: "Send or Automate",
    desc: "No guessing the gift. No chasing an address. Automate once, and sends continue without you.",
    alt: "Send a Gift panel with Send Once and Automate modes, Automate selected: a Work Anniversary trigger covering 200 members, a member list of Sarah Johnson, Marcus Chen and Erica Liam with their roles, and a Confirm button",
  },
  {
    n: "02",
    title: "They Pick",
    img: step02,
    alt: "They Pick — a branded gift shop with a 1,250 point balance and six gifts to choose from: bottle, cap, tote, fall tee, mug and beanie",
  },
  {
    n: "03",
    title: "Gift Arrives",
    img: step03,
    alt: "Gift Arrives — a woman at her door holding a sticker-covered Stadium gift box",
  },
];

/* Icons exactly as exported from Figma (2504:12534, 12543, 12555). */
function GiftIcon() {
  return (
    <svg
      viewBox="0 0 20.1235 20.1235"
      fill="none"
      stroke="#007AFF"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-[1.2578125rem] shrink-0"
      aria-hidden
    >
      <path d="M16.7721 10.0636V16.7715H3.35644V10.0636" />
      <path d="M1.68259 5.86918H18.4522V10.0616H1.68259V5.86918Z" />
      <path d="M10.063 16.5625L10.0684 5.86914" />
      <path d="M10.0647 5.87107H6.29153C5.73558 5.87107 5.2024 5.65022 4.80929 5.2571C4.41618 4.86399 4.19533 4.33081 4.19533 3.77487C4.19533 3.21892 4.41618 2.68574 4.80929 2.29263C5.2024 1.89952 5.73558 1.67867 6.29153 1.67867C9.22621 1.67867 10.0647 5.87107 10.0647 5.87107Z" />
      <path d="M10.0675 5.87107H13.8407C14.3966 5.87107 14.9298 5.65022 15.3229 5.2571C15.716 4.86399 15.9369 4.33081 15.9369 3.77487C15.9369 3.21892 15.716 2.68574 15.3229 2.29263C14.9298 1.89952 14.3966 1.67867 13.8407 1.67867C10.906 1.67867 10.0675 5.87107 10.0675 5.87107Z" />
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg
      viewBox="0 0 20.325 20.325"
      fill="none"
      stroke="#0B7AFC"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-[1.2703125rem] shrink-0"
      aria-hidden
    >
      <path d="M11.0108 1.69449L3.38893 11.0101H9.31704L8.47017 18.632L16.9389 7.62261H10.1639L11.0108 1.69449Z" />
    </svg>
  );
}

function TriggerIcon() {
  return (
    <svg
      viewBox="0 0 10.0264 10.0264"
      fill="none"
      stroke="#919295"
      strokeWidth={1.07426}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-[0.626625rem] shrink-0"
      aria-hidden
    >
      <path d="M1.25437 3.75975V7.93741C1.25437 8.04821 1.29839 8.15447 1.37673 8.23282C1.45508 8.31117 1.56134 8.35518 1.67214 8.35518H8.3564C8.46719 8.35518 8.57346 8.31117 8.6518 8.23282C8.73015 8.15447 8.77416 8.04821 8.77416 7.93741V3.75975" />
      <path d="M0.838287 3.75979L2.09159 1.25319H7.94031L9.19361 3.75979" />
      <path d="M0.838287 3.75975H9.19361" />
      <path d="M3.76119 5.43079H6.26779" />
    </svg>
  );
}

type Member = {
  name: string;
  email: string;
  role: string;
  chip: string;
  roleColor: string;
  avatar: StaticImageData;
  avatarBg?: string;
  gap: string;
};

const MEMBERS: Member[] = [
  {
    name: "Sarah Johnson",
    email: "sarah@company.com",
    role: "Marketing",
    chip: "#f6ecfd",
    roleColor: "#8d12e7",
    avatar: avatarSarah,
    gap: "gap-[0.375rem]",
  },
  {
    name: "Marcus Chen",
    email: "marcus@company.com",
    role: "Editor",
    chip: "#fbf5e0",
    roleColor: "#ffb800",
    avatar: avatarMarcus,
    gap: "gap-1",
  },
  {
    name: "Erica Liam",
    email: "erica@company.com",
    role: "Sales",
    chip: "#feebf0",
    roleColor: "#ff5b77",
    avatar: avatarErica,
    avatarBg: "#c7b9da",
    gap: "gap-[0.375rem]",
  },
];

/* Step 01's mockup, rebuilt from Figma 2504:12528 (265×332, r12). One
   role="img" so assistive tech gets the summary instead of 30 micro-labels. */
function SendGiftMockup({ label }: { label: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className="relative h-[20.75rem] w-[16.5625rem] shrink-0 overflow-hidden rounded-[0.75rem]"
      style={{
        backgroundImage:
          "linear-gradient(141.915deg, rgb(198,164,73) 0%, rgb(2,19,11) 62.36%, rgb(225,181,120) 104.38%)",
      }}
    >
      <div className="absolute left-1/2 top-1/2 flex w-[14.3125rem] -translate-x-1/2 -translate-y-1/2 flex-col gap-2.5 rounded-[0.5rem] bg-white px-2.5 py-3 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.06)]">
        <p className="font-sans text-[0.75rem] font-semibold leading-[0.9375rem] text-[#1a1b1c]">
          Send a Gift
        </p>

        {/* Send Once / Automate — Figma draws Automate selected */}
        <div className="flex gap-2.5">
          <div className="flex h-[3.125rem] w-[5.875rem] flex-col items-center justify-center gap-1 overflow-hidden rounded-[0.1875rem] bg-[#f8f8f8] px-1.5">
            <span className="flex size-[1.4375rem] items-center justify-center">
              <GiftIcon />
            </span>
            <span className="font-sans text-[0.625rem] font-medium leading-[0.8125rem] text-[#1a1b1c]">
              Send Once
            </span>
          </div>
          <div className="flex h-[3.125rem] w-[5.875rem] flex-col items-center justify-center gap-1 overflow-hidden rounded-[0.1875rem] border-[0.716px] border-[#0b7afc] bg-[#f8f8f8] px-1.5">
            <span className="flex size-[1.4375rem] items-center justify-center">
              <ZapIcon />
            </span>
            <span className="font-sans text-[0.625rem] font-medium leading-[0.8125rem] text-[#1a1b1c]">
              Automate
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="h-px w-full bg-[#e8ebf7]" />

          {/* trigger */}
          <div className="flex flex-col gap-0.5">
            <p className="font-[family-name:var(--font-satoshi)] text-[0.375rem] font-bold uppercase leading-[0.5rem] tracking-[0.0375rem] text-[#4f5052]">
              Trigger
            </p>
            <div className="flex h-[1.4375rem] items-center justify-between overflow-hidden rounded-b-[0.1875rem] rounded-tl-[0.375rem] rounded-tr-[0.1875rem] bg-[#f8f8f8] pl-1.5">
              <span className="flex items-center gap-1">
                <span className="flex size-[0.71625rem] items-center justify-center">
                  <TriggerIcon />
                </span>
                <span className="font-sans text-[0.5rem] font-medium leading-[0.625rem] text-[#1a1b1c]">
                  Work Anniversary
                </span>
              </span>
              <span className="rounded-full bg-[#ebf4ff] px-[0.34rem] py-[0.127rem] font-sans text-[0.5rem] font-bold leading-[0.625rem] tracking-[0.034rem] text-[#0b7afc]">
                200 MEMBERS
              </span>
            </div>
          </div>

          {/* table */}
          <div className="flex items-start justify-between font-sans text-[0.375rem] font-bold leading-[0.5rem] tracking-[0.0225rem] text-[#6b738f]">
            <span>MEMBER</span>
            <span>ROLE</span>
          </div>
          <div className="flex flex-col gap-2">
            {MEMBERS.map((m) => (
              <div key={m.name} className="flex items-center justify-between">
                <span className={`flex items-center ${m.gap}`}>
                  <span
                    className="relative size-7 shrink-0 overflow-hidden rounded-full"
                    style={m.avatarBg ? { backgroundColor: m.avatarBg } : undefined}
                  >
                    <Image
                      src={m.avatar}
                      alt=""
                      fill
                      quality={100}
                      sizes="1.75rem"
                      className="object-cover"
                    />
                  </span>
                  <span className="flex flex-col justify-center">
                    <span className="font-sans text-[0.625rem] font-semibold leading-[0.8125rem] text-[#1a1c2e]">
                      {m.name}
                    </span>
                    <span className="font-sans text-[0.5rem] font-normal leading-[0.625rem] text-[#6b738f]">
                      {m.email}
                    </span>
                  </span>
                </span>
                <span
                  className="rounded-full px-1.5 py-[0.1875rem] text-center font-sans text-[0.5rem] font-medium leading-[0.5625rem]"
                  style={{ backgroundColor: m.chip, color: m.roleColor }}
                >
                  {m.role}
                </span>
              </div>
            ))}
          </div>

          {/* confirm */}
          <div className="flex w-full items-center justify-center rounded-full bg-[#1b1b1b] px-3 py-2">
            <span className="font-sans text-[0.4375rem] font-bold leading-[0.4375rem] tracking-[0.04875rem] text-white">
              CONFIRM
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GiftingHowItWorks() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);

  const select = (i: number) => {
    setActive(i);
    tabRefs.current[i]?.focus();
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>, i: number) => {
    const n = STEPS.length;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActive(i);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      select((i + 1) % n);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      select((i - 1 + n) % n);
    } else if (e.key === "Home") {
      e.preventDefault();
      select(0);
    } else if (e.key === "End") {
      e.preventDefault();
      select(n - 1);
    }
  };

  return (
    <section className="bg-white px-section-x-sm py-16 md:px-section-x-md md:py-20 lg:px-section-x-lg lg:py-20">
      <div className="mx-auto flex w-full max-w-content flex-col gap-10">
        {/* header: eyebrow → 8 → title → 20 → subhead */}
        <div className="flex flex-col gap-2">
          <p
            data-animation="reveal"
            className="font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem] text-[#996b00]"
          >
            HOW IT WORKS
          </p>
          <h2
            data-animation="reveal"
            className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
          >
            Simple from send to delivery
          </h2>
          <p
            data-animation="reveal"
            className="mt-3 font-sans text-[1.0625rem] leading-[1.48] text-[#6b6c71] lg:text-[1.125rem]"
          >
            Whether you&apos;re sending one gift or one thousand, the process doesn&apos;t change.
          </p>
        </div>

        {/* stepper tray */}
        <div
          data-animation="reveal"
          data-reveal-stagger="90"
          role="tablist"
          aria-label="How gifting works"
          className="flex flex-col gap-4 rounded-[2rem] bg-[#f2f2f2] p-4 lg:flex-row lg:items-stretch"
        >
          {STEPS.map((s, i) => {
            const isActive = i === active;
            return (
              <div
                key={s.n}
                data-animation="reveal"
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                tabIndex={isActive ? 0 : -1}
                aria-selected={isActive}
                aria-controls={`gifting-step-panel-${s.n}`}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKey(e, i)}
                className={`group flex min-h-[9rem] cursor-pointer flex-col overflow-hidden rounded-[1.5rem] bg-white p-2.5 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)] transition-[flex-grow,box-shadow,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink lg:min-h-[22rem] lg:basis-0 ${
                  isActive ? "lg:grow-[2]" : "lg:grow hover:bg-[#fafafa]"
                }`}
              >
                <div className="flex h-full flex-col gap-2.5 md:flex-row md:items-end">
                  {/* left column: number (top) + bottom-anchored grey title panel */}
                  <div className="flex h-full min-w-0 flex-1 flex-col justify-between gap-6 self-stretch">
                    <span className="p-4 font-sans text-[1rem] leading-5 tracking-[0.025rem] text-[#828282]">
                      {s.n}
                    </span>
                    <div className="flex w-full flex-col gap-4 rounded-[1.5rem] bg-[#f7f7f7] p-6">
                      <h3 className="font-[family-name:var(--font-satoshi)] text-[1.5625rem] font-bold leading-[1.04] tracking-[-0.01875rem] text-[#16171b]">
                        {s.title}
                      </h3>
                      {isActive && s.desc && (
                        <p className="font-sans text-[0.9375rem] leading-[1.5] text-[#6b6c71]">
                          {s.desc}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* mockup — only rendered on the active step (265×332, r12) */}
                  {isActive && (
                    <div
                      id={`gifting-step-panel-${s.n}`}
                      role="tabpanel"
                      className="snack-step-in mx-auto shrink-0 md:mx-0"
                    >
                      {s.img ? (
                        <div className="relative h-[20.75rem] w-[16.5625rem] overflow-hidden rounded-[0.75rem]">
                          <Image
                            src={s.img}
                            alt={s.alt}
                            fill
                            quality={100}
                            className="object-cover"
                            sizes="16.5625rem"
                          />
                        </div>
                      ) : (
                        <SendGiftMockup label={s.alt} />
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
