import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 text-2xl font-bold text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm", className)}>
      <img src="/logo.png" alt="MD-Agro Solution & Trading Company Logo" className="h-10 w-10 md:h-12 md:w-12 object-contain" />
      <span className="font-headline text-sm md:text-base hidden md:block">MD-Agro Solution & Trading Company</span>
      <span className="font-headline text-xs md:hidden">MD-Agro</span>
    </Link>
  );
}
