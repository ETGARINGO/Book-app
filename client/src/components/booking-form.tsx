import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ArrowLeft, Clock, User, Scissors, Calendar, Loader2 } from "lucide-react";
import { insertBookingSchema, type InsertBooking, type Service, type Barber } from "@shared/schema";
import { format } from "date-fns";

interface BookingFormProps {
  selectedService: Service;
  selectedBarber: Barber;
  selectedDate: Date;
  selectedTime: string;
  onBack: () => void;
  onSubmit: (data: InsertBooking) => void;
  isSubmitting?: boolean;
}

export function BookingForm({
  selectedService,
  selectedBarber,
  selectedDate,
  selectedTime,
  onBack,
  onSubmit,
  isSubmitting = false,
}: BookingFormProps) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const form = useForm<InsertBooking>({
    resolver: zodResolver(insertBookingSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      serviceId: selectedService.id,
      barberId: selectedBarber.id,
      date: format(selectedDate, 'yyyy-MM-dd'),
      time: selectedTime,
      notes: "",
    },
  });
  
  const handleSubmit = (data: InsertBooking) => {
    if (!termsAccepted) return;
    onSubmit(data);
  };
  
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6"
          data-testid="button-back-to-calendar"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Calendar
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-2xl uppercase tracking-wide">
                  Complete Your Booking
                </CardTitle>
                <CardDescription>
                  Please provide your contact information to confirm your appointment.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="customerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium uppercase tracking-wide">
                            Full Name
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="John Doe" 
                              data-testid="input-customer-name"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="customerEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium uppercase tracking-wide">
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <Input 
                              type="email"
                              placeholder="john@example.com" 
                              data-testid="input-customer-email"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="customerPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium uppercase tracking-wide">
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <Input 
                              type="tel"
                              placeholder="(555) 123-4567" 
                              data-testid="input-customer-phone"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium uppercase tracking-wide">
                            Special Requests (Optional)
                          </FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Any special requests or preferences..."
                              className="resize-none"
                              data-testid="input-notes"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-md">
                      <Checkbox 
                        id="terms"
                        checked={termsAccepted}
                        onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                        data-testid="checkbox-terms"
                      />
                      <label 
                        htmlFor="terms" 
                        className="text-sm text-muted-foreground cursor-pointer"
                      >
                        I agree to the booking terms and cancellation policy. I understand that 
                        I should arrive 5 minutes before my appointment time.
                      </label>
                    </div>
                    
                    <Button 
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={!termsAccepted || isSubmitting}
                      data-testid="button-confirm-booking"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Confirming...
                        </>
                      ) : (
                        "Confirm Booking"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Appointment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-md">
                  <Scissors className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Service</p>
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <p className="font-medium">{selectedService.name}</p>
                      <Badge variant="secondary">${selectedService.price}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedService.duration} min
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-md">
                  <User className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Barber</p>
                    <p className="font-medium">{selectedBarber.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedBarber.specialty}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-md">
                  <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Date</p>
                    <p className="font-medium">{format(selectedDate, 'EEEE, MMMM d, yyyy')}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-md">
                  <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Time</p>
                    <p className="font-medium">{selectedTime}</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Total</span>
                    <span className="text-xl font-bold">${selectedService.price}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Pay at the shop after your service
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
