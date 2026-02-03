import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 text-2xl font-bold text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm", className)}>
      <img src="/logo.png" alt="MD-Agro Solution & Trading Company Logo" className="h-8 w-8 md:h-10 md:w-10 object-contain" />
      <span className="font-headline text-sm md:text-sm lg:text-base">MD Agro Solution</span>
    </Link>
  );
}
