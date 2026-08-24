import SixCards, { type SixCardsItem } from "@/app/components/common/SixCards";

const ITEMS: SixCardsItem[] = [
  {
    image: "/recog2/rc-platform-integrations.svg",
    title: "Integrations",
    description:
      "Connect to 100+ tools, including HRIS, Slack, and Teams, so recognition happens where work does.",
  },
  {
    image: "/recog2/rc-platform-sso.svg",
    title: "SSO & SCIM",
    description:
      "Enterprise authentication with automatic user provisioning from day one.",
  },
  {
    image: "/recog2/rc-platform-analytics.svg",
    title: "Analytics & Insights",
    description:
      "See who's recognized, who's participating, and what's working.",
  },
  {
    image: "/recog2/rc-platform-admin.svg",
    title: "Admin & Governance",
    description:
      "Manage permissions, approvals, and budgets across every program.",
  },
  {
    image: "/recog2/rc-platform-rewards.svg",
    title: "Global Rewards",
    description:
      "Recipients redeem worldwide. We handle fulfillment, customs, duties, and tax.",
  },
  {
    image: "/recog2/rc-platform-points.svg",
    title: "Points & Budgets",
    description: "Allocate, cap, and track point budgets by team.",
  },
];

export default function RecogPlatform() {
  return (
    <SixCards
      caption="THE PLATFORM"
      title="Employee recognition plugs into the platform you already have"
      description="Recognition already lives in Stadium–and connects with the tools your team uses every day."
      items={ITEMS}
    />
  );
}
