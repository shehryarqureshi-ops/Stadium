import { ReactNode } from "react";

type CTAButtonVariant = "primary" | "secondary" | "yellow" | "green";

type ClosingCTAProps = {
  caption?: string;
  title: ReactNode;
  description: string | ReactNode;

  ctaOneLabel?: string;
  ctaOneLink?: string;
  ctaOneVariant?: CTAButtonVariant;
  ctaOneColor?: string;

  ctaTwoLabel?: string;
  ctaTwoLink?: string;
  ctaTwoVariant?: CTAButtonVariant;

  backgroundColor?: string;

  desktopTopSpacing?: string;

  cardRounded?: boolean;
  cardBorder?: boolean;
  overflowHidden?: boolean;
};

const CTA_VARIANTS: Record<CTAButtonVariant, string> = {
  primary:
    "bg-[#2178f5] text-white hover:brightness-110 focus-visible:outline-white",
  secondary:
    "border border-[#4d4d5c] bg-[#292933] text-white hover:bg-[#33333f] focus-visible:outline-white",
  yellow: "bg-[#FFB800] text-black focus-visible:outline-white",
  green: "bg-[#10995A] text-white focus-visible:outline-white",
};

export default function ClosingCTA({
  caption,
  title,
  description,

  ctaOneLabel,
  ctaOneLink = "#",
  ctaOneVariant = "primary",
  ctaOneColor,

  ctaTwoLabel,
  ctaTwoLink = "#",
  ctaTwoVariant = "secondary",

  backgroundColor = "#2e6ae8",
}: ClosingCTAProps) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: backgroundColor,
      }}
    >
      <div className="relative">
        <div className="px-section-x-sm pt-14 md:px-section-x-md md:pt-24 lg:px-section-x-lg lg:pt-40">
          <div className="mx-auto w-full max-w-content">
            <div
              className="flex flex-col items-center gap-5 rounded-t-4xl px-6 py-16 text-center md:py-24 lg:px-[3.75rem] lg:py-[8.75rem]"
              style={{
                background: "linear-gradient(0deg, #16171b 0%, #000000 100%)",
              }}
            >
              {caption && (
                <p
                  data-animation="reveal"
                  className="font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem] text-white/60"
                >
                  {caption}
                </p>
              )}

              <h2
                data-animation="reveal"
                className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-white md:text-[2.25rem] lg:text-[2.75rem]"
              >
                {title}
              </h2>

              <p
                data-animation="reveal"
                data-reveal-delay="80"
                className="mt-3 max-w-[44rem] font-sans text-[1.125rem] leading-[1.48] text-[#a8a8b8]"
              >
                {description}
              </p>

              {(ctaOneLabel || ctaTwoLabel) && (
                <div
                  data-animation="reveal"
                  data-reveal-delay="160"
                  className="flex flex-col gap-3.5 pt-3 sm:flex-row sm:items-center"
                >
                  {ctaOneLabel && (
                    <a
                      href={ctaOneLink}
                      style={
                        ctaOneColor
                          ? { backgroundColor: ctaOneColor }
                          : undefined
                      }
                      className={`inline-flex h-button-h items-center justify-center rounded-button px-button-x font-sans text-button-primary uppercase transition-all duration-200 active:scale-[0.98] focus-visible:outline-white ${
                        ctaOneColor ? "" : CTA_VARIANTS[ctaOneVariant]
                      }`}
                    >
                      {ctaOneLabel}
                    </a>
                  )}

                  {ctaTwoLabel && (
                    <a
                      href={ctaTwoLink}
                      className={`inline-flex h-button-h items-center justify-center rounded-button px-button-x font-sans text-button-primary uppercase transition-all duration-200 active:scale-[0.98] focus-visible:outline-white ${CTA_VARIANTS[ctaTwoVariant]}`}
                    >
                      {ctaTwoLabel}
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          aria-hidden
          className="mx-auto h-[2px] w-[80.5%] max-w-[72.5rem]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #171717 0%, #959595 50%, #171717 100%)",
          }}
        />
      </div>
    </section>
  );
}
