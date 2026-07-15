// Exhaustive PER-COMPONENT property scrape from a live page.
// For each distinct component variant (button, card, chip/badge, input, icon, image,
// heading, body, eyebrow): size, padding, margin, radius, bg, gradient, border,
// box-shadow, opacity, color, font size/weight/line-height/letter-spacing, gap.
const { chromium } = require('playwright-core');
(async () => {
  const url = process.argv[2];
  if (!url) { console.error('need url'); process.exit(1); }
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1024 }, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 }).catch(() => {});
  await page.waitForTimeout(2500);
  await page.evaluate(async () => { for (let i = 0; i < 40; i++) { window.scrollBy(0, 900); await new Promise(r => setTimeout(r, 80)); } window.scrollTo(0, 0); });
  await page.waitForTimeout(1200);
  const data = await page.evaluate(() => {
    const px = v => Math.round(parseFloat(v) || 0);
    const R = el => el.getBoundingClientRect();
    const short = (s, n) => (s && s !== 'none' && s !== 'normal') ? String(s).replace(/\s+/g, ' ').slice(0, n) : null;
    const grab = (el) => {
      const s = getComputedStyle(el); const r = R(el);
      return {
        w: Math.round(r.width), h: Math.round(r.height),
        pad: [px(s.paddingTop), px(s.paddingRight), px(s.paddingBottom), px(s.paddingLeft)].join('/'),
        mb: px(s.marginBottom),
        radius: short(s.borderTopLeftRadius === s.borderBottomRightRadius ? s.borderRadius : s.borderRadius, 24),
        bg: s.backgroundColor,
        grad: short(s.backgroundImage, 80),
        border: (s.borderTopWidth !== '0px' && s.borderStyle !== 'none') ? `${px(s.borderTopWidth)}px ${s.borderColor}` : null,
        shadow: short(s.boxShadow, 90),
        opacity: s.opacity !== '1' ? s.opacity : null,
        color: s.color,
        fs: px(s.fontSize), fw: s.fontWeight, lh: short(s.lineHeight, 8), ls: short(s.letterSpacing, 8),
        gap: (s.display === 'flex' || s.display === 'grid') ? (px(s.gap) || null) : null,
      };
    };
    const out = {};
    const push = (bucket, el, sigKeys) => {
      const g = grab(el); const sig = sigKeys.map(k => g[k]).join('|');
      (out[bucket] = out[bucket] || { _seen: new Set(), items: [] });
      if (out[bucket]._seen.has(sig)) return; out[bucket]._seen.add(sig); out[bucket].items.push(g);
    };
    document.querySelectorAll('a,button').forEach(el => { const t = (el.innerText || '').trim(); const r = R(el); if (r.height < 28 || r.height > 70 || r.width < 40) return; const s = getComputedStyle(el); if (px(s.borderRadius) < 4 && s.backgroundColor === 'rgba(0, 0, 0, 0)') return; push('buttons', el, ['h', 'pad', 'radius', 'bg', 'border']); });
    document.querySelectorAll('div,article,li').forEach(el => { const r = R(el); const s = getComputedStyle(el); if (r.width < 160 || r.width > 470 || r.height < 110) return; if (px(s.borderRadius) < 6) return; push('cards', el, ['w', 'radius', 'pad', 'bg', 'border', 'shadow']); });
    document.querySelectorAll('span,div,a').forEach(el => { const r = R(el); const s = getComputedStyle(el); if (r.height < 18 || r.height > 40 || r.width < 30 || r.width > 200) return; if (px(s.borderRadius) < 8) return; if (el.children.length > 2) return; push('chips', el, ['h', 'pad', 'radius', 'bg', 'border']); });
    document.querySelectorAll('input,textarea').forEach(el => push('inputs', el, ['h', 'pad', 'radius', 'bg', 'border']));
    document.querySelectorAll('svg').forEach(el => { const r = R(el); if (r.width < 12 || r.width > 56) return; const p = el.querySelector('path,rect,circle,line'); const ps = p ? getComputedStyle(p) : {}; push('icons', el, ['w']); const last = out.icons.items[out.icons.items.length - 1]; if (last) { last.stroke = ps.stroke; last.fill = ps.fill; last.strokeW = ps.strokeWidth; } });
    document.querySelectorAll('h1,h2,h3,p,span').forEach(el => { if (el.children.length) return; const t = (el.innerText || '').trim(); if (t.length < 2) return; const s = getComputedStyle(el); const tag = el.tagName; const up = (t === t.toUpperCase() && /[A-Z]/.test(t)) || s.textTransform === 'uppercase'; const bucket = /H[123]/.test(tag) && !up ? 'headings' : up ? 'eyebrows' : 'text'; push(bucket, el, ['fs', 'fw', 'color']); });
    Object.keys(out).forEach(k => { out[k] = out[k].items.slice(0, 14); });
    return out;
  });
  console.log(JSON.stringify(data, null, 1));
  await browser.close();
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
