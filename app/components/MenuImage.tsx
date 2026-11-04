"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";

/* next/image for the mega-menu panes. The panes are always mounted (collapsed), so their art used to
   be fetched with the first paint on every page — nearly a megabyte nobody can see yet. It is held
   back until the first input or a few seconds after load, so it never competes with the hero. */

const DEFER_MS = 5000;

let released = false;
const waiting = new Set<() => void>();

function release() {
  if (released) return;
  released = true;
  waiting.forEach((fn) => fn());
  waiting.clear();
}

function arm() {
  const events = ["pointerdown", "pointermove", "keydown", "touchstart", "scroll"] as const;
  const done = () => {
    events.forEach((e) => window.removeEventListener(e, done));
    release();
  };
  events.forEach((e) => window.addEventListener(e, done, { once: true, passive: true }));
  const start = () => window.setTimeout(done, DEFER_MS);
  if (document.readyState === "complete") start();
  else window.addEventListener("load", start, { once: true });
}

let armed = false;

export default function MenuImage(props: ImageProps) {
  const [ready, setReady] = useState(released);

  useEffect(() => {
    if (released) return;
    const fn = () => setReady(true);
    waiting.add(fn);
    if (!armed) {
      armed = true;
      arm();
    }
    return () => void waiting.delete(fn);
  }, []);

  // eslint-disable-next-line jsx-a11y/alt-text -- alt comes through props
  return ready ? <Image {...props} /> : null;
}
