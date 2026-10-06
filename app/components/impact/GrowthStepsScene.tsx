"use client";

/* /impact/cx hero visual — "Growth steps" (Figma n9SjmDjzB1PeZAYJ5w43fr 5212:17243,
   visual frame 5212:17955, 592 × 441 = the graphic cluster itself, flush to the
   Talk-to-sales edge and top-aligned with the copy; hero-visual-design v2.5).
   Five photo tiles climb left to right — Onboarding → Milestone → Thank-you →
   Renewal → Loyalty — each a real gift, standing on one Stadium bar.

   STAGE UNITS. Authored on a fixed 592 × 441 stage that the Remotion Player scales
   to its container, so bare numbers in style objects are stage units, NOT CSS px
   (see design.md → "/impact/cx hero"). Colours and fonts still come from tokens.

   TIMELINE (30 fps)
     0 – 96     INTRO: the Stadium bar pops, then the five tiles rise out from behind it
                one after another (a spring each, photos settling in), their stems grow
                and the "Renewals up" chip counts 0 → 12%. Frame 96 is exactly the Figma
                frame → also the still for prefers-reduced-motion.
     96 – 396   LOOP (300 frames): a gift pulse climbs each stem from the bar in turn
                (Stadium pulses, the tile lifts and its photo breathes), left → right,
                the chip pulses with Renewal. Every value is at its Figma rest pose at
                both loop ends (seamless) and each tile floats on a whole-cycle sine.

   NO CROP. overflowVisible on the Player; every moving thing stays inside 0 … STAGE_W
   (tiles never move more than a few units from their rest). */

import Image from "next/image";
import { Easing, interpolate, spring, useCurrentFrame } from "remotion";

import photoLoyalty from "@/public/impact/cx/hero/photo-loyalty.jpg";
import photoMilestone from "@/public/impact/cx/hero/photo-milestone.jpg";
import photoOnboarding from "@/public/impact/cx/hero/photo-onboarding.jpg";
import photoRenewal from "@/public/impact/cx/hero/photo-renewal.jpg";
import photoThankyou from "@/public/impact/cx/hero/photo-thankyou.jpg";
import stadiumMark from "@/public/impact/cx/hero/stadium-mark.svg";

export const STAGE_W = 592;
export const STAGE_H = 441;
export const FPS = 30;
export const INTRO = 96;
const LOOP = 300;
export const DURATION = INTRO + LOOP;

/* ───────────── motion helpers ───────────── */

const OUT = Easing.bezier(0.22, 1, 0.36, 1);
const IN_OUT = Easing.inOut(Easing.cubic);
const LIN = (x: number) => x;

const seg = (f: number, from: number, to: number, easing: (t: number) => number = OUT) =>
  interpolate(f, [from, to], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing });

const pop = (f: number, delay: number, damping = 15) =>
  spring({ frame: f - delay, fps: FPS, config: { damping, stiffness: 150, mass: 0.7 } });

/** 0 → 1 → 0 bell over [a, b]. */
const bell = (f: number, a: number, b: number) => Math.sin(Math.PI * seg(f, a, b, LIN));

/** Whole-cycle float; ramps in with the intro's last frames. */
const bob = (f: number, cycles: number, amp: number) =>
  seg(f, 56, INTRO, LIN) * Math.sin((2 * Math.PI * cycles * (f - INTRO)) / LOOP) * amp;

/* ───────────── layout (Figma, visual-local) ───────────── */

const TILE_W = 108;
const GAP = 13;
const BASE = 368; // tiles stand on this line; stems run BASE → BAR_TOP
const BAR_TOP = 384;
const BAR_H = 57;
const STEM = BAR_TOP - BASE;

const MOMENTS = [
  { when: "Day 1", name: "Onboarding", caption: "Welcome kit", h: 176, photo: photoOnboarding },
  { when: "Day 90", name: "Milestone", caption: "First-quarter gift", h: 224, photo: photoMilestone },
  { when: "Month 6", name: "Thank-you", caption: "Snack box", h: 272, photo: photoThankyou },
  { when: "Month 11", name: "Renewal", caption: "Renewal perk", h: 320, photo: photoRenewal },
  { when: "Year 2", name: "Loyalty", caption: "VIP gift", h: 368, photo: photoLoyalty },
] as const;

/* intro: bar at 0, tiles at 10 + 10·i; loop: pulse i starts at 20 + 50·i (loop frames) */
const introDelay = (i: number) => 10 + 10 * i;
const pulseStart = (i: number) => 20 + 50 * i;
const PULSE = 44; // frames per pulse

/* ───────────── scene ───────────── */

function Tile({ i, f, lt }: { i: number; f: number; lt: number }) {
  const m = MOMENTS[i];
  const delay = introDelay(i);
  const p = pop(f, delay, 17);
  const t = lt - pulseStart(i);
  const live = bell(t, 6, PULSE); // tile "lit" while its pulse is active
  const settle = 1 + 0.06 * (1 - seg(f, delay, delay + 26)) + 0.05 * live;
  const left = i * (TILE_W + GAP);

  return (
    <div
      className="bg-white"
      style={{
        position: "absolute",
        left,
        top: BASE - m.h,
        width: TILE_W,
        height: m.h,
        padding: 8,
        boxSizing: "border-box",
        borderRadius: 18,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        opacity: seg(f, delay, delay + 8, LIN),
        transform: `translateY(${(1 - p) * 64 - live * 5 + bob(f, i % 2 === 0 ? 1 : 2, 2)}px)`,
        boxShadow: `0px ${14 + 6 * live}px ${34 + 8 * live}px 0px rgba(0, 0, 0, ${0.36 + 0.08 * live})`,
      }}
    >
      <div
        className="bg-chip-surface"
        style={{ position: "relative", width: 92, height: m.h - 74, borderRadius: 12, overflow: "hidden", flexShrink: 0 }}
      >
        <div style={{ position: "absolute", inset: 0, transform: `scale(${settle})`, mixBlendMode: "multiply" }}>
          <Image src={m.photo} alt="" fill sizes="6rem" quality={90} style={{ objectFit: "cover" }} />
        </div>
      </div>
      <div style={{ height: 50, display: "flex", flexDirection: "column", gap: 1 }}>
        <span
          className="text-canvas-muted"
          style={{ fontSize: 10, lineHeight: "14px", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", whiteSpace: "nowrap" }}
        >
          {m.when}
        </span>
        <span className="text-grey-800" style={{ fontSize: 12, lineHeight: "16px", fontWeight: 600, whiteSpace: "nowrap" }}>
          {m.name}
        </span>
        <span className="text-swag-grey" style={{ fontSize: 10, lineHeight: "13px", whiteSpace: "nowrap" }}>
          {m.caption}
        </span>
      </div>
    </div>
  );
}

function Stem({ i, f, lt }: { i: number; f: number; lt: number }) {
  const delay = introDelay(i);
  const grow = seg(f, delay + 8, delay + 20);
  /* gift pulse: a green dot climbs the stem from the bar to the tile */
  const t = lt - pulseStart(i);
  const climb = seg(t, 0, 10, IN_OUT);
  const dotOn = t >= 0 && t <= 12;
  return (
    <>
      <div
        className="bg-white"
        style={{
          position: "absolute",
          left: i * (TILE_W + GAP) + TILE_W / 2 - 1,
          top: BASE,
          width: 2,
          height: STEM,
          opacity: 0.55,
          transformOrigin: "50% 100%",
          transform: `scaleY(${grow})`,
        }}
      />
      <div
        className="bg-signal-green"
        style={{
          position: "absolute",
          left: i * (TILE_W + GAP) + TILE_W / 2 - 4,
          top: BAR_TOP - 4 - (STEM + 2) * climb,
          width: 8,
          height: 8,
          borderRadius: "50%",
          opacity: dotOn ? 1 - seg(t, 9, 12, LIN) : 0,
          boxShadow: "0px 0px 8px 0px rgba(47, 166, 79, 0.55)",
        }}
      />
    </>
  );
}

export function GrowthStepsScene() {
  const f = useCurrentFrame();
  const lt = Math.max(0, f - INTRO);

  /* Stadium disc pulses whenever any pulse leaves the bar */
  const discPulse = MOMENTS.reduce((acc, _, i) => Math.max(acc, bell(lt - pulseStart(i), 0, 10)), 0);
  const chipPulse = bell(lt - pulseStart(3), 14, 40);
  const renewals = Math.round(12 * seg(f, 56, 90));
  const barP = pop(f, 0);

  return (
    <div style={{ position: "relative", width: STAGE_W, height: STAGE_H }}>
      {MOMENTS.map((_, i) => (
        <Tile key={i} i={i} f={f} lt={lt} />
      ))}
      {MOMENTS.map((_, i) => (
        <Stem key={i} i={i} f={f} lt={lt} />
      ))}

      {/* Stadium bar */}
      <div
        className="bg-white"
        style={{
          position: "absolute",
          left: 0,
          top: BAR_TOP,
          width: STAGE_W,
          height: BAR_H,
          boxSizing: "border-box",
          padding: "12px 16px",
          borderRadius: 18,
          display: "flex",
          alignItems: "center",
          gap: 12,
          opacity: seg(f, 0, 8, LIN),
          transform: `translateY(${(1 - barP) * 24}px) scale(${0.96 + 0.04 * barP})`,
          boxShadow: "0px 14px 34px 0px rgba(0, 0, 0, 0.36)",
        }}
      >
        <div
          className="bg-white"
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${1 + 0.12 * discPulse})`,
            boxShadow: "0px 2px 8px 0px rgba(0, 0, 0, 0.16)",
          }}
        >
          <Image src={stadiumMark} alt="" style={{ width: 9.5, height: "auto", display: "block" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span className="text-grey-800" style={{ fontSize: 13, lineHeight: "17px", fontWeight: 600 }}>
            Stadium
          </span>
          <span className="text-swag-grey" style={{ fontSize: 12, lineHeight: "16px", whiteSpace: "nowrap" }}>
            Every moment on one customer record
          </span>
        </div>
        <div style={{ flex: 1 }} />
        <div
          className="bg-canvas-green text-canvas-check"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 10px",
            borderRadius: 100,
            transform: `scale(${1 + 0.06 * chipPulse})`,
            transformOrigin: "100% 50%",
          }}
        >
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
          </svg>
          <span style={{ fontSize: 11, lineHeight: "14px", fontWeight: 700, whiteSpace: "nowrap" }}>Renewals up {renewals}%</span>
        </div>
      </div>
    </div>
  );
}
