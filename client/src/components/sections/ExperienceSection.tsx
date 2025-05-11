import { motion } from "framer-motion";
import { fadeIn } from "@/lib/framer-animations";
import { TimelineItem } from "@/components/ui/timeline-item";

export function ExperienceSection() {
  const experiences = [
    {
      title: "Associate Programmer | RMX Joss",
      period: "July 2024 – Present",
      responsibilities: [
        "Developed and lead a Carbon Emissions Tracker software using Python, Tkinter, MS SQL Server, prompt engineering and AI tools like ChatGPT. Built to automate emission tracking and reporting for Scope 1 and Scope 2 (Scope 3 in progress), supporting sustainability goals and ESG compliance.",
        "Trained in SAP Business One, resolving queries and writing SQL queries using Microsoft SQL Server to extract and analyze operational data.",
        "Led a data integration and automation project: consolidated multiple weekly reports into a single Google Sheet and linked sheets, integrating them into a Power BI dashboard for real-time visualization reducing report preparation time by 70% .",
        "Developed and implemented a Merchant Dashboard in Power BI, integrating order details and BOM data from SAP Business One (MS SQL Server) with interactive visualizations."
      ]
    },
    {
      title: "Your Future Role",
      period: "Coming Soon",
      responsibilities: [
        "Ready to contribute my skills to your next project!"
      ],
      isPlaceholder: true
    }
  ];

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-3xl md:text-4xl font-poppins font-bold text-center mb-16"
        >
          Work <span className="gradient-text">Experience</span>
        </motion.h2>

        <div className="relative max-w-3xl mx-auto">
          <div className="timeline-line"></div>
          
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.title}
              variants={fadeIn("left", 0.1 * (index + 1))}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="mb-12"
            >
              <TimelineItem 
                title={experience.title}
                period={experience.period}
                responsibilities={experience.responsibilities}
                isPlaceholder={experience.isPlaceholder}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
