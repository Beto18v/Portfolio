<template>
    <!-- Quantum grid overlay -->
    <div class="absolute inset-0 opacity-10">
        <div class="quantum-grid"></div>
    </div>

    <!-- Scanning effects -->
    <div class="pointer-events-none absolute inset-0">
        <div class="animate-scan-horizontal absolute top-0 left-0 h-px w-full bg-cyan-400 opacity-30"></div>
        <div class="animate-scan-vertical absolute top-0 left-0 h-full w-px bg-purple-400 opacity-30"></div>
    </div>

    <!-- Main content -->
    <div class="relative z-10 flex min-h-screen items-center">
        <div class="container mx-auto px-6 py-20">
            <!-- Header Section -->
            <div class="mb-16 text-center">
                <div class="relative inline-block">
                    <!-- Rotating gradient background -->
                    <div
                        class="absolute -inset-8 animate-pulse rounded-full bg-gradient-to-r from-cyan-400/20 via-purple-600/20 to-cyan-400/20 blur-xl"
                    ></div>

                    <h2 class="relative mb-6 text-5xl font-bold text-white">
                        <span class="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                            {{ t('ui.quantumProjectsHeader') }}
                        </span>
                    </h2>
                </div>

                <p class="mx-auto max-w-2xl text-lg leading-relaxed text-gray-300">
                    {{ t('ui.quantumProjectsSubtitle').replace('{count}', portfolioData.projects.length) }}
                </p>

                <!-- Status indicator -->
                <div class="mt-6 flex items-center justify-center gap-6 text-sm">
                    <div class="flex items-center gap-2">
                        <div class="h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
                        <span class="text-green-400">{{ t('ui.quantumProjectsStatusOnline') }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="h-2 w-2 animate-pulse rounded-full bg-cyan-400"></div>
                        <span class="text-cyan-400">{{ t('ui.quantumProjectsStatusActive') }}</span>
                    </div>
                </div>
            </div>

            <!-- Projects Grid -->
            <div class="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                <div
                    v-for="(project, index) in portfolioData.projects"
                    :key="project.id"
                    class="quantum-project-card group relative flex h-full flex-col rounded-xl border border-gray-700 bg-black/50 backdrop-blur-sm transition-all duration-500 hover:border-cyan-400/50"
                    :style="{ animationDelay: `${index * 0.15}s` }"
                >
                    <!-- Quantum border effect -->
                    <div class="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div class="quantum-border absolute inset-0 rounded-xl"></div>
                    </div>

                    <!-- Glow effect -->
                    <div
                        class="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400/10 via-transparent to-purple-600/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    ></div>

                    <div class="relative z-10 flex flex-1 flex-col p-8">
                        <!-- Project Header -->
                        <div class="mb-6 flex items-start justify-between">
                            <div class="flex items-center gap-3">
                                <div class="h-3 w-3 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400"></div>
                                <span class="font-mono text-xs text-cyan-400/70"
                                    >{{ t('ui.quantumProjectsProjectLabel') }} {{ project.id.padStart(3, '0') }}</span
                                >
                            </div>
                            <div class="rounded-lg border border-gray-600 bg-gray-800/50 px-3 py-1 text-xs text-gray-400">
                                {{ project.category }}
                            </div>
                        </div>

                        <!-- Project Title -->
                        <h3 class="mb-4 text-2xl font-bold text-white transition-all duration-300 group-hover:text-cyan-400">
                            {{ project.title }}
                        </h3>

                        <!-- Project Image -->
                        <div class="mb-6 flex justify-center">
                            <div class="flex h-50 w-110 items-center justify-center rounded-2xl border-2 border-cyan-400/40">
                                <img
                                    :src="project.image"
                                    :alt="project.title"
                                    class="h-full w-full rounded-2xl transition-transform duration-500 hover:scale-105"
                                />
                            </div>
                        </div>

                        <!-- Description -->
                        <p class="mb-6 leading-relaxed text-gray-300 transition-all duration-300 group-hover:text-gray-200">
                            {{ project.description }}
                        </p>

                        <!-- Technology Stack -->
                        <div class="mb-8">
                            <h4 class="mb-3 text-sm font-semibold text-cyan-400">{{ t('projects.technologyStack') }}</h4>
                            <div class="flex flex-wrap gap-2">
                                <span
                                    v-for="(tech, techIndex) in project.technologies"
                                    :key="tech"
                                    class="quantum-tech-tag rounded-lg border border-gray-600 bg-gray-800/50 px-3 py-1 text-xs text-gray-300 transition-all duration-300 hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:text-cyan-400"
                                    :style="{ animationDelay: `${index * 0.15 + techIndex * 0.05}s` }"
                                >
                                    {{ tech }}
                                </span>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="mt-auto flex gap-3">
                            <a
                                v-if="project.liveUrl"
                                :href="project.liveUrl"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="quantum-btn-primary group/btn flex-1 rounded-lg border border-cyan-400/50 bg-cyan-400/10 px-6 py-3 text-center text-sm font-medium text-cyan-400 transition-all duration-300 hover:bg-cyan-400/20 hover:shadow-lg hover:shadow-cyan-400/25"
                            >
                                <span class="relative z-10">{{ t('projects.liveDemo') }}</span>
                            </a>
                            <a
                                v-if="project.githubUrl"
                                :href="project.githubUrl"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="quantum-btn-secondary group/btn flex-1 rounded-lg border border-gray-600 bg-transparent px-6 py-3 text-center text-sm font-medium text-gray-300 transition-all duration-300 hover:border-purple-400/50 hover:bg-purple-400/10 hover:text-purple-400"
                            >
                                <span class="relative z-10">{{ t('projects.source') }}</span>
                            </a>
                        </div>
                    </div>

                    <!-- Project status indicator -->
                    <div
                        class="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-400 text-xs font-bold text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    >
                        ✓
                    </div>
                </div>
            </div>

            <!-- Portfolio Summary -->
            <div class="mt-16 text-center">
                <div
                    class="quantum-summary relative mx-auto max-w-2xl rounded-xl border border-cyan-400/30 bg-gradient-to-r from-cyan-400/10 to-purple-600/10 p-8 backdrop-blur-sm"
                >
                    <div class="absolute inset-0 animate-pulse rounded-xl bg-gradient-to-r from-cyan-400/5 to-purple-600/5"></div>
                    <div class="relative z-10">
                        <h3 class="mb-4 text-2xl font-bold text-cyan-400">{{ t('portfolio.summary.title') }}</h3>
                        <p class="leading-relaxed text-gray-300">
                            {{ t('portfolio.summary.description') }}
                        </p>
                        <div class="mt-6 flex items-center justify-center gap-8 text-sm">
                            <div class="text-center">
                                <div class="text-2xl font-bold text-cyan-400">{{ portfolioData.projects.length }}</div>
                                <div class="text-gray-400">{{ t('portfolio.summary.projects') }}</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-purple-400">100%</div>
                                <div class="text-gray-400">{{ t('portfolio.summary.completion') }}</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-green-400">{{ t('stats.live') }}</div>
                                <div class="text-gray-400">{{ t('portfolio.summary.status') }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTranslation } from '@/composables/useTranslation';
import { defineProps } from 'vue';
defineProps<{ sectionTexts: any; portfolioData: any }>();
const { t } = useTranslation();
</script>
