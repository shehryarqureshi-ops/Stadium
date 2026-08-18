import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* Next 16 allow-lists image qualities (default [75] only). Photos use 90,
       UI mockups with fine text use 100 (near-lossless WebP) — see
       design.md "Image quality". */
    qualities: [75, 90, 100],
  },
};

export default nextConfig;
