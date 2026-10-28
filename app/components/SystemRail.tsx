import Image from "next/image";

/* GEI ledger — Figma 7120:10112 ("5 · GEI Ledger"). Announces the term with the plainest possible
   picture: your HRIS logos → the Stadium mark (GEI) → your CRM logos, each over a one-line label, joined
   by two gradient connectors. From xl (1280) it's the drawn row; below that the three columns stack
   and the connectors are dropped. Content edge = the site header's own side padding.
   Logos, connectors and the mark are Figma exports in public/new-home/system/ (ledger-*.svg). */

type Logo = { file: string; alt: string; w: number; h: number };

const HRIS: Logo[] = [
  { file: "workday", alt: "Workday", w: 71.91, h: 34 },
  { file: "bamboohr", alt: "BambooHR", w: 183.24, h: 26 },
];
const CRM: Logo[] = [
  { file: "salesforce", alt: "Salesforce", w: 62.86, h: 44 },
  { file: "hubspot", alt: "HubSpot", w: 103.09, h: 30 },
];

const asset = (name: string) => `/new-home/system/ledger-${name}.svg`;
const label = "font-display text-core-title text-center text-swag-ink";

function Logos({ logos, gap, className = "" }: { logos: Logo[]; gap: string; className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center justify-center ${gap} ${className}`}>
      {logos.map((l) => (
        <li key={l.file} className="flex items-center">
          <Image
            src={asset(l.file)}
            alt={l.alt}
            width={Math.round(l.w)}
            height={l.h}
            className="max-w-none"
            style={{ width: `${l.w / 16}rem`, height: `${l.h / 16}rem` }}
          />
        </li>
      ))}
    </ul>
  );
}

export default function SystemRail() {
  return (
    <section
      aria-labelledby="system-rail-title"
      className="mx-auto flex w-full min-w-0 flex-col items-center gap-10 px-4 md:gap-12 md:px-[max(var(--spacing-section-x-md),calc((100%_-_var(--container-content))/2))] lg:gap-14"
    >
      <header className="flex flex-col items-center gap-5 text-center text-swag-ink">
        <p className="font-sans text-[0.75rem] font-bold uppercase leading-4 tracking-[0.0625rem]">
          Global Engagement Infrastructure
        </p>
        <h2
          id="system-rail-title"
          className="max-w-[43.75rem] font-display text-display-sm md:text-heading-xl lg:text-section-title"
        >
          The system between your people and your customers.
        </h2>
        <p className="max-w-[38.75rem] font-sans text-body-lg text-swag-grey">
          Every core function got its own system. Engagement never did, until now.
        </p>
      </header>

      <div className="flex w-full flex-col items-center gap-12 xl:flex-row xl:justify-center xl:gap-0">
        <div className="flex min-w-0 flex-col items-center gap-8 xl:h-[8.125rem] xl:flex-1 xl:justify-between xl:gap-0">
          {/* Figma: the HRIS row is full-width and left-aligned; the CRM pair is centred */}
          <Logos logos={HRIS} gap="gap-[1.8125rem]" className="xl:w-full xl:justify-start" />
          <p className={label}>HRIS runs your people</p>
        </div>

        <Image
          src={asset("link-left")}
          alt=""
          width={160}
          height={10}
          className="hidden h-[0.625rem] w-40 shrink-0 xl:block"
        />

        <div className="flex min-w-0 flex-col items-center gap-4 xl:flex-1">
          <span className="flex pr-[0.6363rem]">
            <Image src={asset("mark")} alt="" width={48} height={84} className="h-[5.25rem] w-[2.9673rem]" />
          </span>
          <p className={label}>GEI runs engagement</p>
        </div>

        <Image
          src={asset("link-right")}
          alt=""
          width={160}
          height={10}
          className="hidden h-[0.625rem] w-40 shrink-0 xl:block"
        />

        <div className="flex min-w-0 flex-col items-center gap-8 xl:h-[8.125rem] xl:flex-1 xl:justify-between xl:gap-0">
          <Logos logos={CRM} gap="gap-7" />
          <p className={label}>CRM runs your customers</p>
        </div>
      </div>
    </section>
  );
}
