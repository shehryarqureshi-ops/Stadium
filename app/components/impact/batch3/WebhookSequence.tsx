"use client";

/* /integrations/webhooks hero visual — "Sequence diagram" (Figma n9SjmDjzB1PeZAYJ5w43fr
   5467:24121, visual frame = the 580 × 384 graphic cluster, hero-visual-design v2.5).
   Acme Billing → Stadium → Priya Rao. Pure function of the current frame.

   STAGE UNITS: bare numbers are stage units, NOT CSS px (see design.md → "Batch 3 hero
   visuals"). Colours and fonts come from tokens; code text uses the mono stack.

   TIMELINE (30 fps)
     0 – 96     INTRO: participants pop, dashed lifelines draw down, message 1
                (POST subscription.renewed) draws left → right with its pill,
                Stadium's activation bar grows, the dashed "200 OK" return draws back,
                "Order gift" draws to Priya, the gift card springs in, caption fades.
                Frame 96 = the Figma frame (also the reduced-motion still).
     96 – 396   LOOP (300): the sequence replays as travelling packets — event → ack →
                order — with the participating card / chip pulsing as each packet
                arrives. Every value is at its rest pose at both ends (seamless);
                participants + gift card float on whole-cycle sines (≤ 1.5).

   NO CROP: everything stays inside 0 … STAGE_W. */

import Image from "next/image";
import { useCurrentFrame } from "remotion";

import avatarMaya from "@/public/impact/batch3/avatar-maya.png";
import photoAnniv from "@/public/impact/batch3/photo-anniv.jpg";
import stadiumMark from "@/public/impact/batch3/stadium-mark.svg";

import { DURATION, FPS, INTRO, IN_OUT, LIN, SHADOW, SHADOW_FLOAT, SceneHost, bell, bob, pop, seg } from "./shared";

export const STAGE_W = 580;
export const STAGE_H = 384;
export { DURATION, FPS, INTRO };

/* feather-style icons (24 viewBox, stroke 2) */
function Icon({ size, children }: { size: number; children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "block", flexShrink: 0 }}
    >
      {children}
    </svg>
  );
}
const FileText = ({ size }: { size: number }) => (
  <Icon size={size}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
  </Icon>
);
const Gift = ({ size }: { size: number }) => (
  <Icon size={size}>
    <path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7" />
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </Icon>
);
const Truck = ({ size }: { size: number }) => (
  <Icon size={size}>
    <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7z" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </Icon>
);
const Zap = ({ size }: { size: number }) => (
  <Icon size={size}>
    <path d="M13 2 3 14h9l-1 8 10-12h-9z" />
  </Icon>
);

/* ───────────── helpers ───────────── */

/** Card entrance: opacity + rise + scale, settled (identity) by frame ~96. */
function enter(f: number, delay: number) {
  const p = pop(f, delay);
  return {
    opacity: seg(f, delay, delay + 8, LIN),
    y: (1 - p) * 22,
    scale: 0.94 + 0.06 * p,
  };
}

/** Pulse helper → CSS transform for a card that "receives" something. */
const pulseT = (b: number) => `translateY(${-2 * b}px) scale(${1 + 0.03 * b})`;

const LIFELINES = [
  { x: 85, h: 156, delay: 14 },
  { x: 290, h: 156, delay: 18 },
  { x: 495, h: 158, delay: 22 },
] as const;

function Lifeline({ x, h, p }: { x: number; h: number; p: number }) {
  return (
    <div style={{ position: "absolute", left: x - 1, top: 56, width: 2, height: h * p, overflow: "hidden" }}>
      <svg width={2} height={h} style={{ display: "block" }}>
        <line x1={1} y1={0} x2={1} y2={h} className="stroke-grey-300" strokeWidth={1.75} strokeDasharray="4 5" />
      </svg>
    </div>
  );
}

/** A horizontal message: line (+ arrowhead) revealed by a clip. `dir` = travel direction. */
function Message({
  x,
  y,
  w,
  dir,
  dash,
  p,
}: {
  x: number;
  y: number;
  w: number;
  dir: 1 | -1;
  dash?: string;
  p: number;
}) {
  const clip = dir === 1 ? `inset(0 ${(1 - p) * 100}% 0 0)` : `inset(0 0 0 ${(1 - p) * 100}%)`;
  const lineX1 = dir === 1 ? 0 : w;
  const lineX2 = dir === 1 ? w - 1 : 1;
  return (
    <div style={{ position: "absolute", left: x, top: y - 5, width: w, height: 10, clipPath: clip }}>
      <svg width={w} height={10} style={{ display: "block", overflow: "visible" }}>
        <line
          x1={lineX1}
          y1={5}
          x2={lineX2}
          y2={5}
          className="stroke-grey-300"
          strokeWidth={1.75}
          strokeDasharray={dash}
        />
        <polygon
          className="fill-grey-300"
          points={dir === 1 ? `${w - 8},0.5 ${w},5 ${w - 8},9.5` : `8,0.5 0,5 8,9.5`}
        />
      </svg>
    </div>
  );
}

function Packet({ x, y, on, green }: { x: number; y: number; on: number; green?: boolean }) {
  if (on <= 0) return null;
  return (
    <div
      className={green ? "bg-canvas-green" : "bg-white"}
      style={{
        position: "absolute",
        left: x - 5,
        top: y - 5,
        width: 10,
        height: 10,
        borderRadius: "50%",
        opacity: on,
        boxShadow: green ? "0 0 12px 2px rgba(216,241,204,0.7)" : "0 0 12px 2px rgba(255,255,255,0.65)",
      }}
    />
  );
}

/** Travelling packet progress + visibility envelope over loop frames [a, b]. */
function travel(lt: number, a: number, b: number) {
  const p = seg(lt, a, b, IN_OUT);
  const on = Math.min(seg(lt, a, a + 5, LIN), 1 - seg(lt, b - 5, b, LIN));
  return { p, on: Math.max(0, on) };
}

const labelShadow = "0px 2px 8px 0px rgba(0, 0, 0, 0.25)";

/* ───────────── scene ───────────── */

export function WebhookScene() {
  const f = useCurrentFrame();
  const lt = Math.max(0, f - INTRO);

  /* intro */
  const eAcme = enter(f, 0);
  const eStad = enter(f, 6);
  const ePriya = enter(f, 12);
  const m1 = seg(f, 24, 40);
  const bar = seg(f, 40, 50);
  const m2 = seg(f, 50, 64);
  const m3 = seg(f, 60, 74);
  const label1 = pop(f, 22);
  const label2 = pop(f, 50);
  const label3 = pop(f, 60);
  const eGift = enter(f, 66);
  const cap = seg(f, 80, 92, LIN);

  /* loop events */
  const ev = travel(lt, 20, 58);
  const ack = travel(lt, 96, 134);
  const ord = travel(lt, 180, 222);
  const acme = bell(lt, 8, 40) + 0.8 * bell(lt, 132, 164);
  const stad = bell(lt, 54, 90) + 0.7 * bell(lt, 172, 202);
  const priya = bell(lt, 218, 250);
  const pill1 = bell(lt, 18, 52);
  const ok = bell(lt, 100, 140);
  const pill3 = bell(lt, 178, 214);
  const gift = bell(lt, 224, 262);
  const chip = bell(lt, 240, 272);

  return (
    <div className="font-sans text-grey-800" style={{ position: "relative", width: STAGE_W, height: STAGE_H }}>
      {/* lifelines */}
      {LIFELINES.map((l) => (
        <Lifeline key={l.x} x={l.x} h={l.h} p={seg(f, l.delay, l.delay + 26)} />
      ))}

      {/* messages */}
      <Message x={85} y={102} w={202} dir={1} p={m1} />
      <Message x={87} y={144} w={199} dir={-1} dash="4 4" p={m2} />
      <Message x={294} y={188} w={201} dir={1} p={m3} />

      {/* Stadium activation bar */}
      <div
        className="bg-white"
        style={{
          position: "absolute",
          left: 287,
          top: 91,
          width: 6,
          height: 108,
          borderRadius: 4,
          transformOrigin: "50% 0%",
          transform: `scaleY(${bar})`,
          boxShadow: `0 0 ${14 * stad}px ${3 * stad}px rgba(255,255,255,${0.55 * stad})`,
        }}
      />

      {/* participants */}
      <div
        className="bg-white"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 170,
          height: 54,
          borderRadius: 14,
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 12px",
          opacity: eAcme.opacity,
          transform: `translateY(${eAcme.y + bob(f, 1, 1.5)}px) scale(${eAcme.scale}) ${pulseT(acme)}`,
          boxShadow: SHADOW(acme),
        }}
      >
        <div
          className="bg-grey-800 text-white"
          style={{ width: 34, height: 34, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <FileText size={17} />
        </div>
        <div style={{ whiteSpace: "nowrap" }}>
          <p style={{ fontSize: 13, lineHeight: "17px", fontWeight: 600 }}>Acme Billing</p>
          <p className="text-canvas-muted" style={{ fontSize: 10, lineHeight: "13px" }}>
            Your system
          </p>
        </div>
      </div>

      <div
        className="bg-white"
        style={{
          position: "absolute",
          left: 205,
          top: 0,
          width: 170,
          height: 54,
          borderRadius: 14,
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 12px",
          opacity: eStad.opacity,
          transform: `translateY(${eStad.y + bob(f, 2, 1.5)}px) scale(${eStad.scale}) ${pulseT(stad)}`,
          boxShadow: SHADOW(stad),
        }}
      >
        <div
          className="bg-white"
          style={{
            position: "relative",
            width: 34,
            height: 34,
            borderRadius: "50%",
            flexShrink: 0,
            boxShadow: "0px 3.09px 9.27px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Image
            src={stadiumMark}
            alt=""
            style={{ position: "absolute", left: 11.6, top: 9.3, width: 8.7, height: "auto", display: "block", maxWidth: "none" }}
          />
        </div>
        <div style={{ whiteSpace: "nowrap" }}>
          <p className="font-display" style={{ fontSize: 15, lineHeight: "19px" }}>
            Stadium
          </p>
          <p className="text-canvas-muted" style={{ fontSize: 10, lineHeight: "13px" }}>
            Automations
          </p>
        </div>
      </div>

      <div
        className="bg-white"
        style={{
          position: "absolute",
          left: 410,
          top: 0,
          width: 170,
          height: 54,
          borderRadius: 14,
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 12px",
          opacity: ePriya.opacity,
          transform: `translateY(${ePriya.y + bob(f, 3, 1.5)}px) scale(${ePriya.scale}) ${pulseT(priya)}`,
          boxShadow: SHADOW(priya),
        }}
      >
        <Image
          src={avatarMaya}
          alt=""
          quality={90}
          sizes="34px"
          style={{ width: 34, height: 34, borderRadius: "50%", objectFit: "cover", flexShrink: 0, maxWidth: "none" }}
        />
        <div style={{ whiteSpace: "nowrap" }}>
          <p style={{ fontSize: 13, lineHeight: "17px", fontWeight: 600 }}>Priya Rao</p>
          <p className="text-canvas-muted" style={{ fontSize: 10, lineHeight: "13px" }}>
            Northwind
          </p>
        </div>
      </div>

      {/* message labels */}
      <div
        className="bg-white"
        style={{
          position: "absolute",
          left: 91,
          top: 69,
          width: 193,
          height: 27,
          borderRadius: 100,
          display: "flex",
          alignItems: "center",
          gap: 7,
          padding: "5px 8px",
          opacity: Math.min(1, label1),
          transform: `scale(${(0.85 + 0.15 * label1) * (1 + 0.04 * pill1)})`,
          boxShadow: labelShadow,
          whiteSpace: "nowrap",
        }}
      >
        <span
          className="bg-grey-800 font-mono text-white"
          style={{ fontSize: 10, lineHeight: "13px", fontWeight: 500, padding: "2px 6px", borderRadius: 6 }}
        >
          POST
        </span>
        <span className="font-mono" style={{ fontSize: 11, lineHeight: "15px", fontWeight: 500 }}>subscription.renewed</span>
      </div>

      <div
        className="bg-canvas-green font-mono text-canvas-check"
        style={{
          position: "absolute",
          left: 158.5,
          top: 115,
          width: 58,
          height: 23,
          borderRadius: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: Math.min(1, label2),
          transform: `scale(${(0.85 + 0.15 * label2) * (1 + 0.08 * ok)})`,
          fontSize: 11,
          lineHeight: "15px",
          fontWeight: 500,
          whiteSpace: "nowrap",
        }}
      >
        200 OK
      </div>

      <div
        className="bg-white"
        style={{
          position: "absolute",
          left: 348.5,
          top: 158,
          width: 88,
          height: 24,
          borderRadius: 100,
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "5px 10px",
          opacity: Math.min(1, label3),
          transform: `scale(${(0.85 + 0.15 * label3) * (1 + 0.05 * pill3)})`,
          boxShadow: labelShadow,
          whiteSpace: "nowrap",
        }}
      >
        <Gift size={12} />
        <span style={{ fontSize: 11, lineHeight: "14px", fontWeight: 600 }}>Order gift</span>
      </div>

      {/* packets (loop only) */}
      <Packet x={85 + 201 * ev.p} y={102} on={ev.on} />
      <Packet x={286 - 199 * ack.p} y={144} on={ack.on} green />
      <Packet x={294 + 200 * ord.p} y={188} on={ord.on} />

      {/* gift card */}
      <div
        className="bg-white"
        style={{
          position: "absolute",
          left: 410,
          top: 214,
          width: 170,
          height: 170,
          borderRadius: 16,
          padding: 12,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          opacity: eGift.opacity,
          transform: `translateY(${eGift.y + bob(f, 2, 1.5) - 2 * gift}px) scale(${eGift.scale * (1 + 0.02 * gift)})`,
          boxShadow: SHADOW_FLOAT(gift),
        }}
      >
        <div className="bg-chip-surface" style={{ width: 146, height: 88, borderRadius: 10, overflow: "hidden", flexShrink: 0 }}>
          <Image
            src={photoAnniv}
            alt=""
            quality={90}
            sizes="146px"
            style={{ width: 146, height: 88, objectFit: "cover", display: "block", maxWidth: "none" }}
          />
        </div>
        <p style={{ fontSize: 12, lineHeight: "16px", fontWeight: 600, whiteSpace: "nowrap" }}>Renewal thank-you</p>
        <div
          className="bg-chip-surface"
          style={{
            alignSelf: "flex-start",
            height: 22,
            borderRadius: 100,
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 9px",
            transform: `scale(${1 + 0.06 * chip})`,
            transformOrigin: "0% 50%",
            whiteSpace: "nowrap",
          }}
        >
          <Truck size={12} />
          <span style={{ fontSize: 11, lineHeight: "14px", fontWeight: 600 }}>Arrives Thu</span>
        </div>
      </div>

      {/* caption */}
      <div
        className="text-grey-300"
        style={{
          position: "absolute",
          left: 0,
          top: 362,
          height: 14,
          display: "flex",
          alignItems: "center",
          gap: 8,
          opacity: cap,
          whiteSpace: "nowrap",
        }}
      >
        <Zap size={12} />
        <span style={{ fontSize: 11, lineHeight: "14px", fontWeight: 600 }}>Fully automatic. No one lifts a finger.</span>
      </div>
    </div>
  );
}

export default function WebhookSequence() {
  return <SceneHost scene={WebhookScene} width={STAGE_W} height={STAGE_H} />;
}
