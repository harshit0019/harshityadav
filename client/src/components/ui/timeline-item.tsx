import { cva } from "class-variance-authority";

type TimelineItemProps = {
  title: string;
  period: string;
  responsibilities: string[];
  isPlaceholder?: boolean;
};

const timelineItemVariants = cva(
  "ml-8 md:ml-12 relative", 
  {
    variants: {
      placeholder: {
        true: "opacity-50",
        false: "opacity-100"
      }
    },
    defaultVariants: {
      placeholder: false
    }
  }
);

export function TimelineItem({ 
  title, 
  period, 
  responsibilities,
  isPlaceholder = false
}: TimelineItemProps) {
  return (
    <div className={timelineItemVariants({ placeholder: isPlaceholder })}>
      <div className="timeline-dot"></div>
      <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md ${isPlaceholder ? 'border-2 border-dashed border-gray-300 dark:border-gray-700' : ''}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <h3 className="text-xl font-poppins font-bold gradient-text">{title}</h3>
          <span className="text-gray-600 dark:text-gray-400 text-sm mt-1 md:mt-0">{period}</span>
        </div>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
          {responsibilities.map((responsibility, index) => (
            <li key={index}>{responsibility}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
