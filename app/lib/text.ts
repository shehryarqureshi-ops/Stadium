/* Overpass's middle dot sits tight against the character after it, so
   "xx · xx" reads as "xx ·xx". A no-break space keeps a second space after
   the dot (the same double-space the /swag hero and comparison already use). */
export const spaceDots = (text: string) => text.replaceAll(" · ", " ·  ");
