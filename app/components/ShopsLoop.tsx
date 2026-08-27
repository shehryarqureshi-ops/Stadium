"use client";

import gsap from "gsap";
import { useCallback, useEffect, useId, useLayoutEffect, useRef } from "react";
import { useCardActive } from "@/app/components/common/cardActive";

// ─────────────────────────────────────────────────────────────
// Stadium — "Shops" auto-looping animation
//
// The four states of "07 Shops" on the Imagery System board, played as one
// continuous card. Geometry, type, colour and the cursor vector path are
// measured off the Figma frames, not eyeballed. Each state was diffed against
// a Figma export: average mean pixel delta 1.96.
//
// Two notes on where this departs from the board, both deliberate:
//
//  - The board draws no click ripple on this row, and hand-sizes its cursor
//    differently per frame (26, 24, 26, 19). The ripple stays, because a press
//    with no feedback reads as nothing happening; the operator's cursor holds
//    26 through its three beats rather than resizing mid-move. The two
//    shoppers on the last frame are at the board's 19.
//  - Frames 3 and 4 are one shop, not two. Publishing does not redraw it: the
//    pill turns over and the button leaves. So they share a pane.
//
// Figma: Imagery System (F7rDHYd3n5nwRtrlv1F6dO), TAB 2 ASSEMBLY / 07 Shops.
// ─────────────────────────────────────────────────────────────

const TILE_W = 312;
const TILE_H = 340;

const SEQ = 10.4;
const LOOP_PAUSE = 1.2;

/** Card heights, straight out of the Figma frames. */
const H = { build: 250, gallery: 213, shop: 302, live: 254 };

/**
 * The card is centred in the 340 plate, but 213 is odd: a -50% translate lands
 * it on a half pixel and every edge inside it renders twice. Figma rounds.
 */
const midY = (h: number) => -Math.floor(h / 2);

/** Cursor rest points: the x,y of the cursor vector on each board frame. */
const AT = {
  browse: [180, 263], // 1 BROWSE TEMPLATES
  use: [180, 245], // 2 USE TEMPLATE
  pub: [180, 291], // 3 PUBLISH SHOP
  off: [300, 372],
} as const;

/** The two shoppers on frame 4, at the board's own coordinates. */
const VIS = { sarah: [74, 195], daniel: [175, 157] } as const;

const CURSOR_PATH =
  "M 3.810890328567521 0.501823863033468 C 2.259966306392882 -0.7045901836691756 0 0.4006400793519591 0 2.3655393329390466 L 0 29.13928739973685 C 0 31.37798735107812 2.824741524143217 32.35975975407818 4.2132802559134435 30.603682053765127 L 10.810362891626982 22.26058065232508 C 11.30305951027408 21.637705100342252 12.053594139208478 21.274242571264864 12.847732910321401 21.274242571264864 L 23.634168352328572 21.274242571264864 C 25.882313171558295 21.274242571264864 26.85842146178152 18.42966760879293 25.083926505025577 17.04948748799787 L 3.810890328567521 0.501823863033468 Z";

export default function ShopsLoop() {
  const scope = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const reducedRef = useRef(false);
  const visibleRef = useRef(true);
  const cardActive = useCardActive();
  const activeRef = useRef(cardActive);
  const restartRef = useRef(cardActive);

  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const clipId = `sh-cur-${uid}`;
  const clipS = `sh-visS-${uid}`;
  const clipD = `sh-visD-${uid}`;

  const applyPlayState = useCallback(() => {
    const tl = tlRef.current;
    if (!tl) return;
    const run =
      visibleRef.current && activeRef.current && !reducedRef.current;
    if (run) {
      // Becoming the active card restarts the story, but the card is still
      // sliding in at that point and the observer only reports it on screen
      // a beat later — so arm the restart there and spend it here.
      if (restartRef.current) {
        restartRef.current = false;
        tl.restart();
      } else tl.play();
    } else tl.pause();
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
      const card = q(".sh-card");
      const cursor = q(".sh-cursor");
      const ripple = q(".sh-ripple");

      const PANE = {
        build: q(".sh-pane-build"),
        gallery: q(".sh-pane-gallery"),
        shop: q(".sh-pane-shop"),
      };

      gsap.set(card, { y: midY(H.build), height: H.build });
      gsap.set(cursor, { x: AT.off[0], y: AT.off[1], transformOrigin: "0px 0px" });
      gsap.set(ripple, { x: AT.off[0] - 9, y: AT.off[1] - 9, scale: 0.3, opacity: 0 });
      gsap.set([PANE.gallery, PANE.shop], { autoAlpha: 0 });
      gsap.set(PANE.build, { autoAlpha: 1 });
      // the shop is not live and nobody is in it yet
      gsap.set(q(".sh-presence"), { autoAlpha: 0 });
      gsap.set([q(".sh-vis-sarah"), q(".sh-vis-daniel")], { autoAlpha: 0 });
      gsap.set(q(".sh-vis-sarah"), { x: VIS.sarah[0], y: VIS.sarah[1] });
      gsap.set(q(".sh-vis-daniel"), { x: VIS.daniel[0], y: VIS.daniel[1] });

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

      const tl = gsap.timeline({ repeat: -1, repeatDelay: LOOP_PAUSE, paused: true });
      tlRef.current = tl;
      gsap.defaults({ ease: "power2.out", duration: 0.5 });

      // the gradient drifts out and back inside one pass, so t=0 is the board's framing
      tl.to(q(".sh-plate"),
        { x: -10, y: 8, scale: 1.08, duration: SEQ / 2, repeat: 1, yoyo: true, ease: "sine.inOut" }, 0);

      // 1 template or your own
      tl.addLabel("1 template or your own", 0);
      tl.from(root.querySelectorAll(".sh-pane-build .sh-hd, .sh-pane-build .sh-lab, .sh-pane-build .sh-choices, .sh-pane-build .sh-btn"),
        { y: 8, autoAlpha: 0, duration: 0.45, stagger: 0.09 }, 0.15);
      moveTo(tl, 0.75, AT.browse, 0.75);
      press(tl, 1.55);

      // 2 template gallery
      tl.addLabel("2 template gallery", 1.85);
      swap(tl, PANE.build, PANE.gallery, H.gallery, 1.85, 0.55);
      tl.from(root.querySelectorAll(".sh-pane-gallery .sh-tpl"),
        { y: 8, autoAlpha: 0, duration: 0.4, stagger: 0.08 }, 2.15);
      moveTo(tl, 2.3, AT.use, 0.7);
      press(tl, 3.1);

      // 3 pick and publish
      tl.addLabel("3 pick and publish", 3.4);
      swap(tl, PANE.gallery, PANE.shop, H.shop, 3.4, 0.6);
      tl.from(q(".sh-banner"), { autoAlpha: 0, scale: 0.94, duration: 0.45, ease: "power2.out" }, 3.7);
      tl.from(root.querySelectorAll(".sh-pane-shop .sh-prod"),
        { y: 10, autoAlpha: 0, duration: 0.42, stagger: 0.09 }, 3.95);
      moveTo(tl, 4.3, AT.pub, 0.75);
      press(tl, 5.2);

      // 4 live, and shopping. Nothing is redrawn: the pill turns over and the
      // button leaves. The card holds its place, because publishing is not a move.
      tl.addLabel("4 live, and shopping", 5.55);
      // One pill that turns over, not two stacked. Two right-aligned pills of
      // different widths show the wider one's edge whenever both have opacity,
      // and a timeline paused mid-fade (the tile scrolling out of view) does
      // exactly that. A single element cannot overlap itself.
      // The label is derived from a tweened value rather than written by a set:
      // gsap reverts a colour on rewind but not innerText, so a set would leave
      // the pill reading LIVE on every later loop.
      const pill = q(".sh-pill-state");
      tl.to(q(".sh-pill-state"), { autoAlpha: 0, duration: 0.18 }, 5.55);
      tl.to({ on: 0 }, {
        on: 1, duration: 0.2, ease: "none",
        onUpdate() {
          const live = (this.targets()[0] as { on: number }).on > 0.5;
          pill.textContent = live ? "LIVE" : "DRAFT";
          pill.style.backgroundColor = live ? "#D8F1CC" : "#F2F2F2";
        },
      }, 5.64);
      tl.fromTo(q(".sh-pill-state"), { autoAlpha: 0, scale: 0.8 },
        { autoAlpha: 1, scale: 1, duration: 0.42, ease: "back.out(2)" }, 5.75);
      tl.to(q(".sh-btn-publish"),
        { height: 0, marginTop: -16, autoAlpha: 0, duration: 0.45, ease: "power2.inOut" }, 5.7);
      tl.to(card, { height: H.live, y: midY(H.live), duration: 0.55, ease: "power3.inOut" }, 5.7);
      moveTo(tl, 5.7, AT.off, 0.8);

      tl.fromTo(q(".sh-presence"), { autoAlpha: 0, y: 6, scale: 0.92 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(1.6)" }, 6.35);
      tl.fromTo(q(".sh-vis-sarah"),
        { autoAlpha: 0, x: VIS.sarah[0] - 14, y: VIS.sarah[1] + 10 },
        { autoAlpha: 1, x: VIS.sarah[0], y: VIS.sarah[1], duration: 0.5, ease: "power2.out" }, 6.75);
      tl.fromTo(q(".sh-vis-daniel"),
        { autoAlpha: 0, x: VIS.daniel[0] + 12, y: VIS.daniel[1] + 12 },
        { autoAlpha: 1, x: VIS.daniel[0], y: VIS.daniel[1], duration: 0.5, ease: "power2.out" }, 7.05);
      // they are shopping, so they do not stand still
      tl.to(q(".sh-vis-sarah"),
        { x: VIS.sarah[0] + 16, y: VIS.sarah[1] - 22, duration: 1.1, ease: "sine.inOut" }, 7.55);
      tl.to(q(".sh-vis-daniel"),
        { x: VIS.daniel[0] - 20, y: VIS.daniel[1] + 16, duration: 1.2, ease: "sine.inOut" }, 7.8);
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

  // Only the active card animates, and it starts from the top each time.
  useEffect(() => {
    activeRef.current = cardActive;
    if (cardActive) restartRef.current = true;
    applyPlayState();
  }, [cardActive, applyPlayState]);

  return (
    <div ref={scope} className="relative h-full w-full overflow-hidden">
      <style>{CSS}</style>

      <div ref={stageRef} className="sh-stage">
        <div className="sh-plate" />

        <div className="sh-card">
          {/* 1 template or your own */}
          <section className="sh-pane sh-pane-build">
            <div className="sh-hd">
              <h3 className="sh-title">Branded Shop</h3>
              <span className="sh-pillwrap"><span className="sh-pill sh-pill-draft">DRAFT</span></span>
            </div>
            <div className="sh-lab">CHOOSE HOW TO BUILD</div>
            <div className="sh-choices">
              <div className="sh-choice sh-on">
                <span className="sh-thumbA">
                  <span className="sh-g">
                    <i className="sh-bar" />
                    <span className="sh-cells"><i /><i /><i /></span>
                  </span>
                </span>
                <span className="sh-cn">Template</span>
                <span className="sh-cs">Prebuilt</span>
              </div>
              <div className="sh-choice">
                <span className="sh-thumbB">
                  <span className="sh-box">
                    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                      <path d="M 0 5 L 10 5 M 5 0 L 5 10" stroke="#86868B" strokeWidth="1.4" />
                    </svg>
                  </span>
                </span>
                <span className="sh-cn">Your own</span>
                <span className="sh-cs">From blank</span>
              </div>
            </div>
            <div className="sh-btn">BROWSE TEMPLATES</div>
          </section>

          {/* 2 template gallery */}
          <section className="sh-pane sh-pane-gallery">
            <div className="sh-hd">
              <h3 className="sh-title">Branded Shop</h3>
              <span className="sh-pillwrap"><span className="sh-pill sh-pill-draft">DRAFT</span></span>
            </div>
            <div className="sh-lab">SHOP TEMPLATES</div>
            <div className="sh-tpls">
              <div className="sh-tpl sh-on">
                <span className="sh-th" style={{ backgroundImage: `url(/motion/loop-tpl-arcade.jpg)` }} />
                <span className="sh-tn">Arcade</span>
              </div>
              <div className="sh-tpl">
                <span className="sh-th" style={{ backgroundImage: `url(/motion/loop-tpl-holiday.jpg)` }} />
                <span className="sh-tn">Holiday</span>
              </div>
              <div className="sh-tpl">
                <span className="sh-th" style={{ backgroundImage: `url(/motion/loop-tpl-welcome.jpg)` }} />
                <span className="sh-tn sh-mid">Welcome</span>
              </div>
            </div>
            <div className="sh-btn">USE TEMPLATE</div>
          </section>

          {/* 3 pick and publish, and 4 live: one shop */}
          <section className="sh-pane sh-pane-shop">
            <div className="sh-hd">
              <h3 className="sh-title">Branded Shop</h3>
              <span className="sh-pillwrap">
                <span className="sh-pill sh-pill-state">DRAFT</span>
              </span>
            </div>
            <div className="sh-banner">
              <span className="sh-bn">Arcade</span>
              <span className="sh-bs">SWAG SHOP</span>
            </div>
            <div className="sh-shelf">
              <div className="sh-prod">
                <span className="sh-ph" style={{ backgroundImage: `url(/motion/loop-shop-hoodie.jpg)` }} />
                <span className="sh-mt"><span className="sh-pn">Hoodie</span><span className="sh-pp">250 PTS</span></span>
              </div>
              <div className="sh-prod">
                <span className="sh-ph" style={{ backgroundImage: `url(/motion/loop-shop-bottle.jpg)` }} />
                <span className="sh-mt"><span className="sh-pn">Bottle</span><span className="sh-pp">120 PTS</span></span>
              </div>
              <div className="sh-prod">
                <span className="sh-ph" style={{ backgroundImage: `url(/motion/loop-shop-cap.jpg)` }} />
                <span className="sh-mt"><span className="sh-pn">Cap</span><span className="sh-pp">75 PTS</span></span>
              </div>
            </div>
            <div className="sh-btn sh-btn-publish">PUBLISH SHOP</div>
          </section>
        </div>

        {/* the shop is live: other people are in it */}
        <div className="sh-presence">
          <span className="sh-avs">
            <i style={{ backgroundImage: `url(/motion/loop-sarah.png)` }} />
            <i style={{ backgroundImage: `url(/motion/loop-daniel.png)` }} />
          </span>
          <span className="sh-pt">24 browsing</span>
        </div>

        <div className="sh-visitor sh-vis-sarah">
          <svg width="19" height="23.02" viewBox="0 0 26 31.51" aria-hidden="true">
            <defs><clipPath id={clipS}><path d={CURSOR_PATH} /></clipPath></defs>
            <path clipPath={`url(#${clipS})`} d={CURSOR_PATH}
              fill="#7A3FD0" stroke="#ffffff" strokeWidth="3.316" strokeLinejoin="miter" />
          </svg>
          <span className="sh-nm">Sarah</span>
        </div>

        <div className="sh-visitor sh-vis-daniel">
          <svg width="19" height="23.02" viewBox="0 0 26 31.51" aria-hidden="true">
            <defs><clipPath id={clipD}><path d={CURSOR_PATH} /></clipPath></defs>
            <path clipPath={`url(#${clipD})`} d={CURSOR_PATH}
              fill="#1D1D1F" stroke="#ffffff" strokeWidth="3.316" strokeLinejoin="miter" />
          </svg>
          <span className="sh-nm">Daniel</span>
        </div>

        <div className="sh-ripple" />
        <svg className="sh-cursor" width="26" height="31.51" viewBox="0 0 26 31.51" aria-hidden="true">
          <defs><clipPath id={clipId}><path d={CURSOR_PATH} /></clipPath></defs>
          <path clipPath={`url(#${clipId})`} d={CURSOR_PATH}
            fill="#181818" stroke="#ffffff" strokeWidth="3.316" strokeLinejoin="miter" />
        </svg>
      </div>
    </div>
  );
}

const CSS = `
.sh-stage{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
  transform-origin:50% 50%;width:312px;height:340px;border-radius:9px;overflow:hidden;
  background:#F2F2F2;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
.sh-stage *,.sh-stage *::before,.sh-stage *::after{box-sizing:border-box}
.sh-plate{position:absolute;left:0;top:0;width:312px;height:340px;
  background:linear-gradient(124.96deg,#0B2952 0%,#5D8FDC 55%,#AFCCF6 100%);transform-origin:50% 50%}
.sh-card{position:absolute;left:42px;top:170px;width:229px;height:250px;background:#fff;
  border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,.06);overflow:hidden}
.sh-pane{position:absolute;top:0;left:0;width:229px;padding:16px;display:flex;
  flex-direction:column;gap:16px;margin:0}

.sh-hd{height:24px;flex:none;display:flex;align-items:center;justify-content:space-between}
.sh-title{font-family:var(--font-display),'Satoshi',sans-serif;font-weight:700;font-size:18px;
  line-height:24px;color:#1D1D1F;margin:0;padding:0;letter-spacing:0}
.sh-pillwrap{position:relative;height:19px;width:51px;flex:none;display:block}
.sh-pill{position:absolute;right:0;top:0;height:19px;border-radius:8px;padding:4px 9px 3px;
  background:#F2F2F2;font-family:var(--font-sans),'Overpass',sans-serif;font-weight:700;
  font-size:9px;line-height:12px;letter-spacing:.75px;color:#1D1D1F;white-space:nowrap}
.sh-pill.sh-live{background:#D8F1CC}

.sh-lab{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:700;font-size:10px;
  line-height:14px;letter-spacing:1px;color:#6E6E73;flex:none}

/* 1 template or your own */
.sh-choices{display:flex;gap:9px;width:197px;flex:none}
/* Figma strokes are INSIDE: they paint over the padding and take no layout
   space. A CSS border would, and would push everything below it down. */
.sh-choice{width:94px;height:100px;border-radius:8px;padding:12px 9px;display:flex;
  flex-direction:column;align-items:center;justify-content:center;gap:8px;background:#fff;
  box-shadow:inset 0 0 0 1px #ECECEC}
.sh-choice.sh-on{background:#F2F2F2;box-shadow:inset 0 0 0 1.4px #1D1D1F}
.sh-cn{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:600;font-size:10px;
  line-height:13px;letter-spacing:.19px;color:#1D1D1F;text-align:center}
.sh-cs{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:400;font-size:10px;
  line-height:13px;letter-spacing:.19px;color:#6E6E73;text-align:center}
.sh-thumbA{width:60px;height:34px;background:#fff;border-radius:6px;padding:6px 12px;
  display:flex;flex-direction:column;flex:none}
.sh-g{width:36px;display:flex;flex-direction:column;gap:3px}
.sh-bar{height:7px;border-radius:2px;background:#F2F2F2;display:block}
.sh-cells{display:flex;gap:3px}
.sh-cells i{width:10px;height:8px;border-radius:2px;background:#F2F2F2;display:block}
.sh-thumbB{width:76px;height:34px;background:#fff;border-radius:6px;flex:none;
  display:flex;align-items:center;justify-content:center}
.sh-box{width:40px;height:26px;border:1px solid #D2D2D7;border-radius:3px;
  display:flex;align-items:center;justify-content:center}

/* 2 template gallery */
.sh-tpls{display:flex;gap:9px;width:197px;flex:none}
.sh-tpl{flex:1;border-radius:8px;padding:6px;display:flex;flex-direction:column;gap:6px;
  background:#fff;box-shadow:inset 0 0 0 1px #D2D2D7}
.sh-tpl.sh-on{background:#F2F2F2;box-shadow:inset 0 0 0 1px #1D1D1F}
.sh-th{height:32px;border-radius:6px;background-size:cover;background-position:center;display:block}
.sh-tn{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:400;font-size:10px;
  line-height:13px;letter-spacing:.19px;color:#6E6E73}
.sh-tpl.sh-on .sh-tn{color:#1D1D1F}
.sh-mid{text-align:center}

/* 3/4 the shop itself */
.sh-banner{height:72px;flex:none;border-radius:8px;position:relative;overflow:hidden;
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px}
.sh-banner::before{content:"";position:absolute;inset:0;
  background:url(/motion/loop-shop-banner.jpg) center/cover no-repeat}
.sh-banner::after{content:"";position:absolute;inset:0;background:#0D0F12;opacity:.45}
.sh-bn,.sh-bs{position:relative;z-index:1;color:#fff;text-align:center;width:197px}
.sh-bn{font-family:var(--font-display),'Satoshi',sans-serif;font-weight:700;font-size:18px;line-height:24px}
.sh-bs{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:700;font-size:9px;
  line-height:12px;letter-spacing:1.16px}
.sh-shelf{display:flex;gap:6px;width:197px;flex:none}
.sh-prod{flex:1;display:flex;flex-direction:column;gap:6px}
.sh-ph{height:56px;border-radius:6px;background-size:cover;background-position:center;display:block}
.sh-mt{display:flex;flex-direction:column;gap:2px}
.sh-pn{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:600;font-size:12px;
  line-height:16px;letter-spacing:.19px;color:#1D1D1F}
.sh-pp{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:700;font-size:10px;
  line-height:14px;letter-spacing:.76px;color:#6E6E73}

.sh-btn{width:197px;height:32px;flex:none;border-radius:24px;background:#2C2D2E;color:#F8F8F8;
  font-family:var(--font-sans),'Overpass',sans-serif;font-weight:600;font-size:12px;
  line-height:16px;letter-spacing:1.16px;display:flex;align-items:center;justify-content:center;
  overflow:hidden}

/* presence, on the live frame */
.sh-presence{position:absolute;left:196px;top:106px;height:24px;border-radius:999px;background:#fff;
  box-shadow:0 2px 8px rgba(0,0,0,.06);padding:4px 9px 4px 5px;display:flex;align-items:center;
  gap:6px;white-space:nowrap}
.sh-avs{display:flex;align-items:center}
.sh-avs i{width:16px;height:16px;border-radius:50%;display:block;border:1.4px solid #fff;
  background-size:cover;background-position:center}
.sh-avs i+i{margin-left:-5px}
.sh-pt{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:700;font-size:7.5px;
  line-height:10px;letter-spacing:.2px;color:#1D1D1F}

.sh-visitor{position:absolute;left:0;top:0}
.sh-visitor svg{filter:drop-shadow(1.21px 3.64px 2.42px rgba(0,0,0,.25))}
.sh-nm{position:absolute;height:16px;border-radius:999px;padding:3px 8px 3px 7px;
  box-shadow:0 2px 8px rgba(0,0,0,.06);color:#fff;white-space:nowrap;
  font-family:var(--font-sans),'Overpass',sans-serif;font-weight:700;font-size:7.5px;
  line-height:10px;letter-spacing:.2px}
.sh-vis-sarah .sh-nm{background:#7A3FD0;left:19px;top:15px}
.sh-vis-daniel .sh-nm{background:#1D1D1F;left:20px;top:13px}

/* the operator's cursor */
.sh-ripple{position:absolute;top:0;left:0;width:26px;height:26px;border-radius:50%;
  background:#181818;opacity:0}
.sh-cursor{position:absolute;top:0;left:0;filter:drop-shadow(1.66px 4.97px 3.32px rgba(0,0,0,.25))}
`;
