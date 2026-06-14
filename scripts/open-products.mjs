import { chromium } from "playwright-core";

const browser = await chromium.launch({ channel: "msedge" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("https://www.shopify.com/pk", { waitUntil: "domcontentloaded", timeout: 45000 });
await page.waitForTimeout(2500);

const pos = await page.evaluate(() => {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    if (node.textContent.trim() === "Products") {
      const el = node.parentElement;
      const r = el.getBoundingClientRect();
      if (r.y < 80 && r.width > 0) return { x: r.x + r.width / 2, y: r.y + r.height / 2, tag: el.tagName, cls: (el.className || "").toString().slice(0, 60) };
    }
  }
  return null;
});
console.log("trigger:", JSON.stringify(pos));
if (pos) {
  await page.mouse.move(pos.x, pos.y);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "shots/shopify-products-open.png", clip: { x: 0, y: 0, width: 1440, height: 720 } });
  console.log("screenshot saved");
}
await browser.close();
