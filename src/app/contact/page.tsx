import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ContactPage() {
    const contactImage = PlaceHolderImages.find(img => img.id === 'contact-us');

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center">
            <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl">Get in Touch</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
                We're here to help. Whether you have a question about our products, need support, or want to partner with us, please reach out.
            </p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1 space-y-8">
                <Card className="animate-fade-in">
                    <CardContent className="pt-6 flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-headline font-semibold">Our Office</h3>
                            <p className="text-foreground/80">Shed B8 & B9 MUMBAI AGRA Highway, Adgaon, Nashik 422003</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="animate-fade-in">
                    <CardContent className="pt-6 flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                            <Mail className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-headline font-semibold">Email Us</h3>
                            <p className="text-foreground/80">mdagrosolution1626@gmail.com</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="animate-fade-in">
                    <CardContent className="pt-6 flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                            <Phone className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-headline font-semibold">Call Us</h3>
                            <p className="text-foreground/80">+91 7249512616</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
            
            <div className="lg:col-span-2">
                <Card className="p-6 md:p-8 animate-fade-in">
                    <form name="contact" method="POST" data-netlify="true">
                        <input type="hidden" name="form-name" value="contact" />
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                                    <Input id="name" name="name" type="text" placeholder="Your Name" required />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                                    <Input id="email" name="email" type="email" placeholder="you@example.com" required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                                <Input id="subject" name="subject" type="text" placeholder="How can we help?" required />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium">Message</label>
                                <Textarea id="message" name="message" placeholder="Your message..." rows={6} required />
                            </div>
                            <Button type="submit" className="w-full md:w-auto hover:scale-105 transition-transform" size="lg">Send Message</Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
      </div>
    </div>
  );
}
