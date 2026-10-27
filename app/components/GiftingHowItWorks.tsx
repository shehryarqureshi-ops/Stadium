"use client";

import StepCards, { StepCardItem } from "./common/StepCards";

import HowSend from "@/app/components/cards/gifting/HowSend";
import HowPick from "@/app/components/cards/gifting/HowPick";
import HowGift from "@/app/components/cards/gifting/HowGift";

const desktopVisualWidth = 360;

const items: StepCardItem[] = [
  {
    title: (
      <>
        Set Up
        <br />
        the Send
      </>
    ),
    description:
      "Choose your audience, budget, gift options, and timing—or automate it.",
    content: <HowSend />,
    desktopVisualWidth,
  },
  {
    title: (
      <>
        They
        <br />
        Choose
      </>
    ),
    description:
      "Recipients select what they want and provide their own shipping details.",
    content: <HowPick />,
    desktopVisualWidth,
  },
  {
    title: (
      <>
        We Handle
        <br />
        Logistics
      </>
    ),
    description:
      "Stadium manages fulfillment, tracking, customs, duties, and delivery.",
    content: <HowGift />,
    desktopVisualWidth,
  },
];

export default function GiftingHowItWorks() {
  return (
    <StepCards
      caption="How it works"
      captionColor="#996b00"
      title="From program setup to their doorstep"
      description="Set the rules once. Stadium handles recipient choice, fulfillment, and delivery."
      items={items}
    />
  );
}
