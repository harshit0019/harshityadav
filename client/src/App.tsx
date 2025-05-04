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

  useEffect(() => {
    // Simulate loading time with a slightly longer duration for a better effect
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
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
                {/* Animated background shapes */}
                <div className="loader-background">
                  <motion.div 
                    className="loader-shape loader-shape-1"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.5 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                  />
                  <motion.div 
                    className="loader-shape loader-shape-2"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.5 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                  <motion.div 
                    className="loader-shape loader-shape-3"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.5 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  />
                  <motion.div 
                    className="loader-shape loader-shape-4"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.5 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  />
                  <motion.div 
                    className="loader-shape loader-shape-5"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.5 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </div>
                
                {/* Loader content */}
                <div className="loader-content">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-center mb-8"
                  >
                    <motion.h2 
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1.05 }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity, 
                        repeatType: "reverse" 
                      }}
                      className="text-4xl md:text-5xl font-bold gradient-text mb-3"
                    >
                      Welcome
                    </motion.h2>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="text-xl md:text-2xl secondary-gradient-text font-semibold"
                    >
                      Harshit Yadav's Portfolio
                    </motion.p>
                  </motion.div>
                  <div className="relative">
                    <motion.div 
                      className="loader-circle"
                      initial={{ scale: 0.8, opacity: 0.8 }}
                      animate={{ 
                        scale: [0.8, 1.2, 0.8],
                        opacity: [0.8, 1, 0.8],
                        rotate: [0, 360]
                      }}
                      transition={{
                        duration: 2,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                    />
                    
                    {/* Extra circular elements for more dynamic loading effect */}
                    <motion.div 
                      className="loader-circle-outer"
                      initial={{ scale: 0.5, opacity: 0.4 }}
                      animate={{ 
                        scale: [0.5, 1.4, 0.5],
                        opacity: [0.4, 0.6, 0.4],
                        rotate: [0, -360]
                      }}
                      transition={{
                        duration: 3,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                    />
                    
                    {/* Inner pulsing dot */}
                    <motion.div 
                      className="loader-circle-inner"
                      initial={{ scale: 0.2, opacity: 0.9 }}
                      animate={{ 
                        scale: [0.2, 0.5, 0.2],
                        opacity: [0.9, 1, 0.9],
                      }}
                      transition={{
                        duration: 1.5,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                    />
                  </div>
                  
                  {/* Enhanced code brackets animation */}
                  <motion.div 
                    className="mt-8 text-4xl text-primary dark:text-primary relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <motion.span
                      initial={{ x: -25, opacity: 0 }}
                      animate={{ x: 0, opacity: [0, 1, 0.8, 1] }}
                      transition={{ 
                        duration: 0.7, 
                        delay: 0.7,
                        opacity: { duration: 1.2, repeat: Infinity, repeatType: "reverse" }
                      }}
                      className="text-secondary"
                    >
                      {"<"}
                    </motion.span>
                    <motion.span
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.9 }}
                      className="mx-1 text-tertiary font-bold text-2xl"
                    >
                      Developer
                    </motion.span>
                    <motion.span
                      initial={{ x: 25, opacity: 0 }}
                      animate={{ x: 0, opacity: [0, 1, 0.8, 1] }}
                      transition={{ 
                        duration: 0.7, 
                        delay: 0.7,
                        opacity: { duration: 1.2, repeat: Infinity, repeatType: "reverse" }
                      }}
                      className="text-secondary"
                    >
                      {"/>"}
                    </motion.span>
                    
                    {/* Cursor blinking effect */}
                    <motion.span
                      className="absolute -bottom-1 right-[-14px] h-6 w-3 bg-primary"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.2 }}
                    />
                  </motion.div>
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
