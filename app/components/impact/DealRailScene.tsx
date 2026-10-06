"use client";

/* /impact/sales hero visual — "Deal rail" (Figma n9SjmDjzB1PeZAYJ5w43fr 5205:17055,
   visual frame 5205:17767, 592 × 346 = the graphic cluster itself, flush to the
   Talk-to-sales edge and top-aligned with the copy; hero-visual-design v2.5).
   Two gift paths hang off a deal-stage rail: AUTOMATED (CRM / Webhook → Stadium →
   recipient) above the Proposal stage, REP-LED (Rep / Chrome extension → Stadium →
   recipient) below Negotiation.

   STAGE UNITS. Authored on a fixed 592 × 346 stage that the Remotion Player scales
   to its container, so bare numbers in style objects are stage units, NOT CSS px
   (see design.md → "/impact/sales hero"). Colours and fonts still come from tokens.

   TIMELINE (30 fps)
     0 – 96     INTRO: the rail draws, stage pills pop and light up, the Automated lane
                drops in, a gift packet runs Salesforce/Webhook → Stadium → Grace
                ("Gift on its way" → "Gift delivered"); then the Rep-led lane rises in
                and the same happens for Arun. Frame 96 is exactly the Figma frame
                → also the still for prefers-reduced-motion.
     96 – 396   LOOP (300 frames): both lanes send again (Automated at +20, Rep-led at
                +150): the stage pill lifts, the packet travels, Stadium pulses, the
                recipient flips back to "on its way" and then "delivered". Every
                value is at its Figma rest pose at both loop ends (seamless), and
                each card floats on its own whole-cycle sine.

   NO CROP. overflowVisible on the Player; every moving thing stays inside 0 … STAGE_W. */

import Image from "next/image";
import { Easing, interpolate, interpolateColors, spring, useCurrentFrame } from "remotion";

import avatarArun from "@/public/impact/overview/hero/avatar-arun.png";
import avatarGrace from "@/public/impact/overview/hero/avatar-grace.png";
import avatarJordan from "@/public/impact/sales/hero/avatar-jordan.png";
import stadiumMark from "@/public/impact/sales/hero/stadium-mark.svg";
import salesforceMark from "@/public/motion/marks/salesforce.svg";

export const STAGE_W = 592;
export const STAGE_H = 346;
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

const pop = (f: number, delay: number) =>
  spring({ frame: f - delay, fps: FPS, config: { damping: 15, stiffness: 150, mass: 0.7 } });

/** 0 → 1 → 0 bell over [a, b]. */
const bell = (f: number, a: number, b: number) => Math.sin(Math.PI * seg(f, a, b, LIN));

/** Whole-cycle float; ramps in with the intro's last frames. */
const bob = (f: number, cycles: number, amp: number) =>
  seg(f, 56, INTRO, LIN) * Math.sin((2 * Math.PI * cycles * (f - INTRO)) / LOOP) * amp;

/* ───────────── lane timing ───────────── */

const PACKET = 40; // frames a packet takes source → recipient

type Run = { tp: number; delivered: number };

/** Packet time (0…PACKET, else out of range) + "delivered" amount for one lane. */
function run(f: number, introStart: number, loopStart: number): Run {
  if (f < INTRO) {
    return { tp: f - introStart, delivered: seg(f, introStart + 32, introStart + 38, LIN) };
  }
  const lt = f - INTRO;
  const rewind = seg(lt, loopStart - 8, loopStart - 2, LIN);
  const done = seg(lt, loopStart + 32, loopStart + 38, LIN);
  return { tp: lt - loopStart, delivered: Math.min(1, 1 - rewind + done) };
}

/* ───────────── small parts ───────────── */

const Icon = ({ children }: { children: React.ReactNode }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0, display: "block" }}
  >
    {children}
  </svg>
);

const ZapIcon = () => (
  <Icon>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </Icon>
);
const ChromeIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4" />
    <line x1="21.17" y1="8" x2="12" y2="8" />
    <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
    <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
  </Icon>
);
const ArrowRight = () => (
  <Icon>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </Icon>
);

function Avatar({ src, size }: { src: typeof avatarGrace; size: number }) {
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

type Source =
  | { kind: "salesforce"; label: string }
  | { kind: "webhook"; label: string }
  | { kind: "chrome"; label: string }
  | { kind: "avatar"; label: string; src: typeof avatarGrace };

function SourceChip({ s }: { s: Source }) {
  return (
    <div
      className="bg-chip-surface text-grey-800"
      style={{
        width: 140,
        padding: "6px 10px",
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        gap: 8,
        boxSizing: "border-box",
      }}
    >
      {s.kind === "salesforce" && (
        <Image src={salesforceMark} alt="" style={{ height: 14, width: "auto", display: "block", flexShrink: 0 }} />
      )}
      {s.kind === "webhook" && <ZapIcon />}
      {s.kind === "chrome" && <ChromeIcon />}
      {s.kind === "avatar" && <Avatar src={s.src} size={20} />}
      <span style={{ fontSize: 12, lineHeight: "16px", fontWeight: 600, whiteSpace: "nowrap" }}>{s.label}</span>
    </div>
  );
}

function Lane({
  f,
  delay,
  fromY,
  left,
  top,
  tagClass,
  tag,
  title,
  sources,
  rcpt,
  rcptSrc,
  state,
  bobY,
  cy,
}: {
  f: number;
  delay: number;
  fromY: number;
  left: number;
  top: number;
  tagClass: string;
  tag: string;
  title: string;
  sources: Source[];
  rcpt: string;
  rcptSrc: typeof avatarGrace;
  state: Run;
  bobY: number;
  cy: number;
}) {
  const p = pop(f, delay);
  const runBell = bell(state.tp, 0, PACKET);
  const inRun = state.tp >= 0 && state.tp <= PACKET;
  /* packet (x relative to the chain row): sources → Stadium (136→164), Stadium pulse, Stadium → recipient (213→233) */
  const t = state.tp;
  const leg1 = seg(t, 0, 14, IN_OUT);
  const leg2 = seg(t, 18, 32, IN_OUT);
  const x = t < 16 ? 136 + 28 * leg1 : 213 + 20 * leg2;
  const opacity = !inRun ? 0 : Math.min(seg(t, 0, 5, LIN), 1 - seg(t, 14, 16, LIN) + seg(t, 17, 19, LIN) * (1 - seg(t, 30, 34, LIN)));
  const hubPulse = 1 + 0.12 * bell(t, 12, 24);
  const rcptPulse = 1 + 0.05 * bell(t, 32, 40);
  const lift = 0.5 * runBell;

  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width: 416,
        padding: 14,
        boxSizing: "border-box",
        borderRadius: 18,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        opacity: seg(f, delay, delay + 8, LIN),
        transform: `translateY(${(1 - p) * fromY - lift * 5 + bobY}px) scale(${0.94 + 0.06 * p})`,
        boxShadow: `0px ${14 + 6 * lift}px ${34 + 8 * lift}px 0px rgba(0, 0, 0, ${0.36 + 0.08 * lift})`,
      }}
      className="bg-white"
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          className={`${tagClass} text-grey-800`}
          style={{
            padding: "4px 10px",
            borderRadius: 100,
            fontSize: 10,
            lineHeight: "14px",
            fontWeight: 700,
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          {tag}
        </span>
        <span className="text-swag-grey" style={{ fontSize: 12, lineHeight: "16px", fontWeight: 600, whiteSpace: "nowrap" }}>
          {title}
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {sources.map((s) => (
            <SourceChip key={s.label} s={s} />
          ))}
        </div>
        <div style={{ padding: "0 5px", display: "flex" }} className="text-grey-400">
          <ArrowRight />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, transform: `scale(${hubPulse})` }}>
          <div
            className="bg-white"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0px 2px 8px 0px rgba(0, 0, 0, 0.16)",
            }}
          >
            <Image src={stadiumMark} alt="" style={{ width: 11.5, height: "auto", display: "block" }} />
          </div>
          <span className="text-grey-800" style={{ fontSize: 11, lineHeight: "14px", fontWeight: 600 }}>
            Stadium
          </span>
        </div>
        <div style={{ padding: "0 5px", display: "flex" }} className="text-grey-400">
          <ArrowRight />
        </div>
        <div
          className="bg-chip-surface"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "4px 12px 4px 4px",
            borderRadius: 100,
            transform: `scale(${rcptPulse})`,
            transformOrigin: "0 50%",
          }}
        >
          <Avatar src={rcptSrc} size={28} />
          <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
            <span className="text-grey-800" style={{ fontSize: 12, lineHeight: "15px", fontWeight: 600, whiteSpace: "nowrap" }}>
              {rcpt}
            </span>
            <span style={{ position: "relative", height: 12 }}>
              <span
                className="text-swag-grey"
                style={{ position: "absolute", left: 0, top: 0, fontSize: 10, lineHeight: "12px", whiteSpace: "nowrap", opacity: 1 - state.delivered }}
              >
                Gift on its way
              </span>
              <span
                className="text-swag-grey"
                style={{ position: "absolute", left: 0, top: 0, fontSize: 10, lineHeight: "12px", whiteSpace: "nowrap", opacity: state.delivered }}
              >
                Gift delivered
              </span>
            </span>
          </div>
        </div>
        {/* gift packet */}
        <div
          className="bg-signal-green"
          style={{
            position: "absolute",
            left: x - 4,
            top: cy - 4,
            width: 8,
            height: 8,
            borderRadius: "50%",
            opacity,
            boxShadow: "0px 0px 8px 0px rgba(47, 166, 79, 0.55)",
          }}
        />
      </div>
    </div>
  );
}

function StagePill({ name, a, lift, delay, f, children }: { name: string; a: number; lift: number; delay: number; f: number; children?: React.ReactNode }) {
  const p = pop(f, delay);
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 12px",
        borderRadius: 100,
        opacity: seg(f, delay, delay + 6, LIN),
        transform: `translateY(${-lift * 3}px) scale(${0.9 + 0.1 * p})`,
        background: interpolateColors(a, [0, 1], ["#eff0f2", "#ffffff"]),
        color: interpolateColors(a, [0, 1], ["#6b6c71", "#181818"]),
        boxShadow: `0px ${6 + 3 * lift}px 16px 0px rgba(0, 0, 0, ${0.3 * a})`,
      }}
    >
      {a > 0.01 && (
        <span
          className="bg-signal-green"
          style={{ width: 6, height: 6, borderRadius: "50%", transform: `scale(${a})`, flexShrink: 0 }}
        />
      )}
      <span style={{ fontSize: 11, lineHeight: "14px", fontWeight: 600, whiteSpace: "nowrap" }}>{name}</span>
      {children}
    </div>
  );
}

/* ───────────── scene ───────────── */

export function DealRailScene() {
  const f = useCurrentFrame();

  const A = run(f, 30, 20);
  const B = run(f, 52, 150);

  const railDraw = seg(f, 0, 26);
  const proposalOn = seg(f, 18, 26, LIN);
  const negotiationOn = seg(f, 40, 48, LIN);

  const liftA = bell(A.tp, 0, PACKET);
  const liftB = bell(B.tp, 0, PACKET);
  const bobA = bob(f, 1, 2.5);
  const bobB = bob(f, 2, 2.5);

  const STEM = 32;
  const stemA = seg(f, 20, 30);
  const stemB = seg(f, 44, 54);

  return (
    <div style={{ position: "relative", width: STAGE_W, height: STAGE_H }}>
      <Lane
        f={f}
        delay={20}
        fromY={-22}
        left={0}
        top={0}
        tagClass="bg-canvas-blue"
        tag="Automated"
        title="Deal moves to Proposal"
        sources={[
          { kind: "salesforce", label: "Salesforce" },
          { kind: "webhook", label: "Webhook" },
        ]}
        rcpt="Grace Adeyemi"
        rcptSrc={avatarGrace}
        state={A}
        bobY={bobA}
        cy={32}
      />
      <Lane
        f={f}
        delay={44}
        fromY={26}
        left={STAGE_W - 416}
        top={216}
        tagClass="bg-canvas-lilac"
        tag="Rep-led"
        title="Rep sends on demand"
        sources={[
          { kind: "avatar", label: "Jordan Lee", src: avatarJordan },
          { kind: "chrome", label: "Chrome extension" },
        ]}
        rcpt="Arun Mehta"
        rcptSrc={avatarArun}
        state={B}
        bobY={bobB}
        cy={34}
      />

      {/* rail */}
      <div style={{ position: "absolute", left: 0, top: 158, width: STAGE_W, height: 26, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div
          className="bg-white"
          style={{
            position: "absolute",
            left: 0,
            top: 12,
            width: STAGE_W,
            height: 2,
            opacity: 0.35,
            transformOrigin: "0 50%",
            transform: `scaleX(${railDraw})`,
          }}
        />
        <StagePill name="Discovery" a={0} lift={0} delay={0} f={f} />
        <StagePill name="Proposal" a={proposalOn} lift={liftA} delay={6} f={f}>
          <span
            className="bg-white"
            style={{
              position: "absolute",
              left: "50%",
              marginLeft: -1,
              bottom: "100%",
              width: 2,
              height: Math.max(0, STEM * stemA - bobA),
              opacity: 0.55,
            }}
          />
        </StagePill>
        <StagePill name="Negotiation" a={negotiationOn} lift={liftB} delay={12} f={f}>
          <span
            className="bg-white"
            style={{
              position: "absolute",
              left: "50%",
              marginLeft: -1,
              top: "100%",
              width: 2,
              height: Math.max(0, STEM * stemB + bobB),
              opacity: 0.55,
            }}
          />
        </StagePill>
        <StagePill name="Closed-won" a={0} lift={0} delay={18} f={f} />
      </div>
    </div>
  );
}
