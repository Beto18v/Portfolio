import { computed } from 'vue';
import { translationInstance } from './translationInstance';

/**
 * Composable for managing portfolio data with translations
 * Provides reactive portfolio content that adapts to language changes
 */
export function usePortfolioData() {
    const { t } = translationInstance;

    // Personal information centralizada y traducible
    const personalInfo = computed(() => ({
        name: t('personal.name', 'Nicolas Valenzuela'),
        title: t('personal.title', 'Full Stack Developer'),
        bio: t(
            'personal.bio',
            'Innovative Digital Solutions Creator. Passionate developer with expertise in modern web technologies, creating efficient and scalable applications.',
        ),
        location: t('personal.location', 'Madrid, Spain'),
        email: t('personal.email', 'contact@portfolio.dev'),
        phone: t('personal.phone', '+57 310 207 9572'),
        website: t('personal.website', 'https://portfolio.dev'),
        github: t('personal.github', 'https://github.com/beto18v'),
        linkedin: t('personal.linkedin', 'https://linkedin.com/in/beto18v'),
        profileImage: t('personal.profileImage', '/Foto.png'),
    }));

    // Textos de módulos centralizados
    const moduleTexts = {
        personal: {
            title: t('modules.personal.title', 'PERSONAL DATA CORE'),
            description: t('modules.personal.description', 'Central command with developer information and statistics'),
        },
        skills: {
            title: t('modules.skills.title', 'SKILLS MATRIX'),
            description: t('modules.skills.description', 'Technical expertise and competency systems'),
        },
        projects: {
            title: t('modules.projects.title', 'PROJECT ARSENAL'),
            description: t('modules.projects.description', 'Deployed applications and development missions'),
        },
        contact: {
            title: t('modules.contact.title', 'COMMUNICATION HUB'),
            description: t('modules.contact.description', 'Establish contact and collaboration protocols'),
        },
    };

    // Textos de secciones y labels centralizados
    const sectionTexts = {
        nav: {
            home: t('nav.home', 'Home'),
            about: t('nav.about', 'About'),
            skills: t('nav.skills', 'Skills'),
            projects: t('nav.projects', 'Projects'),
            contact: t('nav.contact', 'Contact'),
        },
        about: {
            sectionTitle: t('about.sectionTitle', 'About Me'),
            sectionDescription: t(
                'about.sectionDescription',
                'Learn more about my background, experience, and what drives my passion for development.',
            ),
            subtitle: t('about.subtitle', "Hello, I'm a Developer"),
            experience: t(
                'about.experience',
                'With over 1 year of experience in web development, I specialize in creating modern, responsive, and user-friendly applications. I enjoy working with both frontend and backend technologies to deliver complete solutions.',
            ),
            approach: t(
                'about.approach',
                'My approach combines technical expertise with creative problem-solving to build applications that not only function well but also provide excellent user experiences.',
            ),
            stats: {
                years: t('about.stats.years', '1+'),
                yearsLabel: t('about.stats.yearsLabel', 'Years Experience'),
                projects: t('about.stats.projects', '2+'),
                projectsLabel: t('about.stats.projectsLabel', 'Projects Completed'),
            },
        },
        skills: {
            sectionTitle: t('skills.sectionTitle', 'Skills & Expertise'),
            sectionDescription: t('skills.sectionDescription', 'Technologies and tools I use to bring ideas to life.'),
        },
        projects: {
            sectionTitle: t('projects.sectionTitle', 'Featured Projects'),
            sectionDescription: t('projects.sectionDescription', 'A selection of projects that showcase my skills and experience.'),
        },
        contact: {
            sectionTitle: t('contact.sectionTitle', 'Get In Touch'),
            sectionDescription: t('contact.sectionDescription', "Ready to start a project or just want to chat? I'd love to hear from you."),
            form: {
                name: t('contact.form.name', 'Name'),
                email: t('contact.form.email', 'Email'),
                message: t('contact.form.message', 'Message'),
                send: t('contact.form.send', 'Send Message'),
            },
            infoTitle: t('contact.infoTitle', 'Contact Information'),
            responseBox: {
                title: t('contact.responseBox.title', 'Response Time'),
                description: t(
                    'contact.responseBox.description',
                    'I typically respond to messages within 24 hours. For urgent matters, please mention it in your message.',
                ),
            },
        },
        footer: {
            copyright: t('footer.copyright', '© 2025 Portfolio. Built with Vue.js and Tailwind CSS.'),
        },
        ui: {
            skillsMatrixHeader: t('ui.skillsMatrixHeader', 'SKILLS MATRIX'),
            skillsMatrixSubtitle: t('ui.skillsMatrixSubtitle', '{count} technologies loaded'),
            skillsMatrixModalProficiency: t('ui.skillsMatrixModalProficiency', 'Proficiency'),
            skillsMatrixModalClose: t('ui.skillsMatrixModalClose', 'Close Matrix'),
            quantumProfile: {
                name: t('ui.quantumProfile.name', 'Nicolas A. Valenzuela'),
                title: t('ui.quantumProfile.title', 'Full Stack Developer'),
                location: t('ui.quantumProfile.location', 'Bogota, Colombia'),
                availability: t('ui.quantumProfile.availability', 'Available'),
                passion: t('ui.quantumProfile.passion', 'Creating digital experiences'),
                currentFocus: t('ui.quantumProfile.currentFocus', 'Modern web technologies'),
            },
            quantumProjectsHeader: t('ui.quantumProjectsHeader', 'Projects Portfolio'),
            quantumProjectsStatusOnline: t('ui.quantumProjectsStatusOnline', 'All Systems Online'),
            quantumProjectsStatusActive: t('ui.quantumProjectsStatusActive', 'Portfolio Active'),
            contactSuccess: t('ui.contactSuccess', 'Message sent successfully!'),
            contactError: t('ui.contactError', 'There was an error sending your message.'),
            contactLoading: t('ui.contactLoading', 'Sending...'),
        },
    };

    // Nombres de categorías de skills
    const skillCategoryNames = {
        frontend: t('skills.category.frontend', 'Frontend'),
        backend: t('skills.category.backend', 'Backend'),
        database: t('skills.category.database', 'Database'),
        tools: t('skills.category.tools', 'Tools'),
    };

    // Iconos de categorías de skills (para uso dinámico en componentes)
    const skillCategoryIcons = {
        frontend: 'Monitor',
        backend: 'Server',
        database: 'Database',
        tools: 'Zap',
    };

    // Información de contacto centralizada
    const contactInfo = computed(() => ({
        email: personalInfo.value.email,
        github: personalInfo.value.github,
        linkedin: personalInfo.value.linkedin,
        phone: personalInfo.value.phone,
        location: personalInfo.value.location,
        website: personalInfo.value.website,
    }));

    // Projects data
    const projects = computed(() => {
        return [
            {
                id: '1',
                title: t('projects.adoptafacil.title', 'AdoptaFácil'),
                description: t(
                    'projects.adoptafacil.description',
                    'AdoptaFácil is a complete digital ecosystem designed to revolutionize the pet adoption process in Colombia. The platform combines modern technologies with a focus on animal welfare, creating a comprehensive experience that connects adopters, pet owners, shelters, and business partners in one place.',
                ),
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
                title: t('projects.vision4k.title', 'Vision 4k'),
                description: t(
                    'projects.vision4k.description',
                    'Vision4K is a modern platform for sharing and downloading wallpapers in ultra high definition (4K). It offers a seamless user experience with a focus on high-quality visuals and easy navigation.',
                ),
                image: '/Vision4k.jpg',
                technologies: ['Laravel', 'React.js', 'MySQL', 'Typescript', 'Tailwind CSS'],
                liveUrl: '##',
                githubUrl: 'https://github.com/Beto18v/Vision4k.git',
                category: 'Full Stack',
                featured: true,
                date: '2023-11-20',
            },
            {
                id: '3',
                title: t('projects.portfolio.title', 'Portfolio'),
                description: t(
                    'projects.portfolio.description',
                    'This is a modern, elegant, and professional portfolio built with cutting-edge technologies. The site is fully modularized into reusable components and features support for multiple languages (Spanish, English, and Mandarin).',
                ),
                image: './Portfolio.jpg',
                technologies: ['Laravel', 'Vue', 'SQLite', 'Typescript', 'Tailwind CSS'],
                liveUrl: '####',
                githubUrl: 'https://github.com/Beto18v/Portfolio.git',
                category: 'Frontend',
                featured: true,
                date: '2024-01-15',
            },
        ];
    });

    // Education data
    const education = computed(() => [
        {
            id: 1,
            degree: t('education.computer.degree', 'Computer Science Degree'),
            institution: 'Servicio Nacional de Aprendizaje - SENA',
            location: 'Bogotá, Colombia',
            startDate: '2024-06',
            endDate: '2026-06',
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

    return {
        personalInfo,
        projects,
        education,
        skills,
        skillCategoryNames,
        skillCategoryIcons,
        moduleTexts,
        contactInfo,
        sectionTexts,
        t,
    };
}
