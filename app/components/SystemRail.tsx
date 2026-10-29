import { ArrowLeftRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

/* GEI ledger — Figma 7106:14044 (same cards as 7075:29712 (HRIS/CRM cards 7075:29721 / 7075:29802: row→chips gap 55, tag pill 29 tall; was 7058:27528). It announces the term:
   a GEI badge + the "every core function got its own system" line, then people (HRIS) → GEI ↔
   customers (CRM) as three cards, each system row naming the data it contributes, the five
   programs on the GEI card, and a closing line — HRIS runs your people · GEI runs engagement ·
   CRM runs your customers. From xl (1280) it's the drawn row; below that the cards stack and the Lucide
   arrows turn to point down. Content edge = the site header's own side padding.
   Logos + the Stadium mark are Figma exports in public/new-home/system/. */

const PROGRAMS = ["Recognition", "Swag", "Gifting", "Snack Boxes", "Hosted Experiences"];

type Logo = { logo: string; alt: string; w: number; h: number };
const HRIS = {
  logos: [
    { logo: "workday", alt: "Workday", w: 47, h: 22 },
    { logo: "bamboohr", alt: "BambooHR", w: 100, h: 14 },
  ] satisfies Logo[],
  pill: "Your HRIS",
  tags: ["Hires", "Birthdays", "Anniversaries", "Promotions", "Retirements"],
};
const CRM = {
  logos: [
    { logo: "salesforce", alt: "Salesforce", w: 31, h: 22 },
    { logo: "hubspot", alt: "HubSpot", w: 76, h: 22 },
  ] satisfies Logo[],
  pill: "Your CRM",
  tags: ["Deals closed", "New contacts", "Renewals", "Referrals", "Customer milestones"],
};

const card = "flex min-w-0 flex-col items-center rounded-core bg-white p-6 shadow-[0_0.1875rem_0.375rem_0_rgba(0,0,0,0.06),0_1rem_2.25rem_-0.625rem_rgba(0,0,0,0.05)]";
const label = "font-sans text-ledger-label font-bold uppercase tracking-[0.0625rem] text-swag-grey";

/* card eyebrow — "Name · SYSTEM", with room after the separator dot */
function Eyebrow({ text }: { text: string }) {
  const [name, system] = text.split(" · ");
  return (
    <>
      {name} <span aria-hidden>·</span>
      <span className="ml-1.5">{system}</span>
    </>
  );
}

/* one source system: its logos beside a dashed "your …" pill, then the events it feeds in */
function Source({ title, data }: { title: string; data: typeof HRIS }) {
  return (
    <div className={`${card} gap-[2.8125rem] xl:min-h-[16.25rem] xl:flex-1 xl:self-center`}>
      <p className={label}>
        <Eyebrow text={title} />
      </p>
      <div className="flex flex-col items-center gap-[3.4375rem]">
        <ul className="flex flex-wrap items-center justify-center gap-6">
          {data.logos.map((l) => (
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
          <li className="flex h-[1.8125rem] items-center rounded-full border border-dashed border-ledger-line px-4 font-sans text-[0.625rem] font-bold uppercase leading-3 tracking-[0.0625rem] text-swag-grey">
            {data.pill}
          </li>
        </ul>
        <ul className="flex flex-wrap justify-center gap-2">
          {data.tags.map((t) => (
            <li
              key={t}
              className="rounded-full border border-ledger-line bg-white px-3 py-1.5 font-sans text-[0.75rem] font-semibold leading-4 text-swag-ink"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
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
          <br className="hidden sm:block" /> people and your customers
        </h2>
        <p className="max-w-[51.25rem] font-sans text-body-md text-swag-grey lg:text-[1.25rem] lg:leading-[1.875rem]">
          Every core function got its own system. Engagement never did, until now.
        </p>
      </header>

      <div className="flex w-full flex-col gap-5 xl:flex-row xl:items-stretch">
        <Source title="Your people · HRIS" data={HRIS} />

        <Link name="People data flows in">
          <ArrowRight aria-hidden className="size-[1.125rem]" strokeWidth={2} />
        </Link>

        <div className={`${card} justify-center gap-[2.8125rem] xl:min-h-[21.1875rem] xl:flex-1`}>
          <p className={label}>
            <Eyebrow text="Your engagement · GEI" />
          </p>
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
          <ul className="flex flex-wrap justify-center gap-2">
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

        <Source title="Your customers · CRM" data={CRM} />
      </div>

      <div className="grid w-full gap-4 lg:grid-cols-3">
        <Cell tag="HRIS" say="runs your people" />
        <Cell tag="GEI" say="runs engagement" hero />
        <Cell tag="CRM" say="runs your customers" />
      </div>
    </section>
  );
}
