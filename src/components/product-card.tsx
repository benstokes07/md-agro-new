import Image from 'next/image';
import Link from 'next/link';
import { slugify } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/lib/products-server';
import ReactMarkdown from 'react-markdown';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const productUrl = `/products/${slugify(product.category)}/${product.slug}`;

  return (
    <Card className={`group flex flex-col h-full overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2 ${className || ''}`}>
      <div className="relative overflow-hidden rounded-t-lg">
        <Link href={productUrl} className="block aspect-square relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Badge variant="secondary" className="bg-primary/90 text-primary-foreground">
            {product.category}
          </Badge>
        </div>
      </div>
      
      <div className="flex flex-col flex-grow p-6">
        <div className="mb-4">
          <CardTitle className="font-headline text-2xl mb-2">
            <Link href={productUrl} className="hover:text-primary transition-colors duration-300">
              {product.name}
            </Link>
          </CardTitle>
          <div className="prose prose-sm text-muted-foreground line-clamp-3 mt-2">
            <ReactMarkdown>{product.specifications}</ReactMarkdown>
          </div>
        </div>
        
        <div className="mt-auto pt-4">
          <Button 
            asChild 
            className="w-full transition-all duration-300 group-hover:bg-primary/90 group-hover:shadow-lg"
          >
            <Link href={productUrl}>View Details</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
