import Airtable from "airtable";

export type Product = {
  id?: string;
  name: string;
  slug: string;
  category: string;
  image: string | any;
  tagline: string;
  specifications: string;
  composition: string;
  usageInstructions: string;
  benefits: string;
  safetyInformation: string;
  packagingSizes: string;
  suitableCrops: string;
};

// Setup Airtable connection
const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN! }).base(
  process.env.AIRTABLE_BASE_ID!
);

export async function getProducts(): Promise<Product[]> {
  try {
    const tableName = process.env.AIRTABLE_TABLE_NAME!;
    const records = await base(tableName).select({}).all();

    return records.map((record) => {
      const imageAttachment = record.get("Image");
      const imageUrl =
        Array.isArray(imageAttachment) && imageAttachment.length > 0
          ? imageAttachment[0].url
          : "";

      return {
        id: record.id,
        name: String(record.get("Name") || ""),
        slug: String(record.get("Slug") || ""),
        category: String(record.get("Category") || ""),
        image: imageUrl,
        tagline: String(record.get("Tagline") || ""),
        specifications: String(record.get("Specifications") || ""),
        benefits: String(record.get("Benefits") || ""),
        composition: String(record.get("Composition") || ""),
        usageInstructions: String(record.get("Usage") || ""),
        safetyInformation: String(record.get("Safety") || ""),
        packagingSizes: String(record.get("Packaging") || ""),
        suitableCrops: String(record.get("Crops") || ""),
      };
    });
  } catch (error) {
    console.error("Error fetching products from Airtable:", error);
    // Return empty array or fallback data
    return [];
  }
}

export async function getProductBySlug(
  slug: string
): Promise<Product | undefined> {
  try {
    const all = await getProducts();
    return all.find((p) => p.slug === slug);
  } catch (error) {
    console.error(`Error fetching product by slug ${slug}:`, error);
    return undefined;
  }
}

export function getCategories(products: Product[]) {
  const categories = products.map((p) => p.category);
  return [...new Set(categories)];
}
