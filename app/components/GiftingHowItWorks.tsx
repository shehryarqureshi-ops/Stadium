"use client";

import StepCards, { StepCardItem } from "./common/StepCards";

import pickBox from "@/public/gifting/how-it-works/send.png";
import recipients from "@/public/gifting/how-it-works/pick.png";
import send from "@/public/gifting/how-it-works/gift.png";

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
    image: pickBox,
    imageAlt:
      "Choose your audience, budget, gift options, and timing—or automate it.",
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
    image: recipients,
    imageAlt:
      "Recipients select what they want and provide their own shipping details.",
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
    image: send,
    imageAlt:
      "Stadium manages fulfillment, tracking, customs, duties, and delivery.",
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
