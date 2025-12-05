import { z } from "zod";

// Services offered by the barbershop
export const services = [
  { id: "haircut", name: "Classic Haircut", duration: 30, price: 35, description: "Traditional cut with modern styling" },
  { id: "beard-trim", name: "Beard Trim", duration: 20, price: 20, description: "Professional beard shaping and grooming" },
  { id: "haircut-beard", name: "Haircut + Beard", duration: 45, price: 50, description: "Complete grooming package" },
  { id: "hot-towel-shave", name: "Hot Towel Shave", duration: 30, price: 30, description: "Luxurious straight razor experience" },
  { id: "kids-cut", name: "Kids Haircut", duration: 20, price: 25, description: "Friendly cuts for ages 12 and under" },
  { id: "fade", name: "Skin Fade", duration: 40, price: 40, description: "Precision fade with clean lines" },
] as const;

export type Service = typeof services[number];

// Barbers
export const barbers = [
  { id: "marcus", name: "Marcus Johnson", specialty: "Fades & Modern Styles", yearsExp: 12, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face" },
  { id: "james", name: "James Wilson", specialty: "Classic Cuts & Shaves", yearsExp: 8, image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face" },
  { id: "david", name: "David Chen", specialty: "Beard Styling", yearsExp: 6, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face" },
  { id: "alex", name: "Alex Rivera", specialty: "Precision Fades", yearsExp: 10, image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face" },
] as const;

export type Barber = typeof barbers[number];

// Time slots configuration
export const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
] as const;

export type TimeSlot = typeof timeSlots[number];

// Booking schema
export const bookingSchema = z.object({
  id: z.string().optional(),
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerEmail: z.string().email("Please enter a valid email"),
  customerPhone: z.string().min(10, "Please enter a valid phone number"),
  serviceId: z.string().min(1, "Please select a service"),
  barberId: z.string().min(1, "Please select a barber"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  notes: z.string().optional(),
  status: z.enum(["pending", "confirmed", "completed", "cancelled"]).default("pending"),
  createdAt: z.string().optional(),
});

export const insertBookingSchema = bookingSchema.omit({ id: true, status: true, createdAt: true });

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = z.infer<typeof bookingSchema>;

// Availability response
export interface AvailabilityResponse {
  date: string;
  availableSlots: string[];
  bookedSlots: string[];
}
