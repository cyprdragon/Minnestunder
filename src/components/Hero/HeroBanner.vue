<template>
  <div class="relative h-96 overflow-hidden">
    <div
      class="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-500 hover:scale-110"
      :style="{ backgroundImage: `url('${memorial.bannerImage}')` }"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/60 to-slate-950" />

    <div class="relative h-full flex flex-col items-center justify-end pb-20">
      <div class="animate-fade-in">
        <div class="mb-6 -translate-y-16 transform transition-transform duration-300 hover:scale-105">
          <img
            :src="memorial.profileImage"
            :alt="memorial.name"
            class="w-32 h-32 rounded-full border-4 border-white/20 backdrop-blur-xl bg-slate-900/50 shadow-2xl object-cover"
          />
        </div>
        <h1 class="text-5xl font-bold text-white text-center drop-shadow-lg">{{ memorial.name }}</h1>
        <p class="text-slate-300 text-lg text-center mt-2">{{ memorial.subtitle }}</p>
        <p class="text-slate-400 text-center mt-2">
          {{ formatDate(memorial.birthDate) }} - {{ formatDate(memorial.deathDate) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useProfileStore } from '@/stores/profile'
import { formatDate } from '@/utils/helpers'

const profileStore = useProfileStore()
const memorial = computed(() => profileStore.memorial)
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
