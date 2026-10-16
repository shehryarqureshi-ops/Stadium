import type { CSSProperties } from "react";

/* Circular country flag — mirrors the "Circle flag" component set on the Figma
   "Circle flags" page (n9SjmDjzB1PeZAYJ5w43fr, set 5795:7082). Artwork is the
   MIT-licensed circle-flags SVG set in public/flags/{code}.svg (ISO 3166-1
   alpha-2, lowercase); to add a flag drop the SVG in that folder and add the
   code to FLAG_CODES.

   Customise per use with props, or site-wide through the same variables the
   Figma file binds (Circle flag collection):
     --circle-flag-border-width   (default 0.09375rem = 1.5px)
     --circle-flag-border-color   (default #fff)
     --circle-flag-shadow         (default none; `shadow` prop applies the soft drop) */

export const FLAG_CODES = [
  "ae", "au", "br", "ca", "de", "fr", "gb", "in", "it", "jp", "mx", "nl", "se", "sg", "us",
] as const;
export type FlagCode = (typeof FLAG_CODES)[number];

const SOFT_SHADOW = "0 0.125rem 0.375rem rgba(0, 0, 0, 0.18)";

type CircleFlagProps = {
  code: FlagCode;
  /** Any CSS length — default 1.25rem (the 20px size used in the Figma design) */
  size?: string;
  /** Show the border (Figma "Border" property). Default true. */
  border?: boolean;
  /** Border width as a CSS length; falls back to --circle-flag-border-width */
  borderWidth?: string;
  /** Border colour; falls back to --circle-flag-border-color */
  borderColor?: string;
  /** Soft drop shadow (Figma "Shadow" property). Pass a string for a custom shadow. */
  shadow?: boolean | string;
  /** Accessible name; flags are decorative by default */
  label?: string;
  className?: string;
};

export default function CircleFlag({
  code,
  size = "1.25rem",
  border = true,
  borderWidth,
  borderColor,
  shadow = false,
  label,
  className = "",
}: CircleFlagProps) {
  const style: CSSProperties = {
    width: size,
    height: size,
    boxShadow: shadow ? (typeof shadow === "string" ? shadow : SOFT_SHADOW) : "var(--circle-flag-shadow, none)",
    ...(border
      ? {
          borderStyle: "solid",
          borderWidth: borderWidth ?? "var(--circle-flag-border-width, 0.09375rem)",
          borderColor: borderColor ?? "var(--circle-flag-border-color, #fff)",
        }
      : {}),
  };
  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`relative inline-block shrink-0 overflow-hidden rounded-full bg-white ${className}`}
      style={style}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/flags/${code}.svg`} alt="" className="absolute inset-0 size-full" draggable={false} />
    </span>
  );
}
