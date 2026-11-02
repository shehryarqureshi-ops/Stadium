import type { ReactNode } from "react";

/* White→accent→dark band that closes a page's content: a white box sitting 40px in
   from each side (16px on mobile) with a rounded bottom, floating on a vertical
   gradient that ends in the closing band's #181818 (Figma Design QA 5867:8307).
   Children supply their own max-w-content container — pass `flush` to the section
   components (Testimonials, Resources, StatsGrid) so this box owns the gutters.
   `via` = the page's accent colour (the gradient's midpoint). `ground` = the colour the band
   starts from and the box is filled with — white by default; pass the page ground
   (e.g. /pricing's #eff0f2) when the band follows a non-white section. */
export default function GradientBand({
  via = "#2178F5",
  ground = "#ffffff",
  children,
}: {
  via?: string;
  ground?: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{ "--band-via": via, "--band-ground": ground } as React.CSSProperties}
      className="bg-linear-to-b from-(--band-ground) via-(--band-via) to-[#181818] px-4 pb-16 md:px-10"
    >
      <div className="rounded-b-4xl bg-(--band-ground) px-section-x-sm pb-16 md:px-section-x-md md:pb-24 lg:px-[3.75rem] lg:pb-[11.25rem]">
        {children}
      </div>
    </div>
  );
}
