"use client";

import StepCards from "./common/StepCards";

import EventPick from "@/app/components/cards/events/EventPick";
import EventBook from "@/app/components/cards/events/EventBook";
import EventShowUp from "@/app/components/cards/events/EventShowUp";

const desktopVisualWidth = 340;

const items = [
  {
    title: <>Pick Your Event</>,
    description:
      "Browse hundreds of events, narrowed to your team's preferences.",
    content: <EventPick />,
    desktopVisualWidth,
  },
  {
    title: <>Book in Minutes</>,
    description:
      "Browse hundreds of events, narrowed to your team's preferences.",
    content: <EventBook />,
    desktopVisualWidth,
  },
  {
    title: <>Show Up</>,
    description:
      "Everything’s handled. Your team simply enjoys the experience.",
    content: <EventShowUp />,
    desktopVisualWidth,
  },
];

export default function ExpHowItWorks() {
  return (
    <StepCards
      caption="How it works"
      captionColor="#CB495F"
      title="Booking takes minutes, not meetings"
      description="Faster than the back-and-forth of planning one yourself."
      items={items}
    />
  );
}
