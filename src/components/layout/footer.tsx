import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { Logo } from '@/components/logo';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-primary/90 via-primary/80 to-secondary/80 text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link href="/" className="inline-block transition-transform duration-300 hover:scale-105">
              <Logo className="text-primary-foreground h-10 w-10 md:h-12 md:w-12" />
            </Link>
            <p className="mt-2 text-xs md:text-sm text-primary-foreground/80 leading-relaxed">
              Cultivating a sustainable future through innovative agricultural solutions.
            </p>
            <div className="mt-6 flex space-x-4">
              <Link 
                href="#" 
                aria-label="Facebook"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-all duration-300 hover:scale-110"
              >
                <Facebook className="h-5 w-5 text-primary-foreground/80" />
              </Link>
              <Link 
                href="#" 
                aria-label="Twitter"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-all duration-300 hover:scale-110"
              >
                <Twitter className="h-5 w-5 text-primary-foreground/80" />
              </Link>
              <Link 
                href="#" 
                aria-label="LinkedIn"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="h-5 w-5 text-primary-foreground/80" />
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-headline font-bold text-lg mb-6 pb-2 relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-accent-foreground after:rounded-full">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/" 
                  className="flex items-center gap-2 text-primary-foreground/80 hover:text-white transition-all duration-300 hover:pl-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="flex items-center gap-2 text-primary-foreground/80 hover:text-white transition-all duration-300 hover:pl-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/products" 
                  className="flex items-center gap-2 text-primary-foreground/80 hover:text-white transition-all duration-300 hover:pl-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Products
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="flex items-center gap-2 text-primary-foreground/80 hover:text-white transition-all duration-300 hover:pl-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-headline font-bold text-lg mb-6 pb-2 relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-accent-foreground after:rounded-full">
              Contact Info
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-primary-foreground/80">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>Shed B8 & B9 MUMBAI AGRA Highway, Adgaon, Nashik 422003</span>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/80">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span>+91 7249512616</span>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/80">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span>mdagrosolution1626@gmail.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-headline font-bold text-lg mb-6 pb-2 relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-accent-foreground after:rounded-full">
              Business Hours
            </h3>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li className="flex justify-between">
                <span>Monday - Friday</span>
                <span className="font-medium">9AM - 6PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span className="font-medium">10AM - 4PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="font-medium text-red-200">Closed</span>
              </li>
            </ul>
            
            <div className="mt-8">
              <h4 className="font-bold text-primary-foreground/90 mb-3">Newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 rounded-l-lg w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <button className="bg-accent text-accent-foreground px-4 py-2 rounded-r-lg hover:bg-accent/90 transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-sm text-primary-foreground/60 max-w-[300px]">
              &copy; {new Date().getFullYear()} MD Agro Solution. All Rights Reserved.
            </p>
            <div className="flex gap-4 flex-wrap justify-center">
              <Link href="#" className="text-primary-foreground/60 hover:text-white transition-colors text-sm whitespace-nowrap">
                Privacy Policy
              </Link>
              <Link href="#" className="text-primary-foreground/60 hover:text-white transition-colors text-sm whitespace-nowrap">
                Terms of Service
              </Link>
              <Link href="#" className="text-primary-foreground/60 hover:text-white transition-colors text-sm whitespace-nowrap">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
