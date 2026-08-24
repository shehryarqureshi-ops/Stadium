"use client";

import StepCards, { StepCardItem } from "./common/StepCards";

import pickBox from "@/public/gifting/how-it-works/send.png";
import recipients from "@/public/gifting/how-it-works/pick.png";
import send from "@/public/gifting/how-it-works/gift.png";

const items: StepCardItem[] = [
  {
    title:
      <>
        Send or Automate
      </>,
    description:
      "Send a one-off in a click, or connect your HR system once and let milestones trigger the gift.",
    image: pickBox,
    imageAlt: "Pick a Box — Crowd Pleasers snack box selected in Snackmagic",
  },
  {
    title: <>They Pick</>,
    description:
      "They open your branded store, choose what they actually want, and add their own size and address.",
    image: recipients,
    imageAlt:
      "They open your branded store, choose what they actually want, and add their own size and address.",
  },
  {
    title: <>Gift Arrives</>,
    description:
      "Tracked from order to doorstep in 170+ countries. Customs, duties and returns are handled by us.",
    image: send,
    imageAlt:
      "Tracked from order to doorstep in 170+ countries. Customs, duties and returns are handled by us.",
  },
];

export default function GiftingHowItWorks() {
  return (
    <StepCards
      caption="How it works"
      captionColor="#996b00"
      title="From order to their door in four steps"
      description="Send globally with local fulfillment, so every snack box arrives with flavors that feel closer to home."
      items={items}
    />
  );
}
