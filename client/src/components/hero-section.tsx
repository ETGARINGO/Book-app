import { Button } from "@/components/ui/button";
import { Scissors, Users, Clock } from "lucide-react";

interface HeroSectionProps {
  onBookNow: () => void;
}

export function HeroSection({ onBookNow }: HeroSectionProps) {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1920&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h1 
          className="font-display text-6xl md:text-7xl lg:text-8xl text-white uppercase tracking-wider mb-6"
          data-testid="text-hero-title"
        >
          Classic Cuts.<br />Modern Style.
        </h1>
        
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto font-light">
          Experience premium grooming with our expert barbers. Where tradition meets contemporary style.
        </p>
        
        <Button 
          size="lg"
          onClick={onBookNow}
          data-testid="button-hero-book"
          className="px-8 py-6 text-lg font-semibold backdrop-blur-sm"
        >
          <Scissors className="w-5 h-5 mr-2" />
          Book Your Appointment
        </Button>
        
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mt-12 text-white/80 text-sm">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>2,000+ Satisfied Clients</span>
          </div>
          <div className="flex items-center gap-2">
            <Scissors className="w-4 h-4" />
            <span>Expert Barbers</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Walk-ins Welcome</span>
          </div>
        </div>
      </div>
    </section>
  );
}
