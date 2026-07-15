// Full-page screenshot of a live web page -> JPEG file (for Figma reference).
// Usage: node .figma-tmp/cap.js <url> <outPath>
const { chromium } = require('playwright-core');

(async () => {
  const url = process.argv[2];
  const out = process.argv[3];
  if (!url || !out) { console.error('ERR usage: node cap.js <url> <outPath>'); process.exit(1); }

  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1024 }, deviceScaleFactor: 1 });

  console.log('goto', url);
  await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 }).catch(() => console.log('goto timeout (continuing)'));

  // Scroll through to trigger lazy-loaded images / reveal animations, then back to top.
  await page.evaluate(async () => {
    let last = 0, stable = 0;
    for (let i = 0; i < 80; i++) {
      window.scrollTo(0, document.body.scrollHeight);
      await new Promise(r => setTimeout(r, 180));
      const h = document.body.scrollHeight;
      if (h === last) { if (++stable > 3) break; } else stable = 0;
      last = h;
    }
    window.scrollTo(0, 0);
    await new Promise(r => setTimeout(r, 400));
  });

  // Pause videos (show a frame, not black) and force reveal/disable animation so nothing is mid-transition.
  await page.evaluate(() => {
    document.querySelectorAll('video').forEach(v => { try { v.pause(); if (v.currentTime < 0.1) v.currentTime = 0.1; } catch (_) {} });
    const s = document.createElement('style');
    s.textContent = '*{animation-duration:0s!important;animation-delay:0s!important;transition:none!important;scroll-behavior:auto!important}';
    document.head.appendChild(s);
  });
  await page.waitForTimeout(1500);

  await page.screenshot({ path: out, fullPage: true, type: 'jpeg', quality: 76 });
  const dims = await page.evaluate(() => ({ w: document.documentElement.scrollWidth, h: document.body.scrollHeight }));
  await browser.close();
  console.log('SHOT_DONE', out, JSON.stringify(dims));
})().catch((e) => { console.error('ERR', e && e.message); process.exit(1); });
