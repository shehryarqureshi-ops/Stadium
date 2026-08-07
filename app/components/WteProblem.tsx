/* Ways to Engage · "five problems" (Figma 1113:1595). A deep-plum statement card
   (THE PROBLEM / "Five vendors, doing the job of one program") beside a stack of
   five white icon-rows naming the pain of a fragmented vendor set. */

type Row = { icon: React.ReactNode; text: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
};

const ROWS: Row[] = [
  {
    text: "Your recognition tool charges per seat, used or not.",
    icon: (
      <svg {...base}>
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    text: "Ordering swag means a new PO and a three-week wait.",
    icon: (
      <svg {...base}>
        <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1Z" />
        <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
        <path d="M12 17.5v-11" />
      </svg>
    ),
  },
  {
    text: "Your gifting tool charges a platform fee on every gift Sales sends.",
    icon: (
      <svg {...base}>
        <rect x="3" y="8" width="18" height="4" rx="1" />
        <path d="M12 8v13" />
        <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
        <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
      </svg>
    ),
  },
  {
    text: "The snack subscription renewed and nobody remembers approving it.",
    icon: (
      <svg {...base}>
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
        <path d="M8 16H3v5" />
      </svg>
    ),
  },
  {
    text: 'Finance is staring at five "engagement" line items, with no idea what any of them cover.',
    icon: (
      <svg {...base}>
        <path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z" />
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      </svg>
    ),
  },
];

export default function WteProblem() {
  return (
    <section className="bg-white px-section-x-sm py-16 md:px-section-x-md md:py-20 lg:px-section-x-lg lg:py-24">
      <div className="mx-auto flex w-full max-w-content flex-col gap-4 lg:flex-row lg:items-stretch">
        {/* plum statement card */}
        <div
          data-animation="reveal"
          className="flex shrink-0 flex-col justify-between gap-16 rounded-[1.5rem] bg-[#1b002f] p-8 shadow-[40px_40px_56.569px_-1px_rgba(0,0,0,0.2),21.981px_21.981px_31.086px_-0.875px_rgba(0,0,0,0.13),12.765px_12.765px_18.053px_-0.75px_rgba(0,0,0,0.1),7.798px_7.798px_11.029px_-0.625px_rgba(0,0,0,0.08),4.829px_4.829px_6.829px_-0.5px_rgba(0,0,0,0.07),2.905px_2.905px_4.108px_-0.375px_rgba(0,0,0,0.06),1.592px_1.592px_2.252px_-0.25px_rgba(0,0,0,0.06),0.672px_0.672px_0.95px_-0.125px_rgba(0,0,0,0.05)] lg:w-[25.3125rem]"
        >
          <p className="font-sans text-eyebrow-sm font-bold uppercase tracking-[0.1rem] text-white">
            The problem
          </p>
          <h2 className="font-display text-[2rem] leading-[1.08] tracking-[-0.03125rem] text-white lg:text-[2.75rem]">
            Five vendors, doing the job of one program
          </h2>
        </div>

        {/* icon rows */}
        <div
          data-animation="reveal"
          className="flex flex-1 flex-col gap-4 rounded-[2rem] bg-[#f2f2f2] p-3 md:p-4"
        >
          {ROWS.map((r) => (
            <div
              key={r.text}
              className="flex items-center gap-[0.875rem] rounded-2xl bg-white p-6 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)]"
            >
              <span className="flex size-6 shrink-0 items-center justify-center text-black">
                {r.icon}
              </span>
              <p className="font-sans text-[0.9375rem] leading-[1.4] text-[#6b6c71]">
                {r.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
