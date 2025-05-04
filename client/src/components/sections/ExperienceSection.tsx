import { motion } from "framer-motion";
import { fadeIn } from "@/lib/framer-animations";
import { TimelineItem } from "@/components/ui/timeline-item";

export function ExperienceSection() {
  const experiences = [
    {
      title: "Associate Programmer | RMX Joss",
      period: "July 2024 – Present",
      responsibilities: [
        "Developed Carbon Emissions Tracker (Python, Tkinter, MS SQL, ChatGPT) automating scope 1–2 reporting",
        "Trained in SAP Business One, wrote SQL for operational data analysis",
        "Led data integration: merged weekly reports → single Google Sheet → Power BI dashboard (–70% prep time)",
        "Built Merchant Dashboard in Power BI pulling from SAP DB"
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
    <section id="experience" className="py-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
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
