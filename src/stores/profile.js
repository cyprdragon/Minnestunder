import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProfileStore = defineStore('profile', () => {
  const memorial = ref({
    name: 'Navn på avdød',
    birthDate: '1950-01-01',
    deathDate: '2024-06-13',
    subtitle: 'En elsket minne',
    bannerImage: 'https://images.unsplash.com/photo-1469022563149-aa64dbd37dae?w=1200&h=400&fit=crop',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    biography: 'En kort biografi om personen',
  })

  const updateMemorial = (updates) => {
    memorial.value = { ...memorial.value, ...updates }
  }

  const updateBannerImage = (imageUrl) => {
    memorial.value.bannerImage = imageUrl
  }

  const updateProfileImage = (imageUrl) => {
    memorial.value.profileImage = imageUrl
  }

  return {
    memorial,
    updateMemorial,
    updateBannerImage,
    updateProfileImage,
  }
}, { persist: true })
