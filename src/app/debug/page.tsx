import { getProducts } from "@/lib/products-server";

export default async function DebugPage() {
  const products = await getProducts();
  
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Debug Information</h1>
      
      <div className="bg-card p-6 rounded-lg mb-8">
        <h2 className="text-xl font-bold mb-4">Products Data</h2>
        <div className="overflow-auto max-h-[600px] bg-gray-50 p-4 rounded">
          <pre className="whitespace-pre-wrap break-words text-sm">
            {JSON.stringify(products, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}