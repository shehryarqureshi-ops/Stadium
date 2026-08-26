export type LogoWallItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

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

export default function LogoWall() {
  return (
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
                      width={logo.width}
                      height={logo.height}
                      style={{ height: `${logo.height / 16}rem` }}
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
  );
}
