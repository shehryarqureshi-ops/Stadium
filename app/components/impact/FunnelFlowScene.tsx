"use client";

/* /impact hero visual — "Funnel Flow (many → one → many)" (Figma n9SjmDjzB1PeZAYJ5w43fr
   5152:23306 inside 5152:23271, 647 × 724). Built as a Remotion composition: every
   element is a pure function of the current frame, so the Player can play, pause and seek.

   STAGE UNITS. The scene is authored on a fixed 647 × 724 stage and the Remotion Player
   scales the whole stage to its container (like an exported image). So the bare numbers
   in the style objects below are stage units, NOT CSS px — the one place the "no
   hardcoded px" rule intentionally doesn't apply (see design.md → "/impact hero").
   Colours and fonts still come from tokens.

   TIMELINE (30 fps)
     0 – 96     INTRO: team cards spring in, connectors draw down into the hub, the hub
                lands and the budget counts up to $186,400, connectors draw out to the
                four recipients. Frame 96 is exactly the Figma frame → it is also the
                still used for prefers-reduced-motion.
     96 – 396   LOOP (300 frames): three team programs each send something. A dot in the
                team's colour rides its connector into the hub (the hub receives it, the
                shared budget ticks down, that team's slice of the bar shrinks), then a
                second dot leaves the hub for a recipient, whose status flips
                (São Paulo Packing → Shipped, Tokyo Shipped → Delivered, Berlin
                Delivered → Packing). Frames 246–282 refill the budget and flip every
                status back, so every moving value starts and ends at its Figma rest
                pose and the Player can jump 396 → 96 without a seam.

   NO CROP. The Player runs with overflowVisible (shadows and lifted cards are never
   clipped at the stage edge); everything that moves stays inside the connector paths. */

import Image from "next/image";
import { Easing, interpolate, spring, useCurrentFrame } from "remotion";

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

/* ───────────── geometry (Figma stage coordinates) ───────────── */

type Pt = readonly [number, number];
type Curve = { p0: Pt; p1: Pt; p2: Pt; p3: Pt };

/** Connectors, exactly the Figma paths translated into stage coordinates. */
const TEAM_PATHS: Curve[] = [
  { p0: [97, 186], p1: [97, 221], p2: [185, 221], p3: [185, 256] },
  { p0: [305, 186], p1: [305, 207], p2: [305, 235], p3: [305, 256] },
  { p0: [513, 186], p1: [513, 221], p2: [425, 221], p3: [425, 256] },
];
const OUT_PATHS: Curve[] = [
  { p0: [165, 421], p1: [165, 493.5], p2: [74, 493.5], p3: [74, 566] },
  { p0: [255, 421], p1: [255, 493.5], p2: [232, 493.5], p3: [232, 566] },
  { p0: [355, 421], p1: [355, 493.5], p2: [390, 493.5], p3: [390, 566] },
  { p0: [445, 421], p1: [445, 493.5], p2: [548, 493.5], p3: [548, 566] },
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

const TEAMS = [
  { left: -1, name: "Summit swag kits", tag: "Marketing", tagBg: "bg-canvas-pink", dot: "#f6a3b8", thumb: thumbHoodie },
  { left: 207, name: "Anniversaries", tag: "People", tagBg: "bg-canvas-lilac", dot: "#c99af0", thumb: thumbAnniversary },
  { left: 415, name: "Closed-won gifts", tag: "Sales", tagBg: "bg-canvas-blue", dot: "#8fbffa", thumb: thumbGift },
] as const;

const RECIPIENTS = [
  { left: -1, city: "Berlin", flag: "DE", rest: "Delivered", alt: "Packing" },
  { left: 157, city: "Tokyo", flag: "JP", rest: "Shipped", alt: "Delivered" },
  { left: 315, city: "São Paulo", flag: "BR", rest: "Packing", alt: "Shipped" },
  { left: 473, city: "Mumbai", flag: "IN", rest: "Delivered", alt: "Delivered" },
] as const;

const BUDGET = 186400;
const SEGMENTS = [94, 68, 41] as const;
const SEG_BG = ["bg-canvas-seg-pink", "bg-canvas-seg-lilac", "bg-canvas-seg-blue"] as const;

/** Loop waves: team → recipient, what it draws from the budget (and how much of its slice). */
const WAVES = [
  { start: 14, team: 0, to: 2, amount: 1250, shrink: 9 },
  { start: 94, team: 1, to: 1, amount: 740, shrink: 7 },
  { start: 174, team: 2, to: 0, amount: 980, shrink: 5 },
] as const;
const IN_TIME = 22; // dot rides team → hub
const OUT_START = 30; // dot leaves the hub (relative to wave start)
const OUT_TIME = 24; // dot rides hub → recipient
const RESET_A = 246;
const RESET_B = 282;

/* ───────────── shared bits ───────────── */

const shadowCard = (lift: number) =>
  `0px ${12 + 8 * lift}px ${28 + 8 * lift}px 0px rgba(0, 0, 0, ${0.32 + 0.06 * lift})`;

function Thumb({ src }: { src: typeof thumbGift }) {
  return (
    <Image
      src={src}
      alt=""
      sizes="5rem"
      quality={90}
      style={{ width: 40, height: 40, borderRadius: 10, objectFit: "cover", display: "block", flexShrink: 0 }}
    />
  );
}

function FlagArt({ code }: { code: "DE" | "JP" | "BR" | "IN" }) {
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
          <rect width="30" height="20" fill="#fff" />
          <circle cx="15" cy="10" r="6" fill="#bc002d" />
        </>
      );
    case "BR":
      return (
        <>
          <rect width="30" height="20" fill="#009c3b" />
          <polygon points="15,2 27,10 15,18 3,10" fill="#ffdf00" />
          <circle cx="15" cy="10" r="4.3" fill="#002776" />
        </>
      );
    case "IN":
      return (
        <>
          <rect width="30" height="6.7" fill="#ff9933" />
          <rect y="6.7" width="30" height="6.7" fill="#fff" />
          <rect y="13.4" width="30" height="6.7" fill="#138808" />
          <circle cx="15" cy="10" r="2.2" fill="none" stroke="#000080" strokeWidth="0.5" />
        </>
      );
  }
}

/** 30 round flag with the Figma 1.5 white ring (the Figma flags are sprites — drawn as SVG). */
function Flag({ code }: { code: "DE" | "JP" | "BR" | "IN" }) {
  return (
    <div style={{ position: "relative", width: 30, height: 30, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
      <svg viewBox="0 0 30 20" width={45} height={30} style={{ position: "absolute", left: -7.5, top: 0, display: "block" }}>
        <FlagArt code={code} />
      </svg>
      <div className="border-white" style={{ position: "absolute", inset: 0, borderRadius: "50%", borderWidth: 1.5, borderStyle: "solid" }} />
    </div>
  );
}

function Node({ x, y, opacity = 1 }: { x: number; y: number; opacity?: number }) {
  return (
    <div
      className="border-grey-800 bg-white"
      style={{
        position: "absolute",
        left: x - 4.5,
        top: y - 4.5,
        width: 9,
        height: 9,
        borderRadius: "50%",
        borderWidth: 1.5,
        borderStyle: "solid",
        boxSizing: "border-box",
        opacity,
      }}
    />
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
        zIndex: 5,
      }}
    />
  );
}

/* ───────────── scene ───────────── */

export function FunnelFlowScene() {
  const f = useCurrentFrame();
  const t = Math.max(0, f - INTRO); // loop clock (0 during the intro)

  /* intro timing */
  const teamDelay = [0, 5, 10] as const;
  const recipientDelay = [58, 62, 66, 70] as const;
  const hubPop = pop(f, 24);

  /* loop state */
  const reset = seg(t, RESET_A, RESET_B, IN_OUT);
  const drawn = WAVES.reduce((sum, w) => sum + w.amount * seg(t, w.start + IN_TIME, w.start + IN_TIME + 12, IN_OUT), 0);
  const budget = BUDGET * seg(f, 28, 64) - drawn * (1 - reset);

  const teamLift = TEAMS.map((_, i) => {
    const w = WAVES.find((x) => x.team === i)!;
    return win(t, w.start - 6, w.start + 6, w.start + 14, w.start + 28);
  });
  const hubReceive = WAVES.reduce(
    (m, w) => Math.max(m, win(t, w.start + IN_TIME - 2, w.start + IN_TIME + 4, w.start + IN_TIME + 8, w.start + IN_TIME + 22)),
    0,
  );
  const recipientMix = RECIPIENTS.map((_, i) => {
    const w = WAVES.find((x) => x.to === i);
    if (!w) return 0;
    const arrive = w.start + OUT_START + OUT_TIME;
    return seg(t, arrive, arrive + 8, IN_OUT) * (1 - seg(t, RESET_A + 4 * i, RESET_A + 4 * i + 12, IN_OUT));
  });
  const recipientLift = RECIPIENTS.map((_, i) => {
    const w = WAVES.find((x) => x.to === i);
    if (!w) return 0;
    const arrive = w.start + OUT_START + OUT_TIME;
    return win(t, arrive - 4, arrive + 4, arrive + 12, arrive + 30);
  });
  const segLive = SEGMENTS.map((base, i) => {
    const w = WAVES.find((x) => x.team === i)!;
    const spent = w.shrink * seg(t, w.start + IN_TIME, w.start + IN_TIME + 12, IN_OUT) * (1 - reset);
    return base * seg(f, 34 + i * 6, 70 + i * 6) - spent;
  });

  return (
    <div style={{ position: "relative", width: STAGE_W, height: STAGE_H, fontVariantNumeric: "tabular-nums" }}>
      {/* connectors (below the cards, like the Figma layer order) */}
      <svg width={STAGE_W} height={STAGE_H} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} fill="none">
        {TEAM_PATHS.map((c, i) => (
          <path
            key={`t${i}`}
            d={d(c)}
            pathLength={1}
            strokeDasharray="1 1"
            strokeDashoffset={1 - seg(f, 14 + teamDelay[i], 36 + teamDelay[i], IN_OUT)}
            className="stroke-grey-300"
            strokeWidth={1.75}
          />
        ))}
        {OUT_PATHS.map((c, i) => (
          <path
            key={`o${i}`}
            d={d(c)}
            pathLength={1}
            strokeDasharray="1 1"
            strokeDashoffset={1 - seg(f, 48 + i * 3, 70 + i * 3, IN_OUT)}
            className="stroke-grey-300"
            strokeWidth={1.75}
          />
        ))}
      </svg>
      {TEAM_PATHS.map((c, i) => (
        <div key={`tn${i}`}>
          <Node x={c.p0[0]} y={c.p0[1]} opacity={seg(f, teamDelay[i] + 6, teamDelay[i] + 14, LIN)} />
          <Node x={c.p3[0]} y={c.p3[1]} opacity={seg(f, 32 + teamDelay[i], 38 + teamDelay[i], LIN)} />
        </div>
      ))}
      {OUT_PATHS.map((c, i) => (
        <div key={`on${i}`}>
          <Node x={c.p0[0]} y={c.p0[1]} opacity={seg(f, 44 + i * 3, 50 + i * 3, LIN)} />
          <Node x={c.p3[0]} y={c.p3[1]} opacity={seg(f, 66 + i * 3, 72 + i * 3, LIN)} />
        </div>
      ))}

      {/* team programs */}
      {TEAMS.map((team, i) => {
        const p = pop(f, teamDelay[i]);
        return (
          <div
            key={team.name}
            className="bg-white"
            style={{
              position: "absolute",
              left: team.left,
              top: 84,
              width: 196,
              padding: 14,
              borderRadius: 16,
              display: "flex",
              flexDirection: "column",
              gap: 12,
              overflow: "hidden",
              opacity: seg(f, teamDelay[i], teamDelay[i] + 8, LIN),
              transform: `translateY(${(1 - p) * 28 - teamLift[i] * 4}px) scale(${0.94 + 0.06 * p})`,
              boxShadow: shadowCard(teamLift[i]),
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Thumb src={team.thumb} />
              <p
                className="font-sans font-semibold text-grey-800"
                style={{ fontSize: 14, lineHeight: "18px", whiteSpace: "nowrap" }}
              >
                {team.name}
              </p>
            </div>
            <div className={`${team.tagBg} self-start`} style={{ padding: "4px 10px", borderRadius: 100 }}>
              <p
                className="font-sans font-bold uppercase text-grey-800"
                style={{ fontSize: 10, lineHeight: "14px", letterSpacing: 1, whiteSpace: "nowrap" }}
              >
                {team.tag}
              </p>
            </div>
          </div>
        );
      })}

      {/* hub */}
      <div
        className="bg-white"
        style={{
          position: "absolute",
          left: 115,
          top: 256,
          width: 380,
          padding: 22,
          borderRadius: 22,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          overflow: "hidden",
          opacity: seg(f, 24, 32, LIN),
          transform: `translateY(${(1 - hubPop) * 28 - hubReceive * 2}px) scale(${(0.94 + 0.06 * hubPop) * (1 + 0.012 * hubReceive)})`,
          boxShadow: `0px ${22 + 6 * hubReceive}px ${50 + 8 * hubReceive}px 0px rgba(0, 0, 0, ${0.42 + 0.06 * hubReceive})`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            className="bg-grey-800"
            style={{ padding: "6px 12px", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <p className="font-sans font-bold text-white" style={{ fontSize: 18, lineHeight: "24px" }}>
              A
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 1, whiteSpace: "nowrap" }}>
            <p className="font-sans font-semibold text-grey-800" style={{ fontSize: 18, lineHeight: "24px" }}>
              Acme Inc.
            </p>
            <p className="font-sans text-swag-grey" style={{ fontSize: 13, lineHeight: "18px" }}>
              One shared workspace
            </p>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, whiteSpace: "nowrap" }}>
            <p
              className="font-display font-bold text-grey-800"
              style={{ fontSize: 40, lineHeight: "44px", letterSpacing: -0.4 }}
            >
              ${num(budget)}
            </p>
            <p className="font-sans text-swag-grey" style={{ fontSize: 14, lineHeight: "20px" }}>
              shared budget
            </p>
          </div>
          <div className="bg-grey-200" style={{ display: "flex", alignItems: "center", gap: 2, width: 336, height: 10, borderRadius: 5, overflow: "hidden" }}>
            {SEGMENTS.map((_, i) => (
              <div key={i} className={SEG_BG[i]} style={{ width: segLive[i], height: 10, flexShrink: 0 }} />
            ))}
          </div>
        </div>
      </div>

      {/* recipients */}
      {RECIPIENTS.map((r, i) => {
        const p = pop(f, recipientDelay[i]);
        return (
          <div
            key={r.city}
            className="bg-white"
            style={{
              position: "absolute",
              left: r.left,
              top: 566,
              width: 150,
              padding: 12,
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              gap: 10,
              overflow: "hidden",
              opacity: seg(f, recipientDelay[i], recipientDelay[i] + 8, LIN),
              transform: `translateY(${(1 - p) * 28 - recipientLift[i] * 4}px) scale(${0.94 + 0.06 * p})`,
              boxShadow: shadowCard(recipientLift[i]),
            }}
          >
            <Flag code={r.flag} />
            <div style={{ display: "flex", flexDirection: "column", gap: 1, whiteSpace: "nowrap" }}>
              <p className="font-sans font-semibold text-grey-800" style={{ fontSize: 14, lineHeight: "18px" }}>
                {r.city}
              </p>
              <div className="font-sans text-swag-grey" style={{ display: "grid", fontSize: 12, lineHeight: "16px" }}>
                <p style={{ gridArea: "1 / 1", opacity: 1 - recipientMix[i] }}>{r.rest}</p>
                <p style={{ gridArea: "1 / 1", opacity: recipientMix[i] }}>{r.alt}</p>
              </div>
            </div>
          </div>
        );
      })}

      {/* travelling dots: team → hub, then hub → recipient */}
      {WAVES.map((w, k) => {
        const team = TEAMS[w.team];
        const inU = seg(t, w.start, w.start + IN_TIME, IN_OUT);
        const outU = seg(t, w.start + OUT_START, w.start + OUT_START + OUT_TIME, IN_OUT);
        const a = at(TEAM_PATHS[w.team], inU);
        const b = at(OUT_PATHS[w.to], outU);
        const inVis = seg(t, w.start, w.start + 3, LIN) * (1 - seg(t, w.start + IN_TIME - 2, w.start + IN_TIME + 3, LIN));
        const outVis = seg(t, w.start + OUT_START, w.start + OUT_START + 3, LIN) * (1 - seg(t, w.start + OUT_START + OUT_TIME - 2, w.start + OUT_START + OUT_TIME + 3, LIN));
        return (
          <div key={k}>
            <Dot x={a.x} y={a.y} color={team.dot} opacity={inVis} />
            <Dot x={b.x} y={b.y} color={team.dot} opacity={outVis} />
          </div>
        );
      })}
    </div>
  );
}
