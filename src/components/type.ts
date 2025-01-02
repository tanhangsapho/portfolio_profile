export interface Project {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  technologies: string[];
  projectUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  highlights?: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: JSX.Element;
}

export interface Skill {
  name: string;
  proficiency: number;
}

export interface SkillsByCategory {
  Frontend: Skill[];
  Backend: Skill[];
  Cloud: Skill[];
  Tools: Skill[];
}

export interface ProjectCardProps {
  project: Project;
}

export interface SkillCardProps {
  category: keyof SkillsByCategory;
  skills: SkillsByCategory;
}

export interface TimelineItem {
  period: string;
  title: string;
  subtitle?: string;
  location: string;
  description?: string;
  highlights?: string[];
  icon: React.ReactNode;
  category: "experience" | "education"; 
}

export interface CategoryProps {
  ref: React.RefObject<HTMLDivElement>;
  isInView: boolean;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Chekromlek Platform",
    description: `"Chekromlek" is a social media platform dedicated to sharing creative projects. It provides a user-friendly interface for artists, designers, and entrepreneurs to showcase their work, connect with others, and inspire a global community of creators.`,
    imageUrl:
      "https://my-image-storage-bucket-1234.s3.us-east-1.amazonaws.com/photo_2024-10-24_14-26-12.jpg",
    technologies: [
      "Nextjs",
      "Express.js",
      "MongoDb",
      "Typescript",
      "Microservices",
    ],
    projectUrl: "https://github.com/chunminglingg/Chekromlek_Monorepo.git",
    githubUrl: "https://github.com/chunminglingg/Chekromlek_Monorepo.git",
    liveUrl: "https://chekromlek.com/",
    highlights: [],
  },
];
