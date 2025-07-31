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
    <section id="contact" class="holo-contact relative min-h-screen overflow-hidden bg-black">
        <!-- Holographic grid background -->
        <div class="absolute inset-0 opacity-20">
            <div class="grid h-full w-full grid-cols-12 grid-rows-12 gap-1">
                <div
                    v-for="i in 144"
                    :key="i"
                    class="animate-pulse border border-cyan-500/30"
                    :style="{ animationDelay: `${Math.random() * 3}s` }"
                ></div>
            </div>
        </div>

        <!-- Floating geometric shapes -->
        <div class="pointer-events-none absolute inset-0 overflow-hidden">
            <div class="absolute top-20 left-10 h-4 w-4 rotate-45 animate-spin border border-cyan-400" style="animation-duration: 10s"></div>
            <div class="absolute top-40 right-20 h-6 w-6 animate-pulse border border-purple-400"></div>
            <div class="absolute bottom-32 left-1/4 h-8 w-8 animate-bounce rounded-full border border-pink-400" style="animation-duration: 3s"></div>
        </div>

        <div class="relative z-10 flex min-h-screen items-center">
            <div class="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
                <!-- Contact form with holographic styling -->
                <div class="relative">
                    <!-- Holographic frame -->
                    <div class="absolute inset-0 rounded-xl border border-cyan-400/30 bg-black/40 backdrop-blur-sm"></div>

                    <div class="relative z-10 p-8">
                        <!-- Communication interface header -->
                        <div class="mb-8 text-center">
                            <div class="inline-flex items-center gap-3 text-cyan-400">
                                <div class="h-2 w-2 animate-pulse rounded-full bg-cyan-400"></div>
                                <span class="font-mono text-sm">{{ t('holo.command.contact', 'COMMUNICATION CHANNEL ACTIVE') }}</span>
                                <div class="h-2 w-2 animate-pulse rounded-full bg-cyan-400"></div>
                            </div>
                        </div>
                        <!-- Communication form -->
                        <form @submit.prevent="handleSubmit" class="space-y-6">
                            <!-- Success message -->
                            <div
                                v-if="showSuccess"
                                class="animate-fade-in mb-6 flex items-center gap-3 rounded-lg border border-green-400/30 bg-green-400/10 p-4 backdrop-blur-sm"
                            >
                                <Check :size="20" class="flex-shrink-0 text-green-400" />
                                <p class="font-medium text-green-400">
                                    {{ t('contact.success') }}
                                </p>
                            </div>

                            <!-- Error message -->
                            <div
                                v-if="showError"
                                class="animate-fade-in mb-6 flex items-center gap-3 rounded-lg border border-red-400/30 bg-red-400/10 p-4 backdrop-blur-sm"
                            >
                                <AlertCircle :size="20" class="flex-shrink-0 text-red-400" />
                                <p class="font-medium text-red-400">
                                    {{ errorMessage || t('contact.error') }}
                                </p>
                            </div>

                            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <!-- Name field -->
                                <div class="holo-field">
                                    <label for="name" class="mb-2 block font-mono text-sm font-medium text-cyan-400">
                                        <User :size="16" class="mr-2 inline" />
                                        {{ t('contact.name') }}
                                    </label>
                                    <input
                                        id="name"
                                        v-model="form.name"
                                        type="text"
                                        :placeholder="t('contact.name')"
                                        class="w-full rounded-lg border border-cyan-400/30 bg-black/50 px-4 py-3 text-cyan-400 placeholder-cyan-400/50 backdrop-blur-sm transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none"
                                        :class="{ 'border-red-400 focus:border-red-400 focus:ring-red-400/20': errors.name }"
                                    />
                                    <p v-if="errors.name" class="mt-1 font-mono text-sm text-red-400">{{ errors.name }}</p>
                                </div>

                                <!-- Email field -->
                                <div class="holo-field">
                                    <label for="email" class="mb-2 block font-mono text-sm font-medium text-cyan-400">
                                        <Mail :size="16" class="mr-2 inline" />
                                        {{ t('contact.email') }}
                                    </label>
                                    <input
                                        id="email"
                                        v-model="form.email"
                                        type="email"
                                        :placeholder="t('contact.email')"
                                        class="w-full rounded-lg border border-cyan-400/30 bg-black/50 px-4 py-3 text-cyan-400 placeholder-cyan-400/50 backdrop-blur-sm transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none"
                                        :class="{ 'border-red-400 focus:border-red-400 focus:ring-red-400/20': errors.email }"
                                    />
                                    <p v-if="errors.email" class="mt-1 font-mono text-sm text-red-400">{{ errors.email }}</p>
                                </div>
                            </div>

                            <!-- Subject field -->
                            <div class="holo-field">
                                <label for="subject" class="mb-2 block font-mono text-sm font-medium text-cyan-400">
                                    <MessageSquare :size="16" class="mr-2 inline" />
                                    {{ t('contact.subject') }}
                                </label>
                                <input
                                    id="subject"
                                    v-model="form.subject"
                                    type="text"
                                    :placeholder="t('contact.subject')"
                                    class="w-full rounded-lg border border-cyan-400/30 bg-black/50 px-4 py-3 text-cyan-400 placeholder-cyan-400/50 backdrop-blur-sm transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none"
                                    :class="{ 'border-red-400 focus:border-red-400 focus:ring-red-400/20': errors.subject }"
                                />
                                <p v-if="errors.subject" class="mt-1 font-mono text-sm text-red-400">{{ errors.subject }}</p>
                            </div>

                            <!-- Message field -->
                            <div class="holo-field">
                                <label for="message" class="mb-2 block font-mono text-sm font-medium text-cyan-400">
                                    <MessageSquare :size="16" class="mr-2 inline" />
                                    {{ t('contact.message') }}
                                </label>
                                <textarea
                                    id="message"
                                    v-model="form.message"
                                    rows="6"
                                    :placeholder="t('contact.message')"
                                    class="w-full resize-none rounded-lg border border-cyan-400/30 bg-black/50 px-4 py-3 text-cyan-400 placeholder-cyan-400/50 backdrop-blur-sm transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none"
                                    :class="{ 'border-red-400 focus:border-red-400 focus:ring-red-400/20': errors.message }"
                                ></textarea>
                                <p v-if="errors.message" class="mt-1 font-mono text-sm text-red-400">{{ errors.message }}</p>
                            </div>

                            <!-- Submit button -->
                            <div class="text-center">
                                <button
                                    type="submit"
                                    :disabled="!isFormValid || isLoading"
                                    class="inline-flex items-center gap-3 rounded-lg border border-cyan-400 bg-cyan-400/10 px-8 py-3 font-mono font-medium text-cyan-400 backdrop-blur-sm transition-all duration-300 hover:bg-cyan-400/20 hover:shadow-lg hover:shadow-cyan-400/20 focus:ring-2 focus:ring-cyan-400/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <component :is="isLoading ? Loader2 : Send" :size="20" :class="{ 'animate-spin': isLoading }" />
                                    {{ buttonText }}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Holographic effects -->
        <div class="pointer-events-none absolute inset-0">
            <div
                class="absolute top-0 left-0 h-1 w-full animate-pulse bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"
            ></div>
            <div
                class="absolute bottom-0 left-0 h-1 w-full animate-pulse bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-50"
                style="animation-delay: 1s"
            ></div>
        </div>
    </section>
</template>

<style scoped>
.holo-contact {
    background:
        radial-gradient(circle at 20% 20%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(255, 0, 128, 0.1) 0%, transparent 50%), linear-gradient(135deg, #000000 0%, #0a0a0a 100%);
}

.holo-field {
    position: relative;
}

.holo-field::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent, rgba(0, 212, 255, 0.1), transparent);
    border-radius: 8px;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
}

.holo-field:hover::before {
    opacity: 1;
}

/* Custom animations */
@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fade-in 0.5s ease;
}

/* Input glow effects */
input:focus,
textarea:focus {
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
}
</style>
