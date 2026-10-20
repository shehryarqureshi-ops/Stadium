/* Pre-sized static thumbnail of a /catalog-page photo (see scripts/gen-catalog-thumbs.mjs):
   "s" = 160 px (hero wall), "m" = 400 px (mosaic tiles). */
export const thumb = (src: string, size: "s" | "m") =>
  src.replace("/catalog-page/", "/catalog-page/thumbs/").replace(/\.(jpe?g|png)$/i, `-${size}.webp`);
