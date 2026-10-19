"use client";

import { useEffect } from "react";

const DEFAULT_STAGGER_MS = 120;

/* An element counts as "large" when it holds media, is 200px+ tall, or covers
   65,000px² or more. A headline, a 3-line paragraph or a button row stays
   under all three. */
const LARGE_MIN_HEIGHT = 200;
const LARGE_MIN_AREA = 65000;


const LINE_STAGGER_MS = 90;
const LINE_DURATION_MS = 1100;
const LINE_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

/* Linear-style headline entrance: split into visual lines at reveal time and
   animate each line (opacity 0→1, blur 10px→0, rise 20%) with a stagger.
   Done lazily, long after hydration, and the heading's ORIGINAL child nodes
   are moved (never cloned or discarded) and put back when the animation ends,
   so React keeps owning them (e.g. the hero's word-shuffle element). Returns
   false if there is nothing safe to split. */
function revealByLines(el: HTMLElement, baseDelayMs: number): boolean {
  const orig = Array.from(el.childNodes);
  if (!orig.length || el.textContent?.trim() === "") return false;

  type Unit = { node: Node; br?: boolean };
  const units: (Unit | " ")[] = [];
  const frag = document.createDocumentFragment();
  for (const n of orig) {
    if (n.nodeType === Node.TEXT_NODE) {
      for (const part of (n.textContent ?? "").split(/(\s+)/)) {
        if (!part) continue;
        if (/^\s+$/.test(part)) {
          units.push(" ");
          frag.appendChild(document.createTextNode(" "));
        } else {
          const w = document.createElement("span");
          w.textContent = part;
          units.push({ node: w });
          frag.appendChild(w);
        }
      }
    } else if (n.nodeName === "BR") {
      const shown = getComputedStyle(n as Element).display !== "none";
      units.push({ node: n, br: shown });
      frag.appendChild(n);
    } else {
      units.push({ node: n });
      frag.appendChild(n);
    }
  }
  el.replaceChildren(frag);

  // measure: group units into visual lines by their top edge
  const tops = units.map((u) => {
    if (u === " " || u.br) return null;
    const node = u.node as Element;
    const r = node.getClientRects()[0];
    return r ? r.top : null;
  });
  const lines: Node[][] = [[]];
  let lineTop: number | null = null;
  units.forEach((u, i) => {
    if (u === " ") {
      lines[lines.length - 1].push(document.createTextNode(" "));
      return;
    }
    if (u.br) {
      if (lines[lines.length - 1].length) lines.push([]);
      lineTop = null;
      return;
    }
    const t = tops[i];
    if (t !== null && lineTop !== null && Math.abs(t - lineTop) > 4) {
      lines.push([]);
      lineTop = t;
    } else if (lineTop === null) {
      lineTop = t;
    }
    lines[lines.length - 1].push(u.node);
  });

  const lineEls = lines
    .filter((l) => l.some((n) => n.nodeType === Node.ELEMENT_NODE))
    .map((l) => {
      const s = document.createElement("span");
      s.style.display = "block";
      s.append(...l);
      return s;
    });
  if (!lineEls.length) {
    el.replaceChildren(...orig);
    return false;
  }
  el.replaceChildren(...lineEls);

  const anims = lineEls.map((line, i) =>
    line.animate(
      [
        { opacity: 0, filter: "blur(10px)", transform: "translateY(20%)" },
        { opacity: 1, filter: "blur(0px)", transform: "translateY(0)" },
      ],
      {
        duration: LINE_DURATION_MS,
        delay: baseDelayMs + i * LINE_STAGGER_MS,
        easing: LINE_EASE,
        fill: "both",
      },
    ),
  );
  Promise.all(anims.map((a) => a.finished))
    .then(() => el.replaceChildren(...orig))
    .catch(() => el.replaceChildren(...orig));
  return true;
}

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
            const el = entry.target as HTMLElement;
            const paused =
              document.documentElement.dataset.motion === "paused";
            if (el.dataset.revealLines !== undefined && !paused) {
              const delay =
                parseFloat(el.style.getPropertyValue("--reveal-delay")) || 0;
              // lines animate themselves; the heading box just turns on
              el.classList.add("is-revealed");
              if (!revealByLines(el, delay)) el.removeAttribute("data-reveal-lines");
            } else {
              el.classList.add("is-revealed");
            }
            obs.unobserve(entry.target);
          }
        }
      },
      // Match the section-level reveal trigger: a touch after the element's
      // top clears the fold, so it eases in as you arrive at it.
      { threshold: 0.33, rootMargin: "0px 0px -8% 0px" },
    );

    /* Small elements (type, buttons) get the blur reveal; large ones (cards,
       images, tall panels) get an opacity-only fade — see the CSS in layout.tsx.
       Reads are batched before writes to avoid layout thrash. */
    const classify = (elements: HTMLElement[]) => {
      const todo = elements.filter((el) => !el.dataset.revealSize);
      const sizes = todo.map((el) => {
        const r = el.getBoundingClientRect();
        const hasMedia = el.matches("img,video,canvas,picture,svg,iframe") ||
          el.querySelector("img,video,canvas,picture,iframe") !== null;
        const isHeading = /^H[1-6]$/.test(el.tagName);
        const large =
          !isHeading &&
          (hasMedia ||
          r.height >= LARGE_MIN_HEIGHT ||
          r.width * r.height >= LARGE_MIN_AREA);
        return large ? "lg" : "sm";
      });
      todo.forEach((el, i) => {
        el.dataset.revealSize = sizes[i];
        if (/^H[12]$/.test(el.tagName)) el.dataset.revealLines = "";
      });
    };

    const observeAll = () => {
      const elements = pending();
      classify(elements);
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
