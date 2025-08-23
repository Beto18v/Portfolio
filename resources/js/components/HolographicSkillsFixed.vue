<script setup lang="ts">
import type { Skill } from '@/types/portfolio';
import { Code2, Database, Server, Star, Wrench } from 'lucide-vue-next';
import { computed, ref } from 'vue';

/**
 * HolographicSkills Component - Full Screen Fixed Matrix
 */

interface Props {
    skills?: Skill[];
}

const props = withDefaults(defineProps<Props>(), {
    skills: () => [],
});

// Selected skill for modal
const selectedSkill = ref<Skill | null>(null);

// Skill categorization for display
const skillCategories = computed(() => {
    const categories = {
        frontend: {
            name: 'Frontend Matrix',
            icon: Code2,
            color: '#00D4FF',
            skills: props.skills.filter((s) => s.category === 'frontend'),
        },
        backend: {
            name: 'Backend Core',
            icon: Server,
            color: '#00FF88',
            skills: props.skills.filter((s) => s.category === 'backend'),
        },
        database: {
            name: 'Data Layer',
            icon: Database,
            color: '#FF0080',
            skills: props.skills.filter((s) => s.category === 'database'),
        },
        tools: {
            name: 'DevOps Suite',
            icon: Wrench,
            color: '#FFAA00',
            skills: props.skills.filter((s) => s.category === 'tools'),
        },
    };
    return categories;
});
</script>

<template>
    <!-- Skills Matrix - Full Screen Fixed -->
    <div class="skills-matrix-container fixed inset-0 overflow-x-hidden overflow-y-auto bg-black">
        <!-- Background effects -->
        <div class="absolute inset-0 z-0">
            <!-- Holographic grid -->
            <div class="holographic-grid absolute inset-0 opacity-30"></div>

            <!-- Animated particles -->
            <div class="particles-layer absolute inset-0">
                <div
                    v-for="i in 40"
                    :key="i"
                    class="particle absolute h-1 w-1 animate-pulse rounded-full bg-cyan-400"
                    :style="{
                        left: Math.random() * 100 + '%',
                        top: Math.random() * 100 + '%',
                        animationDelay: Math.random() * 3 + 's',
                        animationDuration: 2 + Math.random() * 3 + 's',
                    }"
                ></div>
            </div>
        </div>

        <!-- Main content -->
        <div class="relative z-10 flex h-full flex-col">
            <!-- Header -->
            <div class="py-8 text-center">
                <h1 class="mb-2 font-mono text-4xl font-bold text-cyan-400">SKILLS MATRIX</h1>
                <p class="text-lg text-cyan-300">{{ props.skills.length }} technologies loaded</p>
                <div class="mx-auto mt-4 h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-500"></div>
            </div>

            <!-- Skills grid -->
            <div class="flex-1 px-8 pb-8">
                <div class="mx-auto grid h-full max-w-7xl grid-cols-1 gap-8 lg:grid-cols-2">
                    <div
                        v-for="(category, key) in skillCategories"
                        :key="key"
                        class="skill-category rounded-2xl border-2 bg-black/60 p-6 backdrop-blur-lg transition-all duration-300 hover:scale-105"
                        :style="{ borderColor: category.color + '40' }"
                    >
                        <!-- Category header -->
                        <div class="mb-6 flex items-center gap-4">
                            <div class="rounded-xl p-3" :style="{ backgroundColor: category.color + '20', border: `2px solid ${category.color}40` }">
                                <component :is="category.icon" class="h-8 w-8" :style="{ color: category.color }" />
                            </div>
                            <div>
                                <h3 class="font-mono text-2xl font-bold" :style="{ color: category.color }">
                                    {{ category.name }}
                                </h3>
                                <p class="text-gray-400">{{ category.skills.length }} skills</p>
                            </div>
                        </div>

                        <!-- Skills list -->
                        <div class="scrollbar-thin scrollbar-thumb-cyan-400 scrollbar-track-transparent max-h-96 space-y-3 overflow-y-auto">
                            <div
                                v-for="skill in category.skills"
                                :key="skill.name"
                                class="skill-item group cursor-pointer rounded-xl border bg-black/40 p-4 transition-all duration-300 hover:scale-105"
                                :style="{
                                    borderColor: category.color + '30',
                                    boxShadow: `0 0 10px ${category.color}20`,
                                }"
                                @click="selectedSkill = skill"
                            >
                                <div class="mb-2 flex items-center justify-between">
                                    <h4 class="text-lg font-semibold" :style="{ color: category.color }">
                                        {{ skill.name }}
                                    </h4>
                                    <div class="skill-level flex gap-1">
                                        <div
                                            v-for="i in 5"
                                            :key="i"
                                            class="h-3 w-3 rounded-full transition-all duration-300"
                                            :style="{
                                                backgroundColor: i <= skill.level ? category.color : '#374151',
                                                boxShadow: i <= skill.level ? `0 0 6px ${category.color}60` : 'none',
                                            }"
                                        ></div>
                                    </div>
                                </div>

                                <p class="mb-3 text-sm leading-relaxed text-gray-300">
                                    {{ skill.description }}
                                </p>

                                <!-- Progress bar -->
                                <div class="h-2 w-full rounded-full bg-gray-800">
                                    <div
                                        class="h-2 rounded-full transition-all duration-1000 ease-out"
                                        :style="{
                                            width: (skill.level / 5) * 100 + '%',
                                            background: `linear-gradient(90deg, ${category.color}, ${category.color}80)`,
                                        }"
                                    ></div>
                                </div>

                                <div class="mt-2 text-right">
                                    <span class="font-mono text-sm font-bold" :style="{ color: category.color }">
                                        {{ Math.round((skill.level / 5) * 100) }}%
                                    </span>
                                </div>

                                <!-- Hover effect -->
                                <div
                                    class="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                    :style="{
                                        background: `linear-gradient(45deg, ${category.color}10, transparent)`,
                                    }"
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Skill detail modal -->
        <Transition name="modal">
            <div
                v-if="selectedSkill"
                class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
                @click="selectedSkill = null"
            >
                <div
                    class="skill-detail-modal mx-4 max-w-lg rounded-3xl border-2 border-cyan-400/50 bg-black/95 p-8 shadow-2xl shadow-cyan-400/20 backdrop-blur-lg"
                    @click.stop
                >
                    <div class="mb-8 text-center">
                        <div class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 border-cyan-400 bg-cyan-400/20">
                            <Code2 class="h-10 w-10 text-cyan-400" />
                        </div>
                        <h3 class="mb-2 text-3xl font-bold text-cyan-400">{{ selectedSkill.name }}</h3>

                        <!-- Skill level display -->
                        <div class="mb-4 flex justify-center gap-2">
                            <Star
                                v-for="i in 5"
                                :key="i"
                                class="h-6 w-6"
                                :class="i <= selectedSkill.level ? 'fill-current text-cyan-400' : 'text-gray-600'"
                            />
                        </div>

                        <div class="mb-4 font-mono text-xl text-cyan-300">{{ Math.round((selectedSkill.level / 5) * 100) }}% Proficiency</div>

                        <p class="text-lg leading-relaxed text-gray-300">
                            {{ selectedSkill.description }}
                        </p>
                    </div>

                    <div class="text-center">
                        <button
                            @click="selectedSkill = null"
                            class="rounded-xl bg-cyan-400 px-8 py-3 text-lg font-semibold text-black transition-colors hover:bg-cyan-300"
                        >
                            Close Matrix
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>
