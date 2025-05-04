import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ParticleBackground } from "@/components/ui/particle-background";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const activeSection = useScrollSpy([
    "home",
    "about",
    "skills",
    "projects",
    "experience",
    "contact",
  ], 80);
  
  // State to control background visibility based on section
  const [showBackground, setShowBackground] = useState(true);
  const [particleDensity, setParticleDensity] = useState(0.05);
  
  // Update document title based on active section and manage background
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
    
    // Adjust particle density based on device performance
    const adjustForPerformance = () => {
      // Check if mobile
      const isMobile = window.innerWidth <= 768;
      
      // Check if low-end device (rough estimate)
      const isLowEnd = navigator.hardwareConcurrency 
        ? navigator.hardwareConcurrency <= 4 
        : false;
      
      if (isMobile || isLowEnd) {
        setParticleDensity(0.02); // Fewer particles for mobile/low-end devices
      } else {
        setParticleDensity(0.05); // More particles for desktop/high-end devices
      }
    };
    
    adjustForPerformance();
    window.addEventListener('resize', adjustForPerformance);
    
    return () => {
      window.removeEventListener('resize', adjustForPerformance);
    };
  }, [activeSection]);

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Interactive particle background */}
      {showBackground && <ParticleBackground 
        particleDensity={particleDensity}
        connectionDistance={150}
        mouseRepelRadius={100}
        mouseRepelStrength={0.1}
      />}
      
      <Navbar activeSection={activeSection} />
      <AnimatePresence mode="wait">
        <main className="relative z-10">
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
