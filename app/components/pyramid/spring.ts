/* Tiny semi-implicit damped spring. ζ = c / (2·√k): ζ < 1 overshoots a little
   and settles (the "liquid" feel); ζ ≈ 1 is critically damped. */
export class Spring {
  x: number;
  v = 0;
  constructor(
    value: number,
    public k = 90,
    public c = 14,
  ) {
    this.x = value;
  }
  step(target: number, dt: number) {
    // sub-step so a long frame (tab refocus) can't blow the integration up
    const n = Math.max(1, Math.ceil(dt / (1 / 120)));
    const h = dt / n;
    for (let i = 0; i < n; i++) {
      this.v += (this.k * (target - this.x) - this.c * this.v) * h;
      this.x += this.v * h;
    }
    return this.x;
  }
  snap(value: number) {
    this.x = value;
    this.v = 0;
  }
}
