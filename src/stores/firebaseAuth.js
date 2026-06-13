import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'

export const useFirebaseAuthStore = defineStore('firebaseAuth', () => {
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  const initializeAuth = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence)
      return new Promise((resolve) => {
        const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
          if (firebaseUser) {
            const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
            user.value = {
              id: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName || 'Anonymous',
              profileImage: firebaseUser.photoURL,
              ...userDoc.data(),
            }
          }
          unsubscribe()
          resolve()
        })
      })
    } catch (err) {
      error.value = err.message
    }
  }

  const register = async (email, displayName, profileImage) => {
    loading.value = true
    error.value = null
    try {
      const result = await createUserWithEmailAndPassword(auth, email, 'defaultPassword123')
      await setDoc(doc(db, 'users', result.user.uid), {
        email,
        displayName,
        profileImage: profileImage || '',
        role: 'user',
        postsCount: 0,
        candlesLit: 0,
        createdAt: new Date().toISOString(),
      })
      user.value = result.user
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const login = async (email, password) => {
    loading.value = true
    error.value = null
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      const userDoc = await getDoc(doc(db, 'users', result.user.uid))
      user.value = {
        id: result.user.uid,
        ...userDoc.data(),
      }
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      user.value = null
    } catch (err) {
      error.value = err.message
    }
  }

  const updateProfile = async (updates) => {
    if (!user.value) return
    try {
      await setDoc(doc(db, 'users', user.value.id), updates, { merge: true })
      user.value = { ...user.value, ...updates }
    } catch (err) {
      error.value = err.message
    }
  }

  return {
    user,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    initializeAuth,
    register,
    login,
    logout,
    updateProfile,
  }
})
