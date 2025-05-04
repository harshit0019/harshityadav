import { motion } from "framer-motion";
import { fadeIn } from "@/lib/framer-animations";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Linkedin, Github, ExternalLink, Copy, Check, Loader2 } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactSection() {
  const [isEmailCopied, setIsEmailCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/contact", data);
      
      form.reset();
      toast({
        title: "Message sent successfully!",
        description: "Thanks for reaching out. I'll get back to you soon.",
        variant: "default",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Something went wrong",
        description: "Please try again later or contact me directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("yadavharshit1901@gmail.com");
    setIsEmailCopied(true);
    
    toast({
      title: "Email copied to clipboard!",
      variant: "default",
    });
    
    setTimeout(() => setIsEmailCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-3xl md:text-4xl font-poppins font-bold text-center mb-16"
        >
          Get In <span className="gradient-text">Touch</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div 
            variants={fadeIn("right", 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md"
          >
            <h3 className="text-2xl font-poppins font-bold mb-6 gradient-text">
              Contact Information
            </h3>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-full">
                  <Mail className="text-primary h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Email</h4>
                  <p className="text-gray-600 dark:text-gray-400">yadavharshit1901@gmail.com</p>
                  <button 
                    onClick={copyEmail}
                    className="text-primary text-sm hover:underline mt-1 flex items-center gap-1"
                  >
                    {isEmailCopied ? (
                      <>
                        <Check className="h-4 w-4" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" /> Copy email
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-full">
                  <Linkedin className="text-primary h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">LinkedIn</h4>
                  <p className="text-gray-600 dark:text-gray-400">linkedin.com/in/harshitydv</p>
                  <a 
                    href="https://linkedin.com/in/harshitydv" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary text-sm hover:underline mt-1 flex items-center gap-1"
                  >
                    <ExternalLink className="h-4 w-4" /> Visit Profile
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-full">
                  <Github className="text-primary h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">GitHub</h4>
                  <p className="text-gray-600 dark:text-gray-400">github.com/harshit0019</p>
                  <a 
                    href="https://github.com/harshit0019" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary text-sm hover:underline mt-1 flex items-center gap-1"
                  >
                    <ExternalLink className="h-4 w-4" /> Visit Profile
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Let's connect</h4>
              <div className="flex space-x-4">
                <a
                  href="https://linkedin.com/in/harshitydv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 dark:bg-gray-700 text-primary h-12 w-12 rounded-full flex items-center justify-center transition transform hover:scale-110 hover:shadow-md"
                  aria-label="LinkedIn"
                >
                  <Linkedin />
                </a>
                <a
                  href="https://github.com/harshit0019"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 dark:bg-gray-700 text-primary h-12 w-12 rounded-full flex items-center justify-center transition transform hover:scale-110 hover:shadow-md"
                  aria-label="GitHub"
                >
                  <Github />
                </a>
                <a
                  href="mailto:yadavharshit1901@gmail.com"
                  className="bg-gray-100 dark:bg-gray-700 text-primary h-12 w-12 rounded-full flex items-center justify-center transition transform hover:scale-110 hover:shadow-md"
                  aria-label="Email"
                >
                  <Mail />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            variants={fadeIn("left", 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md"
          >
            <h3 className="text-2xl font-poppins font-bold mb-6 gradient-text">
              Send Me a Message
            </h3>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your name" 
                          {...field}
                          className="px-4 py-3 rounded-md" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="your.email@example.com" 
                          type="email"
                          {...field}
                          className="px-4 py-3 rounded-md" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="What's this about?" 
                          {...field}
                          className="px-4 py-3 rounded-md" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Your message here..." 
                          {...field}
                          className="px-4 py-3 rounded-md" 
                          rows={4}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="primary-gradient text-white w-full px-6 py-3 rounded-md font-medium transition transform hover:scale-105 hover:shadow-md flex items-center justify-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
