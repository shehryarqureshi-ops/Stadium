"use client";

/* /impact/finance hero visual — "Budget bar" (Figma n9SjmDjzB1PeZAYJ5w43fr
   5434:22890, visual frame = the 580 × 437 graphic cluster itself, flush to the
   Talk-to-sales edge and top-aligned with the copy; hero-visual-design v2.5).
   One Finance card holds the $480,000 budget as a proportional split bar; four
   team columns hang from it, each with its slice, how much is spent, what it
   saved and who runs it; a strip underneath says teams save $15,000 on average.
   Every element is a pure function of the current frame, so the Player can play,
   pause and seek it.

   STAGE UNITS. Authored on a fixed 580 × 437 stage that the Remotion Player scales
   to its container. Bare numbers in the style objects are stage units, NOT CSS px
   (see design.md → "/impact/finance hero"). Colours and fonts come from tokens.

   TIMELINE (30 fps)
     0 – 96     INTRO: the Finance card springs in, $480,000 counts up, the split bar
                grows segment by segment, four connectors draw down, the team columns
                land in turn (their amounts, spent bars and savings count up) and the
                average-saving strip closes with $15,000. Frame 96 is exactly the Figma
                frame (also the prefers-reduced-motion still).
     96 – 396   LOOP (300 frames): the budget is allocated team by team. A packet leaves
                the team's segment, runs down its connector, the column lifts and its
                amount, saving and swatch pulse; after the fourth team the strip lifts
                and $15,000 pulses. Every value is at its Figma rest pose at both loop
                ends (seamless 396 → 96). Underneath, the Finance card, the four columns
                and the strip float on whole-cycle sines (±1–2).

   NO CROP. overflowVisible on the Player; nothing leaves 0 … STAGE_W. */

import Image from "next/image";
import { Easing, interpolate, spring, useCurrentFrame } from "remotion";

import avatarAlex from "@/public/impact/finance/hero/avatar-alex.png";
import avatarArun from "@/public/impact/finance/hero/avatar-arun.png";
import avatarGrace from "@/public/impact/finance/hero/avatar-grace.png";
import avatarJordan from "@/public/impact/finance/hero/avatar-jordan.png";
import avatarMaya from "@/public/impact/finance/hero/avatar-maya.png";

export const STAGE_W = 580;
export const STAGE_H = 437;
export const FPS = 30;
export const INTRO = 96;
const LOOP = 300;
export const DURATION = INTRO + LOOP;

/* ───────────── motion helpers ───────────── */

const OUT = Easing.bezier(0.22, 1, 0.36, 1);
const IN_OUT = Easing.inOut(Easing.cubic);
const LIN = (x: number) => x;

/** 0 → 1 between two frames, clamped. */
const seg = (f: number, from: number, to: number, easing: (t: number) => number = OUT) =>
  interpolate(f, [from, to], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing });

/** Spring entrance, 0 → ~1 (slight overshoot). */
const pop = (f: number, delay: number) =>
  spring({ frame: f - delay, fps: FPS, config: { damping: 15, stiffness: 150, mass: 0.7 } });

/** Rises a→b, holds, falls c→d. */
const win = (t: number, a: number, b: number, c: number, d: number) =>
  seg(t, a, b, IN_OUT) - seg(t, c, d, IN_OUT);

/** 0 → 1 → 0 bell over [a, b]. */
const bell = (t: number, a: number, b: number) => Math.sin(Math.PI * seg(t, a, b, LIN));

/** Whole-cycle float; ramps in with the intro's last frames, 0 at frame 96 and 396. */
const bob = (f: number, cycles: number, amp: number) =>
  seg(f, 56, INTRO, LIN) * Math.sin((2 * Math.PI * cycles * (f - INTRO)) / LOOP) * amp;

/* ───────────── geometry (from the Figma frame) ───────────── */

const SLAB_H = 136;
const COL_Y = 182;
const COL_W = 136;
const COL_H = 171;
const COL_PITCH = 148;
const STRIP_Y = 367;
const STRIP_H = 70;
/** Segment centres on the split bar (stage x) and the column centres they feed. */
const FROM_X = [65.55, 216.5, 361.5, 476.75] as const;
const TO_X = [68, 216, 364, 512] as const;
/** Split-bar segments: left, width (Figma), shade token. */
const SEGS = [
  { left: 0, w: 131.1, cls: "bg-grey-800" },
  { left: 133.1, w: 166.8, cls: "bg-grey-600" },
  { left: 301.9, w: 119.2, cls: "bg-canvas-muted" },
  { left: 423.1, w: 107.3, cls: "bg-grey-300" },
  { left: 532.3, w: 47.7, cls: "bg-grey-200" },
] as const;

const SHADOW = (lift: number) =>
  `0px ${8 + 4 * lift}px ${24 + 6 * lift}px 0px rgba(0, 0, 0, ${0.2 + 0.06 * lift})`;

/* ───────────── content ───────────── */

const TEAMS = [
  { name: "HR", pill: "bg-canvas-lilac", swatch: "bg-grey-800", amt: 110, pct: 62, saved: 12.4, avatar: avatarGrace, lead: "Grace Adeyemi" },
  { name: "Marketing", pill: "bg-canvas-pink", swatch: "bg-grey-600", amt: 140, pct: 78, saved: 17.8, avatar: avatarMaya, lead: "Maya Chen" },
  { name: "Sales", pill: "bg-canvas-blue", swatch: "bg-canvas-muted", amt: 100, pct: 41, saved: 14.1, avatar: avatarAlex, lead: "Alex Morgan" },
  { name: "CX", pill: "bg-canvas-green", swatch: "bg-grey-300", amt: 90, pct: 55, saved: 15.7, avatar: avatarJordan, lead: "Jordan Lee" },
] as const;

/** Loop: team k starts at S[k] (loop frames). The strip takes its turn after the fourth. */
const S = [14, 64, 114, 164] as const;
const STRIP_TURN = 220;

const capsText = {
  fontSize: 10,
  lineHeight: "13px",
  letterSpacing: 1,
  fontWeight: 700,
  textTransform: "uppercase" as const,
  whiteSpace: "nowrap" as const,
};

/* ───────────── small parts ───────────── */

function TrendDown({ size, scale = 1 }: { size: number; scale?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ display: "block", flexShrink: 0, transform: `scale(${scale})` }}
    >
      <path
        d="M23 18 13.5 8.5l-5 5L1 6M17 18h6v-6"
        className="stroke-canvas-check"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Avatar({ src, size }: { src: typeof avatarArun; size: number }) {
  return (
    <Image
      src={src}
      alt=""
      sizes="3.5rem"
      quality={90}
      style={{ width: size, height: size, borderRadius: "50%", display: "block", maxWidth: "none", flexShrink: 0 }}
    />
  );
}

function TeamColumn({
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
  const t = TEAMS[i];
  const delay = 48 + i * 5;
  const p = pop(f, delay);
  const count = seg(f, delay + 6, delay + 28);
  const amount = Math.round(t.amt * count);
  const saved = (t.saved * count).toFixed(1);
  const spent = seg(f, delay + 8, delay + 30);
  return (
    <div
      className="bg-white"
      style={{
        position: "absolute",
        left: i * COL_PITCH,
        top: COL_Y,
        width: COL_W,
        height: COL_H,
        boxSizing: "border-box",
        padding: 12,
        borderRadius: 12,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        opacity: seg(f, delay, delay + 8, LIN),
        transform: `translateY(${(1 - p) * 28 - lift * 4 + bobY}px) scale(${0.94 + 0.06 * p})`,
        boxShadow: SHADOW(lift),
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div
          className={t.swatch}
          style={{ width: 10, height: 10, borderRadius: 3, flexShrink: 0, transform: `scale(${1 + 0.5 * pulse})` }}
        />
        <div className={t.pill} style={{ padding: "3px 8px", borderRadius: 100 }}>
          <p className="text-grey-800" style={capsText}>
            {t.name}
          </p>
        </div>
      </div>
      <p
        className="font-display text-grey-800"
        style={{
          fontSize: 26,
          lineHeight: "30px",
          whiteSpace: "nowrap",
          fontVariantNumeric: "tabular-nums",
          transform: `scale(${1 + 0.06 * pulse})`,
          transformOrigin: "0% 50%",
        }}
      >
        ${amount}K
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div className="bg-grey-200" style={{ height: 6, borderRadius: 3, overflow: "hidden" }}>
          <div
            className="bg-grey-800"
            style={{ width: Math.round(1.12 * t.pct * spent), height: 6, borderRadius: 3 }}
          />
        </div>
        <p
          className="text-canvas-muted"
          style={{ fontSize: 10, lineHeight: "13px", whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" }}
        >
          {Math.round(t.pct * spent)}% spent
        </p>
      </div>
      <div className="bg-grey-200" style={{ height: 1, flexShrink: 0 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 5, height: 14 }}>
        <TrendDown size={12} scale={1 + 0.3 * pulse} />
        <p
          className="text-canvas-check"
          style={{
            fontSize: 11,
            lineHeight: "14px",
            fontWeight: 600,
            whiteSpace: "nowrap",
            fontVariantNumeric: "tabular-nums",
            transform: `scale(${1 + 0.06 * pulse})`,
            transformOrigin: "0% 50%",
          }}
        >
          Saved ${saved}K
        </p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, height: 20 }}>
        <Avatar src={t.avatar} size={20} />
        <p className="text-swag-grey" style={{ fontSize: 10, lineHeight: "13px", whiteSpace: "nowrap" }}>
          {t.lead}
        </p>
      </div>
    </div>
  );
}

/* ───────────── connectors ───────────── */

/** Cubic bezier point at t for the segment → column connector. */
function curvePoint(k: number, y1: number, y2: number, t: number) {
  const x1 = FROM_X[k];
  const x2 = TO_X[k];
  const m = (y2 - y1) / 2;
  const u = 1 - t;
  return {
    x: u * u * u * x1 + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t * t * t * x2,
    y: u * u * u * y1 + 3 * u * u * t * (y1 + m) + 3 * u * t * t * (y2 - m) + t * t * t * y2,
  };
}

function Node({ x, y, scale }: { x: number; y: number; scale: number }) {
  return (
    <circle
      cx={x}
      cy={y}
      r={4.5 * scale}
      strokeWidth={1.5}
      className="fill-white stroke-grey-800"
      style={{ display: scale > 0 ? undefined : "none" }}
    />
  );
}

/* ───────────── scene ───────────── */

export function FinanceBudgetBarScene() {
  const f = useCurrentFrame();
  const lt = Math.max(0, f - INTRO);

  /* floats (0 at both loop ends) */
  const bobSlab = bob(f, 1, -1);
  const bobCol = [bob(f, 1, -2), bob(f, 2, 1.5), bob(f, 3, -1.5), bob(f, 2, -2)];
  const bobStrip = bob(f, 2, 1.5);

  /* loop: team by team */
  const colLift = [0, 0, 0, 0];
  const colPulse = [0, 0, 0, 0];
  const segGlow = [0, 0, 0, 0];
  const lineGlow = [0, 0, 0, 0];
  const lineDraw = [0, 0, 0, 0];
  const run = [
    { o: 0, t: 0 },
    { o: 0, t: 0 },
    { o: 0, t: 0 },
    { o: 0, t: 0 },
  ];
  S.forEach((s, k) => {
    colLift[k] = win(lt, s + 18, s + 28, s + 38, s + 48);
    colPulse[k] = bell(lt, s + 20, s + 44);
    segGlow[k] = bell(lt, s, s + 24);
    lineGlow[k] = win(lt, s, s + 2, s + 26, s + 34);
    lineDraw[k] = seg(lt, s, s + 22, IN_OUT);
    run[k] = {
      t: seg(lt, s, s + 22, IN_OUT),
      o: seg(lt, s, s + 2, LIN) * (1 - seg(lt, s + 20, s + 22, LIN)),
    };
  });
  const stripLift = win(lt, STRIP_TURN, STRIP_TURN + 10, STRIP_TURN + 38, STRIP_TURN + 48);
  const stripPulse = bell(lt, STRIP_TURN + 4, STRIP_TURN + 44);

  /* intro */
  const slabP = pop(f, 0);
  const budget = Math.round(480000 * seg(f, 10, 56));
  const stripP = pop(f, 70);
  const average = Math.round(15000 * seg(f, 72, 94));

  const slabBottom = SLAB_H + bobSlab;

  return (
    <div className="font-sans text-grey-800" style={{ position: "relative", width: STAGE_W, height: STAGE_H }}>
      {/* connectors + nodes + packets (behind the cards) */}
      <svg
        width={STAGE_W}
        height={STAGE_H}
        viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
        style={{ position: "absolute", left: 0, top: 0, overflow: "visible", display: "block" }}
      >
        {TEAMS.map((_, k) => {
          const y2 = COL_Y + bobCol[k];
          const m = (y2 - slabBottom) / 2;
          const d = `M ${FROM_X[k]} ${slabBottom} C ${FROM_X[k]} ${slabBottom + m} ${TO_X[k]} ${y2 - m} ${TO_X[k]} ${y2}`;
          const draw = seg(f, 44 + k * 5, 60 + k * 5);
          return (
            <g key={k}>
              <path
                d={d}
                fill="none"
                className="stroke-grey-300"
                strokeWidth={1.75}
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - draw}
              />
              <path
                d={d}
                fill="none"
                stroke="#fff"
                strokeWidth={1.75}
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - lineDraw[k]}
                opacity={Math.max(0, Math.min(1, lineGlow[k])) * 0.9}
              />
              <Node x={FROM_X[k]} y={slabBottom} scale={Math.min(1, pop(f, 44 + k * 5))} />
              <Node x={TO_X[k]} y={y2} scale={Math.min(1, pop(f, 58 + k * 5))} />
            </g>
          );
        })}
        {run.map((r, k) => {
          if (r.o <= 0) return null;
          const pt = curvePoint(k, slabBottom, COL_Y + bobCol[k], r.t);
          return (
            <circle
              key={k}
              cx={pt.x}
              cy={pt.y}
              r={5}
              strokeWidth={1.5}
              opacity={r.o}
              className="fill-white stroke-grey-800"
              style={{ filter: "drop-shadow(0px 0px 6px rgba(255, 255, 255, 0.75))" }}
            />
          );
        })}
      </svg>

      {/* card · Finance budget */}
      <div
        className="bg-white"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: STAGE_W,
          height: SLAB_H,
          borderRadius: 16,
          overflow: "hidden",
          opacity: seg(f, 0, 8, LIN),
          transform: `translateY(${(1 - slabP) * 28 + bobSlab}px) scale(${0.96 + 0.04 * slabP})`,
          boxShadow: SHADOW(0),
        }}
      >
        <div
          style={{
            boxSizing: "border-box",
            height: 124,
            padding: 16,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 36 }}>
            <div
              className="bg-chip-surface"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "4px 12px 4px 4px",
                borderRadius: 100,
                whiteSpace: "nowrap",
              }}
            >
              <Avatar src={avatarArun} size={28} />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p className="text-grey-800" style={{ fontSize: 12, lineHeight: "15px", fontWeight: 600 }}>
                  Arun Mehta
                </p>
                <p className="text-swag-grey" style={{ fontSize: 10, lineHeight: "12px" }}>
                  Finance
                </p>
              </div>
            </div>
            <div className="bg-chip-surface" style={{ padding: "4px 10px", borderRadius: 100 }}>
              <p className="text-grey-800" style={{ fontSize: 11, lineHeight: "14px", fontWeight: 600, whiteSpace: "nowrap" }}>
                Q4 2026
              </p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", height: 42 }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 10 }}>
              <p
                className="font-display text-grey-800"
                style={{ fontSize: 38, lineHeight: "42px", whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" }}
              >
                ${budget.toLocaleString("en-US")}
              </p>
              <div style={{ display: "flex", flexDirection: "column", paddingBottom: 4, whiteSpace: "nowrap" }}>
                <p className="text-grey-600" style={{ fontSize: 11, lineHeight: "14px" }}>
                  engagement budget
                </p>
                <p className="text-canvas-muted" style={{ fontSize: 10, lineHeight: "13px" }}>
                  set once, spent by every team
                </p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", paddingBottom: 4 }}>
              <p className="text-canvas-muted" style={capsText}>
                Finance reserve
              </p>
              <p className="text-grey-800" style={{ fontSize: 12, lineHeight: "16px", fontWeight: 600 }}>
                $40K
              </p>
            </div>
          </div>
        </div>
        {/* bar · budget split — flush with the card's bottom edge */}
        <div style={{ position: "absolute", left: 0, top: 124, width: STAGE_W, height: 12 }}>
          {SEGS.map((s, i) => {
            const glow = i < 4 ? segGlow[i] : 0;
            return (
              <div
                key={i}
                className={s.cls}
                style={{
                  position: "absolute",
                  left: s.left,
                  top: 0,
                  width: s.w,
                  height: 12,
                  transformOrigin: "0% 50%",
                  transform: `scaleX(${seg(f, 18 + i * 6, 38 + i * 6)})`,
                  overflow: "hidden",
                }}
              >
                <div style={{ width: "100%", height: "100%", background: `rgba(255, 255, 255, ${0.3 * glow})` }} />
              </div>
            );
          })}
        </div>
      </div>

      {/* team columns */}
      {TEAMS.map((_, i) => (
        <TeamColumn key={i} i={i} f={f} lift={colLift[i]} pulse={colPulse[i]} bobY={bobCol[i]} />
      ))}

      {/* strip · average saving */}
      <div
        className="bg-white"
        style={{
          position: "absolute",
          left: 0,
          top: STRIP_Y,
          width: STAGE_W,
          height: STRIP_H,
          boxSizing: "border-box",
          padding: "12px 16px",
          borderRadius: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          opacity: seg(f, 70, 78, LIN),
          transform: `translateY(${(1 - stripP) * 24 - stripLift * 4 + bobStrip}px) scale(${0.96 + 0.04 * stripP})`,
          boxShadow: SHADOW(stripLift),
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            className="bg-canvas-green"
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${1 + 0.12 * stripPulse})`,
            }}
          >
            <TrendDown size={18} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", whiteSpace: "nowrap" }}>
            <p className="text-grey-600" style={{ fontSize: 11, lineHeight: "14px" }}>
              Teams save on average with Stadium
            </p>
            <p
              className="font-display text-grey-800"
              style={{
                fontSize: 28,
                lineHeight: "32px",
                fontVariantNumeric: "tabular-nums",
                transform: `scale(${1 + 0.05 * stripPulse})`,
                transformOrigin: "0% 50%",
              }}
            >
              ${average.toLocaleString("en-US")}
            </p>
          </div>
        </div>
        <div className="bg-chip-surface" style={{ padding: "6px 12px", borderRadius: 100 }}>
          <p className="text-grey-800" style={{ fontSize: 11, lineHeight: "14px", fontWeight: 600, whiteSpace: "nowrap" }}>
            Average across 4 teams
          </p>
        </div>
      </div>
    </div>
  );
}
