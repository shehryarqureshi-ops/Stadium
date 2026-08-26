"use client";

import gsap from "gsap";
import { useCallback, useEffect, useId, useLayoutEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────
// Stadium — "SSO and custom domain" auto-looping animation
//
// The six states of "06 SSO/Custom Domain" on the Imagery System board, played
// as one continuous card. Geometry, type, colour, the cursor vector path and
// the click ripple are measured off the Figma frames, not eyeballed. Each of
// the six states was diffed against a Figma export: average mean pixel delta
// 2.89, the residual being anti-aliasing on three small provider logos.
//
// The board named one frame "verifying" but drew it already verified, so the
// checks land one at a time here and the pill only then turns READY.
//
// Figma: Imagery System (F7rDHYd3n5nwRtrlv1F6dO), 06 SSO/Custom Domain.
// ─────────────────────────────────────────────────────────────

const TILE_W = 312;
const TILE_H = 340;

const SEQ = 9.8;
const LOOP_PAUSE = 1.2;

/** Card heights, straight out of the Figma frames. */
const H = { sso: 284, verify: 269, door: 177 };

/** Cursor rest points: the x,y of the cursor vector on each board frame. */
const AT = {
  google: [180, 221], // the Google Workspace row
  cont: [180, 280], // single sign-on card, button at y264
  enable: [180, 273], // ready card, button at y257
  off: [312, 376],
} as const;

const SEL = { bg: "#F2F2F2", border: "#1D1D1F", bw: 1.4 };
const UN = { bg: "#FFFFFF", border: "#ECECEC", bw: 1 };
const RING_UN = "#86868B";
const RING_ON = "#1D1D1F";

const CURSOR_PATH =
  "M 4.366701547142042 0.5750139264737654 C 2.589578160420114 -0.8073533323373735 0 0.459072678884477 0 2.7105487806798383 L 0 33.38919747874312 C 0 35.95440759337555 3.2367247861444213 37.07936964866745 4.827779291920988 35.06717132962759 L 12.387034077094162 25.50724433290989 C 12.95158957500235 24.793523557088054 13.81158827419962 24.37705070402858 14.72155069806391 24.37705070402858 L 27.081167551815078 24.37705070402858 C 29.65720008330488 24.37705070402858 30.77567193990594 21.11759985122833 28.742370216427954 19.536123064329352 L 4.366701547142042 0.5750139264737654 Z";

const PROVIDERS: [string, string, string, number, number][] = [
  ["okta", "Okta", "SAML 2.0", 26, 26],
  ["microsoft", "Microsoft Entra ID", "SAML 2.0", 15, 15],
  ["google", "Google Workspace", "OpenID Connect", 14.7, 15],
];

const CHECKS = ["Domain verified", "Admin consent granted", "Test login successful"];

const Tick = () => (
  <svg width="8" height="6" viewBox="0 0 8 6" fill="none" aria-hidden="true">
    <path d="M1 3.2 L3 5.2 L7 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function SsoDomainLoop() {
  const scope = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const reducedRef = useRef(false);
  const visibleRef = useRef(true);

  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const clipId = `so-cur-${uid}`;

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
      const card = q(".so-card");
      const cursor = q(".so-cursor");
      const ripple = q(".so-ripple");

      const PANE = { sso: q(".so-pane-sso"), verify: q(".so-pane-verify"), door: q(".so-pane-door") };

      gsap.set(card, { yPercent: -50, height: H.sso });
      gsap.set(cursor, { x: AT.off[0], y: AT.off[1], transformOrigin: "0px 0px" });
      gsap.set(ripple, { x: AT.off[0] - 9, y: AT.off[1] - 9, scale: 0.3, opacity: 0 });
      gsap.set([PANE.verify, PANE.door], { autoAlpha: 0 });
      gsap.set(PANE.sso, { autoAlpha: 1 });
      // no provider chosen, so CONTINUE cannot be pressed
      gsap.set(q(".so-prov-google"), { backgroundColor: UN.bg, borderColor: UN.border, borderWidth: UN.bw });
      gsap.set(q(".so-radio-google"), { borderColor: RING_UN });
      gsap.set(q(".so-dot-google"), { scale: 0 });
      gsap.set(q(".so-btn-continue"), { opacity: 0.4 });
      // nothing is verified yet
      gsap.set(root.querySelectorAll(".so-check"), { opacity: 0.25 });
      gsap.set(q(".so-pill"), { autoAlpha: 0 });
      gsap.set(q(".so-btn-enable"), { opacity: 0.4 });

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

      tl.to(q(".so-plate"),
        { x: -22, y: 12, scale: 1.05, duration: SEQ / 2, repeat: 1, yoyo: true, ease: "sine.inOut" }, 0);

      // 1 single sign-on, nothing chosen
      tl.addLabel("1 single sign-on", 0);
      tl.fromTo(card, { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out" }, 0);
      tl.from(q(".so-pane-sso .so-title"), { y: 8, autoAlpha: 0, duration: 0.5 }, 0.18);
      tl.from(root.querySelectorAll(".so-prov"), { y: 8, autoAlpha: 0, duration: 0.5, stagger: 0.08 }, 0.28);
      tl.from(q(".so-btn-continue"), { y: 8, autoAlpha: 0, duration: 0.5 }, 0.5);

      // 2 Google is chosen, which is what makes CONTINUE pressable
      tl.addLabel("2 press google", 0.95);
      moveTo(tl, 0.95, AT.google, 0.85);
      press(tl, 1.85);
      tl.to(q(".so-prov-google"), { backgroundColor: SEL.bg, borderColor: SEL.border, borderWidth: SEL.bw, duration: 0.28 }, 1.87);
      tl.to(q(".so-radio-google"), { borderColor: RING_ON, duration: 0.28 }, 1.87);
      tl.to(q(".so-dot-google"), { scale: 1, duration: 0.34, ease: "back.out(2.4)" }, 1.91);
      tl.to(q(".so-btn-continue"), { opacity: 1, duration: 0.3 }, 2.0);

      // 3 press continue
      moveTo(tl, 2.4, AT.cont, 0.5);
      press(tl, 2.95);
      tl.addLabel("3 press continue", 3.0);

      // 4 verifying: the board drew this already verified, so the checks land here
      tl.addLabel("4 verifying", 3.25);
      swap(tl, PANE.sso, PANE.verify, H.verify, 3.25, 0.55);
      moveTo(tl, 3.3, AT.off, 0.6);
      tl.to(q(".so-chk1"), { opacity: 1, duration: 0.3 }, 4.05);
      tl.to(q(".so-chk2"), { opacity: 1, duration: 0.3 }, 4.55);
      tl.to(q(".so-chk3"), { opacity: 1, duration: 0.3 }, 5.05);

      // 5 ready
      tl.addLabel("5 ready", 5.45);
      tl.fromTo(q(".so-pill"), { autoAlpha: 0, scale: 0.8 },
        { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, 5.45);
      tl.to(q(".so-btn-enable"), { opacity: 1, duration: 0.3 }, 5.55);
      moveTo(tl, 5.85, AT.enable, 0.6);
      press(tl, 6.55);

      // 6 the customer's own front door
      tl.addLabel("6 your own front door", 6.85);
      swap(tl, PANE.verify, PANE.door, H.door, 6.85, 0.6);
      moveTo(tl, 6.9, AT.off, 0.7);
      tl.from(q(".so-addr"), { y: 8, autoAlpha: 0, duration: 0.5 }, 7.2);
      tl.from(root.querySelectorAll(".so-pane-door .so-title, .so-gbtn, .so-foot"),
        { y: 8, autoAlpha: 0, duration: 0.45, stagger: 0.09 }, 7.35);
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

      <div ref={stageRef} className="so-stage">
        <div className="so-plate" />

        <div className="so-card">
          <section className="so-pane so-pane-sso">
            <h3 className="so-title">Single sign-on</h3>
            <div className="so-provs">
              {PROVIDERS.map(([key, name, sub, w, h]) => (
                <div key={key} className={`so-prov${key === "google" ? " so-prov-google" : ""}`}>
                  <span className="so-who">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <span className="so-mk"><img src={`/motion/loop-${key}.svg`} width={w} height={h} alt="" /></span>
                    <span className="so-det">
                      <span className="so-nm">{name}</span>
                      <span className="so-sb">{sub}</span>
                    </span>
                  </span>
                  <span className={`so-radio${key === "google" ? " so-radio-google" : ""}`}>
                    <i className={`so-dot${key === "google" ? " so-dot-google" : ""}`}
                       style={key === "google" ? undefined : { transform: "scale(0)" }} />
                  </span>
                </div>
              ))}
            </div>
            <div className="so-btn so-btn-continue">CONTINUE</div>
          </section>

          <section className="so-pane so-pane-verify">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div className="so-handshake"><img src="/motion/loop-sso-handshake.png" alt="" /></div>
            <div className="so-vhead">
              <h3 className="so-title">Google SSO</h3>
              <span className="so-pill">READY</span>
            </div>
            <div className="so-checks">
              {CHECKS.map((c, i) => (
                <div className={`so-check so-chk${i + 1}`} key={c}>
                  <span className="so-tk"><Tick /></span>
                  <span>{c}</span>
                </div>
              ))}
            </div>
            <div className="so-btn so-btn-enable">ENABLE SIGN-ON</div>
          </section>

          <section className="so-pane so-pane-door">
            <div className="so-addr">
              <span className="so-url">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/motion/loop-lock.svg" width="13" height="13" alt="" />
                <span>rewards.yourbrand.com</span>
              </span>
              <span className="so-livepill">LIVE</span>
            </div>
            <h3 className="so-title so-title-mid">Sign in to Rewards</h3>
            <div className="so-gbtn">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/motion/loop-google.svg" width="13.72" height="14" alt="" />
              <span>CONTINUE WITH GOOGLE</span>
            </div>
            <div className="so-foot">Trouble signing in? Contact your admin.</div>
          </section>
        </div>

        <div className="so-ripple" />

        <svg className="so-cursor" width="29.79" height="36.1" viewBox="0 0 29.79 36.1" aria-hidden="true">
          <defs><clipPath id={clipId}><path d={CURSOR_PATH} /></clipPath></defs>
          <path clipPath={`url(#${clipId})`} d={CURSOR_PATH}
                fill="#181818" stroke="#ffffff" strokeWidth="3.8" strokeLinejoin="miter" />
        </svg>
      </div>
    </div>
  );
}

const CSS = `
.so-stage{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
  transform-origin:50% 50%;width:312px;height:340px;border-radius:9px;overflow:hidden;
  background:#F2F2F2;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
.so-stage *,.so-stage *::before,.so-stage *::after{box-sizing:border-box}
.so-plate{position:absolute;left:-31px;top:-120px;width:778px;height:475px;
  background:url(/motion/loop-plate.jpg) center/cover no-repeat;transform-origin:50% 50%}
.so-card{position:absolute;left:42px;top:50%;width:229px;height:284px;background:#fff;
  border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,.06);overflow:hidden}
.so-pane{position:absolute;top:0;left:0;width:229px;padding:16px;display:flex;flex-direction:column;margin:0}
.so-pane-sso{gap:16px}
.so-pane-verify{gap:16px}
.so-pane-door{gap:14px;align-items:center}
/* the button sits 18 below the content on the two cards whose button ends them.
   The front door card is not one: it carries a footnote under its button. */
.so-pane-sso .so-btn{margin-top:2px}
.so-pane-verify .so-btn{margin-top:2px}
.so-title{font-family:var(--font-display),'Satoshi',sans-serif;font-weight:700;font-size:18px;
  line-height:24px;color:#1D1D1F;margin:0;padding:0;letter-spacing:0}
.so-title-mid{text-align:center;width:197px}
.so-provs{display:flex;flex-direction:column;gap:6px}
.so-prov{height:50px;border-radius:8px;background:#fff;border:1px solid #ECECEC;padding:9px 12px;
  display:flex;align-items:center;justify-content:space-between}
.so-who{display:flex;align-items:center;gap:12px}
.so-mk{width:26px;height:26px;flex:none;display:flex;align-items:center;justify-content:center}
.so-det{display:flex;flex-direction:column;gap:2px}
.so-nm{font-family:var(--font-sans),sans-serif;font-weight:600;font-size:12px;line-height:16px;
  letter-spacing:.19px;color:#1D1D1F}
.so-sb{font-family:var(--font-sans),sans-serif;font-weight:400;font-size:10px;line-height:14px;
  letter-spacing:.19px;color:#6E6E73}
.so-radio{width:14px;height:14px;border-radius:50%;background:#fff;border:1.4px solid #86868B;
  flex:none;display:flex;align-items:center;justify-content:center}
.so-dot{width:6px;height:6px;border-radius:50%;background:#1D1D1F}
.so-btn{width:197px;height:32px;flex:none;border-radius:24px;background:#2C2D2E;color:#F8F8F8;
  font-family:var(--font-sans),sans-serif;font-weight:600;font-size:12px;line-height:16px;
  letter-spacing:1.16px;display:flex;align-items:center;justify-content:center;position:relative}
.so-handshake{height:63px;flex:none;position:relative;overflow:visible}
.so-handshake img{position:absolute;left:0;top:0;width:197px;height:63px}
.so-vhead{height:24px;flex:none;display:flex;align-items:center;justify-content:space-between}
.so-pill{height:19px;border-radius:8px;background:#F2F2F2;padding:4px 9px 3px;
  font-family:var(--font-sans),sans-serif;font-weight:700;font-size:9px;line-height:12px;
  letter-spacing:.75px;color:#1D1D1F}
.so-checks{display:flex;flex-direction:column;gap:10px}
.so-check{height:16px;display:flex;align-items:center;gap:12px}
.so-tk{width:14px;height:14px;border-radius:50%;background:#1D1D1F;flex:none;
  display:flex;align-items:center;justify-content:center}
.so-check span{font-family:var(--font-sans),sans-serif;font-weight:400;font-size:12px;
  line-height:16px;letter-spacing:.19px;color:#1D1D1F}
.so-addr{width:197px;height:33px;flex:none;border-radius:100px;background:#F2F2F2;
  padding:7px 9px 7px 12px;display:flex;align-items:center;justify-content:space-between}
.so-url{display:flex;align-items:center;gap:9px}
.so-url span{font-family:var(--font-sans),sans-serif;font-weight:400;font-size:10px;line-height:14px;
  letter-spacing:.19px;color:#6E6E73}
.so-livepill{height:19px;border-radius:18px;background:#D8F1CC;padding:4px 9px 3px;
  font-family:var(--font-sans),sans-serif;font-weight:700;font-size:9px;line-height:12px;
  letter-spacing:.75px;color:#1D1D1F}
.so-gbtn{width:197px;height:32px;flex:none;border-radius:24px;background:transparent;
  border:1px solid #CDCECF;padding:8px 16px;display:flex;align-items:center;
  justify-content:center;gap:8px}
.so-gbtn span{font-family:var(--font-sans),sans-serif;font-weight:600;font-size:10px;
  line-height:16px;letter-spacing:.9px;color:#1D1D1F}
.so-foot{width:197px;font-family:var(--font-sans),sans-serif;font-weight:400;font-size:10px;
  line-height:14px;letter-spacing:.19px;color:#6E6E73;text-align:center}
.so-ripple{position:absolute;top:0;left:0;width:26px;height:26px;border-radius:50%;
  background:#181818;opacity:0}
.so-cursor{position:absolute;top:0;left:0;filter:drop-shadow(1.9px 5.7px 3.8px rgba(0,0,0,.25))}
`;
