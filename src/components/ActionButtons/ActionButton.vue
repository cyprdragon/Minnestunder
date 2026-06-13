<template>
  <button
    @click="$emit('click')
    class="group relative px-4 py-6 rounded-2xl bg-gradient-to-br transition-all duration-300 hover:shadow-lg hover:shadow-current/50 active:scale-95 overflow-hidden"
    :class="`${className} hover:shadow-xl`"
  >
    <div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div class="absolute inset-0 rounded-2xl border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

    <div class="relative flex flex-col items-center gap-3">
      <component :is="getIcon(icon)" class="w-6 h-6 text-white" />
      <div class="text-center">
        <p class="text-white font-semibold text-sm">{{ label }}</p>
        <p v-if="count" class="text-white/70 text-xs mt-1">{{ count }}</p>
      </div>
    </div>

    <!-- Ripple effect -->
    <div class="absolute inset-0 pointer-events-none" />
  </button>
</template>

<script setup>
import { defineEmits } from 'vue'
import * as LucideIcons from 'lucide-vue-next'

defineProps({
  icon: String,
  label: String,
  count: [Number, String],
  className: String,
})

defineEmits(['click'])

const getIcon = (iconName) => {
  return LucideIcons[iconName] || LucideIcons.Heart
}
</script>
