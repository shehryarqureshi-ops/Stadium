"use client";

import { useEffect, useRef } from "react";
import { GLOBE_DOTS } from "../data/globeDots";

/* Custom Canvas-2D dot-globe, styled to the reference: lat/long wireframe under
   Stadium-blue dotted continents, ring-node markers, dashed orbital arcs, and
   icon pills pinned to cities (the DIY-logistics pain points). Continents from
   public/map-dot-mask.svg. Rotates on a tilted axis (time-based — no jitter),
   drag on both axes. Canvas-2D so it renders on white + is screenshot-verifiable. */

// --- tuning knobs ---
const TILT = -0.42; // initial tilt toward viewer (radians)
const TILT_MIN = -1.2;
const TILT_MAX = 1.2;
const AUTO_SPEED = 0.13; // idle spin, radians/sec (time-based)
const DRAG_SENS = 0.005; // radians per px dragged (both axes)
const R_FACTOR = 0.78; // globe radius vs half-canvas (leaves room for arcs/pills)
const DOT_RGB = "128,148,178"; // muted slate-blue — globe recedes so the tags pop
const ACCENT_RGB = "11,122,252"; // Stadium accent-water — nodes, arcs, pill icons
const ALARM_RGB = "255,91,119"; // accent-punch

const rad = (d: number) => (d * Math.PI) / 180;
const ll = (lat: number, lon: number) => {
  const a = rad(lat), b = rad(lon), cl = Math.cos(a);
  return [cl * Math.sin(b), Math.sin(a), cl * Math.cos(b)] as const;
};

// continent dots → unit-sphere xyz
const DOTS = (() => {
  const n = GLOBE_DOTS.length / 2;
  const a = new Float32Array(n * 3);
  for (let i = 0, j = 0; i < GLOBE_DOTS.length; i += 2, j += 3) {
    const p = ll(GLOBE_DOTS[i], GLOBE_DOTS[i + 1]);
    a[j] = p[0]; a[j + 1] = p[1]; a[j + 2] = p[2];
  }
  return a;
})();

// 16×16 line icons (stroke=currentColor)
const ICONS: Record<string, string> = {
  pin: '<path d="M8 14.4s4.4-4.6 4.4-7.9A4.4 4.4 0 0 0 3.6 6.5c0 3.3 4.4 7.9 4.4 7.9Z"/><circle cx="8" cy="6.3" r="1.5"/>',
  box: '<path d="M8 1.9 13.5 5v6L8 14.1 2.5 11V5L8 1.9Z"/><path d="M2.6 5 8 8.1 13.4 5"/><path d="M8 8.1v6"/>',
  code: '<path d="m5.5 5.5-2.5 2.5 2.5 2.5"/><path d="m10.5 5.5 2.5 2.5-2.5 2.5"/>',
  shield: '<path d="M8 1.8 3.3 3.6v3.9c0 3 2 5.5 4.7 6.7 2.7-1.2 4.7-3.7 4.7-6.7V3.6L8 1.8Z"/><path d="m6 8 1.5 1.5L11 6"/>',
  tag: '<path d="M8.2 2.5H2.5V8.2L9.3 15l5.7-5.7L8.2 2.5Z"/><circle cx="5.3" cy="5.3" r="1"/>',
  alert: '<path d="M8 2.6 14.6 14H1.4L8 2.6Z"/><path d="M8 6.6v3.1"/><circle cx="8" cy="11.9" r=".6"/>',
  coins: '<ellipse cx="8" cy="5" rx="5" ry="2.2"/><path d="M3 5v3c0 1.2 2.2 2.2 5 2.2s5-1 5-2.2V5"/><path d="M3 8v3c0 1.2 2.2 2.2 5 2.2s5-1 5-2.2V8"/>',
  receipt: '<path d="M4 2h8v12.4l-2-1-2 1-2-1-2 1V2Z"/><path d="M6 5.3h4M6 8h4"/>',
  doc: '<path d="M4.5 1.8h4L12 5.3v8.9H4.5V1.8Z"/><path d="M8.5 1.8v3.5H12"/>',
  truck: '<path d="M1.6 4.2h7.3v6.2H1.6z"/><path d="M8.9 6.2h3.3L14.4 8.4v2H8.9z"/><circle cx="4.3" cy="11.6" r="1.2"/><circle cx="11.6" cy="11.6" r="1.2"/>',
  ban: '<circle cx="8" cy="8" r="5.8"/><path d="m4 4 8 8"/>',
  clock: '<circle cx="8" cy="8" r="5.8"/><path d="M8 4.6V8l2.4 1.4"/>',
};

// pain-point pills pinned to spread-out cities
const TAGS: { label: string; lat: number; lon: number; icon: string; alarm?: boolean }[] = [
  { label: "Customs", lat: 51.5, lon: -0.12, icon: "shield" },
  { label: "Import duties", lat: 40.71, lon: -74.0, icon: "receipt" },
  { label: "14 currencies", lat: 35.68, lon: 139.69, icon: "coins" },
  { label: "HS codes", lat: 1.35, lon: 103.82, icon: "code" },
  { label: "Carrier SLAs", lat: -23.55, lon: -46.63, icon: "truck" },
  { label: "Failed delivery", lat: 25.2, lon: 55.27, icon: "alert", alarm: true },
  { label: "VAT & GST", lat: -33.87, lon: 151.21, icon: "tag" },
  { label: "3PL contracts", lat: 19.43, lon: -99.13, icon: "doc" },
  { label: "Address formats", lat: 19.08, lon: 72.88, icon: "pin" },
  { label: "Local sourcing", lat: 6.52, lon: 3.38, icon: "box" },
  { label: "Restricted items", lat: 31.23, lon: 121.47, icon: "ban" },
  { label: "Lead times", lat: 34.05, lon: -118.24, icon: "clock" },
];
const TAG_XYZ = TAGS.map((t) => ll(t.lat, t.lon));

export default function ChaosGlobe() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tagRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let active = true;
    let raf = 0;
    let phi = 0;
    let theta = TILT;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    let SIZE = 0, R = 0, C = 0;
    let sphereGrad: CanvasGradient | null = null;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const css = wrap.clientWidth;
      SIZE = Math.round(css * dpr);
      canvas.width = SIZE;
      canvas.height = SIZE;
      C = SIZE / 2;
      R = C * R_FACTOR;
      sphereGrad = ctx.createRadialGradient(C - R * 0.3, C - R * 0.3, R * 0.1, C, C, R);
      sphereGrad.addColorStop(0, `rgba(${DOT_RGB},0.10)`);
      sphereGrad.addColorStop(0.75, `rgba(${DOT_RGB},0.05)`);
      sphereGrad.addColorStop(1, `rgba(${DOT_RGB},0.02)`);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    const io = new IntersectionObserver(([e]) => (active = e.isIntersecting), { threshold: 0.05 });
    io.observe(wrap);

    const project = (x: number, y: number, z: number, sp: number, cp: number, st: number, ctv: number) => {
      const x1 = x * cp + z * sp;
      const z1 = -x * sp + z * cp;
      const y2 = y * ctv - z1 * st;
      const z2 = y * st + z1 * ctv;
      return { sx: C + R * x1, sy: C - R * y2, z: z2 };
    };
    // stroke a great/small circle, breaking the path on the far side
    const strokeRing = (pts: { sx: number; sy: number; z: number }[]) => {
      ctx.beginPath();
      let on = false;
      for (const p of pts) {
        if (p.z > 0) { if (on) ctx.lineTo(p.sx, p.sy); else { ctx.moveTo(p.sx, p.sy); on = true; } }
        else on = false;
      }
      ctx.stroke();
    };

    const draw = () => {
      ctx.clearRect(0, 0, SIZE, SIZE);
      const sp = Math.sin(phi), cp = Math.cos(phi);
      const st = Math.sin(theta), cct = Math.cos(theta);

      // dashed orbital arcs (the "network" rings) behind the globe
      ctx.save();
      ctx.setLineDash([3 * dpr, 6 * dpr]);
      ctx.strokeStyle = `rgba(${ACCENT_RGB},0.28)`;
      ctx.lineWidth = Math.max(1, R * 0.004);
      const orbits = [[R * 1.2, R * 0.46, -0.34], [R * 1.12, R * 0.52, 0.55]];
      for (const [rx, ry, rot] of orbits) {
        ctx.beginPath();
        ctx.ellipse(C, C, rx, ry, rot, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.setLineDash([]);
      // a node dot riding each orbit
      orbits.forEach(([rx, ry, rot], i) => {
        const a = phi * (i ? -0.7 : 0.7) + i * 2;
        const ex = Math.cos(a) * rx, ey = Math.sin(a) * ry;
        const nx = C + ex * Math.cos(rot) - ey * Math.sin(rot);
        const ny = C + ex * Math.sin(rot) + ey * Math.cos(rot);
        ctx.fillStyle = `rgb(${ACCENT_RGB})`;
        ctx.beginPath();
        ctx.arc(nx, ny, Math.max(2, R * 0.012), 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      // faint sphere body
      if (sphereGrad) {
        ctx.fillStyle = sphereGrad;
        ctx.beginPath();
        ctx.arc(C, C, R, 0, Math.PI * 2);
        ctx.fill();
      }

      // lat/long wireframe (front hemisphere)
      ctx.strokeStyle = `rgba(${DOT_RGB},0.09)`;
      ctx.lineWidth = Math.max(1, R * 0.0022);
      for (let lat = -60; lat <= 60; lat += 30) {
        const pts = [];
        for (let lon = 0; lon <= 360; lon += 6) pts.push(project(...ll(lat, lon), sp, cp, st, cct));
        strokeRing(pts);
      }
      for (let lon = 0; lon < 360; lon += 30) {
        const pts = [];
        for (let lat = -90; lat <= 90; lat += 6) pts.push(project(...ll(lat, lon), sp, cp, st, cct));
        strokeRing(pts);
      }

      // continent dots
      ctx.fillStyle = `rgb(${DOT_RGB})`;
      const base = Math.max(1, R * 0.0105);
      for (let j = 0; j < DOTS.length; j += 3) {
        const p = project(DOTS[j], DOTS[j + 1], DOTS[j + 2], sp, cp, st, cct);
        if (p.z <= 0) continue;
        ctx.globalAlpha = 0.1 + 0.5 * p.z;
        const r = base * (0.55 + 0.45 * p.z);
        ctx.fillRect(p.sx - r, p.sy - r, r * 2, r * 2);
      }
      ctx.globalAlpha = 1;

      // limb ring
      ctx.strokeStyle = `rgba(${DOT_RGB},0.18)`;
      ctx.lineWidth = Math.max(1, R * 0.004);
      ctx.beginPath();
      ctx.arc(C, C, R, 0, Math.PI * 2);
      ctx.stroke();

      // ring-node markers + pill positions
      for (let i = 0; i < TAG_XYZ.length; i++) {
        const t = TAG_XYZ[i];
        const p = project(t[0], t[1], t[2], sp, cp, st, cct);
        const el = tagRefs.current[i];
        const rgb = TAGS[i].alarm ? ALARM_RGB : ACCENT_RGB;
        const front = p.z > 0.02;
        if (front) {
          const halo = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, R * 0.045);
          halo.addColorStop(0, `rgba(${rgb},0.5)`);
          halo.addColorStop(1, `rgba(${rgb},0)`);
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, R * 0.045, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = `rgba(${rgb},0.9)`;
          ctx.lineWidth = Math.max(1, R * 0.004);
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, Math.max(3, R * 0.018), 0, Math.PI * 2);
          ctx.stroke();
          ctx.fillStyle = `rgb(${rgb})`;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, Math.max(1.5, R * 0.008), 0, Math.PI * 2);
          ctx.fill();
        }
        if (el) {
          const vis = front ? Math.min(1, (p.z - 0.02) / 0.28) : 0;
          const cx = (p.sx / dpr).toFixed(1);
          const cy = (p.sy / dpr).toFixed(1);
          const s = (0.9 + 0.1 * p.z).toFixed(3);
          el.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -180%) scale(${s})`;
          el.style.opacity = vis.toFixed(2);
          const zi = p.z > 0.5 ? "20" : "10";
          if (el.style.zIndex !== zi) el.style.zIndex = zi;
        }
      }
    };

    let last = 0;
    const loop = (now: number) => {
      if (!last) last = now;
      let dt = now - last;
      last = now;
      if (dt > 50) dt = 50;
      if (active && !reduce && !dragging) phi += (AUTO_SPEED * dt) / 1000;
      draw();
      raf = requestAnimationFrame(loop);
    };
    draw();
    raf = requestAnimationFrame(loop);

    const onDown = (e: PointerEvent) => { dragging = true; lastX = e.clientX; lastY = e.clientY; canvas.style.cursor = "grabbing"; };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      phi += (e.clientX - lastX) * DRAG_SENS;
      theta += (e.clientY - lastY) * DRAG_SENS;
      theta = Math.max(TILT_MIN, Math.min(TILT_MAX, theta));
      lastX = e.clientX; lastY = e.clientY;
      if (reduce) draw();
    };
    const onUp = () => { dragging = false; canvas.style.cursor = "grab"; };
    canvas.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative aspect-square w-full">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-10 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(120,165,235,0.22)_0%,rgba(150,185,240,0.10)_46%,transparent_70%)] blur-3xl"
      />
      <canvas
        ref={canvasRef}
        aria-hidden
        style={{ touchAction: "pan-y", cursor: "grab" }}
        className="absolute inset-0 h-full w-full"
      />
      {TAGS.map((tag, i) => (
        <span
          key={tag.label}
          ref={(el) => {
            tagRefs.current[i] = el;
          }}
          aria-hidden
          style={{ left: 0, top: 0, opacity: 0 }}
          className={`pointer-events-none absolute inline-flex items-center gap-2 whitespace-nowrap rounded-xl border bg-surface-base px-3 py-2 font-sans text-[0.8125rem] font-medium shadow-[0_6px_16px_-4px_rgba(16,24,40,0.18)] ${
            tag.alarm ? "border-accent-punch/40 text-accent-punch" : "border-grey-200 text-grey-700"
          }`}
        >
          <svg
            viewBox="0 0 16 16"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={tag.alarm ? "text-accent-punch" : "text-accent-water"}
            dangerouslySetInnerHTML={{ __html: ICONS[tag.icon] }}
          />
          {tag.label}
        </span>
      ))}
      <ul className="sr-only">
        {TAGS.map((tag) => (
          <li key={tag.label}>{tag.label}</li>
        ))}
      </ul>
    </div>
  );
}
