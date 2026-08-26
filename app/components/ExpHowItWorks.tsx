"use client";

import StepCards from "./common/StepCards";

import pickYourEvent from "@/public/events/how-it-works/pick-your-event.png";
import bookInMinutes from "@/public/events/how-it-works/book-in-minutes.png";
import showUp from "@/public/events/how-it-works/show-up.png";

const desktopVisualWidth = 340;

const items = [
  {
    title: <>Pick Your Event</>,
    description:
      "Browse hundreds of events, narrowed to your team's preferences.",
    image: pickYourEvent,
    imageAlt: "Pick a Box — Crowd Pleasers snack box selected in Snackmagic",
    desktopVisualWidth,
  },
  {
    title: <>Book in Minutes</>,
    description:
      "Browse hundreds of events, narrowed to your team's preferences.",
    image: bookInMinutes,
    imageAlt:
      "Add Recipients — a list of teammates with checkboxes and a Confirm Order button",
    desktopVisualWidth,
  },
  {
    title: <>Show Up</>,
    description:
      "Everything’s handled. Your team simply enjoys the experience.",
    image: showUp,
    imageAlt: "Hit Send — order details for Crowd Pleasers going to 15 people",
    desktopVisualWidth,
  },
];

export default function ExpHowItWorks() {
  return (
    <StepCards
      caption="How it works"
      captionColor="#FF5B77"
      title="From order to their door in four steps"
      description="Send globally with local fulfillment, so every snack box arrives with flavors that feel closer to home."
      items={items}
    />
  );
}
