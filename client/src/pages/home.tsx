import { useState, useRef } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { BarbersSection } from "@/components/barbers-section";
import { BookingCalendar } from "@/components/booking-calendar";
import { BookingForm } from "@/components/booking-form";
import { BookingConfirmation } from "@/components/booking-confirmation";
import { WhyChooseUs } from "@/components/why-choose-us";
import { Footer } from "@/components/footer";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { format } from "date-fns";
import type { Service, Barber, InsertBooking } from "@shared/schema";

type BookingStep = "browse" | "calendar" | "form" | "confirmation";

export default function Home() {
  const [step, setStep] = useState<BookingStep>("browse");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [confirmationData, setConfirmationData] = useState<{
    customerName: string;
    customerEmail: string;
  } | null>(null);
  
  const bookingRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Fetch availability when date, service, and barber are selected
  const dateStr = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
  const availabilityQuery = useQuery<{ bookedSlots: string[] }>({
    queryKey: ["/api/availability", dateStr, selectedBarber?.id || ''],
    queryFn: async () => {
      if (!selectedDate || !selectedBarber) return { bookedSlots: [] };
      const res = await fetch(`/api/availability?date=${dateStr}&barberId=${selectedBarber.id}`);
      if (!res.ok) throw new Error('Failed to fetch availability');
      return res.json();
    },
    enabled: !!selectedDate && !!selectedBarber,
  });
  
  const scrollToBooking = () => {
    if (step === "browse") {
      document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    if (!selectedBarber) {
      setTimeout(() => {
        document.getElementById("barbers")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };
  
  const handleBarberSelect = (barber: Barber) => {
    setSelectedBarber(barber);
    if (selectedService) {
      setTimeout(() => {
        document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };
  
  const bookingMutation = useMutation({
    mutationFn: async (data: InsertBooking) => {
      const response = await apiRequest("POST", "/api/bookings", data);
      return response;
    },
    onSuccess: (_, variables) => {
      // Invalidate availability cache
      queryClient.invalidateQueries({ queryKey: ["/api/availability"] });
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      
      setConfirmationData({
        customerName: variables.customerName,
        customerEmail: variables.customerEmail,
      });
      setStep("confirmation");
      window.scrollTo({ top: 0, behavior: "smooth" });
      
      toast({
        title: "Booking Confirmed!",
        description: "Your appointment has been successfully scheduled.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Booking Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  const handleContinueToForm = () => {
    setStep("form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  const handleBackToCalendar = () => {
    setStep("browse");
    setTimeout(() => {
      document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };
  
  const handleSubmitBooking = (data: InsertBooking) => {
    bookingMutation.mutate(data);
  };
  
  const handleNewBooking = () => {
    setSelectedService(null);
    setSelectedBarber(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setConfirmationData(null);
    setStep("browse");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  if (step === "confirmation" && confirmationData && selectedService && selectedBarber && selectedDate && selectedTime) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <BookingConfirmation
          customerName={confirmationData.customerName}
          customerEmail={confirmationData.customerEmail}
          selectedService={selectedService}
          selectedBarber={selectedBarber}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onNewBooking={handleNewBooking}
        />
      </div>
    );
  }
  
  if (step === "form" && selectedService && selectedBarber && selectedDate && selectedTime) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <BookingForm
            selectedService={selectedService}
            selectedBarber={selectedBarber}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onBack={handleBackToCalendar}
            onSubmit={handleSubmitBooking}
            isSubmitting={bookingMutation.isPending}
          />
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Header onBookNow={scrollToBooking} />
      
      <HeroSection onBookNow={scrollToBooking} />
      
      <ServicesSection
        selectedService={selectedService}
        onSelectService={handleServiceSelect}
      />
      
      <BarbersSection
        selectedBarber={selectedBarber}
        onSelectBarber={handleBarberSelect}
      />
      
      <div ref={bookingRef}>
        <BookingCalendar
          selectedService={selectedService}
          selectedBarber={selectedBarber}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onDateSelect={setSelectedDate}
          onTimeSelect={setSelectedTime}
          onContinue={handleContinueToForm}
          bookedSlots={availabilityQuery.data?.bookedSlots || []}
          isLoading={availabilityQuery.isLoading}
        />
      </div>
      
      <WhyChooseUs />
      
      <Footer />
    </div>
  );
}
