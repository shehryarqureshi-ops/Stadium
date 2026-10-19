"use client";

/* Site-wide "Pause animations" control (WCAG 2.2.2 Pause, Stop, Hide — A11Y-04).

   One switch (html[data-motion="paused"], persisted in localStorage) stops
   everything that moves on its own:
   - CSS marquees / keyframes ......... globals CSS rule on [data-motion="paused"]
   - GSAP loops ...................... gsap.globalTimeline.pause()
   - autoplay <video> ................ paused here, and re-paused if one starts
   - Remotion scenes, rAF canvases, auto-advancing tabs, WordShuffle, hero
     rotation ......................... all read prefers-reduced-motion through
     window.matchMedia — which this module wraps so that "reduce" ALSO reports
     true while paused (and fires `change`), so every existing reduced-motion
     branch honours the switch with no per-component edits.

   The same branches already run for visitors whose OS asks for reduced
   motion; the switch gives everyone else the same choice. */

import { useSyncExternalStore } from "react";
import gsap from "gsap";

const KEY = "stadium-motion";
const EVT = "stadium:motion";
const REDUCE_RE = /prefers-reduced-motion:\s*reduce/;

export function isMotionPaused(): boolean {
  return (
    typeof document !== "undefined" &&
    document.documentElement.dataset.motion === "paused"
  );
}

function applyPause(paused: boolean) {
  if (paused) gsap.globalTimeline.pause();
  else gsap.globalTimeline.resume();
  document.querySelectorAll("video").forEach((v) => {
    if (paused) {
      if (!v.paused) {
        v.dataset.motionResume = "1";
        v.pause();
      }
    } else if (v.dataset.motionResume) {
      delete v.dataset.motionResume;
      void v.play().catch(() => {});
    }
  });
}

export function setMotionPaused(paused: boolean) {
  document.documentElement.dataset.motion = paused ? "paused" : "running";
  try {
    localStorage.setItem(KEY, paused ? "paused" : "running");
  } catch {
    /* storage can be blocked — the switch still works for this page view */
  }
  applyPause(paused);
  window.dispatchEvent(new Event(EVT));
}

function subscribe(cb: () => void) {
  window.addEventListener(EVT, cb);
  return () => window.removeEventListener(EVT, cb);
}

/** true while the visitor has paused animations (reactive). */
export function useMotionPaused(): boolean {
  return useSyncExternalStore(subscribe, isMotionPaused, () => false);
}

/** true when motion should be off: OS reduced-motion OR the site switch. */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

function install() {
  const w = window as Window & { __stadiumMotion?: boolean };
  if (w.__stadiumMotion) return;
  w.__stadiumMotion = true;

  /* matchMedia wrapper: "(prefers-reduced-motion: reduce)" also matches while
     the site switch is paused. Listeners fire on either source changing. */
  const orig = window.matchMedia.bind(window);
  window.matchMedia = (query: string): MediaQueryList => {
    const real = orig(query);
    if (!REDUCE_RE.test(query)) return real;
    const listeners = new Set<(e: MediaQueryListEvent) => void>();
    const wrapped = new Map<
      EventListenerOrEventListenerObject,
      (e: MediaQueryListEvent) => void
    >();
    const current = () => real.matches || isMotionPaused();
    const fire = () => {
      const ev = { matches: current(), media: query } as MediaQueryListEvent;
      listeners.forEach((l) => l(ev));
    };
    real.addEventListener("change", fire);
    window.addEventListener(EVT, fire);
    const proxy = {
      get matches() {
        return current();
      },
      media: query,
      onchange: null,
      addEventListener: (
        type: string,
        l: EventListenerOrEventListenerObject | null,
      ) => {
        if (type !== "change" || !l) return;
        const fn =
          typeof l === "function"
            ? (l as (e: MediaQueryListEvent) => void)
            : (e: MediaQueryListEvent) => l.handleEvent(e);
        wrapped.set(l, fn);
        listeners.add(fn);
      },
      removeEventListener: (
        type: string,
        l: EventListenerOrEventListenerObject | null,
      ) => {
        if (type !== "change" || !l) return;
        const fn = wrapped.get(l);
        if (fn) listeners.delete(fn);
        wrapped.delete(l);
      },
      addListener: (l: ((e: MediaQueryListEvent) => void) | null) => {
        if (l) listeners.add(l);
      },
      removeListener: (l: ((e: MediaQueryListEvent) => void) | null) => {
        if (l) listeners.delete(l);
      },
      dispatchEvent: () => false,
    };
    return proxy as unknown as MediaQueryList;
  };

  /* Videos that start while paused (keyed remounts, lazy loads) are stopped
     again — unless the visitor just pressed a play control themselves. */
  document.addEventListener(
    "play",
    (e) => {
      const v = e.target;
      if (
        v instanceof HTMLVideoElement &&
        isMotionPaused() &&
        !navigator.userActivation?.isActive
      )
        v.pause();
    },
    true,
  );

  let saved: string | null = null;
  try {
    saved = localStorage.getItem(KEY);
  } catch {
    /* ignore */
  }
  if (saved === "paused") setMotionPaused(true);
}

if (typeof window !== "undefined") install();
