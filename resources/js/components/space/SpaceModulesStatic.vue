<script setup lang="ts">
import { translationInstance } from '@/composables/translationInstance';
import { usePortfolioData } from '@/composables/usePortfolioData';
import { Brain, Database, Eye, Github, Mail, Monitor, Rocket, Satellite, Server, User, Zap } from 'lucide-vue-next';
import { computed, ref } from 'vue';

const { personalInfo, projects, skills, moduleTexts, contactInfo, skillCategoryNames, skillCategoryIcons } = usePortfolioData();
const { t } = translationInstance;

const moduleNavTexts = computed(() => ({
    navigatorTitle: t('space.nav.navigatorTitle', 'SPACE STATION NAVIGATOR'),
    moduleButton: t('space.nav.moduleButton', 'Module'), // fallback, not used directly
}));

const spaceModules = [
    {
        id: 'profile-module',
        title: moduleTexts.personal.title,
        type: 'profile',
        icon: User,
        color: '#00D4FF',
        description: moduleTexts.personal.description,
        data: personalInfo,
    },
    {
        id: 'skills-module',
        title: moduleTexts.skills.title,
        type: 'skills',
        icon: Brain,
        color: '#00FF88',
        description: moduleTexts.skills.description,
        data: skills,
    },
    {
        id: 'projects-module',
        title: moduleTexts.projects.title,
        type: 'projects',
        icon: Rocket,
        color: '#FF0080',
        description: moduleTexts.projects.description,
        data: projects,
    },
    {
        id: 'contact-module',
        title: moduleTexts.contact.title,
        type: 'contact',
        icon: Satellite,
        color: '#FFAA00',
        description: moduleTexts.contact.description,
        data: contactInfo,
    },
];

const iconMap = {
    Monitor,
    Database,
    Eye,
    Zap,
    Server,
};
const skillCategories = Object.entries(
    skills.reduce<Record<string, any[]>>((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill);
        return acc;
    }, {}),
).map(([category, skillList]) => ({
    name: (skillCategoryNames as Record<string, string>)[category] || category,
    icon: iconMap[(skillCategoryIcons as Record<string, keyof typeof iconMap>)[category]] || Monitor,
    skills: skillList,
}));

const activeModule = ref('profile-module');
const scrollToModule = (moduleId: string) => {
    const element = document.getElementById(moduleId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        activeModule.value = moduleId;
    }
};

const spaceContactForm = ref({
    name: '',
    email: '',
    message: '',
});
const spaceContactLoading = ref(false);
const spaceContactError = ref('');
const spaceContactSuccess = ref('');

function getCsrfToken() {
    const meta = document.querySelector('meta[name="csrf-token"]');
    return meta ? meta.getAttribute('content') || '' : '';
}

async function submitSpaceContactForm() {
    spaceContactLoading.value = true;
    spaceContactError.value = '';
    spaceContactSuccess.value = '';
    try {
        const response = await fetch('api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN': getCsrfToken(),
            },
            body: JSON.stringify({
                name: spaceContactForm.value.name,
                email: spaceContactForm.value.email,
                message: spaceContactForm.value.message,
            }),
        });
        const data = await response.json();
        if (response.ok && data.success) {
            spaceContactSuccess.value = t('contact.success', data.message || '¡Mensaje enviado correctamente!');
            spaceContactError.value = '';
            setTimeout(() => {
                spaceContactSuccess.value = '';
                spaceContactForm.value.name = '';
                spaceContactForm.value.email = '';
                spaceContactForm.value.message = '';
            }, 5000);
        } else {
            spaceContactError.value = t(
                'contact.error',
                (data.message || 'Error al enviar el mensaje.') + (data.errors ? ' ' + Object.values(data.errors).join(' ') : ''),
            );
        }
    } catch {
        spaceContactError.value = t('contact.error', 'Error de red o servidor. Intenta más tarde.');
    } finally {
        spaceContactLoading.value = false;
    }
}
</script>

<template>
    <div class="space-interface relative min-h-screen overflow-y-auto bg-gradient-to-b from-black via-purple-950 to-black">
        <!-- Starfield background -->
        <div class="fixed inset-0 z-0">
            <div class="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-transparent"></div>
            <!-- Animated stars -->
            <div class="absolute top-10 left-20 h-1 w-1 animate-pulse rounded-full bg-white"></div>
            <div class="absolute top-32 right-40 h-2 w-2 animate-pulse rounded-full bg-blue-400" style="animation-delay: 1s"></div>
            <div class="absolute top-64 left-1/3 h-1 w-1 animate-pulse rounded-full bg-white" style="animation-delay: 2s"></div>
            <div class="absolute top-96 right-20 h-1 w-1 animate-pulse rounded-full bg-purple-400" style="animation-delay: 0.5s"></div>
            <div class="absolute bottom-32 left-20 h-2 w-2 animate-pulse rounded-full bg-cyan-400" style="animation-delay: 1.5s"></div>
            <div class="absolute right-1/3 bottom-64 h-1 w-1 animate-pulse rounded-full bg-white" style="animation-delay: 3s"></div>
        </div>

        <!-- Space station navigation -->
        <div class="fixed top-8 left-1/2 z-50 -translate-x-1/2 transform">
            <div class="rounded-2xl border border-purple-400/30 bg-black/80 px-6 py-4 backdrop-blur-lg">
                <div class="mb-2 text-center font-mono text-sm text-purple-400">{{ moduleNavTexts.navigatorTitle }}</div>
                <div class="flex gap-4">
                    <button
                        v-for="module in spaceModules"
                        :key="module.id"
                        @click="scrollToModule(module.id)"
                        class="flex items-center gap-2 rounded-lg px-3 py-2 font-mono text-sm transition-all duration-300"
                        :class="
                            activeModule === module.id
                                ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                                : 'text-purple-300 hover:bg-purple-500/20 hover:text-white'
                        "
                    >
                        <component :is="module.icon" :size="16" />
                        {{ t(`space.nav.module.${module.id}`, module.title.split(' ')[0]) }}
                    </button>
                </div>
            </div>
        </div>

        <!-- Space modules content -->
        <div class="relative z-10 pt-32 pb-20">
            <!-- Profile Module -->
            <section :id="spaceModules[0].id" class="mb-20 flex min-h-screen items-center justify-center px-8">
                <div class="mx-auto max-w-4xl">
                    <div
                        class="rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 p-8 shadow-2xl shadow-cyan-400/20 backdrop-blur-lg"
                    >
                        <div class="mb-8 text-center">
                            <component :is="spaceModules[0].icon" class="mx-auto mb-4 text-cyan-400" :size="48" />
                            <h2 class="mb-2 text-4xl font-bold text-white">{{ t('space.profile.heading', spaceModules[0].title) }}</h2>
                            <p class="text-cyan-300">{{ t('space.profile.description', spaceModules[0].description) }}</p>
                        </div>

                        <div class="grid items-center gap-8 md:grid-cols-2">
                            <div class="text-center">
                                <div class="mx-auto mb-6 h-48 w-48 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 p-2">
                                    <div class="items-cent er flex h-full w-full justify-center overflow-hidden rounded-full bg-gray-800">
                                        <img :src="personalInfo.profileImage" alt="Profile" class="h-full w-full rounded-full object-cover" />
                                    </div>
                                </div>
                                <h3 class="mb-2 text-2xl font-bold text-white">{{ t('space.profile.title', 'Developer Profile') }}</h3>
                                <p class="text-gray-300">{{ personalInfo.bio }}</p>
                            </div>

                            <div class="space-y-4">
                                <div class="rounded-xl border border-cyan-400/20 bg-black/40 p-4">
                                    <div class="mb-1 font-mono text-sm text-cyan-400">{{ t('space.profile.status', 'STATUS') }}</div>
                                    <div class="text-white">{{ t('space.profile.statusText', 'Active & Available for Projects') }}</div>
                                </div>
                                <div class="rounded-xl border border-cyan-400/20 bg-black/40 p-4">
                                    <div class="mb-1 font-mono text-sm text-cyan-400">{{ t('space.profile.experience', 'EXPERIENCE') }}</div>
                                    <div class="text-white">{{ t('space.profile.experienceText', '1+ Years in Development') }}</div>
                                </div>
                                <div class="rounded-xl border border-cyan-400/20 bg-black/40 p-4">
                                    <div class="mb-1 font-mono text-sm text-cyan-400">{{ t('space.profile.specialization', 'SPECIALIZATION') }}</div>
                                    <div class="text-white">{{ t('space.profile.specializationText', 'Web Applications & Modern UI/UX') }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Skills Module -->
            <section :id="spaceModules[1].id" class="mb-20 flex min-h-screen items-center justify-center px-8">
                <div class="mx-auto max-w-6xl">
                    <div
                        class="rounded-3xl border border-green-400/30 bg-gradient-to-br from-green-900/30 to-emerald-900/30 p-8 shadow-2xl shadow-green-400/20 backdrop-blur-lg"
                    >
                        <div class="mb-12 text-center">
                            <component :is="spaceModules[1].icon" class="mx-auto mb-4 text-green-400" :size="48" />
                            <h2 class="mb-2 text-4xl font-bold text-white">{{ t('space.skills.heading', spaceModules[1].title) }}</h2>
                            <p class="text-green-300">{{ t('space.skills.description', spaceModules[1].description) }}</p>
                        </div>

                        <div class="grid gap-8 md:grid-cols-3">
                            <div
                                v-for="category in skillCategories"
                                :key="category.name"
                                class="rounded-xl border border-green-400/20 bg-black/40 p-6 transition-all duration-300 hover:border-green-400/40"
                            >
                                <div class="mb-4 flex items-center gap-3">
                                    <component :is="category.icon" class="text-green-400" :size="24" />
                                    <h3 class="text-xl font-semibold text-white">{{ category.name }}</h3>
                                </div>
                                <div class="space-y-2">
                                    <div
                                        v-for="skill in category.skills"
                                        :key="skill.name"
                                        class="flex items-center rounded-lg bg-green-400/10 px-3 py-2 font-mono text-sm text-green-300"
                                    >
                                        <span>{{ skill.name }}</span>
                                        <span class="flex-1"></span>
                                        <span class="flex justify-end pl-10 text-fuchsia-400">
                                            <span v-for="i in 5" :key="i">
                                                <span v-if="i <= skill.level">&#9733;</span>
                                                <span v-else>&#9734;</span>
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Projects Module -->
            <section :id="spaceModules[2].id" class="mb-20 flex min-h-screen items-center justify-center px-8">
                <div class="mx-auto max-w-7xl">
                    <div
                        class="rounded-3xl border border-pink-400/30 bg-gradient-to-br from-pink-900/30 to-red-900/30 p-8 shadow-2xl shadow-pink-400/20 backdrop-blur-lg"
                    >
                        <div class="mb-12 text-center">
                            <component :is="spaceModules[2].icon" class="mx-auto mb-4 text-pink-400" :size="48" />
                            <h2 class="mb-2 text-4xl font-bold text-white">{{ t('space.projects.heading', spaceModules[2].title) }}</h2>
                            <p class="text-pink-300">{{ t('space.projects.description', spaceModules[2].description) }}</p>
                        </div>

                        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <div
                                v-for="project in projects"
                                :key="project.id"
                                class="flex h-full flex-col overflow-hidden rounded-xl border border-pink-400/20 bg-black/40 transition-all duration-300 hover:scale-105 hover:border-pink-400/40"
                            >
                                <div
                                    class="flex h-48 w-full items-center justify-center overflow-hidden rounded-xl border-2 border-pink-400/30 bg-gradient-to-br from-gray-800 to-gray-900"
                                >
                                    <img
                                        v-if="project.image"
                                        :src="project.image"
                                        :alt="project.title"
                                        class="h-full w-full rounded-xl"
                                        loading="lazy"
                                    />
                                </div>
                                <div class="flex flex-1 flex-col p-6">
                                    <div class="mb-2 flex items-center justify-between">
                                        <h3 class="text-xl font-semibold text-white">{{ project.title }}</h3>
                                        <span class="rounded bg-pink-400/20 px-2 py-1 text-xs text-pink-300">
                                            {{ project.category }}
                                        </span>
                                    </div>
                                    <p class="mb-4 text-sm text-gray-300">{{ project.description }}</p>
                                    <div class="mb-4 flex flex-wrap gap-1">
                                        <span
                                            v-for="tech in project.technologies.slice(0, 15)"
                                            :key="tech"
                                            class="rounded bg-gray-700 px-2 py-1 text-xs text-gray-300"
                                        >
                                            {{ tech }}
                                        </span>
                                    </div>
                                    <div class="mt-auto flex gap-3">
                                        <a
                                            v-if="project.liveUrl"
                                            :href="project.liveUrl"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            class="flex items-center gap-1 rounded-lg bg-pink-500 px-3 py-2 text-sm text-white transition-colors hover:bg-pink-600"
                                        >
                                            <Eye :size="14" />
                                            {{ t('space.projects.view', 'View') }}
                                        </a>
                                        <a
                                            v-if="project.githubUrl"
                                            :href="project.githubUrl"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            class="flex items-center gap-1 rounded-lg bg-gray-700 px-3 py-2 text-sm text-white transition-colors hover:bg-gray-600"
                                        >
                                            <Github :size="14" />
                                            {{ t('space.projects.code', 'Code') }}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Contact Module -->
            <section :id="spaceModules[3].id" class="mb-20 flex min-h-screen items-center justify-center px-8">
                <div class="mx-auto max-w-4xl">
                    <div
                        class="rounded-3xl border border-yellow-400/30 bg-gradient-to-br from-yellow-900/30 to-orange-900/30 p-8 shadow-2xl shadow-yellow-400/20 backdrop-blur-lg"
                    >
                        <div class="mb-12 text-center">
                            <component :is="spaceModules[3].icon" class="mx-auto mb-4 text-yellow-400" :size="48" />
                            <h2 class="mb-2 text-4xl font-bold text-white">{{ t('space.contact.heading', spaceModules[3].title) }}</h2>
                            <p class="text-yellow-300">{{ t('space.contact.description', spaceModules[3].description) }}</p>
                        </div>

                        <div class="grid gap-8 md:grid-cols-2">
                            <div class="space-y-6">
                                <div class="rounded-xl border border-yellow-400/20 bg-black/40 p-6">
                                    <h3 class="mb-4 text-xl font-semibold text-white">{{ t('space.contact.form.heading', 'Send Message') }}</h3>
                                    <form class="space-y-4" @submit.prevent="submitSpaceContactForm">
                                        <!-- Success message -->
                                        <div
                                            v-if="spaceContactSuccess"
                                            class="mb-4 flex items-center gap-2 rounded-lg border border-green-400/30 bg-green-400/10 p-3"
                                        >
                                            <span class="font-semibold text-green-400">{{
                                                t('contact.success', 'sectionTexts.ui.contactSuccess!')
                                            }}</span>
                                        </div>
                                        <!-- Error message -->
                                        <div
                                            v-if="spaceContactError"
                                            class="mb-4 flex items-center gap-2 rounded-lg border border-red-400/30 bg-red-400/10 p-3"
                                        >
                                            <span class="font-semibold text-red-400">{{ t('errorMessage', spaceContactError) }}</span>
                                        </div>
                                        <input
                                            v-model="spaceContactForm.name"
                                            type="text"
                                            :placeholder="t('contact.form.name', 'Your Name')"
                                            class="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 text-white focus:border-yellow-400 focus:outline-none"
                                        />
                                        <input
                                            v-model="spaceContactForm.email"
                                            type="email"
                                            :placeholder="t('contact.form.email', 'Your Email')"
                                            class="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 text-white focus:border-yellow-400 focus:outline-none"
                                        />
                                        <textarea
                                            v-model="spaceContactForm.message"
                                            :placeholder="t('contact.form.messagePlaceholder', 'Your Message')"
                                            rows="4"
                                            class="w-full resize-none rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 text-white focus:border-yellow-400 focus:outline-none"
                                        ></textarea>
                                        <button
                                            type="submit"
                                            class="w-full rounded-lg bg-yellow-500 py-3 font-semibold text-black transition-colors hover:bg-yellow-400"
                                            :disabled="spaceContactLoading"
                                        >
                                            <span v-if="spaceContactLoading">{{ t('space.contact.form.sending', 'Enviando...') }}</span>
                                            <span v-else>{{ t('space.contact.form.submit', 'Transmit Message') }}</span>
                                        </button>
                                    </form>
                                </div>
                            </div>

                            <div class="space-y-6">
                                <div class="rounded-xl border border-yellow-400/20 bg-black/40 p-6">
                                    <h3 class="mb-4 text-xl font-semibold text-white">
                                        {{ t('space.contact.protocols.heading', 'Contact Protocols') }}
                                    </h3>
                                    <div class="space-y-3">
                                        <div class="flex items-center gap-3">
                                            <Mail class="text-yellow-400" :size="20" />
                                            <span class="text-gray-300">{{ contactInfo.email }}</span>
                                        </div>
                                        <div class="flex items-center gap-3">
                                            <Github class="text-yellow-400" :size="20" />
                                            <span class="text-gray-300">{{ contactInfo.github }}</span>
                                        </div>
                                        <div class="flex items-center gap-3">
                                            <Zap class="text-yellow-400" :size="20" />
                                            <span class="text-gray-300">{{ t('space.contact.protocols.available', 'Available for projects') }}</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="rounded-xl border border-yellow-400/20 bg-black/40 p-6">
                                    <h3 class="mb-4 text-xl font-semibold text-white">{{ t('space.contact.response.heading', 'Response Time') }}</h3>
                                    <div class="text-gray-300">
                                        <div class="mb-2">🟢 {{ t('space.contact.response.online', 'Online: Usually responds within hours') }}</div>
                                        <div class="mb-2">🟡 {{ t('space.contact.response.busy', 'Busy: Responds within 24 hours') }}</div>
                                        <div>🔴 {{ t('space.contact.response.offline', 'Offline: Responds within 2-3 days') }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
