import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/animated-section';

export const metadata: Metadata = {
  title: 'Contact | MD Agro Solution & Trading Co.',
  description: 'Contact MD Agro Solution & Trading Co. by phone, email or WhatsApp.',
};

const contactMethods = [
  { icon: MapPin, label: 'Visit', value: 'Shed B8 & B9 Mumbai Agra Highway, Adgaon, Nashik 422003', href: 'https://maps.google.com/?q=Shed+B8+B9+Mumbai+Agra+Highway+Adgaon+Nashik+422003' },
  { icon: Phone, label: 'Call', value: '+91 7249512616', href: 'tel:+917249512616' },
  { icon: Mail, label: 'Email', value: 'mdagrosolution1626@gmail.com', href: 'mailto:mdagrosolution1626@gmail.com' },
];

export default function ContactPage() {
  return (
    <div className="bg-background">
      <section className="relative overflow-hidden bg-[#213c2d] text-white">
        <div className="absolute -right-32 -top-40 h-[34rem] w-[34rem] rounded-full border border-white/[.09]" />
        <div className="absolute -right-12 -top-24 h-[27rem] w-[27rem] rounded-full border border-white/[.09]" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-20 sm:px-8 sm:pb-20 sm:pt-28 lg:px-12">
          <AnimatedSection animationClass="animate-slide-up" className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[.07] px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[.2em] text-white/75"><MessageCircle className="h-3.5 w-3.5 text-[#d9bb78]" /> Contact</span>
            <h1 className="mt-7 text-4xl font-medium leading-[1.02] tracking-[-.055em] sm:text-6xl lg:text-7xl">Let’s start a <span className="font-serif italic font-normal text-[#d9bb78]">conversation.</span></h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">Reach MD Agro by phone, email or WhatsApp for enquiries about the product range.</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1280px] gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[.85fr_1.15fr] lg:gap-20 lg:px-12">
        <div>
          <AnimatedSection animationClass="animate-slide-up">
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-primary">Get in touch</p>
            <h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-.045em] sm:text-4xl">We’re easy to reach.</h2>
          </AnimatedSection>
          <div className="mt-8 space-y-3">
            {contactMethods.map((method, index) => (
              <AnimatedSection key={method.label} animationClass="animate-slide-up" delay={index * 60}>
                <a href={method.href} target={method.href.startsWith('https:') ? '_blank' : undefined} rel={method.href.startsWith('https:') ? 'noreferrer' : undefined} className="group flex min-h-[88px] items-center gap-4 rounded-2xl border border-border/80 bg-card p-4 transition-all hover:border-primary/25 hover:bg-muted sm:p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/[.08] text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"><method.icon className="h-5 w-5" /></span>
                  <span className="min-w-0 flex-1"><span className="block text-[10px] font-semibold uppercase tracking-[.16em] text-muted-foreground">{method.label}</span><span className="mt-1.5 block break-words text-sm font-medium leading-5 text-foreground sm:text-base">{method.value}</span></span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </a>
              </AnimatedSection>
            ))}
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-11 flex-1 rounded-full"><a href="mailto:mdagrosolution1626@gmail.com" className="gap-2"><Mail className="h-4 w-4" /> Email MD Agro</a></Button>
            <Button asChild variant="outline" className="h-11 flex-1 rounded-full"><a href="https://wa.me/917249512616" target="_blank" rel="noreferrer" className="gap-2"><MessageCircle className="h-4 w-4" /> WhatsApp</a></Button>
          </div>
        </div>

        <AnimatedSection animationClass="animate-slide-up" delay={100}>
          <section aria-labelledby="message-form-heading" className="h-full rounded-[1.7rem] border border-border/80 bg-muted p-6 sm:p-9">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-primary"><Send className="h-5 w-5" /></span>
            <h2 id="message-form-heading" className="mt-6 text-2xl font-medium tracking-tight sm:text-3xl">Message form unavailable</h2>
            <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">The website is not currently connected to a message delivery service. To make sure your enquiry reaches MD Agro, please contact us directly by email or phone.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-12 rounded-full px-6"><a href="mailto:mdagrosolution1626@gmail.com" className="gap-2">Write an email <ArrowUpRight className="h-4 w-4" /></a></Button>
              <Button asChild variant="outline" className="h-12 rounded-full px-6"><a href="tel:+917249512616" className="gap-2">Call +91 7249512616 <Phone className="h-4 w-4" /></a></Button>
            </div>
            <div className="mt-10 border-t border-border/80 pt-6">
              <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-muted-foreground">Location</p>
              <address className="mt-2 not-italic text-sm leading-6 text-foreground">Shed B8 &amp; B9 Mumbai Agra Highway<br />Adgaon, Nashik 422003</address>
              <Link href="https://maps.google.com/?q=Shed+B8+B9+Mumbai+Agra+Highway+Adgaon+Nashik+422003" target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline">Open in Maps <ArrowUpRight className="h-3.5 w-3.5" /></Link>
            </div>
          </section>
        </AnimatedSection>
      </section>
    </div>
  );
}
