"use client";

/* /impact/office-admins hero visual — "Needs board" (Figma n9SjmDjzB1PeZAYJ5w43fr
   5422:22465, visual frame = the 580 × 440 graphic cluster itself, flush to the
   Talk-to-sales edge and top-aligned with the copy; hero-visual-design v2.5).
   One office admin → one Stadium card of workplace needs → four places. Every
   element is a pure function of the current frame, so the Player can play,
   pause and seek it.

   STAGE UNITS. Authored on a fixed 580 × 440 stage that the Remotion Player scales
   to its container. Bare numbers in the style objects are stage units, NOT CSS px
   (see design.md → "/impact/office-admins hero"). Colours and fonts come from tokens.

   TIMELINE (30 fps)
     0 – 96     INTRO: the admin pill pops, the line to Stadium draws, the Stadium
                card springs in, its five need tiles settle in reading order while
                the counts run, four connectors draw down and the four location
                cards land with their status checks. Frame 96 is exactly the Figma
                frame (also the prefers-reduced-motion still).
     96 – 396   LOOP (300 frames): the admin sends one request at a time. A packet
                drops from the admin into Stadium, the matching need tile lifts, a
                packet runs down its connector and the destination lifts and its
                check pulses — snacks → New York HQ, swag → London, events → Berlin,
                gifts → Remote. Every value is at its Figma rest pose at both loop
                ends (seamless 396 → 96). Underneath, the admin pill, the Stadium
                card and the four location cards float on whole-cycle sines (±1.5–2).

   NO CROP. overflowVisible on the Player; nothing leaves 0 … STAGE_W (the
   connectors and packets stay inside the cards' x-range). */

import Image from "next/image";
import { Easing, interpolate, spring, useCurrentFrame } from "remotion";

import avatarMaya from "@/public/impact/office-admins/hero/avatar-maya.png";
import photoGifts from "@/public/impact/office-admins/hero/photo-gifts.jpg";
import photoSnacks from "@/public/impact/office-admins/hero/photo-snacks.jpg";
import photoSwag from "@/public/impact/office-admins/hero/photo-swag.jpg";
import stadiumMark from "@/public/impact/office-admins/hero/stadium-mark.svg";

export const STAGE_W = 580;
export const STAGE_H = 440;
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
  interpolate(f, [from, to], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing });

/** Spring entrance, 0 → ~1 (slight overshoot). */
const pop = (f: number, delay: number) =>
  spring({ frame: f - delay, fps: FPS, config: { damping: 15, stiffness: 150, mass: 0.7 } });

/** Rises a→b, holds, falls c→d. */
const win = (t: number, a: number, b: number, c: number, d: number) =>
  seg(t, a, b, IN_OUT) - seg(t, c, d, IN_OUT);

/** 0 → 1 → 0 bell over [a, b]. */
const bell = (t: number, a: number, b: number) => Math.sin(Math.PI * seg(t, a, b, LIN));

/** Whole-cycle float; ramps in with the intro's last frames, 0 at frame 96 and 396. */
const bob = (f: number, cycles: number, amp: number) =>
  seg(f, 56, INTRO, LIN) * Math.sin((2 * Math.PI * cycles * (f - INTRO)) / LOOP) * amp;

/* ───────────── geometry (from the Figma frame) ───────────── */

const CARD_X = 0;
const CARD_Y = 76;
const CARD_W = 580;
const CARD_H = 186;
const LOC_Y = 326;
const LOC_W = 136;
const LOC_H = 100;
const LOC_PITCH = 148;
const ADMIN_BOTTOM = 36;
const MID_X = 290;
/** Where each connector leaves the Stadium card / meets its location card. */
const FROM_X = [130, 237, 344, 451] as const;
const TO_X = [68, 216, 364, 512] as const;

const SHADOW = (lift: number) =>
  `0px ${8 + 4 * lift}px ${24 + 6 * lift}px 0px rgba(0, 0, 0, ${0.2 + 0.06 * lift})`;

/* ───────────── content ───────────── */

type Need =
  | { name: string; kind: "photo"; src: typeof photoSnacks; fit: boolean; n: number; unit: string }
  | { name: string; kind: "cal" | "stipend"; n: number; unit: string };

const NEEDS: Need[] = [
  { name: "Snacks", kind: "photo", src: photoSnacks, fit: true, n: 128, unit: "orders" },
  { name: "Swag", kind: "photo", src: photoSwag, fit: true, n: 46, unit: "orders" },
  { name: "Gifts", kind: "photo", src: photoGifts, fit: false, n: 74, unit: "orders" },
  { name: "Events", kind: "cal", n: 9, unit: "booked" },
  { name: "Employee needs", kind: "stipend", n: 31, unit: "requests" },
];

const LOCS = [
  { city: "New York HQ", flag: "USA", people: "86 people", status: "Snacks restocked", sub: "Delivered Tue" },
  { city: "London", flag: "UK", people: "42 people", status: "Kits shipped", sub: "Arrives Thu" },
  { city: "Berlin", flag: "DE", people: "24 people", status: "Offsite booked", sub: "Fri, 14 Nov" },
  { city: "Remote", flag: "REMOTE", people: "60 people", status: "Gifts delivered", sub: "Sent to 18 homes" },
] as const;

/** Loop: request k starts at S[k] (loop frames); it uses need NEED_FOR[k] and lands at location k. */
const S = [16, 76, 136, 196] as const;
const NEED_FOR = [0, 1, 3, 2] as const;

/* ───────────── flags (the Figma flags are sprites — drawn here as SVG) ───────────── */

type FlagCode = "USA" | "UK" | "DE" | "CA" | "IN" | "BR";

function FlagArt({ code }: { code: FlagCode }) {
  switch (code) {
    case "USA":
      return (
        <>
          <rect width="30" height="20" fill="#b22234" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} y={(20 / 13) * (2 * i + 1)} width="30" height={20 / 13} fill="#fff" />
          ))}
          <rect width="12" height={(20 / 13) * 7} fill="#3c3b6e" />
        </>
      );
    case "UK":
      return (
        <>
          <rect width="30" height="20" fill="#012169" />
          <path d="M0 0 30 20M30 0 0 20" stroke="#fff" strokeWidth="3.4" />
          <path d="M0 0 30 20M30 0 0 20" stroke="#c8102e" strokeWidth="1.2" />
          <rect x="12" width="6" height="20" fill="#fff" />
          <rect y="7.2" width="30" height="5.6" fill="#fff" />
          <rect x="13.2" width="3.6" height="20" fill="#c8102e" />
          <rect y="8.4" width="30" height="3.2" fill="#c8102e" />
        </>
      );
    case "DE":
      return (
        <>
          <rect width="30" height="6.7" fill="#000" />
          <rect y="6.7" width="30" height="6.7" fill="#dd0000" />
          <rect y="13.4" width="30" height="6.7" fill="#ffce00" />
        </>
      );
    case "CA":
      return (
        <>
          <rect width="30" height="20" fill="#d80621" />
          <rect x="7.5" width="15" height="20" fill="#fff" />
          <polygon
            points="15,4.5 16.6,8 19.5,7 18.2,10.6 20,11.5 15.6,12.6 15.6,15.5 14.4,15.5 14.4,12.6 10,11.5 11.8,10.6 10.5,7 13.4,8"
            fill="#d80621"
          />
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
    case "BR":
      return (
        <>
          <rect width="30" height="20" fill="#009c3b" />
          <polygon points="15,2 27,10 15,18 3,10" fill="#ffdf00" />
          <circle cx="15" cy="10" r="4.3" fill="#002776" />
        </>
      );
  }
}

function Flag({ code, d = 20 }: { code: FlagCode; d?: number }) {
  return (
    <div style={{ position: "relative", width: d, height: d, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
      <svg
        viewBox="0 0 30 20"
        width={d * 1.5}
        height={d}
        style={{ position: "absolute", left: -d * 0.25, top: 0, display: "block" }}
      >
        <FlagArt code={code} />
      </svg>
      <div
        className="border-white"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          borderWidth: 1.5,
          borderStyle: "solid",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

/* ───────────── small parts ───────────── */

function AvatarPill({ lift = 0 }: { lift?: number }) {
  return (
    <div
      className="bg-white"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "4px 12px 4px 4px",
        borderRadius: 100,
        whiteSpace: "nowrap",
        boxShadow: `0px 3px 10px 0px rgba(0, 0, 0, ${0.28 + 0.04 * lift})`,
      }}
    >
      <Image
        src={avatarMaya}
        alt=""
        sizes="3.5rem"
        quality={90}
        style={{ width: 28, height: 28, borderRadius: "50%", display: "block", maxWidth: "none" }}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p className="text-grey-800" style={{ fontSize: 12, lineHeight: "15px", fontWeight: 600 }}>
          Maya Chen
        </p>
        <p className="text-swag-grey" style={{ fontSize: 10, lineHeight: "12px" }}>
          Office admin
        </p>
      </div>
    </div>
  );
}

function StadiumDisc() {
  return (
    <div
      className="bg-white"
      style={{
        position: "relative",
        width: 30,
        height: 30,
        borderRadius: "50%",
        flexShrink: 0,
        boxShadow: "0px 2.7px 8.2px 0px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Image
        src={stadiumMark}
        alt=""
        style={{ position: "absolute", left: 9.64, top: 8.18, width: 7.71, height: "auto", display: "block", maxWidth: "none" }}
      />
    </div>
  );
}

function NeedTile({
  need,
  f,
  delay,
  lift,
}: {
  need: Need;
  f: number;
  delay: number;
  lift: number;
}) {
  const p = pop(f, delay);
  const count = Math.round(need.n * seg(f, delay + 4, delay + 48));
  return (
    <div
      style={{
        width: 100,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 7,
        opacity: seg(f, delay, delay + 8, LIN),
        transform: `translateY(${(1 - p) * 14 - lift * 3}px)`,
      }}
    >
      <div
        className="bg-chip-surface"
        style={{
          width: 100,
          height: 72,
          borderRadius: 12,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {need.kind === "photo" && need.fit && (
          <div
            style={{
              width: 72,
              height: 72,
              mixBlendMode: "multiply",
              transform: `scale(${0.88 + 0.12 * Math.min(1, p) + 0.07 * lift})`,
            }}
          >
            <Image
              src={need.src}
              alt=""
              sizes="4.5rem"
              quality={90}
              style={{ width: 72, height: 72, objectFit: "contain", display: "block", maxWidth: "none" }}
            />
          </div>
        )}
        {need.kind === "photo" && !need.fit && (
          <div style={{ width: 100, height: 72, transform: `scale(${1 + 0.06 * lift})` }}>
            <Image
              src={need.src}
              alt=""
              sizes="6.25rem"
              quality={90}
              style={{ width: 100, height: 72, objectFit: "cover", display: "block", maxWidth: "none" }}
            />
          </div>
        )}
        {need.kind === "cal" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", transform: `scale(${1 + 0.06 * lift})` }}>
            <p
              className="text-canvas-muted"
              style={{ fontSize: 10, lineHeight: "13px", letterSpacing: 1, fontWeight: 700, textTransform: "uppercase" }}
            >
              Fri
            </p>
            <p className="font-display text-grey-800" style={{ fontSize: 28, lineHeight: "32px" }}>
              14
            </p>
          </div>
        )}
        {need.kind === "stipend" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", transform: `scale(${1 + 0.06 * lift})` }}>
            <p
              className="text-canvas-muted"
              style={{ fontSize: 10, lineHeight: "13px", letterSpacing: 1, fontWeight: 700, textTransform: "uppercase" }}
            >
              Stipend
            </p>
            <p className="font-display text-grey-800" style={{ fontSize: 28, lineHeight: "32px" }}>
              $50
            </p>
          </div>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 1, whiteSpace: "nowrap" }}>
        <p className="text-grey-800" style={{ fontSize: 11, lineHeight: "14px", fontWeight: 600 }}>
          {need.name}
        </p>
        <p className="text-canvas-muted" style={{ fontSize: 10, lineHeight: "13px", fontVariantNumeric: "tabular-nums" }}>
          {count} {need.unit}
        </p>
      </div>
    </div>
  );
}

function CheckCircle({ draw, pulse }: { draw: number; pulse: number }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      style={{ display: "block", flexShrink: 0, transform: `scale(${1 + 0.35 * pulse})` }}
    >
      <path
        d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
        className="stroke-canvas-check"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={Math.min(1, draw * 2)}
      />
      <path
        d="M22 4 12 14.01l-3-3"
        className="stroke-canvas-check"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - draw}
      />
    </svg>
  );
}

function LocationCard({
  j,
  f,
  lift,
  pulse,
  bobY,
}: {
  j: number;
  f: number;
  lift: number;
  pulse: number;
  bobY: number;
}) {
  const L = LOCS[j];
  const delay = 52 + j * 5;
  const p = pop(f, delay);
  return (
    <div
      className="bg-white"
      style={{
        position: "absolute",
        left: j * LOC_PITCH,
        top: LOC_Y,
        width: LOC_W,
        height: LOC_H,
        boxSizing: "border-box",
        padding: 12,
        borderRadius: 12,
        display: "flex",
        flexDirection: "column",
        gap: 9,
        opacity: seg(f, delay, delay + 8, LIN),
        transform: `translateY(${(1 - p) * 28 - lift * 4 + bobY}px) scale(${0.94 + 0.06 * p})`,
        boxShadow: SHADOW(lift),
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {L.flag === "REMOTE" ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Flag code="CA" d={18} />
            <div style={{ marginLeft: -7 }}>
              <Flag code="IN" d={18} />
            </div>
            <div style={{ marginLeft: -7 }}>
              <Flag code="BR" d={18} />
            </div>
          </div>
        ) : (
          <Flag code={L.flag} d={20} />
        )}
        <div style={{ display: "flex", flexDirection: "column", whiteSpace: "nowrap" }}>
          <p className="text-grey-800" style={{ fontSize: 12, lineHeight: "16px", fontWeight: 600 }}>
            {L.city}
          </p>
          <p className="text-canvas-muted" style={{ fontSize: 10, lineHeight: "13px" }}>
            {L.people}
          </p>
        </div>
      </div>
      <div className="bg-grey-200" style={{ height: 1, flexShrink: 0 }} />
      <div style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
        <div style={{ paddingTop: 1 }}>
          <CheckCircle draw={seg(f, delay + 8, delay + 22, LIN)} pulse={pulse} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 1, whiteSpace: "nowrap" }}>
          <p className="text-grey-800" style={{ fontSize: 11, lineHeight: "14px", fontWeight: 600 }}>
            {L.status}
          </p>
          <p className="text-canvas-muted" style={{ fontSize: 10, lineHeight: "13px" }}>
            {L.sub}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ───────────── connectors ───────────── */

/** Cubic bezier point at t for the Stadium → location connector. */
function curvePoint(j: number, y1: number, y2: number, t: number) {
  const x1 = FROM_X[j];
  const x2 = TO_X[j];
  const m = (y2 - y1) / 2;
  const u = 1 - t;
  const x = u * u * u * x1 + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t * t * t * x2;
  const y =
    u * u * u * y1 + 3 * u * u * t * (y1 + m) + 3 * u * t * t * (y2 - m) + t * t * t * y2;
  return { x, y };
}

function Node({ x, y, scale }: { x: number; y: number; scale: number }) {
  return (
    <circle
      cx={x}
      cy={y}
      r={4.5 * scale}
      strokeWidth={1.5}
      className="fill-white stroke-grey-800"
      style={{ display: scale > 0 ? undefined : "none" }}
    />
  );
}

function Packet({ x, y, o }: { x: number; y: number; o: number }) {
  if (o <= 0) return null;
  return (
    <circle
      cx={x}
      cy={y}
      r={5}
      strokeWidth={1.5}
      opacity={o}
      className="fill-white stroke-grey-800"
      style={{ filter: "drop-shadow(0px 0px 6px rgba(255, 255, 255, 0.75))" }}
    />
  );
}

/* ───────────── scene ───────────── */

export function OfficeNeedsBoardScene() {
  const f = useCurrentFrame();
  const lt = Math.max(0, f - INTRO);

  /* floats (0 at both loop ends) */
  const bobAdmin = bob(f, 2, 1.5);
  const bobCard = bob(f, 1, -1.5);
  const bobLoc = [bob(f, 1, -2), bob(f, 2, 2), bob(f, 3, -1.5), bob(f, 2, -2)];

  /* loop: one request at a time */
  const needLift = [0, 0, 0, 0, 0];
  const locLift = [0, 0, 0, 0];
  const locPulse = [0, 0, 0, 0];
  const lineGlow = [0, 0, 0, 0];
  const lineDraw = [0, 0, 0, 0];
  const drop = { o: 0, t: 0 };
  const run = [
    { o: 0, t: 0 },
    { o: 0, t: 0 },
    { o: 0, t: 0 },
    { o: 0, t: 0 },
  ];
  S.forEach((s, k) => {
    needLift[NEED_FOR[k]] += win(lt, s + 6, s + 16, s + 30, s + 42);
    locLift[k] += win(lt, s + 32, s + 42, s + 46, s + 56);
    locPulse[k] += bell(lt, s + 34, s + 50);
    lineGlow[k] += win(lt, s + 14, s + 16, s + 40, s + 48);
    lineDraw[k] += seg(lt, s + 14, s + 34, IN_OUT);
    const dropT = seg(lt, s, s + 9, IN_OUT);
    const dropO = seg(lt, s, s + 2, LIN) * (1 - seg(lt, s + 8, s + 10, LIN));
    if (dropO > 0) {
      drop.o = dropO;
      drop.t = dropT;
    }
    run[k] = {
      t: seg(lt, s + 14, s + 34, IN_OUT),
      o: seg(lt, s + 14, s + 16, LIN) * (1 - seg(lt, s + 32, s + 34, LIN)),
    };
  });

  /* connector endpoints follow the floating cards */
  const adminY = ADMIN_BOTTOM + bobAdmin;
  const cardTopY = CARD_Y + bobCard;
  const cardBottomY = CARD_Y + CARD_H + bobCard;
  const lineIn = seg(f, 4, 16);

  return (
    <div className="font-sans text-grey-800" style={{ position: "relative", width: STAGE_W, height: STAGE_H }}>
      {/* connectors + nodes + packets (behind the cards) */}
      <svg
        width={STAGE_W}
        height={STAGE_H}
        viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
        style={{ position: "absolute", left: 0, top: 0, overflow: "visible", display: "block" }}
      >
        <path
          d={`M ${MID_X} ${adminY} L ${MID_X} ${cardTopY}`}
          fill="none"
          className="stroke-grey-300"
          strokeWidth={1.75}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - lineIn}
        />
        <Node x={MID_X} y={adminY} scale={Math.min(1, pop(f, 4))} />
        <Node x={MID_X} y={cardTopY} scale={Math.min(1, pop(f, 14))} />
        {LOCS.map((_, j) => {
          const y2 = LOC_Y + bobLoc[j];
          const d = `M ${FROM_X[j]} ${cardBottomY} C ${FROM_X[j]} ${cardBottomY + (y2 - cardBottomY) / 2} ${TO_X[j]} ${y2 - (y2 - cardBottomY) / 2} ${TO_X[j]} ${y2}`;
          const draw = seg(f, 40 + j * 5, 58 + j * 5);
          return (
            <g key={j}>
              <path
                d={d}
                fill="none"
                className="stroke-grey-300"
                strokeWidth={1.75}
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - draw}
              />
              <path
                d={d}
                fill="none"
                stroke="#fff"
                strokeWidth={1.75}
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - lineDraw[j]}
                opacity={Math.max(0, Math.min(1, lineGlow[j])) * 0.9}
              />
              <Node x={FROM_X[j]} y={cardBottomY} scale={Math.min(1, pop(f, 40 + j * 5))} />
              <Node x={TO_X[j]} y={y2} scale={Math.min(1, pop(f, 56 + j * 5))} />
            </g>
          );
        })}
        {/* request packets */}
        <Packet x={MID_X} y={adminY + (cardTopY - adminY) * drop.t} o={drop.o} />
        {run.map((r, k) => {
          const y2 = LOC_Y + bobLoc[k];
          const pt = curvePoint(k, cardBottomY, y2, r.t);
          return <Packet key={k} x={pt.x} y={pt.y} o={r.o} />;
        })}
      </svg>

      {/* admin */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: STAGE_W,
          display: "flex",
          justifyContent: "center",
          opacity: seg(f, 0, 8, LIN),
          transform: `translateY(${(1 - pop(f, 0)) * 16 + bobAdmin}px) scale(${0.94 + 0.06 * pop(f, 0)})`,
        }}
      >
        <AvatarPill />
      </div>

      {/* card · Stadium workplace needs */}
      <div
        className="bg-white"
        style={{
          position: "absolute",
          left: CARD_X,
          top: CARD_Y,
          width: CARD_W,
          height: CARD_H,
          boxSizing: "border-box",
          padding: 16,
          borderRadius: 16,
          display: "flex",
          flexDirection: "column",
          gap: 14,
          opacity: seg(f, 8, 16, LIN),
          transform: `translateY(${(1 - pop(f, 8)) * 28 + bobCard}px) scale(${0.96 + 0.04 * pop(f, 8)})`,
          boxShadow: SHADOW(0),
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 33 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <StadiumDisc />
            <div style={{ display: "flex", flexDirection: "column", whiteSpace: "nowrap" }}>
              <p className="font-display text-grey-800" style={{ fontSize: 16, lineHeight: "20px" }}>
                Stadium
              </p>
              <p className="text-canvas-muted" style={{ fontSize: 10, lineHeight: "13px" }}>
                Workplace needs, all locations
              </p>
            </div>
          </div>
          <div className="bg-chip-surface" style={{ padding: "4px 10px", borderRadius: 100 }}>
            <p className="text-grey-800" style={{ fontSize: 11, lineHeight: "14px", fontWeight: 600, whiteSpace: "nowrap" }}>
              This month
            </p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {NEEDS.map((n, i) => (
            <NeedTile key={n.name} need={n} f={f} delay={24 + i * 5} lift={needLift[i]} />
          ))}
        </div>
      </div>

      {/* locations */}
      {LOCS.map((_, j) => (
        <LocationCard key={j} j={j} f={f} lift={locLift[j]} pulse={locPulse[j]} bobY={bobLoc[j]} />
      ))}
    </div>
  );
}
