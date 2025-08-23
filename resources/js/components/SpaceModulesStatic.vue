<script setup lang="ts">
// import { skills } from '@/types/skills';
import Foto from '@/../../public/Foto.png';
import { Brain, Database, Eye, Github, Mail, Monitor, Rocket, Satellite, User, Zap } from 'lucide-vue-next';
import { computed, ref } from 'vue';

/**
 * SpaceModules Component - Static Scrollable Space Interface
 * All portfolio sections displayed as space modules with scroll navigation
 */

// Define interfaces
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

interface SpaceModule {
    id: string;
    title: string;
    type: 'profile' | 'skills' | 'projects' | 'contact';
    icon: any;
    color: string;
    description: string;
    data?: any;
}

interface Props {
    projects?: Project[];
    skills?: any[];
    profileData?: any;
}

const props = withDefaults(defineProps<Props>(), {
    projects: () => [],
    // skills: () => [], // Eliminar duplicado
});

// Space modules configuration
const spaceModules = computed((): SpaceModule[] => [
    {
        id: 'profile-module',
        title: 'PERSONAL DATA CORE',
        type: 'profile',
        icon: User,
        color: '#00D4FF',
        description: 'Central command with developer information and statistics',
        data: props.profileData,
    },
    {
        id: 'skills-module',
        title: 'SKILLS MATRIX',
        type: 'skills',
        icon: Brain,
        color: '#00FF88',
        description: 'Technical expertise and competency systems',
        data: props.skills,
    },
    {
        id: 'projects-module',
        title: 'PROJECT ARSENAL',
        type: 'projects',
        icon: Rocket,
        color: '#FF0080',
        description: 'Deployed applications and development missions',
        data: props.projects,
    },
    {
        id: 'contact-module',
        title: 'COMMUNICATION HUB',
        type: 'contact',
        icon: Satellite,
        color: '#FFAA00',
        description: 'Establish contact and collaboration protocols',
        data: null,
    },
]);

// Skills data structure
// Agrupar skills por categoría usando los datos importados
const skillCategoryIcons: Record<string, any> = {
    frontend: Monitor,
    backend: Database,
    database: Eye,
    tools: Zap,
};

const skillCategoryNames: Record<string, string> = {
    frontend: 'Frontend Development',
    backend: 'Backend Development',
    database: 'Database',
    tools: 'DevOps & Tools',
};

const skillCategories = Object.entries(
    (props.skills ?? []).reduce<Record<string, string[]>>((acc: Record<string, string[]>, skill: any) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill.name);
        return acc;
    }, {}),
).map(([category, skillNames]) => ({
    name: skillCategoryNames[category] || category,
    icon: skillCategoryIcons[category] || Monitor,
    skills: skillNames,
}));

// Current active module
const activeModule = ref<string>('profile-module');

// Scroll to module
const scrollToModule = (moduleId: string) => {
    const element = document.getElementById(moduleId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        activeModule.value = moduleId;
    }
};
</script>

<template>
    <div class="space-interface relative min-h-screen overflow-y-auto bg-gradient-to-b from-black via-purple-950 to-black">
        <!-- Starfield background -->
        <div class="fixed inset-0 z-0">
            <div class="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-transparent"></div>
            <!-- Animated stars -->
            <div class="absolute top-10 left-20 h-1 w-1 animate-pulse rounded-full bg-white"></div>
            <div class="absolute top-32 right-40 h-2 w-2 animate-pulse rounded-full bg-blue-400" style="animation-delay: 1s"></div>
            <div class="absolute top-64 left-1/3 h-1 w-1 animate-pulse rounded-full bg-white" style="animation-delay: 2s"></div>
            <div class="absolute top-96 right-20 h-1 w-1 animate-pulse rounded-full bg-purple-400" style="animation-delay: 0.5s"></div>
            <div class="absolute bottom-32 left-20 h-2 w-2 animate-pulse rounded-full bg-cyan-400" style="animation-delay: 1.5s"></div>
            <div class="absolute right-1/3 bottom-64 h-1 w-1 animate-pulse rounded-full bg-white" style="animation-delay: 3s"></div>
        </div>

        <!-- Space station navigation -->
        <div class="fixed top-8 left-1/2 z-50 -translate-x-1/2 transform">
            <div class="rounded-2xl border border-purple-400/30 bg-black/80 px-6 py-4 backdrop-blur-lg">
                <div class="mb-2 text-center font-mono text-sm text-purple-400">SPACE STATION NAVIGATOR</div>
                <div class="flex gap-4">
                    <button
                        v-for="module in spaceModules"
                        :key="module.id"
                        @click="scrollToModule(module.id)"
                        class="flex items-center gap-2 rounded-lg px-3 py-2 font-mono text-sm transition-all duration-300"
                        :class="
                            activeModule === module.id
                                ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                                : 'text-purple-300 hover:bg-purple-500/20 hover:text-white'
                        "
                    >
                        <component :is="module.icon" :size="16" />
                        {{ module.title.split(' ')[0] }}
                    </button>
                </div>
            </div>
        </div>

        <!-- Space modules content -->
        <div class="relative z-10 pt-32 pb-20">
            <!-- Profile Module -->
            <section :id="spaceModules[0].id" class="mb-20 flex min-h-screen items-center justify-center px-8">
                <div class="mx-auto max-w-4xl">
                    <div
                        class="rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 p-8 shadow-2xl shadow-cyan-400/20 backdrop-blur-lg"
                    >
                        <div class="mb-8 text-center">
                            <component :is="spaceModules[0].icon" class="mx-auto mb-4 text-cyan-400" :size="48" />
                            <h2 class="mb-2 text-4xl font-bold text-white">{{ spaceModules[0].title }}</h2>
                            <p class="text-cyan-300">{{ spaceModules[0].description }}</p>
                        </div>

                        <div class="grid items-center gap-8 md:grid-cols-2">
                            <div class="text-center">
                                <div class="mx-auto mb-6 h-48 w-48 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 p-2">
                                    <div class="items-cent er flex h-full w-full justify-center overflow-hidden rounded-full bg-gray-800">
                                        <img :src="Foto" alt="Profile" class="h-full w-full rounded-full object-cover" />
                                    </div>
                                </div>
                                <h3 class="mb-2 text-2xl font-bold text-white">Developer Profile</h3>
                                <p class="text-gray-300">Full Stack Developer & Tech Enthusiast</p>
                            </div>

                            <div class="space-y-4">
                                <div class="rounded-xl border border-cyan-400/20 bg-black/40 p-4">
                                    <div class="mb-1 font-mono text-sm text-cyan-400">STATUS</div>
                                    <div class="text-white">Active & Available for Projects</div>
                                </div>
                                <div class="rounded-xl border border-cyan-400/20 bg-black/40 p-4">
                                    <div class="mb-1 font-mono text-sm text-cyan-400">EXPERIENCE</div>
                                    <div class="text-white">1+ Years in Development</div>
                                </div>
                                <div class="rounded-xl border border-cyan-400/20 bg-black/40 p-4">
                                    <div class="mb-1 font-mono text-sm text-cyan-400">SPECIALIZATION</div>
                                    <div class="text-white">Web Applications & Modern UI/UX</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Skills Module -->
            <section :id="spaceModules[1].id" class="mb-20 flex min-h-screen items-center justify-center px-8">
                <div class="mx-auto max-w-6xl">
                    <div
                        class="rounded-3xl border border-green-400/30 bg-gradient-to-br from-green-900/30 to-emerald-900/30 p-8 shadow-2xl shadow-green-400/20 backdrop-blur-lg"
                    >
                        <div class="mb-12 text-center">
                            <component :is="spaceModules[1].icon" class="mx-auto mb-4 text-green-400" :size="48" />
                            <h2 class="mb-2 text-4xl font-bold text-white">{{ spaceModules[1].title }}</h2>
                            <p class="text-green-300">{{ spaceModules[1].description }}</p>
                        </div>

                        <div class="grid gap-8 md:grid-cols-3">
                            <div
                                v-for="category in skillCategories"
                                :key="category.name"
                                class="rounded-xl border border-green-400/20 bg-black/40 p-6 transition-all duration-300 hover:border-green-400/40"
                            >
                                <div class="mb-4 flex items-center gap-3">
                                    <component :is="category.icon" class="text-green-400" :size="24" />
                                    <h3 class="text-xl font-semibold text-white">{{ category.name }}</h3>
                                </div>
                                <div class="space-y-2">
                                    <div
                                        v-for="skill in category.skills"
                                        :key="skill"
                                        class="rounded-lg bg-green-400/10 px-3 py-2 font-mono text-sm text-green-300"
                                    >
                                        {{ skill }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Projects Module -->
            <section :id="spaceModules[2].id" class="mb-20 flex min-h-screen items-center justify-center px-8">
                <div class="mx-auto max-w-7xl">
                    <div
                        class="rounded-3xl border border-pink-400/30 bg-gradient-to-br from-pink-900/30 to-red-900/30 p-8 shadow-2xl shadow-pink-400/20 backdrop-blur-lg"
                    >
                        <div class="mb-12 text-center">
                            <component :is="spaceModules[2].icon" class="mx-auto mb-4 text-pink-400" :size="48" />
                            <h2 class="mb-2 text-4xl font-bold text-white">{{ spaceModules[2].title }}</h2>
                            <p class="text-pink-300">{{ spaceModules[2].description }}</p>
                        </div>

                        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <div
                                v-for="project in props.projects"
                                :key="project.id"
                                class="overflow-hidden rounded-xl border border-pink-400/20 bg-black/40 transition-all duration-300 hover:scale-105 hover:border-pink-400/40"
                            >
                                <div
                                    class="flex h-48 w-full items-center justify-center overflow-hidden rounded-xl border-2 border-pink-400/30 bg-gradient-to-br from-gray-800 to-gray-900"
                                >
                                    <img
                                        v-if="project.image"
                                        :src="project.image"
                                        :alt="project.title"
                                        class="h-full w-full rounded-xl"
                                        loading="lazy"
                                    />
                                </div>
                                <div class="p-6">
                                    <div class="mb-2 flex items-center justify-between">
                                        <h3 class="text-xl font-semibold text-white">{{ project.title }}</h3>
                                        <span class="rounded bg-pink-400/20 px-2 py-1 text-xs text-pink-300">
                                            {{ project.category }}
                                        </span>
                                    </div>
                                    <p class="mb-4 text-sm text-gray-300">{{ project.description }}</p>
                                    <div class="mb-4 flex flex-wrap gap-1">
                                        <span
                                            v-for="tech in project.technologies.slice(0, 15)"
                                            :key="tech"
                                            class="rounded bg-gray-700 px-2 py-1 text-xs text-gray-300"
                                        >
                                            {{ tech }}
                                        </span>
                                    </div>
                                    <div class="flex gap-3">
                                        <a
                                            v-if="project.liveUrl"
                                            :href="project.liveUrl"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            class="flex items-center gap-1 rounded-lg bg-pink-500 px-3 py-2 text-sm text-white transition-colors hover:bg-pink-600"
                                        >
                                            <Eye :size="14" />
                                            View
                                        </a>
                                        <a
                                            v-if="project.githubUrl"
                                            :href="project.githubUrl"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            class="flex items-center gap-1 rounded-lg bg-gray-700 px-3 py-2 text-sm text-white transition-colors hover:bg-gray-600"
                                        >
                                            <Github :size="14" />
                                            Code
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Contact Module -->
            <section :id="spaceModules[3].id" class="mb-20 flex min-h-screen items-center justify-center px-8">
                <div class="mx-auto max-w-4xl">
                    <div
                        class="rounded-3xl border border-yellow-400/30 bg-gradient-to-br from-yellow-900/30 to-orange-900/30 p-8 shadow-2xl shadow-yellow-400/20 backdrop-blur-lg"
                    >
                        <div class="mb-12 text-center">
                            <component :is="spaceModules[3].icon" class="mx-auto mb-4 text-yellow-400" :size="48" />
                            <h2 class="mb-2 text-4xl font-bold text-white">{{ spaceModules[3].title }}</h2>
                            <p class="text-yellow-300">{{ spaceModules[3].description }}</p>
                        </div>

                        <div class="grid gap-8 md:grid-cols-2">
                            <div class="space-y-6">
                                <div class="rounded-xl border border-yellow-400/20 bg-black/40 p-6">
                                    <h3 class="mb-4 text-xl font-semibold text-white">Send Message</h3>
                                    <form class="space-y-4">
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            class="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 text-white focus:border-yellow-400 focus:outline-none"
                                        />
                                        <input
                                            type="email"
                                            placeholder="Your Email"
                                            class="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 text-white focus:border-yellow-400 focus:outline-none"
                                        />
                                        <textarea
                                            placeholder="Your Message"
                                            rows="4"
                                            class="w-full resize-none rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 text-white focus:border-yellow-400 focus:outline-none"
                                        ></textarea>
                                        <button
                                            type="submit"
                                            class="w-full rounded-lg bg-yellow-500 py-3 font-semibold text-black transition-colors hover:bg-yellow-400"
                                        >
                                            Transmit Message
                                        </button>
                                    </form>
                                </div>
                            </div>

                            <div class="space-y-6">
                                <div class="rounded-xl border border-yellow-400/20 bg-black/40 p-6">
                                    <h3 class="mb-4 text-xl font-semibold text-white">Contact Protocols</h3>
                                    <div class="space-y-3">
                                        <div class="flex items-center gap-3">
                                            <Mail class="text-yellow-400" :size="20" />
                                            <span class="text-gray-300">email@example.com</span>
                                        </div>
                                        <div class="flex items-center gap-3">
                                            <Github class="text-yellow-400" :size="20" />
                                            <span class="text-gray-300">github.com/username</span>
                                        </div>
                                        <div class="flex items-center gap-3">
                                            <Zap class="text-yellow-400" :size="20" />
                                            <span class="text-gray-300">Available for projects</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="rounded-xl border border-yellow-400/20 bg-black/40 p-6">
                                    <h3 class="mb-4 text-xl font-semibold text-white">Response Time</h3>
                                    <div class="text-gray-300">
                                        <div class="mb-2">🟢 Online: Usually responds within hours</div>
                                        <div class="mb-2">🟡 Busy: Responds within 24 hours</div>
                                        <div>🔴 Offline: Responds within 2-3 days</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
