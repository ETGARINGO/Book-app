import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, User, Scissors, Calendar, MapPin, Phone, Home } from "lucide-react";
import { type Service, type Barber } from "@shared/schema";
import { format } from "date-fns";

interface BookingConfirmationProps {
  customerName: string;
  customerEmail: string;
  selectedService: Service;
  selectedBarber: Barber;
  selectedDate: Date;
  selectedTime: string;
  onNewBooking: () => void;
}

export function BookingConfirmation({
  customerName,
  customerEmail,
  selectedService,
  selectedBarber,
  selectedDate,
  selectedTime,
  onNewBooking,
}: BookingConfirmationProps) {
  return (
    <section className="py-20 px-6 bg-background min-h-screen flex items-center">
      <div className="max-w-2xl mx-auto w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          
          <h1 
            className="font-display text-4xl md:text-5xl uppercase tracking-wide mb-4"
            data-testid="text-confirmation-title"
          >
            Booking Confirmed!
          </h1>
          <p className="text-muted-foreground text-lg">
            Thank you, {customerName}! Your appointment has been scheduled.
          </p>
        </div>
        
        <Card className="mb-8">
          <CardHeader className="text-center pb-4 border-b">
            <CardTitle className="text-lg">Appointment Details</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-md">
                <Scissors className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Service</p>
                  <p className="font-medium">{selectedService.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">{selectedService.duration} min</Badge>
                    <Badge variant="secondary" className="text-xs">${selectedService.price}</Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-md">
                <User className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Barber</p>
                  <p className="font-medium">{selectedBarber.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">{selectedBarber.specialty}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-md">
                <Calendar className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Date</p>
                  <p className="font-medium">{format(selectedDate, 'EEEE, MMMM d, yyyy')}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-md">
                <Clock className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Time</p>
                  <p className="font-medium">{selectedTime}</p>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t mt-6">
              <div className="text-center space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>123 Main Street, Downtown</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>(555) 123-4567</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md p-4 mb-8">
          <p className="text-sm text-amber-800 dark:text-amber-200 text-center">
            A confirmation email has been sent to <strong>{customerEmail}</strong>.
            Please arrive 5 minutes before your appointment.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="outline" 
            size="lg"
            onClick={onNewBooking}
            data-testid="button-new-booking"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    </section>
  );
}
