import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, ArrowUpRight, Leaf, Sprout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/animated-section';

export const metadata: Metadata = {
  title: 'About | MD Agro Solution & Trading Co.',
  description: 'Learn about MD Agro Solution & Trading Co. and explore its agricultural product range.',
};

export default function AboutPage() {
  return (
    <div className="bg-background">
      <section className="relative overflow-hidden bg-[#213c2d] text-white">
        <div className="absolute -right-32 -top-44 h-[35rem] w-[35rem] rounded-full border border-white/[.09]" />
        <div className="absolute -right-14 -top-28 h-[28rem] w-[28rem] rounded-full border border-white/[.09]" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-20 pt-20 sm:px-8 sm:pb-28 sm:pt-28 lg:px-12">
          <AnimatedSection animationClass="animate-slide-up" className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[.07] px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[.2em] text-white/75"><Leaf className="h-3.5 w-3.5 text-[#d9bb78]" /> About MD Agro</span>
            <h1 className="mt-7 text-4xl font-medium leading-[1.02] tracking-[-.055em] sm:text-6xl lg:text-7xl">Agricultural products, <span className="font-serif italic font-normal text-[#d9bb78]">from MD Agro.</span></h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">MD Agro Solution &amp; Trading Co. is an agricultural products company. This is a place to learn about the company and browse its product catalog.</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1280px] gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[.65fr_1.35fr] lg:gap-24 lg:px-12">
        <AnimatedSection animationClass="animate-slide-up">
          <p className="text-xs font-semibold uppercase tracking-[.2em] text-primary">Who we are</p>
          <div className="mt-5 h-px w-14 bg-accent" />
        </AnimatedSection>
        <AnimatedSection animationClass="animate-slide-up" delay={100}>
          <h2 className="text-3xl font-medium leading-tight tracking-[-.045em] sm:text-5xl">A company focused on agricultural products and the people who use them.</h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground">The MD Agro catalog includes products across fertilizer and crop nutrition categories. Product-specific information is presented on each product page where it is available.</p>
          <Button asChild className="mt-8 h-12 rounded-full px-6"><Link href="/products" className="gap-2">Explore products <ArrowUpRight className="h-4 w-4" /></Link></Button>
        </AnimatedSection>
      </section>

      <section className="bg-muted px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-[1280px]">
          <AnimatedSection animationClass="animate-slide-up" className="mb-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-primary">Our approach</p>
            <h2 className="mt-4 text-3xl font-medium tracking-[-.045em] sm:text-5xl">Useful product information, clearly presented.</h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">Explore the catalog by category, then review each product’s available specifications, composition, benefits, usage, safety, crops and packaging information.</p>
          </AnimatedSection>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: Sprout, title: 'Browse the range', text: 'Use the product catalog to explore available categories and products.' },
              { icon: Leaf, title: 'Review product details', text: 'Product pages show the information available for each listed item.' },
              { icon: ArrowRight, title: 'Get in touch', text: 'Contact MD Agro by phone or email for enquiries.' },
            ].map((item, index) => (
              <AnimatedSection key={item.title} animationClass="animate-slide-up" delay={index * 70}>
                <div className="h-full rounded-[1.4rem] border border-border/70 bg-background p-6 sm:p-7">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-primary/[.08] text-primary"><item.icon className="h-5 w-5" /></span>
                  <h3 className="mt-6 text-lg font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <h2 className="mb-8 text-2xl font-medium tracking-tight text-foreground sm:mb-10 sm:text-3xl">Leadership</h2>
        <div className="grid gap-8 md:grid-cols-2 md:gap-6">
          <AnimatedSection animationClass="animate-slide-up">
            <div className="group relative aspect-[1.12/1] overflow-hidden rounded-[1.8rem] bg-[#e9e8df]">
              <Image src="/Dipu-1.png" alt="Dipali Mukund Shelake" fill sizes="(max-width: 768px) 95vw, 560px" className="object-cover transition-transform duration-500 group-hover:scale-[1.025]" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-6 pt-20 text-white sm:p-8 sm:pt-24">
                <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-white/70">Founder</p>
                <h3 className="mt-2 text-xl font-medium sm:text-2xl">Dipali Mukund Shelake</h3>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection animationClass="animate-slide-up" delay={100}>
            <div className="group relative aspect-[1.12/1] overflow-hidden rounded-[1.8rem] bg-[#e9e8df]">
              <Image src="/owner.jpeg" alt="Shelke Mukund Punjaram" fill sizes="(max-width: 768px) 95vw, 560px" className="object-cover transition-transform duration-500 group-hover:scale-[1.025]" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-6 pt-20 text-white sm:p-8 sm:pt-24">
                <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-white/70">Co-Founder &amp; Director</p>
                <h3 className="mt-2 text-xl font-medium sm:text-2xl">Shelke Mukund Punjaram</h3>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 sm:pb-28 lg:px-12">
        <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-8 rounded-[1.8rem] bg-[#213c2d] p-8 text-white sm:flex-row sm:items-center sm:p-12">
          <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-white/60">MD Agro Solution &amp; Trading Co.</p><h2 className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl">Explore the product catalog.</h2></div>
          <Button asChild className="h-12 shrink-0 rounded-full bg-[#d9bb78] px-6 text-[#17271f] hover:bg-[#e6ce98]"><Link href="/products" className="gap-2">View products <ArrowRight className="h-4 w-4" /></Link></Button>
        </div>
      </section>
    </div>
  );
}
