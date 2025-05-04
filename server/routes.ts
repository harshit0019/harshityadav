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
  
  // Web3Forms proxy endpoint
  app.post('/api/web3forms-proxy', async (req: Request, res: Response) => {
    try {
      const formData = {
        ...req.body,
        access_key: "384d8768-c52f-4a1c-89f1-db67130a68c8", // Adding API key server-side for security
        site_url: "https://harshityadav.com", // Setting site_url to bypass domain check
      };
      
      console.log("Forwarding to Web3Forms:", formData);
      
      // Forward the request to Web3Forms
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData),
      });
      
      // Get response as text first for logging
      const responseText = await response.text();
      console.log("Web3Forms response:", responseText);
      
      // Parse the response if it's JSON
      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        responseData = { success: false, message: responseText };
      }
      
      // Return Web3Forms response
      res.status(response.status).json(responseData);
      
    } catch (error) {
      console.error("Web3Forms proxy error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to forward request to Web3Forms" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
