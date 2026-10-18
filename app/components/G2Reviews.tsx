import Image from "next/image";

import {
  G2_FALLBACK_REVIEWS,
  G2_FALLBACK_SUMMARY,
  type G2Review,
} from "@/app/data/g2Reviews";

/* Live G2 reviews for Stadium Shops | SnackMagic | SwagMagic. Same data the
   bystadium.com/reviews Elfsight widget shows (5-star, text required, latest 20),
   read from Elfsight's reviews service and cached for an hour, then rendered in
   our own 4-column grid — the embed's layout is fixed in the Elfsight dashboard
   (≤ 900 wide). Falls back to the snapshot in app/data/g2Reviews.ts if the
   request fails. */
const G2_SOURCE = "https://www.g2.com/products/snackmagic/reviews";
const G2_PRODUCT_URL = "https://www.g2.com/products/stadium-i-snackmagic-i-swagmagic/reviews";
const API = "https://service-reviews-ultimate.elfsight.com/data";

type ApiReview = {
  reviewer_name: string;
  rating: number;
  title: string;
  text: string;
  published_at: number;
  url: string;
};

async function load(): Promise<{ reviews: G2Review[]; rating: number; count: number }> {
  try {
    const uri = encodeURIComponent(G2_SOURCE);
    const [rev, src] = await Promise.all([
      fetch(`${API}/reviews?uris%5B%5D=${uri}&filter_content=text_required&min_rating=5&page_length=20&order=date`, { next: { revalidate: 3600 } }),
      fetch(`${API}/sources?uris%5B%5D=${uri}`, { next: { revalidate: 3600 } }),
    ]);
    if (!rev.ok || !src.ok) throw new Error("G2 data unavailable");
    const reviews = ((await rev.json()).result.data as ApiReview[]).map((r) => ({
      name: r.reviewer_name,
      rating: r.rating,
      title: r.title,
      text: r.text,
      date: new Date(r.published_at * 1000).toISOString().slice(0, 10),
      url: r.url,
    }));
    const summary = (await src.json()).result.data[0];
    if (!reviews.length) throw new Error("No reviews");
    return { reviews, rating: summary.rating, count: summary.reviews_number };
  } catch {
    return { reviews: G2_FALLBACK_REVIEWS, ...G2_FALLBACK_SUMMARY };
  }
}

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

function Stars({ rating }: { rating: number }) {
  return (
    <span aria-label={`${rating} out of 5`} className="text-[0.9375rem] leading-none text-[#ff9c00]">
      {"★".repeat(Math.round(rating))}
    </span>
  );
}

export default async function G2Reviews() {
  const { reviews, rating, count } = await load();

  return (
    <section
      aria-label="Reviews from G2"
      className="px-section-x-sm pt-10 md:px-section-x-md lg:px-section-x-lg lg:pt-[3.75rem]"
    >
      <div className="mx-auto flex w-full max-w-content flex-col gap-4">
        <div
          data-animation="reveal"
          className="flex flex-col items-start justify-between gap-4 rounded-3xl bg-[#f2f2f2] p-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <Image src="/g2-logo.svg" alt="" width={32} height={32} className="size-8 shrink-0" />
            <span className="font-sans text-[1.125rem] font-bold text-ink">Reviews</span>
            <span className="font-display text-[2rem] font-bold leading-none text-ink">{rating}</span>
            <span className="flex flex-col">
              <Stars rating={rating} />
              <span className="mt-1 font-sans text-[0.8125rem] text-grey-500">
                {count.toLocaleString("en-US")} reviews on G2
              </span>
            </span>
          </div>
          <a
            href={G2_PRODUCT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-button-h items-center justify-center rounded-button bg-cta-fill px-button-x font-sans text-button-primary uppercase text-cta-on shadow-button transition-all duration-200 hover:bg-grey-700 active:scale-[0.98]"
          >
            Review us on G2
          </a>
        </div>

        <ul role="list" data-reveal-stagger="80" className="columns-1 gap-4 sm:columns-2 lg:columns-4">
          {reviews.map((r) => (
            <li
              key={r.url}
              data-animation="reveal"
              className="mb-4 break-inside-avoid rounded-3xl bg-[#f2f2f2] p-5"
            >
              <figure className="flex flex-col gap-3">
                <figcaption className="flex flex-col gap-1">
                  <span className="font-sans text-[0.875rem] font-bold text-ink">{r.name}</span>
                  <span className="font-sans text-[0.8125rem] text-grey-500">{formatDate(r.date)}</span>
                </figcaption>
                <Stars rating={r.rating} />
                <h3 className="font-sans text-[1rem] font-bold leading-[1.35] text-ink">{r.title}</h3>
                <blockquote className="line-clamp-[8] font-sans text-[0.9375rem] leading-[1.5] text-[#474b5c]">
                  {r.text}
                </blockquote>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit font-sans text-[0.8125rem] font-semibold text-grey-500 underline underline-offset-4 transition-opacity hover:opacity-70"
                >
                  Read more on G2
                </a>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
