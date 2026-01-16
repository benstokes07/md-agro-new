import { Leaf } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 text-2xl font-bold text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm", className)}>
      <Leaf className="h-7 w-7" />
      <span className="font-headline">MD Agro Solutions</span>
    </Link>
  );
}
