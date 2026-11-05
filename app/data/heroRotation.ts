/* Hero background rotation — the headline word and its background video advance
   together on one shared index (see Hero.tsx). This array is the single source
   of truth for both.

   TO UPDATE / SCALE:
   - Edit a `word`, or add / remove a slide — the word shuffle and the video
     background both follow the array automatically (any length works).
   - Point `video` at your own files. Drop dedicated hero clips in
     public/videos/hero/ and swap the paths below.
   - Keep clips muted-friendly (they autoplay muted, looping) and similar
     aspect so object-cover crops them consistently.

   NOTE: clips are muted, no audio: *-10s.mp4 = 1280x720 (~1-2.4 MB, plays first),
   *-hd.mp4 = 1920x1080 (~3-6 MB, downloaded in the background and swapped in). */

/* `video` = fast 720p clip that plays first; `hd` = 1080p version fetched in the background and swapped in */
export type HeroSlide = { word: string; video: string; hd: string; poster: string };

export const HERO_SLIDES: HeroSlide[] = [
  { word: "people", video: "/videos/hero/people-10s.mp4", hd: "/videos/hero/people-hd.mp4", poster: "/videos/hero/people-10s.webp" },
  { word: "partners", video: "/videos/hero/partners-10s.mp4", hd: "/videos/hero/partners-hd.mp4", poster: "/videos/hero/partners-10s.webp" },
  { word: "customers", video: "/videos/hero/customers-10s.mp4", hd: "/videos/hero/customers-hd.mp4", poster: "/videos/hero/customers-10s.webp" },
  { word: "employees", video: "/videos/hero/employees-10s.mp4", hd: "/videos/hero/employees-hd.mp4", poster: "/videos/hero/employees-10s.webp" },
  { word: "community", video: "/videos/hero/community-10s.mp4", hd: "/videos/hero/community-hd.mp4", poster: "/videos/hero/community-10s.webp" },
];

/* Fallback hold time, used only when no clip is playing (poster-only: Save-Data / autoplay blocked).
   With video, the active clip's end advances word + clip (100 ms crossfade), so no moment is cut. */
export const HERO_SLIDE_INTERVAL_MS = 9000;

/* /new-home order (2026-10-27): People → Employees → Customers → Partners → Community. */
const bySlideWord = (word: string) => HERO_SLIDES.find((s) => s.word === word)!;
export const HERO_SLIDES_NEW_HOME: HeroSlide[] = ["people", "employees", "customers", "partners", "community"].map(bySlideWord);
