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
 */
export function useTranslation() {
    /**
     * Change the current language
     * @param lang - The language code to switch to
     */
    const setLanguage = (lang: Language) => {
        currentLanguage.value = lang;
        // Store preference in localStorage for persistence
        localStorage.setItem('preferred-language', lang);
    };

    /**
     * Get translation for a given key
     * @param key - The translation key
     * @param fallback - Fallback text if translation not found
     * @returns Translated text or fallback
     */
    const t = (key: string, fallback?: string): string => {
        const currentTranslations = translations.value[currentLanguage.value];
        return currentTranslations[key] || fallback || key;
    };

    /**
     * Load translations data
     * @param data - Translation data object
     */
    const loadTranslations = (data: TranslationData) => {
        translations.value = data;
    };

    /**
     * Initialize language from localStorage or default to English
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
