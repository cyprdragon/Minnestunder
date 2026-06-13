<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
    <ActionButton
      icon="Flame"
      label="Tenn et lys"
      :count="candlesCount"
      class-name="from-orange-600 to-orange-700"
      @click="lightCandle"
    />
    <ActionButton
      icon="Feather2"
      label="Minneord"
      class-name="from-purple-600 to-purple-700"
      @click="openMemoryWordsModal"
    />
    <ActionButton
      icon="Image"
      label="Bilder"
      class-name="from-blue-600 to-blue-700"
      @click="navigateToGallery"
    />
    <ActionButton
      icon="Video"
      label="Videoer"
      class-name="from-pink-600 to-pink-700"
      @click="filterByVideos"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useFeedStore } from '@/stores/feed'
import { useUIStore } from '@/stores/ui'
import ActionButton from './ActionButton.vue'

const router = useRouter()
const feedStore = useFeedStore()
const uiStore = useUIStore()

const candlesCount = computed(() => feedStore.candlesCount)

const lightCandle = () => {
  // Create animation
  alert('🕯️ Et lys er tent i minnene')
}

const openMemoryWordsModal = () => {
  uiStore.openMemoryWordsModal()
}

const navigateToGallery = () => {
  router.push('/gallery')
}

const filterByVideos = () => {
  feedStore.setFilter('videos')
}
</script>
