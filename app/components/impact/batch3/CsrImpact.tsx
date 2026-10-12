"use client";

/* /csr hero visual — "One send with its impact attached" (Figma
   n9SjmDjzB1PeZAYJ5w43fr 5443:23467, visual frame = the 580 × 324 graphic
   cluster, flush right; hero-visual-design v2.5, animated). A welcome-hoodie
   product card with a "Better choice" badge, four impact cards and a stat card.
   Pure function of the frame.

   STAGE UNITS: bare numbers in style objects are stage units, not CSS px (see
   design.md → "Batch 3 hero visuals"). Colours and fonts come from tokens.

   TIMELINE (30 fps)
     0 – 96     INTRO: the product card lands, the hoodie photo settles, the badge
                pops, the four impact cards grow in from the right edge one by one
                while their check strokes draw, the stat card lands and counts
                0 → 62. Frame 96 = the Figma frame (also the reduced-motion still).
     96 – 396   LOOP: each impact card lifts in turn (check pulses) while the hoodie
                photo breathes (≤ 1.05), then the stat card pulses once. Everything
                is at its rest pose at both loop ends.

   NO CROP: nothing leaves 0 … STAGE_W — the impact cards enter by growing from
   their right edge (scaleX) instead of translating in from outside. */

import Image from "next/image";
import { useCurrentFrame } from "remotion";

import photoHoodie from "@/public/impact/batch3/photo-hoodie-big.jpg";

import { INTRO, LIN, LOOP, SHADOW, SceneHost, bell, bob, pop, seg, win } from "./shared";

export const STAGE_W = 580;
export const STAGE_H = 324;

type IconName = "refresh" | "pin" | "package" | "heart";

const IMPACTS: { icon: IconName; title: string; sub: string }[] = [
  { icon: "refresh", title: "Made to order", sub: "No overstock, nothing wasted" },
  { icon: "pin", title: "Fulfilled locally", sub: "Printed in Berlin, 9 km away" },
  { icon: "package", title: "Recycled packaging", sub: "Plastic-free mailer" },
  { icon: "heart", title: "Supports social impact", sub: "1% donated to Open Doors" },
];
const IMPACT_Y = [18, 80, 142, 204] as const;

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

function ImpactIcon({ name }: { name: IconName }) {
  const c = "stroke-grey-800";
  switch (name) {
    case "refresh":
      return (
        <Icon size={16} className={c}>
          <path d="M23 4v6h-6" />
          <path d="M1 20v-6h6" />
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
        </Icon>
      );
    case "pin":
      return (
        <Icon size={16} className={c}>
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </Icon>
      );
    case "package":
      return (
        <Icon size={16} className={c}>
          <path d="M16.5 9.4 7.5 4.21" />
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <path d="M3.27 6.96 12 12.01l8.73-5.05" />
          <path d="M12 22.08V12" />
        </Icon>
      );
    case "heart":
      return (
        <Icon size={16} className={c}>
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </Icon>
      );
  }
}

function CheckCircle({ draw, pulse }: { draw: number; pulse: number }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "block", flexShrink: 0, transform: `scale(${1 + 0.3 * pulse})` }}
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

/* ───────────── impact card ───────────── */

function ImpactCard({
  k,
  f,
  lift,
  pulse,
  bobY,
}: {
  k: number;
  f: number;
  lift: number;
  pulse: number;
  bobY: number;
}) {
  const I = IMPACTS[k];
  const delay = 14 + k * 10;
  const p = pop(f, delay);
  return (
    <div
      className="bg-white"
      style={{
        position: "absolute",
        left: 250,
        top: IMPACT_Y[k],
        width: 330,
        height: 54,
        boxSizing: "border-box",
        padding: "11px 14px",
        borderRadius: 14,
        display: "flex",
        alignItems: "center",
        gap: 12,
        opacity: seg(f, delay, delay + 8, LIN),
        transformOrigin: "100% 50%",
        transform: `translateY(${-lift * 4 + bobY}px) scaleX(${0.8 + 0.2 * p})`,
        boxShadow: SHADOW(lift),
      }}
    >
      <div
        className="bg-chip-surface"
        style={{
          width: 32,
          height: 32,
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <ImpactIcon name={I.icon} />
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 1, whiteSpace: "nowrap" }}>
        <p className="text-grey-800" style={{ fontSize: 13, lineHeight: "17px", fontWeight: 600 }}>
          {I.title}
        </p>
        <p className="text-swag-grey" style={{ fontSize: 11, lineHeight: "14px" }}>
          {I.sub}
        </p>
      </div>
      <CheckCircle draw={seg(f, delay + 10, delay + 26, LIN)} pulse={pulse} />
    </div>
  );
}

/* ───────────── scene ───────────── */

export function CsrImpactScene() {
  const f = useCurrentFrame();
  const lt = Math.max(0, f - INTRO);

  const bobProduct = bob(f, 1, -1.5);
  const bobImpact = [bob(f, 2, 1.5), bob(f, 1, -1.5), bob(f, 2, -1.5), bob(f, 1, 1.5)];
  const bobStat = bob(f, 2, 1.5);

  /* loop: impact cards lift in turn; photo breathes; stat pulses once */
  const lift = [0, 0, 0, 0];
  const pulse = [0, 0, 0, 0];
  [10, 56, 102, 148].forEach((s, k) => {
    lift[k] = win(lt, s, s + 10, s + 30, s + 42);
    pulse[k] = bell(lt, s + 6, s + 30);
  });
  const breathe = 0.025 * (1 - Math.cos((2 * Math.PI * 2 * lt) / LOOP)); // 0 … 0.05, whole cycles
  const statPulse = bell(lt, 224, 262);

  /* intro */
  const prodP = pop(f, 0);
  const photoP = pop(f, 8);
  const badgeP = pop(f, 22);
  const statP = pop(f, 56);
  const count = Math.round(62 * seg(f, 58, 88));

  return (
    <div className="font-sans text-grey-800" style={{ position: "relative", width: STAGE_W, height: STAGE_H }}>
      {/* card · welcome hoodie */}
      <div
        className="bg-white"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 300,
          height: 312,
          boxSizing: "border-box",
          padding: 14,
          borderRadius: 16,
          opacity: seg(f, 0, 8, LIN),
          transform: `translateY(${(1 - prodP) * 28 + bobProduct}px) scale(${0.96 + 0.04 * prodP})`,
          boxShadow: SHADOW(0),
        }}
      >
        <div
          className="bg-chip-surface"
          style={{
            position: "relative",
            width: 272,
            height: 236,
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 210,
              height: 210,
              mixBlendMode: "multiply",
              opacity: seg(f, 8, 18, LIN),
              transform: `scale(${(0.9 + 0.1 * Math.min(1, photoP)) * (1 + breathe)})`,
            }}
          >
            <Image
              src={photoHoodie}
              alt=""
              sizes="13.125rem"
              quality={90}
              style={{ width: 210, height: 210, objectFit: "contain", display: "block", maxWidth: "none" }}
            />
          </div>
          <div
            className="bg-canvas-green"
            style={{
              position: "absolute",
              left: 12,
              top: 12,
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 10px",
              borderRadius: 100,
              opacity: seg(f, 22, 28, LIN),
              transformOrigin: "left center",
              transform: `scale(${0.8 + 0.2 * badgeP})`,
            }}
          >
            <Icon size={12} className="stroke-canvas-check">
              <path
                d="M20 6 9 17l-5-5"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - seg(f, 28, 40, LIN)}
              />
            </Icon>
            <p className="text-grey-800" style={{ fontSize: 11, lineHeight: "14px", fontWeight: 600, whiteSpace: "nowrap" }}>
              Better choice
            </p>
          </div>
        </div>
        <div style={{ position: "absolute", left: 14, top: 262, display: "flex", flexDirection: "column", gap: 1 }}>
          <p className="font-display text-grey-800" style={{ fontSize: 17, lineHeight: "21px", whiteSpace: "nowrap" }}>
            Welcome hoodie
          </p>
          <p className="text-swag-grey" style={{ fontSize: 11, lineHeight: "14px", whiteSpace: "nowrap" }}>
            For 40 new hires
          </p>
        </div>
      </div>

      {/* impact cards */}
      {IMPACTS.map((_, k) => (
        <ImpactCard key={k} k={k} f={f} lift={lift[k]} pulse={pulse[k]} bobY={bobImpact[k]} />
      ))}

      {/* stat · shorter delivery */}
      <div
        className="bg-white"
        style={{
          position: "absolute",
          left: 250,
          top: 266,
          width: 330,
          height: 58,
          boxSizing: "border-box",
          padding: "12px 14px",
          borderRadius: 14,
          display: "flex",
          alignItems: "center",
          gap: 12,
          opacity: seg(f, 56, 64, LIN),
          transformOrigin: "100% 50%",
          transform: `translateY(${bobStat}px) scaleX(${0.8 + 0.2 * statP}) scale(${1 + 0.03 * statPulse})`,
          boxShadow: SHADOW(statPulse),
        }}
      >
        <div
          className="bg-canvas-green"
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon size={17} className="stroke-canvas-check" style={{ transform: `scale(${1 + 0.15 * statPulse})` }}>
            <path d="M23 18 13.5 8.5l-5 5L1 6" />
            <path d="M17 18h6v-6" />
          </Icon>
        </div>
        <div style={{ display: "flex", flexDirection: "column", whiteSpace: "nowrap" }}>
          <p
            className="font-display text-grey-800"
            style={{ fontSize: 15, lineHeight: "19px", fontVariantNumeric: "tabular-nums" }}
          >
            {count}% shorter delivery distance
          </p>
          <p className="text-swag-grey" style={{ fontSize: 10, lineHeight: "13px" }}>
            than shipping from a central warehouse
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CsrImpact() {
  return <SceneHost scene={CsrImpactScene} width={STAGE_W} height={STAGE_H} />;
}
