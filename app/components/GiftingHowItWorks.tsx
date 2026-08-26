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
        Send or
        <br />
        Automate
      </>
    ),
    description:
      "Send once, upload a list, or connect your systems to trigger gifts automatically.",
    image: pickBox,
    imageAlt: "Pick a Box — Crowd Pleasers snack box selected in Snackmagic",
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
      "Recipients choose what they want and provide their own shipping details.",
    image: recipients,
    imageAlt:
      "They open your branded store, choose what they actually want, and add their own size and address.",
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
      "Tracked from order to doorstep in 170+ countries. Customs, duties and returns are handled by us.",
    desktopVisualWidth,
  },
];

export default function GiftingHowItWorks() {
  return (
    <StepCards
      caption="How it works"
      captionColor="#996b00"
      title="Simple from send to delivery"
      description="Whether you’re sending one gift or one thousand, the process doesn’t change."
      items={items}
    />
  );
}
