// Extract the full structure of Shopify's "Products" dropdown from the DOM.
import { chromium } from "playwright-core";

const browser = await chromium.launch({ channel: "msedge" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("https://www.shopify.com/pk", { waitUntil: "domcontentloaded", timeout: 45000 });
await page.waitForTimeout(2500);

// find the trigger: any element whose own text is exactly "Products"
const triggerInfo = await page.evaluate(() => {
  const all = [...document.querySelectorAll("header *")];
  const t = all.find(
    (el) => el.children.length === 0 && el.textContent.trim() === "Products",
  );
  if (!t) return null;
  let cur = t;
  const chain = [];
  for (let i = 0; i < 5 && cur; i++) {
    chain.push(cur.tagName + (cur.getAttribute("aria-expanded") !== null ? "[aria-expanded]" : ""));
    cur = cur.parentElement;
  }
  return chain;
});
console.log("trigger ancestor chain:", JSON.stringify(triggerInfo));

// dump the structure of the panel containing "Website Builder"
const structure = await page.evaluate(() => {
  const link = [...document.querySelectorAll("header a")].find((a) => a.textContent.trim() === "Website Builder");
  if (!link) return "not found";
  // walk up to the panel root (large container)
  let panel = link;
  while (panel.parentElement && panel.parentElement.closest("header")) {
    panel = panel.parentElement;
    const links = panel.querySelectorAll("a").length;
    if (links > 15) break;
  }
  const serialize = (el, depth) => {
    if (depth > 6) return null;
    const out = [];
    for (const child of el.children) {
      const tag = child.tagName.toLowerCase();
      const text = child.children.length === 0 ? child.textContent.trim().replace(/\s+/g, " ") : null;
      if (["h2", "h3", "h4", "p", "span"].includes(tag) && text) {
        out.push(`${"  ".repeat(depth)}<${tag}> ${text.slice(0, 60)}`);
      } else if (tag === "a") {
        const t = child.textContent.trim().replace(/\s+/g, " ");
        out.push(`${"  ".repeat(depth)}<a> ${t.slice(0, 80)}`);
      } else {
        const inner = serialize(child, depth + 1);
        if (inner && inner.length) {
          out.push(`${"  ".repeat(depth)}<${tag} class="${(child.className?.baseVal ?? child.className ?? "").toString().slice(0, 50)}">`);
          out.push(...inner);
        }
      }
    }
    return out;
  };
  return serialize(panel, 0).join("\n");
});
console.log(structure);
await browser.close();
