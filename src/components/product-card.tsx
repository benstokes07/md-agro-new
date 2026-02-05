import { Product, normalize } from "@/lib/products-server";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // Use the same normalization approach as the page component
  const normalizedSlug = normalize(decodeURIComponent(product.slug || product.name));
  
  return (
    <Link
      href={`/products/${normalizedSlug}`}
      className="block border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
    >
      {product.image && <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />}
      <div className="p-4">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        {product.tagline && <p className="text-gray-600 text-sm mt-1">{product.tagline}</p>}
      </div>
    </Link>
  );
}