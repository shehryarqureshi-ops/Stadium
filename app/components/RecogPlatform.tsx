/* /recognition · THE PLATFORM (Figma n9SjmDjzB1PeZAYJ5w43fr → 2504:8186, page
   frame 2504:6746, section y 4938..5866 at 1440). "Employee recognition plugs
   into the platform you already have" — a centred header then a #f2f2f2 tray
   (r24, p10) holding a 3×2 grid of white cards (r12, shadow 0 3 6 .06). Each
   card is a centred 128px 3D greyscale icon (Figma vector → SVG, crisp at any
   zoom) + title (Satoshi 25/1.04/-0.3) + description (Overpass 14.5/1.48).
   NOTE this grid is NOT the /swag mockup-card grid: Figma draws icon cards
   (400×345, tray p10/gap10/r24, card r12) rather than swag's 428-wide mockup
   cards (tray p16/gap16/r32, card r24) — Figma wins.
   Container: site 1200 (Figma draws 1240 @ x=100) — inner proportions kept.

   Figma stack (y relative to the section frame, 1440):
     eyebrow "THE PLATFORM"        y=0    h=17   (12 / 1.4, #8d12e7, +1.6px)
     gap 8
     h2 (44 / 1.08 / -0.5, 2 ln)   y=25   h=96
     gap 20
     subhead (18 / 1.48, 1 ln)     y=141  h=27   → header block 0..168 (880 wide)
     gap 40
     grid tray                     y=208  h=720  (p10 · card 400 · gap 10 · rows 345)
       card: pt 60 → icon 128 → gap 24 → title 26 → gap 20 → desc 42 → pb 45
     frame end 928 (= the 160 gap to the next section is carried by the
     neighbours' py-20 + this section's py-20)
   Site: py-20 (80) top/bottom = 160 visible to both neighbours. */

const CARDS: { icon: string; title: string; desc: string }[] = [
  {
    icon: "/recog2/rc-platform-integrations.svg",
    title: "Integrations",
    desc: "Connect to 100+ tools, including HRIS, Slack, and Teams, so recognition happens where work does.",
  },
  {
    icon: "/recog2/rc-platform-sso.svg",
    title: "SSO & SCIM",
    desc: "Enterprise authentication with automatic user provisioning from day one.",
  },
  {
    icon: "/recog2/rc-platform-analytics.svg",
    title: "Analytics & Insights",
    desc: "See who's recognized, who's participating, and what's working.",
  },
  {
    icon: "/recog2/rc-platform-admin.svg",
    title: "Admin & Governance",
    desc: "Manage permissions, approvals, and budgets across every program.",
  },
  {
    icon: "/recog2/rc-platform-rewards.svg",
    title: "Global Rewards",
    desc: "Recipients redeem worldwide. We handle fulfillment, customs, duties, and tax.",
  },
  {
    icon: "/recog2/rc-platform-points.svg",
    title: "Points & Budgets",
    desc: "Allocate, cap, and track point budgets by team.",
  },
];

export default function RecogPlatform() {
  return (
    <section
      aria-labelledby="recog-platform-heading"
      className="bg-white px-section-x-sm py-16 md:px-section-x-md md:py-20 lg:px-section-x-lg lg:py-20"
    >
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-10">
        {/* header — 880 wide in Figma, centred */}
        <div className="flex w-full max-w-[55rem] flex-col items-center gap-5 text-center">
          <div className="flex flex-col items-center gap-2">
            <p
              data-animation="reveal"
              className="font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem] text-[#8d12e7]"
            >
              THE PLATFORM
            </p>
            <h2
              id="recog-platform-heading"
              data-animation="reveal"
              className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
            >
              Employee recognition plugs into the platform you already have
            </h2>
          </div>
          <p
            data-animation="reveal"
            className="font-sans text-[1.0625rem] leading-[1.48] text-[#6b6c71] lg:text-[1.125rem]"
          >
            Recognition already lives in Stadium–and connects with the tools your
            team uses every day.
          </p>
        </div>

        {/* grey tray · 3×2 icon cards */}
        <div
          data-animation="reveal"
          data-reveal-stagger="80"
          className="w-full rounded-[1.5rem] bg-[#f2f2f2] p-2.5"
        >
          <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3" role="list">
            {CARDS.map((c) => (
              <li
                key={c.title}
                data-animation="reveal"
                className="flex flex-col items-center gap-6 overflow-hidden rounded-[0.75rem] bg-white px-8 pb-[2.8125rem] pt-[3.75rem] text-center shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.icon}
                  alt=""
                  aria-hidden
                  width={128}
                  height={128}
                  className="size-32 shrink-0 object-contain"
                />
                <div className="flex w-full flex-col gap-5">
                  <h3 className="font-[family-name:var(--font-satoshi)] text-[1.5625rem] font-bold leading-[1.04] tracking-[-0.01875rem] text-[#16171b]">
                    {c.title}
                  </h3>
                  <p className="font-sans text-[0.90625rem] leading-[1.48] text-[#6b6975]">
                    {c.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
