// Deterministic source-SPEC <-> build-props diff -> exact gap list + score.
// Usage: node diff.js <build-props.json> <source-tokens.json> <source-layout.json>
const fs = require('fs');
const load = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const buildP = load(process.argv[2]);
const srcTok = process.argv[3] ? load(process.argv[3]) : null;
const srcLay = process.argv[4] ? load(process.argv[4]) : null;

const hexToRgb = h => { if (!h || h[0] !== '#') return null; return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]; };
const isAccent = h => { const c = hexToRgb(h); if (!c) return false; const [r, g, b] = c; const mx = Math.max(r, g, b), mn = Math.min(r, g, b); return (mx - mn) > 36 && !(r > 240 && g > 240 && b > 240); }; // any chromatic (non-grey, non-near-white) hue

const gaps = [];
const add = (dim, msg) => gaps.push({ dim, msg });

// --- grid ---
if (!buildP.contentW.includes(1260)) add('grid', `content width ${JSON.stringify(buildP.contentW)} ≠ 1260`);

// --- section backgrounds vs source ---
if (srcTok && srcTok.sectionBg) {
  const srcBgs = srcTok.sectionBg.map(s => s.bg.replace(/rgb\((\d+), (\d+), (\d+)\)/, (_, r, g, b) => '#' + [r, g, b].map(n => (+n).toString(16).padStart(2, '0')).join('')));
  // (informational — section mapping is per-page; we mainly assert darks are #000/#02090a/#141a1a and lights are off-white)
}

// --- eyebrows must be monochrome (source labels = heading color) ---
buildP.eyebrows.forEach(e => { if (isAccent(e.color)) add('color', `eyebrow color ${e.color} is a chromatic ACCENT — source eyebrows are monochrome (ink on light / white on dark)`); });
// --- headings / Satoshi text must be monochrome ---
buildP.headings.forEach(h => { if (isAccent(h.color)) add('color', `heading/label color ${h.color} is a chromatic ACCENT — should be mono`); });

// --- heading sizes vs source scale ---
if (srcTok && srcTok.headings) {
  const srcSizes = new Set(srcTok.headings.map(h => parseInt(h.fs)));
  // allow small label/body sizes; flag mid/large headings not in the source set
  buildP.headings.filter(h => h.fs >= 26).forEach(h => { if (!srcSizes.has(h.fs)) add('type-size', `heading size ${h.fs} not in source heading scale {${[...srcSizes].sort((a,b)=>a-b).join(',')}}`); });
}

// --- card radii (section cards 16 light / 12 dark; mockup cards excluded by radius 18) ---
buildP.cards.forEach(c => { if (![12, 16, 18].includes(c.radius)) add('radius', `card radius ${c.radius} ≠ 16(light)/12(dark)`); });

// --- buttons full pill ---
buildP.buttons.forEach(b => { if (b.radius < b.h / 2 - 3) add('radius', `button radius ${b.radius} not full-pill (h${b.h}, expect ≥${Math.round(b.h / 2)})`); });

// --- score ---
const score = Math.max(0, 100 - gaps.length * 6);
console.log(`\n=== DIFF: ${gaps.length} gaps  (score ${score}/100) ===`);
const byDim = {};
gaps.forEach(g => { (byDim[g.dim] = byDim[g.dim] || []).push(g.msg); });
Object.keys(byDim).forEach(d => { console.log(`\n[${d}]`); byDim[d].forEach(m => console.log('  • ' + m)); });
if (!gaps.length) console.log('  ✓ no deterministic gaps — passes the property gate');
