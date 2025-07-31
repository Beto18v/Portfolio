<script setup lang="ts">
import { useTranslation } from '@/composables/useTranslation';
import { Briefcase, Code, Home, Mail, Menu, User, X } from 'lucide-vue-next';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import LanguageSelector from './LanguageSelector.vue';

/**
 * Navigation Component
 * Responsive navigation with mobile menu, smooth scrolling, and language selection
 * Features active section highlighting and smooth animations
 */

const { t } = useTranslation();

// Component state
const isMenuOpen = ref(false);
const activeSection = ref('home');
const isScrolled = ref(false);

// Navigation items configuration
const navItems = computed(() => [
    {
        key: 'home',
        label: t('nav.home'),
        href: '#home',
        icon: Home,
    },
    {
        key: 'about',
        label: t('nav.about'),
        href: '#about',
        icon: User,
    },
    {
        key: 'skills',
        label: t('nav.skills'),
        href: '#skills',
        icon: Code,
    },
    {
        key: 'projects',
        label: t('nav.projects'),
        href: '#projects',
        icon: Briefcase,
    },
    {
        key: 'contact',
        label: t('nav.contact'),
        href: '#contact',
        icon: Mail,
    },
]);

/**
 * Toggle mobile menu
 */
const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;

    // Prevent body scroll when menu is open
    if (isMenuOpen.value) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
};

/**
 * Close mobile menu
 */
const closeMenu = () => {
    isMenuOpen.value = false;
    document.body.style.overflow = 'auto';
};

/**
 * Smooth scroll to section
 * @param href - Section anchor href
 */
const scrollToSection = (href: string) => {
    const elementId = href.replace('#', '');
    const element = document.getElementById(elementId);

    if (element) {
        // Close mobile menu if open
        closeMenu();

        // Smooth scroll to element
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });

        // Update active section
        activeSection.value = elementId;
    }
};

/**
 * Handle scroll events to update active section and navbar style
 */
const handleScroll = () => {
    // Update navbar background based on scroll position
    isScrolled.value = window.scrollY > 50;

    // Find current active section
    const sections = navItems.value.map((item) => item.key);
    const scrollPosition = window.scrollY + 100; // Offset for better UX

    for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
            const offsetTop = element.offsetTop;
            const offsetHeight = element.offsetHeight;

            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                activeSection.value = sectionId;
                break;
            }
        }
    }
};

/**
 * Handle click outside mobile menu to close it
 * @param event - Click event
 */
const handleClickOutside = (event: Event) => {
    const target = event.target as HTMLElement;
    const mobileMenu = document.getElementById('mobile-menu');
    const menuButton = document.getElementById('menu-button');

    if (isMenuOpen.value && mobileMenu && !mobileMenu.contains(target) && menuButton && !menuButton.contains(target)) {
        closeMenu();
    }
};

// Lifecycle hooks
onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);

    // Set initial active section
    handleScroll();
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
    document.removeEventListener('click', handleClickOutside);
    document.body.style.overflow = 'auto';
});
</script>

<template>
    <nav
        class="fixed top-0 right-0 left-0 z-50 transition-all duration-300"
        :class="[
            isScrolled
                ? 'border-b border-gray-200 bg-white/90 shadow-lg backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/90'
                : 'bg-transparent',
        ]"
    >
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex h-16 items-center justify-between lg:h-20">
                <!-- Logo / Brand -->
                <div class="flex-shrink-0">
                    <button
                        @click="scrollToSection('#home')"
                        class="rounded-lg px-2 py-1 text-xl font-bold text-gray-900 transition-colors duration-200 hover:text-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none lg:text-2xl dark:text-white dark:hover:text-blue-400"
                    >
                        <span class="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"> Portfolio </span>
                    </button>
                </div>

                <!-- Desktop Navigation -->
                <div class="hidden lg:flex lg:items-center lg:space-x-8">
                    <div class="flex space-x-1">
                        <a
                            v-for="item in navItems"
                            :key="item.key"
                            @click.prevent="scrollToSection(item.href)"
                            :href="item.href"
                            class="relative cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:hover:bg-gray-800"
                            :class="[
                                activeSection === item.key
                                    ? 'text-blue-600 dark:text-blue-400'
                                    : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white',
                            ]"
                        >
                            {{ item.label }}

                            <!-- Active indicator -->
                            <div
                                v-if="activeSection === item.key"
                                class="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 transform animate-pulse rounded-full bg-blue-500"
                            ></div>
                        </a>
                    </div>

                    <!-- Language Selector -->
                    <div class="ml-4">
                        <LanguageSelector />
                    </div>
                </div>

                <!-- Mobile menu button -->
                <div class="flex items-center gap-3 lg:hidden">
                    <!-- Mobile Language Selector -->
                    <LanguageSelector />

                    <!-- Menu Toggle Button -->
                    <button
                        id="menu-button"
                        @click="toggleMenu"
                        class="rounded-lg p-2 text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                        :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
                    >
                        <Menu v-if="!isMenuOpen" :size="24" />
                        <X v-else :size="24" />
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile Menu -->
        <div
            id="mobile-menu"
            class="fixed inset-x-0 top-16 transform border-t border-gray-200 bg-white shadow-lg transition-transform duration-300 lg:hidden dark:border-gray-700 dark:bg-gray-900"
            :class="[isMenuOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-full opacity-0']"
        >
            <div class="space-y-1 px-4 py-6">
                <a
                    v-for="item in navItems"
                    :key="`mobile-${item.key}`"
                    @click.prevent="scrollToSection(item.href)"
                    :href="item.href"
                    class="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    :class="[
                        activeSection === item.key
                            ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white',
                    ]"
                >
                    <component :is="item.icon" :size="20" />
                    {{ item.label }}

                    <!-- Mobile active indicator -->
                    <div v-if="activeSection === item.key" class="ml-auto h-2 w-2 rounded-full bg-blue-500"></div>
                </a>
            </div>
        </div>

        <!-- Mobile menu overlay -->
        <div v-if="isMenuOpen" class="fixed inset-0 top-16 z-40 bg-black/20 backdrop-blur-sm lg:hidden" @click="closeMenu"></div>
    </nav>
</template>

<style scoped>
/* Smooth scrolling for the entire page */
html {
    scroll-behavior: smooth;
}

/* Custom animation for mobile menu */
@keyframes slideDown {
    from {
        transform: translateY(-100%);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes slideUp {
    from {
        transform: translateY(0);
        opacity: 1;
    }
    to {
        transform: translateY(-100%);
        opacity: 0;
    }
}

/* Ensure proper z-index stacking */
.z-50 {
    z-index: 50;
}
</style>
