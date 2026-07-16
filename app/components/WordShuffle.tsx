"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

/* Rotating headline word for the hero. Controlled: the parent owns the shared
   rotation index (so the word and the background video advance together — see
   Hero.tsx); this component just animates whatever `index` it's handed. When
   `index` changes the settled word slides up + fades out while the next rises
   from below + fades in. The container width is measured per word and
   transitions, so the trailing period glides instead of snapping (see
   .word-shuffle in globals.css).

   - SSR renders words[index], so it's the no-JS / pre-hydration fallback.
   - Reduced motion: swaps instantly, no transform (the parent also stops
     auto-advancing, so it effectively stays on the first word). */

type ShuffleState = { outgoing: number | null; tick: number };

export default function WordShuffle({
  words,
  index,
}: {
  words: string[];
  index: number;
}) {
  const [{ outgoing, tick }, setState] = useState<ShuffleState>({
    outgoing: null,
    tick: 0,
  });
  const [widths, setWidths] = useState<number[] | null>(null);
  const [reduce, setReduce] = useState(false);
  const sizerRef = useRef<HTMLSpanElement>(null);
  const prevIndex = useRef(index);

  /* Honor the OS reduced-motion setting (kept live). */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /* Measure every word at the live font (re-run on resize + after fonts load,
     since the hero heading scales across breakpoints). */
  useLayoutEffect(() => {
    const el = sizerRef.current;
    if (!el) return;
    let cancelled = false;
    const measure = () => {
      const next = words.map((w) => {
        // Measure WITH the trailing period — it renders inside the word unit
        // (below), so the container width must include it or the following
        // copy overlaps the overflowing "." on wrapping breakpoints.
        el.textContent = `${w}.`;
        return el.getBoundingClientRect().width;
      });
      el.textContent = "";
      if (!cancelled) setWidths(next);
    };
    measure();
    window.addEventListener("resize", measure);
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) measure();
      });
    }
    return () => {
      cancelled = true;
      window.removeEventListener("resize", measure);
    };
  }, [words]);

  /* React to the controlled index: play the slide from the previous word.
     Under reduced motion, swap instantly (no outgoing element to animate). */
  useEffect(() => {
    if (index === prevIndex.current) return;
    const from = prevIndex.current;
    prevIndex.current = index;
    if (reduce) return;
    setState((s) => ({ outgoing: from, tick: s.tick + 1 }));
  }, [index, reduce]);

  const width = widths ? `${widths[index]}px` : undefined;
  const animateIn = tick > 0 && !reduce;

  return (
    <span data-animation="word-shuffle" className="word-shuffle" style={{ width }}>
      {outgoing !== null && !reduce && (
        <span
          key={`out-${tick}`}
          aria-hidden
          className="word-shuffle__word word-shuffle__word--out"
          onAnimationEnd={() => setState((s) => ({ ...s, outgoing: null }))}
        >
          {words[outgoing]}.
        </span>
      )}
      <span
        key={`in-${tick}`}
        className={`word-shuffle__word${
          animateIn ? " word-shuffle__word--in" : ""
        }`}
      >
        {words[index]}.
      </span>
      <span ref={sizerRef} aria-hidden className="word-shuffle__sizer" />
    </span>
  );
}
