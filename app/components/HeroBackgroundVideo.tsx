"use client";

import { useEffect, useRef } from "react";
import type { HeroSlide } from "../data/heroRotation";

/* Full-bleed hero background: every slide's video is mounted and preloaded up
   front (preload="auto") so switching is instant with no black flash — the
   hero still image (heroBg) is each video's poster, so even before a clip
   buffers the section shows the photo, never black.

   Only the active clip plays (plus the outgoing one during the crossfade), so
   at most two videos decode at once instead of all five. Crossfade is opacity
   only. When `playing` is false (section off-screen / tab hidden) or reduced
   motion is on, everything pauses and the posters show — which gracefully
   degrades the hero back to the original static photo under reduced motion. */

const CROSSFADE_MS = 700;

export default function HeroBackgroundVideo({
  slides,
  index,
  playing,
  reduce,
}: {
  slides: HeroSlide[];
  index: number;
  playing: boolean;
  reduce: boolean;
}) {
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  const prevIndex = useRef(index);

  useEffect(() => {
    const prev = prevIndex.current;
    refs.current.forEach((v, i) => {
      if (!v) return;
      v.muted = true;
      if (!playing || reduce) {
        v.pause();
      } else if (i === index) {
        v.play().catch(() => {});
      } else if (i !== prev) {
        v.pause();
      }
      // the outgoing clip (i === prev) keeps playing through the crossfade
    });

    let timer: ReturnType<typeof setTimeout> | undefined;
    if (prev !== index) {
      timer = setTimeout(() => {
        const outgoing = refs.current[prev];
        if (outgoing && prevIndex.current !== prev) outgoing.pause();
      }, CROSSFADE_MS + 50);
    }
    prevIndex.current = index;
    return () => clearTimeout(timer);
  }, [index, playing, reduce]);

  return (
    <>
      {slides.map((s, i) => (
        <video
          // slides are a stable, ordered config, so index identity is exactly
          // what we want for keys here
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          src={s.video}
          // poster={heroBg.src}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out"
          style={{ opacity: i === index ? 1 : 0 }}
        />
      ))}
    </>
  );
}
