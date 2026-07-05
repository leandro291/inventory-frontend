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

export function getRoles() { return api.get('/role') }
export function getRole(id) { return api.get(`/role/${id}`) }
export function createRole(data) { return api.post('/role', data) }
export function updateRole(id, data) { return api.put(`/role/${id}`, data) }
export function deleteRole(id) { return api.delete(`/role/${id}`) }
