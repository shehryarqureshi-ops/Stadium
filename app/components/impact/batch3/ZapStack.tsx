"use client";

/* /integrations/zapier hero visual — "Zap stack" (Figma n9SjmDjzB1PeZAYJ5w43fr
   5443:23325, hero-visual-design v2.5, animated). One expanded Zap (trigger → action)
   over two collapsed Zaps, each ending in a points outcome. Pure function of the frame.

   STAGE UNITS. 580 × 363 stage (the cluster itself, flush right). Bare numbers = stage
   units, not CSS px. Coordinates are the Figma visual-frame coordinates 1:1.

   TIMELINE (30 fps)
     0 – 96   INTRO: the expanded card lands, the trigger and action steps reveal, the
              connector draws, toggles flip on, the collapsed cards pop and their run
              counts count up. Frame 96 = the Figma frame (also the reduced-motion still).
     96 – 396 LOOP: two run cycles. The trigger step lights, a packet runs down the link
              to the action, the action lights, the status dot and the "Last run" line
              pulse, then the two collapsed Zaps' outcome chips pulse in turn. Every value
              is at rest at both ends; counters hold their final numbers. */

import Image from "next/image";
import { useCurrentFrame } from "remotion";

import avatarAlex from "@/public/impact/batch3/avatar-alex.png";
import stadiumMark from "@/public/impact/batch3/stadium-mark.svg";

import { bell, bob, capsText, IN_OUT, INTRO, LIN, pop, SceneHost, seg, SHADOW, win } from "./shared";

export const STAGE_W = 580;
export const STAGE_H = 363;

/** Loop-local start frames of the two run cycles. */
const CYCLES = [10, 160] as const;

/* ───────────── icons (feather-style, 24 viewBox) ───────────── */

function Icon({ size, stroke, children }: { size: number; stroke: string; children: React.ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={stroke} style={{ display: "block", flexShrink: 0 }}>
      {children}
    </svg>
  );
}

const Briefcase = ({ size }: { size: number }) => (
  <Icon size={size} stroke="stroke-grey-800">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </Icon>
);
const Headphones = ({ size }: { size: number }) => (
  <Icon size={size} stroke="stroke-grey-800">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </Icon>
);
const Star = ({ size }: { size: number }) => (
  <Icon size={size} stroke="stroke-grey-800">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </Icon>
);
const ArrowRight = ({ size }: { size: number }) => (
  <Icon size={size} stroke="stroke-grey-600">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </Icon>
);

/* ───────────── parts ───────────── */

function StadiumDisc({ d }: { d: number }) {
  const k = d / 30;
  return (
    <div className="bg-white" style={{ position: "relative", width: d, height: d, borderRadius: "50%", flexShrink: 0, boxShadow: `0px ${2.7 * k}px ${8.2 * k}px 0px rgba(0, 0, 0, 0.25)` }}>
      <Image
        src={stadiumMark}
        alt=""
        style={{ position: "absolute", left: 9.64 * k, top: 8.18 * k, width: 7.71 * k, height: "auto", display: "block", maxWidth: "none" }}
      />
    </div>
  );
}

/** `on` 0 → 1 flips the toggle. */
function Toggle({ on }: { on: number }) {
  return (
    <div className="bg-grey-300" style={{ position: "relative", width: 36, height: 20, borderRadius: 100, flexShrink: 0 }}>
      <div className="bg-grey-800" style={{ position: "absolute", inset: 0, borderRadius: 100, opacity: on }} />
      <div className="bg-white" style={{ position: "absolute", top: 2, left: 2 + 16 * on, width: 16, height: 16, borderRadius: "50%" }} />
    </div>
  );
}

function Chip({ label, pulse }: { label: string; pulse: number }) {
  return (
    <div
      className="bg-chip-surface"
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "5px 10px",
        borderRadius: 100,
        flexShrink: 0,
        transform: `scale(${1 + 0.07 * pulse})`,
        transformOrigin: "right center",
      }}
    >
      <div className="bg-canvas-yellow" style={{ position: "absolute", inset: 0, borderRadius: 100, opacity: pulse }} />
      <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 6 }}>
        <ArrowRight size={12} />
        <p className="text-grey-800" style={{ fontSize: 11, lineHeight: "14px", fontWeight: 600, whiteSpace: "nowrap" }}>
          {label}
        </p>
      </div>
    </div>
  );
}

function CollapsedZap({
  y,
  delay,
  bobY,
  lift,
  pulse,
  runs,
  f,
  icon,
  title,
  app,
  outcome,
}: {
  y: number;
  delay: number;
  bobY: number;
  lift: number;
  pulse: number;
  runs: number;
  f: number;
  icon: React.ReactNode;
  title: string;
  app: string;
  outcome: string;
}) {
  const p = pop(f, delay);
  return (
    <div
      className="bg-white"
      style={{
        position: "absolute",
        left: 12,
        top: y,
        width: 556,
        height: 58,
        boxSizing: "border-box",
        padding: "12px 16px",
        borderRadius: 14,
        display: "flex",
        alignItems: "center",
        gap: 12,
        opacity: seg(f, delay, delay + 8, LIN),
        transform: `translateY(${(1 - p) * 24 - lift * 3 + bobY}px) scale(${0.95 + 0.05 * p})`,
        boxShadow: SHADOW(lift),
      }}
    >
      <div className="bg-chip-surface" style={{ width: 34, height: 34, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {icon}
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 1, whiteSpace: "nowrap" }}>
        <p className="text-grey-800" style={{ fontSize: 13, lineHeight: "17px", fontWeight: 600 }}>
          {title}
        </p>
        <p className="text-canvas-muted" style={{ fontSize: 11, lineHeight: "14px" }}>
          {app}
        </p>
      </div>
      <Chip label={outcome} pulse={pulse} />
      <p className="text-swag-grey" style={{ width: 32, fontSize: 11, lineHeight: "14px", whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" }}>
        {runs} runs
      </p>
      <Toggle on={seg(f, delay + 14, delay + 24)} />
    </div>
  );
}

/* ───────────── scene ───────────── */

export function ZapStackScene() {
  const f = useCurrentFrame();
  const lt = Math.max(0, f - INTRO);

  const bobMain = bob(f, 1, -1.5);
  const bobA = bob(f, 2, 2);
  const bobB = bob(f, 3, -1.5);

  /* loop events */
  let trigLit = 0;
  let actLit = 0;
  let dotPulse = 0;
  let lastPulse = 0;
  let linkFill = 0;
  let packetT = 0;
  let packetO = 0;
  let chipA = 0;
  let chipB = 0;
  let liftA = 0;
  let liftB = 0;
  CYCLES.forEach((s) => {
    trigLit += win(lt, s, s + 8, s + 22, s + 32);
    actLit += win(lt, s + 28, s + 36, s + 50, s + 60);
    dotPulse += bell(lt, s + 34, s + 62);
    lastPulse += win(lt, s + 38, s + 46, s + 60, s + 72);
    linkFill += seg(lt, s + 12, s + 28, IN_OUT) * (1 - seg(lt, s + 44, s + 56, LIN));
    const o = seg(lt, s + 12, s + 14, LIN) * (1 - seg(lt, s + 26, s + 28, LIN));
    if (o > 0) {
      packetO = o;
      packetT = seg(lt, s + 12, s + 28, IN_OUT);
    }
    chipA += bell(lt, s + 74, s + 98);
    liftA += win(lt, s + 72, s + 80, s + 92, s + 102);
    chipB += bell(lt, s + 100, s + 124);
    liftB += win(lt, s + 98, s + 106, s + 118, s + 128);
  });

  /* intro */
  const pMain = pop(f, 0);
  const step = (d: number) => ({ opacity: seg(f, d, d + 8, LIN), transform: `translateY(${(1 - pop(f, d)) * 8}px)` });
  const runsToday = Math.round(12 * seg(f, 30, 62, LIN));
  const runsA = Math.round(8 * seg(f, 56, 86, LIN));
  const runsB = Math.round(3 * seg(f, 66, 90, LIN));
  const linkDraw = seg(f, 24, 36);

  return (
    <div className="font-sans text-grey-800" style={{ position: "relative", width: STAGE_W, height: STAGE_H }}>
      {/* expanded zap */}
      <div
        className="bg-white"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 580,
          height: 227,
          boxSizing: "border-box",
          padding: 16,
          borderRadius: 16,
          display: "flex",
          flexDirection: "column",
          gap: 14,
          opacity: seg(f, 0, 8, LIN),
          transform: `translateY(${(1 - pMain) * 28 + bobMain}px) scale(${0.96 + 0.04 * pMain})`,
          boxShadow: SHADOW(0),
        }}
      >
        {/* header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div className="bg-chip-surface" style={{ padding: "3px 8px", borderRadius: 100 }}>
              <p className="text-grey-800" style={capsText}>
                Zap
              </p>
            </div>
            <p className="text-grey-800" style={{ fontSize: 14, lineHeight: "18px", fontWeight: 600, whiteSpace: "nowrap" }}>
              Deal closed, send points
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              className="bg-canvas-check"
              style={{ width: 7, height: 7, borderRadius: "50%", transform: `scale(${1 + 0.35 * dotPulse})`, boxShadow: `0 0 0 ${4 * dotPulse}px rgba(38, 115, 55, ${0.25 * dotPulse})` }}
            />
            <p className="text-grey-600" style={{ width: 68, fontSize: 11, lineHeight: "14px", fontWeight: 600, whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" }}>
              {runsToday} runs today
            </p>
            <Toggle on={seg(f, 40, 50)} />
          </div>
        </div>

        <div className="bg-grey-200" style={{ height: 1, flexShrink: 0 }} />

        {/* steps */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", height: 110 }}>
          {/* trigger */}
          <div style={{ display: "flex", gap: 12, height: 46, ...step(14) }}>
            <div style={{ paddingTop: 5 }}>
              <div className="bg-chip-surface" style={{ position: "relative", width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${1 + 0.08 * trigLit})` }}>
                <div className="bg-canvas-blue" style={{ position: "absolute", inset: 0, borderRadius: 10, opacity: trigLit }} />
                <div style={{ position: "relative" }}>
                  <Briefcase size={18} />
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 1, whiteSpace: "nowrap" }}>
              <p className="text-canvas-muted" style={capsText}>
                Trigger
              </p>
              <p className="text-grey-800" style={{ fontSize: 13, lineHeight: "17px", fontWeight: 600 }}>
                Deal moves to Closed won
              </p>
              <p className="text-swag-grey" style={{ fontSize: 11, lineHeight: "14px" }}>
                Your CRM
              </p>
            </div>
          </div>

          {/* connector */}
          <div style={{ position: "relative", height: 18 }}>
            <div className="bg-grey-300" style={{ position: "absolute", left: 17, top: 0, width: 2, height: 18 * linkDraw, borderRadius: 1 }} />
            <div className="bg-grey-800" style={{ position: "absolute", left: 17, top: 0, width: 2, height: 18, borderRadius: 1, opacity: Math.min(1, linkFill), transformOrigin: "top", transform: `scaleY(${Math.min(1, linkFill)})` }} />
          </div>

          {/* action */}
          <div style={{ display: "flex", gap: 12, height: 46, ...step(28) }}>
            <div style={{ paddingTop: 5 }}>
              <div
                className="bg-white border-grey-200"
                style={{
                  width: 36,
                  height: 36,
                  boxSizing: "border-box",
                  borderRadius: 10,
                  borderWidth: 1.5,
                  borderStyle: "solid",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: `scale(${1 + 0.08 * actLit})`,
                  boxShadow: `0 0 0 ${4 * actLit}px rgba(141, 18, 231, ${0.16 * actLit})`,
                }}
              >
                <StadiumDisc d={26} />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 1, whiteSpace: "nowrap" }}>
              <p className="text-canvas-muted" style={capsText}>
                Action
              </p>
              <p className="text-grey-800" style={{ fontSize: 13, lineHeight: "17px", fontWeight: 600 }}>
                Send 500 Stadium Points
              </p>
              <p className="text-swag-grey" style={{ fontSize: 11, lineHeight: "14px" }}>
                To the deal owner
              </p>
            </div>
          </div>

          {/* packet on the step link */}
          {packetO > 0 && (
            <div
              className="bg-grey-800"
              style={{
                position: "absolute",
                left: 18 - 3.5,
                top: 46 + 18 * packetT - 3.5 + 0,
                width: 7,
                height: 7,
                borderRadius: "50%",
                opacity: packetO,
                boxShadow: "0 0 0 3px rgba(24, 24, 24, 0.14)",
              }}
            />
          )}
        </div>

        {/* last run */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, height: 22, ...step(44) }}>
          <Image
            src={avatarAlex}
            alt=""
            sizes="1.5rem"
            quality={90}
            style={{ width: 22, height: 22, borderRadius: "50%", display: "block", maxWidth: "none", transform: `scale(${1 + 0.14 * lastPulse})`, boxShadow: `0 0 0 ${2 * lastPulse}px rgba(38, 115, 55, ${0.5 * lastPulse})` }}
          />
          <div style={{ position: "relative", whiteSpace: "nowrap" }}>
            <p className="text-swag-grey" style={{ fontSize: 11, lineHeight: "14px" }}>
              Last run: Alex Morgan received 500 pts
            </p>
            <p className="text-grey-800" style={{ position: "absolute", left: 0, top: 0, fontSize: 11, lineHeight: "14px", opacity: lastPulse }}>
              Last run: Alex Morgan received 500 pts
            </p>
          </div>
        </div>
      </div>

      <CollapsedZap
        y={237}
        delay={52}
        bobY={bobA}
        lift={liftA}
        pulse={chipA}
        runs={runsA}
        f={f}
        icon={<Headphones size={17} />}
        title="Support ticket solved"
        app="Helpdesk"
        outcome="50 points"
      />
      <CollapsedZap
        y={305}
        delay={62}
        bobY={bobB}
        lift={liftB}
        pulse={chipB}
        runs={runsB}
        f={f}
        icon={<Star size={17} />}
        title="5-star review posted"
        app="Reviews"
        outcome="Thank-you gift"
      />
    </div>
  );
}

export default function ZapStack() {
  return <SceneHost scene={ZapStackScene} width={STAGE_W} height={STAGE_H} />;
}
