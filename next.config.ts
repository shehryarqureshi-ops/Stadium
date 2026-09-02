import createMDX from '@next/mdx'
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    /* Next 16 allow-lists image qualities (default [75] only). Photos use 90,
       UI mockups with fine text use 100 (near-lossless WebP) — see
       design.md "Image quality". */
    qualities: [75, 90, 100],
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
