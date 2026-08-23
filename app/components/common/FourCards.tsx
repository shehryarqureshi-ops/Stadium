import Image, { type StaticImageData } from "next/image";

export type FourCardsItem = {
  image: StaticImageData | string;
  imageAlt?: string;
  isFeatured?: boolean;
  featuredLabel?: string;
  title: string;
  description: string;
};

type FourCardsProps = {
  caption: string;
  captionColor?: string;
  title: string;
  description: string;
  items: FourCardsItem[];
};

export default function FourCards({
  caption,
  captionColor = "#8d12e7",
  title,
  description,
  items,
}: FourCardsProps) {
  return (
    <section className="bg-white px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-8 lg:gap-10">
        <div className="flex w-full max-w-[55rem] flex-col items-center gap-5 text-center">
          <div className="flex w-full flex-col items-center gap-2">
            <p
              data-animation="reveal"
              style={{ color: captionColor }}
              className="font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem]"
            >
              {caption}
            </p>

            <h2
              data-animation="reveal"
              className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
            >
              {title}
            </h2>
          </div>

          <p
            data-animation="reveal"
            data-reveal-delay="120"
            className="font-sans text-[1.0625rem] leading-[1.48] text-[#6b6c71] lg:text-[1.125rem]"
          >
            {description}
          </p>
        </div>

        <div
          data-animation="reveal"
          data-reveal-stagger="90"
          className="grid w-full max-w-[55rem] grid-cols-1 gap-2.5 rounded-[1.5rem] bg-[#f2f2f2] p-2.5 md:grid-cols-2"
        >
          {items.map((item) => (
            <article
              key={item.title}
              data-animation="reveal"
              className="relative flex flex-col items-center gap-6 overflow-hidden rounded-[0.75rem] bg-white px-6 pb-10 pt-12 text-center shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)] md:px-8 md:pb-[2.8125rem] md:pt-[3.75rem]"
            >
              <div className="relative size-24 shrink-0 md:size-32">
                <Image
                  src={item.image}
                  alt={item.imageAlt ?? ""}
                  fill
                  sizes="128px"
                  className="select-none object-contain"
                />
              </div>

              <div className="flex w-full flex-col gap-3.5">
                <h3 className="font-[family-name:var(--font-satoshi-medium)] text-[1.375rem] leading-[1.04] tracking-[-0.01875rem] text-[#16171b] md:text-[1.5625rem]">
                  {item.title}
                </h3>

                <p className="font-sans text-[0.9375rem] leading-[1.5] text-[#6b6c71]">
                  {item.description}
                </p>
              </div>

              {item.isFeatured && (
                <span className="absolute right-6 top-6 inline-flex items-center justify-center rounded-[100px] bg-[#16171b] px-2 py-1 font-sans text-[0.6875rem] font-bold leading-[1.4] tracking-[0.025rem] text-white md:right-[1.875rem] md:top-[1.90625rem]">
                  {item.featuredLabel}
                </span>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}