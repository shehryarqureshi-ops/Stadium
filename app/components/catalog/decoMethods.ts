/* Decoration methods shown in the Swag section (Figma "deco methods" frames: 6031:15507
   cards, final modal 6059:9608). Each one is a grid card (image + black fade + name) and
   a row in the DecoMethodsModal. Specs (finish · minimum order · lead time) come from the
   Figma "v2 · all rows · cards" frame; the three methods without a deco photo yet reuse a
   swag product photo as a placeholder. Info only — nothing here filters the grid. */

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
};

const img = (id: string) => `/catalog-page/deco/${id}.jpg`;

export const DECO_METHODS: DecoMethod[] = [
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
    id: "screen-printing",
    name: "Screen Printing",
    title: "Screen Printing",
    description:
      "Choose from standard, puff, metallic, or glow-in-the-dark inks for bold, long-lasting prints. Ideal for bulk apparel like t-shirts, tote bags, and hoodies.",
    image: img("screen-printing"),
    best: ["T-shirts", "Tote bags", "Hoodies"],
    spec: { finish: "6 colours", minOrder: "24 pc", leadTime: "7 days" },
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
    id: "sublimation",
    name: "Sublimation",
    title: "Sublimation",
    description:
      "Achieve vibrant, all-over prints with dye-infused designs that won't fade or peel. Works best on polyester apparel, mugs, and hard surfaces.",
    image: img("sublimation"),
    best: ["Polyester apparel", "Mugs", "Hard surfaces"],
    spec: { finish: "All-over", minOrder: "24 pc", leadTime: "12 days" },
  },
  {
    id: "cut-and-sew-sublimation",
    name: "Cut & Sew Sublimation",
    title: "Cut & Sew Sublimation",
    description:
      "Full-coverage, edge-to-edge printing on fabric panels before stitching. Perfect for custom jerseys, leggings, and high-fashion apparel.",
    image: img("cut-and-sew-sublimation"),
    best: ["Jerseys", "Leggings", "Fashion apparel"],
  },
  {
    id: "rotary-printing",
    name: "Rotary Printing",
    title: "Rotary Printing",
    description:
      "Continuous rotary printing for full-colour artwork at volume, with a consistent finish from the first piece to the last.",
    image: img("rotary-printing"),
    spec: { finish: "Full colour", minOrder: "12 pc", leadTime: "8 days" },
  },
  {
    id: "vinyl-cut",
    name: "Vinyl Cut",
    title: "Vinyl Cut",
    description:
      "Artwork is cut from coloured vinyl and heat-applied — no screens or dies, so it suits small runs of one to three colours.",
    image: img("vinyl-cut"),
    spec: { finish: "1-3 colours", minOrder: "1 pc", leadTime: "4 days" },
  },
  {
    id: "uv-printing",
    name: "UV Printing",
    title: "UV Printing",
    description:
      "Uses ultraviolet light to instantly cure ink, creating crisp, high-contrast designs. Works on hard surfaces like drinkware, phone cases, and tech accessories.",
    image: img("uv-printing"),
    best: ["Drinkware", "Phone cases", "Tech accessories"],
  },
  {
    id: "digital-printing",
    name: "Digital Printing",
    title: "Digital Printing",
    description:
      "Delivers sharp, high-resolution graphics with smooth color gradients. Ideal for posters, business cards, and paper-based marketing materials.",
    image: img("digital-printing"),
    best: ["Posters", "Business cards", "Print collateral"],
  },
  {
    id: "laser-engraving",
    name: "Laser Engraving",
    title: "Laser Engraving",
    description:
      "Precision laser or rotary engraving creates sleek, permanent designs. Best for metal, glass, wood, and premium corporate gifts.",
    image: img("laser-engraving"),
    best: ["Metal", "Glass", "Wood", "Corporate gifts"],
    spec: { finish: "Permanent", minOrder: "24 pc", leadTime: "10 days" },
  },
  {
    id: "laser-etching",
    name: "Laser Etching",
    title: "Laser Etching",
    description:
      "A laser removes the surface layer to reveal the finish beneath — a clean, permanent mark on metal.",
    image: img("laser-etching"),
    spec: { finish: "Metal finish", minOrder: "24 pc", leadTime: "10 days" },
  },
  {
    id: "debossing",
    name: "Debossing",
    title: "Debossing",
    description:
      "Artwork is pressed into the surface for a tone-on-tone, blind mark with a refined feel.",
    image: img("debossing"),
    spec: { finish: "Blind", minOrder: "50 pc", leadTime: "12 days" },
  },
  {
    id: "embossing",
    name: "Embossing",
    title: "Embossing",
    description:
      "The surface is raised into relief, giving the logo a tactile, three-dimensional finish.",
    image: img("embossing"),
    spec: { finish: "Raised", minOrder: "50 pc", leadTime: "12 days" },
  },
  {
    id: "foil-printing",
    name: "Foil Printing",
    title: "Foil Printing",
    description:
      "Metallic foil is pressed onto the surface with heat and pressure for a bright, reflective finish.",
    image: img("foil-printing"),
    spec: { finish: "Metallic", minOrder: "50 pc", leadTime: "10 days" },
  },
];

/* Modal list (Figma 6078:9607, S1-style two lists with D1 thumbnails): one-to-two-line
   description per method and the two column groups. */
export const DECO_SHORT: Record<string, string> = {
  embroidery: "Classic flat to 3D puff — stitched details with a premium, textured finish.",
  "screen-printing": "Standard, puff, metallic or glow inks for bold, long-lasting prints.",
  dtg: "High-resolution, full-color prints that blend into the fabric.",
  dtf: "Durable, bold transfers for cotton, polyester and blends.",
  sublimation: "Vibrant all-over prints with dye-infused designs that won’t fade or peel.",
  "cut-and-sew-sublimation": "Edge-to-edge printing on fabric panels before they’re stitched.",
  "rotary-printing": "Continuous full-color printing at volume, consistent from first piece to last.",
  "vinyl-cut": "Heat-applied cut vinyl — no screens or dies, ideal for small one-to-three-color runs.",
  "uv-printing": "Ink cured instantly by ultraviolet light for crisp, high-contrast designs.",
  "digital-printing": "Sharp, high-resolution graphics with smooth color gradients.",
  "laser-engraving": "Precision laser or rotary engraving for sleek, permanent designs.",
  "laser-etching": "A laser removes the surface layer — a clean, permanent mark on metal.",
  debossing: "Artwork pressed into the surface for a refined tone-on-tone mark.",
  embossing: "The surface raised into relief for a tactile, three-dimensional logo.",
  "foil-printing": "Metallic foil pressed on with heat for a bright, reflective finish.",
};

export const DECO_GROUPS: { title: string; ids: string[] }[] = [
  {
    title: "Applied & printed",
    ids: ["embroidery", "screen-printing", "dtg", "dtf", "sublimation", "cut-and-sew-sublimation", "rotary-printing", "vinyl-cut"],
  },
  {
    title: "Digital, laser & finishes",
    ids: ["uv-printing", "digital-printing", "laser-engraving", "laser-etching", "debossing", "embossing", "foil-printing"],
  },
];
