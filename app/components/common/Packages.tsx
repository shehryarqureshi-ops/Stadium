type PackageItem = {
  title: string;
  description: string;
  isFeatured?: boolean;
  featuredLabel?: string;
  featuredColor?: string;
};

type PackagesProps = {
  caption: string;
  captionColor?: string;
  title: string;
  description: string;
  showCta?: boolean;
  ctaLabel?: string;
  ctaLink?: string;
  items: PackageItem[];
};

const CARD_SHADOW =
  "shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)]";

const CARD_SHADOW_ACTIVE =
  "shadow-[0px_20px_20px_-2px_rgba(0,0,0,0.15),0px_6.383px_6.383px_-1.5px_rgba(0,0,0,0.12),0px_2.415px_2.415px_-1px_rgba(0,0,0,0.11),0px_0.796px_0.796px_-0.5px_rgba(0,0,0,0.1)]";

export default function Packages({
  caption,
  captionColor = "#6b33db",
  title,
  description,
  showCta = true,
  ctaLabel = "See full pricing",
  ctaLink = "#",
  items,
}: PackagesProps) {
  return (
    <section className="bg-white px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
      <div className="mx-auto w-full max-w-content">
        <div className="flex flex-col gap-10 xl:flex-row xl:items-stretch xl:gap-10 xl:px-20">
          <div className="flex flex-col gap-8 xl:w-[25.3125rem] xl:shrink-0 xl:justify-between xl:gap-0">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <p
                  data-animation="reveal"
                  style={{ color: captionColor }}
                  className="font-sans text-[0.75rem] font-semibold uppercase leading-[1.25] tracking-[0.045rem]"
                >
                  {caption}
                </p>

                <h2
                  data-animation="reveal"
                  className="whitespace-pre-line font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
                >
                  {title}
                </h2>
              </div>

              <p
                data-animation="reveal"
                className="max-w-[24.9375rem] font-sans text-[1.0625rem] leading-[1.45] text-[#707075] lg:text-[1.125rem]"
              >
                {description}
              </p>
            </div>

            {showCta && (
              <a
                href={ctaLink}
                data-animation="reveal"
                className="inline-flex h-button-h w-fit items-center justify-center rounded-[100px] bg-black px-[1.375rem] font-sans text-button-primary uppercase text-white transition-all duration-200 hover:bg-[#2a2a2a] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                  {ctaLabel}
                </span>
              </a>
            )}
          </div>

          <ul
            data-animation="reveal"
            data-reveal-stagger="90"
            className="grid min-w-0 flex-1 grid-cols-1 gap-4 rounded-[2rem] bg-[#f2f2f2] p-4 sm:grid-cols-2"
          >
            {items.map((item, index) => (
              <li
                key={item.title}
                data-animation="reveal"
                className={`relative flex flex-col gap-10 rounded-[1.5rem] bg-white p-6 justify-between ${item.isFeatured ? CARD_SHADOW_ACTIVE : CARD_SHADOW
                  }`}
              >
                <p className="font-sans text-[1rem] leading-[1.25] tracking-[0.025rem] text-[#828282]">
                  {String(index + 1).padStart(2, "0")}
                </p>

                <div className="flex flex-col gap-3.5">
                  <h3 className="font-[family-name:var(--font-satoshi)] text-[1.5625rem] font-bold leading-[1.04] tracking-[-0.01875rem] text-[#16171b]">
                    {item.title}
                  </h3>

                  <p className="font-sans text-[0.9375rem] leading-[1.5] text-[#6b6c71]">
                    {item.description}
                  </p>
                </div>

                {item.isFeatured && (
                  <span
                    style={{
                      backgroundColor: item.featuredColor ?? "#6b33db",
                    }}
                    className="absolute right-[1.21875rem] top-5 rounded-[100px] px-3 pb-[0.1875rem] pt-1 font-sans text-[0.75rem] font-bold leading-[1.4] tracking-[0.025rem] text-white"
                  >
                    {item.featuredLabel}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}