<script setup lang="ts">
import { useTranslation } from '@/composables/useTranslation';
import { portfolioTranslations } from '@/data/translations';
import type { PortfolioData, SkillCategory } from '@/types/portfolio';
import { Head } from '@inertiajs/vue3';
import { onMounted } from 'vue';

// Import all portfolio components
import AboutSection from '@/components/AboutSection.vue';
import ContactSection from '@/components/ContactSection.vue';
import HeroSection from '@/components/HeroSection.vue';
import Navigation from '@/components/Navigation.vue';
import ProjectsSection from '@/components/ProjectsSection.vue';
import SkillsSection from '@/components/SkillsSection.vue';

/**
 * Portfolio Layout Component
 * Main portfolio page that integrates all sections with smooth scrolling navigation
 * Features responsive design, dark mode support, and multi-language functionality
 */

// Translation system setup
const { loadTranslations, initializeLanguage, t } = useTranslation();

// Portfolio data - customize these values for your personal information
const portfolioData: PortfolioData = {
    // Personal information
    name: 'Tu Nombre', // Replace with your actual name
    profileImage: '', // Add your profile image URL here

    // Hero section customization
    hero: {
        title: '', // Will use translation if empty
        subtitle: '', // Will use translation if empty
    },

    // About section customization
    about: {
        description: '', // Will use translation if empty
        experience: 3,
        projectsCompleted: 25,
        technologiesMastered: 15,
    },

    // Skills data - customize with your actual skills
    skills: [
        // Frontend Technologies
        { name: 'Vue.js', level: 5, category: 'frontend' as SkillCategory, description: 'Advanced Vue 3 with Composition API and TypeScript' },
        { name: 'React', level: 4, category: 'frontend' as SkillCategory, description: 'Modern React with hooks and context API' },
        { name: 'TypeScript', level: 5, category: 'frontend' as SkillCategory, description: 'Strong typing and advanced TypeScript patterns' },
        { name: 'JavaScript', level: 5, category: 'frontend' as SkillCategory, description: 'ES6+ features and modern JavaScript' },
        { name: 'Tailwind CSS', level: 5, category: 'frontend' as SkillCategory, description: 'Utility-first CSS framework for rapid development' },
        { name: 'HTML5/CSS3', level: 5, category: 'frontend' as SkillCategory, description: 'Semantic HTML and modern CSS features' },
        { name: 'Sass/SCSS', level: 4, category: 'frontend' as SkillCategory, description: 'CSS preprocessor with advanced features' },
        { name: 'Bootstrap', level: 4, category: 'frontend' as SkillCategory, description: 'Responsive web design framework' },

        // Backend Technologies
        { name: 'Laravel', level: 5, category: 'backend' as SkillCategory, description: 'PHP framework with Eloquent ORM and advanced features' },
        { name: 'PHP', level: 5, category: 'backend' as SkillCategory, description: 'Modern PHP 8+ with best practices and design patterns' },
        { name: 'Node.js', level: 4, category: 'backend' as SkillCategory, description: 'JavaScript runtime for server-side development' },
        { name: 'Express.js', level: 4, category: 'backend' as SkillCategory, description: 'Fast and minimalist web framework for Node.js' },
        { name: 'Python', level: 3, category: 'backend' as SkillCategory, description: 'Python with Django and Flask frameworks' },
        { name: 'RESTful APIs', level: 5, category: 'backend' as SkillCategory, description: 'Design and implementation of REST APIs' },
        { name: 'GraphQL', level: 3, category: 'backend' as SkillCategory, description: 'Query language for APIs and runtime' },

        // Database Technologies
        { name: 'MySQL', level: 5, category: 'database' as SkillCategory, description: 'Relational database design and optimization' },
        { name: 'PostgreSQL', level: 4, category: 'database' as SkillCategory, description: 'Advanced SQL features and performance tuning' },
        { name: 'MongoDB', level: 3, category: 'database' as SkillCategory, description: 'NoSQL document database for scalable applications' },
        { name: 'Redis', level: 3, category: 'database' as SkillCategory, description: 'In-memory data structure store for caching' },
        { name: 'SQLite', level: 4, category: 'database' as SkillCategory, description: 'Lightweight database for development and testing' },

        // Development Tools
        { name: 'Git', level: 5, category: 'tools' as SkillCategory, description: 'Version control and collaborative development' },
        { name: 'Docker', level: 4, category: 'tools' as SkillCategory, description: 'Containerization and development environments' },
        { name: 'Vite', level: 5, category: 'tools' as SkillCategory, description: 'Fast build tool and development server' },
        { name: 'Webpack', level: 3, category: 'tools' as SkillCategory, description: 'Module bundler and build optimization' },
        { name: 'VS Code', level: 5, category: 'tools' as SkillCategory, description: 'Integrated development environment and extensions' },
        { name: 'NPM/Yarn', level: 5, category: 'tools' as SkillCategory, description: 'Package management and dependency handling' },
        { name: 'Composer', level: 5, category: 'tools' as SkillCategory, description: 'PHP dependency manager and autoloading' },
        { name: 'AWS', level: 3, category: 'tools' as SkillCategory, description: 'Cloud services and deployment platforms' },
    ],

    // Projects data - replace with your actual projects
    projects: [
        {
            id: '1',
            title: 'E-Commerce Platform',
            description:
                'Plataforma completa de comercio electrónico con Laravel backend, Vue.js frontend, procesamiento de pagos integrado y panel de administración.',
            image: '/api/placeholder/600/400', // Replace with actual project image
            technologies: ['Laravel', 'Vue.js', 'MySQL', 'Stripe', 'Tailwind CSS', 'Redis'],
            liveUrl: 'https://tu-proyecto.com', // Replace with actual URL
            githubUrl: 'https://github.com/tu-usuario/ecommerce', // Replace with actual GitHub URL
            category: 'Full Stack',
            featured: true,
            date: '2024-01-15',
        },
        {
            id: '2',
            title: 'Task Management App',
            description:
                'Aplicación colaborativa de gestión de tareas con actualizaciones en tiempo real, características de colaboración en equipo y notificaciones.',
            image: '/api/placeholder/600/400', // Replace with actual project image
            technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'TypeScript', 'Express'],
            liveUrl: 'https://tu-app-tareas.com', // Replace with actual URL
            githubUrl: 'https://github.com/tu-usuario/task-manager', // Replace with actual GitHub URL
            category: 'Web App',
            featured: true,
            date: '2023-11-20',
        },
        {
            id: '3',
            title: 'Weather Dashboard',
            description:
                'Aplicación moderna del clima con interfaz hermosa, pronósticos basados en ubicación, gráficos interactivos y múltiples ciudades.',
            image: '/api/placeholder/600/400', // Replace with actual project image
            technologies: ['Vue.js', 'Chart.js', 'OpenWeather API', 'CSS3', 'Geolocation API'],
            liveUrl: 'https://tu-clima-app.com', // Replace with actual URL
            githubUrl: 'https://github.com/tu-usuario/weather-app', // Replace with actual GitHub URL
            category: 'Frontend',
            featured: false,
            date: '2023-08-10',
        },
        {
            id: '4',
            title: 'Portfolio Personal',
            description: 'Sitio web de portfolio personal construido con tecnologías modernas, diseño responsivo y optimizado para rendimiento.',
            image: '/api/placeholder/600/400', // Replace with actual project image
            technologies: ['Vue.js', 'Tailwind CSS', 'Vite', 'TypeScript', 'Inertia.js'],
            liveUrl: 'https://tu-portfolio.com', // Replace with actual URL
            githubUrl: 'https://github.com/tu-usuario/portfolio', // Replace with actual GitHub URL
            category: 'Frontend',
            featured: true,
            date: '2023-12-05',
        },
        {
            id: '5',
            title: 'Blog CMS',
            description:
                'Sistema de gestión de contenido para blog con editor WYSIWYG, categorías, etiquetas, comentarios y panel de administración.',
            image: '/api/placeholder/600/400', // Replace with actual project image
            technologies: ['Laravel', 'Vue.js', 'TinyMCE', 'MySQL', 'Bootstrap'],
            liveUrl: 'https://tu-blog.com', // Replace with actual URL
            githubUrl: 'https://github.com/tu-usuario/blog-cms', // Replace with actual GitHub URL
            category: 'Full Stack',
            featured: false,
            date: '2023-06-15',
        },
        {
            id: '6',
            title: 'Real Estate Platform',
            description: 'Plataforma inmobiliaria con búsqueda avanzada, mapas interactivos, calculadora de hipotecas y sistema de citas.',
            image: '/api/placeholder/600/400', // Replace with actual project image
            technologies: ['React', 'Laravel', 'Google Maps API', 'PostgreSQL', 'Material-UI'],
            liveUrl: 'https://tu-inmobiliaria.com', // Replace with actual URL
            githubUrl: 'https://github.com/tu-usuario/real-estate', // Replace with actual GitHub URL
            category: 'Full Stack',
            featured: true,
            date: '2023-03-22',
        },
    ],
};

// Initialize translation system on component mount
onMounted(() => {
    loadTranslations(portfolioTranslations);
    initializeLanguage();
});
</script>

<template>
    <!-- Page head with SEO meta tags -->
    <Head>
        <title>{{ portfolioData.name }} - Portfolio</title>
        <meta name="description" content="Portfolio profesional de desarrollo full-stack, proyectos y habilidades técnicas" />
        <meta name="keywords" content="desarrollador, full-stack, vue.js, laravel, portfolio, programador" />
        <meta name="author" :content="portfolioData.name" />

        <!-- Open Graph meta tags for social sharing -->
        <meta property="og:title" :content="`${portfolioData.name} - Portfolio`" />
        <meta property="og:description" content="Portfolio profesional de desarrollo full-stack" />
        <meta property="og:type" content="website" />
        <meta property="og:image" :content="portfolioData.profileImage || '/images/portfolio-preview.jpg'" />

        <!-- Twitter Card meta tags -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" :content="`${portfolioData.name} - Portfolio`" />
        <meta name="twitter:description" content="Portfolio profesional de desarrollo full-stack" />

        <!-- Favicon and theme -->
        <meta name="theme-color" content="#3B82F6" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    </Head>

    <!-- Main portfolio layout -->
    <div class="min-h-screen bg-white transition-colors duration-300 dark:bg-gray-900">
        <!-- Navigation component -->
        <Navigation />

        <!-- Main content sections -->
        <main class="relative">
            <!-- Hero Section -->
            <HeroSection :name="portfolioData.name" :title="portfolioData.hero.title" :subtitle="portfolioData.hero.subtitle" />

            <!-- About Section -->
            <AboutSection
                :description="portfolioData.about.description"
                :image="portfolioData.profileImage"
                :experience="portfolioData.about.experience"
                :projects-completed="portfolioData.about.projectsCompleted"
                :technologies-mastered="portfolioData.about.technologiesMastered"
            />

            <!-- Skills Section -->
            <SkillsSection :skills="portfolioData.skills" />

            <!-- Projects Section -->
            <ProjectsSection :projects="portfolioData.projects" />

            <!-- Contact Section -->
            <ContactSection />
        </main>

        <!-- Footer -->
        <footer class="bg-gray-900 py-8 text-white dark:bg-black">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="text-center">
                    <p class="text-gray-400">
                        © {{ new Date().getFullYear() }} {{ portfolioData.name }}.
                        {{ t('footer.rights', 'All rights reserved.') }}
                    </p>
                    <p class="mt-2 text-sm text-gray-500">
                        {{ t('footer.built', 'Built with Vue.js, Laravel, and Tailwind CSS') }}
                    </p>
                </div>
            </div>
        </footer>
    </div>
</template>

<style scoped>
/* Global styles for smooth scrolling and transitions */
* {
    scroll-behavior: smooth;
}

/* Ensure proper spacing for fixed navigation */
main {
    padding-top: 0;
}

/* Dark mode transitions */
.dark {
    color-scheme: dark;
}

/* Custom scrollbar styling */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: #f1f5f9;
}

.dark ::-webkit-scrollbar-track {
    background: #1e293b;
}

::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
}

.dark ::-webkit-scrollbar-thumb {
    background: #475569;
}

::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
}

.dark ::-webkit-scrollbar-thumb:hover {
    background: #64748b;
}
</style>
