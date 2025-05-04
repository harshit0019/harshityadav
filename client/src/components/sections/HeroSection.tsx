import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/framer-animations";
import { loadParticles } from "@/lib/particles-config";
import { Download, Mail, ArrowDown } from "lucide-react";

export function HeroSection() {
  const [isParticlesLoaded, setIsParticlesLoaded] = useState(false);

  useEffect(() => {
    loadParticles('tsparticles');
    setIsParticlesLoaded(true);
  }, []);
  
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16">
      <div id="tsparticles" className="absolute inset-0 -z-10"></div>

      <div className="floating-orb-1"></div>
      <div className="floating-orb-2"></div>
      <div className="floating-orb-3"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center max-w-3xl mx-auto">
          <motion.p 
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            animate="show"
            className="text-lg sm:text-xl text-primary mb-2 font-josefin"
          >
            Hi, I'm
          </motion.p>
          
          <motion.h1 
            variants={fadeIn("down", 0.3)}
            initial="hidden"
            animate="show"
            className="text-4xl sm:text-5xl md:text-6xl font-rubik font-bold mb-4 gradient-text"
          >
            Harshit Yadav
          </motion.h1>
          
          <motion.h2 
            variants={fadeIn("down", 0.4)}
            initial="hidden"
            animate="show"
            className="text-xl sm:text-2xl md:text-3xl font-poppins text-gray-800 dark:text-gray-200 mb-6"
          >
            Programmer & Data Analyst
          </motion.h2>
          
          <motion.p 
            variants={fadeIn("down", 0.5)}
            initial="hidden"
            animate="show"
            className="text-lg text-gray-600 dark:text-gray-300 mb-8 font-josefin"
          >
            Creating sustainable solutions through data analysis and programming
          </motion.p>

          <motion.div 
            variants={fadeIn("up", 0.6)}
            initial="hidden"
            animate="show"
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <a 
              href="https://drive.google.com/uc?export=download&id=1kq91dr7uqTCLuG6JrETrKgD6nYCPl4B9" 
              className="primary-gradient text-white px-6 py-3 rounded-md font-medium transition transform hover:scale-105 hover:shadow-md flex items-center gap-2 w-full sm:w-auto justify-center"
              download="Harshit_Yadav_Resume.pdf"
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
            variants={fadeIn("up", 0.7)}
            initial="hidden"
            animate="show"
            className="flex items-center justify-center gap-6 mb-16"
          >
            <a 
              href="https://linkedin.com/in/harshitydv"
              target="_blank"
              rel="noopener noreferrer" 
              className="bg-gray-100 dark:bg-gray-800 text-primary h-12 w-12 rounded-full flex items-center justify-center transition transform hover:scale-110 hover:shadow-md"
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
              className="bg-gray-100 dark:bg-gray-800 text-primary h-12 w-12 rounded-full flex items-center justify-center transition transform hover:scale-110 hover:shadow-md"
              aria-label="GitHub"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a 
              href="mailto:yadavharshit1901@gmail.com" 
              className="bg-gray-100 dark:bg-gray-800 text-primary h-12 w-12 rounded-full flex items-center justify-center transition transform hover:scale-110 hover:shadow-md"
              aria-label="Email"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          </motion.div>

          <motion.a 
            variants={fadeIn("up", 0.8)}
            initial="hidden"
            animate="show"
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
