<script setup lang="ts">
import { onMounted, ref } from 'vue';

// Simple test to ensure the component loads
const message = ref('🚀 Revolutionary Portfolio Loading...');
const isReady = ref(false);

onMounted(() => {
    setTimeout(() => {
        message.value = '✨ Welcome to the Future of Portfolios!';
        isReady.value = true;
    }, 1000);
});
</script>

<template>
    <div class="flex min-h-screen items-center justify-center bg-black text-white">
        <div class="text-center">
            <h1 class="mb-4 text-4xl font-bold" :class="{ 'animate-pulse': !isReady }">
                {{ message }}
            </h1>

            <div v-if="isReady" class="space-y-4">
                <p class="text-xl text-cyan-400">Tu portfolio revolucionario está funcionando! 🎉</p>

                <div class="mt-8 grid grid-cols-3 gap-4">
                    <div class="rounded-lg border border-cyan-400 bg-cyan-900/30 p-4">
                        <div class="font-bold text-cyan-400">HOLO MODE</div>
                        <div class="text-sm">Terminal Interface</div>
                    </div>

                    <div class="rounded-lg border border-purple-400 bg-purple-900/30 p-4">
                        <div class="font-bold text-purple-400">SPACE MODE</div>
                        <div class="text-sm">3D Navigation</div>
                    </div>

                    <div class="rounded-lg border border-gray-400 bg-gray-900/30 p-4">
                        <div class="font-bold text-gray-400">CLASSIC MODE</div>
                        <div class="text-sm">Traditional View</div>
                    </div>
                </div>

                <p class="mt-8 text-sm text-gray-400">Los componentes avanzados se están cargando en segundo plano...</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
    0%,
    100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
}
</style>
