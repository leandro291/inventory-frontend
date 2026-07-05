import axios from 'axios'

const api = axios.create({ baseURL: '/api/v1' })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.error || error.message || 'Error en la petición'
    return Promise.reject(new Error(message))
  }
)

export function getRepositories() { return api.get('/repository') }
export function getRepository(id) { return api.get(`/repository/${id}`) }
export function createRepository(data) { return api.post('/repository', data) }
export function updateRepository(id, data) { return api.put(`/repository/${id}`, data) }
export function deleteRepository(id) { return api.delete(`/repository/${id}`) }
