import Image, { type StaticImageData } from "next/image";

export type VariableFeaturedImageCardGridItem = {
  image: StaticImageData;
  imageAlt?: string;
  title: string;
  description: string;
};

type VariableFeaturedImageCardGridProps = {
  caption: string;
  captionColor?: string;
  title: string;
  description: string;
  gridColumnCount?: 1 | 2 | 3 | 4;
  items: VariableFeaturedImageCardGridItem[];
};

const GRID_COLUMNS = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
} satisfies Record<
  NonNullable<VariableFeaturedImageCardGridProps["gridColumnCount"]>,
  string
>;

export default function VariableFeaturedImageCardGrid({
  caption,
  captionColor = "#218554",
  title,
  description,
  gridColumnCount = 2,
  items,
}: VariableFeaturedImageCardGridProps) {
  return (
    <section className="bg-white px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-8 lg:gap-10">
        {/* Header */}
        <div className="flex w-full max-w-[55rem] flex-col items-center gap-5 text-center">
          <div className="flex w-full flex-col items-center gap-2">
            <p
              data-animation="reveal"
              style={{ color: captionColor }}
              className="font-sans text-[0.75rem] font-semibold uppercase leading-[1.25] tracking-[0.045rem]"
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
            className="font-sans text-[1.0625rem] leading-[1.45] text-[#707075] lg:text-[1.125rem]"
          >
            {description}
          </p>
        </div>

        {/* Grid */}
        <div
          data-animation="reveal"
          data-reveal-stagger="90"
          className={`grid w-full max-w-[55rem] gap-4 rounded-[2rem] bg-[#f2f2f2] p-4 ${GRID_COLUMNS[gridColumnCount]
            }`}
        >
          {items.map((item) => (
            <article
              key={item.title}
              data-animation="reveal"
              className="flex flex-col overflow-hidden rounded-[1.5rem] bg-white p-2 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)]"
            >
              <div className="w-full overflow-hidden rounded-t-[0.5rem] rounded-b-[1.5rem] shadow-[0px_1.25rem_0.625rem_0px_rgba(0,0,0,0.15),0px_0.399rem_0.199rem_0px_rgba(0,0,0,0.12),0px_0.151rem_0.075rem_0px_rgba(0,0,0,0.11),0px_0.05rem_0.025rem_0px_rgba(0,0,0,0.1)]">
                <Image
                  src={item.image}
                  alt={item.imageAlt ?? item.title}
                  quality={90}
                  className="aspect-[400/260] h-auto w-full object-cover object-center"
                  sizes={
                    gridColumnCount === 4
                      ? "(min-width:1024px) 25vw, (min-width:768px) 50vw, 92vw"
                      : gridColumnCount === 3
                        ? "(min-width:1024px) 33vw, (min-width:768px) 50vw, 92vw"
                        : "(min-width:768px) 50vw, 92vw"
                  }
                />
              </div>

              <div className="flex flex-col gap-4 px-6 pb-8 pt-10 md:px-8">
                <h3 className="font-[family-name:var(--font-satoshi)] text-[1.5625rem] font-bold leading-[1.04] tracking-[-0.01875rem] text-[#16171b]">
                  {item.title}
                </h3>

                <p className="font-sans text-[0.9375rem] leading-[1.5] text-[#6b6c71]">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
