// Generates public/globe-figma.svg — an ACCURATE static SVG of the live
// ChaosGlobe (app/components/ChaosGlobe.tsx): same projection, tilt, colors,
// depth-shaded continent dots, lat/long wireframe, dashed orbital arcs with
// node dots, ring-node markers + icon pills, and the back glow. Frame chosen at
// the phi that shows the most land. Kept compact (integer coords, dots grouped
// into depth tiers) so it reads in one pass for figma.createNodeFromSvg.
// Run: node scripts/gen-globe-svg.js
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");

const src = fs.readFileSync(path.join(ROOT, "app/data/globeDots.ts"), "utf8");
const eq = src.indexOf("=", src.indexOf("GLOBE_DOTS"));
const aStart = src.indexOf("[", eq);
const aEnd = src.indexOf("]", aStart);
const nums = src.slice(aStart + 1, aEnd).split(",").map(Number);

// ---- match ChaosGlobe knobs ----
const SZ = 640, C = SZ / 2, R = C * 0.78, TILT = -0.42;
const DOT = "128,148,178", ACCENT = "11,122,252", ALARM = "255,91,119";
const rad = (d) => (d * Math.PI) / 180;
const ll = (lat, lon) => { const a = rad(lat), b = rad(lon), cl = Math.cos(a); return [cl * Math.sin(b), Math.sin(a), cl * Math.cos(b)]; };
const DOTS = [];
for (let i = 0; i < nums.length; i += 2) DOTS.push(ll(nums[i], nums[i + 1]));

// icons + tags copied verbatim from ChaosGlobe
const ICONS = {
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
const TAGS = [
  ["Customs", 51.5, -0.12, "shield", 0],
  ["Import duties", 40.71, -74.0, "receipt", 0],
  ["14 currencies", 35.68, 139.69, "coins", 0],
  ["HS codes", 1.35, 103.82, "code", 0],
  ["Carrier SLAs", -23.55, -46.63, "truck", 0],
  ["Failed delivery", 25.2, 55.27, "alert", 1],
  ["VAT & GST", -33.87, 151.21, "tag", 0],
  ["3PL contracts", 19.43, -99.13, "doc", 0],
  ["Address formats", 19.08, 72.88, "pin", 0],
  ["Local sourcing", 6.52, 3.38, "box", 0],
  ["Restricted items", 31.23, 121.47, "ban", 0],
  ["Lead times", 34.05, -118.24, "clock", 0],
];

const sinT = Math.sin(TILT), cosT = Math.cos(TILT);
const project = (p, sp, cp) => {
  const x1 = p[0] * cp + p[2] * sp, z1 = -p[0] * sp + p[2] * cp;
  const y2 = p[1] * cosT - z1 * sinT, z2 = p[1] * sinT + z1 * cosT;
  return { sx: C + R * x1, sy: C - R * y2, z: z2 };
};

// phi that shows the most land (a representative frame)
let bestPhi = 0, best = -1;
for (let k = 0; k < 96; k++) {
  const phi = (k / 96) * Math.PI * 2, sp = Math.sin(phi), cp = Math.cos(phi);
  let n = 0;
  for (const d of DOTS) if (project(d, sp, cp).z > 0.25) n++;
  if (n > best) { best = n; bestPhi = phi; }
}
const sp = Math.sin(bestPhi), cp = Math.cos(bestPhi);
const r1 = (n) => Math.round(n * 10) / 10;
const ri = (n) => Math.round(n);

// lat/long wireframe (front hemisphere), integer coords, lon step 30 like ChaosGlobe
const ring = (pts) => { let d = "", on = false; for (const p of pts) { if (p.z > 0) { d += (on ? "L" : "M") + ri(p.sx) + " " + ri(p.sy); on = true; } else on = false; } return d; };
let wire = "";
for (let lat = -60; lat <= 60; lat += 30) { const pts = []; for (let lon = 0; lon <= 360; lon += 6) pts.push(project(ll(lat, lon), sp, cp)); wire += ring(pts); }
for (let lon = 0; lon < 360; lon += 30) { const pts = []; for (let lat = -90; lat <= 90; lat += 6) pts.push(project(ll(lat, lon), sp, cp)); wire += ring(pts); }

// continent dots — depth-shaded: ChaosGlobe uses alpha 0.1+0.5z and
// size base*(0.55+0.45z), base=R*0.0105. Group into 6 z-tiers (one path each)
// for a smooth 3D falloff; subsample 1/2 to stay compact.
const base = R * 0.0105;
const NT = 6;
const tiers = Array.from({ length: NT }, () => []);
for (let di = 0; di < DOTS.length; di++) {
  // full density (body is rasterized to PNG — no inline-size limit)
  const p = project(DOTS[di], sp, cp);
  if (p.z <= 0.04) continue;
  const ti = Math.min(NT - 1, Math.floor(p.z * NT));
  const zMid = (ti + 0.5) / NT;
  const s = Math.max(1, Math.round(base * (0.55 + 0.45 * zMid)));
  const d2 = s * 2;
  tiers[ti].push(`M${ri(p.sx - s)} ${ri(p.sy - s)}h${d2}v${d2}h-${d2}z`);
}
let dotsSvg = "";
tiers.forEach((arr, i) => { if (!arr.length) return; const z = (i + 0.5) / NT; const op = (0.1 + 0.5 * z).toFixed(2); dotsSvg += `<path d="${arr.join("")}" fill="rgb(${DOT})" opacity="${op}"/>`; });

// dashed orbital arcs + a node dot riding each (positions from bestPhi)
const orbits = [[R * 1.2, R * 0.46, -0.34], [R * 1.12, R * 0.52, 0.55]];
let arcs = "";
orbits.forEach(([rx, ry, rot], i) => {
  arcs += `<ellipse cx="${C}" cy="${C}" rx="${r1(rx)}" ry="${r1(ry)}" transform="rotate(${r1(rot * 180 / Math.PI)} ${C} ${C})" fill="none" stroke="rgb(${ACCENT})" stroke-opacity="0.28" stroke-width="1.2" stroke-dasharray="3 6"/>`;
  const a = bestPhi * (i ? -0.7 : 0.7) + i * 2, ex = Math.cos(a) * rx, ey = Math.sin(a) * ry;
  const nx = C + ex * Math.cos(rot) - ey * Math.sin(rot), ny = C + ex * Math.sin(rot) + ey * Math.cos(rot);
  arcs += `<circle cx="${r1(nx)}" cy="${r1(ny)}" r="3" fill="rgb(${ACCENT})"/>`;
});

// front-facing tags → ring markers + icon pills
const front = TAGS.map((t) => ({ t, p: project(ll(t[1], t[2]), sp, cp) })).filter((o) => o.p.z > 0.12).sort((a, b) => b.p.z - a.p.z);
let markers = "", pills = "";
for (const { t, p } of front) {
  const rgb = t[4] ? ALARM : ACCENT, cx = ri(p.sx), cy = ri(p.sy);
  markers += `<circle cx="${cx}" cy="${cy}" r="${r1(R * 0.045)}" fill="rgb(${rgb})" opacity="0.16"/><circle cx="${cx}" cy="${cy}" r="${r1(R * 0.018)}" fill="none" stroke="rgb(${rgb})" stroke-width="1.6"/><circle cx="${cx}" cy="${cy}" r="2" fill="rgb(${rgb})"/>`;
  const label = t[0].replace(/ & /g, " &amp; "), w = Math.round(t[0].length * 6.4 + 44), h = 30;
  const px = ri(cx - w / 2), py = ri(cy - 46);
  const stroke = t[4] ? `rgb(${ALARM})` : "#eff0f2", so = t[4] ? "0.4" : "1", tcol = t[4] ? `rgb(${ALARM})` : "#2c2d2e";
  const ic = t[4] ? `rgb(${ALARM})` : `rgb(${ACCENT})`;
  pills +=
    `<g><rect x="${px}" y="${py}" width="${w}" height="${h}" rx="9" fill="#fff" stroke="${stroke}" stroke-opacity="${so}"/>` +
    `<g transform="translate(${px + 12} ${py + 7})" fill="none" stroke="${ic}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${ICONS[t[3]]}</g>` +
    `<text x="${px + 34}" y="${py + 19}" font-family="Overpass, sans-serif" font-size="13" font-weight="500" fill="${tcol}">${label}</text></g>`;
}

const open = `<svg width="${SZ}" height="${SZ}" viewBox="0 0 ${SZ} ${SZ}" xmlns="http://www.w3.org/2000/svg">`;
const defs =
  `<defs><radialGradient id="g" cx="38%" cy="38%" r="62%"><stop offset="0" stop-color="rgb(${DOT})" stop-opacity="0.10"/><stop offset="0.75" stop-color="rgb(${DOT})" stop-opacity="0.05"/><stop offset="1" stop-color="rgb(${DOT})" stop-opacity="0.02"/></radialGradient>` +
  `<radialGradient id="glow" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#78A5EB" stop-opacity="0.22"/><stop offset="46%" stop-color="#96B9F0" stop-opacity="0.10"/><stop offset="72%" stop-color="#96B9F0" stop-opacity="0"/></radialGradient></defs>`;
const core = defs +
  `<circle cx="${C}" cy="${C}" r="${r1(R * 1.35)}" fill="url(#glow)"/>` +
  arcs +
  `<circle cx="${C}" cy="${C}" r="${r1(R)}" fill="url(#g)"/>` +
  `<path d="${wire}" fill="none" stroke="rgb(${DOT})" stroke-opacity="0.09" stroke-width="0.8"/>` +
  dotsSvg +
  `<circle cx="${C}" cy="${C}" r="${r1(R)}" fill="none" stroke="rgb(${DOT})" stroke-opacity="0.18" stroke-width="1.1"/>` +
  markers;
const fullSvg = open + core + pills + `</svg>`;     // vector reference (with pills)
const bodySvg = open + core + `</svg>`;              // rasterized to PNG (no text)
fs.writeFileSync(path.join(ROOT, "public/globe-figma.svg"), fullSvg);
fs.writeFileSync(path.join(ROOT, "public/globe-body.svg"), bodySvg);
const pillData = front.map(({ t, p }) => ({ x: ri(p.sx), y: ri(p.sy), label: t[0], icon: t[3], alarm: !!t[4] }));
fs.writeFileSync(path.join(ROOT, "public/globe-pills.json"), JSON.stringify(pillData));
console.log("phi=" + bestPhi.toFixed(2), "full=" + fullSvg.length, "body=" + bodySvg.length, "dots=" + tiers.reduce((s, a) => s + a.length, 0), "pills=" + pillData.length);
