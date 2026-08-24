import Image, { type StaticImageData } from "next/image";

export type ProblemSectionItem = {
  image: StaticImageData;
  imageAlt?: string;
  title: string;
  description: string;
};

type ProblemSectionProps = {
  caption: string;
  captionColor?: string;
  title: string;
  description: string;
  items: ProblemSectionItem[];
  showDivider?: boolean;
};

export default function ProblemSection({
  caption,
  captionColor = "#2178f5",
  title,
  description,
  items,
  showDivider = false,
}: ProblemSectionProps) {
  return (
    <section className="relative z-10">
      <div className="overflow-hidden max-w-content mx-auto">
        <div className="flex w-full flex-col items-center">
          <div className="flex w-full flex-col items-center rounded-[1rem] bg-white">
            {/* Header */}
            <div className="flex w-full max-w-[53.75rem] px-4 flex-col items-center gap-5 text-center">
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

            {/* Cards */}
            <div
              data-animation="reveal"
              data-reveal-stagger="90"
              className="mt-8 grid w-full grid-cols-1 gap-4 rounded-[2rem] bg-[#f2f2f2] p-4 md:grid-cols-3 lg:mt-10"
            >
              {items.map((item) => (
                <article
                  key={item.title}
                  data-animation="reveal"
                  className="flex flex-col overflow-hidden rounded-[1.5rem] bg-white p-2 shadow-[0px_3px_3px_0px_rgba(0,0,0,0.06)]"
                >
                  <div className="relative overflow-hidden rounded-[1.25rem]">
                    <Image
                      src={item.image}
                      alt={item.imageAlt ?? item.title}
                      quality={90}
                      className="aspect-[376/250] w-full object-cover lg:aspect-auto lg:h-[15.625rem]"
                      sizes="(min-width:1024px) 24rem, (min-width:768px) 31vw, 92vw"
                    />
                  </div>

                  <div className="flex flex-col gap-4 px-8 pb-8 pt-[2.625rem] lg:px-6">
                    <h3 className="whitespace-pre-line font-[family-name:var(--font-satoshi)] text-[1.6875rem] font-bold leading-[1.875rem] tracking-[-0.01875rem] text-[#16171b]">
                      {item.title}
                    </h3>

                    <p className="font-sans text-[1rem] leading-[1.5] text-[#6b6c71]">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {showDivider && (
            <div
              data-animation="reveal"
              className="mt-16 h-1 w-full rounded-full bg-[#f2f2f2] md:mt-20 lg:mt-40"
            />
          )}
        </div>
      </div>
    </section>
  );
}
