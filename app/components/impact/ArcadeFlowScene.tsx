"use client";

/* /impact hero visual — "Programs → ARCADE workspace → world" (Figma cGznwzQVViaYtxp3zcZk97
   108:16867 inside 108:16714 "/impact · final"; stage 613 × 596 = the cluster's bounding box).
   Built as a Remotion composition: every element is a pure function of the current frame,
   so the Player can play, pause and seek.

   STAGE UNITS. The scene is authored on a fixed 613 × 596 stage and the Remotion Player
   scales the whole stage to its container (like an exported image). So the bare numbers in
   the style objects below are stage units, NOT CSS px — the one place the "no hardcoded px"
   rule intentionally doesn't apply (see design.md → "/impact hero"). Coordinates are the
   Figma frame's own (origin = the visual frame's top-left); colours and fonts come from tokens.

   TIMELINE (30 fps)
     0 – 96     INTRO: world map fades in, the three program cards spring in, connectors draw
                down into the ARCADE workspace, the hub lands and the shared budget counts up
                to $186,400, capability chips pop, connectors draw out to the four cities and
                the city pills land. Frame 96 is exactly the Figma frame → it is also the still
                used for prefers-reduced-motion.
     96 – 396   LOOP (300 frames): three programs each fulfil something. A dot in the program's
                colour rides its connector into the hub (the program lifts, the hub receives and
                the shared budget ticks down), then a second dot leaves the hub for a city, whose
                pill lifts, pulses its map marker and flips status (São Paulo Packing → Shipped,
                Tokyo Shipped → Delivered, Mumbai Delivered → Packing for a new box). Frames
                246–282 refill the budget and flip every status back, so every moving value
                starts and ends at its Figma rest pose and the Player can jump 396 → 96 with no
                seam.

   NO CROP. The Player runs with overflowVisible (shadows and lifted cards are never clipped
   at the stage edge); everything that moves stays on the connector paths. */

import Image from "next/image";
import { Easing, interpolate, spring, useCurrentFrame } from "remotion";

import avatar1 from "@/public/impact/overview/hero/arcade/av-1.webp";
import avatar2 from "@/public/impact/overview/hero/arcade/av-2.webp";
import avatar3 from "@/public/impact/overview/hero/arcade/av-3.webp";
import photoAnniversary from "@/public/impact/overview/hero/arcade/anniversary.webp";
import photoGift from "@/public/impact/overview/hero/arcade/gift.webp";
import photoKit from "@/public/impact/overview/hero/arcade/kit.webp";
import worldMap from "@/public/impact/overview/hero/arcade/world-map.webp";

export const STAGE_W = 613;
export const STAGE_H = 596;
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

const num = (n: number) => Math.round(n).toLocaleString("en-US");

/* ───────────── geometry (Figma frame coordinates) ───────────── */

type Pt = readonly [number, number];
type Curve = { p0: Pt; p1: Pt; p2: Pt; p3: Pt };

/** Connectors, exactly the Figma cubic paths translated into frame coordinates. */
const PROGRAM_PATHS: Curve[] = [
  { p0: [132, 166], p1: [132, 190.5], p2: [230, 190.5], p3: [230, 215] },
  { p0: [300, 166], p1: [300, 190.5], p2: [300, 190.5], p3: [300, 215] },
  { p0: [468, 166], p1: [468, 190.5], p2: [370, 190.5], p3: [370, 215] },
];
/** hub → Berlin, Tokyo, São Paulo, Mumbai (city order below) */
const CITY_PATHS: Curve[] = [
  { p0: [300, 364], p1: [300, 394], p2: [322.3, 374], p3: [322.3, 425.4] },
  { p0: [300, 364], p1: [300, 394], p2: [532.8, 374], p3: [532.8, 453.4] },
  { p0: [300, 364], p1: [300, 394], p2: [222.3, 374], p3: [222.3, 552] },
  { p0: [300, 364], p1: [300, 394], p2: [421.5, 374], p3: [421.5, 481.1] },
];

const d = (c: Curve) =>
  `M${c.p0[0]} ${c.p0[1]}C${c.p1[0]} ${c.p1[1]} ${c.p2[0]} ${c.p2[1]} ${c.p3[0]} ${c.p3[1]}`;

/** Point on a cubic Bézier at u (0…1). */
function at(c: Curve, u: number) {
  const m = 1 - u;
  const k0 = m * m * m;
  const k1 = 3 * m * m * u;
  const k2 = 3 * m * u * u;
  const k3 = u * u * u;
  return {
    x: k0 * c.p0[0] + k1 * c.p1[0] + k2 * c.p2[0] + k3 * c.p3[0],
    y: k0 * c.p0[1] + k1 * c.p1[1] + k2 * c.p2[1] + k3 * c.p3[1],
  };
}

/* ───────────── content ───────────── */

const PROGRAMS = [
  { left: 57, name: "Summit swag kits", tag: "Marketing", tagBg: "bg-canvas-pink", tagW: 87, dot: "#f6a3b8", photo: photoKit, alt: "Boxed ARCADE hoodie kit" },
  { left: 225, name: "Anniversaries", tag: "People", tagBg: "bg-canvas-lilac", tagW: 64, dot: "#c99af0", photo: photoAnniversary, alt: "Chocolate gift box" },
  { left: 393, name: "Closed-won gifts", tag: "Sales", tagBg: "bg-canvas-blue", tagW: 55, dot: "#8fbffa", photo: photoGift, alt: "Perfume gift" },
] as const;

type FlagCode = "DE" | "JP" | "BR" | "IN";

const CITIES = [
  { left: 213.3, top: 410.4, w: 160, city: "Berlin", flag: "DE", item: "Summit kit", rest: "Delivered", alt: "Delivered" },
  { left: 436, top: 393.4, w: 177, city: "Tokyo", flag: "JP", item: "Closed-won gift", rest: "Shipped", alt: "Delivered" },
  { left: 238.3, top: 531, w: 153, city: "São Paulo", flag: "BR", item: "Summit kit", rest: "Packing", alt: "Shipped" },
  { left: 374, top: 497.1, w: 187, city: "Mumbai", flag: "IN", item: "Anniversary box", rest: "Delivered", alt: "Packing" },
] as const satisfies readonly { left: number; top: number; w: number; city: string; flag: FlagCode; item: string; rest: string; alt: string }[];

const CHIPS = [
  { left: 0, w: 112, label: "Shared budget" },
  { left: 118, w: 87, label: "Approvals" },
  { left: 211, w: 91, label: "Fulfillment" },
] as const;

const BUDGET = 186400;

/** Loop waves: program → city, what it draws from the budget. */
const WAVES = [
  { start: 14, program: 0, city: 2, amount: 1250 },
  { start: 94, program: 2, city: 1, amount: 740 },
  { start: 174, program: 1, city: 3, amount: 980 },
] as const;
const IN_TIME = 22; // dot rides program → hub
const OUT_START = 30; // dot leaves the hub (relative to wave start)
const OUT_TIME = 24; // dot rides hub → city
const RESET_A = 246;
const RESET_B = 282;

/* ───────────── shared bits ───────────── */

const SHADOW_COLOR = "rgba(0, 0, 0,";
const shadow = (lift: number) =>
  `0px ${12 + 6 * lift}px ${30 + 8 * lift}px 0px ${SHADOW_COLOR} ${0.35 + 0.06 * lift})`;

function FlagArt({ code }: { code: FlagCode }) {
  switch (code) {
    case "DE":
      return (
        <>
          <rect width="30" height="6.7" fill="#000" />
          <rect y="6.7" width="30" height="6.7" fill="#dd0000" />
          <rect y="13.4" width="30" height="6.7" fill="#ffce00" />
        </>
      );
    case "JP":
      return (
        <>
          <rect width="30" height="20" fill="#f8f8f8" />
          <circle cx="15" cy="10" r="5.6" fill="#bc002d" />
        </>
      );
    case "BR":
      return (
        <>
          <rect width="30" height="20" fill="#229e45" />
          <polygon points="15,1.8 27.6,10 15,18.2 2.4,10" fill="#f8e509" />
          <circle cx="15" cy="10" r="4.4" fill="#2b49a3" />
        </>
      );
    case "IN":
      return (
        <>
          <rect width="30" height="6.7" fill="#ff9933" />
          <rect y="6.7" width="30" height="6.7" fill="#f8f8f8" />
          <rect y="13.4" width="30" height="6.7" fill="#128807" />
          <circle cx="15" cy="10" r="2.2" fill="none" stroke="#000088" strokeWidth="0.5" />
        </>
      );
  }
}

/** 24 round flag with the Figma 1px white@.18 ring (the Figma flags are sprites — drawn as SVG). */
function Flag({ code }: { code: FlagCode }) {
  return (
    <div style={{ position: "absolute", left: 9, top: 11, width: 24, height: 24, borderRadius: "50%", overflow: "hidden" }}>
      <svg viewBox="0 0 30 20" width={36} height={24} style={{ position: "absolute", left: -6, top: 0, display: "block" }}>
        <FlagArt code={code} />
      </svg>
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.18)" }} />
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width={12} height={12} viewBox="0 0 12 12" fill="none" style={{ display: "block" }}>
      <path d="M2.5 6.4 4.9 8.8 9.5 3.4" className="stroke-canvas-check" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Dot({ x, y, color, opacity }: { x: number; y: number; color: string; opacity: number }) {
  if (opacity <= 0.001) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x - 6,
        top: y - 6,
        width: 12,
        height: 12,
        borderRadius: "50%",
        background: color,
        boxShadow: `0 0 0 2.5px #fff, 0 0 14px 4px ${color}`,
        opacity,
        zIndex: 6,
      }}
    />
  );
}

/** Small white connector end dot (rest pose: visible once its connector has drawn). */
function Pin({ x, y, size, opacity }: { x: number; y: number; size: number; opacity: number }) {
  return (
    <div
      className="bg-white"
      style={{ position: "absolute", left: x - size / 2, top: y - size / 2, width: size, height: size, borderRadius: "50%", opacity }}
    />
  );
}

/* ───────────── scene ───────────── */

export function ArcadeFlowScene() {
  const f = useCurrentFrame();
  const t = Math.max(0, f - INTRO); // loop clock (0 during the intro)

  /* intro timing */
  const programDelay = [0, 6, 12] as const;
  const cityDelay = [60, 64, 68, 72] as const;
  const hubPop = pop(f, 22);

  /* loop state */
  const reset = seg(t, RESET_A, RESET_B, IN_OUT);
  const drawn = WAVES.reduce((sum, w) => sum + w.amount * seg(t, w.start + IN_TIME, w.start + IN_TIME + 12, IN_OUT), 0);
  const budget = BUDGET * seg(f, 28, 64) - drawn * (1 - reset);

  const programLift = PROGRAMS.map((_, i) => {
    const w = WAVES.find((x) => x.program === i)!;
    return win(t, w.start - 6, w.start + 6, w.start + 14, w.start + 28);
  });
  const hubReceive = WAVES.reduce(
    (m, w) => Math.max(m, win(t, w.start + IN_TIME - 2, w.start + IN_TIME + 4, w.start + IN_TIME + 8, w.start + IN_TIME + 22)),
    0,
  );
  const arrival = (i: number) => {
    const w = WAVES.find((x) => x.city === i);
    return w ? w.start + OUT_START + OUT_TIME : null;
  };
  const cityMix = CITIES.map((_, i) => {
    const a = arrival(i);
    if (a === null) return 0;
    return seg(t, a, a + 8, IN_OUT) * (1 - seg(t, RESET_A + 4 * i, RESET_A + 4 * i + 12, IN_OUT));
  });
  const cityLift = CITIES.map((_, i) => {
    const a = arrival(i);
    return a === null ? 0 : win(t, a - 4, a + 4, a + 12, a + 30);
  });
  const cityPulse = CITIES.map((_, i) => {
    const a = arrival(i);
    return a === null ? 0 : seg(t, a, a + 22, OUT);
  });

  return (
    <div style={{ position: "relative", width: STAGE_W, height: STAGE_H, fontVariantNumeric: "tabular-nums" }}>
      {/* dotted world map */}
      <Image
        src={worldMap}
        alt=""
        sizes="38rem"
        quality={90}
        style={{ position: "absolute", left: 0, top: 388, width: 600, height: 208, opacity: seg(f, 0, 28, LIN) }}
      />

      {/* connectors (below the cards, like the Figma layer order) */}
      <svg width={STAGE_W} height={STAGE_H} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} fill="none">
        {PROGRAM_PATHS.map((c, i) => (
          <path
            key={`p${i}`}
            d={d(c)}
            pathLength={1}
            strokeDasharray="1 1"
            strokeDashoffset={1 - seg(f, 14 + programDelay[i], 36 + programDelay[i], IN_OUT)}
            stroke="rgba(255,255,255,0.55)"
            strokeWidth={1.5}
          />
        ))}
        {CITY_PATHS.map((c, i) => (
          <path
            key={`c${i}`}
            d={d(c)}
            pathLength={1}
            strokeDasharray="1 1"
            strokeDashoffset={1 - seg(f, 44 + i * 4, 70 + i * 4, IN_OUT)}
            stroke="rgba(255,255,255,0.55)"
            strokeWidth={1.5}
          />
        ))}
      </svg>

      {/* city map markers: soft halo + pulse ring + pin */}
      {CITY_PATHS.map((c, i) => {
        const v = seg(f, 66 + i * 4, 72 + i * 4, LIN);
        const pulse = cityPulse[i];
        return (
          <div key={`m${i}`}>
            <div
              style={{
                position: "absolute",
                left: c.p3[0] - 11,
                top: c.p3[1] - 11,
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.18)",
                opacity: v,
              }}
            />
            {pulse > 0.001 && pulse < 0.999 && (
              <div
                style={{
                  position: "absolute",
                  left: c.p3[0] - 11,
                  top: c.p3[1] - 11,
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  border: "1.5px solid rgba(255,255,255,0.55)",
                  transform: `scale(${1 + 1.2 * pulse})`,
                  opacity: 1 - pulse,
                }}
              />
            )}
          </div>
        );
      })}

      {/* program cards */}
      {PROGRAMS.map((p, i) => {
        const pp = pop(f, programDelay[i]);
        const lift = programLift[i];
        return (
          <div
            key={p.name}
            className="bg-arcade-card"
            style={{
              position: "absolute",
              left: p.left,
              top: 0,
              width: 150,
              height: 166,
              borderRadius: 16,
              opacity: seg(f, programDelay[i], programDelay[i] + 8, LIN),
              transform: `translateY(${(1 - pp) * 28 - lift * 4}px) scale(${0.94 + 0.06 * pp})`,
              boxShadow: shadow(lift),
            }}
          >
            <div className="border-arcade-card-line" style={{ position: "absolute", inset: 0, borderRadius: 16, borderWidth: 1, borderStyle: "solid" }} />
            <div
              className={p.tagBg}
              style={{ position: "absolute", left: 11, top: 11, width: p.tagW, height: 22, borderRadius: 100, display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <p className="font-sans font-bold uppercase text-grey-800" style={{ fontSize: 10, lineHeight: "14px", letterSpacing: 1, whiteSpace: "nowrap" }}>
                {p.tag}
              </p>
            </div>
            <Image
              src={p.photo}
              alt=""
              sizes="9rem"
              quality={90}
              style={{ position: "absolute", left: 11, top: 41, width: 130, height: 88, borderRadius: 10, objectFit: "cover" }}
            />
            <p
              className="font-sans font-semibold text-swag-ink"
              style={{ position: "absolute", left: 11, top: 137, fontSize: 13, lineHeight: "16px", whiteSpace: "nowrap" }}
            >
              {p.name}
            </p>
          </div>
        );
      })}

      {/* hub */}
      <div
        className="bg-white"
        style={{
          position: "absolute",
          left: 100,
          top: 215,
          width: 400,
          height: 149,
          borderRadius: 16,
          overflow: "hidden",
          opacity: seg(f, 22, 30, LIN),
          transform: `translateY(${(1 - hubPop) * 28 - hubReceive * 2}px) scale(${(0.94 + 0.06 * hubPop) * (1 + 0.01 * hubReceive)})`,
          boxShadow: shadow(hubReceive),
        }}
      >
        <div style={{ position: "absolute", left: 20, top: 18, whiteSpace: "nowrap" }}>
          <p className="font-sans font-bold text-swag-ink" style={{ fontSize: 17, lineHeight: "22px" }}>
            ARCADE workspace
          </p>
          <p className="font-sans text-swag-grey" style={{ fontSize: 12, lineHeight: "15px", marginTop: 1 }}>
            7 teams, 14 programs live
          </p>
        </div>
        <div style={{ position: "absolute", left: 316, top: 24, width: 64, height: 26 }}>
          {[avatar1, avatar2, avatar3].map((src, i) => {
            const ap = pop(f, 34 + i * 4);
            return (
              <Image
                key={i}
                src={src}
                alt=""
                sizes="2rem"
                quality={90}
                style={{
                  position: "absolute",
                  left: i * 19,
                  top: 0,
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  border: "2px solid #fff",
                  boxSizing: "border-box",
                  objectFit: "cover",
                  opacity: seg(f, 34 + i * 4, 40 + i * 4, LIN),
                  transform: `scale(${0.6 + 0.4 * ap})`,
                }}
              />
            );
          })}
        </div>
        {CHIPS.map((c, i) => {
          const cp = pop(f, 38 + i * 5);
          return (
            <div
              key={c.label}
              className="bg-arcade-chip"
              style={{
                position: "absolute",
                left: 20 + c.left,
                top: 70,
                width: c.w,
                height: 27,
                borderRadius: 100,
                display: "flex",
                alignItems: "center",
                gap: 4,
                paddingLeft: 7,
                opacity: seg(f, 38 + i * 5, 44 + i * 5, LIN),
                transform: `scale(${0.85 + 0.15 * cp})`,
              }}
            >
              <CheckIcon />
              <p className="font-sans font-semibold text-swag-ink" style={{ fontSize: 12, lineHeight: "15px", whiteSpace: "nowrap" }}>
                {c.label}
              </p>
            </div>
          );
        })}
        <div style={{ position: "absolute", left: 20, top: 111, height: 20, display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap" }}>
          <p className="font-sans text-swag-grey" style={{ fontSize: 12, lineHeight: "15px" }}>
            Shared budget
          </p>
          <p className="font-sans font-bold text-swag-ink" style={{ fontSize: 16, lineHeight: "20px" }}>
            ${num(budget)}
          </p>
        </div>
      </div>

      {/* hub / program connection pins */}
      {PROGRAM_PATHS.map((c, i) => (
        <Pin key={`pp${i}`} x={c.p3[0]} y={c.p3[1] - 2.5} size={5} opacity={seg(f, 30 + programDelay[i], 36 + programDelay[i], LIN)} />
      ))}
      <Pin x={300} y={364} size={6} opacity={seg(f, 44, 50, LIN)} />
      {CITY_PATHS.map((c, i) => (
        <Pin key={`cp${i}`} x={c.p3[0]} y={c.p3[1]} size={7} opacity={seg(f, 66 + i * 4, 72 + i * 4, LIN)} />
      ))}

      {/* city status pills */}
      {CITIES.map((c, i) => {
        const cp = pop(f, cityDelay[i]);
        const lift = cityLift[i];
        const mix = cityMix[i];
        const restOk = c.rest === "Delivered";
        const altOk = c.alt === "Delivered";
        return (
          <div
            key={c.city}
            className="bg-arcade-pill"
            style={{
              position: "absolute",
              left: c.left,
              top: c.top,
              width: c.w,
              height: 46,
              borderRadius: 10,
              zIndex: 4,
              opacity: seg(f, cityDelay[i], cityDelay[i] + 8, LIN),
              transform: `translateY(${(1 - cp) * 24 - lift * 3}px) scale(${0.94 + 0.06 * cp})`,
              boxShadow: `0px ${10 + 6 * lift}px ${24 + 8 * lift}px 0px rgba(0, 0, 0, ${0.3 + 0.08 * lift})`,
            }}
          >
            <div style={{ position: "absolute", inset: 0, borderRadius: 10, border: `1px solid rgba(255,255,255,${0.12 + 0.2 * lift})` }} />
            <Flag code={c.flag} />
            <div style={{ position: "absolute", left: 41, top: 8, whiteSpace: "nowrap" }}>
              <p className="font-sans font-bold text-white" style={{ fontSize: 12.5, lineHeight: "16px" }}>
                {c.city}
              </p>
              <div className="font-sans" style={{ display: "grid", fontSize: 11, lineHeight: "14px" }}>
                <p className={restOk ? "text-arcade-ok" : "text-arcade-pill-muted"} style={{ gridArea: "1 / 1", opacity: 1 - mix }}>
                  {c.item}, {c.rest}
                </p>
                <p className={altOk ? "text-arcade-ok" : "text-arcade-pill-muted"} style={{ gridArea: "1 / 1", opacity: mix }}>
                  {c.item}, {c.alt}
                </p>
              </div>
            </div>
          </div>
        );
      })}

      {/* travelling dots: program → hub, then hub → city */}
      {WAVES.map((w, k) => {
        const program = PROGRAMS[w.program];
        const inU = seg(t, w.start, w.start + IN_TIME, IN_OUT);
        const outU = seg(t, w.start + OUT_START, w.start + OUT_START + OUT_TIME, IN_OUT);
        const a = at(PROGRAM_PATHS[w.program], inU);
        const b = at(CITY_PATHS[w.city], outU);
        const inVis = seg(t, w.start, w.start + 3, LIN) * (1 - seg(t, w.start + IN_TIME - 2, w.start + IN_TIME + 3, LIN));
        const outVis =
          seg(t, w.start + OUT_START, w.start + OUT_START + 3, LIN) *
          (1 - seg(t, w.start + OUT_START + OUT_TIME - 2, w.start + OUT_START + OUT_TIME + 3, LIN));
        return (
          <div key={k}>
            <Dot x={a.x} y={a.y} color={program.dot} opacity={inVis} />
            <Dot x={b.x} y={b.y} color={program.dot} opacity={outVis} />
          </div>
        );
      })}
    </div>
  );
}
