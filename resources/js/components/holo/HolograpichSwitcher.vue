<template>
    <div class="quantum-menu fixed right-6 bottom-6 z-50">
        <div
            class="section-selector rounded-2xl border border-cyan-400/40 bg-black/50 p-3 shadow-lg shadow-cyan-400/20 backdrop-blur-lg sm:bg-black/70"
        >
            <div class="mb-3 px-2 font-mono text-xs tracking-wider text-cyan-400">
                <span class="sm:hidden"></span>
                <span class="hidden sm:inline">{{ t('nav.quantum') }}</span>
            </div>
            <div class="flex flex-col gap-2">
                <button
                    @click="$emit('switch', 'profile')"
                    class="relative rounded-lg px-4 py-2 text-left font-mono text-sm transition-all"
                    :class="
                        currentSection === 'profile'
                            ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-400/30'
                            : 'text-cyan-400 hover:scale-105 hover:bg-cyan-400/20'
                    "
                >
                    <span class="relative z-10 flex items-center gap-2"
                        ><User class="h-4 w-4" /><span class="hidden sm:inline">{{ t('interface.profile') }}</span></span
                    >
                </button>
                <button
                    @click="$emit('switch', 'skills')"
                    class="relative rounded-lg px-4 py-2 text-left font-mono text-sm transition-all"
                    :class="
                        currentSection === 'skills'
                            ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-400/30'
                            : 'text-cyan-400 hover:scale-105 hover:bg-cyan-400/20'
                    "
                >
                    <span class="relative z-10 flex items-center gap-2"
                        ><Wrench class="h-4 w-4" /><span class="hidden sm:inline">{{ t('interface.skills') }}</span></span
                    >
                </button>
                <button
                    @click="$emit('switch', 'projects')"
                    class="relative rounded-lg px-4 py-2 text-left font-mono text-sm transition-all"
                    :class="
                        currentSection === 'projects'
                            ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-400/30'
                            : 'text-cyan-400 hover:scale-105 hover:bg-cyan-400/20'
                    "
                >
                    <span class="relative z-10 flex items-center gap-2"
                        ><Rocket class="h-4 w-4" /><span class="hidden sm:inline">{{ t('interface.projects') }}</span></span
                    >
                </button>
                <button
                    @click="$emit('switch', 'contact')"
                    class="relative rounded-lg px-4 py-2 text-left font-mono text-sm transition-all"
                    :class="
                        currentSection === 'contact'
                            ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-400/30'
                            : 'text-cyan-400 hover:scale-105 hover:bg-cyan-400/20'
                    "
                >
                    <span class="relative z-10 flex items-center gap-2"
                        ><Mail class="h-4 w-4" /><span class="hidden sm:inline">{{ t('interface.contact') }}</span></span
                    >
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTranslation } from '@/composables/useTranslation';
import { Mail, Rocket, User, Wrench } from 'lucide-vue-next';
import { defineEmits, defineProps } from 'vue';

const { t } = useTranslation();
defineProps<{ currentSection: 'profile' | 'skills' | 'projects' | 'contact' }>();
defineEmits<{ (e: 'switch', section: 'profile' | 'skills' | 'projects' | 'contact'): void }>();
</script>
