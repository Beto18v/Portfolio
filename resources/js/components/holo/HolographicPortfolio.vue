<script setup lang="ts">
import ContactSection from '@/components/holo/ContactSection.vue';
import HolographicProjects from '@/components/holo/HolographicProjects.vue';
import HolographicSkillsFixed from '@/components/holo/HolographicSkillsFixed.vue';
import QuantumProfile from '@/components/holo/QuantumProfile.vue';
import { usePortfolioData } from '@/composables/usePortfolioData';
import { computed } from 'vue';
const { sectionTexts } = usePortfolioData();

const props = defineProps<{ currentSection: string; portfolioData: any }>();

const showSkills = computed(() => props.currentSection === 'skills');
const showProfile = computed(() => props.currentSection === 'profile');
const showProjects = computed(() => props.currentSection === 'projects');
const showContact = computed(() => props.currentSection === 'contact');

/**
 * Holographic Portfolio Component
 * Main container for the holographic interface mode
 * Renders different sections based on current navigation state
 *
 * Features:
 * - Terminal-like interface with holographic effects
 * - Dynamic section switching (Profile, Skills, Projects, Contact)
 * - 3D visual effects and animations
 * - Responsive layout with dark theme
 *
 * @author Portfolio Project
 * @version 1.0
 */
</script>

<template>
    <div class="holo-interface">
        <!-- Skills Section - Shows holographic skills visualization -->
        <div v-if="showSkills">
            <HolographicSkillsFixed :skills="portfolioData.skills" />
        </div>

        <!-- Other Sections - Traditional layout within holographic theme -->
        <div v-else class="traditional-in-holo min-h-screen bg-black">
            <div class="holo-wrapper">
                <!-- Profile Section - Quantum profile with particle effects -->
                <QuantumProfile v-if="showProfile" :description="portfolioData.about.description" :image="portfolioData.profileImage" />

                <!-- Projects Section - Holographic projects display -->
                <section v-else-if="showProjects" class="quantum-projects relative min-h-screen overflow-hidden bg-black">
                    <HolographicProjects :sectionTexts="sectionTexts" :portfolioData="portfolioData" />
                </section>

                <!-- Contact Section - Contact form with holographic styling -->
                <ContactSection v-else-if="showContact" />
            </div>
        </div>
    </div>
</template>
