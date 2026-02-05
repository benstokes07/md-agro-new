// src/app/products/page.tsx
import { getProducts, type Product, normalize } from "@/lib/products-server";
import { ProductList } from "@/components/product-list";
import { Suspense } from 'react';
import { LoadingSpinner } from "@/components/loading-spinner";

async function ProductsContent() {
  const products: Product[] = await getProducts(); // server-side fetch
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      {/* Page Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl">
          Our Products
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
          A complete range of solutions for modern agriculture.
        </p>
      </div>

      {/* Categories */}
      {categories.map((category) => {
        const normalizedCategory = normalize(category);
        
        return (
          <section
            key={normalizedCategory}
            id={normalizedCategory}
            className="mb-16 scroll-mt-24"
          >
            <h2 className="text-3xl font-headline font-bold text-primary mb-8 border-b-2 border-primary/20 pb-2">
              {category}
            </h2>

            {/* Client component handles interactivity like refresh, hover effects */}
            <ProductList products={products.filter((p) => p.category === category)} />
          </section>
        );
      })}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div className="bg-background">
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <LoadingSpinner size="lg" className="mb-4" />
            <p className="text-foreground/70">Loading products...</p>
          </div>
        </div>
      }>
        <ProductsContent />
      </Suspense>
    </div>
  );
}