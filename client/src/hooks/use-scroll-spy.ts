import { useState, useEffect, useCallback } from "react";
import { throttle } from "@/lib/utils";

export function useScrollSpy(sectionIds: string[], offset = 0) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleScroll = useCallback(
    throttle(() => {
      // Find all section elements and their positions
      const sections = sectionIds.map((id) => {
        const element = document.getElementById(id);
        if (!element) return { id, top: 0, bottom: 0 };

        const rect = element.getBoundingClientRect();
        return {
          id,
          top: rect.top + window.scrollY,
          bottom: rect.bottom + window.scrollY,
        };
      });

      // Get current scroll position
      const scrollPosition = window.scrollY + offset;

      // If we're at the top of the page, first section is active
      if (scrollPosition < 100) {
        setActiveSection("home");
        return;
      }

      // Find the section that is currently being viewed
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const nextSection = sections[i + 1];

        // If we've scrolled past the top of this section and not yet to the next section
        if (
          scrollPosition >= section.top &&
          (!nextSection || scrollPosition < nextSection.top)
        ) {
          setActiveSection(section.id);
          return;
        }
      }

      // If nothing found, default to last section
      if (sections.length > 0) {
        setActiveSection(sections[sections.length - 1].id);
      } else {
        setActiveSection(null);
      }
    }, 100),
    [sectionIds, offset]
  );

  useEffect(() => {
    // Add scroll listener
    window.addEventListener("scroll", handleScroll);
    // Run once on mount to set initial active section
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return activeSection;
}
