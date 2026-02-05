"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { useState, memo } from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/logo';
import { ProductDropdown } from '@/components/product-dropdown';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/products', label: 'Products' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigation = (callback: () => void) => {
    // startTransition(() => {
      setIsMobileMenuOpen(false);
      callback();
    // });
  };

  const NavLink = memo(({ href, label }: { href: string, label: string }) => {
    return (
      <Link
        href={href}
        prefetch={true}
        className={cn(
          "text-lg md:text-sm font-medium transition-all duration-200 hover:text-primary hover:scale-105",
          pathname === href ? 'text-primary font-semibold' : 'text-foreground/70'
        )}
        onClick={() => handleNavigation(() => {})}
      >
        {label}
      </Link>
    );
  });
  
  NavLink.displayName = 'NavLink';
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-md">
      <div className="container mx-auto flex h-16 md:h-18 items-center justify-between px-4">
        <Link 
          href="/" 
          prefetch={true} 
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          onClick={() => handleNavigation(() => {})}
        >
          <Logo className="transition-transform duration-200 hover:scale-105 cursor-pointer min-w-[120px]" />
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
              <button className="rounded-full p-2 hover:bg-accent transition-colors">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background/95 backdrop-blur">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="p-4">
                <Link 
                  href="/" 
                  prefetch={true} 
                  className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                  onClick={() => handleNavigation(() => {})}
                >
                  <Logo className="transition-transform duration-200 hover:scale-105 inline-block mb-8 cursor-pointer min-w-[120px]" />
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
                      <Link 
                        href="/products"
                        prefetch={true}
                        className="text-foreground/70 hover:text-primary transition-colors"
                        onClick={() => handleNavigation(() => {})}
                      >
                        NPK Fertilizers
                      </Link>
                      <Link 
                        href="/products"
                        prefetch={true}
                        className="text-foreground/70 hover:text-primary transition-colors"
                        onClick={() => handleNavigation(() => {})}
                      >
                        Micronutrients
                      </Link>
                      <Link 
                        href="/products"
                        prefetch={true}
                        className="text-foreground/70 hover:text-primary transition-colors"
                        onClick={() => handleNavigation(() => {})}
                      >
                        Biostimulants
                      </Link>
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