// Scroll-through full-page screenshots so lazy-loaded images are in the capture.
// Usage: node scripts/screenshot.mjs <url> <outPrefix>
import { chromium } from "playwright-core";

const [url = "http://localhost:3100", prefix = "shots/page"] = process.argv.slice(2);
const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 375, height: 812 },
];

const browser = await chromium.launch({ channel: "msedge" });
for (const vp of viewports) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 80));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${prefix}-${vp.name}.png`, fullPage: true });
  console.log(`${vp.name} captured`);
  await page.close();
}
await browser.close();
