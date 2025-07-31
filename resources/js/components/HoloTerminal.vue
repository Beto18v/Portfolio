<script setup lang="ts">
import { useTranslation } from '@/composables/useTranslation';
import { Briefcase, Code, Mail, User } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';

/**
 * HoloTerminal Component
 * Revolutionary immersive terminal-style navigation system
 * Features holographic interface with command-line interactions
 */

const { t } = useTranslation();

// Terminal state
const currentCommand = ref('');
const terminalHistory = ref<Array<{ type: 'command' | 'output' | 'system'; content: string; timestamp: Date }>>([]);
const isTyping = ref(false);
const currentPath = ref('~/portfolio');
const terminalRef = ref<HTMLElement>();

// Command suggestions
const availableCommands = [
    { cmd: 'help', desc: 'Show available commands' },
    { cmd: 'whoami', desc: 'Display developer information' },
    { cmd: 'ls skills', desc: 'List technical skills' },
    { cmd: 'cat projects', desc: 'Display featured projects' },
    { cmd: 'send message', desc: 'Open contact interface' },
    { cmd: 'theme dark/light', desc: 'Toggle theme mode' },
    { cmd: 'lang <es|en|zh>', desc: 'Change language' },
    { cmd: 'clear', desc: 'Clear terminal history' },
];

// Command history for navigation
const commandHistory = ref<string[]>([]);
const historyIndex = ref(-1);

// Auto-typing animation
const autoTypeText = ref('');
const fullAutoText = 'Welcome to the Holographic Portfolio Interface v2.0...';

// Portfolio sections as "applications"
const portfolioApps = ref([
    {
        id: 'profile',
        name: 'PROFILE.exe',
        icon: User,
        status: 'ready',
        description: 'Personal information and bio',
        command: 'run profile',
    },
    {
        id: 'skills',
        name: 'SKILLS.app',
        icon: Code,
        status: 'active',
        description: 'Technical capabilities matrix',
        command: 'exec skills --interactive',
    },
    {
        id: 'projects',
        name: 'PROJECTS.sys',
        icon: Briefcase,
        status: 'ready',
        description: 'Project deployment dashboard',
        command: 'deploy projects --preview',
    },
    {
        id: 'contact',
        name: 'CONTACT.com',
        icon: Mail,
        status: 'standby',
        description: 'Communication protocols',
        command: 'establish contact',
    },
]);

// Initialize terminal with welcome message
onMounted(() => {
    setTimeout(() => {
        startWelcomeSequence();
    }, 500);
});

/**
 * Start the welcome typing animation
 */
const startWelcomeSequence = async () => {
    isTyping.value = true;

    // Add system boot messages
    await addSystemMessage('SYSTEM BOOT: Initializing holographic interface...');
    await delay(800);
    await addSystemMessage('LOADING: Portfolio modules [████████████] 100%');
    await delay(600);
    await addSystemMessage('STATUS: All systems operational');
    await delay(400);

    // Type welcome message
    for (let i = 0; i <= fullAutoText.length; i++) {
        autoTypeText.value = fullAutoText.slice(0, i);
        await delay(50);
    }

    await delay(1000);
    await addSystemMessage('Type "help" to see available commands or click on applications above.');
    isTyping.value = false;
};

/**
 * Add system message to terminal
 */
const addSystemMessage = async (message: string) => {
    terminalHistory.value.push({
        type: 'system',
        content: message,
        timestamp: new Date(),
    });
    await delay(100);
    scrollToBottom();
};

/**
 * Process terminal command
 */
const executeCommand = async (command: string) => {
    if (!command.trim()) return;

    // Add command to history
    terminalHistory.value.push({
        type: 'command',
        content: `${currentPath.value} $ ${command}`,
        timestamp: new Date(),
    });

    commandHistory.value.unshift(command);
    historyIndex.value = -1;

    // Process command
    await processCommand(command.trim().toLowerCase());
    currentCommand.value = '';
    scrollToBottom();
};

/**
 * Process different commands
 */
const processCommand = async (cmd: string) => {
    const args = cmd.split(' ');
    const baseCmd = args[0];

    switch (baseCmd) {
        case 'help':
            await showHelp();
            break;
        case 'whoami':
            await showProfile();
            break;
        case 'ls':
            if (args[1] === 'skills') await listSkills();
            else await listDirectory();
            break;
        case 'cat':
            if (args[1] === 'projects') await showProjects();
            break;
        case 'clear':
            terminalHistory.value = [];
            break;
        case 'theme':
            if (args[1]) await toggleTheme(args[1]);
            break;
        case 'lang':
            if (args[1]) await changeLanguage(args[1]);
            break;
        case 'run':
        case 'exec':
        case 'deploy':
        case 'establish':
            await executeApp(cmd);
            break;
        default:
            await addOutput(`Command not found: ${baseCmd}. Type 'help' for available commands.`);
    }
};

/**
 * Show help information
 */
const showHelp = async () => {
    await addOutput('=== PORTFOLIO TERMINAL HELP ===');
    await delay(200);

    for (const { cmd, desc } of availableCommands) {
        await addOutput(`  ${cmd.padEnd(20)} - ${desc}`);
        await delay(100);
    }

    await delay(300);
    await addOutput('\n=== QUICK ACCESS APPLICATIONS ===');
    await delay(200);

    for (const app of portfolioApps.value) {
        await addOutput(`  ${app.command.padEnd(25)} - ${app.description}`);
        await delay(100);
    }
};

/**
 * Show profile information
 */
const showProfile = async () => {
    await addOutput('=== DEVELOPER PROFILE ===');
    await delay(200);
    await addOutput('Name: Your Name'); // Will be replaced with actual data
    await addOutput('Role: Full Stack Developer');
    await addOutput('Experience: 3+ years');
    await addOutput('Status: Available for hire');
    await addOutput('Location: Your Location');
    await addOutput('Specialization: Modern web technologies');
};

/**
 * List skills
 */
const listSkills = async () => {
    const skills = [
        'Frontend: Vue.js, React, TypeScript, Tailwind CSS',
        'Backend: Laravel, Node.js, PHP, Python',
        'Database: MySQL, PostgreSQL, MongoDB, Redis',
        'Tools: Git, Docker, AWS, Vite, VS Code',
    ];

    await addOutput('=== TECHNICAL SKILLS MATRIX ===');
    await delay(200);

    for (const skill of skills) {
        await addOutput(`[████████████] ${skill}`);
        await delay(150);
    }
};

/**
 * Show projects
 */
const showProjects = async () => {
    await addOutput('=== FEATURED PROJECTS ===');
    await delay(200);
    await addOutput('1. E-Commerce Platform - Full Stack Application');
    await addOutput('2. Task Management App - Real-time Collaboration');
    await addOutput('3. Weather Dashboard - Interactive Data Visualization');
    await addOutput('4. Portfolio Website - Modern UI/UX Design');
    await delay(300);
    await addOutput('\nUse "deploy projects --preview" for interactive view.');
};

/**
 * Execute application
 */
const executeApp = async (command: string) => {
    const app = portfolioApps.value.find((a) => command.includes(a.id));
    if (app) {
        await addOutput(`Launching ${app.name}...`);
        await delay(500);
        app.status = 'running';
        // Emit event to parent to show specific section
        emitAppLaunch(app.id);
    } else {
        await addOutput('Application not found. Use "help" to see available apps.');
    }
};

/**
 * Add output to terminal
 */
const addOutput = async (content: string) => {
    terminalHistory.value.push({
        type: 'output',
        content,
        timestamp: new Date(),
    });
    await delay(50);
};

/**
 * Emit app launch event
 */
const emitAppLaunch = (appId: string) => {
    // This will be connected to parent component to show sections
    window.dispatchEvent(new CustomEvent('portfolio-app-launch', { detail: { appId } }));
};

/**
 * Handle keyboard navigation
 */
const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        executeCommand(currentCommand.value);
    } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (historyIndex.value < commandHistory.value.length - 1) {
            historyIndex.value++;
            currentCommand.value = commandHistory.value[historyIndex.value];
        }
    } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (historyIndex.value > 0) {
            historyIndex.value--;
            currentCommand.value = commandHistory.value[historyIndex.value];
        } else if (historyIndex.value === 0) {
            historyIndex.value = -1;
            currentCommand.value = '';
        }
    }
};

/**
 * Quick launch application
 */
const quickLaunch = (app: any) => {
    executeCommand(app.command);
};

/**
 * Utility functions
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const scrollToBottom = () => {
    if (terminalRef.value) {
        terminalRef.value.scrollTop = terminalRef.value.scrollHeight;
    }
};

// Other utility functions for theme, language, etc.
const toggleTheme = async (theme: string) => {
    await addOutput(`Theme switched to: ${theme}`);
    // Implement theme switching logic
};

const changeLanguage = async (lang: string) => {
    await addOutput(`Language changed to: ${lang}`);
    // Implement language switching logic
};

const listDirectory = async () => {
    await addOutput('portfolio/');
    await addOutput('├── about.md');
    await addOutput('├── skills/');
    await addOutput('├── projects/');
    await addOutput('├── contact.json');
    await addOutput('└── README.md');
};
</script>

<template>
    <div class="holoterminal-container relative min-h-screen overflow-hidden bg-black font-mono text-green-400">
        <!-- Holographic grid background -->
        <div class="absolute inset-0 opacity-20">
            <div class="grid h-full w-full grid-cols-12 grid-rows-12 gap-1">
                <div
                    v-for="i in 144"
                    :key="i"
                    class="animate-pulse border border-cyan-500/30"
                    :style="{ animationDelay: `${Math.random() * 3}s` }"
                ></div>
            </div>
        </div>

        <!-- Floating geometric shapes -->
        <div class="pointer-events-none absolute inset-0 overflow-hidden">
            <div class="absolute top-20 left-10 h-4 w-4 rotate-45 animate-spin border border-cyan-400" style="animation-duration: 10s"></div>
            <div class="absolute top-40 right-20 h-6 w-6 animate-pulse border border-purple-400"></div>
            <div class="absolute bottom-32 left-1/4 h-8 w-8 animate-bounce rounded-full border border-pink-400" style="animation-duration: 3s"></div>
        </div>

        <!-- Main container -->
        <div class="relative z-10 flex h-screen flex-col p-6">
            <!-- Terminal window -->
            <div class="flex flex-1 flex-col rounded-lg border border-gray-700 bg-black/80 backdrop-blur-sm">
                <!-- Terminal header -->
                <div class="flex items-center justify-between border-b border-gray-700 bg-gray-900/50 px-4 py-2">
                    <div class="flex items-center gap-2">
                        <div class="h-3 w-3 rounded-full bg-red-500"></div>
                        <div class="h-3 w-3 rounded-full bg-yellow-500"></div>
                        <div class="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <div class="text-sm text-gray-400">Portfolio Terminal</div>
                    <div class="text-xs text-gray-500">{{ currentPath }}</div>
                </div>

                <!-- Terminal content -->
                <div ref="terminalRef" class="scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent flex-1 overflow-y-auto p-4">
                    <!-- Auto-typing welcome message -->
                    <div v-if="isTyping" class="mb-4">
                        <span class="text-cyan-400">{{ autoTypeText }}</span>
                        <span class="animate-pulse">|</span>
                    </div>

                    <!-- Terminal history -->
                    <div v-for="(entry, index) in terminalHistory" :key="index" class="mb-2">
                        <div
                            :class="{
                                'text-white': entry.type === 'command',
                                'text-green-400': entry.type === 'output',
                                'text-cyan-400': entry.type === 'system',
                            }"
                        >
                            <span v-if="entry.type === 'system'" class="text-yellow-400">[SYSTEM]</span>
                            {{ entry.content }}
                        </div>
                    </div>

                    <!-- Current command line -->
                    <div class="flex items-center">
                        <span class="mr-2 text-cyan-400">{{ currentPath }} $</span>
                        <input
                            v-model="currentCommand"
                            @keydown="handleKeyDown"
                            class="flex-1 bg-transparent text-white outline-none"
                            placeholder="Type a command..."
                            autofocus
                        />
                        <span class="animate-pulse text-white">|</span>
                    </div>
                </div>

                <!-- Status bar -->
                <div class="flex justify-between border-t border-gray-700 bg-gray-900/50 px-4 py-2 text-xs text-gray-400">
                    <span>Ready for input</span>
                    <span>Press TAB for autocomplete | Use ↑↓ for history</span>
                </div>
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
            <div
                class="absolute top-0 left-0 h-full w-1 animate-pulse bg-gradient-to-b from-transparent via-pink-400 to-transparent opacity-50"
                style="animation-delay: 2s"
            ></div>
            <div
                class="absolute top-0 right-0 h-full w-1 animate-pulse bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-50"
                style="animation-delay: 0.5s"
            ></div>
        </div>
    </div>
</template>

<style scoped>
.holoterminal-container {
    background:
        radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%), linear-gradient(135deg, #000000 0%, #0a0a0a 100%);
}

.scrollbar-thin {
    scrollbar-width: thin;
}

.scrollbar-thumb-gray-600::-webkit-scrollbar-thumb {
    background-color: #4b5563;
    border-radius: 4px;
}

.scrollbar-track-transparent::-webkit-scrollbar-track {
    background: transparent;
}

.scrollbar-thin::-webkit-scrollbar {
    width: 6px;
}

/* Custom animations */
@keyframes holographic-pulse {
    0%,
    100% {
        box-shadow: 0 0 5px rgba(6, 182, 212, 0.5);
    }
    50% {
        box-shadow:
            0 0 20px rgba(6, 182, 212, 0.8),
            0 0 30px rgba(6, 182, 212, 0.6);
    }
}

.group:hover {
    animation: holographic-pulse 2s infinite;
}
</style>
