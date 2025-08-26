<script setup lang="ts">
import { usePortfolioData } from '@/composables/usePortfolioData';
const { projects, skills } = usePortfolioData();

import { useTranslation } from '@/composables/useTranslation';
import { portfolioTranslations } from '@/data/translations';
import { Head } from '@inertiajs/vue3';
import { computed, onMounted, ref } from 'vue';

// Import components
import ClassicPortfolio from '@/components/classic/ClassicPortfolio.vue';
import InterfaceModeSelector from '@/components/fixedcont/InterfaceModeSelector.vue';
import LanguageSelector from '@/components/fixedcont/LanguageSelector.vue';
import HolographicPortfolio from '@/components/holo/HolographicPortfolio.vue';
import SpaceModulesStatic from '@/components/space/SpaceModulesStatic.vue';

import HolograpichSwitcher from '@/components/holo/HolograpichSwitcher.vue';

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
const portfolioData = computed(() => ({
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

    // Projects data - now reactive
    projects: projects.value,
}));

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
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
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
        <HolographicPortfolio v-if="interfaceMode === 'holo'" :current-section="currentSection" :portfolio-data="portfolioData" />

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
        <HolograpichSwitcher v-if="interfaceMode === 'holo'" :current-section="currentSection" @switch="switchSection" />
    </div>
</template>
