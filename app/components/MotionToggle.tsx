"use client";

import { setMotionPaused, useMotionPaused } from "../lib/motion";

/* "Pause animations" switch (WCAG 2.2.2, A11Y-04). Two placements share one
   state (see app/lib/motion.ts):
   - variant "skip": second keyboard stop after "Skip to content", hidden until
     focused, so keyboard / screen-reader users reach it before any moving
     content;
   - variant "footer": always-visible text control in the footer. */
export default function MotionToggle({
  variant,
}: {
  variant: "skip" | "footer";
}) {
  const paused = useMotionPaused();
  const label = paused ? "Play animations" : "Pause animations";
  const toggle = () => setMotionPaused(!paused);

  if (variant === "skip") {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-pressed={paused}
        className="skip-link skip-link--second inline-flex h-button-h items-center rounded-button bg-white px-button-x font-sans text-button-primary uppercase text-ink shadow-[0px_0.25rem_0.75rem_0px_rgba(0,0,0,0.2)]"
      >
        {label}
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={paused}
      className="whitespace-nowrap font-sans text-body-md text-grey-400 underline underline-offset-4 transition-colors hover:text-white focus-visible:outline-white"
    >
      {label}
    </button>
  );
}
