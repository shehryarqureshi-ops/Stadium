const sharp = require("sharp");
(async () => {
  const f = ".figma-tmp/ch-ref.png";
  const { data, info } = await sharp(f).raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height, ch = info.channels;
  const col = Math.floor(W / 2);
  const lum = (y) => { const i = (y * W + col) * ch; return Math.round((data[i] + data[i + 1] + data[i + 2]) / 3); };
  const cls = (v) => (v < 50 ? "dark" : v > 205 ? "light" : "mid");
  let prev = -1, runStart = 0; const bands = [];
  for (let y = 0; y < H; y++) { const c = cls(lum(y)); if (c !== prev) { if (prev !== -1) bands.push({ cls: prev, from: runStart, to: y, h: y - runStart }); prev = c; runStart = y; } }
  bands.push({ cls: prev, from: runStart, to: H, h: H - runStart });
  console.log("source H=" + H);
  console.log(JSON.stringify(bands.filter(b => b.h > 80), null, 0));
})();
