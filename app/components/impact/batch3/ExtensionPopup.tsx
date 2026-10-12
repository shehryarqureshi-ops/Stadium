"use client";

/* /integrations/browser-extension hero visual — "extension popup pulls the
   recipient from the page" (Figma n9SjmDjzB1PeZAYJ5w43fr 5443:23255; stage = the
   564 × 364 cluster: 520 × 324 browser window + 282 × 316 popup hanging 40 below;
   hero-visual-design v2.5, animated).

   STAGE UNITS: bare numbers = stage units (not CSS px); colours/fonts are tokens.

   TIMELINE (30 fps)
     0 – 96    INTRO: the browser window lands, the extension icon pulses, the popup
               springs up from it, the "On page" chip pops, the points chips and the
               note/button appear. Frame 96 = the Figma frame (also reduced-motion).
     96 – 396  LOOP (300 f): cursor-less demonstration — the amount steps 100 → 250
               → 100 (the button label follows), the Send button gets a press pulse
               and a "sent" toast rises over the page and leaves. Rest pose at both
               ends; the popup floats on a whole-cycle sine (±2). */

import Image from "next/image";
import { useCurrentFrame } from "remotion";

import avatarGrace from "@/public/impact/batch3/avatar-grace.png";
import stadiumMark from "@/public/impact/batch3/stadium-mark.svg";

import { INTRO, LIN, SceneHost, bell, bob, capsText, pop, seg, win } from "./shared";

export const STAGE_W = 564;
export const STAGE_H = 364;

const AMOUNTS = ["50", "100", "250", "Custom"] as const;

function Lock() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" style={{ display: "block", flexShrink: 0 }}>
      <rect x="3" y="11" width="18" height="11" rx="2" className="stroke-canvas-muted" strokeWidth="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" className="stroke-canvas-muted" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CheckMark({ size = 12, className = "stroke-canvas-check", draw = 1 }: { size?: number; className?: string; draw?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ display: "block", flexShrink: 0 }}>
      <path
        d="M20 6 9 17l-5-5"
        className={className}
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

/** Stadium mark on a white disc; `d` = disc diameter (Figma: 30 in the popup, 20 in the toolbar icon). */
function Disc({ d }: { d: number }) {
  const k = d / 30;
  return (
    <div
      className="bg-white"
      style={{
        position: "relative",
        width: d,
        height: d,
        borderRadius: "50%",
        flexShrink: 0,
        boxShadow: `0px ${2.7 * k}px ${8.2 * k}px 0px rgba(0, 0, 0, 0.25)`,
      }}
    >
      <Image
        src={stadiumMark}
        alt=""
        style={{
          position: "absolute",
          left: 9.64 * k,
          top: 8.18 * k,
          width: 7.71 * k,
          height: "auto",
          display: "block",
          maxWidth: "none",
        }}
      />
    </div>
  );
}

function AmountChip({ label, sel, press, appear }: { label: string; sel: number; press: number; appear: number }) {
  const textStyle = { fontSize: 12, lineHeight: "16px", fontWeight: 600, whiteSpace: "nowrap" as const };
  return (
    <div
      className="bg-chip-surface"
      style={{
        position: "relative",
        padding: "7px 12px",
        borderRadius: 100,
        opacity: Math.min(1, appear * 2),
        transform: `scale(${(0.8 + 0.2 * appear) * (1 - 0.06 * press)})`,
      }}
    >
      <p className="text-grey-800" style={textStyle}>
        {label}
      </p>
      <div
        className="bg-grey-800"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: sel,
        }}
      >
        <p className="text-white" style={textStyle}>
          {label}
        </p>
      </div>
    </div>
  );
}

export function ExtensionScene() {
  const f = useCurrentFrame();
  const lt = Math.max(0, f - INTRO);

  /* intro */
  const winP = pop(f, 0);
  const popP = pop(f, 22);
  const iconPulse = bell(f, 12, 26);

  /* floats */
  const bobWin = bob(f, 1, 1.5);
  const bobPop = bob(f, 2, -2);

  /* loop: amount 100 → 250 → 100, send press, toast */
  const s250 = win(lt, 40, 48, 110, 118);
  const press250 = bell(lt, 38, 48) + bell(lt, 108, 118);
  const sendPress = bell(lt, 170, 184);
  const toast = win(lt, 188, 198, 240, 252);
  const onPagePulse = bell(lt, 10, 26);
  const amountLabel = s250 > 0.5 ? "250" : "100";
  const sel = (a: string) => (a === "100" ? 1 - s250 : a === "250" ? s250 : 0);
  const press = (a: string) => (a === "250" ? press250 : 0);

  const rv = (d: number) => {
    const p = Math.min(1, pop(f, d));
    return { opacity: seg(f, d, d + 8, LIN), transform: `translateY(${(1 - p) * 10}px)` };
  };

  return (
    <div className="font-sans text-grey-800" style={{ position: "relative", width: STAGE_W, height: STAGE_H }}>
      {/* browser · intranet profile */}
      <div
        className="bg-white"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 520,
          height: 324,
          borderRadius: 14,
          boxShadow: "0px 8px 24px 0px rgba(0, 0, 0, 0.2)",
          opacity: seg(f, 0, 8, LIN),
          transform: `translateY(${(1 - winP) * 24 + bobWin}px) scale(${0.96 + 0.04 * winP})`,
        }}
      >
        {/* browser bar */}
        <div
          className="bg-grey-200"
          style={{
            height: 48,
            boxSizing: "border-box",
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            borderTopLeftRadius: 14,
            borderTopRightRadius: 14,
          }}
        >
          <div style={{ display: "flex", gap: 6 }}>
            {[0, 1, 2].map((i) => (
              <div key={i} className="bg-grey-300" style={{ width: 8, height: 8, borderRadius: "50%" }} />
            ))}
          </div>
          <div
            className="bg-white"
            style={{
              flex: 1,
              height: 26,
              boxSizing: "border-box",
              padding: "6px 12px",
              borderRadius: 100,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Lock />
            <p className="text-swag-grey" style={{ fontSize: 11, lineHeight: "14px", whiteSpace: "nowrap" }}>
              intranet.acme.com/people/grace-adeyemi
            </p>
          </div>
          <div
            className="bg-white border-grey-800"
            style={{
              width: 28,
              height: 28,
              boxSizing: "border-box",
              borderRadius: 8,
              borderWidth: 1.5,
              borderStyle: "solid",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${1 + 0.18 * iconPulse})`,
            }}
          >
            <Disc d={20} />
          </div>
        </div>

        {/* page */}
        <div style={{ padding: 22, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Image
              src={avatarGrace}
              alt=""
              sizes="4.25rem"
              quality={90}
              style={{ width: 68, height: 68, borderRadius: 16, display: "block", maxWidth: "none", objectFit: "cover" }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 4, whiteSpace: "nowrap" }}>
              <p className="font-display text-grey-800" style={{ fontSize: 22, lineHeight: "26px" }}>
                Grace Adeyemi
              </p>
              <p className="text-swag-grey" style={{ fontSize: 12, lineHeight: "16px" }}>
                Brand Designer, Brand team
              </p>
              <div style={{ display: "flex", gap: 6 }}>
                {["Madrid", "Joined 2023"].map((t) => (
                  <div key={t} className="bg-chip-surface" style={{ padding: "3px 8px", borderRadius: 100 }}>
                    <p className="text-grey-600" style={{ fontSize: 11, lineHeight: "14px", fontWeight: 600 }}>
                      {t}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[300, 400, 260].map((w) => (
              <div key={w} className="bg-grey-200" style={{ width: w, height: 8, borderRadius: 4 }} />
            ))}
            <div style={{ display: "flex", gap: 10, paddingTop: 6 }}>
              {[0, 1].map((i) => (
                <div key={i} className="bg-grey-100" style={{ width: 150, height: 86, borderRadius: 12 }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* toast (loop) */}
      <div
        className="bg-grey-800"
        style={{
          position: "absolute",
          left: 22,
          top: 266,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 14px 6px 6px",
          borderRadius: 100,
          whiteSpace: "nowrap",
          boxShadow: "0px 3px 10px 0px rgba(0, 0, 0, 0.28)",
          opacity: toast,
          transform: `translateY(${(1 - toast) * 10 + bobWin}px)`,
        }}
      >
        <div
          className="bg-canvas-green"
          style={{ width: 22, height: 22, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <CheckMark size={12} draw={seg(lt, 192, 204, LIN)} />
        </div>
        <p className="text-white" style={{ fontSize: 12, lineHeight: "16px", fontWeight: 600 }}>
          100 points sent to Grace
        </p>
      </div>

      {/* extension popup · Send Stadium Points */}
      <div
        className="bg-white"
        style={{
          position: "absolute",
          left: 282,
          top: 48,
          width: 282,
          height: 316,
          boxSizing: "border-box",
          padding: 16,
          borderRadius: 16,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          boxShadow: "0px 14px 34px 0px rgba(0, 0, 0, 0.34)",
          opacity: seg(f, 22, 30, LIN),
          transform: `translateY(${(1 - popP) * 40 + bobPop}px) scale(${0.94 + 0.06 * popP})`,
        }}
      >
        <div style={{ ...rv(26), display: "flex", alignItems: "center", justifyContent: "space-between", height: 33, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Disc d={30} />
            <div style={{ display: "flex", flexDirection: "column", whiteSpace: "nowrap" }}>
              <p className="font-display text-grey-800" style={{ fontSize: 16, lineHeight: "20px" }}>
                Stadium
              </p>
              <p className="text-canvas-muted" style={{ fontSize: 10, lineHeight: "13px" }}>
                Send Stadium Points
              </p>
            </div>
          </div>
          <p className="text-canvas-muted" style={{ fontSize: 10, lineHeight: "13px", fontWeight: 600, whiteSpace: "nowrap" }}>
            2,400 pts left
          </p>
        </div>

        <div style={{ ...rv(32), display: "flex", flexDirection: "column", gap: 6 }}>
          <p className="text-canvas-muted" style={capsText}>
            Recipient
          </p>
          <div
            className="bg-chip-surface"
            style={{
              height: 45,
              boxSizing: "border-box",
              padding: "8px 10px",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Image
              src={avatarGrace}
              alt=""
              sizes="1.75rem"
              quality={90}
              style={{ width: 28, height: 28, borderRadius: "50%", display: "block", maxWidth: "none" }}
            />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", whiteSpace: "nowrap" }}>
              <p className="text-grey-800" style={{ fontSize: 12, lineHeight: "16px", fontWeight: 600 }}>
                Grace Adeyemi
              </p>
              <p className="text-canvas-muted" style={{ fontSize: 10, lineHeight: "13px" }}>
                Brand Designer
              </p>
            </div>
            <div
              className="bg-canvas-green"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                height: 20,
                boxSizing: "border-box",
                padding: "3px 8px",
                borderRadius: 100,
                opacity: seg(f, 40, 46, LIN),
                transform: `scale(${(0.7 + 0.3 * Math.min(1.15, pop(f, 40))) * (1 + 0.08 * onPagePulse)})`,
              }}
            >
              <CheckMark size={12} draw={seg(f, 44, 58, LIN)} />
              <p className="text-grey-800" style={{ fontSize: 11, lineHeight: "14px", fontWeight: 600, whiteSpace: "nowrap" }}>
                On page
              </p>
            </div>
          </div>
        </div>

        <div style={{ ...rv(44), display: "flex", flexDirection: "column", gap: 6 }}>
          <p className="text-canvas-muted" style={capsText}>
            Points
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {AMOUNTS.map((a, i) => (
              <AmountChip key={a} label={a} sel={a === "100" || a === "250" ? (f < INTRO ? (a === "100" ? seg(f, 50 + i * 4, 58 + i * 4, LIN) : 0) : sel(a)) : 0} press={press(a)} appear={Math.min(1, pop(f, 46 + i * 4))} />
            ))}
          </div>
        </div>

        <div
          className="bg-chip-surface"
          style={{
            ...rv(62),
            height: 52,
            boxSizing: "border-box",
            padding: "10px 12px",
            borderRadius: 10,
            flexShrink: 0,
          }}
        >
          <p className="text-grey-600" style={{ fontSize: 12, lineHeight: "16px" }}>
            Thank you for the brand refresh. It looks amazing!
          </p>
        </div>

        <div
          className="bg-grey-800"
          style={{
            ...rv(70),
            height: 38,
            boxSizing: "border-box",
            padding: "11px 16px",
            borderRadius: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transform: `translateY(${(1 - Math.min(1, pop(f, 70))) * 10}px) scale(${1 - 0.04 * sendPress})`,
          }}
        >
          <p className="text-white" style={{ fontSize: 13, lineHeight: "16px", fontWeight: 600, whiteSpace: "nowrap" }}>
            Send {amountLabel} points
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ExtensionPopup() {
  return <SceneHost scene={ExtensionScene} width={STAGE_W} height={STAGE_H} />;
}
