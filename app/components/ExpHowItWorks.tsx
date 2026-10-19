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
    imageAlt: "Event picker showing filters and a grid of matched classes, with Mixology Class selected",
    desktopVisualWidth,
  },
  {
    title: <>Book in Minutes</>,
    description:
      "Browse hundreds of events, narrowed to your team's preferences.",
    image: bookInMinutes,
    imageAlt:
      "Booking card for Mixology Class with date, time, guest count, total and a Confirm button",
    desktopVisualWidth,
  },
  {
    title: <>Show Up</>,
    description:
      "Everything’s handled. Your team simply enjoys the experience.",
    image: showUp,
    imageAlt: "Confirmed Mixology Class event card with 23 attendees and a Join Event button",
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
