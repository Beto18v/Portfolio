// Portfolio-specific types and interfaces
export type SkillCategory = 'frontend' | 'backend' | 'database' | 'tools';

export interface Skill {
    name: string;
    level: number;
    icon?: string;
    description?: string;
    category: SkillCategory;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    liveUrl?: string;
    githubUrl?: string;
    category: string;
    featured?: boolean;
    date: string;
}

export interface PortfolioData {
    name: string;
    profileImage?: string;
    hero: {
        title?: string;
        subtitle?: string;
    };
    about: {
        description?: string;
        experience: number;
        projectsCompleted: number;
        technologiesMastered: number;
    };
    skills: Skill[];
    projects: Project[];
}
