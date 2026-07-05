import { create } from 'zustand'
import { loginUser, registerUser } from '../services/auth-service.js'

function decodeToken(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch {
    return null
  }
}

export const useAuthStore = create((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  loading: true,

  init: () => {
    const token = localStorage.getItem('access')
    if (!token) {
      set({ token: null, user: null, isAuthenticated: false, loading: false })
      return
    }
    const payload = decodeToken(token)
    if (!payload || payload.exp * 1000 < Date.now()) {
      localStorage.removeItem('access')
      set({ token: null, user: null, isAuthenticated: false, loading: false })
      return
    }
    set({
      token,
      user: { id_user: payload.id_user, name: payload.name, last_name: payload.last_name, email: payload.email },
      isAuthenticated: true,
      loading: false,
    })
  },

  login: async (email, password) => {
    const data = await loginUser(email, password)
    localStorage.setItem('access', data.access)
    const payload = decodeToken(data.access)
    set({
      token: data.access,
      user: { id_user: payload.id_user, name: payload.name, last_name: payload.last_name, email: payload.email },
      isAuthenticated: true,
    })
  },

  register: async (formData) => {
    await registerUser(formData)
    set({})
  },

  logout: () => {
    localStorage.removeItem('access')
    set({ token: null, user: null, isAuthenticated: false })
  },
}))
