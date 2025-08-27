<template>
    <div class="quantum-menu fixed right-6 bottom-6 z-50">
        <div class="section-selector rounded-2xl border border-cyan-400/40 bg-black/70 p-3 shadow-lg shadow-cyan-400/20 backdrop-blur-lg">
            <div class="mb-3 px-2 font-mono text-xs tracking-wider text-cyan-400"><span class="animate-pulse">●</span> {{ t('nav.quantum') }}</div>
            <div class="flex flex-col gap-2">
                <button
                    @click="$emit('switch', 'profile')"
                    class="group relative overflow-hidden rounded-lg px-4 py-2 text-left font-mono text-sm transition-all"
                    :class="
                        currentSection === 'profile'
                            ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-400/30'
                            : 'text-cyan-400 hover:scale-105 hover:bg-cyan-400/20'
                    "
                >
                    <span class="relative z-10">👤 {{ t('interface.profile') }}</span>
                    <div
                        class="absolute inset-0 -translate-x-full bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 transition-transform duration-500 group-hover:translate-x-full"
                    ></div>
                </button>
                <button
                    @click="$emit('switch', 'skills')"
                    class="group relative overflow-hidden rounded-lg px-4 py-2 text-left font-mono text-sm transition-all"
                    :class="
                        currentSection === 'skills'
                            ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-400/30'
                            : 'text-cyan-400 hover:scale-105 hover:bg-cyan-400/20'
                    "
                >
                    <span class="relative z-10">🔮 {{ t('interface.skills') }}</span>
                    <div
                        class="absolute inset-0 -translate-x-full bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 transition-transform duration-500 group-hover:translate-x-full"
                    ></div>
                </button>
                <button
                    @click="$emit('switch', 'projects')"
                    class="group relative overflow-hidden rounded-lg px-4 py-2 text-left font-mono text-sm transition-all"
                    :class="
                        currentSection === 'projects'
                            ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-400/30'
                            : 'text-cyan-400 hover:scale-105 hover:bg-cyan-400/20'
                    "
                >
                    <span class="relative z-10">💠 {{ t('interface.projects') }}</span>
                    <div
                        class="absolute inset-0 -translate-x-full bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 transition-transform duration-500 group-hover:translate-x-full"
                    ></div>
                </button>
                <button
                    @click="$emit('switch', 'contact')"
                    class="group relative overflow-hidden rounded-lg px-4 py-2 text-left font-mono text-sm transition-all"
                    :class="
                        currentSection === 'contact'
                            ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-400/30'
                            : 'text-cyan-400 hover:scale-105 hover:bg-cyan-400/20'
                    "
                >
                    <span class="relative z-10">📡 {{ t('interface.contact') }}</span>
                    <div
                        class="absolute inset-0 -translate-x-full bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 transition-transform duration-500 group-hover:translate-x-full"
                    ></div>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTranslation } from '@/composables/useTranslation';
import { defineEmits, defineProps } from 'vue';
const { t } = useTranslation();
defineProps<{ currentSection: 'profile' | 'skills' | 'projects' | 'contact' }>();
defineEmits<{ (e: 'switch', section: 'profile' | 'skills' | 'projects' | 'contact'): void }>();
</script>
