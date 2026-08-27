import cxImg from "@/public/impact/cx.jpeg";
import financeImg from "@/public/impact/finance.jpeg";
import hrImg from "@/public/impact/hr.jpeg";
import leadershipImg from "@/public/impact/leads.jpeg";
import marketingImg from "@/public/impact/marketing.jpeg";
import adminsImg from "@/public/impact/operations.jpeg";
import salesImg from "@/public/impact/sales.jpeg";

import PillTabs, {
  type TabsShowcaseItem,
} from "@/app/components/common/PillTabs";

const items: TabsShowcaseItem[] = [
  {
    name: "Marketing",
    tab: "Marketing",
    title: "Full brand control,\nat any scale",
    description:
      "Gift prospects, run campaigns, and keep every send on-brand. Logo, colors, and guidelines locked—no matter who’s placing the order.",
    bullets: [
      "Swag and gifts for customers",
      "Campaigns with tangible assets",
      "Run employer brand moments",
      "Trade show & event merchandise",
    ],
    image: marketingImg,
    href: "/marketing",
  },
  {
    name: "HR",
    tab: "Human Resources",
    title: "Run people programs\nat scale",
    description:
      "Onboarding, milestones, and recognition for every employee — automated from the systems you already run.",
    bullets: [
      "Automate onboarding kits",
      "Celebrate every milestone",
      "Run recognition programs",
      "Prove engagement impact",
    ],
    image: hrImg,
    href: "/hr",
  },
  {
    name: "Sales",
    tab: "Sales",
    title: "Open doors with\nmemorable sends",
    description:
      "Gifts and experiences that get prospects to reply — triggered straight from your CRM.",
    bullets: [
      "Break into target accounts",
      "Trigger sends from your CRM",
      "Stand out at events",
      "Tie sends to pipeline",
    ],
    image: salesImg,
    href: "/sales",
  },
  {
    name: "Operations",
    tab: "Operations",
    title: "Keep the machine\nrunning",
    description:
      "Vendors, inventory, and shipping consolidated into one pipeline you don’t have to babysit.",
    bullets: [
      "Consolidate your vendors",
      "Track inventory live",
      "Ship to 170+ countries",
      "Cut fulfillment tickets",
    ],
    image: adminsImg,
    href: "/operations",
  },
  {
    name: "Team Leaders",
    tab: "Team Leaders",
    title: "Celebrate your team,\nno admin",
    description:
      "Budgets, approvals, and sends scoped to your team — no procurement queue in the way.",
    bullets: [
      "Send in minutes",
      "Stay inside budget",
      "Let recipients choose",
      "See what landed",
    ],
    image: leadershipImg,
    href: "/team-leaders",
  },
  {
    name: "Finance",
    tab: "Finance",
    title: "Control every dollar\nof spend",
    description:
      "One wallet, clean reporting, and no surprise invoices — engagement spend that closes cleanly every month.",
    bullets: [
      "One company wallet",
      "Budget by team and region",
      "Clean tax handling",
      "Audit-ready reporting",
    ],
    image: financeImg,
    href: "/finance",
  },
  {
    name: "C-Suite",
    tab: "C-Suite",
    title: "One platform,\nglobal leverage",
    description:
      "Engagement infrastructure that scales with headcount — instead of headcount scaling with it.",
    bullets: [
      "Consolidate spend",
      "Scale culture globally",
      "De-risk compliance",
      "Measure the return",
    ],
    image: cxImg,
    href: "/c-suite",
  },
];

export default function TeamsTabs() {
  return (
    <PillTabs
      caption="Impact by Team"
      title="Built for every role"
      description="Everything your teams need to create meaningful engagement at scale."
      items={items}
    />
  );
}
