import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Goal, Lightbulb, Tractor, Leaf, Users, Award } from 'lucide-react';
import { AnimatedSection } from '@/components/animated-section';

export default function AboutUsPage() {
  const teamImage = PlaceHolderImages.find(img => img.id === 'about-us-team');

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/10">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-20 relative">
          <AnimatedSection animationClass="animate-slide-up" delay={100}>
            <p className="text-lg font-semibold text-primary/80">About Us</p>
          </AnimatedSection>
          <AnimatedSection animationClass="animate-fade-in-up" delay={200}>
            <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-headline font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent">
              Pioneering the Future of Agriculture
            </h1>
          </AnimatedSection>
          <AnimatedSection animationClass="animate-fade-in-up" delay={300}>
            <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-foreground/80 leading-relaxed">
              At MD Agro Solution & Trading Co., we are dedicated to merging tradition with technology to create a more prosperous and sustainable world for farmers.
            </p>
          </AnimatedSection>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <AnimatedSection animationClass="animate-slide-up" delay={400}>
            <div className="group bg-card border border-border hover:border-primary/30 transition-all duration-500 hover-lift rounded-2xl p-6 text-center shadow-lg hover:shadow-xl">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-green-600 text-primary-foreground mb-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                <Goal className="h-8 w-8 relative z-10" />
              </div>
              <CardTitle className="font-headline text-2xl mt-4 text-foreground group-hover:text-primary transition-colors">
                Our Mission
              </CardTitle>
              <CardContent className="pt-4 p-0">
                <p className="text-foreground/80 group-hover:text-foreground transition-colors">
                  To empower farmers with high-quality, innovative, and sustainable agricultural products that enhance productivity and profitability while preserving the environment.
                </p>
              </CardContent>
            </div>
          </AnimatedSection>
          
          <AnimatedSection animationClass="animate-slide-up" delay={500}>
            <div className="group bg-card border border-border hover:border-primary/30 transition-all duration-500 hover-lift rounded-2xl p-6 text-center shadow-lg hover:shadow-xl">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-green-600 text-primary-foreground mb-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                <Lightbulb className="h-8 w-8 relative z-10" />
              </div>
              <CardTitle className="font-headline text-2xl mt-4 text-foreground group-hover:text-primary transition-colors">
                Our Vision
              </CardTitle>
              <CardContent className="pt-4 p-0">
                <p className="text-foreground/80 group-hover:text-foreground transition-colors">
                  To be a global leader in agricultural solutions, recognized for our commitment to quality, farmer success, and ecological balance.
                </p>
              </CardContent>
            </div>
          </AnimatedSection>
          
          <AnimatedSection animationClass="animate-slide-up" delay={600}>
            <div className="group bg-card border border-border hover:border-primary/30 transition-all duration-500 hover-lift rounded-2xl p-6 text-center shadow-lg hover:shadow-xl">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-green-600 text-primary-foreground mb-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                <Tractor className="h-8 w-8 relative z-10" />
              </div>
              <CardTitle className="font-headline text-2xl mt-4 text-foreground group-hover:text-primary transition-colors">
                Our Approach
              </CardTitle>
              <CardContent className="pt-4 p-0">
                <p className="text-foreground/80 group-hover:text-foreground transition-colors">
                  We combine scientific research with on-the-ground experience to develop practical, effective products that address real-world farming challenges.
                </p>
              </CardContent>
            </div>
          </AnimatedSection>
        </div>

        <div className="mt-32 text-center">
          <AnimatedSection animationClass="animate-slide-up" delay={200}>
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent mb-4">
              Meet Our Leadership
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4 rounded-full"></div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto mt-16">
            <AnimatedSection animationClass="animate-slide-up" delay={300}>
              <div className="flex flex-col items-center group">
                <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-2xl mb-6 hover:scale-105 transition-transform duration-500 border-4 border-primary/10 group-hover:border-primary/30">
                  <img 
                    src="/Dipu-1.png" 
                    alt="Dipali Mukund Shelake" 
                    className="object-cover w-full h-full group-hover:brightness-110 transition-all duration-300" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                </div>
                <h3 className="text-2xl font-headline font-bold text-foreground group-hover:text-primary transition-colors">
                  Dipali Mukund Shelake
                </h3>
                <p className="text-lg text-primary font-semibold mb-2">Founder</p>
                <p className="text-sm text-muted-foreground text-center max-w-xs group-hover:text-foreground transition-colors">
                  Visionary leader driving innovation in agricultural solutions
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animationClass="animate-slide-up" delay={400}>
              <div className="flex flex-col items-center group">
                <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-2xl mb-6 hover:scale-105 transition-transform duration-500 border-4 border-primary/10 group-hover:border-primary/30">
                  <img 
                    src="/owner.jpeg" 
                    alt="Shelke Mukund Punjaram" 
                    className="object-cover w-full h-full group-hover:brightness-110 transition-all duration-300" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                </div>
                <h3 className="text-xl font-headline font-semibold text-foreground group-hover:text-primary transition-colors">
                  Shelke Mukund Punjaram
                </h3>
                <p className="text-sm text-primary font-medium">Co-Founder & Director</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
        
        <div className="mt-32 text-center bg-gradient-to-br from-card to-accent/20 border border-border rounded-2xl p-12 shadow-2xl max-w-4xl mx-auto">
          <AnimatedSection animationClass="animate-slide-up" delay={500}>
            <div className="flex justify-center mb-6">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-primary to-green-600 text-primary-foreground relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                <Award className="h-8 w-8 relative z-10" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent mb-4">
              Our Commitment to Excellence
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-foreground/90 leading-relaxed">
              MD Agro Solution & Trading Co. is a team of passionate scientists, agronomists, and professionals working hand-in-hand with farmers.
            </p>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}