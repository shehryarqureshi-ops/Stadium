"use client";

/* Remotion Player host for the /impact hero visual (scene: OpenSpatialCanvasScene).
   - Scales the fixed 647 × 724 stage to its container, so it keeps the Figma
     proportions from mobile through desktop (aspect ratio reserves the space →
     no layout shift while the Player boots).
   - Plays the intro once, then loops only the idle segment (INTRO → end): the
     Player has no "loop from frame N", so `ended` seeks back to INTRO.
   - Pauses while off-screen; prefers-reduced-motion gets the finished frame
     (INTRO) as a still, no playback.
   - overflowVisible: shadows and lifted cards are never clipped at the stage edge.
   - Decorative: aria-hidden, not interactive. */

import { Player, type PlayerRef } from "@remotion/player";
import { useEffect, useRef, useSyncExternalStore } from "react";

import {
  DURATION,
  FPS,
  INTRO,
  OpenSpatialCanvasScene,
  STAGE_H,
  STAGE_W,
} from "./OpenSpatialCanvasScene";

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

export default function OpenSpatialCanvas() {
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
        component={OpenSpatialCanvasScene}
        durationInFrames={DURATION}
        fps={FPS}
        compositionWidth={STAGE_W}
        compositionHeight={STAGE_H}
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
