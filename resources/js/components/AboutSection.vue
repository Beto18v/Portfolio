<script setup lang="ts">
import { useTranslation } from '@/composables/useTranslation';
import { Award, Code, TrendingUp, User } from 'lucide-vue-next';
import { computed } from 'vue';

/**
 * About Section Component
 * Displays personal information, statistics, and professional summary
 * Features animated counters and responsive layout
 */

const { t } = useTranslation();

// Props for customization
interface Props {
    description?: string;
    image?: string;
    experience?: number;
    projectsCompleted?: number;
    technologiesMastered?: number;
}

const props = withDefaults(defineProps<Props>(), {
    description: '',
    image: '',
    experience: 3,
    projectsCompleted: 25,
    technologiesMastered: 15,
});

// Computed properties for dynamic content
const aboutDescription = computed(() => props.description || t('about.description'));

// Statistics data with icons
const statistics = computed(() => [
    {
        icon: TrendingUp,
        value: props.experience,
        label: t('about.experience'),
        suffix: '+',
        color: 'text-blue-600 dark:text-blue-400',
        bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
        icon: Award,
        value: props.projectsCompleted,
        label: t('about.projects'),
        suffix: '+',
        color: 'text-green-600 dark:text-green-400',
        bgColor: 'bg-green-100 dark:bg-green-900/20',
    },
    {
        icon: Code,
        value: props.technologiesMastered,
        label: t('about.technologies'),
        suffix: '+',
        color: 'text-purple-600 dark:text-purple-400',
        bgColor: 'bg-purple-100 dark:bg-purple-900/20',
    },
]);
</script>

<template>
    <section id="about" class="bg-white py-16 transition-colors duration-300 lg:py-24 dark:bg-gray-900">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <!-- Section header -->
            <div class="mb-16 text-center">
                <h2 class="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
                    {{ t('about.title') }}
                </h2>
                <div class="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
            </div>

            <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                <!-- Profile image -->
                <div class="group relative">
                    <div class="relative overflow-hidden rounded-2xl shadow-2xl">
                        <!-- Placeholder or actual image -->
                        <div
                            v-if="!props.image"
                            class="flex aspect-square items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"
                        >
                            <User :size="120" class="text-white opacity-80" />
                        </div>
                        <img v-else :src="props.image" alt="Profile" class="aspect-square h-full w-full object-cover" />

                        <!-- Overlay effect -->
                        <div
                            class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        ></div>
                    </div>

                    <!-- Decorative elements -->
                    <div class="absolute -top-4 -right-4 h-24 w-24 animate-pulse rounded-full bg-blue-500 opacity-20"></div>
                    <div class="animation-delay-1000 absolute -bottom-4 -left-4 h-32 w-32 animate-pulse rounded-full bg-purple-500 opacity-20"></div>
                </div>

                <!-- Content -->
                <div class="space-y-8">
                    <!-- Description -->
                    <div class="prose prose-lg dark:prose-invert max-w-none">
                        <p class="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                            {{ aboutDescription }}
                        </p>
                    </div>

                    <!-- Statistics -->
                    <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
                        <div
                            v-for="(stat, index) in statistics"
                            :key="index"
                            class="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center transition-all duration-300 hover:scale-105 hover:border-gray-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800/50 dark:hover:border-gray-600"
                        >
                            <!-- Icon -->
                            <div class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full" :class="stat.bgColor">
                                <component :is="stat.icon" :size="24" :class="stat.color" />
                            </div>

                            <!-- Value -->
                            <div class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">{{ stat.value }}{{ stat.suffix }}</div>

                            <!-- Label -->
                            <div class="text-sm font-medium text-gray-600 dark:text-gray-400">
                                {{ stat.label }}
                            </div>
                        </div>
                    </div>

                    <!-- Additional info or CTA -->
                    <div class="pt-6">
                        <div
                            class="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 p-6 dark:border-blue-800 dark:from-blue-900/20 dark:to-purple-900/20"
                        >
                            <p class="text-center font-medium text-gray-700 dark:text-gray-300">
                                "{{ t('about.passion', 'Passionate about creating digital experiences that make a difference') }}"
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.animation-delay-1000 {
    animation-delay: 1s;
}

/* Smooth hover animations */
.group:hover .group-hover\:opacity-100 {
    opacity: 1;
}

/* Custom animation for statistics */
@keyframes countUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-count-up {
    animation: countUp 0.6s ease-out forwards;
}
</style>
