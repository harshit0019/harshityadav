import { motion } from "framer-motion";
import { fadeIn } from "@/lib/framer-animations";
import { SkillCard } from "@/components/ui/skill-card";
import { 
  Code, 
  Layout, 
  BarChart3, 
  Bot, 
  Leaf, 
  Award
} from "lucide-react";

export function SkillsSection() {
  const skills = [
    {
      title: "Programming & Database",
      icon: <Code className="text-white text-lg" />,
      iconColor: "bg-purple-500",
      skills: [
        { name: "Python", percentage: 85 },
        { name: "SQL (PostgreSQL, MSSQL)", percentage: 80 }
      ]
    },
    {
      title: "Front-End Development",
      icon: <Layout className="text-white text-lg" />,
      iconColor: "bg-pink-500",
      skills: [
        { name: "HTML & CSS", percentage: 75 },
        { name: "Tailwind CSS", percentage: 70 },
        { name: "Streamlit", percentage: 80 }
      ]
    },
    {
      title: "Data Analysis & Visualization",
      icon: <BarChart3 className="text-white text-lg" />,
      iconColor: "bg-blue-500",
      skills: [
        { name: "Power BI", percentage: 90 },
        { name: "Excel & Google Sheets", percentage: 85 }
      ]
    },
    {
      title: "AI Tools and Automation",
      icon: <Bot className="text-white text-lg" />,
      iconColor: "bg-orange-500",
      skills: [
        { name: "Prompt Engineering", percentage: 85 },
        { name: "ChatGPT, Replit AI, Cursor AI", percentage: 80 }
      ]
    },
    {
      title: "Sustainability",
      icon: <Leaf className="text-white text-lg" />,
      iconColor: "bg-green-500",
      skills: [
        { name: "Carbon Footprint Tracking", percentage: 90 },
        { name: "Scope 1, 2, 3 Emissions Analysis", percentage: 85 }
      ]
    },
    {
      title: "Certifications",
      icon: <Award className="text-white text-lg" />,
      iconColor: "bg-purple-500",
      skills: [
        { name: "PostgreSQL and MySQL course from Udemy", percentage: 100, isCertification: true },
        { name: "Microsoft Excel - Excel from Beginner to Advance from Udemy", percentage: 100, isCertification: true },
        { name: "Programming with Python from Internshala Trainings", percentage: 100, isCertification: true }, 
        { name: "Web Development from Internshala Trainings", percentage: 100, isCertification: true }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-3xl md:text-4xl font-poppins font-bold text-center mb-16"
        >
          My <span className="gradient-text">Skills</span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              variants={fadeIn("up", 0.1 * (index + 1))}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
            >
              <SkillCard 
                title={skill.title} 
                icon={skill.icon}
                iconColor={skill.iconColor}
                skills={skill.skills} 
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
