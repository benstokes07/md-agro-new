import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProducts, getProductBySlug } from '@/lib/products-server';
import { slugify } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import ReactMarkdown from 'react-markdown';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ListChecks, ShieldAlert, FlaskConical, Box, Trees, BookOpen } from 'lucide-react';
import { ProductCard } from '@/components/product-card';
import type { Product } from '@/lib/products-server';

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const allProducts = await getProducts();
  const relatedProducts = allProducts.filter(
    (p) => p.category === product.category && p.slug !== product.slug
  ).slice(0, 3);

  const markdownComponents = {
      ul: ({node, ...props}: any) => <ul className="list-disc list-inside space-y-2 pl-2" {...props} />,
      p: ({node, ...props}: any) => <p className="pb-2" {...props} />,
  };

  return (
    <div className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Product Image */}
          <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1023px) 100vw, 50vw"
            />
          </div>

          {/* Product Details */}
          <div>
            <nav className="text-sm mb-4" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2 text-foreground/70">
                    <li><Link href="/products" className="hover:text-primary">Products</Link></li>
                    <li><span>/</span></li>
                    <li><Link href={`/products#${slugify(product.category)}`} className="hover:text-primary">{product.category}</Link></li>
                </ol>
            </nav>
            <h1 className="font-headline text-4xl md:text-5xl font-bold">{product.name}</h1>
            
            <div className="prose prose-sm md:prose-base mt-4 max-w-none text-foreground/80">
              <ReactMarkdown components={markdownComponents}>{product.specifications}</ReactMarkdown>
            </div>

            <div className="mt-8">
              <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg font-headline"><ListChecks className="mr-2 text-primary" />Benefits</AccordionTrigger>
                  <AccordionContent>
                    <div className="prose prose-sm md:prose-base max-w-none">
                        <ReactMarkdown components={markdownComponents}>{product.benefits}</ReactMarkdown>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-lg font-headline"><FlaskConical className="mr-2 text-primary" />Composition</AccordionTrigger>
                  <AccordionContent>
                    <div className="prose prose-sm md:prose-base max-w-none">
                        <ReactMarkdown components={markdownComponents}>{product.composition}</ReactMarkdown>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-lg font-headline"><BookOpen className="mr-2 text-primary" />Usage Instructions</AccordionTrigger>
                  <AccordionContent>
                    <div className="prose prose-sm md:prose-base max-w-none">
                        <ReactMarkdown components={markdownComponents}>{product.usageInstructions}</ReactMarkdown>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-lg font-headline"><ShieldAlert className="mr-2 text-primary" />Safety Information</AccordionTrigger>
                  <AccordionContent>
                    <div className="prose prose-sm md:prose-base max-w-none">
                        <ReactMarkdown components={markdownComponents}>{product.safetyInformation}</ReactMarkdown>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            <div className="mt-8">
              <h3 className="flex items-center text-lg font-headline mb-3"><Box className="mr-2 text-primary" />Packaging Sizes</h3>
              <p>{product.packagingSizes}</p>
            </div>

            <div className="mt-8">
              <h3 className="flex items-center text-lg font-headline mb-3"><Trees className="mr-2 text-primary" />Suitable For</h3>
                <p>{product.suitableCrops}</p>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="text-3xl font-headline font-bold text-center mb-12">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map(p => <ProductCard key={p.slug} product={p} />)}
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
