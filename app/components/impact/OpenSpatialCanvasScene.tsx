"use client";

/* /impact hero visual — "Open Spatial Canvas" (Figma n9SjmDjzB1PeZAYJ5w43fr
   5152:23496, 647 × 724). Built as a Remotion composition: every element is a
   pure function of the current frame, so the Player can play, pause and seek it.

   STAGE UNITS. The scene is authored on a fixed 647 × 724 stage and the Remotion
   Player scales the whole stage to its container (like an exported image). So
   the bare numbers in the style objects below are stage units, NOT CSS px — the
   one place the "no hardcoded px" rule intentionally doesn't apply (see
   design.md → "/impact hero"). Colours and fonts still come from tokens.

   TIMELINE (30 fps)
     0 – 96     INTRO: cards spring in, counters run, cursors fly in, Alex selects.
                Frame 96 is exactly the Figma frame → it is also the still used
                for prefers-reduced-motion.
     96 – 396   LOOP (300 frames): every moving value starts and ends at its
                Figma rest pose, so the Player can jump 396 → 96 without a seam
                (the intro only ever plays once). Maya, Grace and Arun visit a
                card each (it lifts while they hover), Alex drags "Closed-won
                gifts", and the "Kit delivered" toast leaves and returns.
                Underneath, nothing ever sits still: each card floats on its own
                slow whole-cycle sine and the cursors keep drifting, ramped in
                during the last frames of the intro.

   NO CROP. The Player runs with overflowVisible (shadows and lifted cards are
   never clipped at the stage edge) and every moving thing is kept inside
   0 … STAGE_W with a margin — including cursor fly-ins and drift. */

import Image from "next/image";
import { Easing, interpolate, spring, useCurrentFrame } from "remotion";

import avatarAlex from "@/public/impact/overview/hero/avatar-alex.png";
import avatarAlexRing from "@/public/impact/overview/hero/avatar-alex-ring.png";
import avatarArun from "@/public/impact/overview/hero/avatar-arun.png";
import avatarArunRing from "@/public/impact/overview/hero/avatar-arun-ring.png";
import avatarGrace from "@/public/impact/overview/hero/avatar-grace.png";
import avatarGraceRing from "@/public/impact/overview/hero/avatar-grace-ring.png";
import avatarMaya from "@/public/impact/overview/hero/avatar-maya.png";
import avatarMayaRing from "@/public/impact/overview/hero/avatar-maya-ring.png";
import thumbAnniversary from "@/public/impact/overview/hero/thumb-anniversary.jpg";
import thumbGift from "@/public/impact/overview/hero/thumb-gift.jpg";
import thumbHoodie from "@/public/impact/overview/hero/thumb-hoodie.jpg";

export const STAGE_W = 647;
export const STAGE_H = 724;
export const FPS = 30;
export const INTRO = 96;
const LOOP = 300;
export const DURATION = INTRO + LOOP;

/* ───────────── motion helpers ───────────── */

const OUT = Easing.bezier(0.22, 1, 0.36, 1);
const IN_OUT = Easing.inOut(Easing.cubic);

/** 0 → 1 between two frames, clamped. */
const seg = (f: number, from: number, to: number, easing: (t: number) => number = OUT) =>
  interpolate(f, [from, to], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });

/** Spring entrance, 0 → ~1 (slight overshoot). */
const pop = (f: number, delay: number) =>
  spring({ frame: f - delay, fps: FPS, config: { damping: 15, stiffness: 150, mass: 0.7 } });

/** Rises a→b, holds, falls c→d. */
const win = (t: number, a: number, b: number, c: number, d: number) =>
  seg(t, a, b, IN_OUT) - seg(t, c, d, IN_OUT);

type Key = readonly [t: number, x: number, y: number];

/** Eased path through [t, x, y] keys (first key at t=0). */
function track(t: number, keys: readonly Key[]) {
  for (let i = 1; i < keys.length; i++) {
    if (t <= keys[i][0]) {
      const k = IN_OUT(seg(t, keys[i - 1][0], keys[i][0], (x) => x));
      return {
        x: keys[i - 1][1] + (keys[i][1] - keys[i - 1][1]) * k,
        y: keys[i - 1][2] + (keys[i][2] - keys[i - 1][2]) * k,
      };
    }
  }
  const last = keys[keys.length - 1];
  return { x: last[1], y: last[2] };
}

/** Whole-number sine → 0 at t=0 and t=LOOP, so the idle drift is seamless. */
const drift = (t: number, cycles: number, amp: number) =>
  Math.sin((2 * Math.PI * cycles * t) / LOOP) * amp;

/** Slow vertical float for a resting element; ramps in with the intro's last frames. */
const bob = (f: number, cycles: number, amp: number) =>
  seg(f, 56, INTRO, (x) => x) * Math.sin((2 * Math.PI * cycles * (f - INTRO)) / LOOP) * amp;

const num = (n: number) => Math.round(n).toLocaleString("en-US");

/* ───────────── shared bits ───────────── */

const CARD_RADIUS = 18;
const label = {
  fontWeight: 700,
  textTransform: "uppercase" as const,
  whiteSpace: "nowrap" as const,
};

function Avatar({ src, size = 28 }: { src: typeof avatarMaya; size?: number }) {
  return (
    <Image
      src={src}
      alt=""
      sizes="3.5rem"
      quality={90}
      style={{ width: size, height: size, borderRadius: "50%", display: "block", maxWidth: "none" }}
    />
  );
}

function Thumb({ src, size, radius }: { src: typeof thumbGift; size: number; radius: number }) {
  return (
    <Image
      src={src}
      alt=""
      sizes="7.5rem"
      quality={90}
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        objectFit: "cover",
        display: "block",
        flexShrink: 0,
      }}
    />
  );
}

function Card({
  left,
  top,
  width,
  f,
  delay,
  lift = 0,
  scale = 1,
  bob: bobY = 0,
  className = "bg-white",
  padding,
  gap,
  children,
}: {
  left: number;
  top: number;
  width: number;
  f: number;
  delay: number;
  lift?: number;
  scale?: number;
  bob?: number;
  className?: string;
  padding: number;
  gap?: number;
  children: React.ReactNode;
}) {
  const p = pop(f, delay);
  return (
    <div
      className={className}
      style={{
        position: "absolute",
        left,
        top,
        width,
        padding,
        borderRadius: CARD_RADIUS,
        display: "flex",
        flexDirection: "column",
        gap,
        overflow: "hidden",
        opacity: seg(f, delay, delay + 8, (x) => x),
        transform: `translateY(${(1 - p) * 28 - lift * 5 + bobY}px) scale(${(0.94 + 0.06 * p) * scale})`,
        boxShadow: `0px ${16 + 6 * lift}px ${40 + 8 * lift}px 0px rgba(0, 0, 0, ${0.38 + 0.08 * lift})`,
      }}
    >
      {children}
    </div>
  );
}

function Pointer() {
  return (
    <svg
      width="22.8957"
      height="29.5116"
      viewBox="0 0 22.8957 29.5116"
      fill="none"
      style={{
        position: "absolute",
        left: -4.7,
        top: -3.6,
        overflow: "visible",
        filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.3))",
      }}
    >
      <path
        d="M4.7 3.59442V19.5944L8.9 15.9944L11.7 22.5944L14.3 21.4944L11.5 14.9944H17.1L4.7 3.59442Z"
        fill="#181818"
        stroke="white"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function Cursor({
  x,
  y,
  opacity,
  press = 0,
  pillClass,
  children,
}: {
  x: number;
  y: number;
  opacity: number;
  press?: number;
  pillClass: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ position: "absolute", left: 0, top: 0, opacity, transform: `translate(${x}px, ${y}px)` }}>
      <div
        style={{
          position: "relative",
          width: 12.4,
          height: 19,
          transform: `scale(${1 - 0.14 * press})`,
          transformOrigin: "0 0",
        }}
      >
        <Pointer />
      </div>
      <div
        className={pillClass}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "4px 12px 4px 4px",
          borderRadius: 100,
          boxShadow: "0px 3px 10px 0px rgba(0, 0, 0, 0.28)",
          width: "max-content",
        }}
      >
        {children}
      </div>
    </div>
  );
}

const pillName = { fontSize: 12, lineHeight: "15px", fontWeight: 600, whiteSpace: "nowrap" as const };

/* ───────────── rest poses (Figma) + visit paths ───────────── */

const MAYA_REST = { x: 269, y: 246 };
const GRACE_REST = { x: 483, y: 300 };
const ARUN_REST = { x: 107, y: 566 };

/* Cursors fly in from off-stage during the intro (offset → rest). */
const MAYA_FROM = { x: 60, y: 50 };
const GRACE_FROM = { x: -40, y: -70 };
const ARUN_FROM = { x: -20, y: 60 };

const MAYA_PATH: readonly Key[] = [
  [0, MAYA_REST.x, MAYA_REST.y],
  [50, MAYA_REST.x, MAYA_REST.y],
  [95, 210, 250],
  [135, 210, 250],
  [180, MAYA_REST.x, MAYA_REST.y],
  [LOOP, MAYA_REST.x, MAYA_REST.y],
];
const GRACE_PATH: readonly Key[] = [
  [0, GRACE_REST.x, GRACE_REST.y],
  [110, GRACE_REST.x, GRACE_REST.y],
  [150, 488, 205],
  [185, 488, 205],
  [225, GRACE_REST.x, GRACE_REST.y],
  [LOOP, GRACE_REST.x, GRACE_REST.y],
];
const ARUN_PATH: readonly Key[] = [
  [0, ARUN_REST.x, ARUN_REST.y],
  [170, ARUN_REST.x, ARUN_REST.y],
  [205, 160, 538],
  [240, 160, 538],
  [275, ARUN_REST.x, ARUN_REST.y],
  [LOOP, ARUN_REST.x, ARUN_REST.y],
];
/** Alex drags "Closed-won gifts" (card + selection move together). */
const DRAG_PATH: readonly Key[] = [
  [0, 0, 0],
  [20, 0, 0],
  [65, 14, -16],
  [110, 14, -16],
  [155, 0, 0],
  [LOOP, 0, 0],
];

/** "Kit delivered" toast presence, 0 → 1. Visible at the loop seam, leaves, returns. */
function toastPresence(f: number) {
  if (f < INTRO) return seg(f, 62, 82);
  const t = f - INTRO;
  if (t < 70) return 1;
  if (t < 86) return 1 - seg(t, 70, 86, IN_OUT);
  if (t < 200) return 0;
  if (t < 218) return seg(t, 200, 218);
  return 1;
}

/* ───────────── scene ───────────── */

export function OpenSpatialCanvasScene() {
  const f = useCurrentFrame();
  const lt = Math.max(0, f - INTRO);

  /* intro counters */
  const fill = seg(f, 22, 74);
  const recipients = Math.round(1200 * seg(f, 22, 74));
  const budget = 186400 * seg(f, 36, 80);
  const segGrow = (delay: number) => seg(f, 42 + delay, 72 + delay);

  /* loop-driven state */
  const maya = track(lt, MAYA_PATH);
  const grace = track(lt, GRACE_PATH);
  const arun = track(lt, ARUN_PATH);
  const drag = track(lt, DRAG_PATH);
  const summitLift = win(lt, 85, 100, 135, 165);
  const annivLift = win(lt, 135, 155, 185, 215);
  const budgetLift = win(lt, 195, 210, 240, 270);
  const annivPress = win(lt, 160, 164, 170, 178);

  /* cursor entrance (intro) → loop position */
  const cursorPos = (rest: { x: number; y: number }, from: { x: number; y: number }, at: { x: number; y: number }, delay: number, cycles: number) => {
    const e = seg(f, delay, delay + 34);
    if (f < INTRO) return { x: rest.x + from.x * (1 - e), y: rest.y + from.y * (1 - e), opacity: seg(f, delay, delay + 8, (x) => x) };
    return {
      x: at.x + drift(lt, cycles, 5) + drift(lt, cycles * 2 + 1, 1.5),
      y: at.y + drift(lt, cycles + 1, 4) + drift(lt, cycles * 3, 1.2),
      opacity: 1,
    };
  };
  const mayaPos = cursorPos(MAYA_REST, MAYA_FROM, maya, 44, 3);
  const gracePos = cursorPos(GRACE_REST, GRACE_FROM, grace, 52, 2);
  const arunPos = cursorPos(ARUN_REST, ARUN_FROM, arun, 60, 4);

  /* selection (Alex) */
  const sel = seg(f, 58, 70, (x) => x);
  const handle = (delay: number) => Math.min(1, pop(f, 58 + delay));
  const toast = toastPresence(f);
  const bobs = {
    toolbar: bob(f, 2, 2.5),
    summit: bob(f, 1, -4),
    anniv: bob(f, 2, 4),
    closed: bob(f, 3, -3.5),
    budget: bob(f, 1, 4),
    toast: bob(f, 2, -3.5),
  };
  const draw = seg(toast, 0.35, 1, (x) => x);

  return (
    <div
      className="font-sans text-grey-800"
      style={{ position: "relative", width: STAGE_W, height: STAGE_H }}
    >
      {/* toolbar · workspace */}
      <div
        className="bg-white"
        style={{
          position: "absolute",
          left: -1,
          top: 44,
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "9px 12px",
          borderRadius: 100,
          boxShadow: "0px 12px 28px 0px rgba(0, 0, 0, 0.34)",
          opacity: seg(f, 0, 8, (x) => x),
          transform: `translateY(${(1 - pop(f, 0)) * -18 + bobs.toolbar}px)`,
        }}
      >
        <div
          className="bg-grey-800 font-bold text-white"
          style={{ padding: "4.4px 8.8px", borderRadius: 6.6, fontSize: 13.2, lineHeight: "17.6px" }}
        >
          A
        </div>
        <p style={{ fontSize: 14, lineHeight: "20px", fontWeight: 600, whiteSpace: "nowrap" }}>Acme Inc.</p>
        <p className="text-grey-300" style={{ fontSize: 14, lineHeight: "20px" }}>/</p>
        <p className="text-canvas-muted" style={{ fontSize: 14, lineHeight: "20px", whiteSpace: "nowrap" }}>
          Programs
        </p>
        <div style={{ width: 10, height: 1 }} />
        <div style={{ display: "flex", alignItems: "center" }}>
          {[avatarMayaRing, avatarAlexRing, avatarGraceRing, avatarArunRing].map((src, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                width: 28,
                height: 28,
                marginRight: i < 3 ? -7 : 0,
                flexShrink: 0,
                transform: `scale(${Math.min(1, pop(f, 10 + i * 4))})`,
              }}
            >
              <Image
                src={src}
                alt=""
                sizes="4rem"
                quality={90}
                style={{ position: "absolute", left: -2, top: -2, width: 32, height: 32, maxWidth: "none" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* program · Summit swag kits */}
      <Card left={-1} top={132} width={300} f={f} delay={8} lift={summitLift} bob={bobs.summit} padding={18} gap={14}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div className="bg-canvas-pink" style={{ padding: "5px 12px", borderRadius: 100 }}>
            <p style={{ ...label, fontSize: 11, lineHeight: "14px", letterSpacing: 1 }}>Marketing</p>
          </div>
          <p className="text-swag-grey" style={{ fontSize: 12, lineHeight: "16px" }}>Campaign</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Thumb src={thumbHoodie} size={60} radius={12} />
          <div style={{ display: "flex", flexDirection: "column", gap: 3, whiteSpace: "nowrap" }}>
            <p style={{ fontSize: 18, lineHeight: "24px", fontWeight: 600 }}>Summit swag kits</p>
            <p className="text-swag-grey" style={{ fontSize: 13, lineHeight: "18px" }}>
              {num(recipients)} recipients
            </p>
          </div>
        </div>
        <div className="bg-grey-200" style={{ height: 8, borderRadius: 4, overflow: "hidden" }}>
          <div className="bg-grey-800" style={{ height: 8, borderRadius: 4, width: 252 * fill }} />
        </div>
      </Card>

      {/* program · Anniversaries */}
      <Card left={383} top={154} width={252} f={f} delay={16} lift={annivLift} bob={bobs.anniv} scale={1 - 0.015 * annivPress} padding={16}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Thumb src={thumbAnniversary} size={48} radius={10} />
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <p style={{ fontSize: 16, lineHeight: "20px", fontWeight: 600, whiteSpace: "nowrap" }}>Anniversaries</p>
            <div className="bg-canvas-lilac" style={{ alignSelf: "flex-start", padding: "4px 10px", borderRadius: 100 }}>
              <p style={{ ...label, fontSize: 10, lineHeight: "14px", letterSpacing: 1 }}>People</p>
            </div>
          </div>
        </div>
      </Card>

      {/* program · Closed-won gifts + Alex's selection (dragged together) */}
      <div style={{ position: "absolute", left: 0, top: 0, transform: `translate(${drag.x}px, ${drag.y + bobs.closed}px)` }}>
        <Card left={255} top={346} width={270} f={f} delay={24} padding={16}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Thumb src={thumbGift} size={48} radius={10} />
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <p style={{ fontSize: 16, lineHeight: "20px", fontWeight: 600, whiteSpace: "nowrap" }}>Closed-won gifts</p>
              <div className="bg-canvas-blue" style={{ alignSelf: "flex-start", padding: "4px 10px", borderRadius: 100 }}>
                <p style={{ ...label, fontSize: 10, lineHeight: "14px", letterSpacing: 1 }}>Sales</p>
              </div>
            </div>
          </div>
        </Card>

        <div
          style={{
            position: "absolute",
            left: 248,
            top: 339,
            width: 284,
            height: 94,
            boxSizing: "border-box",
            border: "1.5px solid white",
            borderRadius: 4,
            opacity: sel,
          }}
        >
          {[
            [-6, -6],
            [278, -6],
            [-6, 88],
            [278, 88],
          ].map(([hx, hy], i) => (
            <div
              key={i}
              className="border-grey-800 bg-white"
              style={{
                position: "absolute",
                left: hx,
                top: hy,
                width: 9,
                height: 9,
                borderRadius: 1,
                borderWidth: 1,
                borderStyle: "solid",
                transform: `scale(${handle(i * 2)})`,
              }}
            />
          ))}
          <div
            className="bg-canvas-blue"
            style={{
              position: "absolute",
              left: -2.5,
              top: -45.5,
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "4px 12px 4px 4px",
              borderRadius: 100,
              transformOrigin: "0 100%",
              transform: `scale(${Math.min(1, pop(f, 66))})`,
            }}
          >
            <Avatar src={avatarAlex} />
            <p style={pillName}>Alex Morgan</p>
          </div>
        </div>
      </div>

      {/* org · shared budget */}
      <Card
        left={-1}
        top={436}
        width={232}
        f={f}
        delay={32}
        lift={budgetLift}
        bob={bobs.budget}
        padding={18}
        gap={10}
        className="border border-grey-200 bg-grey-100"
      >
        <p className="text-canvas-muted" style={{ ...label, fontSize: 11, lineHeight: "14px", letterSpacing: 1 }}>
          Shared budget
        </p>
        <p className="font-display font-bold" style={{ fontSize: 32, lineHeight: "36px", whiteSpace: "nowrap" }}>
          ${num(budget)}
        </p>
        <div
          className="bg-grey-200"
          style={{ display: "flex", gap: 2, width: 196, height: 10, borderRadius: 5, flexShrink: 0, overflow: "hidden" }}
        >
          <div className="bg-canvas-seg-pink" style={{ height: 10, flexShrink: 0, width: 54 * segGrow(0) }} />
          <div className="bg-canvas-seg-lilac" style={{ height: 10, flexShrink: 0, width: 39 * segGrow(6) }} />
          <div className="bg-canvas-seg-blue" style={{ height: 10, flexShrink: 0, width: 23 * segGrow(12) }} />
        </div>
      </Card>

      {/* toast · delivered */}
      <div
        className="bg-white"
        style={{
          position: "absolute",
          left: 377,
          top: 552,
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "12px 14px",
          borderRadius: 16,
          boxShadow: "0px 14px 32px 0px rgba(0, 0, 0, 0.36)",
          opacity: toast,
          transform: `translateY(${(1 - toast) * 18 + bobs.toast}px) scale(${0.96 + 0.04 * toast})`,
        }}
      >
        <div className="bg-canvas-green" style={{ padding: 7, borderRadius: 100, display: "flex" }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ display: "block", overflow: "visible" }}>
            <path
              d="M11.6665 3.49998L5.24981 9.91665L2.33315 6.99998"
              className="stroke-canvas-check"
              strokeWidth="1.16667"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="14"
              strokeDashoffset={14 * (1 - draw)}
            />
          </svg>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <p style={{ fontSize: 14, lineHeight: "18px", fontWeight: 600, whiteSpace: "nowrap" }}>Kit delivered</p>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            {/* Spain — 1:2:1 stripes; the Figma flag is a 267 KB sprite, not worth shipping at 14 */}
            <div
              className="border-white bg-white"
              style={{
                width: 14,
                height: 14,
                borderRadius: 7,
                borderWidth: 1.5,
                borderStyle: "solid",
                boxSizing: "border-box",
                background:
                  "linear-gradient(#aa151b 0 25%, #f1bf00 25% 75%, #aa151b 75% 100%)",
              }}
            />
            <p className="text-swag-grey" style={{ fontSize: 12, lineHeight: "16px", whiteSpace: "nowrap" }}>
              Madrid · Just now
            </p>
          </div>
        </div>
      </div>

      {/* cursor · Maya Chen */}
      <Cursor x={mayaPos.x} y={mayaPos.y} opacity={mayaPos.opacity} pillClass="bg-grey-800 text-white">
        <Avatar src={avatarMaya} />
        <div style={{ whiteSpace: "nowrap" }}>
          <p style={{ ...pillName }}>Maya Chen</p>
          <p className="text-grey-300" style={{ fontSize: 10, lineHeight: "12px" }}>Marketing</p>
        </div>
      </Cursor>

      {/* cursor · Arun */}
      <Cursor x={arunPos.x} y={arunPos.y} opacity={arunPos.opacity} pillClass="bg-white">
        <Avatar src={avatarArun} />
        <p style={pillName}>Arun</p>
      </Cursor>

      {/* cursor · Grace Adeyemi */}
      <Cursor
        x={gracePos.x}
        y={gracePos.y}
        opacity={gracePos.opacity}
        press={annivPress}
        pillClass="bg-canvas-lilac"
      >
        <Avatar src={avatarGrace} />
        <p style={pillName}>Grace Adeyemi</p>
      </Cursor>
    </div>
  );
}
