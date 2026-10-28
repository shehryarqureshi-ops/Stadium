"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { INTRO, type InfraTab } from "./content";

/* DOM halves of the infra pyramid scenes, matching the Figma scene frames
   (Stadium-Enterprise 6765:2845 Physical · 6765:3040 Digital · 6765:3104 People):
   a centred title + subheading + body, then a glass card (video beside a stacked
   tab list); the People diagram lives in PeopleDiagram.tsx. Motion in/out is owned by InfraPyramid. */

const FALLBACK_SECONDS = 8; // tabs without a clip advance on this clock

const eyebrow =
  "font-sans text-[0.75rem] font-bold uppercase leading-4 tracking-[0.0625rem] text-pyramid-ice";

export function ChapterHeader({
  index,
  eyebrowText,
  heading,
  body,
}: {
  index: string;
  eyebrowText: string;
  heading: string;
  body: string;
}) {
  /* lg: the parked pyramid (160px wide) sits to the left; the copy starts 196px in */
  return (
    <header className="pointer-events-auto flex flex-col items-center text-center lg:min-h-[8.875rem] lg:items-start lg:pl-[12.25rem] lg:text-left">
      <p className={eyebrow}>
        <span className="mr-3">{index}</span>
        {eyebrowText}
      </p>
      <h2 className="mt-3 font-display text-heading-md text-white md:text-[2.5rem] md:leading-[2.875rem] md:tracking-[-0.05rem]">
        {heading}
      </h2>
      <p className="mt-3 hidden max-w-[42.5rem] font-sans text-pyramid-lede text-hero-body md:block">{body}</p>
    </header>
  );
}

export function IntroCopy() {
  return (
    <div data-intro-copy className="pointer-events-auto mx-auto flex max-w-[27.5rem] flex-col items-center gap-2 text-center lg:mx-0 lg:max-w-[25rem] lg:items-start lg:text-left">
      <p className={eyebrow}>{INTRO.eyebrow}</p>
      <h2 className="mt-3 font-display text-display-md text-white lg:text-pyramid-display">
        {INTRO.title.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h2>
      <p className="mt-4 max-w-[27.5rem] font-sans text-pyramid-lede text-[#dddddd]">{INTRO.body}</p>
    </div>
  );
}

const glass =
  "pointer-events-auto relative rounded-[1.5rem] border-t border-[#4d4d4d] bg-black/90 p-2.5";

/* the #0b7afc bloom that sits behind each glass card (Figma Ellipse 22) */
function Bloom() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[130%] w-[140%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(11,122,252,0.34)_0%,rgba(11,122,252,0.16)_55%,rgba(11,122,252,0)_100%)]"
    />
  );
}

/* ---------- mobile carousel controls (arrows + dots) ---------- */

function Arrow({ dir, disabled, onClick }: { dir: "prev" | "next"; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={dir === "prev" ? "Previous" : "Next"}
      disabled={disabled}
      onClick={onClick}
      className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/[0.14] bg-white/10 text-white transition-opacity disabled:cursor-default disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d={dir === "prev" ? "M10 3 5 8l5 5" : "M6 3l5 5-5 5"} />
      </svg>
    </button>
  );
}

function CarouselControls({
  count,
  index,
  onGo,
  label,
}: {
  count: number;
  index: number;
  onGo: (i: number) => void;
  label: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 lg:hidden">
      <Arrow dir="prev" disabled={index === 0} onClick={() => onGo(index - 1)} />
      <div role="group" aria-label={`${label} pagination`} className="flex items-center gap-2">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to ${i + 1} of ${count}`}
            aria-current={i === index}
            onClick={() => onGo(i)}
            className={`h-2 cursor-pointer rounded-full transition-[width,background-color] duration-300 ${
              i === index ? "w-6 bg-white" : "w-2 bg-white/30"
            }`}
          />
        ))}
      </div>
      <Arrow dir="next" disabled={index === count - 1} onClick={() => onGo(index + 1)} />
    </div>
  );
}

/** Horizontal scroll-snap rail whose current slide is mirrored in React state. */
function useRail(count: number, onIndex: (i: number) => void) {
  const rail = useRef<HTMLDivElement>(null);
  const syncing = useRef(false);
  const onScroll = () => {
    const el = rail.current;
    if (!el || syncing.current) return;
    const i = Math.round(el.scrollLeft / Math.max(1, el.clientWidth));
    onIndex(Math.min(count - 1, Math.max(0, i)));
  };
  const goTo = useCallback(
    (i: number) => {
      const el = rail.current;
      if (!el) return;
      const target = Math.min(count - 1, Math.max(0, i)) * el.clientWidth;
      if (Math.abs(el.scrollLeft - target) < 2) return;
      syncing.current = true;
      el.scrollTo({ left: target, behavior: "smooth" });
      window.setTimeout(() => (syncing.current = false), 700);
    },
    [count],
  );
  return { rail, onScroll, goTo };
}

/* ---------- media placeholders ---------- */

function ScreenPlaceholder({ tab }: { tab: InfraTab }) {
  return (
    <div className="absolute inset-0 bg-[#0f0f10]">
      <div className="flex h-9 items-center gap-2 border-b border-white/[0.08] px-4 md:h-11">
        {[0, 1, 2].map((d) => (
          <span key={d} className="size-2 rounded-full bg-white/20" />
        ))}
        <span className="ml-3 flex h-6 flex-1 items-center justify-center rounded-md bg-white/[0.06] font-sans text-[0.75rem] text-white/45">
          app.bystadium.com/{tab.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}
        </span>
      </div>
    </div>
  );
}

function ClipPlaceholder() {
  return <div className="absolute inset-0 bg-[#0e0f11]" />;
}

/* ---------- video + tab card (Physical: tabs left · Digital: tabs right) ---------- */

export function MediaTabs({
  tabs,
  variant,
  playing,
  label,
}: {
  tabs: InfraTab[];
  variant: "clip" | "screen";
  playing: boolean;
  label: string;
}) {
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState<Record<number, boolean>>({});
  const bars = useRef<(HTMLElement | null)[]>([]); // [0] = phone bar, [1 + i] = tab i's bar
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const elapsed = useRef(0);
  const prevActive = useRef(0);
  const tab = tabs[active];
  const hasVideo = !!tab.video && !failed[active];
  const tabsFirst = variant === "clip";

  const advance = useCallback(() => setActive((a) => (a + 1) % tabs.length), [tabs.length]);
  const { rail, onScroll, goTo } = useRail(tabs.length, setActive);

  /* keep the phone carousel on the active tab (auto-advance, clicks, dots) */
  useEffect(() => goTo(active), [active, goTo]);

  const paint = (p: number) => {
    const t = `scaleX(${p})`;
    const phone = bars.current[0];
    const open = bars.current[1 + active];
    if (phone) phone.style.transform = t;
    if (open) open.style.transform = t;
  };

  /* tab change: every layer stays mounted (so the cross-fade is pure opacity, no
     remount or decode hitch) — rewind the incoming clip, pause the rest */
  useEffect(() => {
    elapsed.current = 0;
    for (const b of bars.current) if (b) b.style.transform = "scaleX(0)";
    videos.current.forEach((v, i) => {
      if (!v) return;
      if (i !== active) {
        window.setTimeout(() => {
          if (prevActive.current !== i) v.pause();
        }, 950); // let the outgoing clip fade out first
      } else if (prevActive.current !== active) {
        v.currentTime = 0;
      }
    });
    prevActive.current = active;
  }, [active]);

  /* play + progress, only while this chapter is the one on screen */
  useEffect(() => {
    const v = videos.current[active];
    if (!playing) {
      v?.pause();
      return;
    }
    if (hasVideo && v) {
      v.muted = true;
      void v.play().catch(() => {});
    }
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      let p = 0;
      if (hasVideo) {
        if (v && v.duration > 0) p = v.currentTime / v.duration;
      } else {
        elapsed.current += dt;
        p = elapsed.current / FALLBACK_SECONDS;
        if (p >= 1) {
          advance();
          return;
        }
      }
      paint(Math.min(1, p));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, active, hasVideo, advance]);

  const media = (
    <div
      className={`relative min-h-0 overflow-hidden rounded-lg bg-[#0e0f11] max-lg:min-h-[10rem] max-lg:flex-1 ${
        tabsFirst ? "lg:order-2" : "lg:order-1"
      }`}
    >
      {tabs.map((t, i) => (
        <div
          key={t.title}
          aria-hidden={i !== active}
          className="absolute inset-0 transition-opacity duration-[900ms] ease-in-out will-change-[opacity]"
          style={{ opacity: i === active ? 1 : 0 }}
        >
          {t.video && !failed[i] ? (
            <video
              ref={(el) => void (videos.current[i] = el)}
              src={t.video}
              poster={t.poster}
              muted
              playsInline
              preload="metadata" /* below the fold — buffer when played, not at page load */
              onEnded={i === active ? advance : undefined}
              onError={() => setFailed((f) => ({ ...f, [i]: true }))}
              aria-label={`${t.title} — ${label}`}
              className="absolute inset-0 size-full object-cover"
            />
          ) : variant === "screen" ? (
            <ScreenPlaceholder tab={t} />
          ) : (
            <ClipPlaceholder />
          )}
        </div>
      ))}
      <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
      {/* progress — phones/tablet (desktop shows it inside the open tab) */}
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 bg-white/15 lg:hidden">
        <span
          ref={(el) => void (bars.current[0] = el)}
          className="block h-full origin-left bg-pyramid-ice"
          style={{ transform: "scaleX(0)" }}
        />
      </span>
    </div>
  );

  return (
    <div
      className={`${glass} flex flex-col gap-2.5 max-lg:h-full lg:h-[35.625rem] lg:grid ${
        tabsFirst ? "lg:grid-cols-[26.25rem_minmax(0,1fr)]" : "lg:grid-cols-[minmax(0,1fr)_26.25rem]"
      }`}
    >
      <Bloom />
      {media}

      {/* phones/tablet: tab cards as a horizontal carousel + arrows + dots */}
      <div className="flex flex-col gap-3 lg:hidden">
        <div
          ref={rail}
          onScroll={onScroll}
          className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {tabs.map((t, i) => (
            <div key={t.title} className="w-full shrink-0 snap-center">
              <div className={`flex h-[6.25rem] flex-col rounded-xl p-4 ${i === active ? "bg-white/10" : "bg-pyramid-tab"}`}>
                <span className="font-sans text-pyramid-tab text-white">{t.title}</span>
                {t.desc && <span className="mt-1.5 font-sans text-pyramid-meta text-white/60">{t.desc}</span>}
              </div>
            </div>
          ))}
        </div>
        <CarouselControls count={tabs.length} index={active} onGo={setActive} label={label} />
      </div>

      {/* tabs: stacked list at lg */}
      <div
        role="tablist"
        aria-label={label}
        className={`hidden lg:flex lg:min-h-0 lg:flex-col lg:gap-2.5 ${
          tabsFirst ? "lg:order-1" : "lg:order-2"
        }`}
      >
        {tabs.map((t, i) => {
          const on = i === active;
          return (
            <button
              key={t.title}
              type="button"
              role="tab"
              aria-selected={on}
              aria-label={t.title}
              onClick={() => setActive(i)}
              style={{ flexGrow: on ? (variant === "clip" ? 1.18 : 2.1) : 1 }}
              className={`relative cursor-pointer overflow-hidden rounded-xl text-left transition-[background-color,flex-grow] duration-[800ms] ease-[cubic-bezier(0.65,0,0.35,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:min-h-0 lg:flex-1 ${
                on ? "bg-white/10" : "bg-pyramid-tab hover:bg-[#232323]"
              }`}
            >
              {/* stacked list item: the title glides between centred and top-left */}
              <span
                className={`absolute left-6 hidden font-sans text-pyramid-tab transition-[top,transform,color] duration-[800ms] ease-[cubic-bezier(0.65,0,0.35,1)] lg:block ${
                  on ? "top-6 translate-y-0 text-white" : "top-1/2 -translate-y-1/2 text-white/55"
                }`}
              >
                {t.title}
              </span>
              <span
                aria-hidden={!on}
                className={`absolute inset-x-6 top-[3.75rem] hidden font-sans text-pyramid-meta text-white/60 transition-opacity lg:block ${
                  on ? "opacity-100 delay-300 duration-700" : "opacity-0 duration-200"
                }`}
              >
                {t.desc}
              </span>
              <span
                aria-hidden
                className={`absolute inset-x-6 bottom-6 hidden h-0.5 rounded-full bg-white/15 transition-opacity lg:block ${
                  on ? "opacity-100 delay-300 duration-700" : "opacity-0 duration-200"
                }`}
              >
                <span
                  ref={(el) => void (bars.current[1 + i] = el)}
                  className="block h-full origin-left rounded-full bg-pyramid-ice"
                  style={{ transform: "scaleX(0)" }}
                />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
