import createMDX from '@next/mdx'
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    /* Vercel's image optimizer is over its plan quota, so every /_next/image
       request on the deployed site returns 402 OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED
       and images render blank. Serve the files from public/ as-is instead.
       Remove this line (or raise the Vercel image-optimization limit) to go
       back to resized WebP/AVIF. */
    unoptimized: true,
    /* Next 16 allow-lists image qualities (default [75] only). Photos use 90,
       UI mockups with fine text use 100 (near-lossless WebP) — see
       design.md "Image quality". */
    qualities: [75, 90, 100],
  },
  /* Hero / infrastructure clips are 4–7 MB each and the hero rotates through
     all five forever. public/ files default to `max-age=0`, so every rotation
     re-requested (or revalidated) them — a media request was in flight at
     almost every moment. Let the browser keep them. */
  async headers() {
    return [
      {
        source: "/videos/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
