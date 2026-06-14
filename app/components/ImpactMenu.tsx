"use client";

import { useState } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import hrImg from "@/public/menu-team-hr.png";
import marketingImg from "@/public/menu-team-marketing.png";
import salesImg from "@/public/menu-team-sales.png";
import cxImg from "@/public/menu-team-cx.png";
import leadershipImg from "@/public/menu-team-leadership.png";
import adminsImg from "@/public/menu-team-admins.png";
import financeImg from "@/public/menu-team-finance.png";

/* "Impact by Team" mega-menu — Figma 279:13122 (current source frame:
   the designer's rev of the code sync, re-synced 2026-06-11; team copy
   variants from 249:19689). Shares EngageMenu's system: outer margins
   (px-section-x-lg py-8), token greys, 40px column gap, dim+arrow hover
   choreography. Plain text rail (208px, 48px-pitch rows — opened from
   the frame's 40px, 2026-06-11 user feedback) with NO header — the
   "TEAMS" label was dropped in the 279:13122 rev; 352px photo; use-case
   blocks at 28px gaps (= Engage's group gap, supersedes the frame's
   24px); headline = text-heading-md (the frame's 32/40 −0.48px equals
   the token exactly). */

type UseCase = { title: string; desc: string };
type Team = {
  name: string;
  headline: string;
  photo: StaticImageData;
  cols: [UseCase[], UseCase[]];
};

/* Exported for the mobile nav accordion (2026-06-12) */
export const TEAMS: Team[] = [
  {
    name: "Human Resources",
    headline: "Build the engagement program your team actually feels.",
    photo: hrImg,
    cols: [
      [
        { title: "Onboarding", desc: "New hire welcome kits delivered globally, day one." },
        { title: "Recognition Programs", desc: "Scalable recognition programs and milestone moments." },
        { title: "Milestone Anniversaries", desc: "Automated celebrations and recurring programs." },
        { title: "Swag Shop", desc: "Curated stores for teams, partners, and audiences." },
      ],
      [
        { title: "Life Moment Celebrations", desc: "Wellbeing and support kits at scale." },
        { title: "Employee Events", desc: "Offsites, internal events, and culture campaigns." },
        { title: "Company Anniversaries", desc: "Programs and kits for milestone celebrations." },
      ],
    ],
  },
  {
    name: "Marketing",
    headline: "Events, ABM, and campaign gifting at scale",
    photo: marketingImg,
    cols: [
      [
        { title: "Event Swag", desc: "Kits shipped to venues, hotels, and distributed teams." },
        { title: "Account-Based Marketing", desc: "Gifting mapped to ABM programs and target accounts." },
        { title: "Webinar Gifts", desc: "Timed sends for launches, announcements, key moments." },
      ],
      [
        { title: "Influencer Campaigns", desc: "Kits and materials for partners and influencers at scale." },
        { title: "Product Launches", desc: "Campaign drops for product announcements and launches." },
        { title: "Rebrands", desc: "New brand materials and kits for rebrand rollouts." },
      ],
    ],
  },
  {
    name: "Sales",
    headline: "Pipeline acceleration and account expansion",
    photo: salesImg,
    cols: [
      [
        { title: "Deal Acceleration", desc: "Sends orchestrated by account plays and pipeline stages." },
        { title: "Account-Based Engagement", desc: "Gifting mapped to ABM programs and target accounts." },
      ],
      [
        { title: "Closed-Won Gifting", desc: "Programs supporting retention motions." },
        { title: "Account Manager Incentives", desc: "Kits aligned to upsell and growth opportunities." },
      ],
    ],
  },
  {
    name: "Customer Experience",
    headline: "Loyalty, retention, and surprise & delight",
    photo: cxImg,
    cols: [
      [
        { title: "Welcome Gifts", desc: "Onboarding gifts for new customers." },
        { title: "Loyalty Programs", desc: "Recognition kits for loyal customers and advocates." },
        { title: "Referral Programs", desc: "Gifts to thank customers for referrals." },
        { title: "Renewal Gifting", desc: "Kits mapped to renewal and retention motions." },
      ],
      [
        { title: "Product Launches", desc: "Campaign drops tied to product announcements." },
        { title: "Re-Engagement Campaigns", desc: "Win-back campaigns with thoughtful gifting." },
        { title: "Surprise & Delight Gifting", desc: "Unexpected moments that build loyalty." },
      ],
    ],
  },
  {
    name: "Leadership",
    headline: "Reputation, retention, and governance",
    photo: leadershipImg,
    cols: [
      [
        { title: "Employee Morale", desc: "Programs that make employees feel seen and valued." },
        { title: "Brand Reputation", desc: "Consistent brand experiences that strengthen reputation." },
        { title: "Security & Compliance", desc: "Enterprise-grade security and compliance standards." },
        { title: "Global Equity", desc: "Fair and equitable experiences for all employees, everywhere." },
      ],
      [
        { title: "Simplified Procurement", desc: "Fewer vendors, faster approvals, one platform." },
        { title: "Lower Voluntary Turnover", desc: "Recognition programs that build loyalty and retention." },
        { title: "Approval Workflows & Governance", desc: "Control, visibility, and governance at scale." },
      ],
    ],
  },
  {
    name: "Office Admins",
    headline: "Logistics, gifting, and inventory at scale",
    photo: adminsImg,
    cols: [
      [
        { title: "Meeting Snack Trays", desc: "Snacks delivered for meetings and events." },
        { title: "Executive Gifting", desc: "High-touch gifting for executives and VIPs." },
        { title: "Offsite Room Drops", desc: "Room drops and kits for offsite events." },
      ],
      [
        { title: "Client & Partner Gifting", desc: "Gifting for clients, partners, and key relationships." },
        { title: "Inventory Management", desc: "Tracking and managing swag inventory at scale." },
      ],
    ],
  },
  {
    name: "Finance",
    headline: "Vendor consolidation, control, and visibility",
    photo: financeImg,
    cols: [
      [
        { title: "Vendor Consolidation", desc: "Fewer vendors, fewer POs, one platform." },
        { title: "Budget Control & Allocation", desc: "Control budgets and allocate spend across teams." },
      ],
      [
        { title: "Spend Visibility", desc: "Real-time visibility into spend and activity." },
        { title: "Security & Compliance", desc: "Enterprise-grade security and compliance standards." },
      ],
    ],
  },
];

function ChevronRight() {
  return (
    <svg
      className="size-2.5 shrink-0 text-ink"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m3 1.5 4 3.5-4 3.5" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg
      className="engage-arrow size-3.5 shrink-0 text-ink"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export default function ImpactMenu() {
  const [active, setActive] = useState(0);

  return (
    <div className="mx-auto flex w-full max-w-section items-stretch gap-10 px-section-x-lg py-8">
      {/* Sidebar — audience switcher as a plain text rail (48px-pitch
          rows — opened up from 279:13122's 40px, which read too tight
          (2026-06-11 user feedback); no card surface, no header). Hover =
          switch, so the active style is the hover feedback. Inactive rows
          Medium, active SemiBold. */}
      <nav aria-label="Teams" className="flex w-[13rem] shrink-0 flex-col self-start py-2">
        <ul className="flex flex-col">
          {TEAMS.map((t, i) => (
            <li key={t.name}>
              <button
                type="button"
                aria-pressed={i === active}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`flex h-12 w-full cursor-pointer items-center justify-between text-left font-sans text-[0.875rem] leading-5 transition-colors duration-150 ${
                  i === active
                    ? "font-semibold text-ink"
                    : "font-medium text-grey-500 hover:text-ink"
                }`}
              >
                {t.name}
                {i === active && <ChevronRight />}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Right content — all 7 team panels stay mounted, stacked in one
          grid cell with inactive ones visibility-hidden: the cell sizes to
          the TALLEST team, so the drawer height never jumps while hovering
          the rail (fixed-height decision 2026-06-11). The fade class moves
          to the newly-active panel, so switches still cross-fade without
          remounting. */}
      <div className="grid min-w-0 flex-1 grid-cols-1">
        {TEAMS.map((t, i) => (
          <div
            key={t.name}
            className={`col-start-1 row-start-1 flex min-w-0 items-stretch gap-10 ${
              i === active ? "impact-swap" : "invisible"
            }`}
          >
            {/* Middle — headline + use cases */}
            <div className="flex min-w-0 flex-1 flex-col gap-10 py-2">
              {/* the system section-heading token (heading-md = 32/40) instead
                  of the Figma frame's near-duplicate arbitrary values */}
              <h3 className="font-display text-heading-md text-ink">
                {t.headline}
              </h3>
              <div className="flex flex-col gap-5">
                {/* section header — same style as Engage group headings */}
                <p className="font-sans text-[0.75rem] font-semibold uppercase leading-[0.9rem] tracking-[0.045rem] text-accent-water">
                  Use cases
                </p>
                <div className="flex gap-10">
                  {t.cols.map((col, ci) => (
                    <ul key={ci} className="engage-group flex min-w-0 flex-1 flex-col gap-7">
                      {col.map(({ title, desc }) => (
                        <li key={title}>
                          <a href="#" className="engage-row flex flex-col gap-1">
                            <span className="flex items-center gap-2 font-sans text-[0.875rem] font-semibold leading-5 text-ink">
                              {title}
                              <ArrowRight />
                            </span>
                            {/* same title+caption block pattern as Engage's rail
                                card: 14/20 semibold + 13/18 grey-500 */}
                            <span className="font-sans text-[0.8125rem] leading-[1.125rem] text-grey-500">
                              {desc}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              </div>
            </div>

            {/* Team photo — rounded like every other media card in the
                system; stretches to the stack height, so it stays
                full-height on short teams too */}
            <div className="relative w-[22rem] shrink-0 overflow-hidden rounded-card bg-grey-200">
              <Image
                src={t.photo}
                alt=""
                fill
                sizes="24rem"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .impact-swap { animation: impact-fade 0.2s ease-out both; }
        @keyframes impact-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .impact-swap { animation: none; }
        }
      `}</style>
    </div>
  );
}
