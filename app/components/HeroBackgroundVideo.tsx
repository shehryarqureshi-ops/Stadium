"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { HeroSlide } from "../data/heroRotation";

/* Full-bleed hero background, built to stay light on phones.

   - The first slide's poster is always rendered as a real <Image> (priority) —
     it is the LCP element and the whole background on phones, with Save-Data,
     or under reduced motion. No video bytes are requested in those cases.
   - On larger screens ONE clip is mounted at a time (plus the outgoing clip
     for the 700ms crossfade). The next clip is fetched only when its slide
     becomes active, instead of preloading every clip up front. Each <video>
     carries its own poster, so a clip that is still buffering shows its photo
     rather than black.
   - Video mounting waits until the page has finished loading (idle) so it
     never competes with fonts / HTML / the poster. Pausing off-screen is
     owned by `playing`. */

const CROSSFADE_MS = 700;

type NavigatorWithConnection = Navigator & {
  connection?: { saveData?: boolean };
};

export default function HeroBackgroundVideo({
  slides,
  index,
  playing,
  reduce,
  allowOnPhone = false,
}: {
  slides: HeroSlide[];
  index: number;
  playing: boolean;
  reduce: boolean;
  /** phones normally get the poster only; the 16:10 phone media block opts in */
  allowOnPhone?: boolean;
}) {
  const [allowVideo, setAllowVideo] = useState(false);
  const [outgoing, setOutgoing] = useState<number | null>(null);
  const refs = useRef<Map<number, HTMLVideoElement>>(new Map());
  const prevIndex = useRef(index);

  /* Decide once, after load: phones (< md), Save-Data and reduced motion get
     the poster only. Re-checked live if the viewport crosses the breakpoint. */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    let idle: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const saveData =
      (navigator as NavigatorWithConnection).connection?.saveData === true;

    const evaluate = () => {
      window.clearTimeout(timer);
      if (idle !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idle);
      }
      if ((!mq.matches && !allowOnPhone) || saveData) {
        setAllowVideo(false);
        return;
      }
      const start = () => setAllowVideo(true);
      const arm = () => {
        if ("requestIdleCallback" in window) {
          idle = window.requestIdleCallback(start, { timeout: 2500 });
        } else {
          timer = setTimeout(start, 1500);
        }
      };
      if (document.readyState === "complete") arm();
      else window.addEventListener("load", arm, { once: true });
    };

    evaluate();
    mq.addEventListener("change", evaluate);
    return () => {
      mq.removeEventListener("change", evaluate);
      window.clearTimeout(timer);
    };
  }, [allowOnPhone]);

  const videoOn = allowVideo && !reduce;

  /* Track the outgoing clip for the crossfade, then unmount it. */
  useEffect(() => {
    const prev = prevIndex.current;
    prevIndex.current = index;
    if (prev === index) return;
    setOutgoing(prev);
    const t = setTimeout(() => setOutgoing(null), CROSSFADE_MS + 50);
    return () => clearTimeout(t);
  }, [index]);

  /* Play / pause the mounted clips. */
  useEffect(() => {
    refs.current.forEach((v, i) => {
      v.muted = true;
      if (!playing || !videoOn) {
        v.pause();
      } else if (i === index) {
        v.play().catch(() => {});
      }
    });
  }, [index, playing, videoOn, outgoing]);

  const mounted = videoOn
    ? [index, ...(outgoing !== null && outgoing !== index ? [outgoing] : [])]
    : [];

  return (
    <>
      {/* base layer: LCP poster, always present */}
      <Image
        src={slides[0].poster}
        alt=""
        fill
        priority
        sizes="100vw"
        quality={75}
        className="object-cover"
      />
      {mounted.map((i) => (
        <video
          key={slides[i].video}
          ref={(el) => {
            if (el) refs.current.set(i, el);
            else refs.current.delete(i);
          }}
          src={slides[i].video}
          poster={slides[i].poster}
          muted
          playsInline
          preload="auto"
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out"
          style={{ opacity: i === index ? 1 : 0 }}
        />
      ))}
    </>
  );
}
