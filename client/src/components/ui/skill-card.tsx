import { ReactNode } from "react";
import { motion } from "framer-motion";

type Skill = {
  name: string;
  percentage: number;
};

type SkillCardProps = {
  title: string;
  icon: ReactNode;
  skills: Skill[];
};

export function SkillCard({ title, icon, skills }: SkillCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition transform hover:scale-105 hover:shadow-lg h-full">
      <div className="p-6">
        <div className="w-14 h-14 rounded-full primary-gradient flex items-center justify-center mb-6">
          {icon}
        </div>
        <h3 className="text-xl font-poppins font-bold mb-4">{title}</h3>

        <div className="space-y-4">
          {skills.map((skill) => (
            <div key={skill.name}>
              <div className="flex justify-between mb-1">
                <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                <span className="text-gray-600 dark:text-gray-400">{skill.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <motion.div
                  className="primary-gradient h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.percentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  viewport={{ once: true }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
