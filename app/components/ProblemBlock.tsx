/* Reusable "problem" block with image-placeholder cards (Figma /gifting 668:4745
   "THE USUAL WAY", /snacks 668:1645). Peek-bars + white card + a 3-card grid,
   each card a blank image placeholder + title + desc. Sits under a dark hero,
   continuing its mesh (via `overlapColor`) and fading to white. The eyebrow
   inherits the page's --color-swag-* accent. (Recognition uses the icon-card
   variant RecognitionProblem instead.) */

export type ProblemBlockContent = {
  eyebrow: string;
  heading: string;
  body: string;
  /** Dark hero color the top gradient continues from (e.g. "#0a1f3d" snacks). */
  overlapColor: string;
  cards: { title: string; desc: string }[];
};

export default function ProblemBlock({
  content,
}: {
  content: ProblemBlockContent;
}) {
  return (
    <section className="relative overflow-hidden px-section-x-sm pb-16 md:px-section-x-md md:pb-24 lg:px-section-x-lg lg:pb-28">
      <div className="relative mx-auto flex w-full max-w-content flex-col items-center">
        {/* peek-behind bars */}
        <div className="flex w-full flex-col items-center">
          <div className="h-[0.875rem] w-[92%] rounded-t-[0.4375rem] bg-white/50" />
          <div className="h-[1.125rem] w-[96%] rounded-t-[0.625rem] bg-white/75" />
        </div>

        {/* white card */}
        <div className="w-full rounded-2xl bg-white px-5 pb-10 pt-14 sm:px-8 lg:px-20 lg:pb-20 lg:pt-[8.75rem]">
          <div className="flex flex-col items-center gap-10">
            {/* header */}
            <div className="flex w-full max-w-[53.75rem] flex-col items-center gap-5 text-center">
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
                className="font-sans text-body-md text-swag-grey lg:text-[1.125rem] lg:leading-[1.48]"
              >
                {content.body}
              </p>
            </div>

            {/* 3-card grid on a tray */}
            <div
              data-animation="reveal"
              className="grid w-full grid-cols-1 gap-4 rounded-[2rem] bg-[#f2f2f2] p-4 md:grid-cols-3"
            >
              {content.cards.map((c) => (
                <div
                  key={c.title}
                  className="flex flex-col rounded-3xl bg-white p-2 shadow-[0_0.1875rem_0.1875rem_0_rgba(0,0,0,0.06)]"
                >
                  <div
                    className="flex aspect-[333/250] w-full items-center justify-center rounded-[1.25rem] bg-grey-200"
                    aria-hidden
                  >
                    <svg
                      className="size-9 text-grey-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-4 px-8 pb-8 pt-[2.625rem]">
                    <h3 className="font-display text-[1.5rem] leading-[1.11] tracking-[-0.01875rem] text-swag-ink lg:text-[1.6875rem]">
                      {c.title}
                    </h3>
                    <p className="font-sans text-body-md leading-[1.5] text-swag-grey">
                      {c.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
