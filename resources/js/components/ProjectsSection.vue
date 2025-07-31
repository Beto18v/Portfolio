<script setup lang="ts">
import { useTranslation } from '@/composables/useTranslation';
import { Calendar, ExternalLink, Eye, Filter, Github, Tag, X } from 'lucide-vue-next';
import { computed, ref } from 'vue';

/**
 * Projects Section Component
 * Displays featured projects with filtering, modal previews, and links
 * Features responsive grid layout and interactive project cards
 */

const { t } = useTranslation();

// Define project interface
interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    liveUrl?: string;
    githubUrl?: string;
    category: string;
    featured?: boolean;
    date: string;
}

// Props for customization
interface Props {
    projects?: Project[];
    showAll?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    projects: () => [
        {
            id: '1',
            title: 'E-Commerce Platform',
            description: 'Full-stack e-commerce solution with Laravel backend, Vue.js frontend, and integrated payment processing.',
            image: '/api/placeholder/600/400',
            technologies: ['Laravel', 'Vue.js', 'MySQL', 'Stripe', 'Tailwind CSS'],
            liveUrl: 'https://example.com',
            githubUrl: 'https://github.com/example/ecommerce',
            category: 'Full Stack',
            featured: true,
            date: '2024-01-15',
        },
        {
            id: '2',
            title: 'Task Management App',
            description: 'Collaborative task management application with real-time updates, team collaboration features.',
            image: '/api/placeholder/600/400',
            technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'TypeScript'],
            liveUrl: 'https://example.com',
            githubUrl: 'https://github.com/example/tasks',
            category: 'Web App',
            featured: true,
            date: '2023-11-20',
        },
        {
            id: '3',
            title: 'Weather Dashboard',
            description: 'Modern weather application with beautiful UI, location-based forecasts, and interactive charts.',
            image: '/api/placeholder/600/400',
            technologies: ['Vue.js', 'Chart.js', 'OpenWeather API', 'CSS3'],
            liveUrl: 'https://example.com',
            githubUrl: 'https://github.com/example/weather',
            category: 'Frontend',
            featured: false,
            date: '2023-08-10',
        },
        {
            id: '4',
            title: 'Portfolio Website',
            description: 'Personal portfolio website built with modern technologies and responsive design.',
            image: '/api/placeholder/600/400',
            technologies: ['Vue.js', 'Tailwind CSS', 'Vite', 'TypeScript'],
            liveUrl: 'https://example.com',
            githubUrl: 'https://github.com/example/portfolio',
            category: 'Frontend',
            featured: true,
            date: '2023-12-05',
        },
    ],
    showAll: false,
});

// Reactive state
const selectedCategory = ref<string>('all');
const selectedProject = ref<Project | null>(null);
const showModal = ref(false);

// Get unique categories from projects
const categories = computed(() => {
    const cats = ['all', ...new Set(props.projects.map((p) => p.category))];
    return cats.map((cat) => ({
        key: cat,
        name: cat === 'all' ? t('projects.all', 'All Projects') : cat,
        count: cat === 'all' ? props.projects.length : props.projects.filter((p) => p.category === cat).length,
    }));
});

// Filter projects based on selected category and featured status
const filteredProjects = computed(() => {
    let filtered = props.projects;

    // Filter by category
    if (selectedCategory.value !== 'all') {
        filtered = filtered.filter((project) => project.category === selectedCategory.value);
    }

    // Show only featured projects if not showing all
    if (!props.showAll) {
        filtered = filtered.filter((project) => project.featured);
    }

    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

/**
 * Set active category filter
 * @param category - The category to filter by
 */
const setCategory = (category: string) => {
    selectedCategory.value = category;
};

/**
 * Open project modal with details
 * @param project - The project to view
 */
const viewProject = (project: Project) => {
    selectedProject.value = project;
    showModal.value = true;
    document.body.style.overflow = 'hidden';
};

/**
 * Close project modal
 */
const closeModal = () => {
    showModal.value = false;
    selectedProject.value = null;
    document.body.style.overflow = 'auto';
};

/**
 * Format date for display
 * @param dateString - ISO date string
 * @returns Formatted date
 */
const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
    });
};

/**
 * Open external link
 * @param url - URL to open
 */
const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
};
</script>

<template>
    <section id="projects" class="bg-white py-16 transition-colors duration-300 lg:py-24 dark:bg-gray-900">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <!-- Section header -->
            <div class="mb-16 text-center">
                <h2 class="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
                    {{ t('projects.title') }}
                </h2>
                <p class="mx-auto mb-6 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
                    {{ t('projects.subtitle') }}
                </p>
                <div class="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
            </div>

            <!-- Category filters -->
            <div class="mb-12 flex flex-wrap justify-center gap-3">
                <button
                    v-for="category in categories"
                    :key="category.key"
                    @click="setCategory(category.key)"
                    class="flex items-center gap-2 rounded-full px-4 py-2 font-medium transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                    :class="[
                        selectedCategory === category.key
                            ? 'bg-blue-500 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700',
                    ]"
                >
                    <Filter :size="16" />
                    <span>{{ category.name }}</span>
                    <span
                        class="rounded-full px-2 py-0.5 text-xs"
                        :class="[
                            selectedCategory === category.key
                                ? 'bg-white/20 text-white'
                                : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400',
                        ]"
                    >
                        {{ category.count }}
                    </span>
                </button>
            </div>

            <!-- Projects grid -->
            <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div
                    v-for="(project, index) in filteredProjects"
                    :key="project.id"
                    class="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800"
                    :style="{ animationDelay: `${index * 0.1}s` }"
                >
                    <!-- Project image -->
                    <div class="relative aspect-video overflow-hidden bg-gray-200 dark:bg-gray-700">
                        <img
                            :src="project.image"
                            :alt="project.title"
                            class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                            loading="lazy"
                        />

                        <!-- Overlay -->
                        <div
                            class="absolute inset-0 flex items-center justify-center gap-3 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        >
                            <!-- View project button -->
                            <button
                                @click="viewProject(project)"
                                class="rounded-full bg-white/20 p-3 backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white/30 focus:ring-2 focus:ring-white focus:outline-none"
                                :aria-label="`View ${project.title}`"
                            >
                                <Eye :size="20" class="text-white" />
                            </button>

                            <!-- Live demo button -->
                            <button
                                v-if="project.liveUrl"
                                @click="openLink(project.liveUrl)"
                                class="rounded-full bg-white/20 p-3 backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white/30 focus:ring-2 focus:ring-white focus:outline-none"
                                :aria-label="`View live demo of ${project.title}`"
                            >
                                <ExternalLink :size="20" class="text-white" />
                            </button>

                            <!-- GitHub button -->
                            <button
                                v-if="project.githubUrl"
                                @click="openLink(project.githubUrl)"
                                class="rounded-full bg-white/20 p-3 backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white/30 focus:ring-2 focus:ring-white focus:outline-none"
                                :aria-label="`View source code of ${project.title}`"
                            >
                                <Github :size="20" class="text-white" />
                            </button>
                        </div>

                        <!-- Featured badge -->
                        <div
                            v-if="project.featured"
                            class="absolute top-3 right-3 rounded-full bg-yellow-500 px-2 py-1 text-xs font-semibold text-white"
                        >
                            Featured
                        </div>
                    </div>

                    <!-- Project content -->
                    <div class="p-6">
                        <!-- Project header -->
                        <div class="mb-3 flex items-start justify-between">
                            <h3
                                class="text-xl font-semibold text-gray-900 transition-colors duration-200 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400"
                            >
                                {{ project.title }}
                            </h3>

                            <!-- Date -->
                            <div class="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                <Calendar :size="12" />
                                <span>{{ formatDate(project.date) }}</span>
                            </div>
                        </div>

                        <!-- Description -->
                        <p class="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                            {{ project.description }}
                        </p>

                        <!-- Technologies -->
                        <div class="mb-4 flex flex-wrap gap-2">
                            <span
                                v-for="tech in project.technologies"
                                :key="tech"
                                class="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                            >
                                <Tag :size="10" />
                                {{ tech }}
                            </span>
                        </div>

                        <!-- Action buttons -->
                        <div class="flex gap-3">
                            <button
                                v-if="project.liveUrl"
                                @click="openLink(project.liveUrl)"
                                class="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                            >
                                <ExternalLink :size="14" />
                                {{ t('projects.viewLive') }}
                            </button>

                            <button
                                v-if="project.githubUrl"
                                @click="openLink(project.githubUrl)"
                                class="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                <Github :size="14" />
                                {{ t('projects.viewCode') }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- View all projects button -->
            <div v-if="!props.showAll" class="mt-12 text-center">
                <button
                    class="inline-flex transform items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-purple-600 hover:shadow-xl focus:ring-4 focus:ring-blue-300 focus:outline-none"
                >
                    {{ t('projects.allProjects') }}
                    <ExternalLink :size="16" />
                </button>
            </div>
        </div>

        <!-- Project Modal -->
        <Teleport to="body">
            <div
                v-if="showModal && selectedProject"
                class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
                @click.self="closeModal"
            >
                <div
                    class="animate-modal-appear relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-white shadow-2xl dark:bg-gray-800"
                >
                    <!-- Close button -->
                    <button
                        @click="closeModal"
                        class="absolute top-4 right-4 z-10 rounded-full p-2 text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-700 focus:ring-2 focus:ring-gray-500 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                    >
                        <X :size="20" />
                    </button>

                    <!-- Modal content -->
                    <div class="p-6">
                        <!-- Project image -->
                        <img :src="selectedProject.image" :alt="selectedProject.title" class="mb-6 h-64 w-full rounded-lg object-cover sm:h-80" />

                        <!-- Project details -->
                        <div class="space-y-6">
                            <div>
                                <h3 class="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                                    {{ selectedProject.title }}
                                </h3>
                                <p class="leading-relaxed text-gray-600 dark:text-gray-300">
                                    {{ selectedProject.description }}
                                </p>
                            </div>

                            <!-- Technologies -->
                            <div>
                                <h4 class="mb-3 text-lg font-semibold text-gray-900 dark:text-white">Technologies Used</h4>
                                <div class="flex flex-wrap gap-2">
                                    <span
                                        v-for="tech in selectedProject.technologies"
                                        :key="tech"
                                        class="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                                    >
                                        {{ tech }}
                                    </span>
                                </div>
                            </div>

                            <!-- Action buttons -->
                            <div class="flex gap-4 pt-4">
                                <button
                                    v-if="selectedProject.liveUrl"
                                    @click="openLink(selectedProject.liveUrl)"
                                    class="flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                                >
                                    <ExternalLink :size="16" />
                                    {{ t('projects.viewLive') }}
                                </button>

                                <button
                                    v-if="selectedProject.githubUrl"
                                    @click="openLink(selectedProject.githubUrl)"
                                    class="flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                    <Github :size="16" />
                                    {{ t('projects.viewCode') }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Teleport>
    </section>
</template>

<style scoped>
@keyframes modal-appear {
    from {
        opacity: 0;
        transform: scale(0.9) translateY(20px);
    }
    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

.animate-modal-appear {
    animation: modal-appear 0.3s ease-out;
}

/* Custom scrollbar for modal */
.overflow-y-auto::-webkit-scrollbar {
    width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
    background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
    background: rgba(156, 163, 175, 0.5);
    border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: rgba(156, 163, 175, 0.7);
}
</style>
