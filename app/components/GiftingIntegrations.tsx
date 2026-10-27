import VariableCardGrid, {
  VariableCardGridItem,
} from "./common/VariableCardGrid";

import Approvals from "@/app/components/cards/gifting/Approvals";
import VectorCard from "@/app/components/cards/VectorCard";

const ITEMS: VariableCardGridItem[] = [
  {
    graphic: <Approvals />,
    title: "Approvals & Permissions",
    description:
      "Route what needs sign-off, control who can send, and keep a record of every decision.",
  },
  {
    graphic: (
      <VectorCard src="/cards/gifting/Budgets.svg" alt="Budgets by Team" width={578} height={268} />
    ),
    title: "Budgets by Team",
    description:
      "Allocate budgets by team, set limits, and track spend in real time.",
  },
  {
    graphic: (
      <VectorCard src="/cards/gifting/Reporting.svg" alt="Reporting" width={578} height={268} />
    ),
    title: "Reporting",
    description:
      "See what shipped, what it cost, and which programs people engaged with.",
  },
  {
    graphic: (
      <VectorCard src="/cards/gifting/Stack.svg" alt="Connected to Your Stack" width={578} height={268} />
    ),
    title: "Connected to Your Stack",
    description:
      "Connect with your HRIS, CRM, Slack, and other tools so gifts can trigger from systems you already use.",
  },
];

export default function GiftingIntegrations() {
  return (
    <VariableCardGrid
      caption="Program Control"
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
