<template>
  <Transition name="fade">
    <div v-if="true" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80" @click="closeModal">
      <div class="relative w-full h-full flex items-center justify-center p-4">
        <button
          @click="closeModal"
          class="absolute top-4 right-4 z-10 p-2 hover:bg-slate-800 rounded-lg transition-colors"
        >
          <X class="w-6 h-6 text-white" />
        </button>

        <img
          v-if="selectedImage?.image"
          :src="selectedImage.image"
          :alt="selectedImage.content"
          class="max-w-4xl max-h-[80vh] object-contain rounded-lg"
        />
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue'
import { useUIStore } from '@/stores/ui'
import { X } from 'lucide-vue-next'

const uiStore = useUIStore()

const selectedImage = computed(() => uiStore.selectedImage)

const closeModal = () => {
  uiStore.closeGalleryModal()
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
