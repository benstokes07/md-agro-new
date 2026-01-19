import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users, TestTubeDiagonal, ChevronDown } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { getProducts } from "@/lib/products-server";
import { AnimatedSection } from "@/components/animated-section";

export default async function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-image");

  // ✅ Load products from AIRTABLE
  const allProducts = await getProducts();
  const featuredProducts = allProducts.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-center text-white overflow-hidden">
        {heroImage && (
          <div className="parallax-bg absolute inset-0">
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              priority
              className="object-cover animate-fade-in"
              data-ai-hint={heroImage.imageHint}
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-transparent" />
        <div className="relative z-10 max-w-4xl p-4 text-center">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-shadow-lg animate-slide-up text-gradient">
            Rooted in trust, Growing your success
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto animate-fade-in delay-200">
            MD Agro Solution provides advanced fertilizers and soil
            conditioners to empower farmers and cultivate a sustainable future.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 animate-fade-in delay-300">
            <Button asChild size="lg" className="font-bold hover:scale-105 transition-transform hover-lift shadow-lg">
              <Link href="/products" className="gap-2">
                Explore Fertilizers <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="font-bold hover:scale-105 transition-transform hover-lift shadow-lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Link href="#products" className="text-white/80 hover:text-white transition-colors">
            <ChevronDown className="h-6 w-6" />
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <AnimatedSection animationClass="animate-fade-in" delay={200}>
        <section id="products" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <AnimatedSection animationClass="animate-slide-up" delay={100}>
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-center text-primary mb-4">
                Our Key Fertilizers
              </h2>
            </AnimatedSection>
            <AnimatedSection animationClass="animate-fade-in" delay={200}>
              <p className="text-center max-w-2xl mx-auto text-lg mb-12">
                Discover our range of high-performance fertilizers designed for
                maximum yield and soil health.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {featuredProducts.map((product, index) => (
                <AnimatedSection 
                  key={product.slug}
                  animationClass="animate-slide-up"
                  delay={300 + (index * 100)}
                >
                  <ProductCard product={product} />
                </AnimatedSection>
              ))}
            </div>

            <div className="text-center mt-12">
              <AnimatedSection animationClass="animate-fade-in" delay={500}>
                <Button asChild variant="outline" size="lg">
                  <Link href="/products">View All Products</Link>
                </Button>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Why Choose Us Section */}
      <AnimatedSection animationClass="animate-fade-in" delay={300}>
        <section className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4">
            <AnimatedSection animationClass="animate-slide-up" delay={100}>
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-center text-primary mb-12">
                Why Partner with MD Agro Solution?
              </h2>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 text-center">
              <AnimatedSection animationClass="animate-slide-in-left" delay={200}>
                <div className="flex flex-col items-center hover-lift transition-all duration-300 p-4 rounded-lg hover:bg-accent/10 min-h-[200px]">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-4 animate-float">
                    <Logo className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-headline font-bold mb-2 text-center">
                    Premium Ingredients
                  </h3>
                  <p className="text-sm md:text-base text-center">
                    Our fertilizers undergo rigorous testing to ensure they meet the
                    highest standards of quality and nutrient purity.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection animationClass="animate-slide-up" delay={300}>
                <div className="flex flex-col items-center hover-lift transition-all duration-300 p-4 rounded-lg hover:bg-accent/10 min-h-[200px]">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-4 animate-float">
                    <TestTubeDiagonal className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-headline font-bold mb-2">
                    Science-Backed Formulas
                  </h3>
                  <p className="text-sm md:text-base">
                    We leverage modern soil science to create nutrient solutions
                    that solve farming challenges.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection animationClass="animate-slide-in-right" delay={400}>
                <div className="flex flex-col items-center hover-lift transition-all duration-300 p-4 rounded-lg hover:bg-accent/10 min-h-[200px]">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-4 animate-float">
                    <Users className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-headline font-bold mb-2">
                    Farmer-First Approach
                  </h3>
                  <p className="text-sm md:text-base">
                    Your success is our mission — we provide insights, guidance, and
                    support for boosting yields.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
