import { computed } from 'vue';
import { useTranslation } from './useTranslation';

/**
 * Composable for managing portfolio data with translations
 * Provides reactive portfolio content that adapts to language changes
 */
export function usePortfolioData() {
    const { t } = useTranslation();

    // Personal information with translations
    const personalInfo = computed(() => ({
        name: t('personal.name', 'Full Stack Developer'),
        title: t('personal.title', 'Innovative Digital Solutions Creator'),
        bio: t('personal.bio', 'Passionate developer with expertise in modern web technologies, creating efficient and scalable applications.'),
        location: 'Madrid, Spain',
        email: 'contact@portfolio.dev',
        phone: '+34 123 456 789',
        website: 'https://portfolio.dev',
        github: 'https://github.com/developer',
        linkedin: 'https://linkedin.com/in/developer',
        profileImage: '/images/profile.jpg',
    }));

    // Project data with translations
    const projects = computed(() => [
        {
            id: '1',
            title: 'AdoptaFácil',
            description:
                'AdoptaFácil is a complete digital ecosystem designed to revolutionize the pet adoption process in Colombia. The platform combines modern technologies with a focus on animal welfare, creating a comprehensive experience that connects adopters, pet owners, shelters, and business partners in one place.',
            image: './Adoptafacil.jpg',
            technologies: ['Laravel', 'React.js', 'MySQL', 'Typescript', 'Python', 'Tailwind CSS'],
            liveUrl: 'https://adoptafacil.up.railway.app/',
            githubUrl: 'https://github.com/Beto18v/AdoptaFacil.git',
            category: 'Full Stack',
            featured: true,
            date: '2024-01-15',
        },
        {
            id: '2',
            title: 'Vision 4k',
            description:
                'Vision4K is a modern platform for sharing and downloading wallpapers in ultra high definition (4K). It offers a seamless user experience with a focus on high-quality visuals and easy navigation.',
            image: '/api/placeholder/600/400',
            technologies: ['Laravel', 'React.js', 'MySQL', 'Typescript', 'Tailwind CSS'],
            liveUrl: '##',
            githubUrl: 'https://github.com/Beto18v/Vision4k.git',
            category: 'Full Stack',
            featured: true,
            date: '2023-11-20',
        },
    ]);

    // Experience data with translations
    const experience = computed(() => [
        {
            id: 1,
            position: t('experience.senior.title', 'Senior Full Stack Developer'),
            company: 'Tech Solutions Inc.',
            location: 'Madrid, Spain',
            startDate: '2022-01',
            endDate: t('experience.current', 'Current'),
            description: t('experience.senior.description', 'Lead development of enterprise web applications using modern technologies'),
            technologies: ['Vue.js', 'Laravel', 'AWS', 'Docker'],
        },
        {
            id: 2,
            position: t('experience.fullstack.title', 'Full Stack Developer'),
            company: 'Digital Agency Ltd.',
            location: 'Barcelona, Spain',
            startDate: '2020-03',
            endDate: '2021-12',
            description: t('experience.fullstack.description', 'Developed custom web solutions for clients across various industries'),
            technologies: ['React', 'Node.js', 'PostgreSQL', 'MongoDB'],
        },
    ]);

    // Education data with translations
    const education = computed(() => [
        {
            id: 1,
            degree: t('education.computer.degree', 'Computer Science Degree'),
            institution: 'Universidad Politécnica de Madrid',
            location: 'Madrid, Spain',
            startDate: '2016-09',
            endDate: '2020-06',
            description: t('education.computer.description', 'Specialized in software engineering and web technologies'),
        },
    ]);

    // Skills data
    const skills = [
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
        { name: 'NPM', level: 3, category: 'tools', description: 'Package management and dependency handling' },
        { name: 'Composer', level: 3, category: 'tools', description: 'PHP dependency manager and autoloading' },
    ];

    // Achievement stats with translations
    const achievements = computed(() => ({
        projects: {
            value: 50,
            label: t('achievements.projects', 'Projects Completed'),
        },
        clients: {
            value: 25,
            label: t('achievements.clients', 'Happy Clients'),
        },
        technologies: {
            value: 15,
            label: t('achievements.technologies', 'Technologies Mastered'),
        },
        experience: {
            value: 4,
            label: t('achievements.years', 'Years Experience'),
        },
    }));

    return {
        personalInfo,
        projects,
        experience,
        education,
        skills,
        achievements,
        t,
    };
}
