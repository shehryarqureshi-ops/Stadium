/* Stores admin — Figma /swag 2:25303 ("One view of every team's store").
   Centered header + the real Figma dashboard mockup (public/swag/admin-view.png,
   1199×767 — the "Stadium Gift Shop" admin view exported from node 426:7188). */

import Image from "next/image";
import adminView from "@/public/swag/admin-view.png";

export default function SwagAdminView() {
  return (
    <section className="bg-white px-section-x-sm pb-16 pt-20 md:px-section-x-md md:pb-20 md:pt-24 lg:px-section-x-lg lg:pb-24 lg:pt-28">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-10">
        <div className="flex max-w-[47.5rem] flex-col items-center gap-5 text-center">
          <div className="flex flex-col items-center gap-2">
            <p
              data-animation="reveal"
              className="font-sans text-eyebrow-sm font-bold uppercase tracking-[0.1rem] text-swag-green-deep md:text-eyebrow-md"
            >
              THE ADMIN VIEW
            </p>
            <h2
              data-animation="reveal"
              className="font-display text-[1.75rem] leading-[1.08] tracking-[-0.03125rem] text-swag-ink md:text-[2.25rem] lg:text-[2.75rem]"
            >
              One view of every team&rsquo;s store
            </h2>
          </div>
          <p
            data-animation="reveal"
            className="font-sans text-body-md text-swag-grey lg:text-[1.125rem] lg:leading-[1.45]"
          >
            Stores by team, live order counts, and per-team budgets, backed by a
            permission model Procurement signs off on.
          </p>
        </div>

        {/* real Figma dashboard mockup */}
        <div
          data-animation="reveal"
          className="w-full max-w-[54rem] overflow-hidden rounded-3xl border border-grey-200 bg-white shadow-[0_1.25rem_2.5rem_-0.75rem_rgba(0,0,0,0.12)]"
        >
          <Image
            src={adminView}
            alt="Stadium admin dashboard: a branded team store with live status, tabs, and swag designs"
            sizes="(min-width: 1024px) 54rem, 92vw"
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
