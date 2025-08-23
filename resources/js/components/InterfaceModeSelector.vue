<template>
    <div class="fixed top-4 left-4 z-[60]">
        <div class="interface-selector rounded-xl border border-cyan-400/30 bg-black/50 p-2 backdrop-blur-sm">
            <div class="mb-2 px-2 text-xs text-cyan-400">{{ label }}</div>
            <div class="flex gap-1">
                <button
                    @click="$emit('switch', 'holo')"
                    class="rounded px-3 py-1 text-xs transition-all"
                    :class="mode === 'holo' ? 'bg-cyan-400 text-black' : 'text-cyan-400 hover:bg-cyan-400/20'"
                >
                    {{ holoLabel }}
                </button>
                <button
                    @click="$emit('switch', 'space')"
                    class="rounded px-3 py-1 text-xs transition-all"
                    :class="mode === 'space' ? 'bg-purple-400 text-black' : 'text-purple-400 hover:bg-purple-400/20'"
                >
                    {{ spaceLabel }}
                </button>
                <button
                    @click="$emit('switch', 'traditional')"
                    class="rounded px-3 py-1 text-xs transition-all"
                    :class="mode === 'traditional' ? 'bg-gray-400 text-black' : 'text-gray-400 hover:bg-gray-400/20'"
                >
                    {{ classicLabel }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{ mode: string; label: string; holoLabel: string; spaceLabel: string; classicLabel: string }>();
defineEmits(['switch']);
</script>
