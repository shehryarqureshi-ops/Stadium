"use client";

/* Shared bits for the Batch 3 animated hero visuals (hero-visual-design v2.5,
   animated mode). Every scene is a pure function of useCurrentFrame() on a fixed
   stage (stage units = bare numbers, NOT CSS px — the one place the "no hardcoded
   px" rule doesn't apply, see design.md → "Batch 3 hero visuals").
   Timeline for every scene (30 fps): 0–96 INTRO (frame 96 = the Figma frame, also
   the reduced-motion still) · 96–396 LOOP (every moving value is at its rest pose at
   both ends, so the host can seek 396 → 96 with no seam). */

import { Player, type PlayerRef } from "@remotion/player";
import { useEffect, useRef, useSyncExternalStore, type ComponentType } from "react";
import { Easing, interpolate, spring } from "remotion";

export const FPS = 30;
export const INTRO = 96;
export const LOOP = 300;
export const DURATION = INTRO + LOOP;

export const OUT = Easing.bezier(0.22, 1, 0.36, 1);
export const IN_OUT = Easing.inOut(Easing.cubic);
export const LIN = (x: number) => x;

/** 0 → 1 between two frames, clamped. */
export const seg = (f: number, from: number, to: number, easing: (t: number) => number = OUT) =>
  interpolate(f, [from, to], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing });

/** Spring entrance 0 → ~1 (slight overshoot). */
export const pop = (f: number, delay: number) =>
  spring({ frame: f - delay, fps: FPS, config: { damping: 15, stiffness: 150, mass: 0.7 } });

/** Rises a→b, holds, falls c→d (loop-local frames). */
export const win = (t: number, a: number, b: number, c: number, d: number) =>
  seg(t, a, b, IN_OUT) - seg(t, c, d, IN_OUT);

/** 0 → 1 → 0 bell over [a, b]. */
export const bell = (t: number, a: number, b: number) => Math.sin(Math.PI * seg(t, a, b, LIN));

/** Whole-cycle float; ramps in over the intro's last frames and is 0 at frames 96 and 396. */
export const bob = (f: number, cycles: number, amp: number) =>
  seg(f, 56, INTRO, LIN) * Math.sin((2 * Math.PI * cycles * (f - INTRO)) / LOOP) * amp;

/** Standard white-card shadow, `lift` 0 → 1. */
export const SHADOW = (lift = 0) =>
  `0px ${8 + 4 * lift}px ${24 + 6 * lift}px 0px rgba(0, 0, 0, ${0.2 + 0.06 * lift})`;
export const SHADOW_FLOAT = (lift = 0) =>
  `0px ${12 + 4 * lift}px ${30 + 6 * lift}px 0px rgba(0, 0, 0, ${0.3 + 0.04 * lift})`;

/** Cubic bezier point (vertical-tangent connectors: M x1 y1 C x1 ym x2 ym x2 y2). */
export function vCurve(x1: number, y1: number, x2: number, y2: number, t: number) {
  const m = (y2 - y1) / 2;
  const u = 1 - t;
  return {
    x: u * u * u * x1 + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t * t * t * x2,
    y: u * u * u * y1 + 3 * u * u * t * (y1 + m) + 3 * u * t * t * (y2 - m) + t * t * t * y2,
  };
}
export const vCurvePath = (x1: number, y1: number, x2: number, y2: number) => {
  const m = (y2 - y1) / 2;
  return `M ${x1} ${y1} C ${x1} ${y1 + m} ${x2} ${y2 - m} ${x2} ${y2}`;
};

const REDUCED = "(prefers-reduced-motion: reduce)";
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (notify) => {
      const mq = window.matchMedia(REDUCED);
      mq.addEventListener("change", notify);
      return () => mq.removeEventListener("change", notify);
    },
    () => window.matchMedia(REDUCED).matches,
    () => false,
  );
}

/** Remotion Player host: plays the intro once, then loops INTRO → end; pauses off-screen;
    reduced motion = still at INTRO. Decorative (aria-hidden, non-interactive). */
export function SceneHost({
  scene,
  width,
  height,
}: {
  scene: ComponentType;
  width: number;
  height: number;
}) {
  const reduced = usePrefersReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<PlayerRef>(null);
  const visibleRef = useRef(true);

  useEffect(() => {
    const player = playerRef.current;
    const wrap = wrapRef.current;
    if (!player || !wrap || reduced) return;
    const onEnded = () => {
      player.seekTo(INTRO);
      if (visibleRef.current) player.play();
    };
    player.addEventListener("ended", onEnded);
    const io = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
      if (entry.isIntersecting) player.play();
      else player.pause();
    });
    io.observe(wrap);
    return () => {
      player.removeEventListener("ended", onEnded);
      io.disconnect();
    };
  }, [reduced]);

  return (
    <div ref={wrapRef} aria-hidden className="pointer-events-none w-full select-none">
      <Player
        key={reduced ? "still" : "motion"}
        ref={playerRef}
        component={scene}
        durationInFrames={DURATION}
        fps={FPS}
        compositionWidth={width}
        compositionHeight={height}
        initialFrame={reduced ? INTRO : 0}
        autoPlay={!reduced}
        loop={false}
        controls={false}
        clickToPlay={false}
        numberOfSharedAudioTags={0}
        overflowVisible
        acknowledgeRemotionLicense
        style={{ width: "100%" }}
      />
    </div>
  );
}

/* tiny shared atoms */
export const capsText = {
  fontSize: 10,
  lineHeight: "13px",
  letterSpacing: 1,
  fontWeight: 700,
  textTransform: "uppercase" as const,
  whiteSpace: "nowrap" as const,
};
