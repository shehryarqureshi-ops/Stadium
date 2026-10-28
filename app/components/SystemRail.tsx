import Image from "next/image";

/* GEI ledger — Figma 7120:10112 ("art · ledger (photo system)"). Announces the term with the
   plainest possible picture: your HRIS logos → the Stadium mark over a strip of five overlapping
   program photos (Recognition, swag, gifting, snack boxes, experiences) → your CRM logos, each over a
   one-line label, joined by two gradient wires. From xl (1280) it's the drawn 1200×320 stage (every
   position is the Figma pixel in rem); below that the three groups stack and the wires are dropped.
   Content edge = the site header's own side padding.
   Logos, the mark and photos are Figma exports in public/new-home/system/ (ledger-*). */

type Logo = { file: string; alt: string; w: number; h: number };

const HRIS: Logo[] = [
  { file: "workday", alt: "Workday", w: 59.22, h: 28 },
  { file: "bamboohr", alt: "BambooHR", w: 150.9, h: 21.41 },
];
const CRM: Logo[] = [
  { file: "salesforce", alt: "Salesforce", w: 40, h: 28 },
  { file: "hubspot", alt: "HubSpot", w: 65.6, h: 19.09 },
];

const PHOTOS = [
  { file: "recognition", alt: "Recognition: a teammate opening a kudos message on their phone" },
  { file: "swag", alt: "Swag: a new hire unboxing branded merch" },
  { file: "gifting", alt: "Gifting: two colleagues sharing a wrapped gift" },
  { file: "snack-boxes", alt: "Snack boxes: a spread of snacks from a Snackmagic box" },
  { file: "experiences", alt: "Experiences: a remote team at a hosted cocktail class" },
];

const svg = (name: string) => `/new-home/system/ledger-${name}.svg`;
const label = "font-display text-core-title text-center text-swag-ink";

function Logos({ logos, gap }: { logos: Logo[]; gap: string }) {
  return (
    <ul className={`flex items-center justify-center ${gap}`}>
      {logos.map((l) => (
        <li key={l.file} className="flex items-center">
          <Image
            src={svg(l.file)}
            alt={l.alt}
            width={Math.round(l.w)}
            height={Math.round(l.h)}
            className="max-w-none"
            style={{ width: `${l.w / 16}rem`, height: `${l.h / 16}rem` }}
          />
        </li>
      ))}
    </ul>
  );
}

/** 72×2 gradient wire with a 9px dot at the end that touches its logo group */
function Wire({ side, className = "" }: { side: "hris" | "crm"; className?: string }) {
  const hris = side === "hris";
  return (
    <div
      aria-hidden
      className={`hidden h-0.5 w-[4.5rem] xl:block ${
        hris ? "bg-gradient-to-r from-ledger-wire-fade to-ledger-wire-hris" : "bg-gradient-to-r from-ledger-wire-crm to-ledger-wire-fade"
      } ${className}`}
    >
      <span
        className={`absolute top-1/2 size-[0.5625rem] -translate-y-1/2 rounded-full ${
          hris ? "right-0 bg-ledger-wire-hris" : "left-0 bg-ledger-wire-crm"
        }`}
      />
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

      {/* stage: stacked below xl, the drawn 1200×320 canvas from xl */}
      <div className="relative flex w-full flex-col items-center gap-12 xl:mx-auto xl:block xl:h-[20rem] xl:w-[75rem]">
        {/* HRIS — logos centred on y134 (row top 120), label at y290 */}
        <div className="flex flex-col items-center gap-6 xl:absolute xl:left-0 xl:top-[7.5rem] xl:w-[15.3125rem] xl:gap-[8.875rem]">
          <Logos logos={HRIS} gap="gap-[1.4925rem]" />
          <p className={label}>HRIS runs your people</p>
        </div>

        <Wire side="hris" className="xl:absolute xl:left-[16.75rem] xl:top-[8.3125rem]" />

        {/* GEI — mark, overlapping photo strip, caption, label */}
        <div className="flex w-full flex-col items-center xl:absolute xl:left-[22.5rem] xl:top-0 xl:w-[30rem]">
          <span className="flex pr-[0.3031rem]">
            <Image src={svg("mark")} alt="" width={23} height={40} className="h-10 w-[1.4131rem]" />
          </span>
          <ul className="mt-6 flex w-full max-w-[30rem] items-start">
            {PHOTOS.map((p) => (
              <li
                key={p.file}
                className="relative aspect-[112/140] w-[23.33%] shrink-0 overflow-hidden rounded-2xl border-4 border-white bg-ledger-soft [&:not(:first-child)]:-ml-[4.17%]"
              >
                <Image
                  src={`/new-home/system/ledger-photo-${p.file}.webp`}
                  alt={p.alt}
                  fill
                  sizes="7rem"
                  className="object-cover"
                />
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center font-sans text-body-md text-ledger-caption">
            Recognition, swag, gifting, snack boxes and experiences.
          </p>
          <p className={`${label} mt-5 xl:mt-[2.375rem]`}>GEI runs engagement</p>
        </div>

        <Wire side="crm" className="xl:absolute xl:left-[53.75rem] xl:top-[8.3125rem]" />

        {/* CRM */}
        <div className="flex flex-col items-center gap-6 xl:absolute xl:left-[54.8125rem] xl:top-[7.5rem] xl:w-[17.625rem] xl:gap-[8.875rem]">
          <Logos logos={CRM} gap="gap-[1.1136rem]" />
          <p className={label}>CRM runs your customers</p>
        </div>
      </div>
    </section>
  );
}
