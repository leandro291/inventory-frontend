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

export function getCompanies() { return api.get('/company') }
export function getCompany(id) { return api.get(`/company/${id}`) }
export function createCompany(data) { return api.post('/company', data) }
export function updateCompany(id, data) { return api.put(`/company/${id}`, data) }
export function deleteCompany(id) { return api.delete(`/company/${id}`) }
