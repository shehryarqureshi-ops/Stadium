"use client";

type CarouselControlsProps = {
  trackId: string;
  scrollAmount: number;
};

function Arrow({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4 text-ink"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {dir === "prev" ? (
        <path d="M19 12H5M12 19l-7-7 7-7" />
      ) : (
        <path d="M5 12h14M12 5l7 7-7 7" />
      )}
    </svg>
  );
}

export default function CarouselControls({
  trackId,
  scrollAmount,
}: CarouselControlsProps) {
  const scroll = (direction: number) => {
    const track = document.getElementById(trackId);

    track?.scrollBy({
      left: direction * scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="mx-auto flex w-full max-w-section justify-end gap-2.5 px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
      <button
        type="button"
        aria-label="Previous"
        onClick={() => scroll(-1)}
        className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-[#e8e9ed] transition-colors hover:bg-grey-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
      >
        <Arrow dir="prev" />
      </button>

      <button
        type="button"
        aria-label="Next"
        onClick={() => scroll(1)}
        className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-[#e8e9ed] transition-colors hover:bg-grey-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
      >
        <Arrow dir="next" />
      </button>
    </div>
  );
}