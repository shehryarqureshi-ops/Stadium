"use client";

import gsap from "gsap";
import { useCallback, useEffect, useId, useLayoutEffect, useRef } from "react";
import { useCardActive } from "@/app/components/common/cardActive";

// ─────────────────────────────────────────────────────────────
// Stadium — "Invite your team" auto-looping animation
//
// The eight states of "01 Invite your team" on the Imagery System board,
// played as one continuous card. Geometry, type, colour, the cursor vector
// path, the click ripple opacity and the spinner arc are measured off the
// Figma frames, not eyeballed. Each of the eight states was diffed against a
// Figma export: average mean pixel delta 1.69, worst frame 2.6% of pixels.
//
// The 312×340 tile uses Figma units as pixels and is scaled to whatever
// container it is dropped into, the same way TeamPermissions did.
//
// Figma: Imagery System (F7rDHYd3n5nwRtrlv1F6dO), 01 Invite your team.
// ─────────────────────────────────────────────────────────────

const TILE_W = 312;
const TILE_H = 340;

/** One pass, before the pause that precedes the loop. */
const SEQ = 10.4;
const LOOP_PAUSE = 1.2;

/** Card heights, straight out of the Figma frames. */
const H = { team: 198, invite: 158, role: 292, sent: 178 };

/** Cursor rest points: the x,y of the cursor vector on each board frame. */
const AT = {
  invitePeople: [180, 237], // team card, button at y221
  next: [180, 217], // invite card, button at y201
  sender: [180, 193], // role card, Sender row at y176
  send: [180, 284], // role card, button at y268
  off: [312, 376],
} as const;

/** The board's own cursor path, in its 29.79 × 36.1 box. */
const CURSOR_PATH =
  "M 4.366701547142042 0.5750139264737654 C 2.589578160420114 -0.8073533323373735 0 0.459072678884477 0 2.7105487806798383 L 0 33.38919747874312 C 0 35.95440759337555 3.2367247861444213 37.07936964866745 4.827779291920988 35.06717132962759 L 12.387034077094162 25.50724433290989 C 12.95158957500235 24.793523557088054 13.81158827419962 24.37705070402858 14.72155069806391 24.37705070402858 L 27.081167551815078 24.37705070402858 C 29.65720008330488 24.37705070402858 30.77567193990594 21.11759985122833 28.742370216427954 19.536123064329352 L 4.366701547142042 0.5750139264737654 Z";

export default function InviteTeamLoop() {
  const scope = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  // The loader spins on its own tween, outside tlRef — it needs the same gate.
  const spinRef = useRef<gsap.core.Tween | null>(null);
  const reducedRef = useRef(false);
  const visibleRef = useRef(true);
  const cardActive = useCardActive();
  const activeRef = useRef(cardActive);
  const restartRef = useRef(cardActive);

  // SVG ids must be unique per instance or a second copy steals the clip path.
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const clipId = `iyt-cur-${uid}`;

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
    if (run) spinRef.current?.play();
    else spinRef.current?.pause();
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

    // gsap.context scopes everything created inside it, so revert() on unmount
    // kills the tweens and restores inline styles. This is what makes the
    // component safe under React StrictMode's double mount.
    const ctx = gsap.context(() => {
      const q = (sel: string) => root.querySelector(sel) as HTMLElement;
      const card = q(".iyt-card");
      const cursor = q(".iyt-cursor");
      const ripple = q(".iyt-ripple");
      const flyer = q(".iyt-flyer");
      const typed = q(".iyt-typed");
      const stage = q(".iyt-stage");
      const roleEmail = q(".iyt-role-email");

      const PANE = {
        team: q(".iyt-pane-team"),
        invite: q(".iyt-pane-invite"),
        role: q(".iyt-pane-role"),
        sent: q(".iyt-pane-sent"),
      };

      gsap.set(card, { yPercent: -50, height: H.team });
      gsap.set(cursor, { x: AT.off[0], y: AT.off[1], transformOrigin: "0px 0px" });
      gsap.set(ripple, { x: AT.off[0] - 9, y: AT.off[1] - 9, scale: 0.3, opacity: 0 });
      gsap.set([PANE.invite, PANE.role, PANE.sent], { autoAlpha: 0 });
      gsap.set(PANE.team, { autoAlpha: 1 });
      gsap.set(q(".iyt-dot-sender"), { scale: 0 });
      gsap.set(q(".iyt-lbl-sending"), { autoAlpha: 0 });
      gsap.set([q(".iyt-btn-next"), q(".iyt-btn-send")], { opacity: 0.4 });
      gsap.set(roleEmail, { opacity: 0 });
      gsap.set(q(".iyt-caret"), { opacity: 1 });

      // The caret blinks on background colour so the timeline still owns opacity.
      gsap.to(q(".iyt-caret"), {
        backgroundColor: "rgba(29,29,31,0)",
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)",
      });
      // Rotate the wrapping span, never the <svg>: GSAP measures an SVG node's
      // bbox by reparenting it, and inside a visibility:hidden label that
      // silently moves the spinner to the end of the flex row.
      spinRef.current = gsap.to(q(".iyt-spinner"), { rotation: 360, duration: 0.85, repeat: -1, ease: "none" });

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
        q(".iyt-plate"),
        { x: -10, y: 8, scale: 1.08, duration: SEQ / 2, repeat: 1, yoyo: true, ease: "sine.inOut" },
        0,
      );

      // 1 the team as it stands
      tl.addLabel("1 your team", 0);
      tl.add(typing(typed, "", 0.01), 0);
      tl.fromTo(card, { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out" }, 0);
      tl.from(root.querySelectorAll(".iyt-list > .iyt-person"), { y: 8, autoAlpha: 0, duration: 0.5, stagger: 0.09 }, 0.18);
      tl.from(q(".iyt-btn-invite"), { y: 8, autoAlpha: 0, duration: 0.5 }, 0.38);

      // 2 press invite people. The cursor does not enter until the card has settled.
      tl.addLabel("2 press invite", 0.95);
      moveTo(tl, 0.95, AT.invitePeople, 0.85);
      press(tl, 1.85);

      // 3 an empty, focused field
      tl.addLabel("3 empty field", 2.1);
      swap(tl, PANE.team, PANE.invite, H.invite, 2.1);

      // 4 the address is typed, and only then can it be submitted
      tl.addLabel("4 enter an email", 2.6);
      tl.add(typing(typed, "marcus@company.com", 1.05), 2.6);
      tl.to(q(".iyt-caret"), { opacity: 0, duration: 0.2 }, 3.68); // board frame 4 has no caret
      tl.to(q(".iyt-btn-next"), { opacity: 1, duration: 0.3 }, 3.68);
      moveTo(tl, 3.95, AT.next, 0.45);
      press(tl, 4.45);

      // 5 the address carries across into the person row
      tl.addLabel("5 choose the role", 4.7);
      tl.set(flyer, { x: 70, y: 157, fontSize: 12, color: "#1D1D1F", opacity: 0 }, 4.65);
      tl.to(flyer, { opacity: 1, duration: 0.01 }, 4.68);
      tl.to(typed, { opacity: 0, duration: 0.01 }, 4.68);
      swap(tl, PANE.invite, PANE.role, H.role, 4.7, 0.55);
      // The destination moves while the card grows, so read it every frame
      // rather than tweening to where it will end up.
      const fly = { p: 0 };
      tl.to(
        fly,
        {
          p: 1,
          duration: 0.55,
          ease: "power2.inOut",
          onUpdate() {
            const to = roleEmail.getBoundingClientRect();
            const st = stage.getBoundingClientRect();
            const p = fly.p;
            // divide by scale: rects are screen pixels, the tile is scaled to fit
            const s = st.width / TILE_W || 1;
            gsap.set(flyer, {
              x: 70 + ((to.left - st.left) / s - 70) * p,
              y: 157 + ((to.top - st.top) / s - 157) * p,
              fontSize: 12 + (10 - 12) * p,
            });
          },
        },
        4.7,
      );
      tl.to(flyer, { color: "#6E6E73", duration: 0.5, ease: "none" }, 4.73);
      tl.to(flyer, { opacity: 0, duration: 0.12 }, 5.25);
      tl.to(roleEmail, { opacity: 1, duration: 0.12 }, 5.25);

      // 6 Sender is chosen, which is what makes the invite sendable
      moveTo(tl, 5.45, AT.sender, 0.5);
      press(tl, 6.0);
      tl.addLabel("6 assign the role", 6.05);
      tl.to(q(".iyt-role-sender"), { backgroundColor: "#F2F2F2", borderColor: "#2C2D2E", borderWidth: 1.4, duration: 0.28 }, 6.07);
      tl.to(q(".iyt-radio-sender"), { borderColor: "#2C2D2E", borderWidth: 1.4, duration: 0.28 }, 6.07);
      tl.to(q(".iyt-dot-sender"), { scale: 1, duration: 0.34, ease: "back.out(2.4)" }, 6.11);
      tl.to(q(".iyt-btn-send"), { opacity: 1, duration: 0.3 }, 6.35);

      // 7 in flight
      moveTo(tl, 6.65, AT.send, 0.45);
      press(tl, 7.15);
      tl.addLabel("7 sending", 7.35);
      tl.to(q(".iyt-lbl-send"), { autoAlpha: 0, duration: 0.2 }, 7.35);
      tl.to(q(".iyt-lbl-sending"), { autoAlpha: 1, duration: 0.25 }, 7.43);
      tl.to(q(".iyt-btn-send"), { opacity: 0.7, duration: 0.25 }, 7.35);
      moveTo(tl, 7.5, AT.off, 0.7);

      // 8 confirmed, and the board ends here
      tl.addLabel("8 invite sent", 8.45);
      swap(tl, PANE.role, PANE.sent, H.sent, 8.45, 0.55);
      tl.from(q(".iyt-tick"), { scale: 0, duration: 0.55, ease: "back.out(2.2)" }, 8.7);
      tl.from(root.querySelectorAll(".iyt-sent-line"), { y: 8, autoAlpha: 0, duration: 0.45, stagger: 0.07 }, 8.8);
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

  // Only the active card animates, and it starts from the top each time.
  useEffect(() => {
    activeRef.current = cardActive;
    if (cardActive) restartRef.current = true;
    applyPlayState();
  }, [cardActive, applyPlayState]);

  return (
    <div ref={scope} className="relative h-full w-full overflow-hidden">
      <style>{CSS}</style>

      <div ref={stageRef} className="iyt-stage">
        <div className="iyt-plate" />

        <div className="iyt-card">
          <section className="iyt-pane iyt-pane-team">
            <h3 className="iyt-title">Team</h3>
            <div className="iyt-list">
              <div className="iyt-person">
                <div className="iyt-ava iyt-ava-sarah" />
                <div className="iyt-meta">
                  <div className="iyt-name">Sarah Johnson</div>
                  <div className="iyt-sub">Owner</div>
                </div>
              </div>
              <div className="iyt-person">
                <div className="iyt-ava iyt-ava-daniel" />
                <div className="iyt-meta">
                  <div className="iyt-name">Daniel Reyes</div>
                  <div className="iyt-sub">Admin</div>
                </div>
              </div>
            </div>
            <div className="iyt-btn iyt-btn-invite">INVITE PEOPLE</div>
          </section>

          <section className="iyt-pane iyt-pane-invite">
            <h3 className="iyt-title">Invite people</h3>
            <div className="iyt-field">
              <span className="iyt-typed" />
              <i className="iyt-caret" />
            </div>
            <div className="iyt-btn iyt-btn-next">NEXT</div>
          </section>

          <section className="iyt-pane iyt-pane-role">
            <h3 className="iyt-title">Assign a role</h3>
            <div className="iyt-person">
              <div className="iyt-ava iyt-ava-init">MC</div>
              <div className="iyt-meta">
                <div className="iyt-name">Marcus Chen</div>
                <div className="iyt-sub iyt-role-email">marcus@company.com</div>
              </div>
            </div>
            <div className="iyt-roles">
              <div className="iyt-role">
                <span className="iyt-radio">
                  <i className="iyt-dot" style={{ transform: "scale(0)" }} />
                </span>
                Admin
              </div>
              <div className="iyt-role iyt-role-sender">
                <span className="iyt-radio iyt-radio-sender">
                  <i className="iyt-dot iyt-dot-sender" />
                </span>
                Sender
              </div>
              <div className="iyt-role">
                <span className="iyt-radio">
                  <i className="iyt-dot" style={{ transform: "scale(0)" }} />
                </span>
                Member
              </div>
            </div>
            <div className="iyt-btn iyt-btn-send">
              <span className="iyt-lbl iyt-lbl-send">SEND INVITE</span>
              <span className="iyt-lbl iyt-lbl-sending">
                <span className="iyt-spinner">
                  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                    <circle
                      cx="7"
                      cy="7"
                      r="6.09"
                      fill="none"
                      stroke="#F8F8F8"
                      strokeWidth="1.82"
                      strokeDasharray="28.70 38.27"
                    />
                  </svg>
                </span>
                SENDING
              </span>
            </div>
          </section>

          <section className="iyt-pane iyt-pane-sent">
            <div className="iyt-tick">
              <svg width="11" height="9" viewBox="0 0 11 9" fill="none" aria-hidden="true">
                <path d="M0 5 L4 9 L11 0" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="iyt-title iyt-title-mid iyt-sent-line">Invite sent</h3>
            <div className="iyt-sentmail iyt-sent-line">marcus@company.com</div>
            <div className="iyt-btn">DONE</div>
          </section>
        </div>

        <span className="iyt-flyer">marcus@company.com</span>
        <div className="iyt-ripple" />

        <svg className="iyt-cursor" width="29.79" height="36.1" viewBox="0 0 29.79 36.1" aria-hidden="true">
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
   in Figma units rather than rem tokens, exactly as TeamPermissions was. The
   whole tile is scaled to its container above. Type comes from the site's own
   next/font variables so it matches everything else. */
const CSS = `
.iyt-stage{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
  transform-origin:50% 50%;width:312px;height:340px;border-radius:9px;overflow:hidden;
  background:#F2F2F2;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
.iyt-stage *,.iyt-stage *::before,.iyt-stage *::after{box-sizing:border-box}
.iyt-plate{position:absolute;left:0;top:0;width:312px;height:340px;
  background:linear-gradient(124.96deg,#0B2952 0%,#5D8FDC 55%,#AFCCF6 100%);transform-origin:50% 50%}
.iyt-card{position:absolute;left:42px;top:50%;width:229px;height:196px;background:#fff;
  border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,.06);overflow:hidden}
.iyt-pane{position:absolute;top:0;left:0;width:229px;padding:16px;display:flex;flex-direction:column;margin:0}
.iyt-pane-team{gap:16px}
.iyt-pane-invite{gap:16px}
.iyt-pane-role{gap:20px}
.iyt-pane-sent{gap:12px}
/* the button sits 18 below the content on every card. Each pane keeps its own
   inner rhythm, so the button carries the difference. */
.iyt-pane-team .iyt-btn{margin-top:2px}
.iyt-pane-invite .iyt-btn{margin-top:2px}
.iyt-pane-role .iyt-btn{margin-top:-2px}
.iyt-pane-sent .iyt-btn{margin-top:6px}
.iyt-title{font-family:var(--font-display),'Satoshi',sans-serif;font-weight:700;font-size:18px;
  line-height:24px;color:#1D1D1F;margin:0;padding:0;letter-spacing:0}
.iyt-title-mid{text-align:center}
.iyt-list{display:flex;flex-direction:column;gap:12px}
.iyt-person{display:flex;align-items:center;gap:9px;height:32px}
.iyt-ava{width:28px;height:28px;border-radius:50%;flex:none;background-size:cover;background-position:center}
.iyt-ava-sarah{background-image:url(/motion/loop-sarah.png)}
.iyt-ava-daniel{background-image:url(/motion/loop-daniel.png)}
.iyt-ava-init{background:#F2F2F2;display:flex;align-items:center;justify-content:center;
  font-family:var(--font-sans),sans-serif;font-weight:600;font-size:12px;line-height:16px;
  letter-spacing:.3px;color:#1D1D1F}
.iyt-meta{display:flex;flex-direction:column}
.iyt-name{font-family:var(--font-sans),sans-serif;font-weight:600;font-size:12px;line-height:16px;
  letter-spacing:.19px;color:#1D1D1F}
.iyt-sub{font-family:var(--font-sans),sans-serif;font-weight:400;font-size:10px;line-height:14px;
  letter-spacing:.19px;color:#6E6E73;margin-top:2px}
.iyt-btn{height:32px;flex:none;border-radius:24px;background:#2C2D2E;color:#F8F8F8;
  font-family:var(--font-sans),sans-serif;font-weight:600;font-size:12px;line-height:16px;
  letter-spacing:1.16px;display:flex;align-items:center;justify-content:center;position:relative}
.iyt-lbl{position:absolute;top:0;right:0;bottom:0;left:0;display:flex;align-items:center;
  justify-content:center;gap:8px}
.iyt-field{height:36px;flex:none;border:1px solid #1D1D1F;border-radius:8px;padding:10px 12px;
  display:flex;align-items:center;background:#fff}
.iyt-typed{font-family:var(--font-sans),sans-serif;font-weight:400;font-size:12px;line-height:16px;
  letter-spacing:.19px;color:#1D1D1F;white-space:pre}
.iyt-caret{width:1.4px;height:16px;background:#1D1D1F;display:block;flex:none}
.iyt-roles{display:flex;flex-direction:column;gap:6px}
.iyt-role{height:34px;border:1px solid #ECECEC;border-radius:8px;background:#fff;padding:9px 12px;
  display:flex;align-items:center;gap:9px;font-family:var(--font-sans),sans-serif;font-weight:600;
  font-size:12px;line-height:16px;letter-spacing:.19px;color:#1D1D1F}
.iyt-radio{width:14px;height:14px;border-radius:50%;border:1px solid #D2D2D7;flex:none;
  display:flex;align-items:center;justify-content:center}
.iyt-dot{width:6px;height:6px;border-radius:50%;background:#2C2D2E}
.iyt-spinner{width:14px;height:14px;flex:none;display:block;transform-origin:50% 50%}
.iyt-spinner svg{display:block}
.iyt-tick{width:32px;height:32px;border-radius:50%;background:#1A9E5C;align-self:center;position:relative}
.iyt-tick svg{position:absolute;left:10.5px;top:11.5px;overflow:visible}
.iyt-sentmail{font-family:var(--font-sans),sans-serif;font-weight:400;font-size:12px;line-height:16px;
  letter-spacing:.19px;color:#6E6E73;text-align:center}
.iyt-flyer{position:absolute;top:0;left:0;font-family:var(--font-sans),sans-serif;font-weight:400;
  font-size:12px;line-height:16px;letter-spacing:.19px;color:#1D1D1F;white-space:pre;opacity:0;
  transform-origin:0 0}
.iyt-ripple{position:absolute;top:0;left:0;width:26px;height:26px;border-radius:50%;
  background:#181818;opacity:0}
.iyt-cursor{position:absolute;top:0;left:0;filter:drop-shadow(1.9px 5.7px 3.8px rgba(0,0,0,.25))}
`;
