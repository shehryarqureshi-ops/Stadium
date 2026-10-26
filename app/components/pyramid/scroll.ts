/* Shared scroll model for the infra pyramid section.

   The section pins for PIN_UNITS viewport-heights of scroll. `u` is the scroll
   position inside the pin in viewport-height units (u = 0 at the pin start).
   The journey makes 4 resting stops — intro + one per layer — and each stop
   has a HOLD zone (±HOLD) where nothing moves, so the state is stable and the
   snap can land anywhere inside it. Between stops there is a 1.0u transition.

     stop 0 intro    u = 0
     stop 1 Physical u = 1.5   (bottom layer)
     stop 2 Digital  u = 3.0   (middle layer)
     stop 3 People   u = 4.5   (top layer)                                    */

export const STOPS = [0, 1.5, 3.0, 4.5] as const;
export const HOLD = 0.25;
export const PIN_UNITS = 4.9;

export const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
export const easeIn = (t: number) => t * t * t;

/** Mutable bridge between the DOM scroll engine and the WebGL loop. Written by
 *  InfraPyramid's ticker, read inside the R3F frame loop — no React re-renders. */
export const pyramidStore = {
  u: 0,
  /** hovered slice (0 bottom … 2 top) on the intro, -1 = none */
  hover: -1,
  /** set once a slice is clicked — hover/click stay off until the reader is back at the intro */
  locked: false,
  /** cursor (px, relative to the stage) while over a slice */
  pointer: { x: 0, y: 0 },
  /** screen-space centre of each slice (px, relative to the stage) */
  anchors: [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ],
  onHover: undefined as ((i: number) => void) | undefined,
  onSelect: undefined as ((i: number) => void) | undefined,
};

/** Continuous stop index 0..3 (eased across each transition, flat in holds). */
export function progressIndex(u: number): number {
  for (let k = 0; k < 3; k++) {
    const a = STOPS[k] + HOLD;
    const b = STOPS[k + 1] - HOLD;
    if (u < a) return k;
    if (u < b) return k + easeInOut((u - a) / (b - a));
  }
  return 3;
}

/** Where panel `k` sits: -1 = below (entering) … 0 = in place … +1 = gone above.
 *  The DOM springs follow this, so the little overshoot after arrival is the
 *  panel settling, not the scroll. */
export function panelTarget(k: number, u: number): number {
  const c = STOPS[k];
  if (u < c) {
    if (k === 0) return 0;
    const start = c - 0.7;
    const end = c - HOLD;
    return -(1 - easeOut(clamp01((u - start) / (end - start))));
  }
  if (k === 3) return 0;
  const start = c + HOLD;
  const end = c + 0.7;
  return easeIn(clamp01((u - start) / (end - start)));
}
