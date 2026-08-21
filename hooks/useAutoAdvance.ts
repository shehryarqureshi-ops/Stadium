"use client";

import { useEffect, useRef, useState } from "react";

/**
 * shopify.com headline-tabs behavior (measured live 2026-06-11): advance to
 * the next tab every `intervalMs` while ≥40% of the section is in the
 * viewport; the first user interaction takes over permanently; disabled
 * under prefers-reduced-motion.
 *
 * WCAG 2.2.2 pause (2026-06-12, quality bar): rotation also pauses while
 * the pointer hovers the section or keyboard focus is inside it — the
 * invisible-mechanism pattern (trust band precedent). Resumes when both
 * clear; first click still stops it permanently.
 *
 * Returns a section ref to attach, and `takeOver` to call from click
 * handlers.
 */
export function useAutoAdvance(advance: () => void, intervalMs = 5000) {
  const sectionRef = useRef<HTMLElement>(null);
  const [userTookOver, setUserTookOver] = useState(false);
  // keep the latest advance() without re-arming the timer every render
  const advanceRef = useRef(advance);
  useEffect(() => {
    advanceRef.current = advance;
  });

  useEffect(() => {
    if (userTookOver) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let visible = false;
    let hovered = false;
    let focused = false;
    const node = sectionRef.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.4 },
    );
    if (node) io.observe(node);
    const onEnter = () => {
      hovered = true;
    };
    const onLeave = () => {
      hovered = false;
    };
    const onFocusIn = () => {
      focused = true;
    };
    const onFocusOut = (e: FocusEvent) => {
      if (node && !node.contains(e.relatedTarget as Node | null)) {
        focused = false;
      }
    };
    node?.addEventListener("mouseenter", onEnter);
    node?.addEventListener("mouseleave", onLeave);
    node?.addEventListener("focusin", onFocusIn);
    node?.addEventListener("focusout", onFocusOut);
    const timer = setInterval(() => {
      if (visible && !hovered && !focused) advanceRef.current();
    }, intervalMs);
    return () => {
      clearInterval(timer);
      io.disconnect();
      node?.removeEventListener("mouseenter", onEnter);
      node?.removeEventListener("mouseleave", onLeave);
      node?.removeEventListener("focusin", onFocusIn);
      node?.removeEventListener("focusout", onFocusOut);
    };
  }, [userTookOver, intervalMs]);

  return { sectionRef, takeOver: () => setUserTookOver(true) };
}
