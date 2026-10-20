/* Pre-sized static thumbnail of a /catalog-page photo (see scripts/gen-catalog-thumbs.mjs):
   "s" = 160 px (hero wall), "m" = 400 px (mosaic tiles), "l" = 1200 px (modal photo). */
export const thumb = (src: string, size: "s" | "m" | "l") =>
  src.replace("/catalog-page/", "/catalog-page/thumbs/").replace(/\.(jpe?g|png)$/i, `-${size}.webp`);
