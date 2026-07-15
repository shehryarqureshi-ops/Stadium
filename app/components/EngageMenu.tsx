/* "Ways to Engage" mega-menu — PIXEL-MATCHED to Figma 93yVIqVYX6fYKsKbLSWX8k
   node 5589:23499 (values read from the nodes, 2026-06-24):
     container: px 120, gap 45 (main ↔ rail)
     main: py 32, three 255px columns @ 45 gutter; groups stacked @ 45
     group: col, gap 16 → [12px-Bold-1px heading + arrow] · [1px underline:
            rainbow #8d12e7→#0b7afc→#ffb800→#ff5b77→#00c036 (accent) / #d9d9d9]
            · [items, gap 8]
     row: 28px tall, 20px icon slot, 12px gap, 14px/20 label #181818
     rail: 300px · #f2f2f2 · px24 py32 · gap 32 → Latest block + Popular block
   Shares the hover choreography (.engage-row/.engage-group/.engage-arrow)
   defined in SiteHeader. */

import Image, { type StaticImageData } from "next/image";
import latestCover from "@/public/engage-latest-cover.png";
import store1 from "@/public/engage-store-1.png";
import store2 from "@/public/engage-store-2.png";
import store3 from "@/public/engage-store-3.png";

type IconProps = { className?: string };

// strokeWidth 2.25 in the 24-unit viewBox renders 1.5px at the 16px icon size
function iconBase(className?: string, strokeWidth: number = 2.25) {
  return {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };
}

const I = {
  heart: (p: IconProps) => (
    <svg {...iconBase(p.className)}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.51 4.04 3 5.5l7 7Z" />
    </svg>
  ),
  award: (p: IconProps) => (
    <svg {...iconBase(p.className)}>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  ),
  star: (p: IconProps) => (
    <svg {...iconBase(p.className)}>
      <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
    </svg>
  ),
  package: (p: IconProps) => (
    <svg {...iconBase(p.className)}>
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  ),
  bag: (p: IconProps) => (
    <svg {...iconBase(p.className)}>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
  zap: (p: IconProps) => (
    <svg {...iconBase(p.className)}>
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
  ),
  layers: (p: IconProps) => (
    <svg {...iconBase(p.className)}>
      <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
    </svg>
  ),
  monitor: (p: IconProps) => (
    <svg {...iconBase(p.className)}>
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
    </svg>
  ),
  archive: (p: IconProps) => (
    <svg {...iconBase(p.className)}>
      <rect width="20" height="5" x="2" y="3" rx="1" />
      <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
      <path d="M10 12h4" />
    </svg>
  ),
  coffee: (p: IconProps) => (
    <svg {...iconBase(p.className)}>
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <path d="M6 2v2" />
      <path d="M10 2v2" />
      <path d="M14 2v2" />
    </svg>
  ),
  sparkles: (p: IconProps) => (
    <svg {...iconBase(p.className)}>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
    </svg>
  ),
  smile: (p: IconProps) => (
    <svg {...iconBase(p.className)}>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <path d="M9 9h.01" />
      <path d="M15 9h.01" />
    </svg>
  ),
  gift: (p: IconProps) => (
    <svg {...iconBase(p.className)}>
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13" />
      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
    </svg>
  ),
  users: (p: IconProps) => (
    <svg {...iconBase(p.className)}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  send: (p: IconProps) => (
    <svg {...iconBase(p.className)}>
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  ),
  globe: (p: IconProps) => (
    <svg {...iconBase(p.className)}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  ),
  repeat: (p: IconProps) => (
    <svg {...iconBase(p.className)}>
      <path d="m17 2 4 4-4 4" />
      <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
      <path d="m7 22-4-4 4-4" />
      <path d="M21 13v1a4 4 0 0 1-4 4H3" />
    </svg>
  ),
  calendar: (p: IconProps) => (
    <svg {...iconBase(p.className)}>
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
    </svg>
  ),
  store: (p: IconProps) => (
    <svg {...iconBase(p.className)}>
      <path d="M4 9V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4" />
      <path d="M2 9h20l-1.5 4H3.5L2 9Z" />
      <path d="M4 13v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" />
    </svg>
  ),
};

type Item = { label: string; Icon: (p: IconProps) => React.ReactNode };
type Group = { label: string; accent?: boolean; items: Item[] };

/* From the new Figma (5589:23499). Exported for the mobile-nav accordion. */
export const COLUMNS: Group[][] = [
  [
    {
      label: "Recognition",
      accent: true,
      items: [
        { label: "Kudos Programs", Icon: I.heart },
        { label: "Milestone Programs", Icon: I.award },
        { label: "Rewards & Incentives", Icon: I.star },
      ],
    },
    {
      label: "Swag",
      items: [
        { label: "Swag Kits", Icon: I.package },
        { label: "Branded Shops", Icon: I.bag },
        { label: "On-Demand Swag", Icon: I.zap },
        { label: "Bulk Swag", Icon: I.layers },
        { label: "Self-Serve Swag", Icon: I.monitor },
        { label: "Swag Storage", Icon: I.archive },
      ],
    },
  ],
  [
    {
      label: "Snacks",
      items: [
        { label: "Build-Your-Own Boxes", Icon: I.coffee },
        { label: "Curated Boxes", Icon: I.sparkles },
      ],
    },
    {
      label: "Gifting",
      items: [
        { label: "Holiday Gifting", Icon: I.gift },
        { label: "Employee Gifting", Icon: I.users },
        { label: "Client & Prospect Gifting", Icon: I.send },
        { label: "Partner Gifting", Icon: I.globe },
        { label: "Automated Gifting", Icon: I.repeat },
        { label: "Gift Shops", Icon: I.store },
      ],
    },
  ],
  [
    {
      label: "Events",
      items: [
        { label: "Team Building", Icon: I.users },
        { label: "Health & Wellness", Icon: I.heart },
        { label: "Seasonal Moments", Icon: I.sparkles },
        { label: "Employee Onboarding", Icon: I.globe },
        { label: "Learning & Development", Icon: I.calendar },
        { label: "Diversity, Equity, & Inclusion", Icon: I.smile },
      ],
    },
  ],
];

const ArrowRight = (p: IconProps) => (
  <svg {...iconBase(p.className, 2)}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

/* Group: 12px-Bold-1px heading (arrow-reveal) · 1px underline (rainbow for the
   accent group, #d9d9d9 otherwise) · 28px icon rows @ 8px. gap 16 throughout. */
function GroupBlock({ group, minRow = false }: { group: Group; minRow?: boolean }) {
  return (
    /* minRow = first group of a two-group column: fixed 149px tall so the
       second group (Swag / Gifting) top-aligns across columns (Figma 2:75437) */
    <div className={`group/col flex flex-col gap-4 ${minRow ? "min-h-[9.3125rem]" : ""}`}>
      <a
        href="#"
        aria-label={`View all ${group.label}`}
        className="engage-heading flex items-center gap-1 font-sans text-[0.75rem] font-bold uppercase leading-4 tracking-[0.0625rem] text-[#1b1b1b]/60 transition-colors duration-200 group-hover/col:text-[#181818]"
      >
        {group.label}
        <ArrowRight className="engage-arrow size-3 shrink-0" />
      </a>
      {/* grey rail at rest; the rainbow gradient wipes in left→right on hover
          of the column (all columns, Recognition included) */}
      <span aria-hidden className="relative block h-px w-full bg-[#d9d9d9]">
        <span className="absolute inset-0 origin-left scale-x-0 bg-[linear-gradient(270deg,#8d12e7,#0b7afc,#ffb800,#ff5b77,#00c036)] transition-transform duration-500 ease-out group-hover/col:scale-x-100" />
      </span>
      <ul className="engage-group flex flex-col gap-2">
        {group.items.map(({ label, Icon }) => (
          <li key={label}>
            <a
              href="#"
              className="engage-row flex h-7 items-center gap-3 font-sans text-[0.875rem] font-normal leading-5 text-grey-600"
            >
              <span className="flex size-5 shrink-0 items-center justify-center">
                <Icon className="size-4 text-grey-600" />
              </span>
              <span>{label}</span>
              {/* arrow reveals on hover only — never a constant */}
              <ArrowRight className="engage-arrow size-3.5 shrink-0 text-grey-600" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Right rail — 300px #f2f2f2 panel: a "Latest" white card (232×104 cover, r8;
   title over #6f7072 desc) + a "Popular" list of white cards (45×35 thumb r6 +
   14px Medium label). Cover + thumbs use spectrum gradients until the real
   report cover / branded-store images are dropped in public/. */
const POPULAR: StaticImageData[] = [store1, store2, store3];

function RailEyebrow({ children }: { children: string }) {
  return (
    <p className="font-sans text-[0.75rem] font-semibold uppercase leading-4 tracking-[0.0156rem] text-[#1b1b1b]">
      {children}
    </p>
  );
}

function RightRail() {
  return (
    <div className="flex w-[18.75rem] shrink-0 flex-col gap-8 self-stretch bg-[#f2f2f2] px-6 py-8">
      {/* Latest block */}
      <div className="flex flex-col gap-5">
        <RailEyebrow>Latest at Stadium</RailEyebrow>
        <a
          href="#"
          className="group flex flex-col gap-3 rounded-xl bg-white p-2.5 shadow-[0_3px_6px_rgba(0,0,0,0.06)]"
        >
          <span className="relative h-[6.5rem] w-full overflow-hidden rounded-lg">
            <Image src={latestCover} alt="" fill sizes="232px" className="object-cover" />
          </span>
          <span className="flex flex-col gap-1">
            <span className="font-sans text-[0.875rem] font-semibold leading-5 text-[#181818]">
              The Global Engagement Report 2026
            </span>
            <span className="font-sans text-[0.75rem] font-normal leading-[1.125rem] text-[#6f7072]">
              How 10,000+ companies show up for their people.
            </span>
          </span>
        </a>
      </div>

      {/* Popular block */}
      <div className="flex flex-col gap-5">
        <RailEyebrow>Popular</RailEyebrow>
        <div className="flex flex-col gap-1">
          {POPULAR.map((img, i) => (
            <a
              key={i}
              href="#"
              className="flex items-center gap-2.5 rounded-xl bg-white p-2 shadow-[0_3px_6px_rgba(0,0,0,0.06)] transition-shadow duration-200 hover:shadow-[0_4px_10px_rgba(0,0,0,0.12)]"
            >
              <span className="relative h-[2.1875rem] w-[2.8125rem] shrink-0 overflow-hidden rounded-md">
                <Image src={img} alt="" fill sizes="45px" className="object-cover" />
              </span>
              <span className="font-sans text-[0.875rem] font-medium leading-5 text-[#181818]">
                Branded Stores
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function EngageMenu() {
  return (
    <div className="mx-auto w-full max-w-section">
      {/* container: gap 45 (main ↔ rail), 120 side padding */}
      <div className="flex gap-[2.8125rem] px-section-x-lg">
        {/* main: three 255px columns @ 45 gutter, 32 top/bottom pad */}
        <div className="flex flex-1 items-start gap-[2.8125rem] py-8">
          {COLUMNS.map((groups, i) => (
            <div key={i} className="flex w-[15.9375rem] shrink-0 flex-col gap-[2.8125rem]">
              {groups.map((group, gi) => (
                <GroupBlock
                  key={group.label}
                  group={group}
                  minRow={groups.length > 1 && gi === 0}
                />
              ))}
            </div>
          ))}
        </div>
        <RightRail />
      </div>
    </div>
  );
}
