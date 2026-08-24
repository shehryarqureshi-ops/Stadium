import TwoFeaturedCards from "@/app/components/common/TwoFeaturedCards";

function Check() {
  return (
    <svg
      viewBox="0 0 14 14"
      fill="none"
      className="size-[0.875rem] shrink-0"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M11.6667 3.5L5.25 9.91667L2.33333 7"
        stroke="black"
        strokeWidth={1.16667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CardContent({
  description,
  points,
}: {
  description: string;
  points: string[];
}) {
  return (
    <div className="flex flex-col gap-8">
      <p className="font-sans text-[1rem] leading-[1.5] text-[#6b6c71]">
        {description}
      </p>

      <ul className="flex flex-col gap-3 pb-2">
        {points.map((point) => (
          <li key={point} className="flex items-center gap-2.5">
            <Check />

            <span className="font-sans text-[0.9375rem] leading-[1.2] text-[#16171b]">
              {point}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SwagmagicSolution() {
  return (
    <TwoFeaturedCards
      caption="The solution"
      captionColor="#2178f5"
      title="Your choice, or theirs"
      description="Send a snack box you choose, or let recipients build their own from the catalog."
      cards={[
        {
          title: "Build your own boxes",
          subtitle: "Stadium Platform · Sales-Assisted",
          isFeatured: true,
          isFeaturedLabel: "Popular",
          isFeaturedPillColor: "#1b1b1b",
          content: (
            <CardContent
              description="Set a budget, and let everyone build their own box from 2,000+ snacks–chips, candy, coffee, and healthy picks included."
              points={[
                "Zero guesswork",
                "Dietary filters built in",
                "Ships worldwide",
              ]}
            />
          ),
          ctaLabel: "Start a box",
          ctaVariant: "dark",
          ctaLink: "#",
        },
        {
          title: "Curated boxes",
          subtitle: "SwagMagic · Self-Serve",
          isFeatured: false,
          content: (
            <CardContent
              description="Hand-picked snack boxes, ready to send in minutes. Pick a theme and we handle the rest."
              points={[
                "Curated by our snack experts",
                "Themed boxes for every occasion",
                "Add your branding to the box",
              ]}
            />
          ),
          ctaLabel: "Browse boxes",
          ctaVariant: "light",
          ctaLink: "#",
        },
      ]}
    />
  );
}