"use client";

import { useState } from "react";
import { MenuShell, MenuRow, MenuSwitcher, MenuFeaturePanel } from "@/app/components/MegaMenu";
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
   choreography. Contained grey (grey-100) rail panel (190px), 48px-pitch
   rows, active = white chip (grey-200 border, r8) — matches the Figma
   1350:36111 nav sidebar (2026-06-18); 352px photo; use-case blocks at
   28px gaps (= Engage's group gap, supersedes the frame's 24px);
   headline = text-heading-md (32/40, 0 tracking per the Universal scale;
   the 1350:36111 frame's −0.48px is an off-token outlier). */

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
        { title: "New Hire Onboarding", desc: "Welcome kits, swag, and first-day gifts." },
        { title: "Employee-to-Employee Recognition", desc: "Recognition for everyday contributions." },
        { title: "Work Anniversaries", desc: "Gifts and recognition for years of service." },
        { title: "Wellness Programs", desc: "Wellness gifts, snack boxes, and care packages." },
        { title: "Offboarding & Farewells", desc: "Thoughtful gifts for departures and retirements." },
      ],
      [
        { title: "Birthdays & Life Moments", desc: "Gifts for birthdays, weddings, new babies, and more." },
        { title: "All-Hands & Team Events", desc: "Swag, snacks, and event kits for company gatherings." },
        { title: "Company Milestones", desc: "Anniversaries, launches, and achievements." },
        { title: "Holiday & Year-End Gifting", desc: "Holiday gifts for teams around the world." },
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

function ArrowRight() {
  return (
    <svg
      className="engage-arrow size-3 shrink-0 text-ink"
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
    <MenuShell>
      <MenuRow>
        <MenuSwitcher
          label="Teams"
          items={TEAMS.map((t) => t.name)}
          active={active}
          onSelect={setActive}
        />

        {/* Right content — all 7 team panels stay mounted, stacked in one
            grid cell with inactive ones invisible: the cell sizes to the
            TALLEST team, so the drawer height never jumps while switching. */}
        <div className="grid min-w-0 flex-1 grid-cols-1">
          {TEAMS.map((t, i) => (
            <div
              key={t.name}
              className={`col-start-1 row-start-1 flex min-w-0 items-stretch gap-6 ${
                i === active ? "impact-swap" : "invisible"
              }`}
            >
              {/* Content zone — two use-case columns; no headline / no "Use
                  cases" eyebrow (Figma 2:75741). Columns 255px @ 45px gap. */}
              <div className="flex min-w-0 flex-1 gap-[2.8125rem]">
                {t.cols.map((col, ci) => (
                  <ul key={ci} className="engage-group flex w-[15.9375rem] shrink-0 flex-col gap-6">
                    {col.map(({ title, desc }) => (
                      <li key={title}>
                        <a href="#" className="engage-row flex flex-col gap-2">
                          <span className="flex items-center gap-1 font-sans text-[0.875rem] font-normal leading-5 text-black">
                            {title}
                            <ArrowRight />
                          </span>
                          <span className="font-sans text-[0.75rem] leading-[1.125rem] text-grey-500">
                            {desc}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>

              {/* Light editorial feature panel (Figma 2:75850) */}
              <MenuFeaturePanel
                eyebrow="Impact by Team"
                image={t.photo}
                aspect="384 / 336"
                title="One platform for every role"
                cta="Get bulk pricing"
              />
            </div>
          ))}
        </div>
      </MenuRow>

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
    </MenuShell>
  );
}
