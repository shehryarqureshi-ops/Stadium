"use client";

/* /integrations/hris hero visual — "HRIS record → automatic moments"
   (Figma n9SjmDjzB1PeZAYJ5w43fr 5443:23220, visual frame = the 580 × 329 cluster;
   hero-visual-design v2.5, animated). One UKG employee record → three Stadium
   moments scheduled automatically from its fields.

   STAGE UNITS: bare numbers = stage units (not CSS px); colours/fonts are tokens.

   TIMELINE (30 fps)
     0 – 96    INTRO: the record card lands, its fields fill in one by one, the
               three connectors draw (start date → welcome kit, birthday → gift,
               anniversary → 1-year anniversary) and each moment card slides in.
               Frame 96 = the Figma frame (also the reduced-motion still).
     96 – 396  LOOP (300 f): Start date, Birthday, Work anniversary in turn — the
               field highlights, a packet runs along its connector, the matching
               moment card lifts and its "Automatic" chip pulses. Everything is at
               its rest pose at both ends; cards float on whole-cycle sines. */

import Image from "next/image";
import { useCurrentFrame } from "remotion";

import avatarGrace from "@/public/impact/batch3/avatar-grace.png";
import logoUkg from "@/public/impact/batch3/logo-ukg.svg";
import photoAnniv from "@/public/impact/batch3/photo-anniv.jpg";
import photoGift from "@/public/impact/batch3/photo-gift.jpg";
import photoHoodie from "@/public/impact/batch3/photo-hoodie.jpg";

import { IN_OUT, INTRO, LIN, SHADOW, SceneHost, bell, bob, capsText, pop, seg, win } from "./shared";

export const STAGE_W = 580;
export const STAGE_H = 329;

/* geometry (Figma, visual-local) */
const REC_W = 250;
const MOM_X = 330;
const MOM_W = 250;
const MOM_H = 84;
const MOM_Y = [0, 123, 245] as const;
const FIELD_X = 234.5;
const FIELD_Y = [130.5, 183.5, 236.5] as const;
const MOM_NODE_X = 330.5;
const MOM_NODE_Y = [42.5, 164.5, 287.5] as const;
const MID_X = 282.5;

const FIELDS = [
  { label: "Start date", value: "Mon, 3 Nov", bg: "bg-chip-surface" },
  { label: "Birthday", value: "12 March", bg: "bg-chip-surface" },
  { label: "Work anniversary", value: "3 November", bg: "bg-chip-surface" },
  { label: "Location", value: "Madrid, Spain", bg: "bg-grey-100" },
] as const;

const MOMENTS = [
  { title: "Welcome kit", sub: "Ships before Mon, 3 Nov", photo: photoHoodie, multiply: true },
  { title: "Birthday gift", sub: "Arrives Thu, 12 Mar", photo: photoGift, multiply: false },
  { title: "1-year anniversary", sub: "Arrives Tue, 3 Nov 2026", photo: photoAnniv, multiply: false },
] as const;

/** loop: event k starts at S[k] (loop frames) */
const S = [16, 106, 196] as const;

/* horizontal-tangent connector (field → moment) */
const hPath = (y1: number, y2: number) =>
  `M ${FIELD_X} ${y1} C ${MID_X} ${y1} ${MID_X} ${y2} ${MOM_NODE_X} ${y2}`;
function hPoint(y1: number, y2: number, t: number) {
  const u = 1 - t;
  return {
    x: u * u * u * FIELD_X + 3 * u * u * t * MID_X + 3 * u * t * t * MID_X + t * t * t * MOM_NODE_X,
    y: u * u * u * y1 + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t * y2,
  };
}

function Zap() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ display: "block", flexShrink: 0 }}>
      <path
        d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"
        className="stroke-grey-800"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
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

export function HrisScene() {
  const f = useCurrentFrame();
  const lt = Math.max(0, f - INTRO);

  const bobRec = bob(f, 1, -1.5);
  const bobMom = [bob(f, 2, 2), bob(f, 1, -2), bob(f, 3, 1.5)];

  const hl = [0, 0, 0]; // field highlight
  const lift = [0, 0, 0]; // moment lift
  const chipPulse = [0, 0, 0];
  const glow = [0, 0, 0];
  const run = [
    { t: 0, o: 0 },
    { t: 0, o: 0 },
    { t: 0, o: 0 },
  ];
  S.forEach((s, k) => {
    hl[k] = win(lt, s, s + 8, s + 40, s + 52);
    glow[k] = win(lt, s + 10, s + 12, s + 36, s + 44);
    run[k] = {
      t: seg(lt, s + 10, s + 34, IN_OUT),
      o: seg(lt, s + 10, s + 12, LIN) * (1 - seg(lt, s + 32, s + 34, LIN)),
    };
    lift[k] = win(lt, s + 30, s + 40, s + 54, s + 66);
    chipPulse[k] = bell(lt, s + 34, s + 52);
  });

  const recP = pop(f, 0);
  const fy = (i: number) => FIELD_Y[i] + bobRec;
  const my = (j: number) => MOM_NODE_Y[j] + bobMom[j] - lift[j] * 4;

  return (
    <div className="font-sans text-grey-800" style={{ position: "relative", width: STAGE_W, height: STAGE_H }}>
      {/* connectors, nodes, packets (behind the cards) */}
      <svg
        width={STAGE_W}
        height={STAGE_H}
        viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
        style={{ position: "absolute", left: 0, top: 0, overflow: "visible", display: "block" }}
      >
        {[0, 1, 2].map((j) => {
          const y1 = fy(j);
          const y2 = my(j);
          const d = hPath(y1, y2);
          const draw = seg(f, 36 + j * 8, 52 + j * 8);
          const g = Math.max(0, Math.min(1, glow[j]));
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
                strokeDashoffset={1 - run[j].t}
                opacity={g * 0.9}
              />
              <Node x={FIELD_X} y={y1} scale={Math.min(1, pop(f, 34 + j * 8)) * (1 + 0.3 * hl[j])} />
              <Node x={MOM_NODE_X} y={y2} scale={Math.min(1, pop(f, 50 + j * 8))} />
            </g>
          );
        })}
        {[0, 1, 2].map((k) => {
          const pt = hPoint(fy(k), my(k), run[k].t);
          return <Packet key={k} x={pt.x} y={pt.y} o={run[k].o} />;
        })}
      </svg>

      {/* card · UKG employee record */}
      <div
        className="bg-white"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: REC_W,
          height: STAGE_H,
          boxSizing: "border-box",
          padding: 16,
          borderRadius: 16,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          opacity: seg(f, 0, 8, LIN),
          transform: `translateY(${(1 - recP) * 28 + bobRec}px) scale(${0.96 + 0.04 * recP})`,
          boxShadow: SHADOW(0),
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 18, flexShrink: 0 }}>
          <Image
            src={logoUkg}
            alt=""
            style={{ width: 45.1, height: 17.9, display: "block", maxWidth: "none" }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
              className="bg-canvas-check"
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                transform: `scale(${1 + 0.35 * bell(f, 14, 34)})`,
              }}
            />
            <p className="text-grey-800" style={{ fontSize: 10, lineHeight: "13px", fontWeight: 600, whiteSpace: "nowrap" }}>
              Synced 2 min ago
            </p>
          </div>
        </div>
        <div className="bg-grey-200" style={{ height: 1, flexShrink: 0 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <Image
            src={avatarGrace}
            alt=""
            sizes="2.25rem"
            quality={90}
            style={{ width: 36, height: 36, borderRadius: "50%", display: "block", maxWidth: "none" }}
          />
          <div style={{ display: "flex", flexDirection: "column", whiteSpace: "nowrap" }}>
            <p className="text-grey-800" style={{ fontSize: 14, lineHeight: "18px", fontWeight: 600 }}>
              Grace Adeyemi
            </p>
            <p className="text-canvas-muted" style={{ fontSize: 10, lineHeight: "13px" }}>
              Brand Designer, Madrid
            </p>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {FIELDS.map((fl, i) => {
            const d = 12 + i * 5;
            const reveal = seg(f, d + 4, d + 18, LIN);
            const h = i < 3 ? hl[i] : 0;
            return (
              <div
                key={fl.label}
                className={fl.bg}
                style={{
                  position: "relative",
                  height: 47,
                  boxSizing: "border-box",
                  padding: "9px 12px",
                  borderRadius: 10,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  opacity: seg(f, d, d + 8, LIN),
                  transform: `translateY(${(1 - Math.min(1, pop(f, d))) * 8}px)`,
                }}
              >
                <p className="text-canvas-muted" style={{ ...capsText, textTransform: "uppercase" }}>
                  {fl.label}
                </p>
                <p
                  className="text-grey-800"
                  style={{
                    fontSize: 12,
                    lineHeight: "16px",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    clipPath: `inset(0 ${(1 - reveal) * 100}% 0 0)`,
                  }}
                >
                  {fl.value}
                </p>
                <div
                  className="border-grey-800"
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 10,
                    borderWidth: 1.5,
                    borderStyle: "solid",
                    boxSizing: "border-box",
                    opacity: h,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* moments */}
      {MOMENTS.map((m, j) => {
        const d = 48 + j * 8;
        const p = pop(f, d);
        return (
          <div
            key={m.title}
            className="bg-white"
            style={{
              position: "absolute",
              left: MOM_X,
              top: MOM_Y[j],
              width: MOM_W,
              height: MOM_H,
              boxSizing: "border-box",
              padding: 12,
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              gap: 12,
              opacity: seg(f, d, d + 8, LIN),
              transform: `translate(${(1 - p) * 24}px, ${bobMom[j] - lift[j] * 4}px) scale(${0.96 + 0.04 * p})`,
              boxShadow: SHADOW(lift[j]),
            }}
          >
            <div
              className="bg-chip-surface"
              style={{ width: 60, height: 60, borderRadius: 10, overflow: "hidden", flexShrink: 0, position: "relative" }}
            >
              <div
                style={{
                  width: 60,
                  height: 60,
                  mixBlendMode: m.multiply ? "multiply" : undefined,
                  transform: `scale(${1 + 0.06 * lift[j]})`,
                }}
              >
                <Image
                  src={m.photo}
                  alt=""
                  sizes="3.75rem"
                  quality={90}
                  style={{ width: 60, height: 60, objectFit: "cover", display: "block", maxWidth: "none" }}
                />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 3, whiteSpace: "nowrap" }}>
              <p className="text-grey-800" style={{ fontSize: 13, lineHeight: "17px", fontWeight: 600 }}>
                {m.title}
              </p>
              <p className="text-swag-grey" style={{ fontSize: 10, lineHeight: "13px" }}>
                {m.sub}
              </p>
              <div
                className="bg-chip-surface"
                style={{
                  alignSelf: "flex-start",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  height: 20,
                  boxSizing: "border-box",
                  padding: "3px 8px",
                  borderRadius: 100,
                  transform: `scale(${1 + 0.1 * chipPulse[j]})`,
                  transformOrigin: "left center",
                }}
              >
                <Zap />
                <p className="text-grey-800" style={{ fontSize: 11, lineHeight: "14px", fontWeight: 600 }}>
                  Automatic
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function HrisMoments() {
  return <SceneHost scene={HrisScene} width={STAGE_W} height={STAGE_H} />;
}
