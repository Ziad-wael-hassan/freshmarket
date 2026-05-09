import axios from 'axios'

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
  '/api/v1/products',
  '/api/v1/categories',
  '/api/v1/brands',
  '/api/v1/wishlist', // Allow guests to have empty wishlist
  '/api/v1/cart', // Allow guests to use cart
]

/**
 * Check if endpoint should ignore 401 errors
 */
const shouldIgnore401 = (url) => {
  return ignored401Endpoints.some(endpoint => url.includes(endpoint))
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
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
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
    // Skip handling for ignored endpoints
    if (shouldIgnore401(error.config?.url)) {
      return Promise.reject(error)
    }

    // Handle 401 - Unauthorized
    if (error.response?.status === 401) {
      // Prevent multiple parallel events
      if (isHandlingUnauthorized) {
        return Promise.reject(error)
      }

      isHandlingUnauthorized = true

      // Clear stored token
      localStorage.removeItem('token')

      // Dispatch custom event for React to handle
      // This preserves SPA behavior instead of full page reload
      if (import.meta.env.DEV) {
        console.log('[Auth] 401 received on protected endpoint, dispatching unauthorized event')
      }

      window.dispatchEvent(new CustomEvent('auth:unauthorized'))

      // Reset flag after a delay to allow subsequent unauthorized events
      setTimeout(() => {
        isHandlingUnauthorized = false
      }, 1000)

      return Promise.reject(error)
    }

    // Handle 403 - Forbidden
    if (error.response?.status === 403) {
      if (import.meta.env.DEV) {
        console.error('[Auth] Access forbidden')
      }
      return Promise.reject(error)
    }

    return Promise.reject(error)
  }
)

export default axiosInstance