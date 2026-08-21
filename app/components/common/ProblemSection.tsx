import Image, { type StaticImageData } from "next/image";
import LogoWall from "@/app/components/common/LogoWall";

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

  variant?: "sleeve" | "plain";
  showLogoWall?: boolean;
  showDivider?: boolean;
};

const LOGOS = [
  { src: "/trust-google.svg", alt: "Google", width: 74, height: 24 },
  { src: "/trust-amazon.svg", alt: "Amazon", width: 80, height: 24 },
  { src: "/trust-pinterest.svg", alt: "Pinterest", width: 87, height: 22 },
  { src: "/trust-accenture.svg", alt: "Accenture", width: 84, height: 24 },
  { src: "/trust-bloomberg.svg", alt: "Bloomberg", width: 90, height: 16 },
  { src: "/trust-salesforce.svg", alt: "Salesforce", width: 37, height: 26 },
  { src: "/trust-netflix.svg", alt: "Netflix", width: 75, height: 20 },
  { src: "/trust-google.svg", alt: "Google", width: 74, height: 24 },
  { src: "/trust-amazon.svg", alt: "Amazon", width: 80, height: 24 },
  { src: "/trust-pinterest.svg", alt: "Pinterest", width: 87, height: 22 },
];

export default function ProblemSection({
  caption,
  captionColor = "#2178f5",
  title,
  description,
  items,
  variant = "sleeve",
  showLogoWall = variant === "sleeve",
  showDivider = false,
}: ProblemSectionProps) {
  const content = (
    <>
      {showLogoWall && <LogoWall />}

      <div
        className={
          variant === "plain"
            ? "mx-auto w-full max-w-content"
            : "flex w-full flex-col items-center"
        }
      >
        <div
          className={
            variant === "plain"
              ? "flex w-full flex-col items-center rounded-[1rem] bg-white px-6 pt-16 md:px-12 md:pt-20 lg:px-20 lg:pt-[10rem]"
              : "flex w-full flex-col items-center rounded-[1rem] bg-white px-6 pt-16 md:px-12 md:pt-24 lg:px-20 lg:pt-40"
          }
        >
          {/* Header */}
          <div className="flex w-full max-w-[53.75rem] flex-col items-center gap-5 text-center">
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
    </>
  );

  if (variant === "plain") {
    return (
      <section className="relative z-10 px-section-x-sm pb-16 md:px-section-x-md md:pb-20 lg:px-section-x-lg">
        {content}
      </section>
    );
  }

  return (
    <section className="relative z-10 bg-[#0437a5]">
      <div
        className="rounded-t-[1.5rem] md:rounded-t-[2rem] lg:rounded-t-[2.5rem]"
        style={{
          backgroundImage:
            "linear-gradient(180deg, #2f63d0 0%, #9bc3f5 42%, #ffffff 82%)",
        }}
      >
        {content}
      </div>
    </section>
  );
}
