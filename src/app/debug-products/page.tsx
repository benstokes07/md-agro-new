import { getProducts, normalize } from "@/lib/products-server";

export default async function DebugProductsPage() {
  const products = await getProducts();
  
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Debug Products</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">All Products:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => {
            const normalizedCategory = normalize(product.category);
            const normalizedSlug = normalize(product.slug || product.name);
            
            return (
              <div key={product.id} className="border p-4 rounded-lg">
                <h3 className="font-bold">{product.name}</h3>
                <p className="text-sm text-gray-600">Category: {product.category}</p>
                <p className="text-sm text-gray-600">Slug: {product.slug}</p>
                <div className="mt-2 p-2 bg-gray-100 rounded">
                  <p className="text-xs font-mono">Normalized Category: {normalizedCategory}</p>
                  <p className="text-xs font-mono">Normalized Slug: {normalizedSlug}</p>
                  <p className="text-xs font-mono mt-1">
                    URL: /products/{normalizedCategory}/{normalizedSlug}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Test Links:</h2>
        <div className="space-y-2">
          {products.slice(0, 5).map((product) => {
            const normalizedCategory = normalize(product.category);
            const normalizedSlug = normalize(product.slug || product.name);
            
            return (
              <div key={`link-${product.id}`}>
                <a 
                  href={`/products/${normalizedCategory}/${normalizedSlug}`}
                  className="text-blue-600 hover:underline"
                >
                  Test: {product.name} → /products/{normalizedCategory}/{normalizedSlug}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}