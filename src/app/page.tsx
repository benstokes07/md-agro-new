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
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] w-full flex items-center justify-center text-center text-white overflow-hidden">
        {heroImage && (
          <div className="absolute inset-0">
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              priority
              className="object-cover scale-110 animate-scale-in"
              data-ai-hint={heroImage.imageHint}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/60" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/30 to-transparent" />
          </div>
        )}
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-slide-in-left">
            <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Trusted by over 10,000 farmers</span>
          </div>
          
          <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-tight">
            <span className="block">Rooted in </span>
            <span className="block text-gradient bg-clip-text text-transparent">Trust</span>
            <span className="block">Growing your </span>
            <span className="block text-gradient bg-clip-text text-transparent">Success</span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto text-white/90 leading-relaxed animate-fade-in-up stagger-delay-1">
            MD Agro Solution & Trading Co. provides advanced fertilizers and soil
            conditioners to empower farmers and cultivate a sustainable future.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-10 animate-fade-in-up stagger-delay-2">
            <Button asChild size="lg" className="font-bold hover:scale-105 transition-transform hover-lift shadow-2xl bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg">
              <Link href="/products" className="gap-2">
                <ArrowRight className="ml-2" />
                Explore Fertilizers
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="font-bold hover:scale-105 transition-transform hover-lift shadow-2xl bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 px-8 py-6 text-lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Link href="#products" className="text-white/80 hover:text-white transition-all duration-300 hover:scale-110">
            <ChevronDown className="h-8 w-8" />
          </Link>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="h-2 w-2 bg-yellow-400 rounded-full opacity-70"></div>
        </div>
        <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '1s' }}>
          <div className="h-3 w-3 bg-green-400 rounded-full opacity-50"></div>
        </div>
        <div className="absolute bottom-40 left-20 animate-float" style={{ animationDelay: '2s' }}>
          <div className="h-2 w-2 bg-blue-400 rounded-full opacity-60"></div>
        </div>
      </section>

      {/* Featured Products Section */}
      <AnimatedSection animationClass="animate-fade-in" delay={200}>
        <section id="products" className="py-16 md:py-24 bg-gradient-to-b from-background to-accent/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 relative">
              <AnimatedSection animationClass="animate-slide-up" delay={100}>
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-center text-primary mb-4 bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent">
                  Our Key Fertilizers
                </h2>
              </AnimatedSection>
              <AnimatedSection animationClass="animate-fade-in" delay={200}>
                <p className="text-center max-w-2xl mx-auto text-lg text-muted-foreground mb-2">
                  Discover our range of high-performance fertilizers designed for
                  maximum yield and soil health.
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4 rounded-full"></div>
              </AnimatedSection>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product, index) => (
                <AnimatedSection 
                  key={product.slug}
                  animationClass="animate-slide-up"
                  delay={300 + (index * 100)}
                >
                  <div className="group hover-lift transition-all duration-500 transform hover:-translate-y-2">
                    <ProductCard product={product} />
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <div className="text-center mt-16">
              <AnimatedSection animationClass="animate-fade-in" delay={500}>
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90 text-primary-foreground px-8 py-6 text-lg font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <Link href="/products" className="gap-2">
                    View All Products
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Why Choose Us Section */}
      <AnimatedSection animationClass="animate-fade-in" delay={300}>
        <section className="py-16 md:py-24 bg-gradient-to-b from-accent/10 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 relative">
              <AnimatedSection animationClass="animate-slide-up" delay={100}>
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-center text-primary mb-4 bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent">
                  Why Partner with MD Agro Solution?
                </h2>
              </AnimatedSection>
              <AnimatedSection animationClass="animate-fade-in" delay={200}>
                <p className="text-center max-w-2xl mx-auto text-lg text-muted-foreground mb-2">
                  We're committed to empowering farmers with innovative solutions
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4 rounded-full"></div>
              </AnimatedSection>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <AnimatedSection animationClass="animate-slide-up" delay={300}>
                <div className="group flex flex-col items-center p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-500 hover-lift hover:-translate-y-2 text-center">
                  <div className="flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-primary to-green-600 text-primary-foreground mb-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                    <TestTubeDiagonal className="h-10 w-10 relative z-10" />
                  </div>
                  <h3 className="text-xl font-headline font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    Science-Backed Formulas
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground group-hover:text-foreground transition-colors">
                    We leverage modern soil science to create nutrient solutions
                    that solve farming challenges.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection animationClass="animate-slide-in-right" delay={400}>
                <div className="group flex flex-col items-center p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-500 hover-lift hover:-translate-y-2 text-center">
                  <div className="flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-primary to-green-600 text-primary-foreground mb-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                    <Users className="h-10 w-10 relative z-10" />
                  </div>
                  <h3 className="text-xl font-headline font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    Farmer-First Approach
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground group-hover:text-foreground transition-colors">
                    Your success is our mission — we provide insights, guidance, and
                    support for boosting yields.
                  </p>
                </div>
              </AnimatedSection>
              
              <AnimatedSection animationClass="animate-slide-in-left" delay={500}>
                <div className="group flex flex-col items-center p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-500 hover-lift hover:-translate-y-2 text-center">
                  <div className="flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-primary to-green-600 text-primary-foreground mb-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                    <ArrowRight className="h-10 w-10 rotate-45 relative z-10" />
                  </div>
                  <h3 className="text-xl font-headline font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    Proven Results
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground group-hover:text-foreground transition-colors">
                    Our fertilizers have helped thousands of farmers achieve
                    higher yields and better profits.
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