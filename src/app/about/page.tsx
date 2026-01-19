import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Goal, Lightbulb, Tractor } from 'lucide-react';

export default function AboutUsPage() {
  const teamImage = PlaceHolderImages.find(img => img.id === 'about-us-team');

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center">
          <p className="text-lg font-semibold text-primary">About Us</p>
          <h1 className="mt-2 text-4xl font-headline font-bold tracking-tight sm:text-5xl">
            Pioneering the Future of Agriculture
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-foreground/80">
            At MD Agro Solution, we are dedicated to merging tradition with technology to create a more prosperous and sustainable world for farmers.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center animate-slide-up">
                <CardHeader>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Goal className="h-6 w-6" />
                    </div>
                    <CardTitle className="font-headline text-2xl mt-4">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                    To empower farmers with high-quality, innovative, and sustainable agricultural products that enhance productivity and profitability while preserving the environment.
                </CardContent>
            </Card>
            <Card className="text-center animate-slide-up">
                <CardHeader>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Lightbulb className="h-6 w-6" />
                    </div>
                    <CardTitle className="font-headline text-2xl mt-4">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                   To be a global leader in agricultural solutions, recognized for our commitment to quality, farmer success, and ecological balance.
                </CardContent>
            </Card>
            <Card className="text-center animate-slide-up">
                <CardHeader>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Tractor className="h-6 w-6" />
                    </div>
                    <CardTitle className="font-headline text-2xl mt-4">Our Approach</CardTitle>
                </CardHeader>
                <CardContent>
                    We combine scientific research with on-the-ground experience to develop practical, effective products that address real-world farming challenges.
                </CardContent>
            </Card>
        </div>

        <div className="mt-24 text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-12">Meet Our Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-lg mb-4 hover:scale-105 transition-transform">
                <Image src="https://picsum.photos/seed/founder/200/200" alt="Dipali Mukund Shelake" fill className="object-cover" />
              </div>
              <h3 className="text-2xl font-headline font-bold text-primary">Dipali Mukund Shelake</h3>
              <p className="text-lg text-primary font-semibold mb-1">Founder</p>
              <p className="text-sm text-muted-foreground text-center max-w-xs">
                Visionary leader driving innovation in agricultural solutions
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-lg mb-4 hover:scale-105 transition-transform">
                <Image src="https://picsum.photos/seed/cofounder/200/200" alt="Shelke Mukund Punjaram" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-headline font-semibold">Shelke Mukund Punjaram</h3>
              <p className="text-sm text-primary font-medium">Co-Founder & Director</p>
            </div>
          </div>
        </div>
        
        <div className="mt-24 text-center bg-card p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-headline font-bold text-primary">Our Commitment to Excellence</h2>
            <p className="mt-2 max-w-3xl mx-auto text-foreground/80">We are a team of passionate scientists, agronomists, and professionals working hand-in-hand with farmers.</p>
        </div>
      </div>
    </div>
  );
}
