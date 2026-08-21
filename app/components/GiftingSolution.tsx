"use client";

/* /gifting · THE SOLUTION. "One platform for all your gifting" — a centred
   header, a 6-tab pill switcher (HOLIDAY / EMPLOYEE / CLIENT & PROSPECT /
   PARTNER (default) / AUTOMATED GIFTING / GIFT STORES) and a white/75 band:
   visual left (580×370 r24), copy + checklist + underlined CTA right. Behind it
   sits Figma's blurred amber "symbol gradient" (#C08A00 at 11%, blur 200) which
   bleeds off the right edge — the section clips it.

   Content source (2026-08-21): the Imagery System file F7rDHYd3n5nwRtrlv1F6dO.
     · section shell     1065:13949 "six ways" (1440×1003) — header 1065:13951,
       tab bar 1065:13957, band 1065:13971 drawn in the PARTNER state, whose
       visual 1065:13973 stacks two fills; the top one (1277:8414 "image 13586")
       is the live partner photo and replaces the older "image 13585".
     · the other five panels 1091:3748 → 1091:3749 (holiday), 1091:3774
       (employee), 1091:3799 (client & prospect), 1091:3825 (automated),
       1091:4107 (gift stores). 1220:3928 is a superseded copy of the partner
       band (old photo) — ignored.
   Every title / description / checklist / CTA below is that file's text,
   verbatim, including the inconsistent CTA casing ("Explore HOLIDAY gifting"
   vs "Explore gift stores") and the "gift storeS" tab label — both are
   rendered uppercase by CSS, so the casing never reaches the screen.

   Artwork: four photos + two UI mockups (see public/gift2/gf-solution-*).
   The AUTOMATED mockup is pure vector + text, so it ships as an SVG (text
   converted to paths) at its own Figma aspect 602:332 — it is a gradient card
   that deliberately clips the 542×378 browser window at its bottom edge, and
   forcing it into the band's 580:370 previously stretched it. The stores
   mockup is a 4× raster re-cropped to 580:370 so `object-cover` never
   slices its chrome — gift
   stores lost 104px off the bottom (its card already bleeds off that edge in
   Figma), automated lost 88px of gradient each side + 48px at the bottom and
   gained a copied top row of gradient.

   Figma stack (y relative to the section frame, which is content-tight:
   0 internal top/bottom padding → rendered as lg:py-20 so the visible gap to
   the neighbours stays 160):
     intro frame 1065:13951  y=0    h=248
       eyebrow   y=0    h=17
       title     y=25   h=48   gap 8
       subhead   y=93   h=53   gap 20   (Figma reserves a 2-line 53px box for
                                         a 1-line string → lg:h-[3.3125rem],
                                         so the visible gap to the tabs is 66)
       tab bar   y=186  h=62   gap 40   (pill p-10, gap 10, tabs px-20 py-13 lh16)
     band frame  1065:13971  y=248  h=435
       card      y=293  h=390  gap 45   (p-10, gap 60, visual 580×370 r24,
                                         text col py-60: 32/40 → 18 → 16/1.5
                                         → 32 → list(gap 12, pb 8) → 32 → CTA)
     section end y=683 · next section (How it works) starts 160 later.
   Glow: 983×554 vector at x=1212 y=64.66 (flipped horizontally); its blur
   region is 1783×1354, centred vertically on the section and 983.5px right of
   the section centre — anchored here to the 1200 content rail's right edge
   (+383.5px) so it tracks the content above 1440. */

import { useRef, useState, type KeyboardEvent } from "react";
import Image, { type StaticImageData } from "next/image";
import holiday from "@/public/gift2/gf-solution-holiday.jpg";
import employee from "@/public/gift2/gf-solution-employee.jpg";
import client from "@/public/gift2/gf-solution-client.jpg";
import partner from "@/public/gift2/gf-solution-partner.jpg";
const automated = "/gift2/gf-solution-automated.svg";
import stores from "@/public/gift2/gf-solution-stores.jpg";

type Tab = {
  label: string;
  title: string;
  desc: string;
  points: string[];
  cta: string;
  img: StaticImageData | string;
  alt: string;
  /* UI mockups carry baked text + hairlines → quality 100 (design.md, "Image
     quality"); photos → 90. */
  mockup?: true;
  /* The band's slot is a constant share of the card width (47.54% = Figma's
     580 of 1220) and each tab keeps its OWN Figma aspect, so nothing is ever
     stretched or cropped to fit. Default 580/370; the Automated panel is drawn
     602/332 and Gift Stores 580/396. */
  aspect?: string;
  /* vector artwork → plain <img>, so it stays crisp and is never re-encoded */
  vector?: true;
};

const TABS: Tab[] = [
  {
    label: "holiday gifting",
    title: "Holiday Gifting",
    desc: "Send thoughtful holiday gifts to recipients without spreadsheets, address collection, or shipping headaches.",
    points: ["On-brand from day one", "Gifts they choose themselves", "Reusable every year"],
    cta: "Explore HOLIDAY gifting",
    img: holiday,
    alt: "A kraft-paper gift box tied with a red ribbon and a sprig of pine, left on a sunlit stone doorstep",
  },
  {
    label: "employee gifting",
    title: "Employee Gifting",
    desc: "Give employees a gift, set up your way.",
    points: [
      "Individual or team-wide sends",
      "Project wrap-ups, team wins, or just because",
      "25K+ gifts",
    ],
    cta: "Explore EMPLOYEE gifting",
    img: employee,
    alt: "An employee at a sunlit desk lifting the lid off a cream gift box holding a folded knit sweater",
  },
  {
    label: "client & prospect gifting",
    title: "Client & Prospect Gifting",
    desc: "Thank a prospect, celebrate a deal won, or send a renewal gift, without stepping outside your sales process.",
    points: [
      "Fires straight from your CRM",
      "Prospecting, deals won, or renewals",
      "Budgets and tracking, per team",
    ],
    cta: "Explore CLIENT gifting",
    img: client,
    alt: "A handwritten note being signed beside an open gift box and a bottle of red wine on a wooden desk",
  },
  {
    label: "partner gifting",
    title: "Partner Gifting",
    desc: "Gift channel partners and resellers. Stadium keeps up as the list grows.",
    points: [
      "Your logo, theirs, or both",
      "Built for partner and channel programs",
      "Spend and approvals stay in line",
    ],
    cta: "Explore partner gifting",
    img: partner,
    alt: "A black partner gift box holding a tumbler, a notebook and a folded scarf, with a thank-you card and a vase of olive leaves",
  },
  {
    label: "automated gifting",
    title: "Automated Gifting",
    desc: "Automate sends for any milestone, so you never miss a gift.",
    points: [
      "Fires from HRIS/ATS or CRM",
      "Onboarding, anniversaries, and birthdays",
      "Set once, runs all year",
    ],
    cta: "Explore AUTOMATED gifting",
    img: automated,
    alt: "The Stadium automations screen: a New hire welcome rule wired from a Workday trigger to a Welcome Kit on day one, above a table of active birthday, anniversary, onboarding and renewal automations",
    mockup: true,
    aspect: "602/332",
    vector: true,
  },
  {
    label: "gift storeS",
    title: "Gift Stores",
    desc: "Bring all your gifting into one branded store. You set the budget and branding; they pick a gift they’ll love.",
    points: ["25K+ gifts", "No address chasing", "Unredeemed points refunded"],
    cta: "Explore gift stores",
    img: stores,
    alt: "A branded Halden gift shop page with a Featured Picks grid of wine glasses, a leather backpack, a brass tumbler and a steel tumbler, each priced in points",
    mockup: true,
    aspect: "580/396",
  },
];

const DEFAULT_TAB = 3; // Partner Gifting — the state Figma draws in the section

/* lucide/check exactly as exported from Figma (1065:13982, 14×14, 1.16667). */
function Check() {
  return (
    <svg
      viewBox="0 0 14 14"
      fill="none"
      stroke="black"
      strokeWidth={1.16667}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3.5 shrink-0"
      aria-hidden
    >
      <path d="M11.6667 3.5L5.25 9.91667L2.33333 7" />
    </svg>
  );
}

export default function GiftingSolution() {
  const [active, setActive] = useState(DEFAULT_TAB);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const t = TABS[active];

  const select = (i: number) => {
    setActive(i);
    tabRefs.current[i]?.focus();
  };

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = TABS.length;
    if (e.key === "ArrowRight") {
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
    <section className="relative overflow-hidden bg-white px-section-x-sm py-16 md:px-section-x-md md:py-20 lg:px-section-x-lg lg:py-20">
      {/* Figma "symbol gradient" (1065:13950) — the S-symbol blurred 200 at 11%
         amber, anchored to the right edge of the 1200 content rail. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 w-full max-w-content -translate-x-1/2"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/gift2/gf-solution-glow.svg"
          alt=""
          aria-hidden
          width={1783}
          height={1354}
          className="absolute right-0 top-1/2 h-[84.625rem] w-[111.4375rem] max-w-none -translate-y-1/2 translate-x-[calc(50%_+_23.96875rem)] select-none"
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-content flex-col items-center gap-10">
        {/* header — eyebrow → 8 → title → 20 → subhead */}
        <div className="flex w-full flex-col items-center gap-5">
          <div className="flex flex-col items-center gap-2 text-center">
            <p
              data-animation="reveal"
              className="font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem] text-[#996b00]"
            >
              THE SOLUTION
            </p>
            <h2
              data-animation="reveal"
              className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
            >
              One platform for all your gifting
            </h2>
          </div>
          <p
            data-animation="reveal"
            className="max-w-[61.25rem] text-center font-sans text-[1.0625rem] leading-[1.48] text-[#756e63] lg:h-[3.3125rem] lg:text-[1.125rem]"
          >
            Gifting for different recipients, occasions, and workflows.
          </p>
        </div>

        {/* tab bar — scrolls horizontally below lg, centred at lg. The negative
           margins + padding keep the pill's shadow unclipped. */}
        <div
          data-animation="reveal"
          className="-mx-section-x-sm -mb-3 -mt-2 w-[calc(100%_+_2rem)] overflow-x-auto px-section-x-sm pb-3 pt-2 [scrollbar-width:none] md:-mx-section-x-md md:w-[calc(100%_+_3.75rem)] md:px-section-x-md lg:mx-0 lg:mb-0 lg:mt-0 lg:flex lg:w-full lg:justify-center lg:overflow-visible lg:px-0 lg:pb-0 lg:pt-0 [&::-webkit-scrollbar]:hidden"
        >
          <div
            role="tablist"
            aria-label="Gifting programs"
            className="flex w-max items-center gap-2.5 rounded-[100px] bg-white/75 p-2.5 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)]"
          >
            {TABS.map((tab, i) => {
              const isActive = i === active;
              return (
                <button
                  key={tab.label}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`gifting-solution-tab-${i}`}
                  aria-selected={isActive}
                  aria-controls="gifting-solution-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onTabKey(e, i)}
                  className={`whitespace-nowrap rounded-[100px] px-5 py-[0.8125rem] font-sans text-[0.75rem] font-bold uppercase leading-4 tracking-[0.0625rem] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink active:scale-[0.98] ${
                    isActive
                      ? "bg-[#16171b] text-white"
                      : "text-[#16171b] hover:bg-black/5"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* band — Figma sits it 45 below the tab bar (gap 40 + 5) */}
        <div
          data-animation="reveal"
          id="gifting-solution-panel"
          role="tabpanel"
          aria-labelledby={`gifting-solution-tab-${active}`}
          className="flex w-full flex-col gap-6 rounded-[2rem] bg-white/75 p-2.5 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)] lg:mt-[0.3125rem] lg:flex-row lg:items-start lg:gap-[3.75rem]"
        >
          <div
            className="relative w-full shrink-0 overflow-hidden rounded-[1.5rem] lg:w-[47.54%]"
            style={{ aspectRatio: (t.aspect ?? "580/370").replace("/", " / ") }}
          >
            {t.vector ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={t.img as string}
                src={t.img as string}
                alt={t.alt}
                width={602}
                height={332}
                className="h-full w-full select-none object-contain"
              />
            ) : (
              <Image
                key={(t.img as StaticImageData).src}
                src={t.img as StaticImageData}
                alt={t.alt}
                fill
                quality={t.mockup ? 100 : 90}
                className="object-cover"
                sizes="(min-width:1024px) 35rem, 92vw"
              />
            )}
          </div>

          <div
            key={t.title}
            className="snack-step-in flex flex-col gap-8 px-4 pb-6 pt-2 lg:min-w-0 lg:flex-1 lg:basis-0 lg:px-0 lg:py-[3.75rem]"
          >
            <div className="flex flex-col gap-[1.125rem]">
              <h3 className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.25] text-[#16171b] lg:text-[2rem] lg:leading-[2.5rem]">
                {t.title}
              </h3>
              <p className="font-sans text-[1rem] leading-[1.5] text-[#828282]">{t.desc}</p>
            </div>
            <div className="flex flex-col gap-8">
              <ul className="flex flex-col gap-3 pb-2">
                {t.points.map((p) => (
                  <li key={p} className="flex items-center gap-2.5">
                    <Check />
                    <span className="font-sans text-[0.9375rem] leading-[1.4] text-[#16171b]">
                      {p}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="w-fit font-sans text-[0.75rem] font-bold uppercase leading-4 tracking-[0.0625rem] text-[#16171b] transition-opacity duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink active:scale-[0.98]"
              >
                <span className="border-b border-black pb-[2px]">{t.cta}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
