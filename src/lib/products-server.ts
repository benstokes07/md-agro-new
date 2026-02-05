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

/* 🔒 AIRTABLE INIT */
function getBase() {
  if (!process.env.AIRTABLE_API_KEY)
    throw new Error("Missing AIRTABLE_API_KEY");
  if (!process.env.AIRTABLE_BASE_ID)
    throw new Error("Missing AIRTABLE_BASE_ID");

  return new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_ID
  );
}

/* ✅ GET ALL PRODUCTS */
export async function getProducts(): Promise<Product[]> {
  const base = getBase();
  const table = process.env.AIRTABLE_TABLE_NAME || "Products";

  const records = await base(table).select().all();

  return records.map((record) => {
    const f = record.fields as any;

    const imageField = f.Image;
    const image =
      Array.isArray(imageField) && imageField[0]?.url
        ? imageField[0].url
        : "";

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