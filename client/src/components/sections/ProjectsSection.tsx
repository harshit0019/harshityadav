import { motion } from "framer-motion";
import { fadeIn } from "@/lib/framer-animations";
import { ProjectCard } from "@/components/ui/project-card";
import { Project } from "@/types";

export function ProjectsSection() {
  const projects: Project[] = [
    {
      title: "Personal Carbon Footprint Calculator",
      description: "An interactive tool that helps users track and reduce their carbon emissions.",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      demoUrl: "https://personal-carbon-emission-calculatorr.streamlit.app/",
      githubUrl: "https://github.com/harshit0019",
      tags: ["Python", "Pandas", "Streamlit"]
    },
    {
      title: "AI-Powered SEO Tag Inspector",
      description: "A tool that uses AI to analyze and optimize website meta tags for better search rankings.",
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      demoUrl: "https://seo-tag-inspector-1.onrender.com/",
      githubUrl: "https://github.com/harshit0019",
      tags: ["React", "Tailwind", "Node.js", "Replit AI"]
    },
    {
      title: "Modern Chair Product Page",
      description: "A sleek and modern e-commerce product page with color selection and 3D preview.",
      image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      demoUrl: "https://harshit0019.github.io/Modern-chair-page/",
      githubUrl: "https://github.com/harshit0019",
      tags: ["React", "Tailwind CSS"]
    },
    {
      title: "Interactive To-Do List",
      description: "A clean and intuitive task management application with drag-and-drop capabilities.",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      demoUrl: "https://harshit0019.github.io/to-do-list/",
      githubUrl: "https://github.com/harshit0019",
      tags: ["React", "Tailwind CSS"]
    }
  ];

  return (
    <section id="projects" className="py-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-3xl md:text-4xl font-poppins font-bold text-center mb-16"
        >
          Featured <span className="gradient-text">Projects</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={fadeIn("up", 0.1 * (index + 1))}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="max-w-sm mx-auto w-full"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
