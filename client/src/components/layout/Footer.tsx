import { motion } from "framer-motion";
import { fadeIn } from "@/lib/framer-animations";
import { Github, Linkedin, Mail, Code, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-gray-50 dark:bg-gray-900 py-16 mt-auto border-t border-gray-200 dark:border-gray-800">
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900 -translate-y-full"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-10">
          {/* Brand */}
          <motion.div 
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="md:col-span-4"
          >
            <div className="flex items-center space-x-2 mb-4">
              <Code className="text-primary h-6 w-6" />
              <h2 className="text-2xl font-poppins font-bold gradient-text">Harshit Yadav</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-5 max-w-xs">
              Passionate software developer focused on creating engaging digital experiences 
              with clean code and modern technologies.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://linkedin.com/in/harshitydv"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-blue-500 to-primary text-white h-9 w-9 rounded-full flex items-center justify-center transition transform hover:scale-110 hover:shadow-lg shadow-md"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/harshit0019"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-gray-800 to-gray-700 text-white h-9 w-9 rounded-full flex items-center justify-center transition transform hover:scale-110 hover:shadow-lg shadow-md"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="mailto:yadavharshit1901@gmail.com"
                className="bg-gradient-to-br from-red-500 to-orange-500 text-white h-9 w-9 rounded-full flex items-center justify-center transition transform hover:scale-110 hover:shadow-lg shadow-md"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="md:col-span-3"
          >
            <h3 className="text-xl font-poppins font-bold mb-5 text-gray-800 dark:text-gray-200">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#home"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200 text-sm flex items-center"
                >
                  <span className="bg-primary h-1 w-1 rounded-full inline-block mr-2"></span>
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200 text-sm flex items-center"
                >
                  <span className="bg-primary h-1 w-1 rounded-full inline-block mr-2"></span>
                  About
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200 text-sm flex items-center"
                >
                  <span className="bg-primary h-1 w-1 rounded-full inline-block mr-2"></span>
                  Skills
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200 text-sm flex items-center"
                >
                  <span className="bg-primary h-1 w-1 rounded-full inline-block mr-2"></span>
                  Projects
                </a>
              </li>
            </ul>
          </motion.div>

          {/* More Links */}
          <motion.div
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="md:col-span-2"
          >
            <h3 className="text-xl font-poppins font-bold mb-5 text-gray-800 dark:text-gray-200 md:opacity-0 hidden md:block">
              &nbsp;
            </h3>
            <ul className="space-y-3 mt-[-3px] md:mt-0">
              <li>
                <a
                  href="#experience"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200 text-sm flex items-center"
                >
                  <span className="bg-primary h-1 w-1 rounded-full inline-block mr-2"></span>
                  Experience
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200 text-sm flex items-center"
                >
                  <span className="bg-primary h-1 w-1 rounded-full inline-block mr-2"></span>
                  Contact
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            variants={fadeIn("left", 0.5)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="md:col-span-3"
          >
            <h3 className="text-xl font-poppins font-bold mb-5 text-gray-800 dark:text-gray-200">
              Get in Touch
            </h3>
            <address className="not-italic">
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Email:</p>
              <p className="text-gray-800 dark:text-gray-200 font-medium mb-4">yadavharshit1901@gmail.com</p>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Based in:</p>
              <p className="text-gray-800 dark:text-gray-200 font-medium">New Delhi, India</p>
            </address>
          </motion.div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-800 mb-8"></div>
        
        {/* Bottom Section */}
        <motion.div 
          variants={fadeIn("up", 0.5)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-between"
        >
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0 flex items-center">
            <span>© {new Date().getFullYear()} Harshit Yadav. All rights reserved.</span>
          </p>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center">
            Built with <Heart className="h-4 w-4 text-red-500 mx-1" fill="currentColor" /> using React, TypeScript & Tailwind CSS
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
