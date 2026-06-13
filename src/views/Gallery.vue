<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
    <div class="max-w-6xl mx-auto px-4 py-12">
      <h1 class="text-4xl font-bold text-white mb-2 flex items-center gap-3">
        <ImageIcon class="w-8 h-8" />
        Bildegalleri
      </h1>
      <p class="text-slate-400 mb-8">Del kjære minner gjennom bilder og videoer</p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="post in imagePosts"
          :key="post.id"
          class="group relative overflow-hidden rounded-2xl bg-slate-800/50 backdrop-blur-md border border-slate-700/50 hover:border-slate-600 transition-all duration-300 cursor-pointer"
          @click="openGallery(post)"
        >
          <div class="aspect-square overflow-hidden">
            <img
              v-if="post.image"
              :src="post.image"
              :alt="post.content"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <div class="text-white text-sm line-clamp-2">{{ post.content }}</div>
          </div>
        </div>
      </div>
    </div>
    <GalleryModal v-if="showGalleryModal" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useFeedStore } from '@/stores/feed'
import { useUIStore } from '@/stores/ui'
import { ImageIcon } from 'lucide-vue-next'
import GalleryModal from '@/components/Modal/GalleryModal.vue'

const feedStore = useFeedStore()
const uiStore = useUIStore()

const imagePosts = computed(() =>
  feedStore.posts.filter(p => p.type === 'image' || p.type === 'video')
)
const showGalleryModal = computed(() => uiStore.showGalleryModal)

const openGallery = (post) => {
  uiStore.openGalleryModal(post)
}
</script>
