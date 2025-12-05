import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight, Clock, User, Scissors } from "lucide-react";
import { cn } from "@/lib/utils";
import { timeSlots, type Service, type Barber } from "@shared/schema";
import { format, addDays, startOfDay, isSameDay, isAfter } from "date-fns";

interface BookingCalendarProps {
  selectedService: Service | null;
  selectedBarber: Barber | null;
  selectedDate: Date | null;
  selectedTime: string | null;
  onDateSelect: (date: Date) => void;
  onTimeSelect: (time: string) => void;
  onContinue: () => void;
  bookedSlots?: string[];
  isLoading?: boolean;
}

export function BookingCalendar({
  selectedService,
  selectedBarber,
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
  onContinue,
  bookedSlots = [],
  isLoading = false,
}: BookingCalendarProps) {
  const [weekOffset, setWeekOffset] = useState(0);
  
  const today = startOfDay(new Date());
  
  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => addDays(today, i + weekOffset * 7));
  }, [weekOffset, today]);
  
  const availableSlots = useMemo(() => {
    if (!selectedDate) return [];
    
    const isToday = isSameDay(selectedDate, today);
    const now = new Date();
    
    return timeSlots.filter((slot) => {
      if (bookedSlots.includes(slot)) return false;
      
      if (isToday) {
        const [hours, minutes] = slot.split(':').map(Number);
        const slotTime = new Date(selectedDate);
        slotTime.setHours(hours, minutes, 0, 0);
        return isAfter(slotTime, now);
      }
      
      return true;
    });
  }, [selectedDate, bookedSlots, today]);
  
  const canContinue = selectedService && selectedBarber && selectedDate && selectedTime;
  
  return (
    <section id="booking" className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 
            className="font-display text-4xl md:text-5xl uppercase tracking-wide mb-4"
            data-testid="text-booking-title"
          >
            Book Your Appointment
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select your preferred date and time. We'll confirm your booking instantly.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <CardTitle className="text-lg">Select Date</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setWeekOffset((prev) => Math.max(0, prev - 1))}
                      disabled={weekOffset === 0}
                      data-testid="button-prev-week"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <span className="text-sm text-muted-foreground min-w-32 text-center">
                      {format(weekDays[0], 'MMM d')} - {format(weekDays[6], 'MMM d, yyyy')}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setWeekOffset((prev) => prev + 1)}
                      disabled={weekOffset >= 3}
                      data-testid="button-next-week"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2">
                  {weekDays.map((date, i) => {
                    const isSelected = selectedDate && isSameDay(date, selectedDate);
                    const isPast = date < today;
                    
                    return (
                      <button
                        key={i}
                        onClick={() => !isPast && onDateSelect(date)}
                        disabled={isPast}
                        className={cn(
                          "flex flex-col items-center p-3 rounded-md transition-all",
                          "hover-elevate active-elevate-2",
                          isPast && "opacity-40 cursor-not-allowed",
                          isSelected 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-card border border-border"
                        )}
                        data-testid={`button-date-${format(date, 'yyyy-MM-dd')}`}
                      >
                        <span className="text-xs font-medium uppercase">
                          {format(date, 'EEE')}
                        </span>
                        <span className="text-xl font-semibold mt-1">
                          {format(date, 'd')}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Select Time</CardTitle>
              </CardHeader>
              <CardContent>
                {!selectedDate ? (
                  <p className="text-center text-muted-foreground py-8">
                    Please select a date first
                  </p>
                ) : isLoading ? (
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <Skeleton key={i} className="h-12 rounded-md" />
                    ))}
                  </div>
                ) : availableSlots.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No available slots for this date. Please select another date.
                  </p>
                ) : (
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {availableSlots.map((time) => {
                      const isSelected = selectedTime === time;
                      
                      return (
                        <button
                          key={time}
                          onClick={() => onTimeSelect(time)}
                          className={cn(
                            "px-4 py-3 rounded-md text-sm font-medium transition-all",
                            "hover-elevate active-elevate-2",
                            isSelected 
                              ? "bg-primary text-primary-foreground" 
                              : "bg-card border border-border"
                          )}
                          data-testid={`button-time-${time.replace(':', '')}`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:sticky lg:top-24 h-fit">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-md">
                    <Scissors className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Service</p>
                      {selectedService ? (
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <p className="font-medium">{selectedService.name}</p>
                          <Badge variant="secondary">${selectedService.price}</Badge>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">Not selected</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-md">
                    <User className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Barber</p>
                      {selectedBarber ? (
                        <p className="font-medium">{selectedBarber.name}</p>
                      ) : (
                        <p className="text-sm text-muted-foreground">Not selected</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-md">
                    <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Date & Time</p>
                      {selectedDate && selectedTime ? (
                        <p className="font-medium">
                          {format(selectedDate, 'EEEE, MMMM d')} at {selectedTime}
                        </p>
                      ) : (
                        <p className="text-sm text-muted-foreground">Not selected</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full"
                  size="lg"
                  disabled={!canContinue}
                  onClick={onContinue}
                  data-testid="button-continue-booking"
                >
                  Continue to Details
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
