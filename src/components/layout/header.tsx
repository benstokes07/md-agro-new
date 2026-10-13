'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateScroll = () => {
      const nextIsScrolled = window.scrollY > 12;
      setIsScrolled((current) => current === nextIsScrolled ? current : nextIsScrolled);
    };
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  useEffect(() => setIsMobileMenuOpen(false), [pathname]);

  const active = (href: string) => href === '/products'
    ? pathname.startsWith('/products')
    : pathname === href;

  return (
    <header className={cn(
      'sticky top-0 z-[100] w-full border-b transition-[background-color,border-color,box-shadow] duration-300',
      isScrolled
        ? 'glass border-border/80 shadow-[0_8px_30px_-25px_rgba(16,42,29,.45)]'
        : 'bg-background/95 border-transparent'
    )}>
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href="/" aria-label="MD Agro home" className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <Logo className="min-w-0 [&_img]:h-10 [&_img]:w-10 [&_span:first-of-type]:text-base" />
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active(link.href) ? 'page' : undefined}
              className={cn(
                'group relative py-2 text-[13px] font-medium transition-colors',
                active(link.href) ? 'text-primary' : 'text-foreground/65 hover:text-foreground'
              )}
            >
              {link.label}
              <span className={cn(
                'absolute inset-x-0 -bottom-0.5 h-px origin-left bg-primary transition-transform duration-300',
                active(link.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              )} />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Button asChild className="h-11 rounded-full px-5 text-[13px] shadow-none">
            <Link href="/products" className="gap-2">
              Explore products <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'} className="h-11 w-11 rounded-full border-border bg-background">
                <span className="relative flex h-5 w-5 items-center justify-center">
                  <Menu className={cn('absolute h-5 w-5 transition-all duration-200', isMobileMenuOpen ? 'rotate-45 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100')} />
                  <X className={cn('absolute h-5 w-5 transition-all duration-200', isMobileMenuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-45 scale-0 opacity-0')} />
                </span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(88vw,380px)] border-l border-border bg-background p-0">
              <SheetTitle className="sr-only">Main navigation</SheetTitle>
              <div className="flex h-full flex-col px-6 pb-7 pt-8">
                <Link href="/" aria-label="MD Agro home" className="mb-10 inline-flex w-fit">
                  <Logo className="min-w-0 [&_img]:h-10 [&_img]:w-10" />
                </Link>
                <nav aria-label="Mobile navigation" className="flex flex-1 flex-col">
                  {navLinks.map((link, index) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={active(link.href) ? 'page' : undefined}
                      className={cn(
                        'flex min-h-[60px] items-center justify-between border-b border-border/70 text-xl font-medium tracking-tight transition-colors hover:text-primary',
                        active(link.href) ? 'text-primary' : 'text-foreground'
                      )}
                      style={{ transitionDelay: `${index * 25}ms` }}
                    >
                      {link.label}<ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  ))}
                </nav>
                <Button asChild className="mt-8 h-12 rounded-full">
                  <Link href="/products" className="gap-2">Explore products <ArrowUpRight className="h-4 w-4" /></Link>
                </Button>
                <p className="mt-5 text-center text-xs text-muted-foreground">MD Agro Solution &amp; Trading Co.</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
