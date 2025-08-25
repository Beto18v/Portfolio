<script setup lang="ts">
import { ChevronDown, Globe } from 'lucide-vue-next';
import { computed, onMounted, ref } from 'vue';
import { useTranslation, type Language } from '../../composables/useTranslation';
import { portfolioTranslations } from '../../data/translations';

/**
 * Language Selector Component
 * Provides a dropdown interface for switching between supported languages
 * Features smooth transitions and persists language preference
 */

// Initialize translation system
const { language, setLanguage, t, loadTranslations, initializeLanguage } = useTranslation();

// Dropdown state
const isOpen = ref(false);

// Language configuration with display names and flags
const languages = [
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
    { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
    { code: 'zh' as Language, name: '中文', flag: '🇨🇳' },
];

// Computed property for current language display
const currentLanguageData = computed(() => languages.find((lang) => lang.code === language.value));

/**
 * Handle language selection
 * @param langCode - The selected language code
 */
const selectLanguage = (langCode: Language) => {
    setLanguage(langCode);
    isOpen.value = false;
};

/**
 * Toggle dropdown
 */
const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
};

/**
 * Close dropdown when clicking outside
 */
const closeDropdown = (event: Event) => {
    const target = event.target as HTMLElement;
    const dropdown = target.closest('.language-selector');
    if (!dropdown) {
        isOpen.value = false;
    }
};

// Initialize on component mount
onMounted(() => {
    loadTranslations(portfolioTranslations);
    initializeLanguage();

    // Listen for clicks outside to close dropdown
    document.addEventListener('click', closeDropdown);
});
</script>

<template>
    <div class="language-selector relative">
        <!-- Language selector button -->
        <button
            @click="toggleDropdown"
            class="flex items-center gap-2 rounded-lg border border-cyan-400/30 bg-black/50 px-3 py-2 text-sm font-medium text-cyan-400 backdrop-blur-sm transition-colors duration-200 hover:bg-cyan-400/20 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:outline-none"
            :aria-label="t('language.select')"
        >
            <!-- Globe icon -->
            <Globe :size="16" class="text-cyan-400" />

            <!-- Current language flag and name -->
            <span class="flex items-center gap-1.5">
                <span class="text-base">{{ currentLanguageData?.flag }}</span>
                <span class="hidden text-cyan-400 sm:inline">{{ currentLanguageData?.name }}</span>
            </span>

            <!-- Dropdown arrow -->
            <ChevronDown :size="14" class="text-cyan-400 transition-transform duration-200" :class="{ 'rotate-180': isOpen }" />
        </button>

        <!-- Dropdown menu -->
        <Transition name="dropdown">
            <div
                v-if="isOpen"
                class="absolute top-full right-0 z-50 mt-2 w-48 rounded-lg border border-cyan-400/40 bg-black/90 shadow-2xl shadow-cyan-400/20 backdrop-blur-lg"
            >
                <div class="p-1">
                    <!-- Language options -->
                    <button
                        v-for="lang in languages"
                        :key="lang.code"
                        @click="selectLanguage(lang.code)"
                        class="flex w-full items-center gap-3 rounded px-3 py-2 text-left text-sm transition-colors duration-150 hover:bg-cyan-400/20"
                        :class="{
                            'bg-cyan-400/10 text-cyan-400': language === lang.code,
                            'text-gray-300': language !== lang.code,
                        }"
                    >
                        <!-- Language flag -->
                        <span class="text-base">{{ lang.flag }}</span>

                        <!-- Language name -->
                        <span class="flex-1">{{ lang.name }}</span>

                        <!-- Current language indicator -->
                        <div v-if="language === lang.code" class="h-2 w-2 rounded-full bg-cyan-400"></div>
                    </button>
                </div>
            </div>
        </Transition>
    </div>
</template>
