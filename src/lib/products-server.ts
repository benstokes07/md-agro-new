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