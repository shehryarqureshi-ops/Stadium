"use client";

/* /integrations/security hero visual — "Protection at every stage · track +
   monitoring" (Figma n9SjmDjzB1PeZAYJ5w43fr 5443:23432, visual frame = the
   580 × 283 graphic cluster, flush right; hero-visual-design v2.5, animated).
   Four stage cards on a track (In transit → At rest → In use → Over time) and an
   "Ongoing monitoring" strip with 30 day ticks. Pure function of the frame.

   STAGE UNITS: bare numbers in style objects are stage units, not CSS px (see
   design.md → "Batch 3 hero visuals"). Colours and fonts come from tokens.

   TIMELINE (30 fps)
     0 – 96     INTRO: the four cards spring in left → right, the chevrons between
                them draw, each check-circle stroke redraws, the monitoring strip
                lands, the "All systems normal" chip pops, the 30 ticks grow in
                sequence. Frame 96 = the Figma frame (also the reduced-motion still).
     96 – 396   LOOP: a shield rides the track and lights each stage card in turn
                (lift + check pulse); then a scanner sweeps the tick bar and the
                ticks brighten as it passes. Everything is at its rest pose at both
                loop ends. Cards float on whole-cycle sines (±1.5–2).

   NO CROP: nothing leaves 0 … STAGE_W (the shield travels inside the gaps). */

import { useCurrentFrame } from "remotion";

import { IN_OUT, INTRO, LIN, SHADOW, SceneHost, bell, bob, capsText, pop, seg, win } from "./shared";

export const STAGE_W = 580;
export const STAGE_H = 283;

/* ───────────── content / geometry (from the Figma frame) ───────────── */

const CARD_W = 127;
const CARD_H = 156;
const PITCH = 151;
const DOTS = 30;
const TICK_X = 327; // card-relative x of tick 1 (the card starts at x = 0)
const TICK_PITCH = 8;
const MON_Y = 170;
const ODD_TICK = 11; // "day 12" is the short grey tick

type IconName = "lock" | "database" | "users" | "file";

const STAGES: { label: string; icon: IconName; title: string; sub: string }[] = [
  { label: "In transit", icon: "lock", title: "Encrypted in transit", sub: "On every connection" },
  { label: "At rest", icon: "database", title: "Encrypted at rest", sub: "Stored data protected" },
  { label: "In use", icon: "users", title: "Role-based access", sub: "Least privilege" },
  { label: "Over time", icon: "file", title: "Audit logs", sub: "Every action recorded" },
];

/* ───────────── icons (feather paths, 24 viewBox, stroke 2) ───────────── */

function Icon({
  size,
  className,
  children,
  style,
}: {
  size: number;
  className: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ display: "block", flexShrink: 0, ...style }}
    >
      {children}
    </svg>
  );
}

function StageIcon({ name }: { name: IconName }) {
  const c = "stroke-grey-800";
  switch (name) {
    case "lock":
      return (
        <Icon size={20} className={c}>
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </Icon>
      );
    case "database":
      return (
        <Icon size={20} className={c}>
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </Icon>
      );
    case "users":
      return (
        <Icon size={20} className={c}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </Icon>
      );
    case "file":
      return (
        <Icon size={20} className={c}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M16 13H8" />
          <path d="M16 17H8" />
          <path d="M10 9H8" />
        </Icon>
      );
  }
}

function CheckCircle({ draw, pulse }: { draw: number; pulse: number }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "block", flexShrink: 0, transform: `scale(${1 + 0.35 * pulse})` }}
    >
      <path
        d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
        className="stroke-canvas-check"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - Math.min(1, draw * 1.4)}
      />
      <path
        d="M22 4 12 14.01l-3-3"
        className="stroke-canvas-check"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - draw}
      />
    </svg>
  );
}

/* ───────────── stage card ───────────── */

function StageCard({
  i,
  f,
  lift,
  pulse,
  bobY,
}: {
  i: number;
  f: number;
  lift: number;
  pulse: number;
  bobY: number;
}) {
  const S = STAGES[i];
  const delay = i * 8;
  const p = pop(f, delay);
  return (
    <div
      className="bg-white"
      style={{
        position: "absolute",
        left: i * PITCH,
        top: 0,
        width: CARD_W,
        height: CARD_H,
        boxSizing: "border-box",
        padding: 14,
        borderRadius: 16,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        opacity: seg(f, delay, delay + 8, LIN),
        transform: `translateY(${(1 - p) * 28 - lift * 4 + bobY}px) scale(${0.94 + 0.06 * p})`,
        boxShadow: SHADOW(lift),
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 14 }}>
        <p className="text-canvas-muted" style={capsText}>
          {S.label}
        </p>
        <CheckCircle draw={seg(f, delay + 10, delay + 26, LIN)} pulse={pulse} />
      </div>
      <div
        className="bg-chip-surface"
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transform: `scale(${1 + 0.08 * lift})`,
        }}
      >
        <StageIcon name={S.icon} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <p className="text-grey-800" style={{ fontSize: 13, lineHeight: "17px", fontWeight: 600 }}>
          {S.title}
        </p>
        <p className="text-canvas-muted" style={{ fontSize: 10, lineHeight: "13px" }}>
          {S.sub}
        </p>
      </div>
    </div>
  );
}

/* ───────────── scene ───────────── */

export function SecurityTrackScene() {
  const f = useCurrentFrame();
  const lt = Math.max(0, f - INTRO);

  const bobCards = [bob(f, 1, -1.5), bob(f, 2, 2), bob(f, 1, 2), bob(f, 2, -1.5)];
  const bobMon = bob(f, 1, 1.5);

  /* loop part 1: the shield visits each stage card in turn */
  const START = [10, 52, 94, 136] as const;
  const lift = [0, 0, 0, 0];
  const pulse = [0, 0, 0, 0];
  START.forEach((s, k) => {
    lift[k] = win(lt, s, s + 10, s + 22, s + 34);
    pulse[k] = bell(lt, s + 4, s + 24);
  });
  /* shield position along the track (centred in each 24-wide gap) */
  let shield = { x: 0, o: 0 };
  [0, 1, 2].forEach((k) => {
    const a = START[k] + 20;
    const t = seg(lt, a, a + 22, IN_OUT);
    const o = seg(lt, a, a + 4, LIN) * (1 - seg(lt, a + 18, a + 22, LIN));
    if (o > 0) shield = { x: 127 + PITCH * k + 12 + (t - 0.5) * 6, o };
  });

  /* loop part 2: scanner sweep across the tick bar */
  const sweepO = win(lt, 176, 184, 276, 284);
  const sweepX = 322 + 251 * seg(lt, 178, 282, IN_OUT);
  const chipPulse = bell(lt, 232, 262);

  /* intro: strip + chip */
  const monP = pop(f, 34);
  const chipP = pop(f, 48);

  return (
    <div className="font-sans text-grey-800" style={{ position: "relative", width: STAGE_W, height: STAGE_H }}>
      {/* track connectors + chevrons (behind the cards) */}
      <svg
        width={STAGE_W}
        height={STAGE_H}
        viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
        style={{ position: "absolute", left: 0, top: 0, overflow: "visible", display: "block" }}
      >
        {[0, 1, 2].map((k) => {
          const x0 = 127 + PITCH * k;
          const draw = seg(f, 14 + k * 8, 30 + k * 8);
          return (
            <g key={k}>
              <path
                d={`M ${x0} 26 L ${x0 + 24} 26`}
                fill="none"
                className="stroke-grey-300"
                strokeWidth={1.75}
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - draw}
              />
              <path
                d={`M ${x0 + 10.5} 23 L ${x0 + 13.5} 26 L ${x0 + 10.5} 29`}
                fill="none"
                stroke="#fff"
                strokeWidth={1}
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - seg(f, 22 + k * 8, 34 + k * 8)}
              />
            </g>
          );
        })}
      </svg>

      {STAGES.map((_, i) => (
        <StageCard key={i} i={i} f={f} lift={lift[i]} pulse={pulse[i]} bobY={bobCards[i]} />
      ))}

      {/* the shield riding the track */}
      {shield.o > 0 && (
        <div
          className="bg-grey-800"
          style={{
            position: "absolute",
            left: shield.x - 9,
            top: 26 - 9,
            width: 18,
            height: 18,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: shield.o,
            boxShadow: "0px 2px 8px 0px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Icon size={10} className="stroke-white">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </Icon>
        </div>
      )}

      {/* card · security monitoring */}
      <div
        className="bg-white"
        style={{
          position: "absolute",
          left: 0,
          top: MON_Y,
          width: STAGE_W,
          height: 112,
          boxSizing: "border-box",
          borderRadius: 16,
          opacity: seg(f, 34, 42, LIN),
          transform: `translateY(${(1 - monP) * 28 + bobMon}px) scale(${0.96 + 0.04 * monP})`,
          boxShadow: SHADOW(0),
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 16,
            top: 16,
            width: 548,
            height: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Icon size={14} className="stroke-grey-800">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </Icon>
            <p className="text-grey-800" style={{ ...capsText, color: "#4f5052" }}>
              Ongoing monitoring
            </p>
          </div>
          <div
            className="bg-canvas-green"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "3px 8px",
              borderRadius: 100,
              opacity: seg(f, 48, 54, LIN),
              transform: `scale(${(0.8 + 0.2 * chipP) * (1 + 0.05 * chipPulse)})`,
              transformOrigin: "right center",
            }}
          >
            <Icon size={12} className="stroke-canvas-check">
              <path
                d="M20 6 9 17l-5-5"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - seg(f, 54, 66, LIN)}
              />
            </Icon>
            <p className="text-grey-800" style={{ fontSize: 11, lineHeight: "14px", fontWeight: 600, whiteSpace: "nowrap" }}>
              All systems normal
            </p>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 16,
            top: 50,
            width: 548,
            height: 46,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <div style={{ alignSelf: "flex-start", display: "flex", flexDirection: "column", gap: 2 }}>
            <p
              className="font-display text-grey-800"
              style={{ fontSize: 26, lineHeight: "30px", whiteSpace: "nowrap", opacity: seg(f, 40, 52, LIN) }}
            >
              No incidents
            </p>
            <p
              className="text-swag-grey"
              style={{ fontSize: 11, lineHeight: "14px", whiteSpace: "nowrap", opacity: seg(f, 44, 56, LIN) }}
            >
              in the last 30 days, alerts reviewed daily
            </p>
          </div>
        </div>

        {/* 30 day ticks */}
        {Array.from({ length: DOTS }, (_, k) => {
          const odd = k === ODD_TICK;
          const h = odd ? 18 : 30;
          const grow = seg(f, 56 + k, 66 + k);
          const cx = TICK_X + TICK_PITCH * k + 2.5;
          const near = Math.max(0, 1 - Math.abs(cx - sweepX) / 30) * sweepO;
          return (
            <div
              key={k}
              className={odd ? "bg-grey-300" : "bg-grey-800"}
              style={{
                position: "absolute",
                left: TICK_X + TICK_PITCH * k,
                top: 236 - MON_Y + (30 - h),
                width: 5,
                height: h,
                borderRadius: 2,
                transformOrigin: "50% 100%",
                transform: `scaleY(${grow * (1 + 0.1 * near)})`,
                overflow: "hidden",
              }}
            >
              <div className="bg-canvas-check" style={{ position: "absolute", inset: 0, opacity: near }} />
            </div>
          );
        })}
        {sweepO > 0 && (
          <div
            className="bg-canvas-check"
            style={{
              position: "absolute",
              left: sweepX - 1,
              top: 236 - MON_Y - 4,
              width: 2,
              height: 38,
              borderRadius: 1,
              opacity: sweepO * 0.7,
            }}
          />
        )}
      </div>
    </div>
  );
}

export default function SecurityTrack() {
  return <SceneHost scene={SecurityTrackScene} width={STAGE_W} height={STAGE_H} />;
}
