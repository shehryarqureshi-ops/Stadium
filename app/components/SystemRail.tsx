import { ArrowLeftRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

/* GEI ledger — simplified "V1 · Plain flow" (Figma 7441:10739, from the 7439:40420 ledger).
   Same GEI badge + headline + one-liner, then people (HRIS) → GEI ↔ customers (CRM) as three
   plain columns — logos and one line each (runs your people · runs engagement · runs your
   customers), no cards, tags or chips. From xl (1280) it's the drawn row; below that the
   columns stack and the Lucide link arrows turn to point down. Content edge = the site
   header's own side padding. Logos + the Stadium mark are Figma exports in public/new-home/system/. */

type Logo = { logo: string; alt: string; w: number; h: number };
/* V1 logo size = the Figma 1.5× of the original ledger logos (px ÷ 16 → rem via h) */
const HRIS: Logo[] = [
  { logo: "workday", alt: "Workday", w: 47, h: 33 },
  { logo: "bamboohr", alt: "BambooHR", w: 100, h: 21 },
];
const CRM: Logo[] = [
  { logo: "salesforce", alt: "Salesforce", w: 31, h: 33 },
  { logo: "hubspot", alt: "HubSpot", w: 76, h: 33 },
];

/* one column: a fixed-height mark row (so the three lines align) over its one-liner */
function Column({ children, say }: { children: ReactNode; say: string }) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-6 xl:flex-1">
      <div className="flex h-[4.5rem] items-center justify-center">{children}</div>
      <p className="text-center font-display text-[1.25rem] leading-[1.25] tracking-[-0.0125rem] text-swag-ink md:text-[1.5rem]">
        {say}
      </p>
    </div>
  );
}

function Logos({ items }: { items: Logo[] }) {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
      {items.map((l) => (
        <li key={l.logo} className="flex items-center">
          <Image
            src={`/new-home/system/${l.logo}.svg`}
            alt={l.alt}
            width={l.w}
            height={l.h}
            className="w-auto max-w-none"
            style={{ height: `${l.h / 16}rem` }}
          />
        </li>
      ))}
    </ul>
  );
}

/* the small round link between columns; turns to point down when they stack */
function Link({ children, name }: { children: ReactNode; name: string }) {
  return (
    <span
      role="img"
      aria-label={name}
      className="flex size-10 shrink-0 items-center justify-center self-center rounded-full bg-white text-swag-ink shadow-ledger max-xl:rotate-90"
    >
      {children}
    </span>
  );
}

export default function SystemRail() {
  return (
    <section
      aria-labelledby="system-rail-title"
      className="mx-auto flex w-full min-w-0 flex-col items-center gap-10 px-4 md:gap-12 md:px-[max(var(--spacing-section-x-md),calc((100%_-_var(--container-content))/2))] lg:gap-14"
    >
      <header className="flex flex-col items-center gap-5 text-center text-swag-ink">
        <p className="flex items-center gap-2.5 rounded-full bg-ledger-soft py-1.5 pl-1.5 pr-4">
          <span className="rounded-full bg-swag-ink px-3 py-1 font-sans text-[0.75rem] font-bold leading-4 tracking-[0.0625rem] text-white">
            GEI
          </span>
          <span className="font-sans text-[0.6875rem] font-bold uppercase leading-4 tracking-[0.03125rem] sm:text-[0.75rem] sm:tracking-[0.0625rem]">
            Global Engagement Infrastructure
          </span>
        </p>
        <h2
          id="system-rail-title"
          className="font-display text-display-sm md:text-heading-xl lg:text-section-title"
        >
          The system between your
          <br className="hidden sm:block" /> people and your customers
        </h2>
        <p className="max-w-[51.25rem] font-sans text-body-md text-swag-grey lg:text-[1.25rem] lg:leading-[1.875rem]">
          Every core function got its own system. Engagement never did, until now.
        </p>
      </header>

      <div className="flex w-full flex-col items-center gap-6 xl:flex-row xl:items-start">
        <Column say="runs your people">
          <Logos items={HRIS} />
        </Column>

        <Link name="People data flows in">
          <ArrowRight aria-hidden className="size-[1.125rem]" strokeWidth={2} />
        </Link>

        <Column say="runs engagement">
          <div className="flex items-center gap-2.5">
            <Image
              src="/new-home/system/stadium-mark.svg"
              alt=""
              width={37}
              height={66}
              className="h-[4.5rem] w-auto"
            />
            <p className="font-display text-[2.1875rem] font-bold leading-none tracking-[-0.0125rem] text-swag-ink">Stadium</p>
          </div>
        </Column>

        <Link name="Customer data syncs both ways">
          <ArrowLeftRight aria-hidden className="size-[1.125rem]" strokeWidth={2} />
        </Link>

        <Column say="runs your customers">
          <Logos items={CRM} />
        </Column>
      </div>
    </section>
  );
}
