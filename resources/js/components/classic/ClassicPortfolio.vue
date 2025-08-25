<script setup lang="ts">
import { usePortfolioData } from '@/composables/usePortfolioData';
import { Briefcase, Code, ExternalLink, Github, Mail, MapPin, User } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';
import LanguageSelector from '../fixedcont/LanguageSelector.vue';

const { personalInfo, projects, skills, contactInfo, skillCategoryNames, sectionTexts } = usePortfolioData();

/**
 * ClassicPortfolio Component
 * Clean, elegant, and professional portfolio layout
 * Minimal design with focus on content and readability
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

// Eliminar props, todo viene del composable

// Navigation state
const activeSection = ref('hero');
const isMenuOpen = ref(false);

// Skills organized by category, con nivel y descripción
const skillCategories = Object.entries(
    skills.reduce<Record<string, any[]>>((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill);
        return acc;
    }, {}),
).map(([category, skillList]) => ({
    name: skillCategoryNames[category as keyof typeof skillCategoryNames] || category,
    skills: skillList,
}));

// Navigation items
const navItems = [
    { id: 'hero', label: sectionTexts.nav.home, icon: User },
    { id: 'about', label: sectionTexts.nav.about, icon: User },
    { id: 'skills', label: sectionTexts.nav.skills, icon: Code },
    { id: 'projects', label: sectionTexts.nav.projects, icon: Briefcase },
    { id: 'contact', label: sectionTexts.nav.contact, icon: Mail },
];

// Scroll to section
const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        activeSection.value = sectionId;
        isMenuOpen.value = false;
    }
};

// Handle scroll to update active section
const handleScroll = () => {
    const sections = navItems.map((item) => item.id);
    const scrollPosition = window.scrollY + 100;

    for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
            const { offsetTop, offsetHeight } = element;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                activeSection.value = sectionId;
                break;
            }
        }
    }
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});
</script>

<template>
    <div class="classic-portfolio -gray-50 bg-white">
        <!-- Language Selector (fixed top right) -->
        <div class="fixed top-4 right-4 z-[60]">
            <LanguageSelector />
        </div>
        <!-- Navigation -->
        <nav class="-50/95 fixed top-0 right-0 left-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-md">
            <div class="mx-auto max-w-6xl px-6">
                <div class="flex h-16 items-center justify-between">
                    <!-- Logo -->
                    <div class="-gray-800 text-xl font-bold text-gray-900">Portfolio</div>

                    <!-- Desktop Navigation -->
                    <div class="hidden items-center space-x-8 md:flex">
                        <button
                            v-for="item in navItems"
                            :key="item.id"
                            @click="scrollToSection(item.id)"
                            class="-gray-900 font-medium text-gray-600 transition-colors hover:text-gray-900"
                            :class="{ '-gray-900 font-semibold text-gray-900': activeSection === item.id }"
                        >
                            {{ item.label }}
                        </button>
                    </div>

                    <!-- Mobile menu button -->
                    <button @click="isMenuOpen = !isMenuOpen" class="-gray-900 p-2 text-gray-600 hover:text-gray-900 md:hidden">
                        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>

                <!-- Mobile Navigation -->
                <div v-if="isMenuOpen" class="-gray-300 border-t border-gray-200 py-4 md:hidden">
                    <button
                        v-for="item in navItems"
                        :key="item.id"
                        @click="scrollToSection(item.id)"
                        class="-gray-100 -gray-900 block w-full px-4 py-2 text-left text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
                        :class="{ 'bg-gray-50 font-semibold text-gray-900': activeSection === item.id }"
                    >
                        {{ item.label }}
                    </button>
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <section id="hero" class="px-6 pt-20 pb-16">
            <div class="mx-auto max-w-6xl text-center">
                <div class="mb-8">
                    <div class="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-gray-200">
                        <img :src="personalInfo.profileImage" alt="Profile" class="h-full w-full rounded-full object-cover" />
                    </div>
                    <h1 class="mb-4 text-4xl font-bold text-gray-900 md:text-6xl">{{ personalInfo.title }}</h1>
                    <p class="mx-auto max-w-2xl text-xl leading-relaxed text-gray-600">
                        {{ personalInfo.bio }}
                    </p>
                </div>
                <div class="flex flex-col justify-center gap-4 sm:flex-row">
                    <button
                        @click="scrollToSection('projects')"
                        class="rounded-lg bg-gray-900 px-8 py-3 font-medium text-white transition-colors hover:bg-gray-800"
                    >
                        View My Work
                    </button>
                    <button
                        @click="scrollToSection('contact')"
                        class="rounded-lg border border-gray-300 px-8 py-3 font-medium text-gray-900 transition-colors hover:bg-gray-50"
                    >
                        Get In Touch
                    </button>
                </div>
            </div>
        </section>

        <!-- About Section -->
        <section id="about" class="bg-gray-100 px-6 py-20">
            <div class="mx-auto max-w-6xl">
                <div class="mb-16 text-center">
                    <h2 class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">{{ sectionTexts.about.sectionTitle }}</h2>
                    <p class="mx-auto max-w-2xl text-lg text-gray-600">
                        {{ sectionTexts.about.sectionDescription }}
                    </p>
                </div>

                <div class="grid items-center gap-12 md:grid-cols-2">
                    <div>
                        <h3 class="mb-4 text-2xl font-semibold text-gray-900">{{ sectionTexts.about.subtitle }}</h3>
                        <p class="mb-6 leading-relaxed text-gray-600">
                            {{ sectionTexts.about.experience }}
                        </p>
                        <p class="mb-6 leading-relaxed text-gray-600">
                            {{ sectionTexts.about.approach }}
                        </p>
                        <div class="grid grid-cols-2 gap-6">
                            <div class="rounded-lg border border-gray-200 bg-white p-4 text-center">
                                <div class="text-2xl font-bold text-gray-900">{{ sectionTexts.about.stats.years }}</div>
                                <div class="text-sm text-gray-600">{{ sectionTexts.about.stats.yearsLabel }}</div>
                            </div>
                            <div class="rounded-lg border border-gray-200 bg-white p-4 text-center">
                                <div class="text-2xl font-bold text-gray-900">{{ sectionTexts.about.stats.projects }}</div>
                                <div class="-gray-700 text-sm text-gray-600">{{ sectionTexts.about.stats.projectsLabel }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="text-center">
                        <div class="mx-auto flex h-80 w-80 items-center justify-center rounded-2xl bg-gray-200">
                            <img :src="personalInfo.profileImage" alt="Profile" class="h-full w-full rounded-full object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Skills Section -->
        <section id="skills" class="px-6 py-20">
            <div class="mx-auto max-w-6xl">
                <div class="mb-16 text-center">
                    <h2 class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">{{ sectionTexts.skills.sectionTitle }}</h2>
                    <p class="mx-auto max-w-2xl text-lg text-gray-600">{{ sectionTexts.skills.sectionDescription }}</p>
                </div>

                <div class="grid gap-8 md:grid-cols-3">
                    <div
                        v-for="category in skillCategories"
                        :key="category.name"
                        class="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg"
                    >
                        <h3 class="mb-4 text-xl font-semibold text-gray-900">{{ category.name }}</h3>
                        <div class="space-y-2">
                            <div
                                v-for="skill in category.skills"
                                :key="skill.name"
                                class="flex items-center justify-between rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700"
                            >
                                <span>{{ skill.name }}</span>
                                <span class="flex-1"></span>
                                <span class="flex h-3 w-24 items-center overflow-hidden rounded-full bg-gray-200">
                                    <span
                                        class="h-full rounded-full bg-gradient-to-r from-green-400 to-green-600"
                                        :style="{ width: skill.level * 20 + '%' }"
                                    ></span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Projects Section -->
        <section id="projects" class="bg-gray-100 px-6 py-20">
            <div class="mx-auto max-w-6xl">
                <div class="mb-16 text-center">
                    <h2 class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">{{ sectionTexts.projects.sectionTitle }}</h2>
                    <p class="mx-auto max-w-2xl text-lg text-gray-600">{{ sectionTexts.projects.sectionDescription }}</p>
                </div>

                <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <div
                        v-for="project in projects"
                        :key="project.id"
                        class="-gray-50 overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg"
                    >
                        <div
                            class="-gray-300 flex h-48 w-full items-center justify-center overflow-hidden rounded-xl border-2 border-gray-200 bg-gray-200"
                        >
                            <img v-if="project.image" :src="project.image" :alt="project.title" class="h-full w-full rounded-xl" />
                            <Briefcase v-else class="h-12 w-12 text-gray-600" />
                        </div>
                        <div class="p-6">
                            <div class="mb-2 flex items-center justify-between">
                                <h3 class="text-xl font-semibold text-gray-900">{{ project.title }}</h3>
                                <span class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600">
                                    {{ project.category }}
                                </span>
                            </div>
                            <p class="mb-4 text-sm leading-relaxed text-gray-600">{{ project.description }}</p>
                            <div class="mb-4 flex flex-wrap gap-2">
                                <span
                                    v-for="tech in project.technologies.slice(0, 15)"
                                    :key="tech"
                                    class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600"
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
                                    class="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm text-white transition-colors hover:bg-gray-800"
                                >
                                    <ExternalLink :size="14" />
                                    Live Demo
                                </a>
                                <a
                                    v-if="project.githubUrl"
                                    :href="project.githubUrl"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                                >
                                    <Github :size="14" />
                                    Source
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Contact Section -->
        <section id="contact" class="px-6 py-20">
            <div class="mx-auto max-w-4xl">
                <div class="mb-16 text-center">
                    <h2 class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">{{ sectionTexts.contact.sectionTitle }}</h2>
                    <p class="mx-auto max-w-2xl text-lg text-gray-600">{{ sectionTexts.contact.sectionDescription }}</p>
                </div>

                <div class="grid gap-12 md:grid-cols-2">
                    <div>
                        <h3 class="mb-6 text-xl font-semibold text-gray-900">{{ sectionTexts.contact.form.send }}</h3>
                        <form class="space-y-6">
                            <div>
                                <label class="mb-2 block text-sm font-medium text-gray-700">{{ sectionTexts.contact.form.name }}</label>
                                <input
                                    type="text"
                                    class="-gray-400 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-transparent focus:ring-2 focus:ring-gray-500"
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label class="mb-2 block text-sm font-medium text-gray-700">{{ sectionTexts.contact.form.email }}</label>
                                <input
                                    type="email"
                                    class="-gray-400 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-transparent focus:ring-2 focus:ring-gray-500"
                                    placeholder="your.email@example.com"
                                />
                            </div>
                            <div>
                                <label class="mb-2 block text-sm font-medium text-gray-700">{{ sectionTexts.contact.form.message }}</label>
                                <textarea
                                    rows="5"
                                    class="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-transparent focus:ring-2 focus:ring-gray-500"
                                    placeholder="Tell me about your project..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                class="-gray-700 w-full rounded-lg bg-gray-900 py-3 font-medium text-white transition-colors hover:bg-gray-800"
                            >
                                {{ sectionTexts.contact.form.send }}
                            </button>
                        </form>
                    </div>

                    <div>
                        <h3 class="mb-6 text-xl font-semibold text-gray-900">{{ sectionTexts.contact.infoTitle }}</h3>
                        <div class="space-y-4">
                            <div class="flex items-center gap-4">
                                <Mail class="h-5 w-5 text-gray-600" />
                                <span class="text-gray-600">{{ contactInfo.email }}</span>
                            </div>
                            <div class="flex items-center gap-4">
                                <Github class="h-5 w-5 text-gray-600" />
                                <span class="text-gray-600">{{ contactInfo.github }}</span>
                            </div>
                            <div class="flex items-center gap-4">
                                <MapPin class="h-5 w-5 text-gray-600" />
                                <span class="text-gray-600">Available worldwide</span>
                            </div>
                        </div>

                        <div class="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-6">
                            <h4 class="mb-2 font-semibold text-gray-900">{{ sectionTexts.contact.responseBox.title }}</h4>
                            <p class="text-sm text-gray-600">
                                {{ sectionTexts.contact.responseBox.description }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="border-t border-gray-200 bg-gray-100 px-6 py-8">
            <div class="mx-auto max-w-6xl text-center">
                <p class="text-gray-600">{{ sectionTexts.footer.copyright }}</p>
            </div>
        </footer>
    </div>
</template>
