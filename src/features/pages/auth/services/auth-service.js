import axios from 'axios'

const api = axios.create({ baseURL: '/api/v1' })

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.error || error.message || 'Error en la petición'
    return Promise.reject(new Error(message))
  }
)

export function loginUser(email, password) { return api.post('/auth/login', { email, password }) }
export function registerUser(data) { return api.post('/auth/register', data) }
