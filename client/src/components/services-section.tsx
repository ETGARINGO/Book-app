import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Scissors, Sparkles, Clock } from "lucide-react";
import { services, type Service } from "@shared/schema";
import { cn } from "@/lib/utils";

const serviceIcons: Record<string, typeof Scissors> = {
  "haircut": Scissors,
  "beard-trim": Sparkles,
  "haircut-beard": Scissors,
  "hot-towel-shave": Sparkles,
  "kids-cut": Scissors,
  "fade": Scissors,
};

interface ServicesSectionProps {
  selectedService: Service | null;
  onSelectService: (service: Service) => void;
}

export function ServicesSection({ selectedService, onSelectService }: ServicesSectionProps) {
  return (
    <section id="services" className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 
            className="font-display text-4xl md:text-5xl uppercase tracking-wide mb-4"
            data-testid="text-services-title"
          >
            Our Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From classic cuts to modern styles, our skilled barbers deliver precision and care with every service.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = serviceIcons[service.id] || Scissors;
            const isSelected = selectedService?.id === service.id;
            
            return (
              <Card 
                key={service.id}
                className={cn(
                  "transition-all duration-300 cursor-pointer hover-elevate",
                  isSelected && "ring-2 ring-primary"
                )}
                onClick={() => onSelectService(service)}
                data-testid={`card-service-${service.id}`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      ${service.price}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl mt-4">{service.name}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{service.duration} min</span>
                    </div>
                    <Button 
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      data-testid={`button-select-service-${service.id}`}
                    >
                      {isSelected ? "Selected" : "Select"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
