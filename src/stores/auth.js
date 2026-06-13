import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const authModalOpen = ref(false)
  const adminId = ref('admin123')

  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.id === adminId.value)

  const initializeAuth = async () => {
    const stored = localStorage.getItem('minnestunder_user')
    if (stored) {
      try {
        user.value = JSON.parse(stored)
      } catch (e) {
        console.error('Failed to load user:', e)
      }
    }
  }

  const login = async (email, displayName, profileImage = null) => {
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      displayName,
      profileImage,
      postsCount: 0,
      candlesLit: 0,
      createdAt: new Date().toISOString(),
    }
    user.value = newUser
    localStorage.setItem('minnestunder_user', JSON.stringify(newUser))
    authModalOpen.value = false
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem('minnestunder_user')
  }

  const openAuthModal = () => {
    authModalOpen.value = true
  }

  const closeAuthModal = () => {
    authModalOpen.value = false
  }

  const updateUserStats = (stats) => {
    if (user.value) {
      Object.assign(user.value, stats)
      localStorage.setItem('minnestunder_user', JSON.stringify(user.value))
    }
  }

  return {
    user,
    authModalOpen,
    isAuthenticated,
    isAdmin,
    initializeAuth,
    login,
    logout,
    openAuthModal,
    closeAuthModal,
    updateUserStats,
  }
}, { persist: true })
