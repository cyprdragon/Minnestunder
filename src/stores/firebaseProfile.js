import { defineStore } from 'pinia'
import { ref } from 'vue'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export const useFirebaseProfileStore = defineStore('firebaseProfile', () => {
  const memorial = ref({
    name: 'Navn på avdød',
    birthDate: '1950-01-01',
    deathDate: new Date().toISOString().split('T')[0],
    subtitle: 'En elsket minne',
    bannerImage: 'https://images.unsplash.com/photo-1469022563149-aa64dbd37dae?w=1200&h=400&fit=crop',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    biography: 'En kort biografi om personen',
  })

  const fetchMemorial = async () => {
    try {
      const doc_ref = doc(db, 'memorial', 'main')
      const docSnap = await getDoc(doc_ref)
      if (docSnap.exists()) {
        memorial.value = { ...memorial.value, ...docSnap.data() }
      }
    } catch (err) {
      console.error('Failed to fetch memorial:', err)
    }
  }

  const updateMemorial = async (updates) => {
    try {
      await setDoc(doc(db, 'memorial', 'main'), updates, { merge: true })
      memorial.value = { ...memorial.value, ...updates }
    } catch (err) {
      console.error('Failed to update memorial:', err)
    }
  }

  return {
    memorial,
    fetchMemorial,
    updateMemorial,
  }
})
