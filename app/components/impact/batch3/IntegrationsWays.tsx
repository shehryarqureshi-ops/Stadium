"use client";

/* /integrations hero visual — "Ways to connect" (Figma n9SjmDjzB1PeZAYJ5w43fr
   5443:23185, visual frame = the 580 × 377 graphic cluster itself; hero-visual-design
   v2.5, animated mode).
   Three tabs (Native selected / Automate / Build) sit over a "Native integrations"
   card listing connected systems — UKG, ADP, Gusto, Paylocity — each with its category,
   employee count and a "Synced … ago" status dot, plus a "40+ more integrations" row.

   STAGE UNITS. Fixed 580 × 377 stage the Player scales to its container. Bare numbers
   are stage units, NOT CSS px. Colours and fonts come from tokens.

   TIMELINE (30 fps)
     0 – 96     INTRO: the three tabs pop, the card springs in, the "4 connected" chip
                pops, the system rows land one by one (logo, category, employees count
                up, status dot pops), then the "40+ more" row. Frame 96 = the Figma frame
                (Native selected; also the reduced-motion still).
     96 – 396   LOOP: the Synced dots pulse in turn, row by row (a ring radiates, the row
                washes), then the "4 connected" chip nods. The tab selection never
                changes. Tabs and card float on whole-cycle sines (±1–1.5). */

import Image from "next/image";
import { useCurrentFrame } from "remotion";

import adp from "@/public/impact/batch3/logo-adp.png";
import gusto from "@/public/impact/batch3/logo-gusto.png";
import paylocity from "@/public/impact/batch3/logo-paylocity.png";
import stadiumMark from "@/public/impact/batch3/stadium-mark.svg";
import ukg from "@/public/impact/batch3/logo-ukg.svg";

import { INTRO, SceneHost, SHADOW, bell, bob, capsText, pop, seg, LIN } from "./shared";

export const STAGE_W = 580;
export const STAGE_H = 377;

/* ───────────── small parts ───────────── */

function Icon({ d, size, className, strokeWidth = 2 }: { d: string; size: number; className: string; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ display: "block", flexShrink: 0 }}>
      <path d={d} className={className} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const CHECK = "M20 6 9 17l-5-5";
const LINK =
  "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71";
const ZAP = "M13 2 3 14h9l-1 8 10-12h-9l1-8z";
const CODE = "m16 18 6-6-6-6M8 6l-6 6 6 6";
const PLUS = "M12 5v14M5 12h14";
const ARROW = "M5 12h14M12 5l7 7";

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

const TABS = [
  { name: "Native", sub: "Connect in a few clicks", d: LINK, w: 188 },
  { name: "Automate", sub: "Zapier and webhooks", d: ZAP, w: 188 },
  { name: "Build", sub: "Use the Stadium API", d: CODE, w: 188 },
] as const;

const SYSTEMS = [
  { logo: ukg, lw: 45.1, lh: 18, cat: "HRIS", n: 1240, sync: "Synced 2 min ago" },
  { logo: adp, lw: 48.4, lh: 22, cat: "Payroll", n: 860, sync: "Synced 7 min ago" },
  { logo: gusto, lw: 57.8, lh: 22, cat: "Payroll", n: 310, sync: "Synced 12 min ago" },
  { logo: paylocity, lw: 79.9, lh: 22, cat: "HRIS", n: 420, sync: "Synced 1 hr ago" },
] as const;

/** Loop: row k's sync pulse starts at this loop frame. */
const PULSE_AT = [20, 70, 120, 170] as const;
const PULSE_LEN = 40;
const CHIP_NOD = 226;

/* ───────────── scene ───────────── */

export function IntegrationsWaysScene() {
  const f = useCurrentFrame();
  const lt = Math.max(0, f - INTRO);

  const bobTabs = bob(f, 1, 1);
  const bobCard = bob(f, 1, -1.5);

  const chipNod = bell(lt, CHIP_NOD, CHIP_NOD + 34);
  const cardP = pop(f, 14);
  const chipP = pop(f, 32);
  const moreP = pop(f, 66);

  return (
    <div className="font-sans text-grey-800" style={{ position: "relative", width: STAGE_W, height: STAGE_H }}>
      {/* tabs · ways to connect */}
      <div style={{ position: "absolute", left: 0, top: 0, width: STAGE_W, height: 56, display: "flex", gap: 8 }}>
        {TABS.map((t, i) => {
          const p = pop(f, i * 6);
          const on = i === 0;
          return (
            <div
              key={t.name}
              className={on ? "bg-white" : "bg-grey-200"}
              style={{
                width: t.w,
                height: 56,
                boxSizing: "border-box",
                padding: "10px 12px",
                borderRadius: 14,
                display: "flex",
                alignItems: "center",
                gap: 10,
                opacity: seg(f, i * 6, i * 6 + 8, LIN),
                transform: `translateY(${(1 - p) * 24 + bobTabs}px) scale(${0.94 + 0.06 * p})`,
                boxShadow: on ? SHADOW(0) : undefined,
              }}
            >
              <div
                className={on ? "bg-grey-800" : "bg-white"}
                style={{ width: 30, height: 30, borderRadius: 9, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <Icon d={t.d} size={15} strokeWidth={2.5} className={on ? "stroke-white" : "stroke-swag-grey"} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", whiteSpace: "nowrap" }}>
                <p className={on ? "text-grey-800" : "text-swag-grey"} style={{ fontSize: 13, lineHeight: "17px", fontWeight: 600 }}>
                  {t.name}
                </p>
                <p className={on ? "text-swag-grey" : "text-canvas-muted"} style={{ fontSize: 10, lineHeight: "13px" }}>
                  {t.sub}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* card · connected systems */}
      <div
        className="bg-white"
        style={{
          position: "absolute",
          left: 0,
          top: 68,
          width: STAGE_W,
          height: 309,
          boxSizing: "border-box",
          padding: 18,
          borderRadius: 16,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          opacity: seg(f, 14, 22, LIN),
          transform: `translateY(${(1 - cardP) * 28 + bobCard}px) scale(${0.97 + 0.03 * cardP})`,
          boxShadow: SHADOW(0),
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 30 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <StadiumDisc />
            <div style={{ display: "flex", flexDirection: "column", whiteSpace: "nowrap" }}>
              <p className="text-grey-800" style={{ fontSize: 13, lineHeight: "17px", fontWeight: 600 }}>
                Native integrations
              </p>
              <p className="text-canvas-muted" style={{ fontSize: 10, lineHeight: "13px" }}>
                Connected systems, always in sync
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
              opacity: seg(f, 32, 38, LIN),
              transform: `scale(${(0.7 + 0.3 * chipP) * (1 + 0.06 * chipNod)})`,
            }}
          >
            <Icon d={CHECK} size={12} className="stroke-canvas-check" />
            <p className="text-grey-800" style={{ fontSize: 11, lineHeight: "14px", fontWeight: 600, whiteSpace: "nowrap" }}>
              4 connected
            </p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", height: 187 }}>
          {SYSTEMS.map((s, k) => {
            const delay = 30 + k * 9;
            const p = pop(f, delay);
            const count = Math.round(s.n * seg(f, delay + 4, delay + 30));
            const dotP = pop(f, delay + 8);
            const ps = seg(lt, PULSE_AT[k], PULSE_AT[k] + PULSE_LEN, LIN);
            const pulse = Math.sin(Math.PI * ps);
            const wash = Math.sin(Math.PI * seg(lt, PULSE_AT[k] - 4, PULSE_AT[k] + PULSE_LEN + 6, LIN));
            return (
              <div key={s.cat + s.n}>
                {k > 0 && (
                  <div
                    className="bg-grey-200"
                    style={{ height: 1, transformOrigin: "0% 50%", transform: `scaleX(${seg(f, delay, delay + 12)})` }}
                  />
                )}
                <div
                  style={{
                    position: "relative",
                    height: 46,
                    boxSizing: "border-box",
                    padding: "11px 0",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    opacity: seg(f, delay, delay + 8, LIN),
                    transform: `translateY(${(1 - p) * 16}px)`,
                  }}
                >
                  <div
                    className="bg-chip-surface"
                    style={{
                      position: "absolute",
                      left: -8,
                      right: -8,
                      top: 3,
                      bottom: 3,
                      borderRadius: 10,
                      opacity: 0.7 * wash,
                    }}
                  />
                  <div style={{ position: "relative", width: 96, height: 24, flexShrink: 0, display: "flex", alignItems: "center" }}>
                    <Image
                      src={s.logo}
                      alt=""
                      quality={90}
                      style={{ width: s.lw, height: s.lh, objectFit: "contain", display: "block", maxWidth: "none" }}
                    />
                  </div>
                  <div className="bg-chip-surface" style={{ position: "relative", padding: "3px 8px", borderRadius: 100, flexShrink: 0 }}>
                    <p className="text-grey-600" style={capsText}>
                      {s.cat}
                    </p>
                  </div>
                  <p
                    className="text-swag-grey"
                    style={{ position: "relative", flex: 1, fontSize: 12, lineHeight: "16px", whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" }}
                  >
                    {count.toLocaleString("en-US")} employees
                  </p>
                  <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 6, height: 14 }}>
                    <div style={{ position: "relative", width: 7, height: 7, flexShrink: 0 }}>
                      <div
                        className="bg-canvas-check"
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: "50%",
                          transform: `scale(${Math.min(1, dotP) * (1 + 0.45 * pulse)})`,
                        }}
                      />
                      <div
                        className="border-canvas-check"
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 0,
                          width: 7,
                          height: 7,
                          boxSizing: "border-box",
                          borderWidth: 1.5,
                          borderStyle: "solid",
                          borderRadius: "50%",
                          opacity: ps > 0 && ps < 1 ? 0.6 * (1 - ps) : 0,
                          transform: `scale(${1 + 2.2 * ps})`,
                        }}
                      />
                    </div>
                    <p className="text-grey-800" style={{ fontSize: 11, lineHeight: "14px", fontWeight: 600, whiteSpace: "nowrap" }}>
                      {s.sync}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="bg-chip-surface"
          style={{
            height: 32,
            boxSizing: "border-box",
            padding: "9px 12px",
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            gap: 8,
            opacity: seg(f, 66, 74, LIN),
            transform: `translateY(${(1 - moreP) * 14}px)`,
          }}
        >
          <Icon d={PLUS} size={12} className="stroke-grey-800" />
          <p className="text-grey-800" style={{ flex: 1, fontSize: 11, lineHeight: "14px", fontWeight: 600, whiteSpace: "nowrap" }}>
            40+ more integrations
          </p>
          <Icon d={ARROW} size={12} className="stroke-grey-600" />
        </div>
      </div>
    </div>
  );
}

export default function IntegrationsWays() {
  return <SceneHost scene={IntegrationsWaysScene} width={STAGE_W} height={STAGE_H} />;
}
