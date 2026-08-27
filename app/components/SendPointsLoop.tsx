"use client";

import gsap from "gsap";
import { useCallback, useEffect, useId, useLayoutEffect, useRef } from "react";
import { useCardActive } from "@/app/components/common/cardActive";

// ─────────────────────────────────────────────────────────────
// Stadium — "Send points" auto-looping animation
//
// The four states of "12 Send Points" on the Imagery System board, played as
// one continuous card. Geometry, type, colour and the cursor vector path are
// measured off the Figma frames, not eyeballed: every element lands on the
// board's own coordinates. Diffed against a Figma export, average 1.80 of 255,
// which is glyph antialiasing — the busiest screen is 2.09 and the emptiest
// 1.41, in that order.
//
// Walked in the live product before it was drawn. Three things came out of
// that walk and none of them were on the board:
//
//  - Send points is an action on a shop, not a destination, which is N8.
//  - The rate is a live converter, not a label: type dollars or points and the
//    other side follows. Everything here derives from RATE, PEOPLE and USD, so
//    the field, the checkout and the confirmation cannot disagree.
//  - Sending points means choosing what kind of money you are sending. Stadium
//    points go anywhere and can be forwarded; shop points cannot leave the
//    shop. That is the decision the card exists for, and the board had no
//    screen for it at all.
//
// "You pay today $0" is their own line and it is honest here, because nothing
// is charged until each gift sends. On the bulk swag card the same words were
// misleading, because a production run commits at the press. Same sentence,
// different truth.
//
// Figma: Imagery System (F7rDHYd3n5nwRtrlv1F6dO), TAB 3 ENGAGE / 12 Send Points.
// ─────────────────────────────────────────────────────────────

const TILE_W = 312;
const TILE_H = 340;

const SEQ = 21.0;
const LOOP_PAUSE = 1.2;

/** Card heights, straight out of the Figma frames. */
const H = { budget: 282, which: 250, checkout: 236, sent: 250 };

/**
 * The board places a card at floor((340 - h) / 2). On an odd height that is not
 * the same as -floor(h / 2).
 */
const midY = (h: number) => Math.floor((TILE_H - h) / 2) - 170;

/** The tip sits at the centre of the button it presses. */
const AT = {
  budget: [180, 279],
  which: [180, 263],
  checkout: [180, 256],
  off: [300, 372],
} as const;

/**
 * The rate belongs to the shop (N61). The live product prints it beside the
 * field as "1 USD = 50 POINTS" and converts as you type, so every figure on
 * every screen is derived from these three and nothing is retyped.
 */
const RATE = 50;
const PEOPLE = 12;
const USD = 10;
const PTS_EACH = USD * RATE;
const TOTAL = USD * PEOPLE;
const PTS_TOTAL = PTS_EACH * PEOPLE;
const SHOP = "Stadium Gift Shop";

const comma = (n: number) =>
  String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const usd = (n: number) => `$${n.toFixed(2)}`;

const CURSOR_PATH =
  "M 3.517744918677711 0.4632220180675262 C 2.0861227443626604 -0.6503909256464298 0 0.3698216042463711 0 2.1835747248015087 L 0 26.897803210796148 C 0 28.964295431870166 2.6074537145937384 29.870546862504835 3.889181774689332 28.2495520949281 L 9.978796515347982 20.548227879783475 C 10.43359339409915 19.973265843402263 11.126394590038597 19.637761977178336 11.859445763373602 19.637761977178336 L 21.816155402149448 19.637761977178336 C 23.891366004515344 19.637761977178336 24.79238904164448 17.012000526346874 23.154393696946684 15.737988132861453 L 3.517744918677711 0.4632220180675262 Z";

export default function SendPointsLoop() {
  const scope = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const reducedRef = useRef(false);
  const visibleRef = useRef(true);
  const cardActive = useCardActive();
  const activeRef = useRef(cardActive);

  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const clipId = `sp-cur-${uid}`;

  const applyPlayState = useCallback(() => {
    const tl = tlRef.current;
    if (!tl) return;
    if (visibleRef.current && activeRef.current && !reducedRef.current)
      tl.play();
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
      const card = q(".sp-card");
      const cursor = q(".sp-cursor");
      const ripple = q(".sp-ripple");

      const PANE = {
        budget: q(".sp-pane-budget"),
        which: q(".sp-pane-which"),
        checkout: q(".sp-pane-checkout"),
        sent: q(".sp-pane-sent"),
      };

      const o2 = q(".sp-o2");
      const o2text = Array.from(o2.querySelectorAll(".sp-nm, .sp-why"));
      const o2radio = o2.querySelector(".sp-radio") as HTMLElement;
      const o2dot = o2.querySelector(".sp-radio i") as HTMLElement;

      gsap.set(card, { y: midY(H.budget), height: H.budget });
      gsap.set(PANE.budget, { autoAlpha: 1 });
      gsap.set([PANE.which, PANE.checkout, PANE.sent], { autoAlpha: 0 });
      gsap.set(cursor, { x: AT.off[0], y: AT.off[1], transformOrigin: "0px 0px" });
      gsap.set(ripple, { x: AT.off[0] - 9, y: AT.off[1] - 9, scale: 0.3, opacity: 0 });

      // The second option is chosen on screen, so it starts looking like the
      // first. GSAP reverts backgroundColor, color and boxShadow on rewind.
      gsap.set(o2, { backgroundColor: "#F2F2F2" });
      gsap.set(o2.querySelector(".sp-nm"), { color: "#1D1D1F" });
      gsap.set(o2.querySelector(".sp-why"), { color: "#6E6E73" });
      gsap.set(o2radio, { backgroundColor: "#FFFFFF", boxShadow: "inset 0 0 0 1px #D2D2D7" });
      gsap.set(o2dot, { scale: 0, transformOrigin: "50% 50%" });

      // Every derived string is written only from an onUpdate, so a rewind
      // clears it. GSAP does not revert textContent.
      [".sp-recip", ".sp-usd", ".sp-pts", ".sp-note1", ".sp-ptseach", ".sp-total",
       ".sp-paytoday", ".sp-ptssent", ".sp-towho", ".sp-where"]
        .forEach((s) => { q(s).textContent = ""; });

      const moveTo = (tl: gsap.core.Timeline, at: number, pos: readonly number[], dur: number) => {
        tl.to(cursor, { x: pos[0], y: pos[1], duration: dur, ease: "power2.inOut" }, at);
        tl.to(ripple, { x: pos[0] - 9, y: pos[1] - 9, duration: dur, ease: "power2.inOut" }, at);
      };
      const press = (tl: gsap.core.Timeline, at: number) => {
        tl.to(cursor, { scale: 0.9, duration: 0.09 }, at);
        tl.to(cursor, { scale: 1, duration: 0.18 }, at + 0.09);
        tl.fromTo(ripple, { scale: 0.55, opacity: 0.16 },
          { scale: 1.15, opacity: 0, duration: 0.5, ease: "power2.out" }, at);
      };
      const swap = (tl: gsap.core.Timeline, from: HTMLElement, to: HTMLElement,
                    h: number, at: number, dur = 0.6) => {
        tl.to(from, { autoAlpha: 0, duration: 0.2, ease: "power1.out" }, at);
        tl.to(card, { height: h, y: midY(h), duration: dur, ease: "power3.inOut" }, at);
        tl.to(to, { autoAlpha: 1, duration: 0.3, ease: "power1.out" }, at + 0.16);
      };
      // A field types, and anything derived from it is written in the same
      // onUpdate so the two cannot disagree by a frame.
      const typeInto = (tl: gsap.core.Timeline, at: number, per: number, chars: string,
                        sel: string, derive?: (typed: string) => void) => {
        tl.to({ i: 0 }, {
          i: chars.length, duration: chars.length * per, ease: "none",
          onUpdate() {
            const k = Math.round((this.targets()[0] as { i: number }).i);
            const typed = chars.slice(0, k);
            q(sel).textContent = typed;
            if (derive) derive(typed);
          },
        }, at);
      };

      const tl = gsap.timeline({ repeat: -1, repeatDelay: LOOP_PAUSE, paused: true });
      tlRef.current = tl;

      tl.fromTo(q(".sp-plate"), { x: 0, y: 0, scale: 1 },
        { x: -10, y: 8, scale: 1.08, duration: SEQ, ease: "none" }, 0);

      // 1 the budget
      tl.addLabel("1 the budget", 0);
      tl.from(root.querySelectorAll(".sp-pane-budget .sp-hd, .sp-pane-budget .sp-field, .sp-pane-budget .sp-fine, .sp-pane-budget .sp-btn"),
        { y: 10, autoAlpha: 0, duration: 0.5, stagger: 0.1 }, 0.15);

      const rcaret = gsap.to(q(".sp-rcaret"),
        { opacity: 0, duration: 0.5, repeat: -1, yoyo: true, ease: "steps(1)" });
      const ucaret = gsap.to(q(".sp-ucaret"),
        { opacity: 0, duration: 0.5, repeat: -1, yoyo: true, ease: "steps(1)" });
      gsap.set(q(".sp-ucaret"), { autoAlpha: 0 });

      typeInto(tl, 1.2, 0.62, String(PEOPLE), ".sp-recip");
      tl.set(q(".sp-rcaret"), { autoAlpha: 0 }, 2.5);
      tl.call(() => rcaret.pause(), undefined, 2.5);
      tl.set(q(".sp-ucaret"), { autoAlpha: 1 }, 2.7);

      // The points equivalent is the rate applied to what has been typed,
      // which is what their converter does on every keystroke.
      typeInto(tl, 2.9, 0.55, `$${USD}`, ".sp-usd", (typed) => {
        const n = parseInt(typed.replace(/[^0-9]/g, ""), 10);
        q(".sp-pts").textContent = n ? `= ${comma(n * RATE)} Pts` : "";
      });
      tl.set(q(".sp-ucaret"), { autoAlpha: 0 }, 4.75);
      tl.call(() => ucaret.pause(), undefined, 4.75);
      tl.to({ n: 0 }, { n: 1, duration: 0.01,
        onUpdate() { q(".sp-note1").textContent = `1 USD = ${RATE} Pts. No minimum budget.`; } }, 0.3);

      moveTo(tl, 5.2, AT.budget, 0.7);
      press(tl, 6.0);

      // 2 which points: the choice, made on screen. Restricted to the shop,
      // and that restriction is the trade.
      tl.addLabel("2 which points", 6.6);
      swap(tl, PANE.budget, PANE.which, H.which, 6.6);
      tl.from(q(".sp-o1"), { y: 10, autoAlpha: 0, duration: 0.42 }, 7.1);
      tl.from(o2, { y: 10, autoAlpha: 0, duration: 0.42 }, 7.32);
      tl.to(o2, { backgroundColor: "#D8F1CC", duration: 0.4 }, 8.6);
      tl.to(o2text, { color: "#0B6B3F", duration: 0.4 }, 8.6);
      tl.to(o2radio, { backgroundColor: "#0B6B3F",
        boxShadow: "inset 0 0 0 1px #0B6B3F", duration: 0.4 }, 8.6);
      tl.to(o2dot, { scale: 1, duration: 0.35, ease: "back.out(2.5)" }, 8.7);
      moveTo(tl, 10.3, AT.which, 0.7);
      press(tl, 11.1);

      // 3 the checkout: the figures arrive at their value rather than counting
      // up to it, because a number that counts is a number performing.
      tl.addLabel("3 the checkout", 11.7);
      swap(tl, PANE.which, PANE.checkout, H.checkout, 11.7);
      tl.to({ n: 0 }, { n: 1, duration: 0.01,
        onUpdate() {
          q(".sp-ptseach").textContent = `${comma(PTS_EACH)} Pts`;
          q(".sp-total").textContent = usd(TOTAL);
          q(".sp-paytoday").textContent = "$0";
        } }, 12.2);
      tl.from(q(".sp-c1"), { y: 8, autoAlpha: 0, duration: 0.45 }, 12.2);
      tl.from(q(".sp-c2"), { y: 8, autoAlpha: 0, duration: 0.45 }, 12.42);
      tl.from(q(".sp-c3"), { y: 8, autoAlpha: 0, duration: 0.45 }, 12.64);
      tl.from(q(".sp-note3"), { autoAlpha: 0, duration: 0.4 }, 13.0);
      moveTo(tl, 15.3, AT.checkout, 0.7);
      press(tl, 16.1);

      // 4 sent
      tl.addLabel("4 sent", 16.7);
      swap(tl, PANE.checkout, PANE.sent, H.sent, 16.7);
      moveTo(tl, 16.75, AT.off, 0.8);
      tl.to({ n: 0 }, { n: 1, duration: 0.01,
        onUpdate() {
          q(".sp-ptssent").textContent = `${comma(PTS_TOTAL)} points`;
          q(".sp-towho").textContent = `to ${PEOPLE} people in Engineering`;
          q(".sp-where").textContent = `Spendable in ${SHOP} now.`;
        } }, 17.2);
      tl.from(q(".sp-tick"), { scale: 0.4, autoAlpha: 0, duration: 0.5,
        ease: "back.out(2.2)", transformOrigin: "50% 50%" }, 17.2);
      tl.from(q(".sp-sent-hd"), { y: 8, autoAlpha: 0, duration: 0.42 }, 17.55);
      tl.from(q(".sp-sentbox"), { y: 10, autoAlpha: 0, duration: 0.45 }, 17.85);
      tl.from(q(".sp-where"), { autoAlpha: 0, duration: 0.4 }, 18.35);
      tl.from(q(".sp-pane-sent .sp-btn"), { y: 8, autoAlpha: 0, duration: 0.42 }, 18.7);
      tl.to({}, { duration: 0.6 }, SEQ - 0.6);

      gsap.matchMedia().add("(prefers-reduced-motion: reduce)", () => {
        reducedRef.current = true;
        tl.progress(0.02).pause();
        return () => { reducedRef.current = false; applyPlayState(); };
      });

      applyPlayState();
    }, scope);

    return () => { ctx.revert(); tlRef.current = null; };
  }, [applyPlayState]);

  useEffect(() => {
    const el = scope.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting; applyPlayState(); },
      { threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [applyPlayState]);

  // Restart rather than resume: the card should tell its story from the top
  // every time it becomes the active one.
  useEffect(() => {
    activeRef.current = cardActive;
    const tl = tlRef.current;
    if (cardActive && tl && visibleRef.current && !reducedRef.current)
      tl.restart();
    else applyPlayState();
  }, [cardActive, applyPlayState]);

  return (
    <div ref={scope} className="relative h-full w-full overflow-hidden">
      <style>{CSS}</style>

      <div ref={stageRef} className="sp-stage">
        <div className="sp-plate" />

        <div className="sp-card">
          {/* 1 the budget */}
          <section className="sp-pane sp-pane-budget">
            <div className="sp-hd">
              <p className="sp-title">Send points</p>
              <span className="sp-pill">DRAFT</span>
            </div>
            <div className="sp-field">
              <span className="sp-lab">RECIPIENTS</span>
              <div className="sp-input">
                <span className="sp-big"><span className="sp-recip" /><i className="sp-caret sp-rcaret" /></span>
                <span className="sp-unit">people</span>
              </div>
            </div>
            <div className="sp-field">
              <span className="sp-lab">BUDGET PER RECIPIENT</span>
              <div className="sp-input">
                <span className="sp-big"><span className="sp-usd" /><i className="sp-caret sp-ucaret" /></span>
                <span className="sp-unit sp-pts" />
              </div>
            </div>
            <span className="sp-fine sp-note1" />
            <div className="sp-btn">NEXT</div>
          </section>

          {/* 2 which points */}
          <section className="sp-pane sp-pane-which">
            <div className="sp-hd"><p className="sp-title">Which points</p></div>
            <div className="sp-options">
              <div className="sp-opt sp-o1">
                <span className="sp-radio"><i /></span>
                <span className="sp-meta">
                  <span className="sp-nm">Stadium points</span>
                  <span className="sp-why">Spendable anywhere. Can be forwarded.</span>
                </span>
              </div>
              <div className="sp-opt sp-o2">
                <span className="sp-radio"><i /></span>
                <span className="sp-meta">
                  <span className="sp-nm">Shop points</span>
                  <span className="sp-why">This shop only. Cannot be forwarded.</span>
                </span>
              </div>
            </div>
            <div className="sp-btn">NEXT</div>
          </section>

          {/* 3 the checkout */}
          <section className="sp-pane sp-pane-checkout">
            <div className="sp-hd"><p className="sp-title">Checkout</p></div>
            <div className="sp-row sp-c1">
              <span className="sp-k">Points per recipient</span><span className="sp-sp" />
              <span className="sp-v sp-ptseach" />
            </div>
            <div className="sp-row sp-c2">
              <span className="sp-k">Total</span><span className="sp-sp" />
              <span className="sp-v sp-vbig sp-total" />
            </div>
            <div className="sp-row sp-c3">
              <span className="sp-k">You pay today</span><span className="sp-sp" />
              <span className="sp-v sp-vbig sp-paytoday" />
            </div>
            <span className="sp-fine sp-note3">Charged as each gift is sent.</span>
            <div className="sp-btn">SEND POINTS</div>
          </section>

          {/* 4 sent */}
          <section className="sp-pane sp-pane-sent">
            <span className="sp-tick">
              <svg width="11" height="9" viewBox="0 0 11 9" aria-hidden="true">
                <path d="M1.5 4.6 L4.2 7.2 L9.5 1.5" fill="none" stroke="#fff" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div className="sp-sent-hd"><p className="sp-title">Points sent</p></div>
            <div className="sp-sentbox">
              <span className="sp-n sp-ptssent" />
              <span className="sp-who sp-towho" />
            </div>
            <span className="sp-fine sp-where" />
            <div className="sp-btn">DONE</div>
          </section>
        </div>

        <div className="sp-ripple" />
        <svg className="sp-cursor" width="24" height="29.08" viewBox="0 0 24 29.08" aria-hidden="true">
          <defs><clipPath id={clipId}><path d={CURSOR_PATH} /></clipPath></defs>
          <path clipPath={`url(#${clipId})`} d={CURSOR_PATH}
            fill="#181818" stroke="#ffffff" strokeWidth="3.06" strokeLinejoin="miter" />
        </svg>
      </div>
    </div>
  );
}

const CSS = `
.sp-stage{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
  transform-origin:50% 50%;width:312px;height:340px;border-radius:9px;overflow:hidden;
  background:#F2F2F2;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
.sp-stage *,.sp-stage *::before,.sp-stage *::after{box-sizing:border-box}
.sp-plate{position:absolute;left:0;top:0;width:312px;height:340px;
  background:linear-gradient(124.96deg,#0B2952 0%,#5D8FDC 55%,#AFCCF6 100%);transform-origin:50% 50%}
.sp-card{position:absolute;left:42px;top:170px;width:229px;height:282px;background:#fff;
  border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,.06);overflow:hidden}
.sp-pane{position:absolute;top:0;left:0;width:229px;padding:16px;display:flex;
  flex-direction:column;gap:14px;margin:0}
.sp-pane-sent{gap:12px;align-items:center}

.sp-hd{height:24px;flex:none;display:flex;align-items:center;justify-content:space-between}
.sp-title{font-family:var(--font-display),'Satoshi',sans-serif;font-weight:700;font-size:18px;
  line-height:24px;color:#1D1D1F;margin:0;padding:0;letter-spacing:0;white-space:nowrap}
.sp-pill{height:19px;border-radius:8px;padding:4px 9px 3px;background:#F2F2F2;flex:none;
  font-family:var(--font-sans),'Overpass',sans-serif;font-weight:700;font-size:9px;line-height:12px;
  letter-spacing:.75px;color:#1D1D1F;white-space:nowrap}
.sp-lab{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:700;font-size:10px;
  line-height:14px;letter-spacing:1px;color:#6E6E73;flex:none}
.sp-fine{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:400;font-size:10px;
  line-height:14px;letter-spacing:.19px;color:#6E6E73;flex:none;min-height:14px}

/* 1 the budget. The unit sits hard right so it cannot move as the value grows,
   and the number's box is a fixed 24px so the unit cannot shift vertically on
   the first keystroke either. */
.sp-field{display:flex;flex-direction:column;gap:6px;flex:none}
.sp-input{height:42px;border-radius:8px;background:#fff;box-shadow:inset 0 0 0 1px #1D1D1F;
  padding:9px 12px;display:flex;align-items:flex-end;justify-content:space-between}
.sp-big{font-family:var(--font-display),'Satoshi',sans-serif;font-weight:700;font-size:18px;
  line-height:24px;color:#1D1D1F;display:flex;align-items:center;height:24px}
.sp-caret{width:1.4px;height:20px;background:#1D1D1F;display:inline-block;margin-left:1px}
.sp-unit{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:400;font-size:10px;
  line-height:16px;letter-spacing:.19px;color:#6E6E73;white-space:nowrap}

/* 2 which points */
.sp-options{display:flex;flex-direction:column;gap:6px;flex:none}
.sp-opt{border-radius:6px;background:#F2F2F2;padding:9px 12px;
  display:flex;align-items:center;gap:9px}
.sp-radio{width:14px;height:14px;flex:none;border-radius:50%;background:#fff;
  box-shadow:inset 0 0 0 1px #D2D2D7;display:flex;align-items:center;justify-content:center}
.sp-radio i{width:5px;height:5px;border-radius:50%;background:#fff;display:block}
.sp-meta{display:flex;flex-direction:column;gap:2px;width:150px}
.sp-nm{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:600;font-size:12px;
  line-height:16px;letter-spacing:.19px;color:#1D1D1F}
.sp-why{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:400;font-size:10px;
  line-height:14px;letter-spacing:.19px;color:#6E6E73}

/* 3 the checkout */
.sp-row{flex:none;display:flex;align-items:baseline;gap:9px}
.sp-k{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:700;font-size:12px;
  line-height:16px;letter-spacing:.19px;color:#1D1D1F;white-space:nowrap}
.sp-sp{flex:1}
.sp-v{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:600;font-size:12px;
  line-height:16px;letter-spacing:.19px;color:#1D1D1F;white-space:nowrap}
.sp-vbig{font-family:var(--font-display),'Satoshi',sans-serif;font-weight:700;font-size:18px;
  line-height:24px;letter-spacing:0}

/* 4 sent */
.sp-tick{width:32px;height:32px;flex:none;border-radius:50%;background:#1A9E5C;
  display:flex;align-items:center;justify-content:center}
.sp-sent-hd{height:24px;flex:none;display:flex;align-items:center;justify-content:center;width:197px}
.sp-sentbox{width:197px;flex:none;border-radius:8px;background:#F2F2F2;padding:12px;
  display:flex;flex-direction:column;gap:4px;align-items:center}
.sp-n{font-family:var(--font-display),'Satoshi',sans-serif;font-weight:700;font-size:18px;
  line-height:24px;color:#1D1D1F}
.sp-who{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:400;font-size:12px;
  line-height:16px;letter-spacing:.19px;color:#6E6E73}
.sp-where{width:197px;text-align:center}

.sp-btn{width:197px;height:32px;flex:none;border-radius:24px;background:#2C2D2E;color:#F8F8F8;
  font-family:var(--font-sans),'Overpass',sans-serif;font-weight:600;font-size:12px;line-height:16px;
  letter-spacing:1.16px;display:flex;align-items:center;justify-content:center;overflow:hidden}

.sp-ripple{position:absolute;top:0;left:0;width:26px;height:26px;border-radius:50%;
  background:#181818;opacity:0}
.sp-cursor{position:absolute;top:0;left:0;filter:drop-shadow(1.53px 4.59px 3.06px rgba(0,0,0,.25))}
`;
