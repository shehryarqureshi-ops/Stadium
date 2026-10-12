"use client";

/* /wallets-and-budgets hero visual — "Wallet limits" (Figma n9SjmDjzB1PeZAYJ5w43fr
   5443:23150, visual frame "Team wallet · limits checked before money moves"; the
   visible cluster is 441 × 413 at x = 70…511 of the 580-wide frame, so the stage is
   that cluster only; hero-visual-design v2.5, animated mode).
   A pre-funded Marketing wallet shows $25,000 available, the spent bar and two
   limits; underneath, two order tickets: Welcome kits (approved, within every limit)
   and Summit hoodies (held, over the per-order limit, finance approver notified).

   STAGE UNITS. Fixed 441 × 413 stage the Player scales to its container. Bare numbers
   are stage units, NOT CSS px. Colours and fonts come from tokens.

   TIMELINE (30 fps)
     0 – 96     INTRO: wallet card springs in, $25,000 counts up, the spent bar grows,
                the Funded and limit chips pop, the Approved then the Held ticket land
                (check draws, lock and Approve button pop). Frame 96 = the Figma frame
                (also the reduced-motion still).
     96 – 396   LOOP: a new order arrives — the approved ticket lifts and its check
                redraws, the held ticket lifts and its lock pulses, the Approve button
                takes a gentle press, the limit chips nod. Everything returns to rest;
                tickets and card float on whole-cycle sines (±1.5–2). */

import Image from "next/image";
import { useCurrentFrame } from "remotion";

import avatarArun from "@/public/impact/batch3/avatar-arun.png";
import stadiumMark from "@/public/impact/batch3/stadium-mark.svg";

import { INTRO, SceneHost, SHADOW, bell, bob, capsText, pop, seg, win, LIN } from "./shared";

export const STAGE_W = 441;
export const STAGE_H = 413;

/* ───────────── small parts ───────────── */

function Icon({
  d,
  size,
  className,
  strokeWidth = 2,
  draw = 1,
}: {
  d: string;
  size: number;
  className: string;
  strokeWidth?: number;
  draw?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ display: "block", flexShrink: 0 }}>
      <path
        d={d}
        className={className}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - draw}
      />
    </svg>
  );
}

const CHECK = "M20 6 9 17l-5-5";
const SHIELD = "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z";
const CALENDAR =
  "M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM16 2v4M8 2v4M3 10h18";
const LOCK = "M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2zM7 11V7a5 5 0 0 1 10 0v4";

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

/* ───────────── scene ───────────── */

export function WalletLimitsScene() {
  const f = useCurrentFrame();
  const lt = Math.max(0, f - INTRO);

  /* floats (0 at frames 96 and 396) */
  const bobCard = bob(f, 1, -1.5);
  const bobOk = bob(f, 2, 1.5);
  const bobHeld = bob(f, 1, -2);

  /* loop: a new order arrives */
  const okLift = win(lt, 10, 20, 52, 64);
  const checkDraw = 1 - seg(lt, 14, 20, LIN) + seg(lt, 20, 42);
  const checkPulse = bell(lt, 20, 44);
  const heldLift = win(lt, 84, 94, 150, 162);
  const lockPulse = bell(lt, 96, 126) + bell(lt, 126, 150) * 0.6;
  const pillPulse = bell(lt, 100, 130);
  const press = bell(lt, 196, 216);
  const btnLift = win(lt, 186, 196, 216, 228);
  const limitNod = [bell(lt, 240, 266), bell(lt, 252, 278)];
  const fundedPulse = bell(lt, 270, 292);

  /* intro */
  const cardP = pop(f, 0);
  const available = Math.round(25000 * seg(f, 10, 56));
  const spentK = seg(f, 20, 60);
  const spent = Math.round(4520 * spentK);
  const fundedP = pop(f, 34);
  const limP = [pop(f, 44), pop(f, 50)];
  const okP = pop(f, 58);
  const okCheck = seg(f, 66, 86);
  const heldP = pop(f, 68);
  const lockP = pop(f, 74);
  const btnP = pop(f, 76);

  return (
    <div className="font-sans text-grey-800" style={{ position: "relative", width: STAGE_W, height: STAGE_H }}>
      {/* card · Marketing wallet */}
      <div
        className="bg-white"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 380,
          height: 225,
          boxSizing: "border-box",
          padding: 18,
          borderRadius: 16,
          display: "flex",
          flexDirection: "column",
          gap: 14,
          opacity: seg(f, 0, 8, LIN),
          transform: `translateY(${(1 - cardP) * 28 + bobCard}px) scale(${0.96 + 0.04 * cardP})`,
          boxShadow: SHADOW(0),
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 30 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <StadiumDisc />
            <div style={{ display: "flex", flexDirection: "column", whiteSpace: "nowrap" }}>
              <p className="text-grey-800" style={{ fontSize: 13, lineHeight: "17px", fontWeight: 600 }}>
                Marketing wallet
              </p>
              <p className="text-canvas-muted" style={{ fontSize: 10, lineHeight: "13px" }}>
                Pre-funded Nov 1
              </p>
            </div>
          </div>
          <div
            className="bg-canvas-green"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 10px",
              borderRadius: 100,
              opacity: seg(f, 34, 40, LIN),
              transform: `scale(${(0.7 + 0.3 * fundedP) * (1 + 0.06 * fundedPulse)})`,
            }}
          >
            <Icon d={CHECK} size={12} className="stroke-canvas-check" />
            <p className="text-grey-800" style={{ fontSize: 11, lineHeight: "14px", fontWeight: 600 }}>
              Funded
            </p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 2, height: 65 }}>
          <p className="text-canvas-muted" style={capsText}>
            Available to spend
          </p>
          <p
            className="font-display text-grey-800"
            style={{ fontSize: 46, lineHeight: "50px", whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" }}
          >
            ${available.toLocaleString("en-US")}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6, height: 28 }}>
          <div className="bg-grey-200" style={{ height: 8, borderRadius: 4, overflow: "hidden" }}>
            <div className="bg-grey-800" style={{ width: 62 * spentK, height: 8, borderRadius: 4 }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 14 }}>
            <p
              className="text-grey-800"
              style={{ fontSize: 11, lineHeight: "14px", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}
            >
              ${spent.toLocaleString("en-US")} spent
            </p>
            <p className="text-canvas-muted" style={{ fontSize: 11, lineHeight: "14px" }}>
              of $29,520 funded
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, height: 24 }}>
          {[
            { d: SHIELD, label: "$2,000 per order" },
            { d: CALENDAR, label: "$8,000 per month" },
          ].map((c, i) => (
            <div
              key={c.label}
              className="bg-chip-surface"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "5px 10px",
                borderRadius: 100,
                whiteSpace: "nowrap",
                opacity: seg(f, 44 + i * 6, 50 + i * 6, LIN),
                transform: `scale(${(0.7 + 0.3 * limP[i]) * (1 + 0.05 * limitNod[i])})`,
              }}
            >
              <Icon d={c.d} size={12} className="stroke-grey-800" />
              <p className="text-grey-800" style={{ fontSize: 11, lineHeight: "14px", fontWeight: 600 }}>
                {c.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* order · Welcome kits (approved) */}
      <div
        className="bg-white"
        style={{
          position: "absolute",
          left: 61,
          top: 238,
          width: 380,
          height: 54,
          boxSizing: "border-box",
          padding: "12px 14px",
          borderRadius: 14,
          display: "flex",
          alignItems: "center",
          gap: 10,
          opacity: seg(f, 58, 66, LIN),
          transform: `translateY(${(1 - okP) * 28 - okLift * 4 + bobOk}px) scale(${0.94 + 0.06 * okP})`,
          boxShadow: SHADOW(okLift),
        }}
      >
        <div
          className="bg-canvas-green"
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${1 + 0.12 * checkPulse})`,
          }}
        >
          <Icon d={CHECK} size={15} strokeWidth={2.5} className="stroke-canvas-check" draw={f < INTRO ? okCheck : checkDraw} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, whiteSpace: "nowrap" }}>
          <p className="text-grey-800" style={{ fontSize: 12, lineHeight: "16px", fontWeight: 600 }}>
            Welcome kits, 40 orders
          </p>
          <p className="text-canvas-muted" style={{ fontSize: 10, lineHeight: "13px" }}>
            $480, within every limit
          </p>
        </div>
        <div
          className="bg-canvas-green"
          style={{ padding: "3px 8px", borderRadius: 100, transform: `scale(${1 + 0.06 * checkPulse})` }}
        >
          <p className="text-grey-800" style={capsText}>
            Approved
          </p>
        </div>
      </div>

      {/* order · Summit hoodies (held) */}
      <div
        className="bg-white"
        style={{
          position: "absolute",
          left: 61,
          top: 302,
          width: 380,
          height: 111,
          boxSizing: "border-box",
          padding: 14,
          borderRadius: 14,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          opacity: seg(f, 68, 76, LIN),
          transform: `translateY(${(1 - heldP) * 28 - heldLift * 4 + bobHeld}px) scale(${0.94 + 0.06 * heldP})`,
          boxShadow: SHADOW(heldLift),
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, height: 30 }}>
          <div
            className="bg-grey-800"
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${(0.6 + 0.4 * lockP) * (1 + 0.14 * lockPulse)}) rotate(${-8 * lockPulse}deg)`,
            }}
          >
            <Icon d={LOCK} size={15} strokeWidth={2.5} className="stroke-white" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", flex: 1, whiteSpace: "nowrap" }}>
            <p className="text-grey-800" style={{ fontSize: 12, lineHeight: "16px", fontWeight: 600 }}>
              Summit hoodies × 200
            </p>
            <p className="text-canvas-muted" style={{ fontSize: 10, lineHeight: "13px" }}>
              $6,400, over the $2,000 per-order limit
            </p>
          </div>
          <div className="bg-grey-800" style={{ padding: "4px 10px", borderRadius: 100, transform: `scale(${1 + 0.08 * pillPulse})` }}>
            <p className="text-white" style={capsText}>
              Held
            </p>
          </div>
        </div>
        <div className="bg-grey-200" style={{ height: 1, flexShrink: 0 }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, transform: `scale(${0.7 + 0.3 * btnP})`, transformOrigin: "0% 50%", opacity: seg(f, 74, 80, LIN) }}>
            <Image
              src={avatarArun}
              alt=""
              sizes="3.5rem"
              quality={90}
              style={{ width: 22, height: 22, borderRadius: "50%", display: "block", maxWidth: "none", flexShrink: 0 }}
            />
            <div style={{ display: "flex", flexDirection: "column", whiteSpace: "nowrap" }}>
              <p className="text-grey-800" style={{ fontSize: 11, lineHeight: "14px", fontWeight: 600 }}>
                Arun Mehta notified
              </p>
              <p className="text-canvas-muted" style={{ fontSize: 10, lineHeight: "13px" }}>
                Finance approver
              </p>
            </div>
          </div>
          <div
            className="bg-grey-800"
            style={{
              padding: "7px 14px",
              borderRadius: 100,
              opacity: seg(f, 76, 82, LIN),
              transform: `scale(${(0.7 + 0.3 * btnP) * (1 - 0.08 * press + 0.03 * btnLift)})`,
              transformOrigin: "100% 50%",
              boxShadow: btnLift > 0 ? `0px ${3 * btnLift}px ${8 * btnLift}px 0px rgba(0, 0, 0, ${0.25 * btnLift})` : undefined,
            }}
          >
            <p className="text-white" style={{ fontSize: 11, lineHeight: "14px", fontWeight: 600 }}>
              Approve
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WalletLimits() {
  return <SceneHost scene={WalletLimitsScene} width={STAGE_W} height={STAGE_H} />;
}
