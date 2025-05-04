export type Project = {
  title: string;
  description: string;
  image: string;
  demoUrl: string;
  githubUrl: string;
  tags: string[];
};

export type Skill = {
  name: string;
  percentage: number;
};

export type SkillCategory = {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
};

export type Experience = {
  title: string;
  period: string;
  responsibilities: string[];
  isPlaceholder?: boolean;
};

export type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
