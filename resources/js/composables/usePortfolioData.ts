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
            id: 1,
            title: t('projects.ecommerce.title', 'E-Commerce Platform'),
            description: t('projects.ecommerce.description', 'Modern e-commerce platform with real-time inventory management'),
            technologies: ['Vue.js', 'Laravel', 'MySQL', 'Stripe'],
            image: '/images/projects/ecommerce.jpg',
            liveUrl: 'https://demo-ecommerce.dev',
            githubUrl: 'https://github.com/developer/ecommerce',
            featured: true,
            category: 'web',
        },
        {
            id: 2,
            title: t('projects.taskmanager.title', 'Task Management App'),
            description: t('projects.taskmanager.description', 'Collaborative task management application with real-time updates'),
            technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
            image: '/images/projects/taskmanager.jpg',
            liveUrl: 'https://demo-tasks.dev',
            githubUrl: 'https://github.com/developer/taskmanager',
            featured: true,
            category: 'web',
        },
        {
            id: 3,
            title: t('projects.weather.title', 'Mobile Weather App'),
            description: t('projects.weather.description', 'Cross-platform weather application with location-based forecasts'),
            technologies: ['React Native', 'TypeScript', 'Weather API'],
            image: '/images/projects/weather.jpg',
            liveUrl: 'https://app-store-link',
            githubUrl: 'https://github.com/developer/weather-app',
            featured: false,
            category: 'mobile',
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

    // Skills data (categories translated, but skill names remain in original language for consistency)
    const skillCategories = computed(() => ({
        frontend: {
            name: t('skills.category.frontend', 'Frontend'),
            icon: 'Code2',
            color: '#00D4FF',
        },
        backend: {
            name: t('skills.category.backend', 'Backend'),
            icon: 'Server',
            color: '#00FF88',
        },
        database: {
            name: t('skills.category.database', 'Database'),
            icon: 'Database',
            color: '#FF0080',
        },
        tools: {
            name: t('skills.category.tools', 'Tools'),
            icon: 'Wrench',
            color: '#FFAA00',
        },
    }));

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
        skillCategories,
        achievements,
        t,
    };
}
