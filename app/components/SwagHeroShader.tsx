"use client";

import {
  ChromaFlow,
  FilmGrain,
  FlutedGlass,
  Shader,
  Swirl,
} from "shaders/react";

export default function ShaderEffect() {
  return (
    <div className="absolute inset-0 opacity-30">
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
          angle={26}
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
