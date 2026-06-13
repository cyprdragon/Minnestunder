<template>
  <Transition name="slide-up">
    <div v-if="true" class="fixed inset-0 z-50 flex items-end" @click="closeModal">
      <div
        class="absolute inset-0 bg-black/50 backdrop-blur-sm"
        @click="closeModal"
      />
      <div
        class="relative w-full bg-gradient-to-t from-slate-900 to-slate-800 rounded-t-3xl shadow-2xl max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <div class="sticky top-0 px-6 py-4 border-b border-slate-700/30 bg-gradient-to-b from-slate-800 to-slate-800/50 backdrop-blur-md">
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold text-white">Del dine minneord</h2>
            <button
              @click="closeModal"
              class="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <X class="w-6 h-6 text-slate-400" />
            </button>
          </div>
        </div>

        <div class="p-6 space-y-4">
          <div v-if="!isAuthenticated" class="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-blue-200 text-sm">
            Du må være logget inn for å dele minneord. <button @click="login" class="underline font-semibold">Logg inn</button>
          </div>

          <div v-if="isAuthenticated" class="space-y-4">
            <!-- Profile Preview -->
            <div class="flex items-center gap-3">
              <img :src="user.profileImage" :alt="user.displayName" class="w-12 h-12 rounded-full object-cover" />
              <div>
                <p class="font-semibold text-white">{{ user.displayName }}</p>
                <p class="text-sm text-slate-400">Deler minneord</p>
              </div>
            </div>

            <!-- Text Area -->
            <textarea
              v-model="newPost.content"
              placeholder="Del dine kjære minner..."
              class="w-full bg-slate-700/50 border border-slate-600 rounded-xl p-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-32"
            />

            <!-- Media Upload -->
            <div class="flex gap-2">
              <button class="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border-2 border-dashed border-slate-600 hover:border-slate-500 transition-colors text-slate-400 hover:text-slate-300">
                <ImageIcon class="w-5 h-5" />
                <span class="text-sm">Legg til bilde</span>
              </button>
              <button class="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border-2 border-dashed border-slate-600 hover:border-slate-500 transition-colors text-slate-400 hover:text-slate-300">
                <VideoIcon class="w-5 h-5" />
                <span class="text-sm">Legg til video</span>
              </button>
            </div>

            <!-- Publish Button -->
            <button
              @click="publishPost"
              :disabled="!newPost.content.trim()"
              class="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all duration-300"
            >
              Del minneord
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useFeedStore } from '@/stores/feed'
import { useUIStore } from '@/stores/ui'
import { X, ImageIcon, VideoIcon } from 'lucide-vue-next'

const authStore = useAuthStore()
const feedStore = useFeedStore()
const uiStore = useUIStore()

const newPost = ref({ content: '', type: 'text' })
const isAuthenticated = computed(() => authStore.isAuthenticated)
const user = computed(() => authStore.user)

const closeModal = () => {
  uiStore.closeMemoryWordsModal()
  newPost.value = { content: '', type: 'text' }
}

const login = () => {
  authStore.openAuthModal()
}

const publishPost = () => {
  if (newPost.value.content.trim() && isAuthenticated.value) {
    feedStore.addPost({
      author: {
        name: user.value.displayName,
        image: user.value.profileImage,
      },
      content: newPost.value.content,
      type: newPost.value.type,
    })
    closeModal()
  }
}
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(100%);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
</style>
