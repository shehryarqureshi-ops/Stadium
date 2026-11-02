/* Decoration methods shown in the Swag section (Figma "deco methods" frames: 6031:15507
   cards, final modal 6059:9608). Each one is a grid card (image + black fade + name) and
   a row in the DecoMethodsModal. Specs (finish · minimum order · lead time) come from the
   Figma "v2 · all rows · cards" frame. List + order updated Nov 2026 to the 15 methods the
   team supplied. FIVE of them have no deco photo or approved copy yet (UV digital/sticker/DTF,
   Heat Seal Patch, Sewn On Patch, Single Color Print, Liquid 3D): they use a DISTINCT, unused deco photo as a stand-in (so no two
   deco cards share an image) and carry DRAFT descriptions — replace both (see PLACEHOLDER below).
   Info only — nothing here filters the grid. */

export type DecoMethod = {
  id: string;
  /** short label on the grid card + modal nav ("DTG") */
  name: string;
  /** full title in the modal ("Direct-to-Garment (DTG)") */
  title: string;
  description: string;
  image: string;
  best?: string[];
  spec?: { finish: string; minOrder: string; leadTime: string };
  /** false: keep it in the modal list but don't put a card on the Swag wall — its only photo
   *  is one a swag product already uses, so the wall would show the same picture twice */
  wall?: boolean;
};

const img = (id: string) => `/catalog-page/deco/${id}.jpg`;

export const DECO_METHODS: DecoMethod[] = [
  {
    id: "dtf",
    name: "DTF",
    title: "Direct-to-Film (DTF)",
    description:
      "Transfers bold, durable prints onto a wide range of fabrics, including cotton, polyester, and blends. A flexible alternative to DTG with enhanced appearance.",
    image: img("dtf"),
    best: ["Cotton", "Polyester", "Blends"],
    spec: { finish: "Full colour", minOrder: "12 pc", leadTime: "5 days" },
  },
  {
    id: "dtg",
    name: "DTG",
    title: "Direct-to-Garment (DTG)",
    description:
      "High-resolution, full-color prints that blend seamlessly into fabric. Ideal for detailed artwork on cotton-based apparel like t-shirts and hoodies.",
    image: img("dtg"),
    best: ["T-shirts", "Hoodies", "Cotton apparel"],
    spec: { finish: "Full colour", minOrder: "1 pc", leadTime: "5 days" },
  },
  {
    id: "sublimation",
    name: "Dye Sublimation",
    title: "Dye Sublimation",
    description:
      "Achieve vibrant, all-over prints with dye-infused designs that won't fade or peel. Works best on polyester apparel, mugs, and hard surfaces.",
    image: img("sublimation"),
    best: ["Polyester apparel", "Mugs", "Hard surfaces"],
    spec: { finish: "All-over", minOrder: "24 pc", leadTime: "12 days" },
  },
  {
    id: "uv-printing",
    name: "UV Print",
    title: "UV Print",
    description:
      "Uses ultraviolet light to instantly cure ink, creating crisp, high-contrast designs. Works on hard surfaces like drinkware, phone cases, and tech accessories.",
    image: img("uv-printing"),
    best: ["Drinkware", "Phone cases", "Tech accessories"],
  },
  {
    /* PLACEHOLDER photo + DRAFT copy */
    id: "uv-digital",
    name: "UV (Digital, Sticker, DTF)",
    title: "UV (Digital UV, UV Sticker, UV DTF)",
    description:
      "UV-cured digital printing in three formats: direct Digital UV, UV Stickers applied to the product, and UV DTF transfers for hard or curved surfaces.",
    image: img("digital-printing"),
    wall: false,
  },
  {
    id: "vinyl-cut",
    name: "HTV (Vinyl)",
    title: "Heat Transfer Vinyl (HTV)",
    description:
      "Artwork is cut from coloured vinyl and heat-applied — no screens or dies, so it suits small runs of one to three colours.",
    image: img("vinyl-cut"),
    spec: { finish: "1-3 colours", minOrder: "1 pc", leadTime: "4 days" },
  },
  {
    id: "embroidery",
    name: "Embroidery",
    title: "Embroidery",
    description:
      "From classic flat embroidery to 3D puff designs, stitched details add a premium, textured finish. Perfect for hats, polos, jackets, and bags with a high-end touch.",
    image: img("embroidery"),
    best: ["Hats", "Polos", "Jackets", "Bags"],
    spec: { finish: "12 threads", minOrder: "24 pc", leadTime: "10 days" },
  },
  {
    id: "debossing",
    name: "Deboss",
    title: "Debossing",
    description:
      "Artwork is pressed into the surface for a tone-on-tone, blind mark with a refined feel.",
    image: img("debossing"),
    spec: { finish: "Blind", minOrder: "50 pc", leadTime: "12 days" },
  },
  {
    id: "embossing",
    name: "Emboss",
    title: "Embossing",
    description:
      "The surface is raised into relief, giving the logo a tactile, three-dimensional finish.",
    image: img("embossing"),
    spec: { finish: "Raised", minOrder: "50 pc", leadTime: "12 days" },
  },
  {
    id: "laser-engraving",
    name: "Engraving (Laser Engraved)",
    title: "Engraving (Laser Engraved)",
    description:
      "Precision laser or rotary engraving creates sleek, permanent designs. Best for metal, glass, wood, and premium corporate gifts.",
    image: img("laser-engraving"),
    best: ["Metal", "Glass", "Wood", "Corporate gifts"],
    spec: { finish: "Permanent", minOrder: "24 pc", leadTime: "10 days" },
  },
  {
    /* PLACEHOLDER photo + DRAFT copy */
    id: "heat-seal-patch",
    name: "Heat Seal Patch",
    title: "Heat Seal Patch",
    description:
      "A pre-made patch with a heat-activated backing that bonds to the garment under heat and pressure — no stitching, with a clean, durable finish.",
    image: img("cut-and-sew-sublimation"),
    wall: false,
  },
  {
    /* PLACEHOLDER photo + DRAFT copy */
    id: "sewn-on-patch",
    name: "Sewn On Patch",
    title: "Sewn On Patch",
    description:
      "A woven or embroidered patch stitched onto the garment for a bold, long-lasting, textured logo. Popular on hats, jackets, and bags.",
    image: img("laser-etching"),
    best: ["Hats", "Jackets", "Bags"],
  },
  {
    /* PLACEHOLDER photo + DRAFT copy */
    id: "single-color-print",
    name: "Single Color Print",
    title: "Single Color Print",
    description:
      "A one-colour logo or mark printed in a single ink — simple, cost-effective, and ideal for larger runs.",
    image: img("rotary-printing"),
  },
  {
    /* PLACEHOLDER photo + DRAFT copy */
    id: "liquid-3d",
    name: "Liquid 3D",
    title: "Liquid 3D",
    description:
      "A glossy, domed resin finish that adds a raised, liquid-like dimension to the logo.",
    image: img("foil-printing"),
  },
  {
    id: "screen-printing",
    name: "Screen Printing",
    title: "Screen Printing",
    description:
      "Choose from standard, puff, metallic, or glow-in-the-dark inks for bold, long-lasting prints. Ideal for bulk apparel like t-shirts, tote bags, and hoodies.",
    image: img("screen-printing"),
    best: ["T-shirts", "Tote bags", "Hoodies"],
    spec: { finish: "6 colours", minOrder: "24 pc", leadTime: "7 days" },
  },
];

/* Modal list (Figma 6078:9607, S1-style two lists with D1 thumbnails): one-to-two-line
   description per method and the two column groups. */
export const DECO_SHORT: Record<string, string> = {
  dtf: "Durable, bold transfers for cotton, polyester and blends.",
  dtg: "High-resolution, full-color prints that blend into the fabric.",
  sublimation: "Vibrant all-over prints with dye-infused designs that won’t fade or peel.",
  "uv-printing": "Ink cured instantly by ultraviolet light for crisp, high-contrast designs.",
  "uv-digital": "UV-cured digital, sticker and DTF transfers for hard and curved surfaces.",
  "vinyl-cut": "Heat-applied cut vinyl — no screens or dies, ideal for small one-to-three-color runs.",
  embroidery: "Classic flat to 3D puff — stitched details with a premium, textured finish.",
  debossing: "Artwork pressed into the surface for a refined tone-on-tone mark.",
  embossing: "The surface raised into relief for a tactile, three-dimensional logo.",
  "laser-engraving": "Precision laser or rotary engraving for sleek, permanent designs.",
  "heat-seal-patch": "Pre-made patches bonded on with heat — no stitching needed.",
  "sewn-on-patch": "Woven or embroidered patches stitched on for a bold, textured logo.",
  "single-color-print": "A one-ink logo print — simple, cost-effective, great for volume.",
  "liquid-3d": "A glossy, domed resin finish that gives the logo raised dimension.",
  "screen-printing": "Standard, puff, metallic or glow inks for bold, long-lasting prints.",
};

export const DECO_GROUPS: { title: string; ids: string[] }[] = [
  {
    title: "Applied & printed",
    ids: ["dtf", "dtg", "sublimation", "uv-printing", "uv-digital", "vinyl-cut", "single-color-print", "screen-printing"],
  },
  {
    title: "Stitched, patches & finishes",
    ids: ["embroidery", "heat-seal-patch", "sewn-on-patch", "liquid-3d", "debossing", "embossing", "laser-engraving"],
  },
];
