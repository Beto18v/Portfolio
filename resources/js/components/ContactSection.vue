<script setup lang="ts">
import { useTranslation } from '@/composables/useTranslation';
import { AlertCircle, Check, Loader2, Mail, MessageSquare, Send, User } from 'lucide-vue-next';
import { computed, reactive, ref } from 'vue';

/**
 * Contact Section Component
 * Features a contact form with validation, loading states, and success/error handling
 * Integrates with backend email sending functionality
 */

const { t } = useTranslation();

// Form data interface
interface ContactForm {
    name: string;
    email: string;
    subject: string;
    message: string;
}

// Form state
const form = reactive<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
});

// Component state
const isLoading = ref(false);
const showSuccess = ref(false);
const showError = ref(false);
const errorMessage = ref('');

// Form validation errors
const errors = reactive({
    name: '',
    email: '',
    subject: '',
    message: '',
});

/**
 * Validate email format
 * @param email - Email string to validate
 * @returns True if valid email format
 */
const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validate form fields
 * @returns True if all fields are valid
 */
const validateForm = (): boolean => {
    let isValid = true;

    // Reset errors
    Object.keys(errors).forEach((key) => {
        errors[key as keyof typeof errors] = '';
    });

    // Validate name
    if (!form.name.trim()) {
        errors.name = t('contact.error.name', 'Name is required');
        isValid = false;
    } else if (form.name.trim().length < 2) {
        errors.name = t('contact.error.nameLength', 'Name must be at least 2 characters');
        isValid = false;
    }

    // Validate email
    if (!form.email.trim()) {
        errors.email = t('contact.error.email', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(form.email)) {
        errors.email = t('contact.error.emailFormat', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate subject
    if (!form.subject.trim()) {
        errors.subject = t('contact.error.subject', 'Subject is required');
        isValid = false;
    } else if (form.subject.trim().length < 5) {
        errors.subject = t('contact.error.subjectLength', 'Subject must be at least 5 characters');
        isValid = false;
    }

    // Validate message
    if (!form.message.trim()) {
        errors.message = t('contact.error.message', 'Message is required');
        isValid = false;
    } else if (form.message.trim().length < 10) {
        errors.message = t('contact.error.messageLength', 'Message must be at least 10 characters');
        isValid = false;
    }

    return isValid;
};

/**
 * Reset form to initial state
 */
const resetForm = () => {
    Object.keys(form).forEach((key) => {
        form[key as keyof ContactForm] = '';
    });
    Object.keys(errors).forEach((key) => {
        errors[key as keyof typeof errors] = '';
    });
    showSuccess.value = false;
    showError.value = false;
    errorMessage.value = '';
};

/**
 * Handle form submission
 */
const handleSubmit = async () => {
    if (!validateForm()) {
        return;
    }

    isLoading.value = true;
    showError.value = false;
    errorMessage.value = '';

    try {
        // Here you would typically make an API call to your backend
        // For now, we'll simulate the request
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
            },
            body: JSON.stringify({
                name: form.name.trim(),
                email: form.email.trim(),
                subject: form.subject.trim(),
                message: form.message.trim(),
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
            showSuccess.value = true;
            resetForm();

            // Hide success message after 5 seconds
            setTimeout(() => {
                showSuccess.value = false;
            }, 5000);
        } else {
            throw new Error(result.message || 'Failed to send message');
        }
    } catch (error) {
        console.error('Contact form error:', error);
        showError.value = true;
        errorMessage.value = error instanceof Error ? error.message : t('contact.error');
    } finally {
        isLoading.value = false;
    }
};

// Computed properties for form state
const isFormValid = computed(() => {
    return form.name.trim() && form.email.trim() && form.subject.trim() && form.message.trim() && isValidEmail(form.email);
});

const buttonText = computed(() => {
    if (isLoading.value) return t('contact.sending');
    return t('contact.send');
});
</script>

<template>
    <section id="contact" class="bg-gray-50 py-16 transition-colors duration-300 lg:py-24 dark:bg-gray-800">
        <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <!-- Section header -->
            <div class="mb-16 text-center">
                <h2 class="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
                    {{ t('contact.title') }}
                </h2>
                <p class="mx-auto mb-6 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
                    {{ t('contact.subtitle') }}
                </p>
                <div class="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
            </div>

            <!-- Contact form -->
            <div class="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl dark:border-gray-700 dark:bg-gray-900">
                <!-- Success message -->
                <div
                    v-if="showSuccess"
                    class="animate-fade-in mb-6 flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20"
                >
                    <Check :size="20" class="flex-shrink-0 text-green-600 dark:text-green-400" />
                    <p class="font-medium text-green-700 dark:text-green-300">
                        {{ t('contact.success') }}
                    </p>
                </div>

                <!-- Error message -->
                <div
                    v-if="showError"
                    class="animate-fade-in mb-6 flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20"
                >
                    <AlertCircle :size="20" class="flex-shrink-0 text-red-600 dark:text-red-400" />
                    <p class="font-medium text-red-700 dark:text-red-300">
                        {{ errorMessage || t('contact.error') }}
                    </p>
                </div>

                <form @submit.prevent="handleSubmit" class="space-y-6">
                    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <!-- Name field -->
                        <div>
                            <label for="name" class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                {{ t('contact.name') }}
                            </label>
                            <div class="relative">
                                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <User :size="18" class="text-gray-400" />
                                </div>
                                <input
                                    id="name"
                                    v-model="form.name"
                                    type="text"
                                    class="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 transition-colors duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                    :class="{
                                        'border-red-500 focus:border-red-500 focus:ring-red-500': errors.name,
                                    }"
                                    :placeholder="t('contact.name')"
                                    :disabled="isLoading"
                                />
                            </div>
                            <p v-if="errors.name" class="mt-1 text-sm text-red-600 dark:text-red-400">
                                {{ errors.name }}
                            </p>
                        </div>

                        <!-- Email field -->
                        <div>
                            <label for="email" class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                {{ t('contact.email') }}
                            </label>
                            <div class="relative">
                                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Mail :size="18" class="text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    v-model="form.email"
                                    type="email"
                                    class="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 transition-colors duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                    :class="{
                                        'border-red-500 focus:border-red-500 focus:ring-red-500': errors.email,
                                    }"
                                    :placeholder="t('contact.email')"
                                    :disabled="isLoading"
                                />
                            </div>
                            <p v-if="errors.email" class="mt-1 text-sm text-red-600 dark:text-red-400">
                                {{ errors.email }}
                            </p>
                        </div>
                    </div>

                    <!-- Subject field -->
                    <div>
                        <label for="subject" class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {{ t('contact.subject') }}
                        </label>
                        <input
                            id="subject"
                            v-model="form.subject"
                            type="text"
                            class="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                            :class="{
                                'border-red-500 focus:border-red-500 focus:ring-red-500': errors.subject,
                            }"
                            :placeholder="t('contact.subject')"
                            :disabled="isLoading"
                        />
                        <p v-if="errors.subject" class="mt-1 text-sm text-red-600 dark:text-red-400">
                            {{ errors.subject }}
                        </p>
                    </div>

                    <!-- Message field -->
                    <div>
                        <label for="message" class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {{ t('contact.message') }}
                        </label>
                        <div class="relative">
                            <div class="pointer-events-none absolute top-3 left-3">
                                <MessageSquare :size="18" class="text-gray-400" />
                            </div>
                            <textarea
                                id="message"
                                v-model="form.message"
                                rows="6"
                                class="w-full resize-none rounded-lg border border-gray-300 py-3 pr-4 pl-10 transition-colors duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                :class="{
                                    'border-red-500 focus:border-red-500 focus:ring-red-500': errors.message,
                                }"
                                :placeholder="t('contact.message')"
                                :disabled="isLoading"
                            ></textarea>
                        </div>
                        <p v-if="errors.message" class="mt-1 text-sm text-red-600 dark:text-red-400">
                            {{ errors.message }}
                        </p>
                    </div>

                    <!-- Submit button -->
                    <div class="text-center">
                        <button
                            type="submit"
                            :disabled="!isFormValid || isLoading"
                            class="inline-flex transform items-center gap-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-purple-600 hover:shadow-xl focus:ring-4 focus:ring-blue-300 focus:outline-none disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-500 disabled:shadow-none disabled:hover:scale-100"
                        >
                            <!-- Loading spinner -->
                            <Loader2 v-if="isLoading" :size="20" class="animate-spin" />
                            <!-- Send icon -->
                            <Send v-else :size="20" class="transition-transform duration-300 group-hover:translate-x-1" />

                            <!-- Button text -->
                            <span>{{ buttonText }}</span>
                        </button>
                    </div>
                </form>
            </div>

            <!-- Additional contact info -->
            <div class="mt-12 text-center">
                <p class="mb-4 text-gray-600 dark:text-gray-400">
                    {{ t('contact.alternative', 'Or reach out directly via email') }}
                </p>
                <a
                    href="mailto:your-email@example.com"
                    class="inline-flex items-center gap-2 font-medium text-blue-600 transition-colors duration-200 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                    <Mail :size="16" />
                    your-email@example.com
                </a>
            </div>
        </div>
    </section>
</template>

<style scoped>
@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fade-in 0.3s ease-out;
}

/* Custom focus styles for better accessibility */
input:focus,
textarea:focus {
    outline: none;
}

/* Smooth transitions for all form elements */
input,
textarea,
button {
    transition: all 0.2s ease;
}
</style>
