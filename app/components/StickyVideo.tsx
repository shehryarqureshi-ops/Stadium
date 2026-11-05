"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* "Watch the film" — floating bottom-right widget + modal player.

   - Loading: nothing here is requested on the initial page load. The thumbnail
     (a ~0.5 MB, 3 s looping animated webp) is only mounted after the window `load` event + an idle
     tick, so it never competes with the LCP. The 1080p film itself is only
     requested once the visitor shows intent (hover / focus / tap on the widget)
     or opens the modal.
   - Widget: shows once the hero has scrolled past, hides (fade + slide down) when the dark
     "three layers" section reaches it and stays hidden to the end of the page; dismissable.
   - Modal: a native <dialog> (focus trap + Esc to close for free), big 16:9
     player with native controls, a fullscreen button and a close button.
     Clicking the dim backdrop or pressing Esc closes it and pauses the film.
   Sits below the nav (z-30) so the dropdown's backdrop blur covers the widget. */

const VIDEO_SRC = "/videos/film/stadium-film.mp4";
const THUMB_SRC = "/videos/film/stadium-film-thumb-v2.webp"; // static: modal poster + reduced motion
const LOOP_SRC = "/videos/film/stadium-film-loop-3s-b.webp"; // 3 s loop (0:50–0:53), animated webp
const EXIT_MS = 220; // keep in sync with the duration-200 transitions below

export default function StickyVideo() {
  const [thumbReady, setThumbReady] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [past, setPast] = useState(false);
  const [pastDark, setPastGlobe] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [warm, setWarm] = useState(false); // start fetching the film
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false); // drives the fade + scale (in and out)
  const [fullscreen, setFullscreen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  /* thumbnail: after load, when the browser is idle */
  useEffect(() => {
    let idle: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const arm = () => {
      if ("requestIdleCallback" in window) {
        idle = window.requestIdleCallback(() => setThumbReady(true), { timeout: 3000 });
      } else {
        timer = setTimeout(() => setThumbReady(true), 1500);
      }
    };
    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });
    return () => {
      window.removeEventListener("load", arm);
      if (idle !== undefined && "cancelIdleCallback" in window) window.cancelIdleCallback(idle);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setPast(window.scrollY > window.innerHeight * 0.7);
      /* the dark "three layers" section: once its top edge reaches the widget, hide it — and
         keep it hidden for the rest of the page (scrolling back above brings it back) */
      const dark = document.querySelector('section[aria-label="The Stadium infrastructure"]');
      const el = widgetRef.current;
      const clearance = (el ? el.offsetHeight : 0) + 24;
      setPastGlobe(
        dark ? dark.getBoundingClientRect().top <= window.innerHeight - clearance : false,
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const visible = thumbReady && past && !pastDark && !dismissed;

  const openModal = useCallback(() => {
    setWarm(true);
    setOpen(true);
    document.documentElement.style.overflow = "hidden";
    dialogRef.current?.showModal();
    /* flush the closed styles first so the transition has a start point */
    void dialogRef.current?.offsetHeight;
    setShown(true);
  }, []);

  /* play as soon as the modal is open — the <video> may only just have mounted
     (first open), so this runs after render rather than inside the click */
  useEffect(() => {
    const v = videoRef.current;
    if (!open || !v) return;
    v.muted = false;
    void v.play().catch(() => {
      /* autoplay with sound refused — the native controls are right there */
    });
  }, [open]);

  /* final cleanup — idempotent, safe to run from several paths */
  const onClosed = useCallback(() => {
    videoRef.current?.pause();
    document.documentElement.style.overflow = "";
    setShown(false);
    setOpen(false);
    opener.current?.focus({ preventScroll: true });
  }, []);

  /* animated exit: fade + scale out, then really close the <dialog> */
  const closing = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeModal = useCallback(() => {
    if (closing.current) return;
    videoRef.current?.pause();
    if (document.fullscreenElement) void document.exitFullscreen();
    setShown(false);
    closing.current = setTimeout(() => {
      closing.current = null;
      dialogRef.current?.close();
      onClosed();
    }, EXIT_MS);
  }, [onClosed]);

  /* native listener: the dialog's `close` event fires for Esc, the close button and backdrop clicks */
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    /* Esc fires `cancel`: take it over so the exit animates; `close` is the backstop */
    const onCancel = (e: Event) => {
      e.preventDefault();
      closeModal();
    };
    d.addEventListener("cancel", onCancel);
    /* a late `close` from an earlier close must not undo a re-open */
    const onClose = () => {
      if (!d.open) onClosed();
    };
    d.addEventListener("close", onClose);
    return () => {
      d.removeEventListener("cancel", onCancel);
      d.removeEventListener("close", onClose);
    };
  }, [onClosed, closeModal]);

  useEffect(() => () => void (document.documentElement.style.overflow = ""), []);

  useEffect(() => {
    const sync = () => setFullscreen(document.fullscreenElement === stageRef.current);
    document.addEventListener("fullscreenchange", sync);
    return () => document.removeEventListener("fullscreenchange", sync);
  }, []);

  const toggleFullscreen = () => {
    const el = stageRef.current;
    if (!el) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void el.requestFullscreen?.().catch(() => {});
  };

  return (
    <>
      <div
        ref={widgetRef}
        aria-hidden={!visible}
        inert={!visible}
        className={`fixed bottom-4 right-4 z-30 w-[14rem] transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none md:bottom-6 md:right-6 md:w-[17rem] ${
          visible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-8 opacity-0"
        }`}
      >
        <div className="group relative aspect-video overflow-hidden rounded-2xl bg-ink shadow-[0px_1.25rem_2.5rem_-0.5rem_rgba(0,0,0,0.45)] ring-1 ring-white/10">
          {thumbReady && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={reduceMotion ? THUMB_SRC : LOOP_SRC}
              alt=""
              width={544}
              height={306}
              decoding="async"
              className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10"
          />

          {/* the whole card opens the modal */}
          <button
            ref={opener}
            type="button"
            onClick={openModal}
            onPointerEnter={() => setWarm(true)}
            onFocus={() => setWarm(true)}
            onTouchStart={() => setWarm(true)}
            aria-label="Watch the Stadium film"
            aria-haspopup="dialog"
            className="absolute inset-0 flex cursor-pointer items-center justify-center focus-visible:outline-white"
          >
            <span className="flex size-11 items-center justify-center rounded-full bg-white/90 text-ink shadow-[0px_0.25rem_0.75rem_rgba(0,0,0,0.3)] backdrop-blur transition-transform duration-200 group-hover:scale-110">
              <svg viewBox="0 0 14 14" className="size-4" fill="currentColor" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden>
                <path d="M4.7 2.9v8.2L10.7 7z" />
              </svg>
            </span>
          </button>

          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss video"
            className="absolute right-2 top-2 flex size-7 cursor-pointer items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition-colors duration-200 hover:bg-black/60 focus-visible:outline-white"
          >
            <svg viewBox="0 0 14 14" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
              <path d="m3.5 3.5 7 7M10.5 3.5l-7 7" />
            </svg>
          </button>

        </div>
      </div>

      {/* modal player */}
      <dialog
        ref={dialogRef}
        aria-label="Stadium film"
        onClick={(e) => {
          /* a click on the dim backdrop lands on the <dialog> itself */
          if (e.target === dialogRef.current) closeModal();
        }}
        data-shown={shown}
        className="m-auto h-dvh max-h-none w-dvw max-w-none bg-transparent p-4 opacity-0 transition-opacity duration-200 ease-out backdrop:bg-black/80 backdrop:backdrop-blur-sm data-[shown=true]:opacity-100 motion-reduce:transition-none md:p-8"
      >
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
          className="flex size-full items-center justify-center"
        >
          <div
            ref={stageRef}
            className={`relative aspect-video w-full max-w-[min(100%,calc((100dvh-4rem)*16/9))] origin-center overflow-hidden rounded-2xl transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${shown ? "scale-100" : "scale-90"}  bg-black shadow-[0px_2rem_5rem_rgba(0,0,0,0.6)] ring-1 ring-white/10 fullscreen:max-w-none fullscreen:rounded-none fullscreen:ring-0`}
          >
            {(warm || open) && (
              <video
                ref={videoRef}
                src={VIDEO_SRC}
                poster={THUMB_SRC}
                preload={open ? "auto" : "metadata"}
                playsInline
                controls
                controlsList="nodownload nofullscreen"
                onClick={(e) => {
                  /* click the picture to play / pause (the native control bar keeps its own clicks) */
                  const v = e.currentTarget;
                  const r = v.getBoundingClientRect();
                  if (e.clientY > r.bottom - 64) return;
                  if (v.paused) void v.play();
                  else v.pause();
                }}
                disablePictureInPicture
                className="size-full cursor-pointer bg-black object-contain"
              />
            )}

            <div className="pointer-events-none absolute right-3 top-3 flex gap-2">
              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label={fullscreen ? "Exit full screen" : "Full screen"}
                className="pointer-events-auto flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition-colors duration-200 hover:bg-black/75 focus-visible:outline-white"
              >
                {fullscreen ? (
                  <svg viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M7.5 3v3.5H4M12.5 3v3.5H16M7.5 17v-3.5H4M12.5 17v-3.5H16" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M3.5 7.5v-4h4M16.5 7.5v-4h-4M3.5 12.5v4h4M16.5 12.5v4h-4" />
                  </svg>
                )}
              </button>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close video"
                className="pointer-events-auto flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition-colors duration-200 hover:bg-black/75 focus-visible:outline-white"
              >
                <svg viewBox="0 0 14 14" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                  <path d="m3.5 3.5 7 7M10.5 3.5l-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
