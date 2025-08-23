<script setup lang="ts">
import { usePortfolioData } from '@/composables/usePortfolioData';
const { projects, skills } = usePortfolioData();

import { useTranslation } from '@/composables/useTranslation';
import { portfolioTranslations } from '@/data/translations';
import type { PortfolioData } from '@/types/portfolio';
import { Head } from '@inertiajs/vue3';
import { computed, onMounted, ref } from 'vue';

// Import components
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
    name: 'Nicolas A. Valenzuela',
    profileImage: 'public/Foto.png',

    // Hero section customization
    hero: {
        title: '',
        subtitle: '',
    },

    // About section customization
    about: {
        description: '',
        experience: 3,
        projectsCompleted: 25,
        technologiesMastered: 15,
    },

    // Skills data
    skills: skills.map((skill) => ({
        ...skill,
        category: skill.category as import('@/types/portfolio').SkillCategory,
    })),

    // Projects data - replace with your actual projects
    projects: projects.value,
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
        <title>{{ portfolioData.name }}</title>
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

                                            <!-- Project Image -->
                                            <div class="mb-6 flex justify-center">
                                                <div class="flex h-50 w-110 items-center justify-center rounded-2xl border-2 border-cyan-400/40">
                                                    <img
                                                        :src="project.image"
                                                        :alt="project.title"
                                                        class="h-full w-full rounded-2xl transition-transform duration-500 hover:scale-105"
                                                    />
                                                </div>
                                            </div>

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
