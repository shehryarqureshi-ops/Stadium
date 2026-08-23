import Image, { type StaticImageData } from "next/image";

export type SixCardsItem = {
  image: StaticImageData | string;
  imageAlt?: string;
  title: string;
  description: string;
};

type SixCardsProps = {
  caption: string;
  captionColor?: string;
  title: string;
  description: string;
  items: SixCardsItem[];
};

export default function SixCards({
  caption,
  captionColor = '#8d12e7',
  title,
  description,
  items,
}: SixCardsProps) {
  return (
    <section className="bg-white px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-10">
        <div className="flex w-full max-w-[55rem] flex-col items-center gap-5 text-center">
          <div className="flex flex-col items-center gap-2">
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
          data-reveal-stagger="80"
          className="w-full rounded-[1.5rem] bg-[#f2f2f2] p-2.5"
        >
          <ul
            className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3"
            role="list"
          >
            {items.map((item) => (
              <li
                key={item.title}
                data-animation="reveal"
                className="flex flex-col items-center gap-6 overflow-hidden rounded-[0.75rem] bg-white px-8 pb-[2.8125rem] pt-[3.75rem] text-center shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)]"
              >
                <div className="relative size-32 shrink-0">
                  <Image
                    src={item.image}
                    alt={item.imageAlt ?? ""}
                    fill
                    sizes="128px"
                    className="object-contain"
                  />
                </div>

                <div className="flex w-full flex-col gap-5">
                  <h3 className="font-[family-name:var(--font-satoshi)] text-[1.5625rem] font-bold leading-[1.04] tracking-[-0.01875rem] text-[#16171b]">
                    {item.title}
                  </h3>

                  <p className="font-sans text-[0.90625rem] leading-[1.48] text-[#6b6975]">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}