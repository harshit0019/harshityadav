import { useTheme } from "@/hooks/use-theme";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative h-10 w-10 rounded-full flex items-center justify-center overflow-hidden ${className}`}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      
      {/* Enhanced background with subtle gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/5 dark:from-primary/20 dark:to-primary/5 rounded-full"
        animate={{
          background: theme === "dark" 
            ? "radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.3), rgba(138, 75, 175, 0.1))" 
            : "radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.2), rgba(249, 168, 212, 0.1))"
        }}
        transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
      />
      
      {/* Animated glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0"
        animate={{ 
          boxShadow: theme === "dark" 
            ? "inset 0 0 15px rgba(59, 130, 246, 0.5)" 
            : "inset 0 0 15px rgba(249, 168, 212, 0.5)",
          opacity: [0, 0.5, 0]
        }}
        transition={{ 
          duration: 1.5, 
          ease: "easeInOut", 
          repeat: Infinity, 
          repeatType: "reverse" 
        }}
      />
      
      {/* Icons with improved animation */}
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ 
              duration: 0.5, 
              ease: [0.3, 0.1, 0.3, 1],
              opacity: { duration: 0.2 }
            }}
            className="text-primary relative z-10"
          >
            <Sun className="h-5 w-5 drop-shadow-lg" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
            transition={{ 
              duration: 0.5, 
              ease: [0.3, 0.1, 0.3, 1],
              opacity: { duration: 0.2 }
            }}
            className="text-primary relative z-10"
          >
            <Moon className="h-5 w-5 drop-shadow-lg" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Enhanced border ring */}
      <motion.span 
        className="absolute inset-0 rounded-full ring-2 ring-primary/20 dark:ring-primary/30"
        animate={{ 
          boxShadow: theme === "dark" 
            ? "0 0 10px rgba(59, 130, 246, 0.2)" 
            : "0 0 10px rgba(249, 168, 212, 0.2)" 
        }}
        transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
      />
      
      {/* Click ripple effect */}
      <motion.span
        className="absolute inset-0 rounded-full bg-primary/10"
        initial={{ scale: 0, opacity: 0 }}
        whileTap={{ scale: 4, opacity: 0 }}
        transition={{ duration: 0.5 }}
      />
    </motion.button>
  );
}