"use client";

import { useEffect } from "react";

const DEFAULT_STAGGER_MS = 120;

type RevealOnScrollProps = {
  /** Default delay (ms) between staggered siblings. Override per-group with
      `data-reveal-stagger="<ms>"` on a shared ancestor, or per-element with
      `data-reveal-delay="<ms>"` for an explicit value. */
  staggerMs?: number;
};

/* Global scroll-reveal driver for every [data-animation="reveal"] element.
   Adds .is-revealed the first time an element enters the viewport (one-shot),
   which plays the fade + rise + de-blur defined in globals.css. Siblings
   (elements sharing a DOM parent) cascade in via --reveal-delay instead of
   firing on the same frame. Reduced-motion users are revealed instantly.
   Renders nothing. */
export default function RevealOnScroll({
  staggerMs = DEFAULT_STAGGER_MS,
}: RevealOnScrollProps) {
  useEffect(() => {
    const selector = '[data-animation="reveal"]:not(.is-revealed)';
    const pending = () =>
      Array.from(document.querySelectorAll<HTMLElement>(selector));

    // Cascade siblings: group pending elements by immediate DOM parent and
    // give each one in a group an increasing --reveal-delay so they animate
    // in sequence rather than all at once.
    const applyStagger = (elements: HTMLElement[]) => {
      const groups = new Map<Element | null, HTMLElement[]>();
      for (const el of elements) {
        const siblings = groups.get(el.parentElement) ?? [];
        siblings.push(el);
        groups.set(el.parentElement, siblings);
      }

      for (const siblings of groups.values()) {
        siblings.forEach((el, i) => {
          const explicitDelay = el.dataset.revealDelay;
          if (explicitDelay !== undefined) {
            el.style.setProperty(
              "--reveal-delay",
              `${Number(explicitDelay)}ms`,
            );
            return;
          }
          const step = el.closest<HTMLElement>("[data-reveal-stagger]")?.dataset
            .revealStagger;
          const delay = i * (step !== undefined ? Number(step) : staggerMs);
          el.style.setProperty("--reveal-delay", `${delay}ms`);
        });
      }
    };

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || typeof IntersectionObserver === "undefined") {
      pending().forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            obs.unobserve(entry.target);
          }
        }
      },
      // Match the section-level reveal trigger: a touch after the element's
      // top clears the fold, so it eases in as you arrive at it.
      { threshold: 0.33, rootMargin: "0px 0px -8% 0px" },
    );

    const observeAll = () => {
      const elements = pending();
      applyStagger(elements);
      elements.forEach((el) => io.observe(el));
    };
    observeAll();

    // Catch any elements that mount after the first pass (client sections that
    // render post-hydration, etc.).
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [staggerMs]);

  return null;
}
