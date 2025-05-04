import { z } from 'zod';

// Contact form schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Validate form data
    const validData = contactFormSchema.parse(req.body);
    
    // Use Web3Forms to send the email
    const formData = {
      ...validData,
      access_key: process.env.WEB3FORMS_API_KEY || "384d8768-c52f-4a1c-89f1-db67130a68c8",
      from_name: validData.name,
      subject: validData.subject || "Contact Form Submission",
      botcheck: "",  // Honeypot field for spam prevention
    };
    
    console.log("Sending contact form to Web3Forms...");
    
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData),
    });
    
    const responseData = await response.json();
    console.log("Web3Forms response:", responseData);
    
    if (responseData.success) {
      return res.status(200).json({ 
        success: true, 
        message: "Message sent successfully" 
      });
    } else {
      throw new Error(responseData.message || "Failed to send message");
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        success: false, 
        message: "Validation failed", 
        errors: error.errors 
      });
    } else {
      console.error("Contact form error:", error);
      return res.status(500).json({ 
        success: false, 
        message: error instanceof Error ? error.message : "Server error" 
      });
    }
  }
}