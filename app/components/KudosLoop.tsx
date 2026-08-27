"use client";

import gsap from "gsap";
import { useCallback, useEffect, useId, useLayoutEffect, useRef } from "react";
import { useCardActive } from "@/app/components/common/cardActive";

// ─────────────────────────────────────────────────────────────
// Stadium — "Kudos Programs" auto-looping animation
//
// The four states of "09 Kudos Programs" on the Imagery System board, played as
// one continuous card. Geometry, type, colour and the cursor vector path are
// measured off the Figma frames, not eyeballed. Each state was diffed against a
// Figma export: average mean pixel delta 1.39.
//
// Three things the board cannot draw, and one it gets wrong:
//
//  - The name types a character at a time, and NEXT only goes black once the
//    field has something in it.
//  - The monthly cost is computed, not written: headcount x allowance at the
//    programme's rate. Change the allowance and the figure follows, so it
//    cannot go stale the way a typed number does.
//  - The +50 KUDOS chip lands last, so a kudo reads as an event rather than as
//    a state that was always there. It is the only frame that shows what a
//    kudo is, which is why it closes the row.
//  - The #CRAFT chip is the same grey as the panel it sits on, which is how the
//    board draws it. Reproduced rather than corrected.
//
// Figma: Imagery System (F7rDHYd3n5nwRtrlv1F6dO), TAB 2 ASSEMBLY / 09 Kudos.
// ─────────────────────────────────────────────────────────────

const TILE_W = 312;
const TILE_H = 340;

const SEQ = 11.6;
const LOOP_PAUSE = 1.2;

/** Card heights, straight out of the Figma frames. */
const H = { name: 178, who: 277, allow: 286, live: 181 };

/**
 * The board places a card at floor((340 - h) / 2). On an odd height that is not
 * the same as -floor(h / 2), which put the 277 and 181 cards a pixel low.
 */
const midY = (h: number) => Math.floor((TILE_H - h) / 2) - 170;

/** The tip sits at the centre of the button it presses, which is the board's rule. */
const AT = {
  nameBtn: [180, 227],
  engineering: [180, 187],
  whoBtn: [180, 276],
  allowBtn: [180, 281],
  off: [300, 372],
} as const;

/** The cost is arithmetic, not a string: headcount x allowance at the rate. */
const HEADCOUNT = 148;
const ALLOWANCE = 100;
const KUDOS_PER_DOLLAR = 50;
const monthlyCost = (people: number, each: number) =>
  `$${Math.round((people * each) / KUDOS_PER_DOLLAR)} a month`;

const NAME = "Team Kudos";

const CURSOR_PATH =
  "M 3.517744918677711 0.4632220180675262 C 2.0861227443626604 -0.6503909256464298 0 0.3698216042463711 0 2.1835747248015087 L 0 26.897803210796148 C 0 28.964295431870166 2.6074537145937384 29.870546862504835 3.889181774689332 28.2495520949281 L 9.978796515347982 20.548227879783475 C 10.43359339409915 19.973265843402263 11.126394590038597 19.637761977178336 11.859445763373602 19.637761977178336 L 21.816155402149448 19.637761977178336 C 23.891366004515344 19.637761977178336 24.79238904164448 17.012000526346874 23.154393696946684 15.737988132861453 L 3.517744918677711 0.4632220180675262 Z";

export default function KudosLoop() {
  const scope = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const reducedRef = useRef(false);
  const visibleRef = useRef(true);
  const cardActive = useCardActive();
  const activeRef = useRef(cardActive);
  const restartRef = useRef(cardActive);

  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const clipId = `kd-cur-${uid}`;

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
      const card = q(".kd-card");
      const cursor = q(".kd-cursor");
      const ripple = q(".kd-ripple");

      const PANE = {
        name: q(".kd-pane-name"),
        who: q(".kd-pane-who"),
        allow: q(".kd-pane-allow"),
        live: q(".kd-pane-live"),
      };

      // the figures are computed here so they cannot drift from each other
      q(".kd-headcount").textContent = `${HEADCOUNT} people`;
      q(".kd-cost").textContent = monthlyCost(HEADCOUNT, ALLOWANCE);
      q(".kd-amt").textContent = String(ALLOWANCE);

      gsap.set(card, { y: midY(H.name), height: H.name });
      gsap.set(PANE.name, { autoAlpha: 1 });
      gsap.set([PANE.who, PANE.allow, PANE.live], { autoAlpha: 0 });
      gsap.set(cursor, { x: AT.off[0], y: AT.off[1], transformOrigin: "0px 0px" });
      gsap.set(ripple, { x: AT.off[0] - 9, y: AT.off[1] - 9, scale: 0.3, opacity: 0 });
      gsap.set(q(".kd-btn-name"), { opacity: 0.4 }); // nothing typed yet
      q(".kd-typed").textContent = "";

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

      tl.to(q(".kd-plate"),
        { x: -10, y: 8, scale: 1.08, duration: SEQ / 2, repeat: 1, yoyo: true, ease: "sine.inOut" }, 0);

      const blink = gsap.to(q(".kd-caret"),
        { opacity: 0, duration: 0.5, repeat: -1, yoyo: true, ease: "steps(1)" });

      // 1 name it
      tl.addLabel("1 name it", 0);
      tl.from(root.querySelectorAll(".kd-pane-name .kd-hd, .kd-pane-name .kd-lab, .kd-pane-name .kd-input, .kd-pane-name .kd-btn"),
        { y: 8, autoAlpha: 0, duration: 0.45, stagger: 0.09 }, 0.15);
      tl.to({ i: 0 }, {
        i: NAME.length, duration: 1.15, ease: "none",
        onUpdate() {
          const t = this.targets()[0] as { i: number };
          q(".kd-typed").textContent = NAME.slice(0, Math.round(t.i));
        },
      }, 0.85);
      tl.to(q(".kd-btn-name"), { opacity: 1, duration: 0.3 }, 2.05);
      moveTo(tl, 2.2, AT.nameBtn, 0.6);
      press(tl, 2.9);
      tl.set(q(".kd-caret"), { opacity: 0 }, 2.9);
      tl.call(() => blink.pause(), undefined, 2.9);

      // 2 who is in
      tl.addLabel("2 who is in", 3.25);
      swap(tl, PANE.name, PANE.who, H.who, 3.25, 0.6);
      tl.from(root.querySelectorAll(".kd-pane-who .kd-srcbar, .kd-pane-who .kd-lab, .kd-pane-who .kd-aud"),
        { y: 8, autoAlpha: 0, duration: 0.42, stagger: 0.08 }, 3.55);
      moveTo(tl, 4.0, AT.engineering, 0.6);
      press(tl, 4.7);
      tl.to(q(".kd-a-eng"), { backgroundColor: "#F2F2F2", boxShadow: "inset 0 0 0 1.4px #1D1D1F", duration: 0.28 }, 4.74);
      tl.to(q(".kd-r-eng"), { boxShadow: "inset 0 0 0 1.4px #1D1D1F", duration: 0.28 }, 4.74);
      tl.to(q(".kd-d-eng"), { scale: 1, duration: 0.34, ease: "back.out(2.4)" }, 4.78);
      moveTo(tl, 5.1, AT.whoBtn, 0.55);
      press(tl, 5.75);

      // 3 the allowance
      tl.addLabel("3 the allowance", 6.1);
      swap(tl, PANE.who, PANE.allow, H.allow, 6.1, 0.6);
      tl.from(root.querySelectorAll(".kd-pane-allow .kd-freq, .kd-pane-allow .kd-lab, .kd-pane-allow .kd-amount, .kd-pane-allow .kd-total"),
        { y: 8, autoAlpha: 0, duration: 0.42, stagger: 0.08 }, 6.4);
      // the cost counts up, because it is derived from the allowance
      tl.fromTo({ v: 0 }, { v: 0 }, {
        v: 1, duration: 0.7, ease: "power2.out",
        onUpdate() {
          const t = this.targets()[0] as { v: number };
          q(".kd-cost").textContent = monthlyCost(HEADCOUNT, Math.round(ALLOWANCE * t.v));
        },
      }, 6.75);
      moveTo(tl, 7.2, AT.allowBtn, 0.6);
      press(tl, 7.95);

      // 4 live
      tl.addLabel("4 live", 8.3);
      swap(tl, PANE.allow, PANE.live, H.live, 8.3, 0.6);
      moveTo(tl, 8.35, AT.off, 0.7);
      tl.from(q(".kd-kudo"), { y: 10, autoAlpha: 0, duration: 0.5, ease: "power2.out" }, 8.7);
      tl.from(q(".kd-chip-tag"), { scale: 0.8, autoAlpha: 0, duration: 0.36, ease: "back.out(2.4)" }, 9.05);
      tl.from(q(".kd-chip-amt"), { scale: 0.8, autoAlpha: 0, duration: 0.4, ease: "back.out(2.8)" }, 9.2);
      tl.from(q(".kd-pane-live .kd-btn"), { y: 8, autoAlpha: 0, duration: 0.4 }, 9.35);
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

      <div ref={stageRef} className="kd-stage">
        <div className="kd-plate" />

        <div className="kd-card">
          {/* 1 name it */}
          <section className="kd-pane kd-pane-name">
            <div className="kd-hd">
              <h3 className="kd-title">Kudos Program</h3>
              <span className="kd-pillwrap"><span className="kd-pill">DRAFT</span></span>
            </div>
            <div className="kd-lab">PROGRAM NAME</div>
            <div className="kd-input"><span className="kd-typed" /><i className="kd-caret" /></div>
            <div className="kd-btn kd-btn-name">NEXT</div>
          </section>

          {/* 2 who is in */}
          <section className="kd-pane kd-pane-who">
            <div className="kd-hd">
              <h3 className="kd-title">Kudos Program</h3>
              <span className="kd-pillwrap"><span className="kd-pill">DRAFT</span></span>
            </div>
            <div className="kd-srcbar">
              <span className="kd-nm">Workday</span>
              <span className="kd-pill kd-green kd-static">CONNECTED</span>
            </div>
            <div className="kd-lab">PEOPLE</div>
            <div className="kd-auds">
              <div className="kd-aud kd-a-eng">
                <span className="kd-nm">Engineering</span>
                <span className="kd-radio kd-r-eng"><i className="kd-d-eng" /></span>
              </div>
              <div className="kd-aud">
                <span className="kd-nm">Everyone</span>
                <span className="kd-radio"><i style={{ transform: "scale(0)" }} /></span>
              </div>
            </div>
            <div className="kd-btn kd-btn-who">NEXT</div>
          </section>

          {/* 3 the allowance */}
          <section className="kd-pane kd-pane-allow">
            <div className="kd-hd">
              <h3 className="kd-title">Kudos Program</h3>
              <span className="kd-pillwrap"><span className="kd-pill">DRAFT</span></span>
            </div>
            <div className="kd-freq">
              <span className="kd-seg kd-on">Monthly</span>
              <span className="kd-seg kd-off">Quarterly</span>
            </div>
            <div className="kd-lab">ALLOWANCE</div>
            <div className="kd-amount">
              <span className="kd-big kd-amt">100</span>
              <span className="kd-sp" />
              <span className="kd-unit">kudos each</span>
            </div>
            <div className="kd-total">
              <span className="kd-l kd-headcount">148 people</span>
              <span className="kd-r kd-cost">$296 a month</span>
            </div>
            <div className="kd-btn kd-btn-allow">REVIEW PROGRAM</div>
          </section>

          {/* 4 live */}
          <section className="kd-pane kd-pane-live">
            <div className="kd-hd">
              <h3 className="kd-title">Kudos Program</h3>
              <span className="kd-pillwrap"><span className="kd-pill kd-green">LIVE</span></span>
            </div>
            <div className="kd-kudo">
              <span className="kd-av" />
              <span className="kd-body">
                <span className="kd-who">Sarah thanked Daniel</span>
                <span className="kd-chips">
                  <span className="kd-chip kd-chip-tag">#CRAFT</span>
                  <span className="kd-chip kd-chip-amt">+50 KUDOS</span>
                </span>
              </span>
            </div>
            <div className="kd-btn">DONE</div>
          </section>
        </div>

        <div className="kd-ripple" />
        <svg className="kd-cursor" width="24" height="29.08" viewBox="0 0 24 29.08" aria-hidden="true">
          <defs><clipPath id={clipId}><path d={CURSOR_PATH} /></clipPath></defs>
          <path clipPath={`url(#${clipId})`} d={CURSOR_PATH}
            fill="#181818" stroke="#ffffff" strokeWidth="3.06" strokeLinejoin="miter" />
        </svg>
      </div>
    </div>
  );
}

const CSS = `
.kd-stage{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
  transform-origin:50% 50%;width:312px;height:340px;border-radius:9px;overflow:hidden;
  background:#F2F2F2;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
.kd-stage *,.kd-stage *::before,.kd-stage *::after{box-sizing:border-box}
.kd-plate{position:absolute;left:0;top:0;width:312px;height:340px;
  background:linear-gradient(124.96deg,#0B2952 0%,#5D8FDC 55%,#AFCCF6 100%);transform-origin:50% 50%}
.kd-card{position:absolute;left:42px;top:170px;width:229px;height:178px;background:#fff;
  border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,.06);overflow:hidden}
.kd-pane{position:absolute;top:0;left:0;width:229px;padding:16px;display:flex;
  flex-direction:column;margin:0}
.kd-pane-name{gap:14px}
.kd-pane-who{gap:16px}
.kd-pane-allow{gap:14px}
.kd-pane-live{gap:14px}

.kd-hd{height:24px;flex:none;display:flex;align-items:center;justify-content:space-between}
.kd-title{font-family:var(--font-display),'Satoshi',sans-serif;font-weight:700;font-size:18px;
  line-height:24px;color:#1D1D1F;margin:0;padding:0;letter-spacing:0}
.kd-pillwrap{position:relative;height:19px;width:51px;flex:none;display:block}
.kd-pill{position:absolute;right:0;top:0;height:19px;border-radius:8px;padding:4px 9px 3px;
  background:#F2F2F2;font-family:var(--font-sans),'Overpass',sans-serif;font-weight:700;
  font-size:9px;line-height:12px;letter-spacing:.75px;color:#1D1D1F;white-space:nowrap}
.kd-green{background:#D8F1CC}
.kd-static{position:static}
.kd-lab{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:700;font-size:10px;
  line-height:14px;letter-spacing:1px;color:#6E6E73;flex:none}

.kd-input{height:34px;flex:none;border-radius:8px;background:#fff;box-shadow:inset 0 0 0 1px #1D1D1F;
  padding:9px 12px;display:flex;align-items:center}
.kd-typed{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:400;font-size:12px;
  line-height:16px;letter-spacing:.19px;color:#1D1D1F}
.kd-caret{width:1.4px;height:16px;background:#1D1D1F;display:inline-block;margin-left:1px}

.kd-srcbar{height:37px;flex:none;border-radius:8px;background:#F2F2F2;padding:9px 12px;
  display:flex;align-items:center;justify-content:space-between}
.kd-nm{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:600;font-size:12px;
  line-height:16px;letter-spacing:.19px;color:#1D1D1F}
.kd-auds{display:flex;flex-direction:column;gap:6px;flex:none}
/* Figma strokes are INSIDE and take no layout space; a CSS border would */
.kd-aud{height:34px;border-radius:8px;background:#fff;box-shadow:inset 0 0 0 1px #ECECEC;
  padding:9px 12px;display:flex;align-items:center;justify-content:space-between}
.kd-radio{width:14px;height:14px;border-radius:50%;background:#fff;flex:none;
  box-shadow:inset 0 0 0 1.4px #86868B;display:flex;align-items:center;justify-content:center}
.kd-radio i{width:6px;height:6px;border-radius:50%;background:#2C2D2E;display:block}

.kd-freq{height:38px;flex:none;border-radius:100px;background:#F4F5F7;padding:4px;
  display:flex;align-items:center;gap:4px}
.kd-seg{flex:1;height:30px;border-radius:100px;display:flex;align-items:center;justify-content:center;
  font-family:var(--font-sans),'Overpass',sans-serif;font-size:12px;line-height:14px;letter-spacing:.19px}
.kd-on{background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.06);font-weight:600;color:#2C2D2E}
.kd-off{font-weight:400;color:#86868B}
.kd-amount{height:42px;flex:none;border-radius:8px;background:#fff;box-shadow:inset 0 0 0 1px #1D1D1F;
  padding:9px 12px;display:flex;align-items:center;gap:9px}
.kd-big{font-family:var(--font-display),'Satoshi',sans-serif;font-weight:700;font-size:18px;
  line-height:24px;color:#1D1D1F}
.kd-sp{flex:1;height:1px;background:transparent}
.kd-unit{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:400;font-size:10px;
  line-height:14px;letter-spacing:.19px;color:#6E6E73;white-space:nowrap}
.kd-total{height:34px;flex:none;border-radius:8px;background:#F2F2F2;padding:9px 12px;
  display:flex;align-items:center;justify-content:space-between;gap:9px}
.kd-l{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:400;font-size:10px;
  line-height:14px;letter-spacing:.19px;color:#6E6E73;white-space:nowrap}
.kd-r{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:600;font-size:12px;
  line-height:16px;letter-spacing:.19px;color:#1D1D1F;white-space:nowrap}

.kd-kudo{height:65px;flex:none;border-radius:8px;background:#F2F2F2;padding:12px;
  display:flex;align-items:center;gap:10px}
.kd-av{width:28px;height:28px;border-radius:50%;flex:none;display:block;
  background:url(/motion/loop-sarah.png) center/cover no-repeat}
.kd-body{display:flex;flex-direction:column;gap:6px}
.kd-who{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:600;font-size:12px;
  line-height:16px;letter-spacing:.19px;color:#1D1D1F;white-space:nowrap}
.kd-chips{display:flex;gap:6px}
.kd-chip{height:19px;border-radius:8px;padding:4px 9px 3px;background:#F2F2F2;
  font-family:var(--font-sans),'Overpass',sans-serif;font-weight:700;font-size:9px;
  line-height:12px;letter-spacing:.75px;color:#1D1D1F;white-space:nowrap}
.kd-chip-amt{background:#D8F1CC}

.kd-btn{width:197px;height:32px;flex:none;border-radius:24px;background:#2C2D2E;color:#F8F8F8;
  font-family:var(--font-sans),'Overpass',sans-serif;font-weight:600;font-size:12px;
  line-height:16px;letter-spacing:1.16px;display:flex;align-items:center;justify-content:center;
  overflow:hidden}

.kd-ripple{position:absolute;top:0;left:0;width:26px;height:26px;border-radius:50%;
  background:#181818;opacity:0}
.kd-cursor{position:absolute;top:0;left:0;filter:drop-shadow(1.53px 4.59px 3.06px rgba(0,0,0,.25))}
`;
