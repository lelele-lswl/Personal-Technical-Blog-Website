import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

export const profileApi = {
  get: () => api.get('/profile'),
  create: (data) => api.post('/profile', data),
  update: (id, data) => api.put(`/profile/${id}`, data),
}

export const skillApi = {
  getAll: () => api.get('/skills'),
  getGrouped: () => api.get('/skills/grouped'),
  create: (data) => api.post('/skills', data),
  delete: (id) => api.delete(`/skills/${id}`),
}

export const projectApi = {
  getAll: () => api.get('/projects'),
  create: (data) => api.post('/projects', data),
  delete: (id) => api.delete(`/projects/${id}`),
}

export const messageApi = {
  getAll: () => api.get('/messages'),
  create: (data) => api.post('/messages', data),
  markRead: (id) => api.put(`/messages/${id}/read`),
  getUnreadCount: () => api.get('/messages/unread-count'),
}

export default api