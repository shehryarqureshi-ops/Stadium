"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import desktopPoster from "@/public/videos/snacks/desktop-poster.webp";
import mobilePoster from "@/public/videos/snacks/mobile-poster.webp";

/* /snacks hero background. Posters (first frame of each clip) are in the SSR
   HTML and preloaded, so the section paints instantly. After hydration only
   the clip for the current breakpoint mounts (no wasted download), plays once
   and holds on its last frame (no `loop`). Under reduced motion it jumps
   straight to that last frame. Mobile < lg, desktop >= lg.

   layout "bg":     desktop, behind the whole hero. Fitted by width (no crop)
                    and pinned bottom-right so the box clears the headline on
                    laptops; the spare strip on top fades into the hero bg.
   layout "inline": mobile/tablet, an in-flow block under the copy. */

const DESKTOP_QUERY = "(min-width: 64rem)";

type Variant = "desktop" | "mobile";

function Clip({ variant, reduce }: { variant: Variant; reduce: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const base = `/videos/snacks/${variant}`;

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    if (reduce) return;
    v.play().catch(() => {});
  }, [reduce]);

  return (
    <video
      ref={ref}
      muted
      playsInline
      autoPlay={!reduce}
      preload="auto"
      aria-hidden
      tabIndex={-1}
      onLoadedMetadata={(e) => {
        if (!reduce) return;
        const v = e.currentTarget;
        v.currentTime = Math.max(v.duration - 0.05, 0);
      }}
      onLoadedData={() => setReady(true)}
      onSeeked={() => setReady(true)}
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
        variant === "desktop"
          ? "object-right-bottom"
          : "origin-[62%_90%] scale-110 object-bottom md:scale-100"
      } ${ready ? "opacity-100" : "opacity-0"}`}
    >
      <source src={`${base}.webm`} type='video/webm; codecs="av01.0.04M.08"' />
      <source src={`${base}.mp4`} type="video/mp4" />
    </video>
  );
}

const FADE_TOP =
  "[mask-image:linear-gradient(to_bottom,transparent,#000_20%)]";

export default function SnackHeroVideo({
  layout,
}: {
  layout: "bg" | "inline";
}) {
  const [active, setActive] = useState(false);
  const [reduce, setReduce] = useState(false);
  const wantDesktop = layout === "bg";

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setActive(mq.matches === wantDesktop);
      setReduce(rm.matches);
    };
    sync();
    mq.addEventListener("change", sync);
    rm.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      rm.removeEventListener("change", sync);
    };
  }, [wantDesktop]);

  if (layout === "bg") {
    return (
      <div
        className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden lg:block"
        aria-hidden
      >
        <div
          className={`absolute bottom-0 right-0 aspect-video w-full 2xl:h-full 2xl:aspect-auto ${FADE_TOP}`}
        >
          <Image
            src={desktopPoster}
            alt=""
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover object-right-bottom"
          />
          {active && <Clip variant="desktop" reduce={reduce} />}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`pointer-events-none relative -mt-4 aspect-[390/335] w-full overflow-hidden md:aspect-[768/520] lg:hidden ${FADE_TOP}`}
      aria-hidden
    >
      <Image
        src={mobilePoster}
        alt=""
        fill
        priority
        unoptimized
        sizes="100vw"
        className="origin-[62%_90%] scale-110 object-cover object-bottom md:scale-100"
      />
      {active && <Clip variant="mobile" reduce={reduce} />}
    </div>
  );
}
