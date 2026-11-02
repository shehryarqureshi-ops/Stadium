// Coded from Figma "graphic · default · 03 Work Within Budget" (4522:10552).
import Image from "next/image";

import avatar from "@/public/wallets-and-budgets/avatar-sofia.webp";
import { cq, type } from "./cq";

export default function StepBudget() {
  return (
    <div
      role="img"
      aria-label="An employee's budget showing 320 dollars left of 500, with an order placed within it"
      className="relative aspect-[265/332] w-full overflow-hidden rounded-xl bg-[#f8f8f8] font-sans [container-type:inline-size]"
    >
      <div
        aria-hidden
        className="absolute flex flex-col bg-white"
        style={{
          left: cq(20),
          top: cq(29),
          width: cq(225),
          padding: cq(16),
          gap: cq(14),
          borderRadius: cq(14),
          boxShadow: `0 ${cq(8)} ${cq(22)} rgba(0,0,0,0.09)`,
        }}
      >
        <div className="flex items-center" style={{ gap: cq(10) }}>
          <Image
            src={avatar}
            alt=""
            className="shrink-0 rounded-full object-cover"
            style={{ width: cq(32), height: cq(32) }}
          />
          <div className="flex flex-col" style={{ gap: cq(4) }}>
            <p className="whitespace-nowrap" style={type(12.5, 16, 700, "#181818")}>Your budget</p>
            <p className="whitespace-nowrap" style={type(10, 13, 400, "#919295")}>Sofia Martinez · Design</p>
          </div>
        </div>

        <div className="flex flex-col" style={{ gap: cq(4) }}>
          <p className="whitespace-nowrap" style={type(22, 28, 700, "#181818")}>$320 left</p>
          <p className="whitespace-nowrap" style={type(10, 13, 400, "#919295")}>of $500 this month</p>
        </div>

        <div className="flex overflow-hidden rounded-full bg-[#f2f2f2]" style={{ height: cq(8) }}>
          <span className="h-full shrink-0 rounded-full bg-[#2c2d2e]" style={{ width: cq(69) }} />
        </div>

        <span className="h-px w-full bg-[#eff0f2]" />

        <div
          className="flex items-center justify-between bg-[#f8f8f8]"
          style={{ padding: `${cq(10)} ${cq(12)}`, borderRadius: cq(10) }}
        >
          <span className="flex items-center" style={{ gap: cq(10) }}>
            <span
              className="flex shrink-0 items-center justify-center bg-white"
              style={{ width: cq(28), height: cq(28), borderRadius: cq(8) }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="#181818" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: cq(16), height: cq(16) }}>
                <path d="m7.5 4.27 9 5.15" />
                <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                <path d="m3.3 7 8.7 5 8.7-5" />
                <path d="M12 22V12" />
              </svg>
            </span>
            <span className="flex flex-col" style={{ gap: cq(4) }}>
              <span className="whitespace-nowrap" style={type(11, 14, 600, "#2c2d2e")}>Desk plants × 3</span>
              <span style={type(10, 13, 400, "#919295")}>$96</span>
            </span>
          </span>
          <span
            className="flex shrink-0 items-center justify-center rounded-full bg-[#ddf5e3]"
            style={{ width: cq(20), height: cq(20) }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#267337" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ width: cq(12), height: cq(12) }}>
              <path d="M5 12.5 10 17.5 19 7" />
            </svg>
          </span>
        </div>

        <span
          className="flex items-center justify-center rounded-full bg-[#181818]"
          style={{ padding: `${cq(10)} ${cq(16)}`, ...type(11.5, 15, 700, "#ffffff") }}
        >
          Place order
        </span>
      </div>
    </div>
  );
}
