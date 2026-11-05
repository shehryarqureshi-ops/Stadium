"use client";

/* /impact/marketing hero visual — "Campaign kit" (Figma cGznwzQVViaYtxp3zcZk97
   140:21195 "visual · Marketing brand kit (final)", inside 128:20212; stage 549 × 447 = the
   cluster's bounding box, frame y − 20). A Remotion composition: every element is a pure
   function of the current frame, so the Player can play, pause and seek.

   STAGE UNITS. Authored on a fixed 549 × 447 stage that the Player scales to its container,
   so bare numbers in the style objects are stage units, NOT CSS px (the one place the "no
   hardcoded px" rule intentionally doesn't apply — see design.md → "/impact/marketing hero").
   Coordinates are the Figma frame's own; colours and fonts come from tokens.

   TIMELINE (30 fps)
     0 – 96     INTRO: the hoodie tile springs in, then the cap and tee; the campaign card
                lands and its numbers count up (3 products, 420 recipients, 38 countries),
                the delivery bar fills to 412 of 420; the "Shipping to 38 countries" pill pops
                and its five flags land one by one. Frame 96 is exactly the Figma frame → also
                the still used for prefers-reduced-motion.
     96 – 396   LOOP (300 frames): a soft sheen sweeps the three product photos in turn (each
                tile lifts as it passes), the campaign card lifts while the last eight kits are
                delivered (bar → 100%, 412 → 420), the flags ripple, then the count settles back
                to 412 so every moving value starts and ends at its Figma rest pose and the
                Player can jump 396 → 96 without a seam.

   NO CROP. overflowVisible on the Player; nothing leaves 0 … STAGE_W. */

import Image from "next/image";
import { Easing, interpolate, spring, useCurrentFrame } from "remotion";

import capTile from "@/public/impact/marketing/hero/campaign-cap.webp";
import hoodieTile from "@/public/impact/marketing/hero/campaign-hoodie.webp";
import teeTile from "@/public/impact/marketing/hero/campaign-tee.webp";

export const STAGE_W = 549;
export const STAGE_H = 447;
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

const win = (t: number, a: number, b: number, c: number, d: number) => seg(t, a, b, IN_OUT) - seg(t, c, d, IN_OUT);

/* ───────────── content ───────────── */

const TOTAL = 420;
const DELIVERED = 412;

const SHADOW = (lift: number, a = 0.35) => `0px ${12 + 6 * lift}px ${30 + 8 * lift}px 0px rgba(0, 0, 0, ${a + 0.06 * lift})`;

type FlagCode = "UK" | "US" | "SG" | "DE" | "BR";
const FLAGS: FlagCode[] = ["UK", "US", "SG", "DE", "BR"];

function FlagArt({ code }: { code: FlagCode }) {
  switch (code) {
    case "UK":
      return (
        <>
          <rect width="30" height="20" fill="#012169" />
          <path d="M0 0 30 20M30 0 0 20" stroke="#f8f8f8" strokeWidth="4" />
          <path d="M0 0 30 20M30 0 0 20" stroke="#c8102e" strokeWidth="1.5" />
          <path d="M15 0V20M0 10H30" stroke="#f8f8f8" strokeWidth="6" />
          <path d="M15 0V20M0 10H30" stroke="#c8102e" strokeWidth="3.4" />
        </>
      );
    case "US":
      return (
        <>
          <rect width="30" height="20" fill="#f8f8f8" />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect key={i} y={i * 3.08} width="30" height="1.54" fill="#bf0a30" />
          ))}
          <rect width="13" height="10.8" fill="#192f5d" />
        </>
      );
    case "SG":
      return (
        <>
          <rect width="30" height="10" fill="#df0000" />
          <rect y="10" width="30" height="10" fill="#f8f8f8" />
          <circle cx="7.6" cy="5" r="3.4" fill="#f8f8f8" />
          <circle cx="9" cy="5" r="3.1" fill="#df0000" />
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
    case "BR":
      return (
        <>
          <rect width="30" height="20" fill="#229e45" />
          <polygon points="15,1.8 27.6,10 15,18.2 2.4,10" fill="#f8e509" />
          <circle cx="15" cy="10" r="4.4" fill="#2b49a3" />
        </>
      );
  }
}

function Flag({ code, left, scale, opacity }: { code: FlagCode; left: number; scale: number; opacity: number }) {
  return (
    <div
      style={{
        position: "absolute",
        left,
        top: 0,
        width: 22,
        height: 22,
        borderRadius: "50%",
        overflow: "hidden",
        opacity,
        transform: `scale(${scale})`,
        flexShrink: 0,
      }}
    >
      <svg viewBox="0 0 30 20" width={33} height={22} style={{ position: "absolute", left: -5.5, top: 0, display: "block" }}>
        <FlagArt code={code} />
      </svg>
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.18)" }} />
    </div>
  );
}

/** Photo tile: springs in, lifts, and gets a diagonal sheen sweep in the loop. */
function Tile({
  src,
  left,
  top,
  width,
  height,
  radius,
  f,
  delay,
  lift,
  sheen,
}: {
  src: typeof hoodieTile;
  left: number;
  top: number;
  width: number;
  height: number;
  radius: number;
  f: number;
  delay: number;
  lift: number;
  sheen: number;
}) {
  const p = pop(f, delay);
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width,
        height,
        borderRadius: radius,
        opacity: seg(f, delay, delay + 8, LIN),
        transform: `translateY(${(1 - p) * 28 - lift * 4}px) scale(${0.94 + 0.06 * p})`,
        boxShadow: SHADOW(lift),
      }}
    >
      <div style={{ position: "absolute", inset: 0, borderRadius: radius, overflow: "hidden" }}>
        <Image src={src} alt="" sizes="22rem" quality={90} style={{ width, height, display: "block", maxWidth: "none" }} />
        {sheen > 0.001 && sheen < 0.999 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(105deg, rgba(255,255,255,0) 38%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 62%)",
              transform: `translateX(${(sheen - 0.5) * 2 * width}px)`,
            }}
          />
        )}
      </div>
    </div>
  );
}

/* ───────────── scene ───────────── */

export function CampaignKitScene() {
  const f = useCurrentFrame();
  const t = Math.max(0, f - INTRO);

  /* intro numbers */
  const products = Math.round(3 * seg(f, 30, 50));
  const recipients = Math.round(TOTAL * seg(f, 32, 72));
  const countries = Math.round(38 * seg(f, 34, 66));

  /* loop: last eight kits land (412 → 420), then settle back */
  const extra = 8 * seg(t, 120, 170, IN_OUT) * (1 - seg(t, 250, 285, IN_OUT));
  const delivered = DELIVERED * seg(f, 40, 78) + extra;
  /* Figma rest pose: 148 of the 150-wide track at 412 / 420 */
  const barW = Math.min(150, 148 * (delivered / DELIVERED));

  const cardLift = win(t, 112, 132, 176, 200);
  const sheens = [
    seg(t, 20, 70, IN_OUT),
    seg(t, 40, 90, IN_OUT),
    seg(t, 60, 110, IN_OUT),
  ];
  const lifts = [win(t, 24, 44, 52, 72), win(t, 44, 64, 72, 92), win(t, 64, 84, 92, 112)];
  const cardIn = pop(f, 24);
  const pillIn = pop(f, 62);
  const ripple = (i: number) => win(t, 210 + i * 8, 218 + i * 8, 222 + i * 8, 236 + i * 8);

  return (
    <div className="font-sans text-swag-ink" style={{ position: "relative", width: STAGE_W, height: STAGE_H, fontVariantNumeric: "tabular-nums" }}>
      <Tile src={hoodieTile} left={0} top={0} width={340} height={300} radius={20} f={f} delay={0} lift={lifts[0]} sheen={sheens[0]} />
      <Tile src={capTile} left={356} top={0} width={150} height={144} radius={16} f={f} delay={8} lift={lifts[1]} sheen={sheens[1]} />
      <Tile src={teeTile} left={356} top={156} width={150} height={144} radius={16} f={f} delay={14} lift={lifts[2]} sheen={sheens[2]} />

      {/* campaign card */}
      <div
        className="bg-white"
        style={{
          position: "absolute",
          left: 170,
          top: 250,
          width: 290,
          height: 147,
          borderRadius: 16,
          opacity: seg(f, 24, 32, LIN),
          transform: `translateY(${(1 - cardIn) * 28 - cardLift * 4}px) scale(${0.94 + 0.06 * cardIn})`,
          boxShadow: SHADOW(cardLift),
        }}
      >
        <div
          className="bg-canvas-green"
          style={{ position: "absolute", left: 14, top: 14, width: 74, height: 19, borderRadius: 100, display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <p className="font-sans font-bold uppercase text-grey-800" style={{ fontSize: 10, lineHeight: "13px", letterSpacing: 1, whiteSpace: "nowrap" }}>
            Campaign
          </p>
        </div>
        <p className="font-sans font-bold" style={{ position: "absolute", left: 14, top: 43, fontSize: 15, lineHeight: "19px", whiteSpace: "nowrap" }}>
          ARCADE Summit Kit
        </p>
        {[
          { x: 0, n: products, l: "products" },
          { x: 62, n: recipients, l: "recipients" },
          { x: 129, n: countries, l: "countries" },
        ].map((s) => (
          <div key={s.l} style={{ position: "absolute", left: 14 + s.x, top: 72, whiteSpace: "nowrap" }}>
            <p className="font-sans font-bold" style={{ fontSize: 18, lineHeight: "23px" }}>
              {s.n}
            </p>
            <p className="font-sans text-swag-grey" style={{ fontSize: 11, lineHeight: "14px" }}>
              {s.l}
            </p>
          </div>
        ))}
        <div style={{ position: "absolute", left: 14, top: 119, height: 14, display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap" }}>
          <div className="bg-campaign-track" style={{ position: "relative", width: 150, height: 6, borderRadius: 3, overflow: "hidden", flexShrink: 0 }}>
            <div className="bg-campaign-ok" style={{ width: barW, height: 6, borderRadius: 3 }} />
          </div>
          <p className="font-sans font-semibold text-campaign-ok" style={{ fontSize: 11, lineHeight: "14px" }}>
            {Math.round(delivered)} of 420 delivered
          </p>
        </div>
      </div>

      {/* reach pill */}
      <div
        className="bg-arcade-pill"
        style={{
          position: "absolute",
          left: 170,
          top: 405,
          width: 379,
          height: 42,
          borderRadius: 12,
          opacity: seg(f, 62, 70, LIN),
          transform: `translateY(${(1 - pillIn) * 24}px) scale(${0.94 + 0.06 * pillIn})`,
          boxShadow: "0px 10px 24px 0px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div style={{ position: "absolute", inset: 0, borderRadius: 12, border: "1px solid rgba(255,255,255,0.12)" }} />
        <div style={{ position: "absolute", left: 11, top: 10, width: 86, height: 22 }}>
          {FLAGS.map((code, i) => {
            const fp = pop(f, 66 + i * 3);
            return <Flag key={code} code={code} left={i * 16} scale={(0.6 + 0.4 * fp) * (1 + 0.14 * ripple(i))} opacity={seg(f, 66 + i * 3, 72 + i * 3, LIN)} />;
          })}
        </div>
        <p className="font-sans font-semibold text-white" style={{ position: "absolute", left: 107, top: 13.5, fontSize: 12, lineHeight: "15px", whiteSpace: "nowrap" }}>
          Shipping to 38 countries, tracked per recipient
        </p>
      </div>
    </div>
  );
}
