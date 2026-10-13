import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight, Beaker, Box, FileText, Leaf, ShieldCheck, Sparkles } from 'lucide-react';
import { normalize, getProducts } from '@/lib/products-server';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/animated-section';
import { ProductImage } from '@/components/product-image';

type ProductParams = { slug: string };

export async function generateStaticParams() {
  const products = await getProducts();
  return products.length
    ? products.map((product) => ({ slug: normalize(product.slug || product.name) }))
    : [{ slug: 'placeholder' }];
}

export async function generateMetadata({ params }: { params: Promise<ProductParams> }): Promise<Metadata> {
  const { slug } = await params;
  const products = await getProducts();
  const product = products.find((item) => normalize(item.slug || item.name) === normalize(slug));
  if (!product) return { title: 'Product | MD Agro Solution & Trading Co.' };
  return {
    title: `${product.name} | MD Agro Solution & Trading Co.`,
    description: product.tagline || `Product information for ${product.name} from MD Agro.`,
    openGraph: { title: `${product.name} | MD Agro`, description: product.tagline || undefined },
  };
}

export default async function ProductPage({ params }: { params: Promise<ProductParams> }) {
  const { slug: rawSlug } = await params;
  const slug = normalize(decodeURIComponent(rawSlug));
  const products = await getProducts();
  const product = products.find((item) => normalize(item.slug || item.name) === slug);

  if (!product) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-[.2em] text-primary">Product catalog</p>
        <h1 className="mt-4 text-3xl font-medium tracking-tight">Product not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">This product may no longer be available at this address.</p>
        <Button asChild variant="outline" className="mt-7 rounded-full"><Link href="/products" className="gap-2"><ArrowLeft className="h-4 w-4" /> Back to products</Link></Button>
      </div>
    );
  }

  const sections = [
    { title: 'Specifications', value: product.specifications, icon: FileText },
    { title: 'Composition', value: product.composition, icon: Beaker },
    { title: 'Benefits', value: product.benefits, icon: Sparkles },
    { title: 'Usage instructions', value: product.usage, icon: Leaf },
    { title: 'Safety information', value: product.safety, icon: ShieldCheck },
    { title: 'Suitable crops', value: product.crops, icon: Leaf },
    { title: 'Packaging', value: product.packaging, icon: Box },
  ].filter((section) => section.value?.trim());

  const related = products
    .filter((item) => item.category && item.category === product.category && item.id !== product.id)
    .slice(0, 3);
  const category = product.category.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());

  return (
    <div className="bg-background">
      <section className="bg-muted px-5 pb-14 pt-8 sm:px-8 sm:pb-20 sm:pt-10 lg:px-12">
        <div className="mx-auto max-w-[1280px]">
          <Link href="/products" className="inline-flex min-h-11 items-center gap-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary"><ArrowLeft className="h-4 w-4" /> All products</Link>
          <div className="mt-7 grid items-center gap-8 lg:grid-cols-[1fr_.92fr] lg:gap-16">
            <AnimatedSection animationClass="animate-slide-in-left" className="order-2 lg:order-1">
              {product.category && <span className="inline-flex rounded-full border border-primary/15 bg-background/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.16em] text-primary">{category}</span>}
              <h1 className="mt-5 max-w-2xl text-4xl font-medium leading-[1.04] tracking-[-.055em] sm:text-5xl lg:text-6xl">{product.name}</h1>
              {product.tagline && <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">{product.tagline}</p>}
              {product.packaging && (
                <div className="mt-7 inline-flex items-center gap-3 rounded-2xl border border-border/80 bg-background px-4 py-3">
                  <Box className="h-4 w-4 text-primary" />
                  <div><p className="text-[10px] font-semibold uppercase tracking-[.12em] text-muted-foreground">Packaging</p><p className="mt-1 text-sm font-medium">{product.packaging}</p></div>
                </div>
              )}
              <div className="mt-8">
                <Button asChild className="h-12 rounded-full px-6"><Link href="/contact" className="gap-2">Contact about this product <ArrowRight className="h-4 w-4" /></Link></Button>
              </div>
            </AnimatedSection>
            <AnimatedSection animationClass="animate-scale-in" className="order-1 lg:order-2">
              <div className="relative mx-auto aspect-[1.08/1] w-full max-w-[560px] overflow-hidden rounded-[2rem] border border-border/60 bg-card p-6 sm:p-10">
                <ProductImage src={product.image} alt={product.name} sizes="(max-width: 1024px) 95vw, 560px" priority className="object-contain p-8 transition-transform duration-500 hover:scale-[1.025] sm:p-12" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {sections.length > 0 && (
        <section className="mx-auto max-w-[1040px] px-5 py-16 sm:px-8 sm:py-24">
          <AnimatedSection animationClass="animate-slide-up" className="mb-8 sm:mb-10">
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-primary">Product information</p>
            <h2 className="mt-3 text-3xl font-medium tracking-[-.04em] sm:text-4xl">Details</h2>
          </AnimatedSection>
          <div className="divide-y divide-border border-y border-border">
            {sections.map((section, index) => (
              <details key={section.title} className="group" open={index === 0}>
                <summary className="flex min-h-[68px] cursor-pointer list-none items-center justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center gap-3 text-sm font-semibold sm:text-base"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/[.08] text-primary"><section.icon className="h-4 w-4" /></span>{section.title}</span>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-transform group-open:rotate-45"><span aria-hidden="true" className="text-xl font-light leading-none">+</span></span>
                </summary>
                <div className="max-w-3xl pb-6 pl-12 pr-10 text-sm leading-7 text-muted-foreground">{section.value}</div>
              </details>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="bg-muted px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-primary">Continue browsing</p><h2 className="mt-3 text-2xl font-medium tracking-[-.035em] sm:text-3xl">More in {category}</h2></div>
              <Link href="/products" className="hidden items-center gap-2 text-xs font-semibold text-primary sm:inline-flex">All products <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => <AnimatedSection key={item.id} animationClass="animate-slide-up" delay={index * 60}><ProductCard product={item} /></AnimatedSection>)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
