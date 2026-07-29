/* Migration / roadmap section — a centered header + a full-width Gantt roadmap
   image (exported from Figma) + an optional stat row. Used by /recognition
   (312:5601, with a 4-stat proof row) and /gifting (668:6402, header + Gantt
   only). The eyebrow inherits each page's --color-swag-* accent; the Gantt
   Gantt is crisp HTML/CSS (GanttRoadmap), themed to the page accent. */

import GanttRoadmap from "./GanttRoadmap";

export type MigrationRoadmapContent = {
  eyebrow: string;
  heading: string;
  body: string;
  /** Optional proof stats rendered under the roadmap (omit for header+Gantt). */
  stats?: { value: string; label: string }[];
};

const REC_MIGRATION: MigrationRoadmapContent = {
  eyebrow: "MIGRATION",
  heading: "From nine vendors to one",
  body: "One rollout replaced nine vendors without interrupting a single gifting program.",
  stats: [
    { value: "67 days", label: "Total migration" },
    { value: "0", label: "Programs paused" },
    { value: "9 → 1", label: "Vendor consolidation" },
    { value: "2", label: "Admins after" },
  ],
};

export default function MigrationRoadmap({
  content = REC_MIGRATION,
}: {
  content?: MigrationRoadmapContent;
}) {
  return (
    <section className="bg-white px-section-x-sm pb-20 pt-4 md:px-section-x-md md:pb-24 lg:px-section-x-lg lg:pb-[10rem]">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-14 lg:gap-[3.75rem]">
        {/* header */}
        <div className="flex max-w-[47.5rem] flex-col items-center gap-5 text-center">
          <div className="flex flex-col items-center gap-2">
            <p
              data-animation="reveal"
              className="font-sans text-eyebrow-sm font-bold uppercase tracking-[0.1rem] text-swag-green-deep md:text-eyebrow-md"
            >
              {content.eyebrow}
            </p>
            <h2
              data-animation="reveal"
              className="font-display text-[1.75rem] leading-[1.08] tracking-[-0.03125rem] text-swag-ink md:text-[2.25rem] lg:text-[2.75rem]"
            >
              {content.heading}
            </h2>
          </div>
          <p
            data-animation="reveal"
            className="font-sans text-body-md text-swag-grey lg:text-[1.125rem] lg:leading-[1.45]"
          >
            {content.body}
          </p>
        </div>

        {/* Gantt roadmap — crisp HTML, themed to the page accent */}
        <div data-animation="reveal" className="w-full">
          <GanttRoadmap />
        </div>

        {/* optional proof stat row */}
        {content.stats && (
          <div
            data-animation="reveal"
            className="grid w-full grid-cols-2 gap-y-8 sm:grid-cols-4"
          >
            {content.stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center gap-3 px-4 text-center"
              >
                <p className="font-display text-[2rem] leading-[1.25] text-[#181818]">
                  {s.value}
                </p>
                <p className="font-sans text-[0.75rem] font-bold uppercase tracking-[0.1125rem] text-[#181818]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
