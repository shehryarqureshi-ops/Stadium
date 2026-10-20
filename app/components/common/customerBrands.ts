/* Brand eyebrow + logo + case-study link for the customers quoted in
   VerticalTestimonials. Spread into a TestimonialItem:
   `{ ...BRANDS.workato, title, subtitle, text, image }`. */

import type { StaticImageData } from "next/image";

import apollo from "@/public/the-proof/customers/logo-apollo.svg";
import constructconnect from "@/public/the-proof/customers/logo-constructconnect.png";
import isolved from "@/public/the-proof/customers/logo-isolved.png";
import kentro from "@/public/the-proof/customers/logo-kentro.png";
import keyfactor from "@/public/the-proof/customers/logo-keyfactor.png";
import plansource from "@/public/the-proof/customers/logo-plansource.webp";
import workato from "@/public/the-proof/customers/logo-workato.png";

type Brand = { eyebrow: string; logo: StaticImageData; href: string };

const brand = (eyebrow: string, logo: StaticImageData, slug: string): Brand => ({
  eyebrow,
  logo,
  href: `https://www.bystadium.com/case-overview/${slug}`,
});

export const BRANDS = {
  apollo: brand("APOLLO", apollo, "apollo"),
  constructconnect: brand("CONSTRUCTCONNECT", constructconnect, "constructconnect"),
  isolved: brand("ISOLVED", isolved, "isolved"),
  kentro: brand("KENTRO", kentro, "kentro"),
  keyfactor: brand("KEYFACTOR", keyfactor, "keyfactor"),
  plansource: brand("PLANSOURCE", plansource, "plansource"),
  workato: brand("WORKATO", workato, "workato"),
} satisfies Record<string, Brand>;
