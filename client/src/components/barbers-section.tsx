import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { barbers, type Barber } from "@shared/schema";
import { cn } from "@/lib/utils";

interface BarbersSectionProps {
  selectedBarber: Barber | null;
  onSelectBarber: (barber: Barber) => void;
}

export function BarbersSection({ selectedBarber, onSelectBarber }: BarbersSectionProps) {
  return (
    <section id="barbers" className="py-20 px-6 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 
            className="font-display text-4xl md:text-5xl uppercase tracking-wide mb-4"
            data-testid="text-barbers-title"
          >
            Meet Our Barbers
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our team of skilled professionals brings years of experience and passion to every cut.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {barbers.map((barber) => {
            const isSelected = selectedBarber?.id === barber.id;
            
            return (
              <Card 
                key={barber.id}
                className={cn(
                  "transition-all duration-300 cursor-pointer hover-elevate overflow-visible",
                  isSelected && "ring-2 ring-primary"
                )}
                onClick={() => onSelectBarber(barber)}
                data-testid={`card-barber-${barber.id}`}
              >
                <CardContent className="p-6 text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-background">
                    <AvatarImage 
                      src={barber.image} 
                      alt={barber.name}
                      className="object-cover"
                    />
                    <AvatarFallback className="text-2xl font-semibold">
                      {barber.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <h3 className="font-semibold text-lg mb-1">{barber.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{barber.specialty}</p>
                  <Badge variant="secondary" className="mb-4 text-xs">
                    {barber.yearsExp} years exp.
                  </Badge>
                  
                  <Button 
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    className="w-full"
                    data-testid={`button-select-barber-${barber.id}`}
                  >
                    {isSelected ? "Selected" : "Select Barber"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
