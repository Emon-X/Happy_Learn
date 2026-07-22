import axios from 'axios'

// Creates a generalized API instance
// Vite replaces import.meta.env variables at build time.
// In deployment, you can just change this in your .env file or environment variables.
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Optional: Add request interceptor for authentication tokens
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Generalized API calls for the frontend
export const authAPI = {
  login: (data: any) => api.post('/login', data),
  register: (data: any) => api.post('/register', data),
}

export const usersAPI = {
  getUsersByParent: (parentId: number) => api.get(`/users/${parentId}`),
  createUser: (parentId: number, data: any) => api.post(`/users?parent_id=${parentId}`, data),
}
