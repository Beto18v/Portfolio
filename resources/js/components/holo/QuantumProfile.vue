<script setup lang="ts">
import { translationInstance } from '@/composables/translationInstance';
import { usePortfolioData } from '@/composables/usePortfolioData';
import { Award, Brain, Code, Heart, Target, TrendingUp, Zap } from 'lucide-vue-next';
import { computed, onMounted, ref } from 'vue';

/**
 * QuantumProfile Component
 * Revolutionary profile section with particle effects and real-time data visualization
 * Features quantum-inspired design and interactive elements
 */

const { sectionTexts } = usePortfolioData();
const { t, language } = translationInstance;

interface Props {
    description?: string;
    image?: string;
    experience?: number;
    projectsCompleted?: number;
    technologiesMastered?: number;
}

const props = withDefaults(defineProps<Props>(), {
    description: '',
    image: '',
    experience: 3,
    projectsCompleted: 25,
    technologiesMastered: 15,
});

// Animation and particle system
const particleCanvas = ref<HTMLCanvasElement>();
const profileData = computed(() => ({
    name: t('ui.quantumProfile.name', sectionTexts.ui.quantumProfile.name),
    title: t('ui.quantumProfile.title', sectionTexts.ui.quantumProfile.title),
    location: t('ui.quantumProfile.location', sectionTexts.ui.quantumProfile.location),
    availability: t('ui.quantumProfile.availability', sectionTexts.ui.quantumProfile.availability),
    passion: t('ui.quantumProfile.passion', sectionTexts.ui.quantumProfile.passion),
    currentFocus: t('ui.quantumProfile.currentFocus', sectionTexts.ui.quantumProfile.currentFocus),
}));

// Real-time data simulation
const realTimeStats = ref({
    linesOfCode: 0,
    coffeeConsumed: 0,
    problemsSolved: 0,
    learningProgress: 0,
});

// Quantum particles system
const particles = ref<
    Array<{
        x: number;
        y: number;
        vx: number;
        vy: number;
        size: number;
        color: string;
        alpha: number;
        connections: number[];
    }>
>([]);

// Dynamic statistics
const statistics = computed(() => [
    {
        icon: TrendingUp,
        value: props.experience,
        label: t('about.stats.yearsLabel', sectionTexts.about.stats.yearsLabel),
        suffix: '+',
        color: 'text-blue-400',
        bgColor: 'bg-blue-500/20',
        animation: 'counter',
    },
    {
        icon: Award,
        value: props.projectsCompleted,
        label: t('about.stats.projectsLabel', sectionTexts.about.stats.projectsLabel),
        suffix: '+',
        color: 'text-green-400',
        bgColor: 'bg-green-500/20',
        animation: 'counter',
    },
    {
        icon: Code,
        value: props.technologiesMastered,
        label: t('skills.sectionTitle', sectionTexts.skills.sectionTitle),
        suffix: '+',
        color: 'text-purple-400',
        bgColor: 'bg-purple-500/20',
        animation: 'counter',
    },
    {
        icon: Zap,
        value: realTimeStats.value.linesOfCode,
        label: t('about.stats.linesOfCode', 'Lines of Code'),
        suffix: 'K+',
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-500/20',
        animation: 'real-time',
    },
]);

// Personality traits with quantum visualization
const personalityTraits = ref([
    {
        trait: 'Problem Solving',
        level: 95,
        icon: Brain,
        color: '#00D4FF',
        description: 'Analytical thinking and creative solutions',
    },
    {
        trait: 'Team Collaboration',
        level: 90,
        icon: Heart,
        color: '#FF0080',
        description: 'Effective communication and leadership',
    },
    {
        trait: 'Goal Achievement',
        level: 88,
        icon: Target,
        color: '#00FF88',
        description: 'Focused execution and results delivery',
    },
    {
        trait: 'Innovation',
        level: 92,
        icon: Zap,
        color: '#FFAA00',
        description: 'Creative approaches and modern solutions',
    },
]);

onMounted(() => {
    initParticleSystem();
    startRealTimeSimulation();
    startCounterAnimations();
});

/**
 * Initialize particle system
 */
const initParticleSystem = () => {
    if (!particleCanvas.value) return;

    const canvas = particleCanvas.value;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create particles
    const particleCount = 100;
    particles.value = [];

    for (let i = 0; i < particleCount; i++) {
        particles.value.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 3 + 1,
            color: ['#00D4FF', '#FF0080', '#00FF88', '#FFAA00'][Math.floor(Math.random() * 4)],
            alpha: Math.random() * 0.5 + 0.3,
            connections: [],
        });
    }

    // Start animation loop
    const animate = () => {
        updateParticles(ctx, canvas);
        requestAnimationFrame(animate);
    };
    animate();
};

/**
 * Update particle system
 */
const updateParticles = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update particle positions
    particles.value.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Keep in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));
    });

    // Draw connections
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.1)';
    ctx.lineWidth = 1;
    particles.value.forEach((particle, i) => {
        particles.value.slice(i + 1).forEach((otherParticle) => {
            const distance = Math.sqrt(Math.pow(particle.x - otherParticle.x, 2) + Math.pow(particle.y - otherParticle.y, 2));

            if (distance < 100) {
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(otherParticle.x, otherParticle.y);
                ctx.globalAlpha = ((100 - distance) / 100) * 0.3;
                ctx.stroke();
            }
        });
    });

    // Draw particles
    particles.value.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.alpha;
        ctx.fill();

        // Add glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = particle.color;
        ctx.fill();
        ctx.shadowBlur = 0;
    });

    ctx.globalAlpha = 1;
};

/**
 * Start real-time data simulation
 */
const startRealTimeSimulation = () => {
    const interval = setInterval(() => {
        realTimeStats.value.linesOfCode += Math.floor(Math.random() * 5) + 1;
        realTimeStats.value.coffeeConsumed += Math.random() > 0.7 ? 1 : 0;
        realTimeStats.value.problemsSolved += Math.random() > 0.8 ? 1 : 0;
        realTimeStats.value.learningProgress = Math.min(100, realTimeStats.value.learningProgress + Math.random() * 2);
    }, 2000);

    // Clean up on component unmount
    return () => clearInterval(interval);
};

/**
 * Start counter animations
 */
const startCounterAnimations = () => {
    setTimeout(() => {
        realTimeStats.value.linesOfCode = 847;
    }, 1000);
};

const getTraitVisualization = (trait: any, index: number) => {
    return {
        width: `${trait.level}%`,
        backgroundColor: trait.color,
        boxShadow: `0 0 20px ${trait.color}40`,
        animationDelay: `${index * 0.2}s`,
    };
};
</script>

<template>
    <section id="profile" class="quantum-profile relative min-h-screen overflow-hidden bg-black">
        <!-- Particle canvas background -->
        <canvas ref="particleCanvas" class="pointer-events-none absolute inset-0"></canvas>

        <!-- Quantum grid overlay -->
        <div class="absolute inset-0 opacity-20">
            <div class="quantum-grid"></div>
        </div>

        <!-- Main content -->
        <div class="relative z-10 flex min-h-screen items-center">
            <div class="container mx-auto px-6 py-20">
                <!-- Profile content grid -->
                <div class="grid items-center gap-16 lg:grid-cols-2">
                    <!-- Left side - Profile image and data -->
                    <div class="space-y-8">
                        <!-- Profile image with quantum effects -->
                        <div class="relative">
                            <div class="profile-container relative mx-auto h-80 w-80">
                                <!-- Quantum rings -->
                                <div
                                    class="absolute inset-0 animate-spin rounded-full border-2 border-cyan-400/30"
                                    style="animation-duration: 20s"
                                ></div>
                                <div
                                    class="absolute inset-4 animate-spin rounded-full border border-purple-400/30"
                                    style="animation-duration: 15s; animation-direction: reverse"
                                ></div>
                                <div
                                    class="absolute inset-8 animate-spin rounded-full border border-pink-400/30"
                                    style="animation-duration: 10s"
                                ></div>

                                <!-- Profile image -->
                                <div
                                    class="absolute inset-12 overflow-hidden rounded-full border border-cyan-400/50 bg-gradient-to-br from-cyan-400/20 to-purple-600/20 backdrop-blur-sm"
                                >
                                    <img src="Foto.png" />
                                </div>

                                <!-- Status indicators -->
                                <div class="absolute -top-4 -right-4 animate-pulse rounded-full bg-green-400 p-3">
                                    <div class="h-4 w-4 rounded-full bg-green-600"></div>
                                </div>

                                <!-- Data streams -->
                                <div
                                    class="absolute -bottom-4 -left-4 rounded-lg border border-cyan-400/30 bg-black/80 p-2 font-mono text-xs text-cyan-400 backdrop-blur-sm"
                                >
                                    <div>STATUS: ONLINE</div>
                                    <div>MODE: CREATIVE</div>
                                </div>
                            </div>
                        </div>

                        <!-- Profile information -->
                        <div class="space-y-4 text-center">
                            <h2 class="text-4xl font-bold text-white">{{ profileData.name }}</h2>
                            <p class="text-xl text-cyan-400">{{ profileData.title }}</p>
                            <div class="flex items-center justify-center gap-6 text-sm text-gray-300">
                                <span>📍 {{ profileData.location }}</span>
                                <span class="flex items-center gap-2">
                                    <div class="h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
                                    {{ profileData.availability }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Right side - Statistics and traits -->
                    <div class="space-y-8">
                        <!-- Real-time statistics -->
                        <div class="grid grid-cols-2 gap-4">
                            <div
                                v-for="(stat, index) in statistics"
                                :key="index"
                                class="quantum-stat-card relative rounded-xl border border-gray-700 bg-black/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/50"
                            >
                                <!-- Glow effect -->
                                <div
                                    class="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 hover:opacity-100"
                                    :class="stat.bgColor"
                                ></div>

                                <div class="relative z-10">
                                    <component :is="stat.icon" :size="24" :class="stat.color" class="mb-3" />

                                    <div class="mb-1 text-3xl font-bold text-white">
                                        <span class="counter" :data-target="stat.value">{{ stat.value }}</span>
                                        <span :class="stat.color">{{ stat.suffix }}</span>
                                    </div>

                                    <div class="text-sm text-gray-400">{{ stat.label }}</div>

                                    <!-- Real-time indicator -->
                                    <div v-if="stat.animation === 'real-time'" class="mt-2 flex items-center gap-2">
                                        <div class="h-1 w-1 animate-pulse rounded-full bg-green-400"></div>
                                        <span class="text-xs text-green-400">LIVE</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Personality traits visualization -->
                        <div class="space-y-6">
                            <h3 class="text-center text-2xl font-bold text-white">Quantum Traits Analysis</h3>

                            <div class="space-y-4">
                                <div v-for="(trait, index) in personalityTraits" :key="trait.trait" class="trait-visualization">
                                    <!-- Trait header -->
                                    <div class="mb-2 flex items-center justify-between">
                                        <div class="flex items-center gap-3">
                                            <component :is="trait.icon" :size="20" :style="{ color: trait.color }" />
                                            <span class="font-semibold text-white">{{ trait.trait }}</span>
                                        </div>
                                        <span class="text-sm" :style="{ color: trait.color }">{{ trait.level }}%</span>
                                    </div>

                                    <!-- Progress visualization -->
                                    <div class="relative h-3 overflow-hidden rounded-full bg-gray-800">
                                        <!-- Background glow -->
                                        <div class="absolute inset-0 rounded-full opacity-20" :style="{ backgroundColor: trait.color }"></div>

                                        <!-- Progress bar -->
                                        <div
                                            class="quantum-progress h-full rounded-full transition-all duration-1000 ease-out"
                                            :style="getTraitVisualization(trait, index)"
                                        ></div>

                                        <!-- Particle effect -->
                                        <div class="absolute inset-0 overflow-hidden rounded-full">
                                            <div
                                                class="particle-stream"
                                                :style="{
                                                    width: `${trait.level}%`,
                                                    backgroundColor: trait.color,
                                                    animationDelay: `${index * 0.5}s`,
                                                }"
                                            ></div>
                                        </div>
                                    </div>

                                    <!-- Trait description -->
                                    <p class="mt-1 text-xs text-gray-400">{{ trait.description }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Mission statement -->
                        <div
                            class="quantum-mission relative rounded-xl border border-cyan-400/30 bg-gradient-to-r from-cyan-400/10 to-purple-600/10 p-6 backdrop-blur-sm"
                        >
                            <div class="absolute inset-0 animate-pulse rounded-xl bg-gradient-to-r from-cyan-400/5 to-purple-600/5"></div>
                            <div class="relative z-10">
                                <h4 class="mb-2 text-lg font-bold text-cyan-400">Mission Statement</h4>
                                <p class="leading-relaxed text-gray-300">
                                    {{ props.description || sectionTexts.about.sectionDescription }}
                                </p>
                                <div class="mt-4 flex items-center gap-4 text-sm">
                                    <span class="text-purple-400">💡 {{ profileData.passion }}</span>
                                    <span class="text-cyan-400">🎯 {{ profileData.currentFocus }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Quantum effects overlay -->
        <div class="pointer-events-none absolute inset-0">
            <!-- Scanning lines -->
            <div class="animate-scan-horizontal absolute top-0 left-0 h-px w-full bg-cyan-400 opacity-50"></div>
            <div class="animate-scan-vertical absolute top-0 left-0 h-full w-px bg-purple-400 opacity-50"></div>
        </div>
    </section>
</template>
