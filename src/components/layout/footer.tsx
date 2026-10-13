import Link from 'next/link';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { Logo } from '@/components/logo';

const navigation = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products' },
  { href: '/contact', label: 'Contact' },
];

export function Footer() {
  return (
    <footer className="bg-[#172c20] text-white">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 py-14 sm:grid-cols-2 sm:py-20 lg:grid-cols-[1.2fr_.7fr_1.1fr] lg:gap-20">
          <div>
            <Link href="/" aria-label="MD Agro home" className="inline-flex rounded-md">
              <Logo className="min-w-0 text-white [&_img]:h-11 [&_img]:w-11 [&_span:first-of-type]:text-base [&_span:first-of-type]:text-white [&_span:last-of-type]:text-white/55" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/60">MD Agro Solution &amp; Trading Co.</p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="text-[10px] font-semibold uppercase tracking-[.2em] text-white/60">Explore</h2>
            <ul className="mt-5 space-y-3">
              {navigation.map((link) => (
                <li key={link.href}><Link href={link.href} className="group inline-flex items-center gap-2 text-sm text-white/75 transition-colors hover:text-white">{link.label}<ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" /></Link></li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[10px] font-semibold uppercase tracking-[.2em] text-white/60">Contact</h2>
            <ul className="mt-5 space-y-4 text-sm text-white/70">
              <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#d9bb78]" /><span>Shed B8 &amp; B9 Mumbai Agra Highway,<br />Adgaon, Nashik 422003</span></li>
              <li className="flex items-center gap-3"><Phone className="h-4 w-4 shrink-0 text-[#d9bb78]" /><a href="tel:+917249512616" className="transition-colors hover:text-white">+91 7249512616</a></li>
              <li className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#d9bb78]" /><a href="mailto:mdagrosolution1626@gmail.com" className="break-all transition-colors hover:text-white">mdagrosolution1626@gmail.com</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-5 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} MD Agro Solution &amp; Trading Co.</p>
          <p>Agricultural products and company information.</p>
        </div>
      </div>
    </footer>
  );
}
