import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

type Skill = {
  name: string;
  percentage: number;
  isCertification?: boolean;
};

type SkillCardProps = {
  title: string;
  icon: ReactNode;
  iconColor?: string;
  skills: Skill[];
};

export function SkillCard({ title, icon, iconColor = "bg-primary", skills }: SkillCardProps) {
  const hasCertifications = skills.some(skill => skill.isCertification);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden h-full">
      <div className="p-5">
        <div className={`w-8 h-8 rounded-full ${iconColor} flex items-center justify-center mb-3`}>
          {icon}
        </div>
        <h3 className="text-sm font-medium mb-4">{title}</h3>

        <div className="space-y-4">
          {skills.map((skill) => (
            <div key={skill.name}>
              {skill.isCertification ? (
                <div className="flex items-start gap-2 text-sm mb-2">
                  <Check className="text-green-500 h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                </div>
              ) : (
                <>
                  <div className="flex justify-between mb-1.5 text-sm">
                    <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                    <span className="text-gray-600 dark:text-gray-400">{skill.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-3">
                    <motion.div
                      className={`${getProgressBarColor(iconColor)} h-1.5 rounded-full`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      viewport={{ once: true }}
                    />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper function to get the appropriate progress bar color based on the icon color
function getProgressBarColor(iconColor: string): string {
  const colorMap: Record<string, string> = {
    'bg-purple-500': 'bg-purple-500',
    'bg-pink-500': 'bg-pink-500',
    'bg-blue-500': 'bg-blue-500',
    'bg-orange-500': 'bg-orange-500',
    'bg-green-500': 'bg-green-500',
    'bg-primary': 'bg-primary'
  };
  
  return colorMap[iconColor] || 'bg-primary';
}
