"use client";

/* /impact/leadership hero visual — "Governance" (Figma cGznwzQVViaYtxp3zcZk97 139:19124
   "visual · Leadership governance (final)", inside 128:24276; stage 580 × 574).
   An ARCADE workspace card (7 teams, 14 programs, spend vs remaining) feeds a tray of company
   guardrails (budget cap, approval threshold, approved catalog, applies-to-teams strip), and a
   Sales request that breaks the $250 guardrail is routed to the COO. A Remotion composition:
   every element is a pure function of the current frame, so the Player can play, pause and seek.

   STAGE UNITS. Authored on a fixed 580 × 574 stage that the Player scales to its container, so
   bare numbers in the style objects are stage units, NOT CSS px (the one place the "no hardcoded
   px" rule intentionally doesn't apply — see design.md → "/impact/leadership hero"). Coordinates
   are the Figma frame's own; colours and fonts come from tokens.

   TIMELINE (30 fps)
     0 – 96     INTRO: the workspace card springs in and its four numbers count up, the avatars
                pop, the connector draws down into the guardrails tray, the tray lands, its
                three rules follow (the cap counts $0 → $25,000, both toggles flip on), the
                "Applies to" strip and its five team labels pop, the second connector draws and
                the approval notice lands. Frame 96 is exactly the Figma frame → also the still
                used for prefers-reduced-motion.
     96 – 396   LOOP (300 frames): a policy packet runs down into the tray, each rule lights in
                turn (the approval toggle is switched off and back on), a second packet lights
                the five team labels left → right and runs on to the notice, which lifts.
                Every value is at its Figma rest pose at both loop ends (seamless).

   NO CROP. overflowVisible on the Player; nothing moves more than a few units from its rest. */

import Image from "next/image";
import { Easing, interpolate, spring, useCurrentFrame } from "remotion";

import avatarArun from "@/public/impact/leadership/hero/avatar-arun.webp";
import avatarSales from "@/public/impact/leadership/hero/avatar-sales.webp";
import workspaceAvatars from "@/public/impact/leadership/hero/workspace-avatars.webp";

export const STAGE_W = 580;
export const STAGE_H = 574;
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

const win = (t: number, a: number, b: number, c: number, d: number) => seg(t, a, b, IN_OUT) - seg(t, c, d, IN_OUT);

/** Whole-cycle float; ramps in with the intro's last frames. */
const bob = (f: number, cycles: number, amp: number) =>
  seg(f, 56, INTRO, LIN) * Math.sin((2 * Math.PI * cycles * (f - INTRO)) / LOOP) * amp;

const num = (n: number) => Math.round(n).toLocaleString("en-US");

/* ───────────── layout (Figma frame coordinates) ───────────── */

const TEAMS = [
  { label: "HR", left: 0, w: 36, bg: "bg-canvas-lilac" },
  { label: "Marketing", left: 42, w: 87, bg: "bg-canvas-pink" },
  { label: "Sales", left: 135, w: 55, bg: "bg-canvas-blue" },
  { label: "CX", left: 196, w: 34, bg: "bg-canvas-green" },
  { label: "Finance", left: 236, w: 69, bg: "bg-canvas-yellow" },
] as const;

const OVERVIEW = [
  { n: 7, label: "teams", pre: "", w: 11 },
  { n: 14, label: "programs", pre: "", w: 21 },
  { n: 148200, label: "spent", pre: "$", w: 87 },
  { n: 26800, label: "remaining", pre: "$", w: 79 },
] as const;

const RULES = [
  { y: 66, title: "Budget limit per team", sub: "Every team spends inside its own cap" },
  { y: 129, title: "Approval over $250", sub: "Larger gifts need sign-off first" },
  { y: 192, title: "One approved catalog", sub: "Only vetted vendors, swag and gifts" },
] as const;

const ruleDelay = (i: number) => 34 + 8 * i;
const ruleLight = (lt: number, i: number) => bell(lt, 44 + 28 * i, 44 + 28 * i + 30);
const PACKET_RUN = 12;
const PACKET_A = 20; // workspace → tray
const PACKET_B = 150; // tray → notice (labels light just before)

const SHADOW_DARK = (lift: number) => `0px ${13.8 + 4 * lift}px ${34.5 + 6 * lift}px 0px rgba(0, 0, 0, ${0.35 + 0.05 * lift})`;

function Toggle({ on }: { on: number }) {
  return (
    <div
      style={{
        position: "absolute",
        left: 488,
        top: 15.5,
        width: 48,
        height: 24,
        borderRadius: 24,
        backgroundColor: `color-mix(in srgb, var(--color-governance-on) ${on * 100}%, var(--color-grey-300))`,
      }}
    >
      <div className="bg-white" style={{ position: "absolute", top: 4, left: 4 + 24 * on, width: 16, height: 16, borderRadius: "50%" }} />
    </div>
  );
}

function Connector({ x, y, grow, packetT, cls }: { x: number; y: number; grow: number; packetT: number; cls: string }) {
  return (
    <>
      <div
        className={cls}
        style={{ position: "absolute", left: x, top: y, width: 2, height: 32, borderRadius: 1, zIndex: 2, transformOrigin: "50% 0%", transform: `scaleY(${grow})` }}
      />
      {[y - 4.5, y + 27.5].map((ny, i) => (
        <div
          key={i}
          className="bg-white"
          style={{ position: "absolute", left: x - 3.5, top: ny, width: 9, height: 9, borderRadius: "50%", zIndex: 2, opacity: i === 0 ? Math.min(1, grow * 4) : seg(grow, 0.85, 1, LIN) }}
        />
      ))}
      {packetT >= 0 && packetT <= PACKET_RUN + 2 && (
        <div
          className="bg-signal-green"
          style={{
            position: "absolute",
            left: x + 1 - 4,
            top: y + 32 * seg(packetT, 0, PACKET_RUN, IN_OUT) - 4,
            width: 8,
            height: 8,
            borderRadius: "50%",
            zIndex: 3,
            opacity: 1 - seg(packetT, PACKET_RUN - 2, PACKET_RUN + 2, LIN),
            boxShadow: "0px 0px 8px 0px rgba(47, 166, 79, 0.55)",
          }}
        />
      )}
    </>
  );
}

/* ───────────── scene ───────────── */

export function GovernanceScene() {
  const f = useCurrentFrame();
  const lt = Math.max(0, f - INTRO);

  const wsP = pop(f, 0, 17);
  const avP = pop(f, 12);
  const trayP = pop(f, 26, 17);
  const stripP = pop(f, 58, 17);
  const eventP = pop(f, 76, 17);
  const conn1 = seg(f, 16, 30);
  const conn2 = seg(f, 70, 84);

  /* intro numbers */
  const counts = OVERVIEW.map((o, i) => o.n * seg(f, 14 + 4 * i, 56 + 4 * i));
  const cap = Math.round(25000 * seg(f, 44, 82));
  const approvalOn = seg(f, 64, 74) * (1 - win(lt, 100, 108, 128, 136));
  const catalogOn = seg(f, 72, 82);

  /* loop */
  const wsLift = win(lt, PACKET_A - 8, PACKET_A + 4, PACKET_A + 12, PACKET_A + 28);
  const packetA = lt - PACKET_A;
  const packetB = lt - PACKET_B;
  const labelLight = (i: number) => bell(lt - PACKET_B, -22 + 7 * i, -22 + 7 * i + 24);
  const stripLight = bell(lt - PACKET_B, -24, 10);
  const eventLift = win(lt, PACKET_B + 12, PACKET_B + 24, PACKET_B + 36, PACKET_B + 56);

  return (
    <div style={{ position: "relative", width: STAGE_W, height: STAGE_H, transform: `translateY(${bob(f, 1, 2.5)}px)` }} className="font-sans">
      {/* workspace · governed */}
      <div
        className="bg-white"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: STAGE_W,
          height: 145.9,
          borderRadius: 18.4,
          opacity: seg(f, 0, 8, LIN),
          transform: `translateY(${(1 - wsP) * 28 - wsLift * 3}px) scale(${0.96 + 0.04 * wsP})`,
          boxShadow: SHADOW_DARK(wsLift),
        }}
      >
        <div style={{ position: "absolute", left: 23, top: 20, whiteSpace: "nowrap" }}>
          <p className="font-sans font-bold text-swag-ink" style={{ fontSize: 20.7, lineHeight: "26px" }}>
            ARCADE workspace
          </p>
          <p className="font-sans text-swag-grey" style={{ fontSize: 13.8, lineHeight: "17px", marginTop: 2.3 }}>
            Company-wide view
          </p>
        </div>
        <Image
          src={workspaceAvatars}
          alt=""
          sizes="12rem"
          quality={90}
          style={{
            position: "absolute",
            left: 386.8,
            top: 26.5,
            width: 170.2,
            height: 32.2,
            maxWidth: "none",
            opacity: seg(f, 12, 20, LIN),
            transform: `scale(${0.9 + 0.1 * avP})`,
            transformOrigin: "100% 50%",
          }}
        />
        {OVERVIEW.map((o, i) => (
          <div key={o.label} style={{ position: "absolute", left: 23 + 133.5 * i, top: 83.7, whiteSpace: "nowrap" }}>
            <p className="font-sans font-bold text-swag-ink" style={{ fontSize: 19.55, lineHeight: "25px" }}>
              {o.pre}
              {num(counts[i])}
            </p>
            <p className="font-sans text-swag-grey" style={{ fontSize: 12.65, lineHeight: "16px", marginTop: 1.1 }}>
              {o.label}
            </p>
          </div>
        ))}
      </div>

      {/* tray · company guardrails */}
      <div
        className="bg-governance-tray"
        style={{
          position: "absolute",
          left: 0,
          top: 177.9,
          width: STAGE_W,
          height: 313,
          borderRadius: 20,
          opacity: seg(f, 26, 34, LIN),
          transform: `translateY(${(1 - trayP) * 28}px) scale(${0.96 + 0.04 * trayP})`,
          boxShadow: "0px 6px 16px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div style={{ position: "absolute", left: 14, top: 14, width: 552, height: 44 }}>
          <div
            className="bg-grey-800"
            style={{ position: "absolute", left: 0, top: 6, width: 28, height: 28, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", opacity: seg(f, 30, 38, LIN) }}
          >
            <svg width={14} height={14} viewBox="0 0 14 14" fill="none" stroke="#fff" strokeWidth={1.16667} strokeLinecap="round" strokeLinejoin="round">
              <path d="M6.99984 12.8334C6.99984 12.8334 11.6665 10.5 11.6665 7.00002V2.91669L6.99984 1.16668L2.33317 2.91669V7.00002C2.33317 10.5 6.99984 12.8334 6.99984 12.8334Z" />
            </svg>
          </div>
          <p className="font-sans font-bold text-grey-800" style={{ position: "absolute", left: 38, top: 10, fontSize: 15, lineHeight: "20px", whiteSpace: "nowrap", opacity: seg(f, 30, 38, LIN) }}>
            Company guardrails
          </p>
          <div
            className="bg-white"
            style={{
              position: "absolute",
              left: 435,
              top: 2,
              width: 117,
              height: 36,
              borderRadius: 100,
              opacity: seg(f, 36, 44, LIN),
              transform: `scale(${0.9 + 0.1 * pop(f, 36)})`,
              transformOrigin: "100% 50%",
            }}
          >
            <Image src={avatarArun} alt="" width={28} height={28} style={{ position: "absolute", left: 4, top: 4, width: 28, height: 28, borderRadius: "50%" }} />
            <div style={{ position: "absolute", left: 40, top: 4.5, whiteSpace: "nowrap" }}>
              <p className="font-sans font-semibold text-grey-800" style={{ fontSize: 12, lineHeight: "15px" }}>
                Arun Mehta
              </p>
              <p className="font-sans text-swag-grey" style={{ fontSize: 10, lineHeight: "12px" }}>
                COO
              </p>
            </div>
          </div>
        </div>

        {RULES.map((r, i) => {
          const p = pop(f, ruleDelay(i), 17);
          const lit = ruleLight(lt, i);
          return (
            <div
              key={r.title}
              className="bg-white"
              style={{
                position: "absolute",
                left: 14,
                top: r.y,
                width: 552,
                height: 55,
                borderRadius: 16,
                opacity: seg(f, ruleDelay(i), ruleDelay(i) + 8, LIN),
                transform: `translateY(${(1 - p) * 16 - lit * 2}px)`,
                boxShadow: `0px ${2 + 8 * lit}px ${6 + 12 * lit}px 0px rgba(0, 0, 0, ${0.1 * lit})`,
              }}
            >
              <div style={{ position: "absolute", left: 16, top: 10, whiteSpace: "nowrap" }}>
                <p className="font-sans font-semibold text-grey-800" style={{ fontSize: 13, lineHeight: "18px" }}>
                  {r.title}
                </p>
                <p className="font-sans text-swag-grey" style={{ fontSize: 11, lineHeight: "14px", marginTop: 3 }}>
                  {r.sub}
                </p>
              </div>
              {i === 0 && (
                <div
                  className="bg-chip-surface"
                  style={{
                    position: "absolute",
                    left: 427,
                    top: 12.5,
                    width: 109,
                    height: 30,
                    borderRadius: 100,
                    transform: `scale(${1 + 0.06 * lit})`,
                    transformOrigin: "100% 50%",
                  }}
                >
                  <span className="font-display font-bold text-grey-800" style={{ position: "absolute", left: 12, top: 6, width: 58, textAlign: "right", fontSize: 14, lineHeight: "18px", whiteSpace: "nowrap" }}>
                    ${num(cap)}
                  </span>
                  <span className="font-sans text-swag-grey" style={{ position: "absolute", left: 74, top: 8, fontSize: 11, lineHeight: "14px", whiteSpace: "nowrap" }}>
                    / qtr
                  </span>
                </div>
              )}
              {i === 1 && <Toggle on={approvalOn} />}
              {i === 2 && <Toggle on={catalogOn} />}
            </div>
          );
        })}

        {/* strip · applies to teams */}
        <div
          className="bg-white"
          style={{
            position: "absolute",
            left: 14,
            top: 255,
            width: 552,
            height: 44,
            borderRadius: 16,
            opacity: seg(f, 58, 66, LIN),
            transform: `translateY(${(1 - stripP) * 20 - stripLight * 1.5}px)`,
            boxShadow: `0px ${2 + 8 * stripLight}px ${6 + 12 * stripLight}px 0px rgba(0, 0, 0, ${0.1 * stripLight})`,
          }}
        >
          <p className="font-sans font-bold uppercase text-swag-grey" style={{ position: "absolute", left: 16, top: 15, fontSize: 10, lineHeight: "14px", letterSpacing: 1, whiteSpace: "nowrap" }}>
            Applies to
          </p>
          <div style={{ position: "absolute", left: 231, top: 11, width: 305, height: 22 }}>
            {TEAMS.map((t, i) => {
              const lp = pop(f, 62 + 4 * i);
              const lit = labelLight(i);
              return (
                <div
                  key={t.label}
                  className={`font-sans font-bold uppercase text-grey-800 ${t.bg}`}
                  style={{
                    position: "absolute",
                    left: t.left,
                    top: 0,
                    width: t.w,
                    height: 22,
                    borderRadius: 100,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    letterSpacing: 1,
                    whiteSpace: "nowrap",
                    opacity: seg(f, 62 + 4 * i, 68 + 4 * i, LIN),
                    transform: `scale(${(0.8 + 0.2 * lp) * (1 + 0.1 * lit)})`,
                    boxShadow: `0px 0px 0px ${2 * lit}px rgba(47, 166, 79, ${0.45 * lit})`,
                  }}
                >
                  {t.label}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* connectors + packets */}
      <Connector x={289} y={145.9} grow={conn1} packetT={packetA} cls="bg-white/30" />
      <Connector x={333} y={492.9} grow={conn2} packetT={packetB} cls="bg-white/30" />

      {/* event · approval notice */}
      <div
        className="bg-arcade-pill"
        style={{
          position: "absolute",
          left: 294,
          top: 524.8,
          width: 286,
          height: 49,
          borderRadius: 12,
          opacity: seg(f, 76, 84, LIN),
          transform: `translateY(${(1 - eventP) * 24 - eventLift * 3}px) scale(${0.94 + 0.06 * eventP})`,
          boxShadow: `0px ${10 + 6 * eventLift}px ${24 + 8 * eventLift}px 0px rgba(0, 0, 0, ${0.3 + 0.08 * eventLift})`,
        }}
      >
        <div style={{ position: "absolute", inset: 0, borderRadius: 12, border: `1px solid rgba(255,255,255,${0.1 + 0.2 * eventLift})` }} />
        <Image src={avatarSales} alt="" width={26} height={26} style={{ position: "absolute", left: 11, top: 11.5, width: 26, height: 26, borderRadius: "50%" }} />
        <div style={{ position: "absolute", left: 47, top: 10, whiteSpace: "nowrap" }}>
          <p className="font-sans font-bold text-white" style={{ fontSize: 12, lineHeight: "15px" }}>
            Sales request for $1,200 needs approval
          </p>
          <p className="font-sans text-arcade-pill-muted" style={{ fontSize: 11, lineHeight: "14px" }}>
            Over the $250 guardrail, routed to Arun
          </p>
        </div>
      </div>
    </div>
  );
}
