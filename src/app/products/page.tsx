import { ProductCard } from "@/components/product-card";
import { slugify } from "@/lib/utils";
import { getProducts } from "@/lib/products-server";
import type { Product } from "@/lib/products-server";

export default async function ProductsPage() {
  // ✅ Load from Airtable
  const allProducts: Product[] = await getProducts();

  // Generate unique categories
  const categories = [...new Set(allProducts.map((p) => p.category))];

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center">
          <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl">
            Our Products
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            A complete range of solutions for modern agriculture.
          </p>
        </div>

        <div className="mt-16">
          {categories.map((category) => (
            <section
              key={category}
              id={slugify(category)}
              className="mb-16 scroll-mt-24"
            >
              <h2 className="text-3xl font-headline font-bold text-primary mb-8 border-b-2 border-primary/20 pb-2 animate-slide-up">
                {category}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                {allProducts
                  .filter((p) => p.category === category)
                  .map((product, index) => (
                    <div 
                      key={product.slug}
                      className="stagger-anim"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <ProductCard
                        product={product}
                        className="hover:scale-105 transition-transform hover-lift shadow-hover"
                      />
                    </div>
                  ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
