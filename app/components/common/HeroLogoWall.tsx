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

export const HeroLogoWall = () => {
  return (
    <div className="relative z-10 rounded-t-2xl lg:rounded-t-[2rem] bg-white/20">
      <div className="px-section-x-sm py-10 md:px-section-x-md lg:px-section-x-lg lg:py-14">
        <div className="mx-auto w-full max-w-content">
          <div className="relative h-10 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]">
            <div className="flex h-full w-max animate-[swag-marquee_40s_linear_infinite] motion-reduce:animate-none">
              {[0, 1].map((group) => (
                <ul
                  key={group}
                  aria-hidden={group === 1}
                  className="flex h-full shrink-0 list-none items-center gap-x-10 pr-10 md:gap-x-14 md:pr-14"
                >
                  {LOGOS.map((l, i) => (
                    <li
                      key={`${l.alt}-${i}`}
                      className="flex shrink-0 items-center"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={l.src}
                        alt={group === 0 ? l.alt : ""}
                        width={l.w}
                        height={l.h}
                        style={{ height: `${l.h / 16}rem` }}
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
    </div>
  );
};
