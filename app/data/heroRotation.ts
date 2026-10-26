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

   NOTE: clips are 1280x720, muted, no audio, ~1MB each (re-encoded from the
   1080p originals in public/videos/hero/new/). */

export type HeroSlide = { word: string; video: string; poster: string };

export const HERO_SLIDES: HeroSlide[] = [
  { word: "people", video: "/videos/hero/people-10s.mp4", poster: "/videos/hero/people-10s.webp" },
  { word: "customers", video: "/videos/hero/customers-10s.mp4", poster: "/videos/hero/customers-10s.webp" },
  { word: "employees", video: "/videos/hero/employees-10s.mp4", poster: "/videos/hero/employees-10s.webp" },
];

/* How long each word/video holds before advancing (matches the ~10s clips). */
export const HERO_SLIDE_INTERVAL_MS = 10000;
