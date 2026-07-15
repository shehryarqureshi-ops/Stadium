"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1, // Slower = smoother (0.05 to 0.1 is standard)
        duration: 1, // Scroll speed duration in seconds
        // smoothWheel: true, // Enables smooth scroll on mobile devices
      }}
    >
      {children}
    </ReactLenis>
  );
}
