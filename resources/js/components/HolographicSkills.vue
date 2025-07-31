<script setup lang="ts">
import { useTranslation } from '@/composables/useTranslation';
import type { Skill } from '@/types/portfolio';
import { Code2, Database, Server, Star, Wrench } from 'lucide-vue-next';
import { computed, onMounted, ref } from 'vue';

/**
 * HolographicSkills Component
 * Revolutionary 3D holographic skill visualization
 * Features interactive skill orbs floating in 3D space
 */

const { t } = useTranslation();

interface Props {
    skills?: Skill[];
}

const props = withDefaults(defineProps<Props>(), {
    skills: () => [],
});

// 3D visualization state
const containerRef = ref<HTMLElement>();
const selectedSkill = ref<Skill | null>(null);
const hoveredSkill = ref<Skill | null>(null);
const rotationX = ref(0);
const rotationY = ref(0);
const isInteracting = ref(false);

// Skill categorization with 3D positioning
const skillCategories = computed(() => {
    const categories = {
        frontend: {
            name: 'Frontend Matrix',
            icon: Code2,
            color: '#00D4FF',
            position: { x: -200, y: -100, z: 0 },
            skills: props.skills.filter((s) => s.category === 'frontend'),
        },
        backend: {
            name: 'Backend Core',
            icon: Server,
            color: '#00FF88',
            position: { x: 200, y: -100, z: 0 },
            skills: props.skills.filter((s) => s.category === 'backend'),
        },
        database: {
            name: 'Data Layer',
            icon: Database,
            color: '#FF0080',
            position: { x: -200, y: 100, z: 0 },
            skills: props.skills.filter((s) => s.category === 'database'),
        },
        tools: {
            name: 'DevOps Suite',
            icon: Wrench,
            color: '#FFAA00',
            position: { x: 200, y: 100, z: 0 },
            skills: props.skills.filter((s) => s.category === 'tools'),
        },
    };
    return categories;
});

// Animation states
const animationFrame = ref<number>();
const time = ref(0);

onMounted(() => {
    startAnimation();
    setupMouseInteraction();
});

/**
 * Start the 3D animation loop
 */
const startAnimation = () => {
    const animate = () => {
        time.value += 0.01;

        if (!isInteracting.value) {
            rotationX.value = Math.sin(time.value * 0.5) * 15;
            rotationY.value = Math.cos(time.value * 0.3) * 20;
        }

        animationFrame.value = requestAnimationFrame(animate);
    };
    animate();
};

/**
 * Setup mouse interaction for 3D control
 */
const setupMouseInteraction = () => {
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;

    const handleMouseDown = (e: MouseEvent) => {
        isDragging = true;
        isInteracting.value = true;
        lastX = e.clientX;
        lastY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;

        const deltaX = e.clientX - lastX;
        const deltaY = e.clientY - lastY;

        rotationY.value += deltaX * 0.5;
        rotationX.value -= deltaY * 0.5;

        lastX = e.clientX;
        lastY = e.clientY;
    };

    const handleMouseUp = () => {
        isDragging = false;
        setTimeout(() => {
            isInteracting.value = false;
        }, 2000);
    };

    if (containerRef.value) {
        containerRef.value.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }
};

/**
 * Get skill orb position in 3D space
 */
const getSkillPosition = (skill: Skill, categoryIndex: number, skillIndex: number) => {
    const category = Object.values(skillCategories.value)[categoryIndex];
    const angle = (skillIndex / category.skills.length) * Math.PI * 2;
    const radius = 80 + skill.level * 20;

    return {
        x: category.position.x + Math.cos(angle + time.value) * radius,
        y: category.position.y + Math.sin(angle + time.value) * radius,
        z: category.position.z + Math.sin(time.value + skillIndex) * 30,
    };
};

/**
 * Get skill orb scale based on level and hover state
 */
const getSkillScale = (skill: Skill) => {
    const baseScale = 0.5 + (skill.level / 5) * 0.5;
    const hoverScale = hoveredSkill.value === skill ? 1.5 : 1;
    return baseScale * hoverScale;
};

/**
 * Get skill color with glow effect
 */
const getSkillColor = (skill: Skill, categoryColor: string) => {
    const intensity = skill.level / 5;
    return {
        backgroundColor: categoryColor,
        opacity: 0.7 + intensity * 0.3,
        boxShadow: `0 0 ${20 + skill.level * 10}px ${categoryColor}`,
    };
};

/**
 * Handle skill interaction
 */
const handleSkillClick = (skill: Skill) => {
    selectedSkill.value = selectedSkill.value === skill ? null : skill;
};

const handleSkillHover = (skill: Skill | null) => {
    hoveredSkill.value = skill;
};

/**
 * Get transform style for 3D positioning
 */
const getTransformStyle = (position: { x: number; y: number; z: number }, scale: number = 1) => {
    return {
        transform: `translate3d(${position.x}px, ${position.y}px, ${position.z}px) scale(${scale})`,
    };
};

/**
 * Calculate skill proficiency percentage
 */
const getSkillPercentage = (level: number): number => {
    return (level / 5) * 100;
};
</script>

<template>
    <section id="skills" class="holographic-skills relative min-h-screen overflow-hidden bg-black">
        <!-- Background matrix effect -->
        <div class="absolute inset-0">
            <div class="matrix-rain opacity-20"></div>
        </div>

        <!-- 3D Scene Container -->
        <div ref="containerRef" class="perspective-1000 relative flex h-screen items-center justify-center">
            <!-- Scene rotation container -->
            <div
                class="transform-style-preserve-3d relative h-full w-full"
                :style="{
                    transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
                }"
            >
                <!-- Category clusters -->
                <div
                    v-for="(category, categoryKey, categoryIndex) in skillCategories"
                    :key="categoryKey"
                    class="transform-style-preserve-3d absolute"
                    :style="getTransformStyle(category.position)"
                >
                    <!-- Category center orb -->
                    <div
                        class="category-orb group absolute flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-2 backdrop-blur-sm"
                        :style="{
                            borderColor: category.color,
                            backgroundColor: `${category.color}20`,
                            boxShadow: `0 0 30px ${category.color}`,
                        }"
                    >
                        <component :is="category.icon" :size="32" :style="{ color: category.color }" class="group-hover:animate-spin" />

                        <!-- Category label -->
                        <div
                            class="absolute top-full mt-4 text-center text-sm font-bold whitespace-nowrap text-white"
                            :style="{ color: category.color }"
                        >
                            {{ category.name }}
                        </div>
                    </div>

                    <!-- Skill orbs orbiting around category -->
                    <div
                        v-for="(skill, skillIndex) in category.skills"
                        :key="skill.name"
                        class="skill-orb transform-style-preserve-3d group absolute cursor-pointer"
                        :style="getTransformStyle(getSkillPosition(skill, categoryIndex, skillIndex), getSkillScale(skill))"
                        @click="handleSkillClick(skill)"
                        @mouseenter="handleSkillHover(skill)"
                        @mouseleave="handleSkillHover(null)"
                    >
                        <!-- Skill orb sphere -->
                        <div
                            class="flex h-16 w-16 items-center justify-center rounded-full border text-xs font-bold text-white transition-all duration-300"
                            :style="getSkillColor(skill, category.color)"
                        >
                            {{ skill.name.substring(0, 3).toUpperCase() }}
                        </div>

                        <!-- Skill level rings -->
                        <div class="absolute inset-0 rounded-full">
                            <div
                                v-for="ring in skill.level"
                                :key="ring"
                                class="absolute inset-0 animate-pulse rounded-full border opacity-30"
                                :style="{
                                    borderColor: category.color,
                                    width: `${100 + ring * 20}%`,
                                    height: `${100 + ring * 20}%`,
                                    top: `${-ring * 10}%`,
                                    left: `${-ring * 10}%`,
                                    animationDelay: `${ring * 0.2}s`,
                                }"
                            ></div>
                        </div>

                        <!-- Hover tooltip -->
                        <div
                            v-if="hoveredSkill === skill"
                            class="absolute bottom-full left-1/2 z-50 mb-4 -translate-x-1/2 transform rounded-lg border bg-black/90 p-3 text-sm whitespace-nowrap text-white backdrop-blur-sm"
                            :style="{ borderColor: category.color }"
                        >
                            <div class="font-bold">{{ skill.name }}</div>
                            <div class="mt-1 text-xs text-gray-300">{{ skill.description }}</div>
                            <div class="mt-2 flex items-center gap-1">
                                <Star
                                    v-for="star in 5"
                                    :key="star"
                                    :size="12"
                                    :class="star <= skill.level ? 'fill-current text-yellow-400' : 'text-gray-600'"
                                />
                                <span class="ml-2 text-xs">{{ getSkillPercentage(skill.level) }}%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Connection lines between categories -->
                <svg class="pointer-events-none absolute inset-0 h-full w-full">
                    <defs>
                        <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color: #00d4ff; stop-opacity: 1" />
                            <stop offset="50%" style="stop-color: #ff0080; stop-opacity: 0.5" />
                            <stop offset="100%" style="stop-color: #00ff88; stop-opacity: 1" />
                        </linearGradient>
                    </defs>

                    <!-- Animated connection lines -->
                    <line
                        x1="300"
                        y1="400"
                        x2="700"
                        y2="400"
                        stroke="url(#connectionGradient)"
                        stroke-width="2"
                        opacity="0.5"
                        class="animate-pulse"
                    />
                    <line
                        x1="500"
                        y1="300"
                        x2="500"
                        y2="500"
                        stroke="url(#connectionGradient)"
                        stroke-width="2"
                        opacity="0.5"
                        class="animate-pulse"
                        style="animation-delay: 1s"
                    />
                </svg>
            </div>

            <!-- Skill details panel -->
            <Transition name="slide-up">
                <div
                    v-if="selectedSkill"
                    class="fixed right-8 bottom-8 left-8 z-50 rounded-xl border bg-black/90 p-6 text-white backdrop-blur-sm"
                    :style="{ borderColor: selectedSkill ? '#00D4FF' : 'transparent' }"
                >
                    <div class="flex items-start justify-between">
                        <div class="flex-1">
                            <h3 class="mb-2 text-2xl font-bold text-cyan-400">{{ selectedSkill.name }}</h3>
                            <p class="mb-4 text-gray-300">{{ selectedSkill.description }}</p>

                            <!-- Skill proficiency visualization -->
                            <div class="mb-4">
                                <div class="mb-2 flex items-center gap-2">
                                    <span class="text-sm text-gray-400">Proficiency Level:</span>
                                    <div class="flex gap-1">
                                        <Star
                                            v-for="star in 5"
                                            :key="star"
                                            :size="16"
                                            :class="star <= selectedSkill.level ? 'fill-current text-yellow-400' : 'text-gray-600'"
                                        />
                                    </div>
                                    <span class="font-bold text-cyan-400">{{ getSkillPercentage(selectedSkill.level) }}%</span>
                                </div>

                                <!-- Animated progress bar -->
                                <div class="h-2 w-full rounded-full bg-gray-800">
                                    <div
                                        class="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-1000"
                                        :style="{ width: `${getSkillPercentage(selectedSkill.level)}%` }"
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <button @click="selectedSkill = null" class="ml-4 p-2 text-gray-400 transition-colors hover:text-white">✕</button>
                    </div>
                </div>
            </Transition>
        </div>

        <!-- Controls help -->
        <div class="absolute top-8 right-8 text-sm text-cyan-400">
            <div class="rounded-lg border border-cyan-400/30 bg-black/50 p-4 backdrop-blur-sm">
                <div class="mb-2 font-bold">Controls:</div>
                <div>🖱️ Drag to rotate</div>
                <div>👆 Click skills for details</div>
                <div>🎯 Hover for quick info</div>
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
.holographic-skills {
    background:
        radial-gradient(circle at 20% 20%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(255, 0, 128, 0.1) 0%, transparent 50%), linear-gradient(135deg, #000000 0%, #0a0a0a 100%);
}

.perspective-1000 {
    perspective: 1000px;
}

.transform-style-preserve-3d {
    transform-style: preserve-3d;
}

.matrix-rain {
    background-image:
        linear-gradient(90deg, rgba(0, 255, 136, 0.03) 1px, transparent 1px), linear-gradient(rgba(0, 255, 136, 0.03) 1px, transparent 1px);
    background-size: 20px 20px;
    animation: matrix-scroll 20s linear infinite;
}

@keyframes matrix-scroll {
    0% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(20px);
    }
}

.skill-orb {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.skill-orb:hover {
    transform: scale(1.2);
}

.category-orb {
    transition: all 0.3s ease;
}

.category-orb:hover {
    transform: scale(1.1);
}

/* Transitions */
.slide-up-enter-active,
.slide-up-leave-active {
    transition: all 0.3s ease;
}

.slide-up-enter-from {
    transform: translateY(100%);
    opacity: 0;
}

.slide-up-leave-to {
    transform: translateY(100%);
    opacity: 0;
}

/* Custom glow animations */
@keyframes skill-glow {
    0%,
    100% {
        box-shadow: 0 0 20px currentColor;
    }
    50% {
        box-shadow:
            0 0 40px currentColor,
            0 0 60px currentColor;
    }
}

.skill-orb:hover > div {
    animation: skill-glow 2s infinite;
}
</style>
