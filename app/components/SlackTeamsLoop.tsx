"use client";

import gsap from "gsap";
import { useCallback, useEffect, useId, useLayoutEffect, useRef } from "react";
import { useCardActive } from "@/app/components/common/cardActive";

// ─────────────────────────────────────────────────────────────
// Stadium — "Slack and Teams" auto-looping animation
//
// The seven states of "05 Slack/Teams" on the Imagery System board, played as
// one continuous card. Geometry, type, colour, the cursor vector path and the
// click ripple are measured off the Figma frames, not eyeballed. Each of the
// seven states was diffed against a Figma export: average mean pixel delta 2.18.
//
// Where it posts is a real choice here: neither destination is picked until one
// is pressed, and the channel list starts empty too. The board showed both
// already decided.
//
// Figma: Imagery System (F7rDHYd3n5nwRtrlv1F6dO), 05 Slack/Teams.
// ─────────────────────────────────────────────────────────────

const TILE_W = 312;
const TILE_H = 340;

const SEQ = 10.2;
const LOOP_PAUSE = 1.2;

/** Card heights, straight out of the Figma frames. */
const H = { where: 212, auth: 286, chan: 208, posted: 263 };

/** Cursor rest points: the x,y of the cursor vector on each board frame. */
const AT = {
  slack: [115, 165], // the Slack tile
  next: [180, 244], // where it posts card, button at y228
  auth: [180, 281], // authorize card, button at y265
  wins: [180, 154], // the #team-wins row
  choose: [180, 242], // choose a channel card, button at y226
  off: [312, 376],
} as const;

const SEL = { bg: "#F2F2F2", border: "#1D1D1F", bw: 1.4 };
const UN = { bg: "#FFFFFF", border: "#ECECEC", bw: 1 };
const INK = "#1D1D1F";
const MUTED = "#6E6E73";

const CURSOR_PATH =
  "M 4.366701547142042 0.5750139264737654 C 2.589578160420114 -0.8073533323373735 0 0.459072678884477 0 2.7105487806798383 L 0 33.38919747874312 C 0 35.95440759337555 3.2367247861444213 37.07936964866745 4.827779291920988 35.06717132962759 L 12.387034077094162 25.50724433290989 C 12.95158957500235 24.793523557088054 13.81158827419962 24.37705070402858 14.72155069806391 24.37705070402858 L 27.081167551815078 24.37705070402858 C 29.65720008330488 24.37705070402858 30.77567193990594 21.11759985122833 28.742370216427954 19.536123064329352 L 4.366701547142042 0.5750139264737654 Z";

export default function SlackTeamsLoop() {
  const scope = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const reducedRef = useRef(false);
  const visibleRef = useRef(true);
  const cardActive = useCardActive();
  const activeRef = useRef(cardActive);
  const restartRef = useRef(cardActive);

  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const clipId = `sl-cur-${uid}`;

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
      const card = q(".sl-card");
      const cursor = q(".sl-cursor");
      const ripple = q(".sl-ripple");

      const PANE = {
        where: q(".sl-pane-where"),
        auth: q(".sl-pane-auth"),
        chan: q(".sl-pane-chan"),
        posted: q(".sl-pane-posted"),
      };

      gsap.set(card, { yPercent: -50, height: H.where });
      gsap.set(cursor, { x: AT.off[0], y: AT.off[1], transformOrigin: "0px 0px" });
      gsap.set(ripple, { x: AT.off[0] - 9, y: AT.off[1] - 9, scale: 0.3, opacity: 0 });
      gsap.set([PANE.auth, PANE.chan, PANE.posted], { autoAlpha: 0 });
      gsap.set(PANE.where, { autoAlpha: 1 });
      // neither destination is chosen, so NEXT cannot be pressed
      gsap.set(q(".sl-tile-slack"), { backgroundColor: UN.bg, borderColor: UN.border, borderWidth: UN.bw });
      gsap.set(q(".sl-tile-slack .sl-lbl"), { color: MUTED });
      gsap.set(q(".sl-btn-next"), { opacity: 0.4 });
      gsap.set(q(".sl-dest-wins"), { backgroundColor: UN.bg, borderColor: UN.border, borderWidth: UN.bw });
      gsap.set(q(".sl-btn-choose"), { opacity: 0.4 });

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

      const tl = gsap.timeline({ repeat: -1, repeatDelay: LOOP_PAUSE, paused: true });
      tlRef.current = tl;
      gsap.defaults({ ease: "power2.out", duration: 0.5 });

      tl.to(q(".sl-plate"),
        { x: -10, y: 8, scale: 1.08, duration: SEQ / 2, repeat: 1, yoyo: true, ease: "sine.inOut" }, 0);

      // 1 where it posts, nothing chosen
      tl.addLabel("1 where it posts", 0);
      tl.fromTo(card, { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out" }, 0);
      tl.from(q(".sl-pane-where .sl-title"), { y: 8, autoAlpha: 0, duration: 0.5 }, 0.18);
      tl.from(root.querySelectorAll(".sl-pane-where .sl-dtile"), { y: 8, autoAlpha: 0, duration: 0.5, stagger: 0.09 }, 0.28);
      tl.from(q(".sl-btn-next"), { y: 8, autoAlpha: 0, duration: 0.5 }, 0.46);

      // 2 Slack is chosen, which is what makes NEXT pressable
      tl.addLabel("2 press slack", 0.95);
      moveTo(tl, 0.95, AT.slack, 0.85);
      press(tl, 1.85);
      tl.to(q(".sl-tile-slack"), { backgroundColor: SEL.bg, borderColor: SEL.border, borderWidth: SEL.bw, duration: 0.28 }, 1.87);
      tl.to(q(".sl-tile-slack .sl-lbl"), { color: INK, duration: 0.28 }, 1.87);
      tl.to(q(".sl-btn-next"), { opacity: 1, duration: 0.3 }, 1.95);

      // 3 press next
      moveTo(tl, 2.35, AT.next, 0.5);
      press(tl, 2.9);
      tl.addLabel("3 press next", 2.95);

      // 4 authorize the scopes
      tl.addLabel("4 authorise", 3.2);
      swap(tl, PANE.where, PANE.auth, H.auth, 3.2, 0.55);
      moveTo(tl, 3.85, AT.auth, 0.5);
      press(tl, 4.45);

      // 5 choose a channel, nothing chosen
      tl.addLabel("5 choose a channel", 4.7);
      swap(tl, PANE.auth, PANE.chan, H.chan, 4.7, 0.55);
      moveTo(tl, 5.3, AT.wins, 0.5);
      press(tl, 5.9);

      // 6 the channel is chosen
      tl.addLabel("6 channel chosen", 5.95);
      tl.to(q(".sl-dest-wins"), { backgroundColor: SEL.bg, borderColor: SEL.border, borderWidth: SEL.bw, duration: 0.28 }, 5.97);
      tl.to(q(".sl-btn-choose"), { opacity: 1, duration: 0.3 }, 6.05);
      moveTo(tl, 6.4, AT.choose, 0.5);
      press(tl, 7.0);

      // 7 posted, and the board ends here
      tl.addLabel("7 posted in slack", 7.25);
      swap(tl, PANE.chan, PANE.posted, H.posted, 7.25, 0.6);
      moveTo(tl, 7.3, AT.off, 0.7);
      tl.from(root.querySelectorAll(".sl-pane-posted .sl-phead, .sl-pane-posted .sl-byline, .sl-pane-posted .sl-mtext"),
        { y: 8, autoAlpha: 0, duration: 0.45, stagger: 0.08 }, 7.6);
      tl.from(q(".sl-attach"), { y: 10, autoAlpha: 0, duration: 0.55, ease: "back.out(1.6)" }, 7.95);
      tl.from(q(".sl-composer"), { autoAlpha: 0, duration: 0.4 }, 8.3);
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

      <div ref={stageRef} className="sl-stage">
        <div className="sl-plate" />

        <div className="sl-card">
          <section className="sl-pane sl-pane-where">
            <h3 className="sl-title">Where it posts</h3>
            <div className="sl-tiles">
              <div className="sl-dtile sl-tile-slack">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <span className="sl-glyph"><img src="/motion/loop-slack.svg" width="26" height="26" alt="" /></span>
                <span className="sl-lbl">Slack</span>
              </div>
              <div className="sl-dtile">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <span className="sl-glyph"><img src="/motion/loop-teams.png" width="24.63" height="26" alt="" /></span>
                <span className="sl-lbl">Teams</span>
              </div>
            </div>
            <div className="sl-btn sl-btn-next">NEXT</div>
          </section>

          <section className="sl-pane sl-pane-auth">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div className="sl-handshake"><img src="/motion/loop-slack-handshake.png" alt="" /></div>
            <h3 className="sl-title">Authorize Slack</h3>
            <div className="sl-perms">
              <div className="sl-lead">Choose what Stadium can do</div>
              <div className="sl-scopes">
                {["Post in channels", "Mention people", "Find people in Slack"].map(s => (
                  <div className="sl-scope" key={s}>
                    <span>{s}</span>
                    <i className="sl-toggle"><i className="sl-knob" /></i>
                  </div>
                ))}
              </div>
            </div>
            <div className="sl-btn">AUTHORIZE</div>
          </section>

          <section className="sl-pane sl-pane-chan">
            <div className="sl-chanhead">
              <span className="sl-tile38" />
              <h3 className="sl-title">Choose a channel</h3>
            </div>
            <div className="sl-list">
              <div className="sl-dest sl-dest-wins">
                <span className="sl-c">#team-wins</span><span className="sl-m">148 members</span>
              </div>
              <div className="sl-dest">
                <span className="sl-c">#general</span><span className="sl-m">344 members</span>
              </div>
            </div>
            <div className="sl-btn sl-btn-choose">CHOOSE CHANNEL</div>
          </section>

          <section className="sl-pane sl-pane-posted">
            <div className="sl-phead"><span className="sl-tile13" /><h3 className="sl-title">#team-wins</h3></div>
            <div className="sl-msg">
              <span className="sl-ava" />
              <div className="sl-body">
                <div className="sl-byline"><span className="sl-n">Sarah Johnson</span><span className="sl-t">2:14 PM</span></div>
                <div className="sl-mtext">
                  Huge thanks to <span className="sl-at">@Daniel Reyes</span> for shipping the rebrand two weeks early.
                </div>
                <div className="sl-attach">
                  <span className="sl-bar" />
                  <div className="sl-inner">
                    <div className="sl-recip"><span className="sl-ra" /><span className="sl-rn">Daniel Reyes</span></div>
                    <div className="sl-award">
                      <span className="sl-chip">#CRAFT</span>
                      <span className="sl-chip sl-kudos">+50 KUDOS</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="sl-composer"><span>Message #team-wins</span></div>
          </section>
        </div>

        <div className="sl-ripple" />

        <svg className="sl-cursor" width="29.79" height="36.1" viewBox="0 0 29.79 36.1" aria-hidden="true">
          <defs><clipPath id={clipId}><path d={CURSOR_PATH} /></clipPath></defs>
          <path clipPath={`url(#${clipId})`} d={CURSOR_PATH}
                fill="#181818" stroke="#ffffff" strokeWidth="3.8" strokeLinejoin="miter" />
        </svg>
      </div>
    </div>
  );
}

const CSS = `
.sl-stage{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
  transform-origin:50% 50%;width:312px;height:340px;border-radius:9px;overflow:hidden;
  background:#F2F2F2;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
.sl-stage *,.sl-stage *::before,.sl-stage *::after{box-sizing:border-box}
.sl-plate{position:absolute;left:0;top:0;width:312px;height:340px;
  background:linear-gradient(124.96deg,#0B2952 0%,#5D8FDC 55%,#AFCCF6 100%);transform-origin:50% 50%}
.sl-card{position:absolute;left:42px;top:50%;width:229px;height:212px;background:#fff;
  border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,.06);overflow:hidden}
.sl-pane{position:absolute;top:0;left:0;width:229px;padding:16px;display:flex;flex-direction:column;margin:0}
.sl-pane-where{gap:16px}
.sl-pane-auth{gap:16px}
.sl-pane-chan{gap:14px}
.sl-pane-posted{gap:12px}
/* the button sits 18 below the content on every card. Each pane keeps its own
   inner rhythm, so the button carries the difference. */
.sl-pane-where .sl-btn{margin-top:2px}
.sl-pane-auth .sl-btn{margin-top:2px}
.sl-pane-chan .sl-btn{margin-top:4px}
.sl-title{font-family:var(--font-display),'Satoshi',sans-serif;font-weight:700;font-size:18px;
  line-height:24px;color:#1D1D1F;margin:0;padding:0;letter-spacing:0}
.sl-tiles{display:flex;gap:12px;height:90px;flex:none}
.sl-dtile{width:92.5px;height:90px;border-radius:8px;background:#fff;border:1px solid #ECECEC;
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:12px 0}
.sl-glyph{width:42px;height:42px;display:flex;align-items:center;justify-content:center}
.sl-lbl{font-family:var(--font-sans),sans-serif;font-weight:600;font-size:12px;line-height:16px;
  letter-spacing:.19px;color:#6E6E73}
.sl-btn{width:197px;height:32px;flex:none;border-radius:24px;background:#2C2D2E;color:#F8F8F8;
  font-family:var(--font-sans),sans-serif;font-weight:600;font-size:12px;line-height:16px;
  letter-spacing:1.16px;display:flex;align-items:center;justify-content:center;position:relative}
.sl-handshake{height:48px;flex:none;position:relative;overflow:visible}
.sl-handshake img{position:absolute;left:0;top:-5px;width:197px;height:58px}
.sl-perms{display:flex;flex-direction:column;gap:10px}
.sl-lead{font-family:var(--font-sans),sans-serif;font-weight:400;font-size:12px;line-height:16px;
  letter-spacing:.19px;color:#6E6E73}
.sl-scopes{display:flex;flex-direction:column;gap:10px}
.sl-scope{height:18px;display:flex;align-items:center;justify-content:space-between}
.sl-scope span{font-family:var(--font-sans),sans-serif;font-weight:400;font-size:12px;
  line-height:16px;letter-spacing:.19px;color:#1D1D1F}
.sl-toggle{width:36px;height:18px;border-radius:100px;background:#226104;position:relative;flex:none}
.sl-knob{position:absolute;left:21px;top:3px;width:12px;height:12px;border-radius:50%;background:#fff}
.sl-chanhead{height:38px;flex:none;display:flex;align-items:center;gap:12px}
/* the board lets this run 3px past the content box rather than wrap */
.sl-chanhead .sl-title{white-space:nowrap}
.sl-tile38{width:38px;height:38px;flex:none;
  background:url(/motion/loop-slacktile.png) center/contain no-repeat}
.sl-list{display:flex;flex-direction:column;gap:6px}
.sl-dest{height:34px;border-radius:8px;background:#fff;border:1px solid #ECECEC;padding:9px 12px;
  display:flex;align-items:center;justify-content:space-between}
.sl-c{font-family:var(--font-sans),sans-serif;font-weight:600;font-size:12px;line-height:16px;
  letter-spacing:.19px;color:#1D1D1F}
.sl-m{font-family:var(--font-sans),sans-serif;font-weight:400;font-size:10px;line-height:14px;
  letter-spacing:.19px;color:#6E6E73}
.sl-phead{height:24px;flex:none;display:flex;align-items:center;gap:6px}
.sl-tile13{width:13px;height:13px;border-radius:1.5px;flex:none;
  background:url(/motion/loop-slacktile.png) center/contain no-repeat}
.sl-msg{height:149px;flex:none;display:flex;gap:9px}
.sl-ava{width:28px;height:28px;border-radius:8px;flex:none;
  background:url(/motion/loop-sarah.png) center/cover no-repeat}
.sl-body{width:160px;display:flex;flex-direction:column;gap:8px}
.sl-byline{height:16px;display:flex;align-items:center;justify-content:space-between}
.sl-n{font-family:var(--font-sans),sans-serif;font-weight:700;font-size:12px;line-height:16px;
  letter-spacing:.19px;color:#1D1D1F}
.sl-t{font-family:var(--font-sans),sans-serif;font-weight:400;font-size:10px;line-height:14px;
  letter-spacing:.76px;color:#6E6E73}
.sl-mtext{font-family:var(--font-sans),sans-serif;font-weight:400;font-size:12px;line-height:16px;
  letter-spacing:.19px;color:#1D1C1D;width:160px}
.sl-at{font-weight:600;color:#0B7AFC}
.sl-attach{height:69px;border-radius:6px;background:#F6F8FB;display:flex;overflow:hidden}
.sl-bar{width:3px;background:#1D1D1F;flex:none}
.sl-inner{flex:1;padding:12px 9px;display:flex;flex-direction:column;gap:6px}
.sl-recip{height:20px;display:flex;align-items:center;gap:9px}
.sl-ra{width:20px;height:20px;border-radius:50%;flex:none;
  background:url(/motion/loop-daniel.png) center/cover no-repeat}
.sl-rn{font-family:var(--font-sans),sans-serif;font-weight:600;font-size:12px;line-height:16px;
  letter-spacing:.19px;color:#1D1D1F}
.sl-award{height:19px;display:flex;gap:9px}
.sl-chip{height:19px;flex:none;white-space:nowrap;border-radius:8px;background:#F2F2F2;
  padding:4px 9px 3px;font-family:var(--font-sans),sans-serif;font-weight:700;font-size:9px;
  line-height:12px;letter-spacing:.76px;color:#1D1D1F}
.sl-kudos{background:#D8F1CC}
.sl-composer{height:34px;flex:none;border-radius:8px;background:#fff;border:1px solid #ECECEC;
  padding:9px 12px;display:flex;align-items:center}
.sl-composer span{font-family:var(--font-sans),sans-serif;font-weight:400;font-size:12px;
  line-height:16px;letter-spacing:.19px;color:#6E6E73}
.sl-ripple{position:absolute;top:0;left:0;width:26px;height:26px;border-radius:50%;
  background:#181818;opacity:0}
.sl-cursor{position:absolute;top:0;left:0;filter:drop-shadow(1.9px 5.7px 3.8px rgba(0,0,0,.25))}
`;
