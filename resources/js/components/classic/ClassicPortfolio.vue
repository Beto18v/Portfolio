<script setup lang="ts">
import { translationInstance } from '@/composables/translationInstance';
import { usePortfolioData } from '@/composables/usePortfolioData';
import { Briefcase, Code, ExternalLink, Github, Mail, MapPin, User } from 'lucide-vue-next';
import { computed, onMounted, ref } from 'vue';
import LanguageSelector from '../fixedcont/LanguageSelector.vue';

const { projects, skills, skillCategoryNames } = usePortfolioData();
const { t } = translationInstance;

const personalInfo = computed(() => ({
    name: t('personal.name', 'Nicolas Valenzuela'),
    title: t('personal.title', 'Full Stack Developer'),
    bio: t(
        'personal.bio',
        'Innovative Digital Solutions Creator. Passionate developer with expertise in modern web technologies, creating efficient and scalable applications.',
    ),
    location: t('personal.location', 'Madrid, Spain'),
    email: t('personal.email', 'contact@portfolio.dev'),
    phone: t('personal.phone', '+57 310 207 9572'),
    website: t('personal.website', 'https://portfolio.dev'),
    github: t('personal.github', 'https://github.com/beto18v'),
    linkedin: t('personal.linkedin', 'https://linkedin.com/in/beto18v'),
    profileImage: t('personal.profileImage', '/Foto.png'),
}));

const sectionTexts = computed(() => ({
    nav: {
        home: t('nav.home', 'Home'),
        about: t('nav.about', 'About'),
        skills: t('nav.skills', 'Skills'),
        projects: t('nav.projects', 'Projects'),
        contact: t('nav.contact', 'Contact'),
        logo: t('nav.logo', 'Portfolio'),
    },
    about: {
        sectionTitle: t('about.sectionTitle', 'About Me'),
        sectionDescription: t('about.sectionDescription', 'Learn more about my background, experience, and what drives my passion for development.'),
        subtitle: t('about.subtitle', "Hello, I'm a Developer"),
        experience: t(
            'about.experience',
            'With over 1 year of experience in web development, I specialize in creating modern, responsive, and user-friendly applications. I enjoy working with both frontend and backend technologies to deliver complete solutions.',
        ),
        approach: t(
            'about.approach',
            'My approach combines technical expertise with creative problem-solving to build applications that not only function well but also provide excellent user experiences.',
        ),
        stats: {
            years: t('about.stats.years', '1+'),
            yearsLabel: t('about.stats.yearsLabel', 'Years Experience'),
            projects: t('about.stats.projects', projects.value.length.toString() + '+'),
            projectsLabel: t('about.stats.projectsLabel', 'Projects Completed'),
        },
    },
    skills: {
        sectionTitle: t('skills.sectionTitle', 'Skills & Expertise'),
        sectionDescription: t('skills.sectionDescription', 'Technologies and tools I use to bring ideas to life.'),
    },
    projects: {
        sectionTitle: t('projects.sectionTitle', 'Featured Projects'),
        sectionDescription: t('projects.sectionDescription', 'A selection of projects that showcase my skills and experience.'),
        viewMyWork: t('projects.viewMyWork', 'View My Work'),
    },
    contact: {
        sectionTitle: t('contact.sectionTitle', 'Get In Touch'),
        sectionDescription: t('contact.sectionDescription', "Ready to start a project or just want to chat? I'd love to hear from you."),
        form: {
            name: t('contact.form.name', 'Name'),
            email: t('contact.form.email', 'Email'),
            message: t('contact.form.message', 'Message'),
            send: t('contact.form.send', 'Send Message'),
            namePlaceholder: t('contact.form.namePlaceholder', 'Your name'),
            emailPlaceholder: t('contact.form.emailPlaceholder', 'your.email@example.com'),
            messagePlaceholder: t('contact.form.messagePlaceholder', 'Tell me about your project...'),
        },
        infoTitle: t('contact.infoTitle', 'Contact Information'),
        availableWorldwide: t('contact.availableWorldwide', 'Available worldwide'),
        responseBox: {
            title: t('contact.responseBox.title', 'Response Time'),
            description: t(
                'contact.responseBox.description',
                'I typically respond to messages within 24 hours. For urgent matters, please mention it in your message.',
            ),
        },
    },
    footer: {
        copyright: t('footer.copyright', '© 2025 Portfolio. Built with Vue.js and Tailwind CSS.'),
    },
}));

const contactInfo = computed(() => ({
    email: personalInfo.value.email,
    github: personalInfo.value.github,
    linkedin: personalInfo.value.linkedin,
    phone: personalInfo.value.phone,
    location: personalInfo.value.location,
    website: personalInfo.value.website,
}));

/**
 * ClassicPortfolio Component
 * Clean, elegant, and professional portfolio layout
 * Minimal design with focus on content and readability
 */

// Navigation state
const activeSection = ref('hero');
const isMenuOpen = ref(false);

// Skills organized by category, con nivel y descripción
const skillCategories = computed(() =>
    Object.entries(
        skills.reduce<Record<string, any[]>>((acc, skill) => {
            if (!acc[skill.category]) acc[skill.category] = [];
            acc[skill.category].push(skill);
            return acc;
        }, {}),
    ).map(([category, skillList]) => ({
        name: t(`skills.category.${category}`, skillCategoryNames[category as keyof typeof skillCategoryNames] || category),
        skills: skillList,
    })),
);

// Navigation items
const navItems = computed(() => [
    { id: 'hero', label: t('nav.home', sectionTexts.value.nav.home), icon: User },
    { id: 'about', label: t('nav.about', sectionTexts.value.nav.about), icon: User },
    { id: 'skills', label: t('nav.skills', sectionTexts.value.nav.skills), icon: Code },
    { id: 'projects', label: t('nav.projects', sectionTexts.value.nav.projects), icon: Briefcase },
    { id: 'contact', label: t('nav.contact', sectionTexts.value.nav.contact), icon: Mail },
]);

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
    const sections = navItems.value.map((item: any) => item.id);
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
                    <div class="-gray-800 text-xl font-bold text-gray-900">{{ sectionTexts.nav.logo }}</div>

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
                        {{ sectionTexts.projects.viewMyWork }}
                    </button>
                    <button
                        @click="scrollToSection('contact')"
                        class="rounded-lg border border-gray-300 px-8 py-3 font-medium text-gray-900 transition-colors hover:bg-gray-50"
                    >
                        {{ sectionTexts.contact.sectionTitle }}
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
                        class="-gray-50 flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg"
                    >
                        <div
                            class="-gray-300 flex h-48 w-full items-center justify-center overflow-hidden rounded-xl border-2 border-gray-200 bg-gray-200"
                        >
                            <img v-if="project.image" :src="project.image" :alt="project.title" class="h-full w-full rounded-xl" />
                            <Briefcase v-else class="h-12 w-12 text-gray-600" />
                        </div>
                        <div class="flex flex-1 flex-col p-6">
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
                            <div class="flex-1"></div>
                            <div class="mt-4 flex gap-3">
                                <a
                                    v-if="project.liveUrl"
                                    :href="project.liveUrl"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm text-white transition-colors hover:bg-gray-800"
                                >
                                    <ExternalLink :size="14" />
                                    {{ t('projects.liveDemo', 'Live Demo') }}
                                </a>
                                <a
                                    v-if="project.githubUrl"
                                    :href="project.githubUrl"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                                >
                                    <Github :size="14" />
                                    {{ t('projects.source', 'Source') }}
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
                                    class="-gray-400 w-full rounded-lg border border-gray-300 px-4 py-3 text-black outline-none focus:border-transparent focus:ring-2 focus:ring-gray-500"
                                    :placeholder="sectionTexts.contact.form.namePlaceholder"
                                />
                            </div>
                            <div>
                                <label class="mb-2 block text-sm font-medium text-gray-700">{{ sectionTexts.contact.form.email }}</label>
                                <input
                                    type="email"
                                    class="-gray-400 w-full rounded-lg border border-gray-300 px-4 py-3 text-black outline-none focus:border-transparent focus:ring-2 focus:ring-gray-500"
                                    :placeholder="sectionTexts.contact.form.emailPlaceholder"
                                />
                            </div>
                            <div>
                                <label class="mb-2 block text-sm font-medium text-gray-700">{{ sectionTexts.contact.form.message }}</label>
                                <textarea
                                    rows="5"
                                    class="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-black outline-none focus:border-transparent focus:ring-2 focus:ring-gray-500"
                                    :placeholder="sectionTexts.contact.form.messagePlaceholder"
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
                                <span class="text-gray-600">{{ sectionTexts.contact.availableWorldwide }}</span>
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
