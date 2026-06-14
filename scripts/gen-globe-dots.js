// Generates app/data/globeDots.ts from public/map-dot-mask.svg.
// The SVG is a dotted equirectangular world map ("Continent Mask", 3582
// dots). We convert each dot's (cx,cy) to (lat,lon) degrees and emit a flat
// [lat,lon, ...] array that ChaosGlobe wraps onto a rotating sphere.
// Run: node scripts/gen-globe-dots.js
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const src = fs.readFileSync(path.join(ROOT, "public/map-dot-mask.svg"), "utf8");

// viewBox of the source map
const W = 1040;
const H = 450.667;

const re = /cx="([\d.]+)"\s+cy="([\d.]+)"/g;
const pts = [];
let m;
while ((m = re.exec(src))) {
  const cx = +m[1];
  const cy = +m[2];
  const lon = (cx / W) * 360 - 180;
  const lat = 90 - (cy / H) * 180;
  pts.push(Math.round(lat * 10) / 10, Math.round(lon * 10) / 10);
}

const header =
  "// AUTO-GENERATED from public/map-dot-mask.svg (3582 continent dots).\n" +
  "// Flat [lat,lon, lat,lon, ...] in degrees. Source of the rotating dot-globe.\n" +
  "// Regenerate: node scripts/gen-globe-dots.js\n";

const out = path.join(ROOT, "app/data/globeDots.ts");
fs.writeFileSync(
  out,
  header + "export const GLOBE_DOTS: number[] = [" + pts.join(",") + "];\n",
);
console.log(
  "wrote app/data/globeDots.ts with",
  pts.length / 2,
  "dots,",
  (fs.statSync(out).size / 1024).toFixed(0),
  "KB",
);
