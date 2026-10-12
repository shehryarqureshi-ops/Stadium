"use client";

/* /enterprise hero visual — "Run-on tiers · programs on controls on infrastructure"
   (Figma n9SjmDjzB1PeZAYJ5w43fr 5466:24113, visual frame = the 580 × 390 cluster;
   hero-visual-design v2.5, animated). Three stacked tiers: team programs on top, company
   controls in the middle, enterprise infrastructure as the foundation. Pure function of
   useCurrentFrame().

   STAGE UNITS: bare numbers are stage units, NOT CSS px (design.md → Batch 3).

   TIMELINE (30 fps)
     0 – 96    INTRO: the programs tier springs in and its four tiles settle (the
               "38 programs live" count runs), then the controls tier with its chips,
               then the infrastructure foundation with its chips. Frame 96 = the Figma
               frame (also the reduced-motion still).
     96 – 396  LOOP: each program tile is lit in turn and the pulse travels down —
               program k → control chip k → infrastructure chip k (chips ring and lift,
               icons nudge). All values rest at both ends (seamless); tiers float on
               whole-cycle sines (±1.5). */

import Image from "next/image";
import type { ReactNode } from "react";
import { useCurrentFrame } from "remotion";

import photoCap from "@/public/impact/batch3/photo-cap.jpg";
import photoGift from "@/public/impact/batch3/photo-gift.jpg";
import photoHoodie from "@/public/impact/batch3/photo-hoodie.jpg";
import photoSnacks from "@/public/impact/batch3/photo-snacks.jpg";
import stadiumMark from "@/public/impact/batch3/stadium-mark.svg";

import { INTRO, LIN, SHADOW, bell, bob, capsText, pop, seg, win, SceneHost } from "./shared";

export const STAGE_W = 580;
export const STAGE_H = 390;

/** Loop: program k starts at S[k] (loop frames). */
const S = [10, 80, 150, 220] as const;

/* ───────────── icons (feather-style, 24 viewBox, stroke 2) ───────────── */

const ICONS: Record<string, ReactNode> = {
  key: <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />,
  users: (
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  dollar: (
    <>
      <path d="M12 1v22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </>
  ),
  check: (
    <>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="M22 4 12 14.01l-3-3" />
    </>
  ),
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  database: (
    <>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </>
  ),
  lock: (
    <>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </>
  ),
  eye: (
    <>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
};

function Icon({ name, scale = 1 }: { name: string; scale?: number }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "block", flexShrink: 0, transform: `scale(${scale})` }}
    >
      {ICONS[name]}
    </svg>
  );
}

/* ───────────── parts ───────────── */

function Chip({
  w,
  icon,
  text,
  f,
  delay,
  lit,
}: {
  w: number;
  icon: string;
  text: string;
  f: number;
  delay: number;
  lit: number;
}) {
  const p = pop(f, delay);
  return (
    <div
      className="text-grey-800"
      style={{
        width: w,
        height: 30,
        boxSizing: "border-box",
        padding: "8px 10px",
        borderRadius: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        flexShrink: 0,
        whiteSpace: "nowrap",
        fontSize: 11,
        lineHeight: "14px",
        fontWeight: 600,
        backgroundColor: `color-mix(in srgb, #ffffff ${Math.round(lit * 100)}%, #f3f3f5)`,
        boxShadow: `inset 0 0 0 1px rgba(24, 24, 24, ${0.85 * lit}), 0px ${3 * lit}px ${8 * lit}px 0px rgba(0, 0, 0, ${0.14 * lit})`,
        opacity: seg(f, delay, delay + 6, LIN),
        transform: `translateY(${(1 - p) * 10 - lit * 1.5}px) scale(${0.92 + 0.08 * p})`,
      }}
    >
      <Icon name={icon} scale={1 + 0.15 * lit} />
      {text}
    </div>
  );
}

const PROGRAMS = [
  { team: "HR", label: "Welcome kits", tint: "bg-canvas-lilac", photo: photoHoodie, cover: false },
  { team: "Marketing", label: "Summit swag", tint: "bg-canvas-pink", photo: photoCap, cover: false },
  { team: "Sales", label: "Client gifts", tint: "bg-canvas-blue", photo: photoGift, cover: true },
  { team: "CX", label: "Snack boxes", tint: "bg-canvas-green", photo: photoSnacks, cover: false },
] as const;

function Program({ k, f, lit }: { k: number; f: number; lit: number }) {
  const P = PROGRAMS[k];
  const delay = 10 + k * 5;
  const p = pop(f, delay);
  return (
    <div
      style={{
        width: 98,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 7,
        opacity: seg(f, delay, delay + 8, LIN),
        transform: `translateY(${(1 - p) * 14 - lit * 3}px)`,
      }}
    >
      <div
        className="bg-chip-surface"
        style={{
          width: 98,
          height: 82,
          borderRadius: 12,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {P.cover ? (
          <div style={{ width: 98, height: 82, transform: `scale(${(0.9 + 0.1 * Math.min(1, p)) * (1 + 0.06 * lit)})` }}>
            <Image
              src={P.photo}
              alt=""
              sizes="6.125rem"
              quality={90}
              style={{ width: 98, height: 82, objectFit: "cover", display: "block", maxWidth: "none" }}
            />
          </div>
        ) : (
          <div
            style={{
              width: 66,
              height: 66,
              mixBlendMode: "multiply",
              transform: `scale(${(0.88 + 0.12 * Math.min(1, p)) * (1 + 0.07 * lit)})`,
            }}
          >
            <Image
              src={P.photo}
              alt=""
              sizes="4.125rem"
              quality={90}
              style={{ width: 66, height: 66, objectFit: "contain", display: "block", maxWidth: "none" }}
            />
          </div>
        )}
      </div>
      <div
        className={`${P.tint} text-grey-800`}
        style={{ alignSelf: "flex-start", height: 19, boxSizing: "border-box", padding: "3px 8px", borderRadius: 100, ...capsText }}
      >
        {P.team}
      </div>
      <p className="text-grey-800" style={{ fontSize: 12, lineHeight: "16px", fontWeight: 600, whiteSpace: "nowrap" }}>
        {P.label}
      </p>
    </div>
  );
}

function Tier({
  x,
  y,
  w,
  h,
  pad,
  gap,
  delay,
  lift,
  float,
  f,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  pad: number;
  gap: number;
  delay: number;
  lift: number;
  float: number;
  f: number;
  children: ReactNode;
}) {
  const p = pop(f, delay);
  return (
    <div
      className="bg-white"
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        boxSizing: "border-box",
        padding: pad,
        borderRadius: 16,
        display: "flex",
        flexDirection: "column",
        gap,
        opacity: seg(f, delay, delay + 8, LIN),
        transform: `translateY(${(1 - p) * 28 - lift * 2 + float}px) scale(${0.95 + 0.05 * p})`,
        boxShadow: SHADOW(lift),
      }}
    >
      {children}
    </div>
  );
}

const CONTROLS = [
  { icon: "key", text: "SSO" },
  { icon: "users", text: "Roles" },
  { icon: "dollar", text: "Budgets" },
  { icon: "check", text: "Approvals" },
] as const;

const FOUNDATION = [
  { icon: "shield", text: "SOC 2 Type 2" },
  { icon: "database", text: "AES-256" },
  { icon: "lock", text: "TLS 1.3" },
  { icon: "eye", text: "24/7 monitoring" },
] as const;

export function EnterpriseTiersScene() {
  const f = useCurrentFrame();
  const lt = Math.max(0, f - INTRO);

  /* loop: program k → controls chip k → infrastructure chip k */
  const progLit = [0, 0, 0, 0];
  const ctrlLit = [0, 0, 0, 0];
  const infraLit = [0, 0, 0, 0];
  let livePulse = 0;
  let discPulse = 0;
  S.forEach((s, k) => {
    progLit[k] = win(lt, s, s + 8, s + 28, s + 40);
    ctrlLit[k] = win(lt, s + 22, s + 30, s + 44, s + 54);
    infraLit[k] = win(lt, s + 38, s + 46, s + 60, s + 70);
    livePulse += bell(lt, s + 2, s + 18);
    discPulse += bell(lt, s + 40, s + 62);
  });
  const sum = (a: number[]) => Math.min(1, a.reduce((x, y) => x + y, 0));
  const tierLift = [sum(progLit), sum(ctrlLit), sum(infraLit)];

  const live = Math.round(38 * seg(f, 14, 58));
  const disc = Math.min(1, discPulse);

  return (
    <div className="font-sans text-grey-800" style={{ position: "relative", width: STAGE_W, height: STAGE_H }}>
      {/* tier · teams run their programs */}
      <Tier x={60} y={0} w={460} h={197} pad={16} gap={12} delay={0} lift={tierLift[0] * 0.5} float={bob(f, 1, -1.5)} f={f}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 22 }}>
          <p className="text-grey-600" style={capsText}>
            Teams run their programs
          </p>
          <div
            className="bg-chip-surface text-grey-800"
            style={{
              width: 106,
              height: 22,
              boxSizing: "border-box",
              padding: "4px 10px",
              borderRadius: 100,
              fontSize: 11,
              lineHeight: "14px",
              fontWeight: 600,
              whiteSpace: "nowrap",
              fontVariantNumeric: "tabular-nums",
              transform: `scale(${1 + 0.06 * Math.min(1, livePulse)})`,
              transformOrigin: "right center",
            }}
          >
            {live} programs live
          </div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {PROGRAMS.map((_, k) => (
            <Program key={k} k={k} f={f} lit={progLit[k]} />
          ))}
        </div>
      </Tier>

      {/* tier · company controls */}
      <Tier x={30} y={207} w={520} h={81} pad={14} gap={10} delay={28} lift={tierLift[1] * 0.5} float={bob(f, 2, 1.5)} f={f}>
        <p className="text-grey-600" style={capsText}>
          On company controls
        </p>
        <div style={{ display: "flex", gap: 8 }}>
          {CONTROLS.map((c, k) => (
            <Chip key={c.text} w={117} icon={c.icon} text={c.text} f={f} delay={38 + k * 3} lit={ctrlLit[k]} />
          ))}
        </div>
      </Tier>

      {/* tier · enterprise infrastructure */}
      <Tier x={0} y={298} w={580} h={92} pad={14} gap={10} delay={50} lift={tierLift[2] * 0.5} float={bob(f, 1, 1.5)} f={f}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, height: 24 }}>
          <div
            className="bg-white"
            style={{
              position: "relative",
              width: 24,
              height: 24,
              borderRadius: "50%",
              flexShrink: 0,
              boxShadow: "0px 2.2px 6.5px 0px rgba(0, 0, 0, 0.25)",
              transform: `scale(${1 + 0.18 * disc})`,
            }}
          >
            <Image
              src={stadiumMark}
              alt=""
              style={{ position: "absolute", left: 8, top: 7, width: 6.2, height: "auto", display: "block", maxWidth: "none" }}
            />
          </div>
          <p className="text-grey-600" style={capsText}>
            On enterprise infrastructure
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {FOUNDATION.map((c, k) => (
            <Chip key={c.text} w={132} icon={c.icon} text={c.text} f={f} delay={58 + k * 3} lit={infraLit[k]} />
          ))}
        </div>
      </Tier>
    </div>
  );
}

export default function EnterpriseTiers() {
  return <SceneHost scene={EnterpriseTiersScene} width={STAGE_W} height={STAGE_H} />;
}
