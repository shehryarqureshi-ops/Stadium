"use client";

/* /impact/marketing hero visual — "Brand kit applied" (Figma n9SjmDjzB1PeZAYJ5w43fr
   5195:17478, visual frame 5195:19010, 596 × 375 — the graphic cluster itself, flush
   to the Talk-to-sales edge and top-aligned with the copy; hero-visual-design v2.3). A Remotion composition: every
   element is a pure function of the current frame, so the Player can play, pause
   and seek it.

   STAGE UNITS. Authored on a fixed 596 × 375 stage that the Player scales to its
   container, so bare numbers in the style objects are stage units, NOT CSS px
   (the one place the "no hardcoded px" rule intentionally doesn't apply — see
   design.md → "/impact/marketing hero"). Colours and fonts still come from tokens.

   TIMELINE (30 fps)
     0 – 96     INTRO: the brand-kit banner drops in, swatches and the "Applied"
                chip pop; the hoodie, cap and tee spring in one after another and
                each gets its logo "applied" (check draws, label appears) while the
                chip counts 1 → 3; the "Delivered to 38 countries" caption and its
                flags pop last. Frame 96 is exactly the Figma frame → also the
                still used for prefers-reduced-motion.
     96 – 396   LOOP (300 frames): every moving value starts and ends at its Figma
                rest pose so the Player can jump 396 → 96 without a seam. A soft
                sheen sweeps the three product photos in turn (each tile lifts as
                it passes), the swatches pulse, and the flags ripple. Underneath,
                each surface floats on its own whole-cycle sine.

   NO CROP. overflowVisible on the Player + every moving thing stays inside
   0 … STAGE_W. */

import Image from "next/image";
import { Easing, interpolate, spring, useCurrentFrame } from "remotion";

import thumbCap from "@/public/impact/marketing/hero/thumb-cap.jpg";
import thumbHoodie from "@/public/impact/marketing/hero/thumb-hoodie.png";
import thumbTee from "@/public/impact/marketing/hero/thumb-tee.jpg";

export const STAGE_W = 596;
export const STAGE_H = 375;
export const FPS = 30;
export const INTRO = 96;
const LOOP = 300;
export const DURATION = INTRO + LOOP;

/* ───────────── motion helpers ───────────── */

const OUT = Easing.bezier(0.22, 1, 0.36, 1);
const IN_OUT = Easing.inOut(Easing.cubic);

/** 0 → 1 between two frames, clamped. */
const seg = (f: number, from: number, to: number, easing: (t: number) => number = OUT) =>
  interpolate(f, [from, to], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });

/** Spring entrance, 0 → ~1 (slight overshoot). */
const pop = (f: number, delay: number) =>
  spring({ frame: f - delay, fps: FPS, config: { damping: 15, stiffness: 150, mass: 0.7 } });

/** Rises a→b, holds, falls c→d. */
const win = (t: number, a: number, b: number, c: number, d: number) =>
  seg(t, a, b, IN_OUT) - seg(t, c, d, IN_OUT);

/** Slow vertical float for a resting element; whole cycles → seamless, ramps in with the intro's last frames. */
const bob = (f: number, cycles: number, amp: number) =>
  seg(f, 56, INTRO, (x) => x) * Math.sin((2 * Math.PI * cycles * (f - INTRO)) / LOOP) * amp;

/* ───────────── layout (Figma, visual-local) ───────────── */

const GROUP = { left: 0, top: 0, width: 596 };
const BANNER_RADIUS = 18;
const TILE_RADIUS = 20;
const TILE_W = 192;

/* intro delays, reading order */
const D_BANNER = 0;
const D_TILES = [20, 28, 36] as const;
const D_APPLIED = [38, 46, 54] as const; // logo "applied" per tile
const D_CAPTION = 62;

/* loop: sheen sweep windows (loop frames) per tile, twice per cycle */
const SWEEPS = [
  [24, 70],
  [40, 86],
  [56, 102],
] as const;
const SWEEP_OFFSET = 150;

/* ───────────── shared bits ───────────── */

function Check({ size, progress, className }: { size: number; progress: number; className: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      className={className}
      style={{ flexShrink: 0, display: "block" }}
    >
      <path
        d="M2.4 6.4 L5 9 L9.8 3.2"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={12}
        strokeDashoffset={12 * (1 - progress)}
      />
    </svg>
  );
}

/** Surface that springs in; `lift` (0–1) raises it a touch. */
function Surface({
  f,
  delay,
  lift = 0,
  bob: bobY = 0,
  fromY = 28,
  shadow,
  radius,
  className = "bg-white",
  style,
  children,
}: {
  f: number;
  delay: number;
  lift?: number;
  bob?: number;
  fromY?: number;
  shadow: readonly [y: number, blur: number, alpha: number];
  radius: number;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const p = pop(f, delay);
  const [y, blur, a] = shadow;
  return (
    <div
      className={className}
      style={{
        borderRadius: radius,
        overflow: "hidden",
        opacity: seg(f, delay, delay + 8, (x) => x),
        transform: `translateY(${(1 - p) * fromY - lift * 5 + bobY}px) scale(${0.94 + 0.06 * p})`,
        boxShadow: `0px ${y + 6 * lift}px ${blur + 8 * lift}px 0px rgba(0, 0, 0, ${a + 0.06 * lift})`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ───────────── flags (3:2 SVGs clipped to a 22-unit disc) ───────────── */

const FLAGS: { name: string; art: React.ReactNode }[] = [
  {
    name: "Germany",
    art: (
      <>
        <rect width="3" height="0.67" fill="#000" />
        <rect y="0.67" width="3" height="0.67" fill="#dd0000" />
        <rect y="1.33" width="3" height="0.67" fill="#ffce00" />
      </>
    ),
  },
  {
    name: "Japan",
    art: (
      <>
        <rect width="3" height="2" fill="#fff" />
        <circle cx="1.5" cy="1" r="0.6" fill="#bc002d" />
      </>
    ),
  },
  {
    name: "Brazil",
    art: (
      <>
        <rect width="3" height="2" fill="#009c3b" />
        <path d="M1.5 0.18 L2.76 1 L1.5 1.82 L0.24 1 Z" fill="#ffdf00" />
        <circle cx="1.5" cy="1" r="0.42" fill="#002776" />
      </>
    ),
  },
  {
    name: "India",
    art: (
      <>
        <rect width="3" height="0.67" fill="#ff9933" />
        <rect y="0.67" width="3" height="0.67" fill="#fff" />
        <rect y="1.33" width="3" height="0.67" fill="#138808" />
        <circle cx="1.5" cy="1" r="0.22" fill="none" stroke="#000080" strokeWidth="0.07" />
      </>
    ),
  },
  {
    name: "USA",
    art: (
      <>
        <rect width="3" height="2" fill="#fff" />
        {[0, 2, 4, 6, 8, 10, 12].map((i) => (
          <rect key={i} y={(i * 2) / 13} width="3" height={2 / 13} fill="#b22234" />
        ))}
        <rect width="1.3" height="1.08" fill="#3c3b6e" />
      </>
    ),
  },
];

function Flag({ art, scale }: { art: React.ReactNode; scale: number }) {
  return (
    <div
      className="bg-white"
      style={{
        width: 22,
        height: 22,
        marginRight: -5,
        borderRadius: 11,
        border: "1.5px solid #fff",
        overflow: "hidden",
        flexShrink: 0,
        transform: `scale(${scale})`,
        boxSizing: "border-box",
      }}
    >
      <svg width={30} height={19} viewBox="0 0 3 2" style={{ display: "block", marginLeft: -5, marginTop: 0 }}>
        {art}
      </svg>
    </div>
  );
}

/* ───────────── products ───────────── */

const PRODUCTS = [
  /* `multiply`: the cap / tee shots are on white — multiplying them over the grey well keeps every tile the same grey. */
  { name: "Hoodie", src: thumbHoodie, photo: 140, fit: "contain" as const, multiply: false },
  { name: "Cap", src: thumbCap, photo: 172, fit: "cover" as const, multiply: true },
  { name: "Tee", src: thumbTee, photo: 172, fit: "cover" as const, multiply: true },
];

function ProductTile({
  index,
  f,
  lt,
}: {
  index: 0 | 1 | 2;
  f: number;
  lt: number;
}) {
  const product = PRODUCTS[index];
  const delay = D_TILES[index];
  const applied = seg(f, D_APPLIED[index], D_APPLIED[index] + 12);
  const [a, b] = SWEEPS[index];
  const sweep = seg(lt, a, b, (x) => x);
  /* tile lifts while the sheen crosses it (0 at both loop ends) */
  const lift = win(lt, a, a + 12, b - 12, b);
  const settle = 1 + 0.05 * (1 - seg(f, delay, delay + 22));

  return (
    <Surface
      f={f}
      delay={delay}
      lift={lift}
      bob={bob(f, index === 1 ? 3 : 2, 3)}
      shadow={[18, 44, 0.4]}
      radius={TILE_RADIUS}
      style={{ width: TILE_W, padding: 10, display: "flex", flexDirection: "column", gap: 10, boxSizing: "border-box" }}
    >
      <div
        className="bg-arcade-well"
        style={{
          position: "relative",
          width: 172,
          height: 172,
          borderRadius: 14,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            transform: `scale(${settle})`,
            width: product.photo,
            height: product.photo,
            flexShrink: 0,
            mixBlendMode: product.multiply ? "multiply" : undefined,
          }}
        >
          <Image
            src={product.src}
            alt=""
            sizes="11rem"
            quality={90}
            style={{
              width: product.photo,
              height: product.photo,
              objectFit: product.fit,
              display: "block",
              maxWidth: "none",
            }}
          />
        </div>
        {/* sheen sweep (loop only) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: sweep > 0 && sweep < 1 ? 1 : 0,
            transform: `translateX(${-SWEEP_OFFSET + 2 * SWEEP_OFFSET * sweep}px)`,
            background:
              "linear-gradient(105deg, rgba(255,255,255,0) 38%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 62%)",
          }}
        />
      </div>
      <div style={{ paddingLeft: 4, display: "flex", flexDirection: "column", gap: 2 }}>
        <span className="text-grey-800" style={{ fontSize: 14, lineHeight: "18px", fontWeight: 600 }}>
          {product.name}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 5, opacity: applied }}>
          <Check size={11} progress={applied} className="text-swag-grey" />
          <span className="text-swag-grey" style={{ fontSize: 11, lineHeight: "14px", whiteSpace: "nowrap" }}>
            Logo applied
          </span>
        </div>
      </div>
    </Surface>
  );
}

/* ───────────── scene ───────────── */

export function BrandKitAppliedScene() {
  const f = useCurrentFrame();
  const lt = Math.max(0, f - INTRO);

  /* chip: Applied to 1 → 3 products as each logo lands */
  const count = D_APPLIED.filter((d) => f >= d + 6).length;
  const chipCheck = seg(f, D_BANNER + 28, D_BANNER + 40);

  /* swatches pulse one after another in the loop */
  const swatchPulse = (a: number) => win(lt, a, a + 8, a + 12, a + 22);

  /* flags ripple in the loop */
  const flagPulse = (i: number) => win(lt, 130 + i * 7, 130 + i * 7 + 8, 130 + i * 7 + 12, 130 + i * 7 + 22);

  return (
    <div style={{ position: "relative", width: STAGE_W, height: STAGE_H }}>
      <div style={{ position: "absolute", left: GROUP.left, top: GROUP.top, width: GROUP.width }}>
        {/* brand kit banner */}
        <Surface
          f={f}
          delay={D_BANNER}
          fromY={-20}
          bob={bob(f, 1, 2)}
          shadow={[14, 34, 0.36]}
          radius={BANNER_RADIUS}
          style={{
            width: GROUP.width,
            padding: "14px 18px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            boxSizing: "border-box",
          }}
        >
          <div
            className="bg-arcade-purple font-display text-white"
            style={{
              padding: "8px 14px",
              borderRadius: 10,
              fontSize: 13,
              lineHeight: "16px",
              letterSpacing: 2,
              fontWeight: 900,
            }}
          >
            ARCADE
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 1, whiteSpace: "nowrap" }}>
            <span className="text-grey-800" style={{ fontSize: 15, lineHeight: "20px", fontWeight: 600 }}>
              Brand kit
            </span>
            <span className="text-swag-grey" style={{ fontSize: 12, lineHeight: "16px" }}>
              Logo · colours · type
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {["bg-arcade-purple", "bg-grey-800", "bg-white"].map((cls, i) => (
              <div
                key={cls}
                className={`${cls} border-grey-200`}
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  borderWidth: 1,
                  borderStyle: "solid",
                  boxSizing: "border-box",
                  transform: `scale(${pop(f, D_BANNER + 12 + i * 4) * (1 + 0.18 * swatchPulse(20 + i * 14))})`,
                }}
              />
            ))}
          </div>
          <div style={{ flex: 1 }} />
          <div
            className="bg-canvas-green text-canvas-check"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 10px",
              borderRadius: 100,
              transform: `scale(${0.9 + 0.1 * pop(f, D_BANNER + 24)})`,
              transformOrigin: "100% 50%",
              opacity: seg(f, D_BANNER + 24, D_BANNER + 32, (x) => x),
            }}
          >
            <Check size={12} progress={chipCheck} className="text-canvas-check" />
            <span style={{ fontSize: 11, lineHeight: "14px", fontWeight: 700, whiteSpace: "nowrap" }}>
              Applied to {Math.max(count, 1)} products
            </span>
          </div>
        </Surface>

        {/* branded products */}
        <div style={{ position: "absolute", left: 0, top: 81, display: "flex", gap: 10 }}>
          <ProductTile index={0} f={f} lt={lt} />
          <ProductTile index={1} f={f} lt={lt} />
          <ProductTile index={2} f={f} lt={lt} />
        </div>

        {/* regions caption */}
        <div style={{ position: "absolute", left: 0, top: 333, width: GROUP.width, display: "flex", justifyContent: "center" }}>
          <Surface
            f={f}
            delay={D_CAPTION}
            bob={bob(f, 1, 2.5)}
            fromY={18}
            shadow={[10, 24, 0.3]}
            radius={100}
            style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", overflow: "visible" }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              {FLAGS.map((flag, i) => (
                <Flag
                  key={flag.name}
                  art={flag.art}
                  scale={Math.min(1, pop(f, D_CAPTION + 6 + i * 4)) * (1 + 0.14 * flagPulse(i))}
                />
              ))}
            </div>
            <span
              className="text-grey-800"
              style={{
                fontSize: 13,
                lineHeight: "18px",
                fontWeight: 600,
                whiteSpace: "nowrap",
                opacity: seg(f, D_CAPTION + 10, D_CAPTION + 22, (x) => x),
              }}
            >
              Delivered to 38 countries
            </span>
          </Surface>
        </div>
      </div>
    </div>
  );
}
