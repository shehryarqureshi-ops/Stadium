"use client";

import one from "@/public/swag/steps/01.png";
import two from "@/public/swag/steps/02.png";
import three from "@/public/swag/steps/03.png";

import StepCards from "./common/StepCards";

const items = [
  {
    title:
      <>
        Design & Approve
      </>,
    description:
      "Choose products, add your artwork or logo, and approve a free mockup within 48 hours.",
    image: one,
  },
  {
    title: <>Store & Track</>,
    description:
      "They open your branded store, choose what they actually want, and add their own size and address.",
    image: two,
  },
  {
    title: <>Send Anywhere</>,
    description:
      "Tracked from order to doorstep in 170+ countries. Customs, duties and returns are handled by us.",
    image: three,
  },
];

export default function SwagmagicHowItWorks() {
  return (
    <StepCards
      caption="How it works"
      captionColor="#10995A"
      title="From design to delivery, handled"
      description="Three steps from idea to someone's doorstep. No minimums, no guesswork."
      items={items}
    />
  );
}
