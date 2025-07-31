<script setup lang="ts">
import { useTranslation } from '@/composables/useTranslation';
import type { Skill } from '@/types/portfolio';
import { Code2, Database, Server, Star, Wrench } from 'lucide-vue-next';
import { computed, ref } from 'vue';

/**
 * Skills Section Component
 * Displays technical skills organized by categories with progress indicators
 * Features interactive skill cards and proficiency levels
 */

const { t } = useTranslation();

// Props for customization
interface Props {
    skills?: Skill[];
}

const props = withDefaults(defineProps<Props>(), {
    skills: () => [
        // Frontend skills
        { name: 'Vue.js', level: 5, category: 'frontend', description: 'Advanced Vue 3 with Composition API' },
        { name: 'React', level: 4, category: 'frontend', description: 'React with TypeScript and hooks' },
        { name: 'TypeScript', level: 5, category: 'frontend', description: 'Strong typing and modern JS' },
        { name: 'Tailwind CSS', level: 5, category: 'frontend', description: 'Utility-first CSS framework' },
        { name: 'HTML5/CSS3', level: 5, category: 'frontend', description: 'Semantic HTML and modern CSS' },

        // Backend skills
        { name: 'Laravel', level: 5, category: 'backend', description: 'PHP framework with Eloquent ORM' },
        { name: 'Node.js', level: 4, category: 'backend', description: 'JavaScript runtime for server-side' },
        { name: 'PHP', level: 5, category: 'backend', description: 'Modern PHP with best practices' },
        { name: 'Python', level: 3, category: 'backend', description: 'Django and Flask frameworks' },

        // Database skills
        { name: 'MySQL', level: 5, category: 'database', description: 'Relational database management' },
        { name: 'PostgreSQL', level: 4, category: 'database', description: 'Advanced SQL and optimization' },
        { name: 'Redis', level: 3, category: 'database', description: 'Caching and session storage' },
        { name: 'MongoDB', level: 3, category: 'database', description: 'NoSQL document database' },

        // Tools skills
        { name: 'Git', level: 5, category: 'tools', description: 'Version control and collaboration' },
        { name: 'Docker', level: 4, category: 'tools', description: 'Containerization and deployment' },
        { name: 'AWS', level: 3, category: 'tools', description: 'Cloud services and deployment' },
        { name: 'Vite', level: 5, category: 'tools', description: 'Fast build tool and dev server' },
    ],
});

// Active category filter
const activeCategory = ref<string>('all');

// Skill categories configuration
const categories = computed(() => [
    {
        key: 'all',
        name: t('skills.all', 'All Skills'),
        icon: Star,
        color: 'text-gray-600 dark:text-gray-400',
        bgColor: 'bg-gray-100 dark:bg-gray-800',
    },
    {
        key: 'frontend',
        name: t('skills.frontend'),
        icon: Code2,
        color: 'text-blue-600 dark:text-blue-400',
        bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
        key: 'backend',
        name: t('skills.backend'),
        icon: Server,
        color: 'text-green-600 dark:text-green-400',
        bgColor: 'bg-green-100 dark:bg-green-900/20',
    },
    {
        key: 'database',
        name: t('skills.database'),
        icon: Database,
        color: 'text-purple-600 dark:text-purple-400',
        bgColor: 'bg-purple-100 dark:bg-purple-900/20',
    },
    {
        key: 'tools',
        name: t('skills.tools'),
        icon: Wrench,
        color: 'text-orange-600 dark:text-orange-400',
        bgColor: 'bg-orange-100 dark:bg-orange-900/20',
    },
]);

// Filtered skills based on active category
const filteredSkills = computed(() => {
    if (activeCategory.value === 'all') {
        return props.skills;
    }
    return props.skills.filter((skill) => skill.category === activeCategory.value);
});

/**
 * Set active category filter
 * @param category - The category to filter by
 */
const setActiveCategory = (category: string) => {
    activeCategory.value = category;
};

/**
 * Get skill level as percentage
 * @param level - Skill level (1-5)
 * @returns Percentage string
 */
const getSkillPercentage = (level: number): string => {
    return `${(level / 5) * 100}%`;
};

/**
 * Get skill level color based on proficiency
 * @param level - Skill level (1-5)
 * @returns CSS color class
 */
const getSkillColor = (level: number): string => {
    if (level >= 5) return 'bg-green-500';
    if (level >= 4) return 'bg-blue-500';
    if (level >= 3) return 'bg-yellow-500';
    if (level >= 2) return 'bg-orange-500';
    return 'bg-red-500';
};
</script>

<template>
    <section id="skills" class="bg-gray-50 py-16 transition-colors duration-300 lg:py-24 dark:bg-gray-800">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <!-- Section header -->
            <div class="mb-16 text-center">
                <h2 class="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
                    {{ t('skills.title') }}
                </h2>
                <p class="mx-auto mb-6 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
                    {{ t('skills.subtitle') }}
                </p>
                <div class="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
            </div>

            <!-- Category filters -->
            <div class="mb-12 flex flex-wrap justify-center gap-3">
                <button
                    v-for="category in categories"
                    :key="category.key"
                    @click="setActiveCategory(category.key)"
                    class="flex items-center gap-2 rounded-full px-4 py-2 font-medium transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:outline-none"
                    :class="[
                        activeCategory === category.key
                            ? `${category.bgColor} ${category.color} ring-2 ring-current ring-offset-white dark:ring-offset-gray-800`
                            : 'bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600',
                    ]"
                >
                    <component :is="category.icon" :size="16" />
                    <span>{{ category.name }}</span>
                </button>
            </div>

            <!-- Skills grid -->
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <div
                    v-for="(skill, index) in filteredSkills"
                    :key="`${skill.name}-${index}`"
                    class="group rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:border-gray-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600"
                >
                    <!-- Skill header -->
                    <div class="mb-4 flex items-center justify-between">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                            {{ skill.name }}
                        </h3>

                        <!-- Star rating -->
                        <div class="flex gap-1">
                            <Star
                                v-for="star in 5"
                                :key="star"
                                :size="14"
                                :class="[star <= skill.level ? 'fill-current text-yellow-400' : 'text-gray-300 dark:text-gray-600']"
                            />
                        </div>
                    </div>

                    <!-- Progress bar -->
                    <div class="mb-4">
                        <div class="mb-2 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                            <span>Proficiency</span>
                            <span>{{ skill.level }}/5</span>
                        </div>

                        <div class="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                            <div
                                class="h-2 rounded-full transition-all duration-500 ease-out"
                                :class="getSkillColor(skill.level)"
                                :style="{ width: getSkillPercentage(skill.level) }"
                            ></div>
                        </div>
                    </div>

                    <!-- Description -->
                    <p v-if="skill.description" class="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                        {{ skill.description }}
                    </p>

                    <!-- Hover effect overlay -->
                    <div
                        class="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    ></div>
                </div>
            </div>

            <!-- Additional info -->
            <div class="mt-16 text-center">
                <div
                    class="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-6 py-3 text-blue-700 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
                >
                    <Star :size="16" class="text-blue-500" />
                    <span class="font-medium">
                        {{ t('skills.note', 'Always learning and improving these skills') }}
                    </span>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* Custom animation for skill cards */
@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-slide-in-up {
    animation: slideInUp 0.6s ease-out forwards;
}

/* Staggered animation delays */
.group:nth-child(1) {
    animation-delay: 0.1s;
}
.group:nth-child(2) {
    animation-delay: 0.2s;
}
.group:nth-child(3) {
    animation-delay: 0.3s;
}
.group:nth-child(4) {
    animation-delay: 0.4s;
}
</style>
