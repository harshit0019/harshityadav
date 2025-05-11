import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";

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
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => setShowContent(true), 700); // 0.7s matches exit duration
    }, 3000); // Show loading screen for 3 seconds
    
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
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1, transition: { duration: 0.7, ease: 'easeInOut' } }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
                className="fixed inset-0 z-[100] bg-background"
                style={{ pointerEvents: 'auto' }}
              >
                <LoadingScreen />
                {/* Burst/Glow overlay */}
                <AnimatePresence>
                  {!loading && (
                    <motion.div
                      key="burst"
                      className="pointer-events-none fixed inset-0 z-[110] flex items-center justify-center"
                      initial={{ opacity: 0.6, scale: 0 }}
                      animate={{ opacity: 0, scale: 6 }}
                      exit={{ opacity: 0, scale: 6 }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                      style={{
                        background: 'radial-gradient(circle, rgba(124,58,237,0.25) 0%, rgba(168,85,247,0.15) 60%, rgba(59,130,246,0.05) 100%)',
                        borderRadius: '50%',
                        width: '100vw',
                        height: '100vh',
                        left: 0,
                        top: 0,
                      }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              showContent && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="w-full"
                >
                  <Router />
                </motion.div>
              )
            )}
          </AnimatePresence>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
