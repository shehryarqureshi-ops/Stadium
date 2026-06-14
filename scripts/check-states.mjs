// Click through the EveryWay headline states and screenshot each.
import { chromium } from "playwright-core";

const browser = await chromium.launch({ channel: "msedge" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

const section = page.locator("section", { has: page.getByRole("button", { name: "However you want." }) });
await section.scrollIntoViewIfNeeded();

for (const [i, sentence] of [
  "Every way you show up.",
  "However you want.",
  "For everyone you care about.",
  "Whenever it matters.",
].entries()) {
  await page.getByRole("button", { name: sentence }).click();
  await page.waitForTimeout(400);
  await section.screenshot({ path: `shots/state-${i}.png` });
  console.log(`state ${i} (${sentence}) captured`);
}
await browser.close();
