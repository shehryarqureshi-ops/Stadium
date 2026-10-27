"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { HeroSlide } from "../data/heroRotation";

/* Full-bleed hero background, built to stay light on phones.

   - The first slide's poster is always rendered as a real <Image> (priority) —
     it is the LCP element and the whole background on phones, with Save-Data,
     or under reduced motion. No video bytes are requested in those cases.
   - Mounted clips: the active one, the outgoing one (during the crossfade) and
     the NEXT one (hidden, buffering) so the fade into it is instant and starts
     in sync with the word change. Each <video> carries its own poster, so a
     clip that is still buffering shows its photo rather than black.
   - Transition = true crossfade: the incoming clip fades in on top while the
     outgoing one stays fully opaque beneath it (no dip to black), then unmounts.
   - `onReady(i)` tells Hero when slide i is actually on screen (its clip
     started playing, or immediately in poster-only mode) — Hero starts its
     shared 9s clock from that moment, which keeps word and video in lockstep.
     Only the instance whose breakpoint is live reports (the other one is
     display:none and stays inert).
   - Video mounting waits until the page has finished loading (idle) so it
     never competes with fonts / HTML / the poster. Pausing off-screen is
     owned by `playing`. */

const CROSSFADE_MS = 1000;

type NavigatorWithConnection = Navigator & {
  connection?: { saveData?: boolean };
};

export default function HeroBackgroundVideo({
  slides,
  index,
  playing,
  released = false,
  reduce,
  allowOnPhone = false,
  onReady,
}: {
  slides: HeroSlide[];
  index: number;
  playing: boolean;
  /** hero scrolled far away: unmount the clips (frees decoders / GPU memory) */
  released?: boolean;
  reduce: boolean;
  /** phones normally get the poster only; the 16:10 phone media block opts in */
  allowOnPhone?: boolean;
  onReady: (index: number) => void;
}) {
  const [allowVideo, setAllowVideo] = useState(false);
  /* "pending" until decided; "off" = this instance's breakpoint is not live. */
  const [mode, setMode] = useState<"pending" | "video" | "poster" | "off">(
    "pending",
  );
  const [outgoing, setOutgoing] = useState<number | null>(null);
  const refs = useRef<Map<number, HTMLVideoElement>>(new Map());
  const [tracked, setTracked] = useState(index);

  /* Decide once, after load: phones (< md), Save-Data and reduced motion get
     the poster only. Re-checked live if the viewport crosses the breakpoint. */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    let idle: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const saveData =
      (navigator as NavigatorWithConnection).connection?.saveData === true;

    const evaluate = () => {
      window.clearTimeout(timer);
      if (idle !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idle);
      }
      if (allowOnPhone === mq.matches) {
        /* phone instance on a >= md screen, or background instance on a phone */
        setAllowVideo(false);
        setMode("off");
        return;
      }
      if (saveData) {
        setAllowVideo(false);
        setMode("poster");
        return;
      }
      setMode("video");
      const start = () => setAllowVideo(true);
      const arm = () => {
        if ("requestIdleCallback" in window) {
          idle = window.requestIdleCallback(start, { timeout: 2500 });
        } else {
          timer = setTimeout(start, 1500);
        }
      };
      if (document.readyState === "complete") arm();
      else window.addEventListener("load", arm, { once: true });
    };

    evaluate();
    mq.addEventListener("change", evaluate);
    return () => {
      mq.removeEventListener("change", evaluate);
      window.clearTimeout(timer);
    };
  }, [allowOnPhone]);

  const videoOn = allowVideo && !reduce && !released;
  const posterOnly = mode === "poster" || (reduce && mode !== "off");

  /* No video to wait for (Save-Data / reduced motion): the slide is "ready"
     as soon as it is active. */
  useEffect(() => {
    if (posterOnly) onReady(index);
  }, [posterOnly, index, onReady]);

  /* Track the outgoing clip for the crossfade. This is derived DURING render
     (not in an effect) so the old <video> is never unmounted for even one
     render — remounting it was what made it jump to its first frame and replay
     under the fade. It is unmounted only after the fade has finished. */
  if (tracked !== index) {
    setTracked(index);
    setOutgoing(tracked);
  }
  useEffect(() => {
    if (outgoing === null) return;
    const t = setTimeout(() => setOutgoing(null), CROSSFADE_MS + 50);
    return () => clearTimeout(t);
  }, [outgoing, index]);

  const next = (index + 1) % slides.length;

  /* Play / pause the mounted clips. */
  useEffect(() => {
    refs.current.forEach((v, i) => {
      v.muted = true;
      if (!playing || !videoOn) {
        v.pause();
      } else if (i === index) {
        v.play().catch(() => onReady(index));
      } else if (i === next) {
        /* the buffered NEXT clip: hold on its first frame until its turn
           (the outgoing clip keeps playing under the crossfade) */
        v.pause();
        if (v.currentTime > 0) v.currentTime = 0;
      }
    });
  }, [index, next, playing, videoOn, onReady]);

  const mounted = videoOn
    ? [
        ...new Set([
          index,
          ...(outgoing !== null ? [outgoing] : []),
          ...(slides.length > 1 ? [next] : []),
        ]),
      ]
    : [];

  return (
    <>
      {/* base layer: LCP poster, always present */}
      <Image
        src={slides[0].poster}
        alt=""
        fill
        priority
        sizes="100vw"
        quality={75}
        className="object-cover"
      />
      {/* own stacking context so the clips' z-index never rises above the
          scrims / copy that follow in the parent */}
      <div className="absolute inset-0 isolate">
        {mounted.map((i) => (
          <video
            key={slides[i].video}
            ref={(el) => {
              if (el) refs.current.set(i, el);
              else refs.current.delete(i);
            }}
            src={slides[i].video}
            poster={slides[i].poster}
            muted
            playsInline
            preload="auto"
            aria-hidden
            onPlaying={() => {
              if (i === index) onReady(i);
            }}
            className="absolute inset-0 h-full w-full object-cover transition-opacity ease-in-out"
            style={{
              opacity: i === index || i === outgoing ? 1 : 0,
              zIndex: i === index ? 2 : i === outgoing ? 1 : 0,
              transitionDuration: `${CROSSFADE_MS}ms`,
            }}
          />
        ))}
      </div>
    </>
  );
}
