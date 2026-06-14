// Measure shopify.com's content container: max-width, side padding, and the
// resulting content offset at several viewport widths.
import { chromium } from "playwright-core";

const browser = await chromium.launch({ channel: "msedge" });
for (const w of [375, 768, 1280, 1440, 1920, 2560]) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });
  try {
    await page.goto("https://www.shopify.com/pk", { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(2500);
    const info = await page.evaluate(() => {
      const h1 = document.querySelector("main h1, h1");
      if (!h1) return null;
      const h1Rect = h1.getBoundingClientRect();
      // walk ancestors collecting constrained containers
      const containers = [];
      let el = h1;
      while (el && el !== document.body) {
        const cs = getComputedStyle(el);
        if (cs.maxWidth !== "none" || parseFloat(cs.paddingLeft) > 0 || parseFloat(cs.marginLeft) > 0) {
          containers.push({
            tag: el.tagName.toLowerCase(),
            cls: (el.className.baseVal ?? el.className).toString().slice(0, 60),
            maxW: cs.maxWidth,
            padL: cs.paddingLeft,
            padR: cs.paddingRight,
            marL: cs.marginLeft,
            w: Math.round(el.getBoundingClientRect().width),
            x: Math.round(el.getBoundingClientRect().x),
          });
        }
        el = el.parentElement;
      }
      return { h1Left: Math.round(h1Rect.x), containers: containers.slice(0, 5), vw: innerWidth };
    });
    console.log(`--- ${w}px viewport: h1 starts at x=${info?.h1Left}`);
    for (const c of info?.containers ?? [])
      console.log(`    <${c.tag}> maxW=${c.maxW} pad=${c.padL}/${c.padR} marginL=${c.marL} width=${c.w} x=${c.x} cls="${c.cls}"`);
  } catch (e) {
    console.log(`--- ${w}px viewport: FAILED ${e.message.split("\n")[0]}`);
  }
  await page.close();
}
await browser.close();
