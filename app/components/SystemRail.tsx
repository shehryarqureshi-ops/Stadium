import Image from "next/image";
import type { ReactNode } from "react";

/* "The system between your people and your customers." — Figma 6912:12325
   (B2 · system rail). HRIS → Stadium core ↔ CRM across the tray, programs out
   below. From `wide` (1300) it's the drawn horizontal rail; below that the same
   pieces stack and the sideways arrows turn to point down. Tablet / mobile
   frames weren't drawn. Arrows + logos are Figma exports in
   public/new-home/system/. */

const PROGRAMS = ["Recognition", "Swag", "Gifting", "Snack Boxes", "Hosted Experiences"];

/** 46px lucide arrow; sideways on the wide rail, pointing down when stacked
    (`down` forces down at every width — the core → programs arrow). */
function Arrow({ src, down = false }: { src: string; down?: boolean }) {
  return (
    <Image
      src={src}
      alt=""
      width={46}
      height={46}
      className={`h-[2.875rem] w-[2.875rem] ${down ? "rotate-90" : "max-wide:rotate-90"}`}
    />
  );
}

function Node({
  className = "",
  eyebrow,
  title,
  children,
}: {
  className?: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`flex w-full max-w-72 flex-col items-center justify-center gap-9 overflow-hidden rounded-node bg-node py-6 shadow-node wide:max-w-none ${className}`}
    >
      <div className="flex flex-col items-center gap-1 whitespace-nowrap">
        <p className="font-sans text-rail-label font-bold tracking-[0.0625rem] text-swag-grey">{eyebrow}</p>
        <p className="font-display text-node-title text-swag-ink">{title}</p>
      </div>
      {children}
    </div>
  );
}

/** a logo at its Figma height; `w-auto` keeps the SVG's own aspect */
function Logo({ src, alt, w, h, size }: { src: string; alt: string; w: number; h: number; size: string }) {
  return <Image src={src} alt={alt} width={w} height={h} className={`${size} w-auto max-w-none shrink-0`} />;
}

export default function SystemRail() {
  return (
    <section
      aria-labelledby="system-rail-title"
      className="mx-auto flex w-full max-w-section flex-col items-center gap-10 px-section-x-sm md:gap-12 md:px-section-x-md lg:gap-14 lg:px-section-x-lg"
    >
      <header className="flex flex-col items-center gap-5 text-center text-swag-ink">
        <p className="font-sans text-[0.75rem] font-bold uppercase leading-4 tracking-[0.0625rem]">
          Global engagement infrastructure
        </p>
        <h2
          id="system-rail-title"
          className="font-display text-display-sm md:text-heading-xl lg:text-section-title"
        >
          The system between your
          <br className="hidden sm:block" /> people and your customers.
        </h2>
      </header>

      <div className="flex w-full max-w-rail-tray flex-col items-center gap-6 rounded-tray bg-tray px-4 py-8 md:p-10 wide:-mx-5 wide:grid wide:w-[calc(100%+2.5rem)] wide:grid-cols-[15rem_8.75rem_minmax(0,1fr)_8.75rem_15rem] wide:items-center wide:gap-x-3.5 wide:gap-y-10 min-[90rem]:p-15">
        {/* HRIS */}
        <Node eyebrow="HRIS" title="Your people" className="wide:col-start-1 wide:row-start-1">
          <div className="relative flex w-full items-center justify-center gap-6 overflow-hidden">
            <Logo src="/new-home/system/workday.svg" alt="Workday" w={47} h={22} size="h-[1.375rem]" />
            <Logo src="/new-home/system/bamboohr.svg" alt="BambooHR" w={99} h={14} size="h-3.5" />
            <Logo src="/new-home/system/rippling.svg" alt="Rippling" w={99} h={14} size="h-3.5" />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-[4.75rem] bg-gradient-to-r from-node to-transparent"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 w-[4.75rem] bg-gradient-to-l from-node to-transparent"
            />
          </div>
        </Node>

        {/* people data in */}
        <div className="flex flex-col items-center gap-[0.4375rem] wide:col-start-2 wide:row-start-1">
          <p className="font-sans text-rail-label font-bold tracking-[0.0625rem] text-swag-grey">PEOPLE DATA IN</p>
          <Arrow src="/new-home/system/arrow-right.svg" />
        </div>

        {/* Stadium core */}
        <div className="flex w-full max-w-72 flex-col items-center justify-center gap-3 rounded-core border border-node-hairline bg-white px-10 py-7 shadow-node wide:col-start-3 wide:row-start-1 wide:h-[15.375rem] wide:max-w-none">
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center rounded-[1.6667rem] bg-white pr-[0.5625rem]">
              <Image
                src="/new-home/system/stadium-mark.svg"
                alt=""
                width={33}
                height={59}
                className="h-[3.6667rem] w-auto"
              />
            </div>
            <p className="font-sans text-rail-label font-bold tracking-[0.0625rem] text-swag-grey">STADIUM</p>
          </div>
          <p className="whitespace-nowrap font-display text-core-title text-swag-ink">Your engagement</p>
        </div>

        {/* programs out: arrow + chips (a full-width row under the rail on wide) */}
        <div className="flex flex-col items-center gap-10 wide:col-span-5 wide:row-start-2">
          <Arrow src="/new-home/system/arrow-right.svg" down />
          <ul className="flex flex-wrap justify-center gap-2">
            {PROGRAMS.map((p) => (
              <li
                key={p}
                className="rounded-full bg-white px-4 py-[0.5625rem] font-sans text-[0.875rem] font-semibold leading-5 text-swag-ink"
              >
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* customer data synced */}
        <div className="flex flex-col items-center gap-[0.4375rem] wide:col-start-4 wide:row-start-1">
          <p className="font-sans text-rail-label font-bold tracking-[0.0625rem] text-swag-grey">CUSTOMER DATA</p>
          <Arrow src="/new-home/system/arrow-both.svg" />
        </div>

        {/* CRM */}
        <Node eyebrow="CRM" title="Your customers" className="wide:col-start-5 wide:row-start-1">
          <div className="flex items-center justify-center gap-3.5">
            <Logo src="/new-home/system/salesforce.svg" alt="Salesforce" w={29} h={20} size="h-[1.2759rem]" />
            <Logo src="/new-home/system/hubspot.svg" alt="HubSpot" w={69} h={20} size="h-5" />
          </div>
        </Node>
      </div>
    </section>
  );
}
