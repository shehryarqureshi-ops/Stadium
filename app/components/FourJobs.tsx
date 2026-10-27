/* "Companies hire Stadium to do 4 jobs." — Figma 6912:12299 (A1 · tray of four
   cards). Mobile = one column, tablet = 2×2, desktop = one row of four inside a
   #f2f2f2 tray. Tablet / mobile frames weren't drawn, so type steps down through
   the existing display tokens. */

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
      className="mx-auto flex w-full max-w-section flex-col gap-10 px-section-x-sm md:gap-12 md:px-section-x-md lg:gap-14 lg:px-section-x-lg"
    >
      <header className="flex flex-col items-center gap-5 text-center text-swag-ink">
        <p className="font-sans text-[0.75rem] font-bold uppercase leading-4 tracking-[0.0625rem]">
          Why teams choose Stadium
        </p>
        <h2
          id="four-jobs-title"
          className="font-display text-display-sm md:text-heading-xl lg:text-section-title"
        >
          Companies hire Stadium
          <br className="hidden sm:block" /> to do 4 jobs.
        </h2>
      </header>

      <ol className="grid gap-4 rounded-tray bg-tray p-3 md:grid-cols-2 md:p-4 lg:grid-cols-4">
        {JOBS.map((job, i) => (
          <li
            key={job.title}
            className="flex min-h-48 flex-col gap-4 rounded-job-card bg-white px-8 py-9 shadow-node md:min-h-64 lg:min-h-[18.6875rem]"
          >
            <span aria-hidden className="font-display text-job-num text-grey-300">
              {i + 1}
            </span>
            <h3 className="font-display text-job-title text-swag-ink">{job.title}</h3>
            <p className="font-sans text-pyramid-meta text-swag-grey">{job.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
