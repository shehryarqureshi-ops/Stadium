"use client";

import gsap from "gsap";
import { useCallback, useEffect, useId, useLayoutEffect, useRef } from "react";
import { useCardActive } from "@/app/components/common/cardActive";

// ─────────────────────────────────────────────────────────────
// Stadium — "Redemption" auto-looping animation
//
// The four states of "13 Redemption" on the Imagery System board, played as
// one continuous card. Geometry is measured off the Figma frames and verified
// element by element: card, hero, categories, tiles, summary and button all
// land on the board's own coordinates. Diffed at 2.37 of 255, and that floor
// is set by two things nothing can match — the gift emoji, which Figma draws
// with its own emoji font and the browser draws with the operating system's,
// and the photographs, which the two resample differently. The emoji alone is
// 1% of the frame and 14% of its difference.
//
// This is the only card in the set where the reader is the recipient rather
// than the buyer, so the shelf was redesigned against the live storefront
// rather than against the board. Walked at bystadium.com: their store opens on
// an illustrated occasion banner with the points balance always in view, then
// a category row, then a grid of products carrying their colourways and a
// price in points. Ours was a flat black bar and three grey tiles.
//
// The cursor presses the product, not the button, because on a shelf the act
// is choosing the thing.
//
// Prices are the shop's own currency and the balance is what the gift carried,
// so what is left over is arithmetic rather than a number somebody typed.
//
// Figma: Imagery System (F7rDHYd3n5nwRtrlv1F6dO), TAB 3 ENGAGE / 13 Redemption.
// ─────────────────────────────────────────────────────────────

const TILE_W = 312;
const TILE_H = 340;

const SEQ = 22.0;
const LOOP_PAUSE = 1.2;

/** Card heights, straight out of the Figma frames. */
const H = { gift: 296, shelf: 302, pick: 320, done: 301 };

const midY = (h: number) => Math.floor((TILE_H - h) / 2) - 170;

/** The tip sits at the centre of what it presses. */
const AT = {
  gift: [180, 286],
  hoodie: [88, 183],
  pick: [180, 298],
  off: [300, 372],
} as const;

const GIFT = 500;
type Item = { id: string; n: string; pts: number; img: string; sw: string[] };
const SHELF: Item[] = [
  { id: "hoodie", n: "Hoodie", pts: 250, img: "loop-rdm-hoodie.jpg", sw: ["#4B2E9E", "#181818", "#E8E4DC"] },
  { id: "bottle", n: "Bottle", pts: 120, img: "loop-rdm-bottle.jpg", sw: ["#181818", "#8A9BA8"] },
  { id: "cap", n: "Cap", pts: 75, img: "loop-rdm-cap.jpg", sw: ["#E8E4DC", "#181818", "#2C3E50"] },
];
const PICKED = SHELF[0];
const AFTER = GIFT - PICKED.pts;

const comma = (n: number) =>
  String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const CURSOR_PATH =
  "M 3.517744918677711 0.4632220180675262 C 2.0861227443626604 -0.6503909256464298 0 0.3698216042463711 0 2.1835747248015087 L 0 26.897803210796148 C 0 28.964295431870166 2.6074537145937384 29.870546862504835 3.889181774689332 28.2495520949281 L 9.978796515347982 20.548227879783475 C 10.43359339409915 19.973265843402263 11.126394590038597 19.637761977178336 11.859445763373602 19.637761977178336 L 21.816155402149448 19.637761977178336 C 23.891366004515344 19.637761977178336 24.79238904164448 17.012000526346874 23.154393696946684 15.737988132861453 L 3.517744918677711 0.4632220180675262 Z";

const SPARKS: [number, number, number, number][] = [
  [18, 14, 18, 0.85], [164, 20, 12, 0.55], [142, 54, 10, 0.85], [34, 52, 8, 0.55],
];

const Hero = ({ balClass }: { balClass: string }) => (
  <div className="rd-hero">
    {SPARKS.map(([x, y, s, o], i) => (
      <svg key={i} className="rd-spark" style={{ left: x, top: y }}
        width={s} height={s} viewBox="0 0 18 18" aria-hidden="true">
        <path d="M9 0 L10.6 7.4 L18 9 L10.6 10.6 L9 18 L7.4 10.6 L0 9 L7.4 7.4 Z"
          fill="#fff" opacity={o} />
      </svg>
    ))}
    <span className="rd-wm">ARCADE</span>
    <span className="rd-sub2">SWAG SHOP</span>
    <span className={`rd-bal ${balClass}`} />
  </div>
);

/** Both grids come off one list, so a product cannot be on one and not the other. */
const Tiles = ({ scope, withBox }: { scope: string; withBox: boolean }) => (
  <div className={`rd-tiles rd-tiles-${scope}`}>
    {SHELF.map((p) => {
      const on = withBox && p.id === PICKED.id;
      return (
        <div key={p.id} className={`rd-tile rd-t-${scope}-${p.id}`}>
          <span className="rd-shot"
            style={{
              backgroundImage: `url(/motion/${p.img})`,
              boxShadow: on ? "inset 0 0 0 1.4px #1D1D1F" : undefined,
            }}>
            {on && (
              <span className="rd-box">
                <svg width="7" height="5.5" viewBox="0 0 7 6" aria-hidden="true">
                  <path d="M1 3.1 L2.7 4.8 L6 1" fill="none" stroke="#fff"
                    strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            )}
          </span>
          <span className="rd-sw">
            {p.sw.map((c) => <i key={c} style={{ background: c }} />)}
          </span>
          <span className="rd-meta">
            <span className="rd-nm">{p.n}</span>
            <span className="rd-pr">{comma(p.pts)} Pts</span>
          </span>
        </div>
      );
    })}
  </div>
);

export default function RedemptionLoop() {
  const scope = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const reducedRef = useRef(false);
  const visibleRef = useRef(true);
  const cardActive = useCardActive();
  const activeRef = useRef(cardActive);

  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const clipId = `rd-cur-${uid}`;

  const applyPlayState = useCallback(() => {
    const tl = tlRef.current;
    if (!tl) return;
    if (visibleRef.current && activeRef.current && !reducedRef.current) tl.play();
    else tl.pause();
  }, []);

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
      const card = q(".rd-card");
      const cursor = q(".rd-cursor");
      const ripple = q(".rd-ripple");

      const PANE = {
        gift: q(".rd-pane-gift"),
        shelf: q(".rd-pane-shelf"),
        pick: q(".rd-pane-pick"),
        done: q(".rd-pane-done"),
      };

      gsap.set(card, { y: midY(H.gift), height: H.gift });
      gsap.set(PANE.gift, { autoAlpha: 1 });
      gsap.set([PANE.shelf, PANE.pick, PANE.done], { autoAlpha: 0 });
      gsap.set(cursor, { x: AT.off[0], y: AT.off[1], transformOrigin: "0px 0px" });
      gsap.set(ripple, { x: AT.off[0] - 9, y: AT.off[1] - 9, scale: 0.3, opacity: 0 });
      [".rd-gpts", ".rd-bal1", ".rd-bal2", ".rd-after", ".rd-redeem", ".rd-dpts", ".rd-left"]
        .forEach((s) => { q(s).textContent = ""; });

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

      const tl = gsap.timeline({ repeat: -1, repeatDelay: LOOP_PAUSE, paused: true });
      tlRef.current = tl;

      tl.fromTo(q(".rd-plate"), { x: 0, y: 0, scale: 1 },
        { x: -10, y: 8, scale: 1.08, duration: SEQ, ease: "none" }, 0);

      // 1 the gift arrives
      tl.addLabel("1 the gift arrives", 0);
      tl.to({ n: 0 }, { n: 1, duration: 0.01,
        onUpdate() { q(".rd-gpts").textContent = comma(GIFT); } }, 0.2);
      tl.from(q(".rd-emoji"), { scale: 0.5, autoAlpha: 0, duration: 0.55,
        ease: "back.out(2.2)", transformOrigin: "50% 50%" }, 0.2);
      tl.from(root.querySelectorAll(".rd-pane-gift .rd-gifthd, .rd-pane-gift .rd-sender, .rd-pane-gift .rd-amount, .rd-pane-gift .rd-quote, .rd-pane-gift .rd-btn"),
        { y: 10, autoAlpha: 0, duration: 0.5, stagger: 0.11 }, 0.55);
      moveTo(tl, 3.1, AT.gift, 0.7);
      press(tl, 3.9);

      // 2 the shelf: the storefront, and the moment of choosing
      tl.addLabel("2 the shelf", 4.5);
      swap(tl, PANE.gift, PANE.shelf, H.shelf, 4.5);
      tl.to({ n: 0 }, { n: 1, duration: 0.01,
        onUpdate() { q(".rd-bal1").textContent = `${comma(GIFT)} PTS`; } }, 4.9);
      tl.from(q(".rd-pane-shelf .rd-hero"), { y: 12, autoAlpha: 0, duration: 0.55 }, 4.9);
      tl.from(root.querySelectorAll(".rd-pane-shelf .rd-spark"),
        { scale: 0, autoAlpha: 0, duration: 0.5, stagger: 0.08,
          ease: "back.out(2.5)", transformOrigin: "50% 50%" }, 5.25);
      tl.from(root.querySelectorAll(".rd-pane-shelf .rd-cat"),
        { y: 8, autoAlpha: 0, duration: 0.4, stagger: 0.07 }, 5.45);
      tl.from(root.querySelectorAll(".rd-pane-shelf .rd-tile"),
        { y: 12, autoAlpha: 0, duration: 0.5, stagger: 0.11 }, 5.75);
      // the cursor goes to the product, not to the button
      moveTo(tl, 7.2, AT.hoodie, 0.8);
      tl.to(q(".rd-t-shelf-hoodie .rd-shot"),
        { scale: 1.06, duration: 0.25, transformOrigin: "50% 50%" }, 8.0);
      tl.to(q(".rd-t-shelf-hoodie .rd-shot"), { scale: 1, duration: 0.35 }, 8.25);
      press(tl, 8.1);

      // 3 the pick
      tl.addLabel("3 the pick", 8.9);
      swap(tl, PANE.shelf, PANE.pick, H.pick, 8.9);
      tl.to({ n: 0 }, { n: 1, duration: 0.01,
        onUpdate() {
          q(".rd-bal2").textContent = `${comma(GIFT)} PTS`;
          q(".rd-after").textContent = `${comma(AFTER)} pts`;
          q(".rd-redeem").textContent = `REDEEM ${comma(PICKED.pts)} POINTS`;
        } }, 9.3);
      tl.from(q(".rd-t-pick-hoodie .rd-box"), { scale: 0, autoAlpha: 0, duration: 0.4,
        ease: "back.out(2.5)", transformOrigin: "50% 50%" }, 9.4);
      tl.from(root.querySelectorAll(".rd-pane-pick .rd-srow"),
        { y: 8, autoAlpha: 0, duration: 0.45, stagger: 0.12 }, 9.7);
      moveTo(tl, 11.6, AT.pick, 0.7);
      press(tl, 12.4);

      // 4 on its way
      tl.addLabel("4 on its way", 13.0);
      swap(tl, PANE.pick, PANE.done, H.done, 13.0);
      moveTo(tl, 13.05, AT.off, 0.8);
      tl.to({ n: 0 }, { n: 1, duration: 0.01,
        onUpdate() {
          q(".rd-dpts").textContent = `${comma(PICKED.pts)} pts`;
          q(".rd-left").textContent = comma(AFTER);
        } }, 13.45);
      tl.from(q(".rd-pane-done .rd-donehd"), { y: 8, autoAlpha: 0, duration: 0.42 }, 13.45);
      tl.from(q(".rd-parcel"), { y: 12, autoAlpha: 0, duration: 0.5 }, 13.7);
      tl.from(root.querySelectorAll(".rd-pane-done .rd-drow"),
        { y: 8, autoAlpha: 0, duration: 0.42, stagger: 0.12 }, 14.2);
      tl.from(q(".rd-pane-done .rd-btn"), { y: 8, autoAlpha: 0, duration: 0.42 }, 14.6);
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

  useEffect(() => {
    activeRef.current = cardActive;
    const tl = tlRef.current;
    if (cardActive && tl && visibleRef.current && !reducedRef.current) tl.restart();
    else applyPlayState();
  }, [cardActive, applyPlayState]);

  return (
    <div ref={scope} className="relative h-full w-full overflow-hidden">
      <style>{CSS}</style>

      <div ref={stageRef} className="rd-stage">
        <div className="rd-plate" />

        <div className="rd-card">
          {/* 1 the gift arrives */}
          <section className="rd-pane rd-pane-gift">
            <div className="rd-emoji">&#127873;</div>
            <div className="rd-gifthd"><p className="rd-title">A gift for you</p></div>
            <div className="rd-sender">
              <span className="rd-av" />
              <span className="rd-from">from Sarah Johnson</span>
            </div>
            <div className="rd-amount">
              <span className="rd-n rd-gpts" />
              <span className="rd-k">POINTS TO SPEND</span>
            </div>
            <span className="rd-fine rd-quote">&ldquo;Shipped the rebrand early.&rdquo;</span>
            <div className="rd-btn">OPEN YOUR GIFT</div>
          </section>

          {/* 2 the shelf */}
          <section className="rd-pane rd-pane-shelf">
            <Hero balClass="rd-bal1" />
            <div className="rd-cats">
              <span className="rd-cat rd-on">All</span>
              <span className="rd-cat">Merch</span>
              <span className="rd-cat">Food &amp; Drink</span>
            </div>
            <Tiles scope="shelf" withBox={false} />
            <div className="rd-btn">REDEEM</div>
          </section>

          {/* 3 the pick */}
          <section className="rd-pane rd-pane-pick">
            <Hero balClass="rd-bal2" />
            <Tiles scope="pick" withBox />
            <div className="rd-summary">
              <div className="rd-srow">
                <span className="rd-sk">Ships to</span><span className="rd-ssp" />
                <span className="rd-sv">Berlin, DE</span>
              </div>
              <div className="rd-srow">
                <span className="rd-sk">Balance after</span><span className="rd-ssp" />
                <span className="rd-sv rd-b rd-after" />
              </div>
            </div>
            <div className="rd-btn rd-redeem" />
          </section>

          {/* 4 on its way */}
          <section className="rd-pane rd-pane-done">
            <div className="rd-donehd"><p className="rd-title">On its way</p></div>
            <div className="rd-parcel">
              <div className="rd-big" />
              <div className="rd-line">
                <span className="rd-pnm">Hoodie</span><span className="rd-psp" />
                <span className="rd-st">Shipped</span>
              </div>
              <span className="rd-pts rd-dpts" />
            </div>
            <div className="rd-drow">
              <span className="rd-dk rd-db">Order</span><span className="rd-dsp" />
              <span className="rd-dv">#4821</span>
            </div>
            <div className="rd-drow">
              <span className="rd-dk">Points remaining</span><span className="rd-dsp" />
              <span className="rd-dv rd-left" />
            </div>
            <div className="rd-btn">TRACK ORDER</div>
          </section>
        </div>

        <div className="rd-ripple" />
        <svg className="rd-cursor" width="24" height="29.08" viewBox="0 0 24 29.08" aria-hidden="true">
          <defs><clipPath id={clipId}><path d={CURSOR_PATH} /></clipPath></defs>
          <path clipPath={`url(#${clipId})`} d={CURSOR_PATH}
            fill="#181818" stroke="#ffffff" strokeWidth="3.06" strokeLinejoin="miter" />
        </svg>
      </div>
    </div>
  );
}

const CSS = `
.rd-stage{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
  transform-origin:50% 50%;width:312px;height:340px;border-radius:9px;overflow:hidden;
  background:#F2F2F2;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
.rd-stage *,.rd-stage *::before,.rd-stage *::after{box-sizing:border-box}
.rd-plate{position:absolute;left:0;top:0;width:312px;height:340px;
  background:linear-gradient(124.96deg,#0B2952 0%,#5D8FDC 55%,#AFCCF6 100%);transform-origin:50% 50%}
.rd-card{position:absolute;left:42px;top:170px;width:229px;height:296px;background:#fff;
  border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,.06);overflow:hidden}
.rd-pane{position:absolute;top:0;left:0;width:229px;padding:16px;display:flex;
  flex-direction:column;gap:12px;margin:0}
.rd-pane-gift{align-items:center}
.rd-pane-done{gap:14px}

.rd-title{font-family:var(--font-display),'Satoshi',sans-serif;font-weight:700;font-size:18px;
  line-height:24px;color:#1D1D1F;margin:0;padding:0;letter-spacing:0;white-space:nowrap}
.rd-fine{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:400;font-size:10px;
  line-height:14px;letter-spacing:.19px;color:#6E6E73;flex:none}

/* 1 the gift arrives */
.rd-emoji{width:197px;height:30px;flex:none;font:400 24px/30px var(--font-sans),'Overpass',sans-serif;
  text-align:center}
.rd-gifthd{width:197px;height:24px;flex:none;display:flex;align-items:center;justify-content:center}
.rd-sender{width:197px;height:20px;flex:none;display:flex;align-items:center;
  justify-content:center;gap:6px}
.rd-av{width:20px;height:20px;border-radius:50%;flex:none;
  background:url(/motion/loop-rdm-sarah.jpg) center/cover no-repeat}
.rd-from{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:400;font-size:12px;
  line-height:16px;letter-spacing:.19px;color:#6E6E73}
.rd-amount{width:197px;height:84px;flex:none;border-radius:8px;background:#1D1D1F;padding:16px;
  display:flex;flex-direction:column;align-items:center;gap:2px}
.rd-n{font-family:var(--font-display),'Satoshi',sans-serif;font-weight:700;font-size:30px;
  line-height:36px;color:#fff}
.rd-k{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:700;font-size:10px;
  line-height:14px;letter-spacing:1px;color:#A1A1A6}
.rd-quote{width:197px;text-align:center}

/* 2 the shelf. Their storefront opens on an illustrated occasion band with the
   balance always in view, then a category row, then a grid of products with
   their colourways. Ours was a flat bar and three grey tiles. The gradient runs
   left to right because that is the one direction Figma and CSS express
   identically; a rotated one drifted apart at the warm end. */
.rd-hero{width:197px;height:72px;flex:none;border-radius:8px;position:relative;overflow:hidden;
  background:linear-gradient(to right,#DCE7FF 0%,#F3ECFF 55%,#FFEDDF 100%)}
.rd-spark{position:absolute;display:block}
.rd-wm{position:absolute;left:16px;top:22px;font-family:var(--font-display),'Satoshi',sans-serif;
  font-weight:700;font-size:20px;line-height:24px;letter-spacing:.4px;color:#0B2952}
.rd-sub2{position:absolute;left:17px;top:46px;font-family:var(--font-sans),'Overpass',sans-serif;
  font-weight:700;font-size:9px;line-height:12px;letter-spacing:1.4px;color:#0B2952;opacity:.65}
.rd-bal{position:absolute;right:12px;top:12px;height:19px;border-radius:8px;background:#fff;
  padding:4px 9px 3px;font-family:var(--font-sans),'Overpass',sans-serif;font-weight:700;
  font-size:9px;line-height:12px;letter-spacing:.75px;color:#0B2952}
.rd-cats{width:197px;flex:none;display:flex;gap:6px}
.rd-cat{height:20px;border-radius:20px;background:#F2F2F2;padding:3px 9px;
  font-family:var(--font-sans),'Overpass',sans-serif;font-weight:600;font-size:9px;line-height:14px;
  letter-spacing:.3px;color:#6E6E73;white-space:nowrap}
.rd-on{background:#1D1D1F;color:#fff}
.rd-tiles{width:197px;flex:none;display:flex;gap:9px}
.rd-tile{width:59.7px;display:flex;flex-direction:column;gap:6px}
.rd-shot{width:59.7px;height:64px;border-radius:8px;background-size:cover;
  background-position:center;position:relative;display:block}
.rd-box{position:absolute;right:6px;top:4px;width:12px;height:12px;border-radius:1.5px;
  background:#1D1D1F;display:flex;align-items:center;justify-content:center}
.rd-sw{height:5px;display:flex;gap:3px;align-items:center}
.rd-sw i{width:5px;height:5px;border-radius:50%;display:block;
  box-shadow:inset 0 0 0 .5px rgba(0,0,0,.08)}
.rd-meta{display:flex;flex-direction:column;gap:2px}
.rd-nm{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:400;font-size:10px;
  line-height:13px;letter-spacing:.19px;color:#1D1D1F}
.rd-pr{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:400;font-size:10px;
  line-height:14px;letter-spacing:.19px;color:#6E6E73}

/* 3 the pick */
.rd-summary{width:197px;flex:none;display:flex;flex-direction:column;gap:6px}
.rd-srow{height:16px;display:flex;align-items:center;gap:8px}
.rd-sk{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:400;font-size:12px;
  line-height:16px;color:#1D1D1F;white-space:nowrap}
.rd-ssp{flex:1}
.rd-sv{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:400;font-size:10px;
  line-height:14px;color:#6E6E73;white-space:nowrap}
.rd-b{font-weight:600;color:#1D1D1F}

/* 4 on its way */
.rd-donehd{width:197px;height:24px;flex:none;display:flex;align-items:center}
.rd-parcel{width:197px;flex:none;border-radius:6px;background:#F2F2F2;padding:9px;
  display:flex;flex-direction:column;gap:6px}
.rd-big{width:179px;height:65px;border-radius:8px;
  background:url(/motion/loop-rdm-shipped.jpg) center/cover no-repeat}
.rd-line{height:16px;display:flex;align-items:center;gap:9px}
.rd-pnm{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:600;font-size:12px;
  line-height:16px;letter-spacing:.19px;color:#1D1D1F}
.rd-psp{flex:1}
.rd-st{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:700;font-size:10px;
  line-height:14px;letter-spacing:.19px;color:#0E7A48}
.rd-pts{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:400;font-size:10px;
  line-height:14px;letter-spacing:.19px;color:#6E6E73}
.rd-drow{width:197px;height:16px;flex:none;display:flex;align-items:center;gap:9px}
.rd-dk{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:400;font-size:12px;
  line-height:16px;letter-spacing:.19px;color:#1D1D1F;white-space:nowrap}
.rd-db{font-weight:600}
.rd-dsp{flex:1}
.rd-dv{font-family:var(--font-sans),'Overpass',sans-serif;font-weight:400;font-size:10px;
  line-height:14px;letter-spacing:.19px;color:#6E6E73;white-space:nowrap}

.rd-btn{width:197px;height:32px;flex:none;border-radius:24px;background:#2C2D2E;color:#F8F8F8;
  font-family:var(--font-sans),'Overpass',sans-serif;font-weight:600;font-size:12px;line-height:16px;
  letter-spacing:1.16px;display:flex;align-items:center;justify-content:center;overflow:hidden}

.rd-ripple{position:absolute;top:0;left:0;width:26px;height:26px;border-radius:50%;
  background:#181818;opacity:0}
.rd-cursor{position:absolute;top:0;left:0;filter:drop-shadow(1.53px 4.59px 3.06px rgba(0,0,0,.25))}
`;
