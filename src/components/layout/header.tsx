"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ChevronDown } from 'lucide-react';
import { useState, memo } from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/products', label: 'Products' },
  { href: '/contact', label: 'Contact' },
];

const productCategories = [
  { name: 'NPK Fertilizers', href: '/products#npk-fertilizers' },
  { name: 'Soil Conditioners', href: '/products#soil-conditioners' },
  { name: 'Growth Stimulators', href: '/products#growth-stimulators' },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavLink = memo(({ href, label }: { href: string, label: string }) => {
    return (
      <Link
        href={href}
        prefetch={true}
        className={cn(
          "text-lg md:text-sm font-medium transition-all duration-300 hover:text-primary hover:scale-105",
          pathname === href ? 'text-primary font-semibold' : 'text-foreground/70'
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {label}
      </Link>
    );
  });
  
  NavLink.displayName = 'NavLink';
  
  const ProductDropdown = memo(() => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1 text-lg md:text-sm font-medium transition-all duration-300 hover:text-primary hover:scale-105 text-foreground/70">
          <span>Products</span>
          <ChevronDown className="h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-56 bg-background border border-border shadow-lg rounded-md p-2">
        {productCategories.map((category) => (
          <DropdownMenuItem key={category.name} asChild>
            <Link href={category.href} className="cursor-pointer">
              {category.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  ));
  
  ProductDropdown.displayName = 'ProductDropdown';
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-md transition-all duration-300">
      <div className="container mx-auto flex h-16 md:h-18 items-center justify-between px-4">
        <Link href="/" prefetch={true}>
          <Logo className="transition-transform duration-300 hover:scale-105 cursor-pointer min-w-[120px]" />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.filter(link => link.label !== 'Products').map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
          <ProductDropdown />
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background/95 backdrop-blur">
              <div className="p-4">
                <Link href="/" prefetch={true}>
                  <Logo className="transition-transform duration-300 hover:scale-105 inline-block mb-8 cursor-pointer min-w-[120px]" />
                </Link>
                <nav className="flex flex-col gap-6">
                  {navLinks.filter(link => link.label !== 'Products').map((link) => (
                    <div key={link.href}>
                      <NavLink {...link} />
                    </div>
                  ))}
                  <div className="pt-4 border-t border-border">
                    <h3 className="font-bold text-foreground mb-3">Product Categories</h3>
                    <div className="flex flex-col gap-3">
                      {productCategories.map((category) => (
                        <Link 
                          key={category.name}
                          href={category.href}
                          prefetch={true}
                          className="text-foreground/70 hover:text-primary transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

