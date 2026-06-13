<template>
  <div class="bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700/50 p-6 sticky top-24">
    <div v-if="user" class="space-y-4">
      <div class="flex flex-col items-center">
        <img :src="user.profileImage" :alt="user.displayName" class="w-16 h-16 rounded-full object-cover mb-3" />
        <p class="font-semibold text-white text-center">{{ user.displayName }}</p>
        <p class="text-xs text-slate-400">{{ user.email }}</p>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div class="bg-slate-700/30 rounded-lg p-3 text-center">
          <p class="text-2xl font-bold text-white">{{ user.postsCount }}</p>
          <p class="text-xs text-slate-400">Innlegg</p>
        </div>
        <div class="bg-slate-700/30 rounded-lg p-3 text-center">
          <p class="text-2xl font-bold text-orange-400">{{ user.candlesLit }}</p>
          <p class="text-xs text-slate-400">Lys tent</p>
        </div>
      </div>

      <button
        @click="logout"
        class="w-full py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors text-sm font-medium"
      >
        Logg ut
      </button>
    </div>
    <div v-else class="text-center space-y-3">
      <p class="text-slate-300">Logg inn for å dele minneord</p>
      <button
        @click="login"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors font-medium"
      >
        Logg inn
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const user = computed(() => authStore.user)

const logout = () => {
  authStore.logout()
}

const login = () => {
  authStore.openAuthModal()
}
</script>
