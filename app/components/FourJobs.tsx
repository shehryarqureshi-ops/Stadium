import { Clock, ShieldCheck, SlidersHorizontal, Tag } from "lucide-react";

/* "Companies hire Stadium to do 4 jobs." — Figma 7120:10058: a left-aligned header (eyebrow, headline,
   one-line sub) over a row of four #f5f5f7 cards — icon tile, title, copy. Below lg the cards go two
   across, then one per row. The section's side padding is the site header's own, so its outer edges
   line up with the logo and Talk to sales. */

const JOBS = [
  {
    Icon: Clock,
    title: "Save time.",
    body: "Managing engagement is nobody’s main job. We run it for you.",
  },
  {
    Icon: Tag,
    title: "Save money.",
    body: "No hidden fees. No shipping, international or storage surprises.",
  },
  {
    Icon: ShieldCheck,
    title: "Peace of mind.",
    body: "On time, in full, in 170+ countries.",
  },
  {
    Icon: SlidersHorizontal,
    title: "Centralize control.",
    body: "Set the rules once. Let every team move.",
  },
];

export default function FourJobs() {
  return (
    <section
      aria-labelledby="four-jobs-title"
      className="flex w-full flex-col gap-10 px-4 md:gap-12 md:px-[max(var(--spacing-section-x-md),calc((100%_-_var(--container-content))/2))] lg:gap-14"
    >
      <header className="flex flex-col gap-5 text-swag-ink">
        <p className="font-sans text-[0.75rem] font-bold uppercase leading-4 tracking-[0.0625rem]">
          Why teams choose Stadium
        </p>
        <h2
          id="four-jobs-title"
          className="max-w-[68.75rem] font-display text-display-sm md:text-heading-xl lg:text-section-title"
        >
          Companies hire Stadium to do 4 jobs.
        </h2>
        <p className="max-w-[38.75rem] font-sans text-body-lg text-swag-grey">
          Recognition, swag, gifting and events, run end to end by one team, so yours can get back to the
          work only it can do.
        </p>
      </header>

      <ol className="grid min-w-0 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {JOBS.map(({ Icon, title, body }) => (
          <li
            key={title}
            className="flex min-w-0 flex-col rounded-job-card bg-job-tile px-8 pb-8 pt-9 lg:h-job-tile-h"
          >
            <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white text-swag-ink">
              <Icon aria-hidden className="size-7" strokeWidth={1.5} />
            </span>
            <h3 className="mt-10 font-display text-job-tile-title text-swag-ink">{title}</h3>
            <p className="mt-3 font-sans text-body-md text-job-body">{body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
