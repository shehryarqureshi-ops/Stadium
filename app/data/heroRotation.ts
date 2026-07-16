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

   NOTE: the three infrastructure clips are reused here as PLACEHOLDERS to fill
   the five word slots until dedicated hero videos exist. */

export type HeroSlide = { word: string; video: string };

export const HERO_SLIDES: HeroSlide[] = [
  { word: "people", video: "/videos/hero/People.mp4" },
  { word: "partners", video: "/videos/hero/Partners.mp4" },
  { word: "customers", video: "/videos/hero/Customers.mp4" },
  { word: "employees", video: "/videos/hero/Employee.mp4" },
  { word: "community", video: "/videos/hero/People.mp4" },
];

/* How long each word/video holds before advancing. */
export const HERO_SLIDE_INTERVAL_MS = 5000;
