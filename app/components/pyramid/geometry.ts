import * as THREE from "three";
import { ConvexGeometry } from "three/examples/jsm/geometries/ConvexGeometry.js";

/* The pyramid is ONE square pyramid (height = base side, like the Figma
   isometric) sliced into three frustums with the gaps removed. Fractions are
   measured from the apex (t = 0) to the base (t = 1) — taken straight off the
   01a vectors: top 0–0.24, middle 0.345–0.62, bottom 0.727–1. Each lower slice
   keeps its flat cap, which reads as the dark ledge in the design. */

export const PYR_H = 2;
export const PYR_A = 1;

export const SEGMENTS = [
  { id: "bottom", t1: 0.727, t2: 1 },
  { id: "middle", t1: 0.345, t2: 0.62 },
  { id: "top", t1: 0, t2: 0.24 },
] as const;


export const yAt = (t: number) => -PYR_H * t;
export const sAt = (t: number) => PYR_A * t;

type V3 = [number, number, number];
const ring = (t: number): V3[] => {
  const s = sAt(t);
  const y = yAt(t);
  return [
    [s, y, s],
    [-s, y, s],
    [-s, y, -s],
    [s, y, -s],
  ];
};

function pushTri(out: number[], a: V3, b: V3, c: V3, outward: V3) {
  const ab = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
  const ac = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
  const n = [
    ab[1] * ac[2] - ab[2] * ac[1],
    ab[2] * ac[0] - ab[0] * ac[2],
    ab[0] * ac[1] - ab[1] * ac[0],
  ];
  const flip = n[0] * outward[0] + n[1] * outward[1] + n[2] * outward[2] < 0;
  const tri = flip ? [a, c, b] : [a, b, c];
  for (const p of tri) out.push(...p);
}

function build(positions: number[], colorAt?: (y: number) => THREE.Color) {
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  if (colorAt) {
    const colors: number[] = [];
    for (let i = 0; i < positions.length; i += 3) {
      const c = colorAt(positions[i + 1]);
      colors.push(c.r, c.g, c.b);
    }
    g.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  }
  g.computeVertexNormals();
  g.computeBoundingSphere();
  return g;
}

/** The four slanted faces of a slice (flat-shaded, with a vertical colour ramp). */
export function sidesGeometry(t1: number, t2: number, colorAt: (y: number) => THREE.Color) {
  const top = ring(t1);
  const bot = ring(t2);
  const pos: number[] = [];
  for (let i = 0; i < 4; i++) {
    const j = (i + 1) % 4;
    const mid: V3 = [
      (bot[i][0] + bot[j][0]) / 2,
      0,
      (bot[i][2] + bot[j][2]) / 2,
    ];
    if (t1 === 0) {
      pushTri(pos, top[0], bot[i], bot[j], mid);
    } else {
      pushTri(pos, top[i], top[j], bot[j], mid);
      pushTri(pos, top[i], bot[j], bot[i], mid);
    }
  }
  return build(pos, colorAt);
}

/** A slice as a thick glass shell: outer faces, inner (cavity) faces offset inward by
 *  `d`, and flat rims where the wall is cut at the top and bottom. Looking through the
 *  front wall you see the cavity's far wall — that is what gives the glass depth. */
export function thickShellGeometry(
  t1: number,
  t2: number,
  d: number,
  colorAt: (y: number) => THREE.Color,
) {
  const m = PYR_A / PYR_H;
  const k = Math.sqrt(1 + m * m);
  const y1 = yAt(t1);
  const y2 = yAt(t2);
  const sq = (y: number, s: number): V3[] => [
    [s, y, s],
    [-s, y, s],
    [-s, y, -s],
    [s, y, -s],
  ];
  const oTop = sq(y1, sAt(t1));
  const oBot = sq(y2, sAt(t2));
  const iBot = sq(y2, sAt(t2) - d * k);
  const innerApexY = -(d * k) / m;
  const iTop = t1 === 0 ? null : sq(y1, sAt(t1) - d * k);
  const pos: number[] = [];
  const mid = (a: V3, b: V3): V3 => [(a[0] + b[0]) / 2, 0, (a[2] + b[2]) / 2];
  for (let i = 0; i < 4; i++) {
    const j = (i + 1) % 4;
    const out = mid(oBot[i], oBot[j]);
    const inn: V3 = [-out[0], 0, -out[2]];
    // outer wall
    if (t1 === 0) pushTri(pos, oTop[0], oBot[i], oBot[j], out);
    else {
      pushTri(pos, oTop[i], oTop[j], oBot[j], out);
      pushTri(pos, oTop[i], oBot[j], oBot[i], out);
    }
    // inner wall (normals face the cavity)
    if (iTop === null) pushTri(pos, [0, innerApexY, 0], iBot[i], iBot[j], inn);
    else {
      pushTri(pos, iTop[i], iTop[j], iBot[j], inn);
      pushTri(pos, iTop[i], iBot[j], iBot[i], inn);
    }
    // bottom rim
    pushTri(pos, oBot[i], oBot[j], iBot[j], [0, -1, 0]);
    pushTri(pos, oBot[i], iBot[j], iBot[i], [0, -1, 0]);
    // top rim
    if (iTop) {
      pushTri(pos, oTop[i], oTop[j], iTop[j], [0, 1, 0]);
      pushTri(pos, oTop[i], iTop[j], iTop[i], [0, 1, 0]);
    }
  }
  return build(pos, colorAt);
}

/** Thick glass-free shell with softly rounded outer edges: the outer wall is the convex
 *  hull of sphere samples around an inset frustum (Minkowski rounding, radius `r`), the
 *  top/bottom are opened, and a sharp cavity (wall thickness `d`) is cut inside with flat
 *  rims joining the two. */
export function roundedThickShell(
  t1: number,
  t2: number,
  d: number,
  r: number,
  colorAt: (y: number) => THREE.Color,
) {
  const m = PYR_A / PYR_H;
  const k = Math.sqrt(1 + m * m);
  const y1 = yAt(t1);
  const y2 = yAt(t2);
  const inner = (y: number) => -m * y - r * k;
  const sq = (y: number, s: number): V3[] => [
    [s, y, s],
    [-s, y, s],
    [-s, y, -s],
    [s, y, -s],
  ];

  // --- rounded outer wall
  const centres: V3[] = [...sq(y2 + r, inner(y2 + r))];
  if (t1 === 0) centres.push([0, -(r * k) / m, 0]);
  else centres.push(...sq(y1 - r, inner(y1 - r)));
  const dirs = new THREE.IcosahedronGeometry(1, 1).getAttribute("position");
  const pts: THREE.Vector3[] = [];
  for (const c of centres)
    for (let i = 0; i < dirs.count; i++)
      pts.push(new THREE.Vector3(c[0] + dirs.getX(i) * r, c[1] + dirs.getY(i) * r, c[2] + dirs.getZ(i) * r));
  const hull = new ConvexGeometry(pts);
  const hp = hull.getAttribute("position");
  const hn = hull.getAttribute("normal");
  const pos: number[] = [];
  for (let i = 0; i < hp.count; i += 3) {
    const ny = (hn.getY(i) + hn.getY(i + 1) + hn.getY(i + 2)) / 3;
    if (ny < -0.97 || ny > 0.985) continue; // open top + bottom
    for (let j = 0; j < 3; j++) pos.push(hp.getX(i + j), hp.getY(i + j), hp.getZ(i + j));
  }
  hull.dispose();

  // --- sharp cavity + rims
  const iBot = sq(y2, sAt(t2) - d * k);
  const iTop = t1 === 0 ? null : sq(y1, sAt(t1) - d * k);
  const apexY = -(d * k) / m;
  const holeBot = sq(y2, sAt(t2) - r * (m + k));
  const holeTop = t1 === 0 ? null : sq(y1, sAt(t1) - r * (k - m));
  const mid = (a: V3, b: V3): V3 => [(a[0] + b[0]) / 2, 0, (a[2] + b[2]) / 2];
  for (let i = 0; i < 4; i++) {
    const j = (i + 1) % 4;
    const c = mid(iBot[i], iBot[j]);
    const inn: V3 = [-c[0], 0, -c[2]];
    if (iTop === null) pushTri(pos, [0, apexY, 0], iBot[i], iBot[j], inn);
    else {
      pushTri(pos, iTop[i], iTop[j], iBot[j], inn);
      pushTri(pos, iTop[i], iBot[j], iBot[i], inn);
    }
    pushTri(pos, holeBot[i], holeBot[j], iBot[j], [0, -1, 0]);
    pushTri(pos, holeBot[i], iBot[j], iBot[i], [0, -1, 0]);
    if (iTop && holeTop) {
      pushTri(pos, holeTop[i], holeTop[j], iTop[j], [0, 1, 0]);
      pushTri(pos, holeTop[i], iTop[j], iTop[i], [0, 1, 0]);
    }
  }
  return build(pos, colorAt);
}
