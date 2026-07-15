"use client";

import { useEffect } from "react";

/* Global scroll-reveal driver for every [data-animation="reveal"] element.
   Adds .is-revealed the first time an element enters the viewport (one-shot),
   which plays the fade + rise + de-blur defined in globals.css. Reduced-motion
   users are revealed instantly. Renders nothing. */
export default function RevealOnScroll() {
  useEffect(() => {
    const selector = '[data-animation="reveal"]:not(.is-revealed)';
    const pending = () =>
      Array.from(document.querySelectorAll<HTMLElement>(selector));

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
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    const observeAll = () => pending().forEach((el) => io.observe(el));
    observeAll();

    // Catch any elements that mount after the first pass (client sections that
    // render post-hydration, etc.).
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
