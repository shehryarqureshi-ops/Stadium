export type LogoWallItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const LOGOS: LogoWallItem[] = [
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
