// Screenshot every page section at multiple viewport widths + report overflow.
import { chromium } from "playwright-core";

const widths = [1200, 1680, 1920];
const browser = await chromium.launch({ channel: "msedge" });

for (const w of widths) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 50));
    }
  });
  await page.waitForTimeout(800);

  // overflow check: any element wider than the viewport?
  const overflow = await page.evaluate(() => {
    const bad = [];
    for (const el of document.querySelectorAll("section, section *")) {
      const r = el.getBoundingClientRect();
      if (r.width > window.innerWidth + 1 || r.right > window.innerWidth + 8) {
        const sec = el.closest("section");
        const idx = [...document.querySelectorAll("section")].indexOf(sec);
        if (!bad.some((b) => b.section === idx))
          bad.push({ section: idx, tag: el.tagName, w: Math.round(r.width), right: Math.round(r.right) });
      }
    }
    return { docW: document.documentElement.scrollWidth, innerW: window.innerWidth, bad: bad.slice(0, 12) };
  });
  console.log(`${w}px: scrollWidth=${overflow.docW} (viewport ${overflow.innerW})${overflow.docW > overflow.innerW ? " <-- HORIZONTAL OVERFLOW" : ""}`);
  for (const b of overflow.bad) console.log(`  section[${b.section}] ${b.tag} width=${b.w} right=${b.right}`);

  const sections = await page.locator("main > section").count();
  for (let i = 0; i < sections; i++) {
    const sec = page.locator("main > section").nth(i);
    await sec.evaluate((el) => el.scrollIntoView({ block: "center" }));
    await page.waitForTimeout(120);
    try {
      await sec.screenshot({ path: `shots/sec${i}-${w}.png`, timeout: 5000 });
    } catch {
      // animating sections (marquee) fail stability checks — clip manually
      const r = await sec.evaluate((el) => {
        const b = el.getBoundingClientRect();
        return { x: 0, y: Math.max(0, b.y), width: Math.min(b.width, innerWidth), height: Math.min(b.height, innerHeight) };
      });
      await page.screenshot({ path: `shots/sec${i}-${w}.png`, clip: r });
    }
  }
  console.log(`${w}px: ${sections} sections captured`);
  await page.close();
}
await browser.close();
