/* Size (rem) of a brand mark from its viewBox ratio. Wide wordmarks and squarish badges get
   the same optical weight: constant area, capped by a max width and a max height. */
export function logoSize(ratio: number, { area = 30, maxW = 8.5, maxH = 3.75, minH = 1.1 } = {}) {
  const r = ratio > 0 ? ratio : 3;
  let w = Math.sqrt(area * r);
  let h = w / r;
  if (w > maxW) {
    w = maxW;
    h = w / r;
  }
  if (h > maxH) {
    h = maxH;
    w = h * r;
  }
  if (h < minH) {
    h = minH;
    w = h * r;
  }
  return { w: Math.round(w * 100) / 100, h: Math.round(h * 100) / 100 };
}
