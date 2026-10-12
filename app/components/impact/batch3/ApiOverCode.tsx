"use client";

/* /integrations/api hero visual — "In-product reward UI over the API call"
   (Figma n9SjmDjzB1PeZAYJ5w43fr 5443:23290, hero-visual-design v2.5, animated).
   A code card ("POST /v1/rewards", JSON body, "201 Created") sits above the
   customer's own app ("Acme Rewards"). Pure function of the current frame.

   STAGE UNITS. Authored on a 412 × 482 stage (the graphic cluster only: code card at
   x 0, app card at x 72, flush right in the hero). Bare numbers = stage units, not CSS px.
   Figma visual-frame x minus 168 = stage x.

   TIMELINE (30 fps)
     0 – 96   INTRO: the code card lands, the JSON lines type in one by one, "201 Created"
              pops; the app card springs in and its rows, reward tiles and button settle.
              Frame 96 = the Figma frame (also the reduced-motion still).
     96 – 396 LOOP: two request cycles. Send reward presses, a packet travels from the app
              card up to the code card, the 201 Created chip pulses; the Hoodie tile
              breathes the whole time. Every value is at rest at both ends. */

import Image from "next/image";
import { useCurrentFrame } from "remotion";

import avatarMaya from "@/public/impact/batch3/avatar-maya.png";
import photoHoodie from "@/public/impact/batch3/photo-hoodie.jpg";
import photoSnacks from "@/public/impact/batch3/photo-snacks.jpg";
import stadiumMark from "@/public/impact/batch3/stadium-mark.svg";

import { bell, bob, capsText, INTRO, LIN, LOOP, pop, SceneHost, seg, SHADOW, SHADOW_FLOAT, win } from "./shared";

export const STAGE_W = 412;
export const STAGE_H = 482;

const APP_X = 72;
const APP_Y = 211;
/** Packet column: the gap between the Hoodie and Snack box wells. */
const PACKET_X = 294.67;
const PACKET_FROM = 448;
const PACKET_TO = 186;

/** Loop-local start frames of the two request cycles. */
const CYCLES = [10, 160] as const;

const JSON_LINES = [
  { key: null, val: "{", pad: false },
  { key: '  "recipient":', val: '"priya@northwind.com",', pad: true },
  { key: '  "item":', val: '"hoodie-indigo",', pad: true },
  { key: '  "message":', val: '"Thanks for the win!"', pad: true },
  { key: null, val: "}", pad: false },
] as const;

/* ───────────── icons (feather-style, 24 viewBox) ───────────── */

function AwardIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-white" style={{ display: "block" }}>
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  );
}

function CheckIcon({ size, scale = 1 }: { size: number; scale?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-canvas-check" style={{ display: "block", flexShrink: 0, transform: `scale(${scale})` }}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

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

/* ───────────── scene ───────────── */

export function ApiOverCodeScene() {
  const f = useCurrentFrame();
  const lt = Math.max(0, f - INTRO);

  /* idle floats (0 at frames 96 and 396) */
  const bobCode = bob(f, 1, -1.5);
  const bobApp = bob(f, 2, 1.5);

  /* loop events */
  let press = 0;
  let pulse = 0;
  let codeLift = 0;
  let packetT = 0;
  let packetO = 0;
  CYCLES.forEach((s) => {
    press += win(lt, s, s + 6, s + 10, s + 18);
    pulse += bell(lt, s + 44, s + 70);
    codeLift += win(lt, s + 40, s + 48, s + 60, s + 72);
    const o = seg(lt, s + 10, s + 12, LIN) * (1 - seg(lt, s + 42, s + 46, LIN));
    if (o > 0) {
      packetO = o;
      packetT = seg(lt, s + 10, s + 46);
    }
  });
  const breath = (1 - Math.cos((2 * Math.PI * 2 * lt) / LOOP)) / 2;

  /* intro */
  const pCode = pop(f, 0);
  const pApp = pop(f, 30);
  const pChip = pop(f, 50);
  const appFade = (d: number) => ({ opacity: seg(f, d, d + 8, LIN), transform: `translateY(${(1 - pop(f, d)) * 8}px)` });

  return (
    <div className="font-sans text-grey-800" style={{ position: "relative", width: STAGE_W, height: STAGE_H }}>
      {/* card · API request */}
      <div
        className="bg-white"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 372,
          height: 199,
          boxSizing: "border-box",
          padding: 16,
          borderRadius: 16,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          opacity: seg(f, 0, 8, LIN),
          transform: `translateY(${(1 - pCode) * -22 - codeLift * 3 + bobCode}px) scale(${0.96 + 0.04 * pCode})`,
          boxShadow: SHADOW_FLOAT(codeLift),
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, height: 19 }}>
          <div className="bg-grey-800" style={{ padding: "3px 8px", borderRadius: 6 }}>
            <p className="font-mono text-white" style={{ fontSize: 10, lineHeight: "13px", fontWeight: 500 }}>
              POST
            </p>
          </div>
          <p className="font-mono text-grey-800" style={{ fontSize: 12, lineHeight: "16px", fontWeight: 500 }}>
            /v1/rewards
          </p>
        </div>

        <div
          className="bg-grey-100"
          style={{ height: 108, boxSizing: "border-box", padding: "10px 12px", borderRadius: 10, display: "flex", flexDirection: "column", gap: 2 }}
        >
          {JSON_LINES.map((l, i) => {
            const t = seg(f, 12 + i * 6, 22 + i * 6, LIN);
            return (
              <div
                key={i}
                className="font-mono"
                style={{
                  display: "flex",
                  gap: 5,
                  height: 16,
                  fontSize: 11,
                  lineHeight: "16px",
                  whiteSpace: "pre",
                  opacity: Math.min(1, t * 2),
                  clipPath: `inset(0 ${100 - 100 * t}% 0 0)`,
                }}
              >
                {l.key && (
                  <span className="text-grey-800" style={{ fontWeight: 500 }}>
                    {l.key}
                  </span>
                )}
                <span className={l.pad ? "text-swag-grey" : "text-canvas-muted"}>{l.val}</span>
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, height: 20 }}>
          <div
            className="bg-canvas-green"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "3px 8px",
              borderRadius: 100,
              opacity: seg(f, 50, 56, LIN),
              transform: `scale(${(0.6 + 0.4 * pChip) * (1 + 0.1 * pulse)})`,
              transformOrigin: "left center",
              boxShadow: `0 0 0 ${5 * pulse}px rgba(38, 115, 55, ${0.22 * pulse})`,
            }}
          >
            <CheckIcon size={12} scale={1 + 0.15 * pulse} />
            <p className="text-grey-800" style={{ fontSize: 11, lineHeight: "14px", fontWeight: 600, whiteSpace: "nowrap" }}>
              201 Created
            </p>
          </div>
          <p className="text-swag-grey" style={{ fontSize: 11, lineHeight: "14px", whiteSpace: "nowrap", opacity: seg(f, 56, 66, LIN) }}>
            Ships in 2 days, tracking emailed
          </p>
        </div>
      </div>

      {/* card · app — Acme Rewards */}
      <div
        className="bg-white"
        style={{
          position: "absolute",
          left: APP_X,
          top: APP_Y,
          width: 340,
          height: 271,
          boxSizing: "border-box",
          padding: 16,
          borderRadius: 16,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          opacity: seg(f, 30, 38, LIN),
          transform: `translateY(${(1 - pApp) * 28 + bobApp}px) scale(${0.96 + 0.04 * pApp})`,
          boxShadow: SHADOW(0),
        }}
      >
        {/* header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 26, ...appFade(36) }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div className="bg-grey-800" style={{ width: 26, height: 26, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <AwardIcon size={13} />
            </div>
            <p className="text-grey-800" style={{ fontSize: 13, lineHeight: "17px", fontWeight: 600, whiteSpace: "nowrap" }}>
              Acme Rewards
            </p>
          </div>
          <div className="bg-chip-surface" style={{ display: "flex", alignItems: "center", gap: 5, padding: "3px 8px", borderRadius: 100 }}>
            <StadiumDisc d={14} />
            <p className="text-grey-600" style={{ fontSize: 10, lineHeight: "13px", fontWeight: 600, whiteSpace: "nowrap" }}>
              Powered by Stadium
            </p>
          </div>
        </div>

        {/* recipient */}
        <div style={{ display: "flex", flexDirection: "column", gap: 5, ...appFade(42) }}>
          <p className="text-canvas-muted" style={capsText}>
            Send a reward to
          </p>
          <div
            className="bg-grey-100 border-grey-200"
            style={{ height: 40, boxSizing: "border-box", padding: "9px 12px", borderRadius: 10, borderWidth: 1, borderStyle: "solid", display: "flex", alignItems: "center", gap: 8 }}
          >
            <Image src={avatarMaya} alt="" sizes="1.25rem" quality={90} style={{ width: 20, height: 20, borderRadius: "50%", display: "block", maxWidth: "none" }} />
            <p className="text-grey-800" style={{ fontSize: 12, lineHeight: "16px", whiteSpace: "nowrap" }}>
              priya@northwind.com
            </p>
          </div>
        </div>

        {/* reward picker */}
        <div style={{ display: "flex", gap: 8 }}>
          {/* gift card */}
          <div style={{ width: 97.33, display: "flex", flexDirection: "column", gap: 5, ...appFade(48) }}>
            <div className="bg-chip-surface" style={{ width: 96, height: 64, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <p className="text-canvas-muted" style={capsText}>
                  Gift card
                </p>
                <p className="font-display text-grey-800" style={{ fontSize: 22, lineHeight: "26px" }}>
                  $25
                </p>
              </div>
            </div>
            <p className="text-swag-grey" style={{ fontSize: 11, lineHeight: "14px", fontWeight: 600 }}>
              Gift card
            </p>
          </div>

          {/* hoodie (selected, breathes) */}
          <div
            style={{
              width: 97.33,
              display: "flex",
              flexDirection: "column",
              gap: 5,
              opacity: seg(f, 54, 62, LIN),
              transform: `translateY(${(1 - pop(f, 54)) * 8}px) scale(${1 + 0.035 * breath})`,
            }}
          >
            <div className="bg-chip-surface" style={{ position: "relative", width: 96, height: 64, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 56, height: 56, mixBlendMode: "multiply", transform: `scale(${1 + 0.07 * breath})` }}>
                <Image src={photoHoodie} alt="" sizes="3.5rem" quality={90} style={{ width: 56, height: 56, objectFit: "contain", display: "block", maxWidth: "none" }} />
              </div>
              <div
                className="border-grey-800"
                style={{ position: "absolute", inset: 0, boxSizing: "border-box", borderRadius: 10, borderWidth: 2, borderStyle: "solid", opacity: seg(f, 62, 70, LIN) }}
              />
            </div>
            <p className="text-grey-800" style={{ fontSize: 11, lineHeight: "14px", fontWeight: 600 }}>
              Hoodie
            </p>
          </div>

          {/* snack box */}
          <div style={{ width: 97.33, display: "flex", flexDirection: "column", gap: 5, ...appFade(60) }}>
            <div className="bg-chip-surface" style={{ width: 96, height: 64, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Image src={photoSnacks} alt="" sizes="3.5rem" quality={90} style={{ width: 56, height: 56, objectFit: "cover", display: "block", maxWidth: "none" }} />
            </div>
            <p className="text-swag-grey" style={{ fontSize: 11, lineHeight: "14px", fontWeight: 600 }}>
              Snack box
            </p>
          </div>
        </div>

        {/* button */}
        <div
          className="bg-grey-800"
          style={{
            height: 36,
            borderRadius: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: seg(f, 66, 74, LIN),
            transform: `translateY(${(1 - pop(f, 66)) * 8}px) scale(${1 - 0.04 * press})`,
          }}
        >
          <p className="text-white" style={{ fontSize: 12, lineHeight: "16px", fontWeight: 600 }}>
            Send reward
          </p>
        </div>
      </div>

      {/* request packet: app card → code card */}
      {packetO > 0 && (
        <div
          className="bg-grey-800"
          style={{
            position: "absolute",
            left: PACKET_X - 4,
            top: PACKET_FROM + (PACKET_TO - PACKET_FROM) * packetT - 4,
            width: 8,
            height: 8,
            borderRadius: "50%",
            opacity: packetO,
            boxShadow: "0 0 0 3px rgba(24, 24, 24, 0.14)",
          }}
        />
      )}
    </div>
  );
}

export default function ApiOverCode() {
  return <SceneHost scene={ApiOverCodeScene} width={STAGE_W} height={STAGE_H} />;
}
