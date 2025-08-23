<script setup lang="ts">
import { useTranslation } from '@/composables/useTranslation';
import { portfolioTranslations } from '@/data/translations';
import type { PortfolioData } from '@/types/portfolio';
import { skills } from '@/types/skills';
import { Head } from '@inertiajs/vue3';
import { computed, onMounted, ref } from 'vue';

// Import revolutionary components
import ClassicPortfolio from '@/components/ClassicPortfolio.vue';
import ContactSection from '@/components/ContactSection.vue';
import HolographicSkillsFixed from '@/components/HolographicSkillsFixed.vue';
import InterfaceModeSelector from '@/components/InterfaceModeSelector.vue';
import LanguageSelector from '@/components/LanguageSelector.vue';
import QuantumProfile from '@/components/QuantumProfile.vue';
import SpaceModulesStatic from '@/components/SpaceModulesStatic.vue';

/**
 * Revolutionary Portfolio Layout
 * Multi-dimensional immersive experience with terminal interface,
 * holographic skills, and space-based project navigation
 */

// Translation system setup
const { loadTranslations, initializeLanguage, t } = useTranslation();

// Interface modes
const interfaceMode = ref<'holo' | 'space' | 'traditional'>('holo');
const currentSection = ref<'profile' | 'skills' | 'projects' | 'contact'>('profile');
const isTransitioning = ref(false);

// Portfolio data - customize these values for your personal information
const portfolioData: PortfolioData = {
    // Personal information
    name: 'Nicolas A. Valenzuela', // Replace with your actual name
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

    // Skills data
    skills,

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
    ],
};

// Interface switching animations (faster transition)
const switchInterface = (mode: 'holo' | 'space' | 'traditional') => {
    isTransitioning.value = true;
    setTimeout(() => {
        interfaceMode.value = mode;
        isTransitioning.value = false;
    }, 200);
};

// Section switching for holographic interface
const switchSection = (section: typeof currentSection.value) => {
    currentSection.value = section;
};

// Listen for application launch events
onMounted(() => {
    loadTranslations(portfolioTranslations);
    initializeLanguage();
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
    </Head>

    <!-- Main revolutionary interface -->
    <div class="revolutionary-portfolio" :class="interfaceClasses">
        <!-- Language Selector - Top right, always visible -->
        <div class="fixed top-4 right-4 z-50">
            <LanguageSelector />
        </div>

        <!-- Interface mode selector - Visible in all modes -->
        <InterfaceModeSelector
            :mode="interfaceMode"
            :label="t('interface.mode') + ':'"
            :holoLabel="t('interface.holo')"
            :spaceLabel="t('interface.space')"
            :classicLabel="t('interface.classic')"
            @switch="switchInterface"
        />

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
            <!-- Holographic Skills -->
            <div v-if="currentSection === 'skills'">
                <HolographicSkillsFixed :skills="portfolioData.skills" />
            </div>

            <!-- Traditional sections in holo mode -->
            <div v-else class="traditional-in-holo min-h-screen bg-black">
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

                    <!-- Projects Section -->
                    <section v-else-if="currentSection === 'projects'" class="quantum-projects relative min-h-screen overflow-hidden bg-black">
                        <!-- Quantum grid overlay -->
                        <div class="absolute inset-0 opacity-10">
                            <div class="quantum-grid"></div>
                        </div>

                        <!-- Scanning effects -->
                        <div class="pointer-events-none absolute inset-0">
                            <div class="animate-scan-horizontal absolute top-0 left-0 h-px w-full bg-cyan-400 opacity-30"></div>
                            <div class="animate-scan-vertical absolute top-0 left-0 h-full w-px bg-purple-400 opacity-30"></div>
                        </div>

                        <!-- Main content -->
                        <div class="relative z-10 flex min-h-screen items-center">
                            <div class="container mx-auto px-6 py-20">
                                <!-- Header Section -->
                                <div class="mb-16 text-center">
                                    <div class="relative inline-block">
                                        <!-- Rotating gradient background -->
                                        <div
                                            class="absolute -inset-8 animate-pulse rounded-full bg-gradient-to-r from-cyan-400/20 via-purple-600/20 to-cyan-400/20 blur-xl"
                                        ></div>

                                        <h2 class="relative mb-6 text-5xl font-bold text-white">
                                            <span class="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                                Projects Portfolio
                                            </span>
                                        </h2>
                                    </div>

                                    <p class="mx-auto max-w-2xl text-lg leading-relaxed text-gray-300">
                                        {{ portfolioData.projects.length }} innovative projects showcasing modern web development and creative
                                        solutions
                                    </p>

                                    <!-- Status indicator -->
                                    <div class="mt-6 flex items-center justify-center gap-6 text-sm">
                                        <div class="flex items-center gap-2">
                                            <div class="h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
                                            <span class="text-green-400">All Systems Online</span>
                                        </div>
                                        <div class="flex items-center gap-2">
                                            <div class="h-2 w-2 animate-pulse rounded-full bg-cyan-400"></div>
                                            <span class="text-cyan-400">Portfolio Active</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Projects Grid -->
                                <div class="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                                    <div
                                        v-for="(project, index) in portfolioData.projects"
                                        :key="project.id"
                                        class="quantum-project-card group relative rounded-xl border border-gray-700 bg-black/50 backdrop-blur-sm transition-all duration-500 hover:border-cyan-400/50"
                                        :style="{ animationDelay: `${index * 0.15}s` }"
                                    >
                                        <!-- Quantum border effect -->
                                        <div class="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                            <div class="quantum-border absolute inset-0 rounded-xl"></div>
                                        </div>

                                        <!-- Glow effect -->
                                        <div
                                            class="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400/10 via-transparent to-purple-600/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                        ></div>

                                        <div class="relative z-10 p-8">
                                            <!-- Project Header -->
                                            <div class="mb-6 flex items-start justify-between">
                                                <div class="flex items-center gap-3">
                                                    <div class="h-3 w-3 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400"></div>
                                                    <span class="font-mono text-xs text-cyan-400/70">PROJECT {{ project.id.padStart(3, '0') }}</span>
                                                </div>
                                                <div class="rounded-lg border border-gray-600 bg-gray-800/50 px-3 py-1 text-xs text-gray-400">
                                                    {{ project.category }}
                                                </div>
                                            </div>

                                            <!-- Project Title -->
                                            <h3 class="mb-4 text-2xl font-bold text-white transition-all duration-300 group-hover:text-cyan-400">
                                                {{ project.title }}
                                            </h3>

                                            <!-- Description -->
                                            <p class="mb-6 leading-relaxed text-gray-300 transition-all duration-300 group-hover:text-gray-200">
                                                {{ project.description }}
                                            </p>

                                            <!-- Technology Stack -->
                                            <div class="mb-8">
                                                <h4 class="mb-3 text-sm font-semibold text-cyan-400">Technology Stack</h4>
                                                <div class="flex flex-wrap gap-2">
                                                    <span
                                                        v-for="(tech, techIndex) in project.technologies"
                                                        :key="tech"
                                                        class="quantum-tech-tag rounded-lg border border-gray-600 bg-gray-800/50 px-3 py-1 text-xs text-gray-300 transition-all duration-300 hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:text-cyan-400"
                                                        :style="{ animationDelay: `${index * 0.15 + techIndex * 0.05}s` }"
                                                    >
                                                        {{ tech }}
                                                    </span>
                                                </div>
                                            </div>

                                            <!-- Action Buttons -->
                                            <div class="flex gap-4">
                                                <a
                                                    :href="project.liveUrl"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    class="quantum-btn-primary group/btn flex-1 rounded-lg border border-cyan-400/50 bg-cyan-400/10 px-6 py-3 text-center text-sm font-medium text-cyan-400 transition-all duration-300 hover:bg-cyan-400/20 hover:shadow-lg hover:shadow-cyan-400/25"
                                                >
                                                    <span class="relative z-10">Live Demo</span>
                                                </a>
                                                <a
                                                    :href="project.githubUrl"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    class="quantum-btn-secondary group/btn flex-1 rounded-lg border border-gray-600 bg-transparent px-6 py-3 text-center text-sm font-medium text-gray-300 transition-all duration-300 hover:border-purple-400/50 hover:bg-purple-400/10 hover:text-purple-400"
                                                >
                                                    <span class="relative z-10">Source Code</span>
                                                </a>
                                            </div>
                                        </div>

                                        <!-- Project status indicator -->
                                        <div
                                            class="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-400 text-xs font-bold text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                        >
                                            ✓
                                        </div>
                                    </div>
                                </div>

                                <!-- Portfolio Summary -->
                                <div class="mt-16 text-center">
                                    <div
                                        class="quantum-summary relative mx-auto max-w-2xl rounded-xl border border-cyan-400/30 bg-gradient-to-r from-cyan-400/10 to-purple-600/10 p-8 backdrop-blur-sm"
                                    >
                                        <div class="absolute inset-0 animate-pulse rounded-xl bg-gradient-to-r from-cyan-400/5 to-purple-600/5"></div>
                                        <div class="relative z-10">
                                            <h3 class="mb-4 text-2xl font-bold text-cyan-400">Portfolio Overview</h3>
                                            <p class="leading-relaxed text-gray-300">
                                                Each project represents a unique challenge solved with modern web technologies. From full-stack
                                                applications to innovative frontend solutions, these projects showcase my commitment to quality code
                                                and exceptional user experiences.
                                            </p>
                                            <div class="mt-6 flex items-center justify-center gap-8 text-sm">
                                                <div class="text-center">
                                                    <div class="text-2xl font-bold text-cyan-400">{{ portfolioData.projects.length }}</div>
                                                    <div class="text-gray-400">Projects</div>
                                                </div>
                                                <div class="text-center">
                                                    <div class="text-2xl font-bold text-purple-400">100%</div>
                                                    <div class="text-gray-400">Completion</div>
                                                </div>
                                                <div class="text-center">
                                                    <div class="text-2xl font-bold text-green-400">Live</div>
                                                    <div class="text-gray-400">Status</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

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
            <ClassicPortfolio
                :projects="portfolioData.projects"
                :skills="portfolioData.skills"
                :profile-data="portfolioData"
                @switch-interface="switchInterface"
            />
        </div>

        <!-- Quick section switcher for holo mode - Bottom Right -->
        <div v-if="interfaceMode === 'holo'" class="quantum-menu fixed right-6 bottom-6 z-50">
            <div class="section-selector rounded-2xl border border-cyan-400/40 bg-black/70 p-3 shadow-lg shadow-cyan-400/20 backdrop-blur-lg">
                <div class="mb-3 px-2 font-mono text-xs tracking-wider text-cyan-400"><span class="animate-pulse">●</span> QUANTUM ACCESS</div>
                <div class="flex flex-col gap-2">
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
                        @click="switchSection('projects')"
                        class="group relative overflow-hidden rounded-lg px-4 py-2 text-left font-mono text-sm transition-all"
                        :class="
                            currentSection === 'projects'
                                ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-400/30'
                                : 'text-cyan-400 hover:scale-105 hover:bg-cyan-400/20'
                        "
                    >
                        <span class="relative z-10">� Projects</span>
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

/* Transition effects (more fluid and smooth) */
.interface-transition-enter-active,
.interface-transition-leave-active {
    transition:
        opacity 0.18s cubic-bezier(0.4, 0, 0.2, 1),
        transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}

.interface-transition-enter-from,
.interface-transition-leave-to {
    opacity: 0;
    transform: scale(0.98);
}
.interface-transition-enter-to,
.interface-transition-leave-from {
    opacity: 1;
    transform: scale(1);
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

/* Projects Section Holographic Styles */
/* Quantum Projects Section Styles */
.quantum-projects {
    background:
        radial-gradient(circle at 25% 25%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(128, 0, 255, 0.1) 0%, transparent 50%), linear-gradient(135deg, #000000 0%, #0a0a1a 100%);
}

.quantum-grid {
    background-image:
        linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: grid-flow 20s linear infinite;
}

@keyframes grid-flow {
    0% {
        transform: translate(0, 0);
    }
    100% {
        transform: translate(50px, 50px);
    }
}

.quantum-project-card {
    animation: fade-in-up 0.6s ease-out forwards;
    animation-fill-mode: both;
}

@keyframes fade-in-up {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.quantum-border {
    background: linear-gradient(45deg, transparent, rgba(0, 212, 255, 0.5), transparent);
    background-size: 400% 400%;
    animation: border-flow 3s linear infinite;
    padding: 1px;
    border-radius: 12px;
    mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
    mask-composite: exclude;
}

@keyframes border-flow {
    0% {
        background-position: 0% 50%;
    }
    100% {
        background-position: 100% 50%;
    }
}

.quantum-tech-tag {
    animation: fade-in-up 0.4s ease-out forwards;
    animation-fill-mode: both;
}

.quantum-btn-primary,
.quantum-btn-secondary {
    position: relative;
    overflow: hidden;
}

.quantum-btn-primary::before,
.quantum-btn-secondary::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 8px;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    opacity: 0;
    transition: opacity 0.3s;
    z-index: 0;
}

.quantum-btn-primary:hover::before,
.quantum-btn-secondary:hover::before {
    opacity: 1;
}

@keyframes scan-horizontal {
    0%,
    100% {
        transform: translateY(0);
        opacity: 1;
    }
    50% {
        transform: translateY(100vh);
        opacity: 0.3;
    }
}

@keyframes scan-vertical {
    0%,
    100% {
        transform: translateX(0);
        opacity: 1;
    }
    50% {
        transform: translateX(100vw);
        opacity: 0.3;
    }
}

.animate-scan-horizontal {
    animation: scan-horizontal 8s ease-in-out infinite;
}

.animate-scan-vertical {
    animation: scan-vertical 12s ease-in-out infinite;
    animation-delay: 2s;
}

.quantum-summary::before {
    animation: pulse-glow 3s ease-in-out infinite;
}

@keyframes pulse-glow {
    0%,
    100% {
        opacity: 0.1;
    }
    50% {
        opacity: 0.3;
    }
}
</style>
