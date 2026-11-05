"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
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
     slide change when the clip reaches its end (100 ms crossfade), keeping word and video in lockstep.
     Only the instance whose breakpoint is live reports (the other one is
     display:none and stays inert).
   - The first clip mounts immediately and plays asap; once it is playing the
     other clips download in the background (low priority). Pausing
     off-screen is owned by `playing`. */

const CROSSFADE_MS = 100;

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
  onEnd,
}: {
  slides: HeroSlide[];
  index: number;
  playing: boolean;
  /** hero scrolled far away: unmount the clips (frees decoders / GPU memory) */
  released?: boolean;
  reduce: boolean;
  /** phones normally get the poster only; the 16:10 phone media block opts in */
  allowOnPhone?: boolean;
  /** `driven` = a real clip is playing, so its end (not a timer) advances the slide */
  onReady: (index: number, driven: boolean) => void;
  /** the active clip has reached its last CROSSFADE_MS — advance word + clip together */
  onEnd: (index: number) => void;
}) {
  const [allowVideo, setAllowVideo] = useState(false);
  /* "pending" until decided; "off" = this instance's breakpoint is not live. */
  const [mode, setMode] = useState<"pending" | "video" | "poster" | "off">(
    "pending",
  );
  const [outgoing, setOutgoing] = useState<number | null>(null);
  /* slide whose clip has started playing — the next clip only buffers after that */
  const [started, setStarted] = useState<number | null>(null);
  const refs = useRef<Map<string, HTMLVideoElement>>(new Map());
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
      /* the FIRST clip starts as soon as this effect runs (hydration) — the 20-40 KB poster is already
         painted, and the clip is only ~1 MB, so it plays almost immediately */
      setAllowVideo(true);
    };

    evaluate();
    mq.addEventListener("change", evaluate);
    return () => {
      mq.removeEventListener("change", evaluate);
      window.clearTimeout(timer);
    };
  }, [allowOnPhone]);

  /* Once the first clip is playing and buffered, download the 1080p versions one at a time (low
     priority, the current slide's first) and swap each in for its fast 720p clip.
     - hidden clips (next / later): simply play the HD file when their turn comes;
     - the ACTIVE clip: an HD copy is mounted on top at the same timestamp, fades in over the 720p
       one, and only then is the 720p copy dropped — so the first clip upgrades mid-play with no
       jump. Skipped on slow / Save-Data connections. */
  const [hd, setHd] = useState<Record<number, { url: string; live: boolean }>>({});
  /* 1 = HD copy on screen (fading in), 2 = 720p copy dropped */
  const [hdStage, setHdStage] = useState<Record<number, 1 | 2>>({});
  const hdReady = useRef<Map<number, string>>(new Map());
  const live = useRef({ index, outgoing, playing });
  useEffect(() => {
    live.current = { index, outgoing, playing };
  });
  const flushHd = useCallback(() => {
    const { index: cur, outgoing: out, playing: isPlaying } = live.current;
    setHd((prev) => {
      let changed = false;
      const nextMap = { ...prev };
      hdReady.current.forEach((url, i) => {
        if (nextMap[i] !== undefined || i === out) return;
        if (i !== cur) {
          nextMap[i] = { url, live: false };
          changed = true;
        } else {
          /* active clip: upgrade in place, unless it is about to end anyway */
          const lo = refs.current.get(`${i}:lo`);
          if (lo && isPlaying && lo.duration - lo.currentTime > 3) {
            nextMap[i] = { url, live: true };
            changed = true;
          }
        }
      });
      return changed ? nextMap : prev;
    });
  }, []);
  /* try again whenever the active clip changes (the previous one is now free to upgrade) */
  useEffect(() => {
    const t = setTimeout(flushHd, CROSSFADE_MS + 100);
    return () => clearTimeout(t);
  }, [index, flushHd]);

  useEffect(() => {
    if (started === null || reduce || released) return;
    const conn = (navigator as NavigatorWithConnection & {
      connection?: { effectiveType?: string };
    }).connection;
    if (conn?.saveData || (conn?.effectiveType && conn.effectiveType !== "4g")) return;
    const ctrl = new AbortController();
    (async () => {
      /* let the first clip finish buffering before anything else is requested */
      await new Promise((r) => setTimeout(r, 3000));
      const order = slides.map((_, k) => (started + k) % slides.length);
      for (const i of order) {
        if (ctrl.signal.aborted) return;
        if (hdReady.current.has(i)) continue;
        try {
          const r = await fetch(slides[i].hd, {
            signal: ctrl.signal,
            priority: "low",
          } as RequestInit);
          if (!r.ok) continue;
          const blob = await r.blob();
          hdReady.current.set(i, URL.createObjectURL(blob));
          flushHd();
        } catch {
          return;
        }
      }
    })();
    return () => ctrl.abort();
  }, [started, reduce, released, slides, flushHd]);

  const videoOn = allowVideo && !reduce && !released;
  const posterOnly = mode === "poster" || (reduce && mode !== "off");

  /* No video to wait for (Save-Data / reduced motion): the slide is "ready"
     as soon as it is active. */
  useEffect(() => {
    if (posterOnly) onReady(index, false);
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
  const reg = (key: string) => (el: HTMLVideoElement | null) => {
    if (el) refs.current.set(key, el);
    else refs.current.delete(key);
  };

  /* Play / pause the mounted clips. */
  useEffect(() => {
    refs.current.forEach((v, key) => {
      const i = Number(key.split(":")[0]);
      /* an HD copy that is syncing to the 720p one starts itself (see onLoadedData) */
      if (key.endsWith(":hd") && hd[i]?.live && !hdStage[i]) return;
      v.muted = true;
      if (!playing || !videoOn) {
        v.pause();
      } else if (i === index) {
        v.play().catch(() => onReady(index, false));
      } else if (i === next) {
        /* the buffered NEXT clip: hold on its first frame until its turn
           (the outgoing clip keeps playing under the crossfade) */
        v.pause();
        if (v.currentTime > 0) v.currentTime = 0;
      }
    });
  }, [index, next, playing, videoOn, onReady, hd, hdStage]);

  /* The clip's own end drives the rotation: when the visible active clip is within CROSSFADE_MS of
     its last frame, hand over to the next one (word changes on the same render; the next clip fades
     in over the last 100 ms). Frame-accurate rAF poll — timeupdate only fires ~4x/s. */
  useEffect(() => {
    if (!videoOn || !playing) return;
    let raf = 0;
    let fired = false;
    const tick = () => {
      const h = hd[index];
      const el =
        refs.current.get(h && (!h.live || hdStage[index]) ? `${index}:hd` : `${index}:lo`) ??
        refs.current.get(`${index}:lo`);
      if (el && !fired && el.duration > 0 && Number.isFinite(el.duration) && !el.paused) {
        if (el.duration - el.currentTime <= CROSSFADE_MS / 1000) {
          fired = true;
          onEnd(index);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [index, playing, videoOn, hd, hdStage, onEnd]);

  const mounted = videoOn
    ? [
        ...new Set([
          index,
          ...(outgoing !== null ? [outgoing] : []),
          ...(slides.length > 1 && started === index ? [next] : []),
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
        fetchPriority="high"
        sizes="100vw"
        quality={75}
        className="object-cover"
      />
      {/* own stacking context so the clips' z-index never rises above the
          scrims / copy that follow in the parent */}
      <div className="absolute inset-0 isolate">
        {mounted.flatMap((i) => {
          const h = hd[i];
          const stage = hdStage[i];
          const active = i === index;
          const showLo = !h || (h.live && stage !== 2);
          const common = {
            muted: true,
            playsInline: true,
            preload: "auto" as const,
            "aria-hidden": true,
            poster: slides[i].poster,
            className:
              "absolute inset-0 h-full w-full object-cover transition-opacity ease-in-out",
          };
          const baseOpacity = active || i === outgoing ? 1 : 0;
          const baseZ = active ? 2 : i === outgoing ? 1 : 0;
          const els = [];
          if (showLo) {
            els.push(
              <video
                key={`${slides[i].video}-lo`}
                ref={reg(`${i}:lo`)}
                src={slides[i].video}
                {...common}
                onEnded={() => active && onEnd(i)}
                onPlaying={() => {
                  if (active) {
                    onReady(i, true);
                    setStarted(i);
                  }
                }}
                style={{
                  opacity: baseOpacity,
                  zIndex: baseZ,
                  transitionDuration: `${CROSSFADE_MS}ms`,
                }}
              />,
            );
          }
          if (h) {
            els.push(
              <video
                key={`${slides[i].video}-hd`}
                ref={reg(`${i}:hd`)}
                src={h.url}
                {...common}
                onLoadedData={(e) => {
                  if (!h.live || stage) return;
                  const v = e.currentTarget;
                  const lo = refs.current.get(`${i}:lo`);
                  if (lo) v.currentTime = lo.currentTime + 0.12;
                  v.play().catch(() => setHdStage((p) => ({ ...p, [i]: 2 })));
                }}
                onEnded={() => active && onEnd(i)}
                onPlaying={() => {
                  if (h.live && !stage) {
                    setHdStage((p) => ({ ...p, [i]: 1 }));
                    setTimeout(
                      () => setHdStage((p) => ({ ...p, [i]: 2 })),
                      CROSSFADE_MS + 100,
                    );
                  } else if (active) {
                    onReady(i, true);
                    setStarted(i);
                  }
                }}
                style={{
                  opacity: h.live && !stage ? 0 : baseOpacity,
                  zIndex: baseZ + (h.live ? 1 : 0),
                  transitionDuration: `${CROSSFADE_MS}ms`,
                }}
              />,
            );
          }
          return els;
        })}
      </div>
    </>
  );
}
