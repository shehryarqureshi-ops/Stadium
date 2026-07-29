/* Migration-roadmap Gantt, built in HTML/CSS so it stays crisp at any size and
   themes to the page accent (was a low-res 1x rasterized Figma export). Figma
   /recognition 331:728 (and the /gifting equivalent). Bars use the page's
   --color-swag-* accent; scrolls horizontally on narrow screens. */

const COLS = ["DAY 0", "WEEK 1", "WEEK 3", "WEEK 5", "WEEK 7", "WEEK 9 · LIVE"];

type Bar = {
  left: string;
  width: string;
  text?: string;
  variant: "accent" | "grey" | "dark";
};
type IconName = "rocket" | "layout" | "sliders" | "cap" | "headset" | "globe";
type Row = { icon: IconName; label: string; bars: Bar[] };

const ROWS: Row[] = [
  { icon: "rocket", label: "Kickoff Call", bars: [{ left: "0.5%", width: "15.5%", text: "Getting Started", variant: "accent" }] },
  { icon: "layout", label: "Build your workspace", bars: [{ left: "0.5%", width: "32%", text: "Complete Building Your Workspace", variant: "accent" }] },
  { icon: "sliders", label: "Working session", bars: [{ left: "17%", width: "32%", text: "Complete Feature Setup", variant: "accent" }] },
  { icon: "cap", label: "Training", bars: [{ left: "50%", width: "32%", text: "All Admins Trained", variant: "accent" }] },
  { icon: "headset", label: "Resources & support", bars: [{ left: "0.5%", width: "98.5%", text: "Personalized Implementation Guide", variant: "grey" }] },
  { icon: "globe", label: "90 day world", bars: [{ left: "0.5%", width: "82%", variant: "grey" }, { left: "83%", width: "16%", text: "»", variant: "dark" }] },
];

function Icon({ name }: { name: IconName }) {
  const p = {
    className: "size-[1.125rem] shrink-0 text-[#171f30]",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (name === "rocket") return (<svg {...p}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>);
  if (name === "layout") return (<svg {...p}><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 3v18" /><path d="M3 9h6" /></svg>);
  if (name === "sliders") return (<svg {...p}><line x1="4" x2="4" y1="21" y2="14" /><line x1="4" x2="4" y1="10" y2="3" /><line x1="12" x2="12" y1="21" y2="12" /><line x1="12" x2="12" y1="8" y2="3" /><line x1="20" x2="20" y1="21" y2="16" /><line x1="20" x2="20" y1="12" y2="3" /><line x1="2" x2="6" y1="14" y2="14" /><line x1="10" x2="14" y1="8" y2="8" /><line x1="18" x2="22" y1="16" y2="16" /></svg>);
  if (name === "cap") return (<svg {...p}><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>);
  if (name === "headset") return (<svg {...p}><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M18 14h3v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2z" /><path d="M3 14a9 9 0 0 1 18 0" /></svg>);
  return (<svg {...p}><circle cx="12" cy="12" r="10" /><path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z" /><path d="M2 12h20" /></svg>);
}

export default function GanttRoadmap() {
  return (
    <div className="w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="min-w-[56rem] rounded-2xl border border-grey-200 bg-white p-6 shadow-[0_0.75rem_2rem_-0.75rem_rgba(0,0,0,0.1)]">
        {/* column headers */}
        <div className="flex items-center pb-3">
          <div className="w-[13rem] shrink-0" />
          <div className="grid flex-1 grid-cols-6">
            {COLS.map((c) => (
              <span
                key={c}
                className="text-center font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.05rem] text-[#667085]"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* rows */}
        <div className="relative">
          {/* accent "proposal signed" spine at day 0 */}
          <div className="pointer-events-none absolute bottom-0 top-0 z-10 hidden sm:block" style={{ left: "13rem" }}>
            <div className="h-full w-[2px] bg-swag-green-deep" />
            <div className="absolute -bottom-1 -left-[3px] size-2 rounded-full bg-swag-green-deep" />
          </div>

          {ROWS.map((row, i) => (
            <div
              key={row.label}
              className={`flex items-center ${i === 0 ? "" : "border-t border-grey-100"}`}
            >
              <div className="flex w-[13rem] shrink-0 items-center gap-2.5 py-[0.6875rem] pr-3">
                <Icon name={row.icon} />
                <span className="font-sans text-[0.9375rem] text-[#171f30]">
                  {row.label}
                </span>
              </div>
              <div className="relative h-[3.375rem] flex-1">
                {/* vertical week grid lines */}
                {[1, 2, 3, 4, 5].map((n) => (
                  <div
                    key={n}
                    className="absolute inset-y-0 w-px bg-grey-100"
                    style={{ left: `${(n / 6) * 100}%` }}
                  />
                ))}
                {row.bars.map((bar, b) => (
                  <div
                    key={b}
                    className={`absolute top-1/2 flex h-[2.125rem] -translate-y-1/2 items-center justify-center overflow-hidden rounded-lg px-2.5 ${
                      bar.variant === "accent"
                        ? "bg-swag-tint"
                        : bar.variant === "dark"
                          ? "bg-[#16224a]"
                          : "bg-[#eceef1]"
                    }`}
                    style={{ left: bar.left, width: bar.width }}
                  >
                    {bar.text && (
                      <span
                        className={`truncate font-sans text-[0.8125rem] font-semibold ${
                          bar.variant === "accent"
                            ? "text-swag-green-deep"
                            : bar.variant === "dark"
                              ? "text-white"
                              : "text-[#707a8c]"
                        }`}
                      >
                        {bar.text}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* proposal-signed label under the spine */}
        <p
          className="pt-4 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.06rem] text-swag-green-deep"
          style={{ marginLeft: "13rem" }}
        >
          Proposal signed
        </p>
      </div>
    </div>
  );
}
