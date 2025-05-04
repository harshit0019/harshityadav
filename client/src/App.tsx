import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
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
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="text-center mb-8"
                  >
                    <h3 className="text-3xl md:text-4xl font-bold gradient-text mb-3">Welcome</h3>
                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium">Harshit Yadav's Portfolio</p>
                  </motion.div>
                  <motion.div 
                    className="loader-circle"
                    initial={{ scale: 0.8, opacity: 0.6 }}
                    animate={{ 
                      scale: [0.8, 1.4, 0.8],
                      opacity: [0.6, 1, 0.6],
                      boxShadow: [
                        "0 0 15px 5px rgba(59, 130, 246, 0.4)",
                        "0 0 30px 15px rgba(59, 130, 246, 0.6)",
                        "0 0 15px 5px rgba(59, 130, 246, 0.4)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "loop",
                      times: [0, 0.5, 1]
                    }}
                  />
                  
                  {/* Code brackets animation */}
                  <motion.div 
                    className="mt-10 text-4xl text-primary dark:text-primary font-mono"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    <motion.span
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
                      className="text-primary relative inline-block"
                      whileHover={{ scale: 1.2, color: "#3B82F6" }}
                    >
                      <span className="relative z-10">{"{"}{"}"}</span>
                      <span className="absolute inset-0 opacity-30 blur-sm z-0">{"{"}{"}"}</span>
                    </motion.span>
                    <motion.span
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.7, delay: 1.0, ease: "easeOut" }}
                      className="mx-3 text-gray-600 dark:text-gray-300 text-2xl"
                    >
                      developer
                    </motion.span>
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
  );
}

export default App;
