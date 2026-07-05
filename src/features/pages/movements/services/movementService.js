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

export function getMovements() { return api.get('/movement') }
export function getMovement(id) { return api.get(`/movement/${id}`) }
export function createMovement(data) { return api.post('/movement', data) }
export function deleteMovement(id) { return api.delete(`/movement/${id}`) }
