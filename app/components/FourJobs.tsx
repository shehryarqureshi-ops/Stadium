/* "Companies hire Stadium to do 4 jobs." — Figma 7068:28110 (A1 · tray of four cards, side by side):
   the heading on the left, a #f2f2f2 tray on the right holding the four jobs as a 2×2 grid of white
   cards (big grey number top, title + copy pinned to the bottom). No subheading, no stack.
   Below lg the tray drops under the heading; below sm the cards go one per row. The section's side
   padding is the site header's own, so its outer edges line up with the logo and Talk to sales. */

const JOBS = [
  {
    title: "Save time",
    body: "Managing engagement is nobody’s main job. We run it for you.",
  },
  {
    title: "Save money",
    body: "No hidden fees. No shipping, international or storage surprises. One vendor, not ten.",
  },
  {
    title: "Peace of mind",
    body: "The job gets done, right. On time, in full, in 170+ countries.",
  },
  {
    title: "Centralize control",
    body: "Set the rules once. Decentralized execution, built for multi-team use.",
  },
];

export default function FourJobs() {
  return (
    <section
      aria-labelledby="four-jobs-title"
      className="w-full px-4 md:px-[max(var(--spacing-section-x-md),calc((100%_-_var(--container-content))/2))]"
    >
      <div className="flex flex-col gap-10 md:gap-12 lg:flex-row lg:items-start lg:gap-14">
        <header className="flex flex-col gap-5 text-swag-ink lg:shrink-0">
          <p className="font-sans text-[0.75rem] font-bold uppercase leading-4 tracking-[0.0625rem]">
            Why teams choose Stadium
          </p>
          <h2
            id="four-jobs-title"
            className="font-display text-display-sm md:text-heading-xl lg:text-section-title"
          >
            Companies hire
            <br /> Stadium to do 4 jobs.
          </h2>
        </header>

        <ol className="grid min-w-0 gap-4 rounded-tray bg-tray p-4 sm:grid-cols-2 lg:flex-1">
          {JOBS.map((job, i) => (
            <li
              key={job.title}
              className="flex min-h-[18.6875rem] flex-col rounded-job-card bg-white p-2 shadow-node"
            >
              <div className="flex flex-1 flex-col justify-between px-6 py-7">
                <span aria-hidden className="font-display text-job-num text-grey-300">
                  {i + 1}
                </span>
                <div className="flex flex-col gap-4">
                  <h3 className="font-display text-job-title text-swag-ink">{job.title}</h3>
                  <p className="font-sans text-pyramid-meta text-swag-grey">{job.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
