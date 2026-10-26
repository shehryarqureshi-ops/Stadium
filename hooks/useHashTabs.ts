"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * Deep-linkable tabs: `#<id>` selects that tab and scrolls its section into
 * view — on load, and on later hash changes (header menu, back/forward).
 * Pills never scroll: `writeHash` only rewrites the URL.
 *
 * - Mount-only effect on purpose: `select`/`takeOver`/`ids` change identity
 *   every render, and re-running after a pill click would re-scroll.
 * - The late re-scroll (400ms) absorbs layout shift from images above; it is
 *   cancelled once the user clicks a pill.
 * - `History.prototype.replaceState` bypasses Next's patched replaceState,
 *   whose router treats a hash change as navigation and scrolls.
 */
export function useHashTabs({
  ids,
  select,
  takeOver,
  sectionRef,
}: {
  ids: (string | undefined)[];
  select: (index: number) => void;
  takeOver?: () => void;
  sectionRef: RefObject<HTMLElement | null>;
}) {
  const enabled = ids.some(Boolean);
  const clicked = useRef(false);
  const latest = useRef({ ids, select, takeOver });
  useEffect(() => {
    latest.current = { ids, select, takeOver };
  });

  useEffect(() => {
    if (!enabled) return;
    const apply = () => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      const index = hash ? latest.current.ids.indexOf(hash) : -1;
      if (index < 0) return;
      latest.current.select(index);
      /* wait a frame so layout (and the tab swap) has settled */
      requestAnimationFrame(() =>
        sectionRef.current?.scrollIntoView({ behavior: "auto", block: "start" }),
      );
    };
    const onHash = () => {
      latest.current.takeOver?.();
      apply();
    };
    const t0 = window.setTimeout(apply, 0);
    const t1 = window.setTimeout(() => {
      if (!clicked.current) apply();
    }, 400);
    window.addEventListener("hashchange", onHash);
    return () => {
      window.clearTimeout(t0);
      window.clearTimeout(t1);
      window.removeEventListener("hashchange", onHash);
    };
  }, [enabled, sectionRef]);

  const writeHash = (index: number) => {
    clicked.current = true;
    const id = ids[index];
    if (id)
      History.prototype.replaceState.call(window.history, window.history.state, "", `#${id}`);
  };

  return { enabled, writeHash };
}
