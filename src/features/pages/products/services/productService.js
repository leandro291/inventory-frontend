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

export function getProducts() {
  return api.get('/product')
}

export function getProduct(id) {
  return api.get(`/product/${id}`)
}

export function createProduct(formData) {
  return api.post('/product', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export function updateProduct(id, formData) {
  return api.put(`/product/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export function deleteProduct(id) {
  return api.delete(`/product/${id}`)
}
