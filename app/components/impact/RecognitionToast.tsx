/* "You've been recognised" Slack toast pinned over the Leadership
   "Recognize great work" tab image — Figma 5438:6783. */

import Image from "next/image";

import avatar from "@/public/impact/leadership/toast-avatar.png";

export default function RecognitionToast() {
  return (
    <div className="absolute right-[43.4%] top-[22.3%] max-w-[90%] rounded-[1.125rem] border border-white/20 bg-white px-[1.125rem] py-[0.9375rem] shadow-[0px_8px_30px_0px_rgba(15,0,38,0.22)] backdrop-blur-[7px]">
      <div className="relative flex items-center gap-[0.8125rem]">
        <Image src={avatar} alt="" width={0} height={0} className="size-10 shrink-0 rounded-full bg-[#adadad]/20 object-cover" />
        <div className="flex min-w-0 flex-col gap-[0.1875rem]">
          <p className="whitespace-nowrap font-display text-base font-bold text-[#0f0821]">You’ve been recognised</p>
          <p className="flex items-center gap-2 whitespace-nowrap font-sans text-sm text-[#1a142b]">
            <span>Alex Kim in Slack</span>
            <span>·&nbsp; 2m ago</span>
          </p>
        </div>
        <Image src="/impact/leadership/slack-badge-ring.svg" alt="" width={0} height={0} unoptimized className="absolute left-6 top-6 size-[1.375rem]" />
        <Image src="/impact/leadership/slack-badge.svg" alt="" width={0} height={0} unoptimized className="absolute left-7 top-7 size-3.5" />
      </div>
    </div>
  );
}
