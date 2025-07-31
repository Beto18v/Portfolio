<script setup lang="ts">
import { useTranslation } from '@/composables/useTranslation';
import { ChevronDown, ExternalLink, Mail } from 'lucide-vue-next';
import { computed } from 'vue';

/**
 * Hero Section Component
 * Main landing section with introduction, call-to-action buttons,
 * and smooth scroll animations
 */

const { t } = useTranslation();

// Props for customization
interface Props {
    name?: string;
    title?: string;
    subtitle?: string;
    ctaText?: string;
    contactText?: string;
}

const props = withDefaults(defineProps<Props>(), {
    name: 'Your Name',
    title: '',
    subtitle: '',
    ctaText: '',
    contactText: '',
});

// Computed properties for dynamic content
const heroTitle = computed(() => props.title || t('hero.title'));
const heroSubtitle = computed(() => props.subtitle || t('hero.subtitle'));
const ctaButtonText = computed(() => props.ctaText || t('hero.cta'));
const contactButtonText = computed(() => props.contactText || t('hero.contact'));

/**
 * Smooth scroll to section
 * @param sectionId - The ID of the target section
 */
const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }
};

/**
 * Handle CTA button click - scroll to projects
 */
const handleCTAClick = () => {
    scrollToSection('projects');
};

/**
 * Handle contact button click - scroll to contact form
 */
const handleContactClick = () => {
    scrollToSection('contact');
};

/**
 * Scroll to next section (about)
 */
const scrollToNext = () => {
    scrollToSection('about');
};
</script>

<template>
    <section
        id="home"
        class="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900"
    >
        <!-- Background decorative elements -->
        <div class="absolute inset-0 overflow-hidden">
            <!-- Animated gradient blobs -->
            <div
                class="animate-blob absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-300 opacity-70 mix-blend-multiply blur-xl filter dark:bg-purple-600 dark:mix-blend-soft-light"
            ></div>
            <div
                class="animate-blob animation-delay-2000 absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-300 opacity-70 mix-blend-multiply blur-xl filter dark:bg-blue-600 dark:mix-blend-soft-light"
            ></div>
            <div
                class="animate-blob animation-delay-4000 absolute top-40 left-40 h-80 w-80 rounded-full bg-pink-300 opacity-70 mix-blend-multiply blur-xl filter dark:bg-pink-600 dark:mix-blend-soft-light"
            ></div>
        </div>

        <!-- Main content -->
        <div class="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <!-- Greeting -->
            <div class="animate-fade-in-up mb-6">
                <p class="text-lg font-medium text-gray-600 sm:text-xl dark:text-gray-300">
                    {{ t('hero.greeting') }}
                </p>
            </div>

            <!-- Name -->
            <div class="animate-fade-in-up animation-delay-200 mb-4">
                <h1 class="text-4xl font-bold text-gray-900 sm:text-6xl lg:text-7xl dark:text-white">
                    <span class="animate-gradient-x bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {{ props.name }}
                    </span>
                </h1>
            </div>

            <!-- Title -->
            <div class="animate-fade-in-up animation-delay-400 mb-6">
                <h2 class="text-2xl font-semibold text-gray-800 sm:text-3xl lg:text-4xl dark:text-gray-200">
                    {{ heroTitle }}
                </h2>
            </div>

            <!-- Subtitle -->
            <div class="animate-fade-in-up animation-delay-600 mb-8">
                <p class="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl dark:text-gray-300">
                    {{ heroSubtitle }}
                </p>
            </div>

            <!-- CTA Buttons -->
            <div class="animate-fade-in-up animation-delay-800 mb-12 flex flex-col justify-center gap-4 sm:flex-row">
                <!-- Primary CTA Button -->
                <button
                    @click="handleCTAClick"
                    class="group relative transform rounded-full bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-700 hover:shadow-xl focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
                >
                    <span class="flex items-center justify-center gap-2">
                        {{ ctaButtonText }}
                        <ExternalLink :size="18" class="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                </button>

                <!-- Secondary Contact Button -->
                <button
                    @click="handleContactClick"
                    class="group transform rounded-full border-2 border-gray-300 px-8 py-4 font-semibold text-gray-700 transition-all duration-300 hover:scale-105 hover:border-gray-400 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-gray-800 dark:focus:ring-gray-700"
                >
                    <span class="flex items-center justify-center gap-2">
                        <Mail :size="18" class="transition-transform duration-300 group-hover:scale-110" />
                        {{ contactButtonText }}
                    </span>
                </button>
            </div>

            <!-- Scroll indicator -->
            <div class="animate-fade-in-up animation-delay-1000">
                <button
                    @click="scrollToNext"
                    class="group rounded-full p-2 text-gray-400 transition-colors duration-300 hover:text-gray-600 focus:ring-2 focus:ring-gray-300 focus:outline-none dark:hover:text-gray-300"
                    :aria-label="t('common.scroll-down', 'Scroll down')"
                >
                    <ChevronDown
                        :size="24"
                        class="animate-bounce transition-transform duration-300 group-hover:translate-y-1 group-hover:animate-none"
                    />
                </button>
            </div>
        </div>

        <!-- Bottom fade overlay -->
        <div class="pointer-events-none absolute right-0 bottom-0 left-0 h-32 bg-gradient-to-t from-white to-transparent dark:from-gray-900"></div>
    </section>
</template>

<style scoped>
/* Custom animations */
@keyframes fade-in-up {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes blob {
    0% {
        transform: translate(0px, 0px) scale(1);
    }
    33% {
        transform: translate(30px, -50px) scale(1.1);
    }
    66% {
        transform: translate(-20px, 20px) scale(0.9);
    }
    100% {
        transform: translate(0px, 0px) scale(1);
    }
}

@keyframes gradient-x {
    0%,
    100% {
        background-size: 200% 200%;
        background-position: left center;
    }
    50% {
        background-size: 200% 200%;
        background-position: right center;
    }
}

.animate-fade-in-up {
    animation: fade-in-up 0.6s ease-out forwards;
}

.animate-blob {
    animation: blob 7s infinite;
}

.animate-gradient-x {
    animation: gradient-x 3s ease infinite;
}

.animation-delay-200 {
    animation-delay: 0.2s;
}

.animation-delay-400 {
    animation-delay: 0.4s;
}

.animation-delay-600 {
    animation-delay: 0.6s;
}

.animation-delay-800 {
    animation-delay: 0.8s;
}

.animation-delay-1000 {
    animation-delay: 1s;
}

.animation-delay-2000 {
    animation-delay: 2s;
}

.animation-delay-4000 {
    animation-delay: 4s;
}
</style>
