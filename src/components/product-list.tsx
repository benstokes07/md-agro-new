"use client";

import { useState } from "react";
import { ProductCard } from "@/components/product-card";
import { type Product } from "@/lib/products-server";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products: initialProducts }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);

  const refreshProducts = async () => {
    // Since we're using static export, we can't call API routes
    // In a static site, the products are already embedded in the page
    // So this refresh function is disabled for static export
    console.log("Refresh disabled in static export mode");
  };

  return (
    <div>
      <div className="text-right mb-6">
        <Button
          onClick={refreshProducts}
          variant="outline"
          size="sm"
          disabled={true} /* Disabled for static export */
          className="gap-2 opacity-50 cursor-not-allowed"
        >
          <RefreshCw className={`h-4 w-4`} />
          Static Content
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard
            key={`${product.slug}-${index}`}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}