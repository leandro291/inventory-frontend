import axios from 'axios'

const api = axios.create({ baseURL: '/api/v1' })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.error || error.message || 'Error en la petición'
    return Promise.reject(new Error(message))
  }
)

export function getInventories() {
  return api.get('/inventory')
}

export function getInventory(id) {
  return api.get(`/inventory/${id}`)
}

export function createInventory(data) {
  return api.post('/inventory', data)
}

export function updateInventory(id, data) {
  return api.put(`/inventory/${id}`, data)
}

export function deleteInventory(id) {
  return api.delete(`/inventory/${id}`)
}
