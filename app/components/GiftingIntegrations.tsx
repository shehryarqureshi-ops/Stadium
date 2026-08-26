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
      "Route what needs sign-off, control who can send, and keep a record of every decision.",
  },
  {
    image: mockInventory,
    title: "Budgets by Team",
    description:
      "Allocate budgets by team, set limits, and track spend in real time.",
  },
  {
    image: mockFulfillment,
    title: "Reporting",
    description:
      "See what shipped, what it cost, and which programs people engaged with.",
  },
  {
    image: mockGifting,
    title: "Connected to Your Stack",
    description:
      "Connect with your HRIS, CRM, Slack, and other tools so gifts can trigger from systems you already use.",
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
      description="Set budgets by team, route approvals before anything ships, and see what every program spent and delivered."
      gridColumns={2}
      items={ITEMS}
    />
  );
}
