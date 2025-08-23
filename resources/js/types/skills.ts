import type { Skill } from '@/types/portfolio';

export const skills: Skill[] = [
    // Frontend Technologies
    { name: 'Vue.js', level: 3, category: 'frontend', description: 'Advanced Vue 3 with Composition API and TypeScript' },
    { name: 'React', level: 4, category: 'frontend', description: 'Modern React with hooks and context API' },
    { name: 'TypeScript', level: 4, category: 'frontend', description: 'Strong typing and advanced TypeScript patterns' },
    { name: 'JavaScript', level: 4, category: 'frontend', description: 'ES6+ features and modern JavaScript' },
    { name: 'Tailwind CSS', level: 4, category: 'frontend', description: 'Utility-first CSS framework for rapid development' },
    { name: 'HTML5/CSS3', level: 5, category: 'frontend', description: 'Semantic HTML and modern CSS features' },
    { name: 'Bootstrap', level: 4, category: 'frontend', description: 'Responsive web design framework' },

    // Backend Technologies
    { name: 'Laravel', level: 4, category: 'backend', description: 'PHP framework with Eloquent ORM and advanced features' },
    { name: 'PHP', level: 4, category: 'backend', description: 'Modern PHP 8+ with best practices and design patterns' },
    { name: 'Node.js', level: 3, category: 'backend', description: 'JavaScript runtime for server-side development' },
    { name: 'Python', level: 3, category: 'backend', description: 'Python with Django and Flask frameworks' },
    { name: 'RESTful APIs', level: 3, category: 'backend', description: 'Design and implementation of REST APIs' },
    { name: 'GraphQL', level: 2, category: 'backend', description: 'Query language for APIs and runtime' },

    // Database Technologies
    { name: 'MySQL', level: 5, category: 'database', description: 'Relational database design and optimization' },
    { name: 'PostgreSQL', level: 3, category: 'database', description: 'Advanced SQL features and performance tuning' },
    { name: 'MongoDB', level: 3, category: 'database', description: 'NoSQL document database for scalable applications' },
    { name: 'SQLite', level: 3, category: 'database', description: 'Lightweight database for development and testing' },

    // Development Tools
    { name: 'Git', level: 4, category: 'tools', description: 'Version control and collaborative development' },
    { name: 'Docker', level: 2, category: 'tools', description: 'Containerization and development environments' },
    { name: 'Vite', level: 3, category: 'tools', description: 'Fast build tool and development server' },
    { name: 'VS Code', level: 4, category: 'tools', description: 'Integrated development environment and extensions' },
    { name: 'NPM/Yarn', level: 3, category: 'tools', description: 'Package management and dependency handling' },
    { name: 'Composer', level: 3, category: 'tools', description: 'PHP dependency manager and autoloading' },
];
