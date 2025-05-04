import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import { ExternalLink, Github } from "lucide-react";
import { Project } from "@/types";

type ProjectCardProps = {
  project: Project;
};

const defaultTiltOptions = {
  reverse: false,
  max: 10,
  perspective: 1000,
  scale: 1.02,
  speed: 1000,
  transition: true,
  axis: null,
  reset: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Tilt options={defaultTiltOptions} className="h-full">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition transform hover:shadow-lg h-full flex flex-col">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={project.image}
            alt={`${project.title} Screenshot`}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end">
            <div className="p-6 w-full">
              <h3 className="text-white text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-200 text-sm mb-4">{project.description}</p>
              <div className="flex gap-2">
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-gray-900 px-3 py-1 rounded text-xs font-medium hover:bg-opacity-90 transition"
                >
                  Live Demo
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-transparent border border-white text-white px-3 py-1 rounded text-xs font-medium hover:bg-white hover:bg-opacity-10 transition"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-poppins font-bold mb-2 gradient-text">
            {project.title}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex gap-4 mt-auto">
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary dark:text-primary hover:underline flex items-center gap-1"
            >
              <ExternalLink className="h-4 w-4" /> View Demo
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:underline flex items-center gap-1"
            >
              <Github className="h-4 w-4" /> Source Code
            </a>
          </div>
        </div>
      </div>
    </Tilt>
  );
}
