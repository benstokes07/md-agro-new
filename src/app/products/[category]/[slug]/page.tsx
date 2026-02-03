import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  getProducts,
  getProductBySlug,
  type Product,
} from "@/lib/products-server";
import { slugify } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ListChecks,
  ShieldAlert,
  FlaskConical,
  Box,
  Trees,
  BookOpen,
  Leaf,
  Award,
  Clock,
  Zap,
} from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  // 404 handler
  if (!product) return notFound();

  const allProducts = await getProducts();

  const relatedProducts = allProducts
    .filter(
      (p) => p.category === product.category && p.slug !== product.slug
    )
    .slice(0, 3);

  const markdownComponents = {
    ul: ({ node, ...props }: any) => (
      <ul className="list-disc list-inside space-y-2 pl-2" {...props} />
    ),
    p: ({ node, ...props }: any) => <p className="pb-2" {...props} />,
  };

  const fallbackImage = "/logo.png"; // Use existing logo as fallback

  return (
    <div className="bg-gradient-to-br from-background to-secondary/5 min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Breadcrumb */}
        <nav className="mb-6 md:mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm md:text-base text-foreground/70">
            <li>
              <Link href="/products" className="hover:text-primary transition-colors">
                Products
              </Link>
            </li>
            <li className="text-foreground/30">/</li>
            <li>
              <Link
                href={`/products#${slugify(product.category)}`}
                className="hover:text-primary transition-colors"
              >
                {product.category}
              </Link>
            </li>
            <li className="text-foreground/30">/</li>
            <li className="text-foreground font-medium truncate max-w-[200px] md:max-w-none">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Product Image Section */}
          <div className="relative animate-slide-in-left">
            <div className="aspect-[4/5] relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 group">
              <Image
                src={product.image || fallbackImage}
                alt={product.name}
                fill
                priority
                className="object-contain transition-transform duration-700 group-hover:scale-105 image-hover"  // Changed from object-cover to object-contain
                sizes="(max-width: 1023px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <Badge className="absolute top-4 left-4 bg-primary/90 text-primary-foreground backdrop-blur-sm animate-fade-in-up">
                Featured Product
              </Badge>
            </div>
            
            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-card/80 backdrop-blur-sm rounded-xl p-4 border border-border/50 hover:shadow-lg transition-all">
                <div className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Eco-Friendly</span>
                </div>
              </div>
              <div className="bg-card/80 backdrop-blur-sm rounded-xl p-4 border border-border/50 hover:shadow-lg transition-all">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Quality Tested</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="space-y-8 animate-slide-in-right">
            {/* Product Header */}
            <div className="space-y-4 animate-fade-in-up stagger-delay-1">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="secondary" className="text-sm py-1 px-3 animate-pulse">
                  {product.category}
                </Badge>
                <div className="flex items-center gap-1 text-foreground/60">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Premium Quality</span>
                </div>
              </div>
              
              <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                {product.name}
              </h1>
              
              <p className="text-lg md:text-xl text-foreground/80 max-w-3xl">
                {product.tagline || "Advanced agricultural solution for optimal crop performance and sustainable farming practices."}
              </p>
            </div>

            {/* Key Specifications */}
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover-lift-card animate-fade-in-up stagger-delay-2">
              <h2 className="text-xl font-headline font-bold mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary animate-pulse" />
                Key Specifications
              </h2>
              <div className="prose prose-sm md:prose-base max-w-none text-foreground/90">
                <ReactMarkdown components={markdownComponents}>
                  {product.specifications || "Premium formulation designed for maximum efficacy and crop health."}
                </ReactMarkdown>
              </div>
            </div>

            {/* Enhanced Accordion Sections */}
            <div className="space-y-4 animate-fade-in-up stagger-delay-3">
              <h2 className="text-2xl font-headline font-bold gradient-text">Product Information</h2>
              <Accordion
                type="single"
                collapsible
                defaultValue="item-1"
                className="w-full"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg font-headline bg-card/50 hover:bg-card/80 px-4 py-3 rounded-lg transition-all">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <ListChecks className="h-5 w-5 text-primary" />
                      </div>
                      <span>Key Benefits</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pt-2 pb-4">
                    <div className="prose prose-sm max-w-none text-foreground/90 bg-muted/30 rounded-lg p-4">
                      <ReactMarkdown components={markdownComponents}>
                        {product.benefits || "Enhanced crop yield, improved soil health, and sustainable farming practices."}
                      </ReactMarkdown>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-lg font-headline bg-card/50 hover:bg-card/80 px-4 py-3 rounded-lg transition-all">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FlaskConical className="h-5 w-5 text-primary" />
                      </div>
                      <span>Composition Details</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pt-2 pb-4">
                    <div className="prose prose-sm max-w-none text-foreground/90 bg-muted/30 rounded-lg p-4">
                      <ReactMarkdown components={markdownComponents}>
                        {product.composition || "Scientifically balanced formula with essential nutrients for optimal plant growth."}
                      </ReactMarkdown>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-lg font-headline bg-card/50 hover:bg-card/80 px-4 py-3 rounded-lg transition-all">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <span>Usage Guidelines</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pt-2 pb-4">
                    <div className="prose prose-sm max-w-none text-foreground/90 bg-muted/30 rounded-lg p-4">
                      <ReactMarkdown components={markdownComponents}>
                        {product.usageInstructions || "Follow recommended application rates and timing for best results."}
                      </ReactMarkdown>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-lg font-headline bg-card/50 hover:bg-card/80 px-4 py-3 rounded-lg transition-all">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <ShieldAlert className="h-5 w-5 text-primary" />
                      </div>
                      <span>Safety & Storage</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pt-2 pb-4">
                    <div className="prose prose-sm max-w-none text-foreground/90 bg-muted/30 rounded-lg p-4">
                      <ReactMarkdown components={markdownComponents}>
                        {product.safetyInformation || "Store in cool, dry place away from direct sunlight and moisture."}
                      </ReactMarkdown>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Additional Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up stagger-delay-4">
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-6 border border-primary/10 hover-lift-card transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-primary/10 rounded-xl animate-pulse">
                    <Box className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-headline font-bold">Packaging Options</h3>
                </div>
                <p className="text-foreground/90">
                  {product.packagingSizes || "Available in multiple packaging sizes to suit your farming needs."}
                </p>
              </div>

              <div className="bg-gradient-to-br from-accent/5 to-secondary/5 rounded-2xl p-6 border border-accent/10 hover-lift-card transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-accent/10 rounded-xl animate-pulse">
                    <Trees className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-headline font-bold">Ideal For</h3>
                </div>
                <p className="text-foreground/90">
                  {product.suitableCrops || "Suitable for a wide variety of crops and growing conditions."}
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-center text-primary-foreground animate-fade-in-up stagger-delay-5">
              <h3 className="text-2xl font-headline font-bold mb-3">Ready to Enhance Your Harvest?</h3>
              <p className="text-lg mb-6 opacity-90">Contact us today to learn more about this premium product</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary" className="font-bold hover:scale-105 transition-transform">
                  <Link href="/contact">Get Quote</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="font-bold border-white/30 text-white hover:bg-white/10 hover:scale-105 transition-all">
                  <Link href="/products">View All Products</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-border/30">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Related Products
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Explore our other premium agricultural solutions
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((p, index) => (
                <div 
                  key={p.slug} 
                  className="transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button asChild variant="outline" size="lg" className="font-bold hover:scale-105 transition-transform">
                <Link href="/products">View All Products</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const products = await getProducts();

  return products.map((product) => ({
    category: slugify(product.category),
    slug: product.slug,
  }));
}