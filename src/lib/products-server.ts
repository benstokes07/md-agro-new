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
    
    console.log(`Fetched ${records.length} products from Airtable`);
    
    // Debug: Log all field names from the first few records
    if (records.length > 0) {
      console.log("Available fields in first record:", Object.keys(records[0].fields || {}));
      console.log("First record data:", records[0].fields);
      if (records.length > 1) {
        console.log("Second record data:", records[1].fields);
      }
      if (records.length > 2) {
        console.log("Third record data:", records[2].fields);
      }
    }

    // Map records to products, filtering out records that don't have valid names
    const products = records.map((record, index) => {
      // Access fields directly from the fields object
      const fields = record.fields || {};
      
      // Log the raw fields for this specific record to debug the name issue
      console.log(`Processing record ${index + 1} (${record.id}):`, fields);
      
      // Try different possible field names for product name
      const nameFields = ["Name", "name", "Product Name", "ProductName", "product_name", "TITLE", "title", "Item", "item", "product", "Product"];
      let productName = "";
      let nameFieldUsed = "";
      
      for (const field of nameFields) {
        if (fields[field]) {
          productName = String(fields[field]);
          nameFieldUsed = field;
          break;
        }
      }
      
      // If still no name found, try to find any field that might contain the product name by looking for fields with values matching known products
      if (!productName) {
        // Look through all field keys and values to find potential product name
        const fieldEntries = Object.entries(fields);
        for (const [key, value] of fieldEntries) {
          // Check if the field value looks like a product name (not just a number or empty)
          if (value && typeof value === 'string' && value.trim() !== '') {
            // If it contains typical product indicators or isn't just a number, consider it
            if (value.includes(' ') || value.includes('-') || value.includes('Mg') || value.includes('Sulphate') || 
                value.includes('Magnesium') || value.includes('Phosphate') || value.includes('Nitrogen')) {
              productName = String(value);
              nameFieldUsed = key;
              console.log(`Found potential product name '${productName}' in field '${key}' for record ${record.id}`);
              break;
            }
          }
        }
      }
      
      // If no name field is found, skip this record entirely
      if (!productName || productName.startsWith('Product ')) {
        console.log(`Skipping record ${record.id} - no valid product name found`);
        return null; // Mark this record for filtering out
      } else {
        console.log(`Using name '${productName}' from field '${nameFieldUsed}' for record ${record.id}`);
      }
      
      // Try different field names for images
      const imageFields = ["Image", "image", "Photo", "photo", "Picture", "picture", "IMG", "img", "Photos", "images", "Product Image", "product_image"];
      let imageAttachment = null;
      let imageFieldUsed = "";
      
      for (const field of imageFields) {
        const attachment = fields[field];
        if (attachment) {
          imageAttachment = attachment;
          imageFieldUsed = field;
          break;
        }
      }
      
      let imageUrl = "";
      
      // Handle Airtable image attachment properly
      if (Array.isArray(imageAttachment) && imageAttachment.length > 0) {
        const attachment = imageAttachment[0];
        if (typeof attachment === "object" && attachment !== null && "url" in attachment) {
          imageUrl = attachment.url as string;
        }
      }
      
      // Debug logging
      if (imageUrl) {
        console.log(`Product ${productName}: Image URL - ${imageUrl} (from field: ${imageFieldUsed})`);
      } else {
        console.log(`Product ${productName}: No image found`);
      }

      const productSlug = String(fields["Slug"] || fields["slug"] || productName.toLowerCase().replace(/\s+/g, '-'));

      // Look for various possible field names for other properties
      const category = String(
        fields["Category"] || 
        fields["category"] || 
        fields["CATEGORY"] || 
        fields["Type"] || 
        fields["type"] || 
        fields["Product Type"] || 
        fields["product_type"] || 
        "NPK Fertilizers"
      );
      
      const tagline = String(
        fields["Tagline"] || 
        fields["tagline"] || 
        fields["Description"] || 
        fields["description"] || 
        fields["Desc"] || 
        fields["desc"] || 
        "Premium agricultural solution"
      );
      
      const specifications = String(
        fields["Specifications"] || 
        fields["specifications"] || 
        fields["Specs"] || 
        fields["specs"] || 
        fields["Specification"] || 
        "High-quality fertilizer for optimal crop growth"
      );
      
      const benefits = String(
        fields["Benefits"] || 
        fields["benefits"] || 
        fields["Benefit"] || 
        fields["Advantages"] || 
        fields["advantages"] || 
        "Enhanced crop yield and soil health"
      );
      
      const composition = String(
        fields["Composition"] || 
        fields["composition"] || 
        fields["Formula"] || 
        fields["formula"] || 
        fields["Ingredients"] || 
        fields["ingredients"] || 
        "Balanced nutrient formula"
      );
      
      const usageInstructions = String(
        fields["Usage"] || 
        fields["usage"] || 
        fields["Usage Instructions"] || 
        fields["usage_instructions"] || 
        fields["How to Use"] || 
        fields["Application"] || 
        "Follow recommended application rates"
      );
      
      const safetyInformation = String(
        fields["Safety"] || 
        fields["safety"] || 
        fields["Safety Information"] || 
        fields["safety_information"] || 
        fields["Warnings"] || 
        fields["warning"] || 
        "Store in cool, dry place"
      );
      
      const packagingSizes = String(
        fields["Packaging"] || 
        fields["packaging"] || 
        fields["Packaging Sizes"] || 
        fields["packaging_sizes"] || 
        fields["Size"] || 
        fields["sizes"] || 
        "Available in various sizes"
      );
      
      const suitableCrops = String(
        fields["Crops"] || 
        fields["crops"] || 
        fields["Suitable Crops"] || 
        fields["suitable_crops"] || 
        fields["Crop"] || 
        fields["Target Crops"] || 
        "Suitable for various crops"
      );

      return {
        id: record.id,
        name: productName,
        slug: productSlug,
        category: category,
        image: imageUrl,
        tagline: tagline,
        specifications: specifications,
        benefits: benefits,
        composition: composition,
        usageInstructions: usageInstructions,
        safetyInformation: safetyInformation,
        packagingSizes: packagingSizes,
        suitableCrops: suitableCrops,
      };
    });

    // Filter out any null values (records without valid names)
    const validProducts = products.filter(product => product !== null) as Product[];
    
    console.log(`Returning ${validProducts.length} valid products from Airtable`);
    
    return validProducts;
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