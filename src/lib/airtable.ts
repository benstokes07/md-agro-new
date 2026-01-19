import Airtable from "airtable";

const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN! }).base(
  process.env.AIRTABLE_BASE_ID!
);

export async function getAirtableProducts() {
  const tableName = process.env.AIRTABLE_TABLE_NAME!;
  const records = await base(tableName).select({}).all();

  return records.map((record) => ({
    id: record.id,
    name: record.get("Name") || "",
    slug: record.get("Slug") || "",
    category: record.get("Category") || "",
    image: record.get("Image") || "",
    tagline: record.get("Tagline") || "",
    specifications: record.get("Specifications") || "",
    benefits: record.get("Benefits") || "",
    composition: record.get("Composition") || "",
    usageInstructions: record.get("Usage Instructions") || "",
    safetyInformation: record.get("Safety Information") || "",
    packagingSizes: record.get("Packaging Sizes") || "",
    suitableCrops: record.get("Suitable Crops") || "",
  }));
}
