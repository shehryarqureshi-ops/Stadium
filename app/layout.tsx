import type { Metadata } from "next";
import { Overpass } from "next/font/google";
import localFont from "next/font/local";
import RevealOnScroll from "./components/RevealOnScroll";
import SmoothScroll from "./components/SmoothScroll";
import "./globals.css";

const overpass = Overpass({
  variable: "--font-overpass",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

/* Satoshi Bold 700 is the primary display weight — Bold fits Stadium's
   confident/energetic personality (a Bold-only system; an earlier Bold+Medium
   trial for *headlines* was reverted 2026-06-12). Satoshi Medium 500 was added
   back 2026-07-15 as an ISOLATED, opt-in weight (`--font-display-medium` /
   `font-display-medium`) ONLY for the specific spots the Figma specs it —
   the StadiumWay accordion and testimonial quotes. It does NOT change the
   default `font-display` (Bold) matching anywhere else. */
const satoshi = localFont({
  variable: "--font-satoshi",
  src: "./fonts/Satoshi-Bold.woff2",
  weight: "700",
});

const satoshiMedium = localFont({
  variable: "--font-satoshi-medium",
  src: "./fonts/Satoshi-Medium.woff2",
  weight: "500",
});

export const metadata: Metadata = {
  title: "Stadium — Show up for your crowd. Everywhere, every time.",
  description:
    "Most companies have the intention. Stadium provides the infrastructure to power every engagement moment globally.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${overpass.variable} ${satoshi.variable} ${satoshiMedium.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Quality bar: first tab stop jumps past the nav (Shopify ships
            the same). Hidden until keyboard-focused. */}
        {/* reveal mechanics in plain CSS — Tailwind focus: variants proved
            unreliable for this combo in the v4 dev pipeline */}
        <style>{`
          .skip-link {
            position: fixed;
            left: 1rem;
            top: 1rem;
            z-index: 100;
            translate: 0 -150%;
            opacity: 0;
            transition: translate 0.2s, opacity 0.2s;
          }
          .skip-link:focus {
            translate: 0 0;
            opacity: 1;
          }
          @media (prefers-reduced-motion: reduce) {
            .skip-link { transition: none; }
          }

          /* Per-element scroll reveal (data-animation="reveal") — the premium
             Linear/Apple entrance: fade in + rise from slightly below + de-blur
             into focus, in parallel on one eased curve. RevealOnScroll adds
             .is-revealed the first time each element enters the viewport, and
             sets --reveal-delay per element so sibling groups cascade instead
             of firing together (see RevealOnScroll.tsx for the stagger logic).
             Inlined here (not globals.css) so it always ships before content
             paints — no flash. Reduced-motion / no-JS show content instantly. */
          [data-animation="reveal"] {
            opacity: 0;
            transform: translateY(1.5rem);
            filter: blur(0.5rem);
            transition:
              opacity 2.5s cubic-bezier(0.16, 1, 0.3, 1),
              transform 2.5s cubic-bezier(0.16, 1, 0.3, 1),
              filter 1.2s cubic-bezier(0.16, 1, 0.3, 1);
            transition-delay: var(--reveal-delay, 0s);
            will-change: opacity, transform, filter;
          }
          [data-animation="reveal"].is-revealed {
            opacity: 1;
            transform: none;
            filter: none;
            will-change: auto;
          }
          @media (prefers-reduced-motion: reduce) {
            [data-animation="reveal"] {
              opacity: 1;
              transform: none;
              filter: none;
              transition: none;
            }
          }
          @media (scripting: none) {
            [data-animation="reveal"] {
              opacity: 1;
              transform: none;
              filter: none;
            }
          }
        `}</style>
        <a
          href="#main"
          className="skip-link inline-flex h-button-h items-center rounded-button bg-white px-button-x font-sans text-button-primary uppercase text-ink shadow-[0px_0.25rem_0.75rem_0px_rgba(0,0,0,0.2)]"
        >
          Skip to content
        </a>
        <SmoothScroll>{children}</SmoothScroll>
        <RevealOnScroll />
      </body>
    </html>
  );
}
