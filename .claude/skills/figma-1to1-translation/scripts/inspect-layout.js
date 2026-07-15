// Pull exact LAYOUT / SPACING / COMPOSITION metrics from a live page.
// Per-section: padding, bg, content-container width + horizontal gutter.
// Flex/grid containers: gap, column count, child width, justify, grid-template.
// Heading vertical rhythm: margins. Buttons/cards: padding + radius.
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
    const rect = el => el.getBoundingClientRect();
    const out = { viewport: 1440, sections: [], rows: [], headingRhythm: [], buttons: [], cards: [] };
    const main = document.querySelector('main') || document.body;
    let secs = [...main.querySelectorAll(':scope > *')].filter(el => rect(el).height > 240);
    if (secs.length < 3) secs = [...document.querySelectorAll('section')];
    secs.forEach((sec, i) => {
      const rc = rect(sec); if (rc.height < 200) return;
      const s = getComputedStyle(sec);
      let content = null, bestW = 0;
      sec.querySelectorAll('div').forEach(d => { const dr = rect(d); if (dr.width > 680 && dr.width < 1360 && dr.width > bestW) { bestW = dr.width; content = d; } });
      const c = content ? rect(content) : null;
      out.sections.push({ i, h: Math.round(rc.height), padT: px(s.paddingTop), padB: px(s.paddingBottom), padL: px(s.paddingLeft), padR: px(s.paddingRight), bg: s.backgroundColor, contentW: c ? Math.round(c.width) : null, gutterL: c ? Math.round(c.left) : null, gutterR: c ? Math.round(1440 - c.right) : null });
    });
    [...document.querySelectorAll('*')].forEach(el => {
      const s = getComputedStyle(el); if (s.display !== 'flex' && s.display !== 'grid') return;
      const rc = rect(el); if (rc.width < 480 || rc.height < 60) return;
      const kids = [...el.children].filter(c => rect(c).width > 40);
      if (kids.length < 2) return;
      const gap = px(s.gap) || px(s.columnGap); if (!gap) return;
      out.rows.push({ disp: s.display, dir: s.flexDirection, gap, cols: kids.length, w: Math.round(rc.width), childW: Math.round(rect(kids[0]).width), justify: s.justifyContent, align: s.alignItems, grid: s.gridTemplateColumns && s.gridTemplateColumns.length < 80 ? s.gridTemplateColumns : null });
    });
    document.querySelectorAll('h1,h2,h3').forEach(h => { const s = getComputedStyle(h); const mt = px(s.marginTop), mb = px(s.marginBottom); const t = (h.innerText || '').trim().slice(0, 22); if (t && (mt || mb)) out.headingRhythm.push({ tag: h.tagName, t, mt, mb, fs: px(s.fontSize) }); });
    document.querySelectorAll('a,button').forEach(b => { const t = (b.innerText || '').trim(); if (t.length < 3 || t.length > 24) return; const s = getComputedStyle(b); const r = rect(b); if (r.height < 28 || r.height > 72) return; out.buttons.push({ t: t.slice(0, 20), padX: px(s.paddingLeft), padY: px(s.paddingTop), radius: px(s.borderRadius), h: Math.round(r.height), bg: s.backgroundColor }); });
    document.querySelectorAll('div,article,li').forEach(el => { const s = getComputedStyle(el); const r = rect(el); if (r.width < 180 || r.width > 460 || r.height < 120) return; const rad = px(s.borderRadius); const pad = px(s.paddingTop); if (rad < 6 || pad < 8) return; out.cards.push({ w: Math.round(r.width), h: Math.round(r.height), radius: rad, padX: px(s.paddingLeft), padY: px(s.paddingTop), bg: s.backgroundColor }); });
    const dd = (a, k, n) => { const seen = new Set(); return a.filter(x => { const key = k(x); if (seen.has(key)) return false; seen.add(key); return true; }).slice(0, n); };
    out.rows = dd(out.rows, x => x.disp + x.dir + x.gap + x.cols + x.childW, 18);
    out.headingRhythm = dd(out.headingRhythm, x => x.tag + x.mt + x.mb + x.fs, 12);
    out.buttons = dd(out.buttons, x => x.padX + x.radius + x.h + x.bg, 8);
    out.cards = dd(out.cards, x => x.w + x.radius + x.padX, 12);
    return out;
  });
  console.log(JSON.stringify(data, null, 1));
  await browser.close();
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
