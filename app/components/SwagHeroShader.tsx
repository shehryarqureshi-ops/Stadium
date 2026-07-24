// "use client";

// import { useEffect, useState } from "react";
// import {
//   Shader,
//   ChromaFlow,
//   FilmGrain,
//   FlutedGlass,
//   Swirl,
// } from "shaders/react";

// /* Animated shader background for the /swag hero — the exact Shaders
//    (shaders.com) composition the user authored, run through the real
//    `shaders/react` runtime. Production-only additions:
//    · fills the hero (canvas auto-sizes to this box via the engine's
//      ResizeObserver; the engine also pauses via IntersectionObserver when the
//      hero scrolls off-screen, so no GPU/battery drain down the long /swag page)
//    · disableTelemetry — no shaders.com/api/telemetry beacons from production
//    · prefers-reduced-motion freezes the animated layers (ChromaFlow momentum +
//      FlutedGlass speed → 0); the still frame keeps the look
//    The <Shader> root (not <Preview>) carries no watermark and needs no license.
//    Decoration only — aria-hidden, non-interactive, behind the hero copy. */

// export default function SwagHeroShader() {
//   const [reduce, setReduce] = useState(false);

//   useEffect(() => {
//     const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
//     const sync = () => setReduce(mq.matches);
//     sync();
//     mq.addEventListener("change", sync);
//     return () => mq.removeEventListener("change", sync);
//   }, []);

//   return (
//     <div
//       aria-hidden
//       className="pointer-events-none absolute inset-0 overflow-hidden bg-black"
//     >
//       <Shader
//         disableTelemetry
//         style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
//       >
//         <Swirl colorA="#000000" colorB="#0a0a0a" detail={1.7} />
//         <ChromaFlow
//           baseColor="#18181a"
//           downColor="#0033ff"
//           leftColor="#0059ff"
//           momentum={reduce ? 0 : 13}
//           rightColor="#5500ff"
//           upColor="#00e1ff"
//         />
//         <FlutedGlass
//           aberration={0.61}
//           angle={28}
//           frequency={8}
//           highlight={0.12}
//           highlightSoftness={0}
//           lightAngle={-90}
//           refraction={4}
//           shape="rounded"
//           softness={1}
//           speed={reduce ? 0 : 0.15}
//         />
//         <FilmGrain strength={0.05} />
//       </Shader>

//       {/* Text-seat scrims. ChromaFlow blooms bright blue/violet under the
//           cursor; white copy over a peak band measured only ~1.6:1, so these
//           floor the copy column to WCAG AA while leaving the chroma bright on
//           the right (the product card carries its own frosted panel):
//           · desktop → darken the left copy column, fade out before the cluster
//           · mobile  → copy is full-width at the top, so darken top-down */}
//       <div className="absolute inset-0 hidden bg-[linear-gradient(to_right,rgba(0,0,0,0.86)_0%,rgba(0,0,0,0.73)_34%,rgba(0,0,0,0.32)_52%,transparent_64%)] lg:block" />
//       <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.52)_42%,rgba(0,0,0,0.2)_72%,transparent_100%)] lg:hidden" />
//     </div>
//   );
// }

"use client";

import {
  ChromaFlow,
  FilmGrain,
  FlutedGlass,
  Shader,
  Swirl,
} from "shaders/react";

// baseColor="#18181a"
//           downColor="#0033ff"
//           leftColor="#0059ff"
//           momentum={13}
//           rightColor="#5500ff"
//           upColor="#00e1ff"

export default function ShaderEffect() {
  return (
    <div className="absolute inset-0 opacity-20">
      <Shader className="h-full">
        <Swirl colorA="#0a0a0a" colorB="#0a0a0a" detail={1.7} />
        <ChromaFlow
          baseColor="#18181a"
          downColor="#00c036"
          leftColor="#00ad31"
          momentum={13}
          rightColor="#008626"
          upColor="#80e09b"
        />
        <FlutedGlass
          aberration={0.61}
          angle={0}
          frequency={8}
          highlight={0.12}
          highlightSoftness={0}
          lightAngle={-90}
          refraction={4}
          shape="rounded"
          softness={1}
          speed={0.15}
        />
        <FilmGrain strength={0.05} />
      </Shader>
    </div>
  );
}
