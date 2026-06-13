import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Posts
export const postsAPI = {
  getAll: () => api.get('/posts'),
  getById: (id) => api.get(`/posts/${id}`),
  create: (data) => api.post('/posts', data),
  update: (id, data) => api.put(`/posts/${id}`, data),
  delete: (id) => api.delete(`/posts/${id}`),
}

// Comments
export const commentsAPI = {
  getByPost: (postId) => api.get(`/posts/${postId}/comments`),
  create: (postId, data) => api.post(`/posts/${postId}/comments`, data),
  delete: (postId, commentId) => api.delete(`/posts/${postId}/comments/${commentId}`),
}

// Users
export const usersAPI = {
  getCurrentUser: () => api.get('/users/me'),
  updateProfile: (data) => api.put('/users/me', data),
  getById: (id) => api.get(`/users/${id}`),
}

// Memorial
export const memorialAPI = {
  get: () => api.get('/memorial'),
  update: (data) => api.put('/memorial', data),
}

export default api
