import { createContext, useContext, useState } from "react";
import type { Service, Barber } from "@shared/schema";

interface BookingState {
  selectedService: Service | null;
  selectedBarber: Barber | null;
  selectedDate: Date | null;
  selectedTime: string | null;
  step: "service" | "barber" | "datetime" | "form" | "confirmation";
}

interface BookingContextType extends BookingState {
  setSelectedService: (service: Service | null) => void;
  setSelectedBarber: (barber: Barber | null) => void;
  setSelectedDate: (date: Date | null) => void;
  setSelectedTime: (time: string | null) => void;
  setStep: (step: BookingState["step"]) => void;
  reset: () => void;
}

const initialState: BookingState = {
  selectedService: null,
  selectedBarber: null,
  selectedDate: null,
  selectedTime: null,
  step: "service",
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<BookingState>(initialState);

  const setSelectedService = (service: Service | null) => {
    setState((prev) => ({ ...prev, selectedService: service }));
  };

  const setSelectedBarber = (barber: Barber | null) => {
    setState((prev) => ({ ...prev, selectedBarber: barber }));
  };

  const setSelectedDate = (date: Date | null) => {
    setState((prev) => ({ ...prev, selectedDate: date, selectedTime: null }));
  };

  const setSelectedTime = (time: string | null) => {
    setState((prev) => ({ ...prev, selectedTime: time }));
  };

  const setStep = (step: BookingState["step"]) => {
    setState((prev) => ({ ...prev, step }));
  };

  const reset = () => {
    setState(initialState);
  };

  return (
    <BookingContext.Provider
      value={{
        ...state,
        setSelectedService,
        setSelectedBarber,
        setSelectedDate,
        setSelectedTime,
        setStep,
        reset,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
