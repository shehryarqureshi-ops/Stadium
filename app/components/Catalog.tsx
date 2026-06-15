"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import snackBoxesImg from "@/public/catalog-snack-boxes.jpg";
import brandedMerchImg from "@/public/catalog-branded-merch.jpg";
import giftCardsImg from "@/public/catalog-gift-cards.jpg";
import luxuryGoodsImg from "@/public/catalog-luxury-goods.jpg";
import experiencesImg from "@/public/catalog-experiences.jpg";
import workEssentialsImg from "@/public/catalog-work-essentials.jpg";
import lifestyleHobbiesImg from "@/public/catalog-lifestyle-hobbies.jpg";

type Category = { name: string; eyebrow: string; image: StaticImageData };

/* Category card carousel — Figma 958:15013 ("Why Stadium — Card Carousel").
   PAGE-SCROLL DRIVEN on desktop (user req): the section pins while the card
   row translates horizontally with vertical scroll progress, then releases.
   Touch / reduced-motion fall back to a normal swipe-scroll (no pin). */
const categories: Category[] = [
  { name: "Snack Boxes", eyebrow: "10K+ Top Brands", image: snackBoxesImg },
  { name: "Branded Merch", eyebrow: "25,000 Items", image: brandedMerchImg },
  { name: "Gift Cards", eyebrow: "500+ Retailers", image: giftCardsImg },
  { name: "Luxury Goods", eyebrow: "Premium Brands", image: luxuryGoodsImg },
  { name: "Experiences", eyebrow: "50+ Countries", image: experiencesImg },
  {
    name: "Work Essentials",
    eyebrow: "Tech & Ergonomics",
    image: workEssentialsImg,
  },
  {
    name: "Lifestyle & Hobbies",
    eyebrow: "Every Culture",
    image: lifestyleHobbiesImg,
  },
];

export default function Catalog() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  /* null = not pinned (mobile / reduced-motion / pre-measure): plain swipe-scroll */
  const [pin, setPin] = useState<{
    height: number;
    x: number;
    padLeft: number;
  } | null>(null);

  useEffect(() => {
    const lg = window.matchMedia("(min-width: 64rem)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;

    const update = () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;
      if (!lg.matches || reduce.matches) {
        setPin(null);
        return;
      }
      // horizontal distance the row must travel = its content overflow
      const overflow = Math.max(0, track.scrollWidth - track.clientWidth);
      // make the section tall enough that scrolling it = travelling that distance
      const height = window.innerHeight + overflow;
      const scrolled = -section.getBoundingClientRect().top;
      const progress = Math.min(
        1,
        Math.max(0, scrolled / Math.max(1, height - window.innerHeight)),
      );
      // Start the first card at the heading's left edge: the heading sits in a
      // centered max-w-section (1600px) container + 90px margin, so above 1600
      // the content edge moves inward. Cards still overflow rightward.
      const padLeft = Math.max(90, (window.innerWidth - 1600) / 2 + 90);
      setPin({ height, x: -(progress * overflow), padLeft });
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    lg.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      lg.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={pin ? { height: `${pin.height}px` } : undefined}
      className="relative bg-surface-base"
    >
      <div
        className={
          pin
            ? "sticky top-0 flex h-screen flex-col justify-center gap-10 overflow-hidden"
            : "flex flex-col gap-8 py-section-y-sm md:py-section-y-md lg:gap-10 lg:py-section-y-lg"
        }
      >
        {/* Heading */}
        <div className="mx-auto flex w-full max-w-section flex-col gap-4 px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
          <h2 className="font-display text-heading-sm text-ink md:text-heading-md lg:text-heading-lg">
            Gifts, swag, snacks, rewards. Built in.
          </h2>
          <p className="max-w-[40rem] font-sans text-body-md text-ink md:text-body-lg">
            100K+ items from leading brands. For every moment, every audience,
            everywhere.
          </p>
        </div>

        {/* Card track — page scroll drives the horizontal slide when pinned;
            swipe-scroll otherwise */}
        <ul
          ref={trackRef}
          style={
            pin
              ? { transform: `translate3d(${pin.x}px,0,0)`, paddingLeft: pin.padLeft }
              : undefined
          }
          className={
            pin
              ? "flex w-full gap-4 px-section-x-lg will-change-transform"
              : "flex gap-4 overflow-x-auto px-section-x-sm pb-1 [scrollbar-width:none] md:px-section-x-md lg:px-section-x-lg [&::-webkit-scrollbar]:hidden"
          }
        >
          {categories.map((c) => (
            <li
              key={c.name}
              className="relative aspect-[348/460] w-[15rem] shrink-0 overflow-hidden rounded-2xl bg-[#f9f7f8] md:w-[18rem] lg:w-[21.75rem]"
            >
              <Image
                src={c.image}
                alt={c.name}
                fill
                sizes="(min-width: 64rem) 21.75rem, (min-width: 48rem) 18rem, 15rem"
                className="object-cover"
              />
              <div className="absolute left-6 top-6 flex flex-col gap-1">
                <span className="font-sans text-[0.75rem] font-bold uppercase leading-4 tracking-[0.03125rem] text-ink">
                  {c.eyebrow}
                </span>
                <span className="font-sans text-[1.25rem] font-extrabold leading-7 text-ink lg:text-[1.5rem] lg:leading-8">
                  {c.name}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
