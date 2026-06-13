<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
    <Transition name="fade">
      <router-view />
    </Transition>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useUIStore } from '@/stores/ui'
import { useAuthStore } from '@/stores/auth'

const uiStore = useUIStore()
const authStore = useAuthStore()

onMounted(async () => {
  // Initialize app
  await authStore.initializeAuth()
  uiStore.setAppReady(true)
})
</script>

<style>
@import url('https://rsms.me/inter/inter.css');

* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
