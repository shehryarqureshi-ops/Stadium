import Image from "next/image";
import type { CSSProperties } from "react";

/* People scene — "who works for you" (Figma 6765:3104, node 6912:12450). Your team
   → success lead → seven specialists on a 1200×495 near-black tray (10px above the
   1114×360 diagram, which sits 43px in from the left), then the glowing "cost line"
   pill. From `lg` the tray is drawn exactly as in Figma and scales fluidly: every
   position is a Figma pixel turned into a share of the tray width by `u()` (same trick
   as the Recognition note in EveryWay). Below `lg` it reflows to a vertical flow.
   Portraits are the board's placeholders until real photos land. Icons are
   Figma exports in public/new-home/people/. */

const SPECIALISTS = [
  { label: "Program strategy", badge: "strategy" },
  { label: "Creative & brand", badge: "creative" },
  { label: "Merchandising", badge: "merch" },
  { label: "Global logistics", badge: "logistics" },
  { label: "Fulfillment & kitting", badge: "fulfillment" },
  { label: "Data & insights", badge: "data" },
  { label: "Live support", badge: "support" },
] as const;

const img = (name: string) => `/new-home/people/${name}.svg`;

/** one Figma pixel → a share of the 1200-wide tray */
const u = (n: number) => `calc(${n} * (100cqw / 1200))`;
const box = (x: number, y: number, w?: number, h?: number): CSSProperties => ({
  left: u(x),
  top: u(y),
  ...(w !== undefined && { width: u(w) }),
  ...(h !== undefined && { height: u(h) }),
});

/* diagram origin inside the tray: (1200 − 1114) / 2 across, 10 down */
const DX = 43;
const DY = 10;
const d = (x: number, y: number) => [x + DX, y + DY] as const;

const eyebrow = "font-sans font-bold uppercase tracking-[0.0625rem] text-pyramid-ice";

/* ---------- desktop: the drawn stage ---------- */

function Specialist({ s, x, y }: { s: (typeof SPECIALISTS)[number]; x: number; y: number }) {
  return (
    <div className="absolute" style={box(x, y, 120, 110)}>
      <div
        className="absolute rounded-full bg-people-avatar"
        style={{ ...box(32, 0, 56, 56) }}
      >
        <Image src={img("person")} alt="" width={28} height={28} className="absolute" style={{ ...box(14, 14, 28, 28) }} />
      </div>
      <div className="absolute overflow-hidden rounded-full bg-white" style={box(72, 38, 22, 22)}>
        <Image src={img(`badge-${s.badge}`)} alt="" width={13} height={13} className="absolute" style={box(4.5, 4.5, 13, 13)} />
      </div>
      <p
        className="absolute w-full whitespace-nowrap text-center font-sans font-semibold text-white/90"
        style={{ top: u(68), fontSize: u(13), lineHeight: u(18) }}
      >
        {s.label}
      </p>
    </div>
  );
}

function Stage() {
  return (
    <div
      role="img"
      aria-label="You set the direction and talk to your success lead, who is backed by specialists in program strategy, creative and brand, merchandising, global logistics, fulfillment and kitting, data and insights, and live support."
      className="relative hidden aspect-[1200/495] w-full overflow-hidden rounded-tray border border-people-edge bg-people-night [container-type:inline-size] lg:block"
    >
      {/* blue bloom behind the lead (Ellipse, 360 box + 27.78% overflow) */}
      <Image src={img("glow")} alt="" width={560} height={560} className="pointer-events-none absolute max-w-none" style={box(...d(114, -100), 560, 560)} />

      {/* your team */}
      <div className="absolute" style={box(...d(0, 118), 150, 200)}>
        <p className={`absolute w-full text-center ${eyebrow}`} style={{ top: 0, fontSize: u(11), lineHeight: u(15) }}>
          Your team
        </p>
        <span className="absolute rounded-full border-2 border-people-night bg-people-avatar-a" style={box(22, 34, 56, 56)}>
          <Image src={img("person")} alt="" width={28} height={28} className="absolute" style={box(12, 12, 28, 28)} />
        </span>
        <span className="absolute rounded-full border-2 border-people-night bg-people-avatar-b" style={box(62, 34, 56, 56)}>
          <Image src={img("person")} alt="" width={28} height={28} className="absolute" style={box(12, 12, 28, 28)} />
        </span>
        <p className="absolute w-full text-center font-sans text-white/60" style={{ top: u(104), fontSize: u(13), lineHeight: u(18) }}>
          You set the direction.
        </p>
      </div>

      {/* you talk to */}
      <div className="absolute" style={box(...d(164, 150), 120, 40)}>
        <p className="absolute w-full text-center font-sans text-white/55" style={{ top: 0, fontSize: u(12), lineHeight: u(17) }}>
          you talk to
        </p>
        <Image src={img("connector")} alt="" width={120} height={12} className="absolute max-w-none" style={box(0, 26, 120, 12)} />
      </div>

      {/* your success lead */}
      <div className="absolute" style={box(...d(294, 128), 200, 220)}>
        <span
          className="absolute rounded-full border-2 border-accent-water bg-people-lead drop-shadow-[0_0_1.125rem_rgba(11,122,252,0.5)]"
          style={box(48, 0, 104, 104)}
        >
          <Image src={img("person-lead")} alt="" width={52} height={52} className="absolute" style={box(24, 24, 52, 52)} />
        </span>
        <span className="absolute rounded-full bg-white" style={box(125, 73, 32, 32)}>
          <Image src={img("stadium-mark")} alt="" width={11} height={19} className="absolute max-w-none" style={box(8.82, 6.83, 10.361, 18.333)} />
        </span>
        <p className="absolute w-full text-center font-sans font-semibold text-white" style={{ top: u(118), fontSize: u(16), lineHeight: u(22) }}>
          Your success lead
        </p>
        <p className="absolute w-full text-center font-sans text-white/55" style={{ top: u(144), fontSize: u(13), lineHeight: u(18) }}>
          One point of contact,
          <br />
          kickoff to QBR.
        </p>
      </div>

      {/* branch to the specialists */}
      <Image src={img("branch")} alt="" width={90} height={170} className="absolute max-w-none" style={box(...d(504, 95), 90, 170)} />

      <p
        className={`absolute -translate-x-1/2 whitespace-nowrap text-center ${eyebrow}`}
        style={{ left: u(700 + DX), top: u(45 + DY), fontSize: u(11), lineHeight: u(15) }}
      >
        Backed by specialists
      </p>
      {SPECIALISTS.map((s, i) => (
        <Specialist key={s.label} s={s} x={604 + DX + (i % 4) * 130} y={(i < 4 ? 77 : 227) + DY} />
      ))}

      {/* the cost line — a glowing pill under the diagram (Figma 6988:12338) */}
      <p
        className="absolute left-1/2 flex -translate-x-1/2 items-center whitespace-nowrap rounded-full border border-people-glow-line bg-people-glow-fill font-sans shadow-people-glow"
        style={{ top: u(381), gap: u(12), padding: `${u(14)} ${u(24)} ${u(14)} ${u(16)}`, fontSize: u(18), lineHeight: u(26), letterSpacing: u(0.22) }}
      >
        <span className="relative shrink-0 rounded-full bg-white" style={{ width: u(30), height: u(30) }}>
          <Image src={img("stadium-mark")} alt="" width={11} height={19} className="absolute max-w-none" style={box(7.82, 5.83, 10.361, 18.333)} />
        </span>
        <span>
          <span className="text-white/75">A full team of specialists backing you up. </span>
          <span className="font-bold text-white">For less than the cost of one hire.</span>
        </span>
      </p>
    </div>
  );
}

/* ---------- below lg: compact flow (the pinned panel is only ~400px tall on a phone) ---------- */

function Avatar({ className = "", size = "h-10 w-10", icon = "person" }: { className?: string; size?: string; icon?: string }) {
  return (
    <span className={`relative inline-flex shrink-0 items-center justify-center rounded-full ${size} ${className}`}>
      <Image src={img(icon)} alt="" width={28} height={28} className="h-1/2 w-1/2" />
    </span>
  );
}

function Stack() {
  return (
    <div className="flex flex-col gap-4 rounded-tray border border-people-edge bg-people-night p-4 md:p-6 lg:hidden">
      <div className="flex items-center gap-2">
        {/* your team */}
        <div className="flex shrink-0 flex-col items-center gap-1.5 text-center">
          <p className={`text-[0.6875rem] leading-[0.9375rem] ${eyebrow}`}>Your team</p>
          <div className="flex">
            <Avatar className="border-2 border-people-night bg-people-avatar-a" />
            <Avatar className="-ml-3 border-2 border-people-night bg-people-avatar-b" />
          </div>
          <p className="max-w-24 font-sans text-[0.75rem] leading-4 text-white/60">You set the direction.</p>
        </div>

        {/* you talk to */}
        <div aria-hidden className="flex min-w-0 flex-1 flex-col items-center gap-1">
          <p className="font-sans text-[0.6875rem] leading-4 text-white/55">you talk to</p>
          <span className="w-full border-t border-dashed border-pyramid-ice/70" />
        </div>

        {/* success lead */}
        <div className="flex shrink-0 flex-col items-center gap-1.5 text-center">
          <span className="relative">
            <Avatar
              size="h-16 w-16"
              icon="person-lead"
              className="border-2 border-accent-water bg-people-lead drop-shadow-[0_0_1.125rem_rgba(11,122,252,0.5)]"
            />
            <Image
              src={img("stadium-mark")}
              alt=""
              width={11}
              height={19}
              className="absolute -bottom-1 -right-2 box-content h-[1.125rem] w-auto rounded-full bg-white px-[0.4rem] py-[0.3rem]"
            />
          </span>
          <p className="font-sans text-[0.8125rem] font-semibold leading-[1.125rem] text-white">Your success lead</p>
          <p className="max-w-28 font-sans text-[0.75rem] leading-4 text-white/55">One point of contact, kickoff to QBR.</p>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <p className={`text-center text-[0.6875rem] leading-[0.9375rem] ${eyebrow}`}>Backed by specialists</p>
        <ul className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {SPECIALISTS.map((s) => (
            <li key={s.label} className="flex items-center gap-2 rounded-xl bg-white/[0.04] p-1.5">
              <span className="relative shrink-0">
                <Avatar className="bg-people-avatar" size="h-8 w-8" />
                <span className="absolute -bottom-0.5 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white">
                  <Image src={img(`badge-${s.badge}`)} alt="" width={13} height={13} className="h-2.5 w-2.5" />
                </span>
              </span>
              <span className="font-sans text-[0.75rem] font-semibold leading-4 text-white/90">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="flex items-center gap-3 rounded-3xl border border-people-glow-line bg-people-glow-fill px-4 py-3 font-sans text-[0.875rem] leading-5 shadow-people-glow">
        <span className="relative flex size-[1.875rem] shrink-0 items-center justify-center rounded-full bg-white">
          <Image src={img("stadium-mark")} alt="" width={11} height={19} className="h-[1.1456rem] w-auto" />
        </span>
        <span>
          <span className="text-white/75">A full team of specialists backing you up. </span>
          <span className="font-bold text-white">For less than the cost of one hire.</span>
        </span>
      </p>
    </div>
  );
}

export function PeopleDiagram() {
  return (
    <div className="pointer-events-auto max-lg:min-h-0 max-lg:overflow-y-auto">
      <Stage />
      <Stack />
    </div>
  );
}
