<script setup lang="ts">
import { useTranslation } from '@/composables/useTranslation';
import { Briefcase, Code, ExternalLink, Github, Mail, MapPin, User } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';

/**
 * ClassicPortfolio Component
 * Clean, elegant, and professional portfolio layout
 * Minimal design with focus on content and readability
 */

const { t } = useTranslation();

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

interface Props {
    projects?: Project[];
    skills?: any[];
    profileData?: any;
}

const props = withDefaults(defineProps<Props>(), {
    projects: () => [],
    skills: () => [],
});

// Navigation state
const activeSection = ref('hero');
const isMenuOpen = ref(false);

// Skills organized by category
const skillCategories = [
    {
        name: 'Frontend',
        skills: ['Vue.js', 'React', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3'],
        color: 'blue',
    },
    {
        name: 'Backend',
        skills: ['Laravel', 'Node.js', 'PHP', 'MySQL', 'PostgreSQL', 'Redis'],
        color: 'green',
    },
    {
        name: 'Tools & DevOps',
        skills: ['Git', 'Docker', 'Linux', 'AWS', 'Vite', 'Webpack'],
        color: 'purple',
    },
];

// Navigation items
const navItems = [
    { id: 'hero', label: 'Home', icon: User },
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Mail },
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

// Format date
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
    });
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
    <div class="classic-portfolio bg-white dark:bg-gray-50">
        <!-- Navigation -->
        <nav class="fixed top-0 right-0 left-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-md dark:border-gray-300 dark:bg-gray-50/95">
            <div class="mx-auto max-w-6xl px-6">
                <div class="flex h-16 items-center justify-between">
                    <!-- Logo -->
                    <div class="text-xl font-bold text-gray-900 dark:text-gray-800">Portfolio</div>

                    <!-- Desktop Navigation -->
                    <div class="hidden items-center space-x-8 md:flex">
                        <button
                            v-for="item in navItems"
                            :key="item.id"
                            @click="scrollToSection(item.id)"
                            class="font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-700 dark:hover:text-gray-900"
                            :class="{ 'font-semibold text-gray-900 dark:text-gray-900': activeSection === item.id }"
                        >
                            {{ item.label }}
                        </button>
                    </div>

                    <!-- Mobile menu button -->
                    <button
                        @click="isMenuOpen = !isMenuOpen"
                        class="p-2 text-gray-600 hover:text-gray-900 md:hidden dark:text-gray-700 dark:hover:text-gray-900"
                    >
                        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>

                <!-- Mobile Navigation -->
                <div v-if="isMenuOpen" class="border-t border-gray-200 py-4 md:hidden dark:border-gray-300">
                    <button
                        v-for="item in navItems"
                        :key="item.id"
                        @click="scrollToSection(item.id)"
                        class="block w-full px-4 py-2 text-left text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-700 dark:hover:bg-gray-100 dark:hover:text-gray-900"
                        :class="{ 'bg-gray-50 font-semibold text-gray-900 dark:bg-gray-100 dark:text-gray-900': activeSection === item.id }"
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
                    <div class="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-300">
                        <User class="h-16 w-16 text-gray-600 dark:text-gray-700" />
                    </div>
                    <h1 class="mb-4 text-4xl font-bold text-gray-900 md:text-6xl dark:text-gray-800">Full Stack Developer</h1>
                    <p class="mx-auto max-w-2xl text-xl leading-relaxed text-gray-600 dark:text-gray-700">
                        Passionate about creating beautiful, functional, and user-friendly web applications with modern technologies and best
                        practices.
                    </p>
                </div>
                <div class="flex flex-col justify-center gap-4 sm:flex-row">
                    <button
                        @click="scrollToSection('projects')"
                        class="rounded-lg bg-gray-900 px-8 py-3 font-medium text-white transition-colors hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                        View My Work
                    </button>
                    <button
                        @click="scrollToSection('contact')"
                        class="rounded-lg border border-gray-300 px-8 py-3 font-medium text-gray-900 transition-colors hover:bg-gray-50 dark:border-gray-400 dark:text-gray-800 dark:hover:bg-gray-100"
                    >
                        Get In Touch
                    </button>
                </div>
            </div>
        </section>

        <!-- About Section -->
        <section id="about" class="bg-gray-50 px-6 py-20 dark:bg-white">
            <div class="mx-auto max-w-6xl">
                <div class="mb-16 text-center">
                    <h2 class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-gray-800">About Me</h2>
                    <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-700">
                        Learn more about my background, experience, and what drives my passion for development.
                    </p>
                </div>

                <div class="grid items-center gap-12 md:grid-cols-2">
                    <div>
                        <h3 class="mb-4 text-2xl font-semibold text-gray-900 dark:text-gray-800">Hello, I'm a Developer</h3>
                        <p class="mb-6 leading-relaxed text-gray-600 dark:text-gray-700">
                            With over 3 years of experience in web development, I specialize in creating modern, responsive, and user-friendly
                            applications. I enjoy working with both frontend and backend technologies to deliver complete solutions.
                        </p>
                        <p class="mb-6 leading-relaxed text-gray-600 dark:text-gray-700">
                            My approach combines technical expertise with creative problem-solving to build applications that not only function well
                            but also provide excellent user experiences.
                        </p>
                        <div class="grid grid-cols-2 gap-6">
                            <div class="rounded-lg border border-gray-200 bg-white p-4 text-center dark:border-gray-300 dark:bg-gray-50">
                                <div class="text-2xl font-bold text-gray-900 dark:text-gray-800">3+</div>
                                <div class="text-sm text-gray-600 dark:text-gray-700">Years Experience</div>
                            </div>
                            <div class="rounded-lg border border-gray-200 bg-white p-4 text-center dark:border-gray-300 dark:bg-gray-50">
                                <div class="text-2xl font-bold text-gray-900 dark:text-gray-800">25+</div>
                                <div class="text-sm text-gray-600 dark:text-gray-700">Projects Completed</div>
                            </div>
                        </div>
                    </div>
                    <div class="text-center">
                        <div class="mx-auto flex h-80 w-80 items-center justify-center rounded-2xl bg-gray-200 dark:bg-gray-300">
                            <User class="h-32 w-32 text-gray-600 dark:text-gray-700" />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Skills Section -->
        <section id="skills" class="px-6 py-20">
            <div class="mx-auto max-w-6xl">
                <div class="mb-16 text-center">
                    <h2 class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-gray-800">Skills & Expertise</h2>
                    <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-700">Technologies and tools I use to bring ideas to life.</p>
                </div>

                <div class="grid gap-8 md:grid-cols-3">
                    <div
                        v-for="category in skillCategories"
                        :key="category.name"
                        class="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg dark:border-gray-300 dark:bg-gray-50"
                    >
                        <h3 class="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-800">{{ category.name }}</h3>
                        <div class="space-y-2">
                            <div
                                v-for="skill in category.skills"
                                :key="skill"
                                class="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 dark:bg-white dark:text-gray-800"
                            >
                                {{ skill }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Projects Section -->
        <section id="projects" class="bg-gray-50 px-6 py-20 dark:bg-white">
            <div class="mx-auto max-w-6xl">
                <div class="mb-16 text-center">
                    <h2 class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-gray-800">Featured Projects</h2>
                    <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-700">
                        A selection of projects that showcase my skills and experience.
                    </p>
                </div>

                <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <div
                        v-for="project in props.projects"
                        :key="project.id"
                        class="overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg dark:border-gray-300 dark:bg-gray-50"
                    >
                        <div class="flex h-48 items-center justify-center bg-gray-200 dark:bg-gray-300">
                            <Briefcase class="h-12 w-12 text-gray-600 dark:text-gray-700" />
                        </div>
                        <div class="p-6">
                            <div class="mb-2 flex items-center justify-between">
                                <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-800">{{ project.title }}</h3>
                                <span class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-white dark:text-gray-700">
                                    {{ project.category }}
                                </span>
                            </div>
                            <p class="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-700">{{ project.description }}</p>
                            <div class="mb-4 flex flex-wrap gap-2">
                                <span
                                    v-for="tech in project.technologies.slice(0, 3)"
                                    :key="tech"
                                    class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-white dark:text-gray-700"
                                >
                                    {{ tech }}
                                </span>
                                <span v-if="project.technologies.length > 3" class="text-xs text-gray-500 dark:text-gray-600">
                                    +{{ project.technologies.length - 3 }} more
                                </span>
                            </div>
                            <div class="flex gap-3">
                                <button
                                    v-if="project.liveUrl"
                                    class="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm text-white transition-colors hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700"
                                >
                                    <ExternalLink :size="14" />
                                    Live Demo
                                </button>
                                <button
                                    v-if="project.githubUrl"
                                    class="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-400 dark:text-gray-800 dark:hover:bg-gray-100"
                                >
                                    <Github :size="14" />
                                    Source
                                </button>
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
                    <h2 class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-gray-800">Get In Touch</h2>
                    <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-700">
                        Ready to start a project or just want to chat? I'd love to hear from you.
                    </p>
                </div>

                <div class="grid gap-12 md:grid-cols-2">
                    <div>
                        <h3 class="mb-6 text-xl font-semibold text-gray-900 dark:text-gray-800">Send a Message</h3>
                        <form class="space-y-6">
                            <div>
                                <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-800">Name</label>
                                <input
                                    type="text"
                                    class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-transparent focus:ring-2 focus:ring-gray-500 dark:border-gray-400"
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-800">Email</label>
                                <input
                                    type="email"
                                    class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-transparent focus:ring-2 focus:ring-gray-500 dark:border-gray-400"
                                    placeholder="your.email@example.com"
                                />
                            </div>
                            <div>
                                <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-800">Message</label>
                                <textarea
                                    rows="5"
                                    class="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-transparent focus:ring-2 focus:ring-gray-500 dark:border-gray-400"
                                    placeholder="Tell me about your project..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                class="w-full rounded-lg bg-gray-900 py-3 font-medium text-white transition-colors hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    <div>
                        <h3 class="mb-6 text-xl font-semibold text-gray-900 dark:text-gray-800">Contact Information</h3>
                        <div class="space-y-4">
                            <div class="flex items-center gap-4">
                                <Mail class="h-5 w-5 text-gray-600 dark:text-gray-700" />
                                <span class="text-gray-600 dark:text-gray-700">hello@example.com</span>
                            </div>
                            <div class="flex items-center gap-4">
                                <Github class="h-5 w-5 text-gray-600 dark:text-gray-700" />
                                <span class="text-gray-600 dark:text-gray-700">github.com/username</span>
                            </div>
                            <div class="flex items-center gap-4">
                                <MapPin class="h-5 w-5 text-gray-600 dark:text-gray-700" />
                                <span class="text-gray-600 dark:text-gray-700">Available worldwide</span>
                            </div>
                        </div>

                        <div class="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-300 dark:bg-white">
                            <h4 class="mb-2 font-semibold text-gray-900 dark:text-gray-800">Response Time</h4>
                            <p class="text-sm text-gray-600 dark:text-gray-700">
                                I typically respond to messages within 24 hours. For urgent matters, please mention it in your message.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="border-t border-gray-200 bg-gray-50 px-6 py-8 dark:border-gray-300 dark:bg-white">
            <div class="mx-auto max-w-6xl text-center">
                <p class="text-gray-600 dark:text-gray-700">© 2025 Portfolio. Built with Vue.js and Tailwind CSS.</p>
            </div>
        </footer>
    </div>
</template>

<style scoped>
.classic-portfolio {
    scroll-behavior: smooth;
}

/* Custom focus styles */
.classic-portfolio input:focus,
.classic-portfolio textarea:focus {
    box-shadow: 0 0 0 3px rgba(75, 85, 99, 0.1);
}
</style>
