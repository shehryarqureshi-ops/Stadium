"use client";

import StepCardsCarousel, {
  type StepCardsCarouselStep,
} from "@/app/components/common/StepCardsCarousel";
import TeamPermissionsLoop from "./TeamPermissions";

type MockItem = {
  icon?: string;
  label: string;
  sub?: string;
  badge?: string;
  active?: boolean;
};

type Mock = {
  header: string;
  meta: string;
  accent: string;
  items: MockItem[];
};

function MockPanel({ mock }: { mock: Mock }) {
  return (
    <div className="flex h-full flex-col gap-2 bg-gradient-to-b from-[#eef2f8] to-white p-4">
      <div className="flex items-center justify-between px-1">
        <span className="font-sans text-[0.9375rem] font-bold text-ink">
          {mock.header}
        </span>

        <span className="font-sans text-[0.75rem] text-grey-400">
          {mock.meta}
        </span>
      </div>

      {mock.items.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-2.5 rounded-lg px-2 py-2"
          style={
            item.active
              ? {
                  background: `${mock.accent}1a`,
                }
              : undefined
          }
        >
          <span
            className="flex size-8 shrink-0 items-center justify-center rounded-full font-sans text-[0.9375rem] font-bold"
            style={
              item.active
                ? {
                    background: mock.accent,
                    color: "#fff",
                  }
                : {
                    background: "#f1f2f4",
                    color: "#9aa0ac",
                  }
            }
          >
            {item.icon ?? ""}
          </span>

          <span className="flex min-w-0 flex-1 flex-col">
            <span
              className={`font-sans text-[0.875rem] ${
                item.active ? "font-semibold text-ink" : "text-grey-400"
              }`}
            >
              {item.label}
            </span>

            {item.sub && (
              <span className="font-sans text-[0.75rem] text-grey-400">
                {item.sub}
              </span>
            )}
          </span>

          {item.badge && (
            <span
              className="flex size-5 shrink-0 items-center justify-center rounded-full font-sans text-[0.625rem] font-bold text-white"
              style={{
                background: mock.accent,
              }}
            >
              {item.badge}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

const assemblyGlobalFulfillment: Mock = {
  header: "Shipments",
  meta: "12 in transit",
  accent: "#3ecf8e",
  items: [
    {
      label: "Welcome kits · US",
      sub: "Out for delivery",
      badge: "✓",
      active: true,
    },
    {
      label: "Branded swag · EU",
    },
    {
      label: "Snack boxes · APAC",
    },
    {
      label: "Gift cards · LATAM",
    },
  ],
};

const assemblyCarrierRouting: Mock = {
  header: "Carriers",
  meta: "Auto-routed",
  accent: "#14b8a6",
  items: [
    {
      label: "DHL Express",
      sub: "2–4 days",
      active: true,
    },
    {
      label: "FedEx",
    },
    {
      label: "UPS",
    },
    {
      label: "Local last-mile",
    },
  ],
};

const assemblyCompliance: Mock = {
  header: "Compliance",
  meta: "170+ countries",
  accent: "#0ea5e9",
  items: [
    {
      label: "HS codes",
      sub: "Auto-classified",
      active: true,
    },
    {
      label: "VAT & GST",
    },
    {
      label: "Import duties",
    },
    {
      label: "Restricted items",
    },
  ],
};

const engageAutomations: Mock = {
  header: "Automations",
  meta: "6 active",
  accent: "#8b5cff",
  items: [
    {
      label: "New hire → Welcome kit",
      sub: "Runs on hire date",
      active: true,
    },
    {
      label: "Anniversary → Gift",
    },
    {
      label: "Milestone → Reward",
    },
    {
      label: "Event → Swag drop",
    },
  ],
};

const engageRecognition: Mock = {
  header: "Recognition",
  meta: "This week",
  accent: "#a855f7",
  items: [
    {
      label: "Kudos sent",
      sub: "1,204",
      active: true,
    },
    {
      label: "Points redeemed",
      sub: "8,900",
    },
    {
      label: "Top value",
      sub: "Ownership",
    },
    {
      label: "Participation",
      sub: "82%",
    },
  ],
};

const engageMoments: Mock = {
  header: "Upcoming",
  meta: "Next 30 days",
  accent: "#d946ef",
  items: [
    {
      label: "Birthdays",
      sub: "18",
      active: true,
    },
    {
      label: "Work anniversaries",
      sub: "7",
    },
    {
      label: "New hires",
      sub: "12",
    },
    {
      label: "Holidays",
      sub: "2",
    },
  ],
};

const reporting: Mock = {
  header: "Reporting",
  meta: "Last 90 days",
  accent: "#f59e0b",
  items: [
    {
      label: "Spend",
      sub: "$142K this quarter",
      active: true,
    },
    {
      label: "Engagement",
      sub: "87% claim rate",
    },
    {
      label: "Reach",
      sub: "18 markets",
    },
    {
      label: "Redemptions",
      sub: "9,240 sent",
    },
  ],
};

const reorder: Mock = {
  header: "Programs",
  meta: "Saved",
  accent: "#f97316",
  items: [
    {
      label: "Q4 Holiday drop",
      sub: "Ready to rerun",
      badge: "↻",
      active: true,
    },
    {
      label: "New hire kits",
    },
    {
      label: "Anniversary gifts",
    },
    {
      label: "Event swag",
    },
  ],
};

const optimize: Mock = {
  header: "Insights",
  meta: "AI suggestions",
  accent: "#eab308",
  items: [
    {
      label: "Top gift",
      sub: "Premium snacks",
      active: true,
    },
    {
      label: "Best send window",
      sub: "Tue 10am",
    },
    {
      label: "Top region",
      sub: "US-West",
    },
    {
      label: "Suggested budget",
      sub: "+12%",
    },
  ],
};

const steps: StepCardsCarouselStep[] = [
  {
    title: "Team Building",
    description:
      "Build stronger teams with games, mysteries, and challenges that pull people into the conversation.",
    cards: [
      {
        caption: "Setup · Team",
        title: "Invite your team",
        description: "Add members and assign who does what.",
        content: <TeamPermissionsLoop />,
      },
      {
        caption: "Setup · Permissions",
        title: "Roles & permissions",
        description: "Scope send, approve, and spend per person.",
        image: "/sw-card-2-permissions.svg",
      },
      {
        caption: "Setup · Wallet",
        title: "Fund your wallet",
        description: "One balance for every send, topped up your way.",
        image: "/sw-card-3-wallet.svg",
      },
      {
        caption: "Setup · Integrations",
        title: "Connect your stack",
        description: "Sync your HRIS, CRM, and the tools you run.",
        image: "/sw-card-4-integrations.svg",
      },
      {
        caption: "Setup · Slack",
        title: "Install in Slack",
        description: "Bring Stadium into the tools your team lives in.",
        image: "/sw-card-5-slack.svg",
      },
      {
        caption: "Setup · SSO",
        title: "Single sign-on",
        description: "Secure access through your identity provider.",
        image: "/sw-card-6-sso.svg",
      },
    ],
  },
  {
    title: "Learning & Development",
    description:
      "Learn new skills with mixology classes, public speaking workshops, and hands-on making.",
    cards: [
      {
        caption: "Assembly · Week 1",
        title: "Global fulfillment",
        description:
          "Warehousing and kitting configured across every market you ship to.",
        content: <MockPanel mock={assemblyGlobalFulfillment} />,
      },
      {
        caption: "Assembly · Week 2",
        title: "Carrier routing",
        description:
          "Least-cost carrier selection and live tracking on every parcel.",
        content: <MockPanel mock={assemblyCarrierRouting} />,
      },
      {
        caption: "Assembly · Week 3",
        title: "Customs & duties",
        description:
          "HS codes, VAT, and duties calculated so nothing gets stuck at the border.",
        content: <MockPanel mock={assemblyCompliance} />,
      },
    ],
  },
  {
    title: "Health & Wellness",
    description:
      "Recharge with yoga, meditation, and breathwork, led by certified pros.",
    cards: [
      {
        caption: "Engage · Month 2",
        title: "Automations",
        description:
          "Trigger sends on hires, milestones, and moments — the busywork runs itself.",
        content: <MockPanel mock={engageAutomations} />,
      },
      {
        caption: "Engage · Month 2",
        title: "Recognition",
        description:
          "Kudos, points, and rewards tied to the values your company already runs.",
        content: <MockPanel mock={engageRecognition} />,
      },
      {
        caption: "Engage · Month 3",
        title: "Moments",
        description:
          "Birthdays, anniversaries, and life events celebrated — never missed.",
        content: <MockPanel mock={engageMoments} />,
      },
    ],
  },
  {
    title: "Seasonal Celebrations",
    description:
      "Celebrate all year with experiences for holidays, heritage months, and milestones.",
    cards: [
      {
        caption: "90 Day World · Day 90",
        title: "Reporting",
        description:
          "See spend, engagement, and reach across every program in one view.",
        content: <MockPanel mock={reporting} />,
      },
      {
        caption: "90 Day World · Ongoing",
        title: "Reorder",
        description: "Restock and rerun any saved program in a single click.",
        content: <MockPanel mock={reorder} />,
      },
      {
        caption: "90 Day World · Ongoing",
        title: "Optimize",
        description: "Refine with the data and do more of what actually lands.",
        content: <MockPanel mock={optimize} />,
      },
    ],
  },
  {
    title: "Employee Onboarding",
    description: "Help new hires feel like part of the team from day one.",
    cards: [],
  },
  {
    title: "Diversity, Equity, & Inclusion",
    description:
      "Honor every culture through meaningful, thoughtfully hosted experiences.",
    cards: [],
  },
];

export default function ExpCategories() {
  return (
    <StepCardsCarousel
      caption="Browse by category"
      captionColor="#FF5B77"
      title="Find your team’s kind of fun"
      description="Some teams want to compete. Others want to create, learn, or unwind."
      steps={steps}
      showNumberInHeading={false}
    />
  );
}
