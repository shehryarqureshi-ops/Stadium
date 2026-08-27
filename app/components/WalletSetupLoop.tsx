"use client";

import gsap from "gsap";
import { useCallback, useEffect, useId, useLayoutEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────
// Stadium — "Wallet setup" auto-looping animation
//
// The six states of "03 Wallet Setup" on the Imagery System board, played as
// one continuous card. Geometry, type, colour, the cursor vector path, the
// click ripple opacity and the progress bar are measured off the Figma frames,
// not eyeballed. Each of the six states was diffed against a Figma export:
// average mean pixel delta 1.37, worst frame 1.7% of pixels.
//
// The board draws the progress bar at 113/197. A bar that does not move is
// broken, so it runs 0 to 100.
//
// The 312×340 tile uses Figma units as pixels and is scaled to whatever
// container it is dropped into.
//
// Figma: Imagery System (F7rDHYd3n5nwRtrlv1F6dO), 03 Wallet Setup.
// ─────────────────────────────────────────────────────────────

const TILE_W = 312;
const TILE_H = 340;

/** One pass, before the pause that precedes the loop. */
const SEQ = 8.6;
const LOOP_PAUSE = 1.2;

/** Card heights, straight out of the Figma frames. */
const H = { wallet: 178, add: 188, transfer: 106, funded: 216 };

/** Cursor rest points: the x,y of the cursor vector on each board frame. */
const AT = {
  addFunds: [180, 227], // wallet card, button at y211
  confirm: [180, 232], // add funds card, button at y216
  off: [312, 376],
} as const;

/** The board's own cursor path, in its 29.79 × 36.1 box. */
const CURSOR_PATH =
  "M 4.366701547142042 0.5750139264737654 C 2.589578160420114 -0.8073533323373735 0 0.459072678884477 0 2.7105487806798383 L 0 33.38919747874312 C 0 35.95440759337555 3.2367247861444213 37.07936964866745 4.827779291920988 35.06717132962759 L 12.387034077094162 25.50724433290989 C 12.95158957500235 24.793523557088054 13.81158827419962 24.37705070402858 14.72155069806391 24.37705070402858 L 27.081167551815078 24.37705070402858 C 29.65720008330488 24.37705070402858 30.77567193990594 21.11759985122833 28.742370216427954 19.536123064329352 L 4.366701547142042 0.5750139264737654 Z";

export default function WalletSetupLoop() {
  const scope = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const reducedRef = useRef(false);
  const visibleRef = useRef(true);

  // SVG ids must be unique per instance or a second copy steals the clip path.
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const clipId = `wal-cur-${uid}`;

  const applyPlayState = useCallback(() => {
    const tl = tlRef.current;
    if (!tl) return;
    if (visibleRef.current && !reducedRef.current) tl.play();
    else tl.pause();
  }, []);

  // Fit the fixed 312×340 tile to whatever container this is embedded in.
  useEffect(() => {
    const el = scope.current;
    const stage = stageRef.current;
    if (!el || !stage) return;
    const measure = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (!w || !h) return;
      const s = Math.min(w / TILE_W, h / TILE_H);
      stage.style.transform = `translate(-50%, -50%) scale(${s})`;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const q = (sel: string) => root.querySelector(sel) as HTMLElement;
      const card = q(".wal-card");
      const cursor = q(".wal-cursor");
      const ripple = q(".wal-ripple");
      const amt = q(".wal-amt");

      const PANE = {
        wallet: q(".wal-pane-wallet"),
        add: q(".wal-pane-add"),
        transfer: q(".wal-pane-transfer"),
        funded: q(".wal-pane-funded"),
      };

      gsap.set(card, { yPercent: -50, height: H.wallet });
      gsap.set(cursor, { x: AT.off[0], y: AT.off[1], transformOrigin: "0px 0px" });
      gsap.set(ripple, { x: AT.off[0] - 9, y: AT.off[1] - 9, scale: 0.3, opacity: 0 });
      gsap.set([PANE.add, PANE.transfer, PANE.funded], { autoAlpha: 0 });
      gsap.set(PANE.wallet, { autoAlpha: 1 });
      gsap.set(q(".wal-btn-confirm"), { opacity: 0.4 });
      gsap.set(q(".wal-lbl-amount"), { autoAlpha: 0 });
      gsap.set(q(".wal-caret"), { opacity: 1 });
      gsap.set(q(".wal-bar"), { scaleX: 0 });

      // The caret blinks on background colour so the timeline still owns opacity.
      gsap.to(q(".wal-caret"), {
        backgroundColor: "rgba(29,29,31,0)",
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)",
      });

      const moveTo = (tl: gsap.core.Timeline, at: number, pos: readonly number[], dur: number) => {
        tl.to(cursor, { x: pos[0], y: pos[1], duration: dur, ease: "power2.inOut" }, at);
        tl.to(ripple, { x: pos[0] - 9, y: pos[1] - 9, duration: dur, ease: "power2.inOut" }, at);
      };
      const press = (tl: gsap.core.Timeline, at: number) => {
        tl.to(cursor, { scale: 0.9, duration: 0.09 }, at);
        tl.to(cursor, { scale: 1, duration: 0.18 }, at + 0.09);
        tl.fromTo(
          ripple,
          { scale: 0.55, opacity: 0.16 },
          { scale: 1.15, opacity: 0, duration: 0.5, ease: "power2.out" },
          at,
        );
      };
      const swap = (
        tl: gsap.core.Timeline,
        from: HTMLElement,
        to: HTMLElement,
        h: number,
        at: number,
        dur = 0.5,
      ) => {
        tl.to(from, { autoAlpha: 0, duration: 0.2, ease: "power1.out" }, at);
        tl.to(card, { height: h, duration: dur, ease: "power3.inOut" }, at);
        tl.to(to, { autoAlpha: 1, duration: 0.3, ease: "power1.out" }, at + 0.16);
      };
      // Typing that scrubs both ways, because it reads a tweened proxy.
      const typing = (el: HTMLElement, str: string, dur: number) => {
        const o = { i: 0 };
        return gsap.to(o, {
          i: str.length,
          duration: dur,
          ease: "none",
          onUpdate() {
            el.textContent = str.slice(0, Math.round(o.i));
          },
        });
      };

      const tl = gsap.timeline({ repeat: -1, repeatDelay: LOOP_PAUSE, paused: true });
      tlRef.current = tl;
      gsap.defaults({ ease: "power2.out", duration: 0.5 });

      // The gradient drifts out and back inside one pass, so t=0 is the board's framing.
      tl.to(
        q(".wal-plate"),
        { x: -10, y: 8, scale: 1.08, duration: SEQ / 2, repeat: 1, yoyo: true, ease: "sine.inOut" },
        0,
      );

      // 1 an empty wallet
      tl.addLabel("1 not funded", 0);
      tl.add(typing(amt, "", 0.01), 0);
      tl.fromTo(card, { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out" }, 0);
      tl.from(root.querySelectorAll(".wal-pane-wallet .wal-title, .wal-pane-wallet .wal-balance"), { y: 8, autoAlpha: 0, duration: 0.5, stagger: 0.09 }, 0.18);
      tl.from(q(".wal-btn-add"), { y: 8, autoAlpha: 0, duration: 0.5 }, 0.38);

      // 2 press add funds. The cursor does not enter until the card has settled.
      tl.addLabel("2 press add funds", 0.95);
      moveTo(tl, 0.95, AT.addFunds, 0.85);
      press(tl, 1.85);

      // 3 an empty amount, and nothing to confirm yet. The pointer leaves while the
      // amount is entered: the board draws no cursor here, and one resting on a
      // dimmed button reads as pressing something that cannot be pressed.
      tl.addLabel("3 empty amount", 2.1);
      swap(tl, PANE.wallet, PANE.add, H.add, 2.1);
      moveTo(tl, 2.15, AT.off, 0.55);

      // 4 the amount is entered, and only then can the button name it
      tl.addLabel("4 add funds", 2.65);
      tl.add(typing(amt, "$10,000", 0.9), 2.65);
      tl.to(q(".wal-caret"), { opacity: 0, duration: 0.2 }, 3.6); // board frame 4 has no caret
      tl.to(q(".wal-lbl-generic"), { autoAlpha: 0, duration: 0.2 }, 3.6);
      tl.to(q(".wal-lbl-amount"), { autoAlpha: 1, duration: 0.25 }, 3.66);
      tl.to(q(".wal-btn-confirm"), { opacity: 1, duration: 0.3 }, 3.6);
      moveTo(tl, 3.8, AT.confirm, 0.6);
      press(tl, 4.45);

      // 5 the transfer runs
      tl.addLabel("5 transferring", 4.7);
      swap(tl, PANE.add, PANE.transfer, H.transfer, 4.7, 0.55);
      moveTo(tl, 4.75, AT.off, 0.7);
      tl.fromTo(q(".wal-bar"), { scaleX: 0 }, { scaleX: 1, duration: 1.3, ease: "power1.inOut" }, 5.3);

      // 6 funded, and the board ends here
      tl.addLabel("6 funded", 6.85);
      swap(tl, PANE.transfer, PANE.funded, H.funded, 6.85, 0.55);
      tl.from(q(".wal-tick"), { scale: 0, duration: 0.55, ease: "back.out(2.2)" }, 7.1);
      tl.from(root.querySelectorAll(".wal-funded-line"), { y: 8, autoAlpha: 0, duration: 0.45, stagger: 0.07 }, 7.2);
      tl.to({}, { duration: 0.6 }, SEQ - 0.6);

      gsap.matchMedia().add("(prefers-reduced-motion: reduce)", () => {
        reducedRef.current = true;
        tl.progress(0.02).pause();
        return () => {
          reducedRef.current = false;
          applyPlayState();
        };
      });

      applyPlayState();
    }, scope);

    return () => {
      ctx.revert();
      tlRef.current = null;
    };
  }, [applyPlayState]);

  // Costs nothing while scrolled past.
  useEffect(() => {
    const el = scope.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        applyPlayState();
      },
      { threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [applyPlayState]);

  return (
    <div ref={scope} className="relative h-full w-full overflow-hidden">
      <style>{CSS}</style>

      <div ref={stageRef} className="wal-stage">
        <div className="wal-plate" />

        <div className="wal-card">
          <section className="wal-pane wal-pane-wallet">
            <h3 className="wal-title">Wallet</h3>
            <div className="wal-balance">
              <div className="wal-big">$0</div>
              <div className="wal-cap12">Not funded yet</div>
            </div>
            <div className="wal-btn wal-btn-add">ADD FUNDS</div>
          </section>

          <section className="wal-pane wal-pane-add">
            <h3 className="wal-title">Add funds</h3>
            <div className="wal-amount">
              <span className="wal-amt" />
              <i className="wal-caret" />
              <span className="wal-usd">USD</span>
            </div>
            <div className="wal-metarow">
              <span>ACH transfer</span>
              <span>Chase &bull;&bull;&bull;&bull; 4421</span>
            </div>
            <div className="wal-btn wal-btn-confirm">
              <span className="wal-lbl wal-lbl-generic">ADD FUNDS</span>
              <span className="wal-lbl wal-lbl-amount">ADD $10,000</span>
            </div>
          </section>

          <section className="wal-pane wal-pane-transfer">
            <h3 className="wal-title wal-title-mid">Adding $10,000</h3>
            <div className="wal-pgroup">
              <div className="wal-track">
                <div className="wal-bar" />
              </div>
              <div className="wal-from">From Chase &bull;&bull;&bull;&bull; 4421</div>
            </div>
          </section>

          <section className="wal-pane wal-pane-funded">
            <div className="wal-tick">
              <svg width="11" height="9" viewBox="0 0 11 9" fill="none" aria-hidden="true">
                <path d="M0 5 L4 9 L11 0" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="wal-title wal-title-mid wal-funded-line">Funds added</h3>
            <div className="wal-balance wal-balance-mid wal-funded-line">
              <div className="wal-big">$10,000</div>
              <div className="wal-cap10">in your wallet</div>
            </div>
            <div className="wal-btn">DONE</div>
          </section>
        </div>

        <div className="wal-ripple" />

        <svg className="wal-cursor" width="29.79" height="36.1" viewBox="0 0 29.79 36.1" aria-hidden="true">
          <defs>
            <clipPath id={clipId}>
              <path d={CURSOR_PATH} />
            </clipPath>
          </defs>
          <path
            clipPath={`url(#${clipId})`}
            d={CURSOR_PATH}
            fill="#181818"
            stroke="#ffffff"
            strokeWidth="3.8"
            strokeLinejoin="miter"
          />
        </svg>
      </div>
    </div>
  );
}

/* The tile is a 1:1 replica of a fixed 312×340 Figma frame, so its internals are
   in Figma units rather than rem tokens. The whole tile is scaled to its
   container above. Type comes from the site's own next/font variables. */
const CSS = `
.wal-stage{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
  transform-origin:50% 50%;width:312px;height:340px;border-radius:9px;overflow:hidden;
  background:#F2F2F2;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
.wal-stage *,.wal-stage *::before,.wal-stage *::after{box-sizing:border-box}
.wal-plate{position:absolute;left:0;top:0;width:312px;height:340px;
  background:linear-gradient(124.96deg,#0B2952 0%,#5D8FDC 55%,#AFCCF6 100%);transform-origin:50% 50%}
.wal-card{position:absolute;left:42px;top:50%;width:229px;height:196px;background:#fff;
  border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,.06);overflow:hidden}
.wal-pane{position:absolute;top:0;left:0;width:229px;padding:16px;display:flex;flex-direction:column;margin:0}
.wal-pane-wallet{gap:16px}
.wal-pane-add{gap:12px}
.wal-pane-transfer{gap:12px;padding:20px 16px;align-items:center}
.wal-pane-funded{gap:12px;align-items:center}
/* the button sits 18 below the content on every card. Each pane keeps its own
   inner rhythm, so the button carries the difference. */
.wal-pane-wallet .wal-btn{margin-top:2px}
.wal-pane-add .wal-btn{margin-top:6px}
.wal-pane-funded .wal-btn{margin-top:6px}
.wal-title{font-family:var(--font-display),'Satoshi',sans-serif;font-weight:700;font-size:18px;
  line-height:24px;color:#1D1D1F;margin:0;padding:0;letter-spacing:0}
.wal-title-mid{text-align:center;width:197px}
.wal-balance{display:flex;flex-direction:column;gap:4px}
.wal-balance-mid{align-items:center;width:197px}
.wal-big{font-family:var(--font-display),'Satoshi',sans-serif;font-weight:700;font-size:30px;
  line-height:36px;color:#1D1D1F}
.wal-cap12{font-family:var(--font-sans),sans-serif;font-weight:400;font-size:12px;line-height:16px;
  letter-spacing:.19px;color:#6E6E73}
.wal-cap10{font-family:var(--font-sans),sans-serif;font-weight:400;font-size:10px;line-height:14px;
  letter-spacing:.19px;color:#6E6E73}
/* explicit width: the confirmation panes centre their children, which would
   otherwise shrink the button to the width of its label */
.wal-btn{width:197px;height:32px;flex:none;border-radius:24px;background:#2C2D2E;color:#F8F8F8;
  font-family:var(--font-sans),sans-serif;font-weight:600;font-size:12px;line-height:16px;
  letter-spacing:1.16px;display:flex;align-items:center;justify-content:center;position:relative}
.wal-lbl{position:absolute;top:0;right:0;bottom:0;left:0;display:flex;align-items:center;justify-content:center}
/* aligned to the bottom of the content box rather than by baseline: an empty
   amount has no text baseline, which dropped USD 10px in the empty state.
   Figma puts USD's bottom 1px above the figure's, hence the margin. */
.wal-amount{height:44px;flex:none;border:1px solid #1D1D1F;border-radius:8px;padding:10px 12px;
  display:flex;align-items:flex-end;background:#fff}
.wal-amt{display:inline-block;min-height:24px;font-family:var(--font-display),'Satoshi',sans-serif;
  font-weight:700;font-size:18px;line-height:24px;color:#1D1D1F;white-space:pre}
.wal-caret{width:1.4px;height:24px;background:#1D1D1F;display:block;flex:none}
.wal-usd{font-family:var(--font-sans),sans-serif;font-weight:400;font-size:10px;line-height:14px;
  letter-spacing:.19px;color:#6E6E73;margin-left:auto;margin-bottom:1px}
.wal-metarow{height:14px;flex:none;display:flex;align-items:center;justify-content:space-between}
.wal-metarow span{font-family:var(--font-sans),sans-serif;font-weight:400;font-size:10px;
  line-height:14px;letter-spacing:.19px;color:#6E6E73}
.wal-pgroup{display:flex;flex-direction:column;gap:8px;align-items:center;width:197px}
.wal-track{width:197px;height:6px;border-radius:100px;background:#F2F2F2;overflow:hidden}
.wal-bar{width:197px;height:6px;border-radius:100px;background:#2C2D2E;transform-origin:0 50%}
.wal-from{font-family:var(--font-sans),sans-serif;font-weight:400;font-size:12px;line-height:16px;
  letter-spacing:.19px;color:#6E6E73;text-align:center;width:197px}
.wal-tick{width:32px;height:32px;border-radius:50%;background:#1A9E5C;position:relative;flex:none}
.wal-tick svg{position:absolute;left:10.5px;top:11.5px;overflow:visible}
.wal-ripple{position:absolute;top:0;left:0;width:26px;height:26px;border-radius:50%;
  background:#181818;opacity:0}
.wal-cursor{position:absolute;top:0;left:0;filter:drop-shadow(1.9px 5.7px 3.8px rgba(0,0,0,.25))}
`;
