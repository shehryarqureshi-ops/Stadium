"use client";

import StepCardsCarousel, {
  type StepCardsCarouselStep,
} from "@/app/components/common/StepCardsCarousel";
import InviteTeamLoop from "./InviteTeamLoop";
import RolesPermissionsLoop from "./RolesPermissionsLoop";
import WalletSetupLoop from "./WalletSetupLoop";
import IntegrationsLoop from "./IntegrationsLoop";
import SlackTeamsLoop from "./SlackTeamsLoop";
import SsoDomainLoop from "./SsoDomainLoop";
import ShopsLoop from "./ShopsLoop";

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
    title: "Setup your workspace",
    description:
      "Connect Slack and Teams so recognition and rewards reach people in the tools they already use and celebrate each win.",
    cards: [
      {
        caption: "Setup · Team",
        title: "Invite your team",
        description: "Add members and assign who does what.",
        content: <InviteTeamLoop />,
      },
      {
        caption: "Setup · Permissions",
        title: "Roles & permissions",
        description: "Scope send, approve, and spend per person.",
        content: <RolesPermissionsLoop />,
      },
      {
        caption: "Setup · Wallet",
        title: "Fund your wallet",
        description: "One balance for every send, topped up your way.",
        content: <WalletSetupLoop />,
      },
      {
        caption: "Setup · Integrations",
        title: "Connect your stack",
        description: "Sync your HRIS, CRM, and the tools you run.",
        content: <IntegrationsLoop />,
      },
      {
        caption: "Setup · Slack",
        title: "Install in Slack",
        description: "Bring Stadium into the tools your team lives in.",
        content: <SlackTeamsLoop />,
      },
      {
        caption: "Setup · SSO",
        title: "Single sign-on",
        description: "Secure access through your identity provider.",
        content: <SsoDomainLoop />,
      },
    ],
  },
  {
    title: "Assembly",
    description:
      "Kitting, warehousing, and carrier routing configured across every market you ship to.",
    cards: [
      {
        caption: "Assembly · Week 1",
        title: "Shops",
        description:
          "Start from a template or a blank shop, curate it, and publish - then watch people shop it.",
        content: <ShopsLoop />,
      },
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
    title: "Engage",
    description: "Automate recognition, rewards, and every milestone moment.",
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
    title: "90 Day World",
    description: "Report, reorder, and refine — continuously.",
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
];

/* /swag runs this same section on a different dataset — the decoration-methods
   board, Figma 2262:13635 — so the content is props with the homepage copy as
   the default. Same component, two datasets; the homepage is untouched.

   Twelve methods across six outcomes, 23 placements. Several methods appear in
   more than one outcome, and three of them are a DIFFERENT photo each time
   (Embossing, Embroidery, DTF), so those ship a second file with a `-b` suffix
   rather than being deduped by name. Card images are the exact fill each card
   node carries: FILL = centred cover, CROP = the node's own imageTransform
   window. Sources are transparent PNGs sitting on a white card, so they are
   flattened onto white — flattening to black is what put a black box behind
   the DTF shirt. Shipped at 548x500 = 2x the 274x250 slot, and every card was
   checked against Figma's own render of its row (worst MAE 5.7/255). */
const DECO = "/swag2/deco";

const decorationSteps: StepCardsCarouselStep[] = [
  {
    title: "Looks expensive",
    description:
      "Pressed or foiled into the surface, never ink sitting on top.",
    cards: [
      {
        title: "Debossing",
        description: "Blind · 50 pc · 12 day",
        image: `${DECO}/debossing.jpg`,
        imageAlt: "",
      },
      {
        title: "Embossing",
        description: "Raised · 50 pc · 12 day",
        image: `${DECO}/embossing.jpg`,
        imageAlt: "",
      },
      {
        title: "Foil Printing",
        description: "Metallic · 50 pc · 10 day",
        image: `${DECO}/foil-printing.jpg`,
        imageAlt: "",
      },
      {
        title: "Laser Engraving",
        description: "Permanent · 24 pc · 10 day",
        image: `${DECO}/laser-engraving.jpg`,
        imageAlt: "",
      },
    ],
  },
  {
    title: "Survives everything",
    description:
      "The mark outlives the product. Nothing to crack, peel or wash off.",
    cards: [
      {
        title: "Laser Engraving",
        description: "Permanent · 24 pc · 10 day",
        image: `${DECO}/laser-engraving.jpg`,
        imageAlt: "",
      },
      {
        title: "Laser Etching",
        description: "Metal finish · 24 pc · 10 day",
        image: `${DECO}/laser-etching.jpg`,
        imageAlt: "",
      },
      {
        title: "Embroidery",
        description: "12 threads · 24 pc · 10 day",
        image: `${DECO}/embroidery.jpg`,
        imageAlt: "",
      },
      {
        title: "Debossing",
        description: "Blind · 50 pc · 12 day",
        image: `${DECO}/debossing.jpg`,
        imageAlt: "",
      },
    ],
  },
  {
    title: "Full colour artwork",
    description:
      "Gradients, photographs and unlimited colours, with no per-colour cost.",
    cards: [
      {
        title: "DTG",
        description: "Full colour · 1 pc · 5 day",
        image: `${DECO}/dtg.jpg`,
        imageAlt: "",
      },
      {
        title: "DTF",
        description: "Full colour · 12 pc · 5 day",
        image: `${DECO}/dtf.jpg`,
        imageAlt: "",
      },
      {
        title: "Sublimation",
        description: "All-over · 24 pc · 12 day",
        image: `${DECO}/sublimation.jpg`,
        imageAlt: "",
      },
      {
        title: "Rotary Printing",
        description: "Full colour · 12 pc · 8 day",
        image: `${DECO}/rotary-printing.jpg`,
        imageAlt: "",
      },
    ],
  },
  {
    title: "Small runs, no setup",
    description: "No screens, no dies. Sensible from a single piece.",
    cards: [
      {
        title: "DTG",
        description: "Full colour · 1 pc · 5 day",
        image: `${DECO}/dtg.jpg`,
        imageAlt: "",
      },
      {
        title: "Vinyl Cut",
        description: "1-3 colours · 1 pc · 4 day",
        image: `${DECO}/vinyl-cut.jpg`,
        imageAlt: "",
      },
      {
        title: "Laser Etching",
        description: "Metal finish · 24 pc · 10 day",
        image: `${DECO}/laser-etching.jpg`,
        imageAlt: "",
      },
    ],
  },
  {
    title: "Big runs, low unit cost",
    description: "Setup is paid once, then the per-piece price keeps falling.",
    cards: [
      {
        title: "Screen Print",
        description: "6 colours · 24 pc · 7 day",
        image: `${DECO}/screen-print.jpg`,
        imageAlt: "",
      },
      {
        title: "Embroidery",
        description: "12 threads · 24 pc · 10 day",
        image: `${DECO}/embroidery-b.jpg`,
        imageAlt: "",
      },
      {
        title: "Embossing",
        description: "Raised · 50 pc · 12 day",
        image: `${DECO}/embossing-b.jpg`,
        imageAlt: "",
      },
      {
        title: "Foil Printing",
        description: "Metallic · 50 pc · 10 day",
        image: `${DECO}/foil-printing.jpg`,
        imageAlt: "",
      },
    ],
  },
  {
    title: "Edge-to-edge coverage",
    description:
      "Coverage past the usual print area, seam to seam or all the way round.",
    cards: [
      {
        title: "Sublimation",
        description: "All-over · 24 pc · 12 day",
        image: `${DECO}/sublimation.jpg`,
        imageAlt: "",
      },
      {
        title: "DTF",
        description: "Full colour · 12 pc · 5 day",
        image: `${DECO}/dtf-b.jpg`,
        imageAlt: "",
      },
      {
        title: "Rotary Printing",
        description: "Full colour · 12 pc · 8 day",
        image: `${DECO}/rotary-printing.jpg`,
        imageAlt: "",
      },
      {
        title: "Vinyl Cut",
        description: "1-3 colours · 1 pc · 4 day",
        image: `${DECO}/vinyl-cut.jpg`,
        imageAlt: "",
      },
    ],
  },
];

/* The two content sets live here rather than being passed in: this file is a
   client module, and a server page importing a plain object from one gets a
   module reference, not the value — the spread silently did nothing and /swag
   kept rendering the homepage copy. A `variant` string crosses the boundary
   fine, so the picking happens on this side. */
const CONTENT = {
  phases: {
    caption: "The Stadium Way",
    captionColor: undefined,
    title: "We build your program in four phases",
    description:
      "Tell us your goals. We configure the platform, manage the rollout, and support through go-live.",
    steps,
    showNumberInHeading: true,
  },
  decoration: {
    caption: "Decoration methods",
    captionColor: "#10995a",
    title: "Start with the finish you want",
    description: "Twelve methods, sorted by what you are optimising for.",
    steps: decorationSteps,
    showNumberInHeading: false,
  },
} satisfies Record<
  string,
  {
    caption: string;
    captionColor?: string;
    title: string;
    description: string;
    steps: StepCardsCarouselStep[];
    showNumberInHeading: boolean;
  }
>;

export default function StadiumWay({
  variant = "phases",
}: {
  /** "phases" = the homepage onboarding set, "decoration" = the /swag methods. */
  variant?: keyof typeof CONTENT;
} = {}) {
  const c = CONTENT[variant];

  return (
    <StepCardsCarousel
      caption={c.caption}
      captionColor={c.captionColor}
      title={c.title}
      description={c.description}
      steps={c.steps}
      showNumberInHeading={c.showNumberInHeading}
    />
  );
}
