/* Figma px → cqw of the 265px-wide step graphic, so a coded card scales with its
   container exactly like the SVG step cards (StepLimits). */
export const cq = (px: number) => `${+(px / 2.65).toFixed(3)}cqw`;

export const type = (size: number, lh: number, weight: number, color: string) => ({
  fontSize: cq(size),
  lineHeight: cq(lh),
  fontWeight: weight,
  color,
});
