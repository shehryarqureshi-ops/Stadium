import pickBox from "@/public/snacks/sn2-step-pickbox.png";
import recipients from "@/public/snacks/sn2-step-recipients.png";
import send from "@/public/snacks/sn2-step-send.png";
import redeem from "@/public/snacks/sn2-step-redeem.png";

import StepCards, {
  type StepCardItem,
} from "@/app/components/common/StepCards";

const items: StepCardItem[] = [
  {
    title: "Pick a Box",
    description: "Let them build their own box or send a curated one.",
    image: pickBox,
    imageAlt: "Pick a Box — Crowd Pleasers snack box selected in Snackmagic",
  },
  {
    title: "Add Recipients",
    image: recipients,
    imageAlt:
      "Add Recipients — a list of teammates with checkboxes and a Confirm Order button",
  },
  {
    title: "Hit Send",
    image: send,
    imageAlt: "Hit Send — order details for Crowd Pleasers going to 15 people",
  },
  {
    title: "Recipients Redeem",
    image: redeem,
    imageAlt:
      "Recipients Redeem — a phone showing a snack box redemption screen",
  },
];

export default function SnackHowItWorks() {
  return (
    <StepCards
      caption="How it works"
      captionColor="#2178f5"
      title="From order to their door in four steps"
      description="Send globally with local fulfillment, so every snack box arrives with flavors that feel closer to home."
      items={items}
    />
  );
}
