"use client";

import gsap from "gsap";
import { useCallback, useEffect, useId, useLayoutEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────
// Stadium — "Integrations" auto-looping animation
//
// The seven states of "04 Integrations" on the Imagery System board, played as
// one continuous card. Geometry, type, colour, the cursor vector path and the
// scrollbar are measured off the Figma frames, not eyeballed. Each of the seven
// states was diffed against a Figma export: average mean pixel delta 1.47.
//
// Twelve logos in four rows, two rows visible. The scroll is the point: the
// list is longer than the card. It moves one row and the thumb is sized for a
// list about four screens long — a full travel would say these are all the
// integrations there are.
//
// Figma: Imagery System (F7rDHYd3n5nwRtrlv1F6dO), 04 Integrations.
// ─────────────────────────────────────────────────────────────

const TILE_W = 312;
const TILE_H = 340;

const SEQ = 9.6;
const LOOP_PAUSE = 1.2;

/** Card heights, straight out of the Figma frames. */
const H = { dir: 214, auth: 290, sync: 104, done: 177 };

/** Cursor rest points: the x,y of the cursor vector on each board frame. */
const AT = {
  workday: [90, 189], // the Workday tile, once the list has nudged down a row
  connect: [180, 245], // directory card, button at y229
  authorize: [180, 283], // authorize card, button at y267
  off: [312, 376],
} as const;

const SCROLL = -53; // one row
const THUMB = 13;

const SEL = { bg: "#F2F2F2", border: "#2C2D2E", bw: 1.4 };
const UN = { bg: "#FFFFFF", border: "#ECECEC", bw: 1 };

const CURSOR_PATH =
  "M 4.366701547142042 0.5750139264737654 C 2.589578160420114 -0.8073533323373735 0 0.459072678884477 0 2.7105487806798383 L 0 33.38919747874312 C 0 35.95440759337555 3.2367247861444213 37.07936964866745 4.827779291920988 35.06717132962759 L 12.387034077094162 25.50724433290989 C 12.95158957500235 24.793523557088054 13.81158827419962 24.37705070402858 14.72155069806391 24.37705070402858 L 27.081167551815078 24.37705070402858 C 29.65720008330488 24.37705070402858 30.77567193990594 21.11759985122833 28.742370216427954 19.536123064329352 L 4.366701547142042 0.5750139264737654 Z";

/** name, rendered width, rendered height — the sizes the board scales them to. */
const ROWS: [string, number, number][][] = [
  [["salesforce", 20.45, 14], ["hubspot", 35, 10.15], ["zoho", 27.43, 12]],
  [["pipedrive", 35, 7.92], ["greenhouse", 35, 7.85], ["lever", 35, 8.25]],
  [["workday", 29.1, 14], ["bamboohr", 35, 5.14], ["gusto", 31.54, 12]],
  [["adp", 26, 12], ["rippling", 35, 4.99], ["sap", 24.26, 12]],
];

export default function IntegrationsLoop() {
  const scope = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const reducedRef = useRef(false);
  const visibleRef = useRef(true);

  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const clipId = `int-cur-${uid}`;

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
      const card = q(".int-card");
      const cursor = q(".int-cursor");
      const ripple = q(".int-ripple");
      const psub = q(".int-psub");

      const PANE = {
        dir: q(".int-pane-dir"),
        auth: q(".int-pane-auth"),
        sync: q(".int-pane-sync"),
        done: q(".int-pane-done"),
      };

      gsap.set(card, { yPercent: -50, height: H.dir });
      gsap.set(cursor, { x: AT.off[0], y: AT.off[1], transformOrigin: "0px 0px" });
      gsap.set(ripple, { x: AT.off[0] - 9, y: AT.off[1] - 9, scale: 0.3, opacity: 0 });
      gsap.set([PANE.auth, PANE.sync, PANE.done], { autoAlpha: 0 });
      gsap.set(PANE.dir, { autoAlpha: 1 });
      gsap.set(q(".int-dir"), { y: 0 });
      gsap.set(q(".int-thumb"), { y: 0 });
      gsap.set(q(".int-pbar"), { scaleX: 0 });
      gsap.set(q(".int-tile-workday"), { backgroundColor: UN.bg, borderColor: UN.border, borderWidth: UN.bw });

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
        tl.to(card, { height: h, duration: dur, ease: "power3.inOut" }, at);
        tl.to(to, { autoAlpha: 1, duration: 0.3, ease: "power1.out" }, at + 0.16);
      };
      // the contact count is tied to the bar, so the two can never disagree
      const counter = (el: HTMLElement, total: number, dur: number) => {
        const o = { n: 0 };
        return gsap.to(o, {
          n: total, duration: dur, ease: "power1.inOut",
          onUpdate() { el.textContent = `${Math.round(o.n)} of ${total} contacts`; },
        });
      };

      const tl = gsap.timeline({ repeat: -1, repeatDelay: LOOP_PAUSE, paused: true });
      tlRef.current = tl;
      gsap.defaults({ ease: "power2.out", duration: 0.5 });

      tl.to(q(".int-plate"),
        { x: -10, y: 8, scale: 1.08, duration: SEQ / 2, repeat: 1, yoyo: true, ease: "sine.inOut" }, 0);

      // 1 nothing selected
      tl.addLabel("1 nothing selected", 0);
      tl.fromTo(card, { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out" }, 0);
      tl.from(root.querySelectorAll(".int-cat"), { y: 6, autoAlpha: 0, duration: 0.4, stagger: 0.05 }, 0.18);
      tl.from(root.querySelectorAll(".int-tile"), { y: 8, autoAlpha: 0, duration: 0.45, stagger: 0.035 }, 0.3);
      tl.from(q(".int-btn-connect"), { y: 8, autoAlpha: 0, duration: 0.5 }, 0.55);

      // 2 there are more than fit: the list scrolls
      tl.addLabel("2 more to choose from", 1.15);
      tl.to(q(".int-dir"), { y: SCROLL, duration: 0.95, ease: "power2.inOut" }, 1.15);
      tl.to(q(".int-thumb"), { y: THUMB, duration: 0.95, ease: "power2.inOut" }, 1.15);

      // 3 Workday is picked, which is what makes CONNECT pressable
      moveTo(tl, 2.35, AT.workday, 0.85);
      press(tl, 3.25);
      tl.addLabel("3 pick workday", 3.3);
      tl.to(q(".int-tile-workday"), { backgroundColor: SEL.bg, borderColor: SEL.border, borderWidth: SEL.bw, duration: 0.28 }, 3.32);
      tl.to(q(".int-btn-connect"), { backgroundColor: SEL.border, borderColor: "rgba(0,0,0,0)", color: "#F8F8F8", duration: 0.3 }, 3.4);

      // 4 press connect
      moveTo(tl, 3.75, AT.connect, 0.5);
      press(tl, 4.3);
      tl.addLabel("4 press connect", 4.35);

      // 5 authorize the scopes
      tl.addLabel("5 authorize", 4.6);
      swap(tl, PANE.dir, PANE.auth, H.auth, 4.6, 0.55);
      moveTo(tl, 5.25, AT.authorize, 0.5);
      press(tl, 5.85);

      // 6 the sync runs
      tl.addLabel("6 syncing", 6.1);
      swap(tl, PANE.auth, PANE.sync, H.sync, 6.1, 0.55);
      moveTo(tl, 6.15, AT.off, 0.7);
      tl.fromTo(q(".int-pbar"), { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "power1.inOut" }, 6.7);
      tl.add(counter(psub, 344, 1.4), 6.7);

      // 7 connected, and the board ends here
      tl.addLabel("7 connected", 8.3);
      swap(tl, PANE.sync, PANE.done, H.done, 8.3, 0.55);
      tl.from(q(".int-tick"), { scale: 0, duration: 0.55, ease: "back.out(2.2)" }, 8.55);
      tl.from(root.querySelectorAll(".int-done-line"), { y: 8, autoAlpha: 0, duration: 0.45, stagger: 0.07 }, 8.65);
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

      <div ref={stageRef} className="int-stage">
        <div className="int-plate" />

        <div className="int-card">
          <section className="int-pane int-pane-dir">
            <div className="int-cats">
              <span className="int-cat int-cat-on">ALL</span>
              <span className="int-cat">CRM</span>
              <span className="int-cat">HRIS</span>
              <span className="int-cat">ATS</span>
            </div>
            <div className="int-options">
              <div className="int-viewport">
                <div className="int-dir">
                  {ROWS.map((row, i) => (
                    <div className="int-drow" key={i}>
                      {row.map(([name, w, h]) => (
                        <div key={name} className={`int-tile${name === "workday" ? " int-tile-workday" : ""}`}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={`/motion/marks/${name}.svg`} width={w} height={h} alt="" />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className="int-track"><div className="int-thumb" /></div>
            </div>
            <div className="int-btn int-btn-connect">CONNECT</div>
          </section>

          <section className="int-pane int-pane-auth">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div className="int-handshake"><img src="/motion/loop-handshake.png" alt="" /></div>
            <h3 className="int-title">Authorize Workday</h3>
            <div className="int-lead">Stadium will be able to</div>
            <div className="int-scopes">
              {["Read employee directory", "Read start dates", "Keep contacts in sync"].map(s => (
                <div className="int-scope" key={s}>
                  <span>{s}</span>
                  <i className="int-toggle"><i className="int-knob" /></i>
                </div>
              ))}
            </div>
            <div className="int-btn int-solid">AUTHORIZE</div>
          </section>

          <section className="int-pane int-pane-sync">
            <h3 className="int-title int-title-mid">Syncing contacts</h3>
            <div className="int-pgroup">
              <div className="int-ptrack"><div className="int-pbar" /></div>
              <div className="int-psub">0 of 344 contacts</div>
            </div>
          </section>

          <section className="int-pane int-pane-done">
            <div className="int-tick">
              <svg width="11" height="9" viewBox="0 0 11 9" fill="none" aria-hidden="true">
                <path d="M0 5 L4 9 L11 0" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="int-title int-title-mid int-done-line">Workday connected</h3>
            <div className="int-donesub int-done-line">344 contacts synced</div>
            <div className="int-btn int-solid">DONE</div>
          </section>
        </div>

        <div className="int-ripple" />

        <svg className="int-cursor" width="29.79" height="36.1" viewBox="0 0 29.79 36.1" aria-hidden="true">
          <defs><clipPath id={clipId}><path d={CURSOR_PATH} /></clipPath></defs>
          <path clipPath={`url(#${clipId})`} d={CURSOR_PATH}
                fill="#181818" stroke="#ffffff" strokeWidth="3.8" strokeLinejoin="miter" />
        </svg>
      </div>
    </div>
  );
}

const CSS = `
.int-stage{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
  transform-origin:50% 50%;width:312px;height:340px;border-radius:9px;overflow:hidden;
  background:#F2F2F2;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
.int-stage *,.int-stage *::before,.int-stage *::after{box-sizing:border-box}
.int-plate{position:absolute;left:0;top:0;width:312px;height:340px;
  background:linear-gradient(124.96deg,#0B2952 0%,#5D8FDC 55%,#AFCCF6 100%);transform-origin:50% 50%}
.int-card{position:absolute;left:42px;top:50%;width:229px;height:214px;background:#fff;
  border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,.06);overflow:hidden}
.int-pane{position:absolute;top:0;left:0;width:229px;padding:16px;display:flex;flex-direction:column;margin:0}
.int-pane-dir{gap:16px}
.int-pane-auth{gap:16px}
.int-pane-sync{gap:12px;padding:20px 16px;align-items:center}
.int-pane-done{gap:12px;align-items:center}
/* the button sits 18 below the content on every card. Each pane keeps its own
   inner rhythm, so the button carries the difference. */
.int-pane-dir .int-btn{margin-top:2px}
.int-pane-auth .int-btn{margin-top:2px}
.int-pane-done .int-btn{margin-top:6px}
.int-title{font-family:var(--font-display),'Satoshi',sans-serif;font-weight:700;font-size:18px;
  line-height:24px;color:#1D1D1F;margin:0;padding:0;letter-spacing:0}
.int-title-mid{text-align:center;width:197px}
.int-cats{display:flex;gap:6px;height:19px;flex:none}
.int-cat{height:19px;border-radius:18px;background:#F2F2F2;padding:4px 9px 3px;
  font-family:var(--font-sans),sans-serif;font-weight:700;font-size:9px;line-height:12px;
  letter-spacing:1px;color:#6E6E73}
.int-cat-on{background:#2C2D2E;color:#fff}
.int-options{display:flex;gap:18px;height:97px;flex:none}
.int-viewport{width:175px;height:97px;overflow:hidden;position:relative}
.int-dir{position:absolute;left:0;top:0;width:175px;display:flex;flex-direction:column;gap:9px}
.int-drow{display:flex;gap:9px;height:44px}
.int-tile{flex:1;height:44px;border-radius:8px;background:#fff;border:1px solid #ECECEC;
  display:flex;align-items:center;justify-content:center}
.int-tile img{display:block}
.int-track{width:4px;height:97px;border-radius:8px;background:#F2F2F2;position:relative}
.int-thumb{position:absolute;left:0;top:0;width:4px;height:24px;border-radius:8px;background:#E6E7E9}
.int-btn{width:197px;height:32px;flex:none;border-radius:24px;background:transparent;
  border:1px solid #D2D2D7;color:#6E6E73;
  font-family:var(--font-sans),sans-serif;font-weight:600;font-size:12px;line-height:16px;
  letter-spacing:1.16px;display:flex;align-items:center;justify-content:center;position:relative}
.int-solid{background:#2C2D2E;border-color:transparent;color:#F8F8F8}
.int-handshake{height:48px;flex:none;position:relative;overflow:visible}
.int-handshake img{position:absolute;left:0;top:-9px;width:197px;height:65.3px}
.int-lead{font-family:var(--font-sans),sans-serif;font-weight:400;font-size:12px;line-height:16px;
  letter-spacing:.19px;color:#6E6E73}
.int-scopes{display:flex;flex-direction:column;gap:9px}
.int-scope{height:18px;display:flex;align-items:center;justify-content:space-between}
.int-scope span{font-family:var(--font-sans),sans-serif;font-weight:400;font-size:12px;
  line-height:16px;letter-spacing:.19px;color:#1D1D1F}
.int-toggle{width:36px;height:18px;border-radius:100px;background:#226104;position:relative;flex:none}
.int-knob{position:absolute;left:21px;top:3px;width:12px;height:12px;border-radius:50%;background:#fff}
.int-pgroup{display:flex;flex-direction:column;gap:8px;align-items:center;width:197px}
.int-ptrack{width:197px;height:6px;border-radius:100px;background:#F2F2F2;overflow:hidden}
.int-pbar{width:197px;height:6px;border-radius:100px;background:#2C2D2E;transform-origin:0 50%}
.int-psub{font-family:var(--font-sans),sans-serif;font-weight:400;font-size:10px;line-height:14px;
  letter-spacing:.19px;color:#6E6E73;text-align:center;width:197px}
.int-tick{width:32px;height:32px;border-radius:50%;background:#1A9E5C;position:relative;flex:none}
.int-tick svg{position:absolute;left:10.5px;top:11.5px;overflow:visible}
.int-donesub{font-family:var(--font-sans),sans-serif;font-weight:400;font-size:10px;line-height:15px;
  letter-spacing:.19px;color:#6E6E73;text-align:center;width:197px}
.int-ripple{position:absolute;top:0;left:0;width:26px;height:26px;border-radius:50%;
  background:#181818;opacity:0}
.int-cursor{position:absolute;top:0;left:0;filter:drop-shadow(1.9px 5.7px 3.8px rgba(0,0,0,.25))}
`;
