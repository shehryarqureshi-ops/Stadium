import { chromium } from "playwright-core";

const browser = await chromium.launch({ channel: "msedge" });
for (const vp of [
  { name: "mobile", width: 375, height: 812, figma: 460 },
  { name: "tablet", width: 768, height: 1024, figma: 480 },
  { name: "desktop", width: 1440, height: 900, figma: 640 },
]) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  const h = await page.evaluate(() => document.querySelector("main > section").getBoundingClientRect().height);
  console.log(`${vp.name}: rendered ${Math.round(h)}px vs Figma ${vp.figma}px (diff ${Math.round(h - vp.figma)})`);
  await page.close();
}
await browser.close();
