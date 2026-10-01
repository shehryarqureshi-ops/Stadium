/* "Tools in, one platform out" logo strip — Figma "icons" / "Integrations"
   rows on the /impact pages (e.g. 3998:9351, 3998:9777). Two slow marquees of
   partner logos (33% opacity, white fade at the outer edges) drift toward a
   central white Stadium tile (r42, p12, 128px mark) sitting on a soft
   multicolour glow. The marquees pause under reduced motion. */

import Image from "next/image";

import SectionIntro from "./SectionIntro";

import stadiumMark from "@/public/impact/stadium-tile-mark.svg";
import glow from "@/public/impact/stadium-tile-glow.png";

export type LogoBridgeLogo = { src: string; alt: string; width: number; height: number };

export type LogoBridgeProps = {
  caption?: string;
  title: string;
  description?: string;
  /* left of the tile (and right too, unless rightLogos is given) */
  logos: LogoBridgeLogo[];
  rightLogos?: LogoBridgeLogo[];
  /* Figma dims mid-grey tool logos to 33%; pre-tinted light-grey sets use 1 */
  logoOpacity?: number;
};

function Track({
  logos,
  reverse,
  opacity,
}: {
  logos: LogoBridgeLogo[];
  reverse?: boolean;
  opacity: number;
}) {
  return (
    <div
      style={{ opacity }}
      className={`relative h-[3.75rem] min-w-0 flex-1 overflow-hidden ${
        reverse
          ? "[mask-image:linear-gradient(to_left,transparent,#000_40%)]"
          : "[mask-image:linear-gradient(to_right,transparent,#000_40%)]"
      }`}
    >
      <div
        className={`flex h-full w-max animate-[swag-marquee_50s_linear_infinite] motion-reduce:animate-none ${
          reverse ? "" : "[animation-direction:reverse]"
        }`}
      >
        {[0, 1].map((group) => (
          <ul
            key={group}
            aria-hidden={group === 1}
            className="flex h-full shrink-0 list-none items-center gap-[2.8125rem] pr-[2.8125rem]"
          >
            {logos.map((l) => (
              <li key={`${l.alt}-${group}`} className="flex shrink-0 items-center">
                <Image
                  src={l.src}
                  alt={group === 0 ? l.alt : ""}
                  width={l.width}
                  height={l.height}
                  style={{ height: `${l.height / 16}rem` }}
                  className="w-auto max-w-none select-none"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default function LogoBridge({
  caption,
  title,
  description,
  logos,
  rightLogos,
  logoOpacity = 0.33,
}: LogoBridgeProps) {
  return (
    <section className="px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-10">
        <SectionIntro caption={caption} title={title} description={description} />

        <div data-animation="reveal" className="relative flex w-full items-center gap-2.5">
          <Track logos={logos} opacity={logoOpacity} />

          <div className="relative shrink-0">
            <Image
              src={glow}
              alt=""
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-[8.5rem] w-[15.1875rem] max-w-none -translate-x-1/2 -translate-y-[calc(50%+0.625rem)] opacity-45 blur-[3.75rem]"
            />
            <div className="relative flex items-center justify-center rounded-[1.75rem] bg-white p-2 shadow-[0px_0.5625rem_0.65625rem_0px_rgba(0,0,0,0.25)] md:rounded-[2.625rem] md:p-3">
              {/* 128 box; the 158² SVG carries its own inner tile + shadow
                  filter, so it overhangs by Figma's inset (6/15/24 of 128) */}
              <div className="relative size-[5rem] md:size-[8rem]">
                <Image
                  src={stadiumMark}
                  alt="Stadium"
                  unoptimized
                  className="absolute inset-[-4.69%_-11.72%_-18.75%_-11.72%] max-w-none"
                  style={{ width: "123.44%", height: "123.44%" }}
                />
              </div>
            </div>
          </div>

          <Track logos={rightLogos ?? logos} reverse opacity={logoOpacity} />
        </div>
      </div>
    </section>
  );
}
