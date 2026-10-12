"use client";

/* /impact/leadership hero visual — "Guardrails tray" (Figma n9SjmDjzB1PeZAYJ5w43fr
   5401:23861, visual frame 5405:22662, 580 × 357 = the graphic cluster itself, flush
   to the Talk-to-sales edge and top-aligned with the copy; hero-visual-design v2.5).
   One tray of company guardrails (budget cap, approval threshold, approved catalog)
   sits above a strip that says they apply to every team.

   STAGE UNITS. Authored on a fixed 580 × 357 stage that the Remotion Player scales
   to its container, so bare numbers in style objects are stage units, NOT CSS px
   (see design.md → "/impact/leadership hero"). Colours and fonts come from tokens.

   TIMELINE (30 fps)
     0 – 96     INTRO: the tray springs in, the three rules follow in reading order,
                the cap counts $0 → $25,000, both toggles flip on, the connector draws
                down and the "Applies to" strip and its five team labels pop in.
                Frame 96 is exactly the Figma frame → also the still for
                prefers-reduced-motion.
     96 – 396   LOOP (300 frames): each rule lights in turn (the cap pill breathes), the
                approval toggle is switched off and back on, then a policy packet runs
                down the connector and the five team labels light left → right as the
                guardrails apply to them; a second packet closes the loop. Every value
                is at its Figma rest pose at both loop ends (seamless).

   NO CROP. overflowVisible on the Player; nothing moves more than a few units from
   its rest, so everything stays inside 0 … STAGE_W. */

import Image from "next/image";
import { Easing, interpolate, spring, useCurrentFrame } from "remotion";

import avatarArun from "@/public/impact/leadership/hero/avatar-arun.png";

export const STAGE_W = 580;
export const STAGE_H = 357;
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

/** rises a→b, holds, falls c→d. */
const win = (t: number, a: number, b: number, c: number, d: number) =>
  seg(t, a, b, IN_OUT) - seg(t, c, d, IN_OUT);

/** Whole-cycle float; ramps in with the intro's last frames. */
const bob = (f: number, cycles: number, amp: number) =>
  seg(f, 56, INTRO, LIN) * Math.sin((2 * Math.PI * cycles * (f - INTRO)) / LOOP) * amp;

/* ───────────── layout (Figma, visual-local) ───────────── */

const TRAY_H = 285;
const STRIP_Y = 307;
const NODE_TOP_Y = 285; // connector top edge
const NODE_BOTTOM_Y = 307; // connector bottom edge

const TEAMS = [
  { label: "HR", bg: "bg-canvas-lilac" },
  { label: "Marketing", bg: "bg-canvas-pink" },
  { label: "Sales", bg: "bg-canvas-blue" },
  { label: "CX", bg: "bg-canvas-green" },
  { label: "Finance", bg: "bg-canvas-yellow" },
] as const;

/* intro: header 6/14, rules 10/18/26, strip 66, labels 72 + 4·i
   loop (loop frames): rule i lights at 16 + 28·i, toggle off 90–126,
   packets leave the tray at 150 and 250, label i lights 14 + 9·i later */
const ruleDelay = (i: number) => 10 + 8 * i;
const labelDelay = (i: number) => 66 + 4 * i;
const ruleLight = (lt: number, i: number) => bell(lt, 16 + 28 * i, 16 + 28 * i + 30);
const PACKETS = [150, 250] as const;
const PACKET_RUN = 12;

function Toggle({ on }: { on: number }) {
  return (
    <div
      className="bg-grey-800"
      style={{
        position: "relative",
        width: 40,
        height: 24,
        borderRadius: 12,
        flexShrink: 0,
        backgroundColor: `color-mix(in srgb, var(--color-grey-800) ${on * 100}%, var(--color-grey-300))`,
      }}
    >
      <div
        className="bg-white"
        style={{
          position: "absolute",
          top: 2,
          left: 2 + 16 * on,
          width: 20,
          height: 20,
          borderRadius: "50%",
        }}
      />
    </div>
  );
}

function Rule({
  f,
  i,
  lt,
  title,
  sub,
  children,
}: {
  f: number;
  i: number;
  lt: number;
  title: string;
  sub: string;
  children: React.ReactNode;
}) {
  const delay = ruleDelay(i);
  const p = pop(f, delay, 17);
  const lit = ruleLight(lt, i);
  return (
    <div
      className="bg-white"
      style={{
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexShrink: 0,
        width: "100%",
        padding: "14px 16px",
        borderRadius: 16,
        opacity: seg(f, delay, delay + 8, LIN),
        transform: `translateY(${(1 - p) * 16 - lit * 2}px)`,
        boxShadow: `0px ${2 + 8 * lit}px ${6 + 12 * lit}px 0px rgba(0, 0, 0, ${0.1 * lit})`,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 3, whiteSpace: "nowrap" }}>
        <span className="text-grey-800" style={{ fontSize: 13, lineHeight: "18px", fontWeight: 600 }}>
          {title}
        </span>
        <span className="text-swag-grey" style={{ fontSize: 11, lineHeight: "14px" }}>
          {sub}
        </span>
      </div>
      {children}
    </div>
  );
}

export function GuardrailsTrayScene() {
  const f = useCurrentFrame();
  const lt = Math.max(0, f - INTRO);

  const trayP = pop(f, 0, 17);
  const headP = pop(f, 6, 17);
  const avatarP = pop(f, 14);
  const stripP = pop(f, 66, 17);
  const connectorP = seg(f, 56, 70);

  /* cap counts up in the intro; its pill breathes when its rule lights */
  const cap = Math.round(25000 * seg(f, 22, 70));
  const capBreath = ruleLight(lt, 0);

  /* toggles: flip on in the intro; in the loop the approval toggle goes off and back on */
  const approvalOn = seg(f, 40, 50) * (1 - win(lt, 90, 98, 118, 126));
  const catalogOn = seg(f, 50, 60);

  /* policy packets: leave the tray bottom, run the connector, light the labels */
  const packet = (start: number) => {
    const t = lt - start;
    return { t, y: seg(t, 0, PACKET_RUN, IN_OUT), on: t >= 0 && t <= PACKET_RUN + 2 };
  };
  const packets = PACKETS.map(packet);
  const labelLight = (i: number) =>
    PACKETS.reduce((acc, s) => Math.max(acc, bell(lt - s, PACKET_RUN + 2 + 8 * i, PACKET_RUN + 2 + 8 * i + 24)), 0);
  const stripLight = packets.reduce((acc, p) => Math.max(acc, bell(p.t, PACKET_RUN - 4, PACKET_RUN + 20)), 0);

  return (
    <div
      style={{
        position: "relative",
        width: STAGE_W,
        height: STAGE_H,
        transform: `translateY(${bob(f, 1, 2.5)}px)`,
      }}
    >
      {/* tray · company guardrails */}
      <div
        className="bg-chip-surface"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: STAGE_W,
          height: TRAY_H,
          boxSizing: "border-box",
          padding: 14,
          borderRadius: 22,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          overflow: "hidden",
          opacity: seg(f, 0, 8, LIN),
          transform: `translateY(${(1 - trayP) * 28}px) scale(${0.96 + 0.04 * trayP})`,
          boxShadow: "0px 16px 40px 0px rgba(0, 0, 0, 0.38)",
        }}
      >
        {/* header */}
        <div
          style={{
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
            width: "100%",
            padding: "2px 0 6px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              opacity: seg(f, 6, 14, LIN),
              transform: `translateY(${(1 - headP) * 10}px)`,
            }}
          >
            <div
              className="bg-grey-800"
              style={{ width: 28, height: 28, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <svg width={14} height={14} viewBox="0 0 14 14" fill="none" stroke="#fff" strokeWidth={1.16667} strokeLinecap="round" strokeLinejoin="round">
                <path d="M6.99984 12.8334C6.99984 12.8334 11.6665 10.5 11.6665 7.00002V2.91669L6.99984 1.16668L2.33317 2.91669V7.00002C2.33317 10.5 6.99984 12.8334 6.99984 12.8334Z" />
              </svg>
            </div>
            <span className="text-grey-800" style={{ fontSize: 15, lineHeight: "20px", fontWeight: 700, whiteSpace: "nowrap" }}>
              Company guardrails
            </span>
          </div>
          <div
            className="bg-white"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "4px 12px 4px 4px",
              borderRadius: 100,
              opacity: seg(f, 14, 22, LIN),
              transform: `scale(${0.9 + 0.1 * avatarP})`,
              transformOrigin: "100% 50%",
            }}
          >
            <Image src={avatarArun} alt="" width={28} height={28} style={{ width: 28, height: 28, borderRadius: "50%", display: "block" }} />
            <div style={{ display: "flex", flexDirection: "column", whiteSpace: "nowrap" }}>
              <span className="text-grey-800" style={{ fontSize: 12, lineHeight: "15px", fontWeight: 600 }}>
                Arun Mehta
              </span>
              <span className="text-swag-grey" style={{ fontSize: 10, lineHeight: "12px" }}>
                COO
              </span>
            </div>
          </div>
        </div>

        <Rule f={f} i={0} lt={lt} title="Budget limit per team" sub="Every team spends inside its own cap">
          <div
            className="bg-chip-surface"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "6px 12px",
              borderRadius: 100,
              flexShrink: 0,
              transform: `scale(${1 + 0.06 * capBreath})`,
              transformOrigin: "100% 50%",
            }}
          >
            <span
              className="font-display text-grey-800"
              style={{ fontSize: 14, lineHeight: "18px", width: 58, textAlign: "right", whiteSpace: "nowrap" }}
            >
              ${cap.toLocaleString("en-US")}
            </span>
            <span className="text-canvas-muted" style={{ fontSize: 11, lineHeight: "14px", whiteSpace: "nowrap" }}>
              / qtr
            </span>
          </div>
        </Rule>
        <Rule f={f} i={1} lt={lt} title="Approval over $250" sub="Larger gifts need sign-off first">
          <Toggle on={approvalOn} />
        </Rule>
        <Rule f={f} i={2} lt={lt} title="One approved catalog" sub="Only vetted vendors, swag and gifts">
          <Toggle on={catalogOn} />
        </Rule>
      </div>

      {/* connector · applies to */}
      <div
        className="bg-grey-300"
        style={{
          position: "absolute",
          left: 289,
          top: NODE_TOP_Y,
          width: 2,
          height: NODE_BOTTOM_Y - NODE_TOP_Y,
          borderRadius: 1,
          zIndex: 2,
          transformOrigin: "50% 0%",
          transform: `scaleY(${connectorP})`,
        }}
      />
      {[NODE_TOP_Y - 4.5, NODE_BOTTOM_Y - 4.5].map((y, i) => {
        const np = pop(f, 56 + 14 * i);
        return (
          <div
            key={i}
            className="bg-white border-grey-800"
            style={{
              position: "absolute",
              left: 285.5,
              top: y,
              boxSizing: "border-box",
              width: 9,
              height: 9,
              borderRadius: "50%",
              borderWidth: 1.5,
              borderStyle: "solid",
              zIndex: 2,
              opacity: seg(f, 56 + 14 * i, 62 + 14 * i, LIN),
              transform: `scale(${np})`,
            }}
          />
        );
      })}
      {packets.map((p, i) => (
        <div
          key={i}
          className="bg-signal-green"
          style={{
            position: "absolute",
            left: 289 + 1 - 4,
            top: NODE_TOP_Y + (NODE_BOTTOM_Y - NODE_TOP_Y) * p.y - 4,
            width: 8,
            height: 8,
            borderRadius: "50%",
            zIndex: 3,
            opacity: p.on ? 1 - seg(p.t, PACKET_RUN - 2, PACKET_RUN + 2, LIN) : 0,
            boxShadow: "0px 0px 8px 0px rgba(47, 166, 79, 0.55)",
          }}
        />
      ))}

      {/* strip · applies to teams */}
      <div
        className="bg-white"
        style={{
          position: "absolute",
          left: 0,
          top: STRIP_Y,
          width: STAGE_W,
          height: 50,
          boxSizing: "border-box",
          padding: "14px 16px",
          borderRadius: 18,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          opacity: seg(f, 66, 74, LIN),
          transform: `translateY(${(1 - stripP) * 20 - stripLight * 1.5}px)`,
          boxShadow: `0px ${12 + 4 * stripLight}px ${28 + 6 * stripLight}px 0px rgba(0, 0, 0, ${0.34 + 0.06 * stripLight})`,
        }}
      >
        <span
          className="text-canvas-muted"
          style={{ fontSize: 10, lineHeight: "14px", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", whiteSpace: "nowrap" }}
        >
          Applies to
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {TEAMS.map((t, i) => {
            const lp = pop(f, labelDelay(i));
            const lit = labelLight(i);
            return (
              <div
                key={t.label}
                className={`text-grey-800 ${t.bg}`}
                style={{
                  padding: "4px 10px",
                  borderRadius: 100,
                  fontSize: 10,
                  lineHeight: "14px",
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  opacity: seg(f, labelDelay(i), labelDelay(i) + 6, LIN),
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
  );
}
