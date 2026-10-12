"use client";

/* /impact/hr hero visual — "Moments bento" (Figma n9SjmDjzB1PeZAYJ5w43fr
   5388:21262, visual frame 5391:22411, 560 × 423 = the graphic cluster itself,
   flush to the Talk-to-sales edge and top-aligned with the copy;
   hero-visual-design v2.5). Every element is a pure function of the current
   frame, so the Player can play, pause and seek it.

   STAGE UNITS. Authored on a fixed 560 × 423 stage that the Remotion Player
   scales to its container. Bare numbers in the style objects are stage units,
   NOT CSS px — the one place the "no hardcoded px" rule intentionally doesn't
   apply (design.md → "/impact/hr hero"). Colours and fonts come from tokens.

   TIMELINE (30 fps)
     0 – 96     INTRO: the three moment cards spring in (0 / 10 / 20), the
                welcome-kit photo settles, the "Delivered" label lands, "+50 pts" and "5 years" count up. Frame 96 is
                exactly the Figma frame (also the prefers-reduced-motion still).
     96 – 396   LOOP (300 frames): every moving value starts and ends at its
                rest pose (seamless 396 → 96). Each moment takes a turn: the
                welcome kit lifts and "Delivered" pulses, the recognition card
                lifts and "+50 pts" pulses, the milestone card lifts and the
                gift photo breathes. Underneath, each card floats on its own
                whole-cycle sine (±2).

   NO CROP. overflowVisible on the Player; nothing leaves 0 … STAGE_W. */

import Image from "next/image";
import { Easing, interpolate, spring, useCurrentFrame } from "remotion";

import avatarArun from "@/public/impact/hr/hero/avatar-arun.png";
import avatarJordan from "@/public/impact/hr/hero/avatar-jordan.png";
import photoAnniversary from "@/public/impact/hr/hero/photo-anniversary-gift.jpg";
import photoWelcomeKit from "@/public/impact/hr/hero/photo-welcome-kit.jpg";
import ukgLogo from "@/public/impact/hr/hero/logo-ukg.svg";

export const STAGE_W = 560;
export const STAGE_H = 423;
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

/** Slow vertical float for a resting element; ramps in with the intro's last frames. */
const bob = (f: number, cycles: number, amp: number) =>
  seg(f, 56, INTRO, (x) => x) * Math.sin((2 * Math.PI * cycles * (f - INTRO)) / LOOP) * amp;

/** 0 → 1 → 0 pulse over a window. */
const pulse = (t: number, a: number, b: number) => win(t, a, (a + b) / 2, (a + b) / 2, b);

/* ───────────── shared bits ───────────── */

const CARD_RADIUS = 22;
const SHADOW = (lift: number) =>
  `0px ${16 + 6 * lift}px ${40 + 8 * lift}px 0px rgba(0, 0, 0, ${0.38 + 0.08 * lift})`;

const chipText = {
  fontSize: 10,
  lineHeight: "14px",
  letterSpacing: 1,
  fontWeight: 700,
  textTransform: "uppercase" as const,
  whiteSpace: "nowrap" as const,
};

function Chip({
  className,
  scale = 1,
  origin = "50% 50%",
  children,
}: {
  className: string;
  scale?: number;
  origin?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={className}
      style={{
        padding: "4px 10px",
        borderRadius: 100,
        transform: `scale(${scale})`,
        transformOrigin: origin,
      }}
    >
      <p style={chipText}>{children}</p>
    </div>
  );
}

function Card({
  left,
  top,
  width,
  height,
  f,
  delay,
  lift = 0,
  bob: bobY = 0,
  padding,
  gap,
  justify,
  children,
}: {
  left: number;
  top: number;
  width: number;
  height?: number;
  f: number;
  delay: number;
  lift?: number;
  bob?: number;
  padding: number;
  gap?: number;
  justify?: "space-between";
  children: React.ReactNode;
}) {
  const p = pop(f, delay);
  return (
    <div
      className="bg-white"
      style={{
        position: "absolute",
        left,
        top,
        width,
        height,
        boxSizing: "border-box",
        padding,
        borderRadius: CARD_RADIUS,
        display: "flex",
        flexDirection: "column",
        justifyContent: justify,
        gap,
        overflow: "hidden",
        opacity: seg(f, delay, delay + 8, (x) => x),
        transform: `translateY(${(1 - p) * 28 - lift * 5 + bobY}px) scale(${0.94 + 0.06 * p})`,
        boxShadow: SHADOW(lift),
      }}
    >
      {children}
    </div>
  );
}

function AvatarPill({ src, name, sub }: { src: typeof avatarArun; name: string; sub?: string }) {
  return (
    <div
      className="bg-chip-surface"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "4px 12px 4px 4px",
        borderRadius: 100,
        alignSelf: "flex-start",
        whiteSpace: "nowrap",
      }}
    >
      <Image
        src={src}
        alt=""
        sizes="3.5rem"
        quality={90}
        style={{ width: 28, height: 28, borderRadius: "50%", display: "block", maxWidth: "none" }}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p style={{ fontSize: 12, lineHeight: "15px", fontWeight: 600 }}>{name}</p>
        {sub && (
          <p className="text-swag-grey" style={{ fontSize: 10, lineHeight: "12px" }}>
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}

/* ───────────── loop schedule (loop frames) ───────────── */

const KIT = [20, 70] as const; // welcome kit: lift + "Delivered" pulse
const REC = [105, 155] as const; // recognition: lift + "+50 pts" pulse
const MIL = [190, 240] as const; // milestone: lift + gift photo breathe

/* ───────────── scene ───────────── */

export function MomentsBentoScene() {
  const f = useCurrentFrame();
  const lt = Math.max(0, f - INTRO);

  /* intro */
  const photoIn = pop(f, 6);
  const deliveredIn = Math.min(1, pop(f, 44));
  const points = Math.round(50 * seg(f, 40, 78));
  const years = Math.round(5 * seg(f, 44, 76));
  const giftIn = pop(f, 30);

  /* loop */
  const kitLift = win(lt, KIT[0], KIT[0] + 14, KIT[1] - 14, KIT[1]);
  const recLift = win(lt, REC[0], REC[0] + 14, REC[1] - 14, REC[1]);
  const milLift = win(lt, MIL[0], MIL[0] + 14, MIL[1] - 14, MIL[1]);
  const deliveredPulse = pulse(lt, KIT[0] + 10, KIT[1] - 6);
  const pointsPulse = pulse(lt, REC[0] + 10, REC[1] - 6);
  const giftBreathe = pulse(lt, MIL[0] + 6, MIL[1]);

  const bobs = { kit: bob(f, 1, -2), rec: bob(f, 2, 2), mil: bob(f, 3, -2) };

  return (
    <div className="font-sans text-grey-800" style={{ position: "relative", width: STAGE_W, height: STAGE_H }}>
      {/* moment · Welcome kit */}
      <Card left={0} top={0} width={300} height={423} f={f} delay={0} lift={kitLift} bob={bobs.kit} padding={12} gap={12}>
        <div
          className="bg-chip-surface"
          style={{
            height: 268,
            flexShrink: 0,
            borderRadius: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: 230,
              height: 230,
              mixBlendMode: "multiply",
              transform: `scale(${0.9 + 0.1 * Math.min(1, photoIn) + 0.012 * kitLift}) translateY(${(1 - photoIn) * 10}px)`,
              opacity: seg(f, 6, 16, (x) => x),
            }}
          >
            <Image
              src={photoWelcomeKit}
              alt=""
              sizes="15rem"
              quality={90}
              style={{ width: 230, height: 230, objectFit: "contain", display: "block", maxWidth: "none" }}
            />
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 22 }}>
          <Chip className="bg-canvas-blue">Onboarding</Chip>
          <div style={{ opacity: deliveredIn > 0 ? Math.min(1, deliveredIn) : 0 }}>
            <Chip
              className="bg-canvas-green"
              scale={(0.7 + 0.3 * deliveredIn) * (1 + 0.08 * deliveredPulse)}
              origin="100% 50%"
            >
              Delivered
            </Chip>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4, whiteSpace: "nowrap" }}>
          <p style={{ fontSize: 18, lineHeight: "24px", fontWeight: 700 }}>Welcome kit</p>
          <p className="text-swag-grey" style={{ fontSize: 12, lineHeight: "16px" }}>
            Maya Chen · Product Designer · Day 1
          </p>
        </div>

        <div className="bg-grey-200" style={{ height: 1, flexShrink: 0 }} />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Image
              src={ukgLogo}
              alt=""
              style={{ width: 35.1044, height: 14, display: "block", maxWidth: "none", flexShrink: 0 }}
            />
            <p className="text-swag-grey" style={{ fontSize: 11, lineHeight: "14px", whiteSpace: "nowrap" }}>
              New hire synced
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {/* Spain — 1:2:1 stripes; the Figma flag is a sprite, not worth shipping at 16 */}
            <div
              className="border-white"
              style={{
                width: 16,
                height: 16,
                borderRadius: 8,
                borderWidth: 1.5,
                borderStyle: "solid",
                boxSizing: "border-box",
                background: "linear-gradient(#aa151b 0 25%, #f1bf00 25% 75%, #aa151b 75% 100%)",
              }}
            />
            <p style={{ fontSize: 11, lineHeight: "14px", fontWeight: 600, whiteSpace: "nowrap" }}>Madrid</p>
          </div>
        </div>
      </Card>

      {/* moment · Recognition */}
      <Card
        left={316}
        top={0}
        width={244}
        height={204}
        f={f}
        delay={10}
        lift={recLift}
        bob={bobs.rec}
        padding={16}
        justify="space-between"
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Chip className="bg-canvas-lilac">Recognition</Chip>
          <p className="text-canvas-muted" style={{ fontSize: 10, lineHeight: "14px", whiteSpace: "nowrap" }}>
            2m ago
          </p>
        </div>
        <AvatarPill src={avatarArun} name="Arun Mehta" sub="recognized Grace" />
        <p className="text-grey-700" style={{ fontSize: 13, lineHeight: "18px" }}>
          Thank you for owning the launch. You made it look easy.
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div className="bg-grey-200" style={{ padding: "4px 10px", borderRadius: 100 }}>
            <p className="text-grey-600" style={{ fontSize: 10, lineHeight: "14px", fontWeight: 600, whiteSpace: "nowrap" }}>
              #Ownership
            </p>
          </div>
          <p
            style={{
              fontSize: 12,
              lineHeight: "16px",
              fontWeight: 700,
              whiteSpace: "nowrap",
              transform: `scale(${1 + 0.12 * pointsPulse})`,
              transformOrigin: "100% 50%",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            +{points} pts
          </p>
        </div>
      </Card>

      {/* moment · Milestone */}
      <Card
        left={316}
        top={218}
        width={244}
        height={205}
        f={f}
        delay={20}
        lift={milLift}
        bob={bobs.mil}
        padding={16}
        justify="space-between"
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Chip className="bg-canvas-pink">Milestone</Chip>
          <Chip className="bg-canvas-yellow">Scheduled</Chip>
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <AvatarPill src={avatarJordan} name="Jordan Lee" />
            <p className="font-display" style={{ fontSize: 30, lineHeight: "36px", whiteSpace: "nowrap" }}>
              {years} {years === 1 ? "year" : "years"}
            </p>
            <p className="text-swag-grey" style={{ fontSize: 12, lineHeight: "16px", whiteSpace: "nowrap" }}>
              Work anniversary
            </p>
          </div>
          <div
            className="bg-chip-surface"
            style={{
              width: 84,
              height: 84,
              flexShrink: 0,
              borderRadius: 14,
              overflow: "hidden",
              opacity: seg(f, 30, 40, (x) => x),
              transform: `scale(${0.9 + 0.1 * Math.min(1, giftIn)})`,
            }}
          >
            <div style={{ width: 84, height: 84, transform: `scale(${1 + 0.07 * giftBreathe})` }}>
              <Image
                src={photoAnniversary}
                alt=""
                sizes="6rem"
                quality={90}
                style={{ width: 84, height: 84, objectFit: "cover", display: "block", maxWidth: "none" }}
              />
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ display: "block", flexShrink: 0 }}>
            <path
              d="M9.5 2H2.5C1.948 2 1.5 2.448 1.5 3V10C1.5 10.552 1.948 11 2.5 11H9.5C10.052 11 10.5 10.552 10.5 10V3C10.5 2.448 10.052 2 9.5 2ZM8 1V3M4 1V3M1.5 5H10.5"
              className="stroke-swag-grey"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-swag-grey" style={{ fontSize: 11, lineHeight: "14px", whiteSpace: "nowrap" }}>
            Gift ships Friday
          </p>
        </div>
      </Card>
    </div>
  );
}
