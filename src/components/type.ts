export interface Project {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    imageUrl: string;
    projectUrl: string;
    githubUrl?: string;
  }
  
  export interface Skill {
    name: string;
    level: number;
    category: 'Frontend' | 'Backend' | 'Tools' | 'Cloud';
  }
  
  export interface SocialLink {
    platform: string;
    url: string;
    icon: JSX.Element;
  }