"use client";

import Step01 from "@/app/components/cards/swag/Step01";
import Step02 from "@/app/components/cards/swag/Step02";
import Step03 from "@/app/components/cards/swag/Step03";

import StepCards from "./common/StepCards";

const items = [
  {
    title: <>Design & Approve</>,
    description:
      "Choose products, add your artwork or logo, and approve a free mockup within 48 hours.",
    content: <Step01 />,
    desktopVisualWidth: 320,
  },
  {
    title: <>Store & Track</>,
    description:
      "They open your branded store, choose what they actually want, and add their own size and address.",
    content: <Step02 />,
    desktopVisualWidth: 320,
  },
  {
    title: <>Send Anywhere</>,
    description:
      "Tracked from order to doorstep in 170+ countries. Customs, duties and returns are handled by us.",
    content: <Step03 />,
    desktopVisualWidth: 320,
  },
];

export default function SwagmagicHowItWorks() {
  return (
    <StepCards
      caption="How it works"
      captionColor="#0e8850"
      title="From design to delivery, handled"
      description="Three steps from idea to someone’s doorstep."
      items={items}
    />
  );
}
