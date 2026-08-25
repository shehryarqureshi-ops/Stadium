import VariableCardGrid, {
  VariableCardGridItem,
} from "./common/VariableCardGrid";

import mockStores from "@/public/gifting/control/approvals.png";
import mockInventory from "@/public/gifting/control/budgets.png";
import mockFulfillment from "@/public/gifting/control/reporting.png";
import mockGifting from "@/public/gifting/control/stack.png";

const ITEMS: VariableCardGridItem[] = [
  {
    image: mockStores,
    title: "Approvals & Permissions",
    description:
      "Route what needs signing off, cap who can send, and keep a clean record of every decision.",
  },
  {
    image: mockInventory,
    title: "Budgets by Team",
    description:
      "Allocate a budget per team, cap it, and watch it draw down in real time.",
  },
  {
    image: mockFulfillment,
    title: "Reporting",
    description:
      "See what shipped, what it cost, and which programs people actually engaged with.",
  },
  {
    image: mockGifting,
    title: "Connected to Your Stack",
    description:
      "Connect to 100+ tools, including HRIS, CRM and Slack, so gifts trigger from systems you already run.",
  },
];

export default function GiftingIntegrations() {
  return (
    <VariableCardGrid
      caption="Control"
      captionColor="#996b00"
      title={
        <>
          Gifting your finance team will
          <br />
          actually sign off on
        </>
      }
      description="Budgets set per team, approvals routed before anything ships, and a record of what every program returned."
      gridColumns={2}
      items={ITEMS}
    />
  );
}
