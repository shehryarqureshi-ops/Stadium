/* Stadium Static UI Card graphics for the /impact/marketing "100+
   integrations" step cards — Figma 4762:16657 (graphic frames 4799:6051,
   4799:6094; the first step is now the TriggerSends SVG card). Each sits on a #f8f8f8 r16 stage, 265×332 on
   desktop (matches the TriggerSends SVG card, Figma 128:20701). */

import Image from "next/image";

const ASSETS = "/impact/marketing/integrations";

function Svg({ name, className }: { name: string; className: string }) {
  return (
    <Image
      src={`${ASSETS}/${name}.svg`}
      alt=""
      width={0}
      height={0}
      unoptimized
      className={className}
    />
  );
}

function StadiumMark({ size }: { size: "sm" | "md" }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full border border-[#eff0f2] bg-white ${
        size === "sm" ? "size-[1.125rem]" : "size-6"
      }`}
    >
      <Svg name="sprinkle" className={size === "sm" ? "size-[0.675rem]" : "size-[0.9rem]"} />
    </span>
  );
}

function Stage({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-[20.75rem] w-full overflow-hidden rounded-2xl bg-[#f8f8f8]">
      <div
        className="absolute left-[7.66%] top-1/2 flex w-[84.68%] -translate-y-1/2 flex-col overflow-hidden rounded-[0.875rem] bg-white p-3.5 shadow-[0px_8px_22px_0px_rgba(0,0,0,0.09)]"
      >
        {children}
      </div>
    </div>
  );
}

const TOOLS = [
  { name: "Salesforce", logo: "salesforce", logoClass: "h-3.5 w-[1.2784rem]" },
  { name: "HubSpot", logo: "hubspot", logoClass: "h-[0.625rem] w-[2.154rem]" },
  { name: "Slack", logo: "slack", logoClass: "h-3.5 w-[0.8758rem]" },
];

export function ConnectedToolsGraphic() {
  return (
    <Stage>
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <StadiumMark size="md" />
          <p className="font-sans text-xs font-bold leading-4 text-[#181818]">Connected to Stadium</p>
        </div>
        {TOOLS.map((tool) => (
          <div
            key={tool.name}
            className="flex items-center justify-between rounded-[0.625rem] bg-[#f8f8f8] px-2.5 py-2"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-[1.375rem] w-7 items-center justify-center overflow-hidden rounded-md bg-white">
                <Svg name={tool.logo} className={tool.logoClass} />
              </span>
              <span className="font-sans text-[0.6875rem] font-semibold leading-[0.875rem] text-[#2c2d2e]">
                {tool.name}
              </span>
            </div>
            <Svg name="dot" className="size-[0.4375rem]" />
          </div>
        ))}
        <p className="font-sans text-[0.65625rem] leading-[0.875rem] text-[#757679]">
          Sends sync back automatically
        </p>
      </div>
    </Stage>
  );
}

const EVENTS = [
  { label: "Sent", date: "Oct 10", done: true },
  { label: "Opened", date: "Oct 10", done: true },
  { label: "Redeemed", date: "Oct 11", done: false },
];

export function RecipientActivityGraphic() {
  return (
    <Stage>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Image
            src={`${ASSETS}/avatar.png`}
            alt=""
            width={56}
            height={56}
            className="size-7 shrink-0 rounded-full"
          />
          <div className="flex flex-col gap-1">
            <p className="font-sans text-xs font-bold leading-4 text-[#181818]">Dana Brooks</p>
            <p className="font-sans text-[0.625rem] leading-[0.8125rem] text-[#757679]">Q4 Launch campaign</p>
          </div>
        </div>
        <div className="h-px bg-[#eff0f2]" />
        <div className="flex flex-col gap-2.5">
          {EVENTS.map((event) => (
            <div key={event.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`flex size-4 items-center justify-center rounded-full ${
                    event.done ? "bg-[#ddf5e3]" : "bg-[#181818]"
                  }`}
                >
                  <Svg name={event.done ? "check" : "check-white"} className="size-[0.5625rem]" />
                </span>
                <span
                  className={`font-sans text-[0.71875rem] leading-[0.9375rem] text-[#2c2d2e] ${
                    event.done ? "font-semibold" : "font-bold"
                  }`}
                >
                  {event.label}
                </span>
              </div>
              <span className="font-sans text-[0.625rem] leading-[0.8125rem] text-[#757679]">{event.date}</span>
            </div>
          ))}
        </div>
      </div>
    </Stage>
  );
}
