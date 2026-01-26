import Image from 'next/image';
import { Mail, Phone, MapPin, Clock, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ContactPage() {
    const contactImage = PlaceHolderImages.find(img => img.id === 'contact-us');

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center">
            <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl">Get in Touch</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
                MD Agro Solution & Trading Co. is here to help. Whether you have a question about our products, need support, or want to partner with us, please reach out.
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
                
                {/* Business Hours Card */}
                <Card className="animate-fade-in">
                    <CardContent className="pt-6 flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-headline font-semibold">Business Hours</h3>
                            <p className="text-foreground/80">Available 24/7 for your convenience</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
            
            <div className="lg:col-span-2">
                <Card className="p-6 md:p-8 animate-fade-in">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Company License</h2>
                        <div className="bg-gray-100 p-6 rounded-lg mb-6">
                            <p className="text-xl font-semibold text-gray-800">License No:- LCFWD2025120473</p>
                        </div>
                        
                        <div className="mt-8">
                            <h3 className="text-xl font-bold mb-4">Customer Satisfaction</h3>
                            <div className="flex justify-center space-x-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                                ))}
                            </div>
                            <p className="text-foreground/70">
                                With over 500+ satisfied customers, we pride ourselves on delivering exceptional service and quality agricultural solutions.
                            </p>
                        </div>
                        
                        <div className="mt-8">
                            <p className="text-lg font-medium text-primary">
                                For immediate assistance, please contact us via email or phone during business hours.
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
      </div>
    </div>
  );
}