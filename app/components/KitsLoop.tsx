"use client";

import gsap from "gsap";
import { useCallback, useEffect, useId, useLayoutEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────
// Stadium — "Kits" auto-looping animation
//
// The five states of "08 Kits" on the Imagery System board, played as one
// continuous card. Geometry, type, colour and the cursor vector path are
// measured off the Figma frames, not eyeballed. Each state was diffed against
// a Figma export: average mean pixel delta 1.75.
//
// The story is a kit being made, not sent — sending is bundle 15's job:
//
//  - It opens on the kind, because a kind is a preset over one object and it
//    decides whether the kit holds stock (N47). That is a decision worth a
//    frame; a name field is not.
//  - Two products is enough to make a kit, so CREATE KIT comes alive on the
//    second pick. He adds a third anyway, which is what a shelf is for.
//  - The tote is never chosen and stays dimmed, so the finished kit shows the
//    three that were.
//  - At the press, the three chosen products fly into the box as the
//    photograph scales up behind them. The board cannot draw that; it is the
//    payoff for having chosen them.
//
// Figma: Imagery System (F7rDHYd3n5nwRtrlv1F6dO), TAB 2 ASSEMBLY / 08 Kits.
// ─────────────────────────────────────────────────────────────

const TILE_W = 312;
const TILE_H = 340;

const SEQ = 12.4;
const LOOP_PAUSE = 1.2;

/** Card heights, straight out of the Figma frames. */
const H = { kind: 284, build: 208, gen: 314, done: 178 };

/**
 * The card is centred in the 340 plate. Figma rounds, so round the same way:
 * an odd height on a -50% translate lands on a half pixel and every edge
 * inside the card renders twice.
 */
const midY = (h: number) => -Math.floor(h / 2);

/**
 * Cursor rest points. The tip sits at the centre of whatever it presses, which
 * is the board's own convention — a button is 32 tall, so that is button.y + 16.
 */
const AT = {
  welcome: [176, 109], // the Welcome row, 84..134
  nextKind: [180, 280], // NEXT, 264..296
  hoodie: [85, 181],
  cap: [133, 181],
  bottle: [228, 181],
  create: [180, 242], // CREATE KIT, 226..258
  save: [180, 300], // SAVE KIT, 284..316
  off: [300, 372],
} as const;

/** Shelf tiles, and where each one lands inside the kit photograph. */
const FLY = {
  hoodie: { from: [64, 160], to: [96, 120] },
  cap: { from: [112, 160], to: [152, 112] },
  bottle: { from: [207, 160], to: [128, 150] },
} as const;

const CURSOR_PATH =
  "M 3.810890328567521 0.501823863033468 C 2.259966306392882 -0.7045901836691756 0 0.4006400793519591 0 2.3655393329390466 L 0 29.13928739973685 C 0 31.37798735107812 2.824741524143217 32.35975975407818 4.2132802559134435 30.603682053765127 L 10.810362891626982 22.26058065232508 C 11.30305951027408 21.637705100342252 12.053594139208478 21.274242571264864 12.847732910321401 21.274242571264864 L 23.634168352328572 21.274242571264864 C 25.882313171558295 21.274242571264864 26.85842146178152 18.42966760879293 25.083926505025577 17.04948748799787 L 3.810890328567521 0.501823863033468 Z";

const KINDS: [string, string, string][] = [
  ["welcome", "Welcome", "Held in the locker"],
  ["event", "Event", "One batch, US only"],
  ["ondemand", "On demand", "Nothing held"],
];

const Check = () => (
  <svg width="7.5" height="5.8" viewBox="0 0 8 6" fill="none" aria-hidden="true">
    <path d="M1 3.1 L3 5.1 L7 1" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function KitsLoop() {
  const scope = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const reducedRef = useRef(false);
  const visibleRef = useRef(true);

  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const clipId = `kt-cur-${uid}`;

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
      const card = q(".kt-card");
      const cursor = q(".kt-cursor");
      const ripple = q(".kt-ripple");

      const PANE = {
        kind: q(".kt-pane-kind"),
        build: q(".kt-pane-build"),
        gen: q(".kt-pane-gen"),
        done: q(".kt-pane-done"),
      };

      gsap.set(card, { y: midY(H.kind), height: H.kind });
      gsap.set(PANE.kind, { autoAlpha: 1 });
      gsap.set([PANE.build, PANE.gen, PANE.done], { autoAlpha: 0 });
      gsap.set(cursor, { x: AT.off[0], y: AT.off[1], transformOrigin: "0px 0px" });
      gsap.set(ripple, { x: AT.off[0] - 9, y: AT.off[1] - 9, scale: 0.3, opacity: 0 });
      // a button that cannot be pressed yet, drawn the way tab 1 draws one
      gsap.set([q(".kt-btn-kind"), q(".kt-btn-create")], { opacity: 0.4 });
      gsap.set(q(".kt-s-hoodie"), { opacity: 0.45 });
      gsap.set(q(".kt-s-cap"), { opacity: 0.45 });
      gsap.set(q(".kt-s-tote"), { opacity: 0.35 });
      gsap.set(q(".kt-s-bottle"), { opacity: 0.45 });

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
      const swap = (tl: gsap.core.Timeline, from: HTMLElement, to: HTMLElement, h: number, at: number, dur = 0.5) => {
        tl.to(from, { autoAlpha: 0, duration: 0.2, ease: "power1.out" }, at);
        tl.to(card, { height: h, y: midY(h), duration: dur, ease: "power3.inOut" }, at);
        tl.to(to, { autoAlpha: 1, duration: 0.3, ease: "power1.out" }, at + 0.16);
      };
      // picking is a decision, so it stamps a checkbox rather than just brightening
      const pick = (tl: gsap.core.Timeline, tile: string, chk: string, at: number) => {
        tl.to(q(tile), { opacity: 1, duration: 0.3, ease: "power2.out" }, at);
        tl.fromTo(q(chk), { autoAlpha: 0, scale: 0.5 },
          { autoAlpha: 1, scale: 1, duration: 0.36, ease: "back.out(2.8)" }, at + 0.04);
      };
      const fly = (tl: gsap.core.Timeline, sel: string, spec: { from: readonly number[]; to: readonly number[] }, at: number) => {
        const el = q(sel);
        tl.set(el, { x: spec.from[0], y: spec.from[1], scale: 1, autoAlpha: 0 }, at);
        tl.to(el, { autoAlpha: 1, duration: 0.12 }, at);
        tl.to(el, { x: spec.to[0], y: spec.to[1], scale: 0.62, duration: 0.62, ease: "power2.inOut" }, at);
        tl.to(el, { autoAlpha: 0, duration: 0.22 }, at + 0.5);
      };

      const tl = gsap.timeline({ repeat: -1, repeatDelay: LOOP_PAUSE, paused: true });
      tlRef.current = tl;
      gsap.defaults({ ease: "power2.out", duration: 0.5 });

      tl.to(q(".kt-plate"),
        { x: -10, y: 8, scale: 1.08, duration: SEQ / 2, repeat: 1, yoyo: true, ease: "sine.inOut" }, 0);

      // 1 choose the kind
      tl.addLabel("1 choose the kind", 0);
      tl.from(root.querySelectorAll(".kt-pane-kind .kt-title, .kt-pane-kind .kt-kind, .kt-pane-kind .kt-btn"),
        { y: 8, autoAlpha: 0, duration: 0.45, stagger: 0.08 }, 0.15);
      moveTo(tl, 0.85, AT.welcome, 0.7);
      press(tl, 1.6);
      tl.to(q(".kt-k-welcome"), { backgroundColor: "#F2F2F2", boxShadow: "inset 0 0 0 1.4px #1D1D1F", duration: 0.28 }, 1.64);
      tl.to(q(".kt-r-welcome"), { boxShadow: "inset 0 0 0 1.4px #1D1D1F", duration: 0.28 }, 1.64);
      tl.to(q(".kt-d-welcome"), { scale: 1, duration: 0.34, ease: "back.out(2.4)" }, 1.68);
      tl.to(q(".kt-btn-kind"), { opacity: 1, duration: 0.3 }, 1.78);
      moveTo(tl, 2.1, AT.nextKind, 0.55);
      press(tl, 2.72);

      // 2 pick products
      tl.addLabel("2 pick products", 3.05);
      swap(tl, PANE.kind, PANE.build, H.build, 3.05, 0.6);
      tl.from(root.querySelectorAll(".kt-pane-build .kt-lab, .kt-pane-build .kt-shelf"),
        { y: 8, autoAlpha: 0, duration: 0.4, stagger: 0.08 }, 3.35);
      moveTo(tl, 3.7, AT.hoodie, 0.6);
      press(tl, 4.35);
      pick(tl, ".kt-s-hoodie", ".kt-c-hoodie", 4.4);
      moveTo(tl, 4.78, AT.cap, 0.45);
      press(tl, 5.28);
      pick(tl, ".kt-s-cap", ".kt-c-cap", 5.33);
      // two is enough to make a kit, so the button comes alive here
      tl.to(q(".kt-btn-create"), { opacity: 1, duration: 0.3 }, 5.55);
      moveTo(tl, 5.7, AT.bottle, 0.5);
      press(tl, 6.25);
      pick(tl, ".kt-s-bottle", ".kt-c-bottle", 6.3);

      // 3 products selected
      tl.addLabel("3 products selected", 6.6);
      moveTo(tl, 6.9, AT.create, 0.6);
      press(tl, 7.55);

      // 4 kit generated: the three fly into the box, and the photograph lands
      tl.addLabel("4 kit generated", 7.85);
      swap(tl, PANE.build, PANE.gen, H.gen, 7.85, 0.65);
      tl.set(q(".kt-photo"), { autoAlpha: 0 }, 7.85);
      fly(tl, ".kt-f-hoodie", FLY.hoodie, 7.95);
      fly(tl, ".kt-f-cap", FLY.cap, 8.08);
      fly(tl, ".kt-f-bottle", FLY.bottle, 8.21);
      tl.fromTo(q(".kt-photo"), { autoAlpha: 0, scale: 0.94 },
        { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)" }, 8.62);
      tl.from(q(".kt-pane-gen .kt-shelf"), { y: 8, autoAlpha: 0, duration: 0.4 }, 8.95);
      moveTo(tl, 9.15, AT.save, 0.6);
      press(tl, 9.85);

      // 5 kit ready
      tl.addLabel("5 kit ready", 10.15);
      swap(tl, PANE.gen, PANE.done, H.done, 10.15, 0.6);
      moveTo(tl, 10.2, AT.off, 0.7);
      tl.fromTo(q(".kt-tick"), { scale: 0, rotation: -25 },
        { scale: 1, rotation: 0, duration: 0.55, ease: "back.out(2.6)" }, 10.5);
      tl.from(root.querySelectorAll(".kt-pane-done .kt-donetitle, .kt-pane-done .kt-donesub, .kt-pane-done .kt-btn"),
        { y: 8, autoAlpha: 0, duration: 0.42, stagger: 0.09 }, 10.7);
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

  return (
    <div ref={scope} className="relative h-full w-full overflow-hidden">
      <style>{CSS}</style>

      <div ref={stageRef} className="kt-stage">
        <div className="kt-plate" />

        <div className="kt-card">
          {/* 1 choose the kind */}
          <section className="kt-pane kt-pane-kind">
            <div className="kt-content">
              <div className="kt-hd"><h3 className="kt-title">New kit</h3></div>
              <div className="kt-kinds">
                {KINDS.map(([key, name, sub]) => (
                  <div key={key} className={`kt-kind${key === "welcome" ? " kt-k-welcome" : ""}`}>
                    <span className="kt-det">
                      <span className="kt-nm">{name}</span>
                      <span className="kt-sb">{sub}</span>
                    </span>
                    <span className={`kt-radio${key === "welcome" ? " kt-r-welcome" : ""}`}>
                      <i className={key === "welcome" ? "kt-d-welcome" : undefined}
                         style={key === "welcome" ? undefined : { transform: "scale(0)" }} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="kt-btn kt-btn-kind">NEXT</div>
          </section>

          {/* 2 pick products and 3 products selected: one card */}
          <section className="kt-pane kt-pane-build">
            <div className="kt-hd">
              <h3 className="kt-title">Welcome Kit</h3>
              <span className="kt-pill">DRAFT</span>
            </div>
            <div className="kt-lab">SELECT PRODUCTS</div>
            <div className="kt-shelf">
              <span className="kt-p kt-fit kt-p-hoodie kt-s-hoodie">
                <i className="kt-chk kt-c-hoodie"><b><Check /></b></i>
              </span>
              <span className="kt-p kt-fill kt-p-cap kt-s-cap">
                <i className="kt-chk kt-c-cap"><b><Check /></b></i>
              </span>
              <span className="kt-p kt-fill kt-p-tote kt-s-tote" />
              <span className="kt-p kt-fill kt-p-bottle kt-s-bottle">
                <i className="kt-chk kt-c-bottle"><b><Check /></b></i>
              </span>
            </div>
            <div className="kt-btn kt-btn-create">CREATE KIT</div>
          </section>

          {/* 4 kit generated */}
          <section className="kt-pane kt-pane-gen">
            <div className="kt-hd">
              <h3 className="kt-title">Welcome Kit</h3>
              <span className="kt-pill">DRAFT</span>
            </div>
            <div className="kt-photo" />
            <div className="kt-shelf">
              <span className="kt-p kt-fit kt-p-hoodie" />
              <span className="kt-p kt-fill kt-p-cap" />
              <span className="kt-p kt-fit kt-p-bottle" />
            </div>
            <div className="kt-btn kt-btn-save">SAVE KIT</div>
          </section>

          {/* 5 kit ready */}
          <section className="kt-pane kt-pane-done">
            <div className="kt-content kt-done">
              <span className="kt-tick">
                <svg width="11" height="9" viewBox="0 0 11 9" fill="none" aria-hidden="true">
                  <path d="M1 4.6 L4 7.6 L10 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="kt-donetitle">Welcome Kit is ready</span>
              <span className="kt-donesub">Held in the locker, ready to send</span>
            </div>
            <div className="kt-btn">DONE</div>
          </section>
        </div>

        {/* the three chosen products, in flight */}
        <div className="kt-flyer kt-p-hoodie kt-fit kt-f-hoodie" />
        <div className="kt-flyer kt-p-cap kt-fill kt-f-cap" />
        <div className="kt-flyer kt-p-bottle kt-fill kt-f-bottle" />

        <div className="kt-ripple" />
        <svg className="kt-cursor" width="26" height="31.51" viewBox="0 0 26 31.51" aria-hidden="true">
          <defs><clipPath id={clipId}><path d={CURSOR_PATH} /></clipPath></defs>
          <path clipPath={`url(#${clipId})`} d={CURSOR_PATH}
            fill="#181818" stroke="#ffffff" strokeWidth="3.316" strokeLinejoin="miter" />
        </svg>
      </div>
    </div>
  );
}

const CSS = `
.kt-stage{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
  transform-origin:50% 50%;width:312px;height:340px;border-radius:9px;overflow:hidden;
  background:#F2F2F2;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
.kt-stage *,.kt-stage *::before,.kt-stage *::after{box-sizing:border-box}
.kt-plate{position:absolute;left:0;top:0;width:312px;height:340px;
  background:linear-gradient(124.96deg,#0B2952 0%,#5D8FDC 55%,#AFCCF6 100%);transform-origin:50% 50%}
.kt-card{position:absolute;left:42px;top:170px;width:229px;height:284px;background:#fff;
  border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,.06);overflow:hidden}
.kt-pane{position:absolute;top:0;left:0;width:229px;padding:16px;display:flex;
  flex-direction:column;margin:0}
.kt-pane-kind{gap:18px}
.kt-pane-build{gap:16px}
.kt-pane-gen{gap:14px}
.kt-pane-done{gap:18px}

.kt-hd{height:24px;flex:none;display:flex;align-items:center;justify-content:space-between}
.kt-title{font-family:var(--font-display),'Satoshi',sans-serif;font-weight:700;font-size:18px;
  line-height:24px;color:#1D1D1F;margin:0;padding:0;letter-spacing:0}
.kt-pill{height:19px;border-radius:8px;padding:4px 9px 3px;background:#F2F2F2;flex:none;
  font-family:var(--font-sans),'Overpass',sans-serif;font-weight:700;font-size:9px;
  line-height:12px;letter-spacing:.75px;color:#1D1D1F;white-space:nowrap}
.kt-lab{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:700;font-size:10px;
  line-height:14px;letter-spacing:1px;color:#6E6E73;flex:none}

.kt-content{display:flex;flex-direction:column;gap:16px;flex:none}
.kt-done{gap:12px}
.kt-kinds{display:flex;flex-direction:column;gap:6px;flex:none}
/* Figma strokes are INSIDE and take no layout space; a CSS border would */
.kt-kind{height:50px;border-radius:8px;background:#fff;box-shadow:inset 0 0 0 1px #ECECEC;
  padding:9px 12px;display:flex;align-items:center;justify-content:space-between}
.kt-det{display:flex;flex-direction:column;gap:2px}
.kt-nm{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:600;font-size:12px;
  line-height:16px;letter-spacing:.19px;color:#1D1D1F}
.kt-sb{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:400;font-size:10px;
  line-height:14px;letter-spacing:.19px;color:#6E6E73}
.kt-radio{width:14px;height:14px;border-radius:50%;background:#fff;flex:none;
  box-shadow:inset 0 0 0 1.4px #86868B;display:flex;align-items:center;justify-content:center}
.kt-radio i{width:6px;height:6px;border-radius:50%;background:#2C2D2E;display:block}

.kt-shelf{height:58px;flex:none;border-radius:6px;background:#F2F2F2;padding:6px;display:flex;gap:6px}
.kt-p{flex:1;border-radius:6px;background-position:center;background-repeat:no-repeat;position:relative;display:block}
.kt-fit{background-size:contain}
.kt-fill{background-size:cover}
.kt-p-hoodie{background-image:url(/motion/loop-kit-hoodie.jpg)}
.kt-p-cap{background-image:url(/motion/loop-kit-cap.jpg)}
.kt-p-tote{background-image:url(/motion/loop-kit-tote.jpg)}
.kt-p-bottle{background-image:url(/motion/loop-kit-bottle.jpg)}
/* the Product Design Library checkbox: a 10.5 dark square on a 14 white ground */
.kt-chk{position:absolute;right:0;top:0;width:14px;height:14px;background:#fff;border-radius:3px;
  display:flex;align-items:center;justify-content:center;opacity:0}
.kt-chk b{width:10.5px;height:10.5px;border-radius:1.5px;background:#181818;
  display:flex;align-items:center;justify-content:center}

.kt-photo{height:126px;flex:none;border-radius:8px;
  background:url(/motion/loop-kit-photo.jpg) center/cover no-repeat}

.kt-tick{width:32px;height:32px;border-radius:50%;background:#1A9E5C;flex:none;align-self:center;
  display:flex;align-items:center;justify-content:center}
.kt-donetitle{font-family:var(--font-display),'Satoshi',sans-serif;font-weight:700;font-size:18px;
  line-height:24px;color:#1D1D1F;text-align:center;width:197px}
.kt-donesub{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:400;font-size:12px;
  line-height:16px;color:#6E6E73;text-align:center;width:197px}

.kt-btn{width:197px;height:32px;flex:none;border-radius:24px;background:#2C2D2E;color:#F8F8F8;
  font-family:var(--font-sans),'Overpass',sans-serif;font-weight:600;font-size:12px;
  line-height:16px;letter-spacing:1.16px;display:flex;align-items:center;justify-content:center;
  overflow:hidden}

.kt-ripple{position:absolute;top:0;left:0;width:26px;height:26px;border-radius:50%;
  background:#181818;opacity:0}
.kt-cursor{position:absolute;top:0;left:0;filter:drop-shadow(1.66px 4.97px 3.32px rgba(0,0,0,.25))}
.kt-flyer{position:absolute;left:0;top:0;width:41.8px;height:46px;border-radius:6px;
  background-position:center;background-repeat:no-repeat;opacity:0;pointer-events:none}
`;
