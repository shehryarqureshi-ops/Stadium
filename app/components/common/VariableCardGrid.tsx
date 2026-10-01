import Image, { type StaticImageData } from "next/image";
import { ReactNode } from "react";

import PillLink from "./PillLink";

export type VariableCardGridItem = {
  /* omit for a grey placeholder slot (Figma placeholder cards) */
  image?: StaticImageData;
  imageAlt?: string;
  /* omit for text-only cards (e.g. /impact/hr problem cards) — the
     description then renders at the larger 18px problem-card size */
  title?: string;
  description: string;
  /* small label above the title (e.g. /the-proof customer results "EVERFLOW") */
  eyebrow?: string;
  /* underlined text link under the description (e.g. /integrations "Learn more") */
  link?: { label: string; href: string };
};

type VariableCardGridProps = {
  caption?: string;
  captionColor?: string;
  /* omit caption/title/description for a header-less tray */
  title?: ReactNode;
  description?: string;
  gridColumns?: 1 | 2 | 3 | 4;
  items: VariableCardGridItem[];
  /* "photo" (default): image flush in the card. "panel": the /impact product
     mockups — the image sits on a lifted panel (rounded-t 8 / b 24, layered
     drop shadow, Figma 3998:9319). */
  imageStyle?: "photo" | "panel";
  /* optional line under the tray (Figma problem sections) */
  footnote?: string;
  /* "white" (default) or "transparent" for sections on a page gradient */
  background?: "white" | "transparent";
  /* cap the tray at 880 (Figma 2×2 grids, e.g. /impact 3998:15486) */
  narrow?: boolean;
  /* false: text-only cards with no image slot at all (e.g. /integrations
     "Build the connections" 4293:31906, /integrations/security subprocessors) */
  media?: boolean;
  /* dark pill under the tray (e.g. /wallets-and-budgets "Explore workspaces") */
  cta?: { label: string; href: string };
  /* drop the section padding/background — for a tray nested inside another
     section (e.g. LogoBridge children on /roles-and-permissions) */
  bare?: boolean;
};

const GRID_COLUMNS = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
} satisfies Record<NonNullable<VariableCardGridProps["gridColumns"]>, string>;

const PANEL_SHADOW =
  "shadow-[0px_20px_10px_0px_rgba(0,0,0,0.15),0px_6.383px_3.191px_0px_rgba(0,0,0,0.12),0px_2.415px_1.207px_0px_rgba(0,0,0,0.11),0px_0.796px_0.398px_0px_rgba(0,0,0,0.1)]";

export default function VariableCardGrid({
  caption,
  captionColor = "#10995a",
  title,
  description,
  gridColumns = 3,
  items,
  imageStyle = "photo",
  footnote,
  background = "white",
  narrow = false,
  media = true,
  cta,
  bare = false,
}: VariableCardGridProps) {
  const sizes =
    gridColumns === 4
      ? "(min-width:1024px) 25vw, (min-width:640px) 50vw, 92vw"
      : gridColumns === 3
        ? "(min-width:1024px) 33vw, (min-width:640px) 50vw, 92vw"
        : "(min-width:640px) 50vw, 92vw";

  return (
    <section
      className={
        bare
          ? "w-full"
          : `px-section-x-sm md:px-section-x-md lg:px-section-x-lg ${
              background === "white" ? "bg-white" : ""
            }`
      }
    >
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-10">
        {/* Header */}
        {(caption || title || description) && (
        <div className="flex w-full max-w-[55rem] flex-col items-center gap-5 text-center">
          <div className="flex flex-col items-center gap-2">
            {caption && (
              <p
                data-animation="reveal"
                style={{ color: captionColor }}
                className="font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem]"
              >
                {caption}
              </p>
            )}

            {title && (
              <h2
                data-animation="reveal"
                className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
              >
                {title}
              </h2>
            )}
          </div>

          {description && (
            <p
              data-animation="reveal"
              className="max-w-[55rem] font-sans text-[1.125rem] leading-[1.48] text-[#6b6c71]"
            >
              {description}
            </p>
          )}
        </div>
        )}

        {/* Grid tray */}
        <div
          data-animation="reveal"
          data-reveal-stagger="80"
          className={`w-full rounded-[2rem] bg-[#f2f2f2] p-4 ${narrow ? "max-w-[55rem]" : ""}`}
        >
          <ul role="list" className={`grid gap-4 ${GRID_COLUMNS[gridColumns]}`}>
            {items.map((item, i) => (
              <li
                key={item.title ?? `${item.description}-${i}`}
                data-animation="reveal"
                className="flex flex-col overflow-hidden rounded-[1.5rem] bg-white p-2 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)]"
              >
                {!media ? null : item.image ? (
                  <div
                    className={
                      imageStyle === "panel"
                        ? `overflow-hidden rounded-t-lg rounded-b-3xl ${PANEL_SHADOW}`
                        : "overflow-hidden rounded-[1.25rem]"
                    }
                  >
                    <Image
                      src={item.image}
                      alt={item.imageAlt ?? item.title ?? ""}
                      quality={100}
                      className="w-full"
                      sizes={sizes}
                    />
                  </div>
                ) : (
                  <div aria-hidden className="h-[15.625rem] rounded-[1.25rem] bg-[#f2f2f2]" />
                )}

                <div className={`flex flex-col gap-4 px-8 pb-8 ${!media ? "pt-8" : imageStyle === "panel" ? "pt-10" : "pt-8"}`}>
                  {item.eyebrow && (
                    <p className="font-sans text-eyebrow-sm uppercase leading-4 text-pricing-ink">
                      {item.eyebrow}
                    </p>
                  )}
                  {item.title && (
                    <h3 className="font-[family-name:var(--font-satoshi)] text-[1.5625rem] font-bold leading-[1.04] tracking-[-0.01875rem] text-[#16171b]">
                      {item.title}
                    </h3>
                  )}

                  <p
                    className={`font-sans leading-[1.5] text-[#6b6c71] ${
                      item.title ? "text-[0.9375rem]" : "text-[1.0625rem] lg:text-[1.125rem]"
                    }`}
                  >
                    {item.description}
                  </p>

                  {item.link && (
                    <a
                      href={item.link.href}
                      className="w-fit font-sans text-button-primary uppercase text-pricing-ink underline underline-offset-4 transition-opacity hover:opacity-70"
                    >
                      {item.link.label}
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {cta && (
          <div data-animation="reveal">
            <PillLink {...cta} />
          </div>
        )}

        {footnote && (
          <p
            data-animation="reveal"
            className="max-w-[55rem] text-center font-sans text-[1.0625rem] leading-[1.48] text-[#6b6c71] lg:text-[1.125rem]"
          >
            {footnote}
          </p>
        )}
      </div>
    </section>
  );
}
