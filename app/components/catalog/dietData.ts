/* Snack dietary restrictions + taste profiles (Figma 6031:15508 cards,
   6046:8983 modal). `icon` is the white illustration (cards); the modal uses
   the `-dark` twin. `w`/`h` are the artwork's natural size in px (Figma). */

export type DietEntry = {
  id: string;
  name: string;
  group: "dietary" | "taste";
  description: string;
  /** share of programs asking for it (dietary rows only) */
  pct?: string;
  w: number;
  h: number;
};

export const DIET_ENTRIES: DietEntry[] = [
  { id: "vegan", name: "Vegan", group: "dietary", description: "No animal products — no meat, dairy, eggs or honey.", pct: "33%", w: 108, h: 108 },
  { id: "gluten-free", name: "Gluten-Free", group: "dietary", description: "Made without wheat, barley or rye.", pct: "41%", w: 90, h: 90 },
  { id: "kosher", name: "Kosher", group: "dietary", description: "Certified to Jewish dietary law.", pct: "19%", w: 61, h: 67 },
  { id: "vegetarian", name: "Vegetarian", group: "dietary", description: "No meat or fish.", pct: "47%", w: 108, h: 108 },
  { id: "dairy-free", name: "Dairy-Free", group: "dietary", description: "No milk, cheese, butter or other dairy.", pct: "36%", w: 81, h: 81 },
  { id: "keto-paleo", name: "Keto/Paleo", group: "dietary", description: "Low-carb, grain-free picks for keto and paleo eaters.", pct: "13%", w: 108, h: 108 },
  { id: "pescatarian", name: "Pescatarian", group: "dietary", description: "No meat, but fish and seafood are fine.", w: 108, h: 108 },
  { id: "bitter", name: "Bitter", group: "taste", description: "Dark chocolate, coffee and tea — rich, roasted edges.", w: 108, h: 108 },
  { id: "spicy", name: "Spicy", group: "taste", description: "Heat from chili, pepper and ginger.", w: 108, h: 108 },
  { id: "floral-botanical", name: "Floral/Botanical", group: "taste", description: "Lavender, rose, hibiscus and other blooms.", w: 108, h: 108 },
  { id: "sweet", name: "Sweet", group: "taste", description: "Candy, cookies, honey and caramel.", w: 108, h: 108 },
  { id: "savory", name: "Savory", group: "taste", description: "Salty, umami and cheesy snacks.", w: 108, h: 108 },
  { id: "fruity", name: "Fruity", group: "taste", description: "Bright, juicy fruit flavors.", w: 108, h: 108 },
  { id: "herbal-earthy", name: "Herbal/Earthy", group: "taste", description: "Mushroom, mint, basil and other herbs.", w: 108, h: 108 },
  { id: "tart", name: "Tart", group: "taste", description: "Citrus and tangy, sour notes.", w: 108, h: 108 },
];

export const dietIcon = (id: string, dark = false) => `/catalog-page/diet/${id}${dark ? "-dark" : ""}.svg`;
