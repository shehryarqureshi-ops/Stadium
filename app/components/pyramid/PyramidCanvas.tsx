"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, Sparkles } from "@react-three/drei";
import {
  PYR_A,
  PYR_H,
  SEGMENTS,
  yAt,
  roundedThickShell,
} from "./geometry";
import { Spring } from "./spring";
import { clamp01, lerp, progressIndex, pyramidStore } from "./scroll";

/* Scroll-driven 3D pyramid.

   The DOM scroll engine writes `pyramidStore.u`; every frame we turn that into
   a target pose (screen position, size, which layer is lit), and a bank of
   springs chases it — so arrival always has a tiny overshoot and settle, the
   spin between stops is a damped swing, and nothing ever moves linearly.

   Screen-space layout comes straight from the approved Figma scenes (1440×1024):
   intro · stop 1 (grown, bottom-right) · stop 2 (mirrored, left) · stop 3
   (initial size, pushed up-right). The camera looks straight down −z with a
   long lens; the pyramid group itself is pitched to the isometric angle, which
   keeps "screen px → world units" a trivial linear map. */

const PITCH = Math.atan(1 / Math.SQRT2); // true isometric, 35.264°
const FOV = 12;
const CAM_Z = 24;
const DESIGN_HALF_DIAG = 387; // px — base half-diagonal of the 1× pyramid in Figma
/* the rendered base corner reaches ~0.86 of the nominal half-diagonal (rounded hull + perspective) */
const VISIBLE_HALF = 0.86;

const BLUE = new THREE.Color("#0b50a2"); // lit slice — deep Stadium blue
const BLUE_EMISSIVE = new THREE.Color("#0b64d8");
const FADE = new THREE.Color("#222222"); // unlit slices: dark metal (still readable at marker size)
const FADE_EMISSIVE = new THREE.Color("#000000");

type Pose = { ax: number; ay: number; sc: number; w: [number, number, number] };

/** Apex position (px), size (× design) and layer weights [bottom, middle, top]. */
function layoutPoses(W: number, H: number): Pose[] {
  if (W >= 1024) {
    const k = Math.min(1.3, Math.max(0.55, Math.min(W / 1440, H / 1024)));
    const yo = (H - 1024 * k) / 2;
    // stops: a 160px "marker" pyramid parked top-left beside the chapter heading
    // (Figma 6509:12005). Panels are scaled about the stage centre by `fit`, so the
    // marker is positioned through the same transform to stay glued to the copy.
    const fit = Math.min(1, Math.max(0.62, H / 1024));
    const left = (W - Math.min(W, 1440)) / 2 + 120;
    const markerX = W / 2 + (left - W / 2) * fit + 80 * fit;
    const markerY = H / 2 + (114 - H / 2) * fit;
    const markerSc = (80 / DESIGN_HALF_DIAG) * fit;
    const introInset = ((W - Math.min(W, 1440)) / 2 + 200) * fit; // headline left edge (120 gutter + 80 indent)
    return [
      // intro: the pyramid's right corner sits as far from the right edge as the headline
      // is from the left (the intro panel is scaled about its left edge by `fit`)
      { ax: W - introInset - VISIBLE_HALF * DESIGN_HALF_DIAG * 1.0625 * k, ay: yo + 190 * k, sc: 1.0625 * k, w: [1, 1, 1] },
      { ax: markerX, ay: markerY, sc: markerSc, w: [1, 0, 0] },
      { ax: markerX, ay: markerY, sc: markerSc, w: [0, 1, 0] },
      { ax: markerX, ay: markerY, sc: markerSc, w: [0, 0, 1] },
    ];
  }
  // tablet / phone: a small pyramid sits above the content sheet and stays put
  const s0 = Math.min(0.85, Math.max(0.37, (W * 0.34 * 1.25) / DESIGN_HALF_DIAG));
  const top = 108; // clears the 64px fixed header with breathing room
  const s = s0 * 0.5;
  return [
    { ax: W * 0.5, ay: pyramidStore.introAy || Math.max(top, H * 0.12), sc: s0, w: [1, 1, 1] },
    { ax: W * 0.5, ay: top, sc: s, w: [1, 0, 0] },
    { ax: W * 0.5, ay: top, sc: s, w: [0, 1, 0] },
    { ax: W * 0.5, ay: top, sc: s, w: [0, 0, 1] },
  ];
}

/* Additive radial glow with a smooth, zero-slope falloff computed in the shader
   (a gradient texture banded into a visible rim at 8-bit alpha). */
const GLOW_VERT =
  "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }";
const GLOW_FRAG =
  "varying vec2 vUv; uniform vec3 uColor; uniform float uOpacity; uniform float uPower;" +
  "void main(){ float d = clamp(length(vUv - 0.5) * 2.0, 0.0, 1.0);" +
  "float a = pow(1.0 - smoothstep(0.0, 1.0, d), uPower) * uOpacity;" +
  "gl_FragColor = vec4(uColor * a, a); }";
const glowUniforms = (color: string, power: number) => ({
  uColor: { value: new THREE.Color(color) },
  uOpacity: { value: 0.3 },
  uPower: { value: power },
});

const tmp = new THREE.Vector3();

function Pyramid({ onReady }: { onReady?: () => void }) {
  const { size, invalidate } = useThree();

  const frames = useRef(0);

  const root = useRef<THREE.Group>(null);
  const tilt = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const keyLight = useRef<THREE.DirectionalLight>(null);
  const keyTarget = useRef<THREE.Object3D>(null);
  const glowBack = useRef<THREE.ShaderMaterial>(null);
  const glowFloor = useRef<THREE.ShaderMaterial>(null);
  const uBack = useMemo(() => glowUniforms("#0b7afc", 2.2), []);
  const uFloor = useMemo(() => glowUniforms("#0b78ff", 1.8), []);
  const segGroups = useRef<(THREE.Group | null)[]>([]);
  const edgeMats = useRef<(THREE.LineBasicMaterial | null)[]>([]);
  const sideMats = useRef<(THREE.MeshPhysicalMaterial | null)[]>([]);

  const geo = useMemo(
    () =>
      SEGMENTS.map((s) => {
        const tone = () => new THREE.Color(1, 1, 1); // plain, ungraded surface
        const sides = roundedThickShell(s.t1, s.t2, 0.11, 0.04, tone);
        return {
          sides,
          edges: new THREE.EdgesGeometry(sides, 35),
        };
      }),
    [],
  );

  const sp = useRef({
    x: new Spring(0, 70, 12),
    y: new Spring(0, 70, 12),
    sc: new Spring(1, 70, 12),
    yaw: new Spring(Math.PI / 4, 46, 8.5),
    px: new Spring(0, 40, 10),
    py: new Spring(0, 40, 10),
    w: [new Spring(1, 420, 40), new Spring(1, 420, 40), new Spring(1, 420, 40)],
    ready: false,
  });

  useEffect(() => {
    if (keyLight.current && keyTarget.current) keyLight.current.target = keyTarget.current;
  }, []);
  useEffect(() => {
    sp.current.ready = false; // re-snap after a resize so nothing swims
    invalidate();
  }, [size.width, size.height, invalidate]);

  useFrame((state, delta) => {
    if (frames.current < 4 && ++frames.current === 4) onReady?.();
    const dt = Math.min(delta, 1 / 20);
    const W = size.width;
    const H = size.height;
    const ppu = H / (2 * CAM_Z * Math.tan((FOV * Math.PI) / 360));

    const poses = layoutPoses(W, H);
    const f = progressIndex(pyramidStore.u);
    const k = Math.min(2, Math.floor(f));
    const e = f >= 3 ? 1 : f - k;
    const a = poses[k];
    const b = poses[k + 1];
    const target = {
      ax: lerp(a.ax, b.ax, e),
      ay: lerp(a.ay, b.ay, e),
      sc: lerp(a.sc, b.sc, e),
      w: a.w.map((v, i) => lerp(v, b.w[i], e)) as number[],
    };
    const yawTarget = Math.PI / 4; // no spin between scenes — it only zooms

    const s = sp.current;
    if (!s.ready) {
      s.x.snap(target.ax);
      s.y.snap(target.ay);
      s.sc.snap(target.sc);
      s.yaw.snap(yawTarget);
      s.w.forEach((w, i) => w.snap(target.w[i]));
      s.ready = true;
    }
    // scroll-driven channels are bound 1:1 to the scroll position (no smoothing)
    const ax = target.ax;
    const ay = target.ay;
    const sc = target.sc;
    const yaw = yawTarget;
    const px = s.px.step(state.pointer.x, dt);
    const py = s.py.step(state.pointer.y, dt);
    const t = state.clock.elapsedTime;

    pyramidStore.halfDiag = DESIGN_HALF_DIAG * sc;
    const S = (DESIGN_HALF_DIAG * sc) / (Math.SQRT2 * PYR_A * ppu);
    if (root.current) {
      root.current.position.set(
        (ax - W / 2) / ppu,
        -(ay - H / 2) / ppu + Math.sin(t * 0.9) * 0.015,
        0,
      );
      root.current.scale.setScalar(S);
    }
    if (tilt.current) tilt.current.rotation.x = PITCH - py * 0.03;
    if (spin.current) spin.current.rotation.y = yaw + px * 0.05 + Math.sin(t * 0.35) * 0.012;

    const gOp = lerp(1, 0.8, clamp01(f)); // after the intro the whole pyramid eases back to 80%
    let lit = 0;
    for (let i = 0; i < 3; i++) {
      const w = s.w[i].step(target.w[i], dt);
      const wc = clamp01(w);
      lit += wc;
      const g = segGroups.current[i];
      if (g) g.position.y = 0; // slices never move on hover or focus
      const m = sideMats.current[i];
      if (m) {
        m.color.lerpColors(FADE, BLUE, wc);
        m.emissive.lerpColors(FADE_EMISSIVE, BLUE_EMISSIVE, wc);
        m.emissiveIntensity = 0.18 * wc; // inner glow
        m.envMapIntensity = 0.4 + 1.0 * wc;
        m.opacity = (0.65 + 0.35 * wc) * gOp; // unlit 65%, lit 100%; ×0.8 after the intro
      }
    }
    if (spin.current) {
      spin.current.updateWorldMatrix(true, false);
      for (let i = 0; i < 3; i++) {
        const seg = SEGMENTS[i];
        // dot sits on the outer wall: Digital on the left-front face, the others on the right-front face
        const tm = (seg.t1 + seg.t2) / 2;
        if (i === 1) tmp.set(-PYR_A * tm, yAt(tm), 0);
        else tmp.set(0, yAt(tm), PYR_A * tm);
        spin.current.localToWorld(tmp);
        tmp.project(state.camera);
        pyramidStore.anchors[i] = { x: (tmp.x * 0.5 + 0.5) * W, y: (-tmp.y * 0.5 + 0.5) * H };
      }
    }
    if (glowBack.current) glowBack.current.uniforms.uOpacity.value = (0.34 + 0.16 * (lit / 3) + Math.sin(t * 1.2) * 0.03) * gOp;
    if (glowFloor.current) glowFloor.current.uniforms.uOpacity.value = (0.3 + 0.5 * (lit / 3)) * gOp;
  });

  return (
    <group ref={root}>
      {/* lights live inside the root so their shadow frustum travels with the pyramid */}
      <ambientLight intensity={0.25} color="#2b7cff" />
      <directionalLight
        ref={keyLight}
        position={[5.2, 4.2, 3]}
        intensity={1.8}
        color="#4d92ff"
      />
      <object3D ref={keyTarget} position={[0, -1.2, 0]} />
      <pointLight position={[-4.5, 0.2, 2.2]} intensity={10} color="#0b7afc" distance={14} />
      <pointLight position={[1.5, -3.2, 4]} intensity={6} color="#2b7cff" distance={12} />

      {/* soft screen-space bloom behind the pyramid */}
      <mesh position={[0, -PYR_H * 0.5, -2.4]} renderOrder={-10}>
        <planeGeometry args={[4.6, 4.6]} />
        <shaderMaterial
          ref={glowBack}
          uniforms={uBack}
          vertexShader={GLOW_VERT}
          fragmentShader={GLOW_FRAG}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>

      <group ref={tilt}>
        {/* floor glow — lies on the pyramid's base plane */}
        <mesh position={[0, -PYR_H - 0.02, 0]} rotation-x={-Math.PI / 2} renderOrder={-9}>
          <planeGeometry args={[5, 5]} />
          <shaderMaterial
            ref={glowFloor}
            uniforms={uFloor}
            vertexShader={GLOW_VERT}
            fragmentShader={GLOW_FRAG}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </mesh>

        <group ref={spin}>
          {SEGMENTS.map((seg, i) => (
            <group key={seg.id} ref={(el) => void (segGroups.current[i] = el)}>
              <mesh
                geometry={geo[i].sides}
              >
                <meshPhysicalMaterial
                  ref={(el) => void (sideMats.current[i] = el)}
                  transparent
                  color={BLUE}
                  roughness={0.32}
                  metalness={0.6}
                  clearcoat={0.6}
                  clearcoatRoughness={0.2}
                  flatShading
                />
              </mesh>
              <lineSegments geometry={geo[i].edges}>
                <lineBasicMaterial
                  ref={(el) => void (edgeMats.current[i] = el)}
                  transparent
                  color="#a4cefe"
                  opacity={0.4}
                  depthWrite={false}
                  toneMapped={false}
                />
              </lineSegments>
            </group>
          ))}

        </group>
      </group>

      <Sparkles
        count={56}
        scale={[6.5, 5, 3.5]}
        position={[0, -1.4, 0.4]}
        size={3.2}
        speed={0.25}
        opacity={0.55}
        color="#9ec3ff"
        noise={0.6}
      />
    </group>
  );
}

type Props = { active: boolean; onReady?: () => void };

export default function PyramidCanvas({ active, onReady }: Props) {
  return (
    <Canvas
      flat /* no ACES tone mapping — it hue-shifts saturated blue toward purple */
      className="!absolute inset-0"
      dpr={[1, 1.5]}
      camera={{ fov: FOV, position: [0, 0, CAM_Z], near: 1, far: 80 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={active ? "always" : "never"}
    >
            <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={1.4} position={[0, 0, 9]} scale={[16, 12, 1]} color="#2b7cff" />
        <Lightformer form="rect" intensity={7} position={[4, 4, 6]} scale={[7, 3, 1]} color="#2b7cff" />
        <Lightformer form="rect" intensity={5} position={[-6, 1, 3]} rotation-y={Math.PI / 2} scale={[6, 2.4, 1]} color="#2b7cff" />
        <Lightformer form="ring" intensity={4} position={[0, 6, -4]} scale={4} color="#2b7cff" />
        <Lightformer form="rect" intensity={3} position={[0, -5, 2]} rotation-x={Math.PI / 2} scale={[8, 3, 1]} color="#2b7cff" />
      </Environment>
      <Pyramid onReady={onReady} />
    </Canvas>
  );
}
