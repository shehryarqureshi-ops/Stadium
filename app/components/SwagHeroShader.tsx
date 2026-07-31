"use client";

import {
  ChromaFlow,
  FilmGrain,
  FlutedGlass,
  Shader,
  Swirl,
} from "shaders/react";

export type ShaderChroma = {
  base: string;
  up: string;
  down: string;
  left: string;
  right: string;
};

/* Default = swag green. Re-themed pages pass their accent so the animated hero
   background doesn't tint green (audit finding). */
const SWAG_CHROMA: ShaderChroma = {
  base: "#18181a",
  down: "#00c036",
  left: "#00ad31",
  right: "#008626",
  up: "#80e09b",
};

export default function ShaderEffect({
  chroma = SWAG_CHROMA,
}: {
  chroma?: ShaderChroma;
}) {
  return (
    <Shader className="h-full">
      <Swirl colorA="#0a0a0a" colorB="#0a0a0a" detail={1.7} />
      <ChromaFlow
        baseColor={chroma.base}
        downColor={chroma.down}
        leftColor={chroma.left}
        momentum={13}
        rightColor={chroma.right}
        upColor={chroma.up}
      />
      <FlutedGlass
        aberration={0.61}
        angle={26}
        frequency={18}
        highlight={0.12}
        highlightSoftness={0}
        lightAngle={-90}
        refraction={4}
        shape="rounded"
        softness={1}
        speed={0.15}
      />
      <FilmGrain strength={0.07} />
    </Shader>
  );
}
