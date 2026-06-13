import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFeedStore = defineStore('feed', () => {
  const posts = ref([
    {
      id: '1',
      author: {
        name: 'Minnestunder',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      },
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      content: 'Velkommen til Minnestunder - en minneportal hvor vi deler kjære minner.',
      type: 'text',
      likes: 42,
      comments: 12,
      candles: 15,
      isLiked: false,
    },
  ])

  const comments = ref({})
  const candlesCount = ref(0)
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

  const addPost = (post) => {
    posts.value.unshift({
      ...post,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
      candles: 0,
      isLiked: false,
    })
  }

  const toggleLike = (postId) => {
    const post = posts.value.find(p => p.id === postId)
    if (post) {
      post.isLiked = !post.isLiked
      post.likes += post.isLiked ? 1 : -1
    }
  }

  const addComment = (postId, comment) => {
    if (!comments.value[postId]) {
      comments.value[postId] = []
    }
    comments.value[postId].push({
      ...comment,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      likes: 0,
      replies: [],
    })
  }

  const lightCandle = (postId) => {
    const post = posts.value.find(p => p.id === postId)
    if (post) {
      post.candles += 1
      candlesCount.value += 1
    }
  }

  const setFilter = (filter) => {
    activeFilter.value = filter
  }

  const setSortBy = (sort) => {
    sortBy.value = sort
  }

  const deletePost = (postId) => {
    posts.value = posts.value.filter(p => p.id !== postId)
    delete comments.value[postId]
  }

  const deleteComment = (postId, commentId) => {
    if (comments.value[postId]) {
      comments.value[postId] = comments.value[postId].filter(c => c.id !== commentId)
    }
  }

  return {
    posts,
    comments,
    candlesCount,
    activeFilter,
    sortBy,
    filteredPosts,
    addPost,
    toggleLike,
    addComment,
    lightCandle,
    setFilter,
    setSortBy,
    deletePost,
    deleteComment,
  }
}, { persist: true })
