"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import heroBg from "@/public/hero-bg.png";

/* Drop a real hero film in /public and set this to enable playback; until then
   the corner player shows the hero poster + an inert play affordance. */
const VIDEO_SRC = "";

/* Shopify-style sticky corner player: once the hero is scrolled past, a small
   muted video follows in the bottom-right with play/pause + dismiss. Sits
   below the nav (z-30) so the dropdown's backdrop blur covers it too. */
export default function StickyVideo() {
  const [past, setPast] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [playing, setPlaying] = useState(Boolean(VIDEO_SRC));
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const visible = past && !dismissed;

  const togglePlay = () => {
    const v = videoRef.current;
    if (v) {
      if (v.paused) {
        void v.play();
        setPlaying(true);
      } else {
        v.pause();
        setPlaying(false);
      }
    } else {
      setPlaying((p) => !p);
    }
  };

  return (
    <div
      aria-hidden={!visible}
      className={`fixed bottom-4 right-4 z-30 w-[14rem] transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none md:bottom-6 md:right-6 md:w-[17rem] ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-8 opacity-0"
      }`}
    >
      <div className="group relative aspect-video overflow-hidden rounded-2xl bg-ink shadow-[0px_1.25rem_2.5rem_-0.5rem_rgba(0,0,0,0.45)] ring-1 ring-white/10">
        {VIDEO_SRC ? (
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            poster={heroBg.src}
            muted
            loop
            playsInline
            autoPlay
            className="size-full object-cover"
          />
        ) : (
          <Image src={heroBg} alt="" fill sizes="17rem" className="object-cover" />
        )}

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10"
        />

        {/* play / pause — covers the poster so a tap anywhere toggles */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? "Pause video" : "Play video"}
          className="absolute inset-0 flex items-center justify-center focus-visible:outline-white"
        >
          <span className="flex size-11 items-center justify-center rounded-full bg-white/90 text-ink shadow-[0px_0.25rem_0.75rem_rgba(0,0,0,0.3)] backdrop-blur transition-transform duration-200 group-hover:scale-105">
            {playing ? (
              <svg viewBox="0 0 14 14" className="size-4" fill="currentColor" aria-hidden>
                <rect x="3" y="2" width="3" height="10" rx="1" />
                <rect x="8" y="2" width="3" height="10" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 14 14" className="size-4 translate-x-px" fill="currentColor" aria-hidden>
                <path d="M3.5 2.3c0-.6.65-.97 1.16-.66l7.06 4.2a.77.77 0 0 1 0 1.32l-7.06 4.2a.77.77 0 0 1-1.16-.66V2.3Z" />
              </svg>
            )}
          </span>
        </button>

        {/* dismiss */}
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss video"
          className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition-colors duration-200 hover:bg-black/60 focus-visible:outline-white"
        >
          <svg viewBox="0 0 14 14" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
            <path d="m3.5 3.5 7 7M10.5 3.5l-7 7" />
          </svg>
        </button>

        <span className="pointer-events-none absolute bottom-2 left-3 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-white/90">
          Watch the film
        </span>
      </div>
    </div>
  );
}
