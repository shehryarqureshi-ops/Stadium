import type { Metadata } from "next";
import { Overpass } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const overpass = Overpass({
  variable: "--font-overpass",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

/* Single display weight: Satoshi Bold 700. A two-weight system (Bold +
   Medium for long "statement" headlines) was trialed 2026-06-12 and
   REVERTED — Bold fits Stadium's confident/energetic personality; the
   Medium register read too restrained/corporate. The presence win for
   statement headlines comes from SIZE (the `text-narrative-*` scale) +
   filling the width, not weight. */
const satoshi = localFont({
  variable: "--font-satoshi",
  src: "./fonts/Satoshi-Bold.woff2",
  weight: "700",
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
      className={`${overpass.variable} ${satoshi.variable} h-full antialiased`}
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
        `}</style>
        <a
          href="#main"
          className="skip-link inline-flex h-button-h items-center rounded-button bg-white px-button-x font-sans text-button-primary uppercase text-ink shadow-[0px_0.25rem_0.75rem_0px_rgba(0,0,0,0.2)]"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
