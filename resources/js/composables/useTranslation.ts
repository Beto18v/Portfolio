import { computed, ref } from 'vue';

// Types for translation system
export type Language = 'en' | 'es' | 'zh';

export interface TranslationData {
    en: Record<string, string>;
    es: Record<string, string>;
    zh: Record<string, string>;
}

// Global reactive state for current language
const currentLanguage = ref<Language>('en');

// Translations object - will be populated with translation data
const translations = ref<TranslationData>({
    en: {},
    es: {},
    zh: {},
});

/**
 * Composable for managing translations throughout the application
 * Provides reactive language switching and translation functions
 *
 * Features:
 * - Reactive language state management
 * - Persistent language preference in localStorage
 * - Fallback text support for missing translations
 * - Type-safe translation keys
 *
 * @author Portfolio Project
 * @version 1.0
 */
export function useTranslation() {
    /**
     * Change the current language
     * Updates both reactive state and localStorage for persistence
     *
     * @param lang - The language code to switch to ('en', 'es', 'zh')
     */
    const setLanguage = (lang: Language) => {
        currentLanguage.value = lang;
        // Store preference in localStorage for persistence
        localStorage.setItem('preferred-language', lang);
    };

    /**
     * Get translation for a given key
     * Returns the translated text or fallback if translation not found
     *
     * @param key - The translation key (e.g., 'nav.home')
     * @param fallback - Optional fallback text if translation not found
     * @returns Translated text or fallback
     */
    const t = (key: string, fallback?: string): string => {
        const currentTranslations = translations.value[currentLanguage.value];
        return currentTranslations[key] || fallback || key;
    };

    /**
     * Load translations data into the composable
     * Should be called once with the complete translation object
     *
     * @param data - Translation data object containing all languages
     */
    const loadTranslations = (data: TranslationData) => {
        translations.value = data;
    };

    /**
     * Initialize language from localStorage or default to English
     * Should be called when the application starts
     */
    const initializeLanguage = () => {
        const savedLanguage = localStorage.getItem('preferred-language') as Language;
        if (savedLanguage && ['en', 'es', 'zh'].includes(savedLanguage)) {
            currentLanguage.value = savedLanguage;
        }
    };

    // Computed property for reactive language access
    const language = computed(() => currentLanguage.value);

    return {
        language,
        setLanguage,
        t,
        loadTranslations,
        initializeLanguage,
    };
}
