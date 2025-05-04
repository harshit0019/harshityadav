import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Router() {
  // Smooth scrolling
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <Switch>
      <Route path="/" component={Home} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress with incremental updates
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => setLoading(false), 500); // Short delay after reaching 100%
      }
      setLoadingProgress(Math.min(progress, 100));
    }, 300);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loader"
                className="page-loader"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Animated background elements */}
                <div className="loading-background">
                  <motion.div 
                    className="bg-orb bg-orb-1"
                    initial={{ scale: 0, opacity: 0, x: -100, y: -100 }}
                    animate={{ scale: 1, opacity: 0.4, x: 0, y: 0 }}
                    transition={{ duration: 1.5, delay: 0.2 }}
                  />
                  <motion.div 
                    className="bg-orb bg-orb-2"
                    initial={{ scale: 0, opacity: 0, x: 100, y: 100 }}
                    animate={{ scale: 1, opacity: 0.5, x: 0, y: 0 }}
                    transition={{ duration: 1.5, delay: 0.4 }}
                  />
                  <motion.div 
                    className="bg-orb bg-orb-3"
                    initial={{ scale: 0, opacity: 0, x: 100, y: -100 }}
                    animate={{ scale: 1, opacity: 0.4, x: 0, y: 0 }}
                    transition={{ duration: 1.5, delay: 0.6 }}
                  />
                  <motion.div 
                    className="bg-orb bg-orb-4"
                    initial={{ scale: 0, opacity: 0, x: -100, y: 100 }}
                    animate={{ scale: 1, opacity: 0.5, x: 0, y: 0 }}
                    transition={{ duration: 1.5, delay: 0.8 }}
                  />
                  <motion.div 
                    className="bg-particles"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ duration: 2, delay: 1 }}
                  />
                </div>
                
                {/* Modern code-themed loading animation */}
                <div className="code-loader-container">
                  <motion.div 
                    className="code-loader-logo"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                  >
                    <motion.div
                      className="code-logo-inner"
                      initial={{ rotateY: 0 }}
                      animate={{ rotateY: 360 }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <motion.path 
                          d="M40 20L15 60L40 100" 
                          stroke="url(#grad1)" 
                          strokeWidth="8" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 1.5, delay: 0.2 }}
                        />
                        <motion.path 
                          d="M80 20L105 60L80 100" 
                          stroke="url(#grad2)" 
                          strokeWidth="8" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 1.5, delay: 0.6 }}
                        />
                        <motion.path 
                          d="M65 15L55 105" 
                          stroke="url(#grad3)" 
                          strokeWidth="8" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 1.5, delay: 1 }}
                        />
                        <defs>
                          <linearGradient id="grad1" x1="15" y1="60" x2="40" y2="60" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#3B82F6" />
                            <stop offset="1" stopColor="#8B5CF6" />
                          </linearGradient>
                          <linearGradient id="grad2" x1="80" y1="60" x2="105" y2="60" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#8B5CF6" />
                            <stop offset="1" stopColor="#EC4899" />
                          </linearGradient>
                          <linearGradient id="grad3" x1="60" y1="15" x2="60" y2="105" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#06B6D4" />
                            <stop offset="1" stopColor="#3B82F6" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </motion.div>
                  </motion.div>
                  
                  <motion.div 
                    className="code-loader-text"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.5 }}
                  >
                    <motion.h2 
                      className="text-4xl md:text-5xl font-bold gradient-text mb-2"
                    >
                      Harshit Yadav
                    </motion.h2>
                    
                    {/* Typing animation effect */}
                    <div className="typing-container">
                      <motion.div
                        className="typing-text text-xl md:text-2xl secondary-gradient-text font-medium mb-8"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ 
                          duration: 1.2, 
                          delay: 1.8,
                          ease: "easeInOut"
                        }}
                      >
                        Software Developer & Prompt Engineer
                      </motion.div>
                      <motion.span
                        className="typing-cursor"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                    </div>
                  </motion.div>
                  
                  {/* Loading Progress bar */}
                  <div className="loading-progress-container">
                    <div className="loading-label">
                      Loading portfolio... <span className="loading-percent">{Math.round(loadingProgress)}%</span>
                    </div>
                    <div className="loading-bar-container">
                      <motion.div 
                        className="loading-bar"
                        initial={{ width: "0%" }}
                        animate={{ width: `${loadingProgress}%` }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                  
                  {/* Code lines animation */}
                  <div className="code-lines-container">
                    <motion.div 
                      className="code-line"
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "70%", opacity: 0.6 }}
                      transition={{ duration: 0.7, delay: 1.8 }}
                    />
                    <motion.div 
                      className="code-line"
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "40%", opacity: 0.6 }}
                      transition={{ duration: 0.5, delay: 2.0 }}
                    />
                    <motion.div 
                      className="code-line"
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "60%", opacity: 0.6 }}
                      transition={{ duration: 0.6, delay: 2.2 }}
                    />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <Router />
              </motion.div>
            )}
          </AnimatePresence>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
