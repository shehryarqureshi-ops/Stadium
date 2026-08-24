import Image, { type StaticImageData } from "next/image";

type StatLeft = {
  image: StaticImageData;
  title: string;
  text: string;
};

type StatCenter = {
  caption: string;
  title: string;
  backgroundColor?: string;
  text: string;
  authorImage: StaticImageData;
  authorName: string;
  authorTitle: string;
};

type RightStat = {
  title: string;
  text: string;
};

type StatsGridProps = {
  caption?: string;
  captionColor?: string;
  title: string;
  description: string;
  statLeft: StatLeft;
  statCenter: StatCenter;
  rightTopStat: RightStat;
  rightBottomStat: RightStat;
};

const NUM =
  "font-[family-name:var(--font-satoshi-medium)] leading-[1.04] tracking-[-0.0625rem]";

export default function StatsGrid({
  caption = '',
  captionColor = "#2178f5",
  title,
  description,
  statLeft,
  statCenter,
  rightTopStat,
  rightBottomStat,
}: StatsGridProps) {
  return (
    <section className="overflow-hidden rounded-b-4xl px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-10">
        <div className="flex max-w-[53.75rem] flex-col items-center gap-2 text-center">
          {caption &&
            <p
              data-animation="reveal"
              style={{ color: captionColor }}
              className="font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem]"
            >
              {caption}
            </p>
          }

          <h2
            data-animation="reveal"
            className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
          >
            {title}
          </h2>

          <p
            data-animation="reveal"
            className="font-sans text-[1.0625rem] leading-[1.45] text-[#707075] lg:text-[1.125rem]"
          >
            {description}
          </p>
        </div>

        <div
          data-animation="reveal"
          className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {/* Left image stat */}
          <div className="relative min-h-[22.25rem] overflow-hidden rounded-[1.5rem]">
            <Image
              src={statLeft.image}
              alt={statLeft.text}
              fill
              quality={100}
              className="object-cover"
              sizes="(min-width:1024px) 25rem, (min-width:768px) 45vw, 92vw"
            />

            <div className="absolute inset-x-4 bottom-4 flex flex-col gap-1.5 p-6 text-black bg-white rounded-2xl shadow-lg">
              <p className="font-sans text-[1rem] leading-[1.4]">
                {statLeft.text}
              </p>

              <p className={`${NUM} text-[3rem]`}>{statLeft.title}</p>
            </div>
          </div>

          {/* Center stat + testimonial */}
          <div
            style={{
              backgroundColor: statCenter.backgroundColor ?? "#eaf1fd",
            }}
            className="flex min-h-[22.25rem] flex-col justify-between gap-6 rounded-[1.5rem] p-6 text-[#16171b]"
          >
            <div className="flex flex-col gap-1.5">
              <p className="font-sans text-[1rem] leading-[1.4] text-[#5b6470]">
                {statCenter.caption}
              </p>

              <p className={`${NUM} text-[3rem]`}>{statCenter.title}</p>
            </div>

            <div className="flex flex-col gap-5">
              <p className="max-w-[19rem] font-sans text-[1rem] leading-[1.45] text-[#33404f]">
                {statCenter.text}
              </p>

              <div className="flex items-center gap-3">
                <Image
                  src={statCenter.authorImage}
                  alt={statCenter.authorName}
                  width={54}
                  height={54}
                  quality={90}
                  className="size-[2.7rem] rounded-full object-cover"
                />

                <div className="leading-normal">
                  <p className="font-sans text-[0.9375rem] font-semibold text-[#16171b]">
                    {statCenter.authorName}
                  </p>
                  <p className="font-sans text-[0.9375rem] text-[#5b6470]">
                    {statCenter.authorTitle}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right stacked stats */}
          <div className="flex min-h-[22.25rem] flex-col gap-4">
            <div className="flex flex-1 flex-col justify-end gap-2.5 rounded-[1.5rem] bg-[#f2f2f2] p-6 text-[#1b1b1b]">
              <p className={`${NUM} text-[3rem]`}>{rightTopStat.title}</p>

              <p className="font-sans text-[1rem] leading-[1.4]">
                {rightTopStat.text}
              </p>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-[1.5rem] bg-[#16171b] p-6 text-white">
              <p className="font-sans text-[1rem] leading-[1.4]">
                {rightBottomStat.text}
              </p>

              <p className={`${NUM} text-[3rem]`}>{rightBottomStat.title}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
