import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

// Contact form schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form endpoint
  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      // Validate form data
      const validData = contactFormSchema.parse(req.body);
      
      // In a real implementation, you would:
      // 1. Send email notification
      // 2. Store message in database
      // 3. Handle any errors
      
      // For now, just simulate a successful submission
      // with a slight delay to mimic network latency
      setTimeout(() => {
        res.status(200).json({ 
          success: true, 
          message: "Message received successfully" 
        });
      }, 1000);
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation failed", 
          errors: error.errors 
        });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({ 
          success: false, 
          message: "Server error" 
        });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
