<script setup lang="ts">
import { useTranslation, type Language } from '@/composables/useTranslation';
import { portfolioTranslations } from '@/data/translations';
import { ChevronDown, Globe } from 'lucide-vue-next';
import { computed, onMounted } from 'vue';

/**
 * Language Selector Component
 * Provides a dropdown interface for switching between supported languages
 * Features smooth transitions and persists language preference
 */

// Initialize translation system
const { language, setLanguage, t, loadTranslations, initializeLanguage } = useTranslation();

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
};

// Initialize on component mount
onMounted(() => {
    loadTranslations(portfolioTranslations);
    initializeLanguage();
});
</script>

<template>
    <div class="group relative">
        <!-- Language selector button -->
        <button
            class="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:border-gray-300 hover:text-gray-900 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-white"
            :aria-label="t('language.select')"
        >
            <!-- Globe icon -->
            <Globe :size="16" class="text-gray-500 dark:text-gray-400" />

            <!-- Current language flag and name -->
            <span class="flex items-center gap-1.5">
                <span class="text-base">{{ currentLanguageData?.flag }}</span>
                <span class="hidden sm:inline">{{ currentLanguageData?.name }}</span>
            </span>

            <!-- Dropdown arrow -->
            <ChevronDown :size="14" class="text-gray-400 transition-transform duration-200 group-hover:rotate-180" />
        </button>

        <!-- Dropdown menu -->
        <div
            class="invisible absolute top-full right-0 z-50 mt-2 w-48 scale-95 transform rounded-lg border border-gray-200 bg-white opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:scale-100 group-hover:opacity-100 dark:border-gray-700 dark:bg-gray-800"
        >
            <div class="p-1">
                <!-- Language options -->
                <button
                    v-for="lang in languages"
                    :key="lang.code"
                    @click="selectLanguage(lang.code)"
                    class="flex w-full items-center gap-3 rounded px-3 py-2 text-left text-sm text-gray-700 transition-colors duration-150 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    :class="{
                        'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300': language === lang.code,
                    }"
                >
                    <!-- Language flag -->
                    <span class="text-base">{{ lang.flag }}</span>

                    <!-- Language name -->
                    <span class="flex-1">{{ lang.name }}</span>

                    <!-- Current language indicator -->
                    <div v-if="language === lang.code" class="h-2 w-2 rounded-full bg-blue-500"></div>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Additional hover styles for better UX */
.group:hover .group-hover\:opacity-100 {
    pointer-events: auto;
}

.group .group-hover\:opacity-100 {
    pointer-events: none;
}
</style>
