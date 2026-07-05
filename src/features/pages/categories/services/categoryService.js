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

export function getCategories() {
  return api.get('/category')
}

export function getCategory(id) {
  return api.get(`/category/${id}`)
}

export function createCategory(data) {
  return api.post('/category', data)
}

export function updateCategory(id, data) {
  return api.put(`/category/${id}`, data)
}

export function deleteCategory(id) {
  return api.delete(`/category/${id}`)
}
