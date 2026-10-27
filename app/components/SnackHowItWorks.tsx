import StepPickBox from "@/app/components/cards/snacks/StepPickBox";
import StepRecipients from "@/app/components/cards/snacks/StepRecipients";
import StepSend from "@/app/components/cards/snacks/StepSend";
import StepRedeem from "@/app/components/cards/snacks/StepRedeem";

import StepCards, {
  type StepCardItem,
} from "@/app/components/common/StepCards";

const desktopVisualWidth = 265;

const items: StepCardItem[] = [
  {
    title: (
      <>
        Choose a<br />
        Budget
      </>
    ),
    description:
      "Set the amount, add your recipients, and send the invitation.",
    content: <StepPickBox />,
    desktopVisualWidth,
  },
  {
    title: (
      <>
        They Build
        <br />
        Their Box
      </>
    ),
    description: "Recipients choose the snacks and treats they actually want.",
    content: <StepRecipients />,
    desktopVisualWidth,
  },
  {
    title: (
      <>
        We
        <br />
        Pack It
      </>
    ),
    description: "Their picks are packed into a box made just for them.",
    content: <StepSend />,
    desktopVisualWidth,
  },
  {
    title: (
      <>
        We
        <br />
        Deliver
      </>
    ),
    description: "Stadium handles fulfillment and delivery to their door.",
    content: <StepRedeem />,
    desktopVisualWidth,
  },
];

export default function SnackHowItWorks() {
  return (
    <StepCards
      caption="How it works"
      captionColor="#1f71e7"
      title="They pick the snacks. We handle the rest."
      description="Send globally with local fulfillment, giving every recipient the freedom to choose snacks that fit their tastes and dietary needs."
      items={items}
    />
  );
}
