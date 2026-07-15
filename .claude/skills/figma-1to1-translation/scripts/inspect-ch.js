// Pull exact design tokens (eyebrow colors, headings, body, gradients, section bgs) from a live page.
const { chromium } = require('playwright-core');
(async () => {
  const url = process.argv[2];
  if (!url) { console.error('need url'); process.exit(1); }
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1024 }, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 }).catch(() => console.log('goto timeout'));
  await page.waitForTimeout(2500);
  await page.evaluate(async () => { for (let i = 0; i < 40; i++) { window.scrollBy(0, 900); await new Promise(r => setTimeout(r, 90)); } window.scrollTo(0, 0); });
  await page.waitForTimeout(1500);
  const data = await page.evaluate(() => {
    const cs = el => getComputedStyle(el);
    const out = { eyebrows: [], headings: [], body: [], gradients: [], sectionBg: [], icons: [] };
    document.querySelectorAll('p,span,div,small,em,strong,h3,h4,h5,a').forEach(el => {
      if (el.children.length > 0) return;
      const t = (el.innerText || '').trim();
      if (t.length < 3 || t.length > 28) return;
      const s = cs(el);
      const lsNum = parseFloat(s.letterSpacing) || 0;
      const isUpper = (t === t.toUpperCase() && /[A-Z]/.test(t)) || s.textTransform === 'uppercase';
      if (isUpper && parseFloat(s.fontSize) <= 17 && (lsNum > 0.2 || s.textTransform === 'uppercase')) {
        out.eyebrows.push({ t: t.slice(0, 22), fs: s.fontSize, fw: s.fontWeight, color: s.color, ls: s.letterSpacing, tt: s.textTransform });
      }
    });
    document.querySelectorAll('h1,h2,h3').forEach(h => { const t = (h.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 38); if (!t) return; const s = cs(h); out.headings.push({ tag: h.tagName, t, fs: s.fontSize, fw: s.fontWeight, color: s.color, lh: s.lineHeight, ls: s.letterSpacing, ff: (s.fontFamily || '').split(',')[0].replace(/["']/g, '') }); });
    document.querySelectorAll('p').forEach(p => { const t = (p.innerText || '').trim(); if (t.length < 30) return; const s = cs(p); out.body.push({ fs: s.fontSize, color: s.color, lh: s.lineHeight }); });
    document.querySelectorAll('section,div,header,footer').forEach(el => { const r = el.getBoundingClientRect(); if (r.height < 240 || r.width < 1100) return; const s = cs(el); const bi = s.backgroundImage; if (bi && bi.includes('gradient')) { out.gradients.push({ grad: bi.replace(/\s+/g, ' ').slice(0, 240), h: Math.round(r.height) }); } else if (s.backgroundColor && s.backgroundColor !== 'rgba(0, 0, 0, 0)') { out.sectionBg.push({ bg: s.backgroundColor, h: Math.round(r.height) }); } });
    document.querySelectorAll('svg').forEach(svg => { const r = svg.getBoundingClientRect(); if (r.width < 16 || r.width > 64) return; const s = cs(svg); const p = svg.querySelector('path,rect,circle'); const ps = p ? cs(p) : {}; out.icons.push({ w: Math.round(r.width), stroke: ps.stroke, fill: ps.fill, color: s.color }); });
    const dedupe = (arr, keyfn, n) => { const seen = new Set(); return arr.filter(x => { const k = keyfn(x); if (seen.has(k)) return false; seen.add(k); return true; }).slice(0, n); };
    out.eyebrows = dedupe(out.eyebrows, x => x.color + x.fs + x.ls, 12);
    out.headings = dedupe(out.headings, x => x.tag + x.fs + x.fw + x.color, 12);
    out.body = dedupe(out.body, x => x.fs + x.color, 10);
    out.gradients = dedupe(out.gradients, x => x.grad, 10);
    out.sectionBg = dedupe(out.sectionBg, x => x.bg, 10);
    out.icons = dedupe(out.icons, x => x.stroke + x.fill + x.w, 10);
    return out;
  });
  console.log(JSON.stringify(data, null, 1));
  await browser.close();
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
