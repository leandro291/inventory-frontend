import axios from 'axios'

const api = axios.create({
  baseURL: '/api/v1',
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
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

export function getProducts() {
  return api.get('/product')
}

export function getProduct(id) {
  return api.get(`/product/${id}`)
}

export function createProduct(data) {
  return api.post('/product', data)
}

export function updateProduct(id, data) {
  return api.put(`/product/${id}`, data)
}

export function deleteProduct(id) {
  return api.delete(`/product/${id}`)
}
