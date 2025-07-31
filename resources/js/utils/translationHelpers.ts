/**
 * Translation Helper Functions
 * Utilities for handling dynamic translations and content management
 */

import { useTranslation } from '@/composables/useTranslation';

/**
 * Helper function to get translated text with fallback
 * @param key - Translation key
 * @param fallback - Fallback text if translation not found
 * @param variables - Variables to replace in translation (optional)
 */
export function useT() {
    const { t } = useTranslation();

    return {
        t,
        // Helper for translating with variables
        tv: (key: string, variables: Record<string, string | number> = {}, fallback?: string): string => {
            let text = t(key, fallback);

            // Replace variables in format {variable}
            Object.entries(variables).forEach(([variable, value]) => {
                text = text.replace(new RegExp(`{${variable}}`, 'g'), String(value));
            });

            return text;
        },

        // Helper for pluralization
        tp: (key: string, count: number, fallback?: string): string => {
            const pluralKey = count === 1 ? key : `${key}_plural`;
            return t(pluralKey, fallback);
        },

        // Helper for conditional translations
        tc: (condition: boolean, trueKey: string, falseKey: string, fallback?: string): string => {
            return t(condition ? trueKey : falseKey, fallback);
        },
    };
}

/**
 * Mark text for translation extraction
 * This is a no-op function that helps with translation key extraction
 */
export function mark(key: string): string {
    return key;
}

/**
 * Get all available languages
 */
export function getAvailableLanguages() {
    return [
        { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
        { code: 'es', name: 'Español', flag: '🇪🇸', nativeName: 'Español' },
        { code: 'zh', name: '中文', flag: '🇨🇳', nativeName: '中文' },
    ];
}

/**
 * Format numbers according to current locale
 */
export function formatNumber(number: number, locale?: string): string {
    const { language } = useTranslation();
    const currentLocale = locale || (language.value === 'zh' ? 'zh-CN' : language.value === 'es' ? 'es-ES' : 'en-US');

    return new Intl.NumberFormat(currentLocale).format(number);
}

/**
 * Format dates according to current locale
 */
export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions, locale?: string): string {
    const { language } = useTranslation();
    const currentLocale = locale || (language.value === 'zh' ? 'zh-CN' : language.value === 'es' ? 'es-ES' : 'en-US');

    const dateObj = typeof date === 'string' ? new Date(date) : date;

    return new Intl.DateTimeFormat(currentLocale, options).format(dateObj);
}

/**
 * Get text direction for current language
 */
export function getTextDirection(): 'ltr' | 'rtl' {
    const { language } = useTranslation();
    // Add RTL languages if needed
    const rtlLanguages = ['ar', 'he', 'fa'];
    return rtlLanguages.includes(language.value) ? 'rtl' : 'ltr';
}
