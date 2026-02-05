import { getProductBySlug, normalize, getProducts } from "@/lib/products-server";

// Add generateStaticParams for production builds
export async function generateStaticParams() {
  try {
    const products = await getProducts();
    
    return products.map((p) => {
      // Ensure category and slug are properly normalized for the URL structure
      const normalizedCategory = normalize(p.category);
      const normalizedSlug = normalize(p.slug || p.name); // Fallback to name if no slug
      
      return {
        slug: [normalizedCategory, normalizedSlug],
      };
    });
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [];
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  // Await the params
  const awaitedParams = await params;
  
  // URL must be /products/category/product-slug
  if (!awaitedParams.slug || awaitedParams.slug.length < 2) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600">Invalid URL. Category or slug missing.</p>
        </div>
      </div>
    );
  }

  const [rawCategory, rawSlug] = awaitedParams.slug;

  const category = normalize(decodeURIComponent(rawCategory));
  const slug = normalize(decodeURIComponent(rawSlug));

  const product = await getProductBySlug(category, slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {product.tagline || "Product information coming soon."}
          </p>
        </div>

        {/* Image Section */}
        <div className="mb-12">
          {product.image ? (
            <div className="relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-auto object-contain max-h-[600px] transition-transform duration-500 hover:scale-105"
              />
            </div>
          ) : (
            <div className="bg-gray-200 border-2 border-dashed border-gray-300 rounded-2xl h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📦</div>
                <p className="text-gray-500 text-lg">No Image Available</p>
              </div>
            </div>
          )}
        </div>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-3">📋</span>
                Specifications
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {product.specifications || "Product specifications will be updated soon."}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-3">🧪</span>
                Composition
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {product.composition || "Product composition details will be added shortly."}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-3">✨</span>
                Benefits
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {product.benefits || "Product benefits information coming soon."}
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-3">📝</span>
                Usage Instructions
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {product.usage || "Usage instructions will be updated soon."}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-3">⚠️</span>
                Safety Information
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {product.safety || "Follow standard safety practices while using this product."}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-3">📦</span>
                Packaging & Crops
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Packaging Sizes:</h3>
                  <p className="text-gray-700">
                    {product.packaging || "Packaging information will be added soon."}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Suitable Crops:</h3>
                  <p className="text-gray-700">
                    {product.crops || "Crop suitability information coming soon."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Badge */}
        <div className="mt-12 text-center">
          <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-full">
            Category: {product.category}
          </span>
        </div>
      </div>
    </div>
  );
}