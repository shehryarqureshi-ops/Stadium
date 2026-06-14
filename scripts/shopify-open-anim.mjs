// Sample Shopify's Products-menu opening animation: what property animates,
// over how long, with what easing.
import { chromium } from "playwright-core";

const browser = await chromium.launch({ channel: "msedge" });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto("https://www.shopify.com/pk", { waitUntil: "domcontentloaded", timeout: 45000 });
await page.waitForTimeout(2500);

const pos = await page.evaluate(() => {
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n;
  while ((n = w.nextNode())) {
    if (n.textContent.trim() === "Products") {
      const r = n.parentElement.getBoundingClientRect();
      if (r.y < 80 && r.width > 0) return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
    }
  }
  return null;
});

// instrument: find the panel ancestor of "Website Builder" and record its
// box + styles every 40ms while hovering the trigger
await page.evaluate(() => {
  const a = [...document.querySelectorAll("header a")].find((e) => e.textContent.trim() === "Website Builder");
  let panel = a;
  while (panel.parentElement && panel.querySelectorAll("a").length < 20) panel = panel.parentElement;
  // also instrument the panel's ancestors up to header for the real animated element
  const chain = [];
  let cur = panel;
  for (let i = 0; i < 5 && cur && cur.tagName !== "HEADER"; i++) {
    chain.push(cur);
    cur = cur.parentElement;
  }
  window.__chain = chain;
  window.__samples = [];
  window.__rec = () => {
    const t = performance.now();
    const row = { t: Math.round(t) };
    window.__chain.forEach((el, i) => {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      row["el" + i] = {
        h: Math.round(r.height),
        top: Math.round(r.top),
        op: cs.opacity,
        tf: cs.transform === "none" ? "none" : cs.transform.slice(7, 30),
        clip: cs.clipPath !== "none" ? cs.clipPath.slice(0, 25) : undefined,
        ovf: cs.overflow,
      };
    });
    window.__samples.push(row);
  };
});

await page.mouse.move(pos.x, pos.y);
// sample for 800ms
for (let i = 0; i < 20; i++) {
  await page.evaluate(() => window.__rec());
  await page.waitForTimeout(40);
}
const samples = await page.evaluate(() => window.__samples);
// print only rows where something changed
let prev = "";
for (const s of samples) {
  const key = JSON.stringify(s).replace(/"t":\d+,?/, "");
  if (key !== prev) {
    console.log(JSON.stringify(s));
    prev = key;
  }
}
// also: transition declarations on the chain
const decl = await page.evaluate(() =>
  window.__chain.map((el) => {
    const cs = getComputedStyle(el);
    return { tag: el.tagName, cls: (el.className ?? "").toString().slice(0, 70), transition: cs.transitionProperty + " | " + cs.transitionDuration + " | " + cs.transitionTimingFunction };
  }),
);
console.log("TRANSITIONS:", JSON.stringify(decl, null, 1));
await browser.close();
