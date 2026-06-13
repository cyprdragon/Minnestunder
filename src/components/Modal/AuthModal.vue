<template>
  <Transition name="fade">
    <div v-if="true" class="fixed inset-0 z-50 flex items-center justify-center" @click="closeModal">
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="closeModal" />
      <div
        class="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl max-w-md w-full mx-4"
        @click.stop
      >
        <div class="p-8">
          <h2 class="text-3xl font-bold text-white mb-2">Logg inn eller registrer</h2>
          <p class="text-slate-400 mb-6">Del dine minneord og bli en del av fellesskapet</p>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">E-postadresse</label>
              <input
                v-model="form.email"
                type="email"
                placeholder="navn@eksempel.no"
                class="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Visningsnavn</label>
              <input
                v-model="form.displayName"
                type="text"
                placeholder="Ditt navn"
                class="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Profilbilde (valgfritt)</label>
              <div
                class="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center cursor-pointer hover:border-slate-500 transition-colors"
                @click="triggerFileUpload"
              >
                <ImageIcon class="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p class="text-sm text-slate-400">Klikk for å laste opp bilde</p>
                <input
                  type="file"
                  accept="image/*"
                  class="hidden"
                  ref="fileInput"
                  @change="handleImageUpload"
                />
              </div>
            </div>

            <button
              @click="handleLogin"
              class="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 rounded-lg transition-all duration-300"
            >
              Logg inn / Registrer
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { ImageIcon } from 'lucide-vue-next'

const authStore = useAuthStore()
const fileInput = ref(null)

const form = ref({
  email: '',
  displayName: '',
  profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
})

const closeModal = () => {
  authStore.closeAuthModal()
}

const triggerFileUpload = () => {
  fileInput.value?.click()
}

const handleImageUpload = (e) => {
  const file = e.target.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (event) => {
      form.value.profileImage = event.target?.result
    }
    reader.readAsDataURL(file)
  }
}

const handleLogin = () => {
  if (form.value.email && form.value.displayName) {
    authStore.login(
      form.value.email,
      form.value.displayName,
      form.value.profileImage
    )
  } else {
    alert('Vennligst fyll ut alle felt')
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
