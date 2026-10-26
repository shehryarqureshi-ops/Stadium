"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { INTRO, PEOPLE, type InfraTab } from "./content";

/* DOM halves of the infra pyramid scenes (Figma 6749:9694): intro copy, the
   scroll-spy pill, the video/tab card used by Physical + Digital, and the
   People carousel. Motion in/out is owned by InfraPyramid; everything here is
   plain, accessible markup. */

const FALLBACK_SECONDS = 8; // tabs without a clip advance on this clock

/* ---------- shared bits ---------- */

const eyebrow =
  "font-sans text-[0.75rem] font-bold uppercase leading-4 tracking-[0.0625rem] text-pyramid-ice";

export function ChapterHeader({
  eyebrowText,
  heading,
  body,
}: {
  eyebrowText: string;
  heading: string;
  body: string;
}) {
  return (
    <header className="pointer-events-auto flex flex-col items-start">
      <p className={eyebrow}>{eyebrowText}</p>
      <h2 className="mt-3 font-display text-heading-md text-white md:text-pyramid-heading">
        {heading}
      </h2>
      <p className="mt-3 hidden max-w-[40rem] font-sans text-pyramid-lede text-hero-body md:block">
        {body}
      </p>
    </header>
  );
}

export function IntroCopy() {
  return (
    <div className="pointer-events-auto flex max-w-[27.5rem] flex-col items-start gap-2 lg:max-w-[32rem]">
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
  "pointer-events-auto relative rounded-[1.5rem] border-t border-[#4d4d4d] bg-black/90 p-2.5 lg:backdrop-blur-[30px]";

/* the #0b7afc bloom that sits behind each glass card (Figma Ellipse 22) */
function Bloom() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[130%] w-[140%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(11,122,252,0.34)_0%,rgba(11,122,252,0.16)_55%,rgba(11,122,252,0)_100%)]"
    />
  );
}

/* ---------- media placeholders ---------- */

function ScreenPlaceholder({ tab, index }: { tab: InfraTab; index: number }) {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(180deg,#0e0f13_0%,#090a0d_100%)]">
      <div className="flex h-9 items-center gap-2 border-b border-white/[0.08] px-4 md:h-11">
        {[0, 1, 2].map((d) => (
          <span key={d} className="size-2 rounded-full bg-white/20" />
        ))}
        <span className="ml-3 flex h-6 flex-1 items-center justify-center rounded-md bg-white/[0.06] font-sans text-[0.75rem] text-white/45">
          app.bystadium.com/{tab.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}
        </span>
      </div>
      <div className="flex h-[calc(100%-2.25rem)] md:h-[calc(100%-2.75rem)]">
        <div className="hidden w-44 shrink-0 flex-col gap-3 border-r border-white/[0.06] bg-white/[0.025] p-4 md:flex">
          {[0, 1, 2, 3, 4].map((r) => (
            <span
              key={r}
              className={`h-2.5 rounded-full transition-colors duration-500 ${
                r === index % 5 ? "w-32 bg-[#0b7afc]/60" : r % 2 ? "w-24 bg-white/[0.07]" : "w-28 bg-white/[0.07]"
              }`}
            />
          ))}
        </div>
        <div className="flex-1 p-4 md:p-5">
          <span className="block h-3 w-44 rounded-full bg-white/[0.14]" />
          <span className="mt-2 block h-2 w-28 rounded-full bg-white/[0.06]" />
          <div className="mt-5 grid grid-cols-3 gap-3 md:gap-4">
            {[0, 1, 2].map((c) => (
              <div key={c} className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-3 md:p-4">
                <div className="flex items-center gap-2">
                  <span className="size-6 rounded-full bg-white/[0.12] md:size-7" />
                  <span className="h-2 w-12 rounded-full bg-white/[0.12] md:w-16" />
                </div>
                <span className="mt-3 block h-2 w-full rounded-full bg-white/[0.07]" />
                <span className="mt-2 block h-2 w-3/4 rounded-full bg-white/[0.07]" />
                <span
                  className={`mt-4 block h-5 w-14 rounded-full md:h-6 ${
                    c === 0 ? "animate-pulse bg-[#0b7afc]/45" : "bg-white/[0.06]"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ClipPlaceholder({ tab }: { tab: InfraTab }) {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_70%_30%,rgba(11,122,252,0.25),transparent_70%),linear-gradient(180deg,#101216_0%,#08090b_100%)]">
      <p className="absolute bottom-6 left-6 max-w-[70%] font-display text-[1.5rem] leading-7 text-white/25 md:text-[2rem] md:leading-9">
        {tab.title}
      </p>
    </div>
  );
}

/* ---------- video + tab card (Physical, Digital) ---------- */

export function MediaTabs({
  tabs,
  variant,
  playing,
  mediaClass,
  label,
}: {
  tabs: InfraTab[];
  variant: "clip" | "screen";
  playing: boolean;
  mediaClass: string;
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

  const advance = useCallback(() => setActive((a) => (a + 1) % tabs.length), [tabs.length]);

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

  const columns = tabs.map((_, i) => (i === active ? "minmax(0,1fr)" : "4.75rem")).join(" ");

  return (
    <div className={`${glass} flex flex-col gap-2.5`}>
      <Bloom />
      {/* media — one layer per tab, cross-faded with opacity only */}
      <div className={`relative overflow-hidden rounded-lg bg-[#0e0f11] ${mediaClass}`}>
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
                preload="auto"
                onEnded={i === active ? advance : undefined}
                onError={() => setFailed((f) => ({ ...f, [i]: true }))}
                aria-label={`${t.title} — ${label}`}
                className="absolute inset-0 size-full object-cover"
              />
            ) : variant === "screen" ? (
              <ScreenPlaceholder tab={t} index={i} />
            ) : (
              <ClipPlaceholder tab={t} />
            )}
          </div>
        ))}
        <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
        {/* progress — phones/tablet (desktop shows it inside the open tab) */}
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 bg-white/15 lg:hidden">
          <span
            ref={(el) => void (bars.current[0] = el)}
            className="block h-full origin-left bg-pyramid-ice"
            style={{ transform: "scaleX(0)" }}
          />
        </span>
      </div>

      {tab.desc && (
        <p className="px-2 pb-1 font-sans text-pyramid-meta text-white/60 lg:hidden">{tab.desc}</p>
      )}

      {/* tabs: chip rail below lg, accordion row at lg */}
      <div
        role="tablist"
        aria-label={label}
        className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] lg:grid lg:h-[16.875rem] lg:gap-2.5 lg:overflow-hidden lg:pb-0 lg:transition-[grid-template-columns] lg:duration-[900ms] lg:ease-[cubic-bezier(0.65,0,0.35,1)]"
        style={{ gridTemplateColumns: columns }}
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
              className={`relative shrink-0 cursor-pointer overflow-hidden rounded-xl text-left transition-colors duration-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:min-w-0 lg:shrink ${
                on ? "bg-white/10" : "bg-pyramid-tab hover:bg-[#232323]"
              }`}
            >
              {/* chip */}
              <span
                className={`block px-4 py-2.5 font-sans text-[0.875rem] whitespace-nowrap lg:hidden ${
                  on ? "text-white" : "text-white/60"
                }`}
              >
                {t.title}
              </span>
              {/* accordion: both states stay mounted at a fixed width so the resize
                  never reflows text — they just cross-fade */}
              <span
                aria-hidden={!on}
                className={`absolute left-0 top-0 hidden h-full w-[25rem] flex-col p-6 transition-opacity lg:flex ${
                  on ? "opacity-100 delay-300 duration-700" : "opacity-0 duration-300"
                }`}
              >
                <span className="font-sans text-pyramid-tab text-white">{t.title}</span>
                {t.desc && <span className="mt-2 font-sans text-pyramid-meta text-white/60">{t.desc}</span>}
                <span className="mt-auto block h-0.5 w-full max-w-[22rem] rounded-full bg-white/15">
                  <span
                    ref={(el) => void (bars.current[1 + i] = el)}
                    className="block h-full origin-left rounded-full bg-pyramid-ice"
                    style={{ transform: "scaleX(0)" }}
                  />
                </span>
              </span>
              <span
                aria-hidden={on}
                className={`absolute inset-0 hidden items-center justify-center transition-opacity duration-500 lg:flex ${
                  on ? "opacity-0" : "opacity-100 delay-300"
                }`}
              >
                <span className="font-sans text-pyramid-tab text-white/55 [writing-mode:vertical-rl]">{t.title}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- People carousel ---------- */

function Portrait({ n }: { n: number }) {
  return (
    <div className="relative aspect-[5/4] overflow-hidden rounded-2xl md:aspect-[3/4] border border-white/[0.06] bg-[linear-gradient(180deg,#222429_0%,#131418_100%)]">
      <span className="absolute left-4 top-4 font-sans text-[0.6875rem] font-bold tracking-[0.0875rem] text-white/40">
        0{n}
      </span>
      <span aria-hidden className="absolute left-1/2 top-[27%] size-[34%] -translate-x-1/2 rounded-full bg-white/[0.07]" />
      <span aria-hidden className="absolute left-1/2 top-[60%] h-[52%] w-[78%] -translate-x-1/2 rounded-full bg-white/[0.06]" />
    </div>
  );
}

export function PeopleCarousel({ reducedMotion }: { reducedMotion: boolean }) {
  const track = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const VISIBLE = 4;
  const max = PEOPLE.specialists.length - VISIBLE;

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const next = Math.min(max, Math.max(0, idx + dir));
    const cards = el.children;
    const step = (cards[1] as HTMLElement).offsetLeft - (cards[0] as HTMLElement).offsetLeft;
    setIdx(next);
    gsap.to(el, {
      x: -next * step,
      duration: reducedMotion ? 0 : 1.1,
      ease: "back.out(1.25)",
      overwrite: true,
    });
  };

  return (
    <div className={`${glass} p-4 lg:p-5`}>
      <Bloom />
      <div className="overflow-x-auto [scrollbar-width:none] lg:overflow-hidden">
        <div ref={track} className="flex w-max gap-4 will-change-transform">
          {PEOPLE.specialists.map((s, i) => (
            <article key={s.name} className="flex w-[15.5rem] shrink-0 flex-col gap-4 md:w-[16.875rem]">
              <Portrait n={i + 1} />
              <div className="flex flex-col gap-1.5">
                <h3 className="font-display text-[1.25rem] leading-6 text-white">{s.name}</h3>
                <p className="font-sans text-pyramid-meta text-white/60">{s.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between lg:mt-8">
        <a
          href={PEOPLE.cta.href}
          className="inline-flex h-button-h items-center rounded-full bg-white px-6 font-sans text-button-primary uppercase text-ink transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {PEOPLE.cta.label}
        </a>
        <div className="hidden gap-2 lg:flex">
          {(["prev", "next"] as const).map((dir) => {
            const disabled = dir === "prev" ? idx === 0 : idx === max;
            return (
              <button
                key={dir}
                type="button"
                aria-label={dir === "prev" ? "Previous specialists" : "Next specialists"}
                disabled={disabled}
                onClick={() => go(dir === "prev" ? -1 : 1)}
                className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/[0.14] bg-white/10 text-white transition-opacity duration-200 hover:bg-white/20 disabled:cursor-default disabled:opacity-35 disabled:hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d={dir === "prev" ? "M10 3 5 8l5 5" : "M6 3l5 5-5 5"} />
                </svg>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
