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
      name: record.get("Name") || "",
      slug: record.get("Slug") || "",
      category: record.get("Category") || "",
      image: imageUrl,
      tagline: record.get("Tagline") || "",
      specifications: record.get("Specifications") || "",
      benefits: record.get("Benefits") || "",
      composition: record.get("Composition") || "",
      usageInstructions: record.get("Usage") || "",
      safetyInformation: record.get("Safety") || "",
      packagingSizes: record.get("Packaging") || "",
      suitableCrops: record.get("Crops") || "",
    };
  });
}

export async function getProductBySlug(
  slug: string
): Promise<Product | undefined> {
  const all = await getProducts();
  return all.find((p) => p.slug === slug);
}

export function getCategories(products: Product[]) {
  const categories = products.map((p) => p.category);
  return [...new Set(categories)];
}
