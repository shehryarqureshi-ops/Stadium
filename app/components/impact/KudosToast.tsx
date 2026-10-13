/* "Janine spent 2500 Kudos." confirmation pinned over the Recognition offering image (Figma 5535:6316). */

export default function KudosToast() {
  return (
  <div className="absolute left-[17.7%] top-2.5 w-[78.2%] rounded-lg border-[0.5px] border-[#eff0f2] bg-white p-[0.5625rem] shadow-[0px_6px_16px_0px_rgba(24,24,24,0.08),0px_1px_3px_0px_rgba(24,24,24,0.05)]">
    <div className="flex items-start justify-between gap-1">
      <p className="text-[0.6875rem] font-semibold leading-[0.9375rem] text-[#181818]">
        Janine spent <span className="text-[#8d12e7]">2500 Kudos.</span>
      </p>
      <span className="shrink-0 rounded-full bg-[#eff9f1] px-[0.28rem] py-[0.125rem] font-sans text-[0.34rem] font-medium leading-2 text-[#267337]">
        Confirmed
      </span>
    </div>
    <p className="mt-1 font-sans text-[0.4375rem] leading-[0.65625rem] text-[#646569]">
      Teambuilds Store reward is on the way.
    </p>
  </div>
);
}
