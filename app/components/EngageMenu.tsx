import Image from "next/image";
import railPhoto from "@/public/menu-engage.png";

/* "Ways to Engage" mega-menu — redesigned 2026-06-11 on the pattern of
   shopify.com's "Products" dropdown (measured live): icon+label link rows
   under accent group headers, a featured right rail, and a bottom band of
   title+description links. Stadium palette (white panel, ink text,
   accent-water headers). Capability groups/items are from Figma 249:19205;
   the rail and bottom-band copy is INVENTED — replace when designed. */

type IconProps = { className?: string };

function iconBase(className?: string) {
  return {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
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
};

type Item = { label: string; Icon: (p: IconProps) => React.ReactNode };
type Group = { label: string; items: Item[] };

/* Groups/items from Figma 249:19205; columns balanced Shopify-style
   (reading order flows down each column, left to right). Exported for the
   mobile nav accordion (2026-06-12), which flattens the groups. */
export const COLUMNS: Group[][] = [
  [
    {
      label: "Recognition",
      items: [
        { label: "Kudos & Peer Recognition", Icon: I.heart },
        { label: "Milestone Programs", Icon: I.award },
        { label: "Incentive Programs", Icon: I.star },
      ],
    },
    {
      label: "Swag",
      items: [
        { label: "Swag Kits", Icon: I.package },
        { label: "Branded Stores", Icon: I.bag },
        { label: "On-Demand Swag", Icon: I.zap },
        { label: "Bulk Swag", Icon: I.layers },
        { label: "Virtual Swag Bar", Icon: I.monitor },
        { label: "Storage", Icon: I.archive },
      ],
    },
  ],
  [
    {
      label: "Snacks",
      items: [
        { label: "Build-Your-Own Box", Icon: I.coffee },
        { label: "Curated Boxes", Icon: I.sparkles },
        { label: "Goodie Bags", Icon: I.smile },
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
      ],
    },
  ],
  [
    {
      label: "Events",
      items: [
        { label: "Virtual Team Building", Icon: I.monitor },
        { label: "Wellness & DEI", Icon: I.heart },
        { label: "Holiday & Seasonal", Icon: I.sparkles },
        { label: "Global Experiences", Icon: I.globe },
        { label: "Workshops & Classes", Icon: I.calendar },
      ],
    },
  ],
];

const POPULAR = ["Branded Stores", "Automated Gifting", "Snack Perks"];

const ArrowRight = (p: IconProps) => (
  <svg {...iconBase(p.className)}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

/* Shopify Products-menu metrics + hover choreography (measured 2026-06-11):
   40px row pitch, bare 20px icons, 12px medium +0.72px headers. On item
   hover, SIBLINGS IN THE SAME GROUP dim to 50% (300ms) and a hidden 14px
   arrow fades in after the label — the hovered row itself keeps full color.
   Row labels SemiBold (2026-06-11 weight bump, was Medium — unified with
   Impact's use-case titles). */
function GroupBlock({ group }: { group: Group }) {
  return (
    <div className="flex flex-col">
      {/* heading links to the category overview page; same arrow-reveal
          affordance as the rows */}
      <a
        href="#"
        aria-label={`View all ${group.label}`}
        className="engage-heading mb-1.5 flex items-center gap-1.5 font-sans text-[0.75rem] font-semibold uppercase leading-[0.9rem] tracking-[0.045rem] text-accent-water underline-offset-[0.1875rem] hover:underline"
      >
        {group.label}
        {/* +1px down: Overpass glyphs sit low in their box, so the centered
            arrow otherwise looks high next to the text */}
        <ArrowRight className="engage-arrow size-3 shrink-0 translate-y-px" />
      </a>
      <ul className="engage-group flex flex-col">
        {group.items.map(({ label, Icon }) => (
          <li key={label}>
            <a
              href="#"
              className="engage-row flex h-10 items-center gap-4 font-sans text-[0.875rem] font-medium leading-5 text-ink"
            >
              {/* 16px icon in a 20px alignment column — 20px boxes read
                  oversized next to the 14px labels */}
              <span className="flex size-5 shrink-0 items-center justify-center">
                <Icon className="size-4 text-grey-600" />
              </span>
              {/* -1px optical nudge: Overpass glyphs sit low in their box,
                  making box-centered text look low next to the icon */}
              <span className="-translate-y-px">{label}</span>
              <ArrowRight className="engage-arrow size-3.5 shrink-0 text-ink" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function EngageMenu() {
  return (
    <div className="mx-auto w-full max-w-section">
      {/* hover choreography classes (.engage-row/.engage-group/.engage-arrow)
          are defined in SiteHeader's style block — shared by both menus */}
      <div className="flex items-start gap-10 px-section-x-lg py-8">
        {/* Main — capability groups in 3 balanced columns (Shopify Products pattern) */}
        {/* dividers: full-height border-l on cols 2-3 (grid stretches columns);
            even 40px padding each side lands the hairline at ~1/3 and ~2/3,
            matching the Figma spec (cols are content-fit there) */}
        <div className="grid min-w-0 flex-1 grid-cols-3">
          {COLUMNS.map((groups, i) => (
            <div
              key={i}
              className={`flex flex-col gap-7 ${
                i === 0
                  ? "pr-10"
                  : i === 1
                    ? "border-l-[1.5px] border-grey-100 px-10"
                    : "border-l-[1.5px] border-grey-100 pl-10"
              }`}
            >
              {groups.map((group) => (
                <GroupBlock key={group.label} group={group} />
              ))}
            </div>
          ))}
        </div>

        {/* Right rail — inset card like Shopify's (content INVENTED, pending design) */}
        <aside className="flex w-[18.5rem] shrink-0 flex-col gap-5 rounded-card bg-surface-subtle p-6">
          <p className="font-sans text-[1rem] font-medium leading-6 text-grey-700">
            Latest at Stadium
          </p>
          <a href="#" className="group flex flex-col gap-3">
            <span className="relative h-[6.5rem] w-full overflow-hidden rounded-lg bg-grey-200">
              <Image
                src={railPhoto}
                alt=""
                fill
                sizes="17rem"
                className="object-cover object-[50%_30%]"
              />
            </span>
            <span className="flex flex-col gap-1">
              <span className="font-sans text-[1rem] font-semibold leading-[1.375rem] text-ink transition-colors duration-200 group-hover:text-grey-600">
                The Global Engagement Report 2026
              </span>
              <span className="font-sans text-[0.8125rem] leading-[1.125rem] text-grey-500">
                How 10,000+ companies show up for their people.
              </span>
            </span>
          </a>
          <div className="flex flex-col gap-2.5">
            <p className="font-sans text-[0.75rem] font-semibold uppercase leading-[0.9rem] tracking-[0.045rem] text-grey-500">
              Popular
            </p>
            <ul className="flex flex-col gap-2">
              {POPULAR.map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <span
                    aria-hidden
                    className="size-1.5 shrink-0 rounded-full bg-accent-water"
                  />
                  <a
                    href="#"
                    className="font-sans text-[0.875rem] font-medium leading-5 text-ink transition-colors duration-200 hover:text-grey-600"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

    </div>
  );
}
