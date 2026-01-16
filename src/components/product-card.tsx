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
}

export function ProductCard({ product }: ProductCardProps) {
  const productUrl = `/products/${slugify(product.category)}/${product.slug}`;

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <Link href={productUrl} className="block aspect-square relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
      </CardHeader>
      <div className="flex flex-col flex-grow">
        <CardContent className="p-6 flex-grow">
          <Badge variant="secondary" className="mb-2">{product.category}</Badge>
          <CardTitle className="font-headline text-2xl mb-2">
            <Link href={productUrl} className="hover:text-primary transition-colors">
              {product.name}
            </Link>
          </CardTitle>
          <div className="prose prose-sm text-muted-foreground line-clamp-3">
            <ReactMarkdown>{product.specifications}</ReactMarkdown>
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button asChild className="w-full">
            <Link href={productUrl}>View Details</Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
