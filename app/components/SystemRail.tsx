import { ArrowLeftRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

/* GEI ledger — Figma 7058:27528 ("GEI · Ledger (final, auto-layout)"). It announces the term:
   a GEI badge + the "every core function got its own system" line, then people (HRIS) → GEI ↔
   customers (CRM) as three cards, each system row naming the data it contributes, the five
   programs on the GEI card, and a closing line — HRIS runs your people · GEI runs engagement ·
   CRM runs your customers. From xl (1280) it's the drawn row; below that the cards stack and the Lucide
   arrows turn to point down. Content edge = the site header's own side padding.
   Logos + the Stadium mark are Figma exports in public/new-home/system/. */

const PROGRAMS = ["Recognition", "Swag", "Gifting", "Snack Boxes", "Hosted Experiences"];

type Source = { logo: string; alt: string; w: number; h: number; tag: string };
const PEOPLE: Source[] = [
  { logo: "workday", alt: "Workday", w: 47, h: 22, tag: "Hires" },
  { logo: "bamboohr", alt: "BambooHR", w: 100, h: 14, tag: "Birthdays" },
  { logo: "rippling", alt: "Rippling", w: 100, h: 14, tag: "Anniversaries" },
];
const CUSTOMERS: Source[] = [
  { logo: "salesforce", alt: "Salesforce", w: 31, h: 22, tag: "Deals closed" },
  { logo: "hubspot", alt: "HubSpot", w: 76, h: 22, tag: "New contacts" },
];

const card = "flex min-w-0 flex-col rounded-core bg-white p-6 shadow-ledger";
const label = "font-sans text-ledger-label font-bold uppercase tracking-[0.0625rem] text-swag-grey";

function Row({ s }: { s: Source }) {
  return (
    <li className="flex h-16 items-center justify-between rounded-[1.125rem] bg-ledger-soft pl-[1.125rem] pr-3.5">
      <Image
        src={`/new-home/system/${s.logo}.svg`}
        alt={s.alt}
        width={s.w}
        height={s.h}
        className="w-auto max-w-none"
        style={{ height: `${s.h / 16}rem` }}
      />
      <span className="rounded-full border border-ledger-line bg-white px-3 py-1.5 font-sans text-[0.75rem] font-semibold leading-4 text-swag-ink">
        {s.tag}
      </span>
    </li>
  );
}

/* the small round link between cards; turns to point down when the cards stack */
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

function Cell({ tag, say, hero = false }: { tag: string; say: string; hero?: boolean }) {
  return (
    <div
      className={`flex h-[4.75rem] items-center gap-3.5 rounded-job-card px-6 ${
        hero ? "bg-swag-ink text-white" : "bg-white text-swag-ink shadow-ledger"
      }`}
    >
      <span className="rounded-full bg-ledger-soft px-3 py-2.5 font-sans text-[0.75rem] font-bold leading-4 tracking-[0.0625rem] text-swag-ink">
        {tag}
      </span>
      <span className="font-display text-ledger-cell">{say}</span>
    </div>
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
          <br className="hidden sm:block" /> people and your customers.
        </h2>
        <p className="max-w-[51.25rem] font-sans text-body-md text-swag-grey lg:text-[1.25rem] lg:leading-[1.875rem]">
          Every core function got its own system. Engagement never did, until now.
        </p>
      </header>

      <div className="flex w-full flex-col gap-5 xl:flex-row xl:items-stretch">
        <div className={`${card} gap-3 xl:flex-1`}>
          <p className={label}>Your people · HRIS</p>
          <ul className="flex flex-col gap-3">
            {PEOPLE.map((s) => (
              <Row key={s.logo} s={s} />
            ))}
          </ul>
        </div>

        <Link name="People data flows in">
          <ArrowRight aria-hidden className="size-[1.125rem]" strokeWidth={2} />
        </Link>

        <div className={`${card} items-center justify-between gap-6 xl:flex-1`}>
          <p className={label}>Your engagement · GEI</p>
          <div className="flex flex-col items-center gap-1.5">
            <span className="flex pr-2">
              <Image
                src="/new-home/system/stadium-mark.svg"
                alt=""
                width={37}
                height={66}
                className="h-[4.125rem] w-auto"
              />
            </span>
            <p className="font-display text-core-title text-swag-ink">Stadium</p>
          </div>
          <ul className="flex flex-wrap justify-center gap-2 pt-2.5">
            {PROGRAMS.map((p) => (
              <li
                key={p}
                className="rounded-full bg-ledger-soft px-3.5 py-[0.4375rem] font-sans text-[0.8125rem] font-semibold leading-[1.125rem] text-swag-ink"
              >
                {p}
              </li>
            ))}
          </ul>
        </div>

        <Link name="Customer data syncs both ways">
          <ArrowLeftRight aria-hidden className="size-[1.125rem]" strokeWidth={2} />
        </Link>

        <div className={`${card} gap-3 xl:flex-1`}>
          <p className={label}>Your customers · CRM</p>
          <ul className="flex flex-col gap-3">
            {CUSTOMERS.map((s) => (
              <Row key={s.logo} s={s} />
            ))}
            <li className="flex h-16 items-center justify-center rounded-[1.125rem] border border-dashed border-ledger-line font-sans text-[0.8125rem] leading-5 text-swag-grey">
              + your CRM or HRIS
            </li>
          </ul>
        </div>
      </div>

      <div className="grid w-full gap-4 lg:grid-cols-3">
        <Cell tag="HRIS" say="runs your people" />
        <Cell tag="GEI" say="runs engagement" hero />
        <Cell tag="CRM" say="runs your customers" />
      </div>
    </section>
  );
}
