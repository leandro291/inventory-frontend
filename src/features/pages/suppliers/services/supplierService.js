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

export function getSuppliers() { return api.get('/supplier') }
export function getSupplier(id) { return api.get(`/supplier/${id}`) }
export function createSupplier(data) { return api.post('/supplier', data) }
export function updateSupplier(id, data) { return api.put(`/supplier/${id}`, data) }
export function deleteSupplier(id) { return api.delete(`/supplier/${id}`) }
