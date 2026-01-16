import Link from 'next/link';
import { Facebook, Twitter, Linkedin } from 'lucide-react';
import { Logo } from '@/components/logo';

export function Footer() {
  return (
    <footer className="bg-primary/90 text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Logo className="text-primary-foreground" />
            <p className="mt-4 text-sm text-primary-foreground/80">
              Cultivating a sustainable future through innovative agricultural solutions.
            </p>
          </div>
          <div>
            <h3 className="font-headline font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:underline text-primary-foreground/80">About Us</Link></li>
              <li><Link href="/products" className="hover:underline text-primary-foreground/80">Products</Link></li>
              <li><Link href="/contact" className="hover:underline text-primary-foreground/80">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-bold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>Shed B8 & B9 MUMBAI AGRA Highway, Adgaon, Nashik 422003</li>
              <li>Phone: +91 7249512616</li>
              <li>Email: mdagrosolution1626@gmail.com</li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-bold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-6 w-6 text-primary-foreground/80 hover:text-white" />
              </Link>
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-6 w-6 text-primary-foreground/80 hover:text-white" />
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6 text-primary-foreground/80 hover:text-white" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} MD Agro Solutions Inc. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
