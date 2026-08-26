import Image from "next/image";

const LOGOS = [
  { src: "/logos/fidelity.svg", alt: "Spotify", width: 81, height: 24 },
  { src: "/logos/solved.svg", alt: "Amazon", width: 77, height: 20 },
  { src: "/logos/western-union.svg", alt: "Pinterest", width: 87, height: 25 },
  { src: "/logos/figma.svg", alt: "Accenture", width: 91, height: 24 },
  { src: "/logos/microsoft.svg", alt: "Bloomberg", width: 90, height: 24 },
  { src: "/logos/united-healthcare.svg", alt: "Salesforce", width: 37, height: 27 },
  { src: "/logos/amazon.svg", alt: "Netflix", width: 75, height: 30 },
  { src: "/logos/premier.svg", alt: "Google", width: 80, height: 25 },
  { src: "/logos/imagine.svg", alt: "Imagine", width: 80, height: 30 },
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
                      { }
                      <Image
                        src={l.src}
                        alt={group === 0 ? l.alt : ""}
                        width={l.width}
                        height={l.height}
                        style={{ height: `${l.height / 16}rem` }}
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
