import type { Metadata } from 'next';
import { ArrowDown, Sprout } from 'lucide-react';
import { getProducts } from '@/lib/products-server';
import { ProductList } from '@/components/product-list';
import { AnimatedSection } from '@/components/animated-section';

export const metadata: Metadata = {
  title: 'Products | MD Agro Solution & Trading Co.',
  description: 'Explore the MD Agro product catalog.',
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden bg-[#213c2d] text-white">
        <div className="absolute -right-24 -top-32 h-[26rem] w-[26rem] rounded-full border border-white/[.08] sm:h-[38rem] sm:w-[38rem]" />
        <div className="absolute -right-8 -top-16 h-[22rem] w-[22rem] rounded-full border border-white/[.08] sm:h-[32rem] sm:w-[32rem]" />
        <div className="relative mx-auto flex min-h-[340px] max-w-[1440px] items-end justify-between gap-8 px-5 pb-12 pt-16 sm:min-h-[410px] sm:px-8 sm:pb-16 lg:px-12">
          <AnimatedSection animationClass="animate-slide-up" className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[.07] px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[.2em] text-white/75"><Sprout className="h-3.5 w-3.5 text-[#d9bb78]" /> Product catalog</span>
            <h1 className="mt-6 text-4xl font-medium leading-[1.02] tracking-[-.055em] sm:text-6xl lg:text-7xl">A closer look at <span className="font-serif italic font-normal text-[#d9bb78]">the range.</span></h1>
            <p className="mt-5 max-w-xl text-sm leading-6 text-white/70 sm:text-base sm:leading-7">Browse products by name or category. Open an item to view the information available for it.</p>
          </AnimatedSection>
          <div className="hidden shrink-0 items-center gap-3 pb-1 text-xs text-white/55 lg:flex"><span>{products.length} catalog {products.length === 1 ? 'item' : 'items'}</span><ArrowDown className="h-4 w-4" /></div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <AnimatedSection animationClass="animate-fade-in-up">
          {products.length ? (
            <ProductList products={products} />
          ) : (
            <div className="rounded-[1.5rem] border border-dashed border-border bg-card px-6 py-16 text-center">
              <h2 className="text-lg font-semibold">Products are temporarily unavailable</h2>
              <p className="mt-2 text-sm text-muted-foreground">Please try again later.</p>
            </div>
          )}
        </AnimatedSection>
      </section>
    </div>
  );
}
