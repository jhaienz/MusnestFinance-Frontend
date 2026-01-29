import axios from 'axios'
import { getToken, getCurrentUser } from './auth'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

// Add auth interceptor to include JWT token in requests
api.interceptors.request.use((config) => {
  const user = getCurrentUser()
  if (user) {
    const token = getToken(user.role)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})
