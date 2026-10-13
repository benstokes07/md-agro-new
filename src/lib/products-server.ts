import Airtable from "airtable";

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  image: string;
  tagline: string;
  specifications: string;
  benefits: string;
  composition: string;
  usage: string;
  safety: string;
  packaging: string;
  crops: string;
}

/* 🔒 ONE NORMALIZATION FUNCTION */
export function normalize(value: string) {
  if (!value) return "";
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/* 🔒 SAFE FIELD READER */
function getField(fields: any, names: string[]) {
  for (const name of names) {
    if (fields[name]) return String(fields[name]).trim();
  }
  return "";
}

/* 🔒 CONVERT IMAGE URL TO LOCAL PATH */
function convertToLocalImagePath(imageUrl: string | undefined): string {
  if (!imageUrl) return "";
  
  try {
    // Extract filename from URL
    const urlObj = new URL(imageUrl);
    const pathname = urlObj.pathname;
    const filename = pathname.split('/').pop(); // Get the last part after the last '/'
    
    if (filename) {
      // Return local path format: /products/filename.png
      return `/products/${filename}`;
    }
  } catch (error) {
    // If URL parsing fails, try to extract filename with regex
    const match = imageUrl.match(/([^\/?#]+)(\?|#|$)/);
    if (match && match[1]) {
      return `/products/${match[1]}`;
    }
  }
  
  return ""; // Return empty string if unable to extract filename
}

/* 🔒 AIRTABLE INIT */
function getBase() {
  if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
    return null;
  }
  return new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_ID
  );
}

/* 🔒 FALLBACK PRODUCTS (shown when Airtable is not configured) */
const FALLBACK_PRODUCTS: Product[] = [
  {
    id: "fb-1", name: "MD NPK 19:19:19", slug: "md-npk-19-19-19", category: "npk-fertilizers",
    image: "/products/md-npk-191919.png", tagline: "Balanced NPK for all-round crop growth",
    specifications: "Water soluble NPK fertilizer with 19% Nitrogen, 19% Phosphorus, 19% Potassium.",
    benefits: "Promotes vegetative growth, root development, and fruit setting. Suitable for all crops.",
    composition: "N: 19%, P2O5: 19%, K2O: 19%. Fully water soluble grade.",
    usage: "Foliar spray: 2-3 g/L. Drip irrigation: 1-2 kg/acre. Apply during active growth period.",
    safety: "Store in cool dry place. Avoid contact with eyes. Use protective gear while handling.",
    packaging: "Available in 1 kg, 5 kg, 10 kg, and 25 kg packs.",
    crops: "Wheat, Rice, Cotton, Vegetables, Fruits, Flowers, Pulses.",
  },
  {
    id: "fb-2", name: "MD NPK 13:00:45", slug: "md-npk-13-00-45", category: "npk-fertilizers",
    image: "/products/md-npk-130045.png", tagline: "High potassium formula for fruit & grain quality",
    specifications: "Water soluble grade with 13% Nitrogen and 45% Potassium for quality yield.",
    benefits: "Improves fruit size, color, and shelf life. Strengthens disease resistance.",
    composition: "N: 13%, P2O5: 0%, K2O: 45%. Premium water soluble formulation.",
    usage: "Foliar spray: 1.5-2 g/L. Drip: 1 kg/acre. Apply during flowering and fruiting stages.",
    safety: "Keep away from children. Store in ventilated area. Wear gloves during application.",
    packaging: "1 kg, 5 kg, and 25 kg bags available.",
    crops: "Banana, Grapes, Pomegranate, Tomato, Potato, Rice, Sugarcane.",
  },
  {
    id: "fb-3", name: "MD Micronutrient Mix", slug: "md-micronutrient-mix", category: "micronutrients",
    image: "/products/md-micronutrient.png", tagline: "Complete micronutrient blend for soil & plant health",
    specifications: "Contains Zinc, Iron, Manganese, Boron, Copper, and Molybdenum in chelated form.",
    benefits: "Corrects hidden hunger, prevents nutrient deficiencies, boosts enzyme activity.",
    composition: "Zn: 6%, Fe: 4%, Mn: 3%, B: 2%, Cu: 1%, Mo: 0.1%. EDTA chelated.",
    usage: "Foliar: 2-3 g/L. Soil application: 2-3 kg/acre. Repeat every 15-20 days.",
    safety: "Non-toxic when used as directed. Avoid mixing with alkaline solutions.",
    packaging: "500g, 1 kg, 5 kg packs.",
    crops: "All crops including cereals, pulses, oilseeds, vegetables, and fruits.",
  },
  {
    id: "fb-4", name: "MD Biostimulant Plus", slug: "md-biostimulant-plus", category: "biostimulants",
    image: "/products/md-biostimulant.png", tagline: "Natural biostimulant for stress tolerance & yield",
    specifications: "Organic-based biostimulant with amino acids, humic acid, and seaweed extract.",
    benefits: "Enhances root growth, improves nutrient uptake, increases abiotic stress tolerance.",
    composition: "L-Amino acids: 15%, Humic acid: 10%, Seaweed extract: 8%, Organic matter: 30%.",
    usage: "Foliar: 2-3 mL/L. Drip: 5-10 mL/acre. Apply at critical growth stages.",
    safety: "Safe for organic farming. Store below 35°C. Shake well before use.",
    packaging: "250 mL, 500 mL, 1 L, and 5 L bottles.",
    crops: "Recommended for all field crops, horticulture, and plantation crops.",
  },
  {
    id: "fb-5", name: "MD NPK 10:26:26", slug: "md-npk-10-26-26", category: "npk-fertilizers",
    image: "/products/md-npk-102626.png", tagline: "Phosphorus-rich blend for strong root systems",
    specifications: "Water soluble NPK with high phosphorus and potassium for early crop stages.",
    benefits: "Promotes strong root establishment, early vigor, and better nutrient absorption.",
    composition: "N: 10%, P2O5: 26%, K2O: 26%. Highly soluble grade.",
    usage: "Foliar: 2-3 g/L. Soil application through drip: 1.5 kg/acre.",
    safety: "Standard fertilizer safety precautions apply. Store dry.",
    packaging: "1 kg, 5 kg, and 25 kg available.",
    crops: "Vegetables, fruits, pulses, groundnut, soybean, potato.",
  },
  {
    id: "fb-6", name: "MD Zinc Sulphate 33%", slug: "md-zinc-sulphate-33", category: "micronutrients",
    image: "/products/md-zinc-sulphate.png", tagline: "Essential zinc supplement for crop vitality",
    specifications: "Water soluble Zinc Sulphate with 33% Zinc for quick deficiency correction.",
    benefits: "Prevents zinc deficiency, improves chlorophyll content, boosts enzyme function.",
    composition: "Zn: 33% (as ZnSO4.H2O). Water soluble grade.",
    usage: "Foliar: 2-3 g/L. Soil: 5-10 kg/acre. Apply at sowing or early growth.",
    safety: "Avoid inhalation. Use mask during mixing. Store in dry conditions.",
    packaging: "1 kg, 5 kg, 25 kg bags.",
    crops: "Rice, Wheat, Maize, Citrus, Mango, Apple, Cotton.",
  },
];

/* ✅ GET ALL PRODUCTS */
export async function getProducts(): Promise<Product[]> {
  const base = getBase();
  if (!base) return FALLBACK_PRODUCTS;
  const table = process.env.AIRTABLE_TABLE_NAME || "Products";

  const records = await base(table).select().all();

  return records.map((record) => {
    const f = record.fields as any;

    const imageField = f.Image;
    let image = "";

    // CASE 1: If Airtable field was Attachment
    if (Array.isArray(imageField) && imageField[0]?.url) {
      image = convertToLocalImagePath(imageField[0].url);
    }

    // CASE 2: If Airtable field is single line text (local paths)
    if (typeof imageField === "string") {
      // Already correct path like: /products/md-npk-191919.png
      image = imageField.trim();
    }

    const name = getField(f, ["Name", "NAME"]);

    return {
      id: record.id,
      name,
      slug: normalize(getField(f, ["Slug"]) || name),
      category: normalize(getField(f, ["Category"])),
      image,
      tagline: getField(f, ["Tagline"]),
      specifications: getField(f, ["Specifications"]),
      benefits: getField(f, ["Benefits"]),
      composition: getField(f, ["Composition"]),
      usage: getField(f, [
        "Usage Instructions",
        "Usage",
        "usage",
      ]),
      safety: getField(f, [
        "Safety Information",
        "Safety",
        "safety",
      ]),
      packaging: getField(f, [
        "Packaging Sizes",
        "Packaging",
        "packaging",
      ]),
      crops: getField(f, [
        "Suitable Crops",
        "Crops",
        "crops",
      ]),
    };
  });
}

/* ✅ GET SINGLE PRODUCT BY SLUG ONLY */
export async function getProductBySlug(
  _category: string, // Unused parameter since we're removing category from URL
  slug: string
): Promise<Product | null> {
  const products = await getProducts();

  const normalizedSlug = normalize(slug);
  
  // Look for product by matching normalized slug or name
  const product = products.find(
    (p) =>
      normalize(p.slug || p.name) === normalizedSlug
  );

  return product || null;
}