import axios from 'axios'
import { API } from '@/constants/api'
import { authDebug, getAuthToken, notifyUnauthorized } from './authSession'

/**
 * Axios instance with custom configuration and interceptors
 */
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://ecommerce.routemisr.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Endpoints that should NOT trigger unauthorized handling
 * These are public endpoints that work for guest users
 */
const ignored401Endpoints = [
  API.AUTH.SIGNIN,
  API.AUTH.SIGNUP,
  API.AUTH.FORGOT_PASSWORD,
  API.AUTH.VERIFY_RESET_CODE,
  API.AUTH.RESET_PASSWORD,
  API.PRODUCTS.LIST,
  API.CATEGORIES.LIST,
  API.BRANDS.LIST,
  API.CART.GET,
]

/**
 * Check if endpoint should ignore 401 errors
 */
const shouldIgnore401 = (url) => {
  return typeof url === 'string' && ignored401Endpoints.some((endpoint) => url.endsWith(endpoint) || url === endpoint)
}

/**
 * Flag to prevent multiple unauthorized events from parallel requests
 */
let isHandlingUnauthorized = false

/**
 * Request interceptor - attach token to all requests
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken()
    if (token) {
      config.headers.token = token
      config.headers.Authorization = `Bearer ${token}`
    } else {
      delete config.headers.token
      delete config.headers.Authorization
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * Response interceptor - handle errors globally
 */
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const activeToken = getAuthToken()

    // Skip handling for ignored endpoints
    if (error.config?.skipUnauthorizedHandling || shouldIgnore401(error.config?.url) || !activeToken) {
      return Promise.reject(error)
    }

    // Handle 401 - Unauthorized
    if (error.response?.status === 401) {
      // Prevent multiple parallel events
      if (isHandlingUnauthorized) {
        return Promise.reject(error)
      }

      isHandlingUnauthorized = true

      console.log('[401 intercepted]', error.config?.url || 'unknown')
      authDebug('axios intercepted 401', {
        url: error.config?.url || 'unknown',
        method: error.config?.method || 'get',
      })
      notifyUnauthorized({
        reason: 'request-401',
        status: 401,
        url: error.config?.url || 'unknown',
        method: error.config?.method || 'get',
      })

      // Reset flag after a delay to allow subsequent unauthorized events
      setTimeout(() => {
        isHandlingUnauthorized = false
      }, 1000)

      return Promise.reject(error)
    }

    // Handle 403 - Forbidden
    if (error.response?.status === 403) {
      return Promise.reject(error)
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
