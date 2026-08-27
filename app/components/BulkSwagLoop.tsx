"use client";

import gsap from "gsap";
import { useCallback, useEffect, useId, useLayoutEffect, useRef } from "react";
import { useCardActive } from "@/app/components/common/cardActive";

// ─────────────────────────────────────────────────────────────
// Stadium — "Bulk swag" auto-looping animation
//
// The six states of "11 Bulk Swag" on the Imagery System board, played as one
// continuous card. Geometry, type, colour and the cursor vector path are
// measured off the Figma frames, not eyeballed. Each state was diffed against a
// Figma export: average mean pixel delta 1.49.
//
// One idea per screen, in the order somebody actually meets them: the
// quantity, the ladder it lands in, the size run, the quote, production, the
// locker. The first two carry the argument, so they come first — the carousel
// auto-advances every 5s, and a reader who does not stop on this card sees
// only the quantity and the ladder. That is the right two to see.
//
// Every figure is computed from the ladder rather than typed. The board had it
// typed and the numbers disagreed: 1,240 at $25.60 is $31,744, not the $32,432
// it printed, and $25.60 is a flat 20% off, which is not a band the product
// has. unitAt() gives $24.80 / $30,752 / $8,928 and those agree by
// construction. The quantity is likewise counted from the size run, so the run
// cannot add up to something other than the number that was priced.
//
// Figma: Imagery System (F7rDHYd3n5nwRtrlv1F6dO), TAB 3 ENGAGE / 11 Bulk Swag.
// ─────────────────────────────────────────────────────────────

const TILE_W = 312;
const TILE_H = 340;

const SEQ = 29.0;
const LOOP_PAUSE = 1.2;

/** Card heights, straight out of the Figma frames. */
const H = { order: 310, ladder: 298, sizes: 310, quote: 224, made: 230, locker: 290 };

/**
 * The board places a card at floor((340 - h) / 2). On an odd height that is not
 * the same as -floor(h / 2).
 */
const midY = (h: number) => Math.floor((TILE_H - h) / 2) - 170;

/** The tip sits at the centre of the button it presses. */
const AT = {
  order: [180, 293],
  ladder: [180, 287],
  sizes: [180, 293],
  quote: [180, 250],
  off: [300, 372],
} as const;

/**
 * The bands, verbatim from RUNBANDS in the prototype's production.js, which
 * reads them off the shape of SwagUp's published ladder. $32.00 is the blank
 * plus its decoration.
 */
const BASE = 32.0;
const BANDS: [number, number][] = [
  [1, 1.0], [25, 0.97], [50, 0.94], [100, 0.9],
  [250, 0.85], [500, 0.79], [1000, 0.775], [5000, 0.77],
];
const bandFor = (n: number) => {
  let b = BANDS[0];
  for (const x of BANDS) if (n >= x[0]) b = x;
  return b;
};
const unitAt = (n: number) => BASE * bandFor(n)[1];

/** The four bands a real order passes through, so the card shows a ladder. */
const SHOWN = [100, 250, 500, 1000];

/**
 * The size run IS the quantity: 140 + 380 + 420 + 200 + 100 = 1,240. The third
 * number on each row is Custom Ink's size upcharge, verbatim in the
 * prototype's SIZEUP. A size is a price axis and the money is real, so it is
 * part of the number signed (N55). Without a 2XL in the run the screen stated
 * a rule that never bit: the total was identical with or without that screen.
 */
const RUN: [string, number, number][] = [
  ["S", 140, 0], ["M", 380, 0], ["L", 420, 0], ["XL", 200, 0], ["2XL", 100, 2.5],
];
const QTY = RUN.reduce((n, r) => n + r[1], 0);
const DIGITS = String(QTY);
const UNIT = unitAt(QTY);
const UPCHARGE = RUN.reduce((n, r) => n + r[1] * r[2], 0);
const TOTAL = UNIT * QTY + UPCHARGE;
/**
 * The blank's own minimum is 36 units, so the one-unit price is not a price
 * anybody can pay and a saving measured against it overstates by $1,190. This
 * is measured against the smallest order that can actually be placed, which
 * sits in the 25+ band at $31.04.
 */
const MOQ = 36;
const SAVED = (unitAt(MOQ) - UNIT) * QTY;
const HERE_BAND = bandFor(QTY)[0];

const comma = (n: number) =>
  String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const money = (n: number) => `$${comma(n)}`;

const CURSOR_PATH =
  "M 3.517744918677711 0.4632220180675262 C 2.0861227443626604 -0.6503909256464298 0 0.3698216042463711 0 2.1835747248015087 L 0 26.897803210796148 C 0 28.964295431870166 2.6074537145937384 29.870546862504835 3.889181774689332 28.2495520949281 L 9.978796515347982 20.548227879783475 C 10.43359339409915 19.973265843402263 11.126394590038597 19.637761977178336 11.859445763373602 19.637761977178336 L 21.816155402149448 19.637761977178336 C 23.891366004515344 19.637761977178336 24.79238904164448 17.012000526346874 23.154393696946684 15.737988132861453 L 3.517744918677711 0.4632220180675262 Z";

const Tick = () => (
  <span className="bs-mark">
    <svg width="6.5" height="4.7" viewBox="0 0 7 5" aria-hidden="true">
      <path d="M1 2.6 L2.7 4.2 L6 1" fill="none" stroke="#fff" strokeWidth="1.4"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

export default function BulkSwagLoop() {
  const scope = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const reducedRef = useRef(false);
  const visibleRef = useRef(true);
  const cardActive = useCardActive();
  const activeRef = useRef(cardActive);

  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const clipId = `bs-cur-${uid}`;

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
      const all = (sel: string) =>
        Array.from(root.querySelectorAll(sel)) as HTMLElement[];
      const card = q(".bs-card");
      const cursor = q(".bs-cursor");
      const ripple = q(".bs-ripple");

      const PANE = {
        order: q(".bs-pane-order"),
        ladder: q(".bs-pane-ladder"),
        sizes: q(".bs-pane-sizes"),
        quote: q(".bs-pane-quote"),
        made: q(".bs-pane-made"),
        locker: q(".bs-pane-locker"),
      };

      const here = q(".bs-here");
      const hereText = Array.from(here.querySelectorAll(".bs-k, .bs-v"));
      const nums = all(".bs-num");
      const eachRow = q(".bs-each");
      const eachText = [q(".bs-eachk"), q(".bs-eachv")];

      gsap.set(card, { y: midY(H.order), height: H.order });
      gsap.set(PANE.order, { autoAlpha: 1 });
      gsap.set([PANE.ladder, PANE.sizes, PANE.quote, PANE.made, PANE.locker], { autoAlpha: 0 });
      gsap.set(cursor, { x: AT.off[0], y: AT.off[1], transformOrigin: "0px 0px" });
      gsap.set(ripple, { x: AT.off[0] - 9, y: AT.off[1] - 9, scale: 0.3, opacity: 0 });

      // The band starts as one of the others and turns green when the quantity
      // lands in it. GSAP reverts backgroundColor and color on rewind.
      // Both of these start neutral and go green only when they are earned.
      gsap.set([here, eachRow], { backgroundColor: "#F2F2F2" });
      gsap.set([q(".bs-saved"), q(".bs-total")], { autoAlpha: 0 });
      gsap.set(hereText, { color: "#1D1D1F" });
      gsap.set(eachText, { color: "#1D1D1F" });

      // Every derived string starts empty and is only ever written from an
      // onUpdate, so a rewind clears it. GSAP does not revert textContent.
      [".bs-qty", ".bs-eachv", ".bs-saved", ".bs-total",
       ".bs-kh", ".bs-gain", ".bs-runpill"].forEach((s) => { q(s).textContent = ""; });
      nums.forEach((n) => { n.textContent = ""; });

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
      // A number counts up to its value and is never written any other way.
      const countTo = (tl: gsap.core.Timeline, el: HTMLElement, to: number,
                       at: number, dur = 0.5) => {
        tl.to({ n: 0 }, { n: to, duration: dur, ease: "power2.out",
          onUpdate() { el.textContent = comma((this.targets()[0] as { n: number }).n); } }, at);
      };

      const tl = gsap.timeline({ repeat: -1, repeatDelay: LOOP_PAUSE, paused: true });
      tlRef.current = tl;

      // The plate drifts under everything, so the card never sits on a dead ground.
      tl.fromTo(q(".bs-plate"), { x: 0, y: 0, scale: 1 },
        { x: -10, y: 8, scale: 1.08, duration: SEQ, ease: "none" }, 0);

      // 1 the quantity: one keystroke at a time, and the price moves with it.
      // Two of the four digits cross a band, and those two moments are the
      // reason the card exists, so each gets a flash of its own.
      tl.addLabel("1 the quantity", 0);
      tl.from(root.querySelectorAll(".bs-pane-order .bs-hd, .bs-pane-order .bs-product, .bs-pane-order .bs-field, .bs-pane-order .bs-each, .bs-pane-order .bs-btn"),
        { y: 10, autoAlpha: 0, duration: 0.5, stagger: 0.12 }, 0.15);

      const qcaret = gsap.to(q(".bs-qcaret"),
        { opacity: 0, duration: 0.5, repeat: -1, yoyo: true, ease: "steps(1)" });

      const TYPE_AT = 1.3, PER = 0.62, TYPE_FOR = DIGITS.length * PER;
      tl.to({ i: 0 }, {
        i: DIGITS.length, duration: TYPE_FOR, ease: "none",
        onUpdate() {
          const k = Math.round((this.targets()[0] as { i: number }).i);
          const typed = DIGITS.slice(0, k);
          q(".bs-qty").textContent = typed ? comma(+typed) : "";
          q(".bs-eachv").textContent = typed ? `$${unitAt(+typed).toFixed(2)}` : "";
        },
      }, TYPE_AT);

      // The keystrokes that cross a band, computed rather than guessed at, so a
      // flash lands on the frame the number actually changes and nowhere else.
      const CROSS: number[] = [];
      for (let d = 2; d <= DIGITS.length; d++) {
        if (unitAt(+DIGITS.slice(0, d)) < unitAt(+DIGITS.slice(0, d - 1)))
          CROSS.push(TYPE_AT + d * PER);
      }
      CROSS.forEach((at) => {
        tl.fromTo(q(".bs-eachv"), { scale: 1 },
          { scale: 1.14, duration: 0.16, yoyo: true, repeat: 1, ease: "power2.out",
            transformOrigin: "100% 50%" }, at);
      });
      // Green at the first keystroke that earns a discount, not before.
      tl.to(eachRow, { backgroundColor: "#D8F1CC", duration: 0.4 }, CROSS[0]);
      tl.to(eachText, { color: "#0B6B3F", duration: 0.4 }, CROSS[0]);

      tl.set(q(".bs-qcaret"), { autoAlpha: 0 }, TYPE_AT + TYPE_FOR + 0.2);
      tl.call(() => qcaret.pause(), undefined, TYPE_AT + TYPE_FOR + 0.2);
      moveTo(tl, 5.2, AT.order, 0.7);
      press(tl, 6.0);

      // 2 the ladder: why it fell
      tl.addLabel("2 the ladder", 6.6);
      swap(tl, PANE.order, PANE.ladder, H.ladder, 6.6);
      tl.from(root.querySelectorAll(".bs-pane-ladder .bs-tray"),
        { y: 10, autoAlpha: 0, duration: 0.42, stagger: 0.22 }, 7.1);
      tl.to(here, { backgroundColor: "#D8F1CC", duration: 0.5 }, 8.7);
      tl.to(hereText, { color: "#0B6B3F", duration: 0.5 }, 8.7);
      tl.from(q(".bs-pane-ladder .bs-fine"), { autoAlpha: 0, duration: 0.4 }, 9.4);
      moveTo(tl, 10.8, AT.ladder, 0.7);
      press(tl, 11.6);

      // 3 the size run: each size fills in turn and the pill counts what has
      // been allocated, so the run visibly adds up to the quantity.
      tl.addLabel("3 the size run", 12.2);
      swap(tl, PANE.ladder, PANE.sizes, H.sizes, 12.2);
      tl.from(root.querySelectorAll(".bs-pane-sizes .bs-tray"),
        { y: 10, autoAlpha: 0, duration: 0.42, stagger: 0.22 }, 12.7);
      RUN.forEach(([, n], i) => countTo(tl, nums[i], n, 13.0 + i * 0.5, 0.55));
      tl.to({ n: 0 }, {
        n: QTY, duration: 2.55, ease: "none",
        onUpdate() {
          q(".bs-runpill").textContent =
            `${comma((this.targets()[0] as { n: number }).n)} UNITS`;
        },
      }, 13.0);
      moveTo(tl, 16.4, AT.sizes, 0.7);
      press(tl, 17.2);

      // 4 the quote
      tl.addLabel("4 the quote", 17.8);
      swap(tl, PANE.sizes, PANE.quote, H.quote, 17.8);
      // The saving and the total arrive at their value rather than spinning up
      // to it. A number that counts is a number performing, and on the one
      // screen where somebody is reading what they will owe, that reads cheap.
      // They are held invisible rather than empty, so a rewind cannot leave
      // last loop's figures showing before the beat that writes them.
      tl.to({ n: 0 }, {
        n: 1, duration: 0.01,
        onUpdate() {
          q(".bs-saved").textContent = `−${money(SAVED)}`;
          q(".bs-total").textContent = money(TOTAL);
        },
      }, 18.15);
      tl.fromTo([q(".bs-saved"), q(".bs-total")], { autoAlpha: 0, y: 6 },
        { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.09, ease: "power2.out" }, 18.15);
      // What the money does, which every other commitment in the product states
      // and this one did not. "You pay today $0" is the prototype's wording,
      // where the zero is the card and the wallet is what commits; a card that
      // never mentions a card cannot lean on that, so this says the thing that
      // moves instead of the thing that does not.
      tl.from(q(".bs-pane-quote .bs-fine"), { y: 8, autoAlpha: 0, duration: 0.45 }, 19.6);
      moveTo(tl, 20.7, AT.quote, 0.7);
      press(tl, 21.5);

      // 5 placed, in production
      tl.addLabel("5 placed", 22.1);
      swap(tl, PANE.quote, PANE.made, H.made, 22.1);
      moveTo(tl, 22.15, AT.off, 0.8);
      tl.from(q(".bs-s1"), { y: 10, autoAlpha: 0, duration: 0.45 }, 22.6);
      tl.from(q(".bs-s2"), { y: 10, autoAlpha: 0, duration: 0.45 }, 23.0);
      tl.from(q(".bs-s3"), { y: 10, autoAlpha: 0, duration: 0.45 }, 23.4);
      tl.from(q(".bs-pane-made .bs-btn"), { y: 8, autoAlpha: 0, duration: 0.45 }, 23.8);

      // 6 the locker
      tl.addLabel("6 the locker", 25.3);
      swap(tl, PANE.made, PANE.locker, H.locker, 25.3);
      countTo(tl, q(".bs-kh"), QTY, 25.8, 1.1);
      tl.to({ n: 0 }, { n: 1, duration: 0.01,
        onUpdate() { q(".bs-gain").textContent = `+${comma(QTY)}`; } }, 26.7);
      tl.from(q(".bs-k2"), { y: 10, autoAlpha: 0, duration: 0.45 }, 26.2);
      tl.from(q(".bs-k3"), { y: 10, autoAlpha: 0, duration: 0.45 }, 26.45);
      tl.from(q(".bs-gain"), { scale: 0.6, autoAlpha: 0, duration: 0.5,
        ease: "back.out(2)", transformOrigin: "0% 50%" }, 26.7);
      tl.from(q(".bs-pane-locker .bs-btn"), { y: 8, autoAlpha: 0, duration: 0.45 }, 26.7);
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

      <div ref={stageRef} className="bs-stage">
        <div className="bs-plate" />

        <div className="bs-card">
          {/* 1 the quantity */}
          <section className="bs-pane bs-pane-order">
            <div className="bs-hd">
              <p className="bs-title">Bulk order</p>
              <span className="bs-pill">DRAFT</span>
            </div>
            <div className="bs-product">
              <span className="bs-thumb" />
              <span className="bs-pname">Branded Hoodie</span>
            </div>
            <div className="bs-field">
              <span className="bs-lab">QUANTITY</span>
              <div className="bs-input">
                <span className="bs-big">
                  <span className="bs-qty" />
                  <i className="bs-qcaret" />
                </span>
                <span className="bs-unit">units</span>
              </div>
            </div>
            <div className="bs-each">
              <span className="bs-eachk">Each</span>
              <span className="bs-sp" />
              <span className="bs-eachv" />
            </div>
            <div className="bs-btn">SEE PRICING</div>
          </section>

          {/* 2 the ladder */}
          <section className="bs-pane bs-pane-ladder">
            <div className="bs-hd">
              <p className="bs-title">Price ladder</p>
              <span className="bs-pill bs-green">{comma(HERE_BAND)}+ TIER</span>
            </div>
            <div className="bs-block">
              {SHOWN.map((b) => (
                <div key={b} className={`bs-tray${b === HERE_BAND ? " bs-here" : ""}`}>
                  <span className="bs-k">{comma(b)}+</span>
                  <span className="bs-sp" />
                  <span className="bs-v">${unitAt(b).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <span className="bs-fine">More units, a lower price on every one.</span>
            <div className="bs-btn">PICK SIZES</div>
          </section>

          {/* 3 the size run */}
          <section className="bs-pane bs-pane-sizes">
            <div className="bs-hd">
              <p className="bs-title">Size run</p>
              <span className="bs-pill bs-runpill" />
            </div>
            <div className="bs-block">
              {RUN.map(([size, , up]) => (
                <div key={size} className="bs-tray">
                  <span className="bs-k">{size}</span>
                  <span className="bs-sp" />
                  {up > 0 && <span className="bs-up">+${up.toFixed(2)} each</span>}
                  <span className="bs-v bs-num" />
                </div>
              ))}
            </div>
            <div className="bs-btn">REVIEW ORDER</div>
          </section>

          {/* 4 the quote */}
          <section className="bs-pane bs-pane-quote">
            <div className="bs-hd">
              <p className="bs-title">Pricing</p>
              <span className="bs-pill bs-green">QUOTED</span>
            </div>
            <div className="bs-discount">
              <span className="bs-dk">Volume savings</span>
              <span className="bs-dv bs-saved" />
            </div>
            <div className="bs-total-row">
              <span className="bs-tk">Total</span>
              <span className="bs-sp" />
              <span className="bs-tv bs-total" />
            </div>
            <span className="bs-fine">Committed today, settles as the run ships.</span>
            <div className="bs-btn">COMMIT THIS RUN</div>
          </section>

          {/* 5 placed, in production */}
          <section className="bs-pane bs-pane-made">
            <div className="bs-hd">
              <p className="bs-title">Order 4712</p>
              <span className="bs-pill">SHIPPING</span>
            </div>
            <div className="bs-block">
              <div className="bs-tray bs-s1">
                <span className="bs-who"><Tick /><span className="bs-k">In production</span></span>
                <span className="bs-sp" />
                <span className="bs-when">Jul 21</span>
              </div>
              <div className="bs-tray bs-s2">
                <span className="bs-who"><Tick /><span className="bs-k">Packed</span></span>
                <span className="bs-sp" />
                <span className="bs-when">Jul 24</span>
              </div>
              <div className="bs-tray bs-now bs-s3">
                <span className="bs-who">
                  <span className="bs-mark bs-wait"><i className="bs-dot" /></span>
                  <span className="bs-k">At warehouse</span>
                </span>
                <span className="bs-sp" />
                <span className="bs-when">Aug 14</span>
              </div>
            </div>
            <div className="bs-btn">TRACK ORDER</div>
          </section>

          {/* 6 the locker */}
          <section className="bs-pane bs-pane-locker">
            <div className="bs-hd">
              <p className="bs-title">Swag Locker</p>
              <span className="bs-pill bs-green">IN STOCK</span>
            </div>
            <div className="bs-stock bs-k1">
              <span className="bs-swho">
                <span className="bs-ph bs-ph-hoodie" />
                <span className="bs-meta">
                  <span className="bs-nm">Hoodie</span>
                  <span className="bs-gain" />
                </span>
              </span>
              <span className="bs-sp" />
              <span className="bs-sv bs-kh" />
            </div>
            <div className="bs-stock bs-dim bs-k2">
              <span className="bs-swho">
                <span className="bs-ph bs-ph-bottle" />
                <span className="bs-nm">Bottle</span>
              </span>
              <span className="bs-sp" />
              <span className="bs-sv">380</span>
            </div>
            <div className="bs-stock bs-dim bs-k3">
              <span className="bs-swho">
                <span className="bs-ph bs-ph-cap" />
                <span className="bs-nm">Cap</span>
              </span>
              <span className="bs-sp" />
              <span className="bs-sv">240</span>
            </div>
            <div className="bs-btn">MANAGE LOCKER</div>
          </section>
        </div>

        <div className="bs-ripple" />
        <svg className="bs-cursor" width="24" height="29.08" viewBox="0 0 24 29.08" aria-hidden="true">
          <defs><clipPath id={clipId}><path d={CURSOR_PATH} /></clipPath></defs>
          <path clipPath={`url(#${clipId})`} d={CURSOR_PATH}
            fill="#181818" stroke="#ffffff" strokeWidth="3.06" strokeLinejoin="miter" />
        </svg>
      </div>
    </div>
  );
}

const CSS = `
.bs-stage{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
  transform-origin:50% 50%;width:312px;height:340px;border-radius:9px;overflow:hidden;
  background:#F2F2F2;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
.bs-stage *,.bs-stage *::before,.bs-stage *::after{box-sizing:border-box}
.bs-plate{position:absolute;left:0;top:0;width:312px;height:340px;
  background:linear-gradient(124.96deg,#0B2952 0%,#5D8FDC 55%,#AFCCF6 100%);transform-origin:50% 50%}
.bs-card{position:absolute;left:42px;top:170px;width:229px;height:280px;background:#fff;
  border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,.06);overflow:hidden}
.bs-pane{position:absolute;top:0;left:0;width:229px;padding:16px;display:flex;
  flex-direction:column;margin:0}
.bs-pane-order{gap:14px}
.bs-pane-ladder{gap:14px}
.bs-pane-sizes{gap:14px}
.bs-pane-quote{gap:14px}
.bs-pane-made{gap:14px}
.bs-pane-locker{gap:14px}

.bs-hd{height:24px;flex:none;display:flex;align-items:center;justify-content:space-between}
/* Figma text does not wrap, so neither does this: a title that outgrows its
   head overlaps the pill the way the board does, rather than silently pushing
   the whole card down a line. */
.bs-title{font-family:var(--font-display),'Satoshi',sans-serif;font-weight:700;font-size:18px;
  line-height:24px;color:#1D1D1F;margin:0;padding:0;letter-spacing:0;white-space:nowrap}
.bs-pill{height:19px;border-radius:8px;padding:4px 9px 3px;background:#F2F2F2;flex:none;
  font-family:var(--font-sans),'Overpass',sans-serif;font-weight:700;font-size:9px;line-height:12px;
  letter-spacing:.75px;color:#1D1D1F;white-space:nowrap}
.bs-green{background:#D8F1CC}
.bs-lab{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:700;font-size:10px;
  line-height:14px;letter-spacing:1px;color:#6E6E73;flex:none}
.bs-fine{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:400;font-size:10px;
  line-height:14px;letter-spacing:.19px;color:#6E6E73;flex:none;min-height:14px}

/* A tray with a label on the left and a figure on the right. The ladder, the
   size run and the production steps are all this same row. The sp between them
   is a spacer on the board, not a rule: all of them carry no fill. */
.bs-tray{height:34px;flex:none;border-radius:6px;background:#F2F2F2;padding:9px 12px;
  display:flex;align-items:center;gap:9px}
.bs-k{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:600;font-size:12px;
  line-height:16px;letter-spacing:.19px;color:#1D1D1F;white-space:nowrap}
.bs-v{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:600;font-size:12px;
  line-height:16px;letter-spacing:.19px;color:#1D1D1F;white-space:nowrap}
.bs-sp{flex:1}
.bs-block{display:flex;flex-direction:column;gap:6px;flex:none}
.bs-here .bs-k,.bs-here .bs-v{font-weight:700}
.bs-num{font-weight:700}
/* the upcharge rides on the row that causes it, not in a rule underneath */
.bs-up{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:400;font-size:10px;
  line-height:14px;letter-spacing:.19px;color:#6E6E73;white-space:nowrap}

/* 1 the quantity */
.bs-product{height:62px;flex:none;border-radius:8px;background:#F2F2F2;
  padding:12px;display:flex;align-items:center;gap:12px}
.bs-thumb{width:38px;height:38px;flex:none;border-radius:6px;
  background:url(/motion/loop-bulk-hoodie.jpg) center/cover no-repeat}
.bs-pname{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:600;font-size:12px;
  line-height:16px;letter-spacing:.19px;color:#1D1D1F}
.bs-field{display:flex;flex-direction:column;gap:6px;flex:none}
/* "units" is a suffix pinned to the far edge, and the number's box is a fixed
   24px so it cannot change height either. Baseline alignment against a box that
   holds only the caret when empty is 20px tall, and 24px the moment a digit
   lands, which dropped "units" by 4px on the first keystroke. The board bottom
   aligns them (number 193..217, units 201..217), so this does too, off a box
   whose height no longer depends on what has been typed. */
.bs-input{height:42px;border-radius:8px;background:#fff;box-shadow:inset 0 0 0 1px #1D1D1F;
  padding:9px 12px;display:flex;align-items:flex-end;justify-content:space-between}
.bs-big{font-family:var(--font-display),'Satoshi',sans-serif;font-weight:700;font-size:18px;
  line-height:24px;color:#1D1D1F;display:flex;align-items:center;height:24px}
.bs-qcaret{width:1.4px;height:20px;background:#1D1D1F;display:inline-block;margin-left:1px}
.bs-unit{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:400;font-size:10px;
  line-height:16px;letter-spacing:.19px;color:#6E6E73;white-space:nowrap}
/* The price per unit is the argument of the whole card, so it is a figure on a
   row of its own rather than 10px of grey under the field. It turns green at
   the keystroke that first earns a discount, and not before. */
.bs-each{height:42px;flex:none;border-radius:6px;background:#F2F2F2;padding:9px 12px;
  display:flex;align-items:center;gap:9px}
.bs-eachk{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:700;font-size:12px;
  line-height:16px;letter-spacing:.19px;color:#1D1D1F;white-space:nowrap}
.bs-eachv{font-family:var(--font-display),'Satoshi',sans-serif;font-weight:700;font-size:18px;
  line-height:24px;color:#1D1D1F;white-space:nowrap}

/* 4 the quote */
.bs-discount{height:42px;flex:none;border-radius:6px;background:#D8F1CC;padding:9px 12px;
  display:flex;align-items:baseline;justify-content:space-between;gap:12px}
.bs-dk{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:600;font-size:12px;
  line-height:16px;letter-spacing:.19px;color:#0B6B3F}
.bs-dv{font-family:var(--font-display),'Satoshi',sans-serif;font-weight:700;font-size:18px;
  line-height:24px;color:#0B6B3F;white-space:nowrap}
.bs-total-row{height:24px;flex:none;display:flex;align-items:baseline;gap:9px}
.bs-tk{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:700;font-size:12px;
  line-height:16px;letter-spacing:.19px;color:#1D1D1F;white-space:nowrap}
.bs-tv{font-family:var(--font-display),'Satoshi',sans-serif;font-weight:700;font-size:18px;
  line-height:24px;color:#1D1D1F;white-space:nowrap}

/* 5 placed, in production */
.bs-now{border-radius:8px;box-shadow:inset 0 0 0 1.2px #1D1D1F}
.bs-who{display:flex;align-items:center;gap:9px}
.bs-mark{width:13px;height:13px;flex:none;border-radius:50%;background:#1A9E5C;
  display:flex;align-items:center;justify-content:center}
.bs-wait{background:rgba(29,29,31,.35)}
.bs-dot{width:5px;height:5px;border-radius:50%;background:#fff}
.bs-when{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:400;font-size:10px;
  line-height:14px;letter-spacing:.19px;color:#6E6E73;white-space:nowrap}
.bs-now .bs-when{color:#1D1D1F}

/* 6 the locker */
.bs-stock{flex:none;border-radius:6px;background:#F2F2F2;padding:9px 12px 9px 9px;
  display:flex;align-items:center;gap:12px}
.bs-k1{height:50px}
.bs-k2,.bs-k3{height:48px}
.bs-swho{display:flex;align-items:center;gap:12px}
.bs-ph{width:30px;height:30px;flex:none;border-radius:6px;background-size:cover;
  background-position:center}
.bs-ph-hoodie{background-image:url(/motion/loop-bulk-hoodie.jpg)}
.bs-ph-bottle{background-image:url(/motion/loop-bulk-bottle.jpg)}
.bs-ph-cap{background-image:url(/motion/loop-bulk-cap.jpg)}
.bs-meta{display:flex;flex-direction:column;gap:2px}
.bs-nm{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:600;font-size:12px;
  line-height:16px;letter-spacing:.19px;color:#1D1D1F;white-space:nowrap}
.bs-gain{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:700;font-size:10px;
  line-height:14px;letter-spacing:.75px;color:#0E7A48;white-space:nowrap}
.bs-sv{font-family:var(--font-display),'Satoshi',sans-serif;font-weight:700;font-size:18px;
  line-height:24px;color:#1D1D1F;white-space:nowrap}
.bs-dim .bs-swho{opacity:.55}

.bs-btn{width:197px;height:32px;flex:none;border-radius:24px;background:#2C2D2E;color:#F8F8F8;
  font-family:var(--font-sans),'Overpass',sans-serif;font-weight:600;font-size:12px;line-height:16px;
  letter-spacing:1.16px;display:flex;align-items:center;justify-content:center;overflow:hidden}

.bs-ripple{position:absolute;top:0;left:0;width:26px;height:26px;border-radius:50%;
  background:#181818;opacity:0}
.bs-cursor{position:absolute;top:0;left:0;filter:drop-shadow(1.53px 4.59px 3.06px rgba(0,0,0,.25))}
`;
