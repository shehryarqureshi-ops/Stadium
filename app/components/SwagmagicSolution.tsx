import TwoFeaturedCards from "@/app/components/common/TwoFeaturedCards";

import offerOne from '@/public/swag/admin-view.png';

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
      captionColor="#10995a"
      title="Guided ordering or self-serve"
      description="Both options pull from the same catalog."
      cards={[
        {
          title: "Run a swag program",
          subtitle: "Stadium Platform • Sales-Assisted",
          image: offerOne,
          imageAlt:
            "Stadium swag program showing branded stores, inventory, and fulfillment.",
          isFeatured: true,
          isFeaturedLabel: "Popular",
          isFeaturedPillColor: "#1b1b1b",
          content: (
            <CardContent
              description="We build your stores, hold your inventory, ship on autopilot, and manage setup. Finance keeps spend in control."
              points={[
                "Branded stores and kitting",
                "Inventory + global fulfillment",
                "Budgets, approvals, and SSO",
              ]}
            />
          ),
          ctaLabel: "Talk to sales",
          ctaVariant: "dark",
          ctaLink: "#",
        },

        {
          title: "Order Swag Yourself",
          subtitle: "SwagMagic • Self-Serve",
          image: offerOne,
          imageAlt:
            "SwagMagic self-serve ordering experience for browsing and ordering swag.",
          isFeatured: false,
          content: (
            <CardContent
              description="Design and send swag with no contracts or minimums."
              points={[
                "On-demand and bulk ordering",
                "No minimums, no setup call",
                "Pay as you go",
              ]}
            />
          ),
          ctaLabel: "Shop SwagMagic",
          ctaVariant: "light",
          ctaLink: "#",
        },
      ]}
    />
  );
}