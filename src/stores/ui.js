import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore('ui', () => {
  const isDarkMode = ref(true)
  const appReady = ref(false)
  const showMemoryWordsModal = ref(false)
  const showGalleryModal = ref(false)
  const selectedImage = ref(null)

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const setAppReady = (ready) => {
    appReady.value = ready
  }

  const openMemoryWordsModal = () => {
    showMemoryWordsModal.value = true
  }

  const closeMemoryWordsModal = () => {
    showMemoryWordsModal.value = false
  }

  const openGalleryModal = (image) => {
    selectedImage.value = image
    showGalleryModal.value = true
  }

  const closeGalleryModal = () => {
    showGalleryModal.value = false
    selectedImage.value = null
  }

  return {
    isDarkMode,
    appReady,
    showMemoryWordsModal,
    showGalleryModal,
    selectedImage,
    toggleDarkMode,
    setAppReady,
    openMemoryWordsModal,
    closeMemoryWordsModal,
    openGalleryModal,
    closeGalleryModal,
  }
}, { persist: true })
