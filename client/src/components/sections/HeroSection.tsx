import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/framer-animations";
import { Download, Mail, ArrowDown } from "lucide-react";
import { TypeAnimation } from 'react-type-animation';

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Create a smooth entrance loading effect
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 400);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 to-gray-50 dark:from-gray-900 dark:to-gray-800 opacity-70"></div>
      
      {/* Animated orbs */}
      <div className="floating-orb-1"></div>
      <div className="floating-orb-2"></div>
      <div className="floating-orb-3"></div>

      {/* Main content container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Intro text with animation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
              opacity: isLoaded ? 1 : 0, 
              y: isLoaded ? 0 : -20,
              transition: { duration: 0.6, delay: 0.3 } 
            }}
            className="mb-2"
          >
            <span className="text-lg sm:text-xl text-primary font-josefin">
              Hi, I'm
            </span>
          </motion.div>
          
          {/* Name with animation */}
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
              opacity: isLoaded ? 1 : 0, 
              y: isLoaded ? 0 : -20,
              transition: { duration: 0.8, delay: 0.5 } 
            }}
            className="text-4xl sm:text-5xl md:text-6xl font-rubik font-bold mb-4 gradient-text"
          >
            Harshit Yadav
          </motion.h1>
          
          {/* Animated typing with multiple roles */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
              opacity: isLoaded ? 1 : 0, 
              y: isLoaded ? 0 : -20,
              transition: { duration: 0.8, delay: 0.7 } 
            }}
            className="h-10 sm:h-12 md:h-14 flex justify-center items-center mb-6"
          >
            <TypeAnimation
              sequence={[
                'Software Developer & Content Creator',
                2000,
                'Programmer & Data Analyst',
                2000,
                'Prompt Engineer & Vibe Coder',
                2000,
              ]}
              wrapper="h2"
              speed={50}
              repeat={Infinity}
              className="text-xl sm:text-2xl md:text-3xl font-poppins text-gray-800 dark:text-gray-200"
            />
          </motion.div>
          
          {/* Description with animation */}
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
              opacity: isLoaded ? 1 : 0, 
              y: isLoaded ? 0 : -20,
              transition: { duration: 0.8, delay: 0.9 } 
            }}
            className="text-lg text-gray-600 dark:text-gray-300 mb-8 font-josefin max-w-2xl mx-auto"
          >
            I build vibrant digital experiences with AI-powered prompt engineering, vibe-focused coding, robust programming skills, and polished software development.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isLoaded ? 1 : 0, 
              y: isLoaded ? 0 : 20,
              transition: { duration: 0.7, delay: 1.0 } 
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <a 
              href="https://drive.google.com/file/d/1kq91dr7uqTCLuG6JrETrKgD6nYCPl4B9/view?usp=sharing" 
              className="primary-gradient text-white px-6 py-3 rounded-md font-medium transition transform hover:scale-105 hover:shadow-md flex items-center gap-2 w-full sm:w-auto justify-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download size={18} /> Download Resume
            </a>
            <a 
              href="#contact" 
              className="bg-transparent text-primary dark:text-primary border-2 border-primary px-6 py-3 rounded-md font-medium transition transform hover:scale-105 hover:bg-primary hover:text-white flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <Mail size={18} /> Contact Me
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isLoaded ? 1 : 0, 
              y: isLoaded ? 0 : 20,
              transition: { duration: 0.7, delay: 1.2 } 
            }}
            className="flex items-center justify-center gap-6 mb-16"
          >
            <a 
              href="https://linkedin.com/in/harshitydv"
              target="_blank"
              rel="noopener noreferrer" 
              className="bg-gradient-to-br from-blue-500 to-primary text-white h-12 w-12 rounded-full flex items-center justify-center transition transform hover:scale-110 hover:shadow-md"
              aria-label="LinkedIn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a 
              href="https://github.com/harshit0019"
              target="_blank"
              rel="noopener noreferrer" 
              className="bg-gradient-to-br from-gray-800 to-gray-700 text-white h-12 w-12 rounded-full flex items-center justify-center transition transform hover:scale-110 hover:shadow-md"
              aria-label="GitHub"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a 
              href="mailto:yadavharshit1901@gmail.com" 
              className="bg-gradient-to-br from-red-500 to-orange-500 text-white h-12 w-12 rounded-full flex items-center justify-center transition transform hover:scale-110 hover:shadow-md"
              aria-label="Email"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          </motion.div>

          <motion.a 
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isLoaded ? 1 : 0, 
              y: isLoaded ? 0 : 20,
              transition: { duration: 0.7, delay: 1.4 } 
            }}
            href="#about" 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-primary animate-bounce"
            aria-label="Scroll down"
          >
            <ArrowDown className="h-8 w-8" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
