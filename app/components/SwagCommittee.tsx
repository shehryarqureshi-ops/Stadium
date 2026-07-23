/* Committee — Figma /swag 2:25312 ("Get every stakeholder on board"). A rounded
   dark-green gradient card with a centered header and a 2×2 grid of white
   stakeholder cards (photo + role + one-line pitch). */

const CARDS = [
  {
    img: "/swag/swag-committee-1.jpg",
    title: "Marketing & Brand",
    desc: "Every branded moment — stores, kits, events, hiring — on-brand and at scale.",
  },
  {
    img: "/swag/swag-committee-2.jpg",
    title: "HR & People Ops",
    desc: "New-hire kits and milestone swag run themselves. Marketing touches zero orders.",
  },
  {
    img: "/swag/swag-committee-3.jpg",
    title: "Procurement & Finance",
    desc: "One vendor. One PO. Budgets and per-team wallets you control.",
  },
  {
    img: "/swag/swag-committee-4.jpg",
    title: "IT & Security",
    desc: "SSO, SCIM, and SOC 2 out of the box. Nothing breaks identity or audit.",
  },
];

export default function SwagCommittee() {
  return (
    <section className="bg-white px-section-x-sm py-3 md:px-section-x-md lg:px-section-x-lg">
      <div className="relative mx-auto flex max-w-content flex-col items-center gap-10 overflow-hidden rounded-[3rem] bg-[radial-gradient(90%_120%_at_100%_-10%,#0d4531_0%,transparent_55%),radial-gradient(95%_110%_at_-10%_115%,#1d6b5b_0%,transparent_58%),linear-gradient(155deg,#07291d_0%,#03130d_55%,#062b21_100%)] px-6 py-16 md:rounded-[3.75rem] md:px-16 md:py-20 lg:px-24 lg:py-24">
        <div className="flex max-w-[42rem] flex-col items-center gap-5 text-center">
          <div className="flex flex-col items-center gap-2">
            <p
              data-animation="reveal"
              className="font-sans text-eyebrow-sm font-bold uppercase tracking-[0.1rem] text-swag-mint md:text-eyebrow-md"
            >
              BUILT FOR SIGN-OFF
            </p>
            <h2
              data-animation="reveal"
              className="font-display text-[1.75rem] leading-[1.08] tracking-[-0.03125rem] text-white md:text-[2.25rem] lg:text-[2.75rem]"
            >
              Get every stakeholder on board
            </h2>
          </div>
          <p
            data-animation="reveal"
            className="font-sans text-body-md text-[#e8f0ec] lg:text-[1.125rem] lg:leading-[1.45]"
          >
            Every team has different priorities with swag. Here&rsquo;s what each
            one needs to sign off with confidence.
          </p>
        </div>

        <div
          data-animation="reveal"
          className="grid w-full max-w-[54.5rem] grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {CARDS.map((c) => (
            <article
              key={c.title}
              className="flex flex-col overflow-hidden rounded-2xl bg-white p-2 shadow-[0_1.25rem_2.5rem_-1rem_rgba(0,0,0,0.4)]"
            >
              <div className="overflow-hidden rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.img}
                  alt={c.title}
                  className="aspect-[409/260] w-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-2 px-5 pb-6 pt-5">
                <h3 className="font-display text-[1.375rem] text-swag-ink">
                  {c.title}
                </h3>
                <p className="font-sans text-body-md leading-[1.5] text-swag-grey">
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
