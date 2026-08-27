import pickBox from "@/public/snacks/sn2-step-pickbox.png";
import recipients from "@/public/snacks/sn2-step-recipients.png";
import send from "@/public/snacks/sn2-step-send.png";
import redeem from "@/public/snacks/sn2-step-redeem.png";

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
    image: pickBox,
    imageAlt: "Set the amount, add your recipients, and send the invitation.",
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
    image: recipients,
    imageAlt: "Recipients choose the snacks and treats they actually want.",
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
    image: send,
    imageAlt: "Their picks are packed into a box made just for them.",
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
    image: redeem,
    imageAlt: "Stadium handles fulfillment and delivery to their door.",
    desktopVisualWidth,
  },
];

export default function SnackHowItWorks() {
  return (
    <StepCards
      caption="How it works"
      captionColor="#2178f5"
      title="They pick the snacks. We handle the rest."
      description="Send globally with local fulfillment, giving every recipient the freedom to choose snacks that fit their tastes and dietary needs."
      items={items}
    />
  );
}
