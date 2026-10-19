/* Ways to Engage · "solution" (Figma n9SjmDjzB1PeZAYJ5w43fr → 5714:12999).
   Centred header, then two r28 panels side by side (gap 16): a grey "Before
   Stadium" tray and a near-black "On Stadium" tray. Each holds five hairline-
   separated rows: round marker + caps label + one line of copy. */

import Image from "next/image";

const ROWS = [
  {
    label: "Vendors",
    before: "Separate vendor, invoice, and renewal per program",
    on: "Recognition, swag, snacks, gifting, and hosted experiences in one place",
  },
  {
    label: "Fees",
    before: "Platform fee per order",
    on: "No service fee on paid passes",
  },
  {
    label: "Snacks",
    before: "Snack subscription with an annual minimum",
    on: "No annual minimum to send snacks",
  },
  {
    label: "International orders",
    before: "Customs and duties on international orders",
    on: "Local fulfillment, no customs delays or fees",
  },
  {
    label: "Recognition pricing",
    before: "Seat-based recognition fee, used or not",
    on: "Per-user/month pricing for kudos programs",
  },
];

export default function WteSolution() {
  return (
    <section className="bg-white py-16 md:py-20 lg:py-[7.5rem]">
      <div className="mx-auto flex w-full max-w-[90rem] flex-col items-center gap-10 px-section-x-sm md:px-section-x-md lg:gap-14 lg:px-[6.25rem]">
        <div className="flex w-full flex-col items-center gap-[0.875rem] text-center">
          <p
            data-animation="reveal"
            className="font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem] text-[#6b6c71]"
          >
            The solution
          </p>
          <h2
            data-animation="reveal"
            className="max-w-[47.5rem] font-[family-name:var(--font-satoshi)] text-[1.75rem] leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
          >
            What changes when it’s all on Stadium
          </h2>
        </div>

        <div
          data-animation="reveal"
          className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2"
        >
          {/* Before Stadium */}
          <div className="rounded-[1.75rem] bg-[#f2f2f2] px-6 pb-4 pt-8 md:px-8">
            <h3 className="font-[family-name:var(--font-satoshi)] text-[1.625rem] leading-[1.2] text-[#16171b]">
              Before Stadium
            </h3>
            <ul className="list-none">
              {ROWS.map((r) => (
                <li
                  key={r.label}
                  className="flex min-h-[5.75rem] max-w-[31.25rem] items-start gap-[0.875rem] border-t border-[#d9d9d9] py-5"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white">
                    <Image src="/wte/icons/x.svg" alt="" width={12} height={12} className="size-3" />
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col gap-1 leading-[1.4]">
                    <p className="font-sans text-[0.75rem] font-bold uppercase tracking-[0.1rem] text-[#6b6c71]">
                      {r.label}
                    </p>
                    <p className="font-sans text-[1rem] text-[#4f5052]">{r.before}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* On Stadium */}
          <div className="rounded-[1.75rem] bg-[#020912] px-6 pb-4 pt-8 md:px-8">
            <h3 className="font-[family-name:var(--font-satoshi)] text-[1.625rem] leading-[1.2] text-white">
              On Stadium
            </h3>
            <ul className="list-none">
              {ROWS.map((r) => (
                <li
                  key={r.label}
                  className="flex min-h-[5.75rem] max-w-[31.25rem] items-start gap-[0.875rem] border-t border-white/[0.16] py-5"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#00c036]/20">
                    <Image src="/wte/icons/check.svg" alt="" width={12} height={12} className="size-3" />
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col gap-1 leading-[1.4]">
                    <p className="font-sans text-[0.75rem] font-bold uppercase tracking-[0.1rem] text-[#9cc3fa]">
                      {r.label}
                    </p>
                    <p className="font-sans text-[1rem] font-semibold text-white">{r.on}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
