"use client";

/* /the-proof hero visual — "Growth staircase · same admin, growing company"
   (Figma n9SjmDjzB1PeZAYJ5w43fr 5443:23010, visual frame = the 525 × 411 cluster;
   hero-visual-design v2.5, animated). Three Year cards climb a staircase (100 → 350
   → 800 employees, 2 → 4 → 6 programs) while Maya Chen stays the one admin, plus a
   "37+ hours" chip. Pure function of useCurrentFrame().

   STAGE UNITS: bare numbers are stage units, NOT CSS px (design.md → Batch 3).

   TIMELINE (30 fps)
     0 – 96    INTRO: Year 1, Year 2, Year 3 spring in stage by stage; each counter runs
               up once and its program pills pop in; the hours chip lands last and counts
               up. Frame 96 = the Figma frame (also the reduced-motion still).
     96 – 396  LOOP: each year is lit in turn (card lifts, 
               pills pulse in order), the hours chip pulses after each. All values rest
               at both ends (seamless); cards float on whole-cycle sines (±2).
   NO CROP: nothing leaves 0 … STAGE_W. */

import Image from "next/image";
import { useCurrentFrame } from "remotion";

import avatarMaya from "@/public/impact/batch3/avatar-maya.png";

import { INTRO, LIN, SHADOW, bell, bob, capsText, pop, seg, win, SceneHost } from "./shared";

export const STAGE_W = 525;
export const STAGE_H = 411;

type Year = {
  label: string;
  n: number;
  x: number;
  y: number;
  h: number;
  rows: string[][];
  programs: string;
  delay: number;
  s: number;
  bobCycles: number;
  bobAmp: number;
};

const YEARS: Year[] = [
  {
    label: "Year 1", n: 100, x: 0, y: 232, h: 179, rows: [["Snacks", "Swag"]],
    programs: "2 programs", delay: 0, s: 8, bobCycles: 1, bobAmp: -2,
  },
  {
    label: "Year 2", n: 350, x: 64, y: 64, h: 205,
    rows: [["Snacks", "Swag", "Recognition"], ["Gifting"]],
    programs: "4 programs", delay: 14, s: 108, bobCycles: 2, bobAmp: 2,
  },
  {
    label: "Year 3", n: 800, x: 275, y: 0, h: 205,
    rows: [["Snacks", "Swag", "Recognition"], ["Gifting", "Events", "Onboarding"]],
    programs: "6 programs", delay: 28, s: 208, bobCycles: 3, bobAmp: -1.5,
  },
];

function Pill({ text, f, delay, boost }: { text: string; f: number; delay: number; boost: number }) {
  const p = pop(f, delay);
  return (
    <div
      className="bg-chip-surface text-grey-800"
      style={{
        height: 20,
        boxSizing: "border-box",
        padding: "3px 8px",
        borderRadius: 100,
        fontSize: 11,
        lineHeight: "14px",
        fontWeight: 600,
        whiteSpace: "nowrap",
        opacity: seg(f, delay, delay + 6, LIN),
        transform: `scale(${(0.8 + 0.2 * p) * (1 + 0.07 * boost)})`,
      }}
    >
      {text}
    </div>
  );
}

function YearCard({ y, f, lt }: { y: Year; f: number; lt: number }) {
  const p = pop(f, y.delay);
  const lift = win(lt, y.s, y.s + 8, y.s + 58, y.s + 70);
  const intro = seg(f, y.delay + 4, y.delay + 52);
  const count = Math.round(y.n * intro);
  const float = bob(f, y.bobCycles, y.bobAmp);
  let pillIndex = 0;
  return (
    <div
      className="bg-white"
      style={{
        position: "absolute",
        left: y.x,
        top: y.y,
        width: 250,
        height: y.h,
        boxSizing: "border-box",
        padding: 16,
        borderRadius: 16,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        opacity: seg(f, y.delay, y.delay + 8, LIN),
        transform: `translateY(${(1 - p) * 28 - lift * 5 + float}px) scale(${0.94 + 0.06 * p})`,
        boxShadow: SHADOW(lift),
      }}
    >
      <p className="text-canvas-muted" style={capsText}>
        {y.label}
      </p>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 46 }}>
        {/* the final value sizes the box (invisible), so the gap to "employees" is the same on every card */}
        <p
          className="font-display text-grey-800"
          style={{ position: "relative", fontSize: 42, lineHeight: "46px", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}
        >
          <span style={{ visibility: "hidden" }}>{y.n}</span>
          <span style={{ position: "absolute", left: 0, top: 0 }}>{count}</span>
        </p>
        <p className="text-grey-600" style={{ fontSize: 12, lineHeight: "16px", paddingBottom: 6, whiteSpace: "nowrap" }}>
          employees
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {y.rows.map((row, r) => (
          <div key={r} style={{ display: "flex", gap: 6 }}>
            {row.map((t) => {
              const i = pillIndex++;
              return (
                <Pill
                  key={t}
                  text={t}
                  f={f}
                  delay={y.delay + 24 + i * 4}
                  boost={bell(lt, y.s + 6 + i * 4, y.s + 22 + i * 4)}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="bg-grey-200" style={{ height: 1, flexShrink: 0 }} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 27 }}>
        <Image
          src={avatarMaya}
          alt=""
          sizes="1.5rem"
          quality={90}
          style={{ width: 22, height: 22, borderRadius: "50%", display: "block", maxWidth: "none" }}
        />
        <div style={{ display: "flex", flexDirection: "column", whiteSpace: "nowrap" }}>
          <p className="text-grey-800" style={{ fontSize: 11, lineHeight: "14px", fontWeight: 600 }}>
            Maya Chen
          </p>
          <p className="text-canvas-muted" style={{ fontSize: 10, lineHeight: "13px" }}>
            Still 1 admin
          </p>
        </div>
        <p className="text-grey-600" style={{ fontSize: 11, lineHeight: "14px", fontWeight: 600, whiteSpace: "nowrap" }}>
          {y.programs}
        </p>
      </div>
    </div>
  );
}

function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="stroke-canvas-check" style={{ display: "block" }}>
      <circle cx="12" cy="12" r="10" strokeWidth="2" />
      <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TheProofGrowthScene() {
  const f = useCurrentFrame();
  const lt = Math.max(0, f - INTRO);

  const chipDelay = 44;
  const cp = pop(f, chipDelay);
  const hours = Math.round(37 * seg(f, chipDelay + 4, chipDelay + 52));
  /* the chip pulses after each year is lit */
  const pulse = YEARS.reduce((a, y) => a + bell(lt, y.s + 40, y.s + 62), 0);
  const chipLift = Math.min(1, pulse);

  return (
    <div className="font-sans text-grey-800" style={{ position: "relative", width: STAGE_W, height: STAGE_H }}>
      {YEARS.map((y) => (
        <YearCard key={y.label} y={y} f={f} lt={lt} />
      ))}

      <div
        className="bg-white"
        style={{
          position: "absolute",
          left: 346,
          top: 347,
          width: 179,
          height: 64,
          boxSizing: "border-box",
          padding: "12px 14px",
          borderRadius: 14,
          display: "flex",
          alignItems: "center",
          gap: 12,
          opacity: seg(f, chipDelay, chipDelay + 8, LIN),
          transform: `translateY(${(1 - cp) * 24 - chipLift * 3 + bob(f, 2, 1.5)}px) scale(${0.94 + 0.06 * cp})`,
          boxShadow: SHADOW(chipLift),
        }}
      >
        <div
          className="bg-canvas-green"
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transform: `scale(${1 + 0.12 * chipLift})`,
          }}
        >
          <ClockIcon />
        </div>
        <div style={{ display: "flex", flexDirection: "column", whiteSpace: "nowrap" }}>
          <p className="font-display text-grey-800" style={{ fontSize: 22, lineHeight: "26px", fontVariantNumeric: "tabular-nums" }}>
            {hours}+ hours
          </p>
          <p className="text-grey-600" style={{ fontSize: 11, lineHeight: "14px" }}>
            of admin work saved
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TheProofGrowth() {
  return <SceneHost scene={TheProofGrowthScene} width={STAGE_W} height={STAGE_H} />;
}
