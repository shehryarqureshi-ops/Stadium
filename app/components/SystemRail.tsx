import { Handshake, MoveRight, User } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

/* GEI diagram — "HRIS / GEI / CRM" (Figma 7505:33056). Header (eyebrow · headline · one-liner), then
   three cards: HRIS (people) → GEI (engagement) ← CRM (customers). HRIS and CRM are flat white cards (no
   shadow), GEI is the lifted centre card with the Stadium symbol and the five programs. A soft rotated,
   blurred symbol glow sits behind the row. From xl (1280) it is the drawn 1106×366 row; below that the
   cards stack and the arrows turn to point down. Layout in rem (Figma px ÷ 16). */

const HRIS_TAGS = ["Payroll", "Benefits", "Org data"];
const CRM_TAGS = ["Deals", "Pipeline", "Accounts"];
const PROGRAMS = ["Recognition", "Swag", "Gifting", "Snack Boxes", "Hosted Experiences"];

function CardTop({ eyebrow, name }: { eyebrow: string; name: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 whitespace-nowrap">
      <p className="font-sans text-[0.75rem] font-bold uppercase leading-4 tracking-[0.0625rem] text-swag-grey">
        {eyebrow}
      </p>
      <p className="font-display text-[1.5rem] leading-[1.875rem] tracking-[-0.01875rem] text-swag-ink">
        {name}
      </p>
    </div>
  );
}

/* a muted side card (HRIS / CRM) */
function SideCard({
  eyebrow,
  name,
  icon,
  tags,
}: {
  eyebrow: string;
  name: string;
  icon: ReactNode;
  tags: string[];
}) {
  return (
    <div className="relative z-10 flex w-full max-w-[22.5rem] flex-col items-center justify-center gap-6 rounded-2xl bg-white px-8 py-10 xl:w-[16.875rem]">
      <CardTop eyebrow={eyebrow} name={name} />
      <div className="flex size-[4.5rem] items-center justify-center rounded-[1.25rem] bg-white shadow-gei-card">
        {icon}
      </div>
      <ul className="flex w-full flex-wrap items-start justify-center gap-2">
        {tags.map((t) => (
          <li
            key={t}
            className="rounded-full border border-ledger-soft bg-white px-3 py-1.5 font-sans text-[0.75rem] font-semibold leading-4 text-swag-ink"
          >
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* the round arrow between cards; points down when the cards stack */
function Connector({ name, flip = false }: { name: string; flip?: boolean }) {
  return (
    <span
      role="img"
      aria-label={name}
      className="relative z-10 flex size-[3.9375rem] shrink-0 items-center justify-center rounded-[1.25rem] gei-arrow-shadow max-xl:rotate-90"
    >
      <MoveRight
        aria-hidden
        className={`size-8 text-black ${flip ? "rotate-180" : ""}`}
        strokeWidth={2}
      />
    </span>
  );
}

export default function SystemRail() {
  return (
    <section
      aria-labelledby="system-rail-title"
      className="mx-auto flex w-full min-w-0 flex-col items-center gap-10 overflow-x-clip px-4 md:gap-12 md:px-[max(var(--spacing-section-x-md),calc((100%_-_var(--container-content))/2))] lg:gap-14"
    >
      <header className="flex w-full max-w-[56.25rem] flex-col items-center gap-5 text-center text-swag-ink">
        <p className="font-sans text-[0.75rem] font-bold uppercase leading-4 tracking-[0.0625rem]">
          Global Engagement Infrastructure
        </p>
        <h2
          id="system-rail-title"
          className="font-display text-display-sm md:text-heading-xl lg:text-section-title"
        >
          The system between your people and your customers.
        </h2>
        <p className="font-sans text-body-md text-swag-grey lg:text-[1.125rem] lg:leading-7 lg:tracking-[0.015625rem]">
          HRIS runs your people. CRM runs your customers. GEI runs every way you engage them, in one place.
        </p>
      </header>

      <div className="relative flex w-full flex-col items-center gap-5 xl:w-auto xl:flex-row">
        {/* soft blurred Stadium-symbol glow behind the row (rotated 90°, centred) */}
        <Image
          src="/new-home/system/gei-glow.svg"
          alt=""
          aria-hidden
          width={1098}
          height={1327}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[82.9375rem] w-[68.625rem] max-w-none -translate-x-1/2 -translate-y-1/2 rotate-90 select-none max-xl:scale-50"
        />

        <SideCard
          eyebrow="people"
          name="HRIS"
          tags={HRIS_TAGS}
          icon={<User aria-hidden className="size-8 text-black" strokeWidth={2} />}
        />

        <Connector name="People data flows in" />

        <div className="relative z-10 flex w-full max-w-[22.5rem] flex-col items-center justify-between gap-8 rounded-[1.25rem] bg-white px-8 py-10 shadow-gei-card xl:h-[22.875rem] xl:w-[22.5rem] xl:gap-0">
          <CardTop eyebrow="engagement" name="GEI" />
          <div className="flex size-[6.5rem] items-center justify-center rounded-[1.25rem] bg-white pr-1.5 shadow-ledger">
            <Image
              src="/new-home/system/gei-mark.svg"
              alt="Stadium"
              width={29}
              height={51}
              className="h-[3.208rem] w-auto max-w-none"
            />
          </div>
          <ul className="flex w-full flex-wrap items-start justify-center gap-2">
            {PROGRAMS.map((p) => (
              <li
                key={p}
                className="rounded-full bg-tray px-3.5 py-2 font-sans text-[0.875rem] font-semibold leading-5 text-swag-ink"
              >
                {p}
              </li>
            ))}
          </ul>
        </div>

        <Connector name="Customer data flows in" flip />

        <SideCard
          eyebrow="customers"
          name="CRM"
          tags={CRM_TAGS}
          icon={<Handshake aria-hidden className="size-8 text-black" strokeWidth={2} />}
        />
      </div>
    </section>
  );
}
