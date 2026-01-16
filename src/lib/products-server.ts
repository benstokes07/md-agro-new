import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const productsDirectory = path.join(process.cwd(), 'content/products');

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  image: string;
  tagline: string;
  specifications: string;
  composition: string;
  usageInstructions: string;
  benefits: string;
  safetyInformation: string;
  packagingSizes: string;
  suitableCrops: string;
};

export async function getProducts(): Promise<Product[]> {
  const fileNames = fs.readdirSync(productsDirectory);
  const allProductsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const slug = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(productsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      slug,
      id: slug,
      ...(matterResult.data as Omit<Product, 'id' | 'slug'>),
    };
  });

  // Sort products by name
  return allProductsData.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const fullPath = path.join(productsDirectory, `${slug}.md`);
  
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      slug,
      id: slug,
      ...(matterResult.data as Omit<Product, 'id' | 'slug'>),
    };
  } catch (error) {
    console.error(`Error reading product file for slug: ${slug}`, error);
    return undefined;
  }
}

export function getCategories(products: Product[]) {
  const categories = products.map((p) => p.category);
  return [...new Set(categories)];
}
