"use client";

import gsap from "gsap";
import { useCallback, useEffect, useId, useLayoutEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────
// Stadium — "Automations" auto-looping animation
//
// The five states of "10 Automations" on the Imagery System board, played as
// one continuous card. Geometry, type, colour and the cursor vector path are
// measured off the Figma frames, not eyeballed. Each state was diffed against a
// Figma export: average mean pixel delta 1.58.
//
// The steps are the live builder's, from docs/references/shops-and-automations-as-built.md:
// Details, Gift type, Message, Checkout. Two departures, both deliberate:
//
//  - Their Recipients step is folded into Details as one row. For a work
//    anniversary the trigger already picks the people, so the step had no
//    choice in it and spent a beat saying "Everyone".
//  - "$0.00 you pay today / Charged as each gift is sent" is their own checkout
//    line, and what N19 requires of every commitment. It is the most
//    informative thing in either product and our row did not have it.
//
// The message types out rather than appearing, because somebody writes it.
//
// Figma: Imagery System (F7rDHYd3n5nwRtrlv1F6dO), TAB 2 ASSEMBLY / 10 Automations.
// ─────────────────────────────────────────────────────────────

const TILE_W = 312;
const TILE_H = 340;

const SEQ = 12.7;
const LOOP_PAUSE = 1.2;

/** Card heights, straight out of the Figma frames. */
const H = { details: 220, gift: 312, message: 208, checkout: 230, active: 234 };

/**
 * The board places a card at floor((340 - h) / 2). On an odd height that is not
 * the same as -floor(h / 2).
 */
const midY = (h: number) => Math.floor((TILE_H - h) / 2) - 170;

/** The tip sits at the centre of the button it presses. */
const AT = {
  details: [180, 248],
  gift: [180, 294],
  message: [180, 242],
  activate: [180, 253],
  off: [300, 372],
} as const;

const MSG = "Happy work anniversary. Pick something you love.";
const AMT = "$50";

const CURSOR_PATH =
  "M 3.517744918677711 0.4632220180675262 C 2.0861227443626604 -0.6503909256464298 0 0.3698216042463711 0 2.1835747248015087 L 0 26.897803210796148 C 0 28.964295431870166 2.6074537145937384 29.870546862504835 3.889181774689332 28.2495520949281 L 9.978796515347982 20.548227879783475 C 10.43359339409915 19.973265843402263 11.126394590038597 19.637761977178336 11.859445763373602 19.637761977178336 L 21.816155402149448 19.637761977178336 C 23.891366004515344 19.637761977178336 24.79238904164448 17.012000526346874 23.154393696946684 15.737988132861453 L 3.517744918677711 0.4632220180675262 Z";

/** Declared at module scope: a component created during render resets its state. */
const Head = ({ live }: { live?: boolean }) => (
  <div className="au-hd">
    <h3 className="au-title">Anniversary gift</h3>
    <span className={`au-pill${live ? " au-green" : ""}`}>{live ? "ACTIVE" : "DRAFT"}</span>
  </div>
);

const DETAILS: [string, string][] = [
  ["Who", "Everyone"],
  ["Trigger date", "Employee start date"],
  ["Invite timing", "7 days before"],
];

export default function AutomationsLoop() {
  const scope = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const reducedRef = useRef(false);
  const visibleRef = useRef(true);

  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const clipId = `au-cur-${uid}`;

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
      const card = q(".au-card");
      const cursor = q(".au-cursor");
      const ripple = q(".au-ripple");

      const PANE = {
        details: q(".au-pane-details"),
        gift: q(".au-pane-gift"),
        message: q(".au-pane-message"),
        checkout: q(".au-pane-checkout"),
        active: q(".au-pane-active"),
      };

      gsap.set(card, { y: midY(H.details), height: H.details });
      gsap.set(PANE.details, { autoAlpha: 1 });
      gsap.set([PANE.gift, PANE.message, PANE.checkout, PANE.active], { autoAlpha: 0 });
      gsap.set(cursor, { x: AT.off[0], y: AT.off[1], transformOrigin: "0px 0px" });
      gsap.set(ripple, { x: AT.off[0] - 9, y: AT.off[1] - 9, scale: 0.3, opacity: 0 });
      q(".au-msg").textContent = "";
      q(".au-amt").textContent = "";

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

      tl.to(q(".au-plate"),
        { x: -10, y: 8, scale: 1.08, duration: SEQ / 2, repeat: 1, yoyo: true, ease: "sine.inOut" }, 0);

      // 1 details: what fires it, and who it reaches
      tl.addLabel("1 details", 0);
      tl.from(root.querySelectorAll(".au-pane-details .au-hd, .au-pane-details .au-lab, .au-pane-details .au-row, .au-pane-details .au-btn"),
        { y: 8, autoAlpha: 0, duration: 0.45, stagger: 0.08 }, 0.15);
      moveTo(tl, 0.95, AT.details, 0.7);
      press(tl, 1.75);

      // 2 the gift: a per recipient value, and the thing it draws from
      tl.addLabel("2 the gift", 2.1);
      swap(tl, PANE.details, PANE.gift, H.gift, 2.1, 0.6);
      tl.from(q(".au-photo"), { autoAlpha: 0, scale: 0.94, duration: 0.5, ease: "power2.out" }, 2.4);
      tl.from(q(".au-pane-gift .au-field"), { y: 8, autoAlpha: 0, duration: 0.42 }, 2.7);
      // the amount is written, not shown: the board draws this field with an ink
      // border, which is its focused treatment
      const acaret = gsap.to(q(".au-caret"),
        { opacity: 0, duration: 0.5, repeat: -1, yoyo: true, ease: "steps(1)" });
      tl.to({ i: 0 }, {
        i: AMT.length, duration: 0.55, ease: "none",
        onUpdate() {
          const a = this.targets()[0] as { i: number };
          q(".au-amt").textContent = AMT.slice(0, Math.round(a.i));
        },
      }, 2.95);
      tl.set(q(".au-caret"), { autoAlpha: 0 }, 3.55);
      tl.call(() => acaret.pause(), undefined, 3.55);
      moveTo(tl, 3.05, AT.gift, 0.65);
      press(tl, 3.85);

      // 3 message: typed, so it reads as somebody writing it
      tl.addLabel("3 message", 4.2);
      swap(tl, PANE.gift, PANE.message, H.message, 4.2, 0.6);
      // 47 characters is a blur at 1.5s; 2.2 reads as somebody typing
      tl.to({ i: 0 }, {
        i: MSG.length, duration: 2.2, ease: "none",
        onUpdate() {
          const t = this.targets()[0] as { i: number };
          q(".au-msg").textContent = MSG.slice(0, Math.round(t.i));
        },
      }, 4.65);
      moveTo(tl, 6.95, AT.message, 0.6);
      press(tl, 7.65);

      // 4 checkout: nothing today, and the reason why
      tl.addLabel("4 checkout", 8.0);
      swap(tl, PANE.message, PANE.checkout, H.checkout, 8.0, 0.6);
      tl.from(root.querySelectorAll(".au-pane-checkout .au-field, .au-pane-checkout .au-note, .au-pane-checkout .au-btn"),
        { y: 8, autoAlpha: 0, duration: 0.42, stagger: 0.08 }, 8.3);
      moveTo(tl, 8.7, AT.activate, 0.6);
      press(tl, 9.45);

      // 5 active: it is running, and here is what it will do next
      tl.addLabel("5 active", 9.8);
      swap(tl, PANE.checkout, PANE.active, H.active, 9.8, 0.6);
      moveTo(tl, 9.85, AT.off, 0.7);
      tl.from(q(".au-q1"), { y: 10, autoAlpha: 0, duration: 0.45, ease: "power2.out" }, 10.25);
      tl.from(q(".au-q2"), { y: 10, autoAlpha: 0, duration: 0.45, ease: "power2.out" }, 10.42);
      tl.from(q(".au-pane-active .au-btn"), { y: 8, autoAlpha: 0, duration: 0.4 }, 10.65);
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

      <div ref={stageRef} className="au-stage">
        <div className="au-plate" />

        <div className="au-card">
          {/* 1 details */}
          <section className="au-pane au-pane-details">
            <Head />
            <div className="au-lab">DETAILS</div>
            {DETAILS.map(([k, v]) => (
              <div key={k} className="au-row">
                <span className="au-k">{k}</span>
                <span className="au-rule" />
                <span className="au-v">{v}</span>
              </div>
            ))}
            <div className="au-btn au-btn-details">NEXT</div>
          </section>

          {/* 2 the gift */}
          <section className="au-pane au-pane-gift">
            <Head />
            <div className="au-photo" />
            <div className="au-field">
              <div className="au-lab">GIFT</div>
              <div className="au-amount">
                <span className="au-big"><span className="au-amt" /><i className="au-caret" /></span>
                <span className="au-gap" />
                <span className="au-unit">each</span>
              </div>
            </div>
            <div className="au-sp2" />
            <div className="au-btn au-btn-gift">NEXT</div>
          </section>

          {/* 3 message */}
          <section className="au-pane au-pane-message">
            <Head />
            <div className="au-field">
              <div className="au-lab">MESSAGE</div>
              <div className="au-message"><span className="au-msg" /></div>
            </div>
            <div className="au-sp2" />
            <div className="au-btn au-btn-message">NEXT</div>
          </section>

          {/* 4 checkout */}
          <section className="au-pane au-pane-checkout">
            <Head />
            <div className="au-field">
              <div className="au-lab">CHECKOUT</div>
              <div className="au-amount">
                <span className="au-big">$0.00</span>
                <span className="au-gap" />
                <span className="au-unit">you pay today</span>
              </div>
            </div>
            <div className="au-sp2" />
            <div className="au-note">Charged as each gift is sent.</div>
            <div className="au-btn au-btn-activate">ACTIVATE</div>
          </section>

          {/* 5 active */}
          <section className="au-pane au-pane-active">
            <Head live />
            <div className="au-lab">UPCOMING INVITES</div>
            <div className="au-queue">
              <div className="au-queued au-q1">
                <span className="au-who">
                  <span className="au-av au-av-sarah" />
                  <span className="au-nm">Sarah Johnson</span>
                </span>
                <span className="au-when">4d ago</span>
              </div>
              <div className="au-queued au-q2">
                <span className="au-who">
                  <span className="au-av au-av-daniel" />
                  <span className="au-nm">Daniel Reyes</span>
                </span>
                <span className="au-when au-when-lg">Tomorrow</span>
              </div>
            </div>
            <div className="au-btn">DONE</div>
          </section>
        </div>

        <div className="au-ripple" />
        <svg className="au-cursor" width="24" height="29.08" viewBox="0 0 24 29.08" aria-hidden="true">
          <defs><clipPath id={clipId}><path d={CURSOR_PATH} /></clipPath></defs>
          <path clipPath={`url(#${clipId})`} d={CURSOR_PATH}
            fill="#181818" stroke="#ffffff" strokeWidth="3.06" strokeLinejoin="miter" />
        </svg>
      </div>
    </div>
  );
}

const CSS = `
.au-stage{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
  transform-origin:50% 50%;width:312px;height:340px;border-radius:9px;overflow:hidden;
  background:#F2F2F2;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
.au-stage *,.au-stage *::before,.au-stage *::after{box-sizing:border-box}
.au-plate{position:absolute;left:0;top:0;width:312px;height:340px;
  background:linear-gradient(124.96deg,#0B2952 0%,#5D8FDC 55%,#AFCCF6 100%);transform-origin:50% 50%}
.au-card{position:absolute;left:42px;top:170px;width:229px;height:220px;background:#fff;
  border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,.06);overflow:hidden}
.au-pane{position:absolute;top:0;left:0;width:229px;padding:16px;display:flex;
  flex-direction:column;margin:0}
.au-pane-details{gap:14px}
.au-pane-gift{gap:16px}
.au-pane-message{gap:16px}
.au-pane-checkout{gap:16px}
.au-pane-active{gap:14px}

.au-hd{height:24px;flex:none;display:flex;align-items:center;justify-content:space-between}
.au-title{font-family:var(--font-display),'Satoshi',sans-serif;font-weight:700;font-size:18px;
  line-height:24px;color:#1D1D1F;margin:0;padding:0;letter-spacing:0}
.au-pill{height:19px;border-radius:8px;padding:4px 9px 3px;background:#F2F2F2;flex:none;
  font-family:var(--font-sans),'Overpass',sans-serif;font-weight:700;font-size:9px;
  line-height:12px;letter-spacing:.75px;color:#1D1D1F;white-space:nowrap}
.au-green{background:#D8F1CC}
.au-lab{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:700;font-size:10px;
  line-height:14px;letter-spacing:1px;color:#6E6E73;flex:none}

.au-row{height:16px;flex:none;display:flex;align-items:center;gap:9px}
.au-k{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:400;font-size:12px;
  line-height:16px;letter-spacing:.19px;color:#1D1D1F;white-space:nowrap}
.au-rule{flex:1;height:1px;background:#ECECEC}
.au-v{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:400;font-size:10px;
  line-height:14px;letter-spacing:.19px;color:#6E6E73;white-space:nowrap}

.au-photo{height:96px;flex:none;border-radius:6px;
  background:url(/motion/loop-auto-gift.jpg) center/cover no-repeat}
.au-field{display:flex;flex-direction:column;gap:6px;flex:none}
.au-amount{height:42px;border-radius:8px;background:#fff;box-shadow:inset 0 0 0 1px #1D1D1F;
  padding:9px 12px;display:flex;align-items:center;gap:9px}
.au-big{font-family:var(--font-display),'Satoshi',sans-serif;font-weight:700;font-size:18px;
  line-height:24px;color:#1D1D1F;display:flex;align-items:center}
.au-caret{width:1.4px;height:20px;background:#1D1D1F;display:inline-block;margin-left:1px}
.au-gap{flex:1;height:1px;background:transparent}
.au-unit{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:400;font-size:10px;
  line-height:16px;letter-spacing:.19px;color:#6E6E73;white-space:nowrap}

.au-message{height:50px;border-radius:8px;background:#fff;box-shadow:inset 0 0 0 1px #D2D2D7;
  padding:9px 12px}
.au-msg{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:400;font-size:12px;
  line-height:16px;letter-spacing:.19px;color:#1D1D1F;display:block;width:173px}

.au-note{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:400;font-size:10px;
  line-height:14px;letter-spacing:.19px;color:#6E6E73;flex:none}
/* the board keeps a 2px spacer above the button on these three cards */
.au-sp2{height:2px;flex:none}

.au-queue{display:flex;flex-direction:column;gap:6px;flex:none}
.au-queued{height:42px;border-radius:6px;background:#F2F2F2;padding:9px 12px;
  display:flex;align-items:center;justify-content:space-between;gap:10px}
.au-who{display:flex;align-items:center;gap:9px}
.au-av{width:24px;height:24px;border-radius:50%;flex:none;display:block;
  background-size:cover;background-position:center}
.au-av-sarah{background-image:url(/motion/loop-sarah.png)}
.au-av-daniel{background-image:url(/motion/loop-daniel.png)}
.au-nm{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:600;font-size:12px;
  line-height:16px;letter-spacing:.19px;color:#1D1D1F;white-space:nowrap}
.au-when{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:400;font-size:10px;
  line-height:16px;letter-spacing:.19px;color:#6E6E73;white-space:nowrap}
.au-when-lg{font-size:12px}

.au-btn{width:197px;height:32px;flex:none;border-radius:24px;background:#2C2D2E;color:#F8F8F8;
  font-family:var(--font-sans),'Overpass',sans-serif;font-weight:600;font-size:12px;
  line-height:16px;letter-spacing:1.16px;display:flex;align-items:center;justify-content:center;
  overflow:hidden}

.au-ripple{position:absolute;top:0;left:0;width:26px;height:26px;border-radius:50%;
  background:#181818;opacity:0}
.au-cursor{position:absolute;top:0;left:0;filter:drop-shadow(1.53px 4.59px 3.06px rgba(0,0,0,.25))}
`;
