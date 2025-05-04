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
      icon: <Code className="text-white text-2xl" />,
      skills: [
        { name: "Python", percentage: 90 },
        { name: "SQL (PostgreSQL, MSSQL)", percentage: 85 }
      ]
    },
    {
      title: "Front-End",
      icon: <Layout className="text-white text-2xl" />,
      skills: [
        { name: "HTML & CSS", percentage: 92 },
        { name: "Tailwind CSS", percentage: 88 },
        { name: "Streamlit", percentage: 85 }
      ]
    },
    {
      title: "Data Analysis",
      icon: <BarChart3 className="text-white text-2xl" />,
      skills: [
        { name: "Power BI", percentage: 90 },
        { name: "Excel", percentage: 95 },
        { name: "Google Sheets", percentage: 92 }
      ]
    },
    {
      title: "AI Tools & Automation",
      icon: <Bot className="text-white text-2xl" />,
      skills: [
        { name: "Prompt Engineering", percentage: 88 },
        { name: "ChatGPT", percentage: 95 },
        { name: "Replit AI & Cursor AI", percentage: 85 }
      ]
    },
    {
      title: "Sustainability",
      icon: <Leaf className="text-white text-2xl" />,
      skills: [
        { name: "Carbon Footprint Tracking", percentage: 90 },
        { name: "Emission Analysis", percentage: 85 }
      ]
    },
    {
      title: "Certifications",
      icon: <Award className="text-white text-2xl" />,
      skills: [
        { name: "Udemy Courses", percentage: 100 },
        { name: "Internshala Courses", percentage: 100 }
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
                skills={skill.skills} 
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
