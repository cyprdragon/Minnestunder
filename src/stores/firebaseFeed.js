import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { collection, addDoc, getDocs, query, orderBy, deleteDoc, doc, updateDoc, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export const useFirebaseFeedStore = defineStore('firebaseFeed', () => {
  const posts = ref([])
  const loading = ref(false)
  const error = ref(null)
  const activeFilter = ref('all')
  const sortBy = ref('newest')

  const filteredPosts = computed(() => {
    let filtered = posts.value

    if (activeFilter.value === 'images') {
      filtered = filtered.filter(p => p.type === 'image')
    } else if (activeFilter.value === 'videos') {
      filtered = filtered.filter(p => p.type === 'video')
    } else if (activeFilter.value === 'text') {
      filtered = filtered.filter(p => p.type === 'text')
    }

    if (sortBy.value === 'liked') {
      filtered = [...filtered].sort((a, b) => b.likes - a.likes)
    } else if (sortBy.value === 'oldest') {
      filtered = [...filtered].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    } else {
      filtered = [...filtered].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }

    return filtered
  })

  const fetchPosts = async () => {
    loading.value = true
    error.value = null
    try {
      const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'))
      const snapshot = await getDocs(q)
      posts.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const addPost = async (post) => {
    try {
      const docRef = await addDoc(collection(db, 'posts'), {
        ...post,
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: 0,
        candles: 0,
      })
      posts.value.unshift({
        id: docRef.id,
        ...post,
      })
    } catch (err) {
      error.value = err.message
    }
  }

  const deletePost = async (postId) => {
    try {
      await deleteDoc(doc(db, 'posts', postId))
      posts.value = posts.value.filter(p => p.id !== postId)
    } catch (err) {
      error.value = err.message
    }
  }

  const updatePost = async (postId, updates) => {
    try {
      await updateDoc(doc(db, 'posts', postId), updates)
      const index = posts.value.findIndex(p => p.id === postId)
      if (index !== -1) {
        posts.value[index] = { ...posts.value[index], ...updates }
      }
    } catch (err) {
      error.value = err.message
    }
  }

  const setFilter = (filter) => {
    activeFilter.value = filter
  }

  const setSortBy = (sort) => {
    sortBy.value = sort
  }

  return {
    posts,
    loading,
    error,
    activeFilter,
    sortBy,
    filteredPosts,
    fetchPosts,
    addPost,
    deletePost,
    updatePost,
    setFilter,
    setSortBy,
  }
})
