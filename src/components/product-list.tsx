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
    setLoading(true);
    try {
      const res = await fetch("/api/products");

      if (!res.ok) {
        throw new Error("API error");
      }

      const data: Product[] = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="text-right mb-6">
        <Button
          onClick={refreshProducts}
          variant="outline"
          size="sm"
          disabled={loading}
          className="gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Refreshing..." : "Refresh Products"}
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