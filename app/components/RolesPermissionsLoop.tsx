"use client";

import gsap from "gsap";
import { useCallback, useEffect, useId, useLayoutEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────
// Stadium — "Roles and permissions" auto-looping animation
//
// The seven states of "02 Roles and permissions" on the Imagery System board,
// played as one continuous card. Geometry, type, colour, the cursor vector
// path, the click ripple opacity and the spinner arc are measured off the
// Figma frames, not eyeballed. Each of the seven states was diffed against a
// Figma export: average mean pixel delta 1.72, worst frame 2.1% of pixels.
//
// Note this section differs from "01 Invite your team" in several values, so
// nothing is shared by assumption: level labels are Overpass Regular not
// SemiBold, the level row gap is 10 not 9, and the initials avatar is 10px
// muted rather than 12px ink.
//
// Figma: Imagery System (F7rDHYd3n5nwRtrlv1F6dO), 02 Roles and permissions.
// ─────────────────────────────────────────────────────────────

const TILE_W = 312;
const TILE_H = 340;

/** One pass, before the pause that precedes the loop. */
const SEQ = 9.4;
const LOOP_PAUSE = 1.2;

/** Card heights, straight out of the Figma frames. */
const H = { team: 192, perms: 194, levels: 284, saved: 178 };

/** Cursor rest points: the x,y of the cursor vector on each board frame. */
const AT = {
  daniel: [180, 193], // team card, Daniel's row at y174
  wallets: [180, 197], // perms card, Wallets row at y177
  full: [180, 232], // levels card, Full access row at y212
  save: [180, 280], // levels card, button at y264
  off: [312, 376],
} as const;

/** Selected and unselected row treatments. */
const SEL = { bg: "#F2F2F2", border: "#2C2D2E", bw: 1.4 };
const UN = { bg: "#FFFFFF", border: "#ECECEC", bw: 1 };
const RING = "#D2D2D7";

/** The board's own cursor path, in its 29.79 × 36.1 box. */
const CURSOR_PATH =
  "M 4.366701547142042 0.5750139264737654 C 2.589578160420114 -0.8073533323373735 0 0.459072678884477 0 2.7105487806798383 L 0 33.38919747874312 C 0 35.95440759337555 3.2367247861444213 37.07936964866745 4.827779291920988 35.06717132962759 L 12.387034077094162 25.50724433290989 C 12.95158957500235 24.793523557088054 13.81158827419962 24.37705070402858 14.72155069806391 24.37705070402858 L 27.081167551815078 24.37705070402858 C 29.65720008330488 24.37705070402858 30.77567193990594 21.11759985122833 28.742370216427954 19.536123064329352 L 4.366701547142042 0.5750139264737654 Z";

export default function RolesPermissionsLoop() {
  const scope = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const reducedRef = useRef(false);
  const visibleRef = useRef(true);

  // SVG ids must be unique per instance or a second copy steals the clip path.
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const clipId = `rp-cur-${uid}`;

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
      const card = q(".rp-card");
      const cursor = q(".rp-cursor");
      const ripple = q(".rp-ripple");

      const PANE = {
        team: q(".rp-pane-team"),
        perms: q(".rp-pane-perms"),
        levels: q(".rp-pane-levels"),
        saved: q(".rp-pane-saved"),
      };

      gsap.set(card, { yPercent: -50, height: H.team });
      gsap.set(cursor, { x: AT.off[0], y: AT.off[1], transformOrigin: "0px 0px" });
      gsap.set(ripple, { x: AT.off[0] - 9, y: AT.off[1] - 9, scale: 0.3, opacity: 0 });
      gsap.set([PANE.perms, PANE.levels, PANE.saved], { autoAlpha: 0 });
      gsap.set(PANE.team, { autoAlpha: 1 });
      // Wallets is not highlighted until it is pressed
      gsap.set(q(".rp-perm-wallets"), { backgroundColor: UN.bg, borderColor: UN.border, borderWidth: UN.bw });
      // the current value is View only, which is what the perms card says
      gsap.set(q(".rp-lvl-view"), { backgroundColor: SEL.bg, borderColor: SEL.border, borderWidth: SEL.bw });
      gsap.set(q(".rp-radio-view"), { borderColor: SEL.border, borderWidth: SEL.bw });
      gsap.set(q(".rp-dot-view"), { scale: 1 });
      gsap.set(q(".rp-lvl-full"), { backgroundColor: UN.bg, borderColor: UN.border, borderWidth: UN.bw });
      gsap.set(q(".rp-radio-full"), { borderColor: RING, borderWidth: 1 });
      gsap.set(q(".rp-dot-full"), { scale: 0 });
      gsap.set(q(".rp-lbl-saving"), { autoAlpha: 0 });

      // Rotate the wrapping span, never the <svg>: GSAP measures an SVG node's
      // bbox by reparenting it, and inside a visibility:hidden label that
      // silently moves the spinner to the end of the flex row.
      gsap.to(q(".rp-spinner"), { rotation: 360, duration: 0.85, repeat: -1, ease: "none" });

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

      const tl = gsap.timeline({ repeat: -1, repeatDelay: LOOP_PAUSE, paused: true });
      tlRef.current = tl;
      gsap.defaults({ ease: "power2.out", duration: 0.5 });

      // The gradient drifts out and back inside one pass, so t=0 is the board's framing.
      tl.to(
        q(".rp-plate"),
        { x: -22, y: 12, scale: 1.05, duration: SEQ / 2, repeat: 1, yoyo: true, ease: "sine.inOut" },
        0,
      );

      // 1 who has access
      tl.addLabel("1 who has access", 0);
      tl.fromTo(card, { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out" }, 0);
      tl.from(root.querySelectorAll(".rp-pane-team .rp-person"), { y: 8, autoAlpha: 0, duration: 0.5, stagger: 0.09 }, 0.18);

      // 2 press Daniel, whose card the next beat opens
      tl.addLabel("2 press daniel", 0.95);
      moveTo(tl, 0.95, AT.daniel, 0.85);
      press(tl, 1.85);
      tl.to(q('.rp-rowhl'), { opacity: 1, duration: 0.2 }, 1.87);

      // 3 Daniel's permissions, then the Wallets row is pressed
      tl.addLabel("3 open the list", 2.35);
      swap(tl, PANE.team, PANE.perms, H.perms, 2.35);
      moveTo(tl, 2.9, AT.wallets, 0.45);
      press(tl, 3.4);
      tl.to(q(".rp-perm-wallets"), { backgroundColor: SEL.bg, borderColor: SEL.border, borderWidth: SEL.bw, duration: 0.28 }, 3.45);

      // 4 the level list, with the current value still selected
      tl.addLabel("4 the level list", 3.85);
      swap(tl, PANE.perms, PANE.levels, H.levels, 3.85, 0.55);
      moveTo(tl, 4.65, AT.full, 0.5);
      press(tl, 5.2);

      // 5 the level changes: View only lets go, Full access takes it
      tl.addLabel("5 choose the level", 5.25);
      tl.to(q(".rp-lvl-view"), { backgroundColor: UN.bg, borderColor: UN.border, borderWidth: UN.bw, duration: 0.28 }, 5.25);
      tl.to(q(".rp-radio-view"), { borderColor: RING, borderWidth: 1, duration: 0.28 }, 5.25);
      tl.to(q(".rp-dot-view"), { scale: 0, duration: 0.2 }, 5.25);
      tl.to(q(".rp-lvl-full"), { backgroundColor: SEL.bg, borderColor: SEL.border, borderWidth: SEL.bw, duration: 0.28 }, 5.27);
      tl.to(q(".rp-radio-full"), { borderColor: SEL.border, borderWidth: SEL.bw, duration: 0.28 }, 5.27);
      tl.to(q(".rp-dot-full"), { scale: 1, duration: 0.34, ease: "back.out(2.4)" }, 5.31);
      moveTo(tl, 5.65, AT.save, 0.45);
      press(tl, 6.15);

      // 6 in flight
      tl.addLabel("6 saving", 6.35);
      tl.to(q(".rp-lbl-save"), { autoAlpha: 0, duration: 0.2 }, 6.35);
      tl.to(q(".rp-lbl-saving"), { autoAlpha: 1, duration: 0.25 }, 6.43);
      tl.to(q(".rp-btn-save"), { opacity: 0.7, duration: 0.25 }, 6.35);
      moveTo(tl, 6.5, AT.off, 0.7);

      // 7 saved, and the board ends here
      tl.addLabel("7 saved", 7.45);
      swap(tl, PANE.levels, PANE.saved, H.saved, 7.45, 0.55);
      tl.from(q(".rp-tick"), { scale: 0, duration: 0.55, ease: "back.out(2.2)" }, 7.7);
      tl.from(root.querySelectorAll(".rp-saved-line"), { y: 8, autoAlpha: 0, duration: 0.45, stagger: 0.07 }, 7.8);
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

  const person = (avatarClass: string | null, name: string, role: string, initials?: string) => (
    <div className="rp-person">
      {avatarClass ? (
        <div className={`rp-ava ${avatarClass}`} />
      ) : (
        <div className="rp-ava rp-ava-init">{initials}</div>
      )}
      <div className="rp-meta">
        <div className="rp-name">{name}</div>
        <div className="rp-sub">{role}</div>
      </div>
    </div>
  );

  return (
    <div ref={scope} className="relative h-full w-full overflow-hidden">
      <style>{CSS}</style>

      <div ref={stageRef} className="rp-stage">
        <div className="rp-plate" />

        <div className="rp-card">
          <section className="rp-pane rp-pane-team">
            {/* pressing a person is the only press in the board with no state change,
                so the row takes a highlight. It bleeds past the row and carries no
                border, because a roster is read rather than set: giving it the
                bordered treatment the permission rows use would need padding these
                rows do not have, and would move the contents between rest and press. */}
            <div className="rp-rowhl" />
            <h3 className="rp-title">Team permissions</h3>
            <div className="rp-list">
              {person("rp-ava-sarah", "Sarah Johnson", "Owner")}
              {person("rp-ava-daniel", "Daniel Reyes", "Admin")}
              {person(null, "Marcus Chen", "Sender", "MC")}
            </div>
          </section>

          <section className="rp-pane rp-pane-perms">
            {person("rp-ava-daniel", "Daniel Reyes", "Admin")}
            <div className="rp-perms">
              <div className="rp-perm">
                <span className="rp-k">Shops</span>
                <span className="rp-v">Full access</span>
              </div>
              <div className="rp-perm rp-perm-wallets">
                <span className="rp-k">Wallets</span>
                <span className="rp-v">View only</span>
              </div>
              <div className="rp-perm">
                <span className="rp-k">Orders</span>
                <span className="rp-v">Full access</span>
              </div>
            </div>
          </section>

          <section className="rp-pane rp-pane-levels">
            {person("rp-ava-daniel", "Daniel Reyes", "Admin")}
            <h3 className="rp-title">Wallets access</h3>
            <div className="rp-levels">
              <div className="rp-level rp-lvl-view">
                <span className="rp-radio rp-radio-view">
                  <i className="rp-dot rp-dot-view" />
                </span>
                View only
              </div>
              <div className="rp-level">
                <span className="rp-radio">
                  <i className="rp-dot" style={{ transform: "scale(0)" }} />
                </span>
                View &amp; edit
              </div>
              <div className="rp-level rp-lvl-full">
                <span className="rp-radio rp-radio-full">
                  <i className="rp-dot rp-dot-full" />
                </span>
                Full access
              </div>
            </div>
            <div className="rp-btn rp-btn-save">
              <span className="rp-lbl rp-lbl-save">SAVE</span>
              <span className="rp-lbl rp-lbl-saving">
                <span className="rp-spinner">
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
                SAVING
              </span>
            </div>
          </section>

          <section className="rp-pane rp-pane-saved">
            <div className="rp-tick">
              <svg width="11" height="9" viewBox="0 0 11 9" fill="none" aria-hidden="true">
                <path d="M0 5 L4 9 L11 0" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="rp-title rp-title-mid rp-saved-line">Access updated</h3>
            <div className="rp-savedsub rp-saved-line">Wallets &middot; Full access</div>
            <div className="rp-btn">DONE</div>
          </section>
        </div>

        <div className="rp-ripple" />

        <svg className="rp-cursor" width="29.79" height="36.1" viewBox="0 0 29.79 36.1" aria-hidden="true">
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
.rp-stage{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
  transform-origin:50% 50%;width:312px;height:340px;border-radius:9px;overflow:hidden;
  background:#F2F2F2;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
.rp-stage *,.rp-stage *::before,.rp-stage *::after{box-sizing:border-box}
.rp-plate{position:absolute;left:-31px;top:-120px;width:778px;height:475px;
  background:url(/motion/loop-plate.jpg) center/cover no-repeat;transform-origin:50% 50%}
.rp-card{position:absolute;left:42px;top:50%;width:229px;height:192px;background:#fff;
  border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,.06);overflow:hidden}
.rp-pane{position:absolute;top:0;left:0;width:229px;padding:16px;display:flex;flex-direction:column;margin:0}
.rp-pane-team{gap:16px}
.rp-pane-perms{gap:16px}
.rp-pane-levels{gap:16px}
.rp-pane-saved{gap:12px}
/* the button sits 18 below the content on every card. Each pane keeps its own
   inner rhythm, so the button carries the difference. */
.rp-pane-levels .rp-btn{margin-top:2px}
.rp-pane-saved .rp-btn{margin-top:6px}
.rp-title{font-family:var(--font-display),'Satoshi',sans-serif;font-weight:700;font-size:18px;
  line-height:24px;color:#1D1D1F;margin:0;padding:0;letter-spacing:0}
.rp-title-mid{text-align:center}
.rp-list{display:flex;flex-direction:column;gap:12px}
/* Daniel sits at y100..132, x16..213 in the card. Bled 8px each side and 4px top
   and bottom so it reads as behind the person rather than boxing them in. */
.rp-rowhl{position:absolute;left:8px;top:96px;width:213px;height:40px;border-radius:8px;background:#F2F2F2}
.rp-person{display:flex;align-items:center;gap:9px;height:32px}
.rp-ava{width:28px;height:28px;border-radius:50%;flex:none;background-size:cover;background-position:center}
.rp-ava-sarah{background-image:url(/motion/loop-sarah.png)}
.rp-ava-daniel{background-image:url(/motion/loop-daniel.png)}
.rp-ava-init{background:#F2F2F2;display:flex;align-items:center;justify-content:center;
  font-family:var(--font-sans),sans-serif;font-weight:600;font-size:10px;line-height:13px;
  letter-spacing:.3px;color:#6E6E73}
.rp-meta{display:flex;flex-direction:column}
.rp-name{font-family:var(--font-sans),sans-serif;font-weight:600;font-size:12px;line-height:16px;
  letter-spacing:.19px;color:#1D1D1F}
.rp-sub{font-family:var(--font-sans),sans-serif;font-weight:400;font-size:10px;line-height:14px;
  letter-spacing:.19px;color:#6E6E73;margin-top:2px}
.rp-perms{display:flex;flex-direction:column;gap:6px}
.rp-perm{height:34px;border:1px solid #ECECEC;border-radius:8px;background:#fff;padding:9px 12px;
  display:flex;align-items:center;justify-content:space-between}
.rp-k{font-family:var(--font-sans),sans-serif;font-weight:400;font-size:12px;line-height:16px;
  letter-spacing:.19px;color:#1D1D1F}
.rp-v{font-family:var(--font-sans),sans-serif;font-weight:400;font-size:12px;line-height:16px;
  letter-spacing:.19px;color:#6E6E73}
.rp-levels{display:flex;flex-direction:column;gap:6px}
.rp-level{height:34px;border:1px solid #ECECEC;border-radius:8px;background:#fff;padding:9px 12px;
  display:flex;align-items:center;gap:10px;font-family:var(--font-sans),sans-serif;font-weight:400;
  font-size:12px;line-height:16px;letter-spacing:.19px;color:#1D1D1F}
.rp-radio{width:14px;height:14px;border-radius:50%;border:1px solid #D2D2D7;flex:none;
  display:flex;align-items:center;justify-content:center}
.rp-dot{width:6px;height:6px;border-radius:50%;background:#2C2D2E}
.rp-btn{height:32px;flex:none;border-radius:24px;background:#2C2D2E;color:#F8F8F8;
  font-family:var(--font-sans),sans-serif;font-weight:600;font-size:12px;line-height:16px;
  letter-spacing:1.16px;display:flex;align-items:center;justify-content:center;position:relative}
.rp-lbl{position:absolute;top:0;right:0;bottom:0;left:0;display:flex;align-items:center;
  justify-content:center;gap:8px}
.rp-spinner{width:14px;height:14px;flex:none;display:block;transform-origin:50% 50%}
.rp-spinner svg{display:block}
.rp-tick{width:32px;height:32px;border-radius:50%;background:#1A9E5C;align-self:center;position:relative}
.rp-tick svg{position:absolute;left:10.5px;top:11.5px;overflow:visible}
.rp-savedsub{font-family:var(--font-sans),sans-serif;font-weight:400;font-size:12px;line-height:16px;
  letter-spacing:.19px;color:#6E6E73;text-align:center}
.rp-ripple{position:absolute;top:0;left:0;width:26px;height:26px;border-radius:50%;
  background:#181818;opacity:0}
.rp-cursor{position:absolute;top:0;left:0;filter:drop-shadow(1.9px 5.7px 3.8px rgba(0,0,0,.25))}
`;
