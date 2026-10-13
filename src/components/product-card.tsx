import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { normalize, type Product } from '@/lib/products-server';
import { ProductImage } from '@/components/product-image';

interface ProductCardProps { product: Product }

function categoryName(category: string) {
  return category.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function ProductCard({ product }: ProductCardProps) {
  const slug = normalize(decodeURIComponent(product.slug || product.name));

  return (
    <Link
      href={`/products/${slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-border/80 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_20px_45px_-30px_rgba(22,48,33,.38)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted p-5 sm:p-7">
        <ProductImage
          src={product.image}
          alt={product.name}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 300px"
          className="object-contain p-5 transition-transform duration-500 ease-out group-hover:scale-[1.045] sm:p-7"
        />
        {product.category && (
          <span className="absolute left-4 top-4 z-10 rounded-full border border-black/[.06] bg-background/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.13em] text-foreground/75 backdrop-blur-sm">
            {categoryName(product.category)}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-base font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-lg">{product.name}</h3>
        {product.tagline && <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{product.tagline}</p>}
        <span className="mt-auto flex items-center justify-between pt-6 text-xs font-semibold text-primary">
          View product <span className="grid h-8 w-8 place-items-center rounded-full border border-border transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground"><ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
        </span>
      </div>
    </Link>
  );
}
