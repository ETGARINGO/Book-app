import type { Express } from "express";
import { createServer, type Server } from "http";
import { appendBooking, getAllBookings, getBookedSlots } from "./sheets";
import { insertBookingSchema } from "@shared/schema";
import { randomUUID } from "crypto";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Get all bookings (for admin dashboard)
  app.get("/api/bookings", async (_req, res) => {
    try {
      const bookings = await getAllBookings();
      res.json(bookings);
    } catch (error: any) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ 
        message: "Failed to fetch bookings",
        error: error.message 
      });
    }
  });

  // Create a new booking
  app.post("/api/bookings", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = insertBookingSchema.parse(req.body);

      // Check if the slot is already booked
      const bookedSlots = await getBookedSlots(validatedData.date, validatedData.barberId);
      if (bookedSlots.includes(validatedData.time)) {
        return res.status(409).json({ 
          message: "This time slot is no longer available. Please select another time." 
        });
      }

      // Create the booking
      const booking = {
        id: randomUUID(),
        ...validatedData,
        notes: validatedData.notes || '',
        status: 'confirmed' as const,
        createdAt: new Date().toISOString(),
      };

      await appendBooking(booking);

      res.status(201).json(booking);
    } catch (error: any) {
      console.error("Error creating booking:", error);
      
      if (error.name === 'ZodError') {
        return res.status(400).json({ 
          message: "Invalid booking data",
          errors: error.errors 
        });
      }
      
      res.status(500).json({ 
        message: "Failed to create booking",
        error: error.message 
      });
    }
  });

  // Get availability for a specific date and barber
  app.get("/api/availability", async (req, res) => {
    try {
      const { date, barberId } = req.query;
      
      if (!date || !barberId) {
        return res.status(400).json({ 
          message: "Date and barberId are required" 
        });
      }

      const bookedSlots = await getBookedSlots(date as string, barberId as string);
      
      res.json({
        date,
        barberId,
        bookedSlots,
      });
    } catch (error: any) {
      console.error("Error fetching availability:", error);
      res.status(500).json({ 
        message: "Failed to fetch availability",
        error: error.message 
      });
    }
  });

  return httpServer;
}
