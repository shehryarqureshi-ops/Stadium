// Coded from Figma "graphic · default · 02 Protect Unallocated Funds" (4522:10481).
import { cq, type } from "./cq";

export default function StepProtect() {
  return (
    <div
      role="img"
      aria-label="A company wallet with 40,000 dollars locked until it is allocated to a team"
      className="relative aspect-[265/332] w-full overflow-hidden rounded-xl bg-[#f8f8f8] font-sans [container-type:inline-size]"
    >
      <div
        aria-hidden
        className="absolute flex flex-col bg-white"
        style={{
          left: cq(26),
          top: cq(22),
          width: cq(213),
          padding: cq(16),
          gap: cq(14),
          borderRadius: cq(14),
          boxShadow: `0 ${cq(8)} ${cq(22)} rgba(0,0,0,0.09)`,
        }}
      >
        <div className="flex flex-col" style={{ gap: cq(4) }}>
          <p className="uppercase" style={{ ...type(10, 13, 600, "#919295"), letterSpacing: cq(0.8) }}>
            Company Wallet
          </p>
          <p style={type(22, 28, 700, "#181818")}>$120,000</p>
        </div>

        <div className="flex items-center" style={{ gap: cq(2) }}>
          <span className="shrink-0 bg-[#2c2d2e]" style={{ width: cq(119), height: cq(8), borderRadius: cq(4) }} />
          <span className="shrink-0 bg-[#e3e4e6]" style={{ width: cq(60), height: cq(8), borderRadius: cq(4) }} />
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center" style={{ gap: cq(8) }}>
            <span className="shrink-0 rounded-full bg-[#181818]" style={{ width: cq(8), height: cq(8) }} />
            <span className="whitespace-nowrap" style={type(11, 14, 600, "#2c2d2e")}>
              Allocated to 4 teams
            </span>
          </span>
          <span className="whitespace-nowrap" style={type(11.5, 15, 700, "#2c2d2e")}>
            $80,000
          </span>
        </div>

        <div
          className="flex flex-col border border-dashed border-[#b5b6b9] bg-[#f8f8f8]"
          style={{ padding: cq(12), gap: cq(6), borderRadius: cq(10) }}
        >
          <div className="flex items-center justify-between">
            <span style={type(11, 14, 600, "#6b6c71")}>Unallocated</span>
            <span
              className="flex items-center rounded-full bg-[#181818]"
              style={{ gap: cq(4), padding: `${cq(4)} ${cq(10)}` }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ width: cq(10), height: cq(10) }}>
                <rect x="4" y="11" width="16" height="10" rx="2" />
                <path d="M8 11V7a4 4 0 0 1 8 0v4" />
              </svg>
              <span style={type(10, 13, 700, "#ffffff")}>Locked</span>
            </span>
          </div>
          <p style={type(18, 23, 700, "#181818")}>$40,000</p>
          <p style={type(10, 13, 400, "#919295")}>Not spendable until allocated</p>
        </div>

        <span
          className="flex items-center justify-center border border-[#e3e4e6] bg-white rounded-full"
          style={{ padding: `${cq(10)} ${cq(16)}`, ...type(11.5, 15, 700, "#2c2d2e") }}
        >
          Allocate funds
        </span>
      </div>
    </div>
  );
}
