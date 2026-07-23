/* Stores admin — Figma /swag 2:25303 ("One view of every team's store").
   Centered header + a light skeleton-dashboard mockup (grey placeholder blocks
   in a browser card) representing the admin view. */

const bar = "rounded bg-grey-200";

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

        {/* skeleton dashboard mockup */}
        <div
          data-animation="reveal"
          className="w-full max-w-[54rem] rounded-3xl border border-grey-200 bg-[#fbfbfc] p-5 shadow-[0_1.25rem_2.5rem_-0.75rem_rgba(0,0,0,0.12)] md:p-7"
        >
          {/* top bar */}
          <div className="mb-4 flex items-center justify-between rounded-xl bg-white p-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-12 rounded bg-grey-400" />
              <span className="h-2 w-8 rounded bg-grey-200" />
              <span className="h-2 w-8 rounded bg-grey-200" />
              <span className="h-2 w-8 rounded bg-grey-200" />
            </div>
            <span className="h-6 w-24 rounded-md bg-grey-200" />
          </div>
          {/* body */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_1.6fr]">
            {/* left */}
            <div className="flex flex-col gap-3 rounded-xl bg-white p-4">
              <span className={`h-2 w-16 ${bar}`} />
              <span className="h-24 rounded-lg bg-grey-100" />
              <div className="grid grid-cols-2 gap-3">
                <span className="h-20 rounded-lg bg-grey-100" />
                <span className="h-20 rounded-lg bg-grey-100" />
              </div>
            </div>
            {/* right */}
            <div className="flex flex-col gap-4 rounded-xl bg-white p-4">
              <div className="flex flex-col gap-3">
                <span className={`h-2 w-14 ${bar}`} />
                <div className="grid grid-cols-3 gap-3">
                  <span className="h-9 rounded-lg bg-grey-100" />
                  <span className="h-9 rounded-lg bg-grey-200" />
                  <span className="h-9 rounded-lg bg-grey-100" />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <span className={`h-2 w-14 ${bar}`} />
                <div className="grid grid-cols-3 gap-3">
                  <span className="h-16 rounded-lg bg-grey-200" />
                  <span className="h-16 rounded-lg bg-grey-100" />
                  <span className="h-16 rounded-lg bg-grey-100" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
