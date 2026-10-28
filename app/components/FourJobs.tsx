import Image from "next/image";
import controlImg from "@/public/impact/teams/team-leaders.jpg";
import moneyImg from "@/public/impact/teams/finance.jpg";
import mindImg from "@/public/videos/infrastructure/shipping.webp";
import timeImg from "@/public/impact/teams/operations.jpg";
import Stack from "./Stack";

/* "Companies hire Stadium to do 4 jobs." — Figma S1-H · Image stack (7032:9778): heading + subheading on
   the left, the four jobs as photo cards in a React Bits Stack on the right. Stack settings are the ones on the shared component URL (spread 0.4, radius 20, depth 0.2, tilt 7,
   threshold 120, shadow off, autoplay every 5s, pause on hover, send-to-back on click); layout is the
   default fan. The grey tray is gone (its side padding stays); the container's
   side padding is the site header's own, so the section's outer edges line up with the logo and the Talk to sales button.
   Below lg the stack drops under the copy. Tablet / mobile frames weren't drawn. */

const JOBS = [
  {
    title: "Save time",
    body: "Managing engagement is nobody’s main job. We run it for you.",
    image: timeImg,
  },
  {
    title: "Save money",
    body: "No hidden fees. No shipping, international or storage surprises. One vendor, not ten.",
    image: moneyImg,
  },
  {
    title: "Peace of mind",
    body: "The job gets done, right. On time, in full, in 170+ countries.",
    image: mindImg,
  },
  {
    title: "Centralize control",
    body: "Set the rules once. Decentralized execution, built for multi-team use.",
    image: controlImg,
  },
];

/* Figma S1-H card (7032:9778): photo, a flat 30% black, a black gradient (0 → .2 at 35% → .92) so the copy
   reads, then title + body pinned bottom-left. No numbers. */
const cards = JOBS.map((job) => (
  <div key={job.title} className="relative flex h-full w-full flex-col justify-end gap-4 overflow-hidden bg-pyramid-tab p-6">
    <Image
      src={job.image}
      alt=""
      fill
      sizes="22rem"
      loading="eager"
      className="object-cover"
      draggable={false}
    />
    <div aria-hidden className="absolute inset-0 bg-black/30" />
    <div
      aria-hidden
      className="absolute inset-0 bg-linear-to-b from-black/0 via-black/20 via-35% to-black/[0.92]"
    />
    <h3 className="relative font-display text-job-photo-title text-white">{job.title}</h3>
    <p className="relative font-sans text-job-photo-body text-white/[0.86]">{job.body}</p>
  </div>
));

export default function FourJobs() {
  return (
    <section
      aria-labelledby="four-jobs-title"
      className="w-full px-4 md:px-[max(var(--spacing-section-x-md),calc((100%_-_var(--container-content))/2))]"
    >
      {/* no tray any more, but its side padding stays; copy + stack sit close together in the middle */}
      <div className="flex flex-col gap-10 px-6 py-10 md:px-12 md:py-14 lg:flex-row lg:items-center lg:justify-center lg:gap-12 lg:px-12 lg:py-16 xl:gap-16 xl:px-16">
        <header className="flex flex-col gap-5 text-swag-ink lg:min-w-0 lg:max-w-[34rem] lg:flex-1">
          <p className="font-sans text-[0.75rem] font-bold uppercase leading-4 tracking-[0.0625rem]">
            Why teams choose Stadium
          </p>
          <h2
            id="four-jobs-title"
            className="font-display text-display-sm md:text-heading-xl lg:text-section-title"
          >
            Companies hire
            <br /> Stadium to do 4 jobs.
          </h2>
          <p className="max-w-[30rem] font-sans text-body-md text-swag-grey lg:text-[1.125rem] lg:leading-7">
            Recognition, swag, gifting and events, run end to end by one team, so yours can get back to the
            work only it can do.
          </p>
        </header>

        {/* the stack fills this box and is centred in the section, so the gap above and below is equal
            (the fan layout stays inside its box, unlike the pile) */}
        <div className="flex shrink-0 justify-center">
          <div className="h-job-card-h w-job-card-w max-sm:[zoom:0.62]">
            <Stack
              cards={cards}
              spread={0.4}
              radius={20}
              depth={0.2}
              tilt={7}
              threshold={120}
              shadow={false}
              autoplay
              autoplayDelay={5000}
              pauseOnHover
              sendToBackOnClick
            />
          </div>
        </div>
      </div>
    </section>
  );
}
