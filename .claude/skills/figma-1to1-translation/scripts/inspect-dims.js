// inspect-dims.js — measure the LIVE element geometry so the build matches measured
// numbers, never chosen ones (criteria M1). Records raw px box + ratio-to-1440 so
// values survive canvas scaling. Usage: node inspect-dims.js "<url>" > <page>-dims.json
const { chromium } = require('playwright-core');

(async () => {
  const url = process.argv[2];
  if (!url) { console.error('usage: node inspect-dims.js <url>'); process.exit(1); }
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  // let lazy content settle
  await page.evaluate(async () => {
    await new Promise(r => { let y = 0; const t = setInterval(() => { window.scrollTo(0, y); y += 1000; if (y > document.body.scrollHeight) { clearInterval(t); r(); } }, 30); });
  });
  await page.waitForTimeout(800);
  await page.evaluate(() => window.scrollTo(0, 0));

  const data = await page.evaluate(() => {
    const VW = 1440;
    const R = el => el.getBoundingClientRect();
    const rnd = (n, d = 0) => { const f = 10 ** d; return Math.round(n * f) / f; };
    const vis = el => { const cs = getComputedStyle(el); return cs.display !== 'none' && cs.visibility !== 'hidden' && +cs.opacity !== 0; };

    const out = { viewport: VW, images: [], grids: [], sections: [] };

    // ---- top-level sections (full-width bands) ----
    const root = document.querySelector('main') || document.body;
    [...root.children].forEach((el, i) => {
      if (!vis(el)) return; const r = R(el); if (r.height < 80 || r.width < 1000) return;
      const cs = getComputedStyle(el);
      out.sections.push({
        i, tag: el.tagName.toLowerCase(),
        w: rnd(r.width), h: rnd(r.height), top: rnd(r.top + window.scrollY),
        padT: rnd(parseFloat(cs.paddingTop)), padB: rnd(parseFloat(cs.paddingBottom)),
        bg: cs.backgroundColor,
      });
    });

    // ---- images / media / bg-image tiles (the things whose ASPECT RATIO drifts) ----
    document.querySelectorAll('img, picture, video, [style*="background-image"]').forEach(el => {
      if (!vis(el)) return; const r = R(el); if (r.width < 60 || r.height < 60) return;
      const cs = getComputedStyle(el);
      const bgImg = cs.backgroundImage && cs.backgroundImage !== 'none';
      out.images.push({
        tag: el.tagName.toLowerCase() + (bgImg ? '(bg)' : ''),
        w: rnd(r.width), h: rnd(r.height), ar: rnd(r.width / r.height, 4),
        wRatio: rnd(r.width / VW, 4), xRatio: rnd(r.left / VW, 4), top: rnd(r.top + window.scrollY),
        objectFit: cs.objectFit || (bgImg ? cs.backgroundSize : ''),
        objectPos: cs.objectPosition || cs.backgroundPosition || '',
        radius: rnd(parseFloat(cs.borderTopLeftRadius)),
        naturalAR: el.naturalWidth ? rnd(el.naturalWidth / el.naturalHeight, 4) : null,
      });
    });

    // ---- card rows: flex/grid containers with >=2 near-equal-width children ----
    const seen = new Set();
    document.querySelectorAll('*').forEach(el => {
      if (!vis(el)) return; const cs = getComputedStyle(el);
      if (cs.display !== 'flex' && cs.display !== 'grid') return;
      const r = R(el); if (r.width < 400) return;
      const kids = [...el.children].filter(c => vis(c) && R(c).width > 80 && R(c).height > 40);
      if (kids.length < 2) return;
      const kr = kids.map(R);
      const ws = kr.map(k => rnd(k.width));
      // require near-equal widths (a real card row), tolerate ±6%
      const maxW = Math.max(...ws), minW = Math.min(...ws);
      if ((maxW - minW) / maxW > 0.06) return;
      const key = rnd(r.top) + 'x' + rnd(r.width) + 'x' + kids.length;
      if (seen.has(key)) return; seen.add(key);
      const isRow = cs.flexDirection !== 'column';
      const gap = kids.length > 1
        ? (isRow ? rnd(kr[1].left - (kr[0].left + kr[0].width)) : rnd(kr[1].top - (kr[0].top + kr[0].height)))
        : 0;
      out.grids.push({
        w: rnd(r.width), wRatio: rnd(r.width / VW, 4), top: rnd(r.top + window.scrollY),
        cols: kids.length, dir: isRow ? 'row' : 'column', gap,
        cardW: ws[0], cardH: rnd(kr[0].height), cardAR: rnd(kr[0].width / kr[0].height, 4),
        radius: rnd(parseFloat(getComputedStyle(kids[0]).borderTopLeftRadius)),
        childWs: ws.slice(0, 6),
      });
    });

    out.images.sort((a, b) => a.top - b.top);
    out.grids.sort((a, b) => a.top - b.top);
    return out;
  });

  console.log(JSON.stringify(data));
  await browser.close();
})();
