import Image, { type StaticImageData } from "next/image";
import { ReactNode } from "react";

export type VariableCardGridItem = {
  image: StaticImageData;
  imageAlt?: string;
  title: string;
  description: string;
};

type VariableCardGridProps = {
  caption: string;
  captionColor?: string;
  title: ReactNode;
  description: string;
  gridColumns?: 1 | 2 | 3 | 4;
  items: VariableCardGridItem[];
};

const GRID_COLUMNS = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
} satisfies Record<NonNullable<VariableCardGridProps["gridColumns"]>, string>;

export default function VariableCardGrid({
  caption,
  captionColor = "#10995a",
  title,
  description,
  gridColumns = 3,
  items,
}: VariableCardGridProps) {
  return (
    <section className="bg-white px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-10">
        {/* Header */}
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
            className="max-w-[55rem] font-sans text-[1.125rem] leading-[1.48] text-[#6b6c71]"
          >
            {description}
          </p>
        </div>

        {/* Grid tray */}
        <div
          data-animation="reveal"
          data-reveal-stagger="80"
          className="w-full rounded-[2rem] bg-[#f2f2f2] p-4"
        >
          <ul role="list" className={`grid gap-4 ${GRID_COLUMNS[gridColumns]}`}>
            {items.map((item) => (
              <li
                key={item.title}
                data-animation="reveal"
                className="flex flex-col overflow-hidden rounded-[1.5rem] bg-white p-2 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)]"
              >
                <div className="overflow-hidden rounded-[1.25rem]">
                  <Image
                    src={item.image}
                    alt={item.imageAlt ?? item.title}
                    quality={100}
                    className="w-full"
                    sizes={
                      gridColumns === 4
                        ? "(min-width:1024px) 25vw, (min-width:640px) 50vw, 92vw"
                        : gridColumns === 3
                          ? "(min-width:1024px) 33vw, (min-width:640px) 50vw, 92vw"
                          : "(min-width:640px) 50vw, 92vw"
                    }
                  />
                </div>

                <div className="flex flex-col gap-4 p-8">
                  <h3 className="font-[family-name:var(--font-satoshi)] text-[1.5625rem] font-bold leading-[1.04] tracking-[-0.01875rem] text-[#16171b]">
                    {item.title}
                  </h3>

                  <p className="font-sans text-[0.9375rem] leading-[1.5] text-[#6b6c71]">
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
