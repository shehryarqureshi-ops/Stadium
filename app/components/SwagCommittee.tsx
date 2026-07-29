/* Committee — Figma /swag 2:25312 ("Get every stakeholder on board"). A white
   section with a centered header and a #f2f2f2 tray holding a 2×2 grid of white
   stakeholder cards (floating photo + role + one-line pitch). */

export type SwagCommitteeContent = {
  eyebrow: string;
  heading: string;
  body: string;
  cards: {
    img: string;
    title: string;
    desc: string;
  }[];
};

export const SWAG_COMMITTEE: SwagCommitteeContent = {
  eyebrow: "BUILT FOR SIGN-OFF",
  heading: "Get every stakeholder on board",
  body: "Every team has different priorities with swag. Here’s what each one needs to sign off with confidence.",
  cards: [
    {
      img: "/swag/swag-committee-2.jpg",
      title: "Marketing & Brand",
      desc: "Every branded moment — stores, kits, events, hiring — on-brand and at scale.",
    },
    {
      img: "/swag/swag-committee-1.jpg",
      title: "HR & People Ops",
      desc: "New-hire kits and milestone swag run themselves. Marketing touches zero orders.",
    },
    {
      img: "/swag/swag-committee-4.jpg",
      title: "Procurement & Finance",
      desc: "One vendor. One PO. Budgets and per-team wallets you control.",
    },
    {
      img: "/swag/committee-it.jpg",
      title: "IT & Security",
      desc: "SSO, SCIM, and SOC 2 out of the box. Nothing breaks identity or audit.",
    },
  ],
};

export default function SwagCommittee({
  content = SWAG_COMMITTEE,
}: {
  content?: SwagCommitteeContent;
}) {
  return (
    <section className="bg-white px-section-x-sm py-20 md:px-section-x-md md:py-24 lg:px-section-x-lg lg:py-28">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-10">
        <div className="flex max-w-[42rem] flex-col items-center gap-5 text-center">
          <div className="flex flex-col items-center gap-2">
            <p
              data-animation="reveal"
              className="font-sans text-[0.75rem] font-semibold uppercase tracking-[0.045rem] text-swag-green-alt"
            >
              {content.eyebrow}
            </p>
            <h2
              data-animation="reveal"
              className="font-display text-[1.75rem] leading-[1.08] tracking-[-0.03125rem] text-swag-ink md:text-[2.25rem] lg:text-[2.75rem]"
            >
              {content.heading}
            </h2>
          </div>
          <p
            data-animation="reveal"
            className="font-sans text-body-md leading-[1.45] text-[#707075] lg:text-[1.125rem]"
          >
            {content.body}
          </p>
        </div>

        {/* grey tray */}
        <div
          data-animation="reveal"
          className="grid w-full max-w-[55rem] grid-cols-1 gap-4 rounded-[2rem] bg-[#f2f2f2] p-4 sm:grid-cols-2"
        >
          {content.cards.map((c) => (
            <article
              key={c.title}
              className="flex flex-col overflow-hidden rounded-3xl bg-white p-2 shadow-[0_0.1875rem_0.375rem_rgba(0,0,0,0.06)]"
            >
              <div className="w-full overflow-hidden rounded-b-3xl rounded-t-lg shadow-[0_1.25rem_0.625rem_-0.25rem_rgba(0,0,0,0.15)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.img}
                  alt={c.title}
                  className="aspect-[400/260] w-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-4 px-8 pb-8 pt-10">
                <h3 className="font-display text-[1.5625rem] leading-[1.04] tracking-[-0.01875rem] text-swag-ink">
                  {c.title}
                </h3>
                <p className="font-sans text-[0.9375rem] leading-[1.5] text-swag-grey">
                  {c.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
