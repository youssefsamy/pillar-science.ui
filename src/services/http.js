import axios from 'axios'
import auth from '@/services/auth'

const http = axios.create({
  baseURL: process.env.API_URL
})

const exceptions = [
  '/api/auth/login',
  '/api/auth/refresh'
]

http.interceptors.request.use(async config => {
  const route = config.url.replace(config.baseURL, '')

  if (!exceptions.includes(route)) {
    await auth.refreshToken()
  }

  const token = auth.getToken()

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
}, error => Promise.reject(error))

export default http
