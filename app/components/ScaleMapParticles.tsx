"use client";

import { useEffect, useRef } from "react";

/* Canvas-2D particle system for ScaleMap — 4 decorative arrangements (globe /
   grid / waves / galaxy) switched by `activeTab` (0-3, driven by ScaleMap's
   existing stat buttons). Ported from a user-supplied prototype; this visual
   is NOT Figma-sourced (approved exception — see design.md). Structure
   follows ChaosGlobe.tsx's Canvas-2D setup: dpr-scaled backing store,
   ResizeObserver sizing, IntersectionObserver pause off-screen, one-time
   prefers-reduced-motion check gating continuous motion only (discrete
   tab-switch transitions still animate under reduced motion). */

const PARTICLE_COUNT = 2500;

/* Reference frame the arrangement math below is authored against — actual
   screen output is derived by scaling the final projected coordinates by
   `scaleFactor` (see resize()), not by touching these authored values. */
const REF_W = 800;
const REF_H = 900;

/* Decimal-RGB transcriptions of app/globals.css's --color-accent-* tokens
   (kept in sync manually — canvas fillStyle can't read CSS custom
   properties directly; same convention as ChaosGlobe.tsx/Starfield.tsx). */
const RGB = {
  water: "11,122,252", // --color-accent-water
  lime: "11,122,252", // --color-accent-lime
  lilac: "11,122,252", // --color-accent-lilac
  punch: "11,122,252", // --color-accent-punch
  turmeric: "11,122,252", // --color-accent-turmeric
} as const;

// const RGB = {
//   water: "11,122,252", // --color-accent-water
//   lime: "0,192,54", // --color-accent-lime
//   lilac: "141,18,231", // --color-accent-lilac
//   punch: "255,91,119", // --color-accent-punch
//   turmeric: "255,184,0", // --color-accent-turmeric
// } as const;

type ColorName = keyof typeof RGB | "faint";

function colorRgba(name: ColorName, alpha: number): string {
  const rgb = name === "faint" ? RGB.water : RGB[name];
  return `rgba(${rgb},${alpha})`;
}

/* Per-arrangement scratch data. Fully overwritten (never partially mutated)
   every time setArrangement() runs, so optional fields are safe even without
   a discriminated union — `activeTab` is the real discriminant driving which
   fields are read, not anything inside this bag. */
interface TabData {
  // globe (tab 0)
  theta?: number;
  phi?: number;
  r?: number;
  // grid (tab 1)
  gridTx?: number;
  gridTz?: number;
  isPulsator?: boolean;
  pulseSpeed?: number;
  pulseOffset?: number;
  // waves / hourglass (tab 2)
  t?: number;
  angle?: number;
  radiusNorm?: number;
  speed?: number;
  // galaxy / Milky Way (tab 3)
  kind?: "core" | "arm" | "halo";
  galaxyR?: number;
  galaxyAngle?: number;
  galaxySpeed?: number;
  galaxyY?: number;
}

/* Procedural continent check (rejection-sampled against hand-written lat/lon
   boundary boxes) — only used to seed the globe arrangement (tab 0). */
function isRealLand(theta: number, phi: number): boolean {
  const degLat = 90 - phi * (180 / Math.PI);
  const degLon = theta * (180 / Math.PI) - 180;

  if (degLat < -60) return true; // Antarctica
  if (degLat > -40 && degLat < -10 && degLon > 113 && degLon < 153) return true; // Australia

  // South America
  if (degLat >= -56 && degLat <= 12 && degLon >= -82 && degLon <= -34) {
    if (degLat < -15) {
      const t = (degLat - -56) / (-15 - -56);
      const minL = -76 - t * 6;
      const maxL = -65 + t * 20;
      return degLon >= minL && degLon <= maxL;
    }
    if (degLat > 5 && degLon < -75) return false;
    return true;
  }

  // North America & Greenland
  if (degLat > 12 && degLat <= 83 && degLon >= -168 && degLon <= -10) {
    if (degLat > 60 && degLon >= -75 && degLon <= -15) return true; // Greenland
    if (degLon <= -52) {
      if (degLat < 30) {
        const t = (degLat - 12) / (30 - 12);
        const minL = -105 - t * 15;
        const maxL = -85 + t * 5;
        return degLon >= minL && degLon <= maxL;
      }
      if (degLat > 15 && degLat < 30 && degLon > -98 && degLon < -82)
        return false; // Gulf of Mexico
      if (degLat > 30 && degLat < 45 && degLon > -70) return false;
      return true;
    }
  }

  // Africa
  if (degLat >= -35 && degLat <= 37 && degLon >= -18 && degLon <= 51) {
    if (degLat > 15 && degLon > 33) return false; // Middle East overlap
    if (degLat < 5) {
      const t = (degLat - -35) / (5 - -35);
      const minL = 10 - t * 25;
      const maxL = 40 + t * 10;
      return degLon >= minL && degLon <= maxL;
    }
    return true;
  }

  // Eurasia + Middle East + India + SE Asia
  if (degLat > 5 && degLat <= 78 && degLon >= -10 && degLon <= 180) {
    if (degLat > 12 && degLat < 32 && degLon > 34 && degLon < 60) return true; // Middle East
    if (degLat > 8 && degLat < 28 && degLon > 68 && degLon < 92) {
      const t = (degLat - 8) / (28 - 8);
      return degLon >= 78 - t * 10 && degLon <= 78 + t * 12;
    } // India
    if (degLat > 5 && degLat < 25 && degLon > 95 && degLon < 112) return true; // Indochina
    if (degLat > 30 && degLat < 45 && degLon > 125 && degLon < 146) return true; // Japan/Korea
    if (degLat >= 30) {
      if (degLat < 45 && degLon < 35) {
        if (degLon < 0) return true; // Iberia
        if (degLon > 10 && degLon < 20 && degLat > 36) return true; // Italy
        if (degLon > 20 && degLon < 30 && degLat > 36) return true; // Greece/Turkey
        return false; // Med Sea
      }
      return true;
    }
  }

  // SE Asian islands — sparse scattering
  if (degLat >= -10 && degLat <= 10 && degLon >= 95 && degLon <= 150) {
    return Math.random() < 0.25;
  }

  return false;
}

class Particle {
  x: number;
  y: number;
  z: number;
  tx: number;
  ty: number;
  tz: number;
  lerpSpeed: number;
  baseSize: number;
  colorName: ColorName;
  glow: boolean;
  floatOffset: number;
  tabData: TabData;

  constructor() {
    this.x = (Math.random() - 0.5) * 800;
    this.y = (Math.random() - 0.5) * 400;
    this.z = (Math.random() - 0.5) * 800;
    this.tx = this.x;
    this.ty = this.y;
    this.tz = this.z;
    this.lerpSpeed = 0.04 + Math.random() * 0.04;
    this.baseSize = 1.2;
    this.colorName = "water";
    this.glow = false;
    this.floatOffset = Math.random() * Math.PI * 2;
    this.tabData = {};
  }

  update() {
    this.x += (this.tx - this.x) * this.lerpSpeed;
    this.y += (this.ty - this.y) * this.lerpSpeed;
    this.z += (this.tz - this.z) * this.lerpSpeed;
  }
}

function buildParticles(count: number): Particle[] {
  return Array.from({ length: count }, () => new Particle());
}

function pickWeighted(rand: number, weights: [ColorName, number][]): ColorName {
  let acc = 0;
  for (const [name, upTo] of weights) {
    acc = upTo;
    if (rand < acc) return name;
  }
  return weights[weights.length - 1][0];
}

function setArrangement(particles: Particle[], tab: number) {
  if (tab === 0) {
    // GLOBE — landmass mapped geographically, rejection-sampled
    const R = 280;
    for (const p of particles) {
      let theta = 0;
      let phi = 0;
      let found = false;
      let attempts = 0;
      while (!found && attempts < 120) {
        theta = Math.random() * Math.PI * 2;
        phi = Math.acos(Math.random() * 2 - 1);
        if (isRealLand(theta, phi)) found = true;
        attempts++;
      }
      p.tabData = { theta, phi, r: R };
      p.colorName = pickWeighted(Math.random(), [
        ["water", 0.5],
        ["lime", 0.75],
        ["lilac", 0.88],
        ["punch", 0.95],
        ["turmeric", 1],
      ]);
      p.glow = Math.random() > 0.85;
      p.baseSize = p.glow ? 2.0 : 1.2;
    }
  } else if (tab === 1) {
    // GRID — flat square grid, a subset of nodes pulsate independently
    const dim = 50;
    const spacing = 18;
    const offset = (dim * spacing) / 2;
    particles.forEach((p, i) => {
      const row = Math.floor(i / dim);
      const col = i % dim;
      p.tabData = {
        gridTx: col * spacing - offset,
        gridTz: row * spacing - offset,
        isPulsator: Math.random() < 0.25,
        pulseSpeed: 1.5 + Math.random() * 2.5,
        pulseOffset: Math.random() * Math.PI * 2,
      };
      p.colorName = pickWeighted(Math.random(), [
        ["water", 0.6],
        ["lilac", 0.8],
        ["punch", 1],
      ]);
      p.glow = false;
      p.baseSize = 1;
    });
  } else if (tab === 2) {
    // WAVES / HOURGLASS — flows left to right, narrowing through the center
    for (const p of particles) {
      p.tabData = {
        t: Math.random(),
        angle: Math.random() * Math.PI * 2,
        radiusNorm: Math.cbrt(Math.random()),
        speed: 0.002 + Math.random() * 0.003,
      };
      const isFaint = Math.random() > 0.8;
      p.colorName = isFaint
        ? "faint"
        : pickWeighted(Math.random(), [
            ["water", 0.5],
            ["lilac", 0.7],
            ["punch", 0.85],
            ["lime", 1],
          ]);
      p.glow = !isFaint && Math.random() > 0.7;
      p.baseSize = p.glow ? 2 : 1;
    }
  } else if (tab === 3) {
    // MILKY WAY — dense core + 4 spiral arms + sparse outer halo
    let idx = 0;
    for (; idx < 600; idx++) {
      const p = particles[idx];
      const r = Math.pow(Math.random(), 1.5) * 75;
      const galaxyAngle = Math.random() * Math.PI * 2;
      const galaxyY = (Math.random() - 0.5) * 40 * (1 - r / 75);
      p.tabData = {
        kind: "core",
        galaxyR: r,
        galaxyAngle,
        galaxySpeed: 0.008 + (1 - r / 75) * 0.006,
        galaxyY,
      };
      p.colorName = Math.random() > 0.4 ? "turmeric" : "punch";
      p.glow = true;
      p.baseSize = 2.0;
    }
    const numArms = 4;
    const armDelta = (Math.PI * 2) / numArms;
    for (; idx < 2100; idx++) {
      const p = particles[idx];
      const armIdx = idx % numArms;
      const t = Math.pow(Math.random(), 0.9);
      const r = 75 + t * 280;
      const baseAngle = armIdx * armDelta + t * 2.8;
      const spread = (Math.random() - 0.5) * 0.35;
      const galaxyY = (Math.random() - 0.5) * 20 * (1 - t);
      p.tabData = {
        kind: "arm",
        galaxyR: r,
        galaxyAngle: baseAngle + spread,
        galaxySpeed: 0.002 + (1 - t) * 0.003,
        galaxyY,
      };
      if (t < 0.3) p.colorName = "lilac";
      else if (t < 0.7) p.colorName = "water";
      else p.colorName = Math.random() > 0.5 ? "lime" : "punch";
      p.glow = Math.random() > 0.7;
      p.baseSize = p.glow ? 2.2 : 1.2;
    }
    for (; idx < PARTICLE_COUNT; idx++) {
      const p = particles[idx];
      const r = Math.random() * 380;
      const galaxyAngle = Math.random() * Math.PI * 2;
      const galaxyY = (Math.random() - 0.5) * 70;
      p.tabData = {
        kind: "halo",
        galaxyR: r,
        galaxyAngle,
        galaxySpeed: 0.001 + Math.random() * 0.002,
        galaxyY,
      };
      p.colorName = "faint";
      p.glow = false;
      p.baseSize = 0.8;
    }
  }
}

function updateDynamicTargets(
  particles: Particle[],
  tab: number,
  time: number,
) {
  for (const p of particles) {
    const d = p.tabData;
    if (tab === 0) {
      d.theta = (d.theta ?? 0) + 0.003;
      const r = d.r ?? 0;
      p.tx = r * Math.sin(d.phi ?? 0) * Math.cos(d.theta);
      p.ty = r * Math.cos(d.phi ?? 0);
      p.tz = r * Math.sin(d.phi ?? 0) * Math.sin(d.theta);
    } else if (tab === 1) {
      p.tx = d.gridTx ?? 0;
      p.tz = d.gridTz ?? 0;
      p.ty = 0;
    } else if (tab === 2) {
      let t = (d.t ?? 0) + (d.speed ?? 0);
      let justWrapped = false;
      if (t > 1) {
        t = 0;
        justWrapped = true;
      }
      d.t = t;
      const x = t * 1400 - 700;
      const nx = x / 700;
      const env = 25 + 180 * (nx * nx);
      const wave = Math.sin(nx * Math.PI * 3 - time * 2.5) * 40;
      p.tx = x;
      p.ty = Math.cos(d.angle ?? 0) * (d.radiusNorm ?? 0) * env + wave;
      p.tz = Math.sin(d.angle ?? 0) * (d.radiusNorm ?? 0) * env;
      if (justWrapped) {
        p.x = p.tx;
        p.y = p.ty;
        p.z = p.tz;
      }
    } else if (tab === 3) {
      d.galaxyAngle = (d.galaxyAngle ?? 0) + (d.galaxySpeed ?? 0);
      const r = d.galaxyR ?? 0;
      p.tx = Math.cos(d.galaxyAngle) * r;
      p.tz = Math.sin(d.galaxyAngle) * r;
      p.ty = d.galaxyY ?? 0;
    }
  }
}

const FOV = 600;
const CAM_Z = 700;
const PITCH = 0.8;
const VERTICAL_OFFSETS = [-15, 30, -10, 15];

function project3D(
  x: number,
  y: number,
  z: number,
  W: number,
  H: number,
  scaleFactor: number,
  tab: number,
) {
  const cosP = Math.cos(PITCH);
  const sinP = Math.sin(PITCH);
  const ry = y * cosP - z * sinP;
  let rz = y * sinP + z * cosP;
  rz += CAM_Z;
  if (rz <= 0) rz = 0.1;

  const scale = FOV / rz;
  const offset = VERTICAL_OFFSETS[tab] ?? 0;
  return {
    sx: W / 2 + x * scale * scaleFactor,
    sy: H / 2 + ry * scale * scaleFactor + offset * scaleFactor,
    scale,
    alpha: Math.min(1, Math.max(0.05, scale * 1.2)),
  };
}

function render(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  W: number,
  H: number,
  scaleFactor: number,
  tab: number,
  time: number,
  reduce: boolean,
) {
  ctx.clearRect(0, 0, W, H);

  particles.sort((a, b) => {
    const az = a.y * Math.sin(PITCH) + a.z * Math.cos(PITCH);
    const bz = b.y * Math.sin(PITCH) + b.z * Math.cos(PITCH);
    return bz - az;
  });

  for (const p of particles) {
    p.update();

    let currentY = p.y;
    if (tab !== 1 && !reduce) currentY += Math.sin(time + p.floatOffset) * 2;

    const proj = project3D(p.x, currentY, p.z, W, H, scaleFactor, tab);

    let drawSize = p.baseSize;
    let finalColorName = p.colorName;
    let finalGlow = p.glow;

    if (tab === 1) {
      const d = p.tabData;
      if (d.isPulsator && !reduce) {
        const pulseWave = Math.sin(
          time * (d.pulseSpeed ?? 0) + (d.pulseOffset ?? 0),
        );
        const normPulse = (pulseWave + 1) / 2;
        drawSize = p.baseSize * (1.0 + normPulse * 1.8);
        if (normPulse > 0.65) {
          finalColorName = "turmeric";
          finalGlow = true;
        } else if (normPulse > 0.2) {
          finalGlow = false;
        } else {
          finalColorName = "faint";
          finalGlow = false;
        }
      } else {
        finalGlow = false;
        drawSize = 1.0;
      }
    }

    const finalDrawSize = drawSize * proj.scale * scaleFactor;
    const baseAlpha = proj.alpha;

    ctx.beginPath();
    ctx.arc(proj.sx, proj.sy, Math.max(0.1, finalDrawSize), 0, Math.PI * 2);

    if (finalColorName === "faint") {
      ctx.fillStyle = colorRgba("water", baseAlpha * 0.25);
      ctx.shadowBlur = 0;
    } else {
      ctx.fillStyle = colorRgba(finalColorName, baseAlpha);
      if (finalGlow) {
        ctx.shadowBlur = 10 * proj.scale * scaleFactor;
        ctx.shadowColor = colorRgba(finalColorName, baseAlpha);
      } else {
        ctx.shadowBlur = 0;
      }
    }
    ctx.fill();
  }
  ctx.shadowBlur = 0;
}

export default function ScaleMapParticles({
  activeTab,
}: {
  activeTab: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeTabRef = useRef(activeTab);
  const arrangeRef = useRef<((tab: number) => void) | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let active = true;
    let raf = 0;
    let W = 0;
    let H = 0;
    let scaleFactor = 1;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const particles = buildParticles(PARTICLE_COUNT);

    const applyArrangement = (tab: number) => setArrangement(particles, tab);
    arrangeRef.current = applyArrangement;

    const resize = () => {
      W = canvas.width = Math.round(wrap.clientWidth * dpr);
      H = canvas.height = Math.round(wrap.clientHeight * dpr);
      scaleFactor = Math.min(W / REF_W, H / REF_H);
    };
    resize();
    applyArrangement(activeTabRef.current);

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    const io = new IntersectionObserver(([e]) => (active = e.isIntersecting), {
      threshold: 0.05,
    });
    io.observe(wrap);

    let time = 0;
    let last = 0;
    const loop = (now: number) => {
      if (!last) last = now;
      let dt = now - last;
      last = now;
      if (dt > 50) dt = 50;
      if (active) {
        time += 0.01;
        if (!reduce)
          updateDynamicTargets(particles, activeTabRef.current, time);
        render(
          ctx,
          particles,
          W,
          H,
          scaleFactor,
          activeTabRef.current,
          time,
          reduce,
        );
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const fade = requestAnimationFrame(() => {
      canvas.style.opacity = "1";
    });

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(fade);
      ro.disconnect();
      io.disconnect();
      arrangeRef.current = null;
    };
  }, []);

  useEffect(() => {
    activeTabRef.current = activeTab;
    arrangeRef.current?.(activeTab);
  }, [activeTab]);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="relative h-[var(--spacing-scale-map-sm)] w-full overflow-hidden md:h-[var(--spacing-scale-map-md)] lg:h-[var(--spacing-scale-map-lg)] [mask-image:radial-gradient(circle_at_center,black_40%,transparent_90%)]"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ opacity: 0, transition: "opacity 1s ease" }}
      />
    </div>
  );
}
