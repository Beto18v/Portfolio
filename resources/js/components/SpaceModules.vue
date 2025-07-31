<script setup lang="ts">
import { useTranslation } from '@/composables/useTranslation';
import { Calendar, ExternalLink, Github, Monitor, Rocket, Satellite, Star, Zap } from 'lucide-vue-next';
import { computed, onMounted, ref } from 'vue';

/**
 * SpaceModules Component
 * Projects displayed as floating space modules in a 3D environment
 * Features orbital mechanics and interactive docking stations
 */

const { t } = useTranslation();

// Define project interface
interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    liveUrl?: string;
    githubUrl?: string;
    category: string;
    featured?: boolean;
    date: string;
}

// Extended module interface
interface SpaceModule extends Project {
    orbit: {
        radius: number;
        speed: number;
        angle: number;
        tilt: number;
    };
    moduleType: {
        icon: any;
        color: string;
        name: string;
    };
    status: string;
}

interface Props {
    projects?: Project[];
}

const props = withDefaults(defineProps<Props>(), {
    projects: () => [],
});

// Space station state
const stationRef = ref<HTMLElement>();
const selectedModule = ref<SpaceModule | null>(null);
const hoveredModule = ref<SpaceModule | null>(null);
const cameraPosition = ref({ x: 0, y: 0, z: 1000 });
const time = ref(0);
const isNavigating = ref(false);
const viewportSize = ref({ width: 1200, height: 800 });

// Project modules with orbital positions
const spaceModules = computed(() => {
    return props.projects.map((project, index) => {
        const orbitRadius = 300 + (index % 3) * 150;
        const orbitSpeed = 0.01 + (index % 3) * 0.005;
        const angle = (index / props.projects.length) * Math.PI * 2;

        return {
            ...project,
            orbit: {
                radius: orbitRadius,
                speed: orbitSpeed,
                angle: angle,
                tilt: (index % 2) * 30 - 15,
            },
            moduleType: getModuleType(project.category),
            status: project.featured ? 'active' : 'standby',
        };
    });
});

// Module types based on project category
const getModuleType = (category: string) => {
    const types: Record<string, any> = {
        'Full Stack': { icon: Satellite, color: '#00D4FF', name: 'Core System' },
        Frontend: { icon: Monitor, color: '#00FF88', name: 'Interface Pod' },
        Backend: { icon: Rocket, color: '#FF0080', name: 'Engine Module' },
        'Web App': { icon: Zap, color: '#FFAA00', name: 'Application Hub' },
        default: { icon: Star, color: '#FFFFFF', name: 'Research Module' },
    };
    return types[category] || types.default;
};

// Central space station
const spaceStation = {
    name: 'PORTFOLIO STATION',
    modules: ['Command Center', 'Development Lab', 'Communication Hub', 'Data Storage'],
    status: 'operational',
};

onMounted(() => {
    startSpaceAnimation();
    setupSpaceNavigation();

    // Set viewport size
    viewportSize.value = {
        width: window.innerWidth,
        height: window.innerHeight,
    };

    // Update viewport size on resize
    window.addEventListener('resize', () => {
        viewportSize.value = {
            width: window.innerWidth,
            height: window.innerHeight,
        };
    });
});

/**
 * Start space animation loop
 */
const startSpaceAnimation = () => {
    const animate = () => {
        time.value += 0.01;
        requestAnimationFrame(animate);
    };
    animate();
};

/**
 * Setup space navigation controls
 */
const setupSpaceNavigation = () => {
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;

    const handleMouseDown = (e: MouseEvent) => {
        isDragging = true;
        isNavigating.value = true;
        lastX = e.clientX;
        lastY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;

        const deltaX = e.clientX - lastX;
        const deltaY = e.clientY - lastY;

        cameraPosition.value.x -= deltaX * 2;
        cameraPosition.value.y += deltaY * 2;

        lastX = e.clientX;
        lastY = e.clientY;
    };

    const handleMouseUp = () => {
        isDragging = false;
        setTimeout(() => {
            isNavigating.value = false;
        }, 1000);
    };

    const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        cameraPosition.value.z += e.deltaY * 2;
        cameraPosition.value.z = Math.max(500, Math.min(2000, cameraPosition.value.z));
    };

    if (stationRef.value) {
        stationRef.value.addEventListener('mousedown', handleMouseDown);
        stationRef.value.addEventListener('wheel', handleWheel);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }
};

/**
 * Calculate module position in 3D space
 */
const getModulePosition = (module: any) => {
    const angle = module.orbit.angle + time.value * module.orbit.speed;
    return {
        x: Math.cos(angle) * module.orbit.radius,
        y: Math.sin(angle) * module.orbit.radius + Math.sin(time.value * 2) * 50,
        z: Math.sin(angle + module.orbit.tilt) * 100,
        rotation: angle * 57.3, // Convert to degrees
    };
};

/**
 * Get module transform style
 */
const getModuleTransform = (module: any) => {
    const pos = getModulePosition(module);
    const scale = selectedModule.value === module ? 1.5 : hoveredModule.value === module ? 1.2 : 1;

    return {
        transform: `
            translate3d(${pos.x - cameraPosition.value.x}px, ${pos.y - cameraPosition.value.y}px, ${pos.z}px) 
            rotateY(${pos.rotation}deg) 
            scale(${scale})
        `,
        zIndex: Math.round(1000 + pos.z),
    };
};

/**
 * Handle module interaction
 */
const selectModule = (module: any) => {
    selectedModule.value = selectedModule.value === module ? null : module;
};

const dockToModule = (module: any) => {
    // Animate camera to module position
    const pos = getModulePosition(module);
    cameraPosition.value = {
        x: pos.x - 200,
        y: pos.y,
        z: pos.z + 300,
    };
    selectModule(module);
};

/**
 * Format project date
 */
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
    });
};

/**
 * Open external link
 */
const openLink = (url: string) => {
    window.open(url, '_blank');
};

/**
 * Get technology badge color
 */
const getTechColor = (tech: string, index: number) => {
    const colors = ['#00D4FF', '#00FF88', '#FF0080', '#FFAA00', '#8A2BE2', '#FF6B6B'];
    return colors[index % colors.length];
};
</script>

<template>
    <section id="projects" class="space-modules relative min-h-screen overflow-hidden bg-black">
        <!-- Star field background -->
        <div class="absolute inset-0">
            <div class="stars opacity-80"></div>
            <div class="stars2 opacity-60"></div>
            <div class="stars3 opacity-40"></div>
        </div>

        <!-- Nebula effects -->
        <div class="absolute inset-0">
            <div class="nebula nebula-1"></div>
            <div class="nebula nebula-2"></div>
            <div class="nebula nebula-3"></div>
        </div>

        <!-- Space station container -->
        <div ref="stationRef" class="perspective-2000 relative flex h-screen cursor-grab items-center justify-center active:cursor-grabbing">
            <!-- Central space station -->
            <div
                class="central-station absolute z-20"
                :style="{
                    transform: `translate3d(${-cameraPosition.x}px, ${-cameraPosition.y}px, 0) scale(${1000 / cameraPosition.z})`,
                }"
            >
                <div
                    class="relative flex h-32 w-32 items-center justify-center rounded-full border-4 border-cyan-400 bg-cyan-400/10 backdrop-blur-sm"
                >
                    <Satellite :size="48" class="animate-spin text-cyan-400" style="animation-duration: 20s" />

                    <!-- Station rings -->
                    <div class="absolute inset-0 animate-pulse rounded-full border-2 border-cyan-400/30"></div>
                    <div class="absolute inset-0 scale-125 animate-pulse rounded-full border border-cyan-400/20" style="animation-delay: 1s"></div>
                    <div class="absolute inset-0 scale-150 animate-pulse rounded-full border border-cyan-400/10" style="animation-delay: 2s"></div>

                    <!-- Station label -->
                    <div class="absolute top-full mt-4 text-sm font-bold whitespace-nowrap text-cyan-400">
                        {{ spaceStation.name }}
                    </div>
                </div>
            </div>

            <!-- Project modules orbiting the station -->
            <div
                v-for="(module, index) in spaceModules"
                :key="module.id"
                class="project-module absolute cursor-pointer transition-all duration-500"
                :style="getModuleTransform(module)"
                @click="selectModule(module)"
                @mouseenter="hoveredModule = module"
                @mouseleave="hoveredModule = null"
            >
                <!-- Module container -->
                <div class="group relative h-24 w-24" :class="{ 'z-50': selectedModule === module }">
                    <!-- Module core -->
                    <div
                        class="flex h-full w-full items-center justify-center rounded-lg border-2 backdrop-blur-sm transition-all duration-300"
                        :style="{
                            borderColor: module.moduleType.color,
                            backgroundColor: `${module.moduleType.color}20`,
                            boxShadow: `0 0 20px ${module.moduleType.color}50`,
                        }"
                    >
                        <component
                            :is="module.moduleType.icon"
                            :size="32"
                            :style="{ color: module.moduleType.color }"
                            class="group-hover:animate-pulse"
                        />
                    </div>

                    <!-- Status indicator -->
                    <div
                        class="absolute -top-2 -right-2 h-4 w-4 rounded-full border-2 border-black"
                        :class="{
                            'animate-pulse bg-green-400': module.status === 'active',
                            'bg-yellow-400': module.status === 'standby',
                            'bg-red-400': module.status === 'offline',
                        }"
                    ></div>

                    <!-- Module trail effect -->
                    <div
                        class="absolute inset-0 animate-ping rounded-lg opacity-30"
                        :style="{
                            backgroundColor: module.moduleType.color,
                            animationDuration: `${2 + index * 0.5}s`,
                        }"
                    ></div>

                    <!-- Hover info -->
                    <div
                        v-if="hoveredModule === module"
                        class="absolute bottom-full left-1/2 z-50 mb-4 -translate-x-1/2 transform rounded-lg border bg-black/90 p-3 text-xs whitespace-nowrap text-white backdrop-blur-sm"
                        :style="{ borderColor: module.moduleType.color }"
                    >
                        <div class="font-bold">{{ module.title }}</div>
                        <div class="text-gray-300">{{ module.moduleType.name }}</div>
                        <div class="text-gray-400">{{ formatDate(module.date) }}</div>
                    </div>
                </div>

                <!-- Connection beam to central station -->
                <div
                    v-if="selectedModule === module"
                    class="absolute top-1/2 left-1/2 h-0.5 origin-left opacity-50"
                    :style="{
                        width: `${module.orbit.radius}px`,
                        backgroundColor: module.moduleType.color,
                        transform: `rotate(${-getModulePosition(module).rotation}deg)`,
                        boxShadow: `0 0 10px ${module.moduleType.color}`,
                    }"
                ></div>
            </div>

            <!-- Orbital paths -->
            <div class="pointer-events-none absolute inset-0">
                <svg class="h-full w-full">
                    <defs>
                        <radialGradient id="orbitGradient">
                            <stop offset="0%" style="stop-color: #00d4ff; stop-opacity: 0.5" />
                            <stop offset="100%" style="stop-color: #00d4ff; stop-opacity: 0.1" />
                        </radialGradient>
                    </defs>

                    <g :transform="`translate(${viewportSize.width / 2 - cameraPosition.x}, ${viewportSize.height / 2 - cameraPosition.y})`">
                        <circle
                            v-for="radius in [300, 450, 600]"
                            :key="radius"
                            :r="radius"
                            fill="none"
                            stroke="url(#orbitGradient)"
                            stroke-width="1"
                            stroke-dasharray="5,10"
                            opacity="0.3"
                            class="animate-spin"
                            :style="{ animationDuration: `${radius / 10}s` }"
                        />
                    </g>
                </svg>
            </div>
        </div>

        <!-- Module details panel -->
        <Transition name="slide-in">
            <div
                v-if="selectedModule"
                class="fixed top-8 right-8 z-50 w-96 rounded-xl border bg-black/90 p-6 text-white backdrop-blur-sm"
                :style="{ borderColor: selectedModule.moduleType.color }"
            >
                <!-- Module header -->
                <div class="mb-4 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <component :is="selectedModule.moduleType.icon" :size="24" :style="{ color: selectedModule.moduleType.color }" />
                        <div>
                            <h3 class="font-bold">{{ selectedModule.title }}</h3>
                            <div class="text-xs text-gray-400">{{ selectedModule.moduleType.name }}</div>
                        </div>
                    </div>
                    <button @click="selectedModule = null" class="p-1 text-gray-400 transition-colors hover:text-white">✕</button>
                </div>

                <!-- Module image -->
                <div class="mb-4 overflow-hidden rounded-lg">
                    <img :src="selectedModule.image" :alt="selectedModule.title" class="h-40 w-full object-cover" />
                </div>

                <!-- Module description -->
                <p class="mb-4 text-sm text-gray-300">{{ selectedModule.description }}</p>

                <!-- Technologies -->
                <div class="mb-4">
                    <div class="mb-2 text-xs text-gray-400">Technologies:</div>
                    <div class="flex flex-wrap gap-2">
                        <span
                            v-for="(tech, index) in selectedModule.technologies"
                            :key="tech"
                            class="rounded border px-2 py-1 text-xs"
                            :style="{
                                borderColor: getTechColor(tech, index),
                                color: getTechColor(tech, index),
                                backgroundColor: `${getTechColor(tech, index)}20`,
                            }"
                        >
                            {{ tech }}
                        </span>
                    </div>
                </div>

                <!-- Module status -->
                <div class="mb-4 flex items-center gap-2">
                    <div
                        class="h-2 w-2 rounded-full"
                        :class="{
                            'animate-pulse bg-green-400': selectedModule.status === 'active',
                            'bg-yellow-400': selectedModule.status === 'standby',
                        }"
                    ></div>
                    <span class="text-xs text-gray-400"> Status: {{ selectedModule.status.toUpperCase() }} </span>
                    <div class="ml-auto flex items-center gap-1">
                        <Calendar :size="12" class="text-gray-400" />
                        <span class="text-xs text-gray-400">{{ formatDate(selectedModule.date) }}</span>
                    </div>
                </div>

                <!-- Action buttons -->
                <div class="flex gap-2">
                    <button
                        v-if="selectedModule.liveUrl"
                        @click="openLink(selectedModule.liveUrl)"
                        class="flex items-center gap-2 rounded bg-blue-600 px-3 py-2 text-sm transition-colors hover:bg-blue-700"
                    >
                        <ExternalLink :size="14" />
                        Launch
                    </button>
                    <button
                        v-if="selectedModule.githubUrl"
                        @click="openLink(selectedModule.githubUrl)"
                        class="flex items-center gap-2 rounded border border-gray-600 px-3 py-2 text-sm transition-colors hover:border-gray-500"
                    >
                        <Github :size="14" />
                        Source
                    </button>
                    <button
                        @click="dockToModule(selectedModule)"
                        class="flex items-center gap-2 rounded border border-cyan-400 px-3 py-2 text-sm text-cyan-400 transition-colors hover:bg-cyan-400/20"
                    >
                        <Rocket :size="14" />
                        Dock
                    </button>
                </div>
            </div>
        </Transition>

        <!-- Navigation help -->
        <div class="absolute bottom-8 left-8 text-sm text-cyan-400">
            <div class="rounded-lg border border-cyan-400/30 bg-black/50 p-4 backdrop-blur-sm">
                <div class="mb-2 font-bold">Navigation:</div>
                <div>🖱️ Drag to explore space</div>
                <div>🎯 Click modules to inspect</div>
                <div>🚀 Dock for detailed view</div>
                <div>🔍 Scroll to zoom</div>
            </div>
        </div>

        <!-- Mission status -->
        <div class="absolute top-8 left-8 text-sm text-cyan-400">
            <div class="rounded-lg border border-cyan-400/30 bg-black/50 p-4 backdrop-blur-sm">
                <div class="mb-2 font-bold">Mission Status:</div>
                <div class="flex items-center gap-2">
                    <div class="h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
                    <span>{{ spaceModules.length }} modules active</span>
                </div>
                <div class="flex items-center gap-2">
                    <div class="h-2 w-2 animate-pulse rounded-full bg-cyan-400"></div>
                    <span>Station operational</span>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.space-modules {
    background: linear-gradient(180deg, #000000 0%, #0a0a1a 50%, #000000 100%);
}

.perspective-2000 {
    perspective: 2000px;
}

/* Star field animations */
.stars {
    width: 1px;
    height: 1px;
    background: transparent;
    box-shadow:
        1541px 1139px #fff,
        1641px 896px #fff,
        1007px 1541px #fff,
        1681px 1139px #fff,
        1367px 1539px #fff,
        1784px 1139px #fff;
    animation: animStar 50s linear infinite;
}

.stars2 {
    width: 2px;
    height: 2px;
    background: transparent;
    box-shadow:
        781px 1676px #fff,
        1182px 1933px #fff,
        1627px 1430px #fff,
        691px 1185px #fff,
        1232px 1207px #fff,
        1690px 1446px #fff;
    animation: animStar 100s linear infinite;
}

.stars3 {
    width: 3px;
    height: 3px;
    background: transparent;
    box-shadow:
        1166px 1119px #fff,
        156px 1166px #fff,
        1966px 1234px #fff,
        1624px 1119px #fff,
        1420px 1234px #fff,
        1100px 1119px #fff;
    animation: animStar 150s linear infinite;
}

@keyframes animStar {
    from {
        transform: translateY(0px);
    }
    to {
        transform: translateY(-2000px);
    }
}

/* Nebula effects */
.nebula {
    position: absolute;
    border-radius: 50%;
    filter: blur(40px);
    opacity: 0.3;
    animation: nebula-drift 30s ease-in-out infinite;
}

.nebula-1 {
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, #00d4ff 0%, transparent 70%);
    top: 20%;
    left: 10%;
}

.nebula-2 {
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, #ff0080 0%, transparent 70%);
    top: 60%;
    right: 20%;
    animation-delay: -10s;
}

.nebula-3 {
    width: 250px;
    height: 250px;
    background: radial-gradient(circle, #00ff88 0%, transparent 70%);
    bottom: 30%;
    left: 60%;
    animation-delay: -20s;
}

@keyframes nebula-drift {
    0%,
    100% {
        transform: translate(0, 0) scale(1);
    }
    25% {
        transform: translate(30px, -20px) scale(1.1);
    }
    50% {
        transform: translate(-20px, 30px) scale(0.9);
    }
    75% {
        transform: translate(40px, 10px) scale(1.05);
    }
}

/* Module animations */
.project-module {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.project-module:hover {
    filter: brightness(1.2);
}

/* Transitions */
.slide-in-enter-active,
.slide-in-leave-active {
    transition: all 0.3s ease;
}

.slide-in-enter-from {
    transform: translateX(100%);
    opacity: 0;
}

.slide-in-leave-to {
    transform: translateX(100%);
    opacity: 0;
}
</style>
