'use client';

import { useEffect, useMemo, useState } from 'react';
import { ProductCard } from '@/components/product-card';
import type { Product } from '@/lib/products-server';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductListProps { products: Product[] }

function categoryName(category: string) {
  return category.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function ProductList({ products }: ProductListProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const categories = useMemo(() => [...new Set(products.map((product) => product.category).filter(Boolean)),], [products]);

  useEffect(() => {
    const requested = window.location.hash.replace(/^#category-/, '');
    if (!requested || requested === window.location.hash.slice(1)) return;
    const match = categories.find((item) => item.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === requested);
    if (match) setCategory(match);
  }, [categories]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = category === 'all' || product.category === category;
      const searchable = [product.name, product.tagline, product.category, product.slug]
        .filter(Boolean).join(' ').toLowerCase();
      return matchesCategory && (!query || searchable.includes(query));
    });
  }, [products, search, category]);

  const clearFilters = () => { setSearch(''); setCategory('all'); };

  return (
    <div>
      <div className="rounded-[1.5rem] border border-border/80 bg-card p-4 shadow-[0_14px_35px_-30px_rgba(22,48,33,.3)] sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-[400px]">
            <label htmlFor="product-search" className="sr-only">Search products</label>
            <Search aria-hidden="true" className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="product-search"
              type="search"
              placeholder="Search products, categories..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="h-12 rounded-full border-border bg-background pl-11 pr-11 text-sm placeholder:text-muted-foreground/80 focus-visible:ring-primary/30"
            />
            {search && (
              <button type="button" onClick={() => setSearch('')} aria-label="Clear search" className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <p aria-live="polite" className="flex items-center gap-2 text-xs text-muted-foreground">
            <SlidersHorizontal className="h-3.5 w-3.5" /> Showing <span className="font-semibold text-foreground">{filtered.length}</span> {filtered.length === 1 ? 'product' : 'products'}
          </p>
        </div>

        {categories.length > 0 && (
          <div role="group" aria-label="Filter by category" className="-mx-1 mt-4 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button
              type="button"
              onClick={() => setCategory('all')}
              aria-pressed={category === 'all'}
              className={`min-h-11 shrink-0 rounded-full px-4 text-xs font-semibold transition-colors ${category === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-secondary hover:text-foreground'}`}
            >All products</button>
            {categories.map((item) => {
              const id = item.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
              return (
                <button
                  type="button"
                  id={`category-${id}`}
                  key={item}
                  onClick={() => setCategory(item)}
                  aria-pressed={category === item}
                  className={`min-h-11 shrink-0 rounded-full px-4 text-xs font-semibold transition-colors ${category === item ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-secondary hover:text-foreground'}`}
                >{categoryName(item)}</button>
              );
            })}
          </div>
        )}
      </div>

      {filtered.length ? (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product, index) => (
            <div key={product.id || product.slug || product.name} className="animate-slide-up" style={{ animationDelay: `${Math.min(index, 7) * 45}ms` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-[1.5rem] border border-dashed border-border bg-card px-6 py-16 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-muted text-muted-foreground"><Search className="h-5 w-5" /></div>
          <h2 className="mt-4 text-lg font-semibold">No products found</h2>
          <p className="mt-2 text-sm text-muted-foreground">Try a different search or choose another category.</p>
          <Button variant="outline" onClick={clearFilters} className="mt-5 rounded-full">Clear filters</Button>
        </div>
      )}
    </div>
  );
}
