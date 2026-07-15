const sharp = require("sharp");
(async () => {
  const SRC = ".figma-tmp/ch-ref.png";   // 1440x7682
  const BLD = ".figma-tmp/ch-r4.png";    // 1440x6327
  const pairs = [
    ["1-hero", 0, 870, 0, 887],
    ["2-marketplaces-delivery", 870, 1634, 887, 1040],
    ["3-social", 2504, 1124, 1927, 1090],
    ["4-search-integrations", 3628, 1018, 3017, 542],
    ["5-testimonial", 4646, 291, 3559, 496],
    ["6-channelopts-more", 4937, 923, 4055, 836],
    ["7-strategy", 5860, 819, 4891, 512],
    ["8-cta-footer", 6679, 1003, 5403, 924],
  ];
  const Wd = 470, gap = 24;
  for (const [name, st, sh, bt, bh] of pairs) {
    const s = await sharp(SRC).extract({ left: 0, top: st, width: 1440, height: sh }).resize(Wd).png().toBuffer();
    const b = await sharp(BLD).extract({ left: 0, top: bt, width: 1440, height: bh }).resize(Wd).png().toBuffer();
    const sM = await sharp(s).metadata(), bM = await sharp(b).metadata();
    const H = Math.max(sM.height, bM.height);
    await sharp({ create: { width: Wd * 2 + gap, height: H, channels: 3, background: "#888888" } })
      .composite([{ input: s, left: 0, top: 0 }, { input: b, left: Wd + gap, top: 0 }])
      .png().toFile(`.figma-tmp/sbs-${name}.png`);
  }
  console.log("done 8 side-by-sides");
})();
