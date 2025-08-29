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
 *
 * Features:
 * - Three interface modes: Holographic, Space, and Classic
 * - Multi-language support (Spanish, English, Chinese)
 * - Responsive design for all devices
 * - Real-time interface switching with animations
 *
 * @author Portfolio Project
 * @version 1.0
 */

// Translation system setup
const { loadTranslations, initializeLanguage, t } = useTranslation();

// Interface modes - controls the visual experience
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
        // experience: 1,
        // projectsCompleted: 3,
        // technologiesMastered: 22,
    },

    // Skills data
    skills: skills.map((skill) => ({
        ...skill,
        category: skill.category as import('@/types/portfolio').SkillCategory,
    })),

    // Projects data - now reactive
    projects: projects.value,
}));

// Optimized interface switching with performance improvements
const switchInterface = (mode: 'holo' | 'space' | 'traditional') => {
    if (interfaceMode.value === mode || isTransitioning.value) return;

    isTransitioning.value = true;

    // Pre-load next interface data if needed
    if (mode === 'holo' && currentSection.value === 'profile') {
        currentSection.value = 'profile'; // Ensure proper initial state
    }

    // Smooth transition timing (reduced from 150ms to 100ms for faster UX)
    setTimeout(() => {
        interfaceMode.value = mode;
        // Keep transitioning state slightly longer for smooth animation
        setTimeout(() => {
            isTransitioning.value = false;
        }, 50);
    }, 100);
};

// Optimized section switching with smooth transitions
const switchSection = (section: typeof currentSection.value) => {
    if (currentSection.value === section) return;

    // Add subtle transition state for section changes
    const sectionTransition = ref(true);
    setTimeout(() => {
        currentSection.value = section;
        sectionTransition.value = false;
    }, 100);
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
        <title>{{ portfolioData.name }} - CV</title>
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

        <!-- Optimized interface rendering with keep-alive for better performance -->
        <Transition name="interface-transition" mode="out-in">
            <div :key="interfaceMode" class="interface-container" :class="{ 'is-transitioning': isTransitioning }">
                <!-- HOLOGRAPHIC INTERFACE MODE -->
                <HolographicPortfolio
                    v-if="interfaceMode === 'holo'"
                    :current-section="currentSection"
                    :portfolio-data="portfolioData"
                    key="holo-interface"
                />

                <!-- SPACE INTERFACE MODE -->
                <div v-else-if="interfaceMode === 'space'" class="space-interface" key="space-interface">
                    <SpaceModulesStatic :projects="portfolioData.projects" :skills="portfolioData.skills" :profile-data="portfolioData" />
                </div>

                <!-- TRADITIONAL INTERFACE MODE -->
                <div v-else class="traditional-interface" key="classic-interface">
                    <ClassicPortfolio
                        :projects="portfolioData.projects"
                        :skills="portfolioData.skills"
                        :profile-data="portfolioData"
                        @switch-interface="switchInterface"
                    />
                </div>
            </div>
        </Transition>

        <!-- Quick section switcher for holo mode - Bottom Right -->
        <Transition name="fade" mode="out-in" :duration="150">
            <HolograpichSwitcher v-if="interfaceMode === 'holo'" :current-section="currentSection" @switch="switchSection" key="holo-switcher" />
        </Transition>
    </div>
</template>
