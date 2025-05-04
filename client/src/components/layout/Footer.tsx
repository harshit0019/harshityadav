import { motion } from "framer-motion";
import { fadeIn } from "@/lib/framer-animations";

export function Footer() {
  return (
    <footer className="glass py-8 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <motion.div
            variants={fadeIn("right", 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h3 className="text-xl font-poppins font-bold mb-4 text-gray-800 dark:text-gray-200">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition"
                >
                  Skills
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#experience"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition"
                >
                  Experience
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition"
                >
                  Contact
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h3 className="text-xl font-poppins font-bold mb-4 text-gray-800 dark:text-gray-200">
              Connect
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com/in/harshitydv"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-100 dark:bg-gray-700 text-primary h-10 w-10 rounded-full flex items-center justify-center transition transform hover:scale-110 hover:shadow-md"
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
                className="bg-gray-100 dark:bg-gray-700 text-primary h-10 w-10 rounded-full flex items-center justify-center transition transform hover:scale-110 hover:shadow-md"
                aria-label="GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              <a
                href="mailto:yadavharshit1901@gmail.com"
                className="bg-gray-100 dark:bg-gray-700 text-primary h-10 w-10 rounded-full flex items-center justify-center transition transform hover:scale-110 hover:shadow-md"
                aria-label="Email"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Copyright */}
          <motion.div
            variants={fadeIn("left", 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="flex items-center justify-center md:justify-end"
          >
            <p className="text-gray-600 dark:text-gray-400 text-center md:text-right">
              Made with <span className="text-red-500">❤️</span> by Harshit Yadav
              <br />
              <span className="text-sm">© {new Date().getFullYear()} All Rights Reserved</span>
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
