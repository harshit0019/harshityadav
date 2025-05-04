import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import InteractiveBackground from "@/components/ui/interactive-background";


export default function Home() {
  const activeSection = useScrollSpy([
    "home",
    "about",
    "skills",
    "projects",
    "experience",
    "contact",
  ], 80);
  
  // State to determine if we should show the interactive background
  const [showBackground, setShowBackground] = useState(false);

  // Setup intersection observer to disable interactive background when not needed
  useEffect(() => {
    // Enable the background only after a short delay for better performance
    const timer = setTimeout(() => {
      setShowBackground(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Update document title based on active section
  useEffect(() => {
    const sectionTitles: Record<string, string> = {
      home: "Harshit Yadav | Software Developer & Prompt Engineer",
      about: "About | Harshit Yadav",
      skills: "Skills | Harshit Yadav",
      projects: "Projects | Harshit Yadav",
      experience: "Experience | Harshit Yadav",
      contact: "Contact | Harshit Yadav",
    };
    
    document.title = activeSection 
      ? sectionTitles[activeSection] 
      : "Harshit Yadav | Software Developer & Prompt Engineer";
  }, [activeSection]);

  return (
    <div className="min-h-screen flex flex-col">
      {showBackground && <InteractiveBackground />}
      <Navbar activeSection={activeSection} />
      <AnimatePresence mode="wait">
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <ContactSection />
        </main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
