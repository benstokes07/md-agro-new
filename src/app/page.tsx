import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowRight, ArrowUpRight, Leaf, Sprout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AnimatedSection } from '@/components/animated-section';
import { getProducts, type Product } from '@/lib/products-server';

function readableCategory(value: string) {
  return value.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default async function HomePage() {
  const products = await getProducts();
  const categories = [...new Set(products.map((product) => product.category).filter(Boolean))];
  const featuredProducts = products.slice(0, 4);
  const heroImage = PlaceHolderImages.find((image) => image.id === 'hero-image');

  return (
    <div className="overflow-hidden">
      <section className="relative isolate min-h-[660px] overflow-hidden bg-[#14271e] text-white sm:min-h-[720px] lg:min-h-[min(780px,calc(100svh-76px))]">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover object-center opacity-70"
          />
        )}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(12,31,22,.94)_0%,rgba(12,31,22,.82)_42%,rgba(12,31,22,.25)_100%),linear-gradient(0deg,rgba(12,31,22,.42),transparent_40%)]" />
        <div className="absolute inset-0 -z-10 opacity-30 [background-image:radial-gradient(rgba(255,255,255,.28)_0.7px,transparent_0.7px)] [background-size:22px_22px] [mask-image:linear-gradient(90deg,black,transparent_70%)]" />

        <div className="mx-auto flex min-h-[660px] max-w-[1440px] items-center px-5 py-20 sm:min-h-[720px] sm:px-8 lg:min-h-[min(780px,calc(100svh-76px))] lg:px-12">
          <div className="max-w-[780px]">
            <AnimatedSection animationClass="animate-fade-in-up">
              <span className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[.08] px-4 py-2 text-[11px] font-semibold uppercase tracking-[.2em] text-white/85 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d7aa51]" /> MD Agro Solutions &amp; Trading Company
              </span>
            </AnimatedSection>
            <AnimatedSection animationClass="animate-slide-up" delay={100}>
                <h1 className="max-w-[750px] text-[clamp(3rem,8vw,7rem)] font-medium leading-[.96] tracking-[-.065em] text-white">
                Made for the work of <span className="font-serif italic font-normal text-[#d9bb78]">growing.</span>
              </h1>
            </AnimatedSection>
            <AnimatedSection animationClass="animate-slide-up" delay={180}>
              <p className="mt-7 max-w-[540px] text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                Explore MD Agro’s range of fertilizers, micronutrients and agricultural products.
              </p>
            </AnimatedSection>
            <AnimatedSection animationClass="animate-slide-up" delay={260}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="h-12 rounded-full bg-[#d9bb78] px-7 text-sm font-semibold text-[#17271f] hover:bg-[#e6ce98]">
                  <Link href="/products" className="gap-3">Explore the range <ArrowUpRight className="h-4 w-4" /></Link>
                </Button>
                <Button asChild variant="outline" className="h-12 rounded-full border-white/35 bg-white/[.06] px-7 text-sm text-white hover:bg-white/15 hover:text-white">
                  <Link href="/about">Discover MD Agro</Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>

        <Link href="#introduction" aria-label="Scroll to introduction" className="absolute bottom-8 right-5 flex min-h-11 items-center gap-3 text-[10px] uppercase tracking-[.2em] text-white/65 transition-colors hover:text-white sm:right-8 lg:right-12">
          Scroll to explore <span className="grid h-11 w-11 place-items-center rounded-full border border-white/30"><ArrowDown className="h-4 w-4" /></span>
        </Link>
      </section>

      <section id="introduction" className="scroll-mt-24 bg-background px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
          <AnimatedSection animationClass="animate-slide-up">
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-primary">An agricultural product company</p>
            <div className="mt-5 h-px w-16 bg-accent" />
          </AnimatedSection>
          <AnimatedSection animationClass="animate-slide-up" delay={100}>
            <h2 className="max-w-[850px] text-3xl font-medium leading-[1.12] tracking-[-.045em] sm:text-5xl lg:text-[3.6rem]">
              A considered range for the changing needs of <span className="font-serif italic font-normal text-primary">agriculture.</span>
            </h2>
            <p className="mt-7 max-w-[650px] text-base leading-7 text-muted-foreground">
              MD Agro Solution &amp; Trading Co. brings together a catalog of agricultural products across crop nutrition and related categories. Browse the range and find product information in one place.
            </p>
            <Link href="/about" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all hover:gap-3">
              More about MD Agro <ArrowRight className="h-4 w-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-muted px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-[1280px]">
          <AnimatedSection animationClass="animate-slide-up">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[.2em] text-primary">Explore by category</p>
                <h2 className="mt-4 text-3xl font-medium tracking-[-.045em] sm:text-5xl">Product families</h2>
              </div>
              <Link href="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all hover:gap-3">
                View all products <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </AnimatedSection>
          {categories.length ? (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category, index) => {
                const count = products.filter((product) => product.category === category).length;
                const categoryId = category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                return (
                  <AnimatedSection key={category} animationClass="animate-slide-up" delay={index * 70}>
                    <Link href={`/products#category-${categoryId}`} className="group flex min-h-[210px] flex-col justify-between rounded-[1.5rem] bg-[#213c2d] p-7 text-white transition-transform duration-300 hover:-translate-y-1 sm:min-h-[240px] sm:p-9">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-[#d9bb78]"><Sprout className="h-5 w-5" /></span>
                      <span className="flex items-end justify-between gap-4">
                        <span>
                          <span className="block text-xl font-medium tracking-tight sm:text-2xl">{readableCategory(category)}</span>
                          <span className="mt-2 block text-xs text-white/60">{count} {count === 1 ? 'product' : 'products'}</span>
                        </span>
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 transition-all group-hover:bg-[#d9bb78] group-hover:text-[#17271f]"><ArrowUpRight className="h-4 w-4" /></span>
                      </span>
                    </Link>
                  </AnimatedSection>
                );
              })}
            </div>
          ) : (
            <p className="mt-10 rounded-2xl border border-dashed border-border bg-background/60 p-8 text-sm text-muted-foreground">Product categories are currently unavailable.</p>
          )}
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-[1280px]">
          <AnimatedSection animationClass="animate-slide-up">
            <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[.2em] text-primary">From the catalog</p>
                <h2 className="mt-4 text-3xl font-medium tracking-[-.045em] sm:text-5xl">A closer look at the range</h2>
              </div>
              <Link href="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all hover:gap-3">
                Browse the catalog <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </AnimatedSection>
          {featuredProducts.length ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product: Product, index) => (
                <AnimatedSection key={product.id} animationClass="animate-slide-up" delay={index * 65}>
                  <ProductCard product={product} />
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-dashed border-border p-8 text-sm text-muted-foreground">Products are temporarily unavailable.</p>
          )}
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 sm:pb-28 lg:px-12">
        <div className="relative mx-auto min-h-[360px] max-w-[1280px] overflow-hidden rounded-[2rem] bg-[#203a2b] sm:min-h-[440px]">
          {heroImage && <Image src={heroImage.imageUrl} alt={heroImage.description} fill sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover opacity-40" />}
          <div className="absolute inset-0 bg-gradient-to-r from-[#172c20] via-[#172c20]/80 to-transparent" />
          <div className="relative flex min-h-[360px] max-w-2xl flex-col justify-center p-8 text-white sm:min-h-[440px] sm:p-14 lg:p-16">
            <AnimatedSection animationClass="animate-slide-up">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-[#d9bb78]"><Leaf className="h-5 w-5" /></span>
              <p className="mt-7 text-xs font-semibold uppercase tracking-[.2em] text-white/65">Product information, in one place</p>
              <h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-.04em] sm:text-5xl">Explore the products behind the name.</h2>
              <Button asChild className="mt-8 h-12 w-fit rounded-full bg-[#d9bb78] px-7 text-[#17271f] hover:bg-[#e6ce98]">
                <Link href="/products" className="gap-2">Open product catalog <ArrowUpRight className="h-4 w-4" /></Link>
              </Button>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
