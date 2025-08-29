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
</script>

<template>
    <div class="holo-interface">
        <div v-if="showSkills">
            <HolographicSkillsFixed :skills="portfolioData.skills" />
        </div>
        <div v-else class="traditional-in-holo min-h-screen bg-black">
            <div class="holo-wrapper">
                <QuantumProfile v-if="showProfile" :description="portfolioData.about.description" :image="portfolioData.profileImage" />
                <section v-else-if="showProjects" class="quantum-projects relative min-h-screen overflow-hidden bg-black">
                    <HolographicProjects :sectionTexts="sectionTexts" :portfolioData="portfolioData" />
                </section>
                <ContactSection v-else-if="showContact" />
            </div>
        </div>
    </div>
</template>
