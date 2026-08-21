import Image, { type StaticImageData } from "next/image";

export type ProblemSectionItem = {
  image: StaticImageData;
  title: string;
  description: string;
};

type ProblemSectionProps = {
  caption: string;
  captionColor?: string;
  title: string;
  description: string;
  items: ProblemSectionItem[];
};

export default function ProblemSection({
  caption,
  captionColor = "#2178f5",
  title,
  description,
  items,
}: ProblemSectionProps) {
  return (
    <section className="relative z-10 bg-[#0437a5]">
      <div
        className="rounded-t-[1.5rem] md:rounded-t-[2rem] lg:rounded-t-[2.5rem]"
        style={{
          backgroundImage:
            "linear-gradient(180deg, #2f63d0 0%, #9bc3f5 42%, #ffffff 82%)",
        }}
      >
        {/* Logo wall */}
        <div
          data-animation="reveal"
          className="px-section-x-sm py-10 md:px-section-x-md lg:py-[3.75rem]"
        >
          <div className="mx-auto w-full max-w-content">
            <div className="relative h-10 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]">
              <div className="flex h-full w-max animate-[swag-marquee_40s_linear_infinite] motion-reduce:animate-none">
                {[0, 1].map((group) => (
                  <ul
                    key={group}
                    aria-hidden={group === 1}
                    className="flex h-full shrink-0 list-none items-center gap-x-10 pr-10 md:gap-x-14 md:pr-14"
                  >
                    {LOGOS.map((logo, index) => (
                      <li
                        key={`${logo.alt}-${index}`}
                        className="flex shrink-0 items-center"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={logo.src}
                          alt={group === 0 ? logo.alt : ""}
                          width={logo.w}
                          height={logo.h}
                          style={{ height: `${logo.h / 16}rem` }}
                          className="w-auto max-w-none select-none opacity-90 brightness-0 invert"
                        />
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:pb-20">
          <div className="flex w-full flex-col items-center">
            <div className="flex w-full flex-col items-center rounded-[1rem] bg-white px-6 pt-16 md:px-12 md:pt-20 lg:px-20 lg:pt-[10rem]">
              <div className="w-full max-w-content">
                {/* Header */}
                <div className="flex flex-col items-center gap-5 text-center">
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
                    className="font-sans text-[1.0625rem] leading-[1.48] text-[#6b6c71] lg:text-[1.125rem]"
                  >
                    {description}
                  </p>
                </div>

                {/* Items */}
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
                      <div className="overflow-hidden rounded-[1.25rem]">
                        <Image
                          src={item.image}
                          alt={item.title}
                          quality={90}
                          className="aspect-[376/250] w-full object-cover lg:aspect-auto lg:h-[15.625rem]"
                          sizes="(min-width:1024px) 24rem, (min-width:768px) 31vw, 92vw"
                        />
                      </div>

                      <div className="flex flex-col gap-4 px-8 pb-8 pt-[2.625rem] lg:px-6">
                        <h3 className="font-[family-name:var(--font-satoshi)] text-[1.6875rem] font-bold leading-[1.875rem] tracking-[-0.01875rem] text-[#16171b]">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const LOGOS = [
  { src: "/trust-google.svg", alt: "Google", w: 74, h: 24 },
  { src: "/trust-amazon.svg", alt: "Amazon", w: 80, h: 24 },
  { src: "/trust-pinterest.svg", alt: "Pinterest", w: 87, h: 22 },
  { src: "/trust-accenture.svg", alt: "Accenture", w: 84, h: 24 },
  { src: "/trust-bloomberg.svg", alt: "Bloomberg", w: 90, h: 16 },
  { src: "/trust-salesforce.svg", alt: "Salesforce", w: 37, h: 26 },
  { src: "/trust-netflix.svg", alt: "Netflix", w: 75, h: 20 },
  { src: "/trust-google.svg", alt: "Google", w: 74, h: 24 },
  { src: "/trust-amazon.svg", alt: "Amazon", w: 80, h: 24 },
  { src: "/trust-pinterest.svg", alt: "Pinterest", w: 87, h: 22 },
];
