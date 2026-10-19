/* Stadium Static UI Card graphics for the /impact/sales "Less friction" step
   cards — Figma 4791:16918 (graphic frames 4799:6124, 4799:6148, 4799:6165).
   Each sits on a #f8f8f8 r16 stage, 235×283 on desktop. */

import Image from "next/image";

const ASSETS = "/impact/sales/friction";

function Svg({ name, className }: { name: string; className: string }) {
  return (
    <Image src={`${ASSETS}/${name}.svg`} alt="" width={0} height={0} unoptimized className={className} />
  );
}

function Stage({ top, children }: { top: string; children: React.ReactNode }) {
  return (
    <div className="relative h-[17.6875rem] w-full overflow-hidden rounded-2xl bg-[#f8f8f8]">
      <div
        className="absolute left-[7.66%] flex w-[84.68%] flex-col gap-2.5 overflow-hidden rounded-[0.875rem] bg-white p-3.5 shadow-[0px_8px_22px_0px_rgba(0,0,0,0.09)]"
        style={{ top }}
      >
        {children}
      </div>
    </div>
  );
}

function DarkButton({ children }: { children: string }) {
  return (
    <div className="flex items-center justify-center rounded-full bg-[#181818] px-3 py-2">
      <span className="font-sans text-[0.6875rem] font-bold leading-[0.875rem] text-white">{children}</span>
    </div>
  );
}

const GIFTS = [
  { name: "Drinkware", photo: "gift-drinkware", selected: false },
  { name: "Bags", photo: "gift-bags", selected: true },
  { name: "Tech", photo: "gift-tech", selected: false },
  { name: "Desk", photo: "gift-desk", selected: false },
];

export function ChooseGiftGraphic() {
  return (
    <Stage top="0.9375rem">
      <p className="font-sans text-[0.78125rem] font-bold leading-4 text-[#181818]">Choose your gift</p>
      <div className="grid grid-cols-2 gap-2">
        {GIFTS.map((gift) => (
          <div key={gift.name} className="flex flex-col gap-1">
            <div
              className={`relative h-[3.625rem] overflow-hidden rounded-[0.625rem] bg-[#f8f8f8] ${
                gift.selected ? "border-2 border-[#181818]" : ""
              }`}
            >
              <Image
                src={`${ASSETS}/${gift.photo}.jpg`}
                alt=""
                fill
                sizes="6rem"
                className="object-cover"
              />
            </div>
            <span
              className={`font-sans text-[0.65625rem] leading-[0.875rem] text-[#2c2d2e] ${
                gift.selected ? "font-bold" : "font-semibold"
              }`}
            >
              {gift.name}
            </span>
          </div>
        ))}
      </div>
      <DarkButton>Choose Bags</DarkButton>
    </Stage>
  );
}

const FIELDS = [
  { label: "Name", value: "Dana Brooks", active: false },
  { label: "Street", value: "42 Harbor Ave", active: true },
  { label: "City & ZIP", value: "Boston, 02110", active: false },
];

export function EnterAddressGraphic() {
  return (
    <Stage top="0.9375rem">
      <p className="font-sans text-[0.78125rem] font-bold leading-4 text-[#181818]">Where should we ship it?</p>
      {FIELDS.map((field) => (
        <div key={field.label} className="flex flex-col gap-1">
          <span className="font-sans text-[0.59375rem] font-semibold uppercase leading-3 tracking-[0.0375rem] text-[#757679]">
            {field.label}
          </span>
          <div
            className={`rounded-lg bg-white px-2.5 py-[0.4375rem] ${
              field.active ? "border-[1.5px] border-[#181818]" : "border border-[#e3e4e6]"
            }`}
          >
            <span className="font-sans text-[0.6875rem] leading-[0.875rem] text-[#2c2d2e]">{field.value}</span>
          </div>
        </div>
      ))}
      <DarkButton>Confirm address</DarkButton>
    </Stage>
  );
}

export function FollowUpGraphic() {
  return (
    <Stage top="3.5rem">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-full bg-[#ddf5e3]">
            <Svg name="delivered" className="size-3.5" />
          </span>
          <span className="font-sans text-[0.78125rem] font-bold leading-4 text-[#181818]">Delivered</span>
        </div>
        <Svg name="salesforce" className="h-3 w-[1.0958rem]" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-sans text-[0.71875rem] font-semibold leading-[0.9375rem] text-[#2c2d2e]">
          Dana Brooks got her gift
        </p>
        <p className="font-sans text-[0.625rem] leading-[0.8125rem] text-[#757679]">Today · 10:42 AM</p>
      </div>
      <span className="w-fit rounded-full bg-[#ddf5e3] px-2.5 py-1 font-sans text-[0.625rem] font-bold leading-[0.8125rem] text-[#1b7a36]">
        Good time to follow up
      </span>
      <div className="flex items-center gap-1.5">
        <div className="flex flex-1 items-center justify-center rounded-full bg-[#181818] px-3 py-2">
          <span className="font-sans text-[0.6875rem] font-bold leading-[0.875rem] text-white">Email Dana</span>
        </div>
        <div className="flex flex-1 items-center justify-center rounded-full border border-[#e3e4e6] bg-white px-3 py-2">
          <span className="font-sans text-[0.6875rem] font-bold leading-[0.875rem] text-[#2c2d2e]">Log call</span>
        </div>
      </div>
    </Stage>
  );
}
