import { Scissors, MapPin, Phone, Mail, Clock } from "lucide-react";
import { SiInstagram, SiFacebook } from "react-icons/si";
import { Button } from "@/components/ui/button";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-card border-t py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Scissors className="w-6 h-6 text-primary" />
              <span className="font-display text-2xl uppercase tracking-wider">Sharp Cuts</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Premium barbershop offering classic cuts and modern styles since 2010. 
              Where tradition meets contemporary craftsmanship.
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" asChild>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  data-testid="link-instagram"
                >
                  <SiInstagram className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  data-testid="link-facebook"
                >
                  <SiFacebook className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 uppercase tracking-wide text-sm">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#services" className="hover:text-foreground transition-colors" data-testid="link-services">
                  Services
                </a>
              </li>
              <li>
                <a href="#barbers" className="hover:text-foreground transition-colors" data-testid="link-barbers">
                  Our Barbers
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-foreground transition-colors" data-testid="link-booking">
                  Book Now
                </a>
              </li>
              <li>
                <a href="/admin" className="hover:text-foreground transition-colors" data-testid="link-admin">
                  Admin
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 uppercase tracking-wide text-sm">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>123 Main Street<br />Downtown, City 12345</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                <span>hello@sharpcuts.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 uppercase tracking-wide text-sm">Hours</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Mon - Fri</p>
                  <p>9:00 AM - 6:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 shrink-0 opacity-0" />
                <div>
                  <p className="font-medium text-foreground">Saturday</p>
                  <p>10:00 AM - 5:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 shrink-0 opacity-0" />
                <div>
                  <p className="font-medium text-foreground">Sunday</p>
                  <p>Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Sharp Cuts Barbershop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
