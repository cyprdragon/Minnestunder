<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12">
    <div class="max-w-6xl mx-auto px-4">
      <h1 class="text-4xl font-bold text-white mb-8 flex items-center gap-3">
        <SettingsIcon class="w-8 h-8" />
        Administrator Panel
      </h1>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Memorial Information -->
        <div class="bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700/50 p-6">
          <h2 class="text-2xl font-semibold text-white mb-6">Minneinformasjon</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Navn</label>
              <input
                v-model="memorial.name"
                type="text"
                class="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-slate-300 mb-2">Fødselsdato</label>
                <input
                  v-model="memorial.birthDate"
                  type="date"
                  class="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-300 mb-2">Dødsdato</label>
                <input
                  v-model="memorial.deathDate"
                  type="date"
                  class="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Undertittel</label>
              <input
                v-model="memorial.subtitle"
                type="text"
                class="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              @click="saveMemorial"
              class="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 rounded-lg transition-all duration-300"
            >
              Lagre endringer
            </button>
          </div>
        </div>

        <!-- Moderate Content -->
        <div class="bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700/50 p-6">
          <h2 class="text-2xl font-semibold text-white mb-6">Moderer innlegg</h2>
          <div class="space-y-4 max-h-96 overflow-y-auto">
            <div
              v-for="post in posts"
              :key="post.id"
              class="bg-slate-700/30 rounded-lg p-4 flex items-start justify-between"
            >
              <div class="flex-1">
                <p class="font-semibold text-white">{{ post.author.name }}</p>
                <p class="text-slate-300 text-sm mt-1 line-clamp-2">{{ post.content }}</p>
              </div>
              <button
                @click="deletePost(post.id)"
                class="ml-4 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
              >
                Slett
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProfileStore } from '@/stores/profile'
import { useFeedStore } from '@/stores/feed'
import { SettingsIcon } from 'lucide-vue-next'

const profileStore = useProfileStore()
const feedStore = useFeedStore()

const memorial = ref({ ...profileStore.memorial })
const posts = computed(() => feedStore.posts)

const saveMemorial = () => {
  profileStore.updateMemorial(memorial.value)
  alert('Minneinformasjon oppdatert!')
}

const deletePost = (postId) => {
  feedStore.deletePost(postId)
}
</script>
