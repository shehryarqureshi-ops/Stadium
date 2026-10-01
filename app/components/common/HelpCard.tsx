/* "Need help" band — Figma /integrations "See integrations in action"
   (4293:31957). White r32 card (px100 py100) on the closing gradient: left
   intro + dark pill, right 480×324 #f2f2f2 r24 video placeholder. */

import PillLink from "./PillLink";
import SectionIntro from "./SectionIntro";

export default function HelpCard({
  caption,
  title,
  description,
  cta,
}: {
  caption?: string;
  title: string;
  description: string;
  cta: { label: string; href: string };
}) {
  return (
    <section className="px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
      <div className="mx-auto grid w-full max-w-content grid-cols-1 items-center gap-10 rounded-[2rem] bg-white px-6 py-10 md:px-12 md:py-16 lg:grid-cols-2 lg:gap-20 lg:px-25 lg:py-25">
        <div className="flex flex-col items-start gap-8">
          <SectionIntro caption={caption} title={title} description={description} align="left" />
          <div data-animation="reveal">
            <PillLink {...cta} />
          </div>
        </div>
        <div aria-hidden className="aspect-[480/324] w-full rounded-3xl bg-[#f2f2f2]" />
      </div>
    </section>
  );
}
