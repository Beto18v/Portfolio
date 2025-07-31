<script setup lang="ts">
import { useTranslation } from '@/composables/useTranslation';
import { portfolioTranslations } from '@/data/translations';
import type { PortfolioData, SkillCategory } from '@/types/portfolio';
import { Head } from '@inertiajs/vue3';
import { computed, onMounted, ref } from 'vue';

// Import revolutionary components
import ClassicPortfolio from '@/components/ClassicPortfolio.vue';
import ContactSection from '@/components/ContactSection.vue';
import HoloTerminal from '@/components/HoloTerminal.vue';
import HolographicSkills from '@/components/HolographicSkills.vue';
import QuantumProfile from '@/components/QuantumProfile.vue';
import SpaceModulesStatic from '@/components/SpaceModulesStatic.vue';

// Import traditional components for fallback
import Navigation from '@/components/Navigation.vue';

/**
 * Revolutionary Portfolio Layout
 * Multi-dimensional immersive experience with terminal interface,
 * holographic skills, and space-based project navigation
 */

// Translation system setup
const { loadTranslations, initializeLanguage, t } = useTranslation();

// Interface modes
const interfaceMode = ref<'holo' | 'space' | 'traditional'>('holo');
const currentSection = ref<'terminal' | 'profile' | 'skills' | 'projects' | 'contact'>('terminal');
const isTransitioning = ref(false);

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

// Interface switching animations
const switchInterface = (mode: 'holo' | 'space' | 'traditional') => {
    isTransitioning.value = true;
    setTimeout(() => {
        interfaceMode.value = mode;
        isTransitioning.value = false;
    }, 500);
};

// Section switching for holographic interface
const switchSection = (section: typeof currentSection.value) => {
    currentSection.value = section;
};

// Listen for application launch events from terminal
onMounted(() => {
    loadTranslations(portfolioTranslations);
    initializeLanguage();

    // Listen for app launch events from HoloTerminal
    window.addEventListener('portfolio-app-launch', (event: any) => {
        const { appId } = event.detail;

        switch (appId) {
            case 'profile':
                switchInterface('traditional');
                setTimeout(() => switchSection('profile'), 600);
                break;
            case 'skills':
                switchInterface('holo');
                setTimeout(() => switchSection('skills'), 600);
                break;
            case 'projects':
                switchInterface('space');
                setTimeout(() => switchSection('projects'), 600);
                break;
            case 'contact':
                switchInterface('traditional');
                setTimeout(() => switchSection('contact'), 600);
                break;
        }
    });
});

// Computed interface classes
const interfaceClasses = computed(() => ({
    'interface-holo': interfaceMode.value === 'holo',
    'interface-space': interfaceMode.value === 'space',
    'interface-traditional': interfaceMode.value === 'traditional',
    'is-transitioning': isTransitioning.value,
}));
</script>

<template>
    <!-- Page head with SEO meta tags -->
    <Head>
        <title>{{ portfolioData.name }} - Revolutionary Portfolio</title>
        <meta name="description" content="Immersive portfolio experience with holographic interface and 3D navigation" />
        <meta name="keywords" content="portfolio, developer, holographic, 3D, futuristic, immersive" />
        <meta name="author" :content="portfolioData.name" />

        <!-- Open Graph meta tags for social sharing -->
        <meta property="og:title" :content="`${portfolioData.name} - Revolutionary Portfolio`" />
        <meta property="og:description" content="Experience the future of portfolio presentation" />
        <meta property="og:type" content="website" />
        <meta property="og:image" :content="portfolioData.profileImage || '/images/portfolio-preview.jpg'" />

        <!-- Twitter Card meta tags -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" :content="`${portfolioData.name} - Revolutionary Portfolio`" />
        <meta name="twitter:description" content="Experience the future of portfolio presentation" />

        <!-- Favicon and theme -->
        <meta name="theme-color" content="#00D4FF" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    </Head>

    <!-- Main revolutionary interface -->
    <div class="revolutionary-portfolio" :class="interfaceClasses">
        <!-- Interface mode selector -->
        <div class="fixed top-4 left-4 z-50">
            <div class="interface-selector rounded-xl border border-cyan-400/30 bg-black/50 p-2 backdrop-blur-sm">
                <div class="mb-2 px-2 text-xs text-cyan-400">Interface Mode:</div>
                <div class="flex gap-1">
                    <button
                        @click="switchInterface('holo')"
                        class="rounded px-3 py-1 text-xs transition-all"
                        :class="interfaceMode === 'holo' ? 'bg-cyan-400 text-black' : 'text-cyan-400 hover:bg-cyan-400/20'"
                    >
                        HOLO
                    </button>
                    <button
                        @click="switchInterface('space')"
                        class="rounded px-3 py-1 text-xs transition-all"
                        :class="interfaceMode === 'space' ? 'bg-purple-400 text-black' : 'text-purple-400 hover:bg-purple-400/20'"
                    >
                        SPACE
                    </button>
                    <button
                        @click="switchInterface('traditional')"
                        class="rounded px-3 py-1 text-xs transition-all"
                        :class="interfaceMode === 'traditional' ? 'bg-gray-400 text-black' : 'text-gray-400 hover:bg-gray-400/20'"
                    >
                        CLASSIC
                    </button>
                </div>
            </div>
        </div>

        <!-- Transition overlay -->
        <Transition name="interface-transition">
            <div v-if="isTransitioning" class="fixed inset-0 z-40 flex items-center justify-center bg-black">
                <div class="text-center text-cyan-400">
                    <div class="mb-4 text-2xl font-bold">INTERFACE SWITCHING</div>
                    <div class="flex items-center justify-center gap-2">
                        <div class="h-2 w-2 animate-pulse rounded-full bg-cyan-400"></div>
                        <div class="h-2 w-2 animate-pulse rounded-full bg-cyan-400" style="animation-delay: 0.2s"></div>
                        <div class="h-2 w-2 animate-pulse rounded-full bg-cyan-400" style="animation-delay: 0.4s"></div>
                    </div>
                </div>
            </div>
        </Transition>

        <!-- HOLOGRAPHIC INTERFACE MODE -->
        <div v-if="interfaceMode === 'holo'" class="holo-interface">
            <!-- Terminal Interface -->
            <div v-if="currentSection === 'terminal'">
                <HoloTerminal />
            </div>

            <!-- Holographic Skills -->
            <div v-else-if="currentSection === 'skills'">
                <HolographicSkills :skills="portfolioData.skills" />
            </div>

            <!-- Traditional sections in holo mode -->
            <div v-else class="traditional-in-holo min-h-screen bg-black">
                <!-- Navigation for holo mode -->
                <Navigation />

                <!-- Traditional components with holographic styling -->
                <div class="holo-wrapper">
                    <QuantumProfile
                        v-if="currentSection === 'profile'"
                        :description="portfolioData.about.description"
                        :image="portfolioData.profileImage"
                        :experience="portfolioData.about.experience"
                        :projects-completed="portfolioData.about.projectsCompleted"
                        :technologies-mastered="portfolioData.about.technologiesMastered"
                    />

                    <ContactSection v-else-if="currentSection === 'contact'" />
                </div>
            </div>
        </div>

        <!-- SPACE INTERFACE MODE -->
        <div v-else-if="interfaceMode === 'space'" class="space-interface">
            <SpaceModulesStatic :projects="portfolioData.projects" :skills="portfolioData.skills" :profile-data="portfolioData" />
        </div>

        <!-- TRADITIONAL INTERFACE MODE -->
        <div v-else class="traditional-interface">
            <ClassicPortfolio :projects="portfolioData.projects" :skills="portfolioData.skills" :profile-data="portfolioData" />
        </div>

        <!-- Quick section switcher for holo mode - Bottom Left -->
        <div v-if="interfaceMode === 'holo'" class="quantum-menu fixed bottom-6 left-6 z-50">
            <div class="section-selector rounded-2xl border border-cyan-400/40 bg-black/70 p-3 shadow-lg shadow-cyan-400/20 backdrop-blur-lg">
                <div class="mb-3 px-2 font-mono text-xs tracking-wider text-cyan-400"><span class="animate-pulse">●</span> QUANTUM ACCESS</div>
                <div class="flex flex-col gap-2">
                    <button
                        @click="switchSection('terminal')"
                        class="group relative overflow-hidden rounded-lg px-4 py-2 text-left font-mono text-sm transition-all"
                        :class="
                            currentSection === 'terminal'
                                ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-400/30'
                                : 'text-cyan-400 hover:scale-105 hover:bg-cyan-400/20'
                        "
                    >
                        <span class="relative z-10">⚡ Terminal</span>
                        <div
                            class="absolute inset-0 -translate-x-full bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 transition-transform duration-500 group-hover:translate-x-full"
                        ></div>
                    </button>
                    <button
                        @click="switchSection('skills')"
                        class="group relative overflow-hidden rounded-lg px-4 py-2 text-left font-mono text-sm transition-all"
                        :class="
                            currentSection === 'skills'
                                ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-400/30'
                                : 'text-cyan-400 hover:scale-105 hover:bg-cyan-400/20'
                        "
                    >
                        <span class="relative z-10">🔮 Skills Matrix</span>
                        <div
                            class="absolute inset-0 -translate-x-full bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 transition-transform duration-500 group-hover:translate-x-full"
                        ></div>
                    </button>
                    <button
                        @click="switchSection('profile')"
                        class="group relative overflow-hidden rounded-lg px-4 py-2 text-left font-mono text-sm transition-all"
                        :class="
                            currentSection === 'profile'
                                ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-400/30'
                                : 'text-cyan-400 hover:scale-105 hover:bg-cyan-400/20'
                        "
                    >
                        <span class="relative z-10">👤 Profile</span>
                        <div
                            class="absolute inset-0 -translate-x-full bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 transition-transform duration-500 group-hover:translate-x-full"
                        ></div>
                    </button>
                    <button
                        @click="switchSection('contact')"
                        class="group relative overflow-hidden rounded-lg px-4 py-2 text-left font-mono text-sm transition-all"
                        :class="
                            currentSection === 'contact'
                                ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-400/30'
                                : 'text-cyan-400 hover:scale-105 hover:bg-cyan-400/20'
                        "
                    >
                        <span class="relative z-10">📡 Contact</span>
                        <div
                            class="absolute inset-0 -translate-x-full bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 transition-transform duration-500 group-hover:translate-x-full"
                        ></div>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.revolutionary-portfolio {
    min-height: 100vh;
    transition: all 0.5s ease-in-out;
}

/* Interface-specific styles */
.interface-holo {
    background: linear-gradient(135deg, #000000 0%, #001122 50%, #000000 100%);
}

.interface-space {
    background: radial-gradient(circle at center, #0a0a1a 0%, #000000 100%);
}

.interface-traditional {
    background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
}

/* Holographic wrapper styling */
.holo-wrapper {
    position: relative;
    z-index: 10;
}

.holo-wrapper::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
        linear-gradient(90deg, transparent 98%, rgba(0, 212, 255, 0.1) 100%), linear-gradient(180deg, transparent 98%, rgba(0, 212, 255, 0.1) 100%);
    background-size: 30px 30px;
    pointer-events: none;
    animation: holographic-grid 20s linear infinite;
}

@keyframes holographic-grid {
    0% {
        transform: translate(0, 0);
    }
    100% {
        transform: translate(30px, 30px);
    }
}

/* Transition effects */
.interface-transition-enter-active,
.interface-transition-leave-active {
    transition: all 0.5s ease-in-out;
}

.interface-transition-enter-from,
.interface-transition-leave-to {
    opacity: 0;
}

/* Responsive interface selectors */
.interface-selector,
.section-selector {
    backdrop-filter: blur(10px);
    border: 1px solid rgba(0, 212, 255, 0.3);
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
}

.is-transitioning {
    overflow: hidden;
}

/* Futuristic scrollbar for holo mode */
.interface-holo ::-webkit-scrollbar {
    width: 12px;
}

.interface-holo ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.8);
    border-radius: 6px;
    border: 1px solid rgba(0, 212, 255, 0.2);
}

.interface-holo ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #00d4ff 0%, #0080ff 50%, #00d4ff 100%);
    border-radius: 6px;
    border: 2px solid rgba(0, 0, 0, 0.8);
    box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
    animation: scroll-glow 2s ease-in-out infinite alternate;
}

.interface-holo ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #00ffff 0%, #00d4ff 50%, #00ffff 100%);
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.8);
}

.interface-holo ::-webkit-scrollbar-corner {
    background: rgba(0, 0, 0, 0.8);
}

@keyframes scroll-glow {
    0% {
        box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
    }
    100% {
        box-shadow: 0 0 20px rgba(0, 212, 255, 0.8);
    }
}

/* Space mode scrollbar */
.interface-space ::-webkit-scrollbar {
    width: 12px;
}

.interface-space ::-webkit-scrollbar-track {
    background: rgba(10, 10, 26, 0.8);
    border-radius: 6px;
    border: 1px solid rgba(147, 51, 234, 0.3);
}

.interface-space ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #9333ea 0%, #7c3aed 50%, #9333ea 100%);
    border-radius: 6px;
    border: 2px solid rgba(10, 10, 26, 0.8);
    box-shadow: 0 0 10px rgba(147, 51, 234, 0.5);
}

.interface-space ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #a855f7 0%, #9333ea 50%, #a855f7 100%);
    box-shadow: 0 0 15px rgba(168, 85, 247, 0.8);
}

/* Traditional mode scrollbar */
.interface-traditional ::-webkit-scrollbar {
    width: 8px;
}

.interface-traditional ::-webkit-scrollbar-track {
    background: rgba(243, 244, 246, 0.5);
    border-radius: 4px;
}

.interface-traditional ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #6b7280 0%, #4b5563 100%);
    border-radius: 4px;
}

.interface-traditional ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #374151 0%, #1f2937 100%);
}

/* Quantum menu animations */
.quantum-menu {
    animation: quantum-float 3s ease-in-out infinite;
}

@keyframes quantum-float {
    0%,
    100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-5px);
    }
}

.quantum-menu .section-selector {
    position: relative;
}

.quantum-menu .section-selector::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #00d4ff, #0080ff, #00d4ff);
    border-radius: 18px;
    opacity: 0;
    z-index: -1;
    animation: quantum-border 4s linear infinite;
}

.quantum-menu:hover .section-selector::before {
    opacity: 0.3;
}

@keyframes quantum-border {
    0% {
        transform: rotate(0deg) scale(1);
    }
    50% {
        transform: rotate(180deg) scale(1.02);
    }
    100% {
        transform: rotate(360deg) scale(1);
    }
}

/* Smooth scroll behavior */
html {
    scroll-behavior: smooth;
}

.revolutionary-portfolio {
    scroll-behavior: smooth;
}

/* Custom scroll for all modes */
* {
    scrollbar-width: thin;
}

.interface-holo * {
    scrollbar-color: #00d4ff rgba(0, 0, 0, 0.8);
}

.interface-space * {
    scrollbar-color: #9333ea rgba(10, 10, 26, 0.8);
}

.interface-traditional * {
    scrollbar-color: #6b7280 rgba(243, 244, 246, 0.5);
}

/* Space mode cursor */
.interface-space {
    cursor: crosshair;
}

/* Animation for interface switching */
@keyframes interface-boot {
    0% {
        opacity: 0;
        transform: scale(0.8);
        filter: blur(10px);
    }
    50% {
        opacity: 0.5;
        transform: scale(1.05);
        filter: blur(5px);
    }
    100% {
        opacity: 1;
        transform: scale(1);
        filter: blur(0);
    }
}

.holo-interface,
.space-interface,
.traditional-interface {
    animation: interface-boot 1s ease-out;
}
</style>
