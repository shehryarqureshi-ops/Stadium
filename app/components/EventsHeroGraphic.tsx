import Image, { type StaticImageData } from "next/image";
import { Nunito } from "next/font/google";

import host from "@/public/events/hero/host.webp";
import alex from "@/public/events/hero/tile-alex.webp";
import amara from "@/public/events/hero/tile-amara.webp";
import daniel from "@/public/events/hero/tile-daniel.webp";
import dev from "@/public/events/hero/tile-dev.webp";
import ines from "@/public/events/hero/tile-ines.webp";
import jordan from "@/public/events/hero/tile-jordan.webp";
import lena from "@/public/events/hero/tile-lena.webp";
import marcus from "@/public/events/hero/tile-marcus.webp";
import marta from "@/public/events/hero/tile-marta.webp";
import mei from "@/public/events/hero/tile-mei.webp";
import priya from "@/public/events/hero/tile-priya.webp";
import ravi from "@/public/events/hero/tile-ravi.webp";
import sam from "@/public/events/hero/tile-sam.webp";
import sofia from "@/public/events/hero/tile-sofia.webp";
import taylor from "@/public/events/hero/tile-taylor.webp";
import zoe from "@/public/events/hero/tile-zoe.webp";

/* Confetti's type (Nunito 700/800) — loaded for this graphic only. */
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

/* Figma 5892:11404 (1160 × 600). 7-col grid, 4 tile rows, host spans
   cols 3–5 × all 4 rows, lower third spans the full width. Tiles are listed in
   grid order (the host cell is skipped by auto-placement). */
type Tile = {
  name: string;
  src: StaticImageData;
  rank?: { n: number; pct: string; border: string; bg: string };
};

const GOLD = { border: "border-cf-gold", bg: "bg-cf-gold" };
const BLUE = { border: "border-cf-blue", bg: "bg-cf-blue" };
const RED = { border: "border-cf-red", bg: "bg-cf-red" };

const TILES: Tile[] = [
  { name: "Priya", src: priya },
  { name: "Dev", src: dev },
  { name: "Zoe", src: zoe },
  { name: "Marcus", src: marcus },
  { name: "Sofia", src: sofia },
  { name: "Alex", src: alex, rank: { n: 1, pct: "42%", ...GOLD } },
  { name: "Jordan", src: jordan, rank: { n: 2, pct: "33%", ...BLUE } },
  { name: "Sam", src: sam },
  { name: "Lena", src: lena },
  { name: "Mei", src: mei },
  { name: "Taylor", src: taylor, rank: { n: 3, pct: "25%", ...RED } },
  { name: "Ravi", src: ravi },
  { name: "Marta", src: marta },
  { name: "Daniel", src: daniel },
  { name: "Ines", src: ines },
  { name: "Amara", src: amara },
];

/* lucide paths (ISC) */
function Icon({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

function ZapIcon({ className }: { className: string }) {
  return (
    <Icon className={className}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </Icon>
  );
}
function UsersIcon({ className }: { className: string }) {
  return (
    <Icon className={className}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </Icon>
  );
}
function ClockIcon({ className }: { className: string }) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </Icon>
  );
}

function RoundSteps() {
  return (
    <span aria-hidden="true" className="flex items-center gap-1">
      {[1, 1, 0.48, 0.08].map((o, i) => (
        <span
          key={i}
          className="h-1.5 w-[1.375rem] rounded-full bg-cf-ink"
          style={{ opacity: o }}
        />
      ))}
    </span>
  );
}

export default function EventsHeroGraphic() {
  return (
    <div
      role="img"
      aria-label="A live hosted team event: the host on camera, a grid of teammates, the question on screen, and the team score."
      className={`${nunito.variable} relative rounded-[0.75rem] border-2 border-white bg-[linear-gradient(135deg,#ffe1ea_0%,#fff0dc_30%,#e9f8e3_55%,#e1f0ff_80%,#ede6ff_100%)] p-1.5 font-[family-name:var(--font-nunito)] shadow-cf-frame md:rounded-[1.25rem] md:p-2.5 lg:p-3.5`}
    >
      <div className="grid grid-cols-7 gap-1 md:gap-2">
        {/* tiles */}
        {TILES.map((t) => (
          <div
            key={t.name}
            className={`relative aspect-[154/110] overflow-hidden rounded-[0.375rem] bg-cf-ink/8 md:rounded-[0.75rem] ${
              t.rank
                ? `border-2 md:border-[0.1875rem] ${t.rank.border}`
                : "border border-white md:border-2"
            }`}
          >
            <Image
              src={t.src}
              alt=""
              fill
              sizes="(min-width: 80rem) 10rem, (min-width: 48rem) 12vw, 14vw"
              quality={80}
              className="object-cover"
            />
            <span className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgb(0_0_0/0.14)_100%)]" />
            {t.rank && (
              <span className="absolute left-1.5 top-1.5 hidden items-center gap-[0.3125rem] rounded-[0.5rem] bg-white py-[0.1875rem] pl-[0.1875rem] pr-[0.1875rem] md:flex lg:pr-[0.5625rem]">
                <span
                  className={`grid size-[1.125rem] place-items-center rounded-full text-[0.75rem] font-extrabold leading-none text-white ${t.rank.bg}`}
                >
                  {t.rank.n}
                </span>
                <span className="hidden text-[0.75rem] font-extrabold leading-[1.4] text-cf-ink lg:inline">
                  {t.rank.pct}
                </span>
              </span>
            )}
            <span className="absolute bottom-1.5 left-1.5 hidden rounded-[0.375rem] bg-cf-ink/64 px-[0.4375rem] py-[0.1875rem] text-[0.6875rem] font-extrabold leading-[1.2] text-white lg:block">
              {t.name}
            </span>
          </div>
        ))}

        {/* host */}
        <div className="relative col-span-3 col-start-3 row-span-4 row-start-1 overflow-hidden rounded-[0.5rem] border border-white md:rounded-[1rem] md:border-2">
          <Image
            src={host}
            alt=""
            fill
            sizes="(min-width: 80rem) 30rem, (min-width: 48rem) 40vw, 43vw"
            quality={80}
            className="object-cover"
          />
          <span className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgb(0_0_0/0.2)_100%)]" />
          <span className="absolute left-3.5 top-3.5 hidden items-center gap-2 rounded-[0.5rem] bg-cf-ink/94 px-3 py-[0.3125rem] text-[0.75rem] font-extrabold leading-[1.4] text-white md:flex">
            Hosted by
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/events/hero/confetti-logo.svg"
              alt="Confetti"
              className="h-[0.9rem] w-auto"
            />
          </span>
          <span className="absolute right-3.5 top-3.5 hidden items-center gap-1.5 rounded-[0.5rem] bg-white/94 py-[0.3125rem] pl-2.5 pr-3 text-[0.75rem] font-extrabold leading-[1.4] text-cf-ink lg:flex">
            <span className="size-2 rounded-full bg-cf-live" />
            Live · 47 playing
          </span>
        </div>

        {/* lower third */}
        <div className="col-span-7 flex items-center gap-2.5 rounded-[1rem] bg-white px-3 py-2.5 shadow-cf-card md:gap-4 md:rounded-[1.5rem] md:px-5 md:py-0 md:h-[5rem] lg:h-[6rem] lg:gap-5 lg:pl-6 lg:pr-7">
          <span className="grid size-6 shrink-0 place-items-center rounded-[0.5rem] bg-cf-coral text-white md:size-[1.875rem] md:rounded-[0.625rem]">
            <ZapIcon className="size-3.5 md:size-4" />
          </span>
          <div className="flex min-w-0 flex-col gap-0.5">
            <div className="hidden items-center gap-2.5 md:flex">
              <span className="text-[0.75rem] font-extrabold leading-[1.4] text-cf-ink/80">
                Friday Team Showdown
              </span>
              <RoundSteps />
              <span className="text-[0.75rem] font-bold leading-[1.4] text-cf-ink/64">
                Round 3 of 5
              </span>
            </div>
            <p className="text-[0.8125rem] font-extrabold leading-[1.25] text-cf-ink md:text-[1.25rem] lg:text-[1.5rem]">
              Who is most likely to become a famous influencer?
            </p>
          </div>
          <span className="flex-1" />
          <div className="flex shrink-0 flex-col items-start">
            <span className="hidden text-[0.75rem] font-extrabold leading-[1.4] text-cf-ink/80 md:block">
              Team Purple
            </span>
            <span className="flex items-end gap-1.5">
              <span className="text-[1.125rem] font-extrabold leading-[1.1] text-cf-ink md:text-[1.75rem] lg:text-[2.125rem]">
                2,340
              </span>
              <span className="pb-0.5 text-[0.75rem] font-extrabold leading-[1.4] text-cf-ink/64">
                pts
              </span>
            </span>
          </div>
          <span className="hidden h-[3.25rem] w-px bg-cf-ink/8 lg:block" />
          <div className="hidden shrink-0 flex-col gap-2 lg:flex">
            <span className="flex items-center gap-2 text-[0.75rem] font-bold leading-[1.4] text-cf-ink">
              <UsersIcon className="size-4" />
              47 playing
            </span>
            <span className="flex items-center gap-2 text-[0.75rem] font-bold leading-[1.4] text-cf-ink">
              <ClockIcon className="size-4" />
              12 min left
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
